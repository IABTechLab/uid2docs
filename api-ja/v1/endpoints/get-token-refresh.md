[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /token/refresh

# GET /token/refresh
[GET /token/generate](./get-token-generate.md)からのレスポンスで得られたユーザーの `refresh_token` を指定して、ユーザーの新しいトークンを生成します。

このエンドポイントを使用するインテグレーションワークフロー:
* [Publisher - Standard](../guides/publisher-client-side.md)
* [Publisher - Custom](../guides/custom-publisher-integration.md)

## Request

```GET '{environment}/{version}/token/refresh?{queryParameter}={queryParameterValue}'```

###  Query Parameters

| Query Parameter | Data Type | Attributes | Description |
| --- | --- | --- | --- |
| `refresh_token` | `string` | 必須 | [GET /token/generate](./get-token-generate.md)からユーザー用に返却される `refresh_token` です。いくつかの `refresh_token` はURLデコードされた文字で生成されます。クエリパラメータとして `refresh_token` をエンコードしてください。 |

#### Example Request

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/refresh?refresh_token=RefreshToken2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq/90PYmajV0IPrvo51Biqh7/M+JOuhfBY8KGUn//GsmZr9nf+jIWMUO4diOA92kCTF69JdP71Ooo+yF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA==' -H 'Authorization: YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

### Testing Notes

[GET /token/generate](./get-token-generate.md)で`optout@email.com`のEメールを使用すると、このエンドポイントで使用した場合、常に`refresh_token`のIDレスポンスが生成され、ログアウトのレスポンスになります。

## Response

レスポンスは、ユーザーの新しい ID トークンを含む JSON オブジェクト、または新しい ID トークンが返されなかった理由を説明するメッセージです。

```json
{
    "body": {
        "advertising_token": "NewAdvertisingTokenIjb6u6KcMAtd0/4ZIAYkXvFrMdlZVqfb9LNf99B+1ysE/lBzYVt64pxYxjobJMGbh5q/HsKY7KC0Xo5Rb/Vo8HC4dYOoWXyuGUaL7Jmbw4bzh+3pgokelUGyTX19DfArTeIg7n+8cxWQ=",
        "refresh_token": "NewRefreshTokenAAAF2c8H5dF8AAAF2c8H5dF8AAAADX393Vw94afoVLL6A+qjdSUEisEKx6t42fLgN+2dmTgUavagz0Q6Kp7ghM989hKhZDyAGjHyuAAwm+CX1cO7DWEtMeNUA9vkWDjcIc8yeDZ+jmBtEaw07x/cxoul6fpv2PQ=="
    },
    "status": "success"
}
```

リフレッシュリクエストの前にユーザーがオプトアウトした場合、リフレッシュレスポンスのステータスは `success` となり、トークンの値は空になります。

### Supplemental Status Information

| HTTP Status Code | Status | Response | Description |
| --- | --- | --- | --- |
| 200 | `success` | Identity tokensが返されました。 | |
| 200 | `optout` | このステータスは、許可されたリクエストにのみ表示され、提供された `refresh_token` に関連するユーザーがオプトアウトしたことを示します。 |
| 400 | `clienterror` | `Required Parameter Missing: refresh_token` | リクエストに `refresh_token` パラメータと値が含まれていることを確認してください。 |
| 400 | `invalid_token` | `Invalid Token presented {refresh_token_value}` | このメッセージは、許可されたリクエストに対してのみ表示され、提供された `refresh_token` が無効であることを示します。 |
