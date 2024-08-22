---
title: UID2 Mobile Integration Overview for Android and iOS
sidebar_label: Integration Overview for Mobile
pagination_label: Mobile Integration Overview for Android and iOS
description: Overview of options for UID2  mobile integration.
hide_table_of_contents: false
sidebar_position: 04
displayed_sidebar: sidebarPublishers
---

import Link from '@docusaurus/Link';

# UID2 Mobile Integration Overview for Android and iOS

This guide is an overview of integration options for mobile app publishers who want to integrate with UID2 using the SDK for Android or the SDK for iOS.

:::note
This guide uses the group term **UID2 mobile SDKs** to include both the SDK for Android and the SDK for iOS.
:::

## Introduction 

UID2 provides SDKs for Android/iOS that support the following:

- Generating the UID2 token
- Refreshing the UID2 token
- Storing the UID2 token

For additional flexibility, UID2 also provides alternative methods for some of the features and complementary products, such as UID2 Google GMA/IMA Plugins. Available options are described in the individual guides: see [Integration Overview: High-Level Steps](#integration-overview-high-level-steps).

## Client-Side or Client-Server Integration

The options for integrating with UID2 using the UID2 mobile SDKs are summarized in the following table. Choose the option that's best for you.

| Scenario | Option | Integration Guide |
| :--- | :--- | :--- |
| You have access to <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> (email address or phone number) on the client side/within the mobile app, and want to keep changes within your app only. | Client-side integration | [UID2 Client-Side Integration Guide for Mobile](integration-mobile-client-side.md) |
| You have access to DII on the server side only and can do the necessary development to generate UID2 tokens server-side, or you are using a <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link>. | Client-Server Integration | [UID2 Client-Server Integration Guide for Mobile](integration-mobile-client-server.md) |

## Integration Overview: High-Level Steps

At a high level, to integrate your mobile app with UID2 using the UID2 mobile SDKs, you'll need to complete the following steps:

1. Complete the UID2 account setup.

1. Client-Server Integration Only: Integrate server-side token generation.

1. Add the SDK for Android or iOS into your mobile app.

1. Configure the SDK.

1. Check that the token was successfully generated and then pass it for <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link> use.

1. Optionally, configure the UID2 GMA/IMA plugins for integration with the [Google GMA SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) and the [Google IMA SDK](https://developers.google.com/interactive-media-ads/).

For details, refer to one of the following guides:

- [Client-Side Integration Guide for Mobile](integration-mobile-client-side.md)
- [Client-Server Integration Guide for Mobile](integration-mobile-client-server.md)

## FAQs for Mobile Integrations

Here is some FAQ information relating to UID2 mobile integrations:

- [iOS: Can I use Swift Package Manager and Cocoapods/Podspec together?](#ios-can-i-use-swift-package-manager-and-cocoapodspodspec-together)

#### iOS: Can I use Swift Package Manager and Cocoapods/Podspec together?

For your UID2 Mobile integration, you can install the UID2 Mobile SDK, the UID2 GMA Plugin, and the UID2 IMA Plugin by either Swift Package Manager or CocoaPods.

Our recommendation:

- If you already use CocoaPods, particularly if you use it to integrate the Google Ad Frameworks yourself, it's best to use CocoaPods to integrate the UID2 SDKs. 
- If you're new to integrating dependencies, or you already have dependencies with Swift Package Manager, we recommend that you use Swift Package Manager for your UID2 mobile integration.


:::caution
If you already use Cocoapods, this does not prevent your app from using Swift Package Manager (SPM) to integrate the UID2 SDK and plugins. However, there is a potential conflict. If you already have GMA installed with CocoaPods, and you then install the UID2 Mobile SDK, which itself includes GMA, with Swift Package Manager, you end up with two copies of GMA in your implementation, which does not work.
:::

Therefore, if you already have GMA installed and want to install UID2, be sure that you first remove GMA from Cocoapods.

:::tip
Podspec is the name of the file in Cocoapods that defines the libraries to be integrated with the app.
:::

## Troubleshooting Tips for Mobile Integrations

Here's some additional information to help you troubleshoot your UID2 mobile integrations:

- [Android SDK cannot connect in Production environment](#android-sdk-cannot-connect-in-production-environment)

#### Android SDK cannot connect in Production environment

A good first step in troubleshooting is to look at the health check endpoint.

From your mobile device or Android emulator, see if you can reach this endpoint:

```
https://prod.uidapi.com/ops/healthcheck
```

The response should be `OK`.

Some error responses indicate  a networking problem resulting in your app not being able to reach the UID2 endpoint. For example:

- `Caused by java.net.UnknownHostException: Unable to resolve host "prod.uidapi.com": No address associated with hostname`

   The SDK tries to refresh the UID2 token in the background. If an error such as an IOException occurs, the SDK retries multiple times. If retry is not successful, this exception is displayed.

Another good troubleshooting step is to enable logging. For details, see [Enable Logging](integration-mobile-client-side.md#enable-logging).
