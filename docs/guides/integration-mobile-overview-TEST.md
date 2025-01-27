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
import IntegratingWithSSO from '/docs/snippets/_integrating-with-sso.mdx';

# UID2 Mobile Integration Overview for Android and iOS

This guide is an overview of integration options for mobile app publishers who want to integrate with UID2 using the SDK for Android or the SDK for iOS.

...



### Generating, Storing, and Refreshing the UID2 Token

The following table summarizes the mobile integration options for managing the UID2 token, including generating, storing, and refreshing the token, with links to the documentation for each option.

CURRENT TABLE

| UID2 Mobile Implementation Option | SDK Doc | Implementation Guide |
| :--- | :---| :---|
| UID2 Android SDK | [SDK for Android Reference Guide](../sdks/sdk-ref-android.md) | One of the following:<ul><li>[UID2 Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md)</li><li>[UID2 Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md)</li></ul> |
| UID2 iOS SDK | [SDK for iOS Reference Guide](../sdks/sdk-ref-ios.md) | One of the following:<ul><li>[UID2 Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md)</li><li>[UID2 Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md)</li></ul> |

PREVIOUS VERSION TABLE THAT SUNNY COMMENTED ON

| Implementation Option | Client-Side or Server-Side | Generate UID2 Token from DII | Refresh UID2 Token | Android/iOS? | Send Token to Bidstream |
| :--- | :--- |  :--- | :--- | :--- | :--- |
| UID2 SDK for Android | Either | &#9989; | &#9989; | Android | &ast; |
| UID2 SDK for iOS | Either | &#9989;| &#9989; | iOS | &ast; |
| GMA Plugin for Android<br/>(Requires&nbsp;Android&nbsp;SDK) | Server-Side | &#8212; | &#8212; | Android | &#9989;&ast;&ast; |
| GMA Plugin for iOS<br/>(Requires iOS SDK) | Server-Side | &#8212; | &#8212; | iOS | &#9989;&ast;&ast; |
| IMA Plugin for Android <br/>(Requires Android SDK)| Server-Side | &#8212; | &#8212; | Android | &#9989;&ast;&ast; |
| IMA Plugin for iOS<br/>(Requires iOS SDK) | Server-Side | &#8212; | &#8212; | iOS | &#9989;&ast;&ast; |
| Prebid Mobile SDK | Either | &#9989; | &#9989; | Either | &#9989;&ast;&ast;&ast; |

PREVIOUS VERSION TABLE CONVERTED TO HTML

<table>
  <tr>
    <th>Implementation Option</th>
    <th>Client-Side or Server-Side</th>
    <th>Generate UID2 Token from DII</th>
    <th>Refresh UID2 Token</th>
    <th>Android/iOS?</th>
    <th>Send Token to Bidstream</th>
  </tr>
  <tr>
    <td>UID2 SDK for Android</td>
    <td>Either</td>
    <td>&#9989;</td>
    <td>&#9989;</td>
    <td>Android</td>
    <td>&ast;</td>
  </tr>
  <tr>
    <td>UID2 SDK for iOS</td>
    <td>Either</td>
    <td>&#9989;</td>
    <td>&#9989;</td>
    <td>iOS</td>
    <td>&ast;</td>
  </tr>
  <tr>
    <td>GMA Plugin for Android<br/>(Requires&nbsp;Android&nbsp;SDK)</td>
    <td>Server-Side</td>
    <td>&#8212;</td>
    <td>&#8212;</td>
    <td>Android</td>
    <td>&#9989;&ast;&ast;</td>
  </tr>
  <tr>
    <td>GMA Plugin for iOS<br/>(Requires iOS SDK)</td>
    <td>Server-Side</td>
    <td>&#8212;</td>
    <td>&#8212;</td>
    <td>iOS</td>
    <td>&#9989;&ast;&ast;</td>
  </tr>
  <tr>
    <td>IMA Plugin for Android <br/>(Requires Android SDK)</td>
    <td>Server-Side</td>
    <td>&#8212;</td>
    <td>&#8212;</td>
    <td>Android</td>
    <td>&#9989;&ast;&ast;</td>
  </tr>
  <tr>
    <td>IMA Plugin for iOS<br/>(Requires iOS SDK)</td>
    <td>Server-Side</td>
    <td>&#8212;</td>
    <td>&#8212;</td>
    <td>iOS</td>
    <td>&#9989;&ast;&ast;</td>
  </tr>
  <tr>
    <td>Prebid Mobile SDK</td>
    <td>Either</td>
    <td>&#9989;</td>
    <td>&#9989;</td>
    <td>Either</td>
    <td>&#9989;&ast;&ast;&ast; </td>
  </tr>
  </table>






































### Sending the Token to the Bidstream

There are many options for sending your UID2 tokens to the bidstream.

The following table summarizes the options supported by UID2.

| Scenario | Integration Guide |
| :--- | :--- |
| You want to use Google GMA to integrate video, banner, interstitial, or native ads into your Android app | Both of the following, in this sequence:<ol><li>[UID2 GMA Plugin for Android Integration Guide](../guides/mobile-plugin-gma-android.md)</li><li>One of the following:<ul><li>Client-side: [Optional: UID2 GMA/IMA Plugin for GAM Secure Signals integration](../guides/integration-mobile-client-side.md#optional-uid2-gmaima-plugin-for-gam-secure-signals-integration)</li><li>Client-server: [Optional: UID2 GMA/IMA Plugin for GAM Secure Signals integration](../guides/integration-mobile-client-server.md#optional-uid2-gmaima-plugin-for-gam-secure-signals-integration)</li></ul></li></ol> |
| You want to use Google GMA to integrate video, banner, interstitial, or native ads into your iOS app | Both of the following, in this sequence:<ol><li>[UID2 GMA Plugin for iOS Integration Guide](../guides/mobile-plugin-gma-ios.md)</li><li>One of the following:<ul><li>Client-side: [Optional: UID2 GMA/IMA Plugin for GAM Secure Signals integration](../guides/integration-mobile-client-side.md#optional-uid2-gmaima-plugin-for-gam-secure-signals-integration)</li><li>Client-server: [Optional: UID2 GMA/IMA Plugin for GAM Secure Signals integration](../guides/integration-mobile-client-server.md#optional-uid2-gmaima-plugin-for-gam-secure-signals-integration)</li></ul></li></ol> |
| You want to use Google IMA to integrate multimedia ads into your Android app | Both of the following, in this sequence:<ol><li>[UID2 IMA Plugin for Android Integration Guide](../guides/mobile-plugin-ima-android.md)</li><li>One of the following:<ul><li>Client-side: [Optional: UID2 GMA/IMA Plugin for GAM Secure Signals integration](../guides/integration-mobile-client-side.md#optional-uid2-gmaima-plugin-for-gam-secure-signals-integration)</li><li>Client-server: [Optional: UID2 GMA/IMA Plugin for GAM Secure Signals integration](../guides/integration-mobile-client-server.md#optional-uid2-gmaima-plugin-for-gam-secure-signals-integration)</li></ul></li></ol> |
| You want to use Google IMA to integrate multimedia ads into your iOS app | Both of the following, in this sequence:<ol><li>[UID2 IMA Plugin for iOS Integration Guide](../guides/mobile-plugin-ima-ios.md)</li><li>One of the following:<ul><li>Client-side: [Optional: UID2 GMA/IMA Plugin for GAM Secure Signals integration](../guides/integration-mobile-client-side.md#optional-uid2-gmaima-plugin-for-gam-secure-signals-integration)</li><li>Client-server: [Optional: UID2 GMA/IMA Plugin for GAM Secure Signals integration](../guides/integration-mobile-client-server.md#optional-uid2-gmaima-plugin-for-gam-secure-signals-integration)</li></ul></li></ol> |
| You want to use the Prebid Mobile SDK and Prebid Server to send out ad requests from your Android or iOS app | One of the following:<ul><li>Client-side: [Optional: UID2 Integration with Prebid Mobile SDK](../guides/integration-mobile-client-side.md#optional-uid2-integration-with-prebid-mobile-sdk)</li><li>Client-server: [Optional: UID2 Integration with Prebid Mobile SDK](../guides/integration-mobile-client-server.md#optional-uid2-integration-with-prebid-mobile-sdk)</li></ul> |

### Functionality Summary

The following table summarizes the functionality available with the various integration options.

All options support either client-side or server-side integration.

| Implementation Option | Generate Token from DII | Refresh Token | Android/iOS? | Send Token to Bidstream |
| :--- | :--- | :--- | :--- | :--- |
| UID2 SDK for Android | &#9989; | &#9989; | Android | &ast; |
| UID2 SDK for iOS | &#9989;| &#9989; | iOS | &ast; |
| GMA Plugin for Android<br/>(Requires UID2 SDK for Android) | &#8212; | &#8212; | Android | &#9989;&ast;&ast; |
| GMA Plugin for iOS<br/>(Requires UID2 SDK for iOS) | &#8212; | &#8212; | iOS | &#9989;&ast;&ast; |
| IMA Plugin for Android <br/>(Requires UID2 SDK for Android)| &#8212; | &#8212; | Android | &#9989;&ast;&ast; |
| IMA Plugin for iOS<br/>(Requires UID2 SDK for iOS)| &#8212; | &#8212; | iOS | &#9989;&ast;&ast; |
| UID2 Integration with Prebid Mobile SDK | &#8212; | &#8212; | Either | &#9989;&ast;&ast;&ast; |

&ast;You can combine the SDK with the IMA/GMA Plugin or the UID2 Integration with Prebid Mobile SDK to send the token to the bidstream via Google or Prebid Server, or you can retrieve the token manually from the SDK and pass it to the bidstream in another way, according to your preference.

&ast;&ast;After setup, Google GMA/IMA collects the token automatically and sends it to the bidstream.

&ast;&ast;&ast;After setup, the UID2 Integration with Prebid Mobile SDK adds the token into the ad request to Prebid Server.

<!-- &#9989; = Supported | &#8212; = Not Supported -->

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

- [Android SDK Cannot Connect in Production Environment](#android-sdk-cannot-connect-in-production-environment)

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
