[UID2 Documentation](../../README.md) > v1 > [Endpoints](./README.md) > POST /token/logout

# POST /token/logout
Logout from a UID2 identity session.

## Request 

```POST '{environment}/{version}/token/logout?{queryParameter}={queryParameterValue}'```

###  Query Parameters

| Query Parameter | Data Type | Attributes | Description |
| --- | --- | --- | --- |
| `email` | `string` | Required | The normalized email address of a user. |

#### Example Request Using an Email Address

```sh
curl -L -X POST 'https://integ.uidapi.com/v1/token/logout?email=username@example.com' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

## Response

The response is a standard HTTP response code.


```
OK
```
