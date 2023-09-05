---
title: DSPs
description: Information summary for demand-side platforms (DSPs).
hide_table_of_contents: false
sidebar_position: 06
use_banner: true
banner_title: UID2 Overview for Demand-Side Platforms (DSPs)
banner_description: Enable data strategies with a more durable identifier.
---

This page provides information about what the Unified ID 2.0 (UID2) framework offers to DSPs, available implementation options, and how to get started. The following sections break down the workflows, integration types, and documentation for DSPs adopting UID2.

## Audience

This page is for DSPs (Demand-Side Platforms). Media-buying platforms can facilitate identity strategies for first-party data activation for advertisers and inventory monetization for publishers with Unified ID 2.0.

## Benefits of UID2 for DSPs

Here are just some of the intended benefits for DSPs using UID2:
- Upgrade identity resolution with an authenticated ID.
- Reduce dependency on third-party cookies.
- Execute omnichannel and cross-device frequency management and suppression.
- Facilitate first-party data activation with a more privacy-conscious standard for ID encryption.
- Aim to develop future-proof models with deterministic data.
- Maintain addressable audience targeting.
- Offer opt-out, with the goal of improving consumer privacy controls.
- More accurately measure campaigns with or without third-party cookies.

## Resources

The following documentation resources are available for DSPs to implement UID2.

| Type| Documentation | Content Description | Audience |
| :--- | :--- | :--- | :--- |
|UID2 SDK for Java | [UID2 SDK for Java (Server-Side) Reference Guide](../sdks/uid2-sdk-ref-java.md) | An SDK for anyone using Java server-side who wants to decrypt UID2 advertising tokens to access the raw UID2.| DSPs |
|UID2 SDK for Python | [UID2 SDK for Python (Server-Side) Reference Guide](../sdks/uid2-sdk-ref-python.md) | An SDK for anyone using Python server-side who wants to decrypt UID2 advertising tokens to access the raw UID2.| DSPs |
|UID2 SDK for C# / .NET | [UID2 SDK for C# / .NET (Server-Side) Reference Guide](../sdks/uid2-sdk-ref-csharp-dotnet.md) | An SDK for anyone using .NET server-side who wants to decrypt UID2 advertising tokens to access the raw UID2.| DSPs |
|UID2 SDK for C++ | [UID2 SDK for C++ (Server-Side) Reference Guide](../sdks/uid2-sdk-ref-cplusplus.md) | An SDK for anyone using C++ server-side who wants to decrypt UID2 advertising tokens to access the raw UID2.| DSPs |
| Integration Guides | [DSP Integration Guide](../guides/dsp-guide.md) | This integration guide for DSPs covers handling UID2s for bidding and honoring user opt-outs. | DSPs |

## Workflow for DSPs

The following diagram shows the UID2 workflow for DSPs.

![DSP Workflow](../workflows/images/UID2BuySIdeDSPWorkflow.jpg)

For details, see [DSP Workflow Overview](../workflows/workflow-overview-buy-side.md).

## Getting Started

To get started, follow these steps:

1. Request access to UID2 by filling out the form on the [Request Access](/request-access) page.
2. Implement a webhook to receive UID2 opt-out. Share the webhook with the UID2 administrator.
3. Confirm that you are receiving the opt-out feed via the webhook.<br/>
    When the webhook is in place, you'll receive your credentials (see [API keys](../getting-started/gs-api-keys.md)).
4. Decide which implementation option you want to use.
5. If you're using an SDK, download the SDK. Refer to the applicable SDK guide.
6. Follow the instructions in the implementation guide for the option you chose.

     NOTE: Be sure to encrypt request messages to UID2. For details, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).
7. (Conditional) If you will be implementing a CRM onboarding solution, request a separate set of credentials for the data provider workflow. See [API keys](../getting-started/gs-api-keys.md).
8. Test.
9. Go live.

## Frequently Asked Questions for DSPs

For a list of FAQs for DSPs, see [FAQs for Demand-Side Platforms (DSPs)](../getting-started/gs-faqs.md#faqs-for-demand-side-platforms-dsps).
