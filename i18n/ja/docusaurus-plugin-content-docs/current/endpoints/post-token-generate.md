---
title: POST /token/generate
description: DII から UID2 Token (Advertising Token) を生成します。 
hide_table_of_contents: false
sidebar_position: 02
---

import Link from '@docusaurus/Link';

# POST /token/generate
UID2 ベースのターゲティング広告の承認とともにユーザーから提供された [DII](../ref-info/glossary-uid.md#gl-dii)(メールアドレスまたは電話番号) から生成された UID2 Token をリクエストします。DII が有効で、ユーザーが UID2 をオプトアウトしていない場合、この操作は UID2 Token と関連する値を返します。

Used by: このエンドポイントは、主にパブリッシャーが使用します。

> IMPORTANT: このエンドポイントは、ユーザーの [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) をターゲティング広告用の UID2 Token に変換する法的根拠を得た場合にのみ呼び出すようにしてください。`optout_check` パラメータは値 `1` が必須で、ユーザーがオプトアウトしたかどうかをチェックします。

>NOTE: このエンドポイントを直接呼び出すのではなく、UID2 SDK を使って管理することもできます。オプションの概要については、[SDKs: Summary](../sdks/summary-sdks.md) を参照してください。

## Request Format 

`POST '{environment}/v2/token/generate'`

このエンドポイントリクエストについて知っておくべきことは、以下のとおりです:
- サービスにアクセスする際に使用する API Key を秘密にするため、 UID2 Token は認証後に Server-Side でのみ生成する必要があります。
- すべてのリクエストを秘密鍵で暗号化する必要があります。詳細といくつかのプログラミング言語でのコードの例は、 [リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md) を参照してください。

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | 必須 | テスト (integration) 環境: `https://operator-integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com`<br/>地域オペレーターを含む全リストは [Environments](../getting-started/gs-environments.md) を参照してください<br/>Notes:<ul><li>`integ` 環境と `prod` 環境では、異なる <Link href="../ref-info/glossary-uid#gl-api-key">API keys</Link> が必要です。</li><li>トークンの有効期限は変更される可能性がありますが、`integ` 環境では常に `prod` 環境よりも大幅に短くなります。</li></ul> |

### Unencrypted JSON Body Parameters

> IMPORTANT: リクエストを暗号化するときには、以下の4つの条件付きパラメータのうち **1つ** と、必須パラメータである `optout_check` の値 `1` のみを、JSON ボディのキーと値のペアとして含める必要があります。

| Body Parameter | Data Type | Attribute | Description | 
| :--- | :--- | :--- | :--- |
| `email` | string | 条件付きで必要 | トークンを生成するメールアドレスです。 |
| `email_hash` | string | 条件付きで必要 | [SHA-256 ハッシュし、Base64 エンコード](../getting-started/gs-normalization-encoding.md#email-address-hash-encoding) した [正規化](../getting-started/gs-normalization-encoding.md#email-address-normalization) 済みメールアドレスです。 |
| `phone` | string | 条件付きで必要 | トークンを生成する [正規化](../getting-started/gs-normalization-encoding.md#phone-number-normalization) 済み電話番号です。 |
| `phone_hash` | string | 条件付きで必要 | [SHA-256 ハッシュし、Base64 エンコード](../getting-started/gs-normalization-encoding.md#phone-number-hash-encoding) した、[正規化](../getting-started/gs-normalization-encoding.md#phone-number-normalization) 済み電話番号です。|
| `optout_check` | number | 必須 | ユーザーがオプトアウトしたかどうかをチェックします。このパラメータは `1` とします。 |

### Request Examples

> IMPORTANT: サービスにアクセスするために使用される API Key を確実に秘密にするために、API Key を使用する必要のない [POST&nbsp;/token/refresh](post-token-refresh.md) と異なり、`POST /token/generate` エンドポイントを Server-Side から呼び出す必要があります。

以下は、各パラメータの暗号化されていない JSON リクエストボディの例で、このうちの 1 つはトークン生成リクエストに含める必要があります:

```json
{
  "email": "username@example.com",
  "optout_check": 1
}
```
```json
{
  "email_hash": "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=",
  "optout_check": 1
}
```
```json
{
  "phone": "+12345678901",
  "optout_check": 1
}
```
```json
{
  "phone_hash": "wdN1alhrbw1Bmz49GzKGdPvGxLhCNn7n3teAOQ/FSK4=",
  "optout_check": 1
}
```

以下は、メールアドレスハッシュの暗号化トークン生成リクエストの例です:

```sh
echo '{"email_hash": "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=","optout_check":1}' | python3 uid2_request.py https://prod.uidapi.com/v2/token/generate [Your-Client-API-Key] [Your-Client-Secret]
```
詳細といくつかのプログラミング言語でのコードの例は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md) を参照してください。

## Decrypted JSON Response Format 

> NOTE: レスポンスは、HTTP ステータスコードが 200 の場合のみ暗号化されます。それ以外の場合、レスポンスは暗号化されません。

このセクションには、次のサンプルレスポンスが含まれています:

- [Successful Response](#successful-response)
- [Optout](#optout)

#### Successful Response

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

#### Optout

以下は、ユーザーがオプトアウトした場合のレスポンス例です。

```json
{
  "status": "optout"
}
```

### Response Body Properties

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `advertising_token` | string | ユーザーの暗号化された Advertising Token (UID2) です。 |
| `refresh_token` | string | UID2 Service と最新の identity トークンのセットを交換できる暗号化されたトークンです。 |
| `identity_expires` | double | Advertising Token の有効期限を示す UNIX タイムスタンプ (ミリ秒単位) です。 |
| `refresh_from` | double | UID2 SDK for JavaScript ([UID2 SDK for JavaScript Reference Guide](../sdks/client-side-identity.md) を参照してください) が UID2 Token のリフレッシュを開始するタイミングを示す UNIX タイムスタンプ(ミリ秒単位)。<br/>TIP: SDK を使用していない場合は、このタイムスタンプから UID2 Token もリフレッシュすることを検討してください。|
| `refresh_expires` | double | Refresh Token の有効期限を示す UNIX タイムスタンプ (ミリ秒単位) です。 |
| `refresh_response_key` | string | [POST&nbsp;/token/refresh](post-token-refresh.md) リクエストでレスポンス復号化のために使用される鍵です。 |

### Response Status Codes

次の表は、`status` プロパティの値と、それに対応する HTTP ステータスコードの一覧です。

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | リクエストは成功しました。レスポンスは暗号化されています。 |
| `optout` | 200 | リクエストは成功しました。ユーザーがオプトアウトしたため、トークンを生成できませんでした。 |
| `client_error` | 400 | リクエストに不足している、または無効なパラメータがありました。 |
| `unauthorized` | 401 | クエストにベアラートークンが含まれていない、無効なベアラートークンが含まれている、またはリクエストされた操作を実行するのに許可されていないベアラートークンが含まれていました。 |

`status` の値が `success` 以外であれば、 `message` フィールドにその問題に関する追加情報が表示されます。

## Test Identities

| Type  |           Identity           |                                                                    Purpose                                                                    |                 Next Endpoint                  |
| :---- | :--------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- |
| Email | `validate@example.com`       | キャッシュした `advertising_token` が、指定したメールアドレスの `advertising_token` と一致するかテストします。                                | [POST&nbsp;/token/validate](post-token-validate.md) |
| Email | `optout@example.com`         | このメールアドレスをリクエストに使用すると、常に `optout` レスポンスが生成されます                                                            | [POST&nbsp;/token/generate](post-token-generate.md) |
| Email | `refresh-optout@example.com` | このメールアドレスをリクエストに使用すると、常に `refresh_token` による ID レスポンスが生成され、その結果 `optout` レスポンスが生成されます。 | [POST&nbsp;/token/refresh](post-token-refresh.md)   |
| Phone | `+12345678901`               | キャッシュした `advertising_token` が、指定した電話番号の `advertising_token` と一致するかテストします。                                      | [POST&nbsp;/token/validate](post-token-validate.md) |
| Phone | `+00000000002`               | この電話番号をリクエストに使用すると、常に `optout` レスポンスが生成されます。                                                                | [POST&nbsp;/token/generate](post-token-generate.md) |
| Phone | `+00000000000`               | この電話番号をリクエストに使用すると、常に `refresh_token` による ID レスポンスが生成され、その結果`optout`レスポンスが生成されます。               | [POST&nbsp;/token/refresh](post-token-refresh.md)   |
