---
title: POST /token/generate
description: Generate a UID2 token (advertising token) from DII. 
hide_table_of_contents: false
sidebar_position: 02
---

# POST /token/generate
Opt in the user to UID2-based targeted advertising and generate a UID2 token from their provided email address or phone number. 

Used by: This endpoint is used mainly by publishers.

>IMPORTANT: Be sure to call this endpoint only when you have obtained legal basis to convert the user’s [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) to UID2 tokens for targeted advertising. By default, this endpoint does not check for opt-out records. To check if the user has opted out, use the optional `policy` request parameter with a value of `1`.

## Request Format 

`POST '{environment}/v2/token/generate'`

Here's what you need to know about this endpoint requests:
- To ensure that the API key used to access the service remains secret, UID2 tokens must be generated only on the server side after authentication. 
- You must encrypt all requests using your secret. For details and Python script examples, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing environment: `https://operator-integ.uidapi.com`<br/>Production environment: `https://prod.uidapi.com`<br/>For a full list, including regional operators, see [Environments](../getting-started/gs-environments.md). |

>NOTE: The integration environment and the production environment require different [API keys](../ref-info/glossary-uid.md#gl-api-key).

###  Unencrypted JSON Body Parameters

You must include only one of the following parameters as a key-value pair in the JSON body of a request when encrypting it.

| Body Parameter | Data Type | Attribute | Description | 
| :--- | :--- | :--- | :--- |
| `email` | string | Conditionally Required | The email address for which to generate tokens. | 
| `email_hash` | string | Conditionally Required | The [Base64-encoded ](../getting-started/gs-normalization-encoding#email-address-hash-encoding) hash of a [normalized](../getting-started/gs-normalization-encoding#email-address-normalization) email address. |
| `phone` | string | Conditionally Required | The [normalized](../getting-started/gs-normalization-encoding#phone-number-normalization) phone number for which to generate tokens. |
| `phone_hash` | string | Conditionally Required | The [Base64-encoded SHA-256](../getting-started/gs-normalization-encoding#phone-number-hash-encoding) hash of a [normalized](../getting-started/gs-normalization-encoding#phone-number-normalization) phone number. |
| `policy` | number | Optional | The token generation policy ID. See [Token Generation Policy](#token-generation-policy). |


### Request Examples

>IMPORTANT: To ensure that the API key used to access the service remains secret, the `POST /token/generate` endpoint must be called from the server side, unlike the [POST /token/refresh](post-token-refresh.md), which does not require using an API key.

The following are unencrypted JSON request body examples for each parameter, one of which you should include in your token generation requests:

```json
{
    "email": "username@example.com"
}
```
```json
{
    "email_hash": "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ="
}
```
```json
{
    "phone": "+12345678901"
}
```
```json
{
    "phone_hash": "wdN1alhrbw1Bmz49GzKGdPvGxLhCNn7n3teAOQ/FSK4="
}
```

Here's an encrypted token generation request example for an email hash:

```sh
echo '{"email_hash": "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ="}' | python3 uid2_request.py https://prod.uidapi.com/v2/token/generate [Your-Client-API-Key] [Your-Client-Secret] 
```
For details and Python script examples, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).

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

Here is an example response when the `policy` parameter is included in the request, with a value of `1`, and the user has opted out. In all other scenarios, if the user has opted out, the tokens are returned (see [Successful Response](#successful-response) above). 

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
| `refresh_from` | double | The UNIX timestamp (in milliseconds) that indicates when the [UID2 SDK for JavaScript](../sdks/client-side-identity.md) will start refreshing the advertising token.<br/>TIP: If you are not using the SDK, consider refreshing the advertising token from this timestamp, too. |
| `refresh_expires` | double | The UNIX timestamp (in milliseconds) that indicates when the refresh token expires. |
| `refresh_response_key` | string | A key to be used in a [POST /token/refresh](post-token-refresh.md) request for response decryption. |

### Response Status Codes

The following table lists the `status` property values and their HTTP status code equivalents.

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | The request was successful. The response will be encrypted. |
| `optout` | 200 | The request was successful. Could not generate token because the user has opted out. |
| `client_error` | 400 | The request had missing or invalid parameters.|
| `unauthorized` | 401 | The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested operation. |

If the `status` value is other than `success`, the `message` field provides additional information about the issue.

## Test Identities

| Type | Identity | Purpose | Next Endpoint |
| :--- | :--- | :--- | :--- |
| Email | `validate@email.com` | Test that the `advertising_token` you've cached matches the `advertising_token` for the specified email address. | [POST /token/validate](post-token-validate.md) |
| Email | `optout@email.com` | Using this email for the request always generates an identity response with a `refresh_token` that results in a logout response. | [POST /token/refresh](post-token-refresh.md) |
| Phone | `+12345678901` | Test that the `advertising_token` you've cached matches the `advertising_token` for the specified phone number. | [POST /token/validate](post-token-validate.md) |
| Phone | `+00000000000` | Using this phone number for the request always generates an identity response with a `refresh_token` that results in a logout response. | [POST /token/refresh](post-token-refresh.md) |

## Token Generation Policy

Token generation policy let the caller decide when to generate a token. It is passed as an **integer ID** in the request body (with key 'policy') If the parameter is omitted, policy with ID = 0 will be applied.

| ID | Description |
| :--- | :--- |
| 0 | Always generate a token. |
| 1 | Generate token only when the user has not opted out. |
