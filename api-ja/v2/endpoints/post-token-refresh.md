[UID2 API Documentation](../../README.md) > [v2](../README.md) > [Endpoints](./README.md) > POST /token/refresh

# POST /token/refresh

[POST /token/generate](./post-token-generate.md) エンドポイントを使用して発行されたリフレッシュトークンを指定し、ユーザーの新しいトークンを生成することができます。

> NOTE: このエンドポイントは、API キーを使用する必要がないため、クライアント側（例えば、ブラウザやモバイルアプリなど）から呼び出すことができます。

以下のインテグレーション・ワークフローは、このエンドポイントを使用します:

- [Publisher - Standard](../guides/publisher-client-side.md)
- [Publisher - Custom](../guides/custom-publisher-integration.md)

## Request Format

`POST '{environment}/v2/token/refresh'`

このエンドポイントについて知っておくべきことは、以下の通りです:

- トークン更新のリクエストには暗号化は必要ありません。
- HTTP ステータスコードが 200 の場合のみ、レスポンスが暗号化されます。それ以外の場合、レスポンスは暗号化されません。
- レスポンスを復号化するには、リクエストのリフレッシュトークンが返された [POST /token/generate](./post-token-generate.md) または `POST /token/refresh` レスポンスの `refresh_response_key` 値を使用する必要があります。
- v1 `token/generate` レスポンスからリフレッシュトークンをリクエストで送信した場合、レスポンスは暗号化されません。

### Path Parameters

| Path Parameter  | Data Type | Attribute | Description                                                                             |
| :-------------- | :-------- | :-------- | :-------------------------------------------------------------------------------------- |
| `{environment}` | string    | 必須      | テスト環境: `https://operator-integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com` |

#### Testing Notes

[POST /token/generate](./post-token-generate.md) リクエストで以下のパラメータのいずれかを使用すると、常に `refresh_token` による ID 応答が生成され、`POST /token/refresh` エンドポイントと共に使用するとログアウト応答となります。

- `optout@email.com` メールアドレス
- 電話番号 (`+00000000000`)

### Request Example

[POST /token/generate](./post-token-generate.md) リクエストが返す `refresh_token` と `refresh_response_key` 値を含む、プレースホルダー値を持つトークンリフレッシュのリクエスト形式を以下に示します:

```sh
echo [refresh_token] \
  | curl -X POST 'https://prod.uidapi.com/v2/token/refresh' -H 'Authorization: Bearer [Your-Client-API-Key]' -d @- \
  | decrypt_response.py [refresh_response_key] --is-refresh
```

以下は、トークンリフレッシュリクエストの例です:

```sh
echo AAAAAQLMcnV+YE6/xoPDZBJvJtWyPyhF9QTV4242kFdT+DE/OfKsQ3IEkgCqD5jmP9HuR4O3PNSVnCnzYq2BiDDz8SLsKOo6wZsoMIn95jVWBaA6oLq7uUGY5/g9SUOfFmX5uDXUvO0w2UCKi+j9OQhlMfxTsyUQUzC1VQOx6ed/gZjqH/Sw6Kyk0XH7AlziqSyyXA438JHqyJphGVwsPl2LGCH1K2MPxkLmyzMZ2ghTzrr0IgIOXPsL4lXqSPkl/UJqnO3iqbihd66eLeYNmyd1Xblr3DwYnwWdAUXEufLoJbbxifGYc+fPF+8DpykpyL9neq3oquxQWpyHsftnwYaZT5EBZHQJqAttHUZ4yQ== \
  | curl -X POST 'https://prod.uidapi.com/v2/token/refresh' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=' -d @- \
  | decrypt_response.py wR5t6HKMfJ2r4J7fEGX9Gw== --is-refresh
```

詳細と Python スクリプトの例については、[リクエストの暗号化とレスポンスの復号化](../encryption-decryption.md) を参照してください。

## Decrypted JSON Response Format

> NOTE: レスポンスは、HTTP ステータスコードが 200 の場合のみ暗号化されます。それ以外の場合、レスポンスは暗号化されない。

暗号化された成功応答は、ユーザーに対して発行された新しい ID トークンを返すか、ユーザーがオプトアウトしたことを示します。

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

リフレッシュリクエストの前にユーザーがオプトアウトした場合は、以下の応答が返されます:

```json
{
  "status": "optout"
}
```

[Client-Side Identity JavaScript SDK](../sdks/client-side-identity.md) は、このエンドポイント応答ペイロードを使用して、ユーザーセッションのライフサイクル中にユーザー ID を確立・管理します。

### Response Body Properties

| Property               | Data Type | Description                                                                                                                                                                                                                                                                                 |
| :--------------------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `advertising_token`    | string    | ユーザーの暗号化された Advertising Token（UID2）です。                                                                                                                                                                                                                                      |
| `refresh_token`        | string    | UID2 Service と最新の ID トークンのセットを交換できる暗号化されたトークンです。                                                                                                                                                                                                             |
| `identity_expires`     | double    | Advertising Token の有効期限を示す UNIX タイムスタンプ（ミリ秒単位）です。                                                                                                                                                                                                                  |
| `refresh_from`         | double    | [Client-Side Identity JavaScript SDK](../sdks/client-side-identity.md) が Advertising Token の更新を開始するタイミングを示す UNIX タイムスタンプ（ミリ秒単位）です。</br>TIP: SDK を使用していない場合は、このタイムスタンプからも Advertising Token を更新することを検討してみてください。 |
| `refresh_expires`      | double    | Refresh Token の有効期限を示す UNIX タイムスタンプ（ミリ秒単位）です。                                                                                                                                                                                                                      |
| `refresh_response_key` | string    | [POST /token/refresh](./post-token-refresh.md) リクエストでレスポンス復号化のために使用される鍵です。<br>A key to be used in a new [POST /token/refresh](./post-token-refresh.md) request for response decryption.                                                                          |

### Response Status Codes

次の表は、`status` プロパティの値と、それに対応する HTTP ステータスコードの一覧です。

| Status          | HTTP Status Code | Description                                                                                                                                                                    |
| :-------------- | :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `success`       | 200              | リクエストは成功しました。レスポンスは暗号化されています。                                                                                                                     |
| `optout`        | 200              | ユーザーがオプトアウトした。このステータスは、許可されたリクエストに対してのみ返されます。                                                                                     |
| `client_error`  | 400              | リクエストに不足している、または無効なパラメータがありました。                                                                                                                 |
| `invalid_token` | 400              | リクエストには無効な ID トークンが指定されました。このステータスは、許可されたリクエストに対してのみ返されます。                                                               |
| `unauthorized`  | 401              | クエストにベアラートークンが含まれていない、無効なベアラートークンが含まれている、またはリクエストされた操作を実行するのに許可されていないベアラートークンが含まれていました。 |

`status` の値が `success` 以外の場合、 `message` フィールドにその問題に関する追加情報が表示されます。
