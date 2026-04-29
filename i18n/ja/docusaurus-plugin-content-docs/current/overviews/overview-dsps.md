---
title: DSPs
description: デマンドサイドプラットフォーム (DSP) 向けの情報の概要。
hide_table_of_contents: false
sidebar_position: 06
use_banner: true
banner_title: DSP 向け UID2 概要
banner_description: より耐久性のある識別子でデータ戦略を有効化。
banner_icon: 'dsps'
banner_text_color: 'white'
banner_text_color_dark: 'black'
banner_background_color: '#0459FC'
banner_background_color_dark: '#1CD2DE'
displayed_sidebar: sidebarDSPs
---

import Link from '@docusaurus/Link';

デマンドサイドプラットフォーム (DSP、メディアバイイングプラットフォーム) として、Unified ID 2.0 (UID2) を活用した ID (Identity) 戦略を実施することで、以下を促進することができます:

- 広告主のためのファーストパーティデータの有効化 (アクティベーション)
- パブリッシャー向けインベントリ収益化

UID2 を採用する DSP のためのメリット、ワークフロー、ドキュメント、およびその他のリソースと、開始するための手順について説明します。

:::note
左側のサイドバーで UID2 ドキュメントの全セットにアクセスしたい場合は、[Unified ID 2.0 Overview](../intro.md) を参照してください。
:::

## Benefits of UID2 for DSPs

UID2 を使用する DSP のメリットの一部を次に示します。以下が可能です:
- 認証された ID で ID (Identity) 解決をアップグレードします。
- サードパーティクッキーへの依存度を低減します。
- オムニチャネルやクロスデバイスのフリケンシー管理と抑制 (suppression) を実行します。
- よりプライバシーに配慮した ID 暗号化規格により、ファーストパーティデータのアクティベーションを促進します。
- 決定論的データによる将来性のあるモデルの開発を目指します。
- アドレサブルなオーディエンスターゲティングを維持します。
- 消費者のプライバシー管理を向上させることを目的に、オプトアウトを提供します。
- サードパーティクッキーの有無にかかわらず、キャンペーンをより正確に測定します。

## Workflow for DSPs

以下の手順は、<Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>において UID2 で取引を行う DSP を想定したワークフローの概要です。

バックグラウンドで以下の処理が行われます:
- 広告主またはデータプロバイダーは、ファーストパーティおよびサードパーティのオーディエンスセグメントを DSP に渡します。
- DSP は、UID2 Operator と同期し、復号化キーを受け取ります。
- DSP は、UID2 Operator からのオプトアウト要求を受け取ります。

各入札/広告インプレッションには次のステップがあります:

1. ビッドリクエストが UID2 Token とともにビッドストリームに渡されます。
2. DSP はビッドストリームから UID2 Token を含むビッドリクエストを受信します。
3. DSP は:
   - UID2 Token を復号して raw UID2 にします。
   - ユーザーがオプトアウトしたかどうかを確認し、オプトアウトした場合は入札を行いません。
   - raw UID2 をオーディエンスセグメントにマッチさせます。 
4. DSP は UID2 Token を付加したビッドレスポンス (入札レスポンス) をビッドストリームに送信します。

![Buy-Side Workflow](images/UID2BuySIdeDSPWorkflow.jpg)

## Getting Started

開始するには、以下の手順に従ってください:

1. [Request Access](/request-access) ページのフォームに記入して、UID2 へのアクセスをリクエストします。
2. UID2 のオプトアウト情報を受け取るための Webhook を実装し、Webhook を UID2 administrator と共有します。
3. Webhook 経由でオプトアウトフィードを受信していることを確認します。

    Webhook が設置されたら、認証情報を受け取ります ([UID2 Credentials](../getting-started/gs-credentials.md) を参照)。
4. どの実装オプションを使用するかを決定します。
5. SDK を使用している場合は、SDK をダウンロードします。該当する SDK のガイドを参照してください。
6. 選択したオプションの実装ガイドに記載されている手順に従います。

   :::note
   UID2 へのリクエストメッセージは必ず暗号化してください。詳細は [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md) を参照してください。
   :::
7. (条件付き) CRM オンボーディングソリューションを実装する場合は、データプロバイダーワークフローのための別の認証情報セットをリクエストします。[UID2 Credentials](../getting-started/gs-credentials.md) を参照してください。
8. テストします。
9. 本番稼働します。

## Implementation Resources

UID2 を実装する DSP 向けに、以下のドキュメントリソースが用意されています。

| Type| Documentation | Content Description |
| :--- | :--- | :--- |
|SDK for Java | [SDK for Java Reference Guide](../sdks/sdk-ref-java.md) | Java Server-Side を使用し、UID2 Advertising Token を復号化して raw UID2 にアクセスしたい利用者のための SDK。|
|SDK for Python | [SDK for Python Reference Guide](../sdks/sdk-ref-python.md) | Python Server-Side を使用し、UID2 Advertising Token を復号化して raw UID2 にアクセスしたい利用者のための SDK。|
|SDK for C# / .NET | [SDK for C# / .NET Reference Guide](../sdks/sdk-ref-csharp-dotnet.md) | .NET Server-Side を使用し、UID2 Advertising Token を復号化して raw UID2 にアクセスしたい利用者のための SDK。|
|SDK for C++ | [SDK for C++ Reference Guide](../sdks/sdk-ref-cplusplus.md) | C++ Server-Side を使用し、UID2 Advertising Token を復号化して raw UID2 にアクセスしたい利用者のための SDK。|
| Integration Guide | [DSP Integration Guide](../guides/dsp-guide.md) | DSP 向けのこのインテグレーションガイドでは、入札のための UID2 の取り扱いと、ユーザーのオプトアウトの受け入れについて説明します。 |
| DSP Direct Integration Instructions | [DSP Direct Integration Tips](../guides/integration-dsp-no-sdk.md) | UID2 SDK のいずれも使用せずにインテグレーションすることを希望する DSP 向けの手順。 |

<!-- ## Integration Requirements
 
To integrate with UID2 to receive UID2s from brands (as first-party data) and data providers (as third-party data) and leverage them to inform bidding on UID2s in the bidstream, the buy-side participants must meet the following requirements:
 
- Accept data in the form of UID2s
- Bid on data in the form of UID2s
- Build a webhook for honoring opt-out requests
- Sync <a href="../ref-info/glossary-uid#gl-encryption-key">encryption keys</a> daily with the UID2 Administrator
 
For details, see [DSP Integration Guide](../guides/dsp-guide.md).
 
Optionally, if DSPs want to generate UID2s themselves from DII, they can also follow the [Third-Party Data Provider Workflow](overview-data-providers.md#workflow-for-data-providers). -->

## FAQs for DSPs

UID2 フレームワークを使用する DSP 向けのよくある質問のリストについては、[FAQs for DSPs](../getting-started/gs-faqs.md#faqs-for-dsps) を参照してください。
