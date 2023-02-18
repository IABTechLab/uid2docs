[UID2 Overview](../../../README.md) > [Getting Started](../../README.md) > [v2](../README.md) > [Endpoints](./README.md) > POST /token/validate

# POST /token/validate
Validate that an advertising token matches the specified hashed or unhashed email address or phone number. 

Used by: This endpoint is used mainly by publishers.

>NOTE: This endpoint is intended primarily for testing and troubleshooting new integrations.

## Request Format 

```POST '{environment}/v2/token/validate'```

>IMPORTANT: You must encrypt all request using your secret. For details and Python script examples, see [Encrypting Requests and Decrypting Responses](../ref-info/encryption-decryption.md).


### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing environment: `https://integ.uidapi.com`<br/>Production environment: `https://prod.uidapi.com`<br/>For a full list, including regional operators, see [Environments](../README.md#environments). |


###  Unencrypted JSON Body Parameters

- You must include only one of the following parameters: `email`, `email_hash`, `phone`, or `phone_hash`. 
- Include the required body parameters as key-value pairs in the JSON body of a request when encrypting it.
- To test identities, use the `validate@email.com` email address or `+12345678901` phone number. For details, see the FAQs sections in the [Client-Side JavaScript SDK Integration Guide](../guides/publisher-client-side.md) and [Server-Only Integration Guide](../guides/custom-publisher-integration.md) for publishers.

| Body Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `token` | string | Required | The advertising token returned by the [POST /token/generate](./post-token-generate.md) response. |
| `email` | string | Conditionally Required |  The email address for token validation. |
| `email_hash` | string | Conditionally Required | The [base64-encoded SHA256](../../README.md#email-address-hash-encoding) hash of a [normalized](../../README.md#email-address-normalization) email address for token validation. |
| `phone` | string | Conditionally Required | The [normalized](../../README.md#phone-number-normalization) phone number for which to generate tokens. |
| `phone_hash` | string | Conditionally Required | The [base64-encoded SHA256](../../README.md#email-address-hash-encoding) hash of a [normalized](../../README.md#phone-number-normalization) phone number. |


### Request Examples

The following are unencrypted JSON request body examples for each parameter, which you need  to include in your token validation requests:
```json
{
    "token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D",
    "email": "username@example.com"
}
```
```json
{
    "token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D",
    "email_hash": "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ="
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
    "phone_hash": "wdN1alhrbw1Bmz49GzKGdPvGxLhCNn7n3teAOQ/FSK4="
}
```

Here's an encrypted token validation request format with placeholder values:

```sh
echo '[Unencrypted-JSON-Request-Body]' \
  | encrypt_request.py [Your-Client-Secret] \
  | curl -X POST 'https://prod.uidapi.com/v2/token/validate' -H 'Authorization: Bearer [Your-Client-API-Key]' -d @- \
  | decrypt_response.py [Your-Client-Secret]
```

Here's an encrypted token validation request example for an email hash:

```sh
echo '{"token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D", "email_hash": "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ="}' \
  | encrypt_request.py DELPabG/hsJsZk4Xm9Xr10Wb8qoKarg4ochUdY9e+Ow= \
  | curl -X POST 'https://prod.uidapi.com/v2/token/validate' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=' -d @- \
  | decrypt_response.py DELPabG/hsJsZk4Xm9Xr10Wb8qoKarg4ochUdY9e+Ow= 
```

For details and Python script examples, see [Encrypting Requests and Decrypting Responses](../ref-info/encryption-decryption.md).

## Decrypted JSON Response Format

>NOTE: The responses are encrypted only if the HTTP status code is 200. Otherwise, the response is not encrypted.

A successful decrypted response returns a boolean value that indicates the validation status of the specified advertising token. 


```json
{
    "body": true,
    "status": "success"
}
```

## Body Response Properties

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `body` | boolean | A value of `true` indicates that the email address, phone number, or the respective hash specified in the request is the same as the one used to generate the advertising token.<br/>A value of `false` indicates any of the following:<br/>- The request included an invalid advertising token.<br/>-  The email address, phone number, or the respective hash specified in the request is either different from the one used to generate the advertising token or is not for the testing email `validate@email.com` `+12345678901` phone number. |

### Response Status Codes

The following table lists the `status` property values and their HTTP status code equivalents.

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | The request was successful. The response will be encrypted. |
| `client_error` | 400 | The request had missing or invalid parameters.|
| `unauthorized` | 401 | The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested operation. |

If the `status` value is other than `success`, the `message` field provides additional information about the issue.
