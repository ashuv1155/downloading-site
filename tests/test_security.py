import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.api.dependencies import rate_limiter


@pytest.mark.asyncio
async def test_request_body_size_limit():
    transport = ASGITransport(app=app)
    # 70,000 bytes payload exceeds the 65,536 bytes limit
    oversized_body = "a" * 70000
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post(
            "/api/v1/extract",
            content=oversized_body,
            headers={"Content-Length": str(len(oversized_body)), "Content-Type": "application/json"}
        )
        assert response.status_code == 413
        data = response.json()
        assert data["success"] is False
        assert data["error"]["code"] == "PAYLOAD_TOO_LARGE"


@pytest.mark.asyncio
async def test_validation_error_contract():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        # Invalid URL domain
        response = await client.post(
            "/api/v1/extract",
            json={"url": "https://www.tiktok.com/@user/video/123"}
        )
        assert response.status_code == 400
        data = response.json()
        assert data["success"] is False
        assert data["error"]["code"] == "INVALID_REQUEST"
        assert "Unsupported domain" in data["error"]["message"]


@pytest.mark.asyncio
async def test_rate_limiting():
    # Temporarily set limit to 2 for this test
    original_limit = rate_limiter.requests_per_minute
    rate_limiter.requests_per_minute = 2
    rate_limiter._clients.clear()

    try:
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            headers = {"cf-connecting-ip": "203.0.113.195"}

            # Request 1: allowed
            r1 = await client.post(
                "/api/v1/extract",
                json={"url": "https://www.instagram.com/reel/C123abc456/"},
                headers=headers
            )
            assert r1.status_code == 200

            # Request 2: allowed
            r2 = await client.post(
                "/api/v1/extract",
                json={"url": "https://www.instagram.com/reel/C123abc456/"},
                headers=headers
            )
            assert r2.status_code == 200

            # Request 3: blocked with 429
            r3 = await client.post(
                "/api/v1/extract",
                json={"url": "https://www.instagram.com/reel/C123abc456/"},
                headers=headers
            )
            assert r3.status_code == 429
            data = r3.json()
            assert data["success"] is False
            assert data["error"]["code"] == "RATE_LIMIT_EXCEEDED"
            assert "Retry-After" in r3.headers
    finally:
        rate_limiter.requests_per_minute = original_limit
        rate_limiter._clients.clear()

