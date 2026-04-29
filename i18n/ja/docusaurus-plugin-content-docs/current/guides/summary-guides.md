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

# UID2 integration guides: Summary

以下のガイドでは、各組織のニーズと要件、およびパブリッシャー、DSP、データプロバイダー/広告主としての主な役割に基づいたインテグレーション手順を説明しています。UID2 参加者として、Open Operator Service との連携や Private Operator Service のホスティングを可能にするエンタープライズパートナーを介してインテグレーションすることもできます。

インテグレーションは、以下のカテゴリーに分類されます:

- [Publisher integrations](#publisher-integrations)
- [Advertiser/data provider integrations](#advertiserdata-provider-integrations)
- [DSP integrations](#dsp-integrations)
- [Private Operator service integrations](#private-operator-service-integrations)

## Publisher integrations

パブリッシャーのインテグレーションは、次の主なカテゴリに分類されます:

- [Web integrations](#web-integrations)
- [Mobile integrations](#mobile-integrations)
- [CTV integrations](#ctv-integrations)
- [Prebid integrations](#prebid-integrations)
- [Google Ad Manager integrations](#google-ad-manager-integrations)

ソースコード付きのライブで動作する UID2 実装の例については、[UID2 integration samples](../ref-info/integration-sample-sites.md) を参照してください。

### Web integrations

パブリッシャーの Web インテグレーションには、以下のドキュメントリソースが利用できます。

:::tip
Web インテグレーションオプションの詳細は [Publisher web integration overview](integration-options-publisher-web.md) を参照してください。
:::

| Integration Guide | Content Description |
| :--- | :--- |
| [UID2 integration overview for Prebid](integration-prebid.md) | UID2 とインテグレーションし、RTB <Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>で Prebid.js または Prebid Mobile SDK から渡される <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 Token</Link> (Advertising Token) を生成したいパブリッシャー向けのインテグレーションオプションの概要です。 | |
| [UID2 client-side integration guide for Prebid.js](integration-prebid-client-side.md) | UID2 とインテグレーションし、トークンの生成とトークンの自動更新を Prebid.js に管理させ、トークンを RTB ビッドストリームに渡したいパブリッシャー向けのインテグレーションガイドです。このガイドは、Client-Side で UID2 Token をリクエストしたいパブリッシャー向けのもので、最も簡単な実装方法です。 |
| [UID2 client-server integration guide for Prebid.js](integration-prebid-client-server.md) | UID2 とインテグレーションし、RTB ビッドストリームで Prebid から渡される ID トークンを生成したいパブリッシャー向けのインテグレーションガイドです。このガイドは、Private Operator を使用しているか、Server-Side でトークンを生成したいパブリッシャー向けです。 |
| [UID2 integration overview for JavaScript](integration-javascript.md) | JavaScript SDK を使って UID2 とインテグレーションしたいパブリッシャー向けのオプションの概要です。 |
| [Client-side integration guide for JavaScript](integration-javascript-client-side.md) | 最も簡単な実装方法で、Client-Side の JavaScript の変更だけで UID2 とインテグレーションしたいパブリッシャー向けのインテグレーションガイドです。SDK for JavaScript は、トークンの生成と更新を自動的に管理します。 |
| [Client-server integration guide for JavaScript](integration-javascript-client-server.md) | パブリッシャー向けのこのインテグレーションガイドでは、SDK for JavaScript を使用する標準的なウェブインテグレーションシナリオについて説明し、トークンを Server-Side で生成し、パブリッシャーのウェブページに渡す必要があります。 |
| [Publisher integration guide, server-side](integration-publisher-server-side.md) | このインテグレーションガイドは、[SDK for JavaScript](../sdks/sdk-ref-javascript.md) を使用していないパブリッシャー向けです。 |
| [Google Ad Manager Secure Signals integration guide](integration-google-ss.md) | このインテグレーションガイドでは、UID2 を Google Ad Manager のセキュアシグナル機能(旧称: Encrypted Signals for Publishers、ESP) で使用するパブリッシャーに必要な追加手順について説明します。 |

### Mobile integrations

Android または iOS デバイスとインテグレーションするパブリッシャーは、以下のドキュメントリソースを利用できます。

| Integration Guide | Content Description |
| :--- | :--- |
| [Mobile integration overview for Android and iOS](integration-mobile-overview.md) | SDK for Android または SDK for iOS を使用して UID2 とインテグレーションしたいモバイルアプリパブリッシャー向けのオプションの概要です。 |
| [Client-side integration guide for mobile](integration-mobile-client-side.md) | モバイルアプリ内のみの変更で UID2 とインテグレーションしたいモバイルアプリパブリッシャー向けのインテグレーションガイドです (Server-Side の変更はありません)。 |
| [Client-server integration guide for mobile](integration-mobile-client-server.md) | UID2 とインテグレーションしたいモバイルアプリのパブリッシャー向けのインテグレーションガイドです:<ol><li>UID2 Token を Server-Side で生成するには、Public または Private Operator を使用します。</li><li>その結果、<Link href="../ref-info/glossary-uid#gl-identity">identities</Link> をモバイルアプリに渡し、ビッドストリームに渡します。</li></ol> |
| [Server-side integration guide for mobile](../guides/integration-mobile-server-side.md) | モバイルアプリのパブリッシャーで、UID2 Token を完全に Server-Side で管理したい場合のインテグレーションガイドです。 |

### CTV integrations

CTV とインテグレーションするパブリッシャー向けには、以下のドキュメントリソースが利用できます。

| Integration Guide | Content Description |
| :--- | :--- |
| [CTV integration guide](integration-ctv-guide.md) | CTV インテグレーションオプションの概要と、追加情報および手順へのリンク。 |

### Prebid integrations

パブリッシャーの Prebid インテグレーションには以下のリソースがあります。

| Integration Guide | Content Description |
| :--- | :--- |
| [UID2 integration overview for Prebid](integration-prebid.md) | UID2 とインテグレーションし、Prebid.js または Prebid Mobile SDK が RTB ビッドストリームで発行する UID2 Token を生成したいパブリッシャー向けのオプションの概要です。 |
| [UID2 client-side integration guide for Prebid.js](integration-prebid-client-side.md) | UID2 とインテグレーションし、トークンの生成とトークンの自動更新を Prebid.js に管理させ、トークンを RTB ビッドストリームに渡したいパブリッシャー向けのインテグレーションガイドです。このガイドは、Client-Side で UID2 Token をリクエストしたいパブリッシャー向けのもので、最も簡単な実装方法です。 |
| [UID2 client-server integration guide for Prebid.js](integration-prebid-client-server.md) | UID2 とインテグレーションし、RTB ビッドストリームで Prebid から渡される ID トークンを生成したいパブリッシャー向けのインテグレーションガイドです。このガイドは、Private Operator を使用しているパブリッシャー、または Server-Side でトークンを生成したいパブリッシャー向けです。 |
| [UID2 mobile integration for Prebid.js](integration-prebid-mobile-summary.md) | モバイルデバイス上の Prebid.js と UID2 のインテグレーションに関する情報リソースのまとめです。 |

### Google Ad Manager integrations

Google Ad Manager とインテグレーションするパブリッシャーは、以下のリソースを利用できます。

| Integration Guide | Content Description |
| :--- | :--- |
| [Google Ad Manager Secure Signals integration guide](integration-google-ss.md) | このインテグレーションガイドは、UID2 を Google Ad Manager の**Secure Signals**機能 (旧称: encrypted signals from publishers、ESP) で使用するパブリッシャーに必要な追加ステップをカバーしています。 |
| [UID2 GMA plugin for Android integration guide](mobile-plugin-gma-android.md) | UID2 Google Mobile Ads (GMA) Plugin for Android は、[Google GMA SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) を使用するパブリッシャーが、Android アプリからの広告リクエストで <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 Token</Link> を [secure signals](https://support.google.com/admob/answer/11556288) として送信できるようにします。 |
| [UID2 GMA plugin for iOS integration guide](mobile-plugin-gma-ios.md) | UID2 Google Mobile Ads (GMA) Plugin for iOS は、[Google GMA SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) を使用するパブリッシャーが、iOS アプリからの広告リクエストで <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 Token</Link> を [secure signals](https://support.google.com/admob/answer/11556288) として送信できるようにします。 |
| [UID2 IMA plugin for Android integration guide](mobile-plugin-ima-android.md) | UID2 Interactive Media Ads (IMA) Plugin for Android は、[Google IMA SDK for Android](https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side) を使用するパブリッシャーが、Android アプリからの広告リクエストで <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 Token</Link> を [secure signals](https://support.google.com/admob/answer/11556288) として送信できるようにします。 |
| [UID2 IMA plugin for iOS integration guide](mobile-plugin-ima-ios.md)  | UID2 Interactive Media Ads (IMA) Plugin for iOS は、[Google IMA SDK for iOS](https://developers.google.com/interactive-media-ads/docs/sdks/ios/client-side) を使用するパブリッシャーが、iOS アプリからの広告リクエストで <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 Token</Link> を [secure signals](https://support.google.com/admob/answer/11556288) として送信できるようにします。 |

## Advertiser/data provider integrations

UID2 とインテグレーションする広告主やデータプロバイダーは、以下のドキュメントリソースを利用できます。

| Integration Guide | Content Description |
| :--- | :--- |
| [Advertiser/data provider integration overview](integration-advertiser-dataprovider-overview.md) | このガイドでは、ユーザーデータを収集し、他の UID2 参加者にプッシュする組織向けのインテグレーションオプションの概要を提供します。 |
| [Snowflake integration guide](integration-snowflake.md) | Snowflake 内でメールアドレスから UID2 を生成する手順です。|
| [AWS Entity Resolution integration guide](integration-aws-entity-resolution.md) | AWS Entity Resolution を使用して UID2 フレームワークとインテグレーションする手順です。 |
| [Databricks clean rooms integration guide](integration-databricks.md) | Databricks Clean Rooms 環境でメールアドレスまたは電話番号から UID2 を生成する手順です。 |
| [Advertiser/data provider integration to HTTP endpoints](integration-advertiser-dataprovider-endpoints.md) | このガイドでは、広告主やデータプロバイダーが UID2 とインテグレーションするための手順を説明します。この手順では、SDK、Snowflake、AWS Entity Resolution、Databricks Clean Rooms などの他の実装オプションではなく、コードを書いて UID2 HTTP エンドポイントを呼び出す方法を説明します。 |
| [Client-side integration guide for JavaScript](integration-javascript-client-side.md) | トラッキングピクセルに UID2 Token を追加するためにこの SDK を使用したい広告主やデータプロバイダー向けのガイドです。<!-- UID2_only: Not applicable for EUID --> |

## DSP integrations

UID2 とインテグレーションする DSP は、以下のドキュメントリソースを利用できます。

| Integration Guide | Content Description |
| :--- | :--- |
| [DSP integration guide](dsp-guide.md) | この DSP 向けのインテグレーションガイドでは、入札およびユーザーオプトアウトの処理に関する UID2 の取り扱いについて説明しています。 |
| [DSP direct integration instructions](integration-dsp-no-sdk.md) | SDK を使用せずにインテグレーションを希望する DSP 向けの手順です。 |

## Private Operator service integrations

<Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link> のインテグレーションは、以下のリソースを利用できます。

| Integration Guide | Content Description |
| :--- | :--- |
| [UID2 Private Operator for AWS](operator-guide-aws-marketplace.md) | AWS Marketplace の Private Operator Service を設定する手順です。|
| [UID2 Private Operator for GCP](operator-private-gcp-confidential-space.md) | [Google Cloud](https://cloud.google.com/docs/overview/) プラットフォームの Confidential Computing オプションである [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space) に UID2 Operator Service を設定する手順です。|
| [UID2 Private Operator for Azure](operator-guide-azure-enclave.md) | Microsoft Azure の機密コンピューティングオプションである Confidential Containers のインスタンスで UID2 Operator Service を設定する手順です。 |
