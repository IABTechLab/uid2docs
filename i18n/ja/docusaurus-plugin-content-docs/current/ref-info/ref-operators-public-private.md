---
title: The UID2 Operator
description: Public と Private Operator、それぞれの違いについての情報。
hide_table_of_contents: false
sidebar_position: 06
---

import Link from '@docusaurus/Link';

# The UID2 Operator

UID2 Operator Service により、UID2 Core Service からの <a href="../ref-info/glossary-uid#gl-encryption-key">暗号化キー</a> と [Salt(ソルト)](../ref-info/glossary-uid.md#gl-salt) の管理と保存、ユーザーの個人に関するデータ (<Link href="../ref-info/glossary-uid#gl-dii">DII</Link>) のハッシュ化、[raw UID2](../ref-info/glossary-uid.md#gl-raw-uid2) の暗号化、<Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 Token</Link> の復号化が可能になります。

Operator Service のすべてのインスタンスは、誰がサービスを運営するかにかかわらず、重要な UID2 データを安全に保ち、相互運用できるよう、厳格な保護が施されて設計されています。

## UID2 Operator: Overview

複数の参加者によって運営される、複数の Operator Service のインスタンスが存在する可能性があります。これらの参加者はそれぞれ、UID2 Operator と呼ばれます。

UID2 Operator は、Operator Service を実行する組織です。オペレーターは、定期的に以下の複数のタスクを実行します:

- UID2 Core Service から最新の暗号化キーとソルトを受け取り、保存します。
- raw UID2 を返すため <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> をソルト化およびハッシュ化します。
- UID2 Token を生成するために raw UID2 を暗号化します。
- UID2 Token の復号鍵を Server-Side SDK に配布します (詳細は [SDKs: Summary](../sdks/summary-sdks.md) を参照)。
- UID2 <a href="glossary-uid#gl-opt-out-service">Opt-Out Service</a> から最新のユーザーオプトアウト情報をダウンロードします。
- 複数の UID2 エンドポイントをサポートします。詳細は [UID2 Endpoints: Summary](../endpoints/summary-endpoints.md) を参照してください。

UID2 Operator は、次の 2 つのカテゴリに分類されます:

- [Public Operators](#public-operators)
- [Private Operators](#private-operators)

Operator は UID2 の中核的なコードです。このコードは、メールアドレスを raw UID2 または UID2 Token に変換し、共有している参加者が復号キーを更新するために使用します。

## Public Operators

Public Operator は、関連するすべての UID2 参加者が利用できる UID2 Operator インスタンスです。Public Operator は、一般に利用可能な Operator Service のインスタンスを実行し、参加者が利用できるようにします。

ほとんどの場合、UID2 参加者は Public Operator を使用します。

Public Operator は、UID2 administration が所有し管理します。たとえば、現在 The Trade Desk は UID2 フレームワークの Public Operator として機能しており、すべての参加者が利用できます。他の Public Operator が利用可能な場合、参加者はどのオペレーターと連携するかを選択できます。

## Public Operator: Benefits

Public Operator を使用する場合、Operator をホスト、構成、維持、または更新するための追加作業は必要ありません。必要なのは、SDK を使用するか、UID2 endpoint を呼び出すようにインテグレーションするだけです。

Public Operator を利用するための費用は、参加者には一切かかりません。

参加者は、契約に署名し ([Account setup](../getting-started/gs-account-setup.md) を参照)、Public Operator でホストされている UID2 API を使用するために該当する認証情報 ([API key and client secret](../getting-started/gs-credentials.md#api-key-and-client-secret)) を取得する必要があります。

:::note
Public Operator の場合、データは参加者のインフラを離れ、オペレーターに送られます。Public Operator 内のデータを保護するために、厳格なセキュリティ対策が実施されています。
:::

## Private Operators

Private Operator は、UID2 Operator のプライベートインスタンスです。つまり、特定のエンティティが独自に使用するためにプライベートインスタンスをホストします。

また、参加者は、UID2 を生成および管理するために Private Operator になることも選択できます。ただし、Private Operator になるにはいくつかの追加手順が必要であり、参加者が用意するリソースが必要です。

詳細は [UID2 Private Operator Integration Overview](../guides/integration-options-private-operator.md) を参照してください。

## Summary

ほとんどの参加者にとって、Public Operator が最もシンプルなソリューションです。

Private Operator オプションのデメリットは、構築と維持に継続的なエンジニアリング作業が必要なことです。Private Operator のインスタンスは参加者によって管理されるため、継続的な更新と変更が必要となり、指定された期間内に完了する必要があります。

Public Operator とのインテグレーションは、独自のインスタンスを作成するよりもはるかに簡単なオプションです。参加者に費用はかからず、初期設定と構成以外のエンジニアリング作業は事実上必要ありません。

これらの理由から、Public Operator を選択することを勧めます。
