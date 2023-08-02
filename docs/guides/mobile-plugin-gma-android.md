# UID2 GMA Plugin for Android Integration Guide

## Introduction

The UID2 Google Mobile Ads (GMA) Plugin for Android enables publishers that use the [Google Mobile Ads (GMA) SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) to include UID2 data in ad requests from Android apps. This is done automatically, with no direct coding needed from the app developer.

## Functionality

This plugin simplifies integration with Google Mobile Ads (GMA) for any publishers who want to support UID2 for apps running on Android devices.

## Version

<!-- As of 2023-07-15 -->

This documentation is for the UID2 GMA Plugin for Android version 0.4.0.

## GitHub Repository

This plugin is in the following open-source GitHub repository:

- [https://github.com/IABTechLab/uid2-android-sdk/tree/main/securesignals-gma](https://github.com/IABTechLab/uid2-android-sdk/tree/main/securesignals-gma)

## Requirements 

To run this plugin, install the following:

1. [Google Mobile Ads SDK v22.0.0+](https://developers.google.com/admob/android/sdk)
1. [UID2 SDK for Android v0.4.0](../sdks/uid2-sdk-ref-android.md)
1. UID2 Android GMA Plugin v0.4.0

## Installation

Prerequisite: Install the Google Mobile Ads SDK and the UID2 Android SDK.

Install the UID2 Android GMA Plugin v0.4.0 to an existing app with the UID2 Android SDK and Google IMA SDK installed. There are two installation options:

- [Gradle](#gradle)
- [Maven](#maven)

### Gradle 

To install with Gradle, add the SDK as a dependency in the `build.gradle` file:

```
implementation \'com.uid2:uid2-android-sdk-gma:0.4.0\'
```

### Maven 

To install with Maven, add the SDK as a dependency in the `pom.xml` file:

```
<dependency>
  <groupId>com.uid2</groupId>
  <artifactId>uid2-android-sdk-gma</artifactId>
  <version>0.4.0</version>
</dependency>
```
