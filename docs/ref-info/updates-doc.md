---
title: Documentation Updates
description: Summary of Significant UID2 Documentation Updates
hide_table_of_contents: false
sidebar_position: 06
---

# Documentation Updates

Check out the latest updates to our UID2 documentation resources.

### New: UID2 Credentials Page

21 November 2023

We've replaced the previous **API Keys** page with a new page that includes information about the credentials for those following a server-side implementation strategy.

For details, see [UID2 Credentials](../getting-started/gs-credentials.md).

### New: JavaScript Express Integration Guide

21 November 2023

The JavaScript Express Integration Guide is a completely new document at the existing URL, covering a new, simpler way of using the UID2 SDK for JavaScript for a client-side publisher implementation.

For details, see [JavaScript Express Integration Guide](../guides/publisher-client-side.md).

The content that was in the previous *UID2 SDK for JavaScript Integration Guide*  is now in a supplementary document for publishers who want to implement the JavaScript SDK on the server side: [JavaScript Standard Integration Guide](../guides/integration-javascript-standard.md).

### New: Prebid.js Integration Guide

2 November 2023

The Prebid.js Express Integration Guide is a completely new document at the existing URL, covering a new, simpler way of integrating UID2 with Prebid that does not require any server-side work.

The content that was in the previous version of the Prebid document is now in a supplementary document, *Prebid.js Advanced Integration Guide*, for publishers who are using a private operator or who prefer to implement token generate on the server side.

For details, see:
- [Prebid.js Express Integration Guide](../guides/integration-prebid.md)
- [Prebid.js Advanced Integration Guide](../guides/integration-prebid-advanced.md)

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
-  [JavaScript Standard Integration Guide](../guides/integration-javascript-standard.md)

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

For details, see [UID2 Portal](/docs/category/uid2-portal).

### New: Documentation for UID2 Sharing

3 August 2023

We published the following new and updated documents to support use of the new UID2 sharing feature:

- A set of new pages providing information relating to UID2 sharing, including an overview, use cases, implementation instructions, best practices, and more. See [UID2 Sharing](/docs/category/uid2-sharing).
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

For details, see [Prebid Integration Guide](../guides/integration-prebid.md). -->
