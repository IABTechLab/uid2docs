---
title: UID2 SDK for Android
description: Android SDK のリファレンス情報。
hide_table_of_contents: false
sidebar_position: 12
---

# UID2 SDK for Android Reference Guide

<!-- This guide includes the following information:

- [Functionality](#functionality)
- [API Permissions](#api-permissions)
- [SDK Version](#sdk-version)
- [Features](#features)
- [GitHub Repository/Binary](#github-repositorybinary)
- [Minimum Requirements](#minimum-requirements)
- [Installation](#installation)
  -  [Installing with Gradle ](#installing-with-gradle)
  -  [Installing with Maven ](#installing-with-maven)
- [Usage Guidelines](#usage-guidelines)
- [UID2Manager API](#uid2manager-api)
  -  [Functions](#functions)
  -  [Variables](#variables)
- [Android Initialization](#android-initialization)
- [Code Samples](#code-samples) -->

UID2 SDK for Android を使用すると、UID2 を使用してクライアント ID を確立し、Android デバイス上で Advertising Token を取得するプロセスを容易にすることができます。

以下の Android 関連プラグインと関連ドキュメントも利用できます。

| Purpose | Product/Documentation |
| :--- | :--- |
| Google Mobile Ads (GMA) SDK を使用して、Android アプリからの広告リクエストで [UID2 Token](../ref-info/glossary-uid.md#gl-uid2-token) を [Secure Signal](https://support.google.com/admob/answer/11556288) として送信するには、次の手順に従います。 | [UID2 GMA Plugin for Android Integration Guide](../guides/mobile-plugin-gma-android.md) |
| Google Interactive Media Ads (IMA) SDK for Android を使用して、Android アプリからの広告リクエストで [UID2 Token](../ref-info/glossary-uid.md#gl-uid2-token) を [Secure Signal](https://support.google.com/admob/answer/11556288) として送信するには、次の手順に従います。 | [UID2 IMA Plugin for Android Integration Guide](../guides/mobile-plugin-ima-android.md) |

## Functionality

この SDK は、Android デバイス上で動作するアプリで UID2 をサポートしたいパブリッシャー向けに、UID2 とのインテグレーションを簡素化します。以下の表に、この SDK がサポートする機能を示します。

| Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token | Generate UID2 Token from DII | Refresh UID2 Token |
| :--- | :--- | :--- | :--- |
| Not supported | Not supported | Not supported | Supported |

## API Permissions

この SDK を使用するには、[Account Setup](../getting-started/gs-account-setup.md) ページに記載されている手順に従って、UID2 アカウントのセットアップを完了する必要があります。

SDK が提供する特定の機能の使用許可が与えられ、そのアクセス用の認証情報が与えられます。SDK には、使用する権限を持たない機能があるかもしれないことに留意してください。例えば、パブリッシャーはトークンの生成と更新のために特定の API Permissions を取得しますが、SDK は共有などの他のアクティビティをサポートするかもしれません。

詳細は、[API Permissions](../getting-started/gs-permissions.md) を参照してください。

## SDK Version

<!-- As of 2023-07-15 -->

このドキュメントは UID2 Android SDK バージョン 0.5.0 以降用です。

特定のリリース・バージョンについては、[https://github.com/IABTechLab/uid2-android-sdk/releases](https://github.com/IABTechLab/uid2-android-sdk/releases) を参照してください。

## Features

UID2 Android SDK は、Android アプリに代わって UID2 Identity を管理するように設計されています。プラットフォームネイティブの暗号化ツールを使って Identity をデバイス上に安全に保存することで、アプリのライフサイクル全体にわたって UID2 Identity を持続させることができます。

デフォルトでは、SDK は有効期限に基づいて UID2 Identity を自動的にリフレッシュします。ただし、これを無効にして、実装アプリが UID2 Identity のライフサイクルを手動で管理できるようにすることもできます。

## GitHub Repository/Binary

この SDK は以下のオープンソースの GitHub リポジトリにあります:

- [https://github.com/IABTechLab/uid2-android-sdk](https://github.com/IABTechLab/uid2-android-sdk)

バイナリは Sonatype で公開されています:

- [https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk](https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk)

## Minimum Requirements

この SDK の最小要件は以下の通りです:

- Android Studio version: 2022.1.1 Patch 2+
- Minimum target Android version: 4.4+ / API 19+ (SDK) 5.0+ / API 21+ (Dev-App)

<!-- See also: [Requirements](https://github.com/IABTechLab/uid2-android-sdk/blob/main/README.md#requirements). -->

## Installation

Android UID2 SDK をインストールするには、2 つの方法があります:

-   [Gradle](#installing-with-gradle)

-  [ Maven](#installing-with-maven)

### Installing with Gradle

Gradle を使用してインストールするには、build.gradle ファイルに依存関係として SDK を追加します:


``` javascript
implementation 'com.uid2:uid2-android-sdk:0.5.0'
```

### Installing with Maven 

Maven を使用してインストールするには、`pom.xml` ファイルに依存関係として SDK を追加します:

``` xml
<dependency> 
  <groupId>com.uid2</groupId> 
  <artifactId>uid2-android-sdk</artifactId> 
  <version>0.5.0</version> 
</dependency> 
```

## Usage Guidelines

最初の UID2 Identity は、実装アプリケーションが生成し、UID2 SDK に渡す必要があります。セキュリティ要件のため、UID2 Mobile SDK は新しい UID2 Identity を作成できません。

UID2 Mobile SDKは、ID が確立された後、UID2 Identity のリフレッシュを実行できます。これは、リフレッシュ機能が UID2 Identity の一部である Refresh Token に依存しているからです。

**UID2Manager** シングルトンは、UID2 Android および iOS SDK の主要な開発者 API です。UID2 Identity の保存、リフレッシュ、取得を行います。

Android では、`UID2Manager` を使用する前に手動で初期化する必要があります。[Android Initialization](#android-initialization) を参照してください。

## UID2Manager API

このセクションには、UID2Manager API の一部である関数と変数が含まれています。

### Functions

UID2Manager API の一部として、以下の関数が利用できます:
- [setIdentity()](#setidentity)
- [resetIdentity()](#resetidentity)
- [refreshIdentity()](#refreshidentity)
- [getAdvertisingToken()](#getadvertisingtoken)
- [setAutomaticRefreshEnabled()](#setautomaticrefreshenabled)

#### setIdentity()

SDK が管理する UID2 Identity を設定します。

#### resetIdentity()

SDK が現在管理している UID2 Identity をリセットまたは削除します。

#### refreshIdentity()

SDK が管理している UID2 Identity を手動でリフレッシュします。

#### getAdvertisingToken()

現在の UID2 Identity が有効な場合、この関数は UID2 Token (Advertising Token) を返します。

#### setAutomaticRefreshEnabled()

自動更新機能のトグルです。

### Variables

UID2Manager API では、以下の変数を使用できます:

- [identity](#identity)
- [identityStatus](#identitystatus)

#### identity

identity 変数は、SDK によって管理されている現在の UID2Identity データオブジェクトを格納し、返します。

#### identityStatus

identityStatus 変数は、SDK が管理している現在の UID2 Identity のステータスを格納し、返します。

## Android Initialization

Android の実装では、使用前にシングルトンを初期化します。これには2つの意味があります:

- 後で簡単にアクセスできるようになります。

- 使用側アプリケーションがリクエストの作成を担当する独自のネットワークインスタンスを提供できるようになります。

初期化は、次の例に示すように、APPLICATION インスタンスの生成時に行うことができます:

``` javascript
class MyApplication : Application() {
  override fun onCreate() {
    super.onCreate()
   // Initialize the UID2Manager class. Use DefaultNetworkSession rather than providing our own
   // custom implementation. This can be done to allow wrapping something like OkHttp.
   UID2Manager.init(this.applicationContext)
```

## Code Samples

以下のコードサンプルは、UID2 Android SDK を使用して UID2 を管理する具体的なアクティビティを実行する例です。

初期 UID2 Identity を設定します:

``` javascript
UID2Manager.getInstance().setIdentity(identity: UID2Identity)
```

SDK に渡す UID2 Token (Advertising Token) を取得します:

``` javascript
UID2Manager.getInstance().getAdvertisingToken()
```
