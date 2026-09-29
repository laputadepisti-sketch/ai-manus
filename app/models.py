# app/models.py - deobfuscated

from typing import Dict, List, Optional

from pydantic import BaseModel


class PresignedUrlPart(BaseModel):
    part_number: int
    url: str


class PartUploadResult(BaseModel):
    part_number: int
    success: bool
    etag: Optional[str] = None
    error: Optional[str] = None


class MultipartUploadRequest(BaseModel):
    file_path: str
    presigned_urls: List[PresignedUrlPart]
    part_size: int


class MultipartUploadResponse(BaseModel):
    status: str
    message: str
    uploaded_parts: int
    total_parts: int
