---
title: DSPs
description: デマンドサイドプラットフォーム (DSP) 向けの情報の概要。
hide_table_of_contents: false
sidebar_position: 06
use_banner: true
banner_title: UID2 Overview for Demand-Side Platforms (DSPs)
banner_description: Enable data strategies with a more durable identifier.
---

このページでは、Unified ID 2.0 (UID2) フレームワークが DSP にもたらすもの、利用可能な実装オプション、および開始方法に関する情報を提供します。以下のセクションでは、UID2 を採用するDSPのためのワークフロー、インテグレーションタイプ、ドキュメントについて説明します。

## Audience

このページは、DSP（Demand-Side Platforms）のためのページです。メディアバイイングプラットフォームは、Unified ID 2.0により、広告主のファーストパーティデータアクティベーションやパブリッシャーの在庫マネタイズのための ID 戦略を促進できます。

## Benefits of UID2 for DSPs

UID2 を使用する DSP が得られるメリットの一部を次に示します：
- 認証された ID で ID 解決をアップグレードします。
- サードパーティークッキーへの依存度を低減します。
- オムニチャネルやクロスデバイスのフリケンシー管理と抑制を実行します。
- よりプライバシーに配慮した ID 暗号化規格により、ファーストパーティ・データの活性化を促進する。
- 決定論的データによる将来性のあるモデルの開発を目指します。
- アドレサブルなオーディエンスターゲティングを維持します。
- 消費者のプライバシー管理を向上させることを目的に、オプトアウトを提供します。
- サードパーティクッキーの有無にかかわらず、キャンペーンをより正確に測定します。

## Resources

UID2を実装するDSPには、以下のドキュメントリソースが用意されています。

| Type| Documentation | Content Description | Audience |
| :--- | :--- | :--- | :--- |
| Server-Side SDK | [Server-Side SDK Guide](../sdks/dsp-client-v1-overview.md) | UID2 サーバーサイド SDK を使用して、UID2 Advertising Token を復号して raw UID2 にアクセスしたい人のためのSDKです。| DSPs |
| Integration Guides | [DSP Integration Guide](../guides/dsp-guide.md) | この DSP 向けインテグレーションガイドでは、入札における UID2 の取り扱いや、ユーザーのオプトアウトを受け入れることについて説明しています。 | DSPs |

## Workflow for DSPs

以下の図は、DSPの UID2 ワークフローです。

![DSPワークフロー](../workflows/images/UID2BuySIdeDSPWorkflow.jpg)

詳細は、[DSPワークフローの概要](../workflows/workflow-overview-buy-side.md)を参照してください。



## Getting Started

次の手順で始めます:

1. [アクセスリクエスト](/request-access)ページにあるフォームに記入して、UID2へのアクセスをリクエストします。
2. UID2 オプトアウトを受信するための Webhook を実装し、
UID2 Admimnistrator と Webhook を共有します。
3. Webhook 経由でオプトアウトフィードを受信していることを確認します。<br/>。
    Webhook が設置されたら、認証情報を受け取ります（[API keys](../getting-started/gs-api-keys.md) を参照してください）。
4. どの実装オプションを使用するかを決定します。
5. SDK を使用している場合は、SDKをダウンロードします。該当する SDK のガイドを参照してください。
6. 選択したオプションの実装ガイドに記載されている手順に従います。

     Note：リクエストメッセージは必ずUID2まで暗号化してください。詳細は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md)を参照してください。
7. (条件付き）CRM オンボーディングソリューションを実装する場合は、データプロバイダワークフローのための資格情報の別のセットを要求します。[APIキー](../getting-started/gs-api-keys.md)を参照してください。
8. テストします。
9. 本番稼働します。

## Frequently Asked Questions for DSPs

DSP向けのFAQ一覧は、[デマンドサイドプラットフォーム（DSP）向けFAQ](../getting-started/gs-faqs.md#faqs-for-demand-side-platforms-dsps) を参照してください。
