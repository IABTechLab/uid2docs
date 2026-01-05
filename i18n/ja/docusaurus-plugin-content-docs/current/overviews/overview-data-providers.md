---
title: Data Providers
description: データプロバイダー向けの情報の概要。
hide_table_of_contents: false
sidebar_position: 08
use_banner: true
banner_title: データプロバイダー向け UID2 概要
banner_description: 将来のための ID (Identity) ソリューション。
banner_icon: 'dataProviders'
banner_text_color: 'white'
banner_text_color_dark: 'black'
banner_background_color: '#10692E'
banner_background_color_dark: '#E9F896'
displayed_sidebar: sidebarDataProviders
---

import Link from '@docusaurus/Link';

データおよび測定プロバイダーとして、Unified ID 2.0 (UID2) を採用し、より耐久性があり、オムニチャネルかつクロスデバイスな識別子とデータを接続することで、ID (Identity) の断片化を減らし、顧客のユースケースを満たすことができます。

このソリューションは、オンラインまたはオフライン広告のためのデータまたは関連サービスを提供している場合（たとえば、以下のプロバイダーなど）に適しています:
- データオンボーディング
- サードパーティオーディエンス
- ID (Identity) 解決とグラフ
- 計測とアトリビューション

UID2 を採用するデータプロバイダーのためのメリット、ワークフロー、ドキュメント、およびその他のリソースと、開始するための手順について説明します。

:::note
左側のサイドバーで UID2 ドキュメントの全セットにアクセスしたい場合は、[Unified ID 2.0 Overview](../intro.md) を参照してください。
:::

## Benefits of UID2 for Data Providers

データプロバイダーとして UID2 を使用することで得られるメリットの一部を次に示します。

- 消費者のプライバシー管理のためのオプトアウトを提供する、よりプライバシーを意識した識別子にアップグレードできます。
- プラットフォームとチャネル間をつなぐ ID (Identity) スレッドの使用を促進し、解決、アクティベーション、計測を容易にします。
- 広告主のために、決定論的 ID を使用してオーディエンスセグメントの将来性を確保することを目指せます。
- オンラインデータとオフラインデータを共通の ID で接続し、より高い精度を目指せます。
- サードパーティクッキーの有無にかかわらず、キャンペーンをより正確に測定できます。

## Workflow for Data Providers

以下の手順は、ユーザーデータを収集し、DSP にプッシュする組織（広告主、ID グラフプロバイダー、サードパーティデータプロバイダーなど）を対象としたワークフローの概要です。

以下のプロセスがバックグラウンドで行われます:
* 広告主またはデータプロバイダーは、<Link href="../ref-info/glossary-uid#gl-refresh-timestamp">リフレッシュタイムスタンプ (refresh timestamps)</Link> を監視し、現在時刻が保存された各 UID2 のリフレッシュタイムスタンプを超えた場合に UID2 を更新 (リフレッシュ) します。

以下の手順は、データプロバイダーが UID2 とインテグレーションする方法の例です:

1. データプロバイダーは、ユーザーの <Link href="../ref-info/glossary-uid#gl-dii">DII (directly identifying information)</Link> を UID2 Operator に送信します。
2. UID2 Operator は、raw UID2 とリフレッシュタイムスタンプを生成して返します。
3. データプロバイダーは、UID2 とリフレッシュタイムスタンプを保存し、UID2 ベースのファーストパーティおよびサードパーティのオーディエンスセグメントを DSP に送信します。

   Server-Side: データプロバイダーは、UID2 とリフレッシュタイムスタンプをマッピングテーブル、DMP、データレイク、またはその他のサーバーサイドアプリケーションに保存します。

![Data Provider Workflow](images/UID2AdvertiserAndThirdPartyDataProviderWorkflow.jpg)

## Getting Started

開始するには、以下の手順に従ってください:

1. [Request Access](/request-access) ページのフォームに記入して、UID2 へのアクセスをリクエストします。

   担当者がニーズについて話し合い、適切な次のステップをアドバイスするために連絡します。
1. [参加者 (participant)](participants-overview.md#uid2-external-participants) としての役割を決定します。
1. どの実装オプションを使用するかを決定します。
1. 認証情報 ([UID2 Credentials](../getting-started/gs-credentials.md) を参照) を受け取り、選択したオプションの実装ガイドの指示に従います。

   :::note
   UID2 へのリクエストメッセージは必ず暗号化してください。詳細は [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md) を参照してください。
   :::
1. テストします。
1. 本番稼働します。

## Implementation Resources

UID2 を実装する広告主およびデータプロバイダー向けに、以下のドキュメントリソースが用意されています。

| Integration Type| Documentation | Content Description |
| :--- | :--- | :--- |
| ユーザーデータを収集し、他の UID2 参加者にプッシュする組織向けのインテグレーションオプションの概要 | [Advertiser/Data Provider Integration Overview](../guides/integration-advertiser-dataprovider-overview.md) | このガイドでは、オーディエンス構築とターゲティングのために ID をマッピングするインテグレーションワークフローについて説明します。 |
| Snowflake | [Snowflake Integration Guide](../guides/integration-snowflake.md) | Snowflake 内のメールアドレスまたは電話番号から UID2 を生成する手順について説明します。 |
| Databricks Clean Rooms | [Databricks Clean Rooms Integration Guide](../guides/integration-databricks.md) | Databricks Clean Rooms 環境でメールアドレスまたは電話番号から UID2 を生成する手順について説明します。 |
| AWS Entity Resolution | [AWS Entity Resolution Integration Guide](../guides/integration-aws-entity-resolution.md) | AWS Entity Resolution を使用して UID2 フレームワークとインテグレーションする手順について説明します。 |
| ユーザーデータを収集し、他の UID2 参加者にプッシュする組織向けのインテグレーション手順 (UID2 HTTP エンドポイントのみを使用) | [Advertiser/Data Provider Integration to HTTP Endpoints](../guides/integration-advertiser-dataprovider-endpoints.md) | SDK、Snowflake、AWS Entity Resolution などの他の実装オプションを使用するのではなく、コードを記述して UID2 HTTP エンドポイントを呼び出すことで、UID2 とインテグレーションする広告主およびデータプロバイダー向けの手順について説明します。 |
| トラッキングピクセルに UID2 Token を追加するためにクライアントサイド JavaScript SDK を使用したい広告主およびデータプロバイダー向けのインテグレーション手順。 | [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md) | JavaScript のクライアントサイドの変更のみを使用して UID2 Token (Advertising Token) を生成する手順について説明します。<!-- UID2_only: Not applicable for EUID --> |

## FAQs for Data Providers

UID2 フレームワークを使用するデータプロバイダー向けのよくある質問のリストについては、[FAQs for Advertisers and Data Providers](../getting-started/gs-faqs.md#faqs-for-advertisers-and-data-providers) を参照してください。
