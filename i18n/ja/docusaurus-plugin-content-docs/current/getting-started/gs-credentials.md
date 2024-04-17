---
title: UID2 Credentials
description: 必要な認証情報とその取得方法について。
hide_table_of_contents: false
sidebar_position: 03
---

# UID2 Credentials

UID2 <a href="/docs/intro#participants">参加者</a>はそれぞれ、固有の認証情報のセットを取得します。取得する認証情報のセットは、以下の表に示すように、UID2にどのように参加しているかによって決まります。

| Audience | Credentials | Integration |
| :--- | :--- | :--- |
| Server-Sideのエンドポイントを使用する参加者 | 以下の両方:<ul><li>[API key](../ref-info/glossary-uid.md#gl-api-key)、クライアントキーとも呼ばれます。</li><li>[Client secret](../ref-info/glossary-uid.md#gl-client-secret)、参加者と UID2 Service だけが知る値。</li></ul> | これらのエンドポイントのいずれかを使用するインテグレーション: <ul><li>[POST&nbsp;/identity/map](../endpoints/post-identity-map.md)</li><li>[POST&nbsp;/identity/buckets](../endpoints/post-identity-buckets.md)</li><li>[POST&nbsp;/token/generate](../endpoints/post-token-generate.md)</li></ul> |
| Client-Side の実装を使用する参加者 | 以下の両方: <ul><li>Subscription ID</li><li>Public key</li></ul> | これらのいずれかを使用したインテグレーション: <ul><li>[UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md)</li><li>[Client-Side Integration Guide for JavaScript](../guides/publisher-client-side.md)</li></ul> |

本番環境だけでなくテスト環境も使用している場合は、それぞれの環境用に別々の認証情報を取得します。

<!-- It includes:

* [API Key and Client Secret](#api-key-and-client-secret)
  * [Security of API Key and Client Secret](#security-of-api-key-and-client-secret)
* [Subscription ID and Public Key](#subscription-id-and-public-key)
* [Refreshing Credentials](#refreshing-credentials)
 -->

## API Key and Client Secret

Server-Side の実装([UID2 Server-Side Integration Guide for Prebid.js](../guides/integration-prebid-server-side.md) または [Server-Side Integration Guide for JavaScript](../guides/integration-javascript-server-side.md) を参照) を使用している場合、API Key とクライアントシークレットにより、[Operator Service](../ref-info/glossary-uid.md#gl-operator-service) に接続し、API エンドポイントを呼び出すことができます。これらの値は、サービスの参加者を識別します。

以下は API Key とクライアントシークレットに関する情報です:
- UID2 参加者は、複数のキーを持つことができます。
- 各キーには、それを使用できるエンドポイントを決定する [Permissions](gs-permissions.md) のセットがあります。
- 各キーには対応するクライアントシークレットがあります。
- ほとんどの API エンドポイントは、認証のために API Key とクライアントシークレットの両方を必要とします。詳細は [Authentication and Authorizatio](gs-auth.md) を参照してください。
- 本番環境だけでなくテスト環境も利用する場合は、それぞれの環境で別々の API Key が必要になります。
- クライアントシークレットは特定の [Environment](gs-environments.md) で有効です。テスト環境と本番環境の両方を使っている場合、それぞれの環境用のクライアントシークレットを取得します。

UID2 アカウントのセットアップの一環として、1つ以上の API Key が発行され、それぞれに対応するクライアントシークレットが割り当てられます。相談相手の詳細については、[Contact Info](gs-account-setup.md#contact-info) を参照してください。

### Security of API Key and Client Secret

キーとクライアントシークレットのセキュリティは非常に重要です。以下のガイドラインに従ってください:

- API Key とクライアントシークレットを受け取ったら、安全な場所に保管してください。
- これらの値が保存され使用されているすべての場所を追跡しておき、キーをローテーションする必要がある場合にすぐに実行できるようにしておいてください。
- 既存のキーとシークレットが漏洩した場合、新しいキーとシークレットに置き換えるプロセスを確立してください。

API Key とクライアントシークレットは、認証情報が漏洩するリスクを減らすために、定期的に(例えば1年ごとに)更新するのがベストです。

## Subscription ID and Public Key

Client-Side の実装([UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md) または [Client-Side Integration Guide for JavaScript](../guides/publisher-client-side.md) を参照) を使用している場合は、以下の認証情報を受け取ります:
- **Subscription ID**: UID2 Service に対してサイトを識別する値です。
- **Public key**: この値は暗号化に使用されます。

UID2 JavaScript SDK または Prebid を使用して、Client-Side で UID2 を実装する場合、設定の一部として SDK または Prebid に値を提供します。

Notes:

- API キーとクライアントシークレットとは異なり、Subscription ID と Public key は安全に保管する必要はありません。

- これらの値は特定の [Environment](gs-environments.md) に対して有効です。テスト環境と本番環境の両方を使用している場合、それぞれの環境用の認証情報のセットを取得します。

- Subscription ID と Public Key の認証情報は、Client-Side トークンの生成にのみ使用できます。追加のロールが必要な場合は ([API Permissions](gs-permissions.md) を参照してください)、そのロールの API Key と Client Secret をリクエストしてください。

## Refreshing Credentials

新しいクレデンシャルをリクエストするには、いつでも UID2 の連絡先に連絡してください。
