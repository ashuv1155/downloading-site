from typing import List, Optional
from datetime import datetime
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
    id: Optional[str] = "fmt-1"
    format_id: Optional[str] = None
    quality: Optional[str] = "1080p Full HD"
    resolution: Optional[str] = "1080x1920"
    extension: Optional[str] = "mp4"
    url: Optional[str] = None
    formattedSize: Optional[str] = None
    bitrate: Optional[str] = None
    hasAudio: bool = True


class AuthorData(BaseModel):
    username: str = "creator"
    fullName: Optional[str] = None
    avatarUrl: Optional[str] = None
    isVerified: bool = False


class VideoData(BaseModel):
    id: Optional[str] = "reel_id"
    url: str
    thumbnail: Optional[str] = None
    title: Optional[str] = None
    author: Optional[AuthorData] = Field(default_factory=AuthorData)
    durationSeconds: Optional[int] = 30
    likesCount: Optional[int] = None
    extractedAt: Optional[str] = Field(default_factory=lambda: datetime.utcnow().isoformat() + "Z")
    originalReelUrl: Optional[str] = None
    availableFormats: List[VideoFormat] = Field(default_factory=list)


class ErrorDetail(BaseModel):
    code: str
    message: str
    fallbackSuggested: Optional[bool] = False


class ExtractSuccessResponse(BaseModel):
    success: bool = True
    video: VideoData


class ExtractFailureResponse(BaseModel):
    success: bool = False
    error: ErrorDetail
