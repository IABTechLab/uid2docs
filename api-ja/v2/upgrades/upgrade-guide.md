[UID2 Overview](../../../README-ja.md) > [Getting Started](../../README.md) > [v2](../README.md) > UID2 API v1 to v2 Upgrade Guide

# UID2 API v1 to v2 Upgrade Guide

このガイドでは、UID2 v1 API と v2 API の違いを概説し、v2 API へのアップグレード方法について説明します。

- [Improvements and Changes from Version 1（バージョン 1 からの改善点・変更点）](#improvements-and-changes-from-version-1)
- [Prerequisites and Timeline（前提条件とスケジュール）](#prerequisites-and-timeline)
- [Publisher Upgrade Workflow（パブリッシャーアップグレードのワークフロー）](#publisher-upgrade-workflow)
- [Advertiser and Data Provider Upgrade Workflow（広告主およびデータプロバイダーのアップグレードワークフロー）](#advertiser-and-data-provider-upgrade-workflow)
- [FAQs](#faqs)

## Improvements and Changes from Version 1

UID2 API の v2 アップデートは以下の通りです:

- [アプリケーション API 層の暗号化](../ref-info/encryption-decryption.md) が追加されました。これは E2E のコンテンツ保護と、UID2 の機密情報がネットワーク事業者や UID2 サービス事業者に漏れることを防ぎます。<br>これにより、v2 エンドポイントへの呼び出しを実行するには、POST リクエストボディの暗号化とレスポンスの復号化が必要になります。
- [認証と承認](../README.md#authentication-and-authorization) のためのクライアント API キーに加え、API リクエストの暗号化および API レスポンスの復号化のためにクライアントシークレットが必要になりました。
- [UID2 API v1](../../v1/endpoints/README.md) のすべての GET エンドポイントの HTTP リクエストタイプが、[UID2 API v2](../endpoints/README.md) では GET から POST に変更されました。
- リクエストにクエリパラメータが不要になりました。新しい POST メソッドは、入力パラメータを JSON 形式のリクエストボディとして受け取ります。
- パラメータ値の URL エンコーディングは必要ありません。
- [POST /identity/map](../endpoints/post-identity-map.md) エンドポイントは、1 つまたは複数のメールアドレス、電話番号、またはそれぞれのハッシュに対する UID2 とソルトバケット ID を取得するようになりました。

[UID2 API v2 ドキュメンテーション](../README.md) も参照してください。

## Prerequisites and Timeline

アップグレードを開始する前に、以下の要件を必ず確認してください:

- UID2 エンドポイントに対して認証を行うには、 [UID2 管理者へ連絡](../README.md#contact-info) し API リクエストの暗号化と API 応答の復号化に使用する秘密鍵を入手します。[Authentication and Authorization（認証と承認）](../README.md#authentication-and-authorization) も参照してください。
- アップグレードは、すべての v1 SDK ファイルとエンドポイント、v0 SDK ファイル、およびバージョン管理外のエンドポイントが非推奨となり削除される、**2023 年 3 月 31 日** までに完了する必要があります。

## Publisher Upgrade Workflow

- [Backward Compatibility（後方互換性）](#backward-compatibility-for-publishers)
- [Upgrade Steps（アップグレードステップ）](#upgrade-steps-for-publishers)

### Backward Compatibility for Publishers

トークン生成エンドポイントおよびリフレッシュエンドポイントへのコールを独立してアップグレードすることができます。ここで知っておくべきことは以下の通りです:

- v1 [GET /token/generate](../../v1/endpoints/get-token-generate.md) または v1 [GET /token/refresh](../../v1/endpoints/get-token-refresh.md) エンドポイントによって返されたリフレッシュ トークンを v2 [POST /token/refresh](../endpoints/post-token-refresh.md) エンドポイントに渡すことができますが、応答は暗号化されません。
- v2 [POST /token/refresh](../endpoints/post-token-refresh.md) エンドポイントは、v2 [POST /token/generate](../endpoints/post-token-generate.md) または v2 [POST /token/refresh](../endpoints/post-token-refresh.md) によって返されるリフレッシュトークンのみがレスポンスを暗号化し、呼び出し側はこれらのエンドポイントによって返されたリフレッシュ応答キーを持っていると想定しています。
- v2 [POST /token/generate](../endpoints/post-token-generate.md) や v2 [POST /token/refresh](../endpoints/post-token-refresh.md) エンドポイントから返されるリフレッシュトークンは、v1 [GET /token/refresh](../../v1/endpoints/get-token-refresh.md) エンドポイントには渡せますが、レスポンスを暗号化しません。

[UID2 SDK v2](../sdks/client-side-identity.md)は、[UID2 SDK v1](../../v1/sdks/client-side-identity-v1.md) との互換性を保った交換部品（a drop-in replacement）で、そのまま置き換えることができるものです。以下は、その内容です:

- ユーザーの ID を保存するために使用されるファーストパーティーのクッキーは、2 つのバージョンの SDK 間で完全に相互運用可能です。つまり、UID2 SDK v2 は v1 の Cookie を読み取ることができ、その逆も同様です。
- [v2 SDK init() function](../sdks/client-side-identity.md#initopts-object-void) は、v1 の [GET /token/generate](../../v1/endpoints/get-token-generate.md) エンドポイントから返された ID オブジェクトを受け取ります。
- [v1 SDK init() function](../../v1/sdks/client-side-identity-v1.md#initopts-object-void) は、v2 [POST /token/generate](../endpoints/post-token-generate.md) エンドポイントから返された ID オブジェクトを受け付けます。

### Upgrade Steps for Publishers

UID API v2 へのアップグレードは、以下の手順で行います。

1. [UID2 SDK をアップグレードします](#upgrade-the-uid2-sdk).
1. [トークン生成エンドポイントへの呼び出しをアップグレードします](#upgrade-token-generation-calls).
1. (カスタムインテグレーションのみ必要です) [トークンリフレッシュエンドポイントの呼び出しをアップグレードします](#upgrade-token-refresh-calls).

#### Upgrade the UID2 SDK

UID2 SDK をアップグレードするには、SDK をロードするスクリプトを更新する必要があります。このステップで注意しなければならないことは、以下の通りです:

- UID2 SDK の [version 0](../../v1/sdks/client-side-identity-v0.md)を使っている場合は、まず UID2 SDK の [version 1](../../v1/sdks/client-side-identity-v1.md#improvements-and-changes-from-version-0) に必ずアップグレードしてください。
- もし SDK を別の場所からロードしたり、SDK のプライベートコピーを保持している場合は、それに応じて場所を更新するようにしてください。

ページでは、SDK のバージョン 1 ではなくバージョン 2 を読み込むようにスクリプトを更新してください。

SDK version 1:

```html
<script
  src="https://prod.uidapi.com/static/js/uid2-sdk-1.0.0.js"
  type="text/javascript"
></script>
```

SDK version 2:

```html
<script
  src="https://prod.uidapi.com/static/js/uid2-sdk-2.0.0.js"
  type="text/javascript"
></script>
```

#### Upgrade Token Generation Calls

アップグレードの一環として、アプリケーションのサーバー側で、v1 [GET /token/generate](../../v1/endpoints/get-token-generate.md) エンドポイントへの呼び出しを v2 [POST /token/generate](../endpoints/post-token-generate.md) エンドポイントへの呼び出しに変更する必要があります。

以下は、知っておくべきことと、実行すべきことです:

- [POST /token/generate](../endpoints/post-token-generate.md) を実行するには、リクエストボディの暗号化とレスポンスの復号化が必要です。詳細および例については、[リクエストの暗号化とレスポンスの復号化](../ref-info/encryption-decryption.md) を参照してください。
- [POST /token/generate](../endpoints/post-token-generate.md) エンドポイントからの JSON レスポンスは、新しいプロパティを含んでいます: `refresh_response_key` です。
  - UID2 SDK を使用している場合 (バージョンに関係なく)、SDK の `init()` 関数に、他のレスポンスプロパティと一緒にこのキーを渡す必要があります。
  - SDK を使用せず、応答データをカスタムストレージ (データベースやカスタムファーストパーティークッキーなど) に保存している場合は、ストレージを更新してリフレッシュ応答キーを保存する必要があります。
  - v1 [GET /token/refresh](../../v1/endpoints/get-token-refresh.md) エンドポイントによって返されたリフレッシュ トークンを格納する既存のセッションで、対応するリフレッシュ応答キーがないものについては更新は必要ありません。これらのセッションは、そのまま動作を継続します。

#### Upgrade Token Refresh Calls

> NOTE: UID2 SDK を使用してトークンを更新・管理している場合は、これ以上の操作は必要ありません。

[UID2 SDK](../sdks/client-side-identity.md) を使用せずにサーバーまたはクライアント側でトークンを更新する場合、v2 [POST /token/refresh](../endpoints/post-token-refresh.md) エンドポイントにリクエストを行う際には、次の点に留意してください:

- 返されたリフレッシュトークンは、リクエストボディに何も修正せずに渡すことができます。
- v2 エンドポイントから返されるリフレッシュトークンは、リフレッシュトークンと一緒に `refresh_response_key` 値が返されることが期待されています。このキーは [レスポンスの復号化](../ref-info/encryption-decryption.md) のために必要とされます。
- レスポンスに新しいリフレッシュトークンが含まれている場合、対応する `refresh_response_key` 値とともに、ユーザーのアイデンティティストレージ (たとえば、データベースやカスタムファーストパーティクッキー) に保存する必要があります。
- v1 のエンドポイントから返されるリフレッシュトークンは、関連する `refresh_response_key` を持たないので、レスポンスは暗号化されません。

## Advertiser and Data Provider Upgrade Workflow

- [Backward Compatibility（後方互換性）](#backward-compatibility-for-advertisers-and-data-providers)
- [Upgrade Steps（アップグレードステップ）](#upgrade-steps-for-advertisers-and-data-providers)

### Backward Compatibility for Advertisers and Data Providers

UID2 API v2 へのアップグレードについて知っておくべきことは、以下のとおりです:

- 単一ユーザーの PII を UID2 にマッピングする v1 [GET /identity/map](../../v1/endpoints/get-identity-map.md) エンドポイントは、単一および複数ユーザーの PII をマッピングする v2 [POST /identity/map](../endpoints/post-identity-map.md) エンドポイントと交換されています。
- v2 [POST /identity/map](../endpoints/post-identity-map.md) および [POST /identity/buckets](../endpoints/post-identity-buckets.md) エンドポイントが返す UID2 とバケット ID は、対応する v1 エンドポイントが返すものと同じものです。
- [Snowflake インテグレーション](../sdks/snowflake_integration.md) は、UID2 v2 API へのアップグレードの影響を受けないので、変更は必要ありません。

### Upgrade Steps for Advertisers and Data Providers

UID API v2 にアップグレードするには、以下の v1 エンドポイントへの呼び出しを、対応する v2 エンドポイントに置き換えます。

| v1 Endpoint                                                      | v2 Endpoint                                                    | Comments                                                                                                                              |
| :--------------------------------------------------------------- | :------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| [GET /identity/buckets](../../v1/endpoints/get-identity-buckets.md) | [POST /identity/buckets](../endpoints/post-identity-buckets.md) | HTTP リクエストの種類が変更されました。                                                                                               |
| [POST /identity/map](../../v1/endpoints/post-identity-map.md)       | [POST /identity/map](../endpoints/post-identity-map.md)         | v2 エンドポイントは、シングルユーザーの PII もマッピングする以外は、v1 エンドポイントと同じです。                                     |
| [GET /identity/map](../../v1/endpoints/get-identity-map.md)         | [POST /identity/map](../endpoints/post-identity-map.md)         | HTTP リクエストタイプが変更されました。<br/>新しい POST エンドポイントでは、単一ユーザーおよび複数ユーザーの PII をマッピングします。 |

> IMPORTANT: UID2 API v2 の呼び出しを行うには、POST リクエストボディを暗号化し、レスポンスを復号化する必要があります。詳細および例については、[リクエストの暗号化とレスポンスの復号化](../ref-info/encryption-decryption.md) を参照してください。

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

秘密鍵を入手するには、[UID2 管理者に連絡](../README.md#contact-info) してください。[前提条件とスケジュール](#prerequisites-and-timeline)も参照してください。

### リクエストを暗号化し、レスポンスを復号化するにはどうしたらいいですか？

[リクエストの暗号化とレスポンスの復号化](../ref-info/encryption-decryption.md) ページでワークフローを説明し、Python での例を示しています。
