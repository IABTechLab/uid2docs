---
title: POST /token/generate
description: Generates a UID2 token (advertising token) from DII. 
hide_table_of_contents: false
sidebar_position: 02
---

import Link from '@docusaurus/Link';
import IdentityGenerateResponse from '/docs/snippets/_example-identity-generate-response.mdx';

# POST /token/generate

Requests a UID2 token generated from a user's <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> (email address or phone number). If the DII is valid, and the user has not opted out of UID2, this operation returns a UID2 token and associated values.

Used by: This endpoint is used mainly by publishers.

:::important
The `optout_check` parameter, required with a value of `1`, checks whether the user has opted out.
:::

<!-- uid2_euid_diff re legal basis for admonition above -->

Rather than calling this endpoint directly, you could use one of the SDKs to manage it for you. For a summary of options, see [SDKs: Summary](../sdks/summary-sdks.md).

## Request Format 

`POST '{environment}/v2/token/generate'`

For authentication details, see [Authentication and Authorization](../getting-started/gs-auth.md).

Here's what you need to know about sending requests to this endpoint:
- To ensure that the <Link href="../ref-info/glossary-uid#gl-api-key">API key</Link> used to access the service remains secret, UID2 tokens must be generated only on the server side after authentication. 
- You must encrypt all requests using your secret. For details, and code examples in different programming languages, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing (integration) environment: `https://operator-integ.uidapi.com`<br/>Production environment: The best choice depends on where your users are based. For information about how to choose the best URL for your use case, and a full list of valid base URLs, see [Environments](../getting-started/gs-environments.md).<br/>Notes:<ul><li>The `integ` environment and the `prod` environment require different <Link href="../ref-info/glossary-uid#gl-api-key">API keys</Link>.</li><li>Token expiration time is subject to change, but is always significantly shorter in the `integ` environment than it is in the `prod` environment.</li></ul> |

### Unencrypted JSON Body Parameters

:::important
You must include only **one** of the following four conditional parameters, plus the required `optout_check` parameter with a value of `1`, as key-value pairs in the JSON body of the request when encrypting it.
:::

| Body Parameter | Data Type | Attribute | Description | 
| :--- | :--- | :--- | :--- |
| `email` | string | Conditionally Required | The email address for which to generate tokens. | 
| `email_hash` | string | Conditionally Required | The [Base64-encoded SHA-256](../getting-started/gs-normalization-encoding.md#email-address-hash-encoding) hash of a [normalized](../getting-started/gs-normalization-encoding.md#email-address-normalization) email address. |
| `phone` | string | Conditionally Required | The [normalized](../getting-started/gs-normalization-encoding.md#phone-number-normalization) phone number for which to generate tokens. |
| `phone_hash` | string | Conditionally Required | The [Base64-encoded SHA-256](../getting-started/gs-normalization-encoding.md#phone-number-hash-encoding) hash of a [normalized](../getting-started/gs-normalization-encoding.md#phone-number-normalization) phone number. |
| `optout_check` | number | Required | Checks whether the user has opted out. Include this parameter with a value of `1`.|

### Request Examples

:::important
To ensure that the API key used to access the service remains secret, the `POST /token/generate` endpoint must be called from the server side, unlike [POST&nbsp;/token/refresh](post-token-refresh.md) which does not require using an API key. If you want to generate tokens on the client side, see [Client-Side Integration Options](../guides/integration-options-publisher-web.md#client-side-integration-options) (for web-based implementations) or [UID2 Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md).
:::

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

:::note
The response is encrypted only if the HTTP status code is 200. Otherwise, the response is not encrypted.
:::

This section includes the following sample responses:

* [Successful Response](#successful-response)
* [Optout](#optout)

#### Successful Response

A successful decrypted response returns the user's advertising and refresh tokens for the specified email address, phone number, or the respective hash.

<IdentityGenerateResponse />

#### Optout

Here is an example response when the user has opted out.

```json
{
    "status": "optout"
}
```

### Response Body Properties

The response body includes the properties shown in the following table.

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `advertising_token` | string | An encrypted advertising (UID2) token for the user. |
| `refresh_token` | string | An encrypted token that can be exchanged with the UID2 Service for the latest set of identity tokens. |
| `identity_expires` | number | The <a href="../ref-info/glossary-uid#gl-unix-time">Unix</a> timestamp (in milliseconds) that indicates when the advertising token expires. |
| `refresh_from` | number | The Unix timestamp (in milliseconds) that indicates when the SDK for JavaScript (see [SDK for JavaScript Reference Guide](../sdks/sdk-ref-javascript.md)) will start refreshing the UID2 token.<br/>TIP: If you are not using the SDK, consider refreshing the UID2 token from this timestamp, too. |
| `refresh_expires` | number | The Unix timestamp (in milliseconds) that indicates when the refresh token expires. |
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

| Type  | Identity                     | Purpose                                                                                                                                    | Next Endpoint                                       |
|:------|:-----------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------|
| Email | `validate@example.com`       | Test that the `advertising_token` you've cached matches the `advertising_token` for the specified email address.                           | [POST&nbsp;/token/validate](post-token-validate.md) |
| Email | `optout@example.com`         | Using this email for the request always generates an `optout` response.                                                                    | [POST&nbsp;/token/generate](post-token-generate.md) |
| Email | `refresh-optout@example.com` | Using this email for the request always generates an identity response with a `refresh_token` that results in an `optout` response.        | [POST&nbsp;/token/refresh](post-token-refresh.md)   |
| Phone | `+12345678901`               | Test that the `advertising_token` you've cached matches the `advertising_token` for the specified phone number.                            | [POST&nbsp;/token/validate](post-token-validate.md) |
| Phone | `+00000000002`               | Using this phone number for the request always generates an `optout` response.                                                             | [POST&nbsp;/token/generate](post-token-generate.md) |
| Phone | `+00000000000`               | Using this phone number for the request always generates an identity response with a `refresh_token` that results in an `optout` response. | [POST&nbsp;/token/refresh](post-token-refresh.md)   |
