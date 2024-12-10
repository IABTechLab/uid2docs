---
title: Documentation Updates
description: A summary of significant UID2 documentation updates.
hide_table_of_contents: false
sidebar_position: 06
---

import Link from '@docusaurus/Link';

# Documentation Updates

Check out the latest updates to our UID2 documentation resources.

### New: Zoom-In Tool for Images

December 15, 2024

The UID2 docs site now includes a zoom-in tool for images.

Just hover over the image and the tool appears as a magnifying glass... click to view a magnified version of the image.

<!-- APIDOCS-2237 for both -->

### New: UID2 Portal Audit Trail Page

November 15, 2024

The UID2 Portal documentation now includes a new page, [Audit Trail](../portal/audit-trail.md).

The **Audit Trail** page in the UID2 Portal allows users who have the Admin role (see [User Roles](../portal/team-members.md#user-roles)) to view a detailed log of all past actions performed by or on behalf of the current <Link href="../ref-info/glossary-uid#gl-sharing-participant">participant</Link>.

<!-- APIDOCS-2700 -->

### New: LiveRamp Integration Tips

November 14, 2024

We've added a new reference page with tips for publishers who are using LiveRamp's Authenticated Traffic Solution (ATS) to generate UID2 tokens to be passed in the bid request.

For details, see [LiveRamp Integration Tips](../guides/integration-liveramp-tips.md).

<!-- APIDOCS-2699 -->

### New: Tokens Page

September 10, 2024

We've added a new reference page with information about tokens.

For details, see [UID2 Tokens and Refresh Tokens](../ref-info/ref-tokens.md).

<!-- APIDOCS-2533 -->

### New: Private Operator Integrations Page

August 28, 2024

We've added a new page with information about Private Operator integrations.

For details, see [Private Operator Integrations](../guides/integration-options-private-operator).

<!-- APIDOCS-2164 -->

### New: DSP Direct Integration Instructions

August 22, 2024

We've added a new guide for DSPs who are not using UID2 SDKs.

For details, see [DSP Direct Integration Instructions](../guides/integration-dsp-no-sdk.md).

<!-- APIDOCS-2394 -->

<!-- ### New: UID2 Token Reference Page

August 22, 2024

We've added a new reference page with general information about UID2 tokens, including refresh tokens.

For details, see [UID2 Tokens and Refresh Tokens]. -->

<!-- APIDOCS-1958 removed 8/26/22 -->

### New: Integration Approaches Page

July 23, 2024

We've added a new page with information about the different integration approaches: client-side, client-server, and server-side.

For details, see [Integration Approaches](ref-integration-approaches.md).

<!-- APIDOCS-2132 -->

### New: Server-Side Token Generation Page

July 3, 2024

We've added a new reference page with information for publishers generating the UID2 token on the server side.

For details, see [Server-Side Token Generation](ref-server-side-token-generation.md).

<!-- APIDOCS-2255 -->

### New: Prebid Mobile SDK Integration (Android)

July 2, 2024

We've added a new section to the two mobile integration guides with instructions for mobile integration using Prebid, currently for Android only:

- [UID2 Client-Side Integration Guide for Mobile: Prebid Integration](../guides/integration-mobile-client-side#optional-uid2-prebid-mobile-sdk-integration)
- [UID2 Client-Server Integration Guide for Mobile: Prebid Integration](../guides/integration-mobile-client-server#optional-uid2-prebid-mobile-sdk-integration)

<!-- APIDOCS-2269 -->

### New: CTV Integration Guide

June 21, 2024

We've just added a new guide for CTV publishers who want to integrate with UID2.

For details, see [CTV Integration Guide](../guides/integration-ctv-guide.md).

<!-- APIDOCS-2264 -->

### New: Opt-Out API

May 24, 2024

We added documentation for a new API call that checks the opt-out status of raw UID2s.

Given a list of raw UID2s, this endpoint returns the raw UID2s that have opted out, as well as the time that the opt-out took place.

For details, see [POST&nbsp;/optout/status](../endpoints/post-optout-status.md).

<!-- APIDOCS-1739 -->

### New: Client-Side and Server-Side Guides for Mobile

May 17, 2024

We've added the following integration guides to support publishers who want to implement UID2 for their Android or iOS mobile apps:

- [UID2 Mobile Integration Overview for Android and iOS](../guides/integration-mobile-overview)
- [UID2 Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side)
- [UID2 Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server)

<!-- APIDOCS-1903-->

### New: UID2 Portal Client-Side Integration Page

May 6, 2024

The UID2 Portal documentation now includes a new page, [Client-Side Integration](../portal/client-side-integration.md).

The Client-Side Integration page in the UID2 Portal allows you to set up and manage the values that are needed if you are generating UID2 tokens on the client side, such as specifying your domains.

<!-- APIDOCS-2120 -->

### New: UID2 Portal API Keys Page

April 25, 2024

The UID2 Portal documentation now includes a new page, [API Keys](../portal/api-keys.md).

The API Keys page in the UID2 Portal allows you to perform all activities relating to managing API keys, and their associated secret values and permission settings, for your UID2 account.

<!-- APIDOCS-2133 -->

### Documentation for Sharing Including Raw UID2 Sharing

April 22, 2024

We've completely reworked and significantly expanded the sharing documentation to include instructions for all sharing scenarios.

The documentation now supports additional sharing scenarios, including the ability to share raw UID2s when senders and receivers follow the applicable legal, security, and technical requirements.

For details, see [UID2 Sharing: Overview](../sharing/sharing-overview.md).

<!-- APIDOCS-2134 -->

### New: UID2 Hashing Tool

March 4, 2024

We've added a new UID2 hashing tool so that you can check that you're normalizing and encoding correctly.

For details, see [UID2 Hashing Tool](../getting-started/gs-normalization-encoding#uid2-hashing-tool) in the *Normalization and Encoding* documentation.

<!-- APIDOCS-1974 -->

### New: Java SDK Support for Advertiser/Data Provider

February 28, 2024

The Java SDK now supports Advertisers and Data Providers wanting to use the [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) endpoint.

For details, see the updated documentation in the *SDK for Java Reference Guide*: [Usage for Advertisers and Data Providers](../sdks/sdk-ref-java.md#usage-for-advertisersdata-providers).

<!-- UID2-2759 -->

### New: Audience-Specific Sidebars

February 9, 2024

We've improved the website so that specific users clicking through on the links at the top of the [UID2 home page](https://unifiedid.com/) (Publishers, Advertisers, DSPs, Data Providers) now have a custom left sidebar, with the specific documentation that's applicable to that audience.

Anyone wanting to see the full set of docs for all audiences can just click through on the Documentation link on the UID2 home page.

Note that many docs are applicable to multiple audiences, and there are many interlinks between docs, so the sidebar view might change on your journey through the site. You can always get back to your specific view by clicking the link at the top: these links appear on all pages.

To view the custom sidebars, go to [https://unifiedid.com](https://unifiedid.com/) and click on one of the audience links at the top: [Publishers](../overviews/overview-publishers.md). [Advertisers](../overviews/overview-advertisers.md), [DSPs](../overviews/overview-dsps.md), or [Data Providers](../overviews/overview-data-providers.md).

<!-- APIDOCS-1681 -->

### New: UID2 Integration Overview for JS

January 26, 2024

We've added a new overview guide summarizing the options for publishers using the SDK for JavaScript for client-side or client-server integration. In addition, the existing guides have been renamed for consistency, with minor updates.

For details, see:

- [UID2 Integration Overview for JavaScript](../guides/integration-javascript)
- [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md)
- [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md)

<!-- APIDOCS-1924 -->

### New: SDK for Java, Publisher Sections

January 22, 2024

We've added new sections in the SDK for Java documentation to help publishers implementing the SDK.

For details, see [Usage for Publishers](../sdks/sdk-ref-java.md#usage-for-publishers) in the SDK for Java Reference Guide.

<!-- APIDOCS-1705 -->

### New: Normalization and Encoding Examples

January 19, 2024

We've expanded and clarified the existing Normalization and Encoding doc, and added a new examples section to help you make sure that you're following the process correctly.

For details, see [Normalization and Encoding](../getting-started/gs-normalization-encoding.md).

<!-- APIDOCS-1183, APIDOCS-1880 -->

### New: Web Integration Overview for Publishers

January 16, 2024

We've added a new page summarizing the web integration options available to publishers integrating with UID2.

For details, see [Web Integration Overview](../guides/integration-options-publisher-web.md).

<!-- APIDOCS-1846 -->

### New: UID2 Operator Page

January 3, 2024

We've added a reference page explaining what the UID2 Operator does and the differences between a Public Operator and a Private Operator.

For details, see [The UID2 Operator](../ref-info/ref-operators-public-private.md).

<!-- APIDOCS-1720 -->

<!-- ## 2023 Updates -->

### New: UID2 Integration Overview for Prebid

December 20, 2023

A new overview guide summarizes the publisher options for integrating Prebid with UID2.

In addition, the existing guides have been restructured and simplified.

For details, see:

- [UID2 Integration Overview for Prebid](../guides/integration-prebid.md)
- [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md)
- [UID2 Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-client-server.md)

### New: Encrypt/Decrypt Examples, Java and C#

December 14, 2023

We've added instructions and code examples for encrypting UID2 requests and decrypting responses in additional programming languages. To the existing Python example, we've added Java and C#.

For details, see [Encryption and Decryption Code Examples](../getting-started/gs-encryption-decryption.md#encryption-and-decryption-code-examples).

### New: UID2 Private Operator for Azure Integration Guide

November 30, 2023

A UID2 <a href="../intro#participants">participant</a> who wants to be a [Private Operator](../ref-info/glossary-uid.md#gl-private-operator) can now set up the UID2 Operator Service in an instance of [Confidential Containers](https://learn.microsoft.com/en-us/azure/confidential-computing/confidential-containers), a confidential computing option from Microsoft Azure.

For details, see [UID2 Private Operator for Azure Integration Guide](../guides/operator-guide-azure-enclave.md).

### New: API Permissions

November 22, 2023

A new article in the Getting Started section of the UID2 website provides information about the key UID2 permissions, the types of participants that commonly use them, and the key associated activities.

For details, see [API Permissions](../getting-started/gs-permissions.md).

### New: UID2 Credentials Page

November 21, 2023

We've replaced the previous **API Keys** page with a new page that includes information about the credentials for those following a server-side implementation strategy.

For details, see [UID2 Credentials](../getting-started/gs-credentials.md).

### New: Client-Side Integration Guide for JS

November 21, 2023

The Client-Side Integration Guide for JavaScript is a completely new document at the existing URL, covering a new, simpler way of using the SDK for JavaScript for a client-side publisher implementation.

For details, see [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md).

The content that was in the previous *SDK for JavaScript Integration Guide*  is now in a supplementary document for publishers who want to implement the JavaScript SDK on the server side.

:::note
This document was updated in January 2024 to [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md), and the JavaScript Standard Integration Guide is now the [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md).
:::

### New: UID2 Client-Side Integration Guide for Prebid.js

November 2, 2023

The UID2 Client-Side Integration Guide for Prebid.js is a completely new document at the existing URL, covering a new, simpler way of integrating UID2 with Prebid that does not require any server-side work.

The content that was in the previous version of the Prebid document is now in a supplementary document, *Prebid.js Advanced Integration Guide*, for publishers who are using a private operator or who prefer to implement token generate on the server side.

:::note
These documents were further updated in later revisions. Updated links are as follows:
- [UID2 Integration Overview for Prebid](../guides/integration-prebid.md)
- [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md)
- [UID2 Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-client-server.md)
:::

### New: Opt-Out Page

October 31, 2023

This new reference topic provides an overview of user opt-out.

For details, see [User Opt-Out](../getting-started/gs-opt-out.md).

### New: AWS Entity Resolution Integration Guide

October 19, 2023

This new guide provides information for using [AWS Entity Resolution](https://aws.amazon.com/entity-resolution/), an identity resolution product from Amazon Web Services that allows AWS customers to integrate with the UID2 framework.

This service allows you to map DII (email addresses or phone numbers) to raw UID2s swiftly and securely.

For details, see [AWS Entity Resolution Integration Guide](../guides/integration-aws-entity-resolution.md).

### New: SDK for JavaScript Version 3 

October 10, 2023

Significant documentation updates reflect the enhanced functionality of Version 3 of the SDK for JavaScript. The new documentation includes a [migration guide](../sdks/sdk-ref-javascript#migration-guide) for those upgrading from an earlier version of the SDK.

For details, see:
-  [SDK for JavaScript Reference Guide](../sdks/sdk-ref-javascript.md)
-  [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md)

### New: Private Operator Guide for Google Confidential Space 

September 30, 2023

This new guide provides information for setting up the UID2 Operator Service in [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space), a confidential computing option from the Google Cloud Platform.

For details, see [UID2 Private Operator for GCP Integration Guide](../guides/operator-private-gcp-confidential-space.md).

<!-- APIDOCS-1655 -->

### Update: Normalization and Encoding Rules

September 7, 2023

We clarified the instructions for normalizing and encoding <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> to create a raw UID2 or UID2 token.

For details, see:

- [Email Address Hash Encoding](../getting-started/gs-normalization-encoding#email-address-hash-encoding)
- [Phone Number Hash Encoding](../getting-started/gs-normalization-encoding#phone-number-hash-encoding)

### New: IMA Mobile Plugin for Android

August 8, 2023

A new guide for publishers that provides information about the UID2 Interactive Media Ads (IMA) Plugin for Android. This plugin enables publishers who use the Google IMA SDK for Android to send <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> as secure signals in ad requests from Android apps.

For details, see [UID2 IMA Plugin for Android Integration Guide](../guides/mobile-plugin-ima-android.md).

### New: IMA Mobile Plugin for iOS

August 8, 2023

A new guide for publishers that provides information about the UID2 Interactive Media Ads (IMA) Plugin for iOS. This plugin enables publishers who use the Google IMA SDK for iOS to send <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> as secure signals in ad requests from iOS apps.

For details, see [UID2 IMA Plugin for iOS Integration Guide](../guides/mobile-plugin-ima-ios.md).

### New: GMA Mobile Plugin for Android

August 4, 2023

A new guide for publishers that provides information about the UID2 Google Mobile Ads (GMA) Plugin for Android. This plugin enables publishers who use the Google GMA SDK to send <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> as secure signals in ad requests from Android apps.

For details, see [UID2 GMA Plugin for Android Integration Guide](../guides/mobile-plugin-gma-android.md).

### New: GMA Mobile Plugin for iOS

August 4, 2023

A new guide for publishers that provides information about the UID2 Google Mobile Ads (GMA) Plugin for iOS. This plugin enables publishers who use the Google GMA SDK to send <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> as secure signals in ad requests from iOS apps.

For details, see [UID2 GMA Plugin for iOS Integration Guide](../guides/mobile-plugin-gma-ios.md).

### New: UID2 Website in Japanese

August 3, 2023

The entire UID2 website is now available in Japanese as well as English.

For details, use the language drop-down at the top of any site page, or go straight to the [Unified ID 2.0 page in Japanese](https://unifiedid.com/ja/docs/intro).

### New: UID2 Portal Documentation

August 3, 2023

We published several new documentation pages to help users navigating the new UID2 Portal user interface, where you can manage your UID2 account.

For details, see [UID2 Portal: Overview](../portal/portal-overview.md).

### New: Documentation for UID2 Sharing

August 3, 2023

We published the following new and updated documents to support use of the new UID2 sharing feature:

- A set of new pages providing information relating to UID2 sharing, including an overview, use cases, implementation instructions, best practices, and more. See [UID2 Sharing: Overview](../sharing/sharing-overview.md).
- Updates to the four server-side SDKs to support UID2 sharing:

  - [SDK for C# / .NET: Usage for UID2 Sharers](../sdks/sdk-ref-csharp-dotnet.md#usage-for-uid2-sharers)
  - [SDK for C++: Usage for UID2 Sharers](../sdks/sdk-ref-cplusplus.md#usage-for-uid2-sharers)
  - [SDK for Java: Usage for UID2 Sharers](../sdks/sdk-ref-java.md#usage-for-uid2-sharers)
  - [SDK for Python: Usage for UID2 Sharers](../sdks/sdk-ref-python.md#usage-for-uid2-sharers)

- Updates to the Snowflake feature to support UID2 sharing. See [Snowflake Integration Guide: Usage for UID2 Sharers](../guides/snowflake_integration.md#usage-for-uid2-sharers).

### New: Android SDK Guide

August 3, 2023

A new guide for publishers that provides information about the SDK for Android, an SDK that facilitates the process of establishing client identity using UID2 and retrieving UID2 tokens for publishers who need to support Android apps.

For details, see [SDK for Android Reference Guide](../sdks/sdk-ref-android.md).

### New: iOS SDK Guide

August 3, 2023

A new guide for publishers that provides information about the SDK for iOS, an SDK that facilitates the process of establishing client identity using UID2 and retrieving UID2 tokens for publishers who need to support iOS apps.

For details, see [SDK for iOS Reference Guide](../sdks/sdk-ref-ios.md).
