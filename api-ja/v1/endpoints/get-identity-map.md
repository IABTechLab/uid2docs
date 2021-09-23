[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /identity/map

# GET /identity/map

メールアドレスまたはメールアドレスハッシュのUID2とソルトバケットIDを取得します。このエンドポイントは、[Advertisers/Data Providers](../guides/advertiser-dataprovider-guide.md)での使用を想定しています。

## Request Format

```
GET '{environment}/{version}/identity/map?{queryParameter}={queryParameterValue}'
```

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | 必須 | テスト環境: `https://integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com` |
| `{version}` | string | 必須 | 現在のAPIのバージョンは `v1` です。 |

###  Query Parameters

| Query Parameter | Data Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `email` | `string` | 条件付きで必須 | マップする [正規化](../../README.md#email-normalization) されたメールアドレス。 |
| `email_hash` | `string` | 条件付きで必要 | [正規化](../../README.md#email-normalization)されたメールアドレスの[URLエンコード、base64エンコードされたSHA256](../../README.md#emailnormalization)ハッシュ。|

#### Request Examples

メールアドレスのマッピングリクエスト:

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/identity/map?email=username@example.com' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

メールアドレスハッシュのマッピングリクエスト:

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/identity/map?email_hash=eVvLS%2FVg%2BYZ6%2Bz3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc%3D' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

## Response Format

レスポンスは、指定されたメールアドレスまたはハッシュのUID2とソルトバケットのIDです。

```json
{
    "body": {
            "identifier": "username@example.com",
            "advertising_id": "AdvtiSuYWAZSYe8t4n6sQx0gshoHYZdOzg9qUn/eKgE=",
            "bucket_id": "bucketId"
        },
    "status":"success"
}
```

## Body Response Properties

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `identifier` | `string` | リクエストのクエリパラメーターで指定されたメールアドレスまたはメールアドレスハッシュ。|
| `advertising_id` | `string` | 対応するのAdvertising ID（raw UID2）。 |
| `bucket_id` | `string` | UID2の生成に使用したソルトバケットのID。 |

レスポンスのステータス値については、[Response Structure and Status Codes](../../../api-ja/README.md#response-structure-and-status-codes)を参照してください。
