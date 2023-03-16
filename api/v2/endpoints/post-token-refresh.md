[UID2 Overview](../../../README.md) > [Getting Started](../../README.md) > [v2](../summary-doc-v2.md) > [Endpoints](summary-endpoints.md) > POST /token/refresh

# POST /token/refresh
Generate a new token for a user by specifying their refresh token issued by using the [POST /token/generate](post-token-generate.md) endpoint.

Used by: This endpoint is used mainly by publishers.

>NOTE: This endpoint can be called from the client side (for example, a browser or a mobile app) because it does not require using an API key.

## Request Format 

```POST '{environment}/v2/token/refresh'```

Here's what you need to know about this endpoint:

- No encryption is required for token refresh requests.
- Responses are encrypted only if the HTTP status code is 200. Otherwise, responses are not encrypted.
- To decrypt responses, you need to use the `refresh_response_key` value returned in the [POST /token/generate](post-token-generate.md) or `POST /token/refresh` response from which the refresh token in the request is returned.
- If you send a refresh token from a v1 `token/generate` response in the request, the response will not be encrypted.

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | Testing environment: `https://operator-integ.uidapi.com`<br/>Production environment: `https://prod.uidapi.com`<br/>For a full list, including regional operators, see [Environments](../summary-doc-v2.md#environments). |

#### Testing Notes

Using either of the following parameters in a [POST /token/generate](post-token-generate.md) request always generates an identity response with a `refresh_token` that results in a logout response when used with the `POST /token/refresh` endpoint:

- The `optout@email.com` email address
- The `+00000000000` phone number

### Request Example

Here's a token refresh request format with placeholder values, which include the `refresh_token` and `refresh_response_key` values returned by a [POST /token/generate](post-token-generate.md) request:

```sh
echo [refresh_token] \
  | curl -X POST 'https://prod.uidapi.com/v2/token/refresh' -d @- \
  | decrypt_response.py [refresh_response_key] --is-refresh
```

Here's a token refresh request example:

```sh
echo AAAAAQLMcnV+YE6/xoPDZBJvJtWyPyhF9QTV4242kFdT+DE/OfKsQ3IEkgCqD5jmP9HuR4O3PNSVnCnzYq2BiDDz8SLsKOo6wZsoMIn95jVWBaA6oLq7uUGY5/g9SUOfFmX5uDXUvO0w2UCKi+j9OQhlMfxTsyUQUzC1VQOx6ed/gZjqH/Sw6Kyk0XH7AlziqSyyXA438JHqyJphGVwsPl2LGCH1K2MPxkLmyzMZ2ghTzrr0IgIOXPsL4lXqSPkl/UJqnO3iqbihd66eLeYNmyd1Xblr3DwYnwWdAUXEufLoJbbxifGYc+fPF+8DpykpyL9neq3oquxQWpyHsftnwYaZT5EBZHQJqAttHUZ4yQ== \
  | curl -X POST 'https://prod.uidapi.com/v2/token/refresh' -d @- \
  | decrypt_response.py wR5t6HKMfJ2r4J7fEGX9Gw== --is-refresh
```

For details and Python script examples, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).

## Decrypted JSON Response Format

>NOTE: The responses are encrypted only if the HTTP status code is 200. Otherwise, the response is not encrypted.

This section includes the following sample responses:

* [Successful Response With Tokens](#successful-response-with-tokens)
* [Optout](#optout)
* [Error Response](#error-response)

#### Successful Response With Tokens

A decrypted successful response returns new identity tokens issued for the user, or indicates that the user has opted out. The following example returns the identity tokens.

```json
{
    "body": {
        "advertising_token": "NewAdvertisingTokenIjb6u6KcMAtd0/4ZIAYkXvFrMdlZVqfb9LNf99B+1ysE/lBzYVt64pxYxjobJMGbh5q/HsKY7KC0Xo5Rb/Vo8HC4dYOoWXyuGUaL7Jmbw4bzh+3pgokelUGyTX19DfArTeIg7n+8cxWQ=",
        "refresh_token": "NewRefreshTokenAAAF2c8H5dF8AAAF2c8H5dF8AAAADX393Vw94afoVLL6A+qjdSUEisEKx6t42fLgN+2dmTgUavagz0Q6Kp7ghM989hKhZDyAGjHyuAAwm+CX1cO7DWEtMeNUA9vkWDjcIc8yeDZ+jmBtEaw07x/cxoul6fpv2PQ==",
        "identity_expires": 1633643601000,
        "refresh_from": 1633643001000,
        "refresh_expires": 1636322000000,
        "refresh_response_key": "yptCUTBoZm1ffosgCrmuwg=="
    },
    "status": "success"
}
```

#### Optout

If a user opted out before the refresh request, the following response is returned:

```json
{
  "status": "optout"
}
```

#### Error Response

An error response might look like the following:

```json
{
  "status": "client_error",
  "message": "Client Error"
}
```

### Response Body Properties

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `advertising_token` | string | An encrypted advertising (UID2) token for the user. |
| `refresh_token` | string | An encrypted token that can be exchanged with the UID2 Service for the latest set of identity tokens. |
| `identity_expires` | double | The UNIX timestamp (in milliseconds) that indicates when the advertising token expires. |
| `refresh_from` | double | The UNIX timestamp (in milliseconds) that indicates when the [Client-Side JavaScript SDK (v2)](../sdks/client-side-identity.md) will start refreshing the advertising token.<br/>TIP: If you are not using the SDK, consider refreshing the advertising token from this timestamp, too. |
| `refresh_expires` | double | The UNIX timestamp (in milliseconds) that indicates when the refresh token expires. |
| `refresh_response_key` | string | A key to be used in a new [POST /token/refresh](post-token-refresh.md) request for response decryption. |

### Response Status Codes

The following table lists the `status` property values and their HTTP status code equivalents.

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | The request was successful. The response will be encrypted. |
| `optout` | 200 | The user opted out. This status is returned only for authorized requests. |
| `client_error` | 400 | The request had missing or invalid parameters.|
| `invalid_token` | 400 | The request had an invalid identity token specified. This status is returned only for authorized requests. |
| `unauthorized` | 401 | The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested operation. |

If the `status` value is other than `success` or `optout`, the `message` field provides additional information about the issue.
