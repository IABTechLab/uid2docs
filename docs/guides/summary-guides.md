---
title: UID2 Integration Guides&#8212;Summary
sidebar_label: Summary
pagination_label: UID2 Integration Guides - Summary
description: Summary of all the integration guides available.
hide_table_of_contents: false
sidebar_position: 01
---

# UID2 Integration Guides&#8212;Summary

The following guides provide integration instructions based on the needs and requirements of your organization and its primary role as a publisher, DSP, or data provider/advertiser. As a UID2 participant, you may also integrate via Enterprise Partners that enable engaging with an Open Operator service and hosting of a Private Operator service.

Integrations fall into these categories:

- [Publisher Integrations](#publisher-integrations)
- [Advertiser/Data Provider Integrations](#advertiserdata-provider-integrations)
- [DSP Integrations](#dsp-integrations)
- [Private Operator Service Integrations](#private-operator-service-integrations)

## Publisher Integrations

Publisher integrations fall into the following main categories:

- [Web Integrations](#web-integrations)
- [Mobile](#mobile)
- [Google Ad Manager Integrations](#google-ad-manager-integrations)
- [Prebid Integrations](#prebid-integrations)

### Web Integrations

The following resources are available for publisher web integrations.

| Integration Guide |  Content Description |
| :--- | :--- |
| [UID2 SDK for JavaScript Integration Guide](publisher-client-side.md) | This integration guide for publishers covers standard web integration scenarios that use the UID2 SDK for JavaScript. |
| [Publisher Integration Guide, Server-Only](custom-publisher-integration.md) | This integration guide is for publishers that do not use the UID2 SDK for JavaScript. |

### Mobile

The following resources are available for publishers integrating with Android or iOS devices.

| Integration Guide |  Content Description |
| :--- | :--- |
| [UID2 SDK for Android Reference Guide](../sdks/uid2-sdk-ref-android.md) |An SDK that facilitates the process of establishing client identity using UID2 and retrieving UID2 tokens for publishers that need to support Android apps. |
| [UID2 SDK for iOS Reference Guide](../sdks/uid2-sdk-ref-ios.md) | An SDK that facilitates the process of establishing client identity using UID2 and retrieving UID2 tokens for publishers that need to support iOS apps. |

### Google Ad Manager Integrations

The following resources are available for publishers integrating with Google Ad Manager.

| Integration Guide |  Content Description |
| :--- | :--- |
| [Publisher - Google Ad Manager Secure Signals](google-ss-integration.md) | This integration guide covers the additional steps needed for publishers using UID2 with the Google Ad Manager Secure Signals feature (previously known as Encrypted Signals for Publishers, ESP). |
| [UID2 GMA Plugin for Android Integration Guide](mobile-plugin-gma-android.md) | The UID2 Google Mobile Ads (GMA) Plugin for Android enables publishers that use the [Google Mobile Ads (GMA) SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) to send [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from Android apps. |
| [UID2 GMA Plugin for iOS Integration Guide](mobile-plugin-gma-ios.md) | The UID2 GMA Plugin for iOS enables publishers that use the [Google Mobile Ads (GMA) SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) to send [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from iOS apps. |
| [UID2 IMA Plugin for Android Integration Guide](mobile-plugin-ima-android.md) | The UID2 Interactive Media Ads (IMA) Plugin for Android enables publishers that use the [Google Interactive Media Ads (IMA) SDK for Android](https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side) to send [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from Android apps. |
| [UID2 IMA Plugin for iOS Integration Guide](mobile-plugin-ima-ios.md) | The UID2 IMA Plugin for iOS enables publishers that use the [Google Interactive Media Ads SDK for iOS](https://developers.google.com/interactive-media-ads/docs/sdks/ios/client-side) to send [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from iOS apps. |

### Prebid Integrations

The following resources are available for publishers integrating with Prebid.

| Integration Guide |  Content Description |
| :--- | :--- |
| [Prebid Integration Guide](integration-prebid.md) | An integration guide for publishers who want to directly integrate with UID2 and generate identity tokens to be passed by Prebid in the RTB bid stream. |

## Advertiser/Data Provider Integrations

The following resources are available for advertisers and data providers integrating with UID2.

| Integration Guide |  Content Description |
| :--- | :--- |
| [Advertiser/Data Provider](advertiser-dataprovider-guide.md) | This integration guide for advertisers and data providers covers integration workflows for mapping identity for audience-building and targeting. |
| [Snowflake Integration Guide](snowflake_integration.md) | Instructions for generating UIDs from emails within Snowflake. |

## DSP Integrations

The following resources are available for DSPs integrating with UID2.

| Integration Guide |  Content Description |
| :--- | :--- |
| [DSP](dsp-guide.md) | This integration guide for DSPs covers handling UID2s for bidding and honoring user opt-outs. |

## Private Operator Service Integrations

The following resources are available for Private Operator integrations.
 
| Integration Guide |  Content Description |
| :--- | :--- |
| [UID2 Operator&#8212;AWS Marketplace](operator-guide-aws-marketplace.md) | Instructions for setting up a Private Operator service for AWS Marketplace. |
| [UID2 Private Operator&#8212;Google Cloud Platform Confidential Space](operator-private-gcp-confidential-space.md) | Information for setting up the UID2 Operator Service in [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space), a confidential computing option from [Google Cloud](https://cloud.google.com/docs/overview/) Platform. |
| [UID2 Operator&#8212;Microsoft Azure Confidential Compute Operator Package](operator-guide-azure-enclave.md) | IMPORTANT: This documentation is currently only a proof of concept. For additional guidance, [contact](../getting-started/gs-account-setup.md#contact-info) the UID2 administrator.<br/>Instructions for setting up a Private Operator service for running on Microsoft Azure Confidential Computing platform.  |
