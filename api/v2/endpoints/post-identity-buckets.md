[UID2 API Documentation](../../README.md) > [v2](../README.md) > [Endpoints](./README.md) > POST /identity/buckets

# POST /identity/buckets

Monitor rotated salt buckets. This endpoint is intended for use by [Advertisers/Data Providers](../guides/advertiser-dataprovider-guide.md).

>NOTE: No salt buckets will be rotated until January 12, 2022. Any requests prior to January 12, 2022, will return an empty response body.


## Request Format

```POST '{environment}/{version}/identity/buckets'```

>IMPORTANT: You must encrypt your request using your secret. For details and Python script examples, see [Generating Encrypted Requests and Decrypting Responses](../encryption-decryption.md).

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing environment: `https://integ.uidapi.com`<br/>Production environment: `https://prod.uidapi.com` |
| `{version}` | string | Required | The current API version is `v2`. |

### Unencrypted JSON Body Parameters

>IMPORTANT: You must include the following parameter as a key-value pair in the JSON body of a request when encrypting it.

| Body Parameter | Data Type | Attribute | Description | Format |
| :--- | :--- | :--- | :--- | :--- |
| `since_timestamp` | date-time or integer | Required | Specify the date and time to which to compare the last updated UTC timestamps of the buckets to be returned. | ISO 8601 format:<br/>`YYYY-MM-DDThh:mm:ss` |

### Request Examples

The following is an unencrypted JSON request body example, which you should include in your token generation requests:

```json
{
    "since_timestamp": "2021-03-01T01%3A01%3A01"
}
```
Here's an encrypted token generation request format with placeholder values:

```sh
encrypt_request.py <Your-Secret> "{<Unencrypted-JSON-Request-Body>}"
  | curl -X POST https://prod.uidapi.com/v2/identity/buckets -H 'Authorization: Bearer <Your-Token>'
  | decrypt_response.py <Your-Secret>
```

>IMPORTANT: Be sure to add escape backslashes before quotes inside the JSON body.
>
Here's an encrypted token generation request example:

```sh
encrypt_request.py DELPabG/hsJsZk4Xm9Xr10Wb8qoKarg4ochUdY9e+Ow= "{\"since_timestamp\": \"2021-03-01T01%3A01%3A01\"}"
  | curl -X POST https://prod.uidapi.com/v2/identity/buckets -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
  | decrypt_response.py DELPabG/hsJsZk4Xm9Xr10Wb8qoKarg4ochUdY9e+Ow=
```
For details and Python script examples, see [Generating Encrypted Requests and Decrypting Responses](../encryption-decryption.md).

## Decrypted JSON Response Format

The decrypted response returns a list of salt bucket IDs and the timestamps of their last updates.

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
| `success` | 200 | The request was successful.|
| `optout` | 200 | The user opted out. This status is returned only for authorized requests. |
| `client_error` | 400 | The request had missing or invalid parameters. For details on the issue, see the `message` property in the response.|
| `invalid_token` | 400 | The request had an invalid identity token specified. This status is returned only for authorized requests. |
| `unauthorized` | 401 | The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested operation. |

For response structure, see [Response Structure and Status Codes](../README.md#response-structure-and-status-codes).
