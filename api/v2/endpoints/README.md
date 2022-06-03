[UID2 API Documentation](../../README.md) > [v2](../README.md) > Endpoints

# UID2 Endpoints

## Identity Tokens

| Endpoint | Description |
| :--- | :--- |
| [POST /token/generate](./post-token-generate.md) | Generate a UID2 token from an email address, phone number, or the respective hash. |
| [POST /token/validate](./post-token-validate.md) | Validate that an advertising token (UID2) matches the specified email address, phone number, or the respective hash. |
| [POST /token/refresh](./post-token-refresh.md) | Generate a new token for a user for their refresh token from the [POST /token/generate](./post-token-generate.md) response. |

## Identity Maps

| Endpoint | Description |
| :--- | :--- |
| [POST /identity/buckets](./post-identity-buckets.md) | Monitor rotated salt buckets uisng their last updated timestamp. |
| [POST /identity/map](./post-identity-map.md) | Retrieve UID2s and salt bucket IDs for multiple email addresses, phone numbers, or the respective hashes.  |

