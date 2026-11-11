import logging
from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from app.core.config import settings
from app.api.schemas import (
    ExtractRequest,
    ExtractSuccessResponse,
    ExtractFailureResponse,
    ErrorDetail
)
from app.services.extractor import ExtractorService
from app.services.base import ProviderError
from app.api.dependencies import rate_limiter

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/")
async def root():
    """
    Basic service information.
    """
    return {
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
        "docs": "/docs"
    }


@router.get("/health")
async def health():
    """
    Health check endpoint required by Render and external uptime monitoring.
    """
    return {
        "status": "healthy",
        "service": "saveamedia-backend"
    }


@router.get("/api/v1/status")
async def api_status():
    """
    Status endpoint for API gateway monitoring.
    """
    return {
        "status": "operational",
        "version": settings.VERSION
    }


@router.post(
    "/api/v1/extract",
    response_model=ExtractSuccessResponse,
    dependencies=[Depends(rate_limiter.check_rate_limit)],
    responses={
        400: {"model": ExtractFailureResponse},
        404: {"model": ExtractFailureResponse},
        413: {"model": ExtractFailureResponse},
        429: {"model": ExtractFailureResponse},
        502: {"model": ExtractFailureResponse},
        503: {"model": ExtractFailureResponse},
        504: {"model": ExtractFailureResponse},
    }
)
async def extract_media(payload: ExtractRequest):
    """
    Extracts media details from a validated Instagram Reel URL using the configured provider.
    Rate limited and guarded against SSRF and oversized payloads.
    """
    extractor = ExtractorService()
    try:
        video_data = await extractor.extract_media(payload.url)
        return ExtractSuccessResponse(
            success=True,
            video=video_data
        )
    except ProviderError as exc:
        logger.warning(f"Provider error during extraction: {exc.code} - {exc.message}")
        return JSONResponse(
            status_code=exc.status_code,
            content=ExtractFailureResponse(
                success=False,
                error=ErrorDetail(code=exc.code, message=exc.message)
            ).model_dump()
        )
