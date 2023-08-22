---
title: UID2 GMA Plugin for iOS
description: iOS アプリの広告リクエストに GMA を使用するパブリッシャーのためのガイド。
hide_table_of_contents: false
sidebar_position: 13
---

# UID2 GMA Plugin for iOS Integration Guide

## Introduction

UID2 Google Mobile Ads (GMA) Plugin for iOS は、[Google Mobile Ads (GMA) SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) を使用しているパブリッシャーが、iOS アプリからの広告リクエストで [UID2 Token](../ref-info/glossary-uid.md#gl-uid2-token) を [secure signals](https://support.google.com/admob/answer/11556288?hl=en-GB) として送信できるようにします。これは自動的に行われるため、アプリ開発者が直接コーディングする必要はありません。

## Functionality

このプラグインは、iOS デバイス上で動作するアプリで UID2 をサポートしたいパブリッシャー向けに、Google Mobile Ads（GMA）とのインテグレーションを簡素化します。

## Version

<!-- As of 2023-07-15 -->

このドキュメントは UID2 GMA Plugin for iOS バージョン 0.2.0 用です。

## GitHub Repository

このプラグインは以下のオープンソースの GitHub リポジトリにあります:

- [https://github.com/IABTechLab/uid2-ios-plugin-google-gma](https://github.com/IABTechLab/uid2-ios-plugin-google-gma)

## Requirements 

このプラグインを実行するには、以下をインストールします:

1. [Google Mobile Ads SDK v10.7.0+](https://developers.google.com/admob/ios/rel-notes)
1. [UID2 SDK for iOS v0.2.0](../sdks/uid2-sdk-ref-ios.md)
1. UID2 GMA Plugin for iOS v0.2.0

## Installation

前提条件: Google Mobile Ads SDK と UID2 iOS SDK をインストールします。

UID2 iOS SDK と Google Mobile Ads SDK がインストールされている既存のアプリに、Swift Package Manager 経由で UID2 iOS IMA Plugin をインストールします:

```javascript
.package(url: https://github.com/IABTechLab/uid2-ios-plugin-google-gma.git, exact: "0.2.0")
```

## Troubleshooting 

発生する可能性のある問題を解決するには、UID2 GMA Plugin for iOS の2つのソースコードファイルを直接アプリにコピーすることをお勧めします。Google Mobile Ads SDK が実行時にファイルを見つけられるように、必ず同じクラス名とファイル名を使用してください。2 つのファイルとは:

- `UID2GMASecureSignalsAdapter.swift`
- `AdvertisingTokenNotFoundError.swift`

<!-- eng_jp -->
