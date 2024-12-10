---
title: UID2 Integrations for Private Operators
description: Private Operator 向けの情報概要。
hide_table_of_contents: false
---

import Link from '@docusaurus/Link';

# UID2 Private Operator Integration Overview

<Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link> をホストする UID2 参加者は、自身のローカル UID2 <Link href="../ref-info/glossary-uid#gl-operator">Operator</Link> サービスに、自社のファーストパーティ <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> を送信します。この Operator は、プライベート環境で実行されます。

Private Operator は <Link href="../ref-info/glossary-uid#gl-enclave">enclave</Link>&#8212;不正アクセスを防ぐための追加のセキュリティ機能を備えた仮想マシンで実行されます。このため、不正な個人は仮想マシンから構成情報やデータをダウンロードできません。

Private Operator になるには、いくつかの追加ステップが必要で、参加者用意しなければならないリソースがあります。

UID2 フレームワークが Private Operator 向けに提供する機能、利点、ホスティング オプション、ドキュメントとその他のリソース、および開始方法について説明します。

:::note
このページは Private Operator についての情報です。Public Operator についての情報、または Operator が何であるか、Operator の違いがわからない場合は、[UID2 Operator](../ref-info/ref-operators-public-private.md) を参照してください。
:::

## Private Operator Benefits

Private Operator に参加するメリットは次のとおりです。
- 顧客のデータを暗号化し、選択したパートナー間でアクティブ化するためのプライバシーに配慮したワークフローを維持できます。
- 自社のファーストパーティ <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> を共有することなく、UID2 に参加できます。

  Private Operator ソリューションないでは、DII が自社のインフラストラクチャを離れることはありません。
- UID2 のためのリソース、パフォーマンス、およびレイテンシを完全に制御できます。たとえば:
  - 制限なしで、より高い可用性を提供できます。
  - Public Operator のインスタンスが近くにない場合、レイテンシの理由から Private Operator ソリューションをホストすることがあります。
- 地域に近いサービスを提供できるサービスを使用して、ネットワークホップを最小限に抑えることができます。
- シェアード サービスに参加する代わりに、自社でコントロールできるプロセスとポリシーを実装できます。

レイテンシに関する懸念が大きい場合、またはセキュリティ要件がデータが自社のシステム内に留まることを求める場合、さらに UID2 の実装を構築および維持するためのエンジニアリソースが豊富な場合、Private Operator ソリューションを検討することができます。

## Private Operator Requirements

参加者は、Private Operator インスタンスをホスト、構成、維持、および更新し、厳格なセキュリティ対策に準拠する必要があります。インテグレーションを行い、継続的な更新を行うためにエンジニアリソースが必要です。

Private Operator インスタンスをホストするためには、契約を結ぶ必要があります。契約については、[Account Setup](../getting-started/gs-account-setup.md) を参照してください。

:::note
Privaet Operator は、Public Operator または他の Private Operator によって処理された raw UID2 または UID2 Token の内容を見ることはできません。各 Private Operator は他のすべての Operator から隔離されています。
:::

## Hosting Options for Private Operators

Private Operator を選択する場合、いくつかの実装オプションが利用可能です。UID2 は、以下のクラウドサービスプロバイダーで UID2 を <Link href="../ref-info/glossary-uid#gl-enclave">enclave</Link> にホストすることをサポートしています (実装には中程度の労力が必要です):
- [Nitro Enclave](https://aws.amazon.com/ec2/nitro/) from AWS
- [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space), a confidential computing option from [Google Cloud](https://cloud.google.com/docs/overview/) Platform
- [Confidential Containers](https://learn.microsoft.com/en-us/azure/confidential-computing/confidential-containers), a confidential computing option from Microsoft Azure

## Private Operator Workflow

Private Operator の基本的なワークフローは次のとおりです:

1. 起動時に Private Operatorは、<a href="../ref-info/glossary-uid#gl-core-service">Core</a> service　との認証プロセスを実行します。認証プロセスは、Operator が安全な信頼された実行環境 (TEE) で実行されていること、およびその環境が改ざんされていないことを検証します。

1. Operator が認証プロセスに合格すると、Core Service は、起動に必要な情報を取得するための安全な S3 URL を Private Operator に提供します。

1. Private Operator は、UID2 の処理に必要な情報 (ソルト、暗号化キー、およびユーザーのオプトアウトレコードなど) を Amazon S3 から取得します。セキュリティの詳細については、[Private Operator Security](#private-operator-security) を参照してください。

1. Operator が再起動されると、再度認証プロセスを実行し、新しいセキュリティ情報を取得します。

1. Operator は Core Service での認証プロセスを定期的に再実行し、引き続き保護された環境で実行されていることを確認します。認証に失敗した場合、Operator はシャットダウンします。

## Private Operator Security

サポートされる Private Operator 実装は、厳格なセキュリティ基準を満たす必要があります。セキュリティに関するいくつかのポイントは次のとおりです:

- Private Operator は、[Hosting Options for Private Operators](#hosting-options-for-private-operators) に記載されているサポートされるクラウドプロバイダーのいずれかでホストされているハードウェアベースの信頼された実行環境 (TEE) で実行されます。
- Private Operator は、UID2 の処理に必要な情報にアクセスする前に、認証プロセスを完了する必要があります。
- S3 から取得された情報は、保存中および転送中に TLS によって暗号化されています。さらに、アクセスは正しく認証された Private Operator にのみ制限されています。
- 起動時に取得された情報は、いかなる時点でもローカルに保存されません。情報は常にメモリに保持され、Private Operator は、Operator を実行している人 (管理者など) および外部の関係者がメモリ内のデータを見ることが困難な保護された環境で実行されています。
- Private Operator は、処理のために送信された <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> (メールアドレスや電話番号) を保存しません。データは UID2 を生成するために enclave 内でのみ使用され、処理後すぐに破棄されます。

## Private Operator Limitations

Private Operator にはいくつかの制限があります:
- Private Operator は、現在、<Link href="../ref-info/glossary-uid#gl-client-side">client-side integration</Link>　をサポートしていません。
- Private Operator の更新は、年に 3 回リリースされます; Public Operator の更新は、より頻繁にリリースされます。

## Getting Started

Private Operator を開始するには、次の手順に従います:

1. UID2 へのアクセスをリクエストします。[Request Access](/request-access) ページのフォームに記入します。
2. 使用する実装オプションを決定します。

   利用可能なオプションの詳細は、[Hosting Options for Private Operators](#hosting-options-for-private-operators) を参照してください。
3. SDK を使用している場合は、SDK をダウンロードします。該当する SDK ガイドを参照してください。
4. 選択したオプションの実装ガイドに従います。

   :::note
   UID2 へのリクエストメッセージは必ず暗号化してください。詳細は、[Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md) を参照してください。
   :::
5. テストします。
6. 本番環境に移行します。

## Implementation Resources

UID2 の Private Operator 向けの実装リソースは次のとおりです。

Private Operator のバージョン間に機能的な違いはありません。

| Integration Type| Documentation | Content Description |
| :--- | :--- | :--- |
| AWS | [UID2 Private Operator for AWS Integration Guide](../guides/operator-guide-aws-marketplace.md) | AWS Marketplace の Private Operator Service の設定方法。 |
| GCP Confidential Space | [UID2 Private Operator for GCP Integration Guide](../guides/operator-private-gcp-confidential-space.md) | [Google Cloud](https://cloud.google.com/docs/overview/) Platform の機密コンピューティング オプションである [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space) に UID2 Operator Service を設定する方法。 |
| Azure | [UID2 Private Operator for Azure Integration Guide](../guides/operator-guide-azure-enclave.md) | Microsoft Azure の機密コンピューティング オプションである Confidential Containers インスタンスで UID2 Operator Service を設定する方法。 |
