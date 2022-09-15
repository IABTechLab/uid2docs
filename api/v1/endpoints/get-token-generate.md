[UID2 API Documentation](../../README.md) > [v1](../README.md) > [Endpoints](./README.md) > GET /token/generate

# GET /token/generate (Deprecated)

>IMPORTANT: The UID2 API v1 has been deprecated and will be supported only for the current users until March 31, 2023, when all v1 SDK files and endpoints, the v0 SDK files, and any unversioned endpoints will be removed. Be sure to [upgrade to the UID2 API v2](../../v2/upgrade-guide.md) by March 31, 2023. If you are new to the framework, use the [UID2 API v2](../../v2/README.md).

Generate a UID2 token from a hashed or unhashed email address or phone number.

>IMPORTANT: UID2 tokens must be generated only on the server side after authentication. Security concerns forbid token generation on the browser side.


The following integration workflows use this endpoint:
* [Publisher - Standard](../guides/publisher-client-side.md)
* [Publisher - Custom](../guides/custom-publisher-integration.md)

## Request Format 

```GET '{environment}/v1/token/generate?{queryParameter}={queryParameterValue}'```

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing environment: `https://operator-integ.uidapi.com`<br/>Production environment: `https://prod.uidapi.com` |


###  Query Parameters

>IMPORTANT: You must include only one of the following parameters.

| Query Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `email` | string | Conditionally Required | The [URL-encoded](../README.md#query-parameter-value-encoding) email address for which to generate tokens. |
| `email_hash` | string | Conditionally Required | The [URL-encoded, base64-encoded SHA256](../README.md#query-parameter-value-encoding) hash of a [normalized](../../README.md#email-address-normalization) email address. |
| `phone` | string | Conditionally Required | The [normalized](../../README.md#phone-number-normalization) and [URL-encoded](../README.md#query-parameter-value-encoding) phone number for which to generate tokens. |
| `phone_hash` | string | Conditionally Required | The [URL-encoded, base64-encoded SHA256](../README.md#query-parameter-value-encoding) hash of a [normalized](../../README.md#phone-number-normalization) phone number. |


### Request Examples

>IMPORTANT: To ensure that the API key used to access the service remains secret, the `GET /token/generate` endpoint must be called from the server side, unlike the [GET /token/refresh](./get-token-refresh.md), which does not require using an API key.

A token generation request for an email address:

```sh
curl -L -X GET 'https://operator-integ.uidapi.com/v1/token/generate?email=username@example.com' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

A token generation request for an email address hash:

```sh
curl -L -X GET 'https://operator-integ.uidapi.com/v1/token/generate?email_hash=eVvLS%2FVg%2BYZ6%2Bz3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc%3D' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

A token generation request for a phone number:

```sh
curl -L -X GET 'https://operator-integ.uidapi.com/v1/token/generate?phone=%2B1111111111' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

A token generation request for a phone number hash:

```sh
curl -L -X GET 'https://operator-integ.uidapi.com/v1/token/generate?phone_hash=eVvLS%2FVg%2BYZ6%2Bz3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc%3D' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

## Response Format 

The response returns the user's advertising and refresh tokens for the specified email address, phone number, or the respective hash.  


```json
{
    "body": {
        "advertising_token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b/besPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM+ewMzXXM8G9j8Q=",
        "refresh_token": "RefreshToken2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq/90PYmajV0IPrvo51Biqh7/M+JOuhfBY8KGUn//GsmZr9nf+jIWMUO4diOA92kCTF69JdP71Ooo+yF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA==",
        "identity_expires": 1633643601000,
        "refresh_from": 1633643001000,
        "refresh_expires": 1636322000000
    },
    "status": "success"
}
```
The [Client-Side Identity JavaScript SDK](../sdks/client-side-identity-v1.md) uses this endpoint response payloads to establish and manage the user identity during a user session lifecycle.


### Response Body Properties

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `advertising_token` | string | An encrypted advertising (UID2) token for the user. |
| `refresh_token` | string | An encrypted token that can be exchanged with the UID2 Service for the latest set of identity tokens. |
| `identity_expires` | double | The UNIX timestamp (in milliseconds) that indicates when the advertising token expires. |
| `refresh_from` | double | The UNIX timestamp (in milliseconds) that indicates when the [Client-Side Identity JavaScript SDK](../sdks/client-side-identity-v1.md) will start refreshing the advertising token.</br>TIP: If you are not using the SDK, consider refreshing the advertising token from this timestamp, too. |
| `refresh_expires` | double | The UNIX timestamp (in milliseconds) that indicates when the refresh token expires. |

### Response Status Codes

The following table lists the `status` property values and their HTTP status code equivalents.

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | The request was successful. |
| `client_error` | 400 | The request had missing or invalid parameters.|
| `unauthorized` | 401 | The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested operation. |

If the `status` value is other than `success`, the `message` field provides additional information about the issue.

## Test Identities

| Type | Identity | Purpose | Next Endpoint |
| :--- | :--- | :--- | :--- |
| Email | `validate@email.com` | Test that the `advertising_token` you've cached matches the `advertising_token` for the specified email address. | [GET /token/validate](./get-token-validate.md) |
| Email | `optout@email.com` | Using this email for the request always generates an identity response with a `refresh_token` that results in a logout response. | [GET /token/refresh](./get-token-refresh.md) |
| Phone | `+12345678901` | Test that the `advertising_token` you've cached matches the `advertising_token` for the specified phone number. | [GET /token/validate](./get-token-validate.md) |
| Phone | `+00000000000` | Using this phone number for the request always generates an identity response with a `refresh_token` that results in a logout response. | [GET /token/refresh](./get-token-refresh.md) |
