---
title: UID2 Integration Guides - Summary
sidebar_label: Summary
pagination_label: UID2 Integration Guides - Summary
description: 利用可能なすべてのインテグレーションガイドの概要。
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# UID2 Integration Guides: Summary

以下のガイドでは、各組織のニーズと要件、およびパブリッシャー、DSP、データプロバイダー/広告主としての主な役割に基づいたインテグレーション手順を説明しています。UID2 参加者として、Open Operator Service との連携や Private Operator Service のホスティングを可能にするエンタープライズパートナーを介してインテグレーションすることもできます。

インテグレーションは、以下のカテゴリーに分類されます:

- [Publisher Integrations](#publisher-integrations)
- [Advertiser/Data Provider Integrations](#advertiserdata-provider-integrations)
- [DSP Integrations](#dsp-integrations)
- [Private Operator Service Integrations](#private-operator-service-integrations)

## Publisher Integrations

パブリッシャーのインテグレーションは、次の主なカテゴリに分類されます:

- [Web Integrations](#web-integrations)
- [Mobile Integrations](#mobile-integrations)
- [CTV Integrations](#ctv-integrations)
- [Prebid Integrations](#prebid-integrations)
- [Google Ad Manager Integrations](#google-ad-manager-integrations)

### Web Integrations

以下のリソースは、パブリッシャーの Web インテグレーションに利用できます。

:::tip
Web インテグレーションオプションの詳細は [Web Integration Overview](integration-options-publisher-web.md) を参照してください。
:::

| Integration Guide | Content Description |
| :--- | :--- |
| [UID2 Integration Overview for Prebid](integration-prebid.md) | UID2 とインテグレーションし、RTB <Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>で Prebid.js または Prebid Mobie SDK から渡される UID2 Token を生成したいパブリッシャー向けのインテグレーションオプションの概要です。 |
| [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) | UID2とインテグレーションし、トークンの生成とトークンの自動更新を Prebid.js に管理させ、トークンを RTB ビッドストリームに渡したいパブリッシャー向けのインテグレーションガイドです。このガイドは、Client-Side で UID2 Token をリクエストしたいパブリッシャー向けのもので、最も簡単な実装方法です。 |
| [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md) | UID2 とインテグレーションし、RTB ビッドストリームで Prebid から渡される ID トークンを生成したいパブリッシャー向けのインテグレーションガイドです。このガイドは、Private Operator を使用しているか、Server-Side でトークンを生成したいパブリッシャー向けです。 |
| [UID2 Integration Overview for JavaScript](integration-javascript.md) | JavaScript SDK を使って UID2 とインテグレーションしたいパブリッシャー向けのオプションの概要です。 |
| [Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md) | 最も簡単な実装方法で、Clent-Side の JavaScript の変更だけで UID2 とインテグレーションしたいパブリッシャー向けのインテグレーションガイドです。SDK for JavaScriptは、トークンの生成と更新を自動的に管理します。 |
| [Client-Server Integration Guide for JavaScript](integration-javascript-client-server.md) | パブリッシャー向けのこのインテグレーションガイドでは、SDK for JavaScript を使用する標準的なウェブインテグレーションシナリオについて説明し、トークンを Server-Side で生成し、パブリッシャーのウェブページに渡す必要があります。 |
| [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md) | このインテグレーションガイドは、SDK for JavaScript を使用していないパブリッシャー向けです。 |
| [Publisher - Google Ad Manager Secure Signals](google-ss-integration.md) | このインテグレーションガイドでは、UID2 を Google Ad Manager のセキュアシグナル機能(旧称: Encrypted Signals for Publishers、ESP) で使用するパブリッシャーに必要な追加手順について説明します。 |

### Mobile Integrations

Android または iOS デバイスとインテグレーションするパブリッシャーは、以下のリソースを利用できます。

| Integration Type| Documentation | Content Description |
| :--- | :--- | :--- |
| Android/iOS (Overview) | [Mobile Integration Overview for Android and iOS](integration-mobile-overview.md) | SDK for Android または SDK for iOS を使用して UID2 とインテグレーションしたいモバイルアプリパブリッシャー向けのオプションの概要です。 |
| Android/iOS, Client-Side Integration | [Client-Side Integration Guide for Mobile](integration-mobile-client-side.md) | モバイルアプリ内のみの変更で UID2 とインテグレーションしたいモバイルアプリパブリッシャー向けの統合ガイドです (Server-Side の変更はありません)。 |
| Android/iOS, Client-Server Integration | [Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md) | UID2 とインテグレーションしたいモバイルアプリのパブリッシャー向けのインテグレーションガイドです:<ol><li>UID2 Token を Server-Side で生成するには、PublicまたはPrivate Operatorを使用します。</li><li>その結果、<Link href="../ref-info/glossary-uid#gl-identity">identities</Link> をモバイルアプリに渡し、ビッドストリームに渡します。</li></ol> |

### CTV Integrations

CTV とインテグレーションするパブリッシャー向けには、以下のリソースが利用できます。

| Integration Guide | Content Description |
| :--- | :--- |
| [CTV Integration Guide](../guides/integration-ctv-guide.md) | CTV インテグレーションオプションの概要と、追加情報および手順へのリンク。 |

### Prebid Integrations

パブリッシャーの Prebid インテグレーションには以下のリソースがあります。

| Integration Guide | Content Description |
| :--- | :--- |
| [UID2 Integration Overview for Prebid.js](integration-prebid.md) | UID2 とインテグレーションし、RTB ビッドストリームで Prebid.js から渡される UID2 Token を生成したいパブリッシャー向けのインテグレーションオプションの概要です。 |
| [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) | UID2とインテグレーションし、トークンの生成とトークンの自動更新を Prebid.js に管理させ、トークンを RTB ビッドストリームに渡したいパブリッシャー向けのインテグレーションガイドです。このガイドは、Client-Side で UID2 Token をリクエストしたいパブリッシャー向けのもので、最も簡単な実装方法です。 |
| [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md) | UID2 とインテグレーションし、RTB ビッドストリームで Prebid から渡される ID トークンを生成したいパブリッシャー向けのインテグレーションガイドです。このガイドは、Private Operator を使用しているパブリッシャー、または Server-Side でトークンを生成したいパブリッシャー向けです。 |
| [UID2 Mobile Integration for Prebid.js](integration-prebid-mobile-summary.md) | モバイルデバイス上の Prebid.js と UID2 のインテグレーションに関する情報リソースのまとめです。 |

### Google Ad Manager Integrations

Google Ad Managerとインテグレーションするパブリッシャーは、以下のリソースを利用できます。

| Integration Guide | Content Description |
| :--- | :--- |
| [Publisher - Google Ad Manager Secure Signals](google-ss-integration.md) | このインテグレーションガイドは、UID2 を Google Ad Manager の**secure signals**機能 (旧称: encrypted signals from publishers、ESP) で使用するパブリッシャーに必要な追加ステップをカバーしています。 |
| [UID2 GMA Plugin for Android Integration Guide](mobile-plugin-gma-android.md) | UID2 Google Mobile Ads (GMA) Plugin for Android は、[Google GMA SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) を使用するパブリッシャーが、Android アプリからの広告リクエストで <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> を [secure signals](https://support.google.com/admob/answer/11556288) として送信できるようにします。 |
| [UID2 GMA Plugin for iOS Integration Guide](mobile-plugin-gma-ios.md) | UID2 Google Mobile Ads (GMA) Plugin for iOS は、[Google GMA SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) を使用するパブリッシャーが、iOS アプリからの広告リクエストで <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> を [secure signals](https://support.google.com/admob/answer/11556288) として送信できるようにします。 |
| [UID2 IMA Plugin for Android Integration Guide](mobile-plugin-ima-android.md) | UID2 Interactive Media Ads (IMA) Plugin for Android は、[Google IMA SDK for Android](https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side) を使用するパブリッシャーが、Android アプリからの広告リクエストで <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> を [secure signals](https://support.google.com/admob/answer/11556288) として送信できるようにします。 |
| [UID2 IMA Plugin for iOS Integration Guide](mobile-plugin-ima-ios.md)  | UID2 Interactive Media Ads (IMA) Plugin for iOS は、[Google IMA SDK for iOS](https://developers.google.com/interactive-media-ads/docs/sdks/ios/client-side) を使用するパブリッシャーが、iOS アプリからの広告リクエストで <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> を [secure signals](https://support.google.com/admob/answer/11556288) として送信できるようにします。 |

## Advertiser/Data Provider Integrations

UID2 とインテグレーションする広告主やデータプロバイダーは、以下のリソースを利用できます。

| Integration Guide | Content Description |
| :--- | :--- |
| [Advertiser/Data Provider](./advertiser-dataprovider-guide.md) | この広告主やデータプロバイダー向けのインテグレーションガイドは、オーディエンスの構築とターゲティングのためのアイデンティティマッピングのためのインテグレーションワークフローをカバーしています。 |
| [Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md) | トラッキングピクセルに UID2 Token を追加するためにこの SDK を使用したい広告主やデータプロバイダー向けのガイドです。<!-- UID2_only: Not applicable for EUID --> |
| [Snowflake Integration Guide](snowflake_integration.md) | Snowflake 内でメールアドレスから UID2 を生成する手順です。|
| [AWS Entity Resolution Integration Guide](integration-aws-entity-resolution.md) | AWS Entity Resolution を使用して UID2 フレームワークとインテグレーションする手順です。 |

## DSP Integrations

The following resources are available for DSPs integrating with UID2.

| Integration Guide | Content Description |
| :--- | :--- |
| [DSP Integration Guide](../guides/dsp-guide.md) | この DSP 向けのインテグレーションガイドでは、入札およびユーザーオプトアウトの処理に関する UID2 の取り扱いについて説明しています。 |
| [DSP Direct Integration Instructions](../guides/integration-dsp-no-sdk.md) | SDK を使用せずにインテグレーションを希望する DSP 向けの手順です。 |

## Private Operator Service Integrations

Private Operator のインテグレーションは、以下のリソースを利用できます。

| Integration Guide | Content Description |
| :--- | :--- |
| [UID2 Private Operator for AWS](operator-guide-aws-marketplace.md) | AWS Marketplace の Private Operator Service を設定する手順です。|
| [UID2 Private Operator for GCP](operator-private-gcp-confidential-space.md) | [Google Cloud](https://cloud.google.com/docs/overview/) プラットフォームの Confidential Computing オプションである [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space) に UID2 Operator Service を設定する手順です。|
| [UID2 Private Operator for Azure](operator-guide-azure-enclave.md) | Microsoft Azure のコンフィデンシャルコンピューティングオプションである Confidential Containers(機密コンテナー)に UID2 Operator Service を設定する手順です。 |
