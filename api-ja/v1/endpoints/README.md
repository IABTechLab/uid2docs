[UID2 API Documentation](../../README.md) > v1 > Endpoints

# UID2 v1 Endpoints (Deprecated)

> IMPORTANT: UID2 API v1 は非推奨となり、2023 年 3 月 31 日までにすべての v1 SDK ファイルとエンドポイント、v0 SDK ファイル、およびバージョン管理されていないエンドポイントが削除され、現在のユーザーのみがサポートされるようになります。2023 年 3 月 31 日までに、必ず UID2 API v2(../v2/upgrade-guide.md) へのアップグレードをお願いします。初めてフレームワークに触れる方は、[UID2 API v2](../v2/README.md) をご利用ください。

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
