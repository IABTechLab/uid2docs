---
title: Advertiser/Data Provider Integration Overview
sidebar_label: Advertiser/Data Provider Integration Overview
description: ユーザーデータを収集し、他の参加者に送信する組織向けのインテグレーションオプションの概要。
hide_table_of_contents: false
sidebar_position: 07
displayed_sidebar: sidebarAdvertisers
---

import Link from '@docusaurus/Link';

# Advertiser/Data Provider Integration Overview

このガイドは、ユーザーデータを収集し、他の UID2 参加者に送信する組織向けのインテグレーションオプションの概要を提供します。データ収集者には、広告主、データオンボーダー、測定プロバイダー、ID グラフプロバイダー、サードパーティデータプロバイダー、およびその他のデータを他の参加者に送信する組織が含まれます。

## Advertiser/Data Provider Routes to Use UID2

アドテクノロジー業界では、広告主はアイデンティティを使用してオーディエンスを構築し、コンバージョンを追跡し、グラフを生成します。広告主として、または広告主に代わって行動するデータプロバイダーとして、以下の表は UID2 を使用してこれらの目標の一部を達成する方法の例を示しています。

:::note
UID2 は、これらのユースケース以外でも使用できます。これらは一部の例に過ぎません。
:::

| Send/Receive? | Action | Advantage/Result |
| --- | --- | --- |
| オーディエンスを送信 | API またはピクセルを介して raw UID2 を送信 | オーディエンスを作成します。 |
| コンバージョンを送信 | コンバージョン情報として raw UID2 を送信 | コンバージョン情報を計測（アトリビューション）または API やピクセルを介してリターゲティングに使用します。 |
| グラフデータを受信 | API またはピクセルを介してグラフ/データプロバイダーから raw UID2 を受信 | グラフデータを構築します。 |

## High-Level Steps

UID2 とインテグレーションする広告主とデータプロバイダーのインテグレーション手順は、次のとおりです。

1. [Generate Raw UID2s from DII](#1-generate-raw-uid2s-from-dii)

2. [Store Raw UID2s and Refresh Timestamps](#2-store-raw-uid2s-and-refresh-timestamps)

3. [Manipulate or Combine Raw UID2s](#3-manipulate-or-combine-raw-uid2s)

4. [Send Stored Raw UID2s to DSPs to Create Audiences or Conversions](#4-send-stored-raw-uid2s-to-dsps-to-create-audiences-or-conversions)

5. [Monitor for Raw UID2 Refresh](#5-monitor-for-raw-uid2-refresh)

6. [Monitor for Opt-Out Status](#6-monitor-for-opt-out-status)

:::note
[POST&nbsp;/identity/map](../endpoints/post-identity-map.md) エンドポイントのバージョン 3 より前のバージョンを使用している場合は、[Using POST /identity/map Version 2](#using-post-identitymap-version-2) を参照してください。このバージョンを使用している場合は、強化された機能を利用するためにできるだけ早くアップグレードすることを推奨します。
:::

## Summary of Implementation Options

以下の表は、広告主とデータプロバイダー向けの実装オプションを、各レベルのステップごとに示しています。一部のステップは、独自のカスタム実装の一部としてのみ管理されます。一部のステップは、利用可能な UID2 実装オプションの 1 つ以上によって管理できます。詳細は、各ステップのリンクをクリックしてください。

| High-Level Step | Implementation Options |
| --- | --- |
| [1: Generate Raw UID2s from DII](#1-generate-raw-uid2s-from-dii) | DII を raw UID2 にマップするには、次のいずれかのぷションを利用します:<ul><li>UID2 SDK のいずれか:<ul><li>Python SDK: [Map DII to Raw UID2s](../sdks/sdk-ref-python.md#map-dii-to-raw-uid2s)</li><li>Java SDK: [Usage for Advertisers/Data Providers](../sdks/sdk-ref-java.md#usage-for-advertisersdata-providers)</li></ul></li><li>Snowflake: [Map DII](integration-snowflake.md#map-dii)</li><li>AWS Entity Resolution: [AWS Entity Resolution Integration Guide](integration-aws-entity-resolution.md)</li><li>HTTP endpoints: [POST&nbsp;/identity/map](../endpoints/post-identity-map.md)</li></ul> |
| [2: Store Raw UID2s and Refresh Timestamps](#2-store-raw-uid2s-and-refresh-timestamps) | カスタム（必要に応じて） |
| [3: Manipulate or Combine Raw UID2s](#3-manipulate-or-combine-raw-uid2s) | カスタム（必要に応じて） |
| [4: Send Stored Raw UID2s to DSPs to Create Audiences or Conversions](#4-send-stored-raw-uid2s-to-dsps-to-create-audiences-or-conversions) | カスタム（必要に応じて） |
| [5: Monitor for Raw UID2 Refresh](#5-monitor-for-raw-uid2-refresh) | [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) エンドポイントから返されるリフレッシュタイムスタンプ（`r` フィールド）を使用して、Raw UID2 を更新するタイミングを判断します。 |
| [6: Monitor for Opt-Out Status](#6-monitor-for-opt-out-status) | [POST /optout/status](../endpoints/post-optout-status.md) エンドポイントへの API コール。 |

## Integration Diagram

以下の図は、データ収集者がオーディエンスの構築とターゲティングのために DII を raw UID2 にマッピングするために完了する必要があるステップを概説しています。

DII とは、ユーザーの正規化されたメールアドレスまたは電話番号、または正規化されて SHA-256 ハッシュ化されたメールアドレスまたは電話番号を指します。

UID2 ベースのオーディエンス情報を正確かつ最新の状態に保つには、これらのインテグレーションステップを毎日実行してください。

![Advertiser Flow](images/advertiser-flow-overview-mermaid-v3.png)

<!-- diagram source: resource/advertiser-flow-overview-v3-mermaid.mermaid -->

図の各部分の詳細は、以下のセクションを参照してください。

### 1: Generate Raw UID2s from DII

<Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> から raw UID2 を生成するか、データプロバイダーなどの他の UID2 参加者から UID2 を受信できます。

raw UID2 を生成するには、次のいずれかのオプションを使用します:

- UID2 SDK のいずれか:

  - Python SDK: See [Map DII to Raw UID2s](../sdks/sdk-ref-python.md#map-dii-to-raw-uid2s).
  - Java SDK: See [Usage for Advertisers/Data Providers](../sdks/sdk-ref-java.md#usage-for-advertisersdata-providers).

- Snowflake: [Map DII](integration-snowflake.md#map-dii) を参照してください。

- AWS Entity Resolution: [AWS Entity Resolution Integration Guide](integration-aws-entity-resolution.md) を参照してください。

- HTTP endpoints: [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) を参照してください。詳細は、[Generate Raw UID2s from DII](integration-advertiser-dataprovider-endpoints.md#1-generate-raw-uid2s-from-dii) を参照してください。

### 2: Store Raw UID2s and Refresh Timestamps

Step 1 [Generate Raw UID2s from DII](#1-generate-raw-uid2s-from-dii) のレスポンスには、マッピング情報が含まれています。Step 1 で返される以下の情報を保存することを推奨します:

- DII と raw UID2 (`u` フィールド) のマッピングをキャッシュします。
- リフレッシュタイムスタンプ (`r` フィールド) を保存して、raw UID2 がいつリフレッシュされるかを把握します。
- オプションで、過去 90 日以内に UID2 がリフレッシュされたユーザーのために提供された場合は、前の raw UID2 (`p` フィールド) を保存します。

### 3: Manipulate or Combine Raw UID2s

Step 1 で受け取った raw UID2 を使用します。たとえば、以下を行うことができます:

- 何らかの操作を行う: たとえば、DII から生成した raw UID2 と、広告主やデータプロバイダーなどの他の参加者から受け取った raw UID2 を組み合わせます。
- 新しい raw UID2 を既存のオーディエンスに追加します。

### 4: Send Stored Raw UID2s to DSPs to Create Audiences or Conversions

raw UID2 を次の目的で使用します:

   - 保存された raw UID2 を DSP に送信して、オーディエンスやコンバージョンを作成します。
   - 測定のために raw UID2 を使用します。

たとえば、Step 1 で返された (<Link href="../ref-info/glossary-uid#gl-raw-uid2">raw UID2</Link> (`u` フィールド)) を DSP に送信してオーディエンスを構築することができます。各 DSP にはオーディエンスを構築するための独自のインテグレーションプロセスがあるため、raw UID2 を送信してオーディエンスを構築するためのインテグレーションガイダンスに従ってください。

コンバージョン情報を API またはピクセルを介して送信して、測定 (アトリビューション) またはリターゲティングを行うこともできます。

### 5: Monitor for Raw UID2 Refresh

raw UID2 は、特定の時点でのユーザーの識別子です。特定のユーザーの raw UID2 は、UID2 リフレッシュプロセスの一環として、約 1 年に 1 回変更されます。

V3 Identity Map API は、各 raw UID2 がいつリフレッシュされるかを示すリフレッシュタイムスタンプ (`r` フィールド) をレスポンスで提供します。このタイムスタンプを使用して、保存されたデータの raw UID2 を再生成するタイミングを判断します。この時刻より前にリフレッシュされないことが保証されています。

リフレッシュのタイミングを毎日確認することを推奨します。raw UID2 をリフレッシュするかどうかを判断するには、次の手順に従います:

1. 現在の時刻と[POST&nbsp;/identity/map](../endpoints/post-identity-map.md) レスポンスから保存したリフレッシュタイムスタンプ (`r` フィールド) を比較します。

2. If the current time is greater than or equal to the refresh timestamp, regenerate the raw UID2 by calling [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) again with the same DII.

このアプローチにより、raw UID2 が最新かつ有効であり、オーディエンスのターゲティングや測定に使用できることが保証されます。

### 6: Monitor for Opt-Out Status

ユーザーのオプトアウトステータスを受け入れることは重要です。定期的にオプトアウトステータスを監視し、最近オプトアウトしたユーザーの raw UID2 を使用し続けないようにします。

UID2 <Link href="../ref-info/glossary-uid#gl-operator-service">Operator Service</Link> で最新のオプトアウト情報を確認するには、次の 2 つの方法があります:

- [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) エンドポイントを呼び出してオプトアウトを確認します。DII がオプトアウトされている場合、raw UID2 は生成されません。

- [POST&nbsp;/optout/status](../endpoints/post-optout-status.md) エンドポイントを使用して raw UID2 のオプトアウトステータスを確認します。

UID2 オプトアウトワークフローの詳細や、ユーザーがオプトアウトする方法は、[User Opt-Out](../getting-started/gs-opt-out.md) を参照してください。

## Using POST /identity/map Version 2

:::note
以下の情報は、`POST /identity/map` エンドポイントの以前のバージョン 2 を使用するインテグレーションアプローチにのみ関連し、参照用に提供されています。新しい実装では最新バージョンを使用する必要があります: [High-Level Steps](#high-level-steps) を参照してください。
:::

Identity Map API のバージョン 2 を使用する場合の主な違いは次のとおりです:

- **Step 2**: ソルトバケット ID を保存する代わりにリフレッシュタイムスタンプを保存します
- **Step 5**: ソルトバケットのローテーションを監視する代わりにリフレッシュタイムスタンプを使用します

他のすべてのステップ (1, 3, 4, および 6) は、v3 実装で説明されているとおりです: [High-Level Steps](#high-level-steps) を参照してください。

### Integration Diagram (v2)

以下の図は、v2 インテグレーションフローを概説しています。主な違いは、Step 2（ソルトバケット ID の保存）と Step 5（ソルトバケットのローテーションの監視）にあります。

![Advertiser Flow](images/advertiser-flow-overview-mermaid.png)

<!-- diagram source: resource/advertiser-flow-overview-v2-mermaid.md.bak -->

### Store Raw UID2s and Salt Bucket IDs (v2)

:::note
このステップは、v3 実装の Step 2 を置き換えます。
:::

Step 1 のレスポンスには、マッピング情報が含まれています。Step 1 で返される以下の情報を保存することを推奨します:

- DII (`identifier`) と raw UID2 (`advertising_id`) とソルトバケット (`bucket_id`) のマッピングを保存します。
- レスポンスデータを受信したタイムスタンプを保存します。後で、このタイムスタンプを Step 5 で返される `last_updated` タイムスタンプと比較できます。

### Monitor for Salt Bucket Rotations for Your Stored Raw UID2s (v2)

:::note
このステップは、v3 実装の Step 5 を置き換えます。
:::

raw UID2 は特定の時点でのユーザーの識別子です。特定のユーザーの raw UID2 は、<Link href="../ref-info/glossary-uid#gl-salt-bucket">salt bucket</Link>のローテーションの結果として、約 1 年に 1 回変更されます。

各ソルトバケットは約 1 年に 1 回更新されますが、個々のバケットの更新は年間を通じて分散されます。おおよそ 365 分の 1 のソルトバケットが毎日ローテーションされます。これに基づいて、オーディエンスの更新に合わせて定期的にソルトバケットのローテーションを確認することを推奨します。たとえば、毎週更新する場合は、毎週ソルトバケットの更新を確認します。

ソルトバケットがローテーションされた場合は、raw UID2 を再生成します。詳細は、[Determine whether the salt bucket has been rotated](#determine-whether-the-salt-bucket-has-been-rotated-v2) を参照してください。

ソルトバケットのローテーションを監視する手順は、以下のいずれかを参照してください:

- Python SDK: [Monitor Rotated Salt Buckets](../sdks/sdk-ref-python.md#monitor-rotated-salt-buckets)

- Snowflake: [Monitor for Salt Bucket Rotation and Regenerate Raw UID2s](integration-snowflake-previous#monitor-for-salt-bucket-rotation-and-regenerate-raw-uid2s)

- HTTP endpoints: [Monitor for Salt Bucket Rotations for Your Stored Raw UID2s (v2)](integration-advertiser-dataprovider-endpoints.md#monitor-for-salt-bucket-rotations-for-your-stored-raw-uid2s-v2)

<!-- GWH_Note 8/4/25 I took the .md out of the Snowflake link line 194 because Docu would not build it correctly... broken link in output. Do not know why, though. Same thing on 2 links -->

:::note
AWS Entity Resolution では、ソルトバケットの監視を行う方法はありません。代わりに、AWS Entity Resolution サービスを使用して定期的に raw UID2 を再生成することができます。
:::

##### Determine whether the salt bucket has been rotated (v2)

特定の raw UID2 のソルトバケット ID が変更されたかどうかを判断するには、次の手順に従います。

1. 2 つの値を比較します:

  - ソルトバケットのローテーションを監視する際に返される各 `bucket_id` の `last_updated` タイムスタンプ。

  - 同じ `bucket_id` の raw UID2 生成のタイムスタンプ。これは Step 1 で返され、Step 2 で保存したものです。

1. `last_updated` タイムスタンプが、先ほど記録したタイムスタンプよりも新しい場合、ソルトバケットがローテーションされています。その結果、この `bucket_id` に関連付けられているすべての raw UID2 を、Step1 [Generate Raw UID2s from DII](#1-generate-raw-uid2s-from-dii) に従って再生成する必要があります。

## FAQs

UID2 フレームワークを使用する広告主とデータプロバイダー向けのよくある質問のリストは、[FAQs for Advertisers and Data Providers](../getting-started/gs-faqs.md#faqs-for-advertisers-and-data-providers) を参照してください。
