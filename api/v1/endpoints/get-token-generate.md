[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /token/generate

# GET /token/generate
Generate a UID2 token from an email address or hashed email address.

Integration workflows that use this endpoint:
* [Publisher - Standard](../guides/publisher-client-side.md)
* [Publisher - Custom](../guides/custom-publisher-integration.md)

## Request 

```GET '{environment}/{version}/token/generate?{queryParameter}={queryParameterValue}'```

###  Query Parameters

| Query Parameter | Data Type | Attributes | Description |
| --- | --- | --- | --- |
| `email` | `string` | Conditionally Required | The [normalized email address](../../README.md##email-normalization) of a user. Required when `email_hash` is not included in the request. |
| `email_hash` | `string` | Conditionally Required | The [URL-encoded, base64-encoded SHA256 hash](../../README.md#encoding-email-hashes) of the [normalized email address](../../README.md##email-normalization) of a user. Required when `email` is not included in the request. |

If `email` and `email_hash` are both supplied in the same request, only the `email` will return a mapping response.

#### Example Request Using an Email Address

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/generate?email=username@example.com' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

#### Example Request Using an Email Hash

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/generate?email_hash=eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

### Test Email Addresses

| Email Address | Purpose | Next Endpoint |
| --- | --- | --- |
| `validate@email.com` | Test that the `advertising_token` you've cached matches the `advertising_token` for the specified `email`. | [GET /token/validate](./get-token-validate.md) |
| `optout@email.com` | Using this email for the request always generates an identity response with a `refresh_token` that results in a logout response. | [GET /token/refresh](./get-token-refresh.md) |

## Response

The response is a JSON object containing the user's advertising, user, and refresh tokens.


```json
{
    "body": {
        "advertising_token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b/besPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM+ewMzXXM8G9j8Q=",
        "refresh_token": "RefreshToken2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq/90PYmajV0IPrvo51Biqh7/M+JOuhfBY8KGUn//GsmZr9nf+jIWMUO4diOA92kCTF69JdP71Ooo+yF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA=="
    },
    "status": "success"
}
```

## Body Response Properties

| Property | Data Type | Description |
| --- | --- | --- |
| `advertising_token` | `string` | An encrypted token for advertising. a.k.a UID Token |
| `refresh_token` | `string` | An encrypted token that can be exchanged with the Unified ID 2.0 Service for the latest set of identity tokens. |





