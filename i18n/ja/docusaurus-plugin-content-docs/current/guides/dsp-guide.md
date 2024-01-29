---
title: DSP Integration
sidebar_label: DSP Integration Guide
description: ビッドストリームで UID2 の取引を行う DSP のためのガイド。
hide_table_of_contents: false
sidebar_position: 05
---

# DSP Integration Guide

このガイドは、ビッドストリームで UID2 の取引を行う DSP を対象としています。

DSP はビッドリクエストで UID2 Token を受け取り、この機能をサポートする Server-Side SDK のいずれかを使用して UID2 Token を復号化し、入札に使用できる raw UID2 を取得します。

利用可能な Server-Side SDK の概要については、[SDKs: Summary](../sdks/summary-sdks.md) を参照してください。

>NOTE: バックエンドが、利用可能な Server-Side SDK のいずれでもカバーされていない言語で書かれている場合は、UID2 の担当者に問い合わせてください。誰に聞けばいいかわからない場合は、[連絡先情報](../getting-started/gs-account-setup.md#contact-info) を参照してください。

<!-- It includes the following sections:

* [Integration Steps](#integration-steps)
   - [Honor User Opt-Outs](#honor-user-opt-outs)

* [FAQs](#faqs) -->

## Integration Steps 

以下は、RTB で UID2 をサポートするための DSP のインテグレーションワークフローで、大きく 2 つのステップで構成されています:
1. [Honor user opt-outs](#honor-user-opt-outs)
2. [Decrypt UID2 tokens for RTB use](#decrypt-uid2-tokens-for-rtb-use)

![](images/dsp-guide-flow-mermaid.png)

### Honor User Opt-Outs

UID2 Service からユーザーのオプトアウトを受信して受け入れるために、DSP は事前に設定されたインターフェース(out-put Webhook/API endpoint) を確立し、オンボーディング中にUID2 Service に提供します。ユーザーがオプトアウトすると、UID2 Service はユーザーの raw UID2 と、対応するオプトアウトタイムスタンプを、事前に設定されたインターフェースに送信します。

UID2 Service は、ユーザーがオプトアウトしてから数秒以内に以下のデータを送信します。これを DSP が記録し、[Decrypt UID2 Tokens for RTB Use](#decrypt-uid2-tokens-for-rtb-use) で定義されている入札ロジックを使用するようにします。

| Parameter   | Description                            |
| :---------- | :------------------------------------- |
| `identity`  | オプトアウトしたユーザーの raw UID2 です。 |
| `timestamp` | ユーザーがオプトアウトした時刻です。(情報のみ) |

次の例は、raw UID2 とそれに対応するタイムスタンプを受信するように設定された Webhook を示しています。

```html
https://dsp.example.com/optout?user=%%identity%%&optouttime=%%timestamp%%
```
#### Bidding Opt-Out Logic

入札時 (2-b)に以下のロジックを使用し、ユーザーのオプトアウトを受け入れます。

Server-Side SDK のいずれか ([SDKs: Summary](../sdks/summary-sdks.md) を参照) を利用して、受信した UID2 Token を raw UID2 に復号します。decrypt関数へのレスポンスには、raw UID2 が含まれます。

オプトアウトのロジックを次の図に示します。

![](images/dsp-guide-optout-check-mermaid.png)

ユーザーがオプトアウトして他場合、UID2 は RTB に使用されるべきではありません。このような場合、DSP は入札のために代替 ID を送信するか、入札しないことを選択できます。

### Decrypt UID2 Tokens for RTB Use

以下の表は、[Integration Steps](#integration-steps) で示したワークフロー図の Step 2 の詳細です。

| Step | SDK | Description |
| :--- | :--- | :--- |
| 2-a  | Server-side SDK ([SDKs: Summary](../sdks/summary-sdks.md) を参照) | 提供されている SDK を活用して、入力された UID2 Token を復号化します。レスポンスには `UID2` と UID2 の作成時刻が含まれます。 |
| 2-b  | | DSP は UID2 のオプトアウトプロトコルを受け入れることが要求されます。ユーザーオプトアウトの設定と入札時の受け入れは、[ユーザーオプトアウトの受け入れ](#honor-user-opt-outs) を参照してください。 |

## FAQs

DSP に関するよくある質問は、[FAQs for DSPs](../getting-started/gs-faqs.md#faqs-for-dsps) を参照してください。
