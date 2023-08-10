---
title: POST /token/validate
description: Validate an advertising token (for testing purposes). 
hide_table_of_contents: false
sidebar_position: 03
---

# POST /token/validate
Validate that an advertising token matches the specified hashed or unhashed email address or phone number. 

Used by: This endpoint is used mainly by publishers.

>NOTE: This endpoint is intended primarily for testing and troubleshooting new integrations.

## Request Format 

`POST '{environment}/v2/token/validate'`

>IMPORTANT: You must encrypt all requests, using your secret key. For details and Python script examples, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).


### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing environment: `https://operator-integ.uidapi.com`<br/>Production environment: `https://prod.uidapi.com`<br/>For a full list, including regional operators, see [Environments](../getting-started/gs-environments.md). |

>NOTE: The integration environment and the production environment require different [API keys](../ref-info/glossary-uid.md#gl-api-key).


###  Unencrypted JSON Body Parameters

- Include only one of the following four valid options, as listed in the Body Parameter table: `email`, `email_hash`, `phone`, or `phone_hash`. For the parameter you choose to test with, use the exact value listed. 
- Include the required body parameters as key-value pairs in the JSON body of a request when encrypting it.

For details, see [FAQs for Publishers](../getting-started/gs-faqs.md#faqs-for-publishers).

| Body Parameter | Data Type | Attribute | Description | Value |
| :--- | :--- | :--- | :--- | :--- |
| `token` | string | Required | The advertising token returned by the [POST /token/generate](post-token-generate.md) response. |
| `email` | string | Conditionally Required |  The email address for token validation.<br/>The only valid value is: `validate@email.com`. |
| `email_hash` | string | Conditionally Required | The [Base64-encoded SHA-256](../getting-started/gs-normalization-encoding#email-address-hash-encoding) hash of the [normalized](../getting-started/gs-normalization-encoding#email-address-normalization) email address for token validation (`validate@email.com`).<br/>The only valid value is: `LdhtUlMQ58ZZy5YUqGPRQw5xUMS5dXG5ocJHYJHbAKI=`. |
| `phone` | string | Conditionally Required | The [normalized](../getting-started/gs-normalization-encoding#phone-number-normalization) phone number for which to generate tokens.<br/>The only valid value is: `+12345678901`. |
| `phone_hash` | string | Conditionally Required | The [Base64-encoded SHA-256](../getting-started/gs-normalization-encoding#phone-number-hash-encoding) hash of a [normalized](../getting-started/gs-normalization-encoding#phone-number-normalization) phone number.<br/>The only valid value is: `EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=`. |

### Request Examples

The following are unencrypted JSON request body examples for each parameter, which you need  to include in your token validation requests:
```json
{
    "token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D",
    "email": "validate@email.com"
}
```
```json
{
    "token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D",
    "email_hash": "LdhtUlMQ58ZZy5YUqGPRQw5xUMS5dXG5ocJHYJHbAKI="
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
echo '{"token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D", "email_hash": "LdhtUlMQ58ZZy5YUqGPRQw5xUMS5dXG5ocJHYJHbAKI="}' | python3 uid2_request.py  https://prod.uidapi.com/v2/token/validate [Your-Client-API-Key] [Your-Client-Secret]
```

For details and Python script examples, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).

## Decrypted JSON Response Format

>NOTE: The responses are encrypted only if the HTTP status code is 200. Otherwise, the response is not encrypted.

A successful decrypted response returns a boolean value that indicates the validation status of the specified advertising token, as shown in the following example: 

```json
{
    "body": true,
    "status": "success"
}
```

## Body Response Properties

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `body` | boolean | A value of `true` indicates that the email address, phone number, or the respective hash specified in the request is the same as the one used to generate the advertising token.<br/>A value of `false` indicates any of the following:<br/>- The request included an invalid advertising token.<br/>-  The email address, phone number, or the respective hash specified in the request is not one of the four valid values specified in the [Unencrypted JSON Body Parameters](#unencrypted-json-body-parameters) table. |

### Response Status Codes

The following table lists the `status` property values and their HTTP status code equivalents.

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | The request was successful. The response will be encrypted. |
| `client_error` | 400 | The request had missing or invalid parameters.|
| `unauthorized` | 401 | The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested operation. |

If the `status` value is other than `success`, the `message` field provides additional information about the issue.

##  Using POST /token/validate to Test

You can use this endpoint to test whether the [DII](../ref-info/glossary-uid.md#gl-dii) you are sending through [POST /token/generate](../endpoints/post-token-generate.md) is valid. Follow these steps.

1. Depending on whether the DII is a hashed or unhashed email address or phone number, send a [POST /token/generate](../endpoints/post-token-generate.md) request using one of the four valid options listed in the [Unencrypted JSON Body Parameters](#unencrypted-json-body-parameters) table&#8212;`email`, `email_hash`, `phone`, or `phone_hash`&#8212;with the corresponding value as listed in the table.

2. Store the returned `advertising_token` value for use in the next step.
3. Send a [POST /token/validate](../endpoints/post-token-validate.md) request using the `email`, `email_hash`, `phone`, or `phone_hash` value that you sent in Step 1, with the `advertising_token` that you saved in Step 2 as the `token` property value. 
    - A response of `true` indicates that the DII you sent as a request in Step 1 matches the token you received in the response of Step 1. 
    - A response of `false` indicates that there might be an issue with the way you are sending email addresses, phone numbers, or their respective hashes.
