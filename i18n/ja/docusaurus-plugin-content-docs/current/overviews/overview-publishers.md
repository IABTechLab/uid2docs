---
title: Publishers
description: パブリッシャー向けの情報の概要。
hide_table_of_contents: false
sidebar_position: 02
use_banner: true
banner_title: パブリッシャー向け UID2 概要
banner_description: 変化し続ける広告業界においてオーディエンスターゲティングを維持し、より良いインプレッション収益化と関連性の向上を実現します。
---

パブリッシャーとして、Unified ID 2.0 のクロスデバイスプレゼンスの恩恵を受け、すべてのインベントリで一貫したIDファブリックを活用することができます。

以下のセクションでは、UID2 を採用するパブリッシャーにとっての利点、ワークフロー、ドキュメント、その他のリソースに関する情報を提供します。

## Audience

このページは、以下のUID2参加者のためのものです:

- UID2 を使用して RTB ビッドストリーム用の ID トークンを生成したいが、UID2 対応のシングルサインオンや ID プロバイダーではなく、UID2 と直接インテグレーションしたいウェブアセットを持つパブリッシャー。
- UID2 Token を SSP 経由でビッドストリームに伝播させるすべての組織&#8212;例えば、ID プロバイダーや SSO プロバイダーなどです。

<!-- - Data clean rooms. -->

パブリッシャーは、さまざまな方法で UID2 とのインテグレーションを選択することができます:

- SDK を使用するか、UID2 API を使用して、UID2 と直接インテグレーションします。
- SSO プロバイダを使用します。
- パブリッシャーに代わって UID2 インテグレーションを管理する独立した ID プロバイダーと連携します。

## Benefits of UID2 for Publishers

UID2 とインテグレーションすることで得られるメリットの一部を次に示します:
- デスクトップ、モバイル、CTVで、単一の識別子でアドレサブルなオーディエンスターゲティング。
- デバイスをまたいだフリケンシー。
- より適切なコンテンツのリコメンデーション。
- 関連するコンテンツでパーソナライズされた広告体験を提供する機能。
- 消費者のプライバシー管理を向上させることを目的とした、オプトアウトを提供する機能。

## Workflow for Publishers

以下の手順は、ID プロバイダー、パブリッシャー、SSO プロバイダーなど、SSP を介して UID2 Token をビッドストリームに伝播する組織を想定したワークフローの概要です。パブリッシャーは、UID2 と相互運用可能で、パブリッシャーに代わって UID2 インテグレーションを処理できる SSO プロバイダーまたは独立した ID プロバイダーと連携することを選択できます。

1. ユーザーがパブリッシャーのウェブサイト、モバイルアプリ、CTV アプリにアクセスします。
2. パブリッシャーがオープンインターネットの価値交換について説明し、ログインなどの手段でメールアドレスや電話番号の提供をユーザーに求めあす。
3. ユーザーがログインすると、パブリッシャーが SDK または直接 API インテグレーションを介して、メールアドレスまたは電話番号を UID2 Operator に送信します。

   パブリッシャーは、SSO プロバイダーやID プロバイダーに、DII やプライバシーの設定を自分たちの代わりに渡すことができます。
4. UID2 Operator:
   - メールアドレスまたは電話番号を受け取ります。
   - ソルト化、ハッシュ化、暗号化処理を行います。
   - UID2 Token を返します。
5. パブリッシャーが UID2 Token を保存し、リアルタイムびっディングの際に SSP と共有します。
   - Server-Side: パブリッシャーは、トークンをマッピングテーブル、DMP、データレイク、またはその他の Server-Side アプリケーションに格納します。
   - Client-Side: パブリッシャーは、トークンをクライアントサイドアプリ、または First-Party Cookie としてユーザーのブラウザに保存します。
6. パブリッシャーが UID2 Token をストレージから取得します。
6. パブリッシャーは UID2 Token を SSP に送信する。
7. SSP は UID2 Token を含むビッドリクエストをビッドストリームに入れます。

<!-- The publisher requests updated UID2 tokens using a refresh token. When applicable, the refresh token includes a user’s opt-out request. -->

![Publisher Workflow](images/UID2PublisherAndSSPWorkflow.jpg)

## Getting Started

次の手順で始めます:

1. [Request Access](/request-access) ページのフォームに記入して、UID2 へのアクセスをリクエストします。
1. UID2 とインテグレーションしたいプロパティを特定する。
1. UID2 契約を締結します。
1. UID2 認証キー ([UID2 Credentials](../getting-started/gs-credentials.md)) を受け取ります。
1. 該当するドキュメントを参照し、SDK または UID2 API との直接インテグレーションを通じて、UID2 とのインテグレーションを行います。

     NOTE: UID2 へのリクエストメッセージは必ず暗号化してください。詳細については、[Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md) を参照してください。
1. テスト： 

    ビッドリクエストで UID2 が適切に渡されるように、SSP と連携します。
    
    UID2 が生成され、リクエストで正しく渡されることを確認します。
1. 本番稼動します。

## Resources

パブリッシャーが UID2 を実装するために、以下のドキュメントリソースが利用可能です:
- [Web Integrations](#web-integrations)
- [Mobile Integrations](#mobile-integrations)
- [Prebid Integrations](#prebid-integrations)
- [Google Ad Manager Integrations](#google-ad-manager-integrations)

### Web Integrations

以下のリソースは、パブリッシャーの Web インテグレーションに利用できます。

| Integration Type                    | Integration Guide                                                                                     | Content Description                                                                                                                                                                                                                                                    | Audience |
|:------------------------------------|:------------------------------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| :--- |
| Prebid                              | [Prebid.js Express Integration Guide](../guides/integration-prebid.md)                                | UID2 と Prebid.js をインテグレーションしたいパブリッシャー向けのインテグレーションガイドです。Prebid.js はトークンの生成と更新を自動的に管理し、トークンを RTB ビッドストリームに渡します。このガイドは、クライアントサイドで UID2 Token をリクエストしたいパブリッシャー向けのもので、最も簡単な実装方法です。 | Publishers |
| JavaScript Client-Side Integration  | [JavaScript Express Integration Guide](../guides/publisher-client-side.md)                            | 最も簡単な実装方法で、クライアントサイドの JavaScript の変更だけで UID2 とインテグレーションしたいパブリッシャー向けのインテグレーションガイドです。                                                         | Publishers |
| Prebid                              | [Prebid.js Advanced Integration Guide](../guides/integration-prebid-advanced.md)                      | UID2 とインテグレーションし、RTB ビッドストリームで Prebid から渡される ID トークンを生成したいパブリッシャー向けのインテグレーションガイドです。このガイドは、Private Operator を使用しているか、サーバーサイドでトークンを生成したいパブリッシャー向けです。 | Publishers |
| JavaScript Client-Side Integration  | [JavaScript Standard Integration Guide](../guides/integration-javascript-standard.md) | パブリッシャー向けのこのインテグレーションガイドでは、UID2 SDK for JavaScript を使用する標準的な Web インテグレーションシナリオについて説明します。トークンをサーバーサイドで生成し、パブリッシャーのウェブページに渡す必要があります。                                                                                        | Publishers |
| Server-Side Integration             | [Publisher Integration Guide, Server-Only](../guides/custom-publisher-integration.md)                 | このインテグレーションガイドは、[UID2 SDK for JavaScript Reference Guide](../sdks/client-side-identity.md) を使用しないパブリッシャー向けです。                                                                                                                               | Publishers |
| Publisher/SSP Integration with GAM  | [Publisher - Google Ad Manager Secure Signals](../guides/google-ss-integration.md)                    | このインテグレーションガイドでは、UID2 を Google Ad Manager のセキュアシグナル機能（旧称：パブリッシャー向け暗号化シグナル、ESP）で使用するパブリッシャーに必要な追加手順について説明します。

### Mobile Integrations

以下のリソースは、パブリッシャーの Android または iOS デバイスとのインテグレーションに利用できます。

| Integration Type |                              Documentation                              |                                                                     Content Description                                                                      |  Audience  |
| :--------------- | :---------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- |
| Android          | [UID2 SDK for Android Reference Guide](../sdks/uid2-sdk-ref-android.md) | このインテグレーションガイドは、UID2 を使用してクライアントの ID を確立し、Android デバイス上で Advertising Token を取得したいパブリッシャー向けのものです。 | Publishers |
| iOS              | [UID2 SDK for iOS Reference Guide](../sdks/uid2-sdk-ref-ios.md)         | このインテグレーションガイドは、UID2 を使用してクライアントの ID を確立し、iOS デバイス上で Advertising Token を取得したいパブリッシャー向けのものです。     | Publishers |

### Prebid Integrations

Google Ad Manager とインテグレーションするパブリッシャーには、以下のリソースがあります。


| Integration Type |                                  Documentation                                   |                                                                                                                               Content Description                                                                                                                               |  Audience  |
| :--------------- | :------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------- |
| Prebid           | [Prebid.js Express Integration Guide](../guides/integration-prebid.md)                   | UID2 とインテグレーションし、RTB ビッドストリームで Prebid から渡される ID トークンを生成したいパブリッシャー向けのインテグレーションガイドです。このガイドは、Client-Side で UID2 Token を要求したいパブリッシャー向けのもので、最も簡単な実装方法です。                       | Publishers |
| Prebid           | [Prebid.js Advanced Integration Guide](../guides/integration-prebid-advanced.md) | UID2 とインテグレーションし、RTB ビッドストリームで Prebid から渡される ID トークンを生成したいパブリッシャー向けのインテグレーションガイドです。このガイドは、Private Operator を使用しているパブリッシャー、または Server-Side でトークンを生成したいパブリッシャー向けです。 | Publishers |

### Google Ad Manager Integrations

以下のリソースは、パブリッシャーの Google Ad Manager とのインテグレーションに利用できます。

|          Integration Type          |                                      Documentation                                      |                                                                                        Content Description                                                                                        |  Audience  |
| :--------------------------------- | :-------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------- |
| Publisher/SSP Integration with GAM | [Publisher - Google Ad Manager Secure Signals](../guides/google-ss-integration.md)      | このインテグレーションガイドでは、UID2 を Google Ad Manager のセキュアシグナル機能（旧称：パブリッシャー向け暗号化シグナル、ESP）で使用するパブリッシャーに必要な追加手順について説明しています。 | Publishers |
| GMA for Android                    | [UID2 GMA Plugin for Android Integration Guide](../guides/mobile-plugin-gma-android.md) | このインテグレーションガイドは、Google Mobile Ads（GMA）SDK を使用するパブリッシャーが、Android アプリからの広告リクエストに UID2 Token を含めることを可能にします。                              | Publishers |
| GMA for iOS                        | [UID2 GMA Plugin for iOS Integration Guide](../guides/mobile-plugin-gma-ios.md)         | このインテグレーションガイドは、Google Mobile Ads（GMA）SDK を使用するパブリッシャーが、iOS アプリからの広告リクエストに UID2 Token を含めることを可能にします。                                  | Publishers |
| IMA for Android                    | [UID2 IMA Plugin for Android Integration Guide](../guides/mobile-plugin-ima-android.md) | このインテグレーションガイドは、Google Interactive Media Ads (IMA) SDK を使用するパブリッシャーが、Android アプリからの広告リクエストに UID2 Token を含めることを可能にします。                   | Publishers |
| IMA for iOS                        | [UID2 IMA Plugin for iOS Integration Guide](../guides/mobile-plugin-ima-ios.md)         | このインテグレーションガイドは、Google Interactive Media Ads (IMA) SDK を使用するパブリッシャーが、iOS アプリからの広告リクエストに UID2 Token を含めることを可能にします。                       | Publishers |

<!-- ## Integrations 

For integration scenarios, token management, and other details, see [Publisher Integration Guides](../guides/summary-guides.md). See also [Endpoints](../endpoints/summary-endpoints.md).

### Direct Integration Requirements

Publishers who want to send users' DII and generate UID2s must meet the following requirements:

- Have access to the UID2 Operator API.
- Integrate with UID2 Operator API to generate UID2 tokens.
- Maintain refresh tokens or use the JavaScript client-side SDK provided by UID2 to manage the refresh token.
- Enable sending the UID2 token to SSPs and other integrating organizations.

### Integration Through SSO or Identity Providers

Publishers can choose to work with an SSO or independent ID provider who is interoperable with UID2. The provider can handle the UID2 integration on their behalf. -->

## FAQs for Publishers

UID2 フレームワークを使用するうパブリッシャー向けのよくある質問のリストは、[FAQs for Publishers](../getting-started/gs-faqs.md#faqs-for-publishers) を参照してください。