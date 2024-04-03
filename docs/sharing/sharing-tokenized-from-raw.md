---
title: Tokenized Sharing from Raw UID2s
description: Learn about sharing UID2 tokens created by encrypting raw UID2s.
hide_table_of_contents: false
sidebar_position: 08
---

# Tokenized Sharing from Raw UID2s

In some cases, sharing participants might have raw UID2s and want to encrypt them before sending to another sharing participant. One example is for advertisers sharing UID2s in creative pixels.

In this file:
- [Audience](#audience)
- [Overview](#overview)
- [Tokenized Sharing Steps: Summary](#tokenized-sharing-steps-summary)
- [Implementing Sharing Encryption/Decryption with an SDK](#implementing-sharing-encryptiondecryption-with-an-sdk)
  - [Encryption/Decryption Key Refresh Cadence for Sharing (SDK Only)](#encryptiondecryption-key-refresh-cadence-for-sharing-sdk-only)
  - [Decryption Key Refresh Example](#decryption-key-refresh-example)
- [Implementing Sharing Encryption/Decryption Using Snowflake](#implementing-sharing-encryptiondecryption-using-snowflake)
- [Information for Sharing Receivers](#information-for-sharing-receivers)

### Audience

Tokenized sharing from raw UID2s could be applicable to any sharing participant, depending on the use case.

## Overview

To share raw UID2s with another participant by encrypting into UID2 tokens before sending, the sharing **sender** must create a UID2 Portal account and implement sharing, and must create a sharing relationship with the receiver.

The sharing **receiver** must create a UID2 Portal account and implement sharing, and must have a sharing relationship with the sender, so that the receiver has the encryption keys necessary to decrypt the UID2 tokens into raw UID2s.

## Tokenized Sharing Steps: Summary

At a very high level, the following are the steps to set up and configure tokenized sharing from raw UID2s:

1. All users must set up an account and configure sharing options. See [Tokenized Sharing Overview: Account Setup in the UID2 Portal](sharing-tokenized-overview.md#account-setup-in-the-uid2-portal).

2. To implement sharing in your code, choose from the following, depending on the integration option you're using:

   - [Implementing Sharing Encryption/Decryption with an SDK](#implementing-sharing-encryptiondecryption-with-an-sdk)
   - [Implementing Sharing Encryption/Decryption Using Snowflake](#implementing-sharing-encryptiondecryption-using-snowflake)

## Implementing Sharing Encryption/Decryption with an SDK

The following steps are for all sharing participants who are using an SDK to encrypt raw UID2s into UID2 tokens or decrypt back to raw UID2s&#8212;senders and receivers.

1. Decide which SDK to use, from the following options, and review the examples in the applicable sharing documentation to see what the sharing code might look like.

   | SDK/Integration Tool | Link to Sharing Section |
   | :--- | :--- | 
   | C# / .NET | [UID2 SDK for C# / .NET: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-csharp-dotnet.md#usage-for-uid2-sharers) |
   | C++ | [UID2 SDK for C++: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-cplusplus.md#usage-for-uid2-sharers) |
   | Java | [UID2 SDK for Java: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-java.md#usage-for-uid2-sharers) |
   | Python | [UID2 SDK for Python: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-python.md#usage-for-uid2-sharers) |

2. Integrate the SDK into your code to implement each step, depending on whether your role is sender or receiver. To see code examples for the language you're using, follow the link in the table provided in Step 1.
   1. Both senders and receivers: define the UID2 client.
   
   2. Both senders and receivers: define the schedule for refreshing encryption keys.
   
      Recommended refresh interval is hourly. For an example, see [Encryption/Decryption Key Refresh Cadence for Sharing (SDK Only)](#encryptiondecryption-key-refresh-cadence-for-sharing-sdk-only).

   3. Senders, set up encryption.

   4. Receivers, set up decryption.

### Encryption/Decryption Key Refresh Cadence for Sharing (SDK Only)

If you're using an SDK, defining the schedule for refreshing the sharing keys is part of step 2.

For long/continuously running processes, we recommend calling the `uid2client.refresh()` function once per hour. However, you can choose another refresh cadence if you prefer.

Calling this function regularly allows the SDK to fetch the latest keys for decryption. When a new sharing permission is enabled, the additional set of encryption keys needed to decrypt the data sent by the new sharing sender is returned the next time the sharing receiver calls the `uid2client.refresh()` function. This process is managed by the SDK.

:::note
If you're using Snowflake, you don't need to do this step. The Snowflake UID2 integration takes care of refreshing the keys.
:::

### Decryption Key Refresh Example

This example illustrates how the `uid2client.refresh()` function enables a new sharing permission. In this example, Advertiser ABC wants to send data to Data Provider XYZ.

| Time | Event |
| :--- | :--- | 
| 12:00 pm | The sharing permission is not yet enabled.<br/>Data Provider XYZ calls `uid2client.refresh()`. The decryption key for Advertiser ABC is not returned, so Data Provider XYZ cannot decrypt the UID2 tokens. |
| 12:30 pm | Advertiser ABC logs in to the UID2 Portal and creates a sharing permission with Data Provider XYZ. |
| 1:00 pm | Data Provider XYZ, on an hourly cadence, again calls `uid2client.refresh()`. Because there is a new sharing permission, the key for Advertiser ABC is returned in the response.<br/>Data Provider XYZ can now decrypt any UID2 token received from Advertiser ABC into a raw UID2. |

## Implementing Sharing Encryption/Decryption Using Snowflake

The following steps are for Snowflake users who want to take part in UID2 sharing, either as senders or receivers.

1. Review the examples in the Snowflake Integration Guide, [Usage for UID2 Sharers](../guides/snowflake_integration.md#usage-for-uid2-sharers) section, to see what the sharing code might look like.

2. Integrate the SDK into your code, according to whether your role is sender or receiver. Use the code examples in the documentation referenced in the Snowflake Integration Guide, [UID2 Sharing Example](../guides/snowflake_integration.md#uid2-sharing-example):

   - Senders, set up encryption.

   - Receivers, set up decryption.

## Information for Sharing Receivers

To be able to decrypt a UID2 token into a raw UID2, you must be an authorized sharing receiver and have the sender's decryption keys. The sender must also create a sharing relationship with you.

For details, see [Sharing Overview: Receiving UID2 Tokens from Another Sharing Participant](sharing-tokenized-overview.md#receiving-uid2-tokens-from-another-sharing-participant).