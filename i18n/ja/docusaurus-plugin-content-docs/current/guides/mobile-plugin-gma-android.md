---
title: UID2 GMA Plugin for Android
description: Android アプリの広告リクエストに GMA を使用するパブリッシャーのためのガイド。
hide_table_of_contents: false
sidebar_position: 12
---

import Link from '@docusaurus/Link';

# UID2 GMA Plugin for Android Integration Guide

UID2 Google Mobile Ads (GMA) Plugin for Android は、[Google Mobile Ads (GMA) SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) を使用するパブリッシャーが、Android アプリからの広告リクエストで <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> を [secure signals](https://support.google.com/admob/answer/11556288?hl=en-GB) として送信できるようにします。これは自動的に行われるため、アプリ開発者が直接コーディングする必要はありません。

## Functionality

このプラグインは、Android 端末で動作するアプリで UID2 をサポートしたいパブリッシャー向けに、Google Mobile Ads (GMA) とのインテグレーションを簡素化します。

## Version

<!-- As of 2024-10-23 -->

このドキュメントは、UID2 GMA Plugin for Android バージョン 1.6.0 以降用です。

## GitHub Repository

このプラグインは以下のオープンソースの GitHub リポジトリにあります:

- [https://github.com/IABTechLab/uid2-android-sdk/tree/main/securesignals-gma](https://github.com/IABTechLab/uid2-android-sdk/tree/main/securesignals-gma)

## Complete UID2 Account Setup and Configure Account

UID2 とインテグレーションするには、UID2 アカウントが必要です。アカウントを作成していない場合は、まず [Account Setup](../getting-started/gs-account-setup.md) ページの手順に従ってください。

アカウントの初期設定が完了すると、[UID2 Portal](../portal/portal-overview.md) にアクセスするための手順とリンクが送信されます。ここで、本番環境用の [credentials](../getting-started/gs-credentials.md) を作成し、必要に応じて追加の値を設定できます。詳細については、[Getting Started with the UID2 Portal](../portal/portal-getting-started.md) を参照してください。

UID2 Portal で実行する手順は、実装が　Client-Side、Client-Server、Server-Side のいずれであるかによって異なります。各実装ガイドに具体的な手順が記載されています。概要については、[Client-Side or Client-Server Integration?](integration-mobile-overview#client-side-or-client-server-integration) を参照してください。

## Requirements 

このプラグインを実行するには、以下をインストールします:

1. Google Mobile Ads SDK v22.0.0 or later:
   - [SDK](https://developers.google.com/admob/android/sdk)
   - [Release notes](https://developers.google.com/admob/android/rel-notes)
1. SDK for Android v1.6.0 or later:
   - [SDK](https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk)
   - [SDK for Android Reference Guide](../sdks/sdk-ref-android.md)
1. [UID2 Android GMA Plugin v1.6.0](https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk-gma/)
1. R8 または Proguard を使用している場合は、[Notes for Using R8 or ProGuard](#notes-for-using-r8-or-proguard) に指定された適用オプションを追加します。

## Installation

前提条件: Google Mobile Ads SDK と SDK for Android をインストールしてください。

SDK for Android と Google IMA SDK がインストールされている既存のアプリに、UID2 Android GMA Plugin v1.6.0 をインストールします。インストール方法は 2 つあります:

- [Gradle](#gradle)
- [Maven](#maven)

### Gradle 

Gradle でインストールするには、`build.gradle` ファイルに依存関係として SDK を追加します:

```js
implementation 'com.uid2:uid2-android-sdk-gma:1.6.0'
```

### Maven 

Maven でインストールするには、`pom.xml` ファイルに依存関係として SDK を追加します:

``` xml
<dependency>
  <groupId>com.uid2</groupId>
  <artifactId>uid2-android-sdk-gma</artifactId>
  <version>1.6.0</version>
</dependency>
```

## Notes for Using R8 or ProGuard

R8 を使用している場合、縮小と難読化のルールは自動的に含まれます。

ProGuard を使用している場合は、[uid2-gma.pro](https://github.com/IABTechLab/uid2-android-sdk/blob/main/securesignals-gma/uid2-gma.pro) で指定されたオプションを手動で追加する必要があります。
