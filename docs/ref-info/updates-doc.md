---
title: Documentation Updates
description: A summary of significant UID2 documentation updates.
hide_table_of_contents: false
sidebar_position: 06
---

# Documentation Updates

Check out the latest updates to our UID2 documentation resources.

### New: UID2 Hashing Tool

4 March 2024

We've added a new UID2 hashing tool so that you can check that you're normalizing and encoding correctly.

For details, see [UID2 Hashing Tool](../getting-started/gs-normalization-encoding#uid2-hashing-tool) in the *Normalization and Encoding* documentation.

<!-- APIDOCS-1974 -->

### New: Java SDK Support for Advertiser/Data Provider

28 February 2024

The Java SDK now supports Advertisers and Data Providers wanting to use the [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) endpoint.

For details, see the updated documentation in the *UID2 SDK for Java Reference Guide*: [Usage for Advertisers and Data Providers](../sdks/uid2-sdk-ref-java.md#usage-for-advertisers-and-data-providers).

### New: Audience-Specific Documentation Sidebars

9 February 2024

We've improved the website so that specific users clicking through on the links at the top of the [UID2 home page](https://unifiedid.com/) (Publishers, Advertisers, DSPs, Data Providers) now have a custom left sidebar, with the specific documentation that's applicable to that audience.

Anyone wanting to see the full set of docs for all audiences can just click through on the Documentation link on the UID2 home page.

Note that many docs are applicable to multiple audiences, and there are many interlinks between docs, so the sidebar view might change on your journey through the site. You can always get back to your specific view by clicking the link at the top: these links appear on all pages.

To view the custom sidebars, go to [https://unifiedid.com](https://unifiedid.com/) and click on one of the audience links at the top: [Publishers](../overviews/overview-publishers.md). [Advertisers](../overviews/overview-advertisers.md), [DSPs](../overviews/overview-dsps.md), or [Data Providers](../overviews/overview-data-providers.md).

<!-- APIDOCS-1681 -->

### New: UID2 Integration Overview for JavaScript 

26 January 2024

We've added a new overview guide summarizing the options for publishers using the UID2 SDK for JavaScript for client-side or server-side integration. In addition, the existing guides have been renamed for consistency, with minor updates.

For details, see:

- [UID2 Integration Overview for JavaScript](../guides/integration-javascript)
- [Client-Side Integration Guide for JavaScript](../guides/publisher-client-side.md)
- [Server-Side Integration Guide for JavaScript](../guides/integration-javascript-server-side.md)

<!-- APIDOCS-1924 -->

### New: UID2 SDK for Java, Usage for Publishers Sections

22 January 2024

We've added new sections in the UID2 SDK for Java documentation to help publishers implementing the SDK.

For details, see [Usage for Publishers](../sdks/uid2-sdk-ref-java.md#usage-for-publishers) in the UID2 SDK for Java Reference Guide.

<!-- APIDOCS-1705 -->

### New: Normalization and Encoding Documentation, Examples Section

19 January 2024

We've expanded and clarified the existing Normalization and Encoding doc, and added a new examples section to help you make sure that you're following the process correctly.

For details, see [Normalization and Encoding](../getting-started/gs-normalization-encoding.md).

<!-- APIDOCS-1183, APIDOCS-1880 -->

### New: Web Integration Overview for Publishers

16 January 2024

We've added a new page summarizing the web integration options available to publishers integrating with UID2.

For details, see [Web Integration Overview](../guides/integration-options-publisher-web.md).

<!-- APIDOCS-1846 -->

### New: UID2 Operator Page

3 January 2024

We've added a reference article explaining what the UID2 Operator does and the differences between a Public Operator and a Private Operator.

For details, see [The UID2 Operator](../ref-info/ref-operators-public-private.md).

<!-- APIDOCS-1720 -->

<!-- ## 2023 Updates -->

### New: UID2 Integration Overview for Prebid.js

20 December 2023

A new overview guide summarizes the publisher options for integrating Prebid with UID2.

In addition, the existing guides have been restructured and simplified.

For details, see:

- [UID2 Integration Overview for Prebid.js](../guides/integration-prebid.md)
- [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md)
- [UID2 Server-Side Integration Guide for Prebid.js](../guides/integration-prebid-server-side.md)

### New: Encryption/Decryption Examples in Java and C#

14 December 2023

We've added instructions and code examples for encrypting UID2 requests and decrypting responses in additional programming languages. To the existing Python example, we've added Java and C#.

For details, see [Encryption and Decryption Code Examples](../getting-started/gs-encryption-decryption.md#encryption-and-decryption-code-examples).

### New: UID2 Private Operator for Azure Integration Guide

30 November 2023

A UID2 <a href="../intro#participants">participant</a> who wants to be a [Private Operator](../ref-info/glossary-uid.md#gl-private-operator) can now set up the UID2 Operator Service in a [Confidential Container](https://learn.microsoft.com/en-us/azure/confidential-computing/confidential-containers), a confidential computing option from Microsoft Azure.

For details, see [UID2 Private Operator for Azure Integration Guide](../guides/operator-guide-azure-enclave.md).

### New: API Permissions

22 November 2023

A new article in the Getting Started section of the UID2 website provides information about the key UID2 permissions, the types of participants that commonly use them, and the key associated activities.

For details, see [API Permissions](../getting-started/gs-permissions.md).

### New: UID2 Credentials Page

21 November 2023

We've replaced the previous **API Keys** page with a new page that includes information about the credentials for those following a server-side implementation strategy.

For details, see [UID2 Credentials](../getting-started/gs-credentials.md).

### New: Client-Side Integration Guide for JavaScript

21 November 2023

The Client-Side Integration Guide for JavaScript is a completely new document at the existing URL, covering a new, simpler way of using the UID2 SDK for JavaScript for a client-side publisher implementation.

For details, see [Client-Side Integration Guide for JavaScript](../guides/publisher-client-side.md).

The content that was in the previous *UID2 SDK for JavaScript Integration Guide*  is now in a supplementary document for publishers who want to implement the JavaScript SDK on the server side.

:::note
This document was updated in January 2024 to [Client-Side Integration Guide for JavaScript](../guides/publisher-client-side.md), and the JavaScript Standard Integration Guide is now the [Server-Side Integration Guide for JavaScript](../guides/integration-javascript-server-side.md).
:::

### New: UID2 Client-Side Integration Guide for Prebid.js

2 November 2023

The UID2 Client-Side Integration Guide for Prebid.js is a completely new document at the existing URL, covering a new, simpler way of integrating UID2 with Prebid that does not require any server-side work.

The content that was in the previous version of the Prebid document is now in a supplementary document, *Prebid.js Advanced Integration Guide*, for publishers who are using a private operator or who prefer to implement token generate on the server side.

:::note
These documents were further updated in later revisions. Updated links are as follows:
- [UID2 Integration Overview for Prebid.js](../guides/integration-prebid.md)
- [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md)
- [UID2 Server-Side Integration Guide for Prebid.js](../guides/integration-prebid-server-side.md)
:::

### New: Opt-Out

31 October 2023

This new "getting started" topic provides an overview of user opt-out.

For details, see [User Opt-Out](../getting-started/gs-opt-out.md).

### New: AWS Entity Resolution Integration Guide

19 October 2023

This new guide provides information for using [AWS Entity Resolution](https://aws.amazon.com/entity-resolution/), an identity resolution product from Amazon Web Services that allows AWS customers to integrate with the UID2 framework.

This service allows you to map DII (email addresses or phone numbers) to raw UID2s swiftly and securely.

For details, see [AWS Entity Resolution Integration Guide](../guides/integration-aws-entity-resolution.md).

### New: UID2 SDK for JavaScript Version 3 

10 October 2023

Significant documentation updates reflect the enhanced functionality of Version 3 of the UID2 SDK for JavaScript. The new documentation includes a [migration guide](../sdks/client-side-identity#migration-guide) for those upgrading from an earlier version of the SDK.

For details, see:
-  [UID2 SDK for JavaScript Reference Guide](../sdks/client-side-identity.md)
-  [Server-Side Integration Guide for JavaScript](../guides/integration-javascript-server-side.md)

### New: Private Operator Guide for Google Confidential Space 

30 September 2023

This new guide provides information for setting up the UID2 Operator Service in [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space), a confidential computing option from the Google Cloud Platform.

For details, see [UID2 Private Operator for GCP Integration Guide](../guides/operator-private-gcp-confidential-space.md).


### Update: Normalization and Encoding Rules

7 September 2023

We clarified the instructions for normalizing and encoding [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) to create a raw UID2 or UID2 token.

For details, see:

- [Email Address Hash Encoding](../getting-started/gs-normalization-encoding#email-address-hash-encoding)
- [Phone Number Hash Encoding](../getting-started/gs-normalization-encoding#phone-number-hash-encoding)

### New: IMA Mobile Plugin for Android

8 August 2023

A new guide for publishers that provides information about the UID2 Interactive Media Ads (IMA) Plugin for Android. This plugin enables publishers who use the Google IMA SDK for Android to send [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) as secure signals in ad requests from Android apps.

For details, see [UID2 IMA Plugin for Android Integration Guide](../guides/mobile-plugin-ima-android.md).


### New: IMA Mobile Plugin for iOS

8 August 2023

A new guide for publishers that provides information about the UID2 Interactive Media Ads (IMA) Plugin for iOS. This plugin enables publishers who use the Google IMA SDK for iOS to send [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) as secure signals in ad requests from iOS apps.

For details, see [UID2 IMA Plugin for iOS Integration Guide](../guides/mobile-plugin-ima-ios.md).

### New: GMA Mobile Plugin for Android

4 August 2023

A new guide for publishers that provides information about the UID2 Google Mobile Ads (GMA) Plugin for Android. This plugin enables publishers who use the Google GMA SDK to send [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) as secure signals in ad requests from Android apps.

For details, see [UID2 GMA Plugin for Android Integration Guide](../guides/mobile-plugin-gma-android.md).


### New: GMA Mobile Plugin for iOS

4 August 2023

A new guide for publishers that provides information about the UID2 Google Mobile Ads (GMA) Plugin for iOS. This plugin enables publishers who use the Google GMA SDK to send [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) as secure signals in ad requests from iOS apps.

For details, see [UID2 GMA Plugin for iOS Integration Guide](../guides/mobile-plugin-gma-ios.md).

### New: UID2 Website in Japanese

3 August 2023

The entire UID2 website is now available in Japanese as well as English.

For details, use the language drop-down at the top of any site page, or go straight to the [Unified ID 2.0 page in Japanese](https://unifiedid.com/ja/docs/intro).

### New: UID2 Portal Documentation

3 August 2023

We published several new documentation pages to help users navigating the new UID2 Portal user interface, where you can manage your UID2 account.

For details, see [UID2 Portal: Overview](../portal/portal-overview.md).

### New: Documentation for UID2 Sharing

3 August 2023

We published the following new and updated documents to support use of the new UID2 sharing feature:

- A set of new pages providing information relating to UID2 sharing, including an overview, use cases, implementation instructions, best practices, and more. See [UID2 Sharing: Overview](../sharing/sharing-overview.md).
- Updates to the four server-side SDKs to support UID2 sharing:

  - [UID2 SDK for C# / .NET: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-csharp-dotnet.md#usage-for-uid2-sharers)
  - [UID2 SDK for C++: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-cplusplus.md#usage-for-uid2-sharers)
  - [UID2 SDK for Java: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-java.md#usage-for-uid2-sharers)
  - [UID2 SDK for Python: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-python.md#usage-for-uid2-sharers)

- Updates to the Snowflake feature to support UID2 sharing. See [Snowflake Integration Guide: Usage for UID2 Sharers](../guides/snowflake_integration.md#usage-for-uid2-sharers).

### New: Android SDK Guide

3 August 2023

A new guide for publishers that provides information about the UID2 SDK for Android, an SDK that facilitates the process of establishing client identity using UID2 and retrieving UID2 tokens for publishers who need to support Android apps.

For details, see [UID2 SDK for Android Reference Guide](../sdks/uid2-sdk-ref-android.md).

### New: iOS SDK Guide

3 August 2023

A new guide for publishers that provides information about the UID2 SDK for iOS, an SDK that facilitates the process of establishing client identity using UID2 and retrieving UID2 tokens for publishers who need to support iOS apps.

For details, see [UID2 SDK for iOS Reference Guide](../sdks/uid2-sdk-ref-ios.md).

<!-- ### New: Prebid Integration Guide

1 August 2023

A new guide for publishers who want to integrate with UID2 and generate UID2 tokens (advertising tokens) to be passed by Prebid in the RTB bid stream.

For details, see [UID2 Integration Overview for Prebid.js](../guides/integration-prebid.md). [doc name updated]-->
