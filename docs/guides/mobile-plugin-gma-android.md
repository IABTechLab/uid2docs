---
title: UID2 GMA Plugin for Android
description: A guide for publishers using GMA for ad requests on Android apps.
hide_table_of_contents: false
sidebar_position: 12
---

import Link from '@docusaurus/Link';

# UID2 GMA Plugin for Android Integration Guide

The UID2 Google Mobile Ads (GMA) Plugin for Android enables publishers that use the [Google Mobile Ads (GMA) SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) to send [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from Android apps. This is done automatically, with no direct coding needed from the app developer.

## Functionality

This plugin simplifies integration with Google Mobile Ads (GMA) for any publishers who want to support UID2 for apps running on Android devices.

## Version

<!-- As of 2023-07-15 -->

This documentation is for the UID2 GMA Plugin for Android version 0.5.0 and later.

## GitHub Repository

This plugin is in the following open-source GitHub repository:

- [https://github.com/IABTechLab/uid2-android-sdk/tree/main/securesignals-gma](https://github.com/IABTechLab/uid2-android-sdk/tree/main/securesignals-gma)

## Requirements 

To run this plugin, install the following:

1. Google Mobile Ads SDK v22.0.0 or later:
   - [SDK](https://developers.google.com/admob/android/sdk)
   - [Release notes](https://developers.google.com/admob/android/rel-notes)
1. UID2 SDK for Android v0.5.0:
   - [SDK](https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk)
   - [UID2 SDK for Android Reference Guide](../sdks/uid2-sdk-ref-android.md)
1. [UID2 Android GMA Plugin v0.5.0](https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk-gma/)

## Installation

Prerequisite: Install the Google Mobile Ads SDK and the UID2 Android SDK.

Install the UID2 Android GMA Plugin v0.5.0 to an existing app with the UID2 Android SDK and Google GMA SDK installed. There are two installation options:

- [Gradle](#gradle)
- [Maven](#maven)

### Gradle 

To install with Gradle, add the SDK as a dependency in the `build.gradle` file:

``` javascript
implementation 'com.uid2:uid2-android-sdk-gma:0.5.0'
```

### Maven 

To install with Maven, add the SDK as a dependency in the `pom.xml` file:

``` xml
<dependency>
  <groupId>com.uid2</groupId>
  <artifactId>uid2-android-sdk-gma</artifactId>
  <version>0.5.0</version>
</dependency>
```
