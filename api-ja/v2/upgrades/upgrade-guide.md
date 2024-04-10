[UID2 Overview](../../../README-ja.md) > [Getting Started](../../README.md) > [v2](../summary-doc-v2.md) > UID2 API v1 to v2 Upgrade Guide

# UID2 API v1 to v2 Upgrade Guide

このガイドでは、UID2 v1 API と v2 API の違いを概説し、v2 API へのアップグレード方法について説明します。

- [Improvements and Changes from Version 1 (バージョン 1 からの改善点・変更点)](#improvements-and-changes-from-version-1)
- [Prerequisites and Timeline (前提条件とスケジュール)](#prerequisites-and-timeline)
- [Publisher Upgrade Workflow (パブリッシャーアップグレードのワークフロー)](#publisher-upgrade-workflow)
- [Advertiser and Data Provider Upgrade Workflow (広告主およびデータプロバイダーのアップグレードワークフロー)](#advertiser-and-data-provider-upgrade-workflow)
- [FAQs (よくある質問)](#faqs)

## Improvements and Changes from Version 1

UID2 API の v2 アップデートは以下のとおりです:

- [アプリケーション API 層の暗号化](../getting-started/gs-encryption-decryption.md) が追加されました。これは E2E のコンテンツ保護と、UID2 の機密情報がネットワーク事業者や UID2 サービス事業者に漏れることを防ぎます。<br/>これにより、v2 エンドポイントへの呼び出しを実行するには、POST リクエストボディの暗号化とレスポンスの復号化が必要になります。
- [認証と承認](../summary-doc-v2.md#authentication-and-authorization) のためのクライアント API キーに加え、API リクエストの暗号化および API レスポンスの復号化のためにクライアントシークレットが必要になりました。
- UID2 API v1 のすべての GET エンドポイントの HTTP リクエストタイプが、[UID2 API v2](../endpoints/summary-endpoints.md) で GET から POST に変更されました。
- リクエストにクエリパラメータが不要になりました。新しい POST メソッドは、入力パラメータを JSON 形式のリクエストボディとして受け取ります。
- パラメータ値の URL エンコーディングは必要ありません。
- [POST /identity/map](../endpoints/post-identity-map.md) エンドポイントは、1 つまたは複数のメールアドレス、電話番号、またはそれぞれのハッシュに対する UID2 とソルトバケット ID を取得するようになりました。

[UID2 API v2 ドキュメンテーション](../summary-doc-v2.md) も参照してください。

## Prerequisites and Timeline

アップグレードを開始する前に、以下の要件を必ず確認してください:

- UID2 エンドポイントに対して認証を行うには、 [UID2 管理者へ連絡](../../README.md#contact-info) し API リクエストの暗号化と API 応答の復号化に使用する秘密鍵を入手します。[Authentication and Authorization (認証と承認)](../summary-doc-v2.md#authentication-and-authorization) も参照してください。
- アップグレードは、すべての v1 SDK ファイルとエンドポイント、v0 SDK ファイル、およびバージョン管理外のエンドポイントが非推奨となり削除される、**2023 年 3 月 31 日** までに完了する必要があります。


## Publisher Upgrade Workflow

このセクションには、パブリッシャー向けの下位互換性とアップグレード手順に関する以下の情報が含まれています:

- [Backward Compatibility (後方互換性)](#backward-compatibility-for-publishers)
- [Upgrade Steps (アップグレードステップ)](#upgrade-steps-for-publishers)

### Backward Compatibility for Publishers

トークン生成エンドポイントおよびリフレッシュエンドポイントへのコールを独立してアップグレードできます。ここで知っておくべきことは以下のとおりです:

- v1 `GET /token/generate` または v1 `GET /token/refresh` エンドポイントから v2 [POST /token/refresh](../endpoints/post-token-refresh.md) にリフレッシュトークンを渡せますが、レスポンスの暗号化はされません。
- v2 [POST /token/refresh](../endpoints/post-token-refresh.md) エンドポイントは、v2 [POST /token/generate](../endpoints/post-token-generate.md) または v2 [POST /token/refresh](../endpoints/post-token-refresh.md) によって戻されたリフレッシュトークンにのみ応答を暗号化して、呼び出し側がこれらのエンドポイントが戻すリフレッシュ応答キーを持っていると仮定して、その応答を暗号化しています。
- v2 [POST /token/generate](../endpoints/post-token-generate.md) または v2 [POST /token/refresh](../endpoints/post-token-refresh.md) のエンドポイントから返されたリフレッシュトークンを、応答を暗号化しない v1 `GET /token/refresh` エンドポイントに渡せます。

[Client-Side JavaScript SDK (v2)](../sdks/client-side-identity.md) は、Client-Side JavaScript SDK v1 との互換性を保った交換部品 (a drop-in replacement)です。ここで知っておくべきことは以下のとおりです:
- ユーザーの ID を保存するために使用されるファーストパーティクッキーは、SDK の 2 つのバージョン間で完全に相互運用可能です。つまり、Client-Side JavaScript SDK v2 は v1 の Cookie を読むことができ、その逆も同様です。
- [v2 SDK init()関数](../sdks/client-side-identity.md#initopts-object-void)は、v1 `GET /token/generate`エンドポイントが返す ID オブジェクトを受け取ります。
- v1 SDK の `init()` 関数は、v2 [POST /token/generate](../endpoints/post-token-generate.md) エンドポイントによって返される ID オブジェクトを受け入れます。

### Upgrade Steps for Publishers

UID API v2 へのアップグレードは、以下の手順で行います。

1. [Client-Side JavaScript SDK をアップグレードします](#upgrade-the-client-side-javascript-sdk).
2. [トークン生成エンドポイントへの呼び出しをアップグレードします](#upgrade-token-generation-calls).
3. [Client-Side JavaScript SDK (v2)](../sdks/client-side-identity.md) を使用しないインテグレーションの場合のみ必要です: [トークンリフレッシュエンドポイントの呼び出しをアップグレードします](#upgrade-token-refresh-calls).

#### Upgrade the Client-Side JavaScript SDK

Client-Side JavaScript SDK をアップグレードするには、SDK をロードするスクリプトを更新する必要があります。このステップで注意しなければならないことは、以下のとおりです:

- Client-Side JavaScript SDK の`version 0`を使用している場合は、必ず`version 1`にアップグレードしてから使用してください。
- もし SDK を別の場所からロードしたり、SDK のプライベートコピーを保持している場合は、それに応じて場所を更新するようにしてください。

ページでは、SDK のバージョン 1 ではなくバージョン 2 を読み込むようにスクリプトを更新してください。

SDK version 1:

```html
<script src="https://prod.uidapi.com/static/js/uid2-sdk-1.0.0.js" type="text/javascript"></script>
```

SDK version 2:

```html
<script src="https://prod.uidapi.com/static/js/uid2-sdk-2.0.0.js" type="text/javascript"></script>
```

#### Upgrade Token Generation Calls

アップグレードの一環として、アプリケーションの サーバーサイドで、v1 の `GET /token/generate` エンドポイントへの呼び出しを v2 [POST /token/generate](../endpoints/post-token-generate.md) エンドポイントへの呼び出しに切り替える必要があります。

以下は、知っておくべきことと、実行すべきことです:

- [POST /token/generate](../endpoints/post-token-generate.md) を実行するには、リクエストボディの暗号化とレスポンスの復号化が必要です。詳細および例は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md) を参照してください。
- [POST /token/generate](../endpoints/post-token-generate.md) エンドポイントからの JSON レスポンスは、新しいプロパティを含んでいます: `refresh_response_key` です。
  - [Client-Side JavaScript SDK (v2)](../sdks/client-side-identity.md) を使用している場合 (バージョンに関係なく)、SDK の `init()` 関数に、他のレスポンスプロパティと一緒にこのキーを渡す必要があります。
  - SDK を使用せず、応答データをカスタムストレージ (データベースやカスタムファーストパーティクッキーなど) に保存している場合は、ストレージを更新してリフレッシュ応答キーを保存する必要があります。
  - v1 `GET /token/refresh` エンドポイントによって返された Refresh Token を保存し、対応するリフレッシュ応答キーを持っていない既存のセッションは、更新の必要はありません。これらのセッションは、そのまま動作を継続します。

#### Upgrade Token Refresh Calls

> NOTE: [Client-Side JavaScript SDK (v2)](../sdks/client-side-identity.md) を使用してトークンを更新・管理している場合は、これ以上の操作は必要ありません。

SDK を使用せず、 サーバーサイドまたはクライアントサイドでトークンをリフレッシュする場合、v2 [POST /token/refresh](../endpoints/post-token-refresh.md) エンドポイントへのリクエストを行う際には、以下の点に留意してください:

- 返された Refresh Token は、リクエストボディに何も修正せずに渡せます。
- v2 エンドポイントから返される Refresh Token は、Refresh Token と一緒に `refresh_response_key` 値が返されることが期待されています。このキーは [レスポンスの復号化](../getting-started/gs-encryption-decryption.md) のために必要とされます。
- レスポンスに新しい Refresh Token が含まれている場合、対応する `refresh_response_key` 値とともに、ユーザーのアイデンティティストレージ (たとえば、データベースやカスタムファーストパーティクッキー) に保存する必要があります。
- v1 のエンドポイントから返される Refresh Token は、関連する `refresh_response_key` を持たないので、レスポンスは暗号化されません。

## Advertiser and Data Provider Upgrade Workflow

- [Backward Compatibility (後方互換性)](#backward-compatibility-for-advertisers-and-data-providers)
- [Upgrade Steps (アップグレードステップ)](#upgrade-steps-for-advertisers-and-data-providers)


### Backward Compatibility for Advertisers and Data Providers

UID2 API v2 へのアップグレードについて知っておくべきことは、以下のとおりです:

- 単一ユーザーの個人を識別できる情報(DII) を UID2 にマッピングする v1 `GET /identity/map` エンドポイントは、単一および複数ユーザーの DII をマッピングする v2 [POST /identity/map](../endpoints/post-identity-map.md) エンドポイントに置き換えられました。
- v2 [POST /identity/map](../endpoints/post-identity-map.md) および [POST /identity/buckets](../endpoints/post-identity-buckets.md) エンドポイントが返す UID2 とバケット ID は、対応する v1 エンドポイントが返すものと同じものです。
- [Snowflake Integration Guide](../guides/snowflake_integration.md) は、UID2 v2 API へのアップグレードの影響を受けないので、変更は必要ありません。

### Upgrade Steps for Advertisers and Data Providers

UID API v2 にアップグレードするには、以下の v1 エンドポイントへの呼び出しを、対応する v2 エンドポイントに置き換えます。

| v1 Endpoint | v2 Endpoint | Comments |
| :--- |:--- |:--- |
| `GET /identity/buckets` | [POST /identity/buckets](../endpoints/post-identity-buckets.md) | HTTP リクエストの種類が変更されました。 |
| `POST /identity/map` | [POST /identity/map](../endpoints/post-identity-map.md) | v2 エンドポイントは、シングルユーザーの DII もマッピングする以外は、v1 エンドポイントと同じです。 |
| `GET /identity/map | [POST /identity/map](../endpoints/post-identity-map.md) | HTTP リクエストタイプが変更されました。<br/>新しい POST エンドポイントでは、単一ユーザーおよび複数ユーザーの DII をマッピングします。 |

> IMPORTANT: UID2 API v2 の呼び出しを行うには、POST リクエストボディを暗号化し、レスポンスを復号化する必要があります。詳細および例は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md) を参照してください。


## FAQs

### アップグレードは必要ですか？

UID2 API v2 は UID2 API v1 とは互換性がないため、アップグレードが必要です。

### 旧 API と新 API の主な違いは何ですか？

詳しくは、[バージョン 1 からの改善点・変更点](#improvements-and-changes-from-version-1) を参照してください。

### アップグレードはいつからできますか？

いつでも可能ですが、2023 年 3 月 31 日までに必ず完了してください。

### v1 API と API キーを使い続けることはできますか？

はい。v1 エンドポイントは、2023 年 3 月 31 日までサポートされます。この日付以降、すべての非推奨の v1 SDK ファイルとエンドポイント、v0 SDK ファイル、およびバージョン管理されていないエンドポイントは削除されます。以前発行されたクライアント API キーは、v2 エンドポイントに必要となり、削除されるまで v1 エンドポイントで動作し続けます。

### 新しい API のクライアントシークレットキーはどのように入手できますか？

秘密鍵を入手するには、[UID2 管理者に連絡](../../README.md#contact-info) してください。[前提条件とスケジュール](#prerequisites-and-timeline)も参照してください。

### リクエストを暗号化し、レスポンスを復号化するにはどうしたらいいですか？

[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md) ページでワークフローを説明し、複数のプログラミング言語での例を示しています。
