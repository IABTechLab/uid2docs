---
title: UID2 GMA Plugin for Android
description: A guide for publishers using GMA for ad requests on Android apps.
hide_table_of_contents: false
sidebar_position: 12
---

import Link from '@docusaurus/Link';

# UID2 GMA Plugin for Android Integration Guide

The UID2 Google Mobile Ads (GMA) Plugin for Android enables publishers that use the [Google Mobile Ads (GMA) SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) to send <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from Android apps. This is done automatically, with no direct coding needed from the app developer.

## Functionality

This plugin simplifies integration with Google Mobile Ads (GMA) for any publishers who want to support UID2 for apps running on Android devices.

## Version

<!-- As of 2024-10-23 -->

This documentation is for the UID2 GMA Plugin for Android version 1.6.0 and later.

## GitHub Repository

This plugin is in the following open-source GitHub repository:

- [https://github.com/IABTechLab/uid2-android-sdk/tree/main/securesignals-gma](https://github.com/IABTechLab/uid2-android-sdk/tree/main/securesignals-gma)

## Complete UID2 Account Setup and Configure Account

To integrate with UID2, you'll need to have a UID2 account. If you haven't yet created an account, first follow the steps described on the [Account Setup](../getting-started/gs-account-setup.md) page.

When initial account setup is complete, you'll receive instructions and a link to access the [UID2 Portal](../portal/portal-overview.md), where you can create your [credentials](../getting-started/gs-credentials.md) for the production environment and configure additional values, if needed. For details, see [Getting Started with the UID2 Portal](../portal/portal-getting-started.md).

The steps you'll take in the UID2 Portal are different depending on whether your implementation will be client-side, client-server, or server-side. Specific instructions are in each implementation guide. For a summary, see [Client-Side, Client-Server, or Server-Side Integration?](integration-mobile-overview#client-side-client-server-or-server-side-integration).

## Requirements 

To run this plugin, install the following:

1. Google Mobile Ads SDK v22.0.0 or later:
   - [SDK](https://developers.google.com/admob/android/sdk)
   - [Release notes](https://developers.google.com/admob/android/rel-notes)
1. SDK for Android v1.6.0 or later:
   - [SDK](https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk)
   - [SDK for Android Reference Guide](../sdks/sdk-ref-android.md)
1. [UID2 Android GMA Plugin v1.6.0](https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk-gma/)
1. If you are using R8 or Proguard, add the applicable option specified in [Notes for Using R8 or ProGuard](#notes-for-using-r8-or-proguard)

## Installation

Prerequisite: Install the Google Mobile Ads SDK and the SDK for Android.

Install the UID2 Android GMA Plugin v1.6.0 to an existing app with the SDK for Android and Google GMA SDK installed. There are two installation options:

- [Gradle](#gradle)
- [Maven](#maven)

### Gradle 

To install with Gradle, add the SDK as a dependency in the `build.gradle` file:

```js
implementation 'com.uid2:uid2-android-sdk-gma:1.6.0'
```

### Maven 

To install with Maven, add the SDK as a dependency in the `pom.xml` file:

``` xml
<dependency>
  <groupId>com.uid2</groupId>
  <artifactId>uid2-android-sdk-gma</artifactId>
  <version>1.6.0</version>
</dependency>
```

## Notes for Using R8 or ProGuard

If you are using R8, the shrinking and obfuscation rules are included automatically.

If you are using ProGuard, you must manually add the option specified in [uid2-gma.pro](https://github.com/IABTechLab/uid2-android-sdk/blob/main/securesignals-gma/uid2-gma.pro).
