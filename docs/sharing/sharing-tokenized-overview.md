---
title: Tokenized Sharing Overview
description: Learn about tokenized sharing.
hide_table_of_contents: false
sidebar_position: 04
---

# Tokenized Sharing Overview

In UID2, tokenized sharing means encrypting [DII](../ref-info/glossary-uid.md#gl-dii) or [raw UID2s](../ref-info/glossary-uid.md#gl-raw-uid2) into [UID2 tokens](../ref-info/glossary-uid.md#gl-raw-uid2) and sharing the tokens with authorized recipients. Using UID2 tokens protects raw UID2s end-to-end between the sender and receiver of the data, including when the data passes through unauthorized parties. Tokenized sharing is required for sharing in the bid stream or via pixels, but you can use it in any sharing use case.

 The tokens can be generated in either of the following ways:
- By encrypting raw UID2s into UID2 tokens.
- By generating UID2 tokens directly from DII.

In this file:
- [Tokenized Sharing Scenarios](#tokenized-sharing-scenarios)
- [Sending UID2 Tokens to Another Sharing Participant](#sending-uid2-tokens-to-another-sharing-participant)
- [Receiving UID2 Tokens from Another Sharing Participant](#receiving-uid2-tokens-from-another-sharing-participant)
- [Tokenized Sharing Examples](#tokenized-sharing-examples)
  - [Tokenized Sharing: Starting with DII](#tokenized-sharing-starting-with-dii)
  - [Example: DII to UID2 Token](#example-dii-to-uid2-token)
  - [Tokenized Sharing: Starting with a Raw UID2](#tokenized-sharing-starting-with-a-raw-uid2)
  - [Example: Raw UID2 to UID2 Token](#example-raw-uid2-to-uid2-token)
- [UID2 Token Pass-Through](#uid2-token-pass-through)

## Tokenized Sharing Scenarios

In many scenarios, UID2 data is shared in the form of a [UID2 token](../ref-info/glossary-uid.md#gl-uid2-token). Key use cases are shown in the following table.

| Scenario | Sender | Receiver | Sharing Approach |
| :--- | :--- | :--- | :--- |
| Sending a UID2 to the bid stream | Publisher | DSP | See [Tokenized Sharing in the Bid Stream](sharing-tokenized-from-data-bid-stream.md) |
| Sending a UID2 in a tracking pixel | Any sharing participant | Any sharing participant | See [Tokenized Sharing in Pixels](sharing-tokenized-from-data-pixel.md) |
| Sending UID2 tokens to another sharing participant | Any sharing participant, if all security guidelines listed in [Security Within UID2 Sharing](sharing-security.md) cannot be followed, or for any other reason. | Any sharing participant | See [Tokenized Sharing from Raw UID2s](sharing-tokenized-from-raw.md) | 

For additional examples, see [Sharing UID2s: Use Cases](sharing-use-cases.md).

## Sending UID2 Tokens to Another Sharing Participant

You can send UID2 tokens to another authorized sharing participant. Sharing UID2s via UID2 tokens is an option in any sharing scenario, but is required within the bid stream or in pixels. The process is a little different depending on the starting point, as shown in the following table.

Choose the integration option that's right for your implementation, and then click through for details.

| Starting Point | Encryption Option/Scenario | Link to Details |
| :--- | :--- | :--- |
| DII | Sharing UID2 tokens from DII  in the bid stream | [Tokenized Sharing in the Bid Stream](sharing-tokenized-from-data-bid-stream.md) |
| DII | Sharing UID2 tokens from DII in tracking pixels |  [Workflow: Tokenized Sharing in Tracking Pixels](sharing-tokenized-from-data-pixel.md#workflow-tokenized-sharing-in-tracking-pixels) |
| Raw UID2 | Sharing UID2 tokens from raw UID2s in creative pixels | [Workflow: Tokenized Sharing in Creative Pixels](sharing-tokenized-from-data-pixel.md#workflow-tokenized-sharing-in-creative-pixels) |
| Raw UID2 | Sharing UID2 tokens from raw UID2s using an SDK | [Implementing Sharing Encryption/Decryption with an SDK](sharing-tokenized-from-raw.md#implementing-sharing-encryptiondecryption-with-an-sdk) |
| Raw UID2 | Sharing UID2 tokens from raw UID2s using Snowflake | [Implementing Sharing Encryption/Decryption Using Snowflake](sharing-tokenized-from-raw.md#implementing-sharing-encryptiondecryption-using-snowflake) |

## Receiving UID2 Tokens from Another Sharing Participant

The steps that the receiver takes are similar for all sharing scenarios. The receiver must decrypt the UID2 token to arrive at the raw UID2. To do this, you must have a UID2 Portal account and the sender must create a sharing relationship with you, so that you can access the sender's decryption keys.

:::tip
When you receive the tokens, we recommend decrypting as soon as possible to avoid token expiration. See [Best Practices for Managing Raw UID2s](sharing-best-practices.md#best-practices-for-managing-raw-uid2s).
:::

The following implementation options are available for decrypting UID2 tokens.

| Starting Point | Decryption Option/Scenario | Link to Details |
| :--- | :--- | :--- |
| Token | C# / .NET SDK | [UID2 SDK for C# / .NET: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-csharp-dotnet.md#usage-for-uid2-sharers) |
| Token | C++ SDK | [UID2 SDK for C++: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-cplusplus.md#usage-for-uid2-sharers) |
| Token | Java SDK | [UID2 SDK for Java: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-java.md#usage-for-uid2-sharers) |
| Token | Python SDK | [UID2 SDK for Python: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-python.md#usage-for-uid2-sharers) |
| Token | Snowflake | [Snowflake Integration Guide: Usage for UID2 Sharers](../guides/snowflake_integration.md#usage-for-uid2-sharers)
| Token | Decryption of UID2 tokens sent in the bid stream (DSPs only) | [DSP Integration Guide: Decrypt UID2 Tokens for RTB Use](../guides/dsp-guide#decrypt-uid2-tokens-for-rtb-use)

## Tokenized Sharing Examples

UID2 sharers follow a two-step process, as shown in the following example. The steps depend on whether you're starting with DII or with a raw UID2. This section includes the following:

- [Tokenized Sharing: Starting with DII](#tokenized-sharing-starting-with-dii)
- [Example: DII to UID2 Token](#example-dii-to-uid2-token)
- [Tokenized Sharing: Starting with a Raw UID2](#tokenized-sharing-starting-with-a-raw-uid2)
- [Example: Raw UID2 to UID2 Token](#example-raw-uid2-to-uid2-token)

### Tokenized Sharing: Starting with DII

Starting with DII is most common for publishers [sharing in the bid stream](sharing-tokenized-from-data-bid-stream.md) and for [sharing in tracking pixels](sharing-tokenized-from-data-pixel.md#workflow-tokenized-sharing-in-tracking-pixels).

If you're starting with DII, generate the UID2 token by following either of these paths:

- Option 1 (Recommended): Generate UID2 token from DII using one of the UID2 SDKs or the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint.

- Option 2: Convert to raw UID2 and then encrypt:

   1. Convert the input email address or phone number to a raw UID2, which you can store securely.

   2. Encrypt the raw UID2 to create a UID2 token that you can share with another trusted UID2 sharing participant. For an example, see [Example: Raw UID2 to UID2 Token](#example-raw-uid2-to-uid2-token).

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

Setting up tokenized sharing to encrypt raw UID2s requires some steps by each participant:

- The **sender**, who encrypts the raw UID2 to create UID2 tokens and sends the tokens to an authorized sharing participant.
- The **receiver**, an authorized sharing participant who receives the UID2 tokens and decrypts them.

Tokenized sharing starting with a raw UID2 is common for [sharing in creative pixels](sharing-tokenized-from-data-pixel.md#workflow-tokenized-sharing-in-creative-pixels). It can also be used in other scenarios. For details, see  [Tokenized Sharing from Raw UID2s](sharing-tokenized-from-raw.md).

If you're starting with a raw UID2, follow these steps:

1. Encrypt the raw UID2, using one of the UID2 server-side SDKs or the UID2 Snowflake integration, to create a UID2 token that you can share with another trusted UID2 sharing participant. For an example, see [Example: Raw UID2 to UID2 Token](#example-raw-uid2-to-uid2-token).

2. Share the resulting UID2 token with another trusted UID2 sharing participant.

### Example: Raw UID2 to UID2 Token

The following example shows sample values when converting input DII to a raw UID2 and then encrypting the raw UID2 to create a UID2 token.

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
<td>Encrypt raw UID2 to create a UID2 token:<br/>`encrypt()` function in applicable SDK. For example, for Java, see <a href="../sdks/uid2-sdk-ref-java#usage-for-uid2-sharers">Usage for UID2 Sharers</a> step 3.</td>
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
