[UID2 Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /identity/buckets

# GET /identity/buckets

Monitor for rotated salt buckets. 

Integration workflows that use this endpoint:
* [Advertiser/Data Provider](../guides/advertiser-dataprovider-guide.md)

## Request 

```GET '{environment}/{version}/identity/buckets?{queryParameter}={queryParameterValue}'```

###  Query Parameters

| Query Parameter | Data Type | Attributes | Description |
| --- | --- | --- | --- |
| `since_timestamp` | `date-time` or `integer` | Required | Return buckets with last updated UTC timestamps after the specified date and time.<br>Specify the the time in ISO 8601 `date-time` format (`YYYY-MM-DDThh:mm:ss`) or as an `integer` using Unix time. If using ISO 8601 format, URL encode the parameter value. |

#### Example Request

```curl
curl -L -X GET 'https://integ.uidapi.com/v1/identity/buckets?since_timestamp=2021-03-01T11%3A11%3A11' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

## Response

The endpoint returns a list of ```bucket_id``` and their last updated timestamps.

```json
[
    {
        "{bucket_id}" : "{last_update_timestamp}"
    }
]
```

| Property | Format | Description |
| --- | --- | --- |
| `{bucket_id}` | `string` | The bucket_id associated to the timestamp. |
| `{last_update_timestamp}` | `date-time` | The UTC timestamp of the last time the bucket salt was rotated in ISO 8601 format (`YYYY-MM-DDThh:mm:ss`) |