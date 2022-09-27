[UID2 Overview](../../../README.md) > [Getting Started](../../README.md) > [v2](./README.md) > UID2 API v1 to v2 Upgrade Guide

# UID2 API v1 to v2 Upgrade Guide

このガイドでは、UID2 v1 API と v2 API の違いを概説し、v2 API へのアップグレード方法について説明します。

```
This guide outlines the differences between the UID2 v1 and v2 APIs and explains how to upgrade to the v2 API.
```

- [Improvements and Changes from Version 1](#improvements-and-changes-from-version-1)
- [Prerequisites and Timeline](#prerequisites-and-timeline)
- [Publisher Upgrade Workflow](#publisher-upgrade-workflow)
- [Advertiser and Data Provider Upgrade Workflow](#advertiser-and-data-provider-upgrade-workflow)
- [FAQs](#faqs)

## Improvements and Changes from Version 1

UID2 API の v2 アップデートは以下の通りです:

- [Application API layer encryption](./encryption-decryption.md) が追加されました。これは E2E のコンテンツ保護と、UID2 の機密情報がネットワーク事業者や UID2 サービス事業者に漏れることを防ぎます。<br>これにより、v2 エンドポイントへの呼び出しを実行するには、POST リクエストボディの暗号化とレスポンスの復号化が必要になります。
- [authentication](./README.md#authentication-and-authorization) のためのクライアント API キーに加え、API リクエストの暗号化および API レスポンスの復号化のためにクライアントシークレットが必要になりました。
- [UID2 API v1](../v1/endpoints/README.md) のすべての GET エンドポイントの HTTP リクエストタイプが、[UID2 API v2](./endpoints/README.md) では GET から POST に変更されました。
- リクエストにクエリパラメータが不要になりました。新しい POST メソッドは、入力パラメータを JSON 形式のリクエストボディとして受け取ります。
- パラメータ値の URL エンコーディングは必要ありません。
- [POST /identity/map](./endpoints/post-identity-map.md) エンドポイントは、1 つまたは複数のメールアドレス、電話番号、またはそれぞれのハッシュに対する UID2 とソルトバケット ID を取得するようになりました。

[UID2 API v2 ドキュメンテーション](./README.md) も参照してください。

```
The v2 updates to the UID2 API include the following:

- [Application API layer encryption](./encryption-decryption.md) has been added. It provides E2E content protection and prevents sensitive UID2 information from leaking to a network operator or the UID2 service operator.<br>This also means that performing calls to the v2 endpoints requires encrypting the POST request body and decrypting the response.
- In addition to the client API key for [authentication](./README.md#authentication-and-authorization), a client secret is now required for encrypting API requests and decrypting API responses.
- The HTTP request type of all GET endpoints in the [UID2 API v1](../v1/endpoints/README.md) has changed from GET to POST in the [UID2 API v2](./endpoints/README.md).
- No more query parameters are required in requests. The new POST methods take input parameters as the request body in JSON format.
- No URL-encoding of parameter values is required.
- The [POST /identity/map](./endpoints/post-identity-map.md) endpoint now retrieves UID2s and salt bucket IDs for one or multiple email addresses, phone numbers, or the respective hashes.

See also [UID2 API v2 Documentation](./README.md).
```

## Prerequisites and Timeline

アップグレードを開始する前に、以下の要件を必ず確認してください:

- UID2 エンドポイントに対して認証を行うには、 [contact the UID2 administrator] (../README.md#contact-info) と API リクエストの暗号化と API 応答の復号化に使用する秘密鍵を入手します。[Authentication and Authorization](./README.md#authentication-and-authorization) も参照してください。
- アップグレードは、すべての v1 SDK ファイルとエンドポイント、v0 SDK ファイル、およびバージョン管理外のエンドポイントが非推奨となり削除される、**2023 年 3 月 31 日** までに完了する必要があります。

```
Before you start the upgrade, be sure to review the following requirements:

- To be able to authenticate to the UID2 endpoints, [contact the UID2 administrator](../README.md#contact-info) and obtain a secret key for encrypting API requests and decrypting API responses. See also [Authentication and Authorization](./README.md#authentication-and-authorization).
- You must complete your upgrade by **March 31, 2023**, when all v1 SDK files and endpoints, the v0 SDK files, and any unversioned endpoints will be deprecated and removed.
```

## Publisher Upgrade Workflow

- [Backward Compatibility](#backward-compatibility-for-publishers)
- [Upgrade Steps](#upgrade-steps-for-publishers)

### Backward Compatibility for Publishers

トークン生成エンドポイントおよびリフレッシュエンドポイントへのコールを独立してアップグレードすることができます。ここで知っておくべきことは以下の通りです:

- v1 [GET /token/generate](../v1/endpoints/get-token-generate.md) または v1 [GET /token/refresh](../v1/endpoints/get-token-refresh.md) エンドポイントによって返されたリフレッシュ トークンを v2 [POST /token/refresh](./endpoints/post-token-refresh.md) エンドポイントに渡すことができますが、応答は暗号化されません。
- v2 [POST /token/refresh](./endpoints/post-token-refresh.md) エンドポイントは、v2 [POST /token/generate](./endpoints/post-token-generate.md) または v2 [POST /token/refresh](./endpoints/post-token-refresh.md) によって返されるリフレッシュトークンのみがレスポンスを暗号化し、呼び出し側はこれらのエンドポイントによって返されたリフレッシュ応答キーを持っていると想定しています。
- v2 [POST /token/generate](./endpoints/post-token-generate.md) や v2 [POST /token/refresh](./endpoints/post-token-refresh.md) エンドポイントから返されるリフレッシュトークンは、v1 [GET /token/refresh](../v1/endpoints/get-token-refresh.md) エンドポイントには渡せますが、レスポンスを暗号化しません。

[UID2 SDK v2](./sdks/client-side-identity.md)は、[UID2 SDK v1](../v1/sdks/client-side-identity-v1.md) との互換性を保った交換部品（a drop-in replacement）で、そのまま置き換えることができるものです。以下は、その内容です:

- ユーザの ID を保存するために使用されるファーストパーティーのクッキーは、2 つのバージョンの SDK 間で完全に相互運用可能です。つまり、UID2 SDK v2 は v1 の Cookie を読み取ることができ、その逆も同様です。
- [v2 SDK init() function](./sdks/client-side-identity.md#initopts-object-void) は、v1 の [GET /token/generate](../v1/endpoints/get-token-generate.md) エンドポイントから返された ID オブジェクトを受け取ります。
- [v1 SDK init() function](../v1/sdks/client-side-identity.md#initopts-object-void) は、v2 [POST /token/generate](./endpoints/post-token-generate.md) エンドポイントから返された ID オブジェクトを受け付けます。

```
You can upgrade calls to the token generation and refresh endpoints independently. Here's what you need to know:

- You can pass refresh tokens returned by the v1 [GET /token/generate](../v1/endpoints/get-token-generate.md) or v1 [GET /token/refresh](../v1/endpoints/get-token-refresh.md) endpoints to the v2 [POST /token/refresh](./endpoints/post-token-refresh.md) endpoint, but responses will not be encrypted.
- The v2 [POST /token/refresh](./endpoints/post-token-refresh.md) endpoint encrypts responses only for refresh tokens returned by the v2 [POST /token/generate](./endpoints/post-token-generate.md) or v2 [POST /token/refresh](./endpoints/post-token-refresh.md) endpoints, with the assumption that the caller has the refresh response key returned by these endpoints.
- You can pass refresh tokens returned by the v2 [POST /token/generate](./endpoints/post-token-generate.md) or v2 [POST /token/refresh](./endpoints/post-token-refresh.md) endpoint to the v1 [GET /token/refresh](../v1/endpoints/get-token-refresh.md) endpoint, which never encrypts responses.

The [UID2 SDK v2](./sdks/client-side-identity.md) is a drop-in replacement for the [UID2 SDK v1](../v1/sdks/client-side-identity-v1.md). Here's what you need to know:

- The first-party cookie used for storing the user's identity is fully interoperable between the two versions of the SDK. This means that the UID2 SDK v2 can read v1 cookies and vice versa.
- The [v2 SDK init() function](./sdks/client-side-identity.md#initopts-object-void) accepts the identity object returned by the v1 [GET /token/generate](../v1/endpoints/get-token-generate.md) endpoint.
- The [v1 SDK init() function](../v1/sdks/client-side-identity.md#initopts-object-void) accepts the identity object returned by the v2 [POST /token/generate](./endpoints/post-token-generate.md) endpoint.
```

### Upgrade Steps for Publishers

UID API v2 へのアップグレードは、以下の手順で行います。

```
To upgrade to the UID API v2, complete the following steps:
```

1. [Upgrade the UID2 SDK](#upgrade-the-uid2-sdk).
1. [Upgrade calls to the token generate endpoint](#upgrade-token-generation-calls).
1. (Required only for custom integrations) [Upgrade calls to the token refresh endpoint](#upgrade-token-refresh-calls).

#### Upgrade the UID2 SDK

UID2 SDK をアップグレードするには、SDK をロードするスクリプトを更新する必要があります。このステップで注意しなければならないことは、以下の通りです:

- UID2 SDK の [version 0](../v1/sdks/client-side-identity-v0.md)を使っている場合は、まず UID2 SDK の [version 1](../v1/sdks/client-side-identity-v1.md#improvements-and-changes-from-version-0) に必ずアップグレードしてください。
- もし SDK を別の場所からロードしたり、SDK のプライベートコピーを保持している場合は、それに応じて場所を更新するようにしてください。

ページでは、SDK のバージョン 1 ではなくバージョン 2 を読み込むようにスクリプトを更新してください。

```
To upgrade the UID2 SDK, you need to update the script that loads the SDK. Here's what you need to keep in mind during this step:

- If you are using [version 0](../v1/sdks/client-side-identity-v0.md) of the UID2 SDK, be sure to upgrade to [version 1](../v1/sdks/client-side-identity-v1.md#improvements-and-changes-from-version-0) of the UID2 SDK first.
- If you load the SDK from another location or hold a private copy of the SDK, be sure to update the locations accordingly.

On your pages, update the script to load version 2 of the SDK instead of verison 1.
```

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

アップグレードの一環として、アプリケーションのサーバー側で、v1 [GET /token/generate](../v1/endpoints/get-token-generate.md) エンドポイントへの呼び出しを v2 [POST /token/generate](./endpoints/post-token-generate.md) エンドポイントへの呼び出しに変更する必要があります。

以下は、知っておくべきことと、実行すべきことです:

- [POST /token/generate](./endpoints/post-token-generate.md) を実行するには、リクエストボディの暗号化とレスポンスの復号化が必要です。詳細および例については、[リクエストの暗号化とレスポンスの復号化](./encryption-decryption.md) を参照してください。
- [POST /token/generate](./endpoints/post-token-generate.md) エンドポイントからの JSON レスポンスは、新しいプロパティを含んでいます: `refresh_response_key` です。
  - UID2 SDK を使用している場合 (バージョンに関係なく)、SDK の `init()` 関数に、他のレスポンスプロパティと一緒にこのキーを渡す必要があります。
  - SDK を使用せず、応答データをカスタムストレージ (データベースやカスタムファーストパーティークッキーなど) に保存している場合は、ストレージを更新してリフレッシュ応答キーを保存する必要があります。
  - v1 [GET /token/refresh](../v1/endpoints/get-token-refresh.md) エンドポイントによって返されたリフレッシュ トークンを格納する既存のセッションで、対応するリフレッシュ応答キーがないものについては更新は必要ありません。これらのセッションは、そのまま動作を継続します。

```
As part of the upgrade, on the server side of your application, you must replace calls to the v1 [GET /token/generate](../v1/endpoints/get-token-generate.md) endpoint with calls to the v2 [POST /token/generate](./endpoints/post-token-generate.md) endpoint.

Here's what you need to know and do:

- Performing a [POST /token/generate](./endpoints/post-token-generate.md) call requires encrypting the request body and decrypting the response. For details and examples, see [Encrypting Requests and Decrypting Responses](./encryption-decryption.md).
- The JSON response from the [POST /token/generate](./endpoints/post-token-generate.md) endpoint contains a new property: `refresh_response_key`.
  - If you are using the UID2 SDK (regardless of the version), you must pass this key to the `init()` function of the SDK along with other response properties.
  - If you are not using the SDK and are storing the response data in custom storage (for example, a database or a custom first-party cookie), you must update the storage to store the refresh response key.
  - No updates are required for any existing sessions that store refresh tokens returned by the v1 [GET /token/refresh](../v1/endpoints/get-token-refresh.md) endpoint and do not have a corresponding refresh response key. These sessions will continue working as is.
```

#### Upgrade Token Refresh Calls

> NOTE: UID2 SDK を使用してトークンを更新・管理している場合は、これ以上の操作は必要ありません。

[UID2 SDK](./sdks/client-side-identity.md) を使用せずにサーバーまたはクライアント側でトークンを更新する場合、v2 [POST /token/refresh](./endpoints/post-token-refresh.md) エンドポイントにリクエストを行う際には、次の点に留意してください:

- 返されたリフレッシュトークンは、リクエストボディに何も修正せずに渡すことができます。
- v2 エンドポイントから返されるリフレッシュトークンは、リフレッシュトークンと一緒に `refresh_response_key` 値が返されることが期待されています。このキーは [レスポンスの復号化](./encryption-decryption.md) のために必要とされます。
- レスポンスに新しいリフレッシュトークンが含まれている場合、対応する `refresh_response_key` 値とともに、ユーザのアイデンティティストレージ (たとえば、データベースやカスタムファーストパーティクッキー) に保存する必要があります。
- v1 のエンドポイントから返されるリフレッシュトークンは、関連する `refresh_response_key` を持たないので、レスポンスは暗号化されません。

```
> NOTE: If you are using the UID2 SDK to refresh and manage tokens, no further action is required.

If you refresh tokens either on server or on client side without using the [UID2 SDK](./sdks/client-side-identity.md), keep in mind the following, when making requests to the v2 [POST /token/refresh](./endpoints/post-token-refresh.md) endpoint:

- You can pass the returned refresh token without any modifications in the request body.
- Refresh tokens returned by the v2 endpoints are expected to have a `refresh_response_key` value returned together with the refresh token. This key is required for [decrypting the response](./encryption-decryption.md).
- If the response contains a new refresh token, you must save it along with the corresponding `refresh_response_key` value into the user's identity storage (for example, a database or a custom first-party cookie).
- Refresh tokens returned by the v1 endpoints do not have the associated `refresh_response_key`, so the response will not be encrypted.
```

## Advertiser and Data Provider Upgrade Workflow

- [Backward Compatibility](#backward-compatibility-for-advertisers-and-data-providers)
- [Upgrade Steps](#upgrade-steps-for-advertisers-and-data-providers)

### Backward Compatibility for Advertisers and Data Providers

UID2 API v2 へのアップグレードについて知っておくべきことは、以下のとおりです:

- 単一ユーザの PII を UID2 にマッピングする v1 [GET /identity/map](../v1/endpoints/get-identity-map.md) エンドポイントは、単一および複数ユーザーの PII をマッピングする v2 [POST /identity/map](./endpoints/post-identity-map.md) エンドポイントと交換されています。
- v2 [POST /identity/map](./endpoints/post-identity-map.md) および [POST /identity/buckets](./endpoints/post-identity-buckets.md) エンドポイントが返す UID2 とバケット ID は、対応する v1 エンドポイントが返すものと同じものです。
- Snowflake インテグレーション](./sdks/snowflake_integration.md)は、UID2 v2 API へのアップグレードの影響を受けないので、変更は必要ありません。

```
Here's what you need to know about upgrading to the UID2 API v2:

- The v1 [GET /identity/map](../v1/endpoints/get-identity-map.md) endpoint for mapping a single user's PII to UID2 has been replaced with the v2 [POST /identity/map](./endpoints/post-identity-map.md) endpoint, which maps PII for single and multiple users.
- UID2s and bucket IDs returned by the v2 [POST /identity/map](./endpoints/post-identity-map.md) and [POST /identity/buckets](./endpoints/post-identity-buckets.md) endpoints are the same as those returned by the corresponding v1 endpoints.
- The [Snowflake integration](./sdks/snowflake_integration.md) is not affected by the upgrade to the UID2 v2 API and requires no changes.
```

### Upgrade Steps for Advertisers and Data Providers

UID API v2 にアップグレードするには、以下の v1 エンドポイントへの呼び出しを、対応する v2 エンドポイントに置き換えます。

| v1 Endpoint                                                      | v2 Endpoint                                                    | Comments                                                                                                                          |
| :--------------------------------------------------------------- | :------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| [GET /identity/buckets](../v1/endpoints/get-identity-buckets.md) | [POST /identity/buckets](./endpoints/post-identity-buckets.md) | HTTP リクエストの種類が変更されました。                                                                                           |
| [POST /identity/map](../v1/endpoints/post-identity-map.md)       | [POST /identity/map](./endpoints/post-identity-map.md)         | v2 エンドポイントは、シングルユーザーの PII もマッピングする以外は、v1 エンドポイントと同じです。                                 |
| [GET /identity/map](../v1/endpoints/get-identity-map.md)         | [POST /identity/map](./endpoints/post-identity-map.md)         | HTTP リクエストタイプが変更されました。<br/>新しい POST エンドポイントでは、単一ユーザおよび複数ユーザの PII をマッピングします。 |

```
To upgrade to the UID API v2, replace calls to the following v1 endpoints with the corresponding v2 endpoints.
```

| v1 Endpoint                                                      | v2 Endpoint                                                    | Comments                                                                                             |
| :--------------------------------------------------------------- | :------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| [GET /identity/buckets](../v1/endpoints/get-identity-buckets.md) | [POST /identity/buckets](./endpoints/post-identity-buckets.md) | The HTTP request type has changed.                                                                   |
| [POST /identity/map](../v1/endpoints/post-identity-map.md)       | [POST /identity/map](./endpoints/post-identity-map.md)         | The v2 endpoint is identical to the v1 endpoint, except it also maps PII for single users.           |
| [GET /identity/map](../v1/endpoints/get-identity-map.md)         | [POST /identity/map](./endpoints/post-identity-map.md)         | The HTTP request type has changed.<br/>The new POST endpoint maps PII for single and multiple users. |

> IMPORTANT: Performing calls to the UID2 API v2 requires encrypting the POST request body and decrypting the response. For details and examples, see [Encrypting Requests and Decrypting Responses](./encryption-decryption.md).

## FAQs

### アップグレードは必要ですか？

UID2 API v2 は UID2 API v1 とは互換性がないため、アップグレードが必要です。

### 旧 API と新 API の主な違いは何ですか？

詳しくは、[Improvements and Changes from Version 1](#improvements-and-changes-from-version-1) を参照してください。

### アップグレードはいつからできますか？

いつでも可能ですが、2023 年 3 月 31 日までに必ず完了してください。

### v1 API と API キーを使い続けることはできますか？

はい。v1 エンドポイントは、2023 年 3 月 31 日までサポートされます。この日付以降、すべての非推奨の v1 SDK ファイルとエンドポイント、v0 SDK ファイル、およびバージョン管理されていないエンドポイントは削除されます。以前発行されたクライアント API キーは、v2 エンドポイントに必要となり、削除されるまで v1 エンドポイントで動作し続けます。

### 新しい API のクライアントシークレットキーはどのように入手できますか？

秘密鍵を入手するには、[UID2 管理者に連絡してください](../README.md#contact-info)。[Prerequisites and Timeline](#prerequisites-and-timeline)も参照してください。

### リクエストを暗号化し、レスポンスを復号化するにはどうしたらいいですか？

リ[Encrypting Requests and Decrypting Responses](./encryption-decryption.md) ページでワークフローを説明し、Python での例を示しています。

### Do I have to do the upgrade?

Yes. The UID2 API v2 is not compatible with UID2 API v1 and requires an upgrade.

### What are the key differences between the old and new APIs?

For details, see [Improvements and Changes from Version 1](#improvements-and-changes-from-version-1).

### When can I start the upgrade?

Any time, but be sure to complete it by March 31, 2023.

### Can I continue using the v1 API and API keys?

Yes. The v1 endpoints will be supported until March 31, 2023. After that date, all deprecated v1 SDK files and endpoints, the v0 SDK files, and any unversioned endpoints will be removed. Previously issued client API keys will be required for the v2 endpoints and will continue working with the v1 endpoints until their removal.

### How do I obtain a client secret key for the new API?

To obtain your secret key, [contact the UID2 administrator](../README.md#contact-info). See also [Prerequisites and Timeline](#prerequisites-and-timeline).

### How do I encrypt requests and decrypt responses?

The [Encrypting Requests and Decrypting Responses](./encryption-decryption.md) page explains the workflow and provides examples in Python.
