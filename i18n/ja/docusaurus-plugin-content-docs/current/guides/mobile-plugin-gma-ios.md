---
title: UID2 GMA Plugin for iOS
description: iOS アプリの広告リクエストに GMA を使用するパブリッシャーのためのガイド。
hide_table_of_contents: false
sidebar_position: 13
---

import Link from '@docusaurus/Link';

# UID2 GMA Plugin for iOS Integration Guide

UID2 Google Mobile Ads (GMA) Plugin for iOS は、[Google Mobile Ads (GMA) SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) を使用しているパブリッシャーが、iOS アプリからの広告リクエストで <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> を [secure signals](https://support.google.com/admob/answer/11556288) として送信できるようにします。これは自動的に行われるため、アプリ開発者が直接コーディングする必要はありません。

## Functionality

このプラグインは、iOS デバイス上で動作するアプリで UID2 をサポートしたいパブリッシャー向けに、Google Mobile Ads (GMA) とのインテグレーションを簡素化します。

## Version

<!-- As of 2023-07-15 -->

このドキュメントは UID2 GMA Plugin for iOS バージョン 0.3.2 以降用です。

## GitHub Repository

このプラグインは以下のオープンソースの GitHub リポジトリにあります:

- [https://github.com/IABTechLab/uid2-ios-plugin-google-gma](https://github.com/IABTechLab/uid2-ios-plugin-google-gma)

## Requirements 

このプラグインを実行するには、以下をインストールします:

1. Google Mobile Ads SDK v10.7.0 or later:
   - [SDK](https://developers.google.com/admob/ios)
   - [Release Notes](https://developers.google.com/admob/ios/rel-notes)
1. UID2 SDK for iOS v0.3.2 or later:
   - [SDK](https://github.com/IABTechLab/uid2-ios-sdk)
   - [SDK for iOS Reference Guide](../sdks/sdk-ref-ios.md)
1. [UID2 GMA Plugin for iOS v0.3.2](https://github.com/IABTechLab/uid2-ios-plugin-google-gma)

## Installation

前提条件: Google Mobile Ads SDK と UID2 SDK for iOS をインストールします。

UID2 SDK for iOS と Google Mobile Ads SDK がインストールされた既存のアプリに、Swift Package Manager または CocoaPods を使用して UID2 iOS GMA Plugin をインストールします。

インストールオプションは 3 つあります:

-   [Package.swift](#installing-with-packageswift)
-   [Xcode](#installing-with-xcode)
-   [CocoaPods](#installing-with-cocoapods)

### Installing with Package.swift

Package.swift に次の依存関係を追加します:

```js
dependencies: [
  .package(url: "https://github.com/IABTechLab/uid2-ios-plugin-google-gma.git", exact: "0.3.2")
]
```

### Installing with Xcode

XCode ユーザーインターフェースで、パッケージ依存関係の下に、次のエントリを追加します:

| Name | Location | Dependency Rule                         |
| :--- | :--- |:----------------------------------------| 
| uid2-ios-plugin-google-gma | `git@github.com:IABTechLab/uid2-ios-plugin-google-gma.git` | Exact Version: 0.3.2 |

### Installing with CocoaPods

`Podfile` に次のエントリを追加します:

```
pod 'UID2GMAPlugin', '0.3.2'
```
