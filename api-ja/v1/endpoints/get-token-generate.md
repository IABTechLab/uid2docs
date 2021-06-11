[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /token/generate

# GET /token/generate

メールアドレスまたはハッシュ化されたメールアドレスからUID2 Tokenを生成します。

このエンドポイントを使用するインテグレーションワークフロー:
* [Publisher - Standard](../guides/publisher-client-side.md)
* [Publisher - Custom](../guides/custom-publisher-integration.md)

## Request

```GET '{environment}/{version}/token/generate?{queryParameter}={queryParameterValue}'```

###  Query Parameters

| Query Parameter | Data Type | Attributes | Description |
| --- | --- | --- | --- |
| `email` | `string` | 条件付きで必須 | ユーザーの[正規化されたEメールアドレス](../../README.md#emailnormalization)です。email_hash`がリクエストに含まれていない場合は必須です。 |
| `email_hash` | `string` | 条件付きで必要 | ユーザーの[正規化されたメールアドレス](../../README.md#emailnormalization)の[URL-encoded, base64-encoded SHA256 hash](../../README.md#encoding-email-hashes)です。リクエストに `email` が含まれていない場合は必須です。 |

同じリクエストで `email` と `email_hash` の両方が指定された場合は、`email` のみがマッピングのレスポンスを返します。

#### Example Request Using an Email Address

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/generate?email=username@example.com' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

#### Example Request Using an Email Hash

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/generate?email_hash=eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

### Test Email Addresses

| Email Address | Purpose | Next Endpoint |
| --- | --- | --- |
| `validate@email.com` | キャッシュした `advertising_token` が、指定した `email` の `advertising_token` と一致するかどうかをテストします。| [GET /token/validate](./get-token-validate.md) |
| `optout@email.com` | このメールをリクエストに使用すると、常に `refresh_token` を使用した ID レスポンスが生成され、その結果、ログアウトのレスポンスが得られます。 | [GET /token/refresh](./get-token-refresh.md) |

## Response

レスポンスは、ユーザーのAdvertising IDおよびリフレッシュトークンを含むJSONオブジェクトです。


```json
{
    "body": {
        "advertising_token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b/besPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM+ewMzXXM8G9j8Q=",
        "refresh_token": "RefreshToken2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq/90PYmajV0IPrvo51Biqh7/M+JOuhfBY8KGUn//GsmZr9nf+jIWMUO4diOA92kCTF69JdP71Ooo+yF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA=="
    },
    "status": "success"
}
```

## Body Response Properties

| Property | Data Type | Description |
| --- | --- | --- |
| `advertising_token` | `string` | 広告用の暗号化されたトークン。 別名 UID Token |
| `refresh_token` | `string` | Unified ID 2.0 サービスと最新の ID トークンのセットを交換できる暗号化されたトークンです。 |
