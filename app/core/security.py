import re
import ipaddress
from urllib.parse import urlparse
from typing import Optional

# Allowlisted Instagram domain names
ALLOWED_INSTAGRAM_HOSTS = {
    "instagram.com",
    "www.instagram.com",
    "m.instagram.com",
    "instagr.am",
}

# Regex to validate Instagram Reel or Post paths: e.g. /reel/C123_abc/, /reels/C123_abc/, /p/C123_abc/
INSTAGRAM_MEDIA_PATH_REGEX = re.compile(
    r"^/(reel|reels|p)/([A-Za-z0-9_-]+)/?$"
)


def validate_instagram_url(url: str) -> str:
    """
    Strictly validates an Instagram URL:
    1. Must use HTTPS.
    2. Hostname must be in ALLOWED_INSTAGRAM_HOSTS.
    3. Path must conform to Instagram reel or post format.
    4. Strips query parameters or tracking tags for clean processing.
    """
    if not url or not isinstance(url, str):
        raise ValueError("URL must be a non-empty string.")

    cleaned_url = url.strip()
    try:
        parsed = urlparse(cleaned_url)
    except Exception:
        raise ValueError("Malformed URL.")

    # 1. Scheme check: only HTTPS allowed
    if parsed.scheme.lower() != "https":
        raise ValueError("Only secure HTTPS URLs are permitted.")

    # 2. Hostname check
    hostname = (parsed.hostname or "").lower()
    if not hostname:
        raise ValueError("Missing hostname in URL.")

    if hostname not in ALLOWED_INSTAGRAM_HOSTS:
        raise ValueError(
            f"Unsupported domain '{hostname}'. Only official Instagram URLs are permitted."
        )

    # 3. Path check
    match = INSTAGRAM_MEDIA_PATH_REGEX.match(parsed.path)
    if not match:
        raise ValueError(
            "Invalid Instagram URL path. Must be a reel or post link (e.g. https://www.instagram.com/reel/CODE/)."
        )

    # Return canonical clean URL without tracking query parameters
    media_type = match.group(1)
    shortcode = match.group(2)
    # Normalize to standard /reel/ format
    normalized_path = f"/reel/{shortcode}/"
    return f"https://www.instagram.com{normalized_path}"


def is_safe_external_url(url: str) -> bool:
    """
    SSRF Protection: Validates an outgoing URL to ensure it is not targeting
    internal/private network ranges (localhost, loopback, link-local, RFC 1918, RFC 6598).
    """
    if not url or not isinstance(url, str):
        return False

    try:
        parsed = urlparse(url.strip())
    except Exception:
        return False

    if parsed.scheme.lower() not in ("http", "https"):
        # Allow relative paths served by same-origin application (e.g. /samples/...)
        if url.strip().startswith("/"):
            return True
        return False

    hostname = (parsed.hostname or "").lower()
    if not hostname:
        return False

    # Block common local domain names
    if hostname in ("localhost", "127.0.0.1", "::1", "metadata.google.internal"):
        return False

    # Check for IP address literals
    try:
        ip = ipaddress.ip_address(hostname)
        if (
            ip.is_private
            or ip.is_loopback
            or ip.is_link_local
            or ip.is_reserved
            or ip.is_multicast
        ):
            return False
    except ValueError:
        # Hostname is a domain name, not an IP literal
        pass

    return True

