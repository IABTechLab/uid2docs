---
title: Tokenized Sharing in Pixels
description: ピクセルでの UID2 Token の共有について学ぶ。
hide_table_of_contents: false
sidebar_position: 08
---

import Link from '@docusaurus/Link';

# Tokenized Sharing in Pixels

ピクセルで共有される UID2 データは、以下の2つの方法のいずれかで生成された UID2 Token でなければなりません:

- [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii)(メールアドレスまたは電話番号)を直接暗号化して UID2 Token にします。
- raw UID2 を UID2 Token に暗号化します。

[Tokenized sharing](../ref-info/glossary-uid.md#gl-tokenized-sharing) は、どの共有ルートでも選択可能ですが、<Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>以外の主な実装は、ピクセルでのトークンの共有です。

:::caution
ピクセルのデータは不正アクセスされる可能性があるため、raw UID2 をピクセルで共有することは決して許されません。ピクセルで共有する場合は、Tokenized sharing が必要です。
:::

### Audience

ピクセルでの Tokenized sharing は、以下の対象者に適用されます:

- **Sender**: 最も一般的なのは広告主またはデータプロバイダーですが、承認された共有参加者であれば誰でもかまいません。
- **Receiver**: 承認された共有参加者であれば誰でも構いません。[Information for Sharing Receivers](#information-for-sharing-receivers) を参照してください。

## Sharing UID2 Tokens in Pixels

:::tip
DII から UID2 Token を直接生成することを勧めます。これにはいくつかの方法がありますが、勧めるのは Client-Side で UID2 Token を生成する方法です。手順については、[Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md) を参照してください。
:::

参加者によって、ピクセルの使用方法は異なります。次の表は、広告技術のエコシステムにおけるピクセルの2つの一般的な使用例を示しています。

| |  Tracking Pixel | Creative Pixel |
| :--- | :--- | :--- |
| 何を測定するか | コンバージョン/リターゲティング (ユーザーが何かをしたとき) | インプレッション (ユーザーが広告を見たとき) |
| どこで | 広告主やパブリッシャーのサイト | DSP 経由のパブリッシャーのサイト |
| 開始点 | ほとんどの場合 DII<br/>Raw UID2 も可能ですが、暗号化は Server-Side で行う必要があります。 | Raw UID2 |
| ピクセルで共有されるフォーマット | UID2 Token | UID2 Token |

2つのシナリオがあります:

- [Tokenized Sharing in Tracking Pixels](#workflow-tokenized-sharing-in-tracking-pixels)
- [Tokenized Sharing in Creative Pixels](#workflow-tokenized-sharing-in-creative-pixels)

## Account Setup in the UID2 Portal

UID2 Portal では、送信者と受信者がアカウントを設定し、送信者が共有許可を行う必要があります。

送信者は、受信者または参加者タイプごとに共有許可を1回だけ設定するだけで済みます。ただし、新しい共有許可を追加したり、既存の設定を変更したい場合は、設定を調整する必要があります。

詳細は [UID2 Portal: Overview](../portal/portal-overview.md) を参照し、各タスクのリンクをたどってください。

## Workflow: Tokenized Sharing in Tracking Pixels

ウェブサイトで製品の購入などのアクションが完了したときにトリガーされるトラッキングピクセルを使用している場合、おそらく DII から始めて、UID2 Token に変換して共有します。

UID2 送信者は、UID2 Token を復号化できる受信者を指定します。これは、UID2 Portal で権限を設定することで行います(詳細は [Sharing Permissions](../portal/sharing-permissions.md) を参照してください)。送信者が UID2 Sharing の権限を受信者に付与すると、送信者の暗号キーが UID2 SDK または Snowflake を介して受信者と共有されます。共有の一環として、UID2 SDK と API は暗号化と復号化を処理します。

たとえば、広告主(送信者)が UID2 Token を UID2 DSP と共有することを望んでいるとします。これは、トラッキングピクセルを介したコンバージョントラッキングのためです。共有を使用するには、次のシーケンスになります:

1. 広告主は送信者であり、次の操作を行います:

   1. UID2 Portal で DSP に共有を許可します。

   2. ユーザーから提供された <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> から UID2 Token を直接生成します。これは、[POST&nbsp;/token/generate](../endpoints/post-token-generate.md) エンドポイントまたは UID2 Token を生成する SDK のいずれかを使用して行います。
   
      オプションの概要については、[SDK Functionality](../sdks/summary-sdks.md#sdk-functionality) を参照してください。JavaScript を使用して UID2 Token を生成する方法については、[Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md) を勧めます。
   
   3. UID2 Tokeb を DSP に安全に送信します。

2. DSPは、受信者であり、共有に参加しています。DSPは、UID2 Portal の共有権限設定を通じて広告主の暗号鍵にアクセスできるため、UID2 Token をセグメント作成のための raw UID2 に復号化できます。

UID2 送信者と受信者の両方が、UID2 Portal アカウントを作成する必要があります(詳細は [Account Setup in the UID2 Portal](#account-setup-in-the-uid2-portal) を参照してください)。アカウントがない場合、UID2 参加者は UID2 Portal の共有参加者リストに表示されず、送信者の暗号キーを受信して復号化することができません。

## Workflow: Tokenized Sharing in Creative Pixels

クリエイティブピクセルを使用している場合、DSP は raw UID2 を UID2 Token に変換してクリエイティブピクセルに追加します。トークンはインプレッション時に発火されるクリエイティブピクセルに追加されます。

すべての実装ステップは、[raw UID2 からの Tokenized sharing](sharing-tokenized-from-raw.md) と同じです。

Snowflake を使用してピクセルで Tokenized Sharing を実装する方法の例については、[Snowflake Integration Guide: Usage for UID2 Sharers](../guides/snowflake_integration.md#usage-for-uid2-sharers) を参照してください。

## Information for Sharing Receivers

UID2 Token を raw UID2 に復号化するには、UID2 Portal アカウントが必要であり、送信者があなたとの共有関係を作成する必要があります。

For details, see [Receiving UID2 Tokens from Another Sharing Participant](sharing-tokenized-overview.md#receiving-uid2-tokens-from-another-sharing-participant).

暗号鍵の更新を定期的に行い、UID2 Token をすみやかに復号化することが重要です。

詳細については、*UID2 Sharing: Best Practices* の次のセクションを参照してください:

- [Decryption Key Refresh Cadence for Sharing](sharing-best-practices.md#decryption-key-refresh-cadence-for-sharing)
- [Best Practices for Managing Raw UID2s and UID2 Tokens](sharing-best-practices.md#best-practices-for-managing-raw-uid2s-and-uid2-tokens)
