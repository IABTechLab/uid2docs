---
title: UID2 IMA Plugin for Android
description: A guide for publishers using GIA for ad requests on Android apps.
hide_table_of_contents: false
sidebar_position: 14
---

# UID2 IMA Plugin for Android Integration Guide

The UID2 Interactive Media Ads (IMA) Plugin for Android enables publishers that use the [Google Interactive Media Ads SDK](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/) to send [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) as [secure signals](https://support.google.com/admob/answer/11556288?hl=en-GB) in ad requests from Android apps. This is done automatically, with no direct coding needed from the app developer.

## Functionality

This plugin simplifies integration with Google Interactive Media Ads (IMA) for any publishers who want to support UID2 for apps running on Android devices.

## Version

<!-- As of 2023-07-15 -->

This documentation is for the UID2 IMA Plugin for Android version 0.1.0.

## GitHub Repository

This plugin is in the following open-source GitHub repository:

- [https://github.com/IABTechLab/uid2-android-sdk/tree/main/securesignals-ima](https://github.com/IABTechLab/uid2-android-sdk/tree/main/securesignals-ima)

## Requirements 

To run this plugin, install the following:

1. Google IMA SDK v3.29.0 ([ONLY 3.29.0 not any higher version](https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side/history))
1. [UID2 Android SDK v0.4.0](https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk-ima)  (for documentation, see [UID2 SDK for Android Reference Guide](../sdks/uid2-sdk-ref-android.md))
1. UID2 IMA Plugin for Android v0.1.0

## Installation

Prerequisite: Install the Google Interactive Media Ads SDK and the UID2 Android SDK.

Install the UID2 Android IMA Plugin v0.1.0 via Gradle / Maven to an existing app with the UID2 Android SDK and Google IMA SDK installed.

### Gradle 
To install with Gradle, add the SDK as a dependency in the `build.gradle` file:

```
implementation 'com.uid2:uid2-android-sdk-ima:0.1.0'
```

### Maven

To install with Maven, add the SDK as a dependency in the `pom.xml` file:

```
<dependency>
  <groupId>com.uid2</groupId>
  <artifactId>uid2-android-sdk-ima</artifactId>
  <version>0.1.0</version>
</dependency>
```

## Troubleshooting 

There has been an occasional issue with Google IMA SDK v3.30.0 not running when used in non-Android TV apps. This is due to the inclusion of com.google.android.tv:tv-ads:1.0.0-alpha as a dependency. To resolve the problem, revert back to Google IMA SDK v3.29.0.
