---
title: Private Operator Integrations
description: Overview of UID2 Private Operator options.
hide_table_of_contents: false
sidebar_position: 02
---

import Link from '@docusaurus/Link';

# Private Operator Integrations

Private Operator は、UID2 <Link href="../ref-info/glossary-uid#gl-operator">Operator</Link> のプライベートインスタンスです。つまり、特定の組織が、自分自身の使用のために UID2 Operator のプライベートインスタンスを独占的にホストしています。

Private Operator は、<Link href="../ref-info/glossary-uid#gl-enclave">enclave</Link> で実行されます。これは、未承認のアクセスを防ぐための追加のセキュリティ機能を備えた仮想マシンです。そのため、権限のない個人は、仮想マシンから構成情報やデータをダウンロードすることができません。

Enclave は、ハードウェアベースのセキュリティ機能を提供し、VM のデータと操作が外部の脅威（ホストオペレーティングシステム、ハイパーバイザー、さらにはシステム管理者さえも）から保護されるようにします。

Enclave で実行することにより、raw UID2 を生成するために使用される安全なデータを保護するための追加のセキュリティレイヤーが提供されます。

Private Operator になるには、いくつかの追加のステップが必要で、参加者が提供するリソースが必要です。

このページでは、インテグレーションオプションとステップの概要を紹介し、各オプションに関する追加情報へのリンクを提供します。

## Private Operator Requirements

参加者は、Private Operator インスタンスをホスト、構成、維持、および更新し、厳格なセキュリティ対策に準拠する必要があります。インテグレーションと継続的な更新を行うためにエンジニアリソースが必要です。

Private Operator インスタンスをホストするには、参加者は契約に署名する必要があります（[Account Setup](../getting-started/gs-account-setup.md)を参照してください）。

:::note
Private Operator は、Public Operator または他の Private Operator によって処理された raw UID2 または UID2 Token を表示できません。各 Private Operator はすべての他の Operator から隔離されています。
:::

## Private Operator Workflow

すべての Private Operator は、次のいずれかで実行されます:

- [Nitro](https://aws.amazon.com/ec2/nitro/) Enclave (AWS)
- Confidential space (GCP)
- Confidential computing environment (Azure)

これらの各機能により、Private Operator が保護されたメモリ空間で実行されることが保証されます。

基本的なワークフローは次のとおりです:

1. 起動時に、Private Operator は <Link href="../ref-info/glossary-uid#gl-core-service">Core</Link> サービスとの認証プロセスを経ます。認証プロセスでは、Operator が安全な信頼された実行環境（TEE）で実行されていること、および環境が改ざんされていないことが検証されます。

1. Operator が認証プロセスをパスすると、Core サービスは Private Operator に、起動に必要な情報を取得するための安全な S3 URL を提供します。

1. Private Operator は、UID2 の処理に必要なセキュリティ情報（ソルト、暗号化キー、ユーザーのオプトアウトレコードなど）を Amazon S3 から取得します。セキュリティの詳細については、[Private Operator Security](#private-operator-security) を参照してください。

1. Operator が再起動されると、再度認証プロセスを経て、新しいセキュリティ情報を取得します。

1. Operator は、Core サービスと定期的に再認証して、保護された環境で実行されていることを確認します。改ざんが検出された場合、Operator はシャットダウンします。

## Private Operator Security

サポートされる Private Operator の実装は、いずれも厳格なセキュリティ基準を満たす必要があります。セキュリティポイントには次のようなものがあります:

- Private Operator は、[Private Operator Integration Options](#private-operator-integration-options) にリストされているサポートされるクラウドプロバイダーのうちの1つによってホストされるハードウェアベースの信頼された実行環境（TEE）で実行されます。
- Private Operator は、UID2 を処理するために必要な情報にアクセスする前に、認証プロセスを完了する必要があります。
- S3 上の情報は、安全に暗号化され、TLS を介して転送されます。さらに、アクセスは正しく認証された Private Operator にのみ制限されます。
- 起動時に取得される情報は、ローカルに保存されません。情報は常にメモリに保持され、Private Operator は、メモリ内のデータを見ることが困難な保護された環境で実行されています。

## Private Operator Integration Options

以下の Private Operator インテグレーションが利用可能です。

Private Operator のバージョン間に機能上の違いはありません。

| Integration Type| Documentation | Content Description |
| :--- | :--- | :--- |
| AWS | [UID2 Private Operator for AWS Integration Guide](../guides/operator-guide-aws-marketplace.md) | AWS Marketplace の Private Operator Serviceの設定方法。|
| GCP Confidential Space | [UID2 Private Operator for GCP Integration Guide](../guides/operator-private-gcp-confidential-space.md) | [Google Cloud](https://cloud.google.com/docs/overview/) Platform 機密コンピューティングオプションである [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space) での UID2 Operator Serviceの設定方法。 |
| Azure | [UID2 Private Operator for Azure Integration Guide](../guides/operator-guide-azure-enclave.md) | Microsoft Azureの機密コンピューティングオプションであるConfidential ContainerでUID2 Operator Serviceを設定する方法。 |

## Additional Information

Private Operator をホストすることに興味がある方向けに、以下の追加リソースが利用可能です。

- Private Operator に関する一般情報、利点の概要: [UID2 Overview for Private Operators](../overviews/overview-operators-private.md) を参照してください。

- Operator がどのように機能するかに関する一般情報: [The UID2 Operator](../ref-info/ref-operators-public-private.md) を参照してください。
