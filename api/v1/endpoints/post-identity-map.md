[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > POST /identity/map

# POST /identity/map

Retrieve advertising and bucket IDs for multiple email addresses or email hashes. Send a maximum of 10,000 combined `email` or `email_hash` per request.

Integration workflows that use this endpoint:
* [Advertiser/Data Provider](../guides/advertiser-dataprovider-guide.md)

## Request 

```POST '{environment}/{version}/identity/map'```

###  Request Properties

| Property | Data Type | Attributes | Description |
| --- | --- | --- | --- |
| `email` | `string` | Conditionally Required | The [normalized email address](../../README.md##email-normalization) of a user. Required when `email_hash` is not included in the request. |
| `email_hash` | `string` | Conditionally Required | The [base64-encoded SHA256 hash](../../README.md#encoding-email-hashes) of the [normalized email address](../../README.md##email-normalization) of a user. Required when `email` is not included in the request. |

If `email` and `email_hash` are both supposed in the same request, only the `email` will return a mapping response.

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

The response is a JSON object containing the user's UID2 identifier and bucket identifier.

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
| --- | --- | --- |
| `body.mapped.identifier` | `string` | The `email` or `email_hash` provided in the request. |
| `body.mapped.advertising_id` | `string` | The identity's advertising ID (raw UID2). |
| `body.mapped.bucket_id` | `string` | The identifier of the bucket used for salting the user's `advertising_id`. |