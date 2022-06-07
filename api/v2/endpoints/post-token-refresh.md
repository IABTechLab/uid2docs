[UID2 API Documentation](../../README.md) > [v2](../README.md) > [Endpoints](./README.md) > POST /token/refresh

# POST /token/refresh
Generate a new token for a user by specifying their refresh token issued by using the [POST /token/generate](./post-token-generate.md) endpoint.

>NOTE: This endpoint can be called from the client side (for example, a browser or a mobile app) because it does not require using an API key.

The following integration workflows use this endpoint:
* [Publisher - Standard](../guides/publisher-client-side.md)
* [Publisher - Custom](../guides/custom-publisher-integration.md)

## Request Format 

```POST '{environment}/{version}/token/refresh'```

No encryption is required for token refresh requests.

>IMPORTANT: You must decrypt the response using your secret. For details and Python script examples, see [Generating Encrypted Requests and Decrypting Responses](../encryption-decryption.md).

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing environment: `https://integ.uidapi.com`<br/>Production environment: `https://prod.uidapi.com` |
| `{version}` | string | Required | The current API version is `v2`. |

###  Unencrypted JSON Body Parameters

>IMPORTANT: You must include the following parameter as a key-value pair in the JSON body of a request when encrypting it.

| Body Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `refresh_token` | string | Required | The refresh token returned in the [POST /token/generate](./post-token-generate.md) response. |


#### Testing Notes

Using either of the following parameters in a [POST /token/generate](./post-token-generate.md) request always generates an identity response with a `refresh_token` that results in a logout response when used with the `POST /token/refresh` endpoint:

- The `optout@email.com` email address
- The `+00000000000` phone number

### Request Example

The following are unencrypted JSON request body example, which you should include in your token refresh requests:

```json
{
    "refresh_token": "RefreshToken2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq%2F90PYmajV0IPrvo51Biqh7%2FM%2BJOuhfBY8KGUn%2F%2FGsmZr9nf%2BjIWMUO4diOA92kCTF69JdP71Ooo%2ByF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA%3D%3D"
}
```
Here's a token refresh request format with placeholder values:

```sh
echo "{\"Unencrypted-JSON-Request-Body\"}" \
  | curl -X POST https://prod.uidapi.com/v2/token/refresh -H "Authorization: Bearer [Your-Client-API-Key]" \
  | decrypt_response.py [Your-Client-Secret]
```
>IMPORTANT: Be sure to add escape backslashes before quotes inside the JSON body.

Here's a token refresh request example:

```sh
echo "{\"refresh_token\":\"RefreshToken2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq%2F90PYmajV0IPrvo51Biqh7%2FM%2BJOuhfBY8KGUn%2F%2FGsmZr9nf%2BjIWMUO4diOA92kCTF69JdP71Ooo%2ByF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA%3D%3D\""}" \
  | curl -X POST https://prod.uidapi.com/v2/token/refresh -H "Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=" \
  | decrypt_response.py DELPabG/hsJsZk4Xm9Xr10Wb8qoKarg4ochUdY9e+Ow=
```

For details and Python script examples, see [Generating Encrypted Requests and Decrypting Responses](../encryption-decryption.md).

## Decrypted JSON Response Format

A decrypted successful response returns new identity tokens issued for the user or indicates that the user has opted out. 

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
The [Client-Side Identity JavaScript SDK](../sdks/client-side-identity.md) uses this endpoint response payloads to establish and manage the user identity during a user session lifecycle.

### Response Body Properties

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `advertising_token` | string | An encrypted advertising (UID2) token for the user. |
| `refresh_token` | string | An encrypted token that can be exchanged with the UID2 Service for the latest set of identity tokens. |
| `identity_expires` | double | The UNIX timestamp (in milliseconds) that indicates when the advertising token expires. |
| `refresh_from` | double | The UNIX timestamp (in milliseconds) that indicates when the [Client-Side Identity JavaScript SDK](../sdks/client-side-identity.md) will start refreshing the advertising token.</br>TIP: If you are not using the SDK, consider refreshing the advertising token from this timestamp, too. |
| `refresh_expires` | double | The UNIX timestamp (in milliseconds) that indicates when the refresh token expires. |


### Response Status Codes

The following table lists the `status` property values and their HTTP status code equivalents.

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | The request was successful.|
| `optout` | 200 | The user opted out. This status is returned only for authorized requests. |
| `client_error` | 400 | The request had missing or invalid parameters. For details on the issue, see the `message` property in the response.|
| `invalid_token` | 400 | The request had an invalid identity token specified. This status is returned only for authorized requests. |
| `unauthorized` | 401 | The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested operation. |

For response structure, see [Response Structure and Status Codes](../README.md#response-structure-and-status-codes).
