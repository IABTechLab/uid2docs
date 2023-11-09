---
title: DSPs
description: デマンドサイドプラットフォーム (DSP) 向けの情報の概要。
hide_table_of_contents: false
sidebar_position: 06
use_banner: true
banner_title: UID2 Overview for DSPs
banner_description: より耐久性のある識別子でデータ戦略を可能に。
---

このページでは、Unified ID 2.0 (UID2) フレームワークが demand-side platform (DSP) にもたらすもの、利用可能な実装オプション、および開始方法に関する情報を提供します。以下のセクションでは、UID2 を採用するDSPのためのワークフロー、インテグレーションタイプ、ドキュメントについて説明します。

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

## Resources

UID2を実装するDSPには、以下のドキュメントリソースが用意されています。

| Type| Documentation | Content Description | Audience |
| :--- | :--- | :--- | :--- |
| Server-Side SDK Guides for .NET, C++, Java, Python | [SDKs](../sdks/summary-sdks.md) | UID2 Server-Side SDK を使用して、UID2 Advertising Token を復号して raw UID2 にアクセスしたい人のための SDK です。| DSPs |
| Integration Guides | [DSP Integration Guide](../guides/dsp-guide.md) | この DSP 向けインテグレーションガイドでは、入札における UID2 の取り扱いや、ユーザーのオプトアウトを受け入れることについて説明しています。 | DSPs |


| Type| Documentation | Content Description | Audience |
| :--- | :--- | :--- | :--- |
|UID2 SDK for Java | [UID2 SDK for Java (Server-Side) Reference Guide](../sdks/uid2-sdk-ref-java.md) | UID2 advertising token を解読して raw UID2 にアクセスしたい Java Server-Side を使用する人向けの SDK。| DSPs |
|UID2 SDK for Python | [UID2 SDK for Python (Server-Side) Reference Guide](../sdks/uid2-sdk-ref-python.md) |  UID2 advertising token を解読して raw UID2 にアクセスしたい Python Server-Side を使用する人向けの SDK。 | DSPs |
|UID2 SDK for C# / .NET | [UID2 SDK for C# / .NET (Server-Side) Reference Guide](../sdks/uid2-sdk-ref-csharp-dotnet.md) | UID2 advertising token を解読して raw UID2 にアクセスしたい .Net Server-Side を使用する人向けの SDK。 | DSPs |
|UID2 SDK for C++ | [UID2 SDK for C++ (Server-Side) Reference Guide](../sdks/uid2-sdk-ref-cplusplus.md) | UID2 advertising token を解読して raw UID2 にアクセスしたい C++ Server-Side を使用する人向けの SDK。 | DSPs |
| Integration Guides | [DSP Integration Guide](../guides/dsp-guide.md) | このインテグレーション・ガイドでは、DSP向けに入札のための UID2 の取り扱いと、ユーザーの Opt-Out の受け入れについて説明しています。 | DSPs |

## Workflow for DSPs

以下のステップは、ビッドストリームで UID2 を取引するデマンドサイドプラットフォーム (DSP)を想定したワークフローのアウトラインです。

1. データプロバイダーは、ファーストパーティおよびサードパーティのデータを raw UID2 として DSP に渡します。
2. DSP は UID2 Administrator と同期し、復号鍵を受け取ります。
3. DSP はビッドストリーム内の UID2 Token にアクセスし、入札時に復号化します。
4. DSP は UID2 Administrator からのオプトアウトリクエストを受け、オプトアウトした UID2 の買い付けをブロックします。

以下のプロセスはバックグラウンドで実行されますます:

- 広告主やデータプロバイダーは、ファーストパーティおよびサードパーティのオーディエンスセグメントを DSP に渡します。
- DSP は UID2 Operator と同期して、復号鍵を受け取ります。
- DSP は、UID2 Operator からのオプトアウトの要求を聞きます。

各ビッド/広告インプレッションについて、以下の手順が実行されます:

1. 入札リクエストは、UID2 Token とともにビッドストリームに渡されます。
2. 2.DSPは、UID2トークン付きの入札リクエストをビッドストリームから受信します。
3. DSP は:
   - UID2 Token を復号して raw UID2 にします。
   - ユーザーがオプトアウトしたかどうかを確認し、オプトアウトした場合は入札を行いません。
   - raw UID2 を視聴者セグメントにマッチングさせます。
4. DSP は、raw UID2 に基づいて、ビッドストリームにビッドレスポンスを送信します。 

![Buy-Side Workflow](images/UID2BuySIdeDSPWorkflow.jpg)

<!-- ## Integration Requirements

UID2 とインテグレーションして、ブランド (ファーストパーティデータとして)やデータプロバイダー (サードパーティデータとして)から UID2 を受け取り、ビッドストリームにおける UID2 の入札情報に活用するためには、バイサイドは以下の要件を満たしている必要があります。

- UID2 形式のデータを受け取る。
- UID2 形式のデータに入札します。
- オプトアウトリクエストに対応するための Webhook を構築します。
- UID2 Administrator と暗号化キーを毎日同期させる。

詳細は、[DSP Integration Guide](../guides/dsp-guide.md) を参照してください。

オプションとして、DSP が directly identifying information(DII) から UID2 を自ら生成したい場合は、[Third-Party Data Provider Workflow](overview-data-providers.md#workflow-for-data-providers) に従うこともできます。 -->

## Getting Started

次の手順で始めます:

1. [アクセスリクエスト](/request-access)ページにあるフォームに記入して、UID2へのアクセスをリクエストします。
2. UID2 オプトアウトを受信するための Webhook を実装し、
UID2 Admimnistrator と Webhook を共有します。
3. Webhook 経由でオプトアウトフィードを受信していることを確認します。<br/>。
    Webhook が設置されたら、認証情報を受け取ります ([API keys](../getting-started/gs-api-keys.md) を参照してください)。
4. どの実装オプションを使用するかを決定します。
5. SDK を使用している場合は、SDKをダウンロードします。該当する SDK のガイドを参照してください。
6. 選択したオプションの実装ガイドに記載されている手順に従います。

     Note: リクエストメッセージは必ずUID2まで暗号化してください。詳細は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md)を参照してください。
7. (条件付き)CRM オンボーディングソリューションを実装する場合は、データプロバイダワークフローのための資格情報の別のセットを要求します。[APIキー](../getting-started/gs-api-keys.md)を参照してください。
8. テストします。
9. 本番稼働します。

## Frequently Asked Questions for DSPs

DSP向けのFAQ一覧は、[デマンドサイドプラットフォーム (DSP)向けFAQ](../getting-started/gs-faqs.md#faqs-for-demand-side-platforms-dsps) を参照してください。

## FAQs for DSPs

UID2 フレームワークを使用する DSP に関するよくある質問については、 [FAQs for DSPs](../getting-started/gs-faqs.md#faqs-for-dsps) を参照してください。