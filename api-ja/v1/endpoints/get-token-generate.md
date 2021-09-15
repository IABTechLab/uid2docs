[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /token/generate

# GET /token/generate

メールアドレスまたはメールアドレスハッシュからUID2 Tokenを生成します。

>重要：UID2 Tokenは、認証後にサーバー側でのみ生成する必要があります。セキュリティ上、ブラウザ側でトークンを生成することはできません。

このエンドポイントを使用するインテグレーションワークフロー:
* [Publisher - Standard](../guides/publisher-client-side.md)
* [Publisher - Custom](../guides/custom-publisher-integration.md)

## Request Format

```
GET '{environment}/{version}/token/generate?{queryParameter}={queryParameterValue}'
```

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | 必須 | テスト環境: `https://integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com` |
| `{version}` | string | 必須 | 現在のAPIのバージョンは `v1` です。 |

###  Query Parameters

* 以下の2つのクエリパラメータのうち、どちらか一方のみが必要です。
* 両方のパラメータがリクエストに含まれている場合は、`email`のみがレスポンスを返します。

| Query Parameter | Data Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `email` | `string` | 条件付きで必須 | マップする[正規化](../../README.md#email-normalization)されたメールアドレス。 |
| `email_hash` | `string` | 条件付きで必要 | [正規化](../../README.md#email-normalization)されたメールアドレスの[URLエンコード、base64エンコードされたSHA256](../../README.md#emailnormalization)ハッシュ。|

#### Request Examples

メールアドレスのトークン生成リクエスト:

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/generate?email=username@example.com' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

メールアドレスハッシュのトークン生成リクエスト:

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/generate?email_hash=eVvLS%2FVg%2BYZ6%2Bz3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc%3D' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

## Response Format

レスポンスは、指定されたメールアドレスまたはメールアドレスハッシュに対するユーザーのAdvertising TokenとRefresh Tokenです。

```json
{
    "body": {
        "advertising_token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b/besPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM+ewMzXXM8G9j8Q=",
        "refresh_token": "RefreshToken2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq/90PYmajV0IPrvo51Biqh7/M+JOuhfBY8KGUn//GsmZr9nf+jIWMUO4diOA92kCTF69JdP71Ooo+yF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA=="
    },
    "status": "success"
}
```

## Response Body Properties

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `advertising_token` | `string` | ユーザーの暗号化されたAdvertising Token（UID2 Token）。  |
| `refresh_token` | `string` | UID2 サービスと最新の ID Tokenのセットを交換できる暗号化されたトークン。 |

レスポンスのステータス値については、[Response Structure and Status Codes](../../../api-ja/README.md#response-structure-and-status-codes)を参照してください。

### Test Email Addresses

| Email Address | Purpose | Next Endpoint |
| --- | --- | --- |
| `validate@email.com` | キャッシュした `advertising_token` が、指定した `email` の `advertising_token` と一致するかどうかをテストします。| [GET /token/validate](./get-token-validate.md) |
| `optout@email.com` | このメールをリクエストに使用すると、常に `refresh_token` を使用した ID レスポンスが生成され、その結果、ログアウトのレスポンスが得られます。 | [GET /token/refresh](./get-token-refresh.md) |
