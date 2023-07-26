---
title: Private Operators
description: Private Operator 向けの情報の概要。
hide_table_of_contents: false
use_banner: true
banner_title: プライベートオペレータ向け UID2 の概要
banner_description: プライベート環境で DII から UID2 を生成するプロセスを説明します。
---

UID2 の Private Operator は、ファーストパーティーの[個人を識別できる情報（DII）](../ref-info/glossary-uid.md#gl-dii)を安全な環境に送って翻訳し、その識別子の行き先を管理する。

このページでは、UID2（Unified ID 2.0）フレームワークがプライベートオペレータにもたらすもの、利用可能な実装オプション、および開始方法についての情報を提供します。

## Audience

このページは、UID2 の生成と管理を行う Private Operator（以前は Closed Operator と呼ばれていました）になることを選択し、プライベート環境で UID2 Operator Service を運営するためのページです。

Private Operator として UID2 に参加することで得られるメリットの一部を次に示します：
- 選択したパートナー間で暗号化・有効化される顧客データについて、プライバシーに配慮したワークフローを維持することができます。
- 自分のファーストパーティーの[個人を識別できる情報（DII）](../ref-info/glossary-uid.md#gl-dii)を共有せずに使用して UID2 に参加することができます。
- UID2 のリソース、パフォーマンス、レイテンシーを完全にコントロールすることができます。
- 地域の近接性を提供できるサービスを使って、ネットワークホップを最小限にすることを目指すことができます。
- 共有サービスに参加するのではなく、自分がコントロールするプロセスやポリシーを実装することができます。


## Hosting Options for Private Operators

Private Operatorを選択した場合、以下の実施方法があります:

- クラウドサービスのセットアップを使用します。UID2 は、以下のクラウドサービスプロバイダー（[リソース](#resources)セクションのドキュメントを参照）上の[enclave](../ref-info/glossary-uid.md#gl-enclave)で UID2 をホストすることをサポートしています（実装に要する努力は中程度です）：
  - Amazon Web Services (AWS)
  - Microsoft Azure
  - Google Cloud Platform (GCP)
- 独自のマシンを使用して UID2 を生成・管理します（実装の難易度が高いです）。

## Resources

Private Operator が UID2 を実装するために、以下のドキュメントリソースを用意しています。

| Integration Type| Documentation | Content Description | Audience |
| :--- | :--- | :--- | :--- |
| Operator | [UID2 Operator - AWS Marketplace Integration Guide](../guides/operator-guide-aws-marketplace.md) | AWS MarketplaceのPrivate Operator Service を設定する手順です。 | Private Operators<br/>Publishers |
| GCP| [UID2 Operator - Google Cloud Platform Confidential Computing package](../guides/operator-guide-gcp-enclave.md) | Google Cloud Platform Confidential Computing パッケージ（GCP）を設定する手順です。 | Private Operators<br/>Publishers |
| Azure | [Operator - Microsoft Azure](../guides/operator-guide-azure-enclave.md) | IMPORTANT: このドキュメントは現在、PoCの段階です。<br/> Microsoft Azure Confidential Computingプラットフォーム上で実行するPrivate Operator Service のセットアップ手順です。 | Private Operators<br/>Publishers |

## Getting Started

1. [アクセスリクエスト](/request-access)ページにあるフォームに記入して、UID2 へのアクセスをリクエストします。
2. どの実装オプションを使用するかを決定します。
3. SDKを使用している場合は、SDKをダウンロードします。該当するSDKのガイドを参照してください。
4. 選択したオプションの実装ガイドに記載されている手順に従います。

     NOTE: リクエストメッセージは必ずUID2まで暗号化してください。詳細は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md)を参照してください。
5. テストします。
6. 本番稼働します。

## Frequently Asked Questions

UID2 フレームワークに関するFAQです： [よくある質問](../getting-started/gs-faqs.md) を参照してください。
