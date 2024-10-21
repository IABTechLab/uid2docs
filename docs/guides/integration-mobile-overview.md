---
title: UID2 Mobile Integration Overview for Android and iOS
sidebar_label: Integration Overview for Mobile
pagination_label: Mobile Integration Overview for Android and iOS
description: Overview of options for UID2 mobile integration.
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

## (NEW SECTION STARTS HERE)

## Mobile Integration Paths

To determine the best integration path for your mobile scenario, consider these points:

1. Do you want to retrieve the UID2 token on the client side or on the server side? See [Client-Side or Client-Server Integration](#client-side-or-client-server-integration).

1. What do you want to use to retrieve and refresh the UID2 token? See [Generating, Storing, and Refreshing the UID2 Token](#generating-storing-and-refreshing-the-uid2-token).

1. How do you want to use the UID2 tokens? See [Sending the Token to the Bidstream](#sending-the-token-to-the-bidstream).

### Client-Side or Client-Server Integration?

The options for integrating with UID2 using the UID2 mobile SDKs are summarized in the following table. Choose the <Link href="../ref-info/glossary-uid#gl-integration-approaches">integration approach</Link> that's best for you.

| Scenario | Option | Integration Guide |
| :--- | :--- | :--- |
| You have access to <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> (email address or phone number) on the client side/within the mobile app, and want to keep changes within your app only. | Client-side integration | [UID2 Client-Side Integration Guide for Mobile](integration-mobile-client-side.md) |
| You have access to DII on the server side only and can do the necessary development to generate UID2 tokens server-side, or you are using a <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link>. | Client-Server Integration | [UID2 Client-Server Integration Guide for Mobile](integration-mobile-client-server.md) |

### Generating, Storing, and Refreshing the UID2 Token

The following table summarizes the mobile integration options for managing the UID2 token, including generating, storing, and refreshing the token, with links to the documentation for each option.

| UID2 Mobile Implementation Option | Documentation Link |
| :--- | :---|
| UID2 Android SDK | SDK doc: [SDK for Android Reference Guide](../sdks/sdk-ref-android.md)<br/>Implementation Guide: One of the following:<ul><li>[UID2 Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md)</li><li>[UID2 Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md)</li></ul> |
| UID2 iOS SDK | SDK doc: [SDK for iOS Reference Guide](../sdks/sdk-ref-ios.md)<br/>Implementation Guide: One of the following:<ul><li>[UID2 Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md)</li><li>[UID2 Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md)</li></ul> |

### Sending the Token to the Bidstream

There are many options for sending your UID2 tokens to the bidstream.

The following table summarizes the options supported by UID2.

| Scenario | Integration Guide |
| :--- | :--- |
| You want to use Prebid Mobile SDK and Prebid Server to send out ad requests from your Android app | [UID2 GMA Plugin for Android Integration Guide](../guides/mobile-plugin-ima-android.md) |
| You want to use Prebid Mobile SDK and Prebid Server to send out ad requests from your iOS app | [UID2 GMA Plugin for iOS Integration Guide](../guides/mobile-plugin-ima-ios.md) |
| You want to use Google GMA to integrate video, banner, interstitial, or native ads into your Android app | Both of the following, in this sequence:<ol><li>[UID2 GMA Plugin for Android Integration Guide](../guides/mobile-plugin-gma-android.md)</li><li>[Optional: UID2 GMA/IMA Plugin for GAM Secure Signals integration](../guides/integration-mobile-client-side.md#optional-uid2-gmaima-plugin-for-gam-secure-signals-integration)</li></ol> |
| You want to use Google GMA to integrate video, banner, interstitial, or native ads into your iOS app | Both of the following, in this sequence:<ol><li>[UID2 GMA Plugin for iOS Integration Guide](../guides/mobile-plugin-gma-ios.md)</li><li>[Optional: UID2 GMA/IMA Plugin for GAM Secure Signals integration](../guides/integration-mobile-client-side.md#optional-uid2-gmaima-plugin-for-gam-secure-signals-integration)</li></ol> |
| You want to use Google IMA to integrate multimedia ads into your Android app | Both of the following, in this sequence:<ol><li>[UID2 IMA Plugin for Android Integration Guide](../guides/mobile-plugin-ima-android.md)</li><li>[Optional: UID2 GMA/IMA Plugin for GAM Secure Signals integration](../guides/integration-mobile-client-side.md#optional-uid2-gmaima-plugin-for-gam-secure-signals-integration)</li></ol> |
| You want to use Google IMA to integrate multimedia ads into your iOS app | Both of the following, in this sequence:<ol><li>[UID2 IMA Plugin for iOS Integration Guide](../guides/mobile-plugin-ima-ios.md)</li><li>[Optional: UID2 GMA/IMA Plugin for GAM Secure Signals integration](../guides/integration-mobile-client-side.md#optional-uid2-gmaima-plugin-for-gam-secure-signals-integration)</li></ol> |

### Functionality Summary

The following table summarizes the functionality available with the various integration options.

| Implementation Option | Client-Side or Server-Side | Generate UID2 Token from DII | Refresh UID2 Token | Android/iOS? | Send Token to Bidstream |
| :--- | :--- |  :--- | :--- | :--- | :--- |
| UID2 SDK for Android | Either | &#9989; | &#9989; | Android | &ast; |
| UID2 SDK for iOS | Either | &#9989;| &#9989; | iOS | &ast; |
| GMA Plugin for Android<br/>(Requires&nbsp;Android&nbsp;SDK) | Server-Side | &#8212; | &#8212; | Android | &#9989;&ast;&ast; |
| GMA Plugin for iOS<br/>(Requires iOS SDK) | Server-Side | &#8212; | &#8212; | iOS | &#9989;&ast;&ast; |
| IMA Plugin for Android <br/>(Requires Android SDK)| Server-Side | &#8212; | &#8212; | Android | &#9989;&ast;&ast; |
| IMA Plugin for iOS<br/>(Requires iOS SDK) | Server-Side | &#8212; | &#8212; | iOS | &#9989;&ast;&ast; |
| Prebid Mobile SDK | Either | &#9989; | &#9989; | Either | &#9989;&ast;&ast;&ast; |

&ast;Combine with IMA/GMA Plugin or Prebid Mobile SDK (or any other means) to send token to the bidstream.

&ast;&ast;&ast;After setup, Google GMA/IMA collects the token automatically and sends it to the bidstream.

&ast;&ast;&ast;After setup, Prebid Mobile SDK adds the token into the ad request to Prebid Server.

<!-- &#9989; = Supported | &#8212; = Not Supported -->

## (NEW SECTION ENDS HERE)

## FAQs for Mobile Integrations

Here is some FAQ information relating to UID2 mobile integrations:

- [iOS: Can I use Swift Package Manager and CocoaPods/Podspec together?](#ios-can-i-use-swift-package-manager-and-cocoapodspodspec-together)

#### iOS: Can I use Swift Package Manager and CocoaPods/Podspec together?

For your UID2 Mobile integration, you can install the UID2 Mobile SDK, the UID2 GMA Plugin, and the UID2 IMA Plugin by either Swift Package Manager or CocoaPods.

Our recommendation:

- If you already use CocoaPods, particularly if you use it to integrate the Google Ad Frameworks yourself, it's best to use CocoaPods to integrate the UID2 SDKs. 
- If you're new to integrating dependencies, or you already have dependencies with Swift Package Manager, we recommend that you use Swift Package Manager for your UID2 mobile integration.


:::caution
If you already use CocoaPods, this does not prevent your app from using Swift Package Manager (SPM) to integrate the UID2 SDK and plugins. However, there is a potential conflict. If you already have GMA installed with CocoaPods, and you then install the UID2 Mobile SDK, which itself includes GMA, with Swift Package Manager, you end up with two copies of GMA in your implementation, which does not work.
:::

Therefore, if you already have GMA installed and want to install UID2, be sure that you first remove GMA from CocoaPods.

:::tip
Podspec is the name of the file in CocoaPods that defines the libraries to be integrated with the app.
:::

## Troubleshooting Tips for Mobile Integrations

Here's some additional information to help you troubleshoot your UID2 mobile integrations:

- [Android SDK cannot connect in Production environment](#android-sdk-cannot-connect-in-production-environment)

#### Android SDK Cannot Connect in Production Environment

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
