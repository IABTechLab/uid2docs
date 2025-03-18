---
title: UID2 IMA Plugin for iOS
description: iOS アプリの広告リクエストに IMA を使用するパブリッシャー向けのガイド。
hide_table_of_contents: false
sidebar_position: 15
---

import Link from '@docusaurus/Link';

# UID2 IMA Plugin for iOS Integration Guide

UID2 Interactive Media Ads (IMA) Plugin for iOS は、[Google IMA SDK for iOS](https://developers.google.com/interactive-media-ads/docs/sdks/ios/client-side) を使用するパブリッシャーが、iOS アプリからの広告リクエストで <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> を [Secure Signals](https://support.google.com/admob/answer/11556288) として送信できるようにします。これは自動的に行われるため、アプリ開発者が直接コーディングする必要はありません。

## Functionality

このプラグインは、iOS デバイス上で動作するアプリの UID2 をサポートしたいパブリッシャー向けに、Google Interactive Media Ads(IMA) とのインテグレーションを簡素化します。

## Version

<!-- As of 2024-10-23 -->

このドキュメントはUID2 IMA Plugin for iOS version 1.0.0 以降用です。

## GitHub Repository

このプラグインは以下のオープンソースの GitHub リポジトリにあります:

- [https://github.com/IABTechLab/uid2-ios-plugin-google-ima](https://github.com/IABTechLab/uid2-ios-plugin-google-ima)

## Complete UID2 Account Setup and Configure Account

UID2 とインテグレーションするには、UID2 アカウントが必要です。アカウントを作成していない場合は、まず [Account Setup](../getting-started/gs-account-setup.md) ページの手順に従ってください。

アカウントの初期設定が完了すると、[UID2 Portal](../portal/portal-overview.md) にアクセスするための手順とリンクが送信されます。ここで、本番環境用の [credentials](../getting-started/gs-credentials.md) を作成し、必要に応じて追加の値を設定できます。詳細については、[Getting Started with the UID2 Portal](../portal/portal-getting-started.md) を参照してください。

UID2 Portal で実行する手順は、実装が　Client-Side、Client-Server、Server-Side のいずれであるかによって異なります。各実装ガイドに具体的な手順が記載されています。概要については、[Client-Side, Client-Server, or Server-Side Integration?](integration-mobile-overview#client-side-client-server-or-server-side-integration) を参照してください。

## Requirements 

このプラグインを実行するには、以下をインストールします:

1. Google IMA SDK v3.19.1 or later:
   - [SDK](https://developers.google.com/interactive-media-ads/docs/sdks/ios/client-side)
   - [Release history](https://developers.google.com/interactive-media-ads/docs/sdks/ios/client-side/history)
1. SDK for iOS v1.7.0 or later:
   - [SDK](https://github.com/IABTechLab/uid2-ios-sdk)
   - [SDK for iOS Reference Guide](../sdks/sdk-ref-ios.md)
1. [UID2 IMA Plugin for iOS v1.0.0](https://github.com/IABTechLab/uid2-ios-plugin-google-ima)

## Installation

前提条件: Google Interactive Ads SDK と SDK for iOS をインストールします。

SDK for iOS と Google Interactive Ads SDK がインストールされた既存のアプリに、Swift Package Manager または CocoaPods を使用して UID2 iOS IMA Plugin をインストールします。

3つのインストールオプションがあります:

-   [Package.swift](#installing-with-packageswift)
-   [Xcode](#installing-with-xcode)
-   [CocoaPods](#installing-with-cocoapods)

### Installing with Package.swift

Package.swift に次の依存関係を追加します:

```js
dependencies: [
  .package(url: "https://github.com/IABTechLab/uid2-ios-plugin-google-ima.git", exact: "1.0.0")
]
```

### Installing with Xcode

XCode ユーザーインターフェースで、パッケージ依存関係の下に、次のエントリを追加します:

| Name | Location | Dependency Rule |
| :--- | :--- | :--- | 
| uid2-ios-plugin-google-ima | `git@github.com:IABTechLab/uid2-ios-plugin-google-ima.git` | Exact Version: 1.0.0 |

### Installing with CocoaPods

`Podfile` に次のエントリを追加します:

```
pod 'UID2IMAPlugin', '1.0.0'
```
