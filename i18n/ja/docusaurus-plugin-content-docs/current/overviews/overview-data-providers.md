---
title: Data Providers
description: データプロバイダー向けの情報の概要。
hide_table_of_contents: false
sidebar_position: 08
use_banner: true
banner_title:  データプロバイダー向け UID2 の概要
banner_description: 未来のためのIDソリューション。
---

データおよび測定プロバイダーは、Unified ID 2.0 を採用してデータをより耐久性のある、オムニチャネルおよびクロスデバイスの識別子で接続し、顧客のユースケースを満たすことによって、ID の断片化を減らすことができます。

以下のセクションでは、UID2 を採用するデータプロバイダー向けのワークフロー、インテグレーションタイプ、ドキュメントを説明します。


## Audience

このページは、オンラインまたはオフライン広告のデータまたは関連サービスを提供するパートナー（以下のプロバイダーなど）を対象としています：
- データオンボーディング
- サードパーティオーディエンス
- アイデンティティーの解決とグラフ
- 測定とアトリビューション

## Benefits of UID2 for Data Providers

UID2 を使用するデータプロバイダーが得られるメリットの一部を次に示します:
- 消費者のプライバシーを管理するためのオプトアウトを提供する、よりプライバシーに配慮した識別子にアップグレードすることができます。
- 解決、活性化、測定のためのプラットフォームとチャネル間の接続 ID スレッドの使用を促進します。
- 広告主が決定論的な　ID　を使用して、オーディエンス・セグメントを将来にわたって保護することを目指します。
- オンラインとオフラインのデータを共通の ID で接続し、より精度の高いものを目指します。
- サードパーティクッキーの有無にかかわらず、キャンペーンをより正確に測定します。

## Resources

データプロバイダーが UID2 を実装するために、以下のドキュメントリソースを利用できます。

| Integration Type| Documentation | Content Description | Audience |
| :--- | :--- | :--- | :--- |
| インテグレーションガイド | [Advertiser/Data Provider Integration Guide](../guides/advertiser-dataprovider-guide.md) | 広告主とデータプロバイダーのためのインテグレーションガイドで、オーディエンスの構築とターゲティングのための ID マッピングのためのインテグレーションワークフローを網羅しています。 | Advertisers<br/>Data Providers |
| Snowflake | [Snowflake Integration Guide](../guides/snowflake_integration.md) | Snowflakeでメールアドレスから UID を生成する手順です。 | Advertisers<br/>Data Providers |

## Workflow for Data Providers

以下の図は、データプロバイダー向けの UID2 ワークフローです。

![Data Provider Workflow](../workflows/images/UID2AdvertiserAndThirdPartyDataProviderWorkflow.jpg)

## Getting Started

次の手順で始めます:

1. [アクセスリクエスト](/request-access)ページにあるフォームに記入して、UID2へのアクセスをリクエストします。

   担当者が連絡し、ニーズを伺い、適切なステップをアドバイスします。
1. [参加者](../intro.md#participants)の役割を決めます。
1. どの実装オプションを使用するかを決めます。
1. 1. 認証情報を受け取り（[API keys](../getting-started/gs-api-keys.md) を参照）、選択したオプションのインテグレーションガイドの指示に従います。

    Note：リクエストメッセージは必ずUID2まで暗号化してください。詳細は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md)を参照してください。
1. テストします。
1. 本番稼働します。

## Frequently Asked Questions for Data Providers

UID2 フレームワークを使用するデータプロバイダー向けのFAQ一覧は、[広告主およびデータプロバイダー向けFAQ](../getting-started/gs-faqs.md#faqs-for-advertisers-and-data-providers) をを参照してください。


すべてのリストは、[よくある質問](../getting-started/gs-faqs.md)を参照してください。