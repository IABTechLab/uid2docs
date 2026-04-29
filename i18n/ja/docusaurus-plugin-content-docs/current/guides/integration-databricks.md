---
title: Databricks Integration
sidebar_label: Databricks
pagination_label: Databricks Integration
description: Databricks を使用した UID2 とのインテグレーションに関する情報。
hide_table_of_contents: false
sidebar_position: 04
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import SnptPreparingEmailsAndPhoneNumbers from '../snippets/_snpt-preparing-emails-and-phone-numbers.mdx';

# Databricks Clean Rooms Integration Guide

このガイドは、Databricks 環境でユーザーデータを raw UID2 に変換したい広告主およびデータプロバイダーを対象としています。

## Integration Overview

このソリューションでは、[Databricks Clean Rooms](https://docs.databricks.com/aws/en/clean-rooms/) 機能のインスタンスでデータを処理することにより、<Link href="../ref-info/glossary-uid#gl-dii">DII (Directly Identifying Information)</Link> を公開することなく、コンシューマー識別データを安全に共有できます。この機能は、機密データを扱うための、安全でプライバシーが保護された環境を提供します。

Databricks Clean Rooms 環境をセットアップしたら、UID2 サービスとの信頼関係を確立し、クリーンルームで共有したデータを raw UID2 に変換することを許可します。

<!-- 
## Databricks Partner Network Listing

[**GWH__EE or MC for listing update when available. https://www.databricks.com/company/partners/technology?**] 
-->

## Functionality

以下の表は、UID2 Databricks インテグレーションで利用可能な機能をまとめたものです。

| Encrypt Raw UID2 to UID2 Token for Sharing | Decrypt UID2 Token to Raw UID2 | Generate UID2 Token from DII | Refresh UID2 Token | Map DII to Raw UID2s |
| :--- | :--- | :--- | :--- | :--- |
| &#8212; | &#8212; | &#8212; | &#8212; | &#9989; |

## Key Benefits

UID2 処理に Databricks を統合する主なメリットは以下の通りです。

- Databricks データクリーンルーム内での UID2 ワークフロー管理をネイティブにサポート。
- パートナーデータセット間での安全なアイデンティティ相互運用性。
- 監査と追跡可能性のための、UID2 関連のすべての変換と結合に関する直接的なリネージ（系統）と可観測性。
- UID2 識別子と The Trade Desk アクティベーションエコシステム間の合理化されたインテグレーション。
- Databricks を通じたマーケターや広告主向けのセルフサービスサポート。

## Preparing DII for Processing

<SnptPreparingEmailsAndPhoneNumbers />

## Integration Steps

概要レベルでは、Databricks インテグレーションをセットアップし、データを処理する手順は以下の通りです。

1. [UID2 コラボレーション用のクリーンルームを作成する](#create-clean-room-for-uid2-collaboration)。
1. [Databricks 共有識別子を UID2 担当者に送信する](#send-sharing-identifier-to-uid2-contact)。
1. [クリーンルームにデータを追加する](#add-data-to-the-clean-room)。
1. クリーンルームのノートブックを実行して [DII をマッピングする](#map-dii)。

### Create Clean Room for UID2 Collaboration

出発点として、Databricks Clean Rooms 環境（UID2 とコラボレーションしてデータを処理するための安全な環境）を作成します。

Databricks ドキュメントの [Create clean rooms](https://docs.databricks.com/aws/en/clean-rooms/create-clean-room) の手順に従ってください。接続する [UID2 環境](../getting-started/gs-environments) に基づいて、正しい共有識別子を使用してください。[UID2 Sharing Identifiers](#uid2-sharing-identifiers) を参照してください。

:::important
クリーンルームを作成した後は、コラボレーターを変更することはできません。Databricks Python SDK を使用してクリーンルームを作成する場合など、クリーンルームのコラボレーターのエイリアスを設定するオプションがある場合、自身のコラボレーターエイリアスは `creator`、UID2 コラボレーターエイリアスは `collaborator` である必要があります。Databricks Web UI を使用してクリーンルームを作成する場合は、正しいコラボレーターエイリアスが自動的に設定されます。
:::

### Send Sharing Identifier to UID2 Contact

クリーンルームのノートブックを使用する前に、Databricks 共有識別子を UID2 担当者に送信する必要があります。

共有識別子は、`<cloud>:<region>:<uuid>` という形式の文字列です。

以下の手順に従ってください。

1. クリーンルームで作業する Databricks ワークスペースにアタッチされている Unity Catalog メタストアの共有識別子を見つけます。

   この値を見つける方法については、[Finding a Sharing Identifier](#finding-a-sharing-identifier) を参照してください。
1. 共有識別子を UID2 担当者に送信します。

### Add Data to the Clean Room

1 つ以上のテーブルまたはビューをクリーンルームに追加します。スキーマ、テーブル、ビューの名前は任意です。テーブルとビューは、[Input Table](#input-table) で詳述されているスキーマに従う必要があります。

### Map DII

Databricks Clean Rooms の `identity_map_v3` [ノートブック](https://docs.databricks.com/aws/en/notebooks/) を実行して、メールアドレス、電話番号、またはそれぞれのハッシュを raw UID2 にマッピングします。

ノートブックの実行が成功すると、出力テーブルに raw UID2 が生成されます。詳細については、[Output Table](#output-table) を参照してください。

## Running the Clean Rooms Notebook

このセクションでは、Databricks Clean Rooms 環境を使用して DII を raw UID2 に処理するための詳細を提供します。これには以下が含まれます。

- [Notebook Parameters](#notebook-parameters)
- [Input Table](#input-table)
- [DII Format and Normalization](#dii-format-and-normalization)
- [Output Table](#output-table)
- [Output Table Schema](#output-table-schema)

### Notebook Parameters

`identity_map_v3` ノートブックを使用して、クリーンルームの `creator` カタログに追加した任意のテーブルまたはビュー内の DII をマッピングできます。

ノートブックには、`input_schema` と `input_table` の 2 つのパラメータがあります。これら 2 つのパラメータを合わせて、マッピング対象の DII を含むクリーンルーム内のテーブルまたはビューを特定します。

たとえば、`creator.default.emails` という名前のクリーンルームテーブル内の DII をマッピングするには、`input_schema` を `default` に、`input_table` を `emails` に設定します。

| Parameter Name | Description |
| :--- | :--- |
| `input_schema` | テーブルまたはビューを含むスキーマ。 |
| `input_table` | マッピング対象の DII を含むテーブルまたはビューに指定した名前。 |

### Input Table

入力テーブルまたはビューには、以下の表に示す 2 つのカラムが必要です。テーブルまたはビューに追加のカラムがあってもかまいませんが、ノートブックはこれら 2 つのカラムのみを使用し、他のカラムは使用しません。

| Column Name | Data Type | Description |
| :--- | :--- | :--- |
| `INPUT` | string | マッピングする DII。 |
| `INPUT_TYPE` | string | マッピングする DII のタイプ。許容値: `email`, `email_hash`, `phone`, `phone_hash`。 |

### DII Format and Normalization

正規化の要件は、処理する DII のタイプによって異なり、以下の通りです。

- **Email address**: ノートブックは、UID2 [Email Address Normalization](../getting-started/gs-normalization-encoding#email-address-normalization) ルールを使用してデータを自動的に正規化します。
- **Phone number**: UID2 [Phone Number Normalization](../getting-started/gs-normalization-encoding#phone-number-normalization) ルールを使用して、ノートブックでマッピングする前に電話番号を正規化する必要があります。

### Output Table

クリーンルームに出力カタログがある場合、マッピングされた DII は出力カタログ内のテーブルに書き込まれます。出力テーブルは 30 日間保存されます。

詳細については、Databricks ドキュメントの [Overview of output tables](https://docs.databricks.com/aws/en/clean-rooms/output-tables#overview-of-output-tables) を参照してください。

### Output Table Schema

以下の表は、フィールド名や値など、出力データの構造に関する情報を示しています。

| Column Name | Data Type | Description |
| :--- | :--- | :--- |
| `UID` | string | 値は以下のいずれかです。<ul><li>**DII が正常にマッピングされた場合**: DII に関連付けられた UID2。</li><li>**それ以外の場合**: `NULL`。</li></ul> |
| `PREV_UID` | string | 値は以下のいずれかです。<ul><li>**DII が正常にマッピングされ、現在の raw UID2 が過去 90 日以内にローテーションされた場合**: 以前の raw UID2。</li><li>**それ以外の場合**: `NULL`。</li></ul> |
| `REFRESH_FROM` | timestamp | 値は以下のいずれかです。<ul><li>**DII が正常にマッピングされた場合**: この UID2 をリフレッシュすべき日時を示すタイムスタンプ。</li><li>**それ以外の場合**: `NULL`。</li></ul> |
| `UNMAPPED` | string | 値は以下のいずれかです。<ul><li>**DII が正常にマッピングされた場合**: `NULL`。</li><li>**それ以外の場合**: 識別子がマッピングされなかった理由。(`OPTOUT`, `INVALID IDENTIFIER`, または `INVALID INPUT TYPE`)。<br/>詳細については、[Values for the UNMAPPED Column](#values-for-the-unmapped-column) を参照してください。</li></ul> |

:::note
raw UID2 は、リフレッシュのタイムスタンプより前には変更されません。リフレッシュのタイムスタンプ以降に DII を再マッピングすると、新しいリフレッシュのタイムスタンプが返されますが、raw UID2 は変更される場合と変更されない場合があります。raw UID2 は、複数のリフレッシュ間隔にわたって変更されない可能性があります。
:::

#### Values for the UNMAPPED Column

以下の表は、出力テーブルスキーマの `UNMAPPED` カラムに設定可能な値を示しています。

| Value | Meaning |
| :--- | :--- |
| `NULL` | DII が正常にマッピングされました。 |
| `OPTOUT` | ユーザーがオプトアウトしています。 |
| `INVALID IDENTIFIER` | メールアドレスまたは電話番号が無効です。 |
| `INVALID INPUT TYPE` | `INPUT_TYPE` の値が無効です。`INPUT_TYPE` の有効な値は、`email`, `email_hash`, `phone`, `phone_hash` です。 |

## Testing in the Integ Environment

UID2 POC に署名する前に Databricks Clean Rooms の実装をテストしたい場合は、UID2 担当者にインテグレーション (integ) 環境へのアクセスを依頼できます。この環境はテスト専用であり、本番データは含まれません。

リクエストには、共有識別子を含めてください。

返答を待っている間に、以下のアクションを完了できます。
- インテグレーション環境用の UID2 共有識別子を使用して、クリーンルームを作成する。
- アセットをクリーンルームに配置する。

詳細については、[Integration Steps](#integration-steps) を参照してください。

アクセスの準備ができると、UID2 担当者から通知があります。

## Reference

このセクションには、以下の参照情報が含まれています。

- [UID2 Sharing Identifiers](#uid2-sharing-identifiers)
- [Finding a Sharing Identifier](#finding-a-sharing-identifier)

### UID2 Sharing Identifiers

UID2 共有識別子は変更される可能性があります。新しいクリーンルームを作成する前に、このセクションを確認して最新の共有識別子を入手してください。

| Environment | UID2 Sharing Identifier |
| :--- | :--- |
| Production | `aws:us-east-2:21149de7-a9e9-4463-b4e0-066f4b033e5d:673872910525611:010d98a6-8cf2-4011-8bf7-ca45940bc329` |
| Integration | `aws:us-east-2:4651b4ea-b29c-42ec-aecb-2377de70bbd4:2366823546528067:c15e03bf-a348-4189-92e5-68b9a7fb4018` |

### Finding a Sharing Identifier

UID2 担当者向けの共有識別子を見つけるには、以下の手順に従ってください。

Databricks ワークスペースの Catalog Explorer (カタログエクスプローラ) で、**Catalog** をクリックします。

上部の歯車アイコンをクリックし、**Delta Sharing** を選択します。

**Shared with me** タブで、右上の Databricks 共有組織 (sharing organization) をクリックし、**Copy sharing identifier** を選択します。

詳細については、Databricks ドキュメントの [Request the recipient's sharing identifier](https://docs.databricks.com/aws/en/delta-sharing/create-recipient#step-1-request-the-recipients-sharing-identifier) を参照してください。
