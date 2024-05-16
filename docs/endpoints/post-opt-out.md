---
title: xxx
description: xxx
hide_table_of_contents: false
sidebar_position: 03
---

import Link from '@docusaurus/Link';

# POST /optout/status

Check the opt-out status of raw UID2s. Given a list of raw UID2s, this endpoint will return the raw UID2s that have opted-out, as well as the time that the opt-out took place. For more information, see User Opt-Out.

Used by: This endpoint is used by advertisers, data providers, DSPs, and sharers. More specifically, this is for participants who have access to the raw UID2, but do not have access to the underlying email address or phone number and want to know the opt-out status. For details, see [Advertiser/Data Provider Integration Guide](../guides/advertiser-dataprovider-guide.md) or [DSP Integration Guide](../guides/dsp-guide.md).

## Batch Size and Request Parallelization Requirements

Here’s what you need to know:
- To check the opt-out status of a large number of UID2s, send them in sequential batches with a maximum batch size of 5,000 items per batch.
- Unless you are using a Private Operator, do not send batches in parallel. In other words, use a single HTTP connection and send batches of raw UID2s consecutively.

## Request Format

POST '{environment}/v2/optout/status'

IMPORTANT: You must encrypt all requests using your secret  . For details, and code examples in different programming languages, see Encrypting Requests and Decrypting Responses.

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Integration environment: `https://operator-integ.uidapi.com`<br/>Production environment: `https://prod.uidapi.com`<br/>For a full list, including regional operators, see [Environments](../getting-started/gs-environments.md). |

:::note
The integration environment and the production environment require different <Link href="../ref-info/glossary-uid#gl-api-key">API keys</Link>.
:::

## Unencrypted JSON Body Parameters

Body Parameter	Data Type	Attribute	Description
advertising_ids	string array	Required	The list of raw UID2s to check the opt-out status.
Request Example
The following is an example of an unencrypted JSON request body:

```json
{
  "advertising_ids": [
    "ufv1uGRovNiJNbJqiE/xzM+aKE7jP69MgspOZoEQ3xc=",
    "zstfu9RG/Ih5trR6hlaHP6hw5yt9mYd5TKg2mRpWVng=",
    "VZqcve81+ImeoNUsizTFLEMOvREptJo1ROZvKw9ibSM="
  ]
}
```

Here's an encrypted opt-out status request example:
echo '{"advertising_ids": ["ufv1uGRovNiJNbJqiE/xzM+aKE7jP69MgspOZoEQ3xc="]}' | python3 uid2_request.py https://prod.uidapi.com/v2/optout/status [Your-Client-API-Key] [Your-Client-Secret]
For details, and code examples in different programming languages, see Encrypting Requests and Decrypting Responses.
Decrypted JSON Response Format
NOTE: The response is encrypted only if the HTTP status code is 200. Otherwise, the response is not encrypted.
A successful decrypted response returns the raw UID2s that have opted-out and the time at which the opt-out request was made. UID2s that have not opted-out are not returned in the response.

```json
{
  "body": {
    "opted_out": [
      {
        "advertising_id": "ufv1uGRovNiJNbJqiE/xzM+aKE7jP69MgspOZoEQ3xc=",
        "opted_out_since": 1633643601000
      },
      {
        "advertising_id": "zstfu9RG/Ih5trR6hlaHP6hw5yt9mYd5TKg2mRpWVng=",
        "opted_out_since": 1709764087000
      }
    ]
  },
  "status": "success"
}
```

### Response Body Properties

Property	Format	Description
advertising_id	string	The advertising ID (raw UID2).
opted_out_since	number	The UNIX timestamp (in milliseconds) that indicates when the raw UID2 was opted out.

### Response Status Codes

The following table lists the status property values and their HTTP status code equivalents.
Status	HTTP Status Code	Description
success	200	The request was successful. The response will be encrypted.
client_error	400	The request had missing or invalid parameters.
unauthorized	401	The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested operation.
If the status value is anything other than success, the message field provides additional information about the issue.


























----------------------------------------- below is legacy content -----------------------------------------






Validate that an advertising token matches the specified hashed or unhashed email address or phone number. 

Used by: This endpoint is used mainly by publishers.

>NOTE: This endpoint is intended primarily for testing and troubleshooting new integrations.

## Request Format 

`POST '{environment}/v2/token/validate'`

>IMPORTANT: You must encrypt all requests using your secret key. For details, and code examples in different programming languages, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).


### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing environment: `https://operator-integ.uidapi.com`<br/>Production environment: `https://prod.uidapi.com`<br/>For a full list, including regional operators, see [Environments](../getting-started/gs-environments.md). |

>NOTE: The integration environment and the production environment require different <Link href="../ref-info/glossary-uid#gl-api-key">API keys</Link>.


### Unencrypted JSON Body Parameters

- Include only one of the following four valid options, as listed in the Body Parameter table: `email`, `email_hash`, `phone`, or `phone_hash`. For the parameter you choose to test with, use the exact value listed. 
- Include the required body parameters as key-value pairs in the JSON body of a request when encrypting it.

| Body Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `token` | string | Required | The advertising token returned by the [POST&nbsp;/token/generate](post-token-generate.md) response. |
| `email` | string | Conditionally Required | The email address for token validation.<br/>The only valid value is: `validate@example.com`. |
| `email_hash` | string | Conditionally Required | The [Base64-encoded SHA-256](../getting-started/gs-normalization-encoding.md#email-address-hash-encoding) hash of the [normalized](../getting-started/gs-normalization-encoding.md#email-address-normalization) email address for token validation (`validate@example.com`).<br/>The only valid value is: `ntI244ZRTXwAwpki6/M5cyBYW7h/Wq576lnN3l9+W/c=`. |
| `phone` | string | Conditionally Required | The [normalized](../getting-started/gs-normalization-encoding.md#phone-number-normalization) phone number for which to generate tokens.<br/>The only valid value is: `+12345678901`. |
| `phone_hash` | string | Conditionally Required | The [Base64-encoded SHA-256](../getting-started/gs-normalization-encoding.md#phone-number-hash-encoding) hash of a [normalized](../getting-started/gs-normalization-encoding.md#phone-number-normalization) phone number.<br/>The only valid value is: `EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=`. |

### Request Examples

The following are unencrypted JSON request body examples for each parameter, which you need to include in your token validation requests:

>NOTE: The advertising tokens in these examples are fictitious, for illustrative purposes only. The values provided are not real values.

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

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `body` | boolean | A value of `true` indicates that the email address, phone number, or the respective hash specified in the request is the same as the one used to generate the advertising token.<br/>A value of `false` indicates any of the following:<br/>- The request included an invalid advertising token.<br/>- The email address, phone number, or the respective hash specified in the request is not one of the four valid values specified in the [Unencrypted JSON Body Parameters](#unencrypted-json-body-parameters) table. |

### Response Status Codes

The following table lists the `status` property values and their HTTP status code equivalents.

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | The request was successful. The response will be encrypted. |
| `client_error` | 400 | The request had missing or invalid parameters.|
| `unauthorized` | 401 | The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested operation. |

If the `status` value is anything other than `success`, the `message` field provides additional information about the issue.

## Using POST /token/validate to Test

You can use this endpoint to test whether the <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> you are sending through [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) is valid. Follow these steps.

1. Depending on whether the DII is a hashed or unhashed email address or phone number, send a [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) request using one of the four valid options listed in the [Unencrypted JSON Body Parameters](#unencrypted-json-body-parameters) table&#8212;`email`, `email_hash`, `phone`, or `phone_hash`&#8212;with the corresponding value as listed in the table.

2. Store the returned `advertising_token` value for use in the next step.
3. Send a `POST /token/validate` request using the `email`, `email_hash`, `phone`, or `phone_hash` value that you sent in Step 1, with the `advertising_token` that you saved in Step 2 as the `token` property value.
4. Check the response to the `POST /token/validate` request. The results indicate the success of your process, as follows: 
    - A response of `true` indicates that the DII you sent as a request in Step 1 matches the token you received in the response of Step 1. 
    - A response of `false` indicates that there might be an issue with the way you are sending email addresses, phone numbers, or their respective hashes.