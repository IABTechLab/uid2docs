---
title: POST /token/refresh
description: Refresh Token を使用して、更新された UID2 Token を生成します。
hide_table_of_contents: false
sidebar_position: 04
---

# POST /token/refresh
[POST&nbsp;/token/generate](post-token-generate.md) エンドポイントから返された、対応する未使用のリフレッシュトークンを送信して、新しい [UID2 Token](../ref-info/glossary-uid.md#gl-uid2-token) を生成します。

Used by: このエンドポイントは、主にパブリッシャーが使用します。

このエンドポイントは API キーを使用する必要がないため、クライアントサイド(ブラウザやモバイルアプリなど)から呼び出すことができます。

>NOTE: このエンドポイントを直接呼び出すのではなく、UID2 SDK を使って管理することもできます。オプションの概要については、[SDKs: Summary](../sdks/summary-sdks.md) を参照してください。

## Request Format 

`POST '{environment}/v2/token/refresh'`

[POST&nbsp;/token/generate](post-token-generate.md) または `POST /token/refresh` のレスポンスで返された `refresh_token` 値の内容を POST body として追加します。

このエンドポイントについて知っておくべきことは、以下のとおりです:

- トークン更新のリクエストには暗号化は必要ありません。
- リクエストが HTTP ステータスコード 200 で成功すると、新しい UID2 Token または Out-Out 情報が返されます。
- 成功したレスポンスは、そのレスポンスに新しいトークンまたは Opt-Out 情報が含まれているかどうかにかかわらず暗号化されます。エラー・レスポンスは暗号化されません。
- レスポンスを復号化するには、このトークンに対する最新の `refresh_response_key` 値を使用します。`refresh_response_key` の値は、[POST&nbsp;/token/generate](post-token-generate.md) と `POST /token/refresh` のレスポンスで返されます。トークンがリフレッシュされるたびに、新しい `refresh_response_key` が返されます。現在のレスポンスを復号化するには、必ず最新のものを使用してください。

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | 必須 | テスト (インテグレーション) 環境: `https://operator-integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com`<br/>地域オペレーターを含む全リストは、[Environments](../getting-started/gs-environments.md) を参照してください。<br/>Notes:<ul><li>`integ` 環境と `prod` 環境は異なる [API keys](../ref-info/glossary-uid.md#gl-api-key) を必要とします。</li><li>トークンの有効期限は変更される可能性がありますが、`integ` 環境では常に `prod` 環境よりも大幅に短くなります。</li></ul> |

#### Testing Notes

[POST&nbsp;/token/generate](post-token-generate.md) リクエストで以下のパラメータのいずれかを使用すると、常に `refresh_token` による ID レスポンスが生成され、`POST /token/refresh` エンドポイントと共に使用するとログアウトレスポンスとなります。

- メールアドレス `refresh-optout@example.com`
- 電話番号 `+00000000002`

### Request Example

詳細といくつかのプログラミング言語でのコードの例は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md) を参照してください。

## Decrypted JSON Response Format

復号化された成功したレスポンスには、ユーザーの新しい UID2 Token (`advertising_token`) と関連する値が含まれるか、ユーザーがオ Opt-Out したことを示します。

> NOTE: レスポンスは、HTTP ステータスコードが 200 の場合のみ暗号化されます。それ以外の場合は、レスポンスは暗号化されません。

このセクションには、次のサンプルレスポンスが含まれています:

- [Successful Response With Tokens](#successful-response-with-tokens)
- [Successful Response With Opt-Out](#successful-response-with-opt-out)
- [Error Response](#error-response)

#### Successful Response With Tokens

すべての値が有効で、ユーザーが Opt-Out していない場合、レスポンスは成功し、新しい UID2 Token が関連する値とともに返されます。以下の例は、トークンを含む成功したレスポンスを復号したものです:

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

#### Successful Response With Opt-Out

ユーザーが Opt-Out した場合、レスポンスは成功しますが、新しい UID2 Token は返されません。以下の例は、復号化された OptーOut レスポンスを示しています:

```json
{
  "status": "optout"
}
```

#### Error Response

エラーレスポンスは以下のようなものになる可能性があります:

```json
{
  "status": "client_error",
  "message": "Client Error"
}
```

### Response Body Properties

| Property  | Data Type | Description |
| :--- | :--- | :--- |
| `advertising_token`    | string    | ユーザーの [UID2 token](../ref-info/glossary-uid.md#gl-uid2-token) (Advertising Token とも呼ばれます) です。 |
| `refresh_token`        | string    | UID2 Service と最新の ID トークンのセットを交換できる暗号化されたトークンです。 |
| `identity_expires`     | double    | UID2 Token の有効期限を示す UNIX タイムスタンプ (ミリ秒単位) です。 |
| `refresh_from`         | double    | UID2 SDK for JavaScript ([UID2 SDK for JavaScript Reference Guide](../sdks/client-side-identity.md) を参照してください) が UID2 Token のリフレッシュを開始するタイミングを示す UNIX タイムスタンプ(ミリ秒単位)。<br/>TIP: SDK を使用していない場合は、このタイムスタンプから Advertising Token もリフレッシュすることを検討してください。|
| `refresh_expires`      | double    | Refresh Token の有効期限を示す UNIX タイムスタンプ(ミリ秒単位)。 |
| `refresh_response_key` | string    | [POST&nbsp;/token/refresh](post-token-refresh.md) リクエストでレスポンス復号化のために使用される鍵です。 |

### Response Status Codes

次の表は、`status` プロパティの値と、それに対応する HTTP ステータスコードの一覧です。

| Status          | HTTP Status Code | Description                                                                                                                                                                    |
| :-------------- | :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `success`       | 200              | リクエストは成功し、新しい UID2 Token と関連する値がレスポンスとして返されます。レスポンスは暗号化されています。                                                                                                                     |
| `optout`        | 200              | ユーザーがオプトアウトした。このステータスは許可されたリクエストに対してのみ返されます。レスポンスは暗号化されます。 |
| `client_error`  | 400              | リクエストに不足している、または無効なパラメータがありました。                                                                                                                 |
| `invalid_token` | 400              | リクエストで指定された `refresh_token` の値が無効です。このステータスは許可されたリクエストに対してのみ返されます。 |
| `expired_token` | 400              | リクエストで指定された `refresh_token` 値は期限切れのトークンです。 |
| `unauthorized`  | 401              | クエストにベアラートークンが含まれていない、無効なベアラートークンが含まれている、またはリクエストされた操作を実行するのに許可されていないベアラートークンが含まれていました。 |

`status` の値が `success` または `optout` 以外であれば、 `message` フィールドにその問題に関する追加情報が表示されます。
