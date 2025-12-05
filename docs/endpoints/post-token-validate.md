---
title: POST /token/validate
description: Validates an advertising token (for testing purposes). 
hide_table_of_contents: false
sidebar_position: 03
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# POST /token/validate

Validates that an advertising token matches the specified hashed or unhashed email address or phone number.

Used by: This endpoint is used mainly by publishers.

:::note
This endpoint is intended primarily for testing and troubleshooting new integrations.
:::

## Request Format 

`POST '{environment}/v2/token/validate'`

For authentication details, see [Authentication and Authorization](../getting-started/gs-auth.md).

:::important
You must encrypt all requests using your secret key. For details, and code examples in different programming languages, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).
:::

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing (integration) environment: `https://operator-integ.uidapi.com`<br/>Production environment: The best choice depends on where your users are based. For information about how to choose the best URL for your use case, and a full list of valid base URLs, see [Environments](../getting-started/gs-environments.md). |

:::note
The integration environment and the production environment require different <Link href="../ref-info/glossary-uid#gl-api-key">API keys</Link>. For information about getting credentials for each environment, see [Getting Your Credentials](../getting-started/gs-credentials.md#getting-your-credentials).
:::

### Unencrypted JSON Body Parameters

Here are some key points about using this endpoint:

- Include only one of the following four valid options, as listed in the Body Parameter table: `email`, `email_hash`, `phone`, or `phone_hash`.
- Include the required body parameters as key-value pairs in the JSON body of the request when encrypting it.

| Body Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `token` | string | Required | The advertising token returned by the [POST&nbsp;/token/generate](post-token-generate.md) response.<br/>You can only validate an advertising token that has been generated with your own credentials.
| `email` | string | Conditionally Required | The email address for token validation. You can use any valid email value, normalized or not. |
| `email_hash` | string | Conditionally Required | The [Base64-encoded SHA-256](../getting-started/gs-normalization-encoding.md#email-address-hash-encoding) hash of any valid [normalized](../getting-started/gs-normalization-encoding.md#email-address-normalization) email address. |
| `phone` | string | Conditionally Required | The phone number for token validation. You can use any valid phone number value, but it must be [normalized](../getting-started/gs-normalization-encoding.md#phone-number-normalization). |
| `phone_hash` | string | Conditionally Required | The [Base64-encoded SHA-256](../getting-started/gs-normalization-encoding.md#phone-number-hash-encoding) hash of any valid [normalized](../getting-started/gs-normalization-encoding.md#phone-number-normalization) phone number. |

### Request Examples

The following are unencrypted JSON request body examples for each parameter, which you need to include in your token validation requests:

:::note
The advertising tokens in these examples are fictitious, for illustrative purposes only. The values provided are not real values.
:::

```json
{
    "token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D",
    "email": "validate@example.com"
}
```
```json
{
    "token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D",
    "email_hash": "ntI244ZRTXwAwpki6/M5cyBYW7h/Wq576lnN3l9+W/c="
}
```
```json
{
    "token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D",
    "phone": "+12345678901"
}
```
```json
{
    "token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D",
    "phone_hash": "EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4="
}
```

Here's an encrypted token validation request example for an email hash:

```sh
echo '{"token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D", "email_hash": "LdhtUlMQ58ZZy5YUqGPRQw5xUMS5dXG5ocJHYJHbAKI="}' | python3 uid2_request.py https://prod.uidapi.com/v2/token/validate [Your-Client-API-Key] [Your-Client-Secret]
```

For details, and code examples in different programming languages, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).

## Decrypted JSON Response Format

:::note
The response is encrypted only if the HTTP status code is 200. Otherwise, the response is not encrypted.
:::

A successful decrypted response returns a boolean value that indicates the validation status of the specified advertising token, as shown in the following example:

```json
{
    "body": true,
    "status": "success"
}
```

## Body Response Properties

The following table provides information about the response body.

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `body` | boolean | A value of `true` indicates that the email address, phone number, or the respective hash specified in the request is the same as the one used to generate the advertising token.<br/>A value of `false` indicates that the email address, phone number, or the respective hash specified in the request is not the same as the one used to generated the advertising token. |

### Response Status Codes

The following table lists the `status` property values and their HTTP status code equivalents.

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | The request was successful. The response will be encrypted. |
| `client_error` | 400 | The request had missing or invalid parameters. |
| `unauthorized` | 401 | The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested operation. |

If the `status` value is anything other than `success`, the `message` field provides additional information about the issue.

## Using POST /token/validate to Test

You can use this endpoint to test whether the <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> that you are sending through [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) is valid. Follow these steps.

1. Send a [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) request using an `email`, `email_hash`, `phone` or `phone_hash` to generate an advertising token to validate.
2. Store the returned `advertising_token` value for use in the next step.
3. Send a `POST /token/validate` request using the `email`, `email_hash`, `phone`, or `phone_hash` value that you sent in Step 1, with the `advertising_token` that you saved in Step 2 as the `token` property value.
4. Check the response to the `POST /token/validate` request. The results indicate the success of your process, as follows: 
    - A response of `true` indicates that the DII you sent as a request in Step 1 matches the token you received in the response of Step 1. 
    - A response of `false` indicates that there might be an issue with the way you are sending email addresses, phone numbers, or their respective hashes.
