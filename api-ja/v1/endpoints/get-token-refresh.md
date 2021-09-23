[UID2 API Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /token/refresh

# GET /token/refresh
[GET /token/generate](./get-token-generate.md)エンドポイントを使用して発行されたRefresh Tokenを指定して、ユーザーの新しいトークンを生成します。

このエンドポイントを使用するインテグレーションワークフロー:
* [Publisher - Standard](../guides/publisher-client-side.md)
* [Publisher - Custom](../guides/custom-publisher-integration.md)

## Request Format

```
GET '{environment}/{version}/token/refresh?{queryParameter}={queryParameterValue}'
```

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | 必須 | テスト環境: `https://integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com` |
| `{version}` | string | 必須 | 現在のAPIのバージョンは `v1` です。 |

###  Query Parameters

| Query Parameter | Data Type | Attributes | Description |
| --- | --- | --- | --- |
| `refresh_token` | `string` | 必須 |[GET /token/generate](./get-token-generate.md)レスポンスで返されたRefresh Tokenです。<br>IMPORTANT: Refresh TokenがURLデコードされた文字で生成された場合は、必ずクエリパラメータとしてエンコードしてください。詳細は、[Encoding Query Parameter Values](../../../api-ja/README.md#encoding-query-parameter-values)を参照してください。 |

#### Testing Notes

[GET /token/generate](./get-token-generate.md)リクエストで `optout@email.com` のメールアドレスを使用すると、このエンドポイントで使用した場合、常に `refresh_token` を含む ID レスポンスが生成され、結果としてログアウトのレスポンスが発生します。

#### Request Example

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/refresh?refresh_token=RefreshToken2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq%2F90PYmajV0IPrvo51Biqh7%2FM%2BJOuhfBY8KGUn%2F%2FGsmZr9nf%2BjIWMUO4diOA92kCTF69JdP71Ooo%2ByF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA%3D%3D'
```

## Response Format

レスポンスが成功すると、ユーザーに発行された新しい ID Tokenが返されるか、またはユーザーがオプトアウトしたことが示されます。

```json
{
    "body": {
        "advertising_token": "NewAdvertisingTokenIjb6u6KcMAtd0/4ZIAYkXvFrMdlZVqfb9LNf99B+1ysE/lBzYVt64pxYxjobJMGbh5q/HsKY7KC0Xo5Rb/Vo8HC4dYOoWXyuGUaL7Jmbw4bzh+3pgokelUGyTX19DfArTeIg7n+8cxWQ=",
        "refresh_token": "NewRefreshTokenAAAF2c8H5dF8AAAF2c8H5dF8AAAADX393Vw94afoVLL6A+qjdSUEisEKx6t42fLgN+2dmTgUavagz0Q6Kp7ghM989hKhZDyAGjHyuAAwm+CX1cO7DWEtMeNUA9vkWDjcIc8yeDZ+jmBtEaw07x/cxoul6fpv2PQ=="
    },
    "status": "success"
}
```

#### Optout

リフレッシュリクエストの前にユーザーがオプトアウトした場合は、次のようなレスポンスが返されます:

```json
{
    "status": "optout"
}
```

#### Response Body Properties

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `advertising_token` | string | ユーザーの暗号化されたAdvertising Token（UID2 Token）。 |
| `refresh_token` | string | UID2 サービスと最新の ID Tokenのセットを交換できる暗号化されたトークン。|

レスポンスのステータス値については、[Response Structure and Status Codes](../../../api-ja/README.md#response-structure-and-status-codes)を参照してください。
