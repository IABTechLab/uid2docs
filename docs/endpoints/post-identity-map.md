---
title: POST /identity/map
description: Maps DII to raw UID2s.
hide_table_of_contents: false
sidebar_position: 08
displayed_sidebar: docs 
---

import Link from '@docusaurus/Link';

# POST /identity/map

Maps multiple email addresses, phone numbers, or their respective hashes to their raw UID2s. You can also use this endpoint to check for updates to opt-out information, check when a raw UID2 can be refreshed, or view the previous UID2 if the current UID2 is less than 90 days old.

Used by: This endpoint is used mainly by advertisers and data providers. For details, see [Advertiser/Data Provider Integration Overview](../guides/integration-advertiser-dataprovider-overview.md).

For details about the UID2 opt-out workflow and how users can opt out, see [User Opt-Out](../getting-started/gs-opt-out.md).

## Version

This documentation is for the latest version of this endpoint, version 3.

If needed, documentation is also available for the previous version: see [POST /identity/map (v2)](post-identity-map-v2.md).

## Batch Size and Request Parallelization Requirements

Here's what you need to know:

- The maximum request size is 1MB.
- To map a large number of email addresses, phone numbers, or their respective hashes, send them in *sequential* batches with a maximum batch size of 5,000 items per batch.
- Unless you are using a <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link>, do not send batches in parallel. In other words, use a single HTTP connection and send batches of hashed or unhashed <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> values consecutively, without creating multiple parallel connections.
- Be sure to store mappings of email addresses, phone numbers, or their respective hashes.<br/>Not storing mappings could increase processing time drastically when you have to map millions of email addresses or phone numbers. Recalculating only those mappings that actually need to be updated, however, reduces the total processing time because only about 1/365th of UID2s need to be updated daily. See also [Advertiser/Data Provider Integration Overview](../guides/integration-advertiser-dataprovider-overview.md) and [FAQs for Advertisers and Data Providers](../getting-started/gs-faqs.md#faqs-for-advertisers-and-data-providers).

## Request Format

`POST '{environment}/v3/identity/map'`

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
Include one or more of the following four parameters as key-value pairs in the JSON body of the request when encrypting it.
:::

| Body Parameter | Data Type                   | Attribute              | Description |
|:---------------|:----------------------------|:-----------------------| :--- |
| `email`        | string array | Conditionally Required | The list of email addresses to be mapped. |
| `email_hash`   | string array | Conditionally Required | The list of [Base64-encoded SHA-256](../getting-started/gs-normalization-encoding.md#email-address-hash-encoding) hashes of [normalized](../getting-started/gs-normalization-encoding.md#email-address-normalization) email addresses to be mapped. |
| `phone`        | string array | Conditionally Required | The list of [normalized](../getting-started/gs-normalization-encoding.md#phone-number-normalization) phone numbers to be mapped. |
| `phone_hash`   | string array | Conditionally Required | The list of [Base64-encoded SHA-256](../getting-started/gs-normalization-encoding.md#phone-number-hash-encoding) hashes of [normalized](../getting-started/gs-normalization-encoding.md#phone-number-normalization) phone numbers to be mapped. |


### Request Examples

The following are unencrypted JSON request body examples to the `POST /identity/map` endpoint:

```json
{
    "email":[
        "user@example.com",
        "user2@example.com"
    ],
    "phone":[
        "+12345678901",
        "+441234567890"
    ]
}
```

```json
{
    "email_hash":[
        "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=",
        "KzsrnOhCq4tqbGFMsflgS7ig1QLRr0nFJrcrEIlOlbU="
    ],
    "phone_hash":[
        "EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=",
        "Rx8SW4ZyKqbPypXmswDNuq0SPxStFXBTG/yvPns/2NQ="
    ]
}
```

Here's an encrypted request example to the `POST /identity/map` endpoint for phone numbers:

```sh
echo '{"phone": ["+12345678901", "+441234567890"]}' | python3 uid2_request.py https://prod.uidapi.com/v3/identity/map [YOUR_CLIENT_API_KEY] [YOUR_CLIENT_SECRET]
```

For details, and code examples in different programming languages, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).

## Decrypted JSON Response Format

:::note
The response is encrypted only if the HTTP status code is 200. Otherwise, the response is not encrypted.
:::

A successful decrypted response returns the current raw UID2s, previous raw UID2s, and refresh timestamps for the specified email addresses, phone numbers, or their respective hashes. 

The response arrays preserve the order of input arrays. Each element in the response array maps directly to the element at the same index in the corresponding request array. This ensures that you can reliably associate results with their corresponding inputs based on array position.

Input values that cannot be mapped to a raw UID2 are mapped to an error object with the reason for unsuccessful mapping. An unsuccessful mapping occurs if the DII is invalid or has been opted out from the UID2 ecosystem. In these cases, the response status is `success` but no raw UID2 is returned.

The following example shows the input and corresponding response.

Input:

```json
{
    "email": [
        "user@example.com",      // Corresponding UID2 rotated in the last 90 days
        "user2@example.com",     // Corresponding UID2 rotated more than 90 days ago
        "invalid email string",  // Invalid identifier
        "optout@example.com"     // DII is opted out
    ]
}
```

Response:

```json
{
    "body":{
        "email": [
            {
                "u": "AdvIvSiaum0P5s3X/7X8h8sz+OhF2IG8DNbEnkWSbYM=",
                "p": "EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=",
                "r": 1735689600000
            },
            {
                "u": "IbW4n6LIvtDj/8fCESlU0QG9K/fH63UdcTkJpAG8fIQ=",
                "p": null,
                "r": 1735862400000
            },
            { "e": "invalid identifier" },
            { "e": "optout" }
        ],
      "email_hash": [],
      "phone": [],
      "phone_hash": []
    },
    "status": "success"
}
```

### Response Body Properties

The response body includes one or more of the properties shown in the following table.

| Body Parameter | Data Type                   | Description                                                                                     |
|:---------------|:----------------------------|:------------------------------------------------------------------------------------------------|
| `email`        | array of mapped DII objects | The list of mapped DII objects corresponding to the list of emails in the request.              |
| `email_hash`   | array of mapped DII objects  | The list of mapped DII objects corresponding to the list of email hashes in the request.        |
| `phone`        | array of mapped DII objects | The list of mapped DII objects corresponding to the list of phone numbers in the request.       |
| `phone_hash`   | array of mapped DII objects | The list of mapped DII objects corresponding to the list of phone number hashes in the request. |


For successfully mapped DII, the mapped object includes the properties shown in the following table.

| Property | Data Type  | Description                                                                                                                           |
|:---------|:-----------|:--------------------------------------------------------------------------------------------------------------------------------------|
| `u`      | string     | The raw UID2 corresponding to the email or phone number provided in the request.                                                                     |
| `p`      | string     | One of the following:<ul><li>If the current raw UID2 has been rotated in the last 90 days: the previous value.</li><li>If the current raw UID2 is older than 90 days: `Null`.</li></ul> |
| `r`      | number     | The Unix timestamp (in milliseconds) that indicates when the raw UID2 might be refreshed. The raw UID2 is guaranteed to be valid until this timestamp. |

For unsuccessfully mapped input values, the mapped object includes the properties shown in the following table.

| Property | Data Type | Description                                                                                                      |
|:---------|:----------|:-----------------------------------------------------------------------------------------------------------------|
| `e`      | string    | The reason for being unable to map the DII to a raw UID2. One of two possible values:<ul><li>`optout`</li><li>`invalid identifier`</li></ul> |

### Response Status Codes

The following table lists the `status` property values and their HTTP status code equivalents.

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | The request was successful. The response will be encrypted. |
| `client_error` | 400 | The request had missing or invalid parameters. |
| `unauthorized` | 401 | The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested operation. |

If the `status` value is anything other than `success`, the `message` field provides additional information about the issue.

## Migration from v2 Identity Map

The following sections provide general information and guidance for migrating to version 3 from earlier versions, including:

- [Version 3 Improvements](#version-3-improvements)
- [Key Differences Between v2 and v3](#key-differences-between-v2-and-v3)
- [Required Changes](#required-changes)
- [Additional Resources](#additional-resources)

### Version 3 Improvements

The v3 Identity Map API provides the following improvements over v2:

- **Simplified Refresh Management**: You can monitor for UID2s reaching `refresh_from` timestamps instead of polling <Link href="../ref-info/glossary-uid#gl-salt-bucket-id">salt buckets</Link> for rotation.
- **Previous UID2 Access**: You have access to previous raw UID2s for 90 days after rotation for campaign measurement.
- **Single Endpoint**: You use only one endpoint, `/v3/identity/map`, instead of both `/v2/identity/map` and `/v2/identity/buckets`.
- **Multiple Identity Types in One Request**: You can process both emails and phone numbers in a single request.
- **Improved Performance**: The updated version uses significantly less bandwidth to process the same amount of DII.

### Key Differences Between v2 and v3

The following table shows key differences between the versions.

| Feature                        | V2 Implementation                           | V3 Implementation                          |
|:-------------------------------|:--------------------------------------------|:-------------------------------------------|
| Endpoints Required         | `/v2/identity/map` + `/v2/identity/buckets` | `/v3/identity/map` only                    |
| Identity Types per Request | Single identity type only                   | Multiple identity types                    |
| Refresh Management         | Monitor salt bucket rotations via `/identity/buckets` endpoint              | Re-map when past `refresh_from` timestamps |
| Previous UID2 Access       | Not available                               | Available for 90 days        |

### Required Changes

To upgrade from an earlier version to version 3, follow these steps:

1. [Update Endpoint URL](#1-update-endpoint-url)
2. [Update V3 Response Parsing Logic](#2-update-v3-response-parsing-logic)
3. [Replace Salt Bucket Monitoring with Refresh Timestamp Logic](#3-replace-salt-bucket-monitoring-with-refresh-timestamp-logic)

#### 1. Update Endpoint URL

Update any reference to the endpoint URL so that it references the /v3/ implementation, as shown in the following example.

```python
# Before (v2)
url = '/v2/identity/map'

# After (v3) 
url = '/v3/identity/map'
```

#### 2. Update v3 Response Parsing Logic

Update the logic for parsing the response, as shown in the following example.

V2 Response Parsing:
```python
# v2: Process mapped/unmapped objects with identifier lookup
for item in response['body']['mapped']:
    raw_uid = item['advertising_id']
    bucket_id = item['bucket_id']
    original_identifier = item['identifier']
    # Store mapping using identifier as key
    store_mapping(original_identifier, raw_uid, bucket_id)
```

V3 Response Parsing:
```python
# v3: Process array-indexed responses
for index, item in enumerate(response['body']['email']):
    original_email = request_emails[index]  # Use array index to correlate
    if 'u' in item:
        # Successfully mapped
        current_uid = item['u']
        previous_uid = item.get('p')  # Available for 90 days after rotation, otherwise None
        refresh_from = item['r']
        store_mapping(original_email, current_uid, previous_uid, refresh_from)
    elif 'e' in item:
        # Handle unmapped with reason
        handle_unmapped(original_email, item['e'])
```

#### 3. Replace Salt Bucket Monitoring with Refresh Timestamp Logic

Update your code for salt bucket monitoring, replacing it with code that checks the `refresh_from` timestamp to determine raw UID2s that are due for refresh.

The following example shows an implementation of the v3 approach for checking refresh timestamps:

```python
import time

def is_refresh_needed(mapping):
    now = int(time.time() * 1000)  # Convert to milliseconds
    return now >= mapping['refresh_from']

# Check individual mappings for refresh needs
to_remap = [mapping for mapping in mappings if is_refresh_needed(mapping)]
remap_identities(to_remap)
```

### Additional Resources
- [SDK for Java](../sdks/sdk-ref-java.md) for Java implementations (see Usage for Advertisers/Data Providers section)

<!-- For SDK-specific migration guidance, see:
- [SDK for Python](../sdks/sdk-ref-python.md) for Python implementations -->

<!-- GWH 7/7 Commenting out the above until the SDK docs are available. -->

For general information about identity mapping, see [Advertiser/Data Provider Integration Overview](../guides/integration-advertiser-dataprovider-overview.md).
