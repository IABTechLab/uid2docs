---
title: UID2 Integration Overview for Prebid
sidebar_label: UID2 Integration Overview for Prebid
pagination_label: UID2 Integration Overview for Prebid
description: Overview of options for integrating with Prebid as part of your UID2 implementation.
hide_table_of_contents: false
sidebar_position: 04
displayed_sidebar: sidebarPublishers
---

import Link from '@docusaurus/Link';
import IntegratingWithSSO from '../snippets/_integrating-with-sso.mdx';
import StoreUID2TokenInBrowser from '../snippets/_prebid-storing-uid2-token-in-browser.mdx';

# UID2 Integration Overview for Prebid

This guide is an overview of integration options for publishers who want to integrate with UID2 and generate <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> (advertising tokens) to be passed by Prebid.js or the Prebid Mobile SDK in the RTB <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link>.

## Prebid.js Support for Web

UID2 provides a Prebid.js module that supports the following:

- [Generating the UID2 token](#generating-the-uid2-token)
- [Refreshing the UID2 token](#refreshing-the-uid2-token)
- [Storing the UID2 token in the browser](#storing-the-uid2-token-in-the-browser)
- [Passing the UID2 token to the bidstream](#passing-the-uid2-token-to-the-bidstream)

For additional flexibility, UID2 also provides alternative methods for some of the features and complementary products, such as a JavaScript SDK.

:::caution
UID2 is not designed to be used where <Link href="../ref-info/glossary-uid#gl-gdpr">GDPR</Link> applies. The module checks the consent data that's passed in, and does not operate if the `gdprApplies` flag is set to `true`.
:::

<!-- GDPR statement difference for UID2/EUID | UID2 is not designed to be used where GDPR applies | EUID is designed to be used only where GDPR applies. -->

## Integrating with Single Sign-On (SSO)

<IntegratingWithSSO />

### Generating the UID2 Token

Depending on access to DII, there are two methods to generate UID2 tokens for use with Prebid.js, as shown in the following table.

Determine which method is best for you, and then follow the applicable integration guide.

| Scenario | Integration Guide |
| :--- | :--- |
| You have access to DII on the client side and want to do front-end development only | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| You have access to DII on the server side and can do server-side development | [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md) |

### Refreshing the UID2 Token

The Prebid.js UID2 module can automatically refresh the UID2 tokens. If you prefer to implement manual refresh outside Prebid.js, see [Refreshing a UID2 Token](integration-prebid-client-server.md#refreshing-a-uid2-token) in the Server-Side Integration Guide. The client-side integration solution includes automated token refresh.

### Storing the UID2 Token in the Browser

<StoreUID2TokenInBrowser />

### Passing the UID2 Token to the Bidstream

To configure the UID2 module, call `pbjs.setConfig`. For details on supported parameters, refer to the guide that applies to your implementation:

- [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md)
- [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md)

When the UID2 module is configured, it manages a UID2 token for the user and stores it in the user's browser. 

When generating tokens with Client Refresh mode on the client side or on the server side, the module automatically takes care of refreshing the token as long as your site is open in the user's browser. However, you also have the option to manage the token refresh on the server side. For details, see [Refreshing a UID2 Token](integration-prebid-client-server.md#refreshing-a-uid2-token) in the Server-Side Integration Guide. The client-side integration solution includes automated token refresh.

### Integration Overview: High-Level Steps

At a high level, to integrate your site with UID2 using Prebid.js, you'll need to complete the following steps:

1. Complete UID2 account setup.
1. Add Prebid.js to your site.
1. Configure the UID2 module.

For detailed instructions, refer to one of the following integration guides:

- [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md)
- [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md)

## UID2 Integration with Prebid Mobile SDK for Mobile Devices

UID2 integration with Prebid is supported for Android and iOS mobile devices using the [UID2 Mobile Integration with Prebid Mobile SDK](integration-prebid-mobile-summary.md).
