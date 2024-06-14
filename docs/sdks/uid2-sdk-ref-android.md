---
title: UID2 SDK for Android
description: Reference information about the Android SDK.
hide_table_of_contents: false
sidebar_position: 12
---

import Link from '@docusaurus/Link';

# UID2 SDK for Android Reference Guide

You can use the UID2 SDK for Android for the following:

- Generating or establishing client identity using UID2.
- Retrieving advertising tokens for <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link> use.
- Automatically refreshing UID2 tokens.

The following Android-related plugins, and associated documentation, are also available.

| Purpose | Product/Documentation |
| :--- | :--- |
| To use the Google Mobile Ads (GMA) SDK to send <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from Android apps | [UID2 GMA Plugin for Android Integration Guide](../guides/mobile-plugin-gma-android.md) |
| To use the Google Interactive Media Ads (IMA) SDK for Android to send <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from Android apps | [UID2 IMA Plugin for Android Integration Guide](../guides/mobile-plugin-ima-android.md) |

## Non-Mobile Android Device Support

This UID2 SDK for Android can be used for non-mobile devices for Android platforms as well.

## Functionality

This SDK simplifies integration with UID2 for any publishers who want to support UID2 for apps running on Android devices. The following table shows the functions it supports.

| Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token | Generate UID2 Token from DII | Refresh UID2 Token |
| :--- | :--- | :--- | :--- |
| Not supported | Not supported | Supported | Supported |

The UID2 SDK for Android is designed to generate and/or manage UID2 identity on behalf of Android apps. It enables UID2 identity to be persisted across app lifecycles by securely storing the identity on a device via platform-native encryption tools.

By default, the SDK automatically refreshes UID2 identity based on expiration dates. However, you can disable this to allow implementing apps to manage the UID2 identity lifecycle manually.

## API Permissions

To use this SDK, you'll need to complete the UID2 account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page.
You'll be granted permission to use specific functions offered by the SDK, and given credentials for that access.

## SDK Version

<!-- As of 7 May 2024 -->

This documentation is for the UID2 SDK for Android version 1.2.0 and later.

For current and past release notes information, see [https://github.com/IABTechLab/uid2-android-sdk/releases](https://github.com/IABTechLab/uid2-android-sdk/releases).

## GitHub Repository/Binary

This SDK is in the following open-source GitHub repository:

- [https://github.com/IABTechLab/uid2-android-sdk](https://github.com/IABTechLab/uid2-android-sdk)

The binary is published on Sonatype:

- [https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk](https://central.sonatype.com/artifact/com.uid2/uid2-android-sdk)

## Minimum Requirements

To consume the binary package of this SDK in your app:

- Minimum target Android version: 4.4+ / API 19+ (SDK) 5.0+


To run the development app (see [Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side#client-side-integration-example) or to build binary from source code, the minimum requirements are as follows:

- Android Studio version: Check the Android Gradle Plugin (AGP) version required by the UID2 SDK specified in the [code repository](https://github.com/IABTechLab/uid2-android-sdk/blob/main/gradle/libs.versions.toml) (see the stated `agp` version), and check [the Android Gradle Plugin release notes](https://developer.android.com/build/releases/gradle-plugin) for the corresponding Android Studio version required.
- Minimum target Android version: 4.4+ / API 19+ (SDK) 5.0+ / API 21+ (Dev-App)

<!-- See also: [Requirements](https://github.com/IABTechLab/uid2-android-sdk/blob/main/README.md#requirements). -->

## Installation

There are two options for installing the Android UID2 SDK:

-   [Gradle](#installing-with-gradle)

-  [Maven](#installing-with-maven)

### Installing with Gradle

To install with Gradle, add the SDK as a dependency in the build.gradle
file:

```js
implementation 'com.uid2:uid2-android-sdk:1.2.0'
```

### Installing with Maven 

To install with Maven, add the SDK as a dependency in the `pom.xml` file:

``` xml
<dependency> 
  <groupId>com.uid2</groupId> 
  <artifactId>uid2-android-sdk</artifactId> 
  <version>1.2.0</version> 
</dependency> 
```

## Usage Guidelines

The **UID2Manager** singleton is the primary developer API for the UID2 SDK for Android. It is responsible for storing, refreshing, and retrieving the UID2 Identity including the UID2 token.

The UID2Manager singleton must be initialized before use because:

-   It allows for easier access later.
-   It allows the consuming application to potentially provide its own network instance, responsible for making requests.

The initialization can be done during the creation of the application instance, as shown in the following example:

```js
class MyApplication : Application() {
  override fun onCreate() {
    super.onCreate()
   // Initialize the UID2Manager class. Use DefaultNetworkSession rather than providing our own
   // custom implementation. This can be done to allow wrapping something like OkHttp.
   UID2Manager.init(this.applicationContext)
```

There are two ways to establish an initial UID2 Identity:

1. Generate the UID2 identity using DII&#8212;email (hashed or unhashed) or phone number (hashed or unhashed). For integration instructions, see [Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md).

2. Create a UID2 identity server-side and then pass it into the UID2 SDK. For integration instructions, refer to [Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md).

The UID2 Mobile SDKs can perform refreshes of UID2 identities, after an Identity is established. This is because the refresh functionality relies on the refresh tokens that are part of the UID2 Identity.

## Code Samples

The following code samples provide examples of performing specific activities relating to managing UID2 with the UID2 SDK for Android.

Generate an initial UID2 Identity (refer to [Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side#configure-the-uid2-mobile-sdk)):
``` javascript
UID2Manager.getInstance().generateIdentity(
    identityRequest: IdentityRequest,
    subscriptionId: String,
    publicKey: String,
    onResult: (GenerateIdentityResult) -> Unit
)
```
Set the UID2 Identity (refer to [Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server#configure-the-uid2-mobile-sdk)):

```js
UID2Manager.getInstance().setIdentity(identity: UID2Identity)
```

Get the UID2 token (advertising token) to pass to the Advertising SDK (for ad request or bidstream use):

```js
UID2Manager.getInstance().getAdvertisingToken()
```

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

Generate a UID2 Identity using <Link href="../ref-info/glossary-uid#gl-dii">Directly identifying information (DII)</Link>. For instructions, see [Configure the UID2 mobile SDK](../guides/integration-mobile-client-side.md#configure-the-uid2-mobile-sdk) in the *Client-Side Integration Guide for Mobile*.

#### setIdentity()

Sets a UID2 Identity, created server-side, to be managed by the SDK. For details, see [Configure the UID2 Mobile SDK](../guides/integration-mobile-client-server.md#configure-the-uid2-mobile-sdk) in the *Client-Server Integration Guide for Mobile*.

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

