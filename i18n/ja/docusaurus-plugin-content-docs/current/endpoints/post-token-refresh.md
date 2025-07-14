---
title: POST /token/refresh
description: Refresh Token を使用して、更新された UID2 Token を生成。
hide_table_of_contents: false
sidebar_position: 04
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import IdentityGenerateResponse from '../snippets/_example-identity-generate-response.mdx';

# POST /token/refresh

[POST&nbsp;/token/generate](post-token-generate.md) エンドポイントで返された有効期限内の Refresh Token を送信して、新しい <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> を生成します。

Used by: このエンドポイントは、主にパブリッシャーが使用します。

このエンドポイントは、Client-Side (たとえば、ブラウザやモバイルアプリ) から呼び出すことができます。それは、<Link href="../ref-info/glossary-uid#gl-api-key">API key</Link> を使用する必要がないためです。

:::note
このエンドポイントを直接呼び出す代わりに、UID2 SDK のいずれかを使用して管理することができます。オプションの概要については、[SDKs: Summary](../sdks/summary-sdks.md) を参照してください。
:::

## Request Format 

`POST '{environment}/v2/token/refresh'`

[POST&nbsp;/token/generate](post-token-generate.md) または `POST /token/refresh` のレスポンスで返された `refresh_token` 値の内容を POST body として追加します。

このエンドポイントについて知っておくべきことは、以下のとおりです:

- `POST /token/refresh` えんどぽいんとへのリクエストには暗号化は不要です。
- リクエストが HTTP ステータスコード 200 で成功すると、新しい UID2 Token または Out-Out 情報が返されます。
- 成功したレスポンスは、そのレスポンスに新しいトークンまたは Opt-Out 情報が含まれているかどうかにかかわらず暗号化されます。エラーレスポンスは暗号化されません。
- レスポンスを復号化するには、このトークンに対する最新の `refresh_response_key` 値を使用します。`refresh_response_key` の値は、[POST&nbsp;/token/generate](post-token-generate.md) と `POST /token/refresh` のレスポンスで返されます。トークンがリフレッシュされるたびに、新しい `refresh_response_key` が返されます。現在のレスポンスを復号化するには、必ず最新のものを使用してください。

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | 必須 | テスト (インテグレーション) 環境: `https://operator-integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com`<br/>リージョンごとのオペレーターを含む全リストは、[Environments](../getting-started/gs-environments.md) を参照してください。<br/>Notes:<ul><li>`integ` 環境と `prod` 環境は異なる <Link href="../ref-info/glossary-uid#gl-api-key">API keys</Link> を必要とします。</li><li>トークンの有効期限は変更される可能性がありますが、`integ` 環境では常に `prod` 環境よりも大幅に短くなります。</li></ul> |

#### Testing Notes

[POST&nbsp;/token/generate](post-token-generate.md) リクエストで以下のパラメータのいずれかを使用すると、常に `refresh_token` による ID レスポンスが生成され、`POST /token/refresh` エンドポイントと共に使用するとログアウトレスポンスとなります。

- メールアドレス `refresh-optout@example.com`
- 電話番号 `+00000000002`

### Request Example

詳細といくつかのプログラミング言語でのコードの例は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md) を参照してください。

## Decrypted JSON Response Format

復号化された成功したレスポンスには、ユーザーの新しい UID2 Token (`advertising_token`) と関連する値が含まれるか、ユーザーがオ Opt-Out したことを示します。

:::note
レスポンスは、HTTP ステータスコードが 200 の場合のみ暗号化されます。それ以外の場合は、レスポンスは暗号化されません。
:::

このセクションには、次のサンプルレスポンスが含まれています:

- [Successful Response With Tokens](#successful-response-with-tokens)
- [Successful Response With Opt-Out](#successful-response-with-opt-out)
- [Error Response](#error-response)

#### Successful Response With Tokens

すべての値が有効で、ユーザーが Opt-Out していない場合、レスポンスは成功し、新しい UID2 Token が関連する値とともに返されます。以下の例は、トークンを含む成功したレスポンスを復号したものです:

<IdentityGenerateResponse />

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

レスポンスボディには、次の表に示すプロパティが含まれます。

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `advertising_token` | string | ユーザーの <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> (Advertising Token とも呼ばれます) です。 |
| `refresh_token` | string | UID2 Service と最新の ID トークンのセットを交換できる暗号化されたトークンです。 |
| `identity_expires` | number | UID2 Token の有効期限を示す <a href="../ref-info/glossary-uid#gl-unix-time">Unix</a> タイムスタンプ (ミリ秒単位) です。 |
| `refresh_from` | number | SDK for JavaScript ([SDK for JavaScript Reference Guide](../sdks/sdk-ref-javascript.md) を参照) が UID2 Token のリフレッシュを開始するタイミングを示す Unix タイムスタンプ(ミリ秒単位)。<br/>TIP: SDK を使用していない場合は、このタイムスタンプから Advertising Token もリフレッシュすることを検討してください。|
| `refresh_expires` | number | Refresh Token の有効期限を示す Unix タイムスタンプ(ミリ秒単位)。 |
| `refresh_response_key` | string | [POST&nbsp;/token/refresh](post-token-refresh.md) リクエストでレスポンス復号化のために使用される鍵です。 |

### Response Status Codes

次の表は、`status` プロパティの値と、それに対応する HTTP ステータスコードの一覧です。

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | リクエストは成功し、新しい UID2 Token と関連する値がレスポンスとして返されます。レスポンスは暗号化されています。 |
| `optout` | 200 | ユーザーがオプトアウトした。このステータスは許可されたリクエストに対してのみ返されます。レスポンスは暗号化されます。 |
| `client_error` | 400 | リクエストに不足している、または無効なパラメータがありました。 |
| `invalid_token` | 400 | リクエストで指定された `refresh_token` の値が無効です。このステータスは許可されたリクエストに対してのみ返されます。 |
| `expired_token` | 400 | リクエストで指定された `refresh_token` 値は期限切れのトークンです。 |
| `unauthorized` | 401 | クエストにベアラートークンが含まれていない、無効なベアラートークンが含まれている、またはリクエストされた操作を実行するのに許可されていないベアラートークンが含まれていました。 |

`status` の値が `success` または `optout` 以外であれば、`message` フィールドにその問題に関する追加情報が表示されます。
