import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.core.config import settings


@pytest.mark.asyncio
async def test_extract_success_with_mock_provider():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post(
            "/api/v1/extract",
            json={"url": "https://www.instagram.com/reel/C123abc456/"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "video" in data
        assert data["video"]["url"].startswith("http")
        assert len(data["video"]["availableFormats"]) >= 2


@pytest.mark.asyncio
async def test_extract_provider_unavailable_media():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post(
            "/api/v1/extract",
            json={"url": "https://www.instagram.com/reel/unavailable_video_123/"}
        )
        assert response.status_code == 404
        data = response.json()
        assert data["success"] is False
        assert data["error"]["code"] == "MEDIA_UNAVAILABLE"


@pytest.mark.asyncio
async def test_extract_provider_timeout():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post(
            "/api/v1/extract",
            json={"url": "https://www.instagram.com/reel/timeout_test_123/"}
        )
        assert response.status_code == 504
        data = response.json()
        assert data["success"] is False
        assert data["error"]["code"] == "PROVIDER_TIMEOUT"


@pytest.mark.asyncio
async def test_extract_provider_not_configured(monkeypatch):
    monkeypatch.setattr(settings, "EXTRACTION_PROVIDER", "none")
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post(
            "/api/v1/extract",
            json={"url": "https://www.instagram.com/reel/C123abc456/"}
        )
        assert response.status_code == 503
        data = response.json()
        assert data["success"] is False
        assert data["error"]["code"] == "PROVIDER_NOT_CONFIGURED"

