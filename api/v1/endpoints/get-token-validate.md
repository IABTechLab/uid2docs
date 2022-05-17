[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /token/validate

# GET /token/validate
Validate that an advertising token matches the specified hashed or unhashed email address or phone number. 

>NOTE: This endpoint is intended primarily for testing and troubleshooting new integrations. 

## Request  Format 

```GET '{environment}/{version}/token/validate?token={tokenValue}&{queryParameter}={queryParameterValue}'```

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing environment: `https://integ.uidapi.com`<br/>Production environment: `https://prod.uidapi.com` |
| `{version}` | string | Required | The current API version is `v1`. |


###  Query Parameters

* Only one of the four query parameters is required and allowed in a request: `email`, `email_hash`, `phone`, or `phone_hash`. 
* If more than one of the four parameters is included in a request, a 400 (Bad Request) error will be returned.

>TIP: Consider using the `validate@email.com` email address or `+12345678901` phone number for testing. For details, see [Test Identities](./get-token-generate.md#test-identities).

| Query Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `token` | string | Required | The advertising token returned by the [GET /token/generate](./get-token-generate.md) response.<br/>IMPORTANT: If the token was generated with URL-decoded characters, make sure to encode it as a query parameter. For details, see [Query Parameter Value Encoding](../../../api/README.md#query-parameter-value-encoding). |
| `email` | string | Conditionally Required |  The email address for token validation. |
| `email_hash` | string | Conditionally Required | The [URL-encoded, base64-encoded SHA256](../../README.md#email-address-hash-encoding) hash of a [normalized](../../README.md#email-address-normalization) email address for token validation. |
| `phone` | string | Conditionally Required | The [normalized](../../README.md#phone-number-normalization) phone number for which to generate tokens. |
| `phone_hash` | string | Conditionally Required | The [URL-encoded, base64-encoded SHA256](../../README.md#phone-number-hash-encoding) hash of a [normalized](../../README.md#phone-number-normalization) phone number. |


### Request Examples

A validation request for an email address:

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/validate?token=AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D&email=validate@email.com' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

A validation request for an email address hash:

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/validate?token=AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D&email_hash=eVvLS%2FVg%2BYZ6%2Bz3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc%3D' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```
A validation request for a phone number:

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/validate?token=AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D&phone=+12345678901' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

A validation request for a phone number hash:

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/validate?token=AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D&phone_hash=wdN1alhrbw1Bmz49GzKGdPvGxLhCNn7n3teAOQ%2FFSK4%3D' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
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

For response status values, see [Response Structure and Status Codes](../../../api/README.md#response-structure-and-status-codes).
