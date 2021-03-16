[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /token/validate

# GET /token/validate
Validate that an advertising token matches the provided email or email hash. This is primarily used for testing and troubleshooting new integrations and is not a primary step in the publisher workflow.

The only accepted email or email hash for this endpoint is `validate@email.com`.

## Request 

```GET '{environment}/{version}/token/validate?{queryParameter1}={queryParameterValue1}&{queryParameter2}={queryParameterValue2}'```

###  Query Parameters

| Query Parameter | Data Type | Attributes | Description |
| --- | --- | --- | --- |
| `token` | `string` | ? | The `advertising_token` obtained from [GET /token/generate](./get-token-generate.md). |
| `email` | `string` | Conditionally Required | The normalized email address of a user. Required when `email_hash` is not included in the request. |
| `email_hash` | `string` | Conditionally Required | The [URL-encoded, base64-encoded SHA256 hash](../../README.md#encoding-email-hashes) of the normalized email address of a user. Required when `email` is not included in the request. |

#### Example Request Using an Email Address

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/validate?token=AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b/besPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM+ewMzXXM8G9j8Q=&email=username@example.com' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

#### Example Request Using an Email Hash

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/validate?token=AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b/besPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM+ewMzXXM8G9j8Q=&email_hash=eVvLS%2FVg%2BYZ6%2Bz3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc%3D' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

## Response

The response is a JSON object. 


```json
{
    "body": true,
    "status": "success"
}
```

## Body Response Properties

| Property | Data Type | Description |
| --- | --- | --- |
| `body` | `boolean` | A value of `true` indicates that the `email` or the `email_hash` specified in the request is the same as the `email` or `email_hash` used to create the `advertising_token`.<br>A value of `false` indicates an invalid `token` or that the `email` or the `email_hash` specified in the request is not the same as the `email` or `email_hash` used to create the `advertising_token`. |




