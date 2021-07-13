[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /identity/map

# GET /identity/map

`email` や `email_hash` のAdvertising IDやBucket ID を取得します。

このエンドポイントを使用するインテグレーションワークフロー:
* [Advertiser/Data Provider](../guides/advertiser-dataprovider-guide.md)

## Request

```GET '{environment}/{version}/identity/map?{queryParameter}={queryParameterValue}'```

###  Query Parameters

| Query Parameter | Data Type | Attributes | Description |
| --- | --- | --- | --- |
| `email` | `string` | 条件付きで必須 | ユーザーの[正規化されたEメールアドレス](../../README.md#emailnormalization)です。email_hash`がリクエストに含まれていない場合は必須です。 |
| `email_hash` | `string` | 条件付きで必要 | ユーザーの[正規化されたメールアドレス](../../README.md#emailnormalization)の[URL-encoded, base64-encoded SHA256 hash](../../README.md#encoding-email-hashes)です。リクエストに `email` が含まれていない場合は必須です。 |

同じリクエストで `email` と `email_hash` の両方が設定されている場合は、`email` のみがマッピングのレスポンスを返します。

#### Example Request Using an Email Address

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/identity/map?email=username@example.com' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

#### Example Request Using an Email Hash

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/identity/map?email_hash=eVvLS%2FVg%2BYZ6%2Bz3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc%3D' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

## Response

レスポンスは、ユーザーのUID2識別子とバケット識別子を含むJSONオブジェクトです。

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
| --- | --- | --- |
| `body.identifier` | `string` | リクエストで提供された `email` または `email_hash` です。|
| `body.advertising_id` | `string` | 対応するのAdvertising ID（raw UID2）です |
| `body.bucket_id` | `string` | ユーザーの `advertising_id` のソルト化に使用するバケットの識別子です。 |
