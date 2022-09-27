[UID2 API Documentation](../../README.md) > [v1](../README.md) > [Endpoints](./README.md) > GET /token/refresh

# GET /token/refresh (Deprecated)

> IMPORTANT: UID2 API v1 は非推奨となり、2023 年 3 月 31 日までにすべての v1 SDK ファイルとエンドポイント、v0 SDK ファイル、およびバージョン管理されていないエンドポイントが削除され、現在のユーザーのみがサポートされるようになります。2023 年 3 月 31 日までに、必ず UID2 API v2(../../v2/upgrade-guide.md) へのアップグレードをお願いします。初めてフレームワークに触れる方は、[UID2 API v2](../../v2/README.md) をご利用ください。

[GET /token/generate](./get-token-generate.md) エンドポイントを使用して発行された Refresh Token を指定し、ユーザーの新しいトークンを生成することができます。

> NOTE: このエンドポイントは、API キーを使用する必要がないため、クライアントサイド（例えば、ブラウザやモバイルアプリなど）から呼び出すことができます。

以下のインテグレーションワークフローは、このエンドポイントを使用します:

- [Publisher - Standard](../guides/publisher-client-side.md)
- [Publisher - Custom](../guides/custom-publisher-integration.md)

## Request Format

`GET '{environment}/v1/token/refresh?refresh_token={queryParameterValue}'`

### Path Parameters

| Path Parameter  | Data Type | Attribute | Description                                                                    |
| :-------------- | :-------- | :-------- | :----------------------------------------------------------------------------- |
| `{environment}` | string    | 必須      | テスト環境: `https://integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com` |

### Query Parameters

| Query Parameter | Data Type | Attribute | Description                                                                                                                                                                                                                                                                                                                                      |
| :-------------- | :-------- | :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `refresh_token` | string    | 必須      | [GET /token/generate](./get-token-generate.md) レスポンスで返された Refresh Token です。<br/>IMPORTANT: Refresh Token が URL デコード文字で生成された場合、それをクエリーパラメーターとしてエンコードすることを確認してください。詳しくは、[Query Parameter Value Encoding](../../README.md#query-parameter-value-encoding) を参照してください。 |

#### Testing Notes

以下のいずれかのパラメータを使用し [GET /token/generate](./get-token-generate.md) で生成した `refresh_token` を `GET /token/refresh` で使用すると常にログアウトレスポンスを返します:

- The `optout@email.com` email address
- The `+00000000000` phone number

### Request Example

```sh
curl -L -X GET 'https://integ.uidapi.com/v1/token/refresh?refresh_token=RefreshToken2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq%2F90PYmajV0IPrvo51Biqh7%2FM%2BJOuhfBY8KGUn%2F%2FGsmZr9nf%2BjIWMUO4diOA92kCTF69JdP71Ooo%2ByF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA%3D%3D'
```

## Response Format

レスポンスが成功すると、ユーザーに対して発行された新しいアイデンティティトークンが返されるか、またはユーザーがオプトアウトしたことが返されます。

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

リフレッシュリクエストの前にユーザーがオプトアウトした場合は、以下の応答が返されます:

```json
{
  "status": "optout"
}
```

[Client-Side Identity JavaScript SDK](../sdks/client-side-identity-v1.md) は、このエンドポイント応答ペイロードを使用して、ユーザーセッションのライフサイクル中にユーザー ID を確立および管理します。

### Response Body Properties

| Property            | Data Type | Description                                                                                                                                                                                                                                                                              |
| :------------------ | :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `advertising_token` | string    | ユーザーの暗号化された Advertising Token（UID2 Token）です。                                                                                                                                                                                                                             |
| `refresh_token`     | string    | UID2 Service と最新の ID トークンのセットを交換できる暗号化されたトークンです。                                                                                                                                                                                                          |
| `identity_expires`  | double    | Advertising Token の有効期限を示す UNIX タイムスタンプ（ミリ秒単位）です。                                                                                                                                                                                                               |
| `refresh_from`      | double    | [Client-Side Identity JavaScript SDK](../sdks/client-side-identity-v1.md) が Advertising Token の更新を開始するタイミングを示す UNIX タイムスタンプ（ミリ秒単位）です。</br>TIP: SDK を使用していない場合、このタイムスタンプからも Advertising Token を更新することを検討してください。 |
| `refresh_expires`   | double    | Refresh Token の有効期限を示す UNIX タイムスタンプ（ミリ秒単位）です。                                                                                                                                                                                                                   |

### Response Status Codes

次の表は、`status` プロパティの値と、それに対応する HTTP ステータスコードの一覧です。

| Status         | HTTP Status Code | Description                                                                                                                                                                    |
| :------------- | :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `success`      | 200              | リクエストは成功しました。                                                                                                                                                     |
| `client_error` | 400              | リクエストに不足している、または無効なパラメータがありました。問題の詳細については、レスポンスの `message` プロパティを参照してください。                                      |
| `unauthorized` | 401              | クエストにベアラートークンが含まれていない、無効なベアラートークンが含まれている、またはリクエストされた操作を実行するのに許可されていないベアラートークンが含まれていました。 |

`status` の値が `success` 以外の場合、 `message` フィールドにその問題に関する追加情報が表示されます。
