[UID2 Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /token/generate

# GET /token/generate
Generate a UID2 token from an email address or hashed email address.

## Request 

```GET '{environment}/{version}/token/generate?{queryParameter}={queryParameterValue}'```

###  Query Parameters

| Query Parameter | Data Type | Attributes | Description |
| --- | --- | --- | --- |
| `email` | `string` | Conditionally Required | The normalized email address of a user. Required when `email_hash` is not included in the request. |
| `email_hash` | `string` | Conditionally Required | Base64 encoded SHA256 hash of the normalized email address of a user. Required when `email` is not included in the request. |

Note: Parameter `email` takes presedence in presence of both `email` and `email_hash` parameters

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
        "user_token": "UserToken2QQSpWVRd25AGt/HMRtw42u7xzTxBcvWpV3c9NjUbl6WAKS4ycJbWMhmcMo5UsWaMGvds9RhkuA5262tc2B9IfJQmjDLxGfDg+RDUl6qrQTdLkLtQgQooIvEt5/OvIKfg==",
        "refresh_token": "RefreshToken2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq/90PYmajV0IPrvo51Biqh7/M+JOuhfBY8KGUn//GsmZr9nf+jIWMUO4diOA92kCTF69JdP71Ooo+yF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA=="
    },
    "status": "success"
}
```

## Body Response Properties

| Property | Data Type | Description |
| --- | --- | --- |
| `advertising_token` | `string` | An encrypted token for advertising. a.k.a UID Token |
| `user_token` | `string` | An encrypted token containing privacy bits, which should only be used by the source site. |
| `refresh_token` | `string` | An encrypted token that can be exchanged with the Unified ID 2.0 Service for the latest set of identity tokens. |





