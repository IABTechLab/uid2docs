---
title: POST /token/generate
description: DII から UID2 Token (Advertising Token) を生成。 
hide_table_of_contents: false
sidebar_position: 02
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import IdentityGenerateResponse from '../snippets/_example-identity-generate-response.mdx';

# POST /token/generate

ユーザーの <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> (メールアドレスまたは電話番号) から UID2 Token を生成します。DII が有効で、ユーザーがUID2をオプトアウトしていない場合、UID2 Token と関連する値を返します。

Used by: このエンドポイントは、主にパブリッシャーが使用します。

:::important
`optout_check` パラメータは値 `1` が必須で、ユーザーがオプトアウトしたかどうかをチェックします。
:::

<!-- uid2_euid_diff re legal basis for admonition above -->

このエンドポイントを直接呼び出すのではなく、UID2 SDK を使って管理することもできます。オプションの概要は、[SDKs: Summary](../sdks/summary-sdks.md) を参照してください。

## Request Format 

`POST '{environment}/v2/token/generate'`

認証の詳細は、 [Authentication and Authorization](../getting-started/gs-auth.md) を参照してください。

このエンドポイントリクエストについて知っておくべきことは、以下のとおりです:
- サービスにアクセスする際に使用する <Link href="../ref-info/glossary-uid#gl-api-key">API key</Link> を秘密にするため、 UID2 Token は認証後に Server-Side でのみ生成する必要があります。
- すべてのリクエストを秘密鍵で暗号化する必要があります。詳細といくつかのプログラミング言語でのコードの例は [リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md) を参照してください。

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | 必須 | インテグレーション環境: `https://operator-integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com`<br/>リージョンごとのオペレーターを含む全リストは [Environments](../getting-started/gs-environments.md) を参照してください。<br/>Notes:<ul><li>`integ` 環境と `prod` 環境では、異なる <Link href="../ref-info/glossary-uid#gl-api-key">API keys</Link> が必要です。</li><li>トークンの有効期限は変更される可能性がありますが、`integ` 環境では常に `prod` 環境よりも大幅に短くなります。</li></ul> |

### Unencrypted JSON Body Parameters

:::important
リクエストを暗号化するときには、以下の4つの条件付きパラメータのうち **1つ** と、必須パラメータである `optout_check` の値 `1` のみを、JSON ボディのキーと値のペアとして含める必要があります。
:::

| Body Parameter | Data Type | Attribute | Description | 
| :--- | :--- | :--- | :--- |
| `email` | string | 条件付きで必要 | トークンを生成するメールアドレスです。 |
| `email_hash` | string | 条件付きで必要 | [SHA-256 ハッシュし、Base64 エンコード](../getting-started/gs-normalization-encoding.md#email-address-hash-encoding) した [正規化](../getting-started/gs-normalization-encoding.md#email-address-normalization) 済みメールアドレスです。 |
| `phone` | string | 条件付きで必要 | トークンを生成する [正規化](../getting-started/gs-normalization-encoding.md#phone-number-normalization) 済み電話番号です。 |
| `phone_hash` | string | 条件付きで必要 | [SHA-256 ハッシュし、Base64 エンコード](../getting-started/gs-normalization-encoding.md#phone-number-hash-encoding) した、[正規化](../getting-started/gs-normalization-encoding.md#phone-number-normalization) 済み電話番号です。|
| `optout_check` | number | 必須 | ユーザーがオプトアウトしたかどうかをチェックします。このパラメータは `1` とします。 |

### Request Examples

:::important
サービスへのアクセスに使用する API キーを秘密にしておくため、[POST /token/generate](post-token-generate.md) エンドポイントは、[POST /token/refresh](post-token-refresh.md) とは異なり、Server-Side から呼び出す必要があります。Client-Side でトークンを生成する場合は、[Client-Side Integration Options](../guides/integration-options-publisher-web.md#client-side-integration-options) (Web ベースの実装) または [UID2 Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md) を参照してください。
:::

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

:::note
レスポンスは、HTTP ステータスコードが 200 の場合のみ暗号化されます。それ以外の場合、レスポンスは暗号化されません。
:::

このセクションには、次のサンプルレスポンスが含まれています:

- [Successful Response](#successful-response)
- [Optout](#optout)

#### Successful Response

復号化に成功すると、指定されたメールアドレス、電話番号、またはそれぞれのハッシュに対するユーザーの Advertising Token および Refresh Token が返されます。

<IdentityGenerateResponse />

#### Optout

以下は、ユーザーがオプトアウトした場合のレスポンス例です。

```json
{
  "status": "optout"
}
```

### Response Body Properties

レスポンスボディには、次の表に示すプロパティが含まれます。

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `advertising_token` | string | ユーザーの暗号化された Advertising Token (UID2) です。 |
| `refresh_token` | string | UID2 Service と最新の identity トークンのセットを交換できる暗号化されたトークンです。 |
| `identity_expires` | number | Advertising Token の有効期限を示す <a href="../ref-info/glossary-uid#gl-unix-time">Unix</a> タイムスタンプ (ミリ秒単位) です。 |
| `refresh_from` | number | SDK for JavaScript ([SDK for JavaScript Reference Guide](../sdks/sdk-ref-javascript.md) を参照) が UID2 Token のリフレッシュを開始するタイミングを示す Unix タイムスタンプ(ミリ秒単位)。<br/>TIP: SDK を使用していない場合は、このタイムスタンプから UID2 Token もリフレッシュすることを検討してください。|
| `refresh_expires` | number | Refresh Token の有効期限を示す Unix タイムスタンプ (ミリ秒単位) です。 |
| `refresh_response_key` | string | [POST&nbsp;/token/refresh](post-token-refresh.md) リクエストでレスポンス復号化のために使用される鍵です。 |

### Response Status Codes

次の表は、`status` プロパティの値と、それに対応する HTTP ステータスコードの一覧です。

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | リクエストは成功しました。レスポンスは暗号化されています。 |
| `optout` | 200 | リクエストは成功しました。ユーザーがオプトアウトしたため、トークンを生成できませんでした。 |
| `client_error` | 400 | リクエストに不足している、または無効なパラメータがありました。 |
| `unauthorized` | 401 | クエストにベアラートークンが含まれていない、無効なベアラートークンが含まれている、またはリクエストされた操作を実行するのに許可されていないベアラートークンが含まれていました。 |

`status` の値が `success` 以外であれば、`message` フィールドにその問題に関する追加情報が表示されます。

## Test Identities

| Type | Identity | Purpose | Next Endpoint |
| :--- | :--- | :--- | :--- |
| Email | `validate@example.com` | キャッシュした `advertising_token` が、指定したメールアドレスの `advertising_token` と一致するかテストします。 | [POST&nbsp;/token/validate](post-token-validate.md) |
| Email | `optout@example.com` | このメールアドレスをリクエストに使用すると、常に `optout` レスポンスが生成されます。 | [POST&nbsp;/token/generate](post-token-generate.md) |
| Email | `refresh-optout@example.com` | このメールアドレスをリクエストに使用すると、常に `refresh_token` による ID レスポンスが生成され、その結果 `optout` レスポンスが生成されます。 | [POST&nbsp;/token/refresh](post-token-refresh.md)  |
| Phone | `+12345678901` | キャッシュした `advertising_token` が、指定した電話番号の `advertising_token` と一致するかテストします。 | [POST&nbsp;/token/validate](post-token-validate.md) |
| Phone | `+00000000002` | この電話番号をリクエストに使用すると、常に `optout` レスポンスが生成されます。 | [POST&nbsp;/token/generate](post-token-generate.md) |
| Phone | `+00000000000` | この電話番号をリクエストに使用すると、常に `refresh_token` による ID レスポンスが生成され、その結果`optout`レスポンスが生成されます。 | [POST&nbsp;/token/refresh](post-token-refresh.md) |
