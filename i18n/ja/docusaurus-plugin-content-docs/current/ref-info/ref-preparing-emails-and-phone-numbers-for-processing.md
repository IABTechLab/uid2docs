---
title: Preparing DII for Processing
description: Summary of key steps to prepare your input data for conversion to UID2s.
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Preparing Emails and Phone Numbers for Processing

UID2 Service に提供する入力データは、ターゲティング広告に使用できる有効な UID2 に正しく変換されるように、正しい形式である必要があります。

これは、メールアドレスや電話番号を UID2 に変換するために、以下のどのソリューションを使用している場合でも当てはまります:
- UID2 API を直接呼び出す場合。
- 独自の Private Operator を介する場合。
- UID2 SDK インテグレーション、Prebid.js インテグレーション、または Android/iOS インテグレーションを使用する場合。
- Snowflake を使用する場合。

## Processing Steps

データを UID2 Service で利用できるように準備するための正確な手順は、[Normalization and Encoding](../getting-started/gs-normalization-encoding.md) ドキュメントに記載されています。手順は順に以下の通りです:
1. 生データを正規化 (Normalize) します。
2. 正規化された生データの 32 バイト SHA-256 ハッシュを作成します。
3. 32 バイト SHA-256 値に Base64 エンコーディングを適用します。

UID2 API を直接呼び出す場合、または独自の Private Operator を介して UID2 API を呼び出す場合は、各ステップを説明通り正確に、正しい順序で完了する必要があります。

## Valid Input

UID2 SDK、または Prebid.js インテグレーション、Android/iOS インテグレーション、Snowflake などの他のインテグレーションソリューションを使用している場合、入力データのオプションは次の表の通りです。

<table>
  <thead>
    <tr>
      <th>Type of DII</th>
      <th>Input Format</th>
      <th>Instructions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Email</td>
      <td>以下のいずれかでなければなりません:<ul><li>生のメールアドレス</li><li>正規化されたメールアドレス</li><li>正規化され、ハッシュ化され、Base64 エンコードされたもの</li></ul></td>
      <td>[Email Address Normalization](../getting-started/gs-normalization-encoding#email-address-normalization)<br/>[Email Address Hash Encoding](../getting-started/gs-normalization-encoding#email-address-hash-encoding)</td>
    </tr>
    <tr>
      <td>Phone Number</td>
      <td>以下のいずれかでなければなりません:<ul><li>国番号を含む正規化されたもの</li><li>正規化され、ハッシュ化され、Base64 エンコードされたもの</li></ul></td>
      <td>[Phone Number Normalization](../getting-started/gs-normalization-encoding#phone-number-normalization)<br/>[Phone Number Hash Encoding](../getting-started/gs-normalization-encoding#phone-number-hash-encoding)</td>
    </tr>
 </tbody>
</table>
