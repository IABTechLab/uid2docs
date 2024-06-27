---
title: UID2 IMA Plugin for iOS
description: iOS アプリの広告リクエストに IMA を使用するパブリッシャー向けのガイド。
hide_table_of_contents: false
sidebar_position: 15
---

import Link from '@docusaurus/Link';

# UID2 IMA Plugin for iOS Integration Guide

UID2 Interactive Media Ads (IMA) Plugin for iOS は、[Google IMA SDK for iOS](https://developers.google.com/interactive-media-ads/docs/sdks/ios/client-side) を使用するパブリッシャーが、iOS アプリからの広告リクエストで <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> を [Secure Signal](https://support.google.com/admob/answer/11556288) として送信できるようにします。これは自動的に行われるため、アプリ開発者が直接コーディングする必要はありません。

## Functionality

このプラグインは、iOS デバイス上で動作するアプリの UID2 をサポートしたいパブリッシャー向けに、Google Interactive Media Ads(IMA) とのインテグレーションを簡素化します。

## Version

<!-- As of 2023-07-15 -->

このドキュメントはUID2 IMA Plugin for iOS version 0.3.2 以降用です。

## GitHub Repository

このプラグインは以下のオープンソースの GitHub リポジトリにあります:

- [https://github.com/IABTechLab/uid2-ios-plugin-google-ima](https://github.com/IABTechLab/uid2-ios-plugin-google-ima)

## Requirements 

このプラグインを実行するには、以下をインストールします:

1. Google IMA SDK v3.19.1 or later:
   - [SDK](https://developers.google.com/interactive-media-ads/docs/sdks/ios/client-side)
   - [Release history](https://developers.google.com/interactive-media-ads/docs/sdks/ios/client-side/history)
1. UID2 SDK for iOS v0.3.2 or later:
   - [SDK](https://github.com/IABTechLab/uid2-ios-sdk)
   - [UID2 SDK for iOS Reference Guide](../sdks/uid2-sdk-ref-ios.md)
1. [UID2 IMA Plugin for iOS v0.3.2](https://github.com/IABTechLab/uid2-ios-plugin-google-ima)

## Installation

前提条件: Google Interactive Ads SDK と UID2 SDK for iOS をインストールします。

UID2 SDK for iOS と Google Interactive Ads SDK がインストールされた既存のアプリに、Swift Package Manager または CocoaPods を使用して UID2 iOS IMA Plugin をインストールします。

3つのインストールオプションがあります:

-   [Package.swift](#installing-with-packageswift)
-   [Xcode](#installing-with-xcode)
-   [CocoaPods](#installing-with-cocoapods)

### Installing with Package.swift

Package.swift に次の依存関係を追加します:

```js
dependencies: [
  .package(url: "https://github.com/IABTechLab/uid2-ios-plugin-google-ima.git", exact: "0.3.2")
]
```

### Installing with Xcode

XCode ユーザーインターフェースで、パッケージ依存関係の下に、次のエントリを追加します:

| Name | Location | Dependency Rule                         |
| :--- | :--- |:----------------------------------------| 
| uid2-ios-plugin-google-ima | `git@github.com:IABTechLab/uid2-ios-plugin-google-ima.git` | Exact Version: 0.3.2 |

### Installing with CocoaPods

`Podfile` に次のエントリを追加します:

```
pod 'UID2IMAPlugin', '0.3.2'
```
