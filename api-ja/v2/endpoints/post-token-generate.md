[UID2 Overview](../../../README.md) > [Getting Started](../../README.md) > [v2](../summary-doc-v2.md) > [Endpoints](summary-endpoints.md) > POST /token/generate

# POST /token/generate

UID2 ベースのターゲティング広告にユーザーをオプトインし、提供されたメールアドレスまたは電話番号から UID2 Token を生成します。

Used by:　このエンドポイントは、主にパブリッシャーが使用します。

> IMPORTANT: このエンドポイントは、ユーザーの PII を UID2 Token に変換してターゲティング広告を行う法的根拠を得た場合にのみ呼び出すようにしてください。このエンドポイントは、オプトアウトの記録をチェックしません。オプトアウトリクエストをチェックするには、[POST /token/refresh](./post-token-refresh.md) エンドポイントを使用してください。

以下のインテグレーション・ワークフローは、このエンドポイントを使用します:

- [Client-Side JavaScript SDK Integration Guide](../guides/publisher-client-side.md)
- [Publisher Integration Guide, Server-Only (Without SDK)](../guides/custom-publisher-integration.md)

## Request Format

`POST '{environment}/v2/token/generate'`

このエンドポイントリクエストについて知っておくべきことは、以下の通りです:

- サービスにアクセスする際に使用する API キーを秘密にするため、 UID2 Token は認証後にサーバー側でのみ生成する必要があります。
- すべてのリクエストを秘密鍵で暗号化する必要があります。詳細と Python スクリプトの例については、 [リクエストの暗号化とレスポンスの復号化](../ref-info/encryption-decryption.md) を参照してください。

### Path Parameters

| Path Parameter  | Data Type | Attribute | Description                                                                                                                                                                                                   |
| :-------------- | :-------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `{environment}` | string    | 必須      | テスト環境: `https://operator-integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com`<br/>リージョンごとのオペレータを含む全リストは [Environments](../summary-doc-v2.md#environments) を参照してください。 |

### Unencrypted JSON Body Parameters

リクエストを暗号化する際、JSON ボディに Key-Value ペアとして含めるパラメータは、以下のいずれか 1 つだけである必要があります。

| Body Parameter | Data Type | Attribute      | Description                                                                                                                                                             |
| :------------- | :-------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `email`        | string    | 条件付きで必要 | トークンを生成するメールアドレスです。                                                                                                                                  |
| `email_hash`   | string    | 条件付きで必要 | [SHA256 ハッシュし、base64 エンコード](../../README.md#email-address-hash-encoding) した [正規化](../../README.md#email-address-normalization) 済みメールアドレスです。 |
| `phone`        | string    | 条件付きで必要 | トークンを生成する [正規化](../../README.md#phone-number-normalization) 済み電話番号です。                                                                              |
| `phone_hash`   | string    | 条件付きで必要 | [SHA256 ハッシュし、base64 エンコード](../../README.md#phone-number-hash-encoding) した、[正規化](../../README.md#phone-number-normalization) 済み電話番号です。        |
| `policy`       | number    | オプション     | (Beta) トークン生成ポリシーの ID です。[Token Generation Policy](#token-generation-policy) を参照してください。                                                         |

### Request Examples

> IMPORTANT: サービスにアクセスするために使用される API キーを確実に秘密にするために、API キーを使用する必要のない [POST /token/refresh](post-token-refresh.md) と異なり、`POST /token/generate` エンドポイントをサーバー側から呼び出す必要があります。

以下は、各パラメータの暗号化されていない JSON リクエストボディの例で、このうちの 1 つはトークン生成リクエストに含める必要があります:

```json
{
  "email": "username@example.com"
}
```

```json
{
  "email_hash": "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ="
}
```

```json
{
  "phone": "+12345678901"
}
```

```json
{
  "phone_hash": "wdN1alhrbw1Bmz49GzKGdPvGxLhCNn7n3teAOQ/FSK4="
}
```

以下は、プレースホルダー値を含む暗号化されたトークン生成リクエストのフォーマットです:

```sh
echo '[Unencrypted-JSON-Request-Body]' \
  | encrypt_request.py [Your-Client-Secret] \
  | curl -X POST 'https://prod.uidapi.com/v2/token/generate' -H 'Authorization: Bearer [Your-Client-API-Key]' -d @- \
  | decrypt_response.py [Your-Client-Secret]
```

以下は、メールアドレスハッシュの暗号化トークン生成リクエストの例です:

```sh
echo '{"email_hash": "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ="}' \
  | encrypt_request.py DELPabG/hsJsZk4Xm9Xr10Wb8qoKarg4ochUdY9e+Ow= \
  | curl -X POST 'https://prod.uidapi.com/v2/token/generate' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=' -d @- \
  | decrypt_response.py DELPabG/hsJsZk4Xm9Xr10Wb8qoKarg4ochUdY9e+Ow=
```

詳細と Python スクリプトの例については、[リクエストの暗号化とレスポンスの復号化](../ref-info/encryption-decryption.md) を参照してください。

## Decrypted JSON Response Format

> NOTE: レスポンスは、HTTP ステータスコードが 200 の場合のみ暗号化されます。それ以外の場合、レスポンスは暗号化されません。

復号化に成功すると、指定されたメールアドレス、電話番号、またはそれぞれのハッシュに対するユーザーの Advertising Token および Refresh Token が返されます。

```json
{
  "body": {
    "advertising_token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b/besPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM+ewMzXXM8G9j8Q=",
    "refresh_token": "RefreshToken2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq/90PYmajV0IPrvo51Biqh7/M+JOuhfBY8KGUn//GsmZr9nf+jIWMUO4diOA92kCTF69JdP71Ooo+yF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA==",
    "identity_expires": 1633643601000,
    "refresh_from": 1633643001000,
    "refresh_expires": 1636322000000,
    "refresh_response_key": "wR5t6HKMfJ2r4J7fEGX9Gw=="
  },
  "status": "success"
}
```

以下は、ポリシーがユーザーのオプトアウトを受け入れる場合の応答例です。

```json
{
  "status": "optout"
}
```

[Client-Side JavaScript SDK (v2)](../sdks/client-side-identity.md) は、このエンドポイント応答ペイロードを使用して、ユーザーセッションのライフサイクル中にユーザー ID を確立・管理します。

### Response Body Properties

| Property               | Data Type | Description                                                                                                                                                                                                                                                                             |
| :--------------------- | :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `advertising_token`    | string    | ユーザーの暗号化された Advertising Token（UID2）です。                                                                                                                                                                                                                                  |
| `refresh_token`        | string    | UID2 Service と最新の ID トークンのセットを交換できる暗号化されたトークンです。                                                                                                                                                                                                         |
| `identity_expires`     | double    | Advertising Token の有効期限を示す UNIX タイムスタンプ（ミリ秒単位）です。                                                                                                                                                                                                              |
| `refresh_from`         | double    | [Client-Side JavaScript SDK (v2)](../sdks/client-side-identity.md) が Advertising Token の更新を開始するタイミングを示す UNIX タイムスタンプ（ミリ秒単位）です。<br/>TIP: SDK を使用していない場合は、このタイムスタンプからも Advertising Token を更新することを検討してみてください。 |
| `refresh_expires`      | double    | Refresh Token の有効期限を示す UNIX タイムスタンプ（ミリ秒単位）です。                                                                                                                                                                                                                  |
| `refresh_response_key` | string    | [POST /token/refresh](post-token-refresh.md) リクエストでレスポンス復号化のために使用される鍵です。                                                                                                                                                                                     |

### Response Status Codes

次の表は、`status` プロパティの値と、それに対応する HTTP ステータスコードの一覧です。

| Status         | HTTP Status Code | Description                                                                                                                                                                    |
| :------------- | :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `success`      | 200              | リクエストは成功しました。レスポンスは暗号化されています。                                                                                                                     |
| `optout`       | 200              | リクエストは成功しました。ユーザーがオプトアウトしたため、トークンを生成できませんでした。                                                                                     |
| `client_error` | 400              | リクエストに不足している、または無効なパラメータがありました。                                                                                                                 |
| `unauthorized` | 401              | クエストにベアラートークンが含まれていない、無効なベアラートークンが含まれている、またはリクエストされた操作を実行するのに許可されていないベアラートークンが含まれていました。 |

`status` の値が `success` 以外の場合、 `message` フィールドにその問題に関する追加情報が表示されます。

## Test Identities

| Type  | Identity             | Purpose                                                                                                                                 | Next Endpoint                                  |
| :---- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- |
| Email | `validate@email.com` | キャッシュした `advertising_token` が、指定したメールアドレスの `advertising_token` と一致するかどうかをテストします。                  | [POST /token/validate](post-token-validate.md) |
| Email | `optout@email.com`   | このメールアドレスをリクエストに使用すると、常に `refresh_token` を使用した ID レスポンスが生成され、ログアウトのレスポンスになります。 | [POST /token/refresh](post-token-refresh.md)   |
| Phone | `+12345678901`       | キャッシュした `advertising_token` が、指定した電話番号の `advertising_token` と一致するかどうかをテストします。                        | [POST /token/validate](post-token-validate.md) |
| Phone | `+00000000000`       | この電話番号をリクエストに使用すると、常に `refresh_token` を含む ID レスポンスが生成され、ログアウトのレスポンスになります。           | [POST /token/refresh](post-token-refresh.md)   |

# Token Generation Policy

トークン生成ポリシーは、トークンを生成するタイミングを呼び出し元が決定できるようにします。これは、リクエスト・ボディの **integer ID** として渡されます（キー 'policy' を使用）。パラメータが省略された場合、ID = 0 のポリシーが適用されます。

| ID  | Description                                                      |
| :-- | :--------------------------------------------------------------- |
| 0   | 必ずトークンを生成します。                                       |
| 1   | ユーザーがオプトアウトしていない場合のみ、トークンを生成します。 |
