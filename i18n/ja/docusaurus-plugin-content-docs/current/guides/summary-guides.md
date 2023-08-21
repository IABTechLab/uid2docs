---
title: UID2 Integration Guides - Summary
description: 利用可能なすべてのインテグレーションガイドの概要。
hide_table_of_contents: false
sidebar_position: 01
---

# UID2 Integration Guides

以下のガイドでは、パブリッシャー、DSP、データプロバイダー/広告主など、組織のニーズと要件、およびその主な役割に基づいたインテグレーション手順を提供します。メンバーとして、Open Operator Service との連携や Closed Operator Service のホスティングを可能にするエンタープライズパートナーを介してインテグレーションすることもできます。

## Publisher, DSP, and Data Provider Integrations

| Integration Guide                                                                           | Content Description                                                                                                                                                                            |
| :------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [UID2 SDK for JavaScript Integration Guide](./publisher-client-side.md)                  | このパブリッシャー向けインテグレーションガイドは、[UID2 SDK for JavaScript](../sdks/client-side-identity.md) を利用した標準的なウェブインテグレーションシナリオをカバーしています。    |
| [Publisher Integration Guide, Server-Only](./custom-publisher-integration.md) | このパブリッシャー向けインテグレーションガイドは、[UID2 SDK for JavaScript](../sdks/client-side-identity.md) を使用しないインテグレーションシナリオをカバーしています。   |
| [DSP](./dsp-guide.md)                                                                       | この DSP のためのインテグレーションガイドは、入札のための UID2 の処理と、ユーザーのオプトアウトに対応することをカバーしています。                                                              |
| [Advertiser/Data Provider](./advertiser-dataprovider-guide.md)                              | この広告主やデータプロバイダー向けのインテグレーションガイドは、オーディエンスの構築とターゲティングのためのアイデンティティマッピングのためのインテグレーションワークフローをカバーしています。 |

## Plugins

| Integration Guide |  Content Description |
| :--- | :--- |
| [UID2 GMA Plugin for Android Integration Guide](mobile-plugin-gma-android.md) | UID2 GMA Plugin for Android は、Google Mobile Ads (GMA) SDK を使用するパブリッシャーが、Android アプリからの広告リクエストに UID2 データを含めることを可能にします。 |
| [UID2 GMA Plugin for iOS Integration Guide](mobile-plugin-gma-ios.md) | UID2 GMA Plugin for iOS は、Google Mobile Ads (GMA) SDK を使用するパブリッシャーが、iOS アプリからの広告リクエストに UID2 データを含めることを可能にします。 |

## Supplementary Integrations

| Integration Guide                                                        | Content Description                                                                                                                                                                                    |
| :----------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Publisher - Google Ad Manager Secure Signals](google-ss-integration.md) | このインテグレーションガイドは、UID2 を Google Ad Manager の**secure signals**機能（旧称: encrypted signals from publishers、ESP）で使用するパブリッシャーに必要な追加ステップをカバーしています。 |

## Open Operator Service Integration

| Integration Guide                                       | Content Description                                                                            |
| :------------------------------------------------------ | :--------------------------------------------------------------------------------------------- |
| [Snowflake Integration Guide](snowflake_integration.md) | Snowflake Data Marketplace でホストされている Open Operator Service と連携するための手順です。 |

## Closed Operator Service Setup

| Integration Guide                                                                                | Content Description                                                                                                                                                                                                                                                           |
| :----------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Operator - Microsoft Azure](./operator-guide-azure-enclave.md)                                  | IMPORTANT: このドキュメントは現在、PoC の段階です。詳細は、UID2 Administrator に [連絡](../getting-started/gs-account-setup.md#contact-info) してください。<br/>Closed Operator Service を Microsoft Azure Confidential Computing プラットフォーム上で動作させるためのセットアップ手順です。 |
| [Operator - AWS Marketplace](./operator-guide-aws-marketplace.md)                                | AWS Marketplace のクローズドオペレーターサービスをセットアップする手順です。                                                                                                                                                                                                |
| [Operator - Google Cloud Platform Confidential Compute package](./operator-guide-gcp-enclave.md) | Google Cloud Platform Confidential Compute (GCP) パッケージのセットアップ手順です。                                                                                                                                                                                           |
