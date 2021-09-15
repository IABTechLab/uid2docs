[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /identity/buckets

# GET /identity/buckets

ローテーションしたソルトバケットを監視します。このエンドポイントは、[Advertisers/Data Providers](../guides/advertiser-dataprovider-guide.md)による利用を想定しています。

>Note: 2021年9月1日までは、ソルトバケットのローテーションは行われません。2021年9月1日より前のリクエストは、空のレスポンスボディを返します。

## Request Format

```GET '{environment}/{version}/identity/buckets?{queryParameter}={queryParameterValue}'```

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | 必須| テスト環境: `https://integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com` |
| `{version}` | string | 必須 | 現在のAPIのバージョンは `v1` です。 |

###  Query Parameters

| Query Parameter | Data Type | Attributes | Description | Format |
| :--- | :--- | :--- | :--- | :--- |
| `since_timestamp` | `date-time` or `integer` | 必須 | 返すべきバケットの最終更新日のUTCタイムスタンプと比較する日時を指定します。| ISO 8601形式:<br/>`YYYY-MM-DDThh:mm:ss`<br/>パラメータ値がURLエンコードされていることを確認してください。 |

#### Request Example

```curl
curl -L -X GET 'https://integ.uidapi.com/v1/identity/buckets?since_timestamp=2021-03-01T01%3A01%3A01' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

## Response Format

レスポンスは、ソルトバケットのIDと最終更新のタイムスタンプのリストを返します。

```json
{
    "body":[
        {
            "bucket_id":"a3pPl64opk",
            "last_updated":"2021-03-01T00:00:00"
        },
        {
            "bucket_id":"aENdq9K3VQ",
            "last_updated":"2021-03-01T00:00:00"
        },
        {
            "bucket_id":"adVEM9ywVo",
            "last_updated":"2021-03-01T00:00:00"
        }
    ],
    "status":"success"
}
```

| Property | Format | Description |
| :--- | :--- | :--- |
| `bucket_id` | `string` | ソルトバケットのID。 |
| `last_Updated` | `date-time` | バケットのソルトが最後にローテーションされたときのUTCタイムスタンプ。|

レスポンスのステータス値については、[Response Structure and Status Codes](../../../api-ja/README.md#response-structure-and-status-codes)を参照してください。
