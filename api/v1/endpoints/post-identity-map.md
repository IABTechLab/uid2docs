[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > POST /identity/map

# POST /identity/map

Map multiple email addresses or email hashes to their UID2s and salt bucket IDs. This endpoint is intended for use by [Advertisers/Data Providers](../guides/advertiser-dataprovider-guide.md).

Here's what you need to know:
- The maximum request size is 1MB. 
- To map a large number of email addresses or email hashes, send them in *sequential* batches with a maximum batch size of 5,000 emails or hashes per batch.
- Do not send batches in parallel.


## Request Format

```POST '{environment}/{version}/identity/map'```

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing environment: `https://integ.uidapi.com`<br/>Production environment: `https://prod.uidapi.com` |
| `{version}` | string | Required | The current API version is `v1`. |

###  Request Body Parameters

You must include only one of the following two parameters. 

| Query Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `email` | string array | Conditionally Required | The list of email addresses to be mapped. |
| `email_hash` | string array | Conditionally Required | The list of [base64-encoded SHA256](../../README.md#email-address-hash-encoding) hashes of the [normalized](../../README.md#email-address-normalization) email addresses. |


### Request Examples

A mapping request for email addresses:

```sh
curl -L -X POST 'https://integ.uidapi.com/identity/map' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=' -H 'Content-Type: application/json' --data-raw '{
    "email":[
        "user@example.com",
        "user2@example.com"
    ]  
}'
```
A mapping request for email address hashes:

```sh
curl -L -X POST 'https://integ.uidapi.com/identity/map' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=' -H 'Content-Type: application/json' --data-raw '{
    "email_hash":[
        "eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=",
        "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ="
    ]    
}'
```
## Response Format

The response returns the UID2s and salt bucket IDs for the specified email addresses or hashes.

```json
{
    "body":{
        "mapped": [
            {
                "identifier": "eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=",
                "advertising_id": "AdvIvSiaum0P5s3X/7X8h8sz+OhF2IG8DNbEnkWSbYM=",
                "bucket_id": "a30od4mNRd"
            },
            {
                "identifier": "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=",
                "advertising_id": "IbW4n6LIvtDj/8fCESlU0QG9K/fH63UdcTkJpAG8fIQ=",
                "bucket_id": "ad1ANEmVZ"
            }
        ]
    },
    "status":"success"
}
```

### Response Body Properties

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `identifier` | string | The email address or email address hash specified in the request body. |
| `advertising_id` | string | The corresponding advertising ID (raw UID2). |
| `bucket_id` | string | The ID of the salt bucket used to generate the UID2. |

For response status values, see [Response Structure and Status Codes](../../../api/README.md#response-structure-and-status-codes).
