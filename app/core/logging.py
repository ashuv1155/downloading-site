import logging
import sys
from typing import Optional
from contextvars import ContextVar

# ContextVar to maintain request correlation IDs across async task boundaries
request_id_ctx: ContextVar[Optional[str]] = ContextVar("request_id", default=None)


class StructuredLogFormatter(logging.Formatter):
    """
    Formatter that injects request correlation ID into every log record.
    """
    def format(self, record: logging.LogRecord) -> str:
        req_id = request_id_ctx.get()
        record.request_id = req_id if req_id else "-"
        return super().format(record)


def setup_logging(log_level: str = "INFO") -> None:
    root_logger = logging.getLogger()
    root_logger.setLevel(log_level.upper())

    # Avoid duplicate handlers if setup is called multiple times
    if not root_logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        log_format = "%(asctime)s [%(levelname)s] [req_id=%(request_id)s] %(name)s: %(message)s"
        handler.setFormatter(StructuredLogFormatter(log_format))
        root_logger.addHandler(handler)
    else:
        for handler in root_logger.handlers:
            log_format = "%(asctime)s [%(levelname)s] [req_id=%(request_id)s] %(name)s: %(message)s"
            handler.setFormatter(StructuredLogFormatter(log_format))

