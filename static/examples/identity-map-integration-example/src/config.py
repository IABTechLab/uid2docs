import os
import sys
from dataclasses import dataclass

from dotenv import load_dotenv


@dataclass
class Config:
    uid_base_url: str
    uid_api_key: str
    uid_secret_key: str


def load_config() -> Config:
    load_dotenv(override=True)  # Override existing environment variables

    uid_base_url = os.getenv("UID2_BASE_URL")
    uid_api_key = os.getenv("UID2_API_KEY")
    uid_secret_key = os.getenv("UID2_SECRET_KEY")

    missing: list[str] = []
    if not uid_base_url:
        missing.append("UID2_BASE_URL")
    if not uid_api_key:
        missing.append("UID2_API_KEY")
    if not uid_secret_key:
        missing.append("UID2_SECRET_KEY")

    if missing:
        print(f"Error: Missing required environment variables: {missing}")
        sys.exit(1)

    # At this point, we know all values are not None due to the validation above
    assert uid_base_url is not None
    assert uid_api_key is not None
    assert uid_secret_key is not None

    return Config(uid_base_url, uid_api_key, uid_secret_key)
