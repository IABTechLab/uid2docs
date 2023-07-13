---
title: Implementing Sharing
description: Learn about how to implement sharing.
hide_table_of_contents: false
sidebar_position: 04
---

# Implementing Sharing

<!-- This page provides information about sharing UID2s: what sharing means, who you can share with, the benefits of sharing, how to set up and manage your sharing permissions, and lots more! Use sharing permissions to expand your reach and help your business to prosper. -->

<!-- It includes the following:

- [Steps to Implement Sharing With an SDK](#steps-to-implement-sharing-with-an-sdk)
- [Steps to Implement Sharing Using Snowflake](#steps-to-implement-sharing-using-snowflake) 
- [Encryption/Decryption Key Refresh Cadence for Sharing (SDK Only)](#encryptiondecryption-key-refresh-cadence-for-sharing-sdk-only) -->

Setting up UID2 sharing requires some steps by each participant:

- The sender, who sends encrypted UID2 tokens to an authorized sharing participant.
- The receiver, an authorized sharing participant who receives the encrypted UID2 tokens and decrypts them.

>NOTE: If you are a publisher, and have no other role, the steps on this page are not applicable to you. Instead, see [Sharing for Publishers](sharing-publishers.md).

## Sharing Steps: Summary

First, all users must set up an account and configure sharing options. See [UID2 Portal Overview](../portal/portal-overview.md).

Then, to implement sharing in your code, choose from the following, depending on the integration option you're using:

- [Steps to Implement Sharing With an SDK](#steps-to-implement-sharing-with-an-sdk)
- [Steps to Implement Sharing Using Snowflake](#steps-to-implement-sharing-using-snowflake)

<!-- The basic steps for sharing UID2 sharing tokens within the ad tech ecosystem are as follows: -->

## Steps to Implement Sharing: Account Setup

In the UID2 Portal, the sender and the receiver must set up their sharing permissions.

The sender only needs to set up sharing permission once for each receiver or participant type. However, if you want to add new sharing permissions or change existing ones, you'll need to go back to adjust your settings.

<!-- For information about sharing options that can help streamline this step, see [share with a participant type](xxx). {GWH_ to add link to portal doc when written.} -->

<!-- In the  UID2 Portal, there are sharing setting options that can help streamline this step. (link to Share with a participant type) -->


<!-- 1. Sender: Do one of the following:

   - Encrypt one or more raw UID2s into UID2 sharing tokens.
   - Encrypt one or more pieces of [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) (email addresses or phone numbers) into UID2 tokens.

1. Sender: Send the data, including UID2 sharing tokens, to the receiver, who must be a sharing participant.
1. Receiver: Receive the data, including UID2 sharing tokens.
1. Receiver: Decrypt the UID2 sharing tokens into raw UID2s and use the raw UID2 data. -->

## Steps to Implement Sharing With an SDK

The following steps are for all sharing participants who are using an SDK&#8212;senders and receivers.

1. Decide which SDK to use, from the following options, and review the examples in the applicable sharing documentation to see what the sharing code might look like.

   | SDK/Integration Tool | Link to Sharing Section |
   | :--- | :--- | 
   | C# / .NET | [UID2 SDK for C# / .NET: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-csharp-dotnet.md#usage-for-uid2-sharers) |
   | C++ | [UID2 SDK for C++: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-cplusplus.md#usage-for-uid2-sharers) |
   | Java | [UID2 SDK for Java: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-java.md#usage-for-uid2-sharers) |
   | Python | [UID2 SDK for Python: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-python.md#usage-for-uid2-sharers) |

2. Integrate the SDK into your code to implement each step, depending on whether your role is sender or receiver. To see code examples for the language you're using, follow the link in the table provided in Step 1.
   1. Both senders and receivers: define the UID2 client.
   
   2. Both senders and receivers: define the token refresh schedule. Recommended refresh interval is hourly. For an example, see [Encryption/Decryption Key Refresh Cadence for Sharing (SDK Only)](#encryptiondecryption-key-refresh-cadence-for-sharing-sdk-only).

   3. Senders, set up encryption.

   4. Receivers, set up decryption.

## Steps to Implement Sharing Using Snowflake

The following steps are for Snowflake users who want to take part in UID2 sharing, either as senders or receivers.

1. Review the examples in [Snowflake Integration Guide: Usage for UID2 Sharers](../guides/snowflake_integration.md#usage-for-uid2-sharers) to see what the sharing code might look like.

2. Integrate the SDK into your code, according to whether your role is sender or receiver. Use the code examples in the documentation referenced in step 1:

   - Senders, set up encryption.

   - Receivers, set up decryption.

## Encryption/Decryption Key Refresh Cadence for Sharing (SDK Only)

If you're using an SDK, defining the token refresh schedule is step 2.

For long/continuously running processes, call the `uid2client.refresh()` function once per hour. This allows the SDK to fetch the latest keys for decryption. When a new sharing permission is enabled, the additional set of encryption keys needed to decrypt the data sent by the sharing sender is returned the next time the sharing receiver calls the `uid2client.refresh()` function. This process is handled by the SDK.

>NOTE: If you're using Snowflake, you don't need to set up the token refresh schedule.

### Decryption Key Refresh Example

This example illustrates how the `uid2client.refresh()` function enables a new sharing permission. In this example, Advertiser ABC wants to send data to Data Provider XYZ.

1. 12:00 pm:

   The sharing permission is not yet enabled.

   Data Provider XYZ calls `uid2client.refresh()`. The decryption key for Advertiser ABC is not returned, so sharing cannot occur.

2. 12:30 pm:

   Advertiser ABC logs in to the UID2 Portal and creates a sharing permission with Data Provider XYZ.

3. 1:00 pm:

   Data Provider XYZ, on an hourly cadence, again calls `uid2client.refresh()`. Because there is a new sharing permission, the key for Advertiser ABC is returned in the response.

   Data Provider XYZ can now decrypt any UID2 token received from Advertiser ABC into a raw UID2.
