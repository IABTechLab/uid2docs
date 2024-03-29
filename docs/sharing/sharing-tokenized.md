---
title: Sharing of UID2 Tokens
description: Learn about sharing UID2 tokens.
hide_table_of_contents: false
sidebar_position: 08
---

# Sharing of UID2 Tokens

Sharing of UID2 tokens, also called tokenized sharing, includes any scenarios where a UID2 token is shared with another UID2 participant.

There are two main implementation paths for sharing UID2 tokens:

- [Tokenized Sharing for Publishers in the Bid Stream](#tokenized-sharing-for-publishers-in-the-bid-stream)
- [Tokenized Sharing Via a Pixel](xxxxx)](#tokenized-sharing-outside-the-bid-stream)

(**GWH_KT THE ABOVE ARE BOTH DII > TOKEN AND WE ALSO HAVE TO INCLUDE TOKENIZED SHARING BY GOING RAW UID2 > TOKEN. SO THERE ARE THREE. Do we need to adjust your TOC to have a separate file for each of these?**)


<!-- 
It includes the following:

- [Tokenized Sharing for Publishers in the Bid Stream](#tokenized-sharing-for-publishers-in-the-bid-stream)
  - [Account Setup in the UID2 Portal](#account-setup-in-the-uid2-portal)
  - [Workflow: Tokenized Sharing in the Bid Stream](#workflow-tokenized-sharing-in-the-bid-stream)
  - [Token Example for Publishers in the Bid Stream](#token-example-for-publishers-in-the-bid-stream) 
- [Tokenized Sharing Outside the Bid Stream](#tokenized-sharing-outside-the-bid-stream)
  - [Workflow: Tokenized Sharing Outside the Bid Stream](#workflow-tokenized-sharing-outside-the-bid-stream)
  - [Tokenized Sharing Examples](#tokenized-sharing-examples)
- [UID2 Token Pass-Through](#uid2-token-pass-through) 
 -->

### Workflow: Tokenized Sharing Outside the Bid Stream

Sharing of UID2 data securely from one UID2 participant to another, if messaging is not secure per [Security Requirements for Raw UID2 Sharing](#security-requirements-for-raw-uid2-sharing), includes encrypting raw UID2s into UID2 tokens that the receiver can decrypt using your encryption keys. To do this, you must use one of the UID2 server-side SDKs or the UID2 Snowflake integration.

The workflow for UID2 tokenized sharing, for all sharers except when sharing UID2 tokens in the bid stream, consists of the following steps:

1. Sender and receiver: Integrate with UID2 sharing, using one of the following:

   - SDK for sharing: see [Steps to Implement Sharing with an SDK](sharing-implementing.md#steps-to-implement-sharing-with-an-sdk).
   - Snowflake integration for sharing: see [Steps to Implement Sharing Using Snowflake](sharing-implementing.md#steps-to-implement-sharing-using-snowflake).
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
      1. If starting from raw UID2:  Encrypt raw UID2s to convert them into UID2 tokens, using a UID2 SDK or Snowflake: see [Sharing Steps: Summary](sharing-implementing.md#sharing-steps-summary).
   2. Transmit the UID2 tokens to an authorized receiver.

1. Receiver: Complete the following steps to decrypt the UID2 tokens:

   1. Receive the UID2 tokens.
   1. Decrypt the UID2 tokens into raw UID2s that the receiver can use: see [Sharing Steps: Summary](sharing-implementing.md#sharing-steps-summary).

The following diagram illustrates the UID2 sharing permission SDK integration workflow:

![UID2 Sharing Permission SDK Integration Workflow](images/UID2_Sharing_Diagram_Integrate_SDK_Sharing_Token.png)

### Tokenized Sharing Examples

UID2 sharers follow a two-step process, as shown in the following example. The steps depend on whether you're starting with DII or with a raw UID2. This section includes the following:

- [Tokenized Sharing: Starting with DII](#tokenized-sharing-starting-with-dii)
- [Example: DII to UID2 Token](#example-dii-to-uid2-token)
- [Tokenized Sharing: Starting with a Raw UID2](#tokenized-sharing-starting-with-a-raw-uid2)
- [Example: Raw UID2 to UID2 Token](#example-raw-uid2-to-uid2-token)

#### Tokenized Sharing: Starting with DII

If you're starting with DII, first generate the UID2 token by following either of these paths:

- Option 1: Convert to raw UID2 and then encrypt:

   1. Convert the input email address or phone number to a raw UID2, which you can store securely.

   2. Encrypt the raw UID2 to create a UID2 token that you can share with another trusted UID2 sharing participant. For an example, see [Example: Raw UID2 to UID2 Token](#example-raw-uid2-to-uid2-token).

- Option 2: Generate UID2 token from DII using a UID2 SDK or the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint.

Then, share the resulting UID2 token with another trusted UID2 sharing participant.

#### Example: DII to UID2 Token

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

#### Tokenized Sharing: Starting with a Raw UID2

If you're starting with a raw UID2, follow these steps:

1. Encrypt the raw UID2, using one of the UID2 server-side SDKs or the UID2 Snowflake integration, to create a UID2 token that you can share with another trusted UID2 sharing participant. For an example, see [Example: Raw UID2 to UID2 Token](#example-raw-uid2-to-uid2-token).

2. Share the resulting UID2 token with another trusted UID2 sharing participant.

#### Example: Raw UID2 to UID2 Token

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
