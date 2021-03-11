[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /identity/buckets

# GET /identity/buckets

Monitor for rotated salt buckets. No salt buckets will be rotated until September 1, 2021. The `body` will return empty until rotations on September 1, 2021 or after.

Integration workflows that use this endpoint:
* [Advertiser/Data Provider](../guides/advertiser-dataprovider-guide.md)

## Request 

```GET '{environment}/{version}/identity/buckets?{queryParameter}={queryParameterValue}'```

###  Query Parameters

| Query Parameter | Data Type | Attributes | Description |
| --- | --- | --- | --- |
| `since_timestamp` | `date-time` or `integer` | Required | Return buckets with last updated UTC timestamps after the specified date and time.<br>Specify the the time in ISO 8601 `date-time` format (`YYYY-MM-DDThh:mm:ss`). Ensure the parameter value is URL encoded. |

#### Example Request

```curl
curl -L -X GET 'https://integ.uidapi.com/v1/identity/buckets?since_timestamp=2021-03-01T01%3A01%3A01' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

## Response

The endpoint returns a list of ```bucket_id``` and their last updated timestamps.

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
| `bucket_id` | `string` | The bucket_id associated to the timestamp. |
| `last_Updated` | `date-time` | The UTC timestamp of the last time the bucket salt was rotated in ISO 8601 format (`YYYY-MM-DDThh:mm:ss`) |