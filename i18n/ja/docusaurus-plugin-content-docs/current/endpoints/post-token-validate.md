---
title: POST /token/validate
description: Advertising Token を検証します（テスト目的）。
hide_table_of_contents: false
sidebar_position: 03
---

# POST /token/validate

Advertising Token が指定されたハッシュ化された、またはハッシュ化されていないメールアドレスまたは電話番号と一致するかどうかを検証します。

Used by:　このエンドポイントは、主にパブリッシャーが使用します。

> NOTE: このエンドポイントは、主に新しいインテグレーションのテストとトラブルシューティングのために用意されています。

## Request Format

`POST '{environment}/v2/token/validate'`

> IMPORTANT: すべてのリクエストは、秘密鍵を使用して暗号化する必要があります。詳細と Python スクリプトの例は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md) を参照してください。

### Path Parameters

| Path Parameter  | Data Type | Attribute | Description                                                                                                                                                                                                   |
| :-------------- | :-------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `{environment}` | string    | 必須      | テスト環境: `https://operator-integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com`<br/>リージョンごとのオペレーターを含む全リストは [Environments](../summary-doc-v2.md#environments) を参照してください。 |

NOTE: インテグレーション環境と本番環境では、異なる[APIキー](../ref-info/glossary-uid.md#gl-api-key)が必要です。

### Unencrypted JSON Body Parameters

- 次のパラメータのうち、1 つだけを含める必要があります。`email`、`email_hash`、`phone`、または `phone_hash`.
- 暗号化する際には、リクエストの JSON ボディに、必要なボディパラメータを Key-Value ペアとして含めてください。
- ID をテストするには、`validate@email.com` メールアドレスまたは `+12345678901` 電話番号を使用します。詳細は、パブリッシャー向けの [Client-Side JavaScript SDK Integration Guide](../guides/publisher-client-side.md) および [Server-Only Integration Guide](../guides/custom-publisher-integration.md) にある FAQ の項を参照してください。

| Body Parameter | Data Type | Attribute      | Description                                                                                                                                                                                |
| :------------- | :-------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `token`        | string    | 必須           | [POST /token/generate](post-token-generate.md) レスポンスによって返された Advertising Token です。                                                                                         |
| `email`        | string    | 条件付きで必要 | トークン検証用のメールアドレスです。                                                                                                                                                       |
| `email_hash`   | string    | 条件付きで必要 | トークン検証用の [SHA-256 ハッシュし、Base64 エンコード](../getting-started/gs-normalization-encoding#email-address-hash-encoding) した、[正規化](../getting-started/gs-normalization-encoding#email-address-normalization) 済みメールアドレスです。 |
| `phone`        | string    | 条件付きで必要 | トークン検証用の [正規化](../getting-started/gs-normalization-encoding#phone-number-normalization) 済み電話番号です。                                                                                                   |
| `phone_hash`   | string    | 条件付きで必要 | [SHA-256 ハッシュし、Base64 エンコード](../getting-started/gs-normalization-encoding#phone-number-hash-encoding) した、[正規化](../getting-started/gs-normalization-encoding#phone-number-normalization) 済み電話番号です。                          |

### Request Examples

以下は、各パラメータの暗号化されていない JSON リクエストボディの例で、トークン検証のリクエストに含める必要があります:

```json
{
  "token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D",
  "email": "username@example.com"
}
```

```json
{
  "token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D",
  "email_hash": "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ="
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
  "phone_hash": "wdN1alhrbw1Bmz49GzKGdPvGxLhCNn7n3teAOQ/FSK4="
}
```
以下は、メールアドレスハッシュの暗号化トークン検証リクエストの例です:

```sh
echo '{"token": "AdvertisingTokenmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b%2FbesPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM%2BewMzXXM8G9j8Q%3D", "email_hash": "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ="}' | python3 uid2_request.py  https://prod.uidapi.com/v2/token/validate [Your-Client-API-Key] [Your-Client-Secret]
```

詳細と Python スクリプトの例は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md) を参照してください。

## Decrypted JSON Response Format

> NOTE: レスポンスは、HTTP ステータスコードが 200 の場合のみ暗号化されます。それ以外の場合、レスポンスは暗号化されません。

復号化に成功したレスポンスは、指定された Advertising Token の検証結果を示す論理値を返します。

```json
{
  "body": true,
  "status": "success"
}
```

## Body Response Properties

| Property | Data Type | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `body`   | boolean   | `true`の値は、リクエストで指定されたメールアドレス、電話番号、またはそれぞれのハッシュが、Advertising Token を生成するために使用されたものと同じであることを示します。<br/>`false`の値は、次のいずれかを示します:<br/>- リクエストに無効な Advertising Token が含まれていました。<br/>- リクエストに指定されたメールアドレス、電話番号、またはそれぞれのハッシュが、Advertising Token の生成に使用されたものと異なるか、テスト用メールアドレス `validate@email.com`、電話番号 `+12345678901` でない場合です。 |

### Response Status Codes

次の表は、`status` プロパティの値と、それに対応する HTTP ステータスコードの一覧です。

| Status         | HTTP Status Code | Description                                                                                                                                                                    |
| :------------- | :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `success`      | 200              | リクエストは成功しました。レスポンスは暗号化されています。                                                                                                                     |
| `client_error` | 400              | リクエストに不足している、または無効なパラメータがありました。                                                                                                                 |
| `unauthorized` | 401              | クエストにベアラートークンが含まれていない、無効なベアラートークンが含まれている、またはリクエストされた操作を実行するのに許可されていないベアラートークンが含まれていました。 |

`status` の値が `success` 以外の場合、 `message` フィールドにその問題に関する追加情報が表示されます。
