import asyncio
import logging
from typing import Dict, Any, List
from app.services.base import (
    BaseExtractionProvider,
    MediaUnavailableError,
    ProviderTimeoutError,
    ProviderError,
)
from app.api.schemas import VideoData, VideoFormat, AuthorData

logger = logging.getLogger(__name__)


class YtDlpExtractionProvider(BaseExtractionProvider):
    """
    Real extraction provider using yt-dlp in metadata-only mode.
    Does NOT download or store media files on the server disk.
    Extracts direct public temporary streaming URLs from Instagram CDN.
    """

    def __init__(self, timeout_seconds: float = 12.0):
        self.timeout_seconds = timeout_seconds

    def _extract_sync(self, instagram_url: str) -> Dict[str, Any]:
        import yt_dlp

        ydl_opts = {
            "quiet": True,
            "no_warnings": True,
            "skip_download": True,  # CRUCIAL: Do not download video to disk
            "extract_flat": False,
            "socket_timeout": 8,
            "format": "bestvideo+bestaudio/best",
            # Standard browser user-agent to avoid immediate bot flags
            "http_headers": {
                "User-Agent": (
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/124.0.0.0 Safari/537.36"
                ),
                "Accept-Language": "en-US,en;q=0.9",
            },
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            return ydl.extract_info(instagram_url, download=False)

    async def extract(self, instagram_url: str) -> VideoData:
        logger.info(f"YtDlpExtractionProvider querying Instagram: {instagram_url}")

        try:
            # Run in thread pool so it does not block the async event loop
            info = await asyncio.wait_for(
                asyncio.to_thread(self._extract_sync, instagram_url),
                timeout=self.timeout_seconds,
            )
        except asyncio.TimeoutError:
            raise ProviderTimeoutError("Instagram media extraction timed out.")
        except Exception as exc:
            err_msg = str(exc)
            logger.warning(f"yt-dlp extraction failed for {instagram_url}: {err_msg}")

            if "Private video" in err_msg or "login" in err_msg.lower():
                raise MediaUnavailableError(
                    "This video is from a private account or requires authentication."
                )
            elif "404" in err_msg or "not found" in err_msg.lower():
                raise MediaUnavailableError("The requested Instagram Reel was not found.")
            elif "rate limit" in err_msg.lower() or "429" in err_msg:
                raise ProviderError(
                    code="INSTAGRAM_RATE_LIMITED",
                    message="Instagram is temporarily rate limiting queries from this region. Please retry shortly.",
                    status_code=429,
                )
            else:
                raise MediaUnavailableError(
                    "Unable to extract this video. It may be restricted, deleted, or private."
                )

        if not info:
            raise MediaUnavailableError("No media information found for this Reel.")

        shortcode = info.get("id") or "reel"
        media_url = info.get("url")
        thumbnail = info.get("thumbnail")
        title = info.get("title") or f"Instagram Reel ({shortcode})"
        duration = info.get("duration") or 15
        uploader = info.get("uploader") or info.get("uploader_id") or "instagram_creator"

        # Build available formats list
        available_formats: List[VideoFormat] = []
        formats = info.get("formats", [])

        # Filter video formats with direct playback URLs
        for fmt in formats:
            fmt_url = fmt.get("url")
            if not fmt_url:
                continue

            vcodec = fmt.get("vcodec", "none")
            ext = fmt.get("ext", "mp4")
            height = fmt.get("height")
            width = fmt.get("width")
            filesize = fmt.get("filesize") or fmt.get("filesize_approx")

            formatted_size = None
            if filesize:
                size_mb = round(filesize / (1024 * 1024), 1)
                formatted_size = f"{size_mb} MB"

            # Video streams
            if vcodec != "none" or ext == "mp4":
                resolution = f"{width}x{height}" if width and height else None
                quality_label = f"{height}p HD" if height else "MP4 Video"
                if height and height >= 1080:
                    quality_label = "1080p Full HD"

                available_formats.append(
                    VideoFormat(
                        id=f"fmt-{fmt.get('format_id', len(available_formats))}",
                        format_id=str(fmt.get("format_id")),
                        quality=quality_label,
                        resolution=resolution,
                        extension="mp4",
                        url=fmt_url,
                        formattedSize=formatted_size,
                        hasAudio=fmt.get("acodec") != "none",
                    )
                )

        # Fallback if formats list didn't yield items but top-level url exists
        if not available_formats and media_url:
            available_formats.append(
                VideoFormat(
                    id="fmt-main",
                    format_id="best",
                    quality="HD Video",
                    extension="mp4",
                    url=media_url,
                    hasAudio=True,
                )
            )

        # Top-level direct stream
        direct_url = media_url or (available_formats[0].url if available_formats else "")
        if not direct_url:
            raise MediaUnavailableError("Direct stream URL could not be resolved.")

        # Provide Audio-only option pointing to the stream
        available_formats.append(
            VideoFormat(
                id="fmt-audio",
                format_id="audio",
                quality="Audio Only (MP3)",
                extension="mp3",
                url=direct_url,
                formattedSize=None,
                hasAudio=True,
            )
        )

        return VideoData(
            id=shortcode,
            url=direct_url,
            thumbnail=thumbnail,
            title=title,
            durationSeconds=int(duration) if duration else 15,
            originalReelUrl=instagram_url,
            author=AuthorData(
                username=uploader,
                fullName=info.get("uploader"),
                isVerified=False,
            ),
            availableFormats=available_formats,
        )
