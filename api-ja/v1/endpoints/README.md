[UID2 API Documentation](../../README.md) > v1 > Endpoints

# UID2 Endpoints

## Identity Tokens

| Endpoint | Description |
| :--- | :--- |
| [GET /token/generate](./get-token-generate.md) | メールアドレスまたはメールアドレスハッシュからUID2 Tokenを生成します。 |
| [GET /token/validate](./get-token-validate.md) | Advertising Tokenが、指定したメールアドレスまたはメールアドレスハッシュと一致するかどうかを検証します。 |
| [GET /token/refresh](./get-token-refresh.md) | GET /token/generateから返されたrefresh_tokenを指定して、ユーザーの新しいトークンを生成します。 |

## Identity Maps

| Endpoint | Description |
| --- | --- |
| [GET /identity/buckets](./get-identity-buckets.md) | ローテーションされたソルトバケットの最終更新タイムスタンプを監視します。 |
| [GET /identity/map](./get-identity-map.md) | メールアドレスまたはメールアドレスハッシュのUID2とソルトバケットIDを取得します。 |
| [POST /identity/map](./post-identity-map.md) | 複数のメールアドレスまたはメールアドレスハッシュのUID2とソルトバケットIDを取得します。 |
