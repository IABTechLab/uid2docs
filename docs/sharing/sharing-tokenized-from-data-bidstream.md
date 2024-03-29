---
title: Tokenized Sharing in the Bid Stream
description: Learn about sharing UID2 tokens to the bid stream.
hide_table_of_contents: false
sidebar_position: 08
---

# Tokenized Sharing in the Bid Stream

Publishers use UID2s by encrypting [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) (an email address or phone number) into a UID2 token, and then sending the UID2 token into the bid stream.

Additional information, including account setup and workflow information, is in the following sections:
- [Account Setup in the UID2 Portal](#account-setup-in-the-uid2-portal)
- [UID2 Sharing Workflow: Sharing in the Bid Stream](#uid2-sharing-workflow-sharing-in-the-bid-stream)

Additional information for publishers is on the following pages:
- [UID2 Overview for Publishers](../overviews/overview-publishers.md)
- [UID2 Portal: Overview](../portal/portal-overview.md)

### Tokenized Sharing in the Bid Stream: Implementation Options

The following approaches are available for encrypting the DII directly into a UID2 token for sending in the bid stream:

| Integration Option | Token Generated Client-Side or Server-Side? | Integration Guide |
| :--- | :--- | :--- |
| Prebid.js | Client-Side | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| Prebid.js | Server-Side | [UID2 Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md) |
| JavaScript SDK | Client-Side | [Client-Side Integration Guide for JavaScript](../guides/publisher-client-side.md) |
| JavaScript SDK | Server-Side | [Server-Side Integration Guide for JavaScript](integration-javascript-server-side.md) |
| Java SDK | Server-Side | [UID2 SDK for Java Reference Guide](../sdks/uid2-sdk-ref-java.md) |
| Python SDK | Server-Side | [UID2 SDK for Python Reference Guide](../sdks/uid2-sdk-ref-python.md) |
| UID2 API ([POST&nbsp;/token/generate](../endpoints/post-token-generate.md) and [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoints) | Server-Side | [UID2 Tokens](../endpoints/summary-endpoints.md#uid2-tokens) | 

These options support generating UID2 tokens from email addresses or phone numbers and also refreshing the tokens regularly. Other SDKs do not support token generate and token refresh at this time.

### Account Setup in the UID2 Portal

**(GWH need to change the title so it isn't the same as the overview. But later.**)

If your only sharing activity is generating UID2 tokens from DII and sending them in the bid stream, you do not need to set up an account in the UID2 Portal and create sharing relationships.

Publishers are automatically sharing with all DSPs who are integrated with UID2.

However, you might choose to do this so that you can control who you share with.

For account setup information, see [Account Setup in the UID2 Portal](sharing-tokenized-overview.md#account-setup-in-the-uid2-portal)

For details, see [UID2 Portal: Overview](../portal/portal-overview.md) and follow the links for each task.

### Workflow: Tokenized Sharing in the Bid Stream

The workflow for generating UID2 tokens from DII, via the API or the specified server-side SDKs, consists of the following steps (each step links to the corresponding section):

1. Publisher: Integrate with UID2 using one of the integration options listed in [Tokenized Sharing in the Bid Stream: Implementation Options](#tokenized-sharing-in-the-bid-stream-implementation-options).

   >NOTE: The DSP must integrate with UID2 using one of the server-side SDKs. See [Sharing Steps: Summary](sharing-implementing.md#sharing-steps-summary) (step 2).

1. (Optional) Publisher: Set up sharing permissions in the UID2 Portal to restrict who can decrypt your UID2 tokens:

   1. Publisher: Define which DSPs are allowed to decrypt your UID2 tokens. 
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
