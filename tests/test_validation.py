import pytest
from pydantic import ValidationError
from app.core.security import validate_instagram_url, is_safe_external_url
from app.api.schemas import ExtractRequest


def test_valid_instagram_urls():
    valid_urls = [
        "https://www.instagram.com/reel/C8k_example123/",
        "https://instagram.com/reel/XYZ987",
        "https://m.instagram.com/reel/abc_DEF-123/",
        "https://instagr.am/p/shortcode123/",
        "https://www.instagram.com/reels/C8k_example123/?utm_source=ig_web_copy_link",
    ]
    for url in valid_urls:
        normalized = validate_instagram_url(url)
        assert normalized.startswith("https://www.instagram.com/reel/")
        # Pydantic schema model validation
        req = ExtractRequest(url=url)
        assert req.url == normalized


def test_invalid_scheme():
    with pytest.raises(ValueError, match="Only secure HTTPS URLs are permitted"):
        validate_instagram_url("http://www.instagram.com/reel/C8k_example123/")


def test_unsupported_domains():
    invalid_domains = [
        "https://www.tiktok.com/@user/video/123456789",
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "https://fakeinstagram.com/reel/C8k_example123/",
        "https://evil-instagram.com/reel/C8k_example123/",
    ]
    for url in invalid_domains:
        with pytest.raises(ValueError, match="Unsupported domain"):
            validate_instagram_url(url)


def test_invalid_path():
    invalid_paths = [
        "https://www.instagram.com/explore/",
        "https://www.instagram.com/stories/user/123456/",
        "https://www.instagram.com/direct/t/123456/",
        "https://www.instagram.com/",
    ]
    for url in invalid_paths:
        with pytest.raises(ValueError, match="Invalid Instagram URL path"):
            validate_instagram_url(url)


def test_pydantic_empty_and_missing_url():
    with pytest.raises(ValidationError):
        ExtractRequest(url="")

    with pytest.raises(ValidationError):
        ExtractRequest.model_validate({})


def test_is_safe_external_url():
    # Safe public URLs
    assert is_safe_external_url("https://scontent.cdninstagram.com/v/t51.2885-15/video.mp4") is True
    assert is_safe_external_url("https://media.saveamedia.net/cdn/item123.mp4") is True

    # SSRF / Private network targets (must be blocked)
    assert is_safe_external_url("http://localhost:8000/private") is False
    assert is_safe_external_url("http://127.0.0.1:8000/secret") is False
    assert is_safe_external_url("http://169.254.169.254/latest/meta-data/") is False
    assert is_safe_external_url("http://192.168.1.1/admin") is False
    assert is_safe_external_url("http://10.0.0.1/internal") is False
    assert is_safe_external_url("http://metadata.google.internal") is False
    assert is_safe_external_url("file:///etc/passwd") is False
    assert is_safe_external_url("ftp://internal.server/file") is False

