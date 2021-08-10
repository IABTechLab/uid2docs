[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /token/refresh

# GET /token/refresh
Generate a new token for a user by specifying their refresh token issued by using the [GET /token/generate](./get-token-generate.md) endpoint.

The following integration workflows use this endpoint:
* [Publisher - Standard](../guides/publisher-client-side.md)
* [Publisher - Custom](../guides/custom-publisher-integration.md)

## Request Format 

```GET '{environment}/{version}/token/refresh?refresh_token={queryParameterValue}'```

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing environment: `https://integ.uidapi.com`<br/>Production environment: `https://prod.uidapi.com` |
| `{version}` | string | Required | The current API version is `v1`. |

###  Query Parameters

| Query Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `refresh_token` | string | Required | The refresh token returned in the [GET /token/generate](./get-token-generate.md) response.<br/>IMPORTANT: If the refresh token was generated with URL decoded characters make sure to encode as a query parameter. For details, see [Encoding Query Parameter Values](../../../api/README.md#encoding-query-parameter-values). |


#### Testing Notes

Using the `optout@email.com` email address in [GET /token/generate](./get-token-generate.md) request always generates an identity response with a `refresh_token` that results in a logout response when used with this endpoint.

### Request Example

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/refresh?refresh_token=RefreshToken2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq%2F90PYmajV0IPrvo51Biqh7%2FM%2BJOuhfBY8KGUn%2F%2FGsmZr9nf%2BjIWMUO4diOA92kCTF69JdP71Ooo%2ByF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA%3D%3D'
```

## Response Format

The response returns new identity tokens issues for the user or a message explaining why new identity tokens were not returned. For details, see [Response Status Codes](#response-status-codes).
```json
{
    "body": {
        "advertising_token": "NewAdvertisingTokenIjb6u6KcMAtd0/4ZIAYkXvFrMdlZVqfb9LNf99B+1ysE/lBzYVt64pxYxjobJMGbh5q/HsKY7KC0Xo5Rb/Vo8HC4dYOoWXyuGUaL7Jmbw4bzh+3pgokelUGyTX19DfArTeIg7n+8cxWQ=",
        "refresh_token": "NewRefreshTokenAAAF2c8H5dF8AAAF2c8H5dF8AAAADX393Vw94afoVLL6A+qjdSUEisEKx6t42fLgN+2dmTgUavagz0Q6Kp7ghM989hKhZDyAGjHyuAAwm+CX1cO7DWEtMeNUA9vkWDjcIc8yeDZ+jmBtEaw07x/cxoul6fpv2PQ=="
    },
    "status": "success"
}
```

### Response Body Properties

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `advertising_token` | string | An encrypted advertising (UID2) token for the user. |
| `refresh_token` | string | An encrypted token that can be exchanged with the UID2 Service for the latest set of identity tokens. |


### Response Status Codes

The following are the status codes specific to this endpoint.

| Status | HTTP Status Code | Status Description | Response Description |
| :--- | :--- | :--- | :--- |
| `success` | 200 | The request was successful.| Body with newly issued identity tokens. |
| `optout` | 200 | The user opted out; no tokens can be issued. This status is returned only for authorized requests. | Body with emplty token values. |
| `client_error` | 400 | The request was a missing refresh token.| The `message` value:<br/>`Required Parameter Missing: refresh_token`. |
| `invalid_token` | 400 | The request had an invalid refresh token. This status is returned only for authorized requests. |  The `message` value:<br/>`Invalid Token presented {refresh_token_value}`. |

For response structure details, see [Response Structure and Status Codes](../../../api/README.md#response-structure-and-status-codes).
