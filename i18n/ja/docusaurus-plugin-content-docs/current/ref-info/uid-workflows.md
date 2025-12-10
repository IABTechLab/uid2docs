---
title: UID2 Workflows
description: A detailed summary of UID2 workflows.
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# UID2 Workflows

以下の表は、UID2 フレームワークの 4 つの主要なワークフローを概要へのリンクとともに示しています。また、それぞれのワークフローに関する図、インテグレーション手順、FAQ、およびその他の関連情報を含むインテグレーションガイドへのリンクも提供しています。

| Workflow | Intended Primary Participants | Integration Guides |
| :--- |:--- |:--- |
| [Workflow for DSPs](../overviews/overview-dsps.md#workflow-for-dsps) (Buy-Side) | ビッドストリームで UID2 Token 取引を行う DSP。 | [DSP Integrations](../guides/summary-guides#dsp-integrations) を参照 |
| [Workflow for Advertisers](../overviews/overview-advertisers.md#workflow-for-advertisers) and [Workflow for Data Providers](../overviews/overview-data-providers.md#workflow-for-data-providers) | ユーザーデータを収集し、DSPに提供する組織。 | [Advertiser/Data Provider Integrations](../guides/summary-guides#advertiserdata-provider-integrations)　を参照 |
| [Workflow for Publishers](../overviews/overview-publishers.md#workflow-for-publishers) | SSP を介して UID2 Token をビッドストリームに送るする組織。<br/> 注意: パブリッシャーは、Prebid を使用した統合、JavaScript 用 SDK の活用、または SDK を使用しない独自のサーバーサイドインテグレーションを選択できます。 | [Publisher Integrations](../guides/summary-guides#publisher-integrations) を参照 |
| [Opt-Out Workflow](../getting-started/gs-opt-out.md#opt-out-workflow) | パブリッシャーやそのSSOプロバイダー、その他のアイデンティティプロバイダーと関わる消費者。 | N/A |

以下の図は、4 つのワークフローすべてをまとめたものです。各ワークフローについて、[外部参加者](../overviews/participants-overview.md#uid2-external-participants)、[コンポーネント](../ref-info/uid-components.md)、[UID2 識別子タイプ](../ref-info/uid-identifier-types.md)、および番号付きのステップが色分けされています。

![The UID2 Ecosystem](images/UID2Workflows.svg)
