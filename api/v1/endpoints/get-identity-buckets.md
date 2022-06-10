[UID2 API Documentation](../../README.md) > [v1](../README.md) > [Endpoints](./README.md) > GET /identity/buckets

# GET /identity/buckets

Monitor rotated salt buckets. This endpoint is intended for use by [Advertisers/Data Providers](../guides/advertiser-dataprovider-guide.md).

## Request Format

```GET '{environment}/v1/identity/buckets?since_timestamp={queryParameterValue}'```

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing environment: `https://operator-integ.uidapi.com`<br/>Production environment: `https://prod.uidapi.com` |

### Query Parameters

| Query Parameter | Data Type | Attribute | Description | Format |
| :--- | :--- | :--- | :--- | :--- |
| `since_timestamp` | date-time or integer | Required | Specify the date and time to which to compare the last updated UTC timestamps of the buckets to be returned. | ISO 8601 format:<br/>`YYYY-MM-DDThh:mm:ss`<br/>Ensure that the parameter value is URL-encoded. |

### Request Example

```curl
curl -L -X GET 'https://operator-integ.uidapi.com/v1/identity/buckets?since_timestamp=2021-03-01T01%3A01%3A01' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

## Response Format

The response returns a list of salt bucket IDs and the timestamps of their last updates.

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
### Response Body Properties

| Property | Format | Description |
| :--- | :--- | :--- |
| `bucket_id` | string | The salt bucket ID. |
| `last_updated` | date-time | The UTC timestamp of the last time the bucket salt was rotated. |

### Response Status Codes

The following table lists the `status` property values and their HTTP status code equivalents.

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | The request was successful. |
| `client_error` | 400 | The request had missing or invalid parameters. For details on the issue, see the `message` property in the response.|
| `unauthorized` | 401 | The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested operation. |

If the `status` value is other than `success`, additional information about the issue is provided in the `message` field.
