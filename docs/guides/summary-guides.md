---
title: UID2 Integration Guides - Summary
sidebar_label: Summary
pagination_label: UID2 Integration Guides - Summary
description: Summary of all the integration guides available.
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

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
- [Prebid Integrations](#prebid-integrations)
- [Google Ad Manager Integrations](#google-ad-manager-integrations)

### Web Integrations

The following resources are available for publisher web integrations.

:::tip
For a detailed summary of web integration options, see [Web Integration Overview](../guides/integration-options-publisher-web.md).
:::

| Integration Guide | Content Description |
| :--- | :--- |
| [UID2 Integration Overview for Prebid.js](integration-prebid.md) | An overview of options for publishers who want to integrate with UID2 and generate UID2 tokens to be passed by Prebid.js in the RTB bid stream. |
| [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) | An integration guide for publishers who want to integrate with UID2 and want Prebid.js to manage token generation and automatic token refresh as well as passing the tokens into the RTB bid stream. This guide is for publishers who want to request UID2 tokens client-side, which is the easiest implementation approach. |
| [UID2 Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md) | An integration guide for publishers who want to integrate with UID2 and generate identity tokens to be passed by Prebid in the RTB bid stream. This guide is for publishers who are using a private operator or who want to generate tokens server-side. |
| [UID2 Integration Overview for JavaScript](integration-javascript.md) | An overview of options for publishers who want to integrate with UID2 using the JavaScript SDK. |
| [Client-Side Integration Guide for JavaScript](publisher-client-side.md) | A guide for publishers who want to integrate with UID2 using only client-side JavaScript changes, which is the easiest implementation approach.<br/>The UID2 SDK for JavaScript manages token generation and token refresh automatically. |
| [Server-Side Integration Guide for JavaScript](integration-javascript-server-side.md) | This integration guide for publishers covers standard web integration scenarios that use the UID2 SDK for JavaScript and requires the token to be generated on the server side and passed to the publishers' web pages. |
| [Publisher Integration Guide, Server-Only](custom-publisher-integration.md) | This integration guide is for publishers that do not use the UID2 SDK for JavaScript. |
| [Google Ad Manager Secure Signals Integration Guide](google-ss-integration.md) | This integration guide covers the additional steps needed for publishers using UID2 with the Google Ad Manager Secure Signals feature (previously known as Encrypted Signals for Publishers, ESP). |

### Mobile Integrations

The following resources are available for publishers integrating with Android or iOS devices.

| Integration Guide | Content Description |
| :--- | :--- |
| [UID2 SDK for Android Reference Guide](../sdks/uid2-sdk-ref-android.md) |An SDK that facilitates the process of establishing client identity using UID2 and retrieving UID2 tokens for publishers that need to support Android apps. |
| [UID2 SDK for iOS Reference Guide](../sdks/uid2-sdk-ref-ios.md) | An SDK that facilitates the process of establishing client identity using UID2 and retrieving UID2 tokens for publishers that need to support iOS apps. |

### Prebid Integrations

The following resources are available for publisher Prebid integrations.

| Integration Guide | Content Description |
| :--- | :--- |
| [UID2 Integration Overview for Prebid.js](integration-prebid.md) | An overview of options for publishers who want to integrate with UID2 and generate UID2 tokens to be passed by Prebid.js in the RTB bid stream. |
| [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) | An integration guide for publishers who want to integrate with UID2 and want Prebid.js to manage token generation and automatic token refresh as well as passing the tokens into the RTB bid stream. This guide is for publishers who want to request UID2 tokens client-side, which is the easiest implementation approach. |
| [UID2 Server-Side Integration Guide for Prebid.js](../guides/integration-prebid-server-side.md) | An integration guide for publishers who want to integrate with UID2 and generate identity tokens to be passed by Prebid in the RTB bid stream. This guide is for publishers who are using a private operator or who want to generate tokens server-side. |

### Google Ad Manager Integrations

The following resources are available for publishers integrating with Google Ad Manager.

| Integration Guide | Content Description |
| :--- | :--- |
| [Publisher - Google Ad Manager Secure Signals](google-ss-integration.md) | This integration guide covers the additional steps needed for publishers using UID2 with the Google Ad Manager Secure Signals feature (previously known as Encrypted Signals for Publishers, ESP). |
| [UID2 GMA Plugin for Android Integration Guide](mobile-plugin-gma-android.md) | The UID2 Google Mobile Ads (GMA) Plugin for Android enables publishers that use the [Google GMA SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) to send [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from Android apps. |
| [UID2 GMA Plugin for iOS Integration Guide](mobile-plugin-gma-ios.md) | The UID2 Google Mobile Ads (GMA) Plugin for iOS enables publishers that use the [Google GMA SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) to send [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from iOS apps. |
| [UID2 IMA Plugin for Android Integration Guide](mobile-plugin-ima-android.md) | The UID2 Interactive Media Ads (IMA) Plugin for Android enables publishers that use the [Google IMA SDK for Android](https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side) to send [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from Android apps. |
| [UID2 IMA Plugin for iOS Integration Guide](mobile-plugin-ima-ios.md) | The UID2 Interactive Media Ads (IMA) Plugin for iOS enables publishers that use the [Google IMA SDK for iOS](https://developers.google.com/interactive-media-ads/docs/sdks/ios/client-side) to send [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from iOS apps. |

## Advertiser/Data Provider Integrations

The following resources are available for advertisers and data providers integrating with UID2.

| Integration Guide | Content Description |
| :--- | :--- |
| [Advertiser/Data Provider](advertiser-dataprovider-guide.md) | This integration guide for advertisers and data providers covers integration workflows for mapping identity for audience-building and targeting. |
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