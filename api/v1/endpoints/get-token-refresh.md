[UID2 API Documentation](../../README.md) > [v1](../README.md) > [Endpoints](./README.md) > GET /token/refresh

# GET /token/refresh (Deprecated)

>IMPORTANT: The UID2 API v1 has been deprecated and will be supported only for the current users until March 31, 2023, when all v1 SDK files and endpoints, the v0 SDK files, and any unversioned endpoints will be removed. Be sure to [upgrade to the UID2 API v2](../../v2/upgrade-guide.md) by March 31, 2023. If you are new to the framework, use the [UID2 API v2](../../v2/README.md).

Generate a new token for a user by specifying their refresh token issued by using the [GET /token/generate](./get-token-generate.md) endpoint.

>NOTE: This endpoint can be called from the client side (for example, a browser or a mobile app) because it does not require using an API key.

The following integration workflows use this endpoint:
* [Publisher - Standard](../guides/publisher-client-side.md)
* [Publisher - Custom](../guides/custom-publisher-integration.md)

## Request Format 

```GET '{environment}/v1/token/refresh?refresh_token={queryParameterValue}'```

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing environment: `https://operator-integ.uidapi.com`<br/>Production environment: `https://prod.uidapi.com` |

###  Query Parameters

| Query Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `refresh_token` | string | Required | The refresh token returned in the [GET /token/generate](./get-token-generate.md) response.<br/>IMPORTANT: If the refresh token was generated with URL-decoded characters, make sure to encode it as a query parameter. For details, see [Query Parameter Value Encoding](../README.md#query-parameter-value-encoding). |


#### Testing Notes

Using either of the following parameters in a [GET /token/generate](./get-token-generate.md) request always generates an identity response with a `refresh_token` that results in a logout response when used with the `GET /token/refresh` endpoint:

- The `optout@email.com` email address
- The `+00000000000` phone number

### Request Example

```sh
curl -L -X GET 'https://operator-integ.uidapi.com/v1/token/refresh?refresh_token=RefreshToken2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq%2F90PYmajV0IPrvo51Biqh7%2FM%2BJOuhfBY8KGUn%2F%2FGsmZr9nf%2BjIWMUO4diOA92kCTF69JdP71Ooo%2ByF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA%3D%3D'
```

## Response Format

A successful response returns new identity tokens issued for the user or indicates that the user has opted out. 

```json
{
    "body": {
        "advertising_token": "NewAdvertisingTokenIjb6u6KcMAtd0/4ZIAYkXvFrMdlZVqfb9LNf99B+1ysE/lBzYVt64pxYxjobJMGbh5q/HsKY7KC0Xo5Rb/Vo8HC4dYOoWXyuGUaL7Jmbw4bzh+3pgokelUGyTX19DfArTeIg7n+8cxWQ=",
        "refresh_token": "NewRefreshTokenAAAF2c8H5dF8AAAF2c8H5dF8AAAADX393Vw94afoVLL6A+qjdSUEisEKx6t42fLgN+2dmTgUavagz0Q6Kp7ghM989hKhZDyAGjHyuAAwm+CX1cO7DWEtMeNUA9vkWDjcIc8yeDZ+jmBtEaw07x/cxoul6fpv2PQ==",
        "identity_expires": 1633643601000,
        "refresh_from": 1633643001000,
        "refresh_expires": 1636322000000
    },
    "status": "success"
}
```

#### Optout

If a user opted out before the refresh request, the following response will be returned:

```json
{
    "status": "optout"
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
| `optout` | 200 | The user opted out. This status is returned only for authorized requests. |
| `client_error` | 400 | The request had missing or invalid parameters. |
| `invalid_token` | 400 | The request had an invalid identity token specified. This status is returned only for authorized requests. |
| `unauthorized` | 401 | The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested operation. |

If the `status` value is other than `success` or `optout`, the `message` field provides additional information about the issue.
