import time
import urllib.error

from uid2_client import IdentityMapV3Client, IdentityMapV3Input, IdentityMapV3Response


class UIDClientWrapper:
    """Wrapper for UID2 client that handles retries"""

    def __init__(self, base_url: str, api_key: str, secret_key: str) -> None:
        self.client = IdentityMapV3Client(base_url, api_key, secret_key)

    def identity_map(self, uid_input: IdentityMapV3Input) -> IdentityMapV3Response:
        retry_delays = [1, 2, 4, 8, 16]  # exponential backoff
        max_retries = len(retry_delays)

        # HTTP status codes that should be retried (transient errors)
        retryable_status_codes: set[int] = {
            429,  # Too Many Requests (rate limiting)
            500,  # Internal Server Error
            502,  # Bad Gateway
            503,  # Service Unavailable
            504,  # Gateway Timeout
        }

        for attempt in range(max_retries + 1):
            try:
                return self.client.generate_identity_map(uid_input)

            except urllib.error.HTTPError as http_error:
                if attempt == max_retries:
                    print(
                        f"HTTP {http_error.code} error failed after {max_retries} retries: {http_error}"
                    )
                    raise

                if http_error.code in retryable_status_codes:
                    print(
                        f"HTTP {http_error.code} error on attempt {attempt + 1}, retrying in {retry_delays[attempt]}s: {http_error}"
                    )
                    time.sleep(retry_delays[attempt])
                    continue

                print(f"Non-retryable HTTP {http_error.code} error: {http_error}")
                raise

            except Exception as e:
                print(f"Error: {e}")
                raise

        # This line should never be reached, but included for type safety
        raise RuntimeError("Unexpected exit from retry loop")
