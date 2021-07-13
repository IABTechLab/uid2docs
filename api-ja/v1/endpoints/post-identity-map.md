[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > POST /identity/map

# POST /identity/map

複数のメールアドレスやメールアドレスハッシュのAdvertising IDやBucket IDを取得します。1回のリクエストで、最大10,000件の `email` または `email_hash` を組み合わせて送信できます。

このエンドポイントを使用するインテグレーションワークフロー:
* [Advertiser/Data Provider](../guides/advertiser-dataprovider-guide.md)

## Request

```POST '{environment}/{version}/identity/map'```

###  Request Properties

| Property | Data Type | Attributes | Description |
| --- | --- | --- | --- |
| `email` | `string` | 条件付きで必須 | ユーザーの[正規化されたEメールアドレス](../../README.md#emailnormalization)です。email_hash`がリクエストに含まれていない場合は必須です。 |
| `email_hash` | `string` | 条件付きで必要 | ユーザーの[正規化されたメールアドレス](../../README.md#emailnormalization)の[URL-encoded, base64-encoded SHA256 hash](../../README.md#encoding-email-hashes)です。リクエストに `email` が含まれていない場合は必須です。 |

同じリクエストで `email` と `email_hash` の両方が想定されている場合は、`email` のみがマッピングのレスポンスを返します。

#### Example Request Using an Email Address and an Email Hash

```sh
curl -L -X POST 'https://integ.uidapi.com/identity/map' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=' -H 'Content-Type: application/json' --data-raw '{
    "email":[
        "user@example.com"
    ],
    "email_hash":[
        "eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc="
    ]    
}'
```

## Response

レスポンスは、ユーザーのUID2識別子とバケット識別子を含むJSONオブジェクトです。

```json
{
    "body":{
        "mapped": [
            {
                "identifier": "user@example.com",
                "advertising_id": "AdvtiSuYWAZSYe8t4n6sQx0gshoHYZdOzg9qUn/eKgE=",
                "bucket_id": "bucketId"
            },
            {
                "identifier": "eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=",
                "advertising_id": "AdvIvSiaum0P5s3X/7X8h8sz+OhF2IG8DNbEnkWSbYM=",
                "bucket_id": "bucketId"
            }
        ]
    },
    "status":"success"
}
```

## Body Response Properties

| Property | Data Type | Description |
| --- | --- | --- |
| `body.mapped.identifier` | `string` | リクエストで提供された `email` または `email_hash` です。 |
| `body.mapped.advertising_id` | `string` | Identifierに対応する advertising ID (raw UID2). |
| `body.mapped.bucket_id` | `string` | ユーザーの `advertising_id` にたいううするバケットの識別子です。|
