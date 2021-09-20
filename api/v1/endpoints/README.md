[UID2 API Documentation](../../README.md) > v1 > Endpoints

# UID2 Endpoints

## Identity Tokens

| Endpoint | Description |
| :--- | :--- |
| [GET /token/generate](./get-token-generate.md) | Generate a UID2 token from an email address or email address hash. |
| [GET /token/validate](./get-token-validate.md) | Validate that an advertising token (UID2) matches the specified email address or email address hash. |
| [GET /token/refresh](./get-token-refresh.md) | Generate a new token for a user for their refresh token from the [GET /token/generate](./get-token-generate.md) response. |

## Identity Maps

| Endpoint | Description |
| :--- | :--- |
| [GET /identity/buckets](./get-identity-buckets.md) | Monitor rotated salt buckets uisng their last updated timestamp. |
| [GET /identity/map](./get-identity-map.md) | Retrieve the UID2 and salt bucket ID for an email address or an email address hash. |
| [POST /identity/map](./post-identity-map.md) | Retrieve UID2s and salt bucket IDs for multiple email addresses or email address hashes.  |

