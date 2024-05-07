---
title: UID2 SDK for Android
description: Reference information about the Android SDK.
hide_table_of_contents: false
sidebar_position: 12
---

import Link from '@docusaurus/Link';

# UID2 SDK for Android Reference Guide

<!-- This guide includes the following information:

- [Non-Mobile Android Device Support](#non-mobile-android-device-support)
- [Functionality](#functionality)
- [API Permissions](#api-permissions)
- [SDK Version](#sdk-version)
- [Features](#features)
- [GitHub Repository/Binary](#github-repositorybinary)
- [Minimum Requirements](#minimum-requirements)
- [Installation](#installation)
  -  [Installing with Gradle](#installing-with-gradle)
  -  [Installing with Maven](#installing-with-maven)
- [Usage Guidelines](#usage-guidelines)
- [UID2Manager API](#uid2manager-api)
  -  [Functions](#functions)
  -  [Variables](#variables)
- [Android Initialization](#android-initialization)
- [Code Samples](#code-samples) -->

You can use the UID2 SDK for Android to facilitate the process of establishing client identity using UID2 and retrieving advertising tokens on Android devices for use in the bid stream.

The following Android-related plugins, and associated documentation, are also available.

| Purpose | Product/Documentation |
| :--- | :--- |
| To use the Google Mobile Ads (GMA) SDK to send [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from Android apps | [UID2 GMA Plugin for Android Integration Guide](../guides/mobile-plugin-gma-android.md) |
| To use the Google Interactive Media Ads (IMA) SDK for Android to send [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from Android apps | [UID2 IMA Plugin for Android Integration Guide](../guides/mobile-plugin-ima-android.md) |

## Non-Mobile Android Device Support

This UID2 SDK for Android can be used for non-mobile devices for Android platforms as well.

## Functionality

This SDK simplifies integration with UID2 for any publishers who want to support UID2 for apps running on Android devices. The following table shows the functions it supports.

| Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token | Generate UID2 Token from DII | Refresh UID2 Token |
| :--- | :--- | :--- | :--- |
| Not supported | Not supported | Supported | Supported |

## API Permissions

To use this SDK, you'll need to complete the UID2 account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page.

You'll be granted permission to use specific functions offered by the SDK, and given credentials for that access. Bear in mind that there might be functions in the SDK that you don't have permission to use. For example, publishers get a specific API permission to generate and refresh tokens, but the SDK might support other activities, such as sharing, which require a different API permission.

For details, see [API Permissions](../getting-started/gs-permissions.md).

## SDK Version

<!-- As of 7 May 2024 -->

This documentation is for the UID2 Android SDK version 1.0.0 and later.

For information about specific release versions, see [https://github.com/IABTechLab/uid2-android-sdk/releases](https://github.com/IABTechLab/uid2-android-sdk/releases).

## Features

The UID2 Android SDK is designed to manage UID2 identity on behalf of Android apps. It enables UID2 identity to be persisted across app lifecycles by securely storing the identity on a device via platform-native encryption tools.

By default, the SDK automatically refreshes UID2 identity based on expiration dates. However, you can disable this to allow implementing apps to manage the UID2 identity lifecycle manually.

## GitHub Repository/Binary

This SDK is in the following open-source GitHub repository:

- [https://github.com/IABTechLab/uid2-android-sdk](https://github.com/IABTechLab/uid2-android-sdk)

The binary is published on Sonatype:

- [https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk](https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk)

## Minimum Requirements

Minimum requirements for this SDK are as follows:

- Android Studio version: 2022.1.1 Patch 2+
- Minimum target Android version: 4.4+ / API 19+ (SDK) 5.0+ / API 21+ (Dev-App)

<!-- See also: [Requirements](https://github.com/IABTechLab/uid2-android-sdk/blob/main/README.md#requirements). -->

## Installation

There are two options for installing the Android UID2 SDK:

-   [Gradle](#installing-with-gradle)

-  [ Maven](#installing-with-maven)

### Installing with Gradle

To install with Gradle, add the SDK as a dependency in the build.gradle
file:

``` javascript
implementation 'com.uid2:uid2-android-sdk:1.0.0'
```

### Installing with Maven 

To install with Maven, add the SDK as a dependency in the `pom.xml` file:

``` xml
<dependency> 
  <groupId>com.uid2</groupId> 
  <artifactId>uid2-android-sdk</artifactId> 
  <version>1.0.0</version> 
</dependency> 
```

## Usage Guidelines

There are two ways to establish an initial UID2 Identity:

1. Generate the UID2 identity using a DII - email (hash) or phone no (hash). For integration instructions, refer to [Client-Side Integration Guide for Mobile/Android](https://ttdcorp-my.sharepoint.com/:w:/g/personal/sunny_wu_thetradedesk_com/EV4SjPzJjCZCig_kI8lGjJYBrLLhiiNh3mHq75pAtSs2qQ?e=2F7aMb).
2. Create a UID2 identity from your server backend and then passed into the UID2 SDK. For integration instructions, refer to  [Client-Server Integration Guide for Mobile](https://ttdcorp-my.sharepoint.com/:w:/g/personal/sunny_wu_thetradedesk_com/EX2dEa2NAcRPs3Pfchwua40ByY0g0DASgLybKJs11TLHqw?e=vxRjFa).

The UID2 Mobile SDKs can perform refreshes of UID2 identities, after an Identity is established. This is because the refresh functionality relies on the refresh tokens that are part of the UID2 Identity.

The **UID2Manager** singleton is the primary developer API for the UID2 Android and iOS SDKs. It is responsible for storing, refreshing, and retrieving UID2 Identity.

For Android, you must initialize the `UID2Manager` manually before you can use it. See [Android Initialization](#android-initialization).

## UID2Manager API

This section includes the functions and variables that are part of the UID2Manager API.

### Functions

The following functions are available as part of the UID2Manager API:
- [generateIdentity()](#generateidentity)
- [setIdentity()](#setidentity)
- [resetIdentity()](#resetidentity)
- [refreshIdentity()](#refreshidentity)
- [getAdvertisingToken()](#getadvertisingtoken)
- [setAutomaticRefreshEnabled()](#setautomaticrefreshenabled)

#### generateIdentity()

Generate a UID2 Identity using <Link href="../ref-info/glossary-uid#gl-dii">Directly identifying information (DII)</Link>. For instructions, see [Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md).(**GWH__SW add fragment to link.**)

Generate a UID2 Identity using a <Link href="../ref-info/glossary-uid#gl-dii">Directly identifying information (DII)</Link>. Refer to [Client-Side Integration Guide for Mobile/Android](https://ttdcorp-my.sharepoint.com/:w:/g/personal/sunny_wu_thetradedesk_com/EV4SjPzJjCZCig_kI8lGjJYBrLLhiiNh3mHq75pAtSs2qQ?e=2F7aMb)

#### setIdentity()

Sets a UID2 Identity, created from the back-end server, to be managed by the SDK. For details, see [Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md). (**GWH__ figure out more exact link**)

#### resetIdentity()

Resets or removes the UID2 Identity currently being managed by the SDK.

#### refreshIdentity()

Manually refreshes the UID2 Identity being managed by the SDK.

#### getAdvertisingToken()

If the current UID2 Identity is valid, this function returns the UID2 token (advertising token).

#### setAutomaticRefreshEnabled()

Toggle for automatic refresh functionality.

### Variables

The following variables are available as part of the UID2Manager API:

- [identity](#identity)
- [identityStatus](#identitystatus)

#### identity

The Identity variable stores and returns the current UID2Identity data object being managed by the SDK.

#### identityStatus

The identityStatus variable stores and returns the status of the current UID2 Identity being managed by the SDK.

## Android Initialization

The Android implementation expects the singleton to be initialized before use. This does two things:

-   It allows for easier access later.

-   It allows the consuming application to potentially provide its own network instance, responsible for making requests.

The initialization can be done during the creation of the APPLICATION instance, as shown in the following example:

``` javascript
class MyApplication : Application() {
  override fun onCreate() {
    super.onCreate()
   // Initialize the UID2Manager class. Use DefaultNetworkSession rather than providing our own
   // custom implementation. This can be done to allow wrapping something like OkHttp.
   UID2Manager.init(this.applicationContext)
```

## Code Samples

The following code samples provide examples of performing specific activities relating to managing UID2 with the UID2 Android SDK.

Set the Initial UID2 Identity:

``` javascript
UID2Manager.getInstance().setIdentity(identity: UID2Identity)
```

Get the UID2 token (advertising token) to pass to the Advertising SDK:

``` javascript
UID2Manager.getInstance().getAdvertisingToken()
```
