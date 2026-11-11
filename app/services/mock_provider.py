import re
import logging
from app.services.base import BaseExtractionProvider, MediaUnavailableError
from app.api.schemas import VideoData, VideoFormat, AuthorData

logger = logging.getLogger(__name__)


class MockExtractionProvider(BaseExtractionProvider):
    """
    Mock extraction provider for local development, automated testing, and CI/CD.
    Simulates high-fidelity extraction matching frontend expectations.
    """
    async def extract(self, instagram_url: str) -> VideoData:
        logger.info(f"MockExtractionProvider processing URL: {instagram_url}")

        # Simulate unavailable media
        if "unavailable" in instagram_url.lower():
            raise MediaUnavailableError("The requested video is unavailable or private.")

        # Simulate timeout
        if "timeout" in instagram_url.lower():
            from app.services.base import ProviderTimeoutError
            raise ProviderTimeoutError("Provider request timed out.")

        # Extract shortcode
        shortcode = "C8k_demoReel"
        parts = instagram_url.strip("/").split("/")
        if parts:
            candidate = parts[-1]
            if candidate:
                shortcode = candidate

        # Sample video and cover assets (using public streaming video for in-browser playback)
        sample_video_stream = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        sample_thumbnail = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"
        sample_avatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"

        return VideoData(
            id=shortcode,
            url=sample_video_stream,
            thumbnail=sample_thumbnail,
            title=f"Instagram Reel Video ({shortcode})",
            durationSeconds=28,
            likesCount=142500,
            originalReelUrl=instagram_url,
            author=AuthorData(
                username="saveamedia_creator",
                fullName="SaveAMedia Creator",
                avatarUrl=sample_avatar,
                isVerified=True,
            ),
            availableFormats=[
                VideoFormat(
                    id="fmt-1080p",
                    format_id="fmt-1080p",
                    quality="1080p Full HD",
                    resolution="1080x1920",
                    extension="mp4",
                    url=sample_video_stream,
                    formattedSize="18.6 MB",
                    hasAudio=True,
                ),
                VideoFormat(
                    id="fmt-720p",
                    format_id="fmt-720p",
                    quality="720p HD",
                    resolution="720x1280",
                    extension="mp4",
                    url=sample_video_stream,
                    formattedSize="9.8 MB",
                    hasAudio=True,
                ),
                VideoFormat(
                    id="fmt-audio",
                    format_id="fmt-audio",
                    quality="Audio Only (MP3)",
                    extension="mp3",
                    url=sample_video_stream,
                    formattedSize="2.4 MB",
                    hasAudio=True,
                ),
            ],
        )
