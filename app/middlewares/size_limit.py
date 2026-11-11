from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse
from app.core.config import settings


class RequestSizeLimitMiddleware(BaseHTTPMiddleware):
    """
    Protects the backend from Denial-of-Service (DoS) attacks via oversized payloads.
    Rejects requests exceeding MAX_REQUEST_BODY_BYTES with a 413 Payload Too Large error.
    """
    async def dispatch(self, request: Request, call_next):
        content_length = request.headers.get("content-length")
        if content_length:
            try:
                length = int(content_length)
                if length > settings.MAX_REQUEST_BODY_BYTES:
                    return JSONResponse(
                        status_code=413,
                        content={
                            "success": False,
                            "error": {
                                "code": "PAYLOAD_TOO_LARGE",
                                "message": f"Request body exceeds the maximum allowed size of {settings.MAX_REQUEST_BODY_BYTES} bytes."
                            }
                        }
                    )
            except ValueError:
                return JSONResponse(
                    status_code=400,
                    content={
                        "success": False,
                        "error": {
                            "code": "INVALID_CONTENT_LENGTH",
                            "message": "Invalid Content-Length header."
                        }
                    }
                )

        return await call_next(request)

