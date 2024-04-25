---
title: UID2 GMA Plugin for Android
description: Android アプリの広告リクエストに GMA を使用するパブリッシャーのためのガイド。
hide_table_of_contents: false
sidebar_position: 12
---

import Link from '@docusaurus/Link';

# UID2 GMA Plugin for Android Integration Guide

UID2 Google Mobile Ads (GMA) Plugin for Android は、[Google Mobile Ads (GMA) SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) を使用するパブリッシャーが、Android アプリからの広告リクエストで [UID2 Token](../ref-info/glossary-uid.md#gl-uid2-token) を [secure signals](https://support.google.com/admob/answer/11556288?hl=en-GB) として送信できるようにします。これは自動的に行われるため、アプリ開発者が直接コーディングする必要はありません。

## Functionality

このプラグインは、Android 端末で動作するアプリで UID2 をサポートしたいパブリッシャー向けに、Google Mobile Ads (GMA) とのインテグレーションを簡素化します。

## Version

<!-- As of 2023-07-15 -->

このドキュメントは、UID2 GMA Plugin for Android バージョン 0.5.0 以降用です。

## GitHub Repository

このプラグインは以下のオープンソースの GitHub リポジトリにあります:

- [https://github.com/IABTechLab/uid2-android-sdk/tree/main/securesignals-gma](https://github.com/IABTechLab/uid2-android-sdk/tree/main/securesignals-gma)

## Requirements 

このプラグインを実行するには、以下をインストールします:

1. Google Mobile Ads SDK v22.0.0 or later:
   - [SDK](https://developers.google.com/admob/android/sdk)
   - [Release notes](https://developers.google.com/admob/android/rel-notes)
1. UID2 SDK for Android v0.5.0:
   - [SDK](https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk)
   - [UID2 SDK for Android Reference Guide](../sdks/uid2-sdk-ref-android.md)
1. [UID2 Android GMA Plugin v0.5.0](https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk-gma/)

## Installation

前提条件: Google Mobile Ads SDK と UID2 Android SDK をインストールしてください。

UID2 Android SDK と Google IMA SDK がインストールされている既存のアプリに、UID2 Android GMA Plugin v0.5.0 をインストールします。インストール方法は 2 つあります:

- [Gradle](#gradle)
- [Maven](#maven)

### Gradle 

Gradle でインストールするには、`build.gradle` ファイルに依存関係として SDK を追加します:

``` javascript
implementation 'com.uid2:uid2-android-sdk-gma:0.5.0'
```

### Maven 

Maven でインストールするには、`pom.xml` ファイルに依存関係として SDK を追加します:

``` xml
<dependency>
  <groupId>com.uid2</groupId>
  <artifactId>uid2-android-sdk-gma</artifactId>
  <version>0.5.0</version>
</dependency>
```
