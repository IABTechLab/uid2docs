[UID2 Overview](../../../README-ja.md) > [Getting Started](../../README.md) > [v2](../README.md) > Endpoints

# UID2 Endpoints

すべての UID2 エンドポイントでは、API リクエストの暗号化([POST /token/refresh](./post-token-refresh.md) を除く)とレスポンスの復号化にクライアントシークレットが必要です。詳細と Python スクリプトの例は、[リクエストの暗号化とレスポンスの復号化](../encryption-decryption.md) を参照してください。

## Identity Tokens

| Endpoint                                         | Description                                                                                                                   | Request Encryption | Response Decryption |
| :----------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- | :----------------- | :------------------ |
| [POST /token/generate](./post-token-generate.md) | UID2 ベースのターゲティング広告にユーザーをオプトインし、提供されたメールアドレスまたは電話番号から UID2 Toekn を生成します。 | 必須               | 必須                |
| [POST /token/validate](./post-token-validate.md) | Advertising Token（UID2）が指定されたメールアドレス、電話番号、またはそれぞれのハッシュと一致するかどうかを検証します。       | 必須               | 必須                |
| [POST /token/refresh](./post-token-refresh.md)   | [POST /token/generate](./post-token-generate.md) レスポンスから、ユーザーの Refresh Token 用に新しいトークンを生成します。    | N/A                | 必須                |

## Identity Maps

| Endpoint                                             | Description                                                                                            | Request Encryption | Response Decryption |
| :--------------------------------------------------- | :----------------------------------------------------------------------------------------------------- | :----------------- | :------------------ |
| [POST /identity/buckets](./post-identity-buckets.md) | 最後に更新されたタイムスタンプを使用して、ローテーションされたソルトバケットを監視します。             | 必須               | 必須                |
| [POST /identity/map](./post-identity-map.md)         | 1 つ以上のメールアドレス、電話番号、またはそれぞれのハッシュの UID2 とソルトバケット ID を取得します。 | 必須               | 必須                |
