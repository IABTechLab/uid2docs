---
title: SDK for Android
description: Android SDK のリファレンス情報。
hide_table_of_contents: false
sidebar_position: 12
---

import Link from '@docusaurus/Link';

# SDK for Android Reference Guide

Android SDK を使用すると、UID2 を使用したクライアント ID の生成または確立、<Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link> 用の Advertising Token の取得、および UID2 Token の自動リフレッシュを容易に行うことができます。

以下の Android 関連プラグインと関連ドキュメントも利用可能です。

| Purpose | Product/Documentation |
| :--- | :--- |
| Google Mobile Ads (GMA) SDK を使用して、Android アプリからの広告リクエストで <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> を [Secure Signals](https://support.google.com/admob/answer/11556288) として送信するには、次の手順に従います。 | [UID2 GMA Plugin for Android Integration Guide](../guides/mobile-plugin-gma-android.md) |
| Google Interactive Media Ads (IMA) SDK for Android を使用して、Android アプリからの広告リクエストで <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> を [Secure Signals](https://support.google.com/admob/answer/11556288) として送信するには、次の手順に従います。 | [UID2 IMA Plugin for Android Integration Guide](../guides/mobile-plugin-ima-android.md) |

モバイルパブリッシャーインテグレーションに関する FAQs については、[FAQs for Mobile Integrations](../guides/integration-mobile-overview.md#faqs-for-mobile-integrations) を参照してください。

## Non-Mobile Android Device Support

この SDK for Android は、Android プラットフォームの非モバイルデバイスにも使用できます。

## Functionality

この SDK は、Android デバイス上で動作するアプリで UID2 をサポートしたいパブリッシャー向けに、UID2 とのインテグレーションを簡素化します。次の表に、この SDK がサポートする機能を示します。

| Encrypt Raw UID2 to UID2 Token for Sharing | Decrypt UID2 Token to Raw UID2 | Generate UID2 Token from DII | Refresh UID2 Token | Map DII to Raw UID2s | Monitor Rotated Salt Buckets |
| :--- | :--- | :--- | :--- | :--- | :--- |
| &#8212; | &#8212; | &#9989; | &#9989; | &#8212; | &#8212; |

SDK for Android は、Android アプリに代わって UID2 ID を生成または管理するように設計されています。プラットフォームネイティブの暗号化ツールを使って ID をデバイス上に安全に保存することで、アプリのライフサイクル全体にわたって UID2 ID を持続させることができます。

デフォルトでは、SDK は有効期限に基づいて UID2 ID を自動的にリフレッシュします。ただし、これを無効にして、実装アプリが UID2 ID のライフサイクルを手動で管理できるようにすることもできます。

## API Permissions

この SDK を使用するには、[Account Setup](../getting-started/gs-account-setup.md) ページに記載されている手順に従って、UID2 アカウントのセットアップを完了する必要があります。
SDK が提供する特定の機能の使用許可が与えられ、そのアクセス用の認証情報が与えられます。

## SDK Version

<!-- As of 23 Oct 2024 -->

このドキュメントは、SDK for Android バージョン 1.6.0 以降用です。

リリースノートの情報については、[https://github.com/IABTechLab/uid2-android-sdk/releases](https://github.com/IABTechLab/uid2-android-sdk/releases) を参照してください。

## GitHub Repository/Binary

この SDK は以下のオープンソースの GitHub リポジトリにあります:

- [https://github.com/IABTechLab/uid2-android-sdk](https://github.com/IABTechLab/uid2-android-sdk)

バイナリは Sonatype で公開されています:

- [https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk](https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk)

## Minimum Requirements

To consume the binary package of this SDK in your app:

- 最低限のターゲット Android バージョン: 4.4+ / API 19+ (SDK) 5.0+


開発アプリ ([Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side#client-side-integration-example) を参照してください) を実行するか、ソースコードからバイナリをビルドするには、次の最小要件が必要です:

- [code repository](https://github.com/IABTechLab/uid2-android-sdk/blob/main/gradle/libs.versions.toml) (記載されている `agp` バージョンを参照してください) で指定されている UID2 SDK に必要な Android Gradle Plugin (AGP) バージョンを確認し、対応する Android Studio バージョンが必要かどうかを確認してください。
- 最低限のターゲット Android バージョン: 4.4+ / API 19+ (SDK) 5.0+ / API 21+ (Dev-App)

<!-- See also: [Requirements](https://github.com/IABTechLab/uid2-android-sdk/blob/main/README.md#requirements). -->

## Installation

Android UID2 SDK をインストールするには、2 つの方法があります:

-   [Gradle](#installing-with-gradle)

-  [ Maven](#installing-with-maven)

### Installing with Gradle

Gradle を使用してインストールするには、build.gradle ファイルに依存関係として SDK を追加します:


```js
implementation 'com.uid2:uid2-android-sdk:1.6.0'
```

### Installing with Maven 

Maven を使用してインストールするには、`pom.xml` ファイルに依存関係として SDK を追加します:

``` xml
<dependency> 
  <groupId>com.uid2</groupId> 
  <artifactId>uid2-android-sdk</artifactId> 
  <version>1.6.0</version>
</dependency> 
```

## Usage Guidelines

**UID2Manager** シングルトンは、SDK for Android の主要な開発者 API です。UID2 Token を含む UID2 Identity の保存、リフレッシュ、取得を行います。

UDI2Manager シングルトンは使用前に初期化する必要があります。なぜなら:

-   後でのアクセスが容易になるからです。
-   消費アプリケーションがリクエストを行うためのネットワークインスタンスを提供できる可能性があるからです。

初期化は、アプリケーションインスタンスの作成時に行うことができます。次の例を参照してください:

```js
class MyApplication : Application() {
  override fun onCreate() {
    super.onCreate()
   // Initialize the UID2Manager class. Use DefaultNetworkSession rather than providing our own
   // custom implementation. This can be done to allow wrapping something like OkHttp.
   UID2Manager.init(this.applicationContext)
```

最初の UID2 Identity を確立する方法は 2 つあります:

1. DII を使用して UID2 ID を生成します&#8212;メール (ハッシュ化または非ハッシュ化) または電話番号 (ハッシュ化または非ハッシュ化) を使用します。インテグレーション手順については、[Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md) を参照してください。

2. Server-Side で UID2 ID を生成し、それを UID2 SDK に渡します。インテグレーション手順については、[Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md) を参照してください。

UID2 Mobile SDK は、UID2 identifier が確立された後に UID2 identities をリフレッシュできます。これは、リフレッシュ機能が UID2 Identity の一部である Refresh Token に依存しているためです。

## Code Samples

以下のコードサンプルは、SDK for Android を使用して具体的なアクティビティを実行する例を示しています。

初期の UID2 Identity を生成します ([Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md#configure-the-uid2-mobile-sdk) を参照してください):
``` javascript
UID2Manager.getInstance().generateIdentity(
    identityRequest: IdentityRequest,
    subscriptionId: String,
    publicKey: String,
    onResult: (GenerateIdentityResult) -> Unit
)
```
UID2 Identity を設定します ([Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server#configure-the-uid2-mobile-sdk) を参照してください):

```js
UID2Manager.getInstance().setIdentity(identity: UID2Identity)
```

Advertising SDK に渡す UID2 Token (Advertising Token) を取得します:

```js
UID2Manager.getInstance().getAdvertisingToken()
```

## UID2Manager API

このセクションには、UID2Manager APIの一部である関数と変数が含まれています。

### Functions

UID2Manager API の一部として利用可能な関数は次のとおりです:
- [generateIdentity()](#generateidentity)
- [setIdentity()](#setidentity)
- [resetIdentity()](#resetidentity)
- [refreshIdentity()](#refreshidentity)
- [getAdvertisingToken()](#getadvertisingtoken)
- [setAutomaticRefreshEnabled()](#setautomaticrefreshenabled)

#### generateIdentity()

<Link href="../ref-info/glossary-uid#gl-dii">D直接識別情報 (DII)</Link> を使用して UID2 Identity を生成します。手順については、*Client-Side Integration Guide for Mobile* の [Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md#configure-the-uid2-mobile-sdk) を参照してください。

#### setIdentity()

SDK が管理する、Server-Side で作成された UID2 Identity を設定します。詳細については、*Client-Server Integration Guide for Mobile* の [Configure the UID2 Mobile SDK](../guides/integration-mobile-client-server.md#configure-the-uid2-mobile-sdk) を参照してください。

#### resetIdentity()

SDK が管理している UID2 Identity をリセットまたは削除します。

#### refreshIdentity()

SDK が管理している UID2 Identity を手動でリフレッシュします。

#### getAdvertisingToken()

現在の UID2 Identity が有効である場合、この関数は UID2 Token (Advertising Token) を返します。

#### setAutomaticRefreshEnabled()

自動リフレッシュ機能の有効/無効を切り替えます。

### Variables

UID2Manager API の一部として利用可能な変数は次のとおりです:

- [identity](#identity)
- [identityStatus](#identitystatus)

#### identity

Identity 変数は、SDK が管理している現在の UID2 Identity を格納し、返します。

#### identityStatus

identityStatus 変数は、SDK が管理している現在の UID2 Identity のステータスを格納し、返します。

