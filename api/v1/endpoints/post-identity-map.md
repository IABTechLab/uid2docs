[UID2 API Documentation](../../README.md) > [v1](../README.md) > [Endpoints](./README.md) > POST /identity/map

# POST /identity/map

Map multiple email addresses, phone numbers, or respective hashes to their UID2s and salt bucket IDs. This endpoint is intended for use by [Advertisers/Data Providers](../guides/advertiser-dataprovider-guide.md).

Here's what you need to know:
- The maximum request size is 1MB. 
- To map a large number of email addresses, phone numbers, or respective hashes, send them in *sequential* batches with a maximum batch size of 5,000 items per batch.
- Do not send batches in parallel.


## Request Format

```POST '{environment}/v1/identity/map'```

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing environment: `https://operator-integ.uidapi.com`<br/>Production environment: `https://prod.uidapi.com` |

###  Request Body Parameters

You must include only one of the following four parameters. 

| Body Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `email` | string array | Conditionally Required | The list of email addresses to be mapped. |
| `email_hash` | string array | Conditionally Required | The list of [base64-encoded SHA256](../README.md#email-address-hash-encoding) hashes of [normalized](../README.md#email-address-normalization) email addresses. |
| `phone` | string array | Conditionally Required | The list of [normalized](../README.md#phone-number-normalization) phone numbers to be mapped. |
| `phone_hash` | string array | Conditionally Required | The list of [base64-encoded SHA256](../README.md#phone-number-hash-encoding) hashes of  [normalized](../README.md#phone-number-normalization) phone numbers. |


### Request Examples

A mapping request for email addresses:

```sh
curl -L -X POST 'https://operator-integ.uidapi.com/v1/identity/map' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=' -H 'Content-Type: application/json' --data-raw '{
    "email":[
        "user@example.com",
        "user2@example.com"
    ]  
}'
```
A mapping request for email address hashes:

```sh
curl -L -X POST 'https://operator-integ.uidapi.com/v1/identity/map' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=' -H 'Content-Type: application/json' --data-raw '{
    "email_hash":[
        "eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=",
        "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ="
    ]    
}'
```

A mapping request for phone numbers:

```sh
curl -L -X POST 'https://operator-integ.uidapi.com/v1/identity/map' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=' -H 'Content-Type: application/json' --data-raw '{
    "phone":[
        "+1111111111",
        "+2222222222"
    ]  
}'
```
A mapping request for phone number hashes:

```sh
curl -L -X POST 'https://operator-integ.uidapi.com/v1/identity/map' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=' -H 'Content-Type: application/json' --data-raw '{
    "phone_hash":[
        "eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=",
        "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ="
    ]    
}'
```

## Response Format

The response returns the UID2s and salt bucket IDs for the specified email addresses, phone numbers, or respective hashes.

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
| `identifier` | string | The email address, phone number, or respective hash specified in the request body. |
| `advertising_id` | string | The corresponding advertising ID (raw UID2). |
| `bucket_id` | string | The ID of the salt bucket used to generate the UID2. |

### Response Status Codes

The following table lists the `status` property values and their HTTP status code equivalents.

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | The request was successful. |
| `client_error` | 400 | The request had missing or invalid parameters. For details on the issue, see the `message` property in the response.|
| `unauthorized` | 401 | The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested operation. |

If the `status` value is other than `success`, the `message` field provides additional information about the issue.
