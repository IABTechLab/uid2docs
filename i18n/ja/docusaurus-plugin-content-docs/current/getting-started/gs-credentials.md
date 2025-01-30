---
title: UID2 Credentials
description: 必要な認証情報とその取得方法について。
hide_table_of_contents: false
sidebar_position: 03
---

import Link from '@docusaurus/Link';

# UID2 Credentials

UID2 <a href="../intro#participants">参加者</a>はそれぞれ、固有の認証情報のセットを取得します。取得する認証情報のセットは、次の表に示すように、UID2 にどのように参加しているかによって決まります。

| Audience | Credentials | Integration |
| :--- | :--- | :--- |
| Client-Side 実装を使用する参加者 | 次の両方: <ul><li><Link href="../ref-info/glossary-uid#gl-subscription-id">Subscription ID</Link></li><li><Link href="../ref-info/glossary-uid#gl-public-key">Public key</Link></li></ul>これら 2 つをあわせて <Link href="../ref-info/glossary-uid#gl-client-keypair">client keypair</Link> と呼ぶこともあります。 | 次のいずれかを使用したインテグレーション: <ul><li>[UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md)</li><li>[Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md)</li><li>[UID2 Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md)</li></ul> |
| Client-Server 実装を使用する参加者 | 次の両方:<ul><li><Link href="../ref-info/glossary-uid#gl-api-key">API key</Link>、client key とも呼ばれます。</li><li><Link href="../ref-info/glossary-uid#gl-client-secret">Client secret</Link> は、参加者と UID2 Service のみが知る値です。</li></ul> | 次のいずれかを使用したインテグレーション: <ul><li>[Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md)</li><li>[UID2 Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-client-server.md)</li><li>[UID2 Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md)</li></ul> |
| Server-Side 実装を使用する参加者 | 次の両方:<ul><li><Link href="../ref-info/glossary-uid#gl-api-key">API key</Link>、client key とも呼ばれます。</li><li><Link href="../ref-info/glossary-uid#gl-client-secret">Client secret</Link>　は、参加者と UID2 Service のみが知る値です。</li></ul> | 次のいずれかを使用したインテグレーション: <ul><li>[Publisher Integration Guide, Server-Side](../guides/integration-publisher-server-side.md)</li><li>[Advertiser/Data Provider Integration Overview](../guides/integration-advertiser-dataprovider-overview.md)</li></ul> |

本番環境だけでなくインテグレーション環境も使用している場合は、それぞれの環境用に別々の認証情報を取得します。

## Subscription ID and Public Key

Client-Side の実装([UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md) または [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md) を参照) を使用している場合は、以下の認証情報を受け取ります:
- **Subscription ID**: UID2 Service に対してサイトを識別する値です。
- **Public key**: この値は暗号化に使用されます。

**Client keypair**　は、これら2つの値を使用してアカウントを一意に定義するために使用されます。これらの値は、Client-Side でトークンを生成する実装を使用しているアカウントを識別するために使用されます。

UID2 を Client-Side で実装する場合、UID2 JavaScript SDK、Client-Side Integration for Mobile、または Prebid.js を使用している場合は、設定の一部として SDK または Prebid.js に値を提供してください。

Notes:

- API Key とクライアントシークレットとは異なり、Subscription ID と Public key は安全に保管する必要はありません。

- これらの値は特定の [Environment](gs-environments.md) に対して有効です。インテグレーション環境と本番環境の両方を使用している場合、それぞれの環境用の認証情報のセットを取得します。

- Subscription ID と Public Key の認証情報は、Client-Side トークンの生成にのみ使用できます。追加のロールが必要な場合は ([API Permissions](gs-permissions.md) を参照してください)、そのロールの API Key と Client Secret をリクエストしてください。

## API Key and Client Secret

Client-Side または Server-Side の実装を使用している場合([UID2 Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-client-server.md) または [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md) を参照してください)、API Key とクライアントシークレットを使用して、<Link href="../ref-info/glossary-uid#gl-operator-service">Operator Service</Link> に接続し、API エンドポイントを呼び出すことができます。これらの値は、サービスの参加者を識別します。

以下は API Key とクライアントシークレットに関する情報です:
- これらの値を安全に保管しなければなりません。詳細は、[Security of API Key and Client Secret](#security-of-api-key-and-client-secret) を参照してください。
- UID2 参加者は、複数のキーを持つことができます。
- 各キーには、それを使用できるエンドポイントを決定する [Permissions](gs-permissions.md) のセットがあります。
- 各キーには対応するクライアントシークレットがあります。
- ほとんどの API エンドポイントは、認証のために API Key とクライアントシークレットの両方を必要とします。詳細は [Authentication and Authorizatio](gs-auth.md) を参照してください。
- 本番環境だけでなくインテグレーション環境も利用する場合は、それぞれの環境で別々の API Key が必要になります。
- クライアントシークレットは特定の [Environment](gs-environments.md) で有効です。インテグレーション環境と本番環境の両方を使っている場合、それぞれの環境用のクライアントシークレットを取得します。

UID2 アカウントのセットアップの一環として、1つ以上の API Key が発行され、それぞれに対応するクライアントシークレットが割り当てられます。相談相手の詳細は [Contact Info](gs-account-setup.md#contact-info) を参照してください。

### Security of API Key and Client Secret

キーとクライアントシークレットのセキュリティは非常に重要です。以下のガイドラインに従ってください:

- API Key とクライアントシークレットを受け取ったら、安全な場所に保管してください。
- これらの値が保存され使用されているすべての場所を追跡しておき、キーをローテーションする必要がある場合にすぐに実行できるようにしておいてください。
- 既存のキーとシークレットが漏洩した場合、新しいキーとシークレットに置き換えるプロセスを確立してください。

API Key とクライアントシークレットは、認証情報が漏洩するリスクを減らすために、定期的に(例えば1年ごとに)更新するのがベストです。

## Refreshing Credentials

新しいクレデンシャルをリクエストするには、いつでも UID2 の連絡先に連絡してください。
