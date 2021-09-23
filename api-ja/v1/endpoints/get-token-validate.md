[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /token/validate

# GET /token/validate

Advertising Tokenが、指定されたメールアドレスまたはメールアドレスハッシュに一致するかどうかを検証します。

>Note: このエンドポイントは、主に新しいインテグレーションのテストとトラブルシューティングを目的としています。

## Request Format

```
GET '{environment}/{version}/token/validate?{queryParameter1}={queryParameterValue1}&{queryParameter2}={queryParameterValue2}'
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
| `token` | `string` | 必須 | [GET /token/generate](./get-token-generate.md)レスポンスで返されるAdvertising Token（UID2 Token）。 |
| `email` | `string` | 条件付きで必須 | マップする[正規化](../../README.md#email-normalization)されたメールアドレス。 |
| `email_hash` | `string` | 条件付きで必要 | [正規化](../../README.md#email-normalization)されたメールアドレスの[URLエンコード、base64エンコードされたSHA256](../../README.md#emailnormalization)ハッシュ。|

#### Request Examples

メールアドレスの検証要求:

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/validate?token=AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D&email=validate@email.com' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

メールアドレスハッシュの検証要求:

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/validate?token=AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D&email_hash=eVvLS%2FVg%2BYZ6%2Bz3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc%3D' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

## Response

レスポンスには、指定したAdvertising Tokenの検証状況を示す論理値が返されます。

```json
{
    "body": true,
    "status": "success"
}
```

## Body Response Properties

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `body` | `boolean` | 値が `true`の値は、リクエストで指定された メールアドレスまたはメールアドレスハッシュがが、Advertising Tokenの作成に使用された使用されたものと同じであることを示します。<br/><br/>値が `false` の場合は、以下のいずれかを示します。<br/>- リクエストに無効なAdvertising Tokenが含まれている。<br/>- リクエストで指定されたメールアドレスまたはメールアドレスハッシュが、Advertising Tokenの生成に使用されたものと異なるか、テスト用のメール `validate@email.com` のものではない。 |

レスポンスのステータス値については、[Response Structure and Status Codes](../../../api-ja/README.md#response-structure-and-status-codes)を参照してください。
