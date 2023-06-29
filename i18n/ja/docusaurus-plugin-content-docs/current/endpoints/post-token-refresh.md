---
title: POST /token/refresh
description: Refresh Token を使用して、更新された UID2 Token を生成します。
hide_table_of_contents: false
sidebar_position: 04
---

# POST /token/refresh

[POST /token/generate](./post-token-generate.md) エンドポイントを使用して発行された Refresh Token を指定し、ユーザーの新しいトークンを生成できます。

Used by:　このエンドポイントは、主にパブリッシャーが使用します。

> NOTE: このエンドポイントは、API キーを使用する必要がないため、クライアント側（たとえば、ブラウザやモバイルアプリなど）から呼び出せます。

## Request Format

`POST '{environment}/v2/token/refresh'`

このエンドポイントについて知っておくべきことは、以下のとおりです:

- トークン更新のリクエストには暗号化は必要ありません。
- HTTP ステータスコードが 200 の場合のみ、レスポンスが暗号化されます。それ以外の場合、レスポンスは暗号化されません。
- レスポンスを復号化するには、リクエストに含まれる Refresh Token を返す [POST /token/generate](post-token-generate.md) または `POST /token/refresh` レスポンスで返す `refresh_response_key` 値が必要です。
- v1 `token/generate` レスポンスから Refresh Token をリクエストで送信した場合、レスポンスは暗号化されません。

### Path Parameters

| Path Parameter  | Data Type | Attribute | Description                                                                                                                                                                                                   |
| :-------------- | :-------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `{environment}` | string    | 必須      | テスト環境: `https://operator-integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com`<br/>リージョンごとのオペレーターを含む全リストは [Environments](../summary-doc-v2.md#environments) を参照してください。 |

NOTE: インテグレーション環境と本番環境では、異なる[APIキー](../ref-info/glossary-uid.md#gl-api-key)が必要です。

#### Testing Notes

[POST /token/generate](post-token-generate.md) リクエストで以下のパラメータのいずれかを使用すると、常に `refresh_token` による ID 応答が生成され、`POST /token/refresh` エンドポイントと共に使用するとログアウト応答となります。

- `optout@email.com` メールアドレス
- 電話番号 (`+00000000000`)

### Request Example

詳細と Python スクリプトの例は、[リクエストの暗号化とレスポンスの復号化 (Python script example)](../getting-started/gs-encryption-decryption.md#uid2_requestpy) を参照してください。

## Decrypted JSON Response Format

> NOTE: レスポンスは、HTTP ステータスコードが 200 の場合のみ暗号化されます。それ以外の場合は、レスポンスは暗号化されません。

このセクションには、次のサンプルレスポンスが含まれています:

- [Successful Response With Tokens](#successful-response-with-tokens)
- [Optout](#optout)
- [Error Response](#error-response)

#### Successful Response With Tokens

復号化された成功したレスポンスは、ユーザーに対して発行された新しい ID トークンを返すか、ユーザーがオプトアウトしたことを示します。次の例では、ID トークンを返します。

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

#### Error Response

エラーレスポンスは以下のようなものになる可能性があります：

```json
{
  "status": "client_error",
  "message": "Client Error"
}
```

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

| Status          | HTTP Status Code | Description                                                                                                                                                                    |
| :-------------- | :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `success`       | 200              | リクエストは成功しました。レスポンスは暗号化されています。                                                                                                                     |
| `optout`        | 200              | ユーザーがオプトアウトした。このステータスは、許可されたリクエストに対してのみ返されます。                                                                                     |
| `client_error`  | 400              | リクエストに不足している、または無効なパラメータがありました。                                                                                                                 |
| `invalid_token` | 400              | リクエストには無効な ID トークンが指定されました。このステータスは、許可されたリクエストに対してのみ返されます。                                                               |
| `unauthorized`  | 401              | クエストにベアラートークンが含まれていない、無効なベアラートークンが含まれている、またはリクエストされた操作を実行するのに許可されていないベアラートークンが含まれていました。 |

`status` の値が `success` 以外の場合、 `message` フィールドにその問題に関する追加情報が表示されます。
