---
title: DSPs
description: デマンドサイドプラットフォーム (DSP) 向けの情報の概要。
hide_table_of_contents: false
sidebar_position: 06
use_banner: true
banner_title: UID2 Overview for DSPs
banner_description: より耐久性のある識別子でデータ戦略を可能に。
---

このページでは、Unified ID 2.0（UID2）フレームワークがデマンドサイドプラットフォーム（DSP）にもたらすもの、ワークフロー、ドキュメント、その他のリソース、および開始方法に関する情報を提供します。

以下のセクションでは、UID2 を採用する DSP のメリット、ワークフロー、ドキュメント、その他のリソースに関する情報を提供します。

## Audience

このページは、DSP (Demand-Side Platforms)のためのページです。メディアバイイングプラットフォームは、Unified ID 2.0により、広告主のファーストパーティデータアクティベーションやパブリッシャーの在庫マネタイズのための ID 戦略を促進できます。

## Benefits of UID2 for DSPs

UID2 を使用する DSP が得られるメリットの一部を次に示します:
- 認証された ID で ID 解決をアップグレードします。
- サードパーティークッキーへの依存度を低減します。
- オムニチャネルやクロスデバイスのフリケンシー管理と抑制を実行します。
- よりプライバシーに配慮した ID 暗号化規格により、ファーストパーティ・データの活性化を促進します。
- 決定論的データによる将来性のあるモデルの開発を目指します。
- アドレサブルなオーディエンスターゲティングを維持します。
- 消費者のプライバシー管理を向上させることを目的に、オプトアウトを提供します。
- サードパーティクッキーの有無にかかわらず、キャンペーンをより正確に測定します。

## Workflow for DSPs

以下のステップは、入札ストリームのUID2で取引を行う需要側プラットフォーム（DSP）を想定したワークフローのアウトラインです。

バックグラウンドで以下の処理が行われます:
- 広告主またはデータプロバイダーは、ファーストパーティおよびサードパーティのオーディエンスセグメントを DSP に渡します。
- DSP は、UID2 Operator と同期し、復号化キーを受け取ります。
- DSP は、UID2 Operator からのオプトアウト要求を受け取ります。

各入札/広告インプレッションには次のステップがあります:

1. ビッドリクエストが UID2 Token とともにビッドストリームに渡されます。
2. DSP はビッドストリームから UID2 Token を持つビッドリクエストを受信します。
3. DSP は
   - UID2 Token を復号して raw UID2 にします。
   - ユーザーがオプトアウトしたかどうかを確認し、オプトアウトした場合は入札を行いません。
   - raw UID2 をオーディエンスセグメントにマッチさせます。
4. DSPは、raw UID2 に基づいてビッドストリームにビッドレスポンスを送信します。

![Buy-Side Workflow](images/UID2BuySIdeDSPWorkflow.jpg)

## Getting Started

次の手順で始めます:

1. [アクセスリクエスト](/request-access)ページにあるフォームに記入して、UID2へのアクセスをリクエストします。
2. UID2 オプトアウトを受信するための Webhook を実装し、
UID2 Admimnistrator と Webhook を共有します。
3. Webhook 経由でオプトアウトフィードを受信していることを確認します。<br/>。
    Webhook が設置されたら、認証情報を受け取ります ([UID2 Credentials](../getting-started/gs-credentials.md) を参照してください)。
4. どの実装オプションを使用するかを決定します。
5. SDK を使用している場合は、SDKをダウンロードします。該当する SDK のガイドを参照してください。
6. 選択したオプションの実装ガイドに記載されている手順に従います。

     Note: リクエストメッセージは必ずUID2まで暗号化してください。詳細は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md)を参照してください。
7. (条件付き)CRM オンボーディングソリューションを実装する場合は、データプロバイダワークフローのための資格情報の別のセットを要求します。[UID2 Credentials](../getting-started/gs-credentials.md)を参照してください。
8. テストします。
9. 本番稼働します。

## Resources

The following documentation resources are available for DSPs to implement UID2.

| Type| Documentation | Content Description | Audience |
| :--- | :--- | :--- | :--- |
|UID2 SDK for Java | [UID2 SDK for Java (Server-Side) Reference Guide](../sdks/uid2-sdk-ref-java.md) | An SDK for anyone using Java server-side who wants to decrypt UID2 advertising tokens to access the raw UID2.| DSPs |
|UID2 SDK for Python | [UID2 SDK for Python (Server-Side) Reference Guide](../sdks/uid2-sdk-ref-python.md) | An SDK for anyone using Python server-side who wants to decrypt UID2 advertising tokens to access the raw UID2.| DSPs |
|UID2 SDK for C# / .NET | [UID2 SDK for C# / .NET (Server-Side) Reference Guide](../sdks/uid2-sdk-ref-csharp-dotnet.md) | An SDK for anyone using .NET server-side who wants to decrypt UID2 advertising tokens to access the raw UID2.| DSPs |
|UID2 SDK for C++ | [UID2 SDK for C++ (Server-Side) Reference Guide](../sdks/uid2-sdk-ref-cplusplus.md) | An SDK for anyone using C++ server-side who wants to decrypt UID2 advertising tokens to access the raw UID2.| DSPs |
| Integration Guides | [DSP Integration Guide](../guides/dsp-guide.md) | This integration guide for DSPs covers handling UID2s for bidding and honoring user opt-outs. | DSPs |

<!-- ## Integration Requirements
To integrate with UID2 to receive UID2s from brands (as first-party data) and data providers (as third-party data) and leverage them to inform bidding on UID2s in the bid stream, the buy-side participants must meet the following requirements:
- Accept data in the form of UID2s
- Bid on data in the form of UID2s
- Build a webhook for honoring opt-out requests
- Sync encryption keys daily with the UID2 Administrator
For details, see [DSP Integration Guide](../guides/dsp-guide.md).
Optionally, if DSPs want to generate UID2s themselves from DII, they can also follow the [Third-Party Data Provider Workflow](overview-data-providers.md#workflow-for-data-providers). -->

## FAQs for DSPs

UID2 フレームワークを使用する DSP に関するよくある質問については、 [FAQs for DSPs](../getting-started/gs-faqs.md#faqs-for-dsps) を参照してください。