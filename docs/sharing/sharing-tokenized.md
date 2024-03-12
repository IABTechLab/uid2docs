---
title: Sharing of UID2 Tokens
description: Learn about sharing UID2 tokens.
hide_table_of_contents: false
sidebar_position: 08
---

# Sharing of UID2 Tokens

**(Note: was previously "Sharing in the Bid Stream")**

Sharing of UID2 tokens, also called tokenized sharing, includes any scenarios where a UID2 token is shared with another UID2 participant.

There are two main implementation paths for sharing UID2 tokens:

- [Tokenized Sharing for Publishers in the Bid Stream](#tokenized-sharing-for-publishers-in-the-bid-stream)
- [Tokenized Sharing Outside the Bid Stream](#tokenized-sharing-outside-the-bid-stream)

<!-- It includes the following:

- [Account Setup in the UID2 Portal](#account-setup-in-the-uid2-portal)
- [UID2 Sharing Workflow: Sharing in the Bid Stream](#uid2-sharing-workflow-sharing-in-the-bid-stream)
- [Token Example for Publishers in the Bid Stream](#token-example-for-publishers-in-the-bid-stream) -->

## Tokenized Sharing for Publishers in the Bid Stream

Publishers use UID2s by encrypting [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) (an email address or phone number) via API endpoints or via an SDK, into a UID2 token, and then sending the UID2 token into the bid stream.

Additional information, including account setup and workflow information, is in the following sections:
- [Account Setup in the UID2 Portal](#account-setup-in-the-uid2-portal)
- [UID2 Sharing Workflow: Sharing in the Bid Stream](#uid2-sharing-workflow-sharing-in-the-bid-stream)

Additional information for publishers is on the following pages:
- [UID2 Overview for Publishers](../overviews/overview-publishers.md)
- [UID2 Portal: Overview](../portal/portal-overview.md)

### Account Setup in the UID2 Portal

In the UID2 Portal, the sender and the receiver must set up an account and then configure their sharing permissions.

The sender only needs to set up sharing permission once for each receiver or participant type. However, if you want to add new sharing permissions or change existing ones, you'll need to go back to adjust your settings.

As a publisher, we recommend that you set up your sharing permissions to share with all DSPs.

For details, see [UID2 Portal: Overview](../portal/portal-overview.md) and follow the links for each task.

### UID2 Sharing Workflow: Sharing in the Bid Stream

When you want to send UID2 tokens in the bid stream, you can integrate via the API or via one of these SDKs:

- The Java server-side SDK (see [UID2 SDK for Java Reference Guide](../sdks/uid2-sdk-ref-java.md)).
- The Python server-side SDK (see [UID2 SDK for Python Reference Guide](../sdks/uid2-sdk-ref-python.md)).
- Via the UID2 API (token/generate and token/refresh endpoints).

These options support generating UID2 tokens from email addresses or phone numbers and also refreshing the tokens regularly. Other SDKs do not support token generate and token refresh at this time.

The workflow for generating UID2 tokens from DII, via the API or the specified server-side SDKs, consists of the following steps (each step links to the corresponding section):

1. Publisher: Integrate with UID2, using one of the following:

   - Java SDK: see [UID2 SDK for Java Reference Guide](../sdks/uid2-sdk-ref-java.md)).
   - Python SDK: see [UID2 SDK for Python Reference Guide](../sdks/uid2-sdk-ref-python.md)).
   - Direct integration with API endpoints: see [UID2 Endpoints: Summary](../endpoints/summary-endpoints.md).
   - Direct integration with API endpoints to generate UID2 tokens using the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint, but using the UID2 SDK for JavaScript (see [UID2 SDK for JavaScript Reference Guide](../sdks/client-side-identity.md)) to refresh UID2 tokens.

   >NOTE: The DSP must integrate with UID2 using one of the server-side SDKs. See [Sharing Steps: Summary](sharing-implementing.md#sharing-steps-summary) (step 2).

1. Publisher: Approve sharing permissions in the UID2 Portal:

   1. Publisher: Define which DSPs are allowed to decrypt the sender's UID2 token. 
   1. Publisher and DSP: Create a UID2 Portal account.
   1. Publisher: Log in to the UID2 Portal and navigate to the sharing permissions page.
   1. Publisher: Select one or more DSPs that you want to share with. If needed, use the search feature to find specific DSPs.
   1. Publisher: Save the sharing selection.

1. The publisher completes the following steps to create and send the UID2 tokens:

   1. Generates a UID2 token from an email or phone number.
   1. Puts the UID2 token into the bid stream.

1. The DSP completes the following steps:

   1. Receives the UID2 tokens.
   1. Decrypts the UID2 tokens into raw UID2s and uses them.

The following diagram illustrates the UID2 sharing workflow for publishers.

![UID2 Sharing Permission Integration Workflow for publishers](images/UID2_Sharing_Diagram_Integrate_SDK_Bid_Stream.png)

### Token Example for Publishers in the Bid Stream

Publishers convert the input email address or phone number directly to a UID2 token for use in the bid stream, using one operation, as shown in the following example.

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
<td>Convert normalized email/phone number to UID2 token:<br/><a href="../endpoints/post-token-generate">POST&nbsp;/token/generate</a> endpoint<br/>NOTE: If you're using an SDK, the SDK manages token generation.</td>
<td style={{
  wordBreak: "break-all"
}}>KlKKKfE66A7xBnL/DsT1UV/Q+V/r3xwKL89Wp7hpNllxmNkPaF8vdzenDvfoatn6sSXbFf5DfW9wwbdDwMnnOVpPxojkb8KYSGUte/FLSHtg4CLKMX52UPRV7H9UbWYvXgXC4PaVrGp/Jl5zaxPIDbAW0chULHxS+3zQCiiwHbIHshM+oJ==</td>
</tr>
</tbody>
</table>

## Tokenized Sharing Outside the Bid Stream

The main implementation of tokenized sharing outside of the bid stream is tokenized sharing in pixels.

To protect raw UID2s from unauthorized access, if messaging is not secure per [Security Requirements for Raw UID2 Sharing](sharing-overview.md#security-requirements-for-raw-uid2-sharing), the originating participant (sender) must encrypt the raw UID2s into [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) before transmission. The destination participant (receiver) must decrypt the UID2 tokens into raw UID2s for internal use.

The UID2 sender specifies which receivers can decrypt their UID2 tokens, by configuring permissions in the UID2 Portal (see [UID2 Portal: Overview](../portal/portal-overview.md)). When a sender grants permission to a receiver for UID2 sharing, the sender's decryption keys are shared with the receiver via a UID2 SDK. As part of sharing, the UID2 SDKs and APIs take care of the encryption and decryption.

For example, let's say that an advertiser (sender) wants to share raw UID2s with a trusted sharing participant who is a UID2 DSP, for conversion tracking via a tracking pixel. Using sharing, here's the sequence:

1. The advertiser is the sender, and does the following:

   1. Enables the DSP with sharing permission via the UID2 Portal.

   2. Encrypts the raw UID2s into UID2 tokens, or directly generates UID2 tokens from the [DII](../ref-info/glossary-uid.md#gl-dii) provided by the user, using the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint.
   
   3. Sends the UID2 tokens securely to the DSP (receiver).

2. The DSP, who is also taking part in sharing, is the receiver. The DSP has access to the advertiser's decryption keys, through the UID2 Portal sharing permissions setup, and can therefore decrypt the UID2 tokens into raw UID2s for segment creation.

Both the UID2 sender and receiver must create an account in order to take part in sharing. Without an account, a UID2 participant is not displayed in the list of sharing participants in the UID2 Portal.

There are many scenarios for sharing. For additional examples, see [Sharing UID2s: Use Cases](sharing-use-cases.md).

Additional resources:

- [Implementing Sharing](sharing-implementing.md)
- [Sharing UID2 Tokens in Pixels](sharing-pixels.md)
- [UID2 Sharing: Best Practices](sharing-best-practices.md)
- [UID2 Portal: Overview](../portal/portal-overview.md)

## UID2 Tokenized Sharing Workflow

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

      1. If starting from DII: Generate a UID2 token, using a UID2 SDK or the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint. (**GWH_KL I think we need to link to all the choices here but not sure what they all are: Publisher web options page maybe?**)  
      1. If starting from raw UID2:  Encrypt raw UID2s to convert them into UID2 tokens, using a UID2 SDK or Snowflake: see [Sharing Steps: Summary](sharing-implementing.md#sharing-steps-summary).
   2. Transmit the UID2 tokens to an authorized receiver.

1. Receiver: Complete the following steps to decrypt the UID2 tokens:

   1. Receive the UID2 tokens.
   1. Decrypt the UID2 tokens into raw UID2s that the receiver can use: see [Sharing Steps: Summary](sharing-implementing.md#sharing-steps-summary).

The following diagram illustrates the UID2 sharing permission SDK integration workflow:

![UID2 Sharing Permission SDK Integration Workflow](images/UID2_Sharing_Diagram_Integrate_SDK_Sharing_Token.png)

## Generating the Token for UID2 Tokenized Sharing: Examples

UID2 sharers follow a two-step process, as shown in the following example. The steps depend on whether you're starting with DII or with a raw UID2:

- [Starting with DII](#tokenized-sharing-starting-with-dii)
- [Starting with a Raw UID2](#tokenized-sharing-starting-with-a-raw-uid2)

### Tokenized Sharing: Starting with DII

If you're starting with DII, follow either of these paths:

1. Convert to raw UID2 and then encrypt:

   1. Convert email or phone number to raw UID2:

       Convert the input email address or phone number to a raw UID2, which they can store securely.

   2. Convert raw UID2 to UID2 token:

      Encrypt the raw UID2 to create a UID2 token that they can share with another trusted UID2 sharing participant. For an example, see [Example: Raw UID2 to UID2 Token](#example-raw-uid2-to-uid2-token).

2. Generate UID2 token from DII using a UID2 SDK or the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint.

### Tokenized Sharing: Starting with a Raw UID2

If you're starting with a raw UID2, follow these steps:

1. Encrypt the raw UID2, using one of the UID2 server-side SDKs or the UID2 Snowflake integration, to create a UID2 token that you can share with another trusted UID2 sharing participant. For an example, see [Example: Raw UID2 to UID2 Token](#example-raw-uid2-to-uid2-token).

2. Share the resulting UID2 token with another trusted UID2 sharing participant.

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
