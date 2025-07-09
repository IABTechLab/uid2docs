---
title: POST /identity/map (v2)
description: Maps DII to raw UID2s and salt bucket IDs.
hide_table_of_contents: false
sidebar_position: 07
---

import Link from '@docusaurus/Link';

# POST /identity/map (v2)

Maps multiple email addresses, phone numbers, or their respective hashes to their raw UID2s and <Link href="../ref-info/glossary-uid#gl-salt-bucket-id">salt bucket IDs</Link>. You can also use this endpoint to check for updates to opt-out information.

Used by: This endpoint is used mainly by advertisers and data providers. For details, see [Advertiser/Data Provider Integration Overview](../guides/integration-advertiser-dataprovider-overview.md).

For details about the UID2 opt-out workflow and how users can opt out, see [User Opt-Out](../getting-started/gs-opt-out.md).

## Version

This documentation is for version 2 of this endpoint, which is not the latest version. For the latest version, v3, see [POST /identity/map](post-identity-map.md).

:::note
If you're using the v2 version, we recommend that you upgrade as soon as possible, to take advantage of improvements. For migration guidance, see [Migration from v2 Identity Map](post-identity-map.md#migration-from-v2-identity-map).
:::

## Batch Size and Request Parallelization Requirements

Here's what you need to know:

- The maximum request size is 1MB.
- To map a large number of email addresses, phone numbers, or their respective hashes, send them in *sequential* batches with a maximum batch size of 5,000 items per batch.
- Unless you are using a <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link>, do not send batches in parallel. In other words, use a single HTTP connection and send batches of hashed or unhashed <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> values consecutively, without creating multiple parallel connections.
- Be sure to store mappings of email addresses, phone numbers, or their respective hashes.<br/>Not storing mappings could increase processing time drastically when you have to map millions of email addresses or phone numbers. Recalculating only those mappings that actually need to be updated, however, reduces the total processing time because only about 1/365th of raw UID2s need to be updated daily. See also [Advertiser/Data Provider Integration Overview](../guides/integration-advertiser-dataprovider-overview.md) and [FAQs for Advertisers and Data Providers](../getting-started/gs-faqs.md#faqs-for-advertisers-and-data-providers).

## Request Format

`POST '{environment}/v2/identity/map'`

For authentication details, see [Authentication and Authorization](../getting-started/gs-auth.md).

:::important
You must encrypt all requests using your secret. For details, and code examples in different programming languages, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).
:::

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing (integration) environment: `https://operator-integ.uidapi.com`<br/>Production environment: The best choice depends on where your users are based. For information about how to choose the best URL for your use case, and a full list of valid base URLs, see [Environments](../getting-started/gs-environments.md). |

:::note
The integration environment and the production environment require different <Link href="../ref-info/glossary-uid#gl-api-key">API keys</Link>. For information about getting credentials for each environment, see [Getting Your Credentials](../getting-started/gs-credentials.md#getting-your-credentials).
:::

### Unencrypted JSON Body Parameters

:::important
You must include only **one** of the following four conditional parameters as a key-value pair in the JSON body of the request when encrypting it.
:::

| Body Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `email` | string array | Conditionally Required | The list of email addresses to be mapped. |
| `email_hash` | string array | Conditionally Required | The list of [Base64-encoded SHA-256](../getting-started/gs-normalization-encoding.md#email-address-hash-encoding) hashes of [normalized](../getting-started/gs-normalization-encoding.md#email-address-normalization) email addresses to be mapped. |
| `phone` | string array | Conditionally Required | The list of [normalized](../getting-started/gs-normalization-encoding.md#phone-number-normalization) phone numbers to be mapped. |
| `phone_hash` | string array | Conditionally Required | The list of [Base64-encoded SHA-256](../getting-started/gs-normalization-encoding.md#phone-number-hash-encoding) hashes of [normalized](../getting-started/gs-normalization-encoding.md#phone-number-normalization) phone numbers to be mapped. |

### Request Examples

The following are unencrypted JSON request body examples for each parameter, one of which you should include in your requests to the `POST /identity/map` endpoint:

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
        "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=",
        "KzsrnOhCq4tqbGFMsflgS7ig1QLRr0nFJrcrEIlOlbU="
    ]
}
```
```json
{
    "phone":[
        "+12345678901",
        "+441234567890"
    ]
}
```
```json
{
    "phone_hash":[
        "EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=",
        "Rx8SW4ZyKqbPypXmswDNuq0SPxStFXBTG/yvPns/2NQ="
    ]
}
```

Here's an encrypted request example to the `POST /identity/map` endpoint for a phone number:

```sh
echo '{"phone": ["+12345678901", "+441234567890"]}' | python3 uid2_request.py https://prod.uidapi.com/v2/identity/map [Your-Client-API-Key] [Your-Client-Secret]
```

For details, and code examples in different programming languages, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).

## Decrypted JSON Response Format

:::note
The response is encrypted only if the HTTP status code is 200. Otherwise, the response is not encrypted.
:::

A successful decrypted response returns the raw UID2s and salt bucket IDs for the specified email addresses, phone numbers, or their respective hashes.

```json
{
    "body":{
        "mapped": [
            {
                "identifier": "EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=",
                "advertising_id": "AdvIvSiaum0P5s3X/7X8h8sz+OhF2IG8DNbEnkWSbYM=",
                "bucket_id": "a30od4mNRd"
            },
            {
                "identifier": "Rx8SW4ZyKqbPypXmswDNuq0SPxStFXBTG/yvPns/2NQ=",
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
                "identifier": "EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=",
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
                "identifier": "EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=",
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

The response body includes the properties shown in the following table.

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
