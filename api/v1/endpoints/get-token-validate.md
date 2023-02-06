[UID2 API Documentation](../../README.md) > [v1](../README.md) > [Endpoints](./README.md) > GET /token/validate

# GET /token/validate (Deprecated)

>IMPORTANT: The UID2 API v1 has been deprecated and will be supported only for the current users until March 31, 2023, when all v1 SDK files and endpoints, the v0 SDK files, and any unversioned endpoints will be removed. Be sure to [upgrade to the UID2 API v2](../../v2/upgrades/upgrade-guide.md) by March 31, 2023. If you are new to the framework, use the [UID2 API v2](../../v2/README.md).

Validate that an advertising token matches the specified hashed or unhashed email address or phone number. 

>NOTE: This endpoint is intended primarily for testing and troubleshooting new integrations.

## Request  Format 

```GET '{environment}/v1/token/validate?token={tokenValue}&{queryParameter}={queryParameterValue}'```

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing environment: `https://operator-integ.uidapi.com`<br/>Production environment: `https://prod.uidapi.com` |


###  Query Parameters

- You must include only one of the following parameters: `email`, `email_hash`, `phone`, or `phone_hash`. 
- To test identities, use the `validate@email.com` email address or `+12345678901` phone number. For details, see the FAQs sections in the [UID2 SDK Integration Guide](../guides/publisher-client-side.md) and [Server-Only Integration Guide](../guides/custom-publisher-integration.md) for publishers.

| Query Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `token` | string | Required | The advertising token returned by the [GET /token/generate](./get-token-generate.md) response.<br/>IMPORTANT: If the token was generated with URL-decoded characters, make sure to encode it as a query parameter. For details, see [Query Parameter Value Encoding](../README.md#query-parameter-value-encoding). |
| `email` | string | Conditionally Required |  The [URL-encoded](../README.md#query-parameter-value-encoding) email address for token validation. |
| `email_hash` | string | Conditionally Required | The [URL-encoded, base64-encoded SHA256](../README.md#query-parameter-value-encoding) hash of a [normalized](../../README.md#email-address-normalization) email address for token validation. |
| `phone` | string | Conditionally Required | The [normalized](../../README.md#phone-number-normalization) and [URL-encoded](../README.md#query-parameter-value-encoding) phone number for which to generate tokens. |
| `phone_hash` | string | Conditionally Required | The [URL-encoded, base64-encoded SHA256](../README.md#query-parameter-value-encoding) hash of a [normalized](../../README.md#phone-number-normalization) phone number. |


### Request Examples

A validation request for an email address:

```sh
curl -L -X GET 'https://operator-integ.uidapi.com/v1/token/validate?token=AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D&email=validate@email.com' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

A validation request for an email address hash:

```sh
curl -L -X GET 'https://operator-integ.uidapi.com/v1/token/validate?token=AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D&email_hash=eVvLS%2FVg%2BYZ6%2Bz3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc%3D' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```
A validation request for a phone number:

```sh
curl -L -X GET 'https://operator-integ.uidapi.com/v1/token/validate?token=AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D&phone=%2B12345678901' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

A validation request for a phone number hash:

```sh
curl -L -X GET 'https://operator-integ.uidapi.com/v1/token/validate?token=AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D&phone_hash=wdN1alhrbw1Bmz49GzKGdPvGxLhCNn7n3teAOQ%2FFSK4%3D' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

## Response

The response returns a boolean value that indicates the validation status of the specified advertising token. 


```json
{
    "body": true,
    "status": "success"
}
```

## Body Response Properties

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `body` | boolean | A value of `true` indicates that the email address, phone number, or the respective hash specified in the request is the same as the one used to generate the advertising token.<br/><br/>A value of `false` indicates any of the following:<br/>- The request included an invalid advertising token.<br/>-  The email address, phone number, or the respective hash specified in the request is either different from the one used to generate the advertising token or is not for the testing email `validate@email.com` `+12345678901` phone number. |

### Response Status Codes

The following table lists the `status` property values and their HTTP status code equivalents.

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | The request was successful. |
| `client_error` | 400 | The request had missing or invalid parameters.|
| `unauthorized` | 401 | The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested operation. |

If the `status` value is other than `success`, the `message` field provides additional information about the issue.
