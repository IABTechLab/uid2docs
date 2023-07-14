---
title: Sharing for Publishers
description: Learn about sharing UID2s in the bid stream.
hide_table_of_contents: false
sidebar_position: 08
---

# Sharing for Publishers

<!-- It includes the following:

- [Account Setup in the UID2 Portal](#account-setup-in-the-uid2-portal)
- [UID2 Sharing Workflow: Integrating with the API](#uid2-sharing-workflow-integrating-with-the-api)
- [Token Example for Publishers in the Bid Stream](#token-example-for-publishers-in-the-bid-stream) -->

Publishers share UID2s by encrypting [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) (email addresses or phone numbers) via API endpoints or via an SDK, into a UID2 token, and then sending the UID2 token into the bid stream.

Additional resources:
- [UID2 Overview for Publishers](../overviews/overview-publishers.md)
- [UID2 Portal Overview](../portal/portal-overview.md)

## Account Setup in the UID2 Portal

In the UID2 Portal, the sender and the receiver must set up an account and then configure their sharing permissions.

The sender only needs to set up sharing permission once for each receiver or participant type. However, if you want to add new sharing permissions or change existing ones, you'll need to go back to adjust your settings.

As a publisher, we recommend that you set up your sharing permissions to share with all DSPs.

For details, see [UID2 Portal Overview](../portal/portal-overview.md) and follow the links for each task.

## UID2 Sharing Workflow: Integrating with the API

When you want to send UID2 tokens in the bid stream, you can integrate via the API or via the Java server-side SDK (see [UID2 SDK for Java (Server-Side) Reference Guide](../sdks/uid2-sdk-ref-java.md)).

Both of these support generating UID2 tokens from email addresses or phone numbers and also refreshing the tokens regularly. Other SDKs do not support token generate and token refresh.

The workflow for generating UID2 tokens from DII, via the API or the Java server-side SDK, consists of the following steps (each step links to the corresponding section):

1. The publisher defines which sharing participants are allowed to decrypt the sender's UID2 token.

1. The publisher calls the UID2 [POST /token/generate](../endpoints/post-token-generate.md) endpoint to convert DII to UID2 tokens, or uses the corresponding function in the [Java server-side SDK](../sdks/uid2-sdk-ref-java.md) to manage tokens.

1. The publisher transmits the UID2 tokens to the receiver (a DSP).

1. The receiver uses a UID2 SDK to decrypt raw UID2s from the UID2 tokens.

The following diagram illustrates the UID2 sharing workflow for publishers. (**GWH_KT diagram update coming 7/14**)

![UID2 Sharing Permission Integration Workflow for publishers](images/UID2_Sharing_Diagram_Integrate_SDK_Bid_Stream.png)

## Token Example for Publishers in the Bid Stream

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
<td>Conversion to a UID2 token, used in the bid stream, using the <a href="../endpoints/post-token-generate">POST /token/generate</a> endpoint.<br/>If you're using an SDK, the SDK manages token generation.</td>
<td style={{
  wordBreak: "break-all"
}}>KlKKKfE66A7xBnL/DsT1UV/Q+V/r3xwKL89Wp7hpNllxmNkPaF8vdzenDvfoatn6sSXbFf5DfW9wwbdDwMnnOVpPxojkb8KYSGUte/FLSHtg4CLKMX52UPRV7H9UbWYvXgXC4PaVrGp/Jl5zaxPIDbAW0chULHxS+3zQCiiwHbIHshM+oJ==</td>
</tr>
</tbody>
</table>
