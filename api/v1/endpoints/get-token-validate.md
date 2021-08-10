[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /token/validate

# GET /token/validate
Validate that an advertising token matches the specified email address or email address hash. 

>NOTE: This endpoint is primarily intended for testing and troubleshooting new integrations.

## Request  Format 

```GET '{environment}/{version}/token/validate?token={tokenValue}&{queryParameter}={queryParameterValue}'```

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing environment: `https://integ.uidapi.com`<br/>Production environment: `https://prod.uidapi.com` |
| `{version}` | string | Required | The current API version is `v1`. |


###  Query Parameters

* Either the `email` or `email_hash` query parameter is required. 
* If both parameters `email` and `email_hash` are included in a request, only the `email` will return a response.
* TBD Since this is a testing endpoint, the only email address or email address hash that will return `true` is `validate@email.com`. Any other values will resturn `false`.

| Query Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `token` | string | Required | The advertising token returned by the [GET /token/generate](./get-token-generate.md) response. |
| `email` | string | Conditionally Required |  The [normalized](../../README.md#emailnormalization) email address. |
| `email_hash` | string | Conditionally Required | The [URL-encoded, base64-encoded SHA256](../../README.md#encoding-email-hashes) hash of the [normalized](../../README.md#emailnormalization) email address. |

### Request Examples

A validation request for an email address:

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/validate?token=AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D&email=validate@email.com' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

A validation request for an email address hash:

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/validate?token=AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D&email_hash=eVvLS%2FVg%2BYZ6%2Bz3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc%3D' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
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
| `body` | boolean | A value of `true` indicates that the email address or hash specified in the request is the same as the one used to generate the advertising token.<br/><br/>A value of `false` indicates any of the following:<br/>- The request included an invalid advertising token.<br/>- TBD The email address or hash specified in the request is different from the one used to generate the advertising token. |

For response status values, see [Response Structure and Status Codes](../../../api/README.md#response-structure-and-status-codes).
