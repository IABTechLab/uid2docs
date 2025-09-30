---
title: SDK for iOS
description: Reference information about the iOS SDK.
hide_table_of_contents: false
sidebar_position: 14
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# SDK for iOS Reference Guide

You can use the SDK for iOS to facilitate the process of generating or establishing client identity using UID2, retrieving advertising tokens for <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link> use, and automatically refreshing UID2 tokens.

The following iOS-related plugins, and associated documentation, are also available:

| Purpose | Product/Documentation |
| :--- | :--- |
| To use the Google Mobile Ads (GMA) SDK to send <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from iOS/tvOS apps | [UID2 GMA Plugin for iOS Integration Guide](../guides/mobile-plugin-gma-ios.md) |
| To use the Google Interactive Media Ads SDK for iOS to send <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from iOS/tvOS apps | [UID2 IMA Plugin for iOS Integration Guide](../guides/mobile-plugin-ima-ios.md) |

## tvOS Support
Although this page refers to SDK for iOS, this SDK also supports tvOS. For the required tvOS version, see [Minimum Requirements](#minimum-requirements).

## Functionality

This SDK simplifies integration with UID2 for any publishers who want to support UID2 for apps running on iOS devices. The following table shows the functions it supports.

| Encrypt Raw UID2 to UID2 Token for Sharing | Decrypt UID2 Token to Raw UID2 | Generate UID2 Token from DII | Refresh UID2 Token | Map DII to Raw UID2s | Monitor Rotated Salt Buckets |
| :--- | :--- | :--- | :--- | :--- | :--- |
| &#8212; | &#8212; | &#9989; | &#9989; | &#8212; | &#8212; |

The SDK for iOS is designed to generate and/or manage UID2 identity on behalf of iOS apps. It enables UID2 identity to be persisted across app lifecycles by securely storing the identity on a device via platform-native encryption tools.

By default, the SDK automatically refreshes UID2 identity based on expiration dates. However, you can disable this to allow implementing apps to manage the UID2 identity lifecycle manually.

## UID2 Account Setup

To integrate with UID2, you'll need to have a UID2 account. If you haven't yet created an account, first follow the steps described on the [Account Setup](../getting-started/gs-account-setup.md) page.

## API Permissions

When initial account setup is complete, you'll receive instructions and a link to access the [UID2 Portal](../portal/portal-overview.md), where you can:
- Generate [credentials](../getting-started/gs-credentials.md) for your account.
- Optional: For a client-side implementation, set up configuration values such as domain names or mobile app IDs.
- Optionally, configure other values, such as setting up information about team members.

The steps you'll take in the UID2 Portal are different depending on whether your implementation will be client-side, client-server, or server-side. For a summary of mobile integration options, see [Client-Side, Client-Server, or Server-Side Integration?](../guides/integration-mobile-overview#client-side-client-server-or-server-side-integration)

<!-- You'll be granted permission to use specific functions offered by the SDK, and given credentials for that access. -->

## SDK Version

<!-- As of 2025-08-07 -->

This documentation is for the SDK for iOS version 2.0.0 or later.

For current and past release notes information, see [https://github.com/IABTechLab/uid2-ios-sdk/releases](https://github.com/IABTechLab/uid2-ios-sdk/releases).

## GitHub Open-Source Repository

This SDK is in the following open-source GitHub repository:

- [https://github.com/IABTechLab/uid2-ios-sdk](https://github.com/IABTechLab/uid2-ios-sdk)

## Minimum Requirements

Minimum requirements for this SDK are as follows:

- Xcode version: 15.0+
- iOS minimum target version:
  - For full functionality: 13.0+
  - For partial functionality: 12.0+. The app with the SDK integrated can be installed with all devices, but generating or retrieving UID2 tokens on the client side will not work with devices running iOS versions below 13.0.
- tvOS minimum target version: 13.0+
- Swift version: 5.0+

<!-- See also: [Requirements](https://github.com/IABTechLab/uid2-ios-sdk/blob/main/README.md#requirements). -->

## Installation

Install the iOS SDK via Swift Package Manager (SPM) or CocoaPods. There are three installation options:

-   [Package.swift](#installing-with-packageswift)
-   [Xcode](#installing-with-xcode)
-   [CocoaPods](#installing-with-cocoapods)

### Installing with Package.swift

Add the following dependency to Package.swift:

```js
dependencies: [
  .package(url: "https://github.com/IABTechLab/uid2-ios-sdk.git", from: "2.0.0"),
]
```

### Installing with Xcode

In the XCode user interface, under Package Dependencies, add the following entry for your apps:

| Name | Location | Dependency Rule |
| :--- | :--- | :--- |
| uid2-ios-sdk | `git@github.com:IABTechLab/uid2-ios-sdk.git` | Up to next major version: 2.0.0 < 3.0.0 |

### Installing with CocoaPods

Add the following entry in your `Podfile`:

```
pod 'UID2', '~> 2.0'
```

## Usage Guidelines

The **UID2Manager** singleton is the primary developer API for the SDK for iOS. It is responsible for storing, refreshing, and retrieving the UID2 Identity including the UID2 token.

For iOS, the `UID2Manager` is initialized automatically the first time it is accessed. You can configure it to support automatic or manual refresh capabilities.

There are two ways to establish an initial UID2 Identity:

1. Generate the UID2 identity using DII&#8212;email (hashed or unhashed) or phone number (hashed or unhashed). For integration instructions, see [Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md).

2. Create a UID2 identity from your server's back end and then pass it to the UID2 SDK. For integration instructions, see [Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server).

The UID2 Mobile SDKs can perform refreshes of UID2 identities, after an Identity is established. This is because the refresh functionality relies on the refresh tokens that are part of the UID2 Identity.


## Code Samples

The following code samples provide examples of performing specific activities relating to managing UID2 with the SDK for iOS.

Generate an initial UID2 Identity (for instructions, see [Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md#configure-the-uid2-mobile-sdk)):

```js
UID2Manager.shared.generateIdentity(
    _ identity: IdentityType,
    subscriptionID: String,
    serverPublicKey: String,
    appName: String? = nil
)
```
Set the Initial UID2 Identity (for instructions, see [Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server#configure-the-uid2-mobile-sdk)):

``` javascript
UID2Manager.shared.setIdentity(_ identity: UID2Identity)
```

Get the UID2 token (advertising token) to pass to the Advertising SDK (for ad request or bidstream use):

```js
UID2Manager.shared.getAdvertisingToken()
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

Generate a UID2 Identity using <Link href="../ref-info/glossary-uid#gl-dii">Directly identifying information (DII)</Link>. For details, see [Configure the UID2 Mobile SDK](../guides/integration-mobile-client-side.md#configure-the-uid2-mobile-sdk) in the *Client-Side Integration Guide for Mobile*.

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
