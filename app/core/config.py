from typing import List
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore"
    )

    # Service & Server
    PROJECT_NAME: str = "SaveAMedia Backend"
    VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    PORT: int = Field(default=8000, alias="PORT")
    HOST: str = "0.0.0.0"
    LOG_LEVEL: str = "INFO"

    # CORS & Security
    ALLOWED_ORIGINS: str = "*"  # Comma-separated list or "*"
    MAX_REQUEST_BODY_BYTES: int = 65536  # 64 KB limit for JSON payloads
    REQUEST_TIMEOUT_SECONDS: float = 10.0
    RATE_LIMIT_PER_MINUTE: int = 60

    # Provider Configuration
    EXTRACTION_PROVIDER: str = "mock"  # "mock", "none", or future custom provider
    PROVIDER_API_KEY: str = ""
    PROVIDER_API_URL: str = ""

    @property
    def cors_origins(self) -> List[str]:
        if self.ALLOWED_ORIGINS.strip() == "*":
            return ["*"]
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",") if origin.strip()]


settings = Settings()

