import logging
from typing import Optional
from app.core.config import settings
from app.core.security import is_safe_external_url
from app.services.base import (
    BaseExtractionProvider,
    ProviderNotConfiguredError,
    ProviderError
)
from app.services.mock_provider import MockExtractionProvider
from app.api.schemas import VideoData

logger = logging.getLogger(__name__)


class ExtractorService:
    """
    Orchestrates extraction requests by resolving the configured provider,
    dispatching the extraction job, and validating the returned URLs for SSRF safety.
    """
    def __init__(self, provider: Optional[BaseExtractionProvider] = None):
        self._provider = provider

    def get_provider(self) -> BaseExtractionProvider:
        if self._provider is not None:
            return self._provider

        provider_name = (settings.EXTRACTION_PROVIDER or "").lower().strip()

        if provider_name == "mock":
            return MockExtractionProvider()
        elif provider_name in ("ytdlp", "yt-dlp", "real"):
            from app.services.ytdlp_provider import YtDlpExtractionProvider
            return YtDlpExtractionProvider(timeout_seconds=settings.REQUEST_TIMEOUT_SECONDS)
        elif provider_name in ("", "none"):
            raise ProviderNotConfiguredError(
                "No media extraction provider configured. Set EXTRACTION_PROVIDER in environment."
            )
        else:
            # Placeholder for future production provider plugins
            raise ProviderNotConfiguredError(
                f"Unknown or unconfigured extraction provider: '{provider_name}'."
            )

    async def extract_media(self, instagram_url: str) -> VideoData:
        provider = self.get_provider()
        video_data = await provider.extract(instagram_url)

        # Validate that the provider's returned URLs are safe (SSRF protection)
        if not is_safe_external_url(video_data.url):
            logger.error(f"Unsafe media URL returned by provider: {video_data.url}")
            raise ProviderError(
                code="UNSAFE_MEDIA_URL",
                message="Extracted media URL failed security validation.",
                status_code=502
            )

        # Validate format URLs as well if present
        for fmt in video_data.availableFormats:
            if fmt.url and not is_safe_external_url(fmt.url):
                logger.error(f"Unsafe format URL returned by provider: {fmt.url}")
                raise ProviderError(
                    code="UNSAFE_MEDIA_URL",
                    message="Extracted format URL failed security validation.",
                    status_code=502
                )

        return video_data

