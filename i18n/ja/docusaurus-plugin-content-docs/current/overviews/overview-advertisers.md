---
title: Advertisers
description: 広告主向けの情報の概要。
hide_table_of_contents: false
sidebar_position: 04
use_banner: true
banner_title: 広告主向け UID2 の概要
banner_description: Unified ID 2.0 でキャンペーンのアクティベーションをアップグレードしましょう。
---

広告主は、Unified ID 2.0によってファーストパーティデータ戦術をアップグレードし、1つの識別子でデバイスをまたいだオムニチャネルキャンペーンを実現できます。

以下のセクションでは、UID2 を採用する広告主にとってのメリット、ワークフロー、ドキュメント、その他のリソースに関する情報を提供します。

## Audience

このページは、ファーストパーティデータを活用して、より耐久性のあるアイデンティティ戦略や、より優れたアドレサビリティを実現したい広告主向けのページです。

## Benefits of UID2 for Advertisers

広告戦略の一部として UID2 を使用することで得られるメリットの一部を次に示します:
- メディア購入プラットフォームで、プライバシーに配慮した形の CRM データを使用することができます。
- 世帯および個人レベルでの ID 解決を簡素化します。
- チャンネルやデバイスを問わず、フリケンシーや抑制されたオーディエンスを管理します。
- クッキーが存在しないコネクテッドTVやモバイルアプリでの ID ユースケースをサポートします。
- キャンペーンをより総合的にターゲットし測定します。
- 消費者のプライバシー管理を改善することを目的として、オプトアウトを提供します。


## Resources

広告主が UID2 を実装するために、以下のドキュメントリソースを用意しています。

| Integration Type| Documentation | Content Description | Audience |
| :--- | :--- | :--- | :--- |
| ユーザーデータを収集し、それを他の UID2 参加者にプッシュする組織のためのインテグレーション手順 | [Advertiser/Data Provider Integration Guide](../guides/advertiser-dataprovider-guide.md) | 広告主とデータプロバイダーのためのインテグレーションガイドで、オーディエンスの構築とターゲティングのための ID マッピングのためのインテグレーションワークフローをカバーしています。 | Advertisers<br/>Data Providers |
| Snowflake | [Snowflake Integration Guide](../guides/snowflake_integration.md) | Snowflakeでメールアドレスから UID2 を生成する手順です。 | Advertisers,<br/>Data Providers |

## Workflow for Advertisers

以下のステップは、ユーザーデータを収集し DSP にプッシュする組織 (広告主、ID グラフプロバイダー、サードパーティデータプロバイダーなど) を想定したワークフローのアウトラインを提供するものです。

バックグラウンドで以下の処理が行われます:
* データプロバイダーは、ローテーションされたソルトバケットの UID2 Operator を監視し、必要に応じて UID2 を更新します。

以下のステップは、広告主やデータプロバイダーが UID2 とインテグレーションする方法の一例です:

1. データプロバイダーが、同意を得たユーザーの [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) を UID2 Operator に送信します。
2. UID2 Operator は、raw UID2 とソルトバケット ID を生成して返します。
3. データプロバイダーは UID2 とソルトバケット ID を保存し、UID2 ベースのファーストパーティおよびサードパーティのオーディエンスセグメントをDSPに送信します。
4. データプロバイダーは、行動規範で定義された許可されたトランスポートプロトコルを使用して、UID2 を DSP に送信します。
5. データプロバイダーは、UID2 Operator がローテーションしたソルトバケットを監視し、必要に応じて UID2 を更新します。

![Data Provider Workflow](images/UID2AdvertiserAndThirdPartyDataProviderWorkflow.jpg)

<!-- ## Integration Requirements

ユーザーの DII から UID2 を生成するためには、サードパーティデータプロバイダーは以下の要件を満たしている必要があります。

- UID2 Operator とインテグレーションして UID2 を生成し、ソルトバケットのローテーションを処理すること。
- UID2 Operator の API にアクセスできること。<br/>広告主によっては、CDP、データオンボーダー、またはその他のサービスプロバイダーを経由する場合もあります。

詳細は、[Advertiser/Data Provider Integration Guide](/guides/advertiser-dataprovider-guide.md) を参照してください。 -->

## Getting Started

次の手順で始めます:

1. [アクセスリクエスト](/request-access)ページにあるフォームに記入して、UID2へのアクセスをリクエストします。

   担当者が連絡し、ニーズを伺い、適切なステップをアドバイスします。
1. [参加者](../intro.md#participants)の役割を決めます。
1. どの実装オプションを使用するかを決めます。
1. 認証情報を受け取り ([UID2 Credentials](../getting-started/gs-credentials.md) を参照)、選択したオプションのインテグレーションガイドの指示に従います。

     Note: リクエストメッセージは必ずUID2まで暗号化してください。詳細は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md)を参照してください。
1. テストします。
1. 本番稼働します。

## Resources

広告主が UID2 を実装するために、以下のドキュメントリソースが利用可能です。

|                                        Integration Type                                        |                                       Documentation                                       |                                                                                        Content Description                                                                                         |            Audience             |
| :--------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------ |
| ユーザーデータを収集し、それを他の UID2 参加者にプッシュする組織のためのインテグレーション手順 | [Advertiser/Data Provider Integration Guide](../guides/advertiser-dataprovider-guide.md)  | 広告主とデータプロバイダーのためのこのインテグレーションガイドは、オーディエンスの構築とターゲティングのためのアイデンティティマッピングのためのインテグレーションワークフローをカバーしています。 | Advertisers,<br/>Data Providers |
| Snowflake                                                                                      | [Snowflake Integration Guide](../guides/snowflake_integration.md)                         | Snowflake でメールアドレスから UID2 を生成する手順です。                                                                                                                                           | Advertisers,<br/>Data Providers |
| AWS Entity Resolution                                                                          | [AWS Entity Resolution Integration Guide](../guides/integration-aws-entity-resolution.md) | AWS Entity Resolution を使用して UID2 フレームワークとインテグレーションする手順です。                                                                                                             | Advertisers,<br/>Data Providers |

<!-- ## Integration Requirements
To generate UID2s from users' DII, third-party data providers must meet the following requirements:
- Integrate with a UID2 Operator to generate UID2s and handle salt bucket rotations.
- Have access to the UID2 Operator APIs.<br/>Some advertisers may choose to work through CDPs, data on-boarders, or other service providers instead.
For details, see [Advertiser/Data Provider Integration Guide](../guides/advertiser-dataprovider-guide.md). -->

## FAQs for Advertisers

UID2 フレームワークを使用する広告主向けのよくある質問については、[FAQs for Advertisers and Data Providers](../getting-started/gs-faqs.md#faqs-for-advertisers-and-data-providers) を参照してください。