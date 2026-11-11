import logging
from fastapi import FastAPI, Request, HTTPException, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.logging import setup_logging
from app.middlewares.correlation import CorrelationIdMiddleware
from app.middlewares.size_limit import RequestSizeLimitMiddleware
from app.api.routes import router as base_router
from app.api.schemas import ExtractFailureResponse, ErrorDetail

logger = logging.getLogger(__name__)


def create_app() -> FastAPI:
    # Setup structured logging
    setup_logging(log_level=settings.LOG_LEVEL)

    app = FastAPI(
        title=settings.PROJECT_NAME,
        version=settings.VERSION,
        docs_url="/docs" if settings.ENVIRONMENT != "production" else None,
        redoc_url="/redoc" if settings.ENVIRONMENT != "production" else None,
    )

    # Middleware Stack (Execution is bottom-to-top on request, top-to-bottom on response)
    # 1. Capture/generate correlation ID first
    app.add_middleware(CorrelationIdMiddleware)

    # 2. Enforce request payload size limit (before parsing body)
    app.add_middleware(RequestSizeLimitMiddleware)

    # 3. CORS handling
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Validation Exception Handler (conforms to ExtractFailureResponse contract)
    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        # Extract the first human-readable error message
        errors = exc.errors()
        message = "Validation error."
        if errors:
            first_err = errors[0]
            # Use custom validator msg if present
            raw_msg = first_err.get("msg", "Invalid request parameter.")
            # Strip "Value error, " prefix injected by pydantic v2
            if raw_msg.startswith("Value error, "):
                message = raw_msg[len("Value error, "):]
            else:
                field = ".".join(str(loc) for loc in first_err.get("loc", []))
                message = f"{field}: {raw_msg}" if field else raw_msg

        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content=ExtractFailureResponse(
                success=False,
                error=ErrorDetail(
                    code="INVALID_REQUEST",
                    message=message
                )
            ).model_dump()
        )

    # HTTP Exception Handler (Rate limiting, etc.)
    @app.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, exc: HTTPException):
        code = "HTTP_ERROR"
        if exc.status_code == status.HTTP_429_TOO_MANY_REQUESTS:
            code = "RATE_LIMIT_EXCEEDED"
        elif exc.status_code == status.HTTP_404_NOT_FOUND:
            code = "NOT_FOUND"

        return JSONResponse(
            status_code=exc.status_code,
            headers=getattr(exc, "headers", None),
            content=ExtractFailureResponse(
                success=False,
                error=ErrorDetail(
                    code=code,
                    message=str(exc.detail)
                )
            ).model_dump()
        )

    # Global Fallback Exception Handler (avoids internal details leakage)
    @app.exception_handler(Exception)
    async def generic_exception_handler(request: Request, exc: Exception):
        logger.exception(f"Unhandled server error: {exc}")
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content=ExtractFailureResponse(
                success=False,
                error=ErrorDetail(
                    code="INTERNAL_SERVER_ERROR",
                    message="An unexpected server error occurred. Please try again later."
                )
            ).model_dump()
        )

    # Register API routes
    app.include_router(base_router)

    return app


app = create_app()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=False)
