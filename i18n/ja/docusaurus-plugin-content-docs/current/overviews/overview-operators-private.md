---
title: Private Operators
description: Private Operator 向けの情報の概要。
hide_table_of_contents: false
use_banner: true
banner_title: Private Operator 向け UID2 の概要
banner_description: プライベート環境で DII から UID2 を生成するプロセスを説明します。
---

import Link from '@docusaurus/Link';

UID2 の Private Operator は、ファーストパーティの[directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) を安全な環境に送信して変換し、その識別子の送信先を管理します。Private Operator(以前は Closed Operator と呼ばれていました)になることを選択した参加者は、プライベート環境で UID2 Operator Service を実行し、UID2 を生成および管理できます。

UID2 フレームワークが Private Operator に提供するメリット、ホスティングオプション、ドキュメント、その他のリソース、開始方法などについて説明します。

## Benefits

UID2 に Private Operator として参加することの利点を次に示します:
- 選択したパートナー間で暗号化・有効化される顧客データについて、プライバシーに配慮したワークフローを維持することができます。
- 自分のファーストパーティーの [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) を共有せずに使用して UID2 に参加することができます。
- UID2 のリソース、パフォーマンス、レイテンシーを完全にコントロールすることができます。
- 地域的な近接性を提供できるサービスを利用することで、ネットワークホップを最小限に抑える計画を立てることができます。
- 共有サービスに参加するのではなく、自社で管理するプロセスやポリシーを導入することができます。

詳細については、[The UID2 Operator](../ref-info/ref-operators-public-private.md) を参照してください。

## Hosting Options for Private Operators

Private Operator を選択した場合、いくつかの実施オプションがあります。以下のいずれかを実行できます:

- クラウドサービスのセットアップを使用する。UID2 は、以下のクラウドサービスプロバイダー上の [enclave](../ref-info/glossary-uid.md#gl-enclave) で UID2 をホスティングすることをサポートしています(実装の難易度は中程度):
  - Amazon Web Services (AWS)
  - Microsoft Azure
  - Google Cloud Platform (GCP)
- 独自のマシンを使用して UID2 を生成・管理します (実装の難易度が高いです)。

## Getting Started

1. [アクセスリクエスト](/request-access)ページにあるフォームに記入して、UID2 へのアクセスをリクエストします。
2. どの実装オプションを使用するかを決定します。
3. SDKを使用している場合は、SDKをダウンロードします。該当するSDKのガイドを参照してください。
4. 選択したオプションの実装ガイドに記載されている手順に従います。

    :::note
    UID2 へのリクエストメッセージは必ず暗号化してください。詳細は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md) を参照してください。
    :::
5. テストします。
6. 本番稼働します。

## Implementation Resources

Private Operator が UID2 を実装するために、以下のドキュメントリソースを用意しています。

| Integration Type| Documentation | Content Description |
| :--- | :--- | :--- |
| AWS | [UID2 Private Operator for AWS Integration Guide](../guides/operator-guide-aws-marketplace.md) | AWS Marketplace の Private Operator Service を設定する手順です。 |
| GCP Confidential Space | [UID2 Private Operator for GCP Integration Guide](../guides/operator-private-gcp-confidential-space.md) | [Google Cloud](https://cloud.google.com/docs/overview/) プラットフォームの機密コンピューティングオプションである [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space) に UID2 Operator Service を設定するための情報です。 |
| Azure | [UID2 Private Operator for Azure Integration Guide](../guides/operator-guide-azure-enclave.md) | Microsoft Azure のコンフィデンシャルコンピューティングオプションである Confidential Container に UID2 Operator Service を設定する手順です。 |

## FAQs

UID2 フレームワークに関するよくある質問のリストは、[Frequently Asked Questions](../getting-started/gs-faqs.md) を参照してください。
