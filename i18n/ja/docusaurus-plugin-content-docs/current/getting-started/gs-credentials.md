---
title: UID2 Credentials
description: 必要な認証情報とその取得方法について。
hide_table_of_contents: false
sidebar_position: 03
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# UID2 Credentials

UID2 の <a href="../overviews/participants-overview#uid2-external-participants">参加者</a>は、参加形態に応じて、少なくとも 1 つの固有の認証情報セットを必要とします。必要な認証情報のセットは、次の表に示すように、UID2 にどのように参加しているかによって異なります。

| Audience | Credentials | Integration |
| :--- | :--- | :--- |
| Client-Side 実装を使用する参加者 | 次の両方: <ul><li><Link href="../ref-info/glossary-uid#gl-subscription-id">Subscription ID</Link></li><li><Link href="../ref-info/glossary-uid#gl-public-key">Public key</Link></li></ul>これら 2 つをあわせて <Link href="../ref-info/glossary-uid#gl-client-keypair">client keypair</Link> と呼ぶこともあります。 | 次のいずれかを使用したインテグレーション: <ul><li>[UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md)</li><li>[Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md)</li><li>[UID2 Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md)</li></ul> |
| Client-Server 実装を使用する参加者 | 次の両方:<ul><li><Link href="../ref-info/glossary-uid#gl-api-key">API key</Link>、Client key とも呼ばれます。</li><li><Link href="../ref-info/glossary-uid#gl-client-secret">Client Secret</Link> は、参加者と UID2 Service のみが知る値です。</li></ul> | 次のいずれかを使用したインテグレーション: <ul><li>[Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md)</li><li>[UID2 Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-client-server.md)</li><li>[UID2 Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md)</li></ul> |
| Server-Side 実装を使用する参加者 | 次の両方:<ul><li><Link href="../ref-info/glossary-uid#gl-api-key">API key</Link>、Client key とも呼ばれます。</li><li><Link href="../ref-info/glossary-uid#gl-client-secret">Client Secret</Link> は、参加者と UID2 Service のみが知る値です。</li></ul> | 次のいずれかを使用したインテグレーション: <ul><li>[Publisher Integration Guide, Server-Side](../guides/integration-publisher-server-side.md)</li><li>[Advertiser/Data Provider Integration Overview](../guides/integration-advertiser-dataprovider-overview.md)</li></ul> |

## Separate Credentials Per Environment/Role

インテグレーション<Link href="../ref-info/glossary-uid#gl-environment">環境</Link> と本番環境の両方を使用している場合、それぞれの環境用に別々の認証情報が提供されます。詳細は [Getting Your Credentials](#getting-your-credentials) を参照してください。

さらに、いくつかのケースでは、異なるシナリオに対して異なるセットの認証情報を持つことを推奨しますが、必須ではありません。たとえば:
- UID2 Token を生成するパブリッシャーである場合([POST /token/generate](../endpoints/post-token-generate.md) または他の方法で)、自分のために raw UID2 を生成/マッピングする場合([POST /identity/map](../endpoints/post-identity-map.md) を参照)、それぞれの活動に対して異なる認証情報を持つことがあります。
- 広告主の場合、広告主キーを使用して複数のサービスプロバイダが運用するシナリオで、各サービスプロバイダに対して異なる認証情報を割り当てることができます。

## Getting Your Credentials

以下の表は、各 [integration approach](../ref-info/ref-integration-approaches.md) と各 [environment](../getting-started/gs-environments.md) に対して、認証情報を取得する方法を示しています。

<table>
  <thead>
    <tr>
      <th>Environment</th>
      <th>Integration Type</th>
      <th>Getting Credentials</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3"><br/><br/>Prod</td>
      <td>Client-Side</td>
      <td>UID2 Portal > [Client-Side Integration](../portal/client-side-integration.md)</td>
    </tr>
    <tr>

      <td>Client-Server</td>
      <td>UID2 Portal > [API Keys](../portal/api-keys.md)</td>
    </tr>
    <tr>

      <td>Server-Side</td>
      <td>UID2 Portal > [API Keys](../portal/api-keys.md)</td>
    </tr>
    <tr>
      <td rowspan="3"><br/><br/>Integ</td>
      <td>Client-Side</td>
      <td rowspan="3"><br/><br/>UID2 の担当者に問い合わせてください。</td>
    </tr>
    <tr>

      <td>Client-Server</td>

    </tr>
    <tr>

      <td>Server-Side</td>

    </tr>
  </tbody>
</table>

<!-- 
For no-portal:
To get your credentials, ask your UID2 contact.
-->

## Subscription ID and Public Key

Client-Side の実装([UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md) または [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md) を参照) を使用している場合は、以下の認証情報を受け取ります:
- **Subscription ID**: UID2 Service に対してサイトを識別する値です。
- **Public key**: この値は暗号化に使用されます。

**Client keypair** は、これら 2 つの値を使用してアカウントを一意に定義するために使用されます。これらの値は、Client-Side でトークンを生成する実装を使用しているアカウントを識別するために使用されます。

UID2 を Client-Side で実装する場合、UID2 JavaScript SDK、Client-Side Integration for Mobile、または Prebid.js を使用している場合は、設定の一部として SDK または Prebid.js に値を提供してください。

Notes:

- API Key と Client Secret とは異なり、Subscription ID と Public key は安全に保管する必要はありません。

- 値は特定の [Environment](gs-environments.md) で有効です。インテグレーション環境と本番環境の両方を使っている場合、それぞれの環境用にセットの認証情報を取得します。

- Subscription ID と Public Key の認証情報は、Client-Side トークンの生成にのみ使用できます。追加のロールが必要な場合は ([API Permissions](gs-permissions.md) を参照)、そのロールの API Key と Client Secret をリクエストしてください。

## API Key and Client Secret

Client-Side または Server-Side の実装を使用している場合([UID2 Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-client-server.md) または [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md) を参照)、API Key と Client Secret を使用して、<Link href="../ref-info/glossary-uid#gl-operator-service">Operator Service</Link> に接続し、API エンドポイントを呼び出すことができます。これらの値は、サービスの参加者を識別します。

以下は API Key と Client Secret に関する情報です:
- これらの値を安全に保管しなければなりません。詳細は、[Security of API Key and Client Secret](#security-of-api-key-and-client-secret) を参照してください。
- UID2 参加者は、複数のキーを持つことができます。
- 各キーには、それを使用できるエンドポイントを決定する [権限](gs-permissions.md) のセットがあります。
- 各キーには対応する Client Secret があります。
- ほとんどの API エンドポイントは、認証のために API Key と Client Secret の両方を必要とします。詳細は [Authentication and Authorization](gs-auth.md) を参照してください。
- インテグレーション環境と本番環境では、異なる <Link href="../ref-info/glossary-uid#gl-api-key">API Key</Link> が必要です。各環境の認証情報を取得する方法は、[Getting Your Credentials](../getting-started/gs-credentials.md#getting-your-credentials) を参照してください。
- Client Secret は特定の [Environment](gs-environments.md) で有効です。インテグレーション環境と本番環境の両方を使っている場合、それぞれの環境用の Client Secret を取得します。

UID2 アカウントのセットアップの一環として、1つ以上の API Key が発行され、それぞれに対応する Client Secret が割り当てられます。連絡先の詳細は [Contact Info](gs-account-setup.md#contact-info) を参照してください。

### Security of API Key and Client Secret

キーと Client Secret のセキュリティは非常に重要です。以下のガイドラインに従ってください:

- API Key と Client Secret を受け取ったら、安全な場所に保管してください。
- これらの値が保存され使用されているすべての場所を追跡しておき、キーをローテーションする必要がある場合にすぐに実行できるようにしておいてください。
- 既存のキーとシークレットが漏洩した場合、新しいキーとシークレットに置き換えるプロセスを確立してください。

API Key と Client Secret は、認証情報が漏洩するリスクを減らすために、定期的に(たとえば1年ごとに)更新することを推奨します。

## Refreshing Credentials

新しい認証情報をリクエストするには、次のいずれかを行います:

- UID2 Portal にアクセスできる場合、新しい本番環境の認証情報が必要な場合: [Getting Your Credentials](#getting-your-credentials) に記載されているページに移動します。
- UID2 Portal へのアクセス権がない場合、またはインテグレーション環境用の新しい認証情報が必要な場合は、UID2 の担当者に問い合わせてください。

<!-- 
For no-portal:
To request new credentials at any time, ask your UID2 contact. 
-->