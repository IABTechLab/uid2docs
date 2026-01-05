---
title: UID2 Overview
description: UID2 ドキュメントの紹介。
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Unified ID 2.0 Overview

UID2 は、広告エコシステム全体の多くの [参加者](overviews/participants-overview.md#uid2-external-participants) が、オープンインターネット上の広告機会に対して決定論的な ID (Identity) を利用できるようにするフレームワークです。UID2 フレームワークにより、パブリッシャーのウェブサイト、モバイルアプリ、Connected TV (CTV) アプリは、プログラマティックなワークフローを通じて収益化が可能になります。独自の名前空間を持つオープンソースのスタンドアローンソリューションとして構築されたこのフレームワークは、参加者が各地の市場要件を満たすのに役立つよう設計されたプライバシー管理機能を提供します。

:::note
「UID2」という用語は、フレームワークまたは実際の識別子のいずれかを指す場合があります。特に断りのない限り、このページでは UID2 フレームワークの概要を説明します。
:::

## Guiding Principles

UID2 フレームワークは、以下の原則を基盤としています。

- **First-party relationships**: UID2 により、広告主はオープンインターネット上のパブリッシャーのウェブサイトで、自身のファーストパーティデータを有効活用 (アクティベート) できます。

- **Non-proprietary (universal) standard**: 適切な参加契約を締結した広告エコシステム内のすべての [参加者](overviews/participants-overview.md#uid2-external-participants) が、UID2 にアクセスできます。

- **Open source**: [UID2 Component Services](overviews/participants-overview.md#uid2-component-services) のソースコードは一般公開されています。

- **Interoperable**: このフレームワークは、他の ID ソリューション (商用および独自仕様) が連携し、その提供物 (オファリング) と共に UID2 Token を提供することを可能にします。

- **Secure and encrypted data**: UID2 は、ユーザーおよびその他の参加者のデータを保護するために、多層的なセキュリティを活用しています。

- **Consumer control**: 消費者は、[Transparency and Control Portal](https://www.transparentadvertising.com/) を通じて、いつでも UID2 からオプトアウトできます。

## Technical Design Principles

UID2 フレームワークは、以下の技術的原則に基づいて構築されています。

- **Distributed integration**: 認定された複数のインテグレーションパスにより、パブリッシャー、広告主、サードパーティデータプロバイダーが UID2 Token を管理・交換するための選択肢 (オプション) が提供されます。

- **Decentralized storage**: このフレームワークは、個人データ (<Link href="ref-info/glossary-uid#gl-dii">DII</Link>) のマッピングを集中保管しません。すべての参加者は、自身のデータのみを管理します。

- **Lean infrastructure**: UID2 システムは軽量であり、運用コストが安価です。

- **Internet scale**: UID2 インフラストラクチャは、[参加者](overviews/participants-overview.md#uid2-external-participants) の増え続けるニーズに対応し、特定の地域のパフォーマンス要件を満たすために拡張 (スケール) 可能です。

- **Self-reliant**: UID2 は、リアルタイムビディング (RTB) データの処理において、外部サービスに依存しません。

## Elements of the UID2 Infrastructure

UID2 インフラストラクチャの主要な要素や、UID2 のその他の側面については、以下のページを参照してください。

- [UID2 Identifier Types](ref-info/uid-identifier-types.md)
- [UID2 Components](ref-info/uid-components.md)
- [UID2 Participants](overviews/participants-overview.md)
- [Workflows](ref-info/uid-workflows.md)

## FAQs

[Frequently Asked Questions](getting-started/gs-faqs.md) を参照してください。

## License
すべての成果物およびアーティファクトは、[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.txt) の下でライセンスされています。
