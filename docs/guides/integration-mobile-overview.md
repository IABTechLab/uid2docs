---
title: UID2 Mobile Integration Overview for Android and iOS
sidebar_label: Integration Overview for Mobile
pagination_label: Mobile Integration Overview for Android and iOS
description: Overview of options for mobile integration as part of your UID2 implementation.
hide_table_of_contents: false
sidebar_position: 04
displayed_sidebar: sidebarPublishers
---

import Link from '@docusaurus/Link';

# UID2 Mobile Integration Overview for Android and iOS

This guide is an overview of integration options for mobile app publishers who want to integrate with UID2 using the UID2 SDK for Android or the UID2 SDK for iOS.

This guide groups those two SDKs as UID2 mobile SDKs.

<!-- It includes the following sections:

- [Introduction](#introduction)
- [Client-Side or Client-Server Integration ](#client-side-or-client-server-integration)
- [Integration Overview: High-Level Steps](#integration-overview-high-level-steps) -->

## Introduction 

UID2 provides SDKs for Android/iOS that support the following:

- Generating the UID2 token
- Refreshing the UID2 token
- Storing the UID2 token

For additional flexibility, UID2 also provides alternative methods for some of the features and complementary products, such as Google GMA/IMA Plugins (described later in this document).

## Client-Side or Client-Server Integration

The options for integrating with UID2 using the UID2 mobile SDKs are summarized in the following table. Choose the option that's best for you.

(GWH__SW: Sunny, can I say )

| Scenario | Option | Integration Guide |
| :--- | :--- | :--- |
| You have access to DII on the client side/within the mobile app, and want to keep changes within your app only. | Client-side integration | [UID2 Client-Side Integration Guide for Mobile](integration-mobile-client-side.md) |
| You have access to DII on the server side only and can do the necessary development to generate UID2 tokens server-side, or you are using a [Private Operator](../ref-info/glossary-uid.md#gl-private-operator). | Client-Server Integration | [UID2 Client-Server Integration Guide for Mobile](integration-mobile-client-server.md) |

## Integration Overview: High-Level Steps

At a high level, to integrate your mobile app with UID2 using the UID2 mobile SDKs, you' wi'll need to complete the following steps:

1. Complete UID2 account setup.

1. Client-Server Integration Only: Integrate server-side token generation on your back-end server.

1. Add the UID2 SDK for Android or iOS into your mobile app.

1. Configure the SDK.

1. [Check that the token was successfully generated and then pass it for bid stream use](#pass-generated-token-for-bid-stream-use).

1. Optionally, configure the UID2 GMA/IMA plugins for integration with the Google GMA/IMA SDKs.

For details, refer to one of the following guides:

- [Client-Side Integration Guide for Mobile](integration-mobile-client-side.md)
- [Client-Server Integration Guide for Mobile](integration-mobile-client-server.md)

(**GWH__SW should we also include these guides?**)

- [UID2 SDK for Android Reference Guide](../sdks/uid2-sdk-ref-android.md)
- [UID2 SDK for iOS Reference Guide](../sdks/uid2-sdk-ref-ios.md)
