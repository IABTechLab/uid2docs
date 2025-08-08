---
title: UID2 Overview
description: UID2 ドキュメントの紹介。
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Unified ID 2.0 Overview

UID2 は、広告エコシステム全体の多くの [参加者](overviews/participants-overview.md#uid2-external-participants) がオープンインターネット上で広告機会を得るための決定論的な ID を可能にするフレームワークです。UID2 フレームワークにより、パブリッシャーのウェブサイト、モバイルアプリ、Connected TV (CTV)アプリからのログイン体験が、プログラマティックワークフローを通じて収益化できるようになります。独自の名前空間を持つオープンソースのスタンドアローンソリューションとして構築されたこのフレームワークは、ローカル市場の要件に合わせて設計された透明性とプライバシー制御をユーザーに提供します。

:::note
「UID2」という用語は、フレームワークと実際の識別子のいずれかを指すことがあります。特に断りのない限り、このページでは UID2 フレームワークの概要を説明します。
:::

## Guiding Principles

UID2 フレームワークは、以下の原則を基本としています:

- **First-party relationships**: UID2 により、広告主はオープンインターネット上のパブリッシャーウェブサイトでファーストパーティデータを有効にできます。

- **Non-proprietary (universal) standard**: 適切な参加契約を締結した広告エコシステムのすべての [参加者](overviews/participants-overview.md#uid2-external-participants) が UID2 にアクセスできます。

- **Open source**: [UID2 Component Services](overviews/participants-overview.md#uid2-component-services) のソースコードは一般に公開されています。

- **Interoperable**: このフレームワークにより、他の ID ソリューション (商用およびプロプライエタリ) が UID2 Token をインテグレーションし、提供できるようになります。

- **Secure and encrypted data**: UID2 は、ユーザーやその他の参加者のデータを保護するために、複数のセキュリティレイヤを利用しています。

- **Consumer control**: 消費者はいつでも [Transparency and Control Portal](https://www.transparentadvertising.com/) を通じて UID2 からの脱退を選択できます。

## Technical Design Principles

UID2 フレームワークは、以下の技術原則に基づいて構築されています:

- **Distributed integration**: 複数の認証済みインテグレーションパスにより、パブリッシャー、広告主、サードパーティデータプロバイダーが UID2 Token を管理および交換するためのオプションが提供されます。

- **Decentralized storage**: このフレームワークでは、個人に関するデータ (<Link href="ref-info/glossary-uid#gl-dii">DII</Link>) のマッピングを一元的に保管することはありません。すべての参加者が自分自身のデータのみを管理します。

- **Lean infrastructure**: UID2 システムは軽量で安価に運用できます。

- **Internet scale**: UID2 インフラは、継続的に増加する[参加者](overviews/participants-overview.md#uid2-external-participants) のニーズに対応し、特定の地域の性能要求に応えるために拡張できます。

- **Self-reliant**: UID2 は、リアルタイムビディング (RTB) データの処理において外部サービスに依存しません。

## Elements of the UID2 Infrastructure

UID2 インフラの重要な要素や、UID2 のその他の側面は、次のページを参照してください:

- [UID2 Identifier Types](ref-info/uid-identifier-types.md)
- [UID2 Components](ref-info/uid-components.md)
- [UID2 Participants](overviews/participants-overview.md)
- [Workflows](ref-info/uid-workflows.md)

## FAQs

[Frequently Asked Questions](getting-started/gs-faqs.md) を参照してください.

## License
All work and artifacts are licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.txt).
