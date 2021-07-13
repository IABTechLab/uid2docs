[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /identity/buckets

# GET /identity/buckets

ソルトバケットのローテーションをモニターします。2021年9月1日までは、ソルトバケットのローテーションはありません。2021年9月1日以降にローテーションが行われるまで、`body`は空の状態で戻ります。

このエンドポイントを使用するインテグレーションワークフロー:
* [Advertiser/Data Provider](../guides/advertiser-dataprovider-guide.md)

## Request

```GET '{environment}/{version}/identity/buckets?{queryParameter}={queryParameterValue}'```

###  Query Parameters

| Query Parameter | Data Type | Attributes | Description |
| --- | --- | --- | --- |
| `since_timestamp` | `date-time` or `integer` | 必須 | 指定された日時以降に最終更新されたUTCタイムスタンプを持つバケットを返します。<br>ISO 8601 の `date-time` フォーマット（`YYYY-MM-DDThh:mm:ss`）で時間を指定します。パラメータ値がURLエンコードされていることを確認してください。 |

#### Example Request

```curl
curl -L -X GET 'https://integ.uidapi.com/v1/identity/buckets?since_timestamp=2021-03-01T01%3A01%3A01' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

## Response

このエンドポイントは、``bucket_id``とその最終更新タイムスタンプのリストを返します。

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
| --- | --- | --- |
| `bucket_id` | `string` | タイムスタンプに関連するバケットID。 |
| `last_Updated` | `date-time` | バケットソルトが最後にローテーションされたときのUTCタイムスタンプ（ISO 8601形式）（`YYYY-MM-DDThh:mm:ss`）。 |
