[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /identity/map

# GET /identity/map

Retrieve advertising and bucket IDs for one `email` or `email_hash`. 

Integration workflows that use this endpoint:
* [Advertiser/Data Provider](../guides/advertiser-dataprovider-guide.md)

## Request 

```GET '{environment}/{version}/identity/map?{queryParameter}={queryParameterValue}'```

###  Query Parameters

| Query Parameter | Data Type | Attributes | Description |
| --- | --- | --- | --- |
| `email` | `string` | Conditionally Required | The [normalized email address](../../README.md##email-normalization) of a user. Required when `email_hash` is not included in the request. |
| `email_hash` | `string` | Conditionally Required | The [URL-encoded, base64-encoded SHA256 hash](../../README.md#encoding-email-hashes) of the [normalized email address](../../README.md##email-normalization) of a user. Required when `email` is not included in the request. |

If `email` and `email_hash` are both supposed in the same request, only the `email` will return a mapping response.

#### Example Request Using an Email Address

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/identity/map?email=username@example.com' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

#### Example Request Using an Email Hash

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/identity/map?email_hash=eVvLS%2FVg%2BYZ6%2Bz3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc%3D' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

## Response

The response is a JSON object containing the user's UID2 identifier and bucket identifier.

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
| `body.identifier` | `string` | The `email` or `email_hash` provided in the request. |
| `body.advertising_id` | `string` | The identity's advertising ID (raw UID2). |
| `body.bucket_id` | `string` | The identifier of the bucket used for salting the user's `advertising_id`. |