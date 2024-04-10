---
title: POST /token/validate
description: Advertising Token を検証します (テスト目的)。
hide_table_of_contents: false
sidebar_position: 03
---

# POST /token/validate
Advertising Token が指定されたハッシュ化された、またはハッシュ化されていないメールアドレスまたは電話番号と一致するかどうかを検証します。

Used by: このエンドポイントは、主にパブリッシャーが使用します。

> NOTE: このエンドポイントは、主に新しいインテグレーションのテストとトラブルシューティングのために用意されています。

## Request Format 

`POST '{environment}/v2/token/validate'`

> IMPORTANT: すべてのリクエストを秘密鍵で暗号化する必要があります。詳細といくつかのプログラミング言語でのコードの例は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md) を参照してください。


### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string    | 必須      | テスト環境: `https://operator-integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com`<br/>リージョンごとのオペレーターを含む全リストは [Environments](../getting-started/gs-environments.md) を参照してください。 |

NOTE: インテグレーション環境と本番環境では、異なる [APIキー](../ref-info/glossary-uid.md#gl-api-key) が必要です。


### Unencrypted JSON Body Parameters

- Body Parameter の表にあるように、以下の4つの有効なオプションのうち1つだけを含めます: `email`、`email_hash`、`phone`、`phone_hash` のいずれかです。テストするパラメータには、リストされている値を正確に指定してください。

| Body Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `token` | string | Required | [POST&nbsp;/token/generate](post-token-generate.md) レスポンスが返す Advertising Token です。 |
| `email` | string | Conditionally Required | トークン検証用のメールアドレスです。<br/>有効な値は `validate@email.com` だけです。 |
| `email_hash` | string | Conditionally Required | トークン検証用の [正規化された](../getting-started/gs-normalization-encoding.md#email-address-normalization) メールアドレス(`validate@email.com`) の [Base64-encoded SHA-256](../getting-started/gs-normalization-encoding.md#email-address-hash-encoding) ハッシュです。<br/>有効な値は `ntI244ZRTXwAwpki6/M5cyBYW7h/Wq576lnN3l9+W/c=` だけです。 |
| `phone` | string | Conditionally Required | トークンを生成するための [正規化された](../getting-started/gs-normalization-encoding.md#phone-number-normalization) 電話番号です。<br/>有効な値は`+12345678901` だけです。|
| `phone_hash` | string | Conditionally Required | [正規化された](../getting-started/gs-normalization-encoding.md#phone-number-normalization) 電話番号の [Base64-encoded SHA-256](../getting-started/gs-normalization-encoding.md#phone-number-hash-encoding) ハッシュです。<br/>有効な値は `EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=` だけです。|


### Request Examples

以下は、各パラメータの暗号化されていない JSON リクエストボディの例で、トークン検証のリクエストに含める必要があります:

>NOTE: 以下の例の Advertising Token は、説明のみを目的とした架空のものです。提供された値は実際の値ではありません。

```json
{
  "token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D",
  "email": "validate@example.com"
}
```
```json
{
  "token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D",
  "email_hash": "ntI244ZRTXwAwpki6/M5cyBYW7h/Wq576lnN3l9+W/c="
}
```
```json
{
  "token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D",
  "phone": "+12345678901"
}
```
```json
{
  "token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D",
  "phone_hash": "EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4="
}
```

以下は、メールアドレスハッシュの暗号化トークン検証リクエストの例です:

```sh
echo '{"token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D", "email_hash": "LdhtUlMQ58ZZy5YUqGPRQw5xUMS5dXG5ocJHYJHbAKI="}' | python3 uid2_request.py https://prod.uidapi.com/v2/token/validate [Your-Client-API-Key] [Your-Client-Secret]
```

詳細といくつかのプログラミング言語でのコードの例は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md) を参照してください。

## Decrypted JSON Response Format

> NOTE: レスポンスは、HTTP ステータスコードが 200 の場合のみ暗号化されます。それ以外の場合、レスポンスは暗号化されません。

復号化に成功したレスポンスは、以下の例に示すように、指定された Advertising Token の検証結果を示す論理値を返します。

```json
{
  "body": true,
  "status": "success"
}
```

## Body Response Properties

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `body`   | boolean   | `true`の値は、リクエストで指定されたメールアドレス、電話番号、またはそれぞれのハッシュが、Advertising Token を生成するために使用されたものと同じであることを示します。<br/>`false`の値は、次のいずれかを示します:<br/>- リクエストに無効な Advertising Token が含まれていました。<br/>- リクエストに指定されたメールアドレス、電話番号、またはそれぞれのハッシュが、[暗号化されていないJSONボディパラメータ](#unencrypted-json-body-parameters) テーブルで指定された4つの有効な値のうちの1つではありません。 |

### Response Status Codes

次の表は、`status` プロパティの値と、それに対応する HTTP ステータスコードの一覧です。

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success`      | 200 | リクエストは成功しました。レスポンスは暗号化されています。 |
| `client_error` | 400 | リクエストに不足している、または無効なパラメータがありました。 |
| `unauthorized` | 401 | クエストにベアラートークンが含まれていない、無効なベアラートークンが含まれている、またはリクエストされた操作を実行するのに許可されていないベアラートークンが含まれていました。 |

`status` の値が `success` 以外であれば、 `message` フィールドにその問題に関する追加情報が表示されます。

## Using POST /token/validate to Test

このエンドポイントを使用して、[POST&nbsp;/token/generate](../endpoints/post-token-generate.md) で送信する [DII](../ref-info/glossary-uid.md#gl-dii) が有効かどうかをテストできます。以下の手順に従ってください。

1. DII がハッシュ化されたメールアドレスか、ハッシュ化されていないメールアドレスか、電話番号かに応じて、[Unencrypted JSON Body Parameters](#unencrypted-json-body-parameters) の表に記載されている4つの有効なオプションのいずれかを使用して、[POST&nbsp;/token/generate](../endpoints/post-token-generate.md) リクエストを送信します。表に記載されている対応する値 - `email`、`email_hash`、`phone`、`phone_hash` - を使用します。

2. 返された `advertising_token` の値を次のステップで使用するために保存します。
3. Step 1 で送信した `email`、`email_hash`、`phone`、`phone_hash` の値と、Step 2 で保存した `advertising_token` を `token` プロパティの値として、`POST /token/validate` リクエストを送信します。
4. `POST /token/validate` リクエストに対するレスポンスを確認します。結果は以下のように、処理の成功を示しています: 
    - `true` のレスポンスは、Step 1 でリクエストとして送った DII が、Step 1 のレスポンスで受け取ったトークンと一致していることを示します。
    - `false` のレスポンスは、メールアドレス、電話番号、またはそれぞれのハッシュを送信する方法に問題があるかもしれないことを示します。
