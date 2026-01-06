---
title: POST /token/validate
description: Advertising Token を検証(テスト目的)。
hide_table_of_contents: false
sidebar_position: 03
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# POST /token/validate

Advertising Token が指定されたハッシュ化された、またはハッシュされていないメールアドレスまたは電話番号と一致するかどうかを検証します。

Used by: このエンドポイントは、主にパブリッシャーが使用します。

:::note
このエンドポイントは、主に新しいインテグレーションのテストとトラブルシューティングのために用意されています。
:::

## Request Format 

`POST '{environment}/v2/token/validate'`

認証の詳細は、 [Authentication and Authorization](../getting-started/gs-auth.md) を参照してください。

:::important
すべてのリクエストを秘密鍵で暗号化する必要があります。詳細といくつかのプログラミング言語でのコードの例は、[Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md) を参照してください。
:::

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | 必須 | テスト (インテグレーション) 環境: `https://operator-integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com`<br/>リージョンごとのオペレーターを含む全リストは [Environments](../getting-started/gs-environments.md) を参照してください。 |

:::note
インテグレーション環境と本番環境では、異なる <Link href="../ref-info/glossary-uid#gl-api-key">API Key</Link> が必要です。各環境の認証情報を取得する方法は、[Getting Your Credentials](../getting-started/gs-credentials.md#getting-your-credentials) を参照してください。
:::

### Unencrypted JSON Body Parameters

このエンドポイントの使用に関する主なポイントは以下の通りです。

- 次の 4 つの有効なオプションのいずれかを、Body Parameter テーブルに記載されているように、1 つだけ含めます: `email`、`email_hash`、`phone`、または `phone_hash`。
- 暗号化する際に、必要なボディパラメータをリクエストの JSON ボディ内のキーと値のペアとして含めます。

| Body Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `token` | string | Required | [POST&nbsp;/token/generate](post-token-generate.md) レスポンスによって返された Advertising Token です。<br/>自身の資格情報で生成された Advertising Token のみを検証できます。|
| `email` | string | Conditionally Required | トークン検証用のメールアドレスです。正規化されているかどうかに関わらず、有効なメールアドレス値を使用できます。 |
| `email_hash` | string | Conditionally Required | 有効な [正規化された](../getting-started/gs-normalization-encoding.md#email-address-normalization) メールアドレスの [Base64-encoded SHA-256](../getting-started/gs-normalization-encoding.md#email-address-hash-encoding) ハッシュです。 |
| `phone` | string | Conditionally Required | トークン検証用の電話番号です。有効な電話番号値を使用できますが、[正規化](../getting-started/gs-normalization-encoding.md#phone-number-normalization)されている必要があります。 |
| `phone_hash` | string | Conditionally Required | 有効な [正規化された](../getting-started/gs-normalization-encoding.md#phone-number-normalization) 電話番号の [Base64-encoded SHA-256](../getting-started/gs-normalization-encoding.md#phone-number-hash-encoding) ハッシュです。 |

### Request Examples

以下は、各パラメータの暗号化されていない JSON リクエストボディの例で、トークン検証のリクエストに含める必要があります:

:::note
以下の例の Advertising Token は、説明のみを目的とした架空のものです。提供された値は実際の値ではありません。
:::

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

詳細といくつかのプログラミング言語でのコードの例は、[Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md) を参照してください。

## Decrypted JSON Response Format

:::note
レスポンスは、HTTP ステータスコードが 200 の場合のみ暗号化されます。それ以外の場合、レスポンスは暗号化されません。
:::

復号化に成功したレスポンスは、以下の例に示すように、指定された Advertising Token の検証結果を示す論理値を返します。

```json
{
  "body": true,
  "status": "success"
}
```

## Body Response Properties

以下の表は、レスポンスボディに関する情報を提供します。

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `body` | boolean | `true` の値は、リクエストで指定されたメールアドレス、電話番号、またはそれぞれのハッシュが、Advertising Token を生成するために使用されたものと同じであることを示します。<br/>`false` の値は、リクエストで指定されたメールアドレス、電話番号、またはそれぞれのハッシュが、Advertising Token を生成するために使用されたものと同じではないことを示します。 |

### Response Status Codes

次の表は、`status` プロパティの値と、それに対応する HTTP ステータスコードの一覧です。

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success`      | 200 | リクエストは成功しました。レスポンスは暗号化されています。 |
| `client_error` | 400 | リクエストに不足している、または無効なパラメータがありました。 |
| `unauthorized` | 401 | リクエストにベアラートークンが含まれていない、無効なベアラートークンが含まれている、またはリクエストされた操作を実行するのに許可されていないベアラートークンが含まれていました。 |

`status` の値が `success` 以外であれば、`message` フィールドにその問題に関する追加情報が表示されます。

## Using POST /token/validate to Test

このエンドポイントを使用して、[POST&nbsp;/token/generate](../endpoints/post-token-generate.md) で送信する <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> が有効かどうかをテストできます。以下の手順に従ってください。

1. 検証する Advertising Token を生成するために、`email`、`email_hash`、`phone`、または `phone_hash` を使用して [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) リクエストを送信します。
2. 次のステップで使用するために、返された `advertising_token` の値を保存します。
3. ステップ 1 で送信した `email`、`email_hash`、`phone`、または `phone_hash` の値と、ステップ 2 で保存した `advertising_token` を `token` プロパティの値として使用して、`POST /token/validate` リクエストを送信します。
4. `POST /token/validate` リクエストへのレスポンスを確認します。結果は、以下のようにプロセスの成功を示します: 
