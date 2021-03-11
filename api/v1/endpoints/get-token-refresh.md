[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /token/refresh

# GET /token/refresh
Generate a new token for a user by specifying their `refresh_token` obtained from earlier response from [GET /token/generate](./get-token-generate.md).

Integration workflows that use this endpoint:
* [Publisher - Standard](../guides/publisher-client-side.md)
* [Publisher - Custom](../guides/custom-publisher-integration.md)

## Request 

```GET '{environment}/{version}/token/refresh?{queryParameter}={queryParameterValue}'```

###  Query Parameters

| Query Parameter | Data Type | Attributes | Description |
| --- | --- | --- | --- |
| `refresh_token` | `string` | Required | The `refresh_token` returned for a user from [GET /token/generate](./get-token-generate.md). Some `refresh_tokens` are generated with URL decoded characters. Please encode the `refresh_token` as a query parameter. |

#### Example Request

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/refresh?refresh_token=RefreshToken2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq/90PYmajV0IPrvo51Biqh7/M+JOuhfBY8KGUn//GsmZr9nf+jIWMUO4diOA92kCTF69JdP71Ooo+yF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA==' -H 'Authorization: YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

### Testing Notes

Using an email of `optout@email.com` in [GET /token/generate](./get-token-generate.md) always generates an identity response with a `refresh_token` that results in a logout response when used with this endpoint.

## Response

The response is a JSON object containing new identity tokens for a user or a message explaining why new identity tokens were not returned.

```json
{
    "body": {
        "advertising_token": "NewAdvertisingTokenIjb6u6KcMAtd0/4ZIAYkXvFrMdlZVqfb9LNf99B+1ysE/lBzYVt64pxYxjobJMGbh5q/HsKY7KC0Xo5Rb/Vo8HC4dYOoWXyuGUaL7Jmbw4bzh+3pgokelUGyTX19DfArTeIg7n+8cxWQ=",
        "refresh_token": "NewRefreshTokenAAAF2c8H5dF8AAAF2c8H5dF8AAAADX393Vw94afoVLL6A+qjdSUEisEKx6t42fLgN+2dmTgUavagz0Q6Kp7ghM989hKhZDyAGjHyuAAwm+CX1cO7DWEtMeNUA9vkWDjcIc8yeDZ+jmBtEaw07x/cxoul6fpv2PQ=="
    },
    "status": "success"
}
```

If a user opted out before the refresh request, the refresh response status will be `success` with empty token values.

### Supplemental Status Information

| HTTP Status Code | Status | Response | Description |
| --- | --- | --- | --- |
| 200 | `success` | Body with identity tokens. | |
| 200 | `optout` | This status only appears for authorized requests and indicates that the user associated with the supplied `refresh_token` opted out. |
| 400 | `clienterror` | `Required Parameter Missing: refresh_token` | Ensure the `refresh_token` parameter and value are included with your request. |
| 400 | `invalid_token` | `Invalid Token presented {refresh_token_value}` | This message only appears for authorized requests and indicates that the supplied `refresh_token` is invalid. |






