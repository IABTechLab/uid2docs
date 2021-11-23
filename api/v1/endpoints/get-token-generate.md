[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /token/generate

# GET /token/generate
Generate a UID2 token from an email address or hashed email address.

>IMPORTANT: UID2 tokens must be generated only on the server side after authentication. Security concerns forbid token generation on the browser side.


The following integration workflows use this endpoint:
* [Publisher - Standard](../guides/publisher-client-side.md)
* [Publisher - Custom](../guides/custom-publisher-integration.md)

## Request Format 

```GET '{environment}/{version}/token/generate?{queryParameter}={queryParameterValue}'```

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing environment: `https://integ.uidapi.com`<br/>Production environment: `https://prod.uidapi.com` |
| `{version}` | string | Required | The current API version is `v1`. |

###  Query Parameters

* Only one of the following two query parameters is required. 
* If both parameters are included in a request, only the `email` will return a response.

| Query Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `email` | string | Conditionally Required | The email address for which to generate tokens. |
| `email_hash` | string | Conditionally Required | The [URL-encoded, base64-encoded SHA256](../../README.md#email-address-hash-encoding) hash of the [normalized](../../README.md#email-address-normalization) email address. |


### Request Examples

A token generation request for an email address:

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/generate?email=username@example.com' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

A token generation request for an email address hash:

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/generate?email_hash=eVvLS%2FVg%2BYZ6%2Bz3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc%3D' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```


## Response Format 

The response returns the user's advertising and refresh tokens for the specified email address or hash.  


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

For response status values, see [Response Structure and Status Codes](../../../api/README.md#response-structure-and-status-codes).

## Test Email Addresses

| Email Address | Purpose | Next Endpoint |
| :--- | :--- | :--- |
| `validate@email.com` | Test that the `advertising_token` you've cached matches the `advertising_token` for the specified email address. | [GET /token/validate](./get-token-validate.md) |
| `optout@email.com` | Using this email for the request always generates an identity response with a `refresh_token` that results in a logout response. | [GET /token/refresh](./get-token-refresh.md) |
