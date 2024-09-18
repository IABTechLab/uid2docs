---
title: Overview of Sharing
description: 他の参加者と UID2 を共有する方法について学ぶ。
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# UID2 Sharing: Overview 

UID2 では、Sharing とは、UID2 参加者間で [raw UID2](../ref-info/glossary-uid.md#gl-raw-uid2) または [UID2 Token](../ref-info/glossary-uid.md#gl-raw-uid2) を配布するプロセスです。

raw UID2 または UID2 Token が他の参加者と共有される場合はすべて、Sharing の定義に該当します。raw UID2 を送信するすべての共有参加者は、標準セキュリティプラクティスで指定されているセキュリティ要件に従わなければなりません。詳細は [Security Requirements for UID2 Sharing](sharing-security.md) を参照してください。UID2 Token を共有するすべての参加者は、以下の手順に従うことを推奨します。

## Sharing Participants

UID2 では、Sharing Participant とは、ある UID2 参加者から別の UID2 参加者への raw UID2 または UID2 Token の配布に参加する企業のことです。

共有参加者は、パブリッシャー、広告主、DSP、データプロバイダである場合もあれば、これらの役割を複数持つ場合もあります。

## Approved Sharing Scenarios

いくつかの主な共有シナリオは次の表にまとめられています。

例については、[Sharing UID2s: Use Cases](sharing-use-cases.md) を参照してください。

| Sharing Scenario | Sender | Receiver | Sharing Approach | Sharing Route | Link for Details
| :--- | :--- | :--- | :--- | :--- | :--- |
| ビッドストリームでの共有 | Publisher | DSP | UID2 Token の共有 (tokenized sharing) | パブリッシャーが UID2 Token を生成し、<Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>に送信します。 | [Tokenized Sharing in the Bidstream](sharing-tokenized-from-data-bid-stream.md) |
| ピクセルによる共有 | Any authorized [participant](../ref-info/glossary-uid.md#gl-sharing-participant) | Any authorized [participant](../ref-info/glossary-uid.md#gl-sharing-participant) | UID2 Token の共有 (tokenized sharing) | トラッキングピクセルやクリエイティブピクセルなど、あらゆるピクセルを介した共有。 | [Tokenized Sharing in Pixels](sharing-tokenized-from-data-pixel.md) |
| 他の UID2 Sharing 参加者とビッドストリームまたはピクセル以外で共有 | Any authorized [participant](../ref-info/glossary-uid.md#gl-sharing-participant) | Any authorized [participant](../ref-info/glossary-uid.md#gl-sharing-participant) | raw UID2 の共有<br/>または<br/>UID2 Token の共有 (tokenized sharing) | APIやAmazon S3ドロップなど安全なチャネルによる共有。 | [Raw UID2 Sharing](sharing-raw.md)<br/>or<br/>[Tokenized Sharing from Raw UID2s](sharing-tokenized-from-raw.md) |

## UID2 Sharing Approaches

Sharing 参加者が UID2 を他の許可された共有参加者と共有したい場合、2つの経路があります:

- [Sharing UID2 Tokens](#sharing-uid2-tokens)
- [Sharing Raw UID2s](#sharing-raw-uid2s)

### Sharing UID2 Tokens

以下は、UID2 Token を共有 ([tokenized sharing](../ref-info/glossary-uid.md#gl-tokenized-sharing)) するための手順です:

  1. 送信者は UID2 Portal で共有権限を設定します。

     :::note
     共有を使用するには、API key ([API Keys](../portal/api-keys.md) を参照してください) または client-side key pair ([Client-Side Integration](../portal/client-side-integration.md) を参照してください) が必要です。UID2 Portal では、共有権限を設定する前に、これらの値を設定してください。
     :::
  2. 送信者は以下のいずれかを行います:
  
     - DII から UID2 Token を生成します。
     - raw UID2 を UID2 Token に暗号化します。
  3. 受信者は、共有シナリオに適用される指示に従って、UID2 Token を raw UID2 に復号します ([Approved Sharing Scenarios](#approved-sharing-scenarios) を参照してください)。

UID2 Token を共有するためのオプションの詳細と説明へのリンクについては、[Tokenized Sharing Overview](sharing-tokenized-overview.md) を参照してください。

### Sharing Raw UID2s

raw UID2 を共有するには、送り手と受け手の両方が、raw UID2 が漏洩しないことを保証するためのリソース、プロセス、設備を備え、[Security Requirements for UID2 Sharing](sharing-security.md) で定義されている標準的なセキュリティ慣行に従う [sharing participants](ref-info/glossary-uid.md#gl-sharing-participant) であることを期待します。
