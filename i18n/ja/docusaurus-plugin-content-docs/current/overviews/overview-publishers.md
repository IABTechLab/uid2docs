---
title: Publishers
description: パブリッシャー向けの情報の概要。
hide_table_of_contents: false
sidebar_position: 02
use_banner: true
banner_title: パブリッシャー向け UID2 概要
banner_description: 変化し続ける広告業界においてオーディエンスターゲティングを維持し、より良いインプレッション収益化と関連性の向上を実現します。
---

パブリッシャーは、Unified ID 2.0 のクロスデバイスでのプレゼンスの恩恵を受け、すべてのインベントリで一貫した ID ファブリックを活用できます。

このページには、UID2を採用するパブリッシャー向けのワークフロー、インテグレーションタイプ、ドキュメントリソースに関する情報が含まれています。

## Audience

このページは、以下のUID2参加者のためのものです:

- UID2 を使用して RTB ビッドストリーム用の ID トークンを生成したいが、UID2 対応のシングルサインオンや ID プロバイダーではなく、UID2 と直接インテグレーションしたいウェブアセットを持つパブリッシャー。
- UID2 Token を SSP 経由でビッドストリームに伝播させるすべての組織&#8212;例えば、ID プロバイダーや SSO プロバイダーなどです。

<!-- - Data clean rooms. -->

パブリッシャーは、さまざまな方法で UID2 とのインテグレーションを選択することができます:

- SDK を使用するか、UID2 API を使用して、UID2 と直接インテグレーションする。
- SSO プロバイダを使用する。
- パブリッシャーに代わって UID2 インテグレーションを管理する独立した ID プロバイダーと連携する。

## Benefits of UID2 for Publishers

UID2 とインテグレーションすることで得られるメリットの一部を次に示します:
- デスクトップ、モバイル、CTVで、単一の識別子でアドレサブルなオーディエンスターゲティング。
- デバイスをまたいだフリケンシー。
- より適切なコンテンツのリコメンデーション。
- 関連するコンテンツでパーソナライズされた広告体験を提供する機能。
- 消費者のプライバシー管理を向上させることを目的とした、オプトアウトを提供する機能。

## Resources

パブリッシャーが UID2 を実装するために、以下のドキュメントリソースが利用可能です:
- [Web Integration](#web-integration)
- [Mobile and Google GMA integration](#mobile-and-google-gma-integration)
- [Operator Deployment](#operator-deployment)

### Web Integration

以下のドキュメントリソースは、パブリッシャー向けのウェブ、Prebid、Google Ad Manager のインテグレーションに関するものです。

| Integration Type| Documentation | Content Description | Audience |
| :--- | :--- | :--- | :--- |
| Prebid | [Prebid Integration Guide](../guides/integration-prebid.md) | UID2 と直接インテグレーションし、RTB ビッドストリームで Prebid から渡される identity トークンを生成したいパブリッシャー向けのインテグレーションガイドです。 | Publishers |
| Client-Side (Web) SDK | [UID2 SDK for JavaScript](../sdks/client-side-identity.md) | Client-Side JavaScript SDK は、UID2 を使用してクライアントの identity を確立し、パブリッシャーの Advertising Token を取得するプロセスを容易にします。| Publishers |
| Client-Side (Web) Integration Guide | [UID2 SDK for JavaScript Integration Guide](../guides/publisher-client-side.md) | このパブリッシャー向けのインテグレーションでは、UID2 SDK for JavaScript を使用する標準的な Web インテグレーションシナリオについて説明します。 | Publishers |
| Server-Side Integration Guide  | [Publisher Integration Guide, Server-Only](../guides/custom-publisher-integration.md) | このインテグレーションガイドは、[UID2 SDK for JavaScript Integration Guide](../sdks/client-side-identity.md) を使用していないパブリッシャー向けです。 | Publishers |
| Publisher/SSP Integration with GAM | [Publisher - Google Ad Manager Secure Signals](../guides/google-ss-integration.md) | このインテグレーションガイドでは、UID2 を Google Ad Manager の Secure Signals 機能 (旧称: Encrypted Signals for Publishers, ESP)で使用するパブリッシャーに必要な追加手順について説明します。 | Publishers |

### Mobile and Google GMA integration

以下のドキュメントリソースは、モバイルインテグレーション、およびモバイルのコンテキストにおける Google インテグレーションに関するものです。

| Integration Type| Documentation | Content Description | Audience |
| :--- | :--- | :--- | :--- |
| Mobile: Android | [UID2 SDK for Android Reference Guide](../sdks/uid2-sdk-ref-android.md) | このインテグレーションガイドは、UID2 を使用してクライアントの identity を確立し、Android デバイス上で Advertising Token を取得したいパブリッシャー向けのものです。 | Publishers |
| Mobile: iOS  | [UID2 SDK for iOS Reference Guide](../sdks/uid2-sdk-ref-ios.md) | このインテグレーションガイドは、UID2 を使用してクライアントの identity を確立し、iOS デバイス上で Advertising Token を取得したいパブリッシャー向けのものです。 | Publishers |
| Mobile: GMA for Android | [UID2 GMA Plugin for Android Integration Guide](../guides/mobile-plugin-gma-android.md) | このインテグレーションガイドは、Google Mobile Ads (GMA)SDK を使用するパブリッシャーが、Android アプリからの広告リクエストに UID2 Token を含めることを可能にします。 | Publishers |
| Mobile: GMA for iOS | [UID2 GMA Plugin for iOS Integration Guide](../guides/mobile-plugin-gma-ios.md) | このインテグレーションガイドは、Google Mobile Ads (GMA)SDK を使用するパブリッシャーが、iOS アプリからの広告リクエストに UID2 Token を含めることを可能にします。 | Publishers |
| Mobile: IMA for Android | [UID2 IMA Plugin for Android Integration Guide](../guides/mobile-plugin-ima-android.md) |このインテグレーションガイドは、Google Interactive Media Ads (IMA) SDK を使用するパブリッシャーが、Android アプリからの広告リクエストに UID2 token を含めることを可能にします。 | Publishers |
| Mobile: IMA for iOS | [UID2 IMA Plugin for iOS Integration Guide](../guides/mobile-plugin-ima-ios.md) | このインテグレーションガイドは、Google Interactive Media Ads (IMA) SDK を使用するパブリッシャーが、iOS アプリからの広告リクエストに UID2 token を含めることを可能にします。 | Publishers |

### Operator Deployment

以下のドキュメントリソースは、Private Operator 環境に関するものです。

| Integration Type| Documentation | Content Description | Audience |
| :--- | :--- | :--- | :--- |
| Operator | [UID2 Operator - AWS Marketplace Integration Guide](../guides/operator-guide-aws-marketplace.md) | AWS Marketplace の Private Operator Service を設定する手順です。 | Private Operators<br/>Publishers |
| Operator| [UID2 Operator - Google Cloud Platform Confidential Computing package](../guides/operator-guide-gcp-enclave.md) | Google Cloud Platform Confidential Computing パッケージ (GCP)のセットアップ手順です。 | Private Operators<br/>Publishers |
| Operator Integration Guide | [Operator - Microsoft Azure](../guides/operator-guide-azure-enclave.md) | IMPORTANT: このドキュメントは現在、PoC の段階です。UID2 Administrator に [連絡](../getting-started/gs-account-setup.md#contact-info) してください。<br/>Microsoft Azure Confidential Computing platform 上で実行する Private Operator Service のセットアップ手順です。 | Private Operators<br/>Publishers |

## Workflow for Publishers

以下の図は、パブリッシャー向けの UID2 ワークフローです。

![Publisher Workflow](../workflows/images/UID2PublisherAndSSPWorkflow.jpg)

詳しくは、[パブリッシャーワークフローの概要](../workflows/workflow-overview-supply-side.md)を参照してください。

## Getting Started

次の手順で始めます:

1. [アクセスリクエスト](/request-access)ページにあるフォームに記入して、UID2へのアクセスをリクエストします。
1. UID2 とインテグレーションしたいプロパティを特定します。
1. UID2 契約書にサインします。
1. UID2認証キー ([APIキー](../getting-started/gs-api-keys.md))を受け取ります。
1. SDK を使用するか、UID2 API と直接インテグレーションを行い、該当するドキュメントを使用して、UID2 へのインテグレーションを構築します。

     NOTE: リクエストメッセージは必ずUID2まで暗号化してください。詳細は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md)を参照してください。
1. テストします:

    入札リクエストで UID2 を適切に渡すために、SSP と協力します。
    
    リクエストの中で UID2 が正しく生成され、渡されていることを確認します。
1. 本番稼働します。

## Frequently Asked Questions for Publishers

UID2 フレームワークを使うパブリッシャー向けの FAQ のリストは、[FAQs for Publishers](../getting-started/gs-faqs.md#faqs-for-publishers) を参照してください。

すべてのリストは、[よくある質問](../getting-started/gs-faqs.md)を参照してください。
