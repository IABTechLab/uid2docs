---
title: Documentation Updates
description: UID2 ドキュメントの重要な更新の概要
hide_table_of_contents: false
sidebar_position: 06
---

# Documentation Updates

UID2 ドキュメンテーションリソースの最新アップデートを確認してください。

### New: UID2 Private Operator for Azure Integration Guide

30 November 2023

[Private Operator](../ref-info/glossary-uid.md#gl-private-operator) の運用を希望する UID2 <a href="../intro#participants">参加者は</a>、Microsoft Azure のコンフィデンシャルコンピューティングオプションである Confidential Container で UID2 Operator Service をセットアップできるようになりました。

詳細については、[UID2 Private Operator for Azure Integration Guide](../guides/operator-guide-azure-enclave.md) を参照してください。

### New: API Permissions

22 November 2023

UID2 ウェブサイトの Getting Started セクションに新しい記事が掲載され、主要な UID2 権限、よく使う参加者のタイプ、関連する主なアクティビティについての情報が提供されています。

詳細は、[API Permissions](../getting-started/gs-permissions.md) を参照してください。

### New: UID2 Credentials Page

21 November 2023

以前の **API Keys** ページを新しいページに置き換えました。このページには、Server-Sideの実装戦略に従った場合の認証情報についての情報が含まれています。

詳細は [UID2 Credentials](../getting-started/gs-credentials.md) を参照してください。

### New: JavaScript Express Integration Guide

21 November 2023

JavaScript Express Integration Guide は、既存の URL の全く新しいドキュメントで、Client-Sideパブリッシャー実装のために UID2 SDK for JavaScript を使用する、よりシンプルな新しい方法を網羅しています。

詳細は、[JavaScript Express Integration Guide](../guides/publisher-client-side.md) を参照してください。

以前の *UID2 SDK for JavaScript Integration Guide* にあった内容は、JavaScript SDK を Server-Side に実装したいパブリッシャーのための補足文書になりました: [JavaScript Standard Integration Guide](../guides/integration-javascript-standard.md).

### New: Prebid.js Integration Guide

2 November 2023

Prebid.js Express Integration Guide は、既存の URL にまったく新しいドキュメントを追加したもので、UID2 と Prebid をインテグレーションする、Server-Side の作業を必要としない、よりシンプルな新しい方法について説明しています。

前バージョンの Prebid ドキュメントにあった内容は、Private Operator を使用しているパブリッシャーや、Server-Side でトークン生成を実装したいパブリッシャーのために、補足ドキュメントである *Prebid.js Advanced Integration Guide* に追加されました。

NOTE: これらのドキュメントは、その後の改訂でさらに更新されました。Prebid.js の Express Integration Guide は、UID2 Client-Side Integration Guide for Prebid.js になりました。更新されたリンクは以下のとおりです:
- [UID2 Integration Overview for Prebid.js](../guides/integration-prebid.md)
- [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md)
- [UID2 Server-Side Integration Guide for Prebid.js](../guides/integration-prebid-server-side.md)

### New: Opt-Out

31 October 2023

新しい "getting started" トピックでは、ユーザーのオプトアウトの概要を説明します。

詳細については、[User Opt-Out](../getting-started/gs-opt-out.md) を参照してください。

### New: AWS Entity Resolution Integration Guide

19 October 2023

この新しいガイドは、Amazon Web Services の ID ソリューションプロダクトである [AWS Entity Resolution](https://aws.amazon.com/entity-resolution/) を使用するための情報を提供し、AWS の顧客が UID2 フレームワークとインテグレーションできるようにします。

このサービスでは、DII (メールアドレスまたは電話番号) を raw UID2 に迅速かつ安全にマッピングすることができます。

詳細は [AWS Entity Resolution Integration Guide](../guides/integration-aws-entity-resolution.md) を参照してください。

### New: UID2 SDK for JavaScript Version 3 

10 October 2023

UID2 SDK for JavaScript Version 3 の機能強化に伴い、ドキュメントが大幅に更新されました。新しいドキュメントには、以前のバージョンの SDK からのアップグレードのための [Migration Guide](../sdks/client-side-identity#migration-guide) が含まれています。

詳細は以下を参照してください:
-  [UID2 SDK for JavaScript Reference Guide](../sdks/client-side-identity.md)
-  [JavaScript Standard Integration Guide](../guides/integration-javascript-standard.md)

### New: Private Operator Guide for Google Confidential Space 

30 September 2023

この新しいガイドでは、Google Cloud Platformの Confidential Computing オプションである [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space) でUID2 Operator Service を設定するための情報を提供します。

詳細は [UID2 Private Operator for GCP Integration Guide](../guides/operator-private-gcp-confidential-space.md) を参照してください。


### Update: Normalization and Encoding Rules

7 September 2023

[directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) を正規化してエンコードし、raw UID2 または UID2 Token を作成する手順を明確にした。

詳細は:

- [Email Address Hash Encoding](../getting-started/gs-normalization-encoding#email-address-hash-encoding)
- [Phone Number Hash Encoding](../getting-started/gs-normalization-encoding#phone-number-hash-encoding)

### New: IMA Mobile Plugin for Android

8 August 2023

Android 向け UID2 Interactive Media Ads(IMA)Plugin に関する情報を提供する、パブリッシャー向けの新しいガイドです。このプラグインを使用すると、Google IMA SDK for Android を使用するパブリッシャーが、Android アプリからの広告リクエストで [UID2 Token](../ref-info/glossary-uid.md#gl-uid2-token) を secure signal として送信できるようになります。

詳細は [UID2 IMA Plugin for Android Integration Guide](../guides/mobile-plugin-ima-android.md) を参照してください。


### New: IMA Mobile Plugin for iOS

8 August 2023

iOS 向け UID2 Interactive Media Ads(IMA)Plugin に関する情報を提供する、パブリッシャー向けの新しいガイドです。このプラグインを使用すると、Google IMA SDK for Android を使用するパブリッシャーが、iOS アプリからの広告リクエストで [UID2 Token](../ref-info/glossary-uid.md#gl-uid2-token) を secure signal として送信できるようになります。

詳細は [UID2 IMA Plugin for iOS Integration Guide](../guides/mobile-plugin-ima-ios.md) を参照してください。

### New: GMA Mobile Plugin for Android

4 August 2023

Android 向け UID2 Google Mobile Ads(GMA)Plugin に関する情報を提供する、パブリッシャー向けの新しいガイドです。このプラグインを使用すると、Google GMA SDK を使用するパブリッシャーが、Android アプリからの広告リクエストで [UID2 Token](../ref-info/glossary-uid.md#gl-uid2-token) を secure signal として送信できるようになります。

詳細は [UID2 GMA Plugin for Android Integration Guide](../guides/mobile-plugin-gma-android.md) を参照してください。


### New: GMA Mobile Plugin for iOS

4 August 2023

iOS 向け UID2 Google Mobile Ads(GMA)Plugin に関する情報を提供する、パブリッシャー向けの新しいガイドです。このプラグインを使用すると、Google GMA SDK を使用するパブリッシャーが、iOS アプリからの広告リクエストで [UID2 Token](../ref-info/glossary-uid.md#gl-uid2-token) を secure signal として送信できるようになります。

詳細は [UID2 GMA Plugin for iOS Integration Guide](../guides/mobile-plugin-gma-ios.md) を参照してください。

### New: UID2 Website in Japanese

3 August 2023

UID2 のウェブサイト全体が、英語だけでなく日本語でも利用できるようになりました。

詳細については、各サイトのページ上部にある言語ドロップダウンを使うか、直接 [Unified ID 2.0 in Japanese](https://unifiedid.com/ja/docs/intro) にアクセスしてください。

### New: UID2 Portal Documentation

3 August 2023

UID2 アカウントを管理できる新しい UID2 Portal ユーザーインターフェースをナビゲートするための新しいドキュメントページをいくつか公開しました。

詳細は [UID2 Portal](/docs/category/uid2-portal) を参照してください。

### New: Documentation for UID2 Sharing

3 August 2023

新しい UID2 Sharing 機能の使用をサポートするため、以下の新規および更新ドキュメントを公開しました:

- 概要、使用例、実装手順、ベストプラクティスなど、UID2 Sharing に関連する情報を提供する一連の新しいページ。[UID2 Sharing](/docs/category/uid2-sharing) を参照してください。
- UID2 Sharing をサポートするために4つの Server-side SDK を更新しました:

  - [UID2 SDK for C# / .NET: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-csharp-dotnet.md#usage-for-uid2-sharers)
  - [UID2 SDK for C++: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-cplusplus.md#usage-for-uid2-sharers)
  - [UID2 SDK for Java: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-java.md#usage-for-uid2-sharers)
  - [UID2 SDK for Python: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-python.md#usage-for-uid2-sharers)

- UID2 Sharing をサポートするための Snowflake 機能の更新。[Snowflake Integration Guide: Usage for UID2 Sharers](../guides/snowflake_integration.md#usage-for-uid2-sharers) を参照してください。

### New: Android SDK Guide

3 August 2023

パブリッシャー向けの新しいガイドでは、Android アプリをサポートする必要があるパブリッシャー向けに、UID2 を使用したクライアント ID の確立と UID2 Token の取得プロセスを容易にする SDK、UID2 SDK for Android に関する情報を提供しています。

詳細は [UID2 SDK for Android Reference Guide](../sdks/uid2-sdk-ref-android.md) を参照してください。

### New: iOS SDK Guide

3 August 2023

パブリッシャー向けの新しいガイドでは、iOS アプリをサポートする必要があるパブリッシャー向けに、UID2 を使用したクライアント ID の確立と UID2 Token の取得プロセスを容易にする SDK、UID2 SDK for iOS に関する情報を提供しています。

詳細は [UID2 SDK for iOS Reference Guide](../sdks/uid2-sdk-ref-ios.md) を参照してください。

<!-- ### New: Prebid Integration Guide

1 August 2023

UID2 とインテグレーションし、RTB ビッドストリームで Prebid が渡す UID2 Token (Advertising Token) を生成したいパブリッシャー向けの新しいガイドです。

詳細は [UID2 Integration Overview for Prebid.js](../guides/integration-prebid.md) を参照してください。[doc name updated] -->