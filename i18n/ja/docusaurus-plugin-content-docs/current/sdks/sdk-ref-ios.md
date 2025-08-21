---
title: SDK for iOS
description: iOS SDK のリファレンス情報。
hide_table_of_contents: false
sidebar_position: 14
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# SDK for iOS Reference Guide

iOS SDK を使用すると、UID2 を使用したクライアント ID の生成または確立、<Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link> 用の Advertising Token の取得、および UID2 Token の自動リフレッシュを容易に行うことができます。

以下の iOS 関連プラグインと関連ドキュメントも利用可能です。

| Purpose | Product/Documentation |
| :--- | :--- |
| Google Mobile Ads (GMA) SDK を使用して iOS/tvOS アプリから広告リクエストで [secure signals](https://support.google.com/admob/answer/11556288) として <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 Token</Link> を送信する | [UID2 GMA Plugin for iOS Integration Guide](../guides/mobile-plugin-gma-ios.md) |
| Google Interactive Media Ads SDK for iOS を使用して iOS/tvOS アプリから広告リクエストで [secure signals](https://support.google.com/admob/answer/11556288) として <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 Token</Link> を送信する | [UID2 IMA Plugin for iOS Integration Guide](../guides/mobile-plugin-ima-ios.md) |

## tvOS Support
Although this page refers to SDK for iOS, this SDK also supports tvOS. For the required tvOS version, see [Minimum Requirements](#minimum-requirements).

## Functionality

この SDK は、iOS デバイス上で動作するアプリで UID2 をサポートしたいパブリッシャー向けに、UID2 とのインテグレーションを簡素化します。次の表に、この SDK がサポートする機能を示します。

| Encrypt Raw UID2 to UID2 Token for Sharing | Decrypt UID2 Token to Raw UID2 | Generate UID2 Token from DII | Refresh UID2 Token | Map DII to Raw UID2s | Monitor Rotated Salt Buckets |
| :--- | :--- | :--- | :--- | :--- | :--- |
| &#8212; | &#8212; | &#9989; | &#9989; | &#8212; | &#8212; |

SDK for iOS は、iOS アプリケーションに代わって UID2 ID を生成または管理するように設計されています。プラットフォームネイティブの暗号化ツールを使って ID をデバイスに安全に保存することで、UID2 ID をアプリのライフサイクル全体にわたって持続させることができます。

デフォルトでは、SDK は有効期限に基づいて UID2 ID を自動的にリフレッシュします。ただし、これを無効にして、アプリが UID2 IDのライフサイクルを手動で管理できるように実装することもできます。

## UID2 Account Setup

UID2 とインテグレーションするには、UID2 アカウントが必要です。アカウントを作成していない場合は、まず [Account Setup](../getting-started/gs-account-setup.md) ページの手順に従ってください。

## API Permissions

初期アカウント設定が完了すると、[UID2 Portal](../portal/portal-overview.md) にアクセスするための手順とリンクが送信されます。以下の操作が可能です:
- アカウント用の [credentials](../getting-started/gs-credentials.md) を生成します。
- オプション: Client-Side の実装の場合、ドメイン名やモバイルアプリ ID などの設定値を設定します。
- オプションとして、チームメンバーに関する情報を設定するなど、他の値を設定します。

UID2 Portal で実行する手順は、実装が Client-Side、Client-Server、Server-Side のいずれであるかによって異なります。モバイルインテグレーションのオプションの概要は、[Client-Side, Client-Server, or Server-Side Integration?](../guides/integration-mobile-overview#client-side-client-server-or-server-side-integration) を参照してください。

<!-- You'll be granted permission to use specific functions offered by the SDK, and given credentials for that access. -->

## SDK Version

<!-- As of 2025-08-07 -->

このドキュメントは、iOS 用 UID2 SDK のバージョン 2.0.0 以降に対応しています。

リリースノートの情報は、[https://github.com/IABTechLab/uid2-ios-sdk/releases](https://github.com/IABTechLab/uid2-ios-sdk/releases) を参照してください。

## GitHub Open-Source Repository

この SDK は以下のオープンソースの GitHub リポジトリにあります:

- [https://github.com/IABTechLab/uid2-ios-sdk](https://github.com/IABTechLab/uid2-ios-sdk)

## Minimum Requirements

この SDK の最小要件は以下の通りです:

- Xcode バージョン: 15.0+
- iOS	最低対象バージョン: 13.0+
  - すべての機能を使用するには: 13.0+
  - 一部の機能を使用するには: 12.0+。SDK を統インテグレーションしたアプリはすべてのデバイスにインストールできますが、iOS バージョンが 13.0 未満のデバイスでは、Client-Side で UID2 Token を生成または取得することはできません。
- tvOS 最低対象バージョン: 13.0+
- Swift バージョン: 5.0+

<!-- See also: [Requirements](https://github.com/IABTechLab/uid2-ios-sdk/blob/main/README.md#requirements). -->

## Installation

Swift Package Manager (SPM) を使って iOS SDK をインストールします。2つのインストールオプションがあります:

-   [Package.swift](#installing-with-packageswift)
-   [Xcode](#installing-with-xcode)
-   [CocoaPods](#installing-with-cocoapods)

### Installing with Package.swift

Package.swift に次の依存関係を追加します:

```js
dependencies: [
  .package(url: "https://github.com/IABTechLab/uid2-ios-sdk.git", from: "2.0.0"),
]
```

### Installing with Xcode

アプリの Package Dependencies に次のエントリを追加します:

| Name | Location | Dependency Rule |
| :--- | :--- | :--- |
| uid2-ios-sdk | `git@github.com:IABTechLab/uid2-ios-sdk.git` | Up to next major version: 2.0.0 < 3.0.0 |

### Installing with CocoaPods

`Podfile` に次のエントリを追加します:

```
pod 'UID2', '~> 2.0'
```

## Usage Guidelines

**UID2Manager** シングルトンは、SDK for iOS の主要な開発者 API です。UID2 Token を含む UID2 Identity の保存、リフレッシュ、取得を行います。

iOS の場合、`UID2Manager` は初めてアクセスされたときに自動的に初期化されます。自動または手動のリフレッシュ機能をサポートするように設定できます。

UID2 Identity を確立する方法は2つあります:

1. DII を使用して UID2 ID を生成します&#8212;メール (ハッシュ化または非ハッシュ化) または電話番号 (ハッシュ化または非ハッシュ化) を使用します。インテグレーション手順は、[Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md) を参照してください。

2. Server-Side で UID2 ID を生成し、それを UID2 SDK に渡します。インテグレーション手順は、[Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md) を参照してください。

UID2 Mobile SDK は、UID2 identifier が確立された後に UID2 identities をリフレッシュできます。これは、リフレッシュ機能が UID2 Identity の一部である Refresh Token に依存しているためです。


## Code Samples

以下のコードサンプルは、iOS SDK を使用して UID2 を管理する特定のアクティビティを実行する例を示します。

初期の UID2 Identity を生成します (手順は、[Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side#configure-the-uid2-mobile-sdk) を参照):

```js
UID2Manager.shared.generateIdentity(
    _ identity: IdentityType,
    subscriptionID: String,
    serverPublicKey: String,
    appName: String? = nil
)
```
初期 UID2 Identity を設定します (手順は、[Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server#configure-the-uid2-mobile-sdk) を参照):

``` javascript
UID2Manager.shared.setIdentity(_ identity: UID2Identity)
```

Advertising SDK (広告リクエストまたはビッドストリーム使用) に渡す UID2 Token (Advertising Token) を取得します:

```js
UID2Manager.shared.getAdvertisingToken()
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

<Link href="../ref-info/glossary-uid#gl-dii">直接識別情報 (DII)</Link> を使用して UID2 Identity を生成します。詳細は、*Client-Side Integration Guide for Mobile* の [Configure the UID2 Mobile SDK](../guides/integration-mobile-client-side.md#configure-the-uid2-mobile-sdk) を参照してください。

#### setIdentity()

SDK が管理する、Server-Side で作成された UID2 Identity を設定します。詳細は、*Client-Server Integration Guide for Mobile* の [Configure the UID2 Mobile SDK](../guides/integration-mobile-client-server.md#configure-the-uid2-mobile-sdk) を参照してください。

#### resetIdentity()

SDK が管理している UID2 Identity をリセットまたは削除します。

#### refreshIdentity()

SDK が管理している UID2 Identity を手動でリフレッシュします。

#### getAdvertisingToken()

現在の UID2 Identity が有効である場合、この関数は UID2 Token (Advertising Token) を返します。

#### setAutomaticRefreshEnabled()

自動リフレッシュ機能の有効/無効を切り替えます。

### Variables

UID2Manager APIでは、以下の変数を使用できます:

- [identity](#identity)
- [identityStatus](#identitystatus)

#### identity

Identity 変数は、SDK によって管理されている現在の UID2Identity データオブジェクトを格納し、返します。

#### identityStatus

identityStatus変数は、SDKが管理している現在のUID2 Identityのステータスを格納し、返します。
