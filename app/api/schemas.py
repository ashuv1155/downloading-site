from typing import List, Optional
from pydantic import BaseModel, Field, field_validator
from app.core.security import validate_instagram_url


class ExtractRequest(BaseModel):
    """
    Incoming payload for /api/v1/extract
    """
    url: str = Field(..., description="Full Instagram Reel URL to process", min_length=1)

    @field_validator("url")
    @classmethod
    def validate_url(cls, v: str) -> str:
        return validate_instagram_url(v)


class VideoFormat(BaseModel):
    format_id: Optional[str] = None
    quality: Optional[str] = None
    extension: Optional[str] = "mp4"
    url: Optional[str] = None


class VideoData(BaseModel):
    url: str
    thumbnail: Optional[str] = None
    title: Optional[str] = None
    availableFormats: List[VideoFormat] = Field(default_factory=list)


class ErrorDetail(BaseModel):
    code: str
    message: str


class ExtractSuccessResponse(BaseModel):
    success: bool = True
    video: VideoData


class ExtractFailureResponse(BaseModel):
    success: bool = False
    error: ErrorDetail

