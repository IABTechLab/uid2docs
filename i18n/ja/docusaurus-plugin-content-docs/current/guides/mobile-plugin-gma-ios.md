---
title: GMA Plugin for iOS
description: iOS アプリの広告リクエストに GMA を使用するパブリッシャーのためのガイド。
hide_table_of_contents: false
sidebar_position: 13
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# UID2 GMA Plugin for iOS integration guide

UID2 Google Mobile Ads (GMA) Plugin for iOS は、[Google Mobile Ads (GMA) SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) を使用しているパブリッシャーが、iOS アプリからの広告リクエストで <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 Token</Link> を [secure signals](https://support.google.com/admob/answer/11556288) として送信できるようにします。これは自動的に行われるため、アプリ開発者が直接コーディングする必要はありません。

## Functionality

このプラグインは、iOS デバイス上で動作するアプリで UID2 をサポートしたいパブリッシャー向けに、Google Mobile Ads (GMA) とのインテグレーションを簡素化します。

## Version

<!-- As of 2026-06-12 -->

このドキュメントは UID2 GMA Plugin for iOS バージョン 3.1.0 以降用です。

### Version compatibility

以下の表は、UID2 GMA Plugin for iOS の各バージョンと、Google Mobile Ads SDK および UID2 SDK for iOS の互換性を示しています。

| GMA Plugin バージョン | GMA SDK バージョン | UID2 SDK for iOS バージョン |
| :--- | :--- | :--- |
| 3.1.0 (最新) | 13.x | 1.7.0 – 3.x |
| 3.0.0 – 3.0.2 | 13.x | 1.7.0 – 2.x |
| 2.0.0 – 2.0.2 | 12.x | 1.7.0 – 1.x |
| 1.0.0 – 1.0.1 | 10.7.0 – 11.x | 1.7.0 – 1.x |
| 0.3.0 – 0.4.0 | 10.7.0 – 11.x | 0.2.0 – 1.x |

## GitHub repository

このプラグインは以下のオープンソースの GitHub リポジトリにあります:

- [https://github.com/IABTechLab/uid2-ios-plugin-google-gma](https://github.com/IABTechLab/uid2-ios-plugin-google-gma)

## Complete UID2 account setup and configure account

UID2 とインテグレーションするには、UID2 アカウントが必要です。アカウントを作成していない場合は、まず [Account setup](../getting-started/gs-account-setup.md) ページの手順に従ってください。

アカウントの初期設定が完了すると、[UID2 Portal](../portal/portal-overview.md) にアクセスするための手順とリンクが送信されます。ここで、本番環境用の [credentials](../getting-started/gs-credentials.md) を作成し、必要に応じて追加の値を設定できます。詳細は、[Getting started with the UID2 Portal](../portal/portal-getting-started.md) を参照してください。

UID2 Portal で実行する手順は、実装が Client-Side、Client-Server、Server-Side のいずれであるかによって異なります。各実装ガイドに具体的な手順が記載されています。概要は、[Client-side, client-server, or server-side integration?](integration-mobile-overview#client-side-client-server-or-server-side-integration) を参照してください。

## Requirements 

このプラグインを実行するには、以下をインストールします:

1. Google Mobile Ads SDK v13.0.0 or later:
   - [SDK](https://developers.google.com/admob/ios)
   - [Release Notes](https://developers.google.com/admob/ios/rel-notes)
1. SDK for iOS v1.7.0 or later:
   - [SDK](https://github.com/IABTechLab/uid2-ios-sdk)
   - [SDK for iOS reference guide](../sdks/sdk-ref-ios.md)
1. [UID2 GMA Plugin for iOS v3.1.0](https://github.com/IABTechLab/uid2-ios-plugin-google-gma)

## Installation

前提条件: Google Mobile Ads SDK と SDK for iOS をインストールします。

SDK for iOS と Google Mobile Ads SDK がインストールされた既存のアプリに、Swift Package Manager または CocoaPods を使用して UID2 iOS GMA Plugin をインストールします。

インストールオプションは 3 つあります:

-   [Package.swift](#installing-with-packageswift)
-   [Xcode](#installing-with-xcode)
-   [CocoaPods](#installing-with-cocoapods)

### Installing with Package.swift

Package.swift に次の依存関係を追加します:

```js
dependencies: [
  .package(url: "https://github.com/IABTechLab/uid2-ios-plugin-google-gma.git", from: "3.1.0")
]
```

### Installing with Xcode

Xcode ユーザーインターフェースで、パッケージ依存関係の下に、次のエントリを追加します:

| Name | Location | Dependency Rule |
| :--- | :--- | :--- |
| uid2-ios-plugin-google-gma | `git@github.com:IABTechLab/uid2-ios-plugin-google-gma.git` | Exact Version: 3.1.0 |

### Installing with CocoaPods

`Podfile` に次のエントリを追加します:

```
pod 'UID2GMAPlugin', '3.1.0'
```
