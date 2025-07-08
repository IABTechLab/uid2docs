---
title: How the UID2 Token Is Created
description: UID2 Token を作成する方法に関するリファレンス情報。
hide_table_of_contents: false
sidebar_position: 06
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# How the UID2 Token Is Created

:::note
この記事では、パブリッシャーがビッドストリームで送信する UID2 Token の作成方法について説明します。広告主がコンバージョンピクセルのために UID2 Token を作成する場合も同じプロセスが適用されます。UID2 Token を他の共有参加者に送信する前に、raw UID2 が UID2 Token に暗号化される <Link href="../ref-info/glossary-uid#gl-tokenized-sharing">Tokenized Sharing</Link>には適用されません。
:::

パブリッシャーがユーザーの <Link href="../ref-info/glossary-uid#gl-dii">DII</Link>（ハッシュ化されたまたはハッシュ化されていないメールアドレスまたは電話番号）を UID2 <Link href="../ref-info/glossary-uid#gl-operator">Operator</Link> に送信し、ターゲティング広告に使用するための UID2 Token を受け取ると、その過程で特定の処理手順が実行されます。

パブリッシャーによってはいくつかの事前作業が行われますが、ほとんどの処理ステップは UID2 Operator によって行われます。

パブリッシャーの手順を正しい順序で実行することが非常に重要です:
- 手順が順番に実行された場合、その結果の値は、同じ個人のオンラインアクティビティから生成された他の [UID2 identifier types](uid-identifier-types.md) と関連付けられることが認識されます: 基礎となる [raw UID2](../ref-info/glossary-uid.md#gl-raw-uid2) は、同じ DII から生成された他の UID2 参加者による raw UID2 と一致し、したがってそのトークンはターゲティング広告に適しています。
- 順序を間違えると、その結果の値は、同じ個人のオンラインアクティビティから生成された他の UID2 identifiers と関連付けられることができません。そのため、そのトークンはターゲティング広告に適していません。

概要については、[Steps to Create a UID2 Token](#steps-to-create-a-uid2-token) を参照してください。図形式の例については、[Creating a UID2 Token&#8212;Example](#creating-a-uid2-tokenexample) を参照してください。

## Steps to Create a UID2 Token

以下の表は、DII から UID2 Token を作成する手順、順序、および各ステップを実行する担当者を示しています。

サンプル値を使用した例については、[Creating a UID2 Token&#8212;Example](#creating-a-uid2-tokenexample) を参照してください。

<table width="100%">
  <thead>
    <tr>
      <th width="5%">Step</th>
      <th width="35%">Action</th>
      <th width="30%">Who Does It?</th>
      <th width="35%">Documentation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td><Link href="../ref-info/glossary-uid#gl-normalize">正規化</Link></td>
      <td>**Email**: パブリッシャーまたは UID2 Operator<br/>**Phone number**: パブリッシャーが正規化する必要があります</td>
      <td>[Email Address Normalization](../getting-started/gs-normalization-encoding.md#email-address-normalization)<br/>[Phone Number Normalization](../getting-started/gs-normalization-encoding.md#phone-number-normalization)</td>
    </tr>
    <tr>
      <td>2</td>
      <td>正規化されたメールアドレスに <Link href="../ref-info/glossary-uid#gl-sha-256">SHA-256</Link> ハッシュを適用</td>
      <td>パブリッシャーまたは UID2 Operator</td>
      <td>[Email Address Hash Encoding](../getting-started/gs-normalization-encoding.md#email-address-hash-encoding)<br/>[Phone Number Hash Encoding](../getting-started/gs-normalization-encoding.md#phone-number-hash-encoding)</td>
    </tr>
    <tr>
      <td>3</td>
      <td>SHA-256 ハッシュに Base64 エンコーディングを適用</td>
      <td>パブリッシャーまたは UID2 Operator</td>
      <td>[Email Address Hash Encoding](../getting-started/gs-normalization-encoding.md#email-address-hash-encoding)<br/>[Phone Number Hash Encoding](../getting-started/gs-normalization-encoding.md#phone-number-hash-encoding)</td>
    </tr>
    <tr>
      <td>4</td>
      <td>[POST&nbsp;/token/generate](../endpoints/post-token-generate.md) エンドポイント、SDK、Prebid.js、または他のサポートされているインテグレーション機能を使用して、UID2 Operator に値を送信します。</td>
      <td>パブリッシャー</td>
      <td>さまざま: 概要は、[Implementation Resources](../overviews/overview-publishers.md#implementation-resources) を参照してください。</td>
    </tr>
     <tr>
      <td>5</td>
      <td>ハッシュ値と秘密の <Link href="../ref-info/glossary-uid#gl-salt">ソルト</Link> 値の追加を含む複数の手順を実行し、raw UID2 を作成</td>
      <td>UID2 Operator</td>
      <td>該当なし: これらの手順はすべて UID2 Operator が実行します</td>
    </tr>
     <tr>
      <td>6</td>
      <td>raw UID2 を暗号化して UID2 token を作成</td>
      <td>UID2 Operator</td>
      <td>該当なし: UID2 Operator が実行します</td>
    </tr>
 </tbody>
</table>

## Creating a UID2 Token&#8212;Example

以下の図は、[raw UID2](../ref-info/glossary-uid.md#gl-raw-uid2)（第1列、第2列）を作成し、その後 [UID2 Token](../ref-info/glossary-uid.md#gl-uid2-token)（第3列）を作成するための手順を示しています。

パブリッシャーは、[POST&nbsp;/token/generate](../endpoints/post-token-generate.md) エンドポイントにリクエストを送信するか、SDK または Prebid のような他のインテグレーションオプションを使用できます。どのインテグレーションオプションを使用しても、その結果は UID2 Token です。これは、パブリッシャーがビッドストリームで送信できる暗号化された値です。

![Sequential steps for creating a UID2](images/HowUID2Created_UID2ImplementationPlaybook.jpg)
