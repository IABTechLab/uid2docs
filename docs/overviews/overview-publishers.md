---
title: Publishers
description: Information summary for publishers.
hide_table_of_contents: false
sidebar_position: 02
use_banner: true
banner_title: UID2 Overview for Publishers
banner_description: Maintain audience targeting in the ever-changing advertising industry for better impression monetization and more relevance.
---

Publishers can benefit from the cross-device presence of Unified ID 2.0 and take advantage of a consistent identity fabric on all of their inventory.

This page includes information about workflows, integration types, and documentation resources for publishers adopting UID2.

## Audience

This page is for the following UID2 participants:

- Publishers with web assets who want to use UID2 to generate identity tokens for the RTB bid stream, while integrating directly with UID2 rather than UID2-enabled single-sign-on or identity providers.
- Any organizations that propagate [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) to the bid stream via SSPs&#8212;for example, identity providers and SSO providers.
<!-- - Data clean rooms. -->

Publishers can choose to integrate with UID2 in a number of different ways:

- By integrating directly with UID2, either by using an SDK or via the UID2 API.
- By using an SSO provider.
- By working with an independent ID provider that manages the UID2 integration on behalf of the publisher.

## Benefits of UID2 for Publishers

Here are just some of the intended benefits of integrating with UID2:
- Addressable audience targeting on desktop, mobile, and CTV with a single identifier.
- Frequency management across devices.
- More relevant content recommendations.
- The ability to provide personalized ad experiences with relevant content.
- The ability to offer opt-out, with the goal of improving consumer privacy controls.

## Resources

The following documentation resources are available for publishers to implement UID2:
- [Web Integration](#web-integration)
- [Mobile and Google GMA/IMA integration](#mobile-and-google-gmaima-integration)
- [Operator Deployment](#operator-deployment)

### Web Integration

The following documentation resources relate to web, Prebid, and Google Ad Manager integration for publishers.

| Integration Type| Documentation | Content Description | Audience |
| :--- | :--- | :--- | :--- |
| Prebid | [Prebid Integration Guide](../guides/integration-prebid.md) | An integration guide for publishers who want to directly integrate with UID2 and generate identity tokens to be passed by Prebid in the RTB bid stream. | Publishers |
| Client-Side (Web) SDK | [UID2 SDK for JavaScript Reference Guide](../sdks/client-side-identity.md) | Client-Side JavaScript SDK that facilitates the process of establishing client identity using UID2 and retrieving advertising tokens for publishers. | Publishers |
| Client-Side (Web) Integration Guide | [UID2 SDK for JavaScript Integration Guide](../guides/publisher-client-side.md) | This integration guide for publishers covers standard web integration scenarios that use the UID2 SDK for JavaScript. | Publishers |
| Server-Side Integration Guide  | [Publisher Integration Guide, Server-Only](../guides/custom-publisher-integration.md) | This integration guide is for publishers that do not use the [UID2 SDK for JavaScript Reference Guide](../sdks/client-side-identity.md). | Publishers |
| Publisher/SSP Integration with GAM | [Publisher - Google Ad Manager Secure Signals](../guides/google-ss-integration.md) | This integration guide covers the additional steps needed for publishers using UID2 with the Google Ad Manager Secure Signals feature (previously known as Encrypted Signals for Publishers, ESP). | Publishers |

### Mobile and Google GMA/IMA integration

The following documentation resources relate to mobile integrations, and Google integration in the context of mobile.

| Integration Type| Documentation | Content Description | Audience |
| :--- | :--- | :--- | :--- |
| Mobile: Android | [UID2 SDK for Android Reference Guide](../sdks/uid2-sdk-ref-android.md) |  This integration guide is for publishers who want to establish client identity using UID2 and retrieve advertising tokens on Android devices. | Publishers |
| Mobile: iOS  | [UID2 SDK for iOS Reference Guide](../sdks/uid2-sdk-ref-ios.md) | This integration guide is for publishers who want to establish client identity using UID2 and retrieve advertising tokens on iOS devices. | Publishers |
| Mobile: GMA for Android | [UID2 GMA Plugin for Android Integration Guide](../guides/mobile-plugin-gma-android.md) | This integration guide enables publishers that use the Google Mobile Ads (GMA) SDK to include UID2 tokens in ad requests from their Android apps. | Publishers |
| Mobile: GMA for iOS | [UID2 GMA Plugin for iOS Integration Guide](../guides/mobile-plugin-gma-ios.md) | This integration guide enables publishers that use the Google Mobile Ads (GMA) SDK to include UID2 tokens in ad requests from their iOS apps. | Publishers |
| Mobile: IMA for Android | [UID2 IMA Plugin for Android Integration Guide](../guides/mobile-plugin-ima-android.md) | This integration guide enables publishers that use the Google Interactive Media Ads (IMA) SDK to include UID2 tokens in ad requests from their Android apps. | Publishers |
| Mobile: IMA for iOS | [UID2 IMA Plugin for iOS Integration Guide](../guides/mobile-plugin-ima-ios.md) | This integration guide enables publishers that use the Google Interactive Media Ads (IMA) SDK to include UID2 tokens in ad requests from their iOS apps. | Publishers |

### Operator Deployment

The following documentation resources relate to private operator environments.

| Integration Type| Documentation | Content Description | Audience |
| :--- | :--- | :--- | :--- |
| Operator | [UID2 Operator - AWS Marketplace Integration Guide](../guides/operator-guide-aws-marketplace.md) | Instructions for setting up a Private Operator service for AWS Marketplace. | Private Operators,<br/>Publishers |
| Operator| [UID2 Operator - Google Cloud Platform Confidential Computing package](../guides/operator-guide-gcp-enclave.md) | Instructions for setting up the Google Cloud Platform Confidential Computing package (GCP). | Private Operators,<br/>Publishers |
| Operator Integration Guide | [UID2 Operator - Microsoft Azure Confidential Compute Operator Package](../guides/operator-guide-azure-enclave.md) | IMPORTANT: This documentation is currently only a proof of concept. For additional guidance, [contact](../getting-started/gs-account-setup.md#contact-info) the UID2 administrator.<br/>Instructions for setting up a Private Operator service for running on Microsoft Azure Confidential Computing platform.  | Private Operators,<br/>Publishers |

## Workflow for Publishers

The following diagram shows the UID2 workflow for publishers.

![Publisher Workflow](../workflows/images/UID2PublisherAndSSPWorkflow.jpg)

For details, see [Publisher Workflow Overview](../workflows/workflow-overview-supply-side.md).

## Getting Started

To get started, follow these steps:

1. Request access to UID2 by filling out the form on the [Request Access](/request-access) page.
1. Identify the properties that you want to integrate with UID2.
1. Sign the UID2 contract.
1. Receive the UID2 authentication keys ([API keys](../getting-started/gs-api-keys.md)).
1. Build your integration to UID2 via an SDK or direct integration with the UID2 APIs, using the applicable documentation.

     NOTE: Be sure to encrypt request messages to UID2. For details, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).
1. Test: 

    Work with SSPs to properly pass UID2s in bid requests.
    
    Confirm that UID2s are being generated and passed correctly in requests.
1. Go live.

## FAQs for Publishers

For a list of frequently asked questions for publishers using the UID2 framework, see [FAQs for Publishers](/docs/getting-started/gs-faqs.md#faqs-for-publishers).
