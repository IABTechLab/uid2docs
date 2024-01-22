---
title: The UID2 Operator
description: Public と Private Operator、それぞれの違いについての情報。
hide_table_of_contents: false
sidebar_position: 06
---

# The UID2 Operator

UID2 Operator Service により、UID2 Core Service からの暗号化キーと [Salt(ソルト)](../ref-info/glossary-uid.md#gl-salt) の管理と保存、ユーザーの個人データ ([DII](../ref-info/glossary-uid.md#gl-dii)) のハッシュ化、[raw UID2](../ref-info/glossary-uid.md#gl-raw-uid2) の暗号化、[UID2 Token](../ref-info/glossary-uid.md#gl-uid2-token) の復号化が可能になります。

Operator Service のすべてのインスタンスは、誰がサービスを運営するかにかかわらず、重要な UID2 データを安全に保ち、相互運用できるよう、厳格な保護が施されて設計されています。

## UID2 Operator: Overview

複数の参加者によって運営される、複数の Operator Service のインスタンスが存在する可能性があります。これらの参加者はそれぞれ、UID2 Operator と呼ばれます。

UID2 Operator は、単に Operator Service を実行する組織です。オペレーターは、UID2 Core Service から暗号化キーとソルトを受け取って保管し、個人に関するデータをソルトおよびハッシュ化して UID2 Token を返し、raw UID2 を暗号化して UID2 Token を生成し、UID2 Token の復号キーを配布します。

UID2 Operator は、次の 2 つのカテゴリに分類されます:

- [Public Operators](#public-operator)
- [Private Operators](#private-operator)

Operator は UID2 の中核的なコードです。このコードは、メールアドレスを raw UID2 または UID2 Token に変換し、共有している参加者が復号キーを更新するために使用します。

## Public Operators

Public Operator または Open Operator は、関連するすべての UID2 参加者が利用できる UID2 Operator インスタンスです。Public Operator は、一般に利用可能な Operator Service のインスタンスを実行し、参加者が利用できるようにします。

ほとんどの場合、UID2 参加者は Public Operator を使用します。

Public Operator は、UID2 administration が所有し管理します。例えば、現在 The Trade Desk は UID2 フレームワークの Public Operator として機能しており、すべての参加者が利用できます。他の Public Operator が利用可能な場合、参加者はどのオペレーターと連携するかを選択できます。

## Public Operator: Benefits

Public Operator を使用する場合、Operator をホスト、構成、維持、または更新するための追加作業は必要ありません。必要なのは、SDK を使用するか、UID2 endpoint を呼び出すようにインテグレーションするだけです。

Public Operator を利用するための費用は、参加者には一切かかりません。

参加者は、Public Operator 上でホストされる UID2 API を使用するために、該当する資格情報 ([API key and client secret](../getting-started/gs-credentials.md#api-key-and-client-secret)) を取得する契約を締結する必要があります。

:::note
Public Operator の場合、データは参加者のインフラを離れ、オペレーターに送られます。もちろん、データを安全に保つための厳格な対策が講じられています。
:::

##  Private Operators

rivate Operator (Closed Operator) は、UID2 Operator のプライベートインスタンスです。これは、特定の組織が、その組織専用に Private Operator をホストすることを意味します。

参加者は誰でも、UID2 を生成および管理する Private Operator になることもできます。ただし、Private Operator になるにはいくつかの追加ステップが必要であり、参加者が提供する必要があるリソースを使用します。

参加者は、Private Operator インスタンスをホストし、構成し、維持し、更新する必要があり、厳密なセキュリティ対策に準拠する必要があります。インテグレーションと継続的な更新には、エンジニアリングリソースが必要です。

参加者は、Private Operator インスタンスをホストする契約を締結する必要があります。

:::note
Private Operator は、Public Operator または別の Private Operator からの raw UID2 または UID2 Token を処理することはできません。各 Private Operator は、完全に閉じたインフラストラクチャです。
:::

## Private Operator: Benefits

参加者が Private Operator になることを選択する理由はいくつかあります:

- Private Operator のソリューションでは、DII は運営する組織のインフラから離れません。

- Private Operator になれば、リソースを完全に管理できます。より多くのコントロールが可能です。例えば、料金の制限なく、より大きな可用性を提供することができます。

- 物理的に Public Operator のインスタンスの近くにない場合、レイテンシーの理由から Private Operator のソリューションをホストすることを選択することができます。

セキュリティやレイテンシに大きな懸念があり、UID2 実装を構築・維持するための広範なエンジニアリングリソースがある場合は、Private Operator ソリューションを検討することができます。

## Summary

ほとんどの参加者にとって、Public Operator が最善の解決策です。

Private Operator オプションのマイナス面は、構築と維持に継続的なエンジニアリング努力が必要なことです。Private Operator のインスタンスは参加者によって管理されるため、継続的な更新と変更が必要となり、指定された期間内に完了する必要があります。

Public Operator インテグレーションは、独自のインスタンスを作成するよりもはるかに簡単なオプションです。参加者に費用はかからず、初期設定と構成以外のエンジニアリング作業は事実上必要ありません。

これらの理由から、Public Operator を選択することをお勧めします。
