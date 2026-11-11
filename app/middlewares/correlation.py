import uuid
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from app.core.logging import request_id_ctx


class CorrelationIdMiddleware(BaseHTTPMiddleware):
    """
    Middleware that captures or generates a unique correlation ID (X-Request-ID)
    for every incoming request and attaches it to response headers and logging context.
    """
    async def dispatch(self, request: Request, call_next) -> Response:
        # Use existing X-Request-ID if provided by Cloudflare / reverse proxy, otherwise generate a new UUID
        request_id = request.headers.get("x-request-id") or str(uuid.uuid4())
        
        # Store in context variable for logging
        token = request_id_ctx.set(request_id)
        
        # Also store in request state for convenient route access
        request.state.request_id = request_id

        try:
            response: Response = await call_next(request)
        finally:
            request_id_ctx.reset(token)

        response.headers["x-request-id"] = request_id
        return response

