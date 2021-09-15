[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > POST /identity/map

# POST /identity/map

複数のメールアドレスやメールアドレスハッシュのUID2とソルトバケットIDを取得します。1回のリクエストで、最大10,000件の `email` または `email_hash` を組み合わせて送信します。

このエンドポイントを使用するインテグレーションワークフロー:
* [Advertiser/Data Provider](../guides/advertiser-dataprovider-guide.md)

## Request

```
POST '{environment}/{version}/identity/map'
```

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | 必須 | テスト環境: `https://integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com` |
| `{version}` | string | 必須 | 現在のAPIのバージョンは `v1` です。 |

###  Request Properties

* 以下の2つのプロパティのうち、どちらか一方のみが必要です。
* 両方のプロパティがリクエストに含まれている場合は、`email`のみがレスポンスを返します。

| Property | Data Type | Attributes | Description |
| :--- | :--- | :--- | :--- |
| `email` | `string` | 条件付きで必須 | マップする[正規化](../../README.md#email-normalization)されたメールアドレス。 |
| `email_hash` | `string` | 条件付きで必要 | [正規化](../../README.md#email-normalization)されたメールアドレスの[URLエンコード、base64エンコードされたSHA256](../../README.md#encoding-email-hashes)ハッシュ。 |

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
| :--- | :--- | :--- |
| `identifier` | `string` | リクエストのクエリパラメーターで指定されたメールアドレスまたはメールアドレスハッシュ。|
| `advertising_id` | `string` | 対応するのAdvertising ID（raw UID2）。 |
| `bucket_id` | `string` | UID2の生成に使用したソルトバケットのID。 |
