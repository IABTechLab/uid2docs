[UID2 Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /identity/map

# GET /identity/map

Retrieve advertising and bucket IDs for one `email` or `email_hash`.

## Request 

```GET '{environment}/{version}/identity/map?{queryParameter}={queryParameterValue}'```

###  Query Parameters

| Query Parameter | Data Type | Attributes | Description |
| --- | --- | --- | --- |
| `email` | `string` | Conditionally Required | The normalized email address of a user. Required when `email_hash` is not included in the request. |
| `email_hash` | `string` | Conditionally Required | The SHA256 hash of the normalized email address of a user. Required when `email` is not included in the request. |

#### Example Request Using an Email Address

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/identity/map?email=username@example.com' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

#### Example Request Using an Email Hash

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/identity/map?email_hash=795BCB4BF560F9867AFB3DE2D0D3A94976324007C45EA099EC14E90231540547' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

## Response

The response is a JSON object containing the user's UID2 identifier and bucket identifier.

```json
{
    "mapped": [
        {
            "identifier": "user@example.com",
            "advertising_id": "AdvtiSuYWAZSYe8t4n6sQx0gshoHYZdOzg9qUn/eKgE=",
            "bucket_id": "bucketId"
        }
    ]
}
```

## Body Response Properties

| Property | Data Type | Description |
| --- | --- | --- |
| `mapped.identifier` | `string` | The `email` or `email_hash` provided in the request. |
| `mapped.advertising_id` | `string` | The identity's advertising ID. |
| `mapped.bucket_id` | `string` | Bucket Id corresponding to that User identifier. |