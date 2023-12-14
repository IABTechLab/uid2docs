---
title: Private Operators
description: Private Operator 向けの情報の概要。
hide_table_of_contents: false
use_banner: true
banner_title: プライベートオペレータ向け UID2 の概要
banner_description: プライベート環境で DII から UID2 を生成するプロセスを説明します。
---

UID2 の Private Operator は、ファーストパーティーの [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) を安全な環境に送って翻訳し、その識別子の行き先を管理します。

以下のセクションでは、Unified ID 2.0（UID2）フレームワークが Private Operator に提供するメリット、ホスティングオプション、ドキュメントやその他のリソース、開始方法などの情報を提供します。

## Audience

このページは、UID2 の生成と管理を行う Private Operator (以前は Closed Operator と呼ばれていました)になることを選択し、プライベート環境で UID2 Operator Service を運営するためのページです。

Private Operator として UID2 に参加することで得られるメリットの一部を次に示します:
- 選択したパートナー間で暗号化・有効化される顧客データについて、プライバシーに配慮したワークフローを維持することができます。
- 自分のファーストパーティーの [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) を共有せずに使用して UID2 に参加することができます。
- UID2 のリソース、パフォーマンス、レイテンシーを完全にコントロールすることができます。
- 地域の近接性を提供できるサービスを使って、ネットワークホップを最小限にすることを目指すことができます。
- 共有サービスに参加するのではなく、自分がコントロールするプロセスやポリシーを実装することができます。


## Hosting Options for Private Operators

Private Operatorを選択した場合、以下の実施方法があります:

- クラウドサービスのセットアップを使用します。UID2 は、以下のクラウドサービスプロバイダー ([リソース](#resources)セクションのドキュメントを参照)上の[enclave](../ref-info/glossary-uid.md#gl-enclave)で UID2 をホストすることをサポートしています (実装に要する努力は中程度です):
  - Amazon Web Services (AWS)
  - Microsoft Azure
  - Google Cloud Platform (GCP)
- 独自のマシンを使用して UID2 を生成・管理します (実装の難易度が高いです)。

## Getting Started

1. [アクセスリクエスト](/request-access)ページにあるフォームに記入して、UID2 へのアクセスをリクエストします。
2. どの実装オプションを使用するかを決定します。
3. SDKを使用している場合は、SDKをダウンロードします。該当するSDKのガイドを参照してください。
4. 選択したオプションの実装ガイドに記載されている手順に従います。

     NOTE: リクエストメッセージは必ずUID2まで暗号化してください。詳細は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md)を参照してください。
5. テストします。
6. 本番稼働します。

## Resources

Private Operator が UID2 を実装するために、以下のドキュメントリソースを用意しています。

|    Integration Type    |                                              Documentation                                              |                                                                                                                       Content Description                                                                                                                       |     Audience      |
| :--------------------- | :------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------- |
| Operator               | [UID2 Private Operator for AWS Integration Guide](../guides/operator-guide-aws-marketplace.md)          | AWS Marketplace の Private Operator Service を設定する手順です。                                                                                                                                                                                                | Private Operators |
| GCP Confidential Space | [UID2 Private Operator for GCP Integration Guide](../guides/operator-private-gcp-confidential-space.md) | [Google Cloud](https://cloud.google.com/docs/overview/) プラットフォームの Confidential Computing オプションである [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space) に UID2 Operator Service を設定する手順です。 | Private Operators |
| Azure                  | [UID2 Private Operator for Azure Integration Guide](../guides/operator-guide-azure-enclave.md)          | Microsoft Azure のコンフィデンシャルコンピューティングオプションである Confidential Container（機密コンテナー）に UID2 Operator Service を設定する手順です。                                                                                    | Private Operators |

## FAQs

UID2 フレームワークに関するよくある質問のリストは、[Frequently Asked Questions](../getting-started/gs-faqs.md) を参照してください。