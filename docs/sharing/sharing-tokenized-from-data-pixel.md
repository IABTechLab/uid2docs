---
title: Tokenized Sharing in Pixels
description: Learn about sharing UID2 tokens generated from DII.
hide_table_of_contents: false
sidebar_position: 08
---

# Tokenized Sharing in Pixels

(**copy of Tokenized Sharing from DII... to be edited to take out the bid stream stuff**)

(**GWH_KT01 I also added something for tokenized sharing in other circumstances... we have it in the table in the overview "Raw UID2 sharing or optional tokenized sharing"... do we therefore need it here?**)

In many scenarios, UID2 data is shared in the form of a [UID2 token](../ref-info/glossary-uid.md#gl-uid2-token). Key use cases are shown in the following table.

| Scenario | Who? | Sharing Approach |
| :--- | :--- | :--- |
| Sending a UID2 to the bid stream | Publisher | See [Tokenized Sharing for Publishers in the Bid Stream](#tokenized-sharing-for-publishers-in-the-bid-stream). |
| Sending a UID2 in a tracking pixel | Advertiser | See [Sharing UID2 Tokens in Pixels](#sharing-uid2-tokens-in-pixels). |
| Sending UID2s to another sharing participant | Any sharing participant, if all security requirements listed in [Security Requirements for UID2 Sharing](sharing-overview.md#security-requirements-for-uid2-sharing) cannot be followed. | See [Sending UID2s to Another Sharing Participant](#sending-uid2s-to-another-sharing-participant). |

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

### Workflow: Tokenized Sharing in the Bid Stream

When you want to send UID2 tokens in the bid stream, you can integrate using one of the following approaches:

- The Java server-side SDK (see [UID2 SDK for Java Reference Guide](../sdks/uid2-sdk-ref-java.md)).
- The Python server-side SDK (see [UID2 SDK for Python Reference Guide](../sdks/uid2-sdk-ref-python.md)).
- One of the following implementation approaches that generates the UID2 token on the client side:
  - The JavaScript SDK, implemented on the client side (see [Client-Side Integration Guide for JavaScript](../guides/publisher-client-side.md)).
  - The UID2 Prebid implementation (see [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md)).
- The UID2 API ([POST&nbsp;/token/generate](../endpoints/post-token-generate.md) and [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoints).

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


## Sharing UID2 Tokens in Pixels

In instances where a UID2 is used in a pixel, client-side, it must always be a UID2 token, not a raw UID2. Client-side activity is not secure and can be viewed by anyone inspecting web traffic.

:::tip
We recommend generating the UID2 token directly from DII. You can do this in several ways; our recommendation is to generate the UID2 token client-side. For instructions, see [Client-Side Integration Guide for JavaScript](../guides/publisher-client-side.md).
:::

In general, UID2 activity encompasses the pixel uses shown in the following table.

Pixel Type | Creative Pixel | Tracking Pixel | 
| :--- | :--- | :--- |
| What it measures | Impression (user sees an ad) | Conversion/retargeting (user does something) |
| Where | Publisher site via DSP |Advertiser or publisher site  |
| For | Advertiser or data provider | Advertiser, data provider, or publisher |
| Starting Point | DII | Raw UID2 |

**AND ANOTHER PIECE TO COMBINE WITH THIS:**

## Workflow: Tokenized Sharing Via Tracking Pixel

(**GWH also add: Workflow: Tokenized Sharing Via Creative Pixel -- after this section. KL will provide content**)

Tokenized sharing can be used in any sharing route, but the main implementation outside of the bid stream is tokenized sharing in pixels. 

To protect raw UID2s from unauthorized access, if messaging is not secure per [Security Requirements for Raw UID2 Sharing](sharing-overview.md#security-requirements-for-raw-uid2-sharing), the originating participant (sender) must encrypt the raw UID2s into [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) before transmission. The destination participant (receiver) then decrypts the UID2 tokens into raw UID2s for internal use.

Of course, sharing UID2s via UID2 tokens is also an option, in any sharing scenario.

The UID2 sender specifies which receivers can decrypt their UID2 tokens, by configuring permissions in the UID2 Portal (see [UID2 Portal: Overview](../portal/portal-overview.md)). When a sender grants permission to a receiver for UID2 sharing, the sender's decryption keys are shared with the receiver via a UID2 SDK. As part of sharing, the UID2 SDKs and APIs take care of the encryption and decryption.

For example, let's say that an advertiser (sender) wants to share UID2 tokens with a trusted sharing participant who is a UID2 DSP, for conversion tracking via a tracking pixel. Using sharing, here's the sequence:

1. The advertiser is the sender, and does the following:

   1. Enables the DSP with sharing permission via the UID2 Portal.

   2. Encrypts the raw UID2s into UID2 tokens, or directly generates UID2 tokens from the [DII](../ref-info/glossary-uid.md#gl-dii) provided by the user, using the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint.
   
   3. Sends the UID2 tokens securely to the DSP (receiver).

2. The DSP, who is also taking part in sharing, is the receiver. The DSP has access to the advertiser's decryption keys, through the UID2 Portal sharing permissions setup, and can therefore decrypt the UID2 tokens into raw UID2s for segment creation.

Both the UID2 sender and receiver must [create a UID2 Portal account](link to account setup section) in order to take part in sharing. Without an account, a UID2 participant is not displayed in the list of sharing participants in the UID2 Portal.

There are many scenarios for sharing. For additional examples, see [Sharing UID2s: Use Cases](sharing-use-cases.md).

(**GWH_KT not sure what needs to go here.**}