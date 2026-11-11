import logging
from app.services.base import BaseExtractionProvider, MediaUnavailableError
from app.api.schemas import VideoData, VideoFormat

logger = logging.getLogger(__name__)


class MockExtractionProvider(BaseExtractionProvider):
    """
    Mock extraction provider for local development, automated testing, and CI/CD.
    Simulates successful extraction and error cases based on shortcode conventions.
    Does NOT contact Instagram or any external servers.
    """
    async def extract(self, instagram_url: str) -> VideoData:
        logger.info(f"MockExtractionProvider processing URL: {instagram_url}")

        # Simulate unavailable media if URL contains 'unavailable'
        if "unavailable" in instagram_url.lower():
            raise MediaUnavailableError("The requested video is unavailable or private.")

        # Simulate timeout if URL contains 'timeout'
        if "timeout" in instagram_url.lower():
            from app.services.base import ProviderTimeoutError
            raise ProviderTimeoutError("Provider request timed out.")

        # Extract simulated shortcode
        shortcode = "mock_shortcode"
        parts = instagram_url.strip("/").split("/")
        if parts:
            shortcode = parts[-1]

        # Return mock temporary authorized URL
        return VideoData(
            url=f"https://media.saveamedia.net/mock-cdn/{shortcode}.mp4",
            thumbnail=f"https://media.saveamedia.net/mock-cdn/{shortcode}-thumb.jpg",
            title=f"Instagram Reel {shortcode}",
            availableFormats=[
                VideoFormat(
                    format_id="hd",
                    quality="1080p",
                    extension="mp4",
                    url=f"https://media.saveamedia.net/mock-cdn/{shortcode}-1080p.mp4",
                ),
                VideoFormat(
                    format_id="sd",
                    quality="720p",
                    extension="mp4",
                    url=f"https://media.saveamedia.net/mock-cdn/{shortcode}-720p.mp4",
                ),
            ],
        )

