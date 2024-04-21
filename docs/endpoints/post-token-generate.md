---
title: POST /token/generate
description: Generate a UID2 token (advertising token) from DII. 
hide_table_of_contents: false
sidebar_position: 02
---

import Link from '@docusaurus/Link';

# POST /token/generate
Requests a UID2 token generated from the <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> (email address or phone number) provided by a user with their authorization for UID2-based targeted advertising. If the DII is valid, and the user has not opted out of UID2, this operation returns a UID2 token and associated values.

Used by: This endpoint is used mainly by publishers.

>IMPORTANT: Be sure to call this endpoint only when you have obtained legal basis to convert the user’s DII to UID2 tokens for targeted advertising. The `optout_check` parameter, required with a value of `1`, checks whether the user has opted out.

>NOTE: Rather than calling this endpoint directly, you could use one of the UID2 SDKs to manage it for you. For a summary of options, see [SDKs: Summary](../sdks/summary-sdks.md).

## Request Format 

`POST '{environment}/v2/token/generate'`

Here's what you need to know about this endpoint requests:
- To ensure that the API key used to access the service remains secret, UID2 tokens must be generated only on the server side after authentication. 
- You must encrypt all requests using your secret. For details, and code examples in different programming languages, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing (integration) environment: `https://operator-integ.uidapi.com`<br/>Production environment: `https://prod.uidapi.com`<br/>For a full list, including regional operators, see [Environments](../getting-started/gs-environments.md).<br/>Notes:<ul><li>The `integ` environment and the `prod` environment require different <Link href="../ref-info/glossary-uid#gl-api-key">API keys</Link>.</li><li>Token expiration time is subject to change, but is always significantly shorter in the `integ` environment than it is in the `prod` environment.</li></ul> |

### Unencrypted JSON Body Parameters

>IMPORTANT: You must include only **one** of the following four conditional parameters, plus the required `optout_check` parameter with a value of `1`, as key-value pairs in the JSON body of the request when encrypting it.

| Body Parameter | Data Type | Attribute | Description | 
| :--- | :--- | :--- | :--- |
| `email` | string | Conditionally Required | The email address for which to generate tokens. | 
| `email_hash` | string | Conditionally Required | The [Base64-encoded SHA-256](../getting-started/gs-normalization-encoding.md#email-address-hash-encoding) hash of a [normalized](../getting-started/gs-normalization-encoding.md#email-address-normalization) email address. |
| `phone` | string | Conditionally Required | The [normalized](../getting-started/gs-normalization-encoding.md#phone-number-normalization) phone number for which to generate tokens. |
| `phone_hash` | string | Conditionally Required | The [Base64-encoded SHA-256](../getting-started/gs-normalization-encoding.md#phone-number-hash-encoding) hash of a [normalized](../getting-started/gs-normalization-encoding.md#phone-number-normalization) phone number. |
| `optout_check` | number | Required | Checks whether the user has opted out. Include this parameter with a value of `1`.|

### Request Examples

>IMPORTANT: To ensure that the API key used to access the service remains secret, the `POST /token/generate` endpoint must be called from the server side, unlike the [POST&nbsp;/token/refresh](post-token-refresh.md), which does not require using an API key.

The following are unencrypted JSON request body examples for each parameter, one of which you should include in your token generation requests:

```json
{
    "email": "username@example.com",
    "optout_check": 1
}
```
```json
{
    "email_hash": "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=",
    "optout_check": 1
}
```
```json
{
    "phone": "+12345678901",
    "optout_check": 1
}
```
```json
{
    "phone_hash": "wdN1alhrbw1Bmz49GzKGdPvGxLhCNn7n3teAOQ/FSK4=",
    "optout_check": 1
}
```

Here's an encrypted token generation request example for an email hash:

```sh
echo '{"email_hash": "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=","optout_check":1}' | python3 uid2_request.py https://prod.uidapi.com/v2/token/generate [Your-Client-API-Key] [Your-Client-Secret] 
```
For details, and code examples in different programming languages, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).

## Decrypted JSON Response Format 

>NOTE: The responses are encrypted only if the HTTP status code is 200. Otherwise, the response is not encrypted.

This section includes the following sample responses:

* [Successful Response](#successful-response)
* [Optout](#optout)

#### Successful Response

A successful decrypted response returns the user's advertising and refresh tokens for the specified email address, phone number, or the respective hash. 

```json
{
    "body": {
        "advertising_token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b/besPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM+ewMzXXM8G9j8Q=",
        "refresh_token": "RefreshToken2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq/90PYmajV0IPrvo51Biqh7/M+JOuhfBY8KGUn//GsmZr9nf+jIWMUO4diOA92kCTF69JdP71Ooo+yF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA==",
        "identity_expires": 1633643601000,
        "refresh_from": 1633643001000,
        "refresh_expires": 1636322000000,
        "refresh_response_key": "wR5t6HKMfJ2r4J7fEGX9Gw=="
    },
    "status": "success"
}
```

#### Optout

Here is an example response when the user has opted out.

```json
{
    "status": "optout"
}
```

### Response Body Properties

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `advertising_token` | string | An encrypted advertising (UID2) token for the user. |
| `refresh_token` | string | An encrypted token that can be exchanged with the UID2 Service for the latest set of identity tokens. |
| `identity_expires` | double | The UNIX timestamp (in milliseconds) that indicates when the advertising token expires. |
| `refresh_from` | double | The UNIX timestamp (in milliseconds) that indicates when the UID2 SDK for JavaScript (see [UID2 SDK for JavaScript Reference Guide](../sdks/client-side-identity.md)) will start refreshing the UID2 token.<br/>TIP: If you are not using the SDK, consider refreshing the UID2 token from this timestamp, too. |
| `refresh_expires` | double | The UNIX timestamp (in milliseconds) that indicates when the refresh token expires. |
| `refresh_response_key` | string | A key to be used in a [POST&nbsp;/token/refresh](post-token-refresh.md) request for response decryption. |

### Response Status Codes

The following table lists the `status` property values and their HTTP status code equivalents.

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | The request was successful. The response will be encrypted. |
| `optout` | 200 | The request was successful. Could not generate token because the user has opted out. |
| `client_error` | 400 | The request had missing or invalid parameters.|
| `unauthorized` | 401 | The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested operation. |

If the `status` value is anything other than `success`, the `message` field provides additional information about the issue.

## Test Identities

| Type  | Identity                     | Purpose                                                                                                                                    | Next Endpoint                                  |
|:------|:-----------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------|:-----------------------------------------------|
| Email | `validate@example.com`       | Test that the `advertising_token` you've cached matches the `advertising_token` for the specified email address.                           | [POST&nbsp;/token/validate](post-token-validate.md) |
| Email | `optout@example.com`         | Using this email for the request always generates an `optout` response.                                                                    | [POST&nbsp;/token/generate](post-token-generate.md) |
| Email | `refresh-optout@example.com` | Using this email for the request always generates an identity response with a `refresh_token` that results in an `optout` response.        | [POST&nbsp;/token/refresh](post-token-refresh.md)   |
| Phone | `+12345678901`               | Test that the `advertising_token` you've cached matches the `advertising_token` for the specified phone number.                            | [POST&nbsp;/token/validate](post-token-validate.md) |
| Phone | `+00000000002`               | Using this phone number for the request always generates an `optout` response.                                                             | [POST&nbsp;/token/generate](post-token-generate.md) |
| Phone | `+00000000000`               | Using this phone number for the request always generates an identity response with a `refresh_token` that results in an `optout` response. | [POST&nbsp;/token/refresh](post-token-refresh.md)   |
