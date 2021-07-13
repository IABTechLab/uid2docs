[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /token/validate

# GET /token/validate

Advertising Tokenが、指定されたメールアドレスまたはメールアドレスハッシュと一致するかどうかを検証します。これは主に新しいインテグレーションのテストとトラブルシューティングのために使用され、パブリッシャーのワークフローの主要なステップではありません。

このエンドポイントで受け付けられるメールアドレスまたはメールアドレスハッシュは `validate@email.com` のみです。

## Request

```GET '{environment}/{version}/token/validate?{queryParameter1}={queryParameterValue1}&{queryParameter2}={queryParameterValue2}'```

###  Query Parameters

| Query Parameter | Data Type | Attributes | Description |
| --- | --- | --- | --- |
| `token` | `string` | ? | [GET /token/generate](./get-token-generate.md)で取得した `advertising_token` です。 |
| `email` | `string` | 条件付きで必須 | ユーザーの正規化されたメールアドレスです。`email_hash`がリクエストに含まれていない場合は必須です。 |
| `email_hash` | `string` | 条件付きで必須 | ユーザーの正規化されたメールアドレスを[SHA256ハッシュし、base64エンコード、URLエンコード](../../README.md#encoding-email-hashes)したものを指定します。リクエストに `email` が含まれていない場合は必須です。 |

#### Example Request Using an Email Address

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/validate?token=AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b/besPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM+ewMzXXM8G9j8Q=&email=username@example.com' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

#### Example Request Using an Email Hash

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/validate?token=AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b/besPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM+ewMzXXM8G9j8Q=&email_hash=eVvLS%2FVg%2BYZ6%2Bz3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc%3D' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

## Response

レスポンスは、JSONオブジェクトです。

```json
{
    "body": true,
    "status": "success"
}
```

## Body Response Properties

| Property | Data Type | Description |
| --- | --- | --- |
| `body` | `boolean` | 値が `true`の値は、リクエストで指定された `email` または `email_hash` が、`advertising_token` の作成に使用された `email` または `email_hash` と同じであることを示します。<br>値が `false` の場合は、無効な `token` であるか、リクエストで指定された `email` または `email_hash` が `advertising_token` の作成に使用された `email` または `email_hash` と同じではないことを示します。 |
