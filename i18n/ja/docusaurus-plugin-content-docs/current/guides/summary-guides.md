---
title: UID2 Integration Guides&#8212;Summary
sidebar_label: Summary
pagination_label: UID2 Integration Guides - Summary
description: 利用可能なすべてのインテグレーションガイドの概要。
hide_table_of_contents: false
sidebar_position: 01
---

# UID2 Integration Guides&#8212;Summary

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
- [Prebid Integrations](#prebid-integrations)
- [Google Ad Manager Integrations](#google-ad-manager-integrations)

### Web Integrations

以下のリソースは、パブリッシャーの Web インテグレーションに利用できます。

| Integration Guide | Content Description |
| :--- | :--- |
| [UID2 Integration Overview for Prebid.js](integration-prebid.md) | UID2 とインテグレーションし、RTB ビッドストリームで Prebid.js から渡される UID2 Token を生成したいパブリッシャー向けのインテグレーションオプションの概要です。 |
| [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) | UID2 と Prebid.js をインテグレーションしたいパブリッシャー向けのインテグレーションガイドです。Prebid.js はトークンの生成と更新を自動的に管理し、トークンを RTB ビッドストリームに渡します。このガイドは、Client-Side で UID2 Token をリクエストしたいパブリッシャー向けのもので、最も簡単な実装方法です。 |
| [JavaScript Express Integration Guide](publisher-client-side.md) | 最も簡単な実装方法で、Clent-Side の JavaScript の変更だけで UID2 とインテグレーションしたいパブリッシャー向けのインテグレーションガイドです。UID2 SDK for JavaScriptは、トークンの生成と更新を自動的に管理します。 |
| [UID2 Server-Side Integration Guide for Prebid.js](../guides/integration-prebid-server-side.md) | UID2 とインテグレーションし、RTB ビッドストリームで Prebid から渡される ID トークンを生成したいパブリッシャー向けのインテグレーションガイドです。このガイドは、Private Operator を使用しているか、Server-Side でトークンを生成したいパブリッシャー向けです。 |
| [JavaScript Standard Integration Guide](integration-javascript-standard.md) | パブリッシャー向けのこのインテグレーションガイドでは、UID2 SDK for JavaScript を使用する標準的なウェブインテグレーションシナリオについて説明し、トークンを Server-Side で生成し、パブリッシャーのウェブページに渡す必要があります。 |
| [Publisher Integration Guide, Server-Only](custom-publisher-integration.md) | このインテグレーションガイドは、UID2 SDK for JavaScript を使用していないパブリッシャー向けです。 |
| [Publisher - Google Ad Manager Secure Signals](google-ss-integration.md) | このインテグレーションガイドでは、UID2 を Google Ad Manager のセキュアシグナル機能(旧称: Encrypted Signals for Publishers、ESP)で使用するパブリッシャーに必要な追加手順について説明します。 |

### Mobile Integrations

Android または iOS デバイスとインテグレーションするパブリッシャーは、以下のリソースを利用できます。

| Integration Guide | Content Description |
| :--- | :--- |
| [UID2 SDK for Android Reference Guide](../sdks/uid2-sdk-ref-android.md) | Android アプリをサポートする必要があるパブリッシャー向けに、UID2 を使用したクライアント ID の確立と UID2 Token の取得プロセスを容易にするSDKです。 |
| [UID2 SDK for iOS Reference Guide](../sdks/uid2-sdk-ref-ios.md) | iOS アプリをサポートする必要があるパブリッシャー向けに、UID2 を使用したクライアント ID の確立と UID2 Token の取得プロセスを容易にするSDKです。 |

### Prebid Integrations

パブリッシャーの Web インテグレーションには以下のリソースがあります。

| Integration Guide | Content Description |
| :--- | :--- |
| [UID2 Integration Overview for Prebid.js](integration-prebid.md) | UID2 とインテグレーションし、RTB ビットストリームで Prebid.js から渡される UID2 Token を生成したいパブリッシャー向けのインテグレーションオプションの概要です。 |
| [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) | UID2 と Prebid.js をインテグレーションしたいパブリッシャー向けのインテグレーションガイドです。Prebid.js はトークンの生成とリフレッシュを自動的に管理し、トークンを RTB ビッドストリームに渡します。このガイドは、Client-Side サイドで UID2 Token をリクエストしたいパブリッシャー向けのもので、最も簡単な実装方法です。 |
| [UID2 Server-Side Integration Guide for Prebid.js](../guides/integration-prebid-server-side.md) | UID2 とインテグレーションし、RTB ビットストリームで Prebid から渡される ID トークンを生成したいパブリッシャー向けのインテグレーションガイドです。このガイドは、Private Operator を使用しているパブリッシャー、または Server-Side でトークンを生成したいパブリッシャー向けです。 |

### Google Ad Manager Integrations

Google Ad Managerとインテグレーションするパブリッシャーは、以下のリソースを利用できます。

| Integration Guide | Content Description |
| :--- | :--- |
| [Publisher - Google Ad Manager Secure Signals](google-ss-integration.md) | このインテグレーションガイドは、UID2 を Google Ad Manager の**secure signals**機能 (旧称: encrypted signals from publishers、ESP)で使用するパブリッシャーに必要な追加ステップをカバーしています。 |
| [UID2 GMA Plugin for Android Integration Guide](mobile-plugin-gma-android.md) | UID2 Google Mobile Ads (GMA) Plugin for Android は、[Google GMA SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) を使用するパブリッシャーが、Android アプリからの広告リクエストで [UID2 Token](../ref-info/glossary-uid.md#gl-uid2-token) を [secure signals](https://support.google.com/admob/answer/11556288) として送信できるようにします。 |
| [UID2 GMA Plugin for iOS Integration Guide](mobile-plugin-gma-ios.md) | UID2 Google Mobile Ads (GMA) Plugin for iOS は、[Google GMA SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) を使用するパブリッシャーが、iOS アプリからの広告リクエストで [UID2 Token](../ref-info/glossary-uid.md#gl-uid2-token) を [secure signals](https://support.google.com/admob/answer/11556288) として送信できるようにします。 |
| [UID2 IMA Plugin for Android Integration Guide](mobile-plugin-ima-android.md) | UID2 Interactive Media Ads (IMA) Plugin for Android は、[Google IMA SDK for Android](https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side) を使用するパブリッシャーが、Android アプリからの広告リクエストで [UID2 Token](../ref-info/glossary-uid.md#gl-uid2-token) を [secure signals](https://support.google.com/admob/answer/11556288) として送信できるようにします。 |
| [UID2 IMA Plugin for iOS Integration Guide](mobile-plugin-ima-ios.md)  | UID2 Interactive Media Ads (IMA) Plugin for iOS は、[Google IMA SDK for iOS](https://developers.google.com/interactive-media-ads/docs/sdks/ios/client-side) を使用するパブリッシャーが、iOS アプリからの広告リクエストで [UID2 Token](../ref-info/glossary-uid.md#gl-uid2-token) を [secure signals](https://support.google.com/admob/answer/11556288) として送信できるようにします。 |

## Advertiser/Data Provider Integrations

UID2 とインテグレーションする広告主やデータプロバイダーは、以下のリソースを利用できます。

| Integration Guide | Content Description |
| :--- | :--- |
| [Advertiser/Data Provider](./advertiser-dataprovider-guide.md) | この広告主やデータプロバイダー向けのインテグレーションガイドは、オーディエンスの構築とターゲティングのためのアイデンティティマッピングのためのインテグレーションワークフローをカバーしています。 |
| [Snowflake Integration Guide](snowflake_integration.md) | Snowflake 内でメールアドレスから UID2 を生成する手順です。|
| [AWS Entity Resolution Integration Guide](integration-aws-entity-resolution.md) | AWS Entity Resolution を使用して UID2 フレームワークとインテグレーションする手順です。 |

## DSP Integrations

The following resources are available for DSPs integrating with UID2.

| Integration Guide | Content Description |
| :--- | :--- |
| [DSP](./dsp-guide.md) | この DSP のためのインテグレーションガイドは、入札のための UID2 の処理と、ユーザーのオプトアウトに対応することをカバーしています。 |

## Private Operator Service Integrations

Private Operator のインテグレーションは、以下のリソースを利用できます。

| Integration Guide | Content Description |
| :--- | :--- |
| [UID2 Private Operator for AWS](operator-guide-aws-marketplace.md) | AWS Marketplace の Private Operator Service を設定する手順です。|
| [UID2 Private Operator for GCP](operator-private-gcp-confidential-space.md) | [Google Cloud](https://cloud.google.com/docs/overview/) プラットフォームの Confidential Computing オプションである [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space) に UID2 Operator Service を設定する手順です。|
| [UID2 Private Operator for Azure](operator-guide-azure-enclave.md) | Microsoft Azure のコンフィデンシャルコンピューティングオプションである Confidential Container(機密コンテナー)に UID2 Operator Service を設定する手順です。 |
