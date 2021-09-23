[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /identity/map

# GET /identity/map

Retrieve the UID2 and salt bucket ID for an email address or an email address hash. This endpoint is intended for use by [Advertisers/Data Providers](../guides/advertiser-dataprovider-guide.md).


## Request Format

```GET '{environment}/{version}/identity/map?{queryParameter}={queryParameterValue}'```

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing environment: `https://integ.uidapi.com`<br/>Production environment: `https://prod.uidapi.com` |
| `{version}` | string | Required | The current API version is `v1`. |

###  Query Parameters

* Only one of the following two query parameters is required. 
* If both parameters are included in a request, only the `email` will return a response.

| Query Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `email` | string | Conditionally Required | The email address to be mapped. |
| `email_hash` | string | Conditionally Required | The [URL-encoded, base64-encoded SHA256](../../README.md#email-address-hash-encoding) hash of the [normalized](../../README.md#email-address-normalization) email address. |


### Request Examples

A mapping request for an email address:

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/identity/map?email=username@example.com' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```
A mapping request for an email address hash:

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/identity/map?email_hash=eVvLS%2FVg%2BYZ6%2Bz3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc%3D' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

## Response Format

The response returns the UID2 and salt bucket ID for the specified email address or hash.

```json
{
    "body": {
            "identifier": "username@example.com",
            "advertising_id": "AdvtiSuYWAZSYe8t4n6sQx0gshoHYZdOzg9qUn/eKgE=",
            "bucket_id": "a30od4mNRd"
        },
    "status":"success"
}
```

### Response Body Properties

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `identifier` | string | The email address or email address hash specified in the request query parameter. |
| `advertising_id` | string | The corresponding advertising ID (raw UID2). |
| `bucket_id` | string | The ID of the salt bucket used to generate the UID2. |

For response status values, see [Response Structure and Status Codes](../../../api/README.md#response-structure-and-status-codes).

