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

This guide is an overview of integration options for mobile app publishers who want to integrate with UID2 using the UID2 SDK for Android or the UID2 SDK for iOS.

:::note
This guide uses the group term **UID2 mobile SDKs** to include both the UID2 SDK for Android and the UID2 SDK for iOS.
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

1. Add the UID2 SDK for Android or iOS into your mobile app.

1. Configure the SDK.

1. Check that the token was successfully generated and then pass it for <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link> use.

1. Optionally, configure the UID2 GMA/IMA plugins for integration with the [Google GMA SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) and the [Google IMA SDK](https://developers.google.com/interactive-media-ads/).

For details, refer to one of the following guides:

- [Client-Side Integration Guide for Mobile](integration-mobile-client-side.md)
- [Client-Server Integration Guide for Mobile](integration-mobile-client-server.md)
