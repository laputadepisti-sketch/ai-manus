# app/helpers/utils.py - deobfuscated

import os
from urllib.parse import quote

import aiohttp

from app.logger import logger
from app.models import PartUploadResult, PresignedUrlPart


def truncate_text_from_back(text: str, max_len: int) -> str:
    """裁剪并保留最后 max_len 长度的文本"""
    if len(text) <= max_len:
        return text
    return "[previous content truncated]..." + text[-max_len:]


def truncate_text(text: str, max_len: int) -> str:
    """裁剪并保留前 max_len 长度的文本"""
    if len(text) <= max_len:
        return text
    return text[:max_len] + "...[content truncated]"


def ensure_dir_exists(dir_path: str):
    """确保文件所在目录存在"""
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)


async def upload_to_presigned_url(
    data: bytes,
    presigned_url: str,
    content_type: str = "application/octet-stream",
    filename: str = "",
) -> bool:
    """Upload data to a presigned URL using aiohttp."""
    try:
        async with aiohttp.ClientSession() as session:
            headers = {}
            if filename:
                headers["Content-Disposition"] = f"attachment; filename*=UTF-8''{quote(filename)}"
            async with session.put(
                presigned_url,
                data=data,
                headers=headers,
            ) as resp:
                if resp.status == 200:
                    return True
                else:
                    logger.error(f"Failed to upload to presigned URL: status {resp.status}")
                    return False
    except Exception as e:
        logger.error(f"Failed to upload to presigned URL: {e}")
        return False


async def upload_part(
    session: aiohttp.ClientSession,
    url: str,
    data: bytes,
    part_number: int,
) -> PartUploadResult:
    """Upload a single part to S3 using presigned URL"""
    try:
        async with session.put(url, data=data) as resp:
            if resp.status == 200:
                etag = resp.headers.get("ETag")
                return PartUploadResult(part_number=part_number, success=True, etag=etag)
            else:
                logger.error(f"Upload failed with status {resp.status}")
                return PartUploadResult(part_number=part_number, success=False, error=f"Status {resp.status}")
    except Exception as e:
        logger.error(f"Failed to upload part {part_number}: {e}")
        return PartUploadResult(part_number=part_number, success=False, error=str(e))


class FilePartReader:
    def __init__(self, file_path: str, part_size: int):
        self.file_path = file_path
        self.part_size = part_size
        self._file = None

    async def __aenter__(self):
        self._file = open(self.file_path, "rb")
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        self._file.close()

    def read_part(self, part_number: int) -> bytes:
        """读取指定分片的数据"""
        self._file.seek((part_number - 1) * self.part_size)
        return self._file.read(self.part_size)


async def upload_file_parts(
    file_path: str,
    presigned_urls: list,
    part_size: int,
    max_concurrent: int = 5,
) -> list:
    """
    并发上传文件分片

    Args:
        file_path: 文件路径
        presigned_urls: 预签名URL列表
        part_size: 分片大小（字节）
        max_concurrent: 最大并发数
    """
    semaphore = asyncio.Semaphore(max_concurrent)

    async with aiohttp.ClientSession() as session:
        with FilePartReader(file_path, part_size) as reader:

            async def upload_with_semaphore(part: PresignedUrlPart):
                async with semaphore:
                    data = reader.read_part(part.part_number)
                    return await upload_part(session, part.url, data, part.part_number)

            tasks = [upload_with_semaphore(part) for part in presigned_urls]
            results = await asyncio.gather(*tasks)
            return list(results)
