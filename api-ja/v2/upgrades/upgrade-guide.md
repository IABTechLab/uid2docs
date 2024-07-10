# UID2 API v1 to v2 Upgrade Guide

このガイドでは、UID2 v1 と v2 API の違いを概説し、v2 API へのアップグレード方法を説明します。

- [Improvements and Changes from Version 1](#improvements-and-changes-from-version-1)
- [Prerequisites and Timeline](#prerequisites-and-timeline)
- [Publisher Upgrade Workflow](#publisher-upgrade-workflow)
- [Advertiser and Data Provider Upgrade Workflow](#advertiser-and-data-provider-upgrade-workflow)
- [FAQs](#faqs)

## Improvements and Changes from Version 1

UID2 API v2 へのアップグレードには以下の変更が含まれます:

- [Application API layer encryption](https://unifiedid.com/docs/getting-started/gs-encryption-decryption) が追加されました。これにより E2E コンテンツが保護され、ネットワークオペレーターや UID2 サービスオペレーターによる UID2 情報の漏洩が防止されます。<br/>これは、v2 エンドポイントへの呼び出しを行うためには POST リクエストボディを暗号化し、レスポンスを復号する必要があることを意味します。
- [authentication](https://unifiedid.com/docs/getting-started/gs-auth) のためのクライアント API Key に加えて、API リクエストを暗号化し、API レスポンスを復号するためのクライアントシークレットが必要です。
- UID2 API v1 のすべての GET エンドポイントの HTTP リクエストタイプが GET から [UID2 API v2](https://unifiedid.com/docs/endpoints/summary-endpoints) への POST に変更されました。
- リクエストにはもはやクエリパラメータが必要ありません。新しい POST メソッドは、JSON 形式のリクエストボディとして入力パラメータを受け取ります。
- パラメータ値の URL エンコードは不要です。
- [POST /identity/map](https://unifiedid.com/docs/endpoints/summary-endpoints) エンドポイントは、1 つまたは複数のメールアドレス、電話番号、またはそれらのハッシュに対して UID2 とソルトバケット ID を取得します。

[UID2 API v2 Documentation](https://unifiedid.com/docs/summary-doc-v2) を参照してください。

## Prerequisites and Timeline

アップグレードを開始する前に、以下の要件を確認してください:

- UID2 API v2 へのアップグレードには、API リクエストを暗号化し、レスポンスを復号するためのクライアントシークレットが必要です。[contact the UID2 administrator](https://unifiedid.com/docs/getting-started/gs-account-setup#contact-info) で、API リクエストを暗号化し、API レスポンスを復号するためのシークレットキーを取得してください。認証と認可については、[Authentication and Authorization](https://unifiedid.com/docs/getting-started/gs-auth) を参照してください。
- すべての v1 SDK ファイルとエンドポイント、v0 SDK ファイル、およびバージョンのないエンドポイントは、2023 年 3 月 31 日に廃止および削除されますので、アップグレードを完了してください。


## Publisher Upgrade Workflow

このセクションには、パブリッシャー向けの後方互換性とアップグレード手順に関する情報が含まれています:

- [Backward Compatibility for Publishers](#backward-compatibility-for-publishers)
- [Upgrade Steps for Publishers](#upgrade-steps-for-publishers)

### Backward Compatibility for Publishers

トークン生成とリフレッシュエンドポイントへの呼び出しは、独立してアップグレードできます。知っておくべきことは以下のとおりです:

- v1 `GET /token/generate` または v1 `GET /token/refresh` エンドポイントから返された Refresh Token を、v2 [POST /token/refresh](https://unifiedid.com/docs/endpoints/post-token-refresh) エンドポイントに渡すことができますが、レスポンスは暗号化されません。
- v2 [POST /token/refresh](https://unifiedid.com/docs/endpoints/post-token-refresh) エンドポイントは、これらのエンドポイントから返された Refresh Token のレスポンスのみを暗号化します。これは、呼び出し元がこれらのエンドポイントから返されたリフレッシュレスポンスキーを持っているという前提で行われます。
- v2 [POST /token/generate](https://unifiedid.com/docs/endpoints/post-token-generate) または v2 [POST /token/refresh](https://unifiedid.com/docs/endpoints/post-token-refresh) エンドポイントから返された Refresh Token を、v1 `GET /token/refresh` エンドポイントに渡すことができますが、レスポンスは暗号化されません。

 UID2 SDK for JavaScript v2 ([UID2 SDK for JavaScript Reference Guide](https://unifiedid.com/docs/sdks/client-side-identity) を参照してください) は、UID2 SDK for JavaScript SDK v1 の完全な置換です。以下に注意すべき点を示します:
  - ユーザーの ID を格納するために使用されるファーストパーティクッキーは、両方のバージョンの SDK 間で完全に相互運用可能です。UID2 SDK for JavaScript v2 が v1 クッキーを読み取り、その逆も同様です。
  - [v2 SDK init() 関数](https://unifiedid.com/docs/sdks/client-side-identity#initopts-object-void) は、v1 `GET /token/generate` エンドポイントによって返された identity オブジェクトを受け入れます。
  - v1 SDK `init()` 関数は、v2 [POST /token/generate](https://unifiedid.com/docs/endpoints/post-token-generate) エンドポイントによって返された identity オブジェクトを受け入れます。

### Upgrade Steps for Publishers

UID2 API v2 へのアップグレードを行うには、以下の手順を実行してください:

1. [Upgrade the UID2 SDK for JavaScript](#upgrade-the-uid2-sdk-for-javascript).
1. [Upgrade calls to the token generate endpoint](#upgrade-token-generation-calls).
1. (Required only for integrations that do not use the [UID2 SDK for JavaScript)](https://unifiedid.com/docs/sdks/client-side-identity): [Upgrade calls to the token refresh endpoint](#upgrade-token-refresh-calls).

#### Upgrade the UID2 SDK for JavaScript

UID2 SDK for JavaScript をアップグレードするには、SDK をロードするスクリプトを更新する必要があります。この手順中に考慮する必要がある点は以下のとおりです:

- JavaScript の UID2 SDK の `version 0` を使用している場合は、まず SDK の `version 1` にアップグレードしてください。
- SDK を別の場所からロードしているか、SDK のプライベートコピーを保持している場合は、場所を適切に更新してください。

ページ上で、SDK のバージョン 1 ではなくバージョン 2 をロードするようにスクリプトを更新してください。

SDK version 1:

```html
<script src="https://prod.uidapi.com/static/js/uid2-sdk-1.0.0.js" type="text/javascript"></script> 
```

SDK version 2:

```html
<script src="https://prod.uidapi.com/static/js/uid2-sdk-2.0.0.js" type="text/javascript"></script> 
```

#### Upgrade Token Generation Calls

アップグレードの一環として、アプリケーションの Server-Side で、v1 `GET /token/generate` エンドポイントへの呼び出しを v2 [POST /token/generate](https://unifiedid.com/docs/endpoints/post-token-generate) エンドポイントへの呼び出しに置き換える必要があります。

以下が必要な手順です:

- [POST /token/generate](https://unifiedid.com/docs/endpoints/post-token-generate) への呼び出しは、リクエストボディを暗号化し、レスポンスを復号化する必要があります。詳細と例については、[Encrypting Requests and Decrypting Responses](https://unifiedid.com/docs/getting-started/gs-encryption-decryption) を参照してください。
- [POST /token/generate](https://unifiedid.com/docs/endpoints/post-token-generate) への JSON レスポンスには、新しいプロパティ `refresh_response_key` が含まれます。
  - JavaScript の UID2 SDK (詳細は [UID2 SDK for JavaScript Reference Guide](https://unifiedid.com/docs/sdks/client-side-identity) を参照してください) を使用している場合、バージョンに関係なく、このキーを SDK の `init()` 関数に他のレスポンスプロパティと共に渡す必要があります。
  - SDK を使用していない場合、レスポンスデータをカスタムストレージ (たとえばデータベースやカスタムファーストパーティクッキー) に保存している場合は、ストレージを更新してリフレッシュレスポンスキーを保存する必要があります。
  - v1 `GET /token/refresh` エンドポイントによって返されたリフレッシュトークンを使用している既存のセッションには、リフレッシュレスポンスキーがないセッションがある場合、更新は必要ありません。これらのセッションはそのまま動作し続けます。

#### Upgrade Token Refresh Calls

:::note
[UID2 SDK for JavaScript Reference Guide](https://unifiedid.com/docs/sdks/client-side-identity) を使用してトークンをリフレッシュおよび管理している場合、追加の操作は必要ありません。
:::

SDK を使用せず、Server-Side または Client-Side でトークンをリフレッシュする場合、v2 [POST /token/refresh](https://unifiedid.com/docs/endpoints/post-token-refresh) エンドポイントにリクエストを行う際に以下の点に注意してください:

  - リフレッシュトークンをそのままリクエストボディに渡すことができます。
  - v2 エンドポイントから返された Refresh Token には、Refresh Token と一緒に返される `refresh_response_key` 値が含まれます。このキーは [decrypting the response](https://unifiedid.com/docs/getting-started/gs-encryption-decryption) に必要です。
  - v2 エンドポイントから返された Refresh Token に、新しい Refresh Token が含まれる場合、ユーザーの ID ストレージ (たとえばデータベースやカスタムファーストパーティクッキー) に保存する必要があります。
  - v1 エンドポイントから返された Refresh Token には、関連する `refresh_response_key` が含まれていないため、レスポンスは暗号化されません。

## Advertiser and Data Provider Upgrade Workflow

- [Backward Compatibility for Advertisers and Data Providers](#backward-compatibility-for-advertisers-and-data-providers)
- [Upgrade Steps for Advertisers and Data Providers](#upgrade-steps-for-advertisers-and-data-providers)


### Backward Compatibility for Advertisers and Data Providers

UID2 API v2 へのアップグレードには以下の変更が含まれます:

- v1 `GET /identity/map` エンドポイントは、単一ユーザーの直接識別情報 (DII) を UID2 にマッピングするための v2 [POST /identity/map](https://unifiedid.com/docs/endpoints/post-identity-map) エンドポイントに置き換えられました。この新しいエンドポイントは、単一ユーザーの DII をマッピングするだけでなく、複数のユーザーの DII をマッピングします。
- v2 [POST /identity/map](https://unifiedid.com/docs/endpoints/post-identity-map) および [POST /identity/buckets](https://unifiedid.com/docs/endpoints/post-identity-buckets) エンドポイントから返される UID2 とバケット ID は、対応する v1 エンドポイントから返されるものと同じです。
- [Snowflake Integration Guide](https://unifiedid.com/docs/guides/snowflake_integration) は、UID2 v2 API へのアップグレードに影響を受けず、変更は必要ありません。

### Upgrade Steps for Advertisers and Data Providers

UID2 API v2 にアップグレードするには、以下の v1 エンドポイントを対応する v2 エンドポイントに置き換えてください。

| v1 Endpoint | v2 Endpoint | Comments |
| :--- |:--- |:--- |
| `GET /identity/buckets` | [POST /identity/buckets](https://unifiedid.com/docs/endpoints/post-identity-buckets) |HTTPリクエストタイプが変更されました。 |
| `POST /identity/map` | [POST /identity/map](https://unifiedid.com/docs/endpoints/post-identity-map)| v2 エンドポイントは v1 エンドポイントと同じですが、シングルユーザー用の DII もマッピングします。 |
| `GET /identity/map` |[POST /identity/map](https://unifiedid.com/docs/endpoints/post-identity-map) | HTTPリクエストタイプが変更されました。<br/>新しいPOSTエンドポイントは、単一ユーザーと複数ユーザーのDIIをマッピングします。 |

:::important
UID2 API v2 への呼び出しを行うには、POST リクエストボディを暗号化し、レスポンスを復号する必要があります。詳細と例については、[Encrypting Requests and Decrypting Responses](https://unifiedid.com/docs/getting-started/gs-encryption-decryption) を参照してください。
:::


## FAQs

### Do I have to do the upgrade?

はい。UID2 API v2はUID2 API v1と互換性がないため、アップグレードが必要です。

### What are the key differences between the old and new APIs?

詳細は [Improvements and Changes from Version 1](#improvements-and-changes-from-version-1) を参照してください。

### When can I start the upgrade?

いつでも開始できますが、2023 年 3 月 31 日までに完了してください。

### Can I continue using the v1 API and API keys?

はい。v1 エンドポイントは 2023 年 3 月 31 日までサポートされます。それ以降、すべての非推奨 v1 SDK ファイルとエンドポイント、v0 SDK ファイル、およびバージョン管理されていないエンドポイントは削除されます。以前に発行されたクライアント API Key は v2 エンドポイントに必要となり、v1 エンドポイントは削除されるまで引き続き使用できます。

### How do I obtain a client secret key for the new API?

秘密鍵を入手するには、[contact the UID2 administrator](https://unifiedid.com/docs/getting-started/gs-account-setup#contact-info) を参照してください。

### How do I encrypt requests and decrypt responses?

[Encrypting Requests and Decrypting Responses](https://unifiedid.com/docs/getting-started/gs-encryption-decryption) のページには、ワークフローとさまざまなプログラミング言語での例が説明されています。
