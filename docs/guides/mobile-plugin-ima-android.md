---
title: UID2 IMA Plugin for Android
description: A guide for publishers using GIA for ad requests on Android apps.
hide_table_of_contents: false
sidebar_position: 14
---

# UID2 IMA Plugin for Android Integration Guide

The UID2 Interactive Media Ads (IMA) Plugin for Android enables publishers that use the [Google IMA SDK for Android](https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side) to send [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from Android apps. This is done automatically, with no direct coding needed from the app developer.

## Functionality

This plugin simplifies integration with Google Interactive Media Ads (IMA) for any publishers who want to support UID2 for apps running on Android devices.

## Version

<!-- As of 2023-07-15 -->

This documentation is for the UID2 IMA Plugin for Android version 0.5.0 and later.

## GitHub Repository

This plugin is in the following open-source GitHub repository:

- [https://github.com/IABTechLab/uid2-android-sdk/tree/main/securesignals-ima](https://github.com/IABTechLab/uid2-android-sdk/tree/main/securesignals-ima)

## Requirements 

To run this plugin, install the following:

1. Google IMA SDK v3.30.3:
   - [SDK](https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side)
   - [Release history](https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side/history)
1. UID2 SDK for Android v0.5.0:
   - [SDK](https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk)
   - [UID2 SDK for Android Reference Guide](../sdks/uid2-sdk-ref-android.md)
1. [UID2 IMA Plugin for Android v0.5.0](https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk-ima)

## Installation

Prerequisite: Install the Google Interactive Media Ads SDK and the UID2 Android SDK.

Install the UID2 Android IMA Plugin to an existing app with the UID2 Android SDK and Google IMA SDK installed. There are two installation options:

- [Gradle](#gradle)
- [Maven](#maven)


### Gradle 
To install with Gradle, add the SDK as a dependency in the `build.gradle` file:

``` javascript
implementation 'com.uid2:uid2-android-sdk-ima:0.5.0'
```

### Maven

To install with Maven, add the SDK as a dependency in the `pom.xml` file:

``` xml
<dependency>
  <groupId>com.uid2</groupId>
  <artifactId>uid2-android-sdk-ima</artifactId>
  <version>0.5.0</version>
</dependency>
```
