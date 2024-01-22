---
title: Advertisers
description: 広告主向けの情報の概要。
hide_table_of_contents: false
sidebar_position: 04
use_banner: true
banner_title: 広告主向け UID2 の概要
banner_description: Unified ID 2.0 でキャンペーンのアクティベーションをアップグレードしましょう。
---

広告主として、Unified ID 2.0(UID2) でファーストパーティデータ戦術をアップグレードし、1 つの識別子でデバイスをまたいだオムニチャネルキャンペーンを提供することで、より耐久性のある ID 戦略とより優れたアドレサビリティを実現できます。

UID2 を採用する広告主にとってのメリット、ワークフロー、ドキュメント、その他のリソース、および UID2 の導入手順について説明します。

## Benefits of UID2 for Advertisers

広告戦略の一部として UID2 を使用することで得られる利点の一部を次に示します:
- メディア購入プラットフォームで、プライバシーに配慮した形の CRM データを使用することができます。
- 世帯および個人レベルでの ID 解決を簡素化します。
- チャンネルやデバイスを問わず、フリケンシーや抑制されたオーディエンスを管理します。
- クッキーが存在しないコネクテッド TV やモバイルアプリでの ID ユースケースをサポートします。
- キャンペーンをより総合的にターゲティングし測定します。
- 消費者のプライバシー管理を改善することを目的として、オプトアウトを提供します。

## Workflow for Advertisers

以下のステップは、ユーザーデータを収集し DSP にプッシュする組織 (広告主、ID グラフプロバイダー、サードパーティデータプロバイダーなど) を想定したワークフローのアウトラインを提供するものです。

バックグラウンドで以下の処理が行われます:
* データプロバイダーは、ローテーションされたソルトバケットの UID2 Operator を監視し、必要に応じて UID2 を更新します。

以下のステップは、広告主やデータプロバイダーが UID2 とインテグレーションする方法の一例です:

1. 広告主またはデータプロバイダーが、同意を得たユーザーの [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) を UID2 Operator に送信します。
2. UID2 Operator は、raw UID2 とソルトバケット ID を生成して返します。
3. 広告主またはデータプロバイダーは UID2 とソルトバケット ID を保存し、UID2 ベースのファーストパーティおよびサードパーティのオーディエンスセグメントをDSPに送信します。

      Server-Side: 広告主またはデータプロバイダーは、マッピングテーブル、DMP、データレイク、またはその他のサーバーサイドアプリケーションに UID2 を保存します。

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

## FAQs for Advertisers

UID2 フレームワークを使用する広告主向けのよくある質問については、[FAQs for Advertisers and Data Providers](../getting-started/gs-faqs.md#faqs-for-advertisers-and-data-providers) を参照してください。
