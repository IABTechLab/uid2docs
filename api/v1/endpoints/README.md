[UID2 API Documentation](../../README.md) > v1 > Endpoints

# Endpoints

## Identity Tokens

| Endpoint | Description |
| --- | --- |
| [GET /token/generate](./get-token-generate.md) | Generate a UID2 token from an email address or hashed email address. |
| [GET /token/validate](./get-token-validate.md) | Validate that an advertising token matches the provided email or email hash. |
| [GET /token/refresh](./get-token-refresh.md) | Generate a new token for a user by specifying their refresh_token from GET /token/generate. |

## Identity Maps

| Endpoint | Description |
| --- | --- |
| [GET /identity/buckets](./get-identity-buckets.md) | Monitor for updated salt buckets. |
| [GET /identity/map](./get-identity-map.md) | Generate a UID2 identifier using one email address or hashed email address. |
| [POST /identity/map](./post-identity-map.md) | Generate multiple UID2 identifiers using email addresses or hashed email addresses.  |

