---
title: UID2 IMA Plugin for iOS
description: iOS アプリの広告リクエストに IMA を使用するパブリッシャー向けのガイド。
hide_table_of_contents: false
sidebar_position: 15
---

import Link from '@docusaurus/Link';

# UID2 IMA Plugin for iOS Integration Guide

UID2 Interactive Media Ads (IMA) Plugin for iOS は、[Google IMA SDK for iOS](https://developers.google.com/interactive-media-ads/docs/sdks/ios/client-side) を使用するパブリッシャーが、iOS アプリからの広告リクエストで [UID2 Token](../ref-info/glossary-uid.md#gl-uid2-token) を [Secure Signal](https://support.google.com/admob/answer/11556288) として送信できるようにします。これは自動的に行われるため、アプリ開発者が直接コーディングする必要はありません。

## Functionality

このプラグインは、iOS デバイス上で動作するアプリの UID2 をサポートしたいパブリッシャー向けに、Google Interactive Media Ads(IMA) とのインテグレーションを簡素化します。

## Version

<!-- As of 2023-07-15 -->

このドキュメントはUID2 IMA Plugin for iOS version 0.2.0 用です。

## GitHub Repository

このプラグインは以下のオープンソースの GitHub リポジトリにあります:

- [https://github.com/IABTechLab/uid2-ios-plugin-google-ima](https://github.com/IABTechLab/uid2-ios-plugin-google-ima)

## Requirements 

このプラグインを実行するには、以下をインストールします:

1. Google IMA SDK v3.19.1 or later:
   - [SDK](https://developers.google.com/interactive-media-ads/docs/sdks/ios/client-side)
   - [Release history](https://developers.google.com/interactive-media-ads/docs/sdks/ios/client-side/history)
1. UID2 SDK for iOS v0.2.0:
   - [SDK](https://github.com/IABTechLab/uid2-ios-sdk)
   - [UID2 SDK for iOS Reference Guide](../sdks/uid2-sdk-ref-ios.md)
1. [UID2 IMA Plugin for iOS v0.2.0](https://github.com/IABTechLab/uid2-ios-plugin-google-ima)

## Installation

前提条件: Google Interactive Media Ads SDK と UID2 iOS SDK をインストールします。

UID2 iOS SDK と Google Interactive Media Ads SDK がインストールされている既存のアプリに、Swift Package Manager 経由で UID2 iOS IMA Plugin v0.2.0 をインストールします。

```
.package(url: https://github.com/IABTechLab/uid2-ios-plugin-google-ima.git, exact: "0.2.0")
```
