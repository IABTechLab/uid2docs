---
title: Overview of UID2 Participants
description: さまざまなタイプの UID2 参加者の概要。
hide_table_of_contents: false
sidebar_position: 06
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Overview of UID2 Participants

透明性と相互運用可能なアプローチにより、UID2 は広告エコシステム全体の多くの参加者（広告主、パブリッシャー、DSP、SSP、シングルサインオン (SSO) プロバイダー、カスタマーデータプラットフォーム (CDP)、同意管理プロバイダー (CMP)、ID プロバイダー、サードパーティデータプロバイダー、測定プロバイダー）に協調的なフレームワークを提供します。

以下の表は、[UID2 ワークフロー](../ref-info/uid-workflows.md) における主要な参加者とその役割の一覧です。これらは次の 3 つのカテゴリに分類されます:

- [UID2 Component Services](#uid2-component-services)
- [UID2 External Participants](#uid2-external-participants)
- [UID2 Consumers](#uid2-consumers)

## UID2 Component Services

以下の表は、UID2 Service の主要な参加者コンポーネントに関する情報の要約です。

さまざまなサービスがどのように連携して機能するかの図については、[UID2 Workflows](../ref-info/uid-workflows.md) を参照してください。

| Participant | Role Description |
| :--- | :--- |
| **Core Administrator** | UID2 Core Service およびその他のコンポーネントサービスを管理する組織（現在は The Trade Desk）。たとえば、暗号化キーとソルトを UID2 Operator に配布し、ユーザーオプトアウト要求を Operator と DSP に送信します。 |
| **Operators** | (UID2 API 経由で) <Link href="../ref-info/glossary-uid#gl-operator-service">Operator Service</Link> を実行する組織。Operator は定期的に UID2 Core Service から最新の暗号化キーとソルトを受信して保存し、<Link href="../ref-info/glossary-uid#gl-dii">DII (directly identifying information)</Link> をソルト化およびハッシュ化して raw UID2 を返し、raw UID2 を暗号化して UID2 Token を生成し、UID2 Token 復号化キーを配布します。<br/>Public Operator (Open Operator) は、Operator Service のパブリックインスタンスを実行します。例えば、The Trade Desk は現在、UID2 フレームワークの Public Operator として機能しており、すべての参加者が利用できます。他の Public Operator が利用可能な場合、参加者は連携する Operator を選択できます。<br/>任意の参加者は、UID2 を生成および管理するために Private Operator になることも選択できます。 |

## UID2 External Participants

以下の表は、UID2 の外部参加者パートナーの主なタイプの要約です。各参加者タイプの詳細については、概要ページへのリンクを参照してください。

| Participant Type | Role Description |
| :--- | :--- |
| [Publishers](overview-publishers.md) | SSP を介して UID2 Token をビッドストリームに伝播する組織—たとえば、ID プロバイダー、パブリッシャー、SSO プロバイダーなど。パブリッシャーは、SSO プロバイダーまたは UID2 と相互運用可能な独立した ID プロバイダーと連携することを選択できます。独立した ID プロバイダーは、パブリッシャーに代わって UID2 インテグレーションを処理できます。 |
| [Advertisers](overview-advertisers.md) | さまざまなパブリッシャーサイトでインプレッションを購入し、DSP を使用して購入する広告インプレッションとその入札額を決定する組織。 |
| [DSPs](overview-dsps.md) | DSP は UID2 システムと連携 (integrate) し、広告主（ファーストパーティデータとして）およびサードパーティデータプロバイダー（サードパーティデータとして）から UID2 を受信し、それらを活用してビッドストリーム内の UID2 に対する入札 (bidding) を通知します。 |
| [Data Providers](overview-data-providers.md) | ユーザーデータを収集し、他の UID2 参加者にプッシュする組織—たとえば、広告主、ID グラフプロバイダー、サードパーティデータプロバイダーなど。 |

## UID2 Consumers

UID2 消費者 (consumer) とは、メールアドレスまたは電話番号から UID2 Token または raw UID2 を作成されたユーザーのことです。

UID2 は、ユーザーおよびその他の参加者のデータを保護するために、多層的なセキュリティを活用しています。UID2 はプライバシーに準拠した識別子です。UID2 を使用することで、消費者はプライバシーを侵害することなく、よりパーソナライズされた広告を楽しむことができます。

消費者は、[Transparency and Control Portal](https://www.transparentadvertising.com/) で UID2 からオプトアウトできます。
