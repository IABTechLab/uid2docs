# Unified ID 2.0 Overview

English | [Japanese](README-ja.md)

This page provides the following information about the Unified ID 2.0 (UID2) framework:

- [Introduction](#introduction)
- [UID2 Infrastructure](#uid2-infrastructure)
  - [UID2 Identifier Types](#uid2-identifier-types)
  - [Components](#components)
  - [Participants](#participants)
  - [Workflows](#workflows)
- [FAQs](#faqs)
- [License](#license)

For integration guides, supported SDKs, and endpoint reference, see [Getting Started](/api/README.md).

このページでは、Unified ID 2.0（UID2）フレームワークについて、以下の情報を提供します:

- [Introduction（概要）](#introduction)
- [UID2 Infrastructure（UID2 インフラストラクチャ）](#uid2-infrastructure)
  - [UID2 Identifier Types（UID2 識別子タイプ）](#uid2-identifier-types)
  - [Components（コンポーネント）](#components)
  - [Participants（参加者）](#participants)
  - [Workflows（ワークフロー）](#workflows)
- [FAQs（よくある質問）](#faqs)
- [License（ライセンス）](#license)

インテグレーションガイド、対応 SDK、エンドポイントリファレンスについては、[Getting Started](/api-ja/README.md) をご覧ください。

## Introduction

UID2 is a framework that enables deterministic identity for advertising opportunities on the open internet for many [participants](#participants) across the advertising ecosystem. The UID2 framework enables logged-in experiences from publisher websites, mobile apps, and Connected TV (CTV) apps to monetize through programmatic workflows. Built as an open-source, standalone solution with its own unique namespace, the framework offers the user transparency and privacy controls designed to meet local market requirements.

> NOTE: The term "UID2" can refer to either the framework or an actual identifier. Unless otherwise indicated, this page provides an overview of the UID2 framework.

UID2 は、広告エコシステム全体の多くの [参加者](#participants) にとって、オープンインターネット上の広告機会に対する決定論的な ID を可能にするフレームワークです。UID2 フレームワークにより、パブリッシャーのウェブサイト、モバイルアプリ、Connected TV（CTV）アプリからのログイン体験が、プログラマティックワークフローを通じて収益化できるようになります。独自の名前空間を持つオープンソースのスタンドアローンソリューションとして構築されたこのフレームワークは、ローカル市場の要件に合わせて設計された透明性とプライバシー制御をユーザーに提供します。

> NOTE: 「UID2」という用語は、フレームワークと実際の識別子のいずれかを指すことがあります。特に断りのない限り、このページでは UID2 フレームワークの概要を説明します。

### Guiding Principles

The UID2 framework has the following principles as its foundation:

- **First-party relationships**: UID2 enables advertisers to activate their first-party data on publisher websites across the open internet.

- **Non-proprietary (universal) standard**: All [participants](#participants) in the advertising ecosystem who agree toabide by the code of conduct can access UID2.

- **Open source**: The source code for the UID2 [components](#components) is publicly available.

- **Interoperable**: The framework allows other identity solutions (commercial and proprietary) to integrate and provide UID2 tokens with their offerings.

- **Secure and encrypted data**: UID2 leverages multiple layers of security to protect user and other participant data.

- **Consumer control**: Consumers can opt out of UID2 at any time through the [Transparency and Control Portal](https://transparentadvertising.org).

UID2 フレームワークは、以下の原則を基本としています:

- **First-party relationships**: UID2 により、広告主はオープンインターネット上のパブリッシャーウェブサイトでファーストパーティデータを有効にすることができます。

- **Non-proprietary (universal) standard**: 行動規範に従うことに同意した広告エコシステムのすべての [参加者](#participants) は、UID2 にアクセスすることができます。

- **Open source**: UID2 の[コンポーネント](#components)のソースコードは一般に公開されています。

- **Interoperable**: このフレームワークにより、他の ID ソリューション（商用およびプロプライエタリ）が UID2 Token を統合し、提供できるようになります。

- **Secure and encrypted data**: UID2 は、ユーザーやその他の参加者のデータを保護するために、複数のセキュリティレイヤを利用しています。

- **Consumer control**: 消費者はいつでも [Transparency and Control Portal](https://transparentadvertising.org) を通じて UID2 からの脱退を選択することができます。

### Technical Design Principles

The UID2 framework is built on the following technical principles:

- **Distributed integration**: Multiple certified integration paths provide options for publishers, advertisers, and third-party data providers to manage and exchange UID2 tokens.

- **Decentralized storage**: The framework does not have a centralized storage for personal data mappings. All participants maintain only their own data.

- **Lean infrastructure**: The UID2 system is light and inexpensive to operate.

- **Internet scale**: The UID2 infrastructure can scale to address the continuously increasing needs of [participants](#participants) and to meet performance demands of specific geographic regions.

- **Self-reliant**: UID2 does not rely on external services for processing of real-time bidding (RTB) data.

UID2 フレームワークは、以下の技術原則に基づいて構築されています:

- **Distributed integration**: 複数の認証済みインテグレーションパスにより、パブリッシャー、広告主、サードパーティデータプロバイダーが UID2 Token を管理および交換するためのオプションが提供されます。

- **Decentralized storage**: このフレームワークでは、個人データのマッピングを一元的に保管することはありません。すべての参加者が自分自身のデータのみを管理します。

- **Lean infrastructure**: UID2 システムは軽量で安価に運用できます。

- **Self-reliant**: UID2 インフラは、[参加者](#participants) の継続的なニーズの増加や、特定地域の性能要件に対応するよう拡張することが可能です。

- **Self-reliant**: UID2 は、リアルタイム・ビッディング（RTB）データの処理において外部サービスに依存しません。

## UID2 Infrastructure

The following sections explain and illustrate the key elements of the UID2 framework infrastructure:

- [UID2 Identifier Types](#uid2-identifier-types)
- [Components](#components)
- [Participants](#participants)
- [Workflows](#workflows)

以下のセクションでは、UID2 フレームワークのインフラストラクチャの主要な要素について説明し、図解します:

- [UID2 Identifier Types（UID2 識別子タイプ）](#uid2-identifier-types)
- [Components（コンポーネント）](#components)
- [Participants（参加者）](#participants)
- [Workflows（ワークフロー）](#workflows)

### UID2 Identifier Types

UID2 is a deterministic ID that is based on personally identifiable information (PII), such as email address or phone number. There are two types of UID2s: raw UID2s and UID2 tokens (also known as advertising tokens). The following table explains each type.

| ID Type                            | Shared in Bid Stream? | Description                                                                                                                                                                                                                                                                                                                                                                                                          |
| :--------------------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Raw UID2**                       | No                    | An unencrypted alphanumeric identifier created through the UID2 APIs or SDKs with the user's verifiable personal data, such as an email address or a phone number, as input.<br/><br/>To prevent re-identification of the original personal data, each raw UID2 utilizes hashing and salting. Raw UID2s are designed to be stored by advertisers, third-party data providers, and demand-side platforms (DSPs).      |
| **UID2 Token (Advertising Token)** | Yes                   | An encrypted form of a raw UID2. UID2 tokens are generated from hashed or unhashed email addresses or phone numbers that are converted to raw UID2s and then encrypted to ensure protection in the bid stream.<br/><br/>UID2 tokens are designed to be used by publishers or publisher service providers. Supply-side platforms (SSPs) pass UID2 tokens in the bid stream and DSPs decrypt them at bid request time. |

UID2 は、メールアドレスや電話番号など、個人を特定できる情報（PII）を基にした決定論的な ID です。UID2 には、raw UID2 と UID2 Token（Advertising Token とも呼ばれます）の 2 種類があります。以下の表で、それぞれのタイプについて説明します。

| ID Type                            | Shared in Bid Stream? | Description                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :--------------------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Raw UID2**                       | No                    | UID2 API または SDK を使用して、メールアドレスや電話番号などの検証可能な個人データを入力として作成される、暗号化されていない英数字の識別子です。<br/><br/>元の個人データの再識別を防ぐために、各 Raw UID2 はハッシュ化とソルト化をおこなっています。Raw UID2 は、広告主、サードパーティデータプロバイダー、およびデマンドサイドプラットフォーム（DSP）によって保存されるよう設計されています。                                                    |
| **UID2 Token (Advertising Token)** | Yes                   | Raw UID2 を暗号化したもの。UID2 Token は、ハッシュ化またはハッシュ化されていないメールアドレスや電話番号から生成され、Raw UID2 に変換された後、ビッドストリームでの保護を確実にするために暗号化されます。<br/><br/>UID2 Token は、パブリッシャーまたはパブリッシャーサービスプロバイダが使用するよう設計されています。サプライサイドプラットフォーム（SSP）は、ビッドストリームで UID2 Token を渡し、DSP は入札リクエスト時にそれを復号化します。 |

### Components

The UID2 framework consists of the following components, all of which are currently managed by The Trade Desk.

| Component                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core Service**                    | A centralized service that stores salt secrets and encryption keys and manages access to the distributed UID2 system. x                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Operator Service**                | A service that enables the management and storage of encryption keys and salts from the UID2 Core Service, hashing of users' personal data, encryption of raw UID2s, and decryption of UID2 tokens. There can be multiple instances of the service (public or private) operated by multiple [participants](#participants), known as operators.<br/><br/>Open operators run publicly available instances of the Operator Service and make them available to all relevant UID2 [participants](#participants). There might also be closed operators that run private instances of the Operator Service exclusively for their own use. All instances are designed with protections to keep critical UID2 data secure and interoperable, regardless of who operates the service. |
| **Opt-Out Service**                 | A global service that manages and stores user opt-out requests and disseminates them to publishers, operator service instances, and DSPs.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Transparency and Control Portal** | A user-facing website, [https://transparentadvertising.org](https://transparentadvertising.org), that allows consumers to opt out of UID2 at any time.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

UID2 フレームワークは以下のコンポーネントで構成されており、現在、すべて The Trade Desk が管理しています。

| Component                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :---------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core Service**                    | ソルトシークレットと暗号鍵を保管し、分散型 UID2 システムへのアクセスを管理する集中型サービス。                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Operator Service**                | UID2 コアサービスからの暗号鍵とソルトの管理・保管、ユーザーの個人情報のハッシュ化、Raw UID2 の暗号化、UID2 Token の復号を可能にするサービスです。<br/><br/>Open Operator は、オペレータサービスの公開インスタンスを実行し、関連するすべての UID2 [参加者](#participants) が利用できるようにします。また、オペレータサービスのプライベートなインスタンスを自分たちだけのために実行する Closed Operator も存在します。どのインスタンスも、誰がサービスを運営するかに関わらず、重要な UID2 データを安全に保ち、相互運用できるように保護設計されています。 |
| **Opt-Out Service**                 | ユーザーのオプトアウトリクエストを管理・保存し、パブリッシャー、オペレータのサービスインスタンス、DSP に配信するグローバルサービスです。                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Transparency and Control Portal** | ユーザー向けウェブサイト [https://transparentadvertising.org](https://transparentadvertising.org) では、消費者がいつでも UID2 からの脱退を選択できるようになっています。                                                                                                                                                                                                                                                                                                                                                                               |

### Participants

With its transparent and interoperable approach, UID2 provides a collaborative framework for many participants across the advertising ecosystem—advertisers, publishers, DSPs, SSPs, single sign-on (SSO) providers, customer data platforms (CDPs), consent management providers (CMPs), identity providers, third-party data providers, and measurement providers.

The following table lists the key participants and their roles in the UID2 [workflows](#workflows).

| Participant            | Role Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :--------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core Administrator** | An organization (currently, The Trade Desk) that manages the UID2 Core Service and other [components](#components). For example, it distributes encryption keys and salts to UID2 operators and sends user opt-out requests to operators and DSPs.                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Operators**          | Organizations that run the Operator Service (via the UID2 APIs). Operators receive and store encryption keys and salts from the UID2 Core Service, salt and hash personal data to return UID2 tokens, encrypt raw UID2s to generate UID2 tokens, and distribute UID2 token decryption keys.<br/><br/>Open operators run public instances of the Operator Service. For example, The Trade Desk currently serves as an open operator for the UID2 framework, available to all participants. If other open operators are available, a participant can choose which operator to work with.<br/><br/>Any participant can also choose to become a closed operator to generate and manage UID2s. |
| **DSPs**               | DSPs integrate with the UID2 system to receive UID2s from advertisers (as first-party data) and third-party data providers (as third-party data) and leverage them to inform bidding on UID2s in the bid stream.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Data Providers**     | Organizations that collect user data and push it to DSPs—for example, advertisers, identity graph providers, and third-party data providers.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Advertisers**        | Organizations that buy impressions across a range of publisher sites and use DSPs to decide which ad impressions to purchase and how much to bid on them.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Publishers**         | Organizations that propagate UID2 tokens to the bid stream via SSPs—for example, identity providers, publishers, and SSO providers. Publishers can choose to work with an SSO provider or an independent ID provider that is interoperable with UID2. The latter can handle the UID2 integration on behalf of publishers.                                                                                                                                                                                                                                                                                                                                                                 |
| **Consumers**          | Users who engage with publishers or their identity providers. Users can opt out of UID2 in the [Transparency and Control Portal](https://transparentadvertising.org).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

UID2 は透明で相互運用可能なアプローチにより、広告エコシステム全体、すなわち広告主、パブリッシャー、DSP、SSP、シングルサインオン（SSO）プロバイダー、カスタマーデータプラットフォーム（CDP）、同意管理プロバイダー（CMP）、ID プロバイダー、サードパーティデータプロバイダー、測定プロバイダーなどの多くの参加者に協調フレームワークを提供しています。

以下の表は、UID2 [ワークフロー](#workflows)における主要参加者とその役割の一覧です。

| Participant            | Role Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Core Administrator** | UID2 コアサービスおよびその他の[コンポーネント](#components)を管理する組織（現在は The Trade Desk）。例えば、UID2 Operator に暗号キーとソルトを配布したり、Operator や DSP にユーザーのオプトアウトリクエストを送ります。                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Operators**          | Operator Service を実行する組織 (UID2 API 経由)。Operator は、UID2 コアサービスから暗号化キーとソルトを受け取って保管し、個人データをソルトおよびハッシュ化して UID2 Token を返し、Raw UID2 を暗号化して UID2 Token 生成し、UID2 Token 復号キーを配布します。<br/><br/>Open Operator は、オペレーターサービスのパブリックインスタンスを実行しています。例えば、The Trade Desk は現在、UID2 フレームワークのオープンオペレーターとして、すべての参加者が利用できるようになっています。他のオープンオペレータが利用可能な場合、参加者はどのオペレータと作業するかを選択できます。<br/><br/>どの参加者も、UID2 を生成および管理する Closed Operator になることを選択することも可能です。 |
| **DSPs**               | DSP は UID2 システムとインテグレーションし、広告主から（ファーストパーティデータとして）、またサードパーティデータプロバイダーから（サードパーティデータとして）UID2 を受け取り、それらを活用してビッドストリーム中の UID2 に対する入札情報を提供します。                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Data Providers**     | ユーザーデータを収集し、DSP にプッシュする組織 - 例えば、広告主、ID グラフプロバイダー、サードパーティデータプロバイダーなど。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Advertisers**        | さまざまなパブリッシャーサイトでインプレッションを購入し、DSP を使用して、購入する広告インプレッションとその入札価格を決定している組織です。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Publishers**         | UID2 Token を SSP 経由でビッドストリームに伝達する組織 - 例えば、ID プロバイダー、パブリッシャー、SSO プロバイダーなど。パブリッシャーは、SSO プロバイダーか、UID2 と相互運用可能な独立した ID プロバイダーのいずれかと連携することを選択できます。後者は、パブリッシャーに代わって UID2 インテグレーションを行うことができます。                                                                                                                                                                                                                                                                                                                                                     |
| **Consumers**          | パブリッシャーまたはその ID プロバイダと関わるユーザー。ユーザーは、[Transparency and Control Portal](https://transparentadvertising.org) で UID2 をオプトアウトすることができます。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

## Workflows

The following table lists four key workflows in the UID2 framework with links to their high-level overviews. It also provides links to the respective integration guides, which include diagrams, integration steps, FAQs, and other relevant information for each workflow.

| Workflow                                                                  | Intended Primary Participants                                                                                                                                                                                                   | Integration Guide                                                                                                                                    |
| :------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Buy-Side**<br/>[Overview](./workflow-overview-buy-side.md)              | DSPs who transact on UID2 tokens in the bid stream.                                                                                                                                                                             | [DSP](./api/v2/guides/dsp-guide.md)                                                                                                                  |
| **Data Provider**<br/>[Overview](./workflow-overview-3p-data-provider.md) | Organizations that collect user data and push it to DSPs.                                                                                                                                                                       | [Advertiser and Third-Party Data Provider](./api/v2/guides/advertiser-dataprovider-guide.md)                                                         |
| **Supply-Side**<br/>[Overview](./workflow-overview-supply-side.md)        | Organizations that propagate UID2 tokenss to the bid stream via SSPs.<br/> NOTE: Publishers can choose to leverage the [UID2 SDK](./api/v2/sdks/client-side-identity.md) or complete their own custom, server-only integration. | [Publisher (with UID2 SDK)](./api/v2/guides/publisher-client-side.md)<br/>[Publisher (Server-Only)](./api/v2/guides/custom-publisher-integration.md) |
| **Opt-Out**<br/>[Overview](./workflow-overview-opt-out.md)                | Consumers who engage with publishers or their SSO providers and other identity providers.                                                                                                                                       | N/A                                                                                                                                                  |

The following diagram summarizes all four workflows. For each workflow, the [participants](#participants), [components](#components), [UID2 identifier types](#uid2-identifier-types), and numbered steps are color-coded.

![The UID2 Ecosystem](/images/UID2-workflows.jpg)

以下の表は、UID2 フレームワークの主要な 4 つのワークフローと、その概要へのリンクです。また、各ワークフローの図、インテグレーションステップ、FAQ、その他の関連情報を含むインテグレーションガイドへのリンクも掲載しています。

| Workflow                                                                  | Intended Primary Participants                                                                                                                                                                                                | Integration Guide                                                                                                                                    |
| :------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Buy-Side**<br/>[Overview](./workflow-overview-buy-side.md)              | ビッドストリームで UID2 Token の取引を行う DSP。                                                                                                                                                                             | [DSP](./api/v2/guides/dsp-guide.md)                                                                                                                  |
| **Data Provider**<br/>[Overview](./workflow-overview-3p-data-provider.md) | ユーザーデータを収集し、DSP にプッシュする組織。                                                                                                                                                                             | [Advertiser and Third-Party Data Provider](./api/v2/guides/advertiser-dataprovider-guide.md)                                                         |
| **Supply-Side**<br/>[Overview](./workflow-overview-supply-side.md)        | SSP を介して UID2 Token を入札ストリームに伝播する組織。<br/>NOTE: パブリッシャーは、[UID2 SDK](./api/v2/sdks/client-side-identity.md) を活用するか、独自のカスタムで Server-Only インテグレーションを行うかを選択できます。 | [Publisher (with UID2 SDK)](./api/v2/guides/publisher-client-side.md)<br/>[Publisher (Server-Only)](./api/v2/guides/custom-publisher-integration.md) |
| **Opt-Out**<br/>[Overview](./workflow-overview-opt-out.md)                | パブリッシャーやその SSO プロバイダー、その他の ID プロバイダーと関わる消費者。                                                                                                                                              | N/A                                                                                                                                                  |

次の図は、4 つのワークフローをすべてまとめたものです。各ワークフローについて、[参加者](#participants)、[コンポーネント](#components)、[UID2 識別子タイプ](#uid2-identifier-types)、および番号付きステップが色分けされています。

![The UID2 Ecosystem](/images/UID2-workflows.jpg)

## FAQs

Here are some commonly asked questions regarding the UID2 framework.

#### Will all integration partners in the EUID infrastructure (SSPs, third-party data providers, measurement providers) be automatically integrated with UID2?

No. UID2 functions as its own framework, which is separate from EUID. As such, paperwork relating to the usage and access to the EUID framework does not automatically grant usage and access to the UID2 framework. New contracts are required to be signed for UID2.

#### Can users opt out of targeted advertising tied to their UID2 identity?

Yes. Through the [Transparency and Control Portal](https://transparentadvertising.org), users can opt out from being served targeted ads tied to their UID2 identity. Each request is distributed through the UID2 Opt-Out Service and UID2 Operators to all relevant participants.

Some publishers and service providers have the option to limit access to their products based on a user’s participation in the UID2 framework, and it is the publisher’s responsibility to communicate this as part of their value exchange dialog with the user.

#### How does a user know where to access the opt-out portal?

Publishers, SSO providers, or consent management platforms disclose links to the [Transparency and Control Portal](https://transparentadvertising.org) in their login flows, consent flows, privacy policies, and by other means.

#### Why do advertisers and third-party data providers not need to integrate with the opt-out feed?

Opt-outs relate to opting out of targeted advertising, which is handled through the publisher and DSP opt-out [workflows](#workflows). To disengage from a specific advertiser, a consumer must contact the advertiser directly.

以下は、UID2 フレームワークに関するよくある質問です。

#### EUID インフラストラクチャのインテグレーションパートナー (SSP、サードパーティデータプロバイダー、測定プロバイダー) はすべて、自動的に UID2 に統合されるのですか？

いいえ。UID2 は EUID とは別の、独自のフレームワークとして機能します。そのため、EUID フレームワークの使用やアクセスに関する書類を作成しても、UID2 フレームワークの使用やアクセスが自動的に許可されるわけではありません。新規契約は UID2 用に締結する必要があります。

#### ユーザーは、自分の UID2 ID に関連付けられたターゲット広告をオプトアウトすることができますか？

はい。[Transparency and Control Portal](https://transparentadvertising.org) を通して、ユーザーは自分の UID2 ID に関連付けられたターゲティング広告の配信を拒否することができます。各リクエストは、UID2 オプトアウトサービスと UID2 Operator を通じて、関連するすべての参加者に配信されます。

パブリッシャーやサービスプロバイダの中には、ユーザーが UID2 フレームワークに参加しているかどうかに基づいて自社製品へのアクセスを制限するオプションを持っているところがありますが、このことをユーザーとの価値交換ダイアログの一部として伝えるのは、パブリッシャーの責任です。

#### ユーザーは、オプトアウトポータルにアクセスする場所をどのように知ることができますか？

パブリッシャー、SSO プロバイダー、または同意管理プラットフォームは、ログインフロー、同意フロー、プライバシーポリシー、およびその他の手段で、[Transparency and Control Portal](https://transparentadvertising.org) へのリンクを開示します。

#### なぜ広告主やサードパーティデータプロバイダーは、オプトアウトフィードと統合する必要がないのですか？

オプトアウトは、ターゲティング広告のオプトアウトに関連しており、パブリッシャーおよび DSP のオプトアウト [ワークフロー](#workflows) を通じて処理されます。特定の広告主から離脱するには、消費者が広告主に直接連絡する必要があります。

## License

All work and artifacts are licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.txt).
