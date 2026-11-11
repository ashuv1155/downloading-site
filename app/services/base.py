from abc import ABC, abstractmethod
from typing import Optional
from app.api.schemas import VideoData


class ProviderError(Exception):
    """Base exception for extraction provider failures."""
    def __init__(self, code: str, message: str, status_code: int = 502):
        self.code = code
        self.message = message
        self.status_code = status_code
        super().__init__(message)


class ProviderNotConfiguredError(ProviderError):
    """Raised when no authorized media extraction provider is configured."""
    def __init__(self, message: str = "Media extraction provider is not configured."):
        super().__init__(code="PROVIDER_NOT_CONFIGURED", message=message, status_code=503)


class ProviderTimeoutError(ProviderError):
    """Raised when the extraction provider times out."""
    def __init__(self, message: str = "Provider timed out while processing media."):
        super().__init__(code="PROVIDER_TIMEOUT", message=message, status_code=504)


class MediaUnavailableError(ProviderError):
    """Raised when the requested media cannot be found or is unavailable."""
    def __init__(self, message: str = "Unable to process this video."):
        super().__init__(code="MEDIA_UNAVAILABLE", message=message, status_code=404)


class BaseExtractionProvider(ABC):
    """
    Abstract Base Class for media extraction providers.
    Every real or mock provider must implement this contract.
    """
    @abstractmethod
    async def extract(self, instagram_url: str) -> VideoData:
        """
        Extract media information from an Instagram reel URL.
        Must return a structured VideoData model or raise a subclass of ProviderError.
        """
        pass

