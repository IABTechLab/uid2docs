---
title: Publishers
description: パブリッシャー向けの情報の概要。
hide_table_of_contents: false
sidebar_position: 02
use_banner: true
banner_title: パブリッシャー向け UID2 概要
banner_description: 変化し続ける広告業界においてオーディエンスターゲティングを維持し、より良いインプレッション収益化と関連性の向上を実現。
banner_text_color: 'white'
banner_text_color_dark: 'black'
banner_background_color: '#035959'
banner_background_color_dark: '#DCDEE1'
displayed_sidebar: sidebarPublishers
---

import Link from '@docusaurus/Link';

パブリッシャーとして、Unified ID 2.0 (UID2) のクロスデバイスプレゼンスの恩恵を受け、すべてのインベントリで一貫した ID ファブリックを活用することができます。

UID2 を採用するパブリッシャーにとってのメリット、ワークフロー、ドキュメント、その他のリソース、および UID2 の導入手順について説明します。

:::note
UID2 のドキュメント一式に左サイドバーからアクセスしたい場合は、[Unified ID 2.0 Overview](../intro.md) を参照してください。
:::

## Benefits of UID2 for Publishers

UID2 とインテグレーションすることで得られるメリットの一部を次に示します:
- デスクトップ、モバイル、CTVで、単一の識別子でアドレサブルなオーディエンスターゲティング。
- デバイスをまたいだフリケンシー。
- より適切なコンテンツのリコメンデーション。
- 関連するコンテンツでパーソナライズされた広告体験を提供する機能。
- 消費者のプライバシー管理を向上させることを目的とした、オプトアウトを提供する機能。

## Workflow for Publishers

以下の手順は、ID プロバイダー、パブリッシャー、SSO プロバイダーなど、SSP を介して UID2 Token を<Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>に伝播する組織を想定したワークフローの概要です。パブリッシャーは、UID2 と相互運用可能で、パブリッシャーに代わって UID2 インテグレーションを処理できる SSO プロバイダーまたは独立した ID プロバイダーと連携することを選択できます。

1. ユーザーがパブリッシャーウェブサイト、モバイルアプリ、または CTV アプリを訪れます。

1. パブリッシャーは、ユーザーにデータの取り扱いについての透明性を確保し、ユーザーにメールアドレスまたは電話番号を提供するよう求めます。

1. ユーザーがメールアドレスまたは電話番号を提供すると、パブリッシャーは SDK または直接の API インテグレーションを介して、それを UID2 Operator に送信します。
   :::tip
    パブリッシャーは、SSO プロバイダーまたは ID プロバイダーに、自身の代わりに <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> を渡すことを許可できます。
    :::

1. UID2 Operator:
   - メールアドレスまたは電話番号を受け取ります。
   - ソルト、ハッシュ、暗号化プロセスを実行します。
   - UID2 Token を返します。

1. リアルタイムビディング中に SSP と共有するために、パブリッシャーは UID2 Token を保存します。
   - Server-Side: パブリッシャーは、マッピングテーブル、DMP、データレイク、または他のサーバーサイドアプリケーションにトークンを保存します。
   - Client-Side: パブリッシャーは、トークンをクライアントサイドアプリケーションまたはユーザーのブラウザにファーストパーティクッキーとして保存します。

1. パブリッシャーは UID2 Token をストレージから取得します。

1. パブリッシャーは SSP に UID2 Token を送信します。

1. SSP は UID2 Token とともにビッドリクエストをビッドストリームに入れます。

<!-- The publisher requests updated UID2 tokens using a refresh token. When applicable, the refresh token includes a user’s opt-out request. -->

![Publisher Workflow](images/UID2PublisherAndSSPWorkflow.jpg)

## Getting Started

次の手順で始めます:

1. [Request Access](/request-access) ページのフォームに記入して、UID2 へのアクセスをリクエストします。
1. UID2 とインテグレーションしたいプロパティを特定します。
1. UID2 契約を締結します。
1. <Link href="../ref-info/glossary-uid#gl-client-side">client-side</Link>、<Link href="../ref-info/glossary-uid#gl-client-server">client-server</Link>、<Link href="../ref-info/glossary-uid#gl-server-side">server-side</Link> いずれのインテグレーションを行うか決め、UID2 の連絡先に伝えてください。

   これらのオプションについての詳細は、[Integration Approaches](../ref-info/ref-integration-approaches.md) を参照してください。

1. UID2 credential([UID2 Credentials](../getting-started/gs-credentials.md)) を受け取ります。
1. 該当する [implementation resources](#implementation-resources) を使用して、SDK または UID2 と直接インテグレーションしてください。

   :::note
   UID2 へのリクエストメッセージは必ず暗号化してください。詳細は [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md) を参照してください。
   :::

1. テスト: 

   - ビッドリクエストで UID2 Token が正しく生成され、渡されていることを確認します。
   - 必要に応じてトラブルシューティングを行い、ビッドリクエストで UID2 Token が正しく渡されるように SSP と協力します。
1. 本番稼動します。

## Implementation Resources

パブリッシャーが UID2 を実装するために利用できるリソースは以下の通りです:

- [Web Integrations](#web-integrations)
- [Mobile Integrations](#mobile-integrations)
- [CTV Integrations](#ctv-integrations)
- [Prebid Integrations](#prebid-integrations)
- [Google Ad Manager Integrations](#google-ad-manager-integrations)

### Web Integrations

以下のリソースは、パブリッシャーの Web インテグレーションに利用できます。

:::tip
Web インテグレーションオプションの詳細は [Web Integration Overview](../guides/integration-options-publisher-web.md) を参照してください。
:::

| Integration Type| Documentation | Content Description |
| :--- | :--- | :--- |
| Prebid (Overview) | [UID2 Integration Overview for Prebid](../guides/integration-prebid.md) | UID2 とインテグレーションし、RTB ビッドストリームで Prebid.js または Prebid Mobile SDK から渡される <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 Token</Link> (Advertising Token)  を生成したいパブリッシャー向けのインテグレーションオプションの概要です。 |
| Prebid.js Client-Side Integration | [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md) | 最も簡単な実装方法であるClient-Side で UID2 Token をリクエストし、Prebid.js に以下を管理させることを選択したいパブリッシャー向けのガイドです: <ul><li>トークンの生成と <a href="../ref-info/glossary-uid#gl-token-refresh">Token Refresh</a>。</li><li>トークンを RTB ビッドストリームに渡す。</li></ul> |
| Prebid.js Client-Server Integration | [UID2 Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-client-server.md) | UID2 とインテグレーションし、RTB ビッドストリームで Prebid.js から渡される UID2 Token を生成したいが、トークンを Server-Side で生成したいパブリッシャー向けのガイドです: 例えば、<Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link> を利用しているパブリッシャーなど。 |
| JavaScript (Overview) | [UID2 Integration Overview for JavaScript](../guides/integration-javascript.md) | JavaScript SDK を使って UID2 とインテグレーションしたいパブリッシャー向けのオプションの概要です。 |
| JavaScript Client-Side Integration | [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md) | Client-Side の JavaScript の変更だけで UID2 とインテグレーションしたいパブリッシャー向けのガイドで、最も簡単な実装方法です。<br/>SDK for JavaScript は、トークン生成とトークンリフレッシュを自動的に管理します。 |
| JavaScript Client-Server Integration | [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md) | SDK for JavaScript を使用し、トークンを Server-Side で生成してパブリッシャーのウェブページに渡す必要がある、標準的なWeb インテグレーションシナリオを網羅したパブリッシャーガイドです。 |
| Server-Side Integration | [Publisher Integration Guide, Server-Side](../guides/integration-publisher-server-side.md) | [SDK for JavaScript](../sdks/sdk-ref-javascript.md) を使用しないパブリッシャー向けのガイドです。 |
| Publisher/SSP Integration with GAM | [Google Ad Manager Secure Signals Integration Guide](../guides/integration-google-ss.md) | パブリッシャーが UID2 を Google Ad Manager のセキュアシグナル機能(旧称: Encrypted Signals for Publishers、ESP) で使用する際に必要な追加手順について説明したガイドです。 |

### Mobile Integrations

以下のリソースは、Android または iOS デバイスをサポートするパブリッシャーのインテグレーションに利用できます。

| Integration Type| Documentation | Content Description |
| :--- | :--- | :--- |
| Android/iOS (Overview) | [Mobile Integration Overview for Android and iOS](../guides/integration-mobile-overview.md) | SDK for Android または SDK for iOS を使用して UID2 とインテグレーションしたいモバイルアプリパブリッシャー向けのオプションの概要です。 |
| Android/iOS, Client-Side Integration | [Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md) | モバイルアプリ内のみの変更で UID2 とインテグレーションしたいモバイルアプリパブリッシャー向けのインテグレーションガイドです（Server-Side の変更はありません）。 |
| Android/iOS, Client-Server Integration | [Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md) | UID2 とインテグレーションしたいモバイルアプリのパブリッシャー向けのインテグレーションガイドです:<ol><li>UID2 Token を Server-Side で生成するには、PublicまたはPrivate Operatorを使用します。</li><li>その結果、<Link href="../ref-info/glossary-uid#gl-identity">identities</Link> をモバイルアプリに渡し、ビッドストリームに渡します。</li></ol> |
| Android | [SDK for Android Reference Guide](../sdks/sdk-ref-android.md) | Android アプリをサポートする必要があるパブリッシャー向けに、UID2 を使用してクライアント ID を生成または確立し、UID2 Token を取得するプロセスを促進する SDK。 |
| iOS | [SDK for iOS Reference Guide](../sdks/sdk-ref-ios.md) | iOS アプリをサポートする必要があるパブリッシャー向けに、UID2 を使用してクライアント ID を生成または確立し、UID2 Token を取得するプロセスを促進する SDK。 |

### CTV Integrations

CTV をサポートするパブリッシャーのインテグレーションに利用できるリソースは以下の通りです。

| Integration Type| Documentation | Content Description |
| :--- | :--- | :--- |
| CTV | [CTV Integration Guide](../guides/integration-ctv-guide.md) | CTV インテグレーションオプションの概要と、追加情報および手順へのリンク。 |

### Prebid Integrations

Prebid とインテグレーションするパブリッシャーには、以下のリソースがあります。

| Integration Type| Documentation | Content Description |
| :--- | :--- | :--- |
| Prebid (Overview) | [UID2 Integration Overview for Prebid](../guides/integration-prebid.md) | UID2 とインテグレーションし、RTB ビッドストリームで Prebid.js または Prebid Mobile SDK から渡される <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 Token</Link> (Advertising Token) を生成したいパブリッシャー向けのインテグレーションオプションの概要。 |
| Prebid.js Client-Side Integration | [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md) | 最も簡単な実装方法である Client-Side で UID2 Token をリクエストし、Prebid.js に以下を管理させることを選択したいパブリッシャー向けのガイドです: <ul><li>トークン生成とトークンリフレッシュ。</li><li>トークンを RTB ビッドストリームに渡す。</li></ul> |
| Prebid.js Client-Server Integration | [UID2 Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-client-server.md) | UID2 とインテグレーションし、RTB ビッドストリームで Prebid.js から渡される UID2 Token を生成したいが、トークンを Server-Side で生成したいパブリッシャー向けのガイドです: 例えば、Private Operatorを使用しているパブリッシャーなどです。 |
| Prebid.js on Mobile | [UID2 Mobile Integration for Prebid.js](../guides/integration-prebid-mobile-summary.md) | モバイルデバイス上の Prebid.js と UID2 のインテグレーションに関する情報リソースのまとめです。 |

### Google Ad Manager Integrations

以下のリソースは、パブリッシャーの Google Ad Manager とのインテグレーションに利用できます。

| Integration Type| Documentation | Content Description |
| :--- | :--- | :--- |
| Publisher/SSP Integration with GAM | [Google Ad Manager Secure Signals Integration Guide](../guides/integration-google-ss.md) | パブリッシャーが UID2 を Google Ad Manager のセキュアシグナル機能(旧称: Encrypted Signals for Publishers、ESP) で使用する際に必要な追加手順について説明したガイドです。 |
| GMA for Android | [UID2 GMA Plugin for Android Integration Guide](../guides/mobile-plugin-gma-android.md) | Google Mobile Ads(GMA)SDK を使用するパブリッシャーが、Android アプリからの広告リクエストに UID2 Token を使うためのガイドです。 |
| GMA for iOS | [UID2 GMA Plugin for iOS Integration Guide](../guides/mobile-plugin-gma-ios.md) | Google Mobile Ads (GMA) SDK を使用するパブリッシャーが、iOS アプリからの広告リクエストに UID2 Token を使うためのガイドです。 |
| IMA for Android | [UID2 IMA Plugin for Android Integration Guide](../guides/mobile-plugin-ima-android.md) | Google Interactive Media Ads (IMA) SDK を使用するパブリッシャーが、Android アプリからの広告リクエストに UID2 Token を使うためのガイドです。 | Publishers |
| IMA for iOS | [UID2 IMA Plugin for iOS Integration Guide](../guides/mobile-plugin-ima-ios.md) | Google Interactive Media Ads (IMA) SDK を使用するパブリッシャーが、iOS アプリからの広告リクエストに UID2 Token を使うためのガイドです。 |

## FAQs for Publishers

UID2 フレームワークを使用するうパブリッシャー向けのよくある質問のリストは、[FAQs for Publishers](../getting-started/gs-faqs.md#faqs-for-publishers) を参照してください。
