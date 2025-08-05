---
title: Advertiser/Data Provider Integration Overview
sidebar_label: Advertiser/Data Provider Integration Overview
description: ユーザーデータを収集し、他の参加者にプッシュする組織向けのインテグレーションオプションの概要。
hide_table_of_contents: false
sidebar_position: 07
displayed_sidebar: sidebarAdvertisers
---

import Link from '@docusaurus/Link';

# Advertiser/Data Provider Integration Overview

このガイドでは、ユーザーデータを収集し、他のUID2参加者にプッシュする組織（データコレクター）向けのインテグレーションオプションの概要を説明します。データコレクターには、広告主、データオンボーダー、測定プロバイダー、IDグラフプロバイダー、サードパーティーデータプロバイダー、およびデータを他の参加者に送信するその他の組織が含まれます。

## Advertiser/Data Provider Routes to Use UID2

広告テクノロジー業界では、広告主はアイデンティティを使用してオーディエンスを構築し、コンバージョンを追跡し、グラフを生成します。広告主として、または広告主に代わって行動するデータプロバイダーとして、UID2を使用してこれらの目標の一部を達成する方法の例を以下の表に示します。

:::note
UID2 は、これらのユースケース以外でも使用できます。これらは一部の例にすぎません。
:::

| Send/Receive? | Action | Advantage/Result |
| --- | --- | --- |
| オーディエンスを送信する | API やピクセルを介して raw UID2 を送信します。 | オーディエンスを作成します。 |
| コンバージョンを送信する | raw UID2 をコンバージョン情報として送信します。 | コンバージョン情報を測定（アトリビューション）や、API やピクセルを介してリターゲティングに利用できます。 |
| グラフデータを受信する | API やピクセルを介してグラフ/データプロバイダーから raw UID2 を受信します。 | グラフデータを構築します。 |

## High-Level Steps

UID2 とインテグレーションするための広告主とデータプロバイダーの手順は、次のとおりです:

1. [Generate Raw UID2s from DII](#1-generate-raw-uid2s-from-dii)

2. [Store Raw UID2s and Refresh Timestamps](#2-store-raw-uid2s-and-refresh-timestamps)

3. [Manipulate or Combine Raw UID2s](#3-manipulate-or-combine-raw-uid2s)

4. [Send Stored Raw UID2s to DSPs to Create Audiences or Conversions](#4-send-stored-raw-uid2s-to-dsps-to-create-audiences-or-conversions)

5. [Monitor for Raw UID2 Refresh](#5-monitor-for-raw-uid2-refresh)

6. [Monitor for Opt-Out Status](#6-monitor-for-opt-out-status)

:::note
実装で [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) エンドポイントのバージョン 3 より前のバージョンを使用している場合は、[Using POST /identity/map Version 2](#using-post-identitymap-version-2) を参照してください。このバージョンを使用している場合は、強化された機能を利用するためにできるだけ早くアップグレードすることを推奨します。
:::

## Summary of Implementation Options

以下の表は、広告主とデータプロバイダーが利用できる実装オプションを、ステップごとにまとめたものです。一部のステップは、独自のカスタム実装の一部としてのみ管理されます。一部のステップは、利用可能な UID2 実装オプションの 1 つ以上によって管理できます。詳細については、各ステップのリンクをクリックしてください。

| High-Level Step | Implementation Options |
| --- | --- |
| [1: Generate Raw UID2s from DII](#1-generate-raw-uid2s-from-dii) | DII を raw UID2 にマッピングするには、以下のオプションのいずれかをします:<ul><li>以下の UID2 SDK のいずれか:<ul><li>Python SDK: [DII を Raw UID2 にマッピング](../sdks/sdk-ref-python.md#map-dii-to-raw-uid2s)</li><li>Java SDK: [広告主/データプロバイダー向けの使用法](../sdks/sdk-ref-java.md#usage-for-advertisersdata-providers)</li></ul></li><li>Snowflake: [DII をマッピング](integration-snowflake.md#map-dii)</li><li>AWS Entity Resolution: [AWS Entity Resolution インテグレーションガイド](integration-aws-entity-resolution.md)</li><li>HTTP エンドポイント: [POST&nbsp;/identity/map (v2)](../endpoints/post-identity-map-v2.md)</li></ul> |
| [2: Store Raw UID2s and Salt Bucket IDs](#2-store-raw-uid2s-and-salt-bucket-ids) | カスタム（適切な方法で）。 |
| [3: Manipulate or Combine Raw UID2s](#3-manipulate-or-combine-raw-uid2s) | カスタム（適切な方法で）。 |
| [4: Send Stored Raw UID2s to DSPs to Create Audiences or Conversions](#4-send-stored-raw-uid2s-to-dsps-to-create-audiences-or-conversions) | カスタム（適切な方法で）。 |
| [5: Monitor for Salt Bucket Rotations for Your Stored Raw UID2s](#5-monitor-for-salt-bucket-rotations-for-your-stored-raw-uid2s) | 以下のいずれかのオプションを使用してください:<ul><li><strong>Python SDK</strong>: Python Reference Guide を参照してください</li><li><strong>Snowflake</strong>: [Snowflake Integration Guide](integration-snowflake.md) の [Monitor for Salt Bucket Rotation and Regenerate Raw UID2s](integration-snowflake.md#monitor-for-salt-bucket-rotation-and-regenerate-raw-uid2s) を参照してください</li><li><strong>Raw HTTP endpoint</strong>: [POST&nbsp;/identity/buckets](../endpoints/post-identity-buckets.md)</li></ul> |
| [6: Monitor for Opt-Out Status](#6-monitor-for-opt-out-status) | API コールを使用して、[POST /optout/status](../endpoints/post-optout-status.md) エンドポイントにアクセスします。 |

## Integration Diagram

次の図は、オーディエンスの構築とターゲティングのために、DII を raw UID2 にマッピングするためにデータ収集者が行わなければならない手順です。

DII は、ユーザーの正規化されたメールアドレスまたは電話番号、または正規化および SHA-256 ハッシュ化されたメールアドレスまたは電話番号を指します。

UID2 ベースのオーディエンス情報を正確かつ最新の状態に保つため、以下のインテグレーションステップを毎日実行してください。

![Advertiser Flow](images/advertiser-flow-overview-mermaid-v3.png)

<!-- diagram source: resource/advertiser-flow-overview-v3-mermaid.mermaid -->

図のそれぞれの部分に関する詳細については、以下の各セクションを参照してください。

### 1: Generate Raw UID2s from DII

raw UID2 は <Link href="../ref-info/glossary-uid#gl-dii">直接識別情報 (DII)</Link> から生成できます。DII は、ユーザーの正規化されたメールアドレスまたは電話番号、または正規化および SHA-256 ハッシュ化されたメールアドレスまたは電話番号を指します。

raw UID2 を生成するには、次のいずれかのオプションを使用します:

- UID2 SDK のいずれか:

  - Python SDK: [Map DII to Raw UID2s](../sdks/sdk-ref-python.md#map-dii-to-raw-uid2s) を参照してください。
  - Java SDK: [Usage for Advertisers/Data Providers](../sdks/sdk-ref-java.md#usage-for-advertisersdata-providers) を参照してください。

- Snowflake: [Map DII](integration-snowflake.md#map-dii) を参照してください。

- AWS Entity Resolution: [AWS Entity Resolution Integration Guide](integration-aws-entity-resolution.md) を参照してください。

- HTTP endpoints: [POST&nbsp;/identity/map](../endpoints/post-identity-map.md)。詳細は [Generate Raw UID2s from DII](integration-advertiser-dataprovider-endpoints.md#1-generate-raw-uid2s-from-dii) を参照してください。

### 2: Store Raw UID2s and Refresh Timestamps

Step 1 の [Generate Raw UID2s from DII](#1-generate-raw-uid2s-from-dii) のレスポンスには、マッピング情報が含まれています。Step 1 で返される次の情報を保存することを推奨します:

- DII と raw UID2 (`u` フィールド) のマッピングをキャッシュします。
- リフレッシュタイムスタンプ (`r` フィールド) を保存して、raw UID2 がいつリフレッシュできるかを把握します。
- オプションで、UID2 が過去 90 日以内にリフレッシュされたユーザーのために提供された場合は、前の raw UID2 (`p` フィールド) を保存します。

### 3: Manipulate or Combine Raw UID2s

Step 1 で受け取った raw UID2 を使用します。たとえば、次のような操作を行うことができます:

- いくつかの操作を行います: たとえば、DII から生成した raw UID2 と、広告主やデータプロバイダーなどの別の参加者から受け取った raw UID2 を組み合わせます。
- 新しい raw UID2 を既存のオーディエンスに追加します。

### 4: Send Stored Raw UID2s to DSPs to Create Audiences or Conversions

raw UID2 は、次のような目的で使用できます:

   - 保存された raw UID2 を DSP に送信して、オーディエンスやコンバージョンを作成します。
   - 計測（アトリビューション）のために raw UID2 を使用します。

たとえば、Step 1 で返された (<Link href="../ref-info/glossary-uid#gl-raw-uid2">raw UID2</Link> (`u` フィールド)) を DSP に送信してオーディエンスを構築することができます。各 DSP にはオーディエンスを構築するための独自のインテグレーションプロセスがあるため、オーディエンスを構築するために raw UID2 を送信する際は、DSP が提供するインテグレーションガイダンスに従ってください。

コンバージョン情報を API またはピクセルを介して送信し、測定 (アトリビューション) やリターゲティングに使用することもできます。

### 5: Monitor for Raw UID2 Refresh

raw UID2 は、特定の時点でのユーザーの識別子です。特定のユーザーの raw UID2 は、UID2 リフレッシュプロセスの一環として、約 1 年に 1 回変更されます。

v3 Identity Map API は、各 raw UID2 がいつリフレッシュされるかを示すリフレッシュタイムスタンプ (`r` フィールド) をレスポンスで提供します。このタイムスタンプを使用して、保存されたデータの raw UID2 を再生成するタイミングを判断します。指定された時間より前にリフレッシュされないことが保証されています。

リフレッシュの機会は毎日確認することを推奨します。raw UID2 をリフレッシュするかどうかを判断するには、次の手順に従います:

1. 現在の時刻と、[POST&nbsp;/identity/map](../endpoints/post-identity-map.md) レスポンスから保存したリフレッシュ タイムスタンプ (`r` フィールド) を比較します。

2. 現在の時刻がリフレッシュ タイムスタンプ以降である場合、同じ DII で [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) を再度呼び出して raw UID2 を再生成します。

- Snowflake: [Monitor for Salt Bucket Rotation and Regenerate Raw UID2s](integration-snowflake-previous.md#monitor-for-salt-bucket-rotation-and-regenerate-raw-uid2s).

- HTTP endpoints: [Monitor for Salt Bucket Rotations for Your Stored Raw UID2s](integration-advertiser-dataprovider-endpoints.md#5-monitor-for-salt-bucket-rotations-for-your-stored-raw-uid2s).

:::note
AWS Entity Resolution では、ソルトバケットの監視方法はありません。代わりに、AWS Entity Resolution サービスを使用して定期的に raw UID2 を再生成することができます。
:::

#### Determine whether the salt bucket has been rotated

特定の raw UID2 のソルトバケット ID が変更されたかどうかを判断するには、次の手順に従います。

1. 2 つの値を比較します:

   - ソルトバケットのローテーション時に返された、同じ `bucket_id` の raw UID2 の `last_updated` タイムスタンプ。(選択したオプションによって返されたもの)
   
   - 同じ `bucket_id` の raw UID2 生成時のタイムスタンプ。Step 1 で返され、Step 2 で保存されたもの。

1. `last_updated` タイムスタンプが、以前に記録したタイムスタンプよりも新しい場合、ソルトバケットがローテーションされています。その場合、この `bucket_id` に関連するすべての raw UID2 を再生成する必要があります。これには、Step 1 の [Generate Raw UID2s from DII](#1-generate-raw-uid2s-from-dii) に従います。

### 6: Monitor for Opt-Out Status

ユーザーのオプトアウトステータスを受け入れることが重要です。定期的にオプトアウトステータスを監視し、最近オプトアウトしたユーザーの raw UID2 を引き続き使用しないようにします。

UID2 <Link href="../ref-info/glossary-uid#gl-operator-service">Operator Service</Link> に最新のオプトアウト情報を確認するには、次の 2 つの方法があります:

- [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) エンドポイントを呼び出してオプトアウトを確認します。DII がオプトアウトされている場合、raw UID2 は生成されません。

- [POST&nbsp;/optout/status](../endpoints/post-optout-status.md) エンドポイントを使用して raw UID2 のオプトアウトステータスを確認します。

UID2 のオプトアウトワークフローとユーザーがオプトアウトする方法の詳細については、[User Opt-Out](../getting-started/gs-opt-out.md) を参照してください。

## Using POST /identity/map Version 2

:::note
以下の情報は、`POST /identity/map` エンドポイントの以前のバージョン (バージョン 2) を使用するインテグレーションアプローチにのみ関連し、参照用に提供されています。新しい実装では最新バージョンを使用してください: [High-Level Steps](#high-level-steps) を参照してください。
:::

Identity Map API のバージョン 2 を使用する場合の主な違いは次のとおりです:

- **Step 2**: raw UID2 と salt bucket ID のマッピングを保存します。
- **Step 5**: Salt bucket のローテーションを監視します。

その他の Step (1, 3, 4, および 6) は、v3 実装で説明されているとおりです: [High-Level Steps](#high-level-steps) を参照してください。

### Integration Diagram (v2)

次の図は、v2 インテグレーションフローを示しています。主な違いは、Step 2 (salt bucket ID の保存) と Step 5 (salt bucket のローテーションの監視) です。

![Advertiser Flow](images/advertiser-flow-overview-mermaid.png)

<!-- diagram source: resource/advertiser-flow-overview-v2-mermaid.md.bak -->

### Store Raw UID2s and Salt Bucket IDs (v2)

:::note
このステップでは、raw UID2 と salt bucket ID のマッピングを保存します。
:::

Step 1 のレスポンスには、マッピング情報が含まれています。Step 1 で返される次の情報を保存することを推奨します:

- DII (`identifier`)、raw UID2 (`advertising_id`)、および salt bucket (`bucket_id`) のマッピングをキャッシュします。
- レスポンスデータを受信した時刻のタイムスタンプを保存します。後で、このタイムスタンプを Step 5 で返される `last_updated` タイムスタンプと比較できます。

### Monitor for Salt Bucket Rotations for Your Stored Raw UID2s (v2)

:::note
このステップは、v3 実装のステップ 5 に置き換わります。
:::

raw UID2 は、特定の時点でのユーザーの識別子です。特定のユーザーの raw UID2 は、約 1 年に 1 回、<Link href="../ref-info/glossary-uid#gl-salt-bucket">salt bucket</Link> のローテーションの結果として変更されます。

各ソルトバケットは約1年に1回更新されますが、個々のバケットの更新は年間を通じて分散されます。全てのソルトバケットの約1/365が毎日ローテーションされます。これに基づいて、オーディエンスのリフレッシュに合わせた頻度で、ソルトバケットのローテーションを定期的に確認することを推奨します。たとえば、毎週リフレッシュする場合は、毎週ソルトバケットの更新を確認します。

ソルトバケットがローテーションされている場合は、raw UID2を再生成します。詳細については、[Determine whether the salt bucket has been rotated](#determine-whether-the-salt-bucket-has-been-rotated-v2) を参照してください。

ソルトバケットのローテーションを監視する手順については、次のいずれかを参照してください:

- Python SDK: [Monitor Rotated Salt Buckets](../sdks/sdk-ref-python.md#monitor-rotated-salt-buckets)

- Snowflake: [Monitor for Salt Bucket Rotation and Regenerate Raw UID2s](integration-snowflake.md#monitor-for-salt-bucket-rotation-and-regenerate-raw-uid2s)

- HTTP endpoints: [Monitor for Salt Bucket Rotations for Your Stored Raw UID2s (v2)](integration-advertiser-dataprovider-endpoints.md#monitor-for-salt-bucket-rotations-for-your-stored-raw-uid2s-v2)

:::note
AWS Entity Resolution ではソルトバケットの監視はできません。代わりに、AWS Entity Resolution サービスを使用して定期的に raw UID2 を再生成することができます。
:::

##### Determine whether the salt bucket has been rotated (v2)

特定の raw UID2 のソルトバケット ID が変更されたかどうかを判断するには、次の手順に従います。

1. 以下の値を比較します:

    - 監視中のソルトバケットのローテーションの一環として返された各 `bucket_id` の `last_updated` タイムスタンプ。

    - 同じ `bucket_id` の raw UID2 生成時のタイムスタンプ。これはステップ 1 で返され、ステップ 2 で保存されました。

1. `last_updated` タイムスタンプが以前のタイムスタンプよりも新しい場合、ソルトバケットがローテーションされています。そのため、この `bucket_id` に関連付けられた raw UID2 を再生成する必要があります。Step 1 の [Generate Raw UID2s from DII](#1-generate-raw-uid2s-from-dii) に従ってください。

## FAQs

UID2 フレームワークを使用する広告主とデータプロバイダー向けのよくある質問のリストについては、[FAQs for Advertisers and Data Providers](../getting-started/gs-faqs.md#faqs-for-advertisers-and-data-providers) を参照してください。
