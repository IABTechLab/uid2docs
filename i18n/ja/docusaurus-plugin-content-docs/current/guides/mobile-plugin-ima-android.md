---
title: UID2 IMA Plugin for Android
description:  Android アプリの広告リクエストに IMA を使用するパブリッシャー向けのガイドです。
hide_table_of_contents: false
sidebar_position: 14
---

import Link from '@docusaurus/Link';

# UID2 IMA Plugin for Android Integration Guide

UID2 Interactive Media Ads (IMA) Plugin for Android は、[Google IMA SDK for Android](https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side) を使用するパブリッシャーが、Android アプリからの広告リクエストで [UID2 Token](../ref-info/glossary-uid.md#gl-uid2-token) を [Secure Signal](https://support.google.com/admob/answer/11556288) として送信できるようにします。これは自動的に行われるため、アプリ開発者が直接コーディングする必要はありません。

## Functionality

このプラグインは、Android 端末で動作するアプリの UID2 をサポートしたいパブリッシャー向けに、Google Interactive Media Ads(IMA) とのインテグレーションを簡素化します。

## Version

<!-- As of 2023-07-15 -->

このドキュメントは、UID2 IMA Plugin for Android version 0.5.0 以降用です。

## GitHub Repository

このプラグインは以下のオープンソースの GitHub リポジトリにあります:

- [https://github.com/IABTechLab/uid2-android-sdk/tree/main/securesignals-ima](https://github.com/IABTechLab/uid2-android-sdk/tree/main/securesignals-ima)

## Requirements 

このプラグインを実行するには、以下をインストールします:

1. Google IMA SDK v3.30.3:
   - [SDK](https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side)
   - [Release history](https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side/history)
1. UID2 SDK for Android v0.5.0:
   - [SDK](https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk)
   - [UID2 SDK for Android Reference Guide](../sdks/uid2-sdk-ref-android.md)
1. [UID2 IMA Plugin for Android v0.5.0](https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk-ima)

## Installation

前提条件: Google Interactive Media Ads SDKとUID2 Android SDK をインストールします。

UID2 Android SDK と Google IMA SDK がインストールされている既存のアプリに、UID2 Android IMA Plugin をインストールします。インストールオプションは2つあります:

- [Gradle](#gradle)
- [Maven](#maven)


### Gradle 
Gradle でインストールするには、`build.gradle` ファイルに依存関係として SDK を追加します:

``` javascript
implementation 'com.uid2:uid2-android-sdk-ima:0.5.0'
```

### Maven

Maven でインストールするには、`pom.xml` ファイルに依存関係として SDK を追加します:

``` xml
<dependency>
  <groupId>com.uid2</groupId>
  <artifactId>uid2-android-sdk-ima</artifactId>
  <version>0.5.0</version>
</dependency>
```
