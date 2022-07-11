[UID2 API Documentation](../../README.md) > v1 > Endpoints

# UID2 Endpoints

## Identity Tokens

| Endpoint                                       | Description                                                                                                               |
| :--------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| [GET /token/generate](./get-token-generate.md) | メールアドレス、電話番号、またはそれぞれのハッシュから UID2 Token を生成します。                                          |
| [GET /token/validate](./get-token-validate.md) | Advertising Token（UID2）が、指定されたメールアドレス、電話番号、またはそれぞれのハッシュと一致するかどうかを検証します。 |
| [GET /token/refresh](./get-token-refresh.md)   | [GET /token/generate](./get-token-generate.md) から返された Refresh Token から、ユーザーの新しいトークンを生成します。    |

## Identity Maps

| Endpoint                                           | Description                                                                                    |
| :------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| [GET /identity/buckets](./get-identity-buckets.md) | 最後に更新されたタイムスタンプを使用して、ローテーションされたソルトバケットを監視します。     |
| [GET /identity/map](./get-identity-map.md)         | メールアドレス、電話番号、それぞれのハッシュから UID2 とソルトバケット ID を取得します。       |
| [POST /identity/map](./post-identity-map.md)       | 複数のメールアドレスや電話番号、それぞれのハッシュから UID2 とソルトバケット ID を取得します。 |
