---
title: Documentation Updates
description: A summary of significant UID2 documentation updates.
hide_table_of_contents: false
sidebar_position: 06
---

import Link from '@docusaurus/Link';
import CustomTagsFilters from '@site/src/components/CustomTags/CustomTagsFilters';
import CustomTagsContainer from '@site/src/components/CustomTags/CustomTagsContainer';

# Documentation Updates

<CustomTagsFilters />

Check out the latest updates to our UID2 documentation resources.

:::tip
Use the Tags toolbar to view a subset of documentation updates.
:::

## Q3 2025

The following documents were released in this quarter.

<CustomTagsContainer tags="Guides, SDKs">

### Identity Map V3

July 11, 2025

We've released a new version of the Identity Map API (V3) that provides significant improvements for advertisers and data providers. This update includes documentation for the [API endpoint](../endpoints/post-identity-map.md), the [Java SDK](../sdks/sdk-ref-java.md#usage-for-advertisersdata-providers) and the [integration guide](../guides/integration-advertiser-dataprovider-overview.md).

<!-- UID2-5558, UID2-5560, UID2-5559 -->

</CustomTagsContainer>

## Q1 2025

The following documents were released in this quarter.

<CustomTagsContainer tags="Guides, Private Operator">

### Private Operator for AKS Integration Guide

March 19, 2025

A UID2 <a href="../intro#participants">participant</a> who wants to be a <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link> can now set up the UID2 Operator Service as a Private Operator in an Azure Kubernetes Service (<Link href="../ref-info/glossary-uid#gl-aks">AKS</Link>) cluster, running on [virtual nodes on Azure Container Instances](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-virtual-nodes) (ACI).

For details, see [UID2 Private Operator for AKS Integration Guide](../guides/operator-guide-aks-enclave.md).

<!-- APIDOCS-3030 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Mobile">

### Server-Side Integration Guide for Mobile

March 18, 2025

We've added a guide for mobile app publishers who want to manage the UID2 token entirely on the server side.

For details, see [UID2 Server-Side Integration Guide for Mobile](../guides/integration-mobile-server-side.md).

<!-- APIDOCS-2931 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Portal, Sharing">

### Portal, Sharing Permissions Page

March 11, 2025

We've significantly expanded and clarified the documentation for configuring sharing permissions in the UID2 Portal.

For details, see [Sharing Permissions](../portal/sharing-permissions.md).

<!-- APIDOCS-2795 -->

</CustomTagsContainer>

<CustomTagsContainer tags="SDKs">

### JavaScript SDK Version 4

March 7, 2025

We've added documentation for the recently released update of the UID2 SDK for JavaScript, version 4.

For details, see [SDK for JavaScript Reference Guide](../sdks/sdk-ref-javascript.md).

<!-- APIDOCS-2923 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Reference">

### How the UID2 Token Is Created

March 7, 2025

We've added a page with high-level information about the steps for creating a UID2 token, including steps, roles, and a diagram.

For details, see [How the UID2 Token Is Created](../ref-info/ref-how-uid-is-created.md).

<!-- APIDOCS-2855 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides">

### Snowflake Integration Guide

February 12, 2025

We've significantly updated the UID2 Snowflake integration, and updated the documentation to match.

For details, see [Snowflake Integration Guide](../guides/integration-snowflake.md).

<!-- APIDOCS-2918 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Portal, Reference">

### Instructions for Using the UID2 Portal

February 10, 2025

We've updated the instructions in the UID2 integration guides, SDK docs, and endpoint docs to include information about account setup in the UID2 Portal.

For details, see any implementation guide: for example, [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md#complete-uid2-account-setup-and-configure-account) or [SDK for Android Reference Guide](../sdks/sdk-ref-android.md#api-permissions). 

These changes also clarify the different procedures for getting credentials depending on the environment: see expanded information on the [Credentials](../getting-started/gs-credentials.md) and [Environments](../getting-started/gs-environments.md) pages.

<!-- APIDOCS-2828 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides">

### Advertiser/Data Provider Doc

January 10, 2025

We've significantly expanded and restructured the Advertiser/Data Provider documentation. We now have one significantly updated overview doc, and separate docs for the three main integration options that come into play: Snowflake, AWS Entity Resolution, and HTTP endpoints.

For details, including a summary of all integration options for advertisers and data providers, see [Advertiser/Data Provider Integration Overview](../guides/integration-advertiser-dataprovider-overview.md).

<!-- APIDOCS-1662 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Reference">

### Publisher SSO Integration Page

January 8, 2025

We've added a reference page for publishers who integrate with one or more SSO providers to offer SSO login, and want to retrieve the logged-in user's email address from the SSO provider to generate UID2 tokens.

For details, see [Publisher Integration with SSO Providers](ref-integration-sso-providers.md).

<!-- APIDOCS-2486 -->

</CustomTagsContainer>

<!-- ### Removed:  v1 to v2 upgrade doc

January 3, 2025

We've removed the legacy v1 to v2 upgrade doc, which is no longer needed. -->

<!-- APIDOCS-2859 -->

## Q4 2024

The following documents were released in the fourth quarter of 2024.

<CustomTagsContainer tags="Infrastructure">

### Zoom-In Tool for Images

December 15, 2024

The UID2 docs site now includes a zoom-in tool for images.

Just hover over the image and the tool appears as a magnifying glass, then click to view a magnified version of the image.

<!-- APIDOCS-2237 for both -->

</CustomTagsContainer>

<CustomTagsContainer tags="Portal">

### Portal Audit Trail Page

November 15, 2024

We've added the following page to the UID2 Portal documentation: [Audit Trail](../portal/audit-trail.md).

The **Audit Trail** page in the UID2 Portal allows users who have the Admin role (see [User Roles](../portal/team-members.md#user-roles)) to view a detailed log of all past actions performed by or on behalf of the current <Link href="../ref-info/glossary-uid#gl-sharing-participant">participant</Link>.

<!-- APIDOCSS-2700 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides">

### LiveRamp Integration Tips

November 14, 2024

We've added a reference page with tips for publishers who are using LiveRamp's Authenticated Traffic Solution (ATS) to generate UID2 tokens to be passed in the bid request.

For details, see [LiveRamp Integration Tips](../guides/integration-liveramp-tips.md).

<!-- APIDOCS-2699 -->

</CustomTagsContainer>

## Q3 2024

The following documents were released in the third quarter of 2024.

<CustomTagsContainer tags="Reference">

### Tokens Page

September 10, 2024

We've added a reference page with information about tokens.

For details, see [UID2 Tokens and Refresh Tokens](../ref-info/ref-tokens.md).

<!-- APIDOCS-2533 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Private Operator">

### Private Operator Integration Overview

August 28, 2024

We've added a page with information about Private Operator integrations.

For details, see [UID2 Private Operator Integration Overview](../guides/integration-options-private-operator).

<!-- APIDOCS-2164 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides">

### DSP Direct Integration Instructions

August 22, 2024

We've added a guide for DSPs who are not using UID2 SDKs.

For details, see [DSP Direct Integration Instructions](../guides/integration-dsp-no-sdk.md).

<!-- APIDOCS-2394 -->

</CustomTagsContainer>

<!-- ### UID2 Token Reference Page

August 22, 2024

We've added a reference page with general information about UID2 tokens, including refresh tokens.

For details, see [UID2 Tokens and Refresh Tokens]. -->

<!-- APIDOCS-1958 removed 8/26/22 -->

<CustomTagsContainer tags="Reference">

### Integration Approaches Page

July 23, 2024

We've added a page with information about the different integration approaches: client-side, client-server, and server-side.

For details, see [Integration Approaches](ref-integration-approaches.md).

<!-- APIDOCS-2132 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Reference">

### Server-Side Token Generation Page

July 3, 2024

We've added a reference page with information for publishers generating the UID2 token on the server side.

For details, see [Server-Side Token Generation](ref-server-side-token-generation.md).

<!-- APIDOCS-2255 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Mobile, Prebid.js">

### Integration with Prebid Mobile SDK (Android)

July 2, 2024

We've added a section to the two mobile integration guides with instructions for mobile integration using Prebid, currently for Android only:

- [UID2 Client-Side Integration Guide for Mobile: Prebid Integration](../guides/integration-mobile-client-side#optional-uid2-integration-with-prebid-mobile-sdk)
- [UID2 Client-Server Integration Guide for Mobile: Prebid Integration](../guides/integration-mobile-client-server#optional-uid2-integration-with-prebid-mobile-sdk)

<!-- APIDOCS-2269 -->

</CustomTagsContainer>

## Q2 2024

The following documents were released in the second quarter of 2024.

<CustomTagsContainer tags="CTV, Guides">

### CTV Integration Guide

June 21, 2024

We've just added a guide for CTV publishers who want to integrate with UID2.

For details, see [CTV Integration Guide](../guides/integration-ctv-guide.md).

<!-- APIDOCS-2264 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Opt-Out">

### Opt-Out API

May 24, 2024

We added documentation for a new API call that checks the opt-out status of raw UID2s.

Given a list of raw UID2s, this endpoint returns the raw UID2s that have opted out, as well as the time that the opt-out took place.

For details, see [POST&nbsp;/optout/status](../endpoints/post-optout-status.md).

<!-- APIDOCS-1739 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Mobile, SDKs">

### Client-Side and Server-Side Guides for Mobile

May 17, 2024

We've added the following integration guides to support publishers who want to implement UID2 for their Android or iOS mobile apps:

- [UID2 Mobile Integration Overview for Android and iOS](../guides/integration-mobile-overview)
- [UID2 Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side)
- [UID2 Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server)

<!-- APIDOCS-1903-->

</CustomTagsContainer>

<CustomTagsContainer tags="Portal">

### Portal Client-Side Integration Page

May 6, 2024

We've added the following page to the UID2 Portal documentation: [Client-Side Integration](../portal/client-side-integration.md).

The **Client-Side Integration** page in the UID2 Portal allows you to set up and manage the values that are needed if you are generating UID2 tokens on the client side, such as specifying your domains.

<!-- APIDOCS-2120 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Portal">

### Portal API Keys Page

April 25, 2024

The UID2 Portal documentation now includes a new page, [API Keys](../portal/api-keys.md).

The API Keys page in the UID2 Portal allows you to perform all activities relating to managing API keys, and their associated secret values and permission settings, for your UID2 account.

<!-- APIDOCS-2133 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Sharing">

### Documentation for UID2 Sharing

April 22, 2024

We've completely reworked and significantly expanded the sharing documentation to include instructions for all sharing scenarios.

The documentation now supports additional sharing scenarios, including the ability to share raw UID2s when senders and receivers follow the applicable legal, security, and technical requirements.

For details, see [UID2 Sharing: Overview](../sharing/sharing-overview.md).

<!-- APIDOCS-2134 -->

</CustomTagsContainer>

## Q1 2024

The following documents were released in the first quarter of 2024.

<CustomTagsContainer tags="Reference">

### UID2 Hashing Tool

March 4, 2024

We've added a UID2 hashing tool so that you can check that you're normalizing and encoding correctly.

For details, see [UID2 Hashing Tool](../getting-started/gs-normalization-encoding#uid2-hashing-tool) in the *Normalization and Encoding* documentation.

<!-- APIDOCS-1974 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, SDKs">

### Java SDK Support, Advertiser/Data Provider

February 28, 2024

The Java SDK now supports Advertisers and Data Providers wanting to use the [POST&nbsp;/identity/map (v2)](../endpoints/post-identity-map-v2.md) endpoint.

For details, see the updated documentation in the *SDK for Java Reference Guide*: [Usage for Advertisers and Data Providers](../sdks/sdk-ref-java.md#usage-for-advertisersdata-providers).

<!-- UID2-2759 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Infrastructure">

### Audience-Specific Sidebars

February 9, 2024

We've improved the website so that specific users clicking through on the links at the top of the [UID2 home page](https://unifiedid.com/) (Publishers, Advertisers, DSPs, Data Providers) now have a custom left sidebar, with the specific documentation that's applicable to that audience.

Anyone wanting to see the full set of docs for all audiences can just click through on the Documentation link on the UID2 home page.

Note that many docs are applicable to multiple audiences, and there are many interlinks between docs, so the sidebar view might change on your journey through the site. You can always get back to your specific view by clicking the link at the top: these links appear on all pages.

To view the custom sidebars, go to [https://unifiedid.com](https://unifiedid.com/) and click on one of the audience links at the top: [Publishers](../overviews/overview-publishers.md). [Advertisers](../overviews/overview-advertisers.md), [DSPs](../overviews/overview-dsps.md), or [Data Providers](../overviews/overview-data-providers.md).

<!-- APIDOCS-1681 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, SDKs">

### Integration Overview for JavaScript

January 26, 2024

We've added an overview guide summarizing the options for publishers using the SDK for JavaScript for client-side or client-server integration. In addition, the existing guides have been renamed for consistency, with minor updates.

For details, see:

- [UID2 Integration Overview for JavaScript](../guides/integration-javascript)
- [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md)
- [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md)

<!-- APIDOCS-1924 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, SDKs">

### SDK for Java, Publisher Sections

January 22, 2024

We've added sections in the SDK for Java documentation to help publishers implementing the SDK.

For details, see [Usage for Publishers](../sdks/sdk-ref-java.md#usage-for-publishers) in the SDK for Java Reference Guide.

<!-- APIDOCS-1705 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Reference">

### Normalization and Encoding Examples

January 19, 2024

We've expanded and clarified the existing Normalization and Encoding doc, and added an examples section to help you make sure that you're following the process correctly.

For details, see [Normalization and Encoding](../getting-started/gs-normalization-encoding.md).

<!-- APIDOCS-1183, APIDOCS-1880 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides">

### Web Integration Overview for Publishers

January 16, 2024

We've added a page summarizing the web integration options available to publishers integrating with UID2.

For details, see [Publisher Web Integration Overview](../guides/integration-options-publisher-web.md).

<!-- APIDOCS-1846 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Private Operator, Reference">

### UID2 Operator Page

January 3, 2024

We've added a reference page explaining what the UID2 Operator does and the differences between a Public Operator and a Private Operator.

For details, see [The UID2 Operator](../ref-info/ref-operators-public-private.md).

<!-- APIDOCS-1720 -->

</CustomTagsContainer>

## Q4 2023

The following documents were released in the fourth quarter of 2023.

<CustomTagsContainer tags="Guides, Prebid.js">

### Integration Overview for Prebid

December 20, 2023

We've added an overview guide that summarizes the publisher options for integrating Prebid with UID2.

In addition, the existing guides have been restructured and simplified.

For details, see:

- [UID2 Integration Overview for Prebid](../guides/integration-prebid.md)
- [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md)
- [UID2 Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-client-server.md)

</CustomTagsContainer>

<CustomTagsContainer tags="Reference">

### Encrypt/Decrypt Examples, Java and C#

December 14, 2023

We've added instructions and code examples for encrypting UID2 requests and decrypting responses in additional programming languages. To the existing Python example, we've added Java and C#.

For details, see [Encryption and Decryption Code Examples](../getting-started/gs-encryption-decryption.md#encryption-and-decryption-code-examples).

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Private Operator">

### Private Operator for Azure Integration Guide

November 30, 2023

A UID2 <a href="../overviews/participants-overview">participant</a> who wants to be a [Private Operator](../ref-info/glossary-uid.md#gl-private-operator) can now set up the UID2 Operator Service in an instance of [Confidential Containers](https://learn.microsoft.com/en-us/azure/confidential-computing/confidential-containers), a confidential computing option from Microsoft Azure.

For details, see [UID2 Private Operator for Azure Integration Guide](../guides/operator-guide-azure-enclave.md).

</CustomTagsContainer>

<CustomTagsContainer tags="Reference">

### API Permissions

November 22, 2023

We've added an article in the Getting Started section of the UID2 website that provides information about the key UID2 permissions, the types of participants that commonly use them, and the key associated activities.

For details, see [API Permissions](../getting-started/gs-permissions.md).

</CustomTagsContainer>

<CustomTagsContainer tags="Reference">

### UID2 Credentials Page

November 21, 2023

We've replaced the previous **API Keys** page with a page that includes information about the credentials for those following a server-side implementation strategy.

For details, see [UID2 Credentials](../getting-started/gs-credentials.md).

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, SDKs">

### Client-Side Integration Guide for JS

November 21, 2023

The Client-Side Integration Guide for JavaScript is a completely new document at the existing URL, covering a way of using the SDK for JavaScript for a client-side publisher implementation.

For details, see [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md).

The content that was in the previous *SDK for JavaScript Integration Guide*  is now in a supplementary document for publishers who want to implement the JavaScript SDK on the server side.

:::note
This document was updated in January 2024 to [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md), and the JavaScript Standard Integration Guide is now the [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md).
:::

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Prebid.js">

### Client-Side Integration Guide for Prebid.js

November 2, 2023

The UID2 Client-Side Integration Guide for Prebid.js is a completely new document at the existing URL, covering a way of integrating UID2 with Prebid that does not require any server-side work.

The content that was in the previous version of the Prebid document is now in a supplementary document, *Prebid.js Advanced Integration Guide*, for publishers who are using a Private Operator or who prefer to implement token generate on the server side.

:::note
These documents were further updated in later revisions. Updated links are as follows:
- [UID2 Integration Overview for Prebid](../guides/integration-prebid.md)
- [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md)
- [UID2 Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-client-server.md)
:::

</CustomTagsContainer>

<CustomTagsContainer tags="Opt-Out, Reference">

### Opt-Out Page

October 31, 2023

This reference topic provides an overview of user opt-out.

For details, see [User Opt-Out](../getting-started/gs-opt-out.md).

</CustomTagsContainer>

<CustomTagsContainer tags="Guides">

### AWS Entity Resolution Integration Guide

October 19, 2023

This guide provides information for using [AWS Entity Resolution](https://aws.amazon.com/entity-resolution/), an identity resolution product from Amazon Web Services that allows AWS customers to integrate with the UID2 framework.

This service allows you to map DII (email addresses or phone numbers) to raw UID2s swiftly and securely.

For details, see [AWS Entity Resolution Integration Guide](../guides/integration-aws-entity-resolution.md).

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, SDKs">

### SDK for JavaScript Version 3 

October 10, 2023

Significant documentation updates reflect the enhanced functionality of Version 3 of the SDK for JavaScript. The new documentation includes a [migration guide](../sdks/sdk-ref-javascript#migration-guide) for those upgrading from an earlier version of the SDK.

For details, see:
-  [SDK for JavaScript Reference Guide](../sdks/sdk-ref-javascript.md)
-  [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md)

</CustomTagsContainer>

## Q3 2023

The following documents were released in the third quarter of 2023.

<CustomTagsContainer tags="Guides, Private Operator">

### Private Operator Guide for Google Confidential Space 

September 30, 2023

This guide provides information for setting up the UID2 Operator Service in [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space), a confidential computing option from the Google Cloud Platform.

For details, see [UID2 Private Operator for GCP Integration Guide](../guides/operator-private-gcp-confidential-space.md).

<!-- APIDOCS-1655 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Reference">

### Normalization and Encoding Rules

September 7, 2023

We clarified the instructions for normalizing and encoding <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> to create a raw UID2 or UID2 token.

For details, see:

- [Email Address Hash Encoding](../getting-started/gs-normalization-encoding#email-address-hash-encoding)
- [Phone Number Hash Encoding](../getting-started/gs-normalization-encoding#phone-number-hash-encoding)

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Mobile, SDKs">

### IMA Mobile Plugin for Android

August 8, 2023

A guide for publishers that provides information about the UID2 Interactive Media Ads (IMA) Plugin for Android. This plugin enables publishers who use the Google IMA SDK for Android to send <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> as secure signals in ad requests from Android apps.

For details, see [UID2 IMA Plugin for Android Integration Guide](../guides/mobile-plugin-ima-android.md).

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Mobile, SDKs">

### IMA Mobile Plugin for iOS

August 8, 2023

A guide for publishers that provides information about the UID2 Interactive Media Ads (IMA) Plugin for iOS. This plugin enables publishers who use the Google IMA SDK for iOS to send <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> as secure signals in ad requests from iOS apps.

For details, see [UID2 IMA Plugin for iOS Integration Guide](../guides/mobile-plugin-ima-ios.md).

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Mobile, SDKs">

### GMA Mobile Plugin for Android

August 4, 2023

A guide for publishers that provides information about the UID2 Google Mobile Ads (GMA) Plugin for Android. This plugin enables publishers who use the Google GMA SDK to send <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> as secure signals in ad requests from Android apps.

For details, see [UID2 GMA Plugin for Android Integration Guide](../guides/mobile-plugin-gma-android.md).

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Mobile, SDKs">

### GMA Mobile Plugin for iOS

August 4, 2023

A guide for publishers that provides information about the UID2 Google Mobile Ads (GMA) Plugin for iOS. This plugin enables publishers who use the Google GMA SDK to send <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> as secure signals in ad requests from iOS apps.

For details, see [UID2 GMA Plugin for iOS Integration Guide](../guides/mobile-plugin-gma-ios.md).

</CustomTagsContainer>

<CustomTagsContainer tags="Infrastructure">

### UID2 Website in Japanese

August 3, 2023

The entire UID2 website is now available in Japanese as well as English.

For details, use the language drop-down at the top of any site page, or go straight to the [Unified ID 2.0 page in Japanese](https://unifiedid.com/ja/docs/intro).

</CustomTagsContainer>

<CustomTagsContainer tags="Portal">

### Portal Documentation

August 3, 2023

We published several documentation pages to help users navigating the UID2 Portal user interface, where you can manage your UID2 account.

For details, see [UID2 Portal: Overview](../portal/portal-overview.md).

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Sharing, SDKs">

### Documentation for UID2 Sharing

August 3, 2023

We published the following new and updated documents to support use of the UID2 Sharing feature:

- A set of pages providing information relating to UID2 sharing, including an overview, use cases, implementation instructions, best practices, and more. See [UID2 Sharing: Overview](../sharing/sharing-overview.md).
- Updates to the four server-side SDKs to support UID2 sharing:

  - [SDK for C# / .NET: Usage for UID2 Sharers](../sdks/sdk-ref-csharp-dotnet.md#usage-for-uid2-sharers)
  - [SDK for C++: Usage for UID2 Sharers](../sdks/sdk-ref-cplusplus.md#usage-for-uid2-sharers)
  - [SDK for Java: Usage for UID2 Sharers](../sdks/sdk-ref-java.md#usage-for-uid2-sharers)
  - [SDK for Python: Usage for UID2 Sharers](../sdks/sdk-ref-python.md#usage-for-uid2-sharers)

- Updates to the Snowflake feature to support UID2 sharing. See [Snowflake Integration Guide: Usage for UID2 Sharers](../guides/integration-snowflake.md#usage-for-uid2-sharers).

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Mobile, SDKs">

### Android SDK Guide

August 3, 2023

A guide for publishers that provides information about the SDK for Android, an SDK that facilitates the process of establishing client identity using UID2 and retrieving UID2 tokens for publishers who need to support Android apps.

For details, see [SDK for Android Reference Guide](../sdks/sdk-ref-android.md).

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Mobile, SDKs">

### iOS SDK Guide

August 3, 2023

A guide for publishers that provides information about the SDK for iOS, an SDK that facilitates the process of establishing client identity using UID2 and retrieving UID2 tokens for publishers who need to support iOS apps.

For details, see [SDK for iOS Reference Guide](../sdks/sdk-ref-ios.md).

</CustomTagsContainer>

<!-- UID2 website launched 12 April 2023 -->
