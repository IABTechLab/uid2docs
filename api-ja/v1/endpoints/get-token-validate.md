[UID2 API Documentation](../../README.md) > [v1](../README.md) > [Endpoints](./README.md) > GET /token/validate

# GET /token/validate (Deprecated)

> IMPORTANT: UID2 API v1 は非推奨となり、2023 年 3 月 31 日までにすべての v1 SDK ファイルとエンドポイント、v0 SDK ファイル、およびバージョン管理されていないエンドポイントが削除され、現在のユーザーのみがサポートされるようになります。2023 年 3 月 31 日までに、必ず [UID2 API v2](../../v2/upgrades/upgrade-guide.md) へのアップグレードをお願いします。初めてフレームワークに触れる方は、[UID2 API v2](../../v2/README.md) をご利用ください。

Advertising Token が指定されたハッシュ化された、またはハッシュ化されていないメールアドレスまたは電話番号と一致するかどうかを検証します。

> NOTE: このエンドポイントは、主に新しいインテグレーションのテストとトラブルシューティングのための使用を対象としています。

## Request Format

`GET '{environment}/v1/token/validate?token={tokenValue}&{queryParameter}={queryParameterValue}'`

### Path Parameters

| Path Parameter  | Data Type | Attribute | Description                                                                             |
| :-------------- | :-------- | :-------- | :-------------------------------------------------------------------------------------- |
| `{environment}` | string    | 必須      | テスト環境: `https://operator-integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com` |

### Query Parameters

- 以下のパラメータは、いずれか 1 つだけを指定します。`email`、 `email_hash`、 `phone`、または `phone_hash`。
- ID をテストするには、`validate@email.com`のメールアドレス、または `+12345678901` の電話番号を使用します。詳細は、パブリッシャー向けの [Client-Side JavaScript SDK Integration Guide (Deprecated)](../guides/publisher-client-side.md) および [Publisher Integration Guide, Server-Only (Without SDK) (Deprecated)](../guides/custom-publisher-integration.md) の FAQ のセクションを参照してください。

| Query Parameter | Data Type | Attribute      | Description                                                                                                                                                                                                                                                                                                                             |
| :-------------- | :-------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `token`         | string    | 必須           | [GET /token/generate](./get-token-generate.md) レスポンスによって返された Advertising Token です。<br/>IMPORTANT: トークンが URL デコード文字で生成された場合、必ずクエリパラメータとしてエンコードするようにしてください。詳しくは、[Query Parameter Value Encoding](../README.md#query-parameter-value-encoding) を参照してください。 |
| `email`         | string    | 条件付きで必要 | トークンを検証する [URL エンコード](../README.md#query-parameter-value-encoding) したメールアドレスです。                                                                                                                                                                                                                               |
| `email_hash`    | string    | 条件付きで必要 | トークンを検証する [SHA256 ハッシュし、URL エンコード、base64 エンコード](../../README.md#email-address-hash-encoding) した、[正規化](../../README.md#email-address-normalization) 済みメールアドレスです。                                                                                                                             |
| `phone`         | string    | 条件付きで必要 | トークンを検証する [URL エンコード](../README.md#query-parameter-value-encoding) した [正規化](../../README.md#phone-number-normalization) 済み電話番号です。                                                                                                                                                                           |
| `phone_hash`    | string    | 条件付きで必要 | [SHA256 ハッシュし、URL エンコード、base64 エンコード](../../README.md#phone-number-hash-encoding) した、[正規化](../../README.md#phone-number-normalization) 済み電話番号です。                                                                                                                                                        |

### Request Examples

メールアドレスの検証リクエスト:

```sh
curl -L -X GET 'https://operator-integ.uidapi.com/v1/token/validate?token=AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D&email=validate@email.com' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

メールアドレスハッシュの検証リクエスト:

```sh
curl -L -X GET 'https://operator-integ.uidapi.com/v1/token/validate?token=AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D&email_hash=eVvLS%2FVg%2BYZ6%2Bz3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc%3D' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

電話番号の検証リクエスト:

```sh
curl -L -X GET 'https://operator-integ.uidapi.com/v1/token/validate?token=AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D&phone=%2B12345678901' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

電話番号ハッシュの検証リクエスト:

```sh
curl -L -X GET 'https://operator-integ.uidapi.com/v1/token/validate?token=AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D&phone_hash=wdN1alhrbw1Bmz49GzKGdPvGxLhCNn7n3teAOQ%2FFSK4%3D' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

## Response

レスポンスには、指定された Advertising Token の検証結果を示す論理値を返します。

```json
{
  "body": true,
  "status": "success"
}
```

## Body Response Properties

| Property | Data Type | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `body`   | boolean   | 値が `true` の場合は、リクエストで指定されたメールアドレス、電話番号、またはそれぞれのハッシュが、Advertising Token を生成するために使用されたものと同じであることを示します。<br/>値が `false` の場合は、以下のいずれかを示します。<br>- リクエストに無効な Advertising Token が含まれていた。<br>- リクエストに指定されたメールアドレス、電話番号、またはそれぞれのハッシュが、Advertising Token の生成に使用されたものと異なるか、テスト用メールアドレス `validate@email.com` `+12345678901` 電話番号のものでない場合。 |

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
|
