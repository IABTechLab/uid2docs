---
title: UID2 IMA Plugin for Android
description:  Android アプリの広告リクエストに IMA を使用するパブリッシャー向けのガイド。
hide_table_of_contents: false
sidebar_position: 14
---

import Link from '@docusaurus/Link';

# UID2 IMA Plugin for Android Integration Guide

UID2 Interactive Media Ads (IMA) Plugin for Android は、[Google IMA SDK for Android](https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side) を使用するパブリッシャーが、Android アプリからの広告リクエストで <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> を [Secure Signals](https://support.google.com/admob/answer/11556288) として送信できるようにします。これは自動的に行われるため、アプリ開発者が直接コーディングする必要はありません。

## Functionality

このプラグインは、Android 端末で動作するアプリの UID2 をサポートしたいパブリッシャー向けに、Google Interactive Media Ads(IMA) とのインテグレーションを簡素化します。

## Version

<!-- As of 2024-10-23 -->

このドキュメントは、UID2 IMA Plugin for Android version 1.6.0 以降用です。

## GitHub Repository

このプラグインは以下のオープンソースの GitHub リポジトリにあります:

- [https://github.com/IABTechLab/uid2-android-sdk/tree/main/securesignals-ima](https://github.com/IABTechLab/uid2-android-sdk/tree/main/securesignals-ima)

## Requirements 

このプラグインを実行するには、以下をインストールします:

1. Google IMA SDK v3.30.3 or later:
   - [SDK](https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side)
   - [Release history](https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side/history)
1. SDK for Android v1.6.0 or later:
   - [SDK](https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk)
   - [SDK for Android Reference Guide](../sdks/sdk-ref-android.md)
1. [UID2 IMA Plugin for Android v1.6.0](https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk-ima)
1. R8 または Proguard を使用している場合は、[Notes for Using R8 or ProGuard](#notes-for-using-r8-or-proguard) に指定された適用オプションを追加します。

## Installation

前提条件: Google Interactive Media Ads SDKとSDK for Android をインストールします。

SDK for Android と Google IMA SDK がインストールされている既存のアプリに、UID2 Android IMA Plugin をインストールします。インストールオプションは2つあります:

- [Gradle](#gradle)
- [Maven](#maven)


### Gradle 
Gradle でインストールするには、`build.gradle` ファイルに依存関係として SDK を追加します:

```js
implementation 'com.uid2:uid2-android-sdk-ima:1.6.0'
```

### Maven

Maven でインストールするには、`pom.xml` ファイルに依存関係として SDK を追加します:

``` xml
<dependency>
  <groupId>com.uid2</groupId>
  <artifactId>uid2-android-sdk-ima</artifactId>
  <version>1.6.0</version>
</dependency>
```

## Notes for Using R8 or ProGuard

R8 を使用している場合、縮小と難読化のルールは自動的に含まれます。


ProGuard を使用している場合は、[uid2-gma.pro](https://github.com/IABTechLab/uid2-android-sdk/blob/main/securesignals-gma/uid2-gma.pro) で指定されたオプションを手動で追加する必要があります。
