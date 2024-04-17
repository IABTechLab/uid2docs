---
title: Data Providers
description: データプロバイダー向けの情報の概要。
hide_table_of_contents: false
sidebar_position: 08
use_banner: true
banner_title:  データプロバイダー向け UID2 の概要
banner_description: 未来のためのIDソリューション。
displayed_sidebar: sidebarDataProviders
---

データおよび測定プロバイダーとして、Unified ID 2.0(UID2) を 採用し、より耐久性のある、オムニチャネルおよびクロスデバイス識別子でデータを接続することで、ID の断片化を減らし、顧客のユースケースを満たすことができます。

このソリューションは、以下のようなオンラインまたはオフライン広告用のデータまたは関連サービスを提供している場合に適しています:
- データオンボーディング
- サードパーティオーディエンス
- アイデンティティーの解決とグラフ
- 測定とアトリビューション

UID2 を採用するデータプロバイダーにとっての利点、ワークフロー、ドキュメント、その他のリソース、および UID2 を開始するための手順について説明します。

:::note
UID2 のドキュメント一式に左サイドバーからアクセスしたい場合は、[Unified ID 2.0 Overview](../intro.md) を参照してください。
:::

## Benefits of UID2 for Data Providers

UID2 を使用することで、データプロバイダーとして得られる利点の一部を次に示します。以下が可能です:
- 消費者のプライバシーを管理するためのオプトアウトを提供する、よりプライバシーに配慮した識別子にアップグレードします。
- 解決、活性化、測定のためのプラットフォームとチャネル間の接続 ID スレッドの使用を促進します。
- 広告主が決定論的な ID を使用して、オーディエンス・セグメントを将来にわたって保護することを目指します。
- オンラインとオフラインのデータを共通の ID で接続し、より精度の高いものを目指します。
- サードパーティクッキーの有無にかかわらず、キャンペーンをより正確に測定します。

## Workflow for Data Providers

以下のステップは、ユーザーデータを収集し DSP にプッシュする組織 (広告主、ID グラフプロバイダー、サードパーティデータプロバイダーなど) を対象としたワークフローのアウトラインを提供するものです。

バックグラウンドで以下の処理が行われます:
* データプロバイダーは、ローテーションされたソルトバケットの UID2 Operator を監視し、必要に応じて UID2 を更新します。

以下のステップは、広告主やデータプロバイダーが UID2 とインテグレーションする方法の一例です:

1. 広告主またはデータプロバイダーが、同意を得たユーザーの [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) を UID2 Operator に送信します。

   <!-- euid_only_ep_20240312 ("consented" in above line DP only EUID only) -->
   
2. UID2 Operator は、raw UID2 とソルトバケット ID を生成して返します。
3. 広告主またはデータプロバイダーは UID2 とソルトバケット ID を保存し、UID2 ベースのファーストパーティおよびサードパーティのオーディエンスセグメントを DSP に送信します。

   Server-side: 広告主またはデータプロバイダーは、UID2 をマッピングテーブル、DMP、データレイク、またはその他のServer-Sideアプリケーションに格納します。

![Data Provider Workflow](images/UID2AdvertiserAndThirdPartyDataProviderWorkflow.jpg)

## Getting Started

次の手順で始めます:

1. [アクセスリクエスト](/request-access)ページにあるフォームに記入して、UID2へのアクセスをリクエストします。

   担当者が連絡し、ニーズを伺い、適切なステップをアドバイスします。
1. [参加者](../intro.md#participants) の役割を決めます。
1. どの実装オプションを使用するかを決めます。
1. 認証情報を受け取り ([UID2 Credentials](../getting-started/gs-credentials.md) を参照)、選択したオプションのインテグレーションガイドの指示に従います。

   :::note
   UID2 へのリクエストメッセージは必ず暗号化してください。詳細は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md) を参照してください。
   :::
1. テストします。
1. 本番稼働します。

## Implementation Resources

広告主やデータプロバイダーが UID2 を実装するために、以下のドキュメントリソースを利用できます。

| Integration Type| Documentation | Content Description |
| :--- | :--- | :--- |
| ユーザーデータを収集し、他の UID2 参加者にプッシュする組織のためのインテグレーション手順 | [Advertiser/Data Provider Integration Guide](../guides/advertiser-dataprovider-guide.md) | このガイドでは、オーディエンスの構築とターゲティングのために ID をマッピングするインテグレーションワークフローについて説明します。 |
| Snowflake | [Snowflake Integration Guide](../guides/snowflake_integration.md) | このガイドでは、Snowflake を使ってメールアドレスから UID2 を生成する手順を説明します。 |
| AWS Entity Resolution | [AWS Entity Resolution Integration Guide](../guides/integration-aws-entity-resolution.md) | このガイドでは、AWS Entity Resolution を使用して UID2 とインテグレーションする手順を説明します。 |

## FAQs for Data Providers

UID2 フレームワークを使用するデータプロバイダー向けのよくある質問のリストは、[FAQs for Advertisers and Data Providers](../getting-started/gs-faqs.md#faqs-for-advertisers-and-data-providers) を参照してください。
