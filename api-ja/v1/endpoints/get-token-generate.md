[UID2 API Documentation](../../getting-started.md) > [v1](../README.md) > [Endpoints](./README.md) > GET /token/generate

# GET /token/generate (Deprecated)

> IMPORTANT: UID2 API v1 は非推奨となり、2023 年 3 月 31 日までにすべての v1 SDK ファイルとエンドポイント、v0 SDK ファイル、およびバージョン管理されていないエンドポイントが削除され、現在のユーザーのみがサポートされるようになります。2023 年 3 月 31 日までに、必ず [UID2 API v2](../../v2/upgrades/upgrade-guide.md) へのアップグレードをお願いします。初めてフレームワークに触れる方は、[UID2 API v2](../../v2/summary-doc-v2.md) をご利用ください。

ハッシュ化した、あるいはしていないメールアドレスや電話番号から UID2 Token を生成します。

> IMPORTANT: UID2 Token は、認証後にサーバーサイドでのみ生成しなければなりません。セキュリティ上の理由から、ブラウザサイドでのトークン生成は禁じられています。

以下のインテグレーションワークフローは、このエンドポイントを使用します:

- [Publisher Client-Side JavaScript SDK Integration Guide (Deprecated)](../guides/publisher-client-side.md)
- [Publisher Integration Guide, Server-Only (Without SDK) (Deprecated)](../guides/custom-publisher-integration.md)

## Request Format

`GET '{environment}/v1/token/generate?{queryParameter}={queryParameterValue}'`

### Path Parameters

| Path Parameter  | Data Type | Attribute | Description                                                                             |
| :-------------- | :-------- | :-------- | :-------------------------------------------------------------------------------------- |
| `{environment}` | string    | 必須      | テスト環境: `https://operator-integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com` |

### Query Parameters

> IMPORTANT: 以下のパラメータは、いずれか 1 つだけを指定します。

| Query Parameter | Data Type | Attribute      | Description                                                                                                                                                                                               |
| :-------------- | :-------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `email`         | string    | 条件付きで必要 | トークンを生成する [URL エンコード](../README.md#query-parameter-value-encoding) したメールアドレスです。<br>                                                                                             |
| `email_hash`    | string    | 条件付きで必要 | [SHA256 ハッシュし、URL エンコード、base64 エンコード](../../getting-started.md#email-address-hash-encoding) した [正規化](../../getting-started.md#email-address-normalization) 済みメールアドレスです。 |
| `phone`         | string    | 条件付きで必要 | トークンを生成する [正規化](../../getting-started.md#phone-number-normalization) と [URL エンコード](../README.md#query-parameter-value-encoding) した電話番号です。                                      |
| `phone_hash`    | string    | 条件付きで必要 | [SHA256 ハッシュし、URL エンコード、base64 エンコード](../../getting-started.md#phone-number-hash-encoding) した、[正規化](../../getting-started.md#phone-number-normalization) 済み電話番号です。        |

### Request Examples

> IMPORTANT: サービスにアクセスするための API キーを秘密にするために、API キーを使用する必要のない [GET /token/refresh](./get-token-refresh.md) とは異なり、`GET /token/generate` エンドポイントをサーバーサイドから呼び出す必要があります。

メールアドレスのトークン生成リクエスト:

```sh
curl -L -X GET 'https://operator-integ.uidapi.com/v1/token/generate?email=username@example.com' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

メールアドレスハッシュのトークン生成リクエスト:

```sh
curl -L -X GET 'https://operator-integ.uidapi.com/v1/token/generate?email_hash=eVvLS%2FVg%2BYZ6%2Bz3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc%3D' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

電話番号のトークン生成リクエスト:

```sh
curl -L -X GET 'https://operator-integ.uidapi.com/v1/token/generate?phone=%2B1111111111' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

電話番号ハッシュのトークン生成リクエスト:

```sh
curl -L -X GET 'https://operator-integ.uidapi.com/v1/token/generate?phone_hash=eVvLS%2FVg%2BYZ6%2Bz3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc%3D' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

## Response Format

レスポンスには、指定されたメールアドレス、電話番号、またはそれぞれのハッシュに対するユーザーの Advertising Token および Refresh Token を返します。

```json
{
  "body": {
    "advertising_token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b/besPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM+ewMzXXM8G9j8Q=",
    "refresh_token": "RefreshToken2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq/90PYmajV0IPrvo51Biqh7/M+JOuhfBY8KGUn//GsmZr9nf+jIWMUO4diOA92kCTF69JdP71Ooo+yF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA==",
    "identity_expires": 1633643601000,
    "refresh_from": 1633643001000,
    "refresh_expires": 1636322000000
  },
  "status": "success"
}
```

[Client-Side JavaScript SDK v1](../sdks/client-side-identity-v1.md) は、このエンドポイント応答ペイロードを使用して、ユーザーセッションのライフサイクル中にユーザー ID を確立および管理します。

### Response Body Properties

| Property            | Data Type | Description                                                                                                                                                                                                                                                                      |
| :------------------ | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `advertising_token` | string    | ユーザーの暗号化された Advertising Token（UID2 Token）です。                                                                                                                                                                                                                     |
| `refresh_token`     | string    | UID2 Service と最新の ID トークンのセットを交換できる暗号化されたトークンです。                                                                                                                                                                                                  |
| `identity_expires`  | double    | Advertising Token の有効期限を示す UNIX タイムスタンプ（ミリ秒単位）です。                                                                                                                                                                                                       |
| `refresh_from`      | double    | [Client-Side JavaScript SDK v1](../sdks/client-side-identity-v1.md) が Advertising Token の更新を開始するタイミングを示す UNIX タイムスタンプ（ミリ秒単位）<br/>TIP: SDK を使っていない場合は、このタイムスタンプからも Advertising Token を更新することを検討してみてください。 |
| `refresh_expires`   | double    | Refresh Token の有効期限を示す UNIX タイムスタンプ（ミリ秒単位）です。                                                                                                                                                                                                           |

レスポンスのステータス値については，[Response Structure and Status Codes](../../getting-started.md#response-structure-and-status-codes)　を参照してください。

### Response Status Codes

次の表は、`status` プロパティの値と、それに対応する HTTP ステータスコードの一覧です。

| Status         | HTTP Status Code | Description                                                                                                                                                                    |
| :------------- | :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `success`      | 200              | リクエストは成功しました。                                                                                                                                                     |
| `client_error` | 400              | リクエストに不足している、または無効なパラメータがありました。問題の詳細については、レスポンスの `message` プロパティを参照してください。                                      |
| `unauthorized` | 401              | クエストにベアラートークンが含まれていない、無効なベアラートークンが含まれている、またはリクエストされた操作を実行するのに許可されていないベアラートークンが含まれていました。 |

`status` の値が `success` 以外の場合、 `message` フィールドにその問題に関する追加情報が表示されます。

## Test Identities

| Type  | Identity             | Purpose                                                                                                                       | Next Endpoint                                  |
| :---- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- |
| Email | `validate@email.com` | キャッシュした `advertising_token` が、指定したメールアドレスの `advertising_token` と一致するかをテストします。              | [GET /token/validate](./get-token-validate.md) |
| Email | `optout@email.com`   | このメールをリクエストに使用すると、常に `refresh_token` を含む ID レスポンスが生成され、ログアウトのレスポンスになります。   | [GET /token/refresh](./get-token-refresh.md)   |
| Phone | `+12345678901`       | キャッシュした `advertising_token` が、指定した電話番号の `advertising_token` と一致するかをテストします。                    | [GET /token/validate](./get-token-validate.md) |
| Phone | `+00000000000`       | この電話番号をリクエストに使用すると、常に `refresh_token` を含む ID レスポンスが生成され、ログアウトのレスポンスになります。 | [GET /token/refresh](./get-token-refresh.md)   |
