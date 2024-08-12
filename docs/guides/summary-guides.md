---
title: UID2 Integration Guides - Summary
sidebar_label: Summary
pagination_label: UID2 Integration Guides - Summary
description: Summary of all the integration guides available.
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# UID2 Integration Guides: Summary

The following guides provide integration instructions based on the needs and requirements of your organization and its primary role as a publisher, DSP, or data provider/advertiser. As a UID2 participant, you may also integrate via Enterprise Partners that enable engaging with an Open Operator service and hosting of a Private Operator service.

Integrations fall into these categories:

- [Publisher Integrations](#publisher-integrations)
- [Advertiser/Data Provider Integrations](#advertiserdata-provider-integrations)
- [DSP Integrations](#dsp-integrations)
- [Private Operator Service Integrations](#private-operator-service-integrations)

## Publisher Integrations

Publisher integrations fall into the following main categories:

- [Web Integrations](#web-integrations)
- [Mobile Integrations](#mobile-integrations)
- [CTV Integrations](#ctv-integrations)
- [Prebid Integrations](#prebid-integrations)
- [Google Ad Manager Integrations](#google-ad-manager-integrations)

### Web Integrations

The following resources are available for publisher web integrations.

:::tip
For a detailed summary of web integration options, see [Web Integration Overview](integration-options-publisher-web.md).
:::

| Integration Guide                                                                         | Content Description                                                                                                                                                                                                                                                                                                         |
|:------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [UID2 Integration Overview for Prebid](integration-prebid.md)                             | An overview of options for publishers who want to integrate with UID2 and generate UID2 tokens to be passed by Prebid.js and Prebid Mobile SDK in the RTB <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link>.                                                                                              |
| [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md)     | An integration guide for publishers who want to integrate with UID2 and want Prebid.js to manage token generation and automatic token refresh as well as passing the tokens into the RTB bidstream. This guide is for publishers who want to request UID2 tokens client-side, which is the easiest implementation approach. |
| [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md)   | An integration guide for publishers who want to integrate with UID2 and generate identity tokens to be passed by Prebid.js in the RTB bidstream. This guide is for publishers who are using a private operator or who want to generate tokens server-side.                                                                  |
| [UID2 Integration Overview for JavaScript](integration-javascript.md)                     | An overview of options for publishers who want to integrate with UID2 using the JavaScript SDK.                                                                                                                                                                                                                             |
| [Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md)     | A guide for publishers who want to integrate with UID2 using only client-side JavaScript changes, which is the easiest implementation approach.<br/>The SDK for JavaScript manages token generation and token refresh automatically.                                                                                   |
| [Client-Server Integration Guide for JavaScript](integration-javascript-client-server.md) | This integration guide for publishers covers standard web integration scenarios that use the SDK for JavaScript and requires the token to be generated on the server side and passed to the publishers' web pages.                                                                                                     |
| [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md)          | This integration guide is for publishers that do not use the SDK for JavaScript.                                                                                                                                                                                                                                       |
| [Google Ad Manager Secure Signals Integration Guide](google-ss-integration.md)            | This integration guide covers the additional steps needed for publishers using UID2 with the Google Ad Manager Secure Signals feature (previously known as Encrypted Signals for Publishers, ESP).                                                                                                                          |

### Mobile Integrations

The following resources are available for publishers integrating with Android or iOS devices.

| Integration Type| Documentation | Content Description |
| :--- | :--- | :--- |
| Android/iOS (Overview) | [Mobile Integration Overview for Android and iOS](integration-mobile-overview.md) | An overview of options for mobile app publishers who want to integrate with UID2 using the SDK for Android or the SDK for iOS. |
| Android/iOS, Client-Side Integration | [Client-Side Integration Guide for Mobile](integration-mobile-client-side.md) | An integration guide for mobile app publishers who want to integrate with UID2 with changes only within the mobile app (no server-side changes). |
| Android/iOS, Client-Server Integration | [Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md) | An integration guide for mobile app publishers who want to integrate with UID2 by doing the following:<ol><li>Generating UID2 tokens server-side via either a Public or Private Operator.</li><li>Passing the resulting <Link href="../ref-info/glossary-uid#gl-identity">identities</Link> to a mobile app for passing into the bidstream.</li></ol> |

### CTV Integrations

The following resources are available for publisher integrations supporting CTV.

| Integration Guide | Content Description |
| :--- | :--- |
| [CTV Integration Guide](../guides/integration-ctv-guide.md) | A summary of CTV integration options, with links to additional information and instructions. |

### Prebid Integrations

The following resources are available for publishers integrating with Prebid.

| Integration Guide                                                                       | Content Description                                                                                                                                                                                                                                                                                                         |
|:----------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [UID2 Integration Overview for Prebid](integration-prebid.md)                           | An overview of options for publishers who want to integrate with UID2 and generate UID2 tokens to be passed by Prebid.js or Prebid Mobile SDK in the RTB bidstream.                                                                                                                                                         |
| [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md)   | An integration guide for publishers who want to integrate with UID2 and want Prebid.js to manage token generation and automatic token refresh as well as passing the tokens into the RTB bidstream. This guide is for publishers who want to request UID2 tokens client-side, which is the easiest implementation approach. |
| [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md) | An integration guide for publishers who want to integrate with UID2 and generate identity tokens to be passed by Prebid.js in the RTB bidstream. This guide is for publishers who are using a private operator or who want to generate tokens server-side.                                                                  |
| [UID2 Mobile Integration for Prebid.js](integration-prebid-mobile-summary.md)           | A summary of information resources for UID2 integration with Prebid.js on mobile devices.                                                                                                                                                                                                                                   |

### Google Ad Manager Integrations

The following resources are available for publishers integrating with Google Ad Manager.

| Integration Guide | Content Description |
| :--- | :--- |
| [Publisher - Google Ad Manager Secure Signals](google-ss-integration.md) | This integration guide covers the additional steps needed for publishers using UID2 with the Google Ad Manager Secure Signals feature (previously known as Encrypted Signals for Publishers, ESP). |
| [UID2 GMA Plugin for Android Integration Guide](mobile-plugin-gma-android.md) | The UID2 Google Mobile Ads (GMA) Plugin for Android enables publishers that use the [Google GMA SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) to send <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from Android apps. |
| [UID2 GMA Plugin for iOS Integration Guide](mobile-plugin-gma-ios.md) | The UID2 Google Mobile Ads (GMA) Plugin for iOS enables publishers that use the [Google GMA SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) to send <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from iOS apps. |
| [UID2 IMA Plugin for Android Integration Guide](mobile-plugin-ima-android.md) | The UID2 Interactive Media Ads (IMA) Plugin for Android enables publishers that use the [Google IMA SDK for Android](https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side) to send <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from Android apps. |
| [UID2 IMA Plugin for iOS Integration Guide](mobile-plugin-ima-ios.md) | The UID2 Interactive Media Ads (IMA) Plugin for iOS enables publishers that use the [Google IMA SDK for iOS](https://developers.google.com/interactive-media-ads/docs/sdks/ios/client-side) to send <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from iOS apps. |

## Advertiser/Data Provider Integrations

The following resources are available for advertisers and data providers integrating with UID2.

| Integration Guide | Content Description |
| :--- | :--- |
| [Advertiser/Data Provider](advertiser-dataprovider-guide.md) | This integration guide for advertisers and data providers covers integration workflows for mapping identity for audience-building and targeting. |
| [Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md) | A guide for advertisers and data providers who want to use this SDK for adding a UID2 token to their tracking pixels.<!-- UID2_only: Not applicable for EUID --> |
| [Snowflake Integration Guide](snowflake_integration.md) | Instructions for generating UID2s from emails within Snowflake. |
| [AWS Entity Resolution Integration Guide](integration-aws-entity-resolution.md) | Instructions for integrating with the UID2 framework using AWS Entity Resolution. |

## DSP Integrations

The following resources are available for DSPs integrating with UID2.

| Integration Guide | Content Description |
| :--- | :--- |
| [DSP](dsp-guide.md) | This integration guide for DSPs covers handling UID2s for bidding and honoring user opt-outs. |

## Private Operator Service Integrations

The following resources are available for Private Operator integrations.
 
| Integration Guide | Content Description |
| :--- | :--- |
| [UID2 Private Operator for AWS](operator-guide-aws-marketplace.md) | Instructions for setting up a Private Operator service for AWS Marketplace. |
| [UID2 Private Operator for GCP](operator-private-gcp-confidential-space.md) | Information for setting up the UID2 Operator Service in [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space), a confidential computing option from [Google Cloud](https://cloud.google.com/docs/overview/) Platform. |
| [UID2 Private Operator for Azure](operator-guide-azure-enclave.md) | Instructions for setting up the UID2 Operator Service in a Confidential Container, a confidential computing option from Microsoft Azure. |
