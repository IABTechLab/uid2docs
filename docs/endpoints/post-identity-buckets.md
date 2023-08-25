---
title: POST /identity/buckets
description: Monitor rotated salt buckets.
hide_table_of_contents: false
sidebar_position: 07
---

# POST /identity/buckets

Monitor rotated salt buckets.

Used by: This endpoint is used mainly by advertisers and data providers. For details, see [Advertiser/Data Provider Integration Guide](../guides/advertiser-dataprovider-guide.md).

## Request Format

`POST '{environment}/v2/identity/buckets'`

>IMPORTANT: You must encrypt all request using your secret. For details and Python script examples, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing environment: `https://operator-integ.uidapi.com`<br/>Production environment: `https://prod.uidapi.com`<br/>For a full list, including regional operators, see [Environments](../getting-started/gs-environments.md). |

>NOTE: The integration environment and the production environment require different [API keys](../ref-info/glossary-uid.md#gl-api-key).

### Unencrypted JSON Body Parameters

>IMPORTANT: You must include the following parameter as a key-value pair in the JSON body of a request when encrypting it.

| Body Parameter | Data Type | Attribute | Description | Format |
| :--- | :--- | :--- | :--- | :--- |
| `since_timestamp` | date-time or integer | Required | Specify the date and time to which to compare the last updated UTC timestamps of the buckets to be returned. | ISO 8601 format:<br/>`YYYY-MM-DDThh:mm:ss` |

### Request Examples

The following is an unencrypted JSON request body example, which you should include in your identity bucket rotation requests:

```json
{
    "since_timestamp": "2022-06-01T13:00:00"
}
```
Here's an encrypted identity bucket rotation request example:

```sh
echo '{"since_timestamp": "2023-04-19T13:00:00"}' | python3 uid2_request.py https://prod.uidapi.com/v2/identity/buckets [Your-Client-API-Key] [Your-Client-Secret]
```

For details and Python script examples, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).

## Decrypted JSON Response Format

>NOTE: The responses are encrypted only if the HTTP status code is 200. Otherwise, the response is not encrypted.

A successful decrypted response returns a list of salt bucket IDs and the timestamps of their last updates.

```json
{
    "body":[
        {
            "bucket_id": "a30od4mNRd",
            "last_updated": "2022-06-05T22:52:03.109"
        },
        {
            "bucket_id": "aJ0jMvw9Z8",
            "last_updated": "2022-06-06T22:52:01.828"
        },
        {
            "bucket_id": "aeRQ9L7wRN",
            "last_updated": "2022-06-01T22:52:02.574"
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
| `success` | 200 | The request was successful. The response will be encrypted. |
| `client_error` | 400 | The request had missing or invalid parameters. |
| `unauthorized` | 401 | The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested operation. |

If the `status` value is anything other than `success`, the `message` field provides additional information about the issue.
