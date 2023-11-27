---
title: POST /identity/map
description: Map DII to raw UID2s and salt bucket IDs.
hide_table_of_contents: false
sidebar_position: 08
---

# POST /identity/map

Map multiple email addresses, phone numbers, or their respective hashes to their raw UID2s and salt bucket IDs.

Used by: This endpoint is used mainly by advertisers and data providers. For details, see [Advertiser/Data Provider Integration Guide](../guides/advertiser-dataprovider-guide.md).

## Batch Size and Request Parallelization Requirements

Here's what you need to know:

- The maximum request size is 1MB. 
- To map a large number of email addresses, phone numbers, or their respective hashes, send them in *sequential* batches with a maximum batch size of 5,000 items per batch.
- Unless you are using a private operator, do not send batches in parallel. In other words, use a single HTTP connection and map [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) consecutively.
- Be sure to store mappings of email addresses, phone numbers, or their respective hashes.<br/>Not storing mappings may increase processing time drastically when you have to map millions of emails addresses or phone numbers. Recalculating only those mappings that actually need to be updated, however, reduces the total processing time because only about 1/365th of raw UID2s need to be updated daily. See also [Advertiser/Data Provider Integration Guide](../guides/advertiser-dataprovider-guide.md) and [FAQs for Advertisers and Data Providers](../getting-started/gs-faqs.md#faqs-for-advertisers-and-data-providers).

## Request Format

`POST '{environment}/v2/identity/map'`

>IMPORTANT: You must encrypt all request using your secret. For details and Python script examples, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing environment: `https://operator-integ.uidapi.com`<br/>Production environment: `https://prod.uidapi.com`<br/>For a full list, including regional operators, see [Environments](../getting-started/gs-environments.md). |

>NOTE: The integration environment and the production environment require different [API keys](../ref-info/glossary-uid.md#gl-api-key).

###  Unencrypted JSON Body Parameters

>IMPORTANT: You must include only **one** of the following four conditional parameters as a key-value pair in the JSON body of the request when encrypting it.

| Body Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `email` | string array | Conditionally Required | The list of email addresses to be mapped. |
| `email_hash` | string array | Conditionally Required | The list of [Base64-encoded SHA-256](../getting-started/gs-normalization-encoding.md#email-address-hash-encoding) hashes of [normalized](../getting-started/gs-normalization-encoding.md#email-address-normalization) email addresses to be mapped. |
| `phone` | string array | Conditionally Required | The list of [normalized](../getting-started/gs-normalization-encoding.md#phone-number-normalization) phone numbers to be mapped. |
| `phone_hash` | string array | Conditionally Required | The list of [Base64-encoded SHA-256](../getting-started/gs-normalization-encoding.md#phone-number-hash-encoding) hashes of [normalized](../getting-started/gs-normalization-encoding.md#phone-number-normalization) phone numbers to be mapped. |

### Request Examples

The following are unencrypted JSON request body examples for each parameter, one of which you should include in your identity mapping requests:

```json
{
    "email":[
        "user@example.com",
        "user2@example.com"
    ]
}
```
```json
{
    "email_hash":[
        "eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=",
        "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ="
    ]
}
```
```json
{
    "phone":[
        "+1111111111",
        "+2222222222"
    ]
}
```
```json
{
    "phone_hash":[
        "eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=",
        "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ="
    ]
}
```

Here's an encrypted identity mapping request example for a phone number:

```sh
echo '{"phone": ["+1111111111", "+2222222222"]}' | python3 uid2_request.py https://prod.uidapi.com/v2/identity/map YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk= DELPabG/hsJsZk4Xm9Xr10Wb8qoKarg4ochUdY9e+Ow=
```

For details and Python script examples, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).

## Decrypted JSON Response Format

>NOTE: The responses are encrypted only if the HTTP status code is 200. Otherwise, the response is not encrypted.

A successful decrypted response returns the raw UID2s and salt bucket IDs for the specified email addresses, phone numbers, or their respective hashes.

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

If some identifiers are considered invalid, they are included in the response in an "unmapped" list. In this case, the response status is still "success". If all identifiers are mapped, the "unmapped" list is not included in the response.

```json
{
    "body":{
        "mapped": [
            {
                "identifier": "eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=",
                "advertising_id": "AdvIvSiaum0P5s3X/7X8h8sz+OhF2IG8DNbEnkWSbYM=",
                "bucket_id": "a30od4mNRd"
            }
        ],
        "unmapped": [
            {
                "identifier": "some@malformed@email@hash",
                "reason": "invalid identifier"
            }
        ]
    },
    "status":"success"
}
```

If some identifiers have opted out from the UID2 ecosystem, the opted-out identifiers are moved to the "unmapped" list along with any invalid identifiers found. In this case, the response status is still "success".

```json
{
    "body":{
        "mapped": [
            {
                "identifier": "eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=",
                "advertising_id": "AdvIvSiaum0P5s3X/7X8h8sz+OhF2IG8DNbEnkWSbYM=",
                "bucket_id": "a30od4mNRd"
            }
        ],
        "unmapped": [
            {
                "identifier": "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=",
                "reason": "optout"
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
| `bucket_id` | string | The ID of the salt bucket used to generate the raw UID2. |

### Response Status Codes

The following table lists the `status` property values and their HTTP status code equivalents.

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | The request was successful. The response will be encrypted. |
| `client_error` | 400 | The request had missing or invalid parameters.|
| `unauthorized` | 401 | The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested operation. |

If the `status` value is anything other than `success`, the `message` field provides additional information about the issue.
