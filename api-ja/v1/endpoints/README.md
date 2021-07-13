[UID2 API Documentation](../../README.md) > v1 > Endpoints

# Endpoints

## Identity Tokens

| Endpoint | Description |
| --- | --- |
| [GET /token/generate](./get-token-generate.md) | メールアドレスまたはハッシュ化されたメールアドレスからUID2トークンを生成します。 |
| [GET /token/validate](./get-token-validate.md) | Advertising Tokenが、指定したメールアドレスまたはメールアドレスハッシュのものと一致するかどうかを検証します。 |
| [GET /token/refresh](./get-token-refresh.md) | GET /token/generateから返されたrefresh_tokenを指定して、ユーザーの新しいトークンを生成します。 |

> Note
> UID2 Tokenは、UID2をAdvertising Tokenと記載することがあります。

## Identity Maps

| Endpoint | Description |
| --- | --- |
| [GET /identity/buckets](./get-identity-buckets.md) | ソルトバケットの更新をモニターします。 |
| [GET /identity/map](./get-identity-map.md) | Generate a UID2 identifier using one email address or hashed email address. |
| [POST /identity/map](./post-identity-map.md) | Generate multiple UID2 identifiers using email addresses or hashed email addresses.  |
