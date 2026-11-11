import time
import asyncio
from typing import Dict, Tuple
from fastapi import Request, HTTPException, status
from app.core.config import settings


class InMemoryRateLimiter:
    """
    Lightweight, thread-safe in-memory sliding window rate limiter.
    Does not introduce Redis or external database dependencies.
    """
    def __init__(self, requests_per_minute: int = 60):
        self.requests_per_minute = requests_per_minute
        # client_ip -> (request_count, reset_timestamp)
        self._clients: Dict[str, Tuple[int, float]] = {}
        self._lock = asyncio.Lock()

    async def check_rate_limit(self, request: Request):
        # Extract client IP; support CF-Connecting-IP / X-Forwarded-For if behind Cloudflare Worker
        client_ip = (
            request.headers.get("cf-connecting-ip")
            or request.headers.get("x-forwarded-for", "").split(",")[0].strip()
            or (request.client.host if request.client else "127.0.0.1")
        )

        now = time.time()

        async with self._lock:
            # Clean expired client entries periodically
            if len(self._clients) > 10000:
                self._clients = {
                    ip: (cnt, exp) for ip, (cnt, exp) in self._clients.items() if exp > now
                }

            if client_ip in self._clients:
                count, reset_at = self._clients[client_ip]
                if now < reset_at:
                    if count >= self.requests_per_minute:
                        retry_after = int(reset_at - now) + 1
                        raise HTTPException(
                            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                            detail="Rate limit exceeded. Please try again later.",
                            headers={"Retry-After": str(retry_after)}
                        )
                    self._clients[client_ip] = (count + 1, reset_at)
                else:
                    self._clients[client_ip] = (1, now + 60.0)
            else:
                self._clients[client_ip] = (1, now + 60.0)


rate_limiter = InMemoryRateLimiter(requests_per_minute=settings.RATE_LIMIT_PER_MINUTE)

