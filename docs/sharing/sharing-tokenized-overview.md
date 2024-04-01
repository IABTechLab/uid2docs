---
title: Tokenized Sharing Overview
description: Learn about tokenized sharing.
hide_table_of_contents: false
sidebar_position: 04
---

# Tokenized Sharing Overview

In UID2, tokenized sharing means sharing UID2 tokens with authorized sharing participants. The tokens might be either encrypted raw UID2s, or tokens generated directly from DII.

Tokenized sharing is required for sharing in the bid stream or via pixels, but you can use it in any sharing use case.

In this file:
- [Tokenized Sharing Steps: Summary](#tokenized-sharing-steps-summary)
- [Account Setup in the UID2 Portal](#account-setup-in-the-uid2-portal)
- [Sending UID2s to Another Sharing Participant](#sending-uid2s-to-another-sharing-participant)
- [Implementing Sharing Encryption/Decryption with an SDK](#implementing-sharing-encryptiondecryption-with-an-sdk)
  - [Encryption/Decryption Key Refresh Cadence for Sharing (SDK Only)](#encryptiondecryption-key-refresh-cadence-for-sharing-sdk-only)
  - [Decryption Key Refresh Example](#decryption-key-refresh-example)
- [Implementing Sharing Encryption/Decryption Using Snowflake](#implementing-sharing-encryptiondecryption-using-snowflake)
- [Information for Tokenized Sharing Receivers](#information-for-tokenized-sharing-receivers)
- [Workflow: Tokenized Sharing Outside the Bid Stream](#workflow-tokenized-sharing-outside-the-bid-stream)
- [Tokenized Sharing Examples](#tokenized-sharing-examples)
  - [Tokenized Sharing: Starting with DII](#tokenized-sharing-starting-with-dii)
  - [Example: DII to UID2 Token](#example-dii-to-uid2-token)
  - [Tokenized Sharing: Starting with a Raw UID2](#tokenized-sharing-starting-with-a-raw-uid2)
  - [Example: Raw UID2 to UID2 Token](#example-raw-uid2-to-uid2-token)
- [UID2 Token Pass-Through](#uid2-token-pass-through)

In many scenarios, UID2 data is shared in the form of a [UID2 token](../ref-info/glossary-uid.md#gl-uid2-token). Key use cases are shown in the following table.

| Scenario | Who? | Sharing Approach |
| :--- | :--- | :--- |
| Sending a UID2 to the bid stream | Publisher | See [Tokenized Sharing in the Bid Stream](sharing-tokenized-from-data-bid-stream.md) |
| Sending a UID2 in a tracking pixel | Advertiser | See [Tokenized Sharing in Pixels](sharing-tokenized-from-data-pixel.md) |
| Sending UID2s to another sharing participant | Any sharing participant, if all security requirements listed in [Security Requirements for UID2 Sharing](sharing-overview.md#security-requirements-for-uid2-sharing) cannot be followed, or for any other reason. | See [Tokenized Sharing from Raw UID2s](sharing-tokenized-from-raw.md) | 

(**GWH_KL Do you think we should add Sender/Receiver columns rather than Who (previously Audience)? If so, please specify receiver for each?**)

Setting up tokenized sharing to encrypt raw UID2s requires some steps by each participant:

- The **sender**, who encrypts raw UID2s into UID2 sharing tokens and sends them to an authorized sharing participant.
- The **receiver**, an authorized sharing participant who receives the UID2 sharing tokens and decrypts them.

>NOTE: If you are a publisher who is sharing UID2 tokens in the bid stream, see [Tokenized Sharing in the Bid Stream](sharing-tokenized-from-data-bid-stream.md).

## Tokenized Sharing Steps: Summary

These steps are applicable to:

- **Senders** for all tokenized sharing use cases except publishers sharing UID2 tokens to the bid stream.
- **Receivers** for all tokenized sharing use cases.

At a very high level, the following are the steps to set up and configure sharing:

1. All users must set up an account and configure sharing options. See [Account Setup in the UID2 Portal](#account-setup-in-the-uid2-portal).

2. To implement sharing in your code, choose from the following, depending on the integration option you're using:

   - [Implementing Sharing Encryption/Decryption with an SDK](#implementing-sharing-encryptiondecryption-with-an-sdk)
   - [Implementing Sharing Encryption/Decryption Using Snowflake](#implementing-sharing-encryptiondecryption-using-snowflake)

## Account Setup in the UID2 Portal

For all tokenized sharing instances except sharing in the bid stream, the sender and the receiver must set up an account in the UID2 Portal, and the sender must configure sharing permissions.

For sharing in the bid stream, the sender does not need a UID2 Portal account, but the receiver does. [**GWH_KL please verify this new info**}

The sender only needs to set up sharing permission once for each receiver or participant type. However, if you want to add new sharing permissions or change existing ones, you'll need to go back to adjust your settings.

For details, see [UID2 Portal: Overview](../portal/portal-overview.md) and follow the links for each task.
  
## Sending UID2s to Another Sharing Participant

You can also send UID2 tokens to another authorized sharing participant. Sharing UID2s via UID2 tokens is an option in any sharing scenario:
- If you're starting with DII: Follow the directions in one of the following, depending on your scenario:
  - [Tokenized Sharing in the Bid Stream](sharing-tokenized-from-data-bid-stream.md)
  - [Tokenized Sharing in Pixels](sharing-tokenized-from-data-pixel.md)
- If you're starting with a raw UID2, follow the directions in [Tokenized Sharing from Raw UID2s](sharing-tokenized-from-raw.md).

(**GWH_KL you said put it in tokenized sharing overview and you'll decide if it should go in the overall sharing overview. My vote is just keep it here.**)

## Implementing Sharing Encryption/Decryption with an SDK

The following steps are for all sharing participants who are using an SDK to encrypt/decrypt raw UID2s&#8212;senders and receivers.

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

For long/continuously running processes, call the `uid2client.refresh()` function once per hour. This allows the SDK to fetch the latest keys for decryption. When a new sharing permission is enabled, the additional set of encryption keys needed to decrypt the data sent by the new sharing sender is returned the next time the sharing receiver calls the `uid2client.refresh()` function. This process is handled by the SDK.

>NOTE: If you're using Snowflake, you don't need to do this step. The Snowflake UID2 integration takes care of refreshing the keys.

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

## Information for Tokenized Sharing Receivers

In all tokenized sharing scenarios, the receiver must decrypt the UID2 token to arrive at the raw UID2.

To be able to decrypt a UID2 token into a raw UID2, you must be an authorized sharing receiver and have the sender's decryption keys. To meet these requirements:

1. Create an account in the UID2 Portal. For details, see [UID2 Portal: Overview](../portal/portal-overview.md) and follow the links for each task.

2. In the UID2 Portal, set up a sharing relationship with the sender. (**GWH_KL not sure this is correct. Can the receiver set up the relationship? If not, what do they do?**)

3. Implement sharing in your code, using one of the following integration options, and set up decryption:

   - [Implementing Sharing Encryption/Decryption with an SDK](sharing-tokenized-from-raw.md#implementing-sharing-encryptiondecryption-with-an-sdk)
   - [Implementing Sharing Encryption/Decryption Using Snowflake](sharing-tokenized-from-raw.md#implementing-sharing-encryptiondecryption-using-snowflake)

     This gives you access to decryption keys for all instances where the sender has created a sharing relationship with you.

       :::note
       By default, for publishers sending UID2 tokens to the bid stream, the publisher's decryption keys are shared with all authorized DSPs. However, if the publisher sending the UID2 token has set up specific sharing relationships, you'll only receive that publisher's decryption keys if the publisher has created a sharing relationship with you. In all other tokenized sharing scenarios, a sharing relationship is required.
      :::

## Workflow: Tokenized Sharing Outside the Bid Stream

Sharing of UID2 data securely from one UID2 participant to another, if messaging is not secure per [Security Requirements for Raw UID2 Sharing](#security-requirements-for-raw-uid2-sharing), includes encrypting raw UID2s into UID2 tokens that the receiver can decrypt using your encryption keys. To do this, you must use one of the UID2 server-side SDKs or the UID2 Snowflake integration. The only exception, for senders, is publishers sending UID2 tokens to the bid stream. All receivers must follow these steps.

The workflow for UID2 tokenized sharing, for all sharers except when sharing UID2 tokens in the bid stream, consists of the following steps:

1. Sender and receiver: Integrate with UID2 sharing, using one of the following:

   - SDK for sharing: see [Implementing Sharing Encryption/Decryption with an SDK](sharing-tokenized-overview.md#implementing-sharing-encryptiondecryption-with-an-sdk).
   - Snowflake integration for sharing: see [Implementing Sharing Encryption/Decryption Using Snowflake](sharing-tokenized-overview.md#implementing-sharing-encryptiondecryption-using-snowflake).
   - If the sender is generating the UID2 token from DII via the UID2 API: [POST&nbsp;/token/generate](../endpoints/post-token-generate.md).

1. Sender and receiver: Approve sharing permissions in the UID2 Portal:

   1. Sender: Define which sharing participants are allowed to decrypt the sender's UID2 token. 
   1. Sender and receiver: Request a UID2 Portal account: see [Request an Account](../portal/participant-info.md#request-an-account).
   1. Sender: Log in to the UID2 Portal and navigate to the sharing permissions page: see [Sharing Permissions](../portal/sharing-permissions.md).
   1. Sender: Select the participants that you want to share with. If needed, use the search feature to find specific sharing participants.
   1. Sender: Save the sharing selection.

1. Sender:

   1. Complete the following steps to encrypt the UID2s:

      1. If starting from DII: Generate a UID2 token, using either one of the SDK options listed in [UID2 Sharing Workflow: Sharing in the Bid Stream](#uid2-sharing-workflow-sharing-in-the-bid-stream) or the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint. 
      1. If starting from raw UID2:  Encrypt raw UID2s to convert them into UID2 tokens, using a UID2 SDK or Snowflake: see [Implementing Sharing Encryption/Decryption with an SDK](sharing-tokenized-overview.md#implementing-sharing-encryptiondecryption-with-an-sdk) or [Implementing Sharing Encryption/Decryption Using Snowflake](sharing-tokenized-overview.md#implementing-sharing-encryptiondecryption-using-snowflake).
   2. Transmit the UID2 tokens to an authorized receiver.

1. Receiver: Complete the following steps to decrypt the UID2 tokens:

   1. Receive the UID2 tokens.
   1. Decrypt the UID2 tokens into raw UID2s that the receiver can use: see [Implementing Sharing Encryption/Decryption with an SDK](sharing-tokenized-overview.md#implementing-sharing-encryptiondecryption-with-an-sdk) or [Implementing Sharing Encryption/Decryption Using Snowflake](sharing-tokenized-overview.md#implementing-sharing-encryptiondecryption-using-snowflake).

The following diagram illustrates the UID2 sharing permission SDK integration workflow:

![UID2 Sharing Permission SDK Integration Workflow](images/UID2_Sharing_Diagram_Integrate_SDK_Sharing_Token.png)

## Tokenized Sharing Examples

UID2 sharers follow a two-step process, as shown in the following example. The steps depend on whether you're starting with DII or with a raw UID2. This section includes the following:

- [Tokenized Sharing: Starting with DII](#tokenized-sharing-starting-with-dii)
- [Example: DII to UID2 Token](#example-dii-to-uid2-token)
- [Tokenized Sharing: Starting with a Raw UID2](#tokenized-sharing-starting-with-a-raw-uid2)
- [Example: Raw UID2 to UID2 Token](#example-raw-uid2-to-uid2-token)

### Tokenized Sharing: Starting with DII

Starting with DII is most common for publishers [sharing in the bid stream](sharing-tokenized-from-data-bid-stream.md) and for [sharing via creative pixels](sharing-tokenized-from-data-pixel.md#workflow-tokenized-sharing-via-creative-pixels).

If you're starting with DII, generate the UID2 token by following either of these paths:

- Option 1: Convert to raw UID2 and then encrypt:

   1. Convert the input email address or phone number to a raw UID2, which you can store securely.

   2. Encrypt the raw UID2 to create a UID2 token that you can share with another trusted UID2 sharing participant. For an example, see [Example: Raw UID2 to UID2 Token](#example-raw-uid2-to-uid2-token).

- Option 2: Generate UID2 token from DII using a UID2 SDK or the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint.

Then, share the resulting UID2 token with another trusted UID2 sharing participant.

### Example: DII to UID2 Token

The following example shows sample values when converting input DII directly to a UID2 token.

<table>
<colgroup>
    <col style={{
      width: "30%"
    }} />
    <col style={{
      width: "40%"
    }} />
    <col style={{
      width: "30%"
    }} />
  </colgroup>
<thead>
<tr>
<th>Input Example</th>
<th>Process/User</th>
<th >Result</th>
</tr>
</thead>
<tbody>
<tr>
<td>user@example.com</td>
<td>Convert email/phone number to UID2 token</td>
<td style={{
  wordBreak: "break-all"
}}>KlKKKfE66A7xBnL/DsT1UV/Q+V/r3xwKL89Wp7hpNllxmNkPaF8vdzenDvfoatn6sSXbFf5DfW9wwbdDwMnnOVpPxojkb8KYSGUte/FLSHtg4CLKMX52UPRV7H9UbWYvXgXC4PaVrGp/Jl5zaxPIDbAW0chULHxS+3zQCiiwHbIHshM+oJ==</td>
</tr>
</tbody>
</table>

### Tokenized Sharing: Starting with a Raw UID2

tokenized sharing starting with a raw UID2 is common for [sharing via tracking pixels](sharing-tokenized-from-data-pixel.md#workflow-tokenized-sharing-via-tracking-pixels). It can also be used in other scenarios. For details, see  [Tokenized Sharing from Raw UID2s](sharing-tokenized-from-raw.md).

If you're starting with a raw UID2, follow these steps:

1. Encrypt the raw UID2, using one of the UID2 server-side SDKs or the UID2 Snowflake integration, to create a UID2 token that you can share with another trusted UID2 sharing participant. For an example, see [Example: Raw UID2 to UID2 Token](#example-raw-uid2-to-uid2-token).

2. Share the resulting UID2 token with another trusted UID2 sharing participant.

### Example: Raw UID2 to UID2 Token

The following example shows sample values when converting input DII to a raw UID2 and then encoding the result.

<table>
<colgroup>
    <col style={{
      width: "30%"
    }} />
    <col style={{
      width: "40%"
    }} />
    <col style={{
      width: "30%"
    }} />
  </colgroup>
<thead>
<tr>
<th>Input Example</th>
<th>Process/User</th>
<th >Result</th>
</tr>
</thead>
<tbody>
<tr>
<td>user@example.com</td>
<td>Convert email/phone number to raw UID2:<br/><a href="../endpoints/post-identity-map">POST&nbsp;/identity/map</a> endpoint</td>
<td>K2jlbu2ldlpKL1z6n5bET7L3<br/>g0xfqmldZPDdPTktdRQ=</td>
</tr>
<tr>
<td>K2jlbu2ldlpKL1z6n5bET7L3<br/>g0xfqmldZPDdPTktdRQ=</td>
<td>Encrypt raw UID2 to create a UID2 token:<br/>encrypt() function in applicable SDK. For example, for Java, see <a href="../sdks/uid2-sdk-ref-java#usage-for-uid2-sharers">Usage for UID2 Sharers</a> step 3.</td>
<td style={{
  wordBreak: "break-all"
}}>KlKKKfE66A7xBnL/DsT1UV/Q+V/r3xwKL89Wp7hpNllxmNkPaF8vdzenDvfoatn6sSXbFf5DfW9wwbdDwMnnOVpPxojkb8KYSGUte/FLSHtg4CLKMX52UPRV7H9UbWYvXgXC4PaVrGp/Jl5zaxPIDbAW0chULHxS+3zQCiiwHbIHshM+oJ==</td>
</tr>
</tbody>
</table>

## UID2 Token Pass-Through

The UID2 token is designed so that even if the underlying raw UID2 remains the same, each time a UID2 token is generated from it, the token value is different. This means that the UID2 token can be seen by all but can only be used by UID2 participants that have access to the decryption key. 

For example, UID2 tokens are habitually passed through the bid stream from a publisher to a DSP. Although a UID2 token might go through several parties, such as an SSP, it can be decrypted only by an authorized UID2 participant. On its journey through the bid stream, the UID2 token can safely pass through one or more intermediaries.

The same is true in tokenized sharing scenarios between UID2 sharing participants. A UID2 token can be passed through non-UID2 participants.

:::caution
Pass-through is only permissible in a tokenized sharing scenario. A raw UID2 **must not** be passed through non-participants.
:::
