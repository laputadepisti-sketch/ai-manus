# app/server.py - deobfuscated

import asyncio
import math
import mimetypes
from pathlib import Path
from typing import Optional

import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel

from app.helpers.utils import upload_file_parts, upload_to_presigned_url
from app.logger import logger
from app.models import MultipartUploadRequest, MultipartUploadResponse
from app.router import TimedRoute
from app.terminal_socket_server import TerminalSocketServer
from app.tools.base import ToolError
from app.tools.browser.browser_manager import BrowserDeadError, BrowserManager
from app.tools.terminal.terminal_manager import TerminalManager
from app.tools.text_editor import TextEditor
from app.types.messages import (
    BrowserActionRequest,
    BrowserActionResponse,
    FileInfo,
    TerminalApiResponse,
    TerminalInputMessage,
    TextEditorAction,
    TextEditorActionResult,
)

MULTIPART_THRESHOLD = 10 * 1024 * 1024  # 10MB

terminal_manager = TerminalManager()
browser_manager = BrowserManager()
text_editor = TextEditor()


class FileUploadRequest(BaseModel):
    file_path: str
    presigned_url: Optional[str] = None


class DownloadItem(BaseModel):
    url: str
    save_path: str


class DownloadResult(BaseModel):
    url: str
    success: bool
    error: Optional[str] = None


class DownloadRequest(BaseModel):
    files: list
    save_dir: str = "/tmp"


class InitSandboxRequest(BaseModel):
    pass


app = FastAPI()
app.router.route_class = TimedRoute

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/upload_file")
async def upload_file(cmd: FileUploadRequest):
    """
    Upload a file to S3. If file size exceeds threshold, return size information instead.

    Request body:
    {
        "file_path": str,         # The local file path to upload
        "presigned_url": str      # The presigned URL to upload to
    }

    Returns:
    - For small files: Uploads the file and returns success response
    - For large files: Returns file information for multipart upload
    """
    file_path = Path(cmd.file_path).resolve()
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    if not file_path.is_file():
        raise HTTPException(status_code=400, detail="Path is not a file")

    file_size = file_path.stat().st_size
    content_type = mimetypes.guess_type(str(file_path))[0] or "application/octet-stream"

    if file_size > MULTIPART_THRESHOLD:
        return {
            "status": "success",
            "message": "File size exceeds single upload limit",
            "requires_multipart": True,
            "file_size": file_size,
        }

    try:
        with open(file_path, "rb") as f:
            data = f.read()
        await upload_to_presigned_url(data, cmd.presigned_url, content_type, file_path.name)
        return {
            "status": "success",
            "message": "File uploaded successfully",
            "requires_multipart": False,
        }
    except Exception as e:
        logger.error(f"Error handling file upload: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/multipart_upload")
async def multipart_upload(cmd: MultipartUploadRequest):
    """
    使用预签名URLs上传文件分片

    Request body:
    {
        "file_path": str,
        "presigned_urls": [
            {"part_number": int, "url": str},
            ...
        ],
        "part_size": int
    }
    """
    file_path = Path(cmd.file_path).resolve()
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    if not file_path.is_file():
        raise HTTPException(status_code=400, detail="Path is not a file")

    file_size = file_path.stat().st_size
    expected_parts = math.ceil(file_size / cmd.part_size)

    if len(cmd.presigned_urls) != expected_parts:
        raise HTTPException(
            status_code=400,
            detail=f"Number of presigned URLs ({len(cmd.presigned_urls)}) "
                   f"does not match expected parts ({expected_parts})",
        )

    try:
        results = await upload_file_parts(str(file_path), cmd.presigned_urls, cmd.part_size)
        success_count = sum(1 for r in results if r.success)
        return MultipartUploadResponse(
            status="success" if success_count == len(results) else "partial_success",
            message="All parts uploaded successfully" if success_count == len(results)
                    else f"Uploaded {success_count}/{len(results)} parts successfully",
            uploaded_parts=success_count,
            total_parts=len(results),
        )
    except Exception as e:
        logger.error(f"Error in multipart upload: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/get_file")
async def get_file(path: str):
    """
    Download file endpoint
    Query params:
        path: str - The file path to download
    """
    file_path = Path(path).resolve()
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    if not file_path.is_file():
        raise HTTPException(status_code=400, detail="Path is not a file")

    try:
        return FileResponse(
            str(file_path),
            media_type="application/octet-stream",
            filename=file_path.name,
        )
    except Exception as e:
        logger.error(f"Error serving file: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/batch_download")
async def batch_download(cmd: DownloadRequest):
    """Batch download files from URLs."""
    try:
        async with httpx.AsyncClient() as client:
            tasks = [download_single_file(client, item, cmd.save_dir) for item in cmd.files]
            results = await asyncio.gather(*tasks)
            success_count = sum(1 for r in results if r.success)
            return {
                "status": "success",
                "message": f"Downloaded {success_count}/{len(results)} files",
                "results": [r.model_dump() for r in results],
            }
    except Exception as e:
        logger.error(f"Error in batch download: {e}")
        raise HTTPException(status_code=500, detail=str(e))


async def download_single_file(
    client: httpx.AsyncClient, item: DownloadItem, save_dir: str
) -> DownloadResult:
    """Download a single file."""
    try:
        save_path = Path(save_dir) / item.save_path
        save_path.parent.mkdir(parents=True, exist_ok=True)
        async with client.stream("GET", item.url) as resp:
            with open(save_path, "wb") as f:
                async for chunk in resp.aiter_bytes():
                    f.write(chunk)
        return DownloadResult(url=item.url, success=True)
    except Exception as e:
        return DownloadResult(url=item.url, success=False, error=str(e))


@app.post("/api/terminal")
async def terminal_action(cmd: TerminalInputMessage) -> TerminalApiResponse:
    """Execute a terminal command."""
    try:
        terminal = await terminal_manager.create_or_get_terminal(cmd.terminal)
        result = await terminal.execute_command(cmd)
        return result
    except Exception as e:
        logger.error(f"Error in terminal action: {e}")
        return TerminalApiResponse(status="error", error=str(e))


@app.post("/api/text_editor")
async def text_editor_action(cmd: TextEditorAction) -> TextEditorActionResult:
    """Execute a text editor action."""
    try:
        result = await text_editor.run_action(cmd)
        return TextEditorActionResult(status="success", output=result.output or "")
    except ToolError as e:
        return TextEditorActionResult(status="error", error=str(e))
    except Exception as e:
        logger.error(f"Error in text editor action: {e}")
        return TextEditorActionResult(status="error", error=str(e))


@app.post("/api/browser_action")
async def browser_action(cmd: BrowserActionRequest) -> BrowserActionResponse:
    """Execute a browser action."""
    try:
        result = await browser_manager.execute_action(cmd.action)
        return BrowserActionResponse(status="success", **result)
    except BrowserDeadError as e:
        return BrowserActionResponse(status="error", error=str(e))
    except Exception as e:
        logger.error(f"Error in browser action: {e}")
        return BrowserActionResponse(status="error", error=str(e))


@app.post("/api/init_sandbox")
async def init_sandbox(cmd: InitSandboxRequest):
    """Initialize the sandbox environment."""
    try:
        await terminal_manager.create_or_get_terminal("default")
        return {"status": "success", "message": "Sandbox initialized"}
    except Exception as e:
        logger.error(f"Error initializing sandbox: {e}")
        raise HTTPException(status_code=500, detail=str(e))
