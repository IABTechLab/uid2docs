---
title: Advertiser/Data Provider Integration
sidebar_label: Advertiser/Data Provider Integration Guide
description: ユーザーデータを収集し、それを他の UID2 参加者にプッシュする組織のためのインテグレーション手順。
hide_table_of_contents: false
sidebar_position: 07
---

# Advertiser/Data Provider Integration Guide

このガイドでは、ユーザーデータを収集し、DSP にプッシュする組織のためのインテグレーション手順について説明します。データコレクターには、広告主、データオンボーダー、測定プロバイダー、ID グラフプロバイダー、サードパーティデータプロバイダー、および DSP にデータを送信する他の組織が含まれます。

<!-- It includes the following sections:

* [Integration Steps](#integration-steps)
   - [Retrieve a raw UID2 for DII using the identity map endpoints](#1-retrieve-a-raw-uid2-for-dii-using-the-identity-map-endpoint)
   - [Send stored raw UID2s to DSPs to create audiences](#2-send-stored-raw-uid2s-to-dsps-to-create-audiences)
   - [Monitor for salt bucket rotations related to your stored raw UID2s](#3-monitor-for-salt-bucket-rotations-related-to-your-stored-raw-uid2s)
* [Use an incremental process to continuously update raw UID2s](#use-an-incremental-process-to-continuously-update-raw-uid2s)
* [FAQs](#faqs) -->

Snowflake Data Marketplace でホストされる Open Operator Service を使用する場合は、[Snowflake Integration Guide](../guides/snowflake_integration.md) も参照してください。

## Integration Steps

次の図は、データコレクターがオーディエンスの構築とターゲティングのために [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) を UID2 識別子にマッピングするために完了する必要がある手順の概要を示しています。

DII とは、正規化されたメールアドレスや電話番号、あるいは正規化され SHA-256 ハッシュ化されたメールアドレスや電話番号のことです。

![Advertiser Flow](images/advertiser-flow-mermaid.png)

<!-- diagram source: resource/advertiser-flow-mermaid.md -->

図の各部の詳細については、以下のセクションを参照してください:
1. [Retrieve a raw UID2 for DII using the identity map endpoints](#1-retrieve-a-raw-uid2-for-dii-using-the-identity-map-endpoint)
2. [Send stored raw UID2s to DSPs to create audiences](#2-send-stored-raw-uid2s-to-dsps-to-create-audiences)
3. [Monitor for salt bucket rotations related to your stored raw UID2s](#3-monitor-for-salt-bucket-rotations-related-to-your-stored-raw-uid2s)

### 1: Retrieve a raw UID2 for DII using the identity map endpoint

| Step | Endpoint | Description |
| --- | --- | --- |
| 1-a  | [POST&nbsp;/identity/map](../endpoints/post-identity-map.md)リクエスト | DII を含むリクエストを ID マッピングエンドポイントに送信します。 |
| 1-b | [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) レスポンス | レスポンスで返される `advertising_id` (raw UID2) は、関連する DSP でオーディエンスをターゲティングするために使用できます。<br/>このレスポンスは、ユーザーの raw UID2 と、ソルトバケットに対応する `bucket_id` を返します。バケットに割り当てられたソルトは毎年ローテーションされ、生成される raw UID2 に影響を与えます。ソルトバケットのローテーションをチェックする方法の詳細については、[3: Monitor for salt bucket rotations](#3-monitor-for-salt-bucket-rotations-related-to-your-stored-raw-uid2s) を参照してください。<br/>メンテナンスを簡単にするために、ユーザの raw UID2 と `bucket_id` をマッピングテーブルに格納することを推奨します。インクリメンタルな更新に関するガイダンスについては、[Use an incremental process to continuous-update raw UID2s](#use-an-incremental-process-to-continuously-update-raw-uid2s) を参照してください。|

### 2: Send stored raw UID2s to DSPs to create audiences

Step 1-b で返された `advertising_id` (raw UID2) を、オーディエンスを構築しながら DSP に送信します。各 DSP はオーディエンスを構築するための独自のインテグレーションプロセスを持っています。raw UID2 を送信してオーディエンスを構築するには、DSP が提供するインテグレーションガイダンスに従ってください。

### 3: Monitor for salt bucket rotations related to your stored raw UID2s
raw UID2 は、特定の時点のユーザーに対する識別子です。特定のユーザーの raw UID2 は、ソルトのローテーションの結果、少なくとも 1 年に 1 回は変化します。

ソルトバケットの更新は 1 年に 1 回程度ですが、個々のバケットの更新は 1 年に分散しています。全ソルトバケットの約 1/365 を毎日ローテーションしています。

> IMPORTANT: あなたのインテグレーションが最新の raw UID2 を持っていることを確認するために、アクティブなユーザーのソルトバケットのローテーションを毎日チェックしてください。

| Step | Endpoint | Description |
| --- | --- | --- |
| 3-a  | [POST&nbsp;/identity/buckets](../endpoints/post-identity-buckets.md) | 特定のタイムスタンプ以降に変更されたすべてのソルトバケットについて、バケットステータスエンドポイントにリクエストを送信します。 |
| 3-b  | [POST&nbsp;/identity/buckets](../endpoints/post-identity-buckets.md) | UID2 service: バケットステータスエンドポイントは、 `bucket_id` と `last_updated` のタイムスタンプのリストを返します。 |
| 3-c  | [POST&nbsp;/identity/map](../endpoints/post-identity-map.md)         | 返された`bucket_id`を、キャッシュしておいた raw UID2 のソルトバケットと比較します。<br/>1 つ以上の raw UID2 についてソルトバケットが更新されていることがわかったら、新しい raw UID2 について ID マッピングサービスに DII を再送信します。 |
| 3-d  | [POST&nbsp;/identity/map](../endpoints/post-identity-map.md)         | `advertising_id`と`bucket_id`に返された新しい値を保存します。 |

## Use an Incremental Process to Continuously Update Raw UID2s

UID2 ベースのオーディエンス情報を正確かつ最新の状態に保つために、毎日以下のインテグレーション手順を実行してください:

1.  [UID2 retrieval step](#1-retrieve-a-raw-uid2-for-dii-using-the-identity-map-endpoint) のレスポンスにはマッピング情報が含まれています。以下をキャッシュします:
   - DII (`identifier`) と raw UID2 (`advertising_id`) とソルトバケット (`bucket_id`) のマッピング。
   - 最新の `last_updated` タイムスタンプ。
2. Step 3の結果を使用して、[Monitor for salt bucket rotations related to your stored raw UID2s](#3-monitor-for-salt-bucket-rotations-related-to-your-stored-raw-uid2s)、 Step1 の [Retrieve a raw UID2 for DII using the identity map endpoint](#1-retrieve-a-raw-uid2-for-dii-using-the-identity-map-endpoint) に従って、ソルトバケットがローテーションされた ID の新しい raw UID2 を取得して、ソルトバケットの raw UID2 を再マッピングします。

   次に、Step 2の[send raw UID2 to a DSP](#2-send-stored-raw-uid2s-to-dsps-to-create-audiences) に従って、リフレッシュされた UID2 を使ってオーディエンスを更新します。

## FAQs

UID2 フレームワークを使用する広告主およびデータプロバイダー向けのよくある質問は、[FAQs for Advertisers and Data Providers](../getting-started/gs-faqs.md#faqs-for-advertisers-and-data-providers) を参照してください。
