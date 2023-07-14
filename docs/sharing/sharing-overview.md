---
title: Overview of Sharing
description: Learn about sharing UID2s with other participants.
hide_table_of_contents: false
sidebar_position: 01
---

# UID2 Sharing: Overview 

<!-- It includes the following:

- [UID2 Sharing Workflow](#uid2-sharing-workflow)
- [Generating Tokens for UID2 Sharing](#generating-tokens-for-uid2-sharing)
  - [Token Example for Sharing](#token-example-for-sharing)
  - [UID2 Token Pass-Through](#uid2-token-pass-through)
- [UID2 Portal Sharing Permissions](#uid2-portal-sharing-permissions)
  - [Steps for Granting Sharing Permission](#steps-for-granting-sharing-permission) -->

In UID2, sharing is a process for distributing [raw UID2s](../ref-info/glossary-uid.md#gl-raw-uid2) securely between UID2 participants. To protect raw UID2s from unauthorized access, the originating participant (sender) must encrypt the raw UID2s into UID2 tokens before transmission. The destination participant (receiver) must decrypt the UID2 tokens into raw UID2s for internal use.

The UID2 sender specifies which receivers can decrypt their UID2 tokens, by configuring permissions in the [UID2 Portal](/docs/category/uid2-portal). When a sender grants permission to a receiver for UID2 sharing, the sender's decryption keys are shared with the receiver via a UID2 SDK. As part of sharing, the UID2 SDKs and APIs take care of the encryption and decryption.

For example, let's say that an advertiser (sender) wants to share raw UID2s with a trusted sharing partner who is a DSP, for segment creation via an API. Using sharing, the advertiser can encrypt the raw UID2s into UID2 tokens and send them securely to the DSP (receiver). The DSP, who is also taking part in sharing, has access to the advertiser's decryption keys and can therefore decrypt the UID2 tokens into raw UID2s for segment creation.

There are many scenarios for sharing. For details, see [Sharing UID2s: Use Cases](sharing-use-cases.md).

>NOTE: The process for publishers sharing UID2 tokens in the bid stream is a different, and simpler, process. If your only role is publisher, see [Sharing for Publishers](sharing-publishers.md).

Additional resources:

- [Implementing Sharing](sharing-implementing.md)
- [Sharing UID2s: Best Practices](sharing-best-practices.md)
- [UID2 Portal Overview](../portal/portal-overview.md)

## UID2 Sharing Workflow

To share UID2 data securely between UID2 participants, which includes encrypting raw UID2s into UID2 tokens that the receiver can decrypt using your encryption keys, you must use a UID2 SDK or the UID2 Snowflake integration.

The workflow for UID2 sharing, for all sharers except publishers, consists of the following steps:

1. The sender defines which sharing participants are allowed to decrypt the sender's UID2 token.

2. The sender converts raw UID2s into UID2 tokens, using a UID2 SDK or Snowflake.

3. The sender transmits the UID2 tokens to the receiver.

4. The receiver decrypts raw UID2s from the received UID2 tokens, using a UID2 SDK or Snowflake.

The following diagram illustrates the UID2 sharing permission SDK integration workflow:

![UID2 Sharing Permission SDK Integration Workflow](images/UID2_Sharing_Diagram_Integrate_SDK_Sharing_Token.png)

## Generating Tokens for UID2 Sharing

When a sharing participant is sending a UID2 to another sharing participant, the sender must first encrypt the raw UID2 into a UID2 token.   

For example, when a sharing participant sends a UID2 outside the participant infrastructure, such as to an API endpoint or to a location such as S3 where it is accessible to another participant, the UID2 must be encrypted into a UID2 token.

There are two ways to generate a UID2 token, and the correct method to choose depends on the usage scenario:
- **Publishers**: For publishers sharing UID2 tokens in the bid stream, convert the input email address or phone number directly to a UID2 token. For details, see [Sharing for Publishers](sharing-publishers.md).
- **All other participants**: To securely share UID2s between participants, first convert the input email address or phone number to a raw UID2, and then convert the raw UID2 to a UID2 token. This is the only valid method for sharing, other than for publishers sharing in the bid stream. See [Token Example for Sharing](#token-example-for-sharing).

The correct way to generate the token, for all UID2 participants except publishers, is to use the `encrypt` function in the corresponding server-side SDK, or the UID2 Snowflake integration: see [Sharing Steps: Summary](sharing-implementing.md#sharing-steps-summary).

### Token Example for Sharing

>Note: If you are a publisher, see [Token Example for Publishers in the Bid Stream](sharing-publishers.md#token-example-for-publishers-in-the-bid-stream).

UID2 sharers follow a two-step process, as shown in the following example. The steps are:
- Convert the input email address or phone number to a raw UID2, which they can store securely.
- Encrypt the raw UID2 to create a UID2 token that they can share with another trusted UID2 sharing participant.

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
<td>Conversion to a raw UID2, used for internal participant processing, using the <a href="../endpoints/post-identity-map">POST /identity/map</a> endpoint.</td>
<td>K2jlbu2ldlpKL1z6n5bET7L3<br/>g0xfqmldZPDdPTktdRQ=</td>
</tr>
<tr>
<td>K2jlbu2ldlpKL1z6n5bET7L3<br/>g0xfqmldZPDdPTktdRQ=</td>
<td>Encryption from a raw UID2 to a UID2 token that a sharing participant can send securely to another sharing participant.<br/>The SDK manages the encryption. For details, see the Sharing section in the doc for the applicable UID2 server-side SDK. For example, for Java, see <a href="../sdks/uid2-sdk-ref-java#usage-for-uid2-sharers">Usage for UID2 Sharers</a> step 3.</td>
<td style={{
  wordBreak: "break-all"
}}>KlKKKfE66A7xBnL/DsT1UV/Q+V/r3xwKL89Wp7hpNllxmNkPaF8vdzenDvfoatn6sSXbFf5DfW9wwbdDwMnnOVpPxojkb8KYSGUte/FLSHtg4CLKMX52UPRV7H9UbWYvXgXC4PaVrGp/Jl5zaxPIDbAW0chULHxS+3zQCiiwHbIHshM+oJ==</td>
</tr>
</tbody>
</table>

<!-- ## UID2 Token Pass-Through
The UID2 token is designed so that it can be seen by all but can only be used by UID2 participants that have access to the decryption keys.

For example, UID2 tokens are habitually passed through the bid stream from a publisher to a DSP. Although a UID2 token might go through several parties, such as an SSP, it can be decrypted only by an authorized UID2 participant. On its journey through the bid stream, the UID2 token can safely pass through one or more intermediaries.

The same is true of UID2 tokens generated for sharing. (**GWH_KT KT to report back whether we need this/how to fix it.  GWH_KT here is my suggestion to say: Only trusted sharing participants, that you've chosen to share with, have access to your decryption keys. **) -->

## UID2 Portal Sharing Permissions

For the intended receiver of UID2 tokens to be able to decrypt them into raw UID2s, the sender must grant permission to the receiver. Sharing permissions are defined through the UID2 Portal. For details, see [UID2 Portal Overview](../portal/portal-overview.md).

For UID2 Portal access, ask your UID2 contact person. For details, see [Account Setup](../getting-started/gs-account-setup.md).

The following sharing options are available via the UID2 Portal. These options are not mutually exclusive; you can mix and match as needed:

- You can automatically grant permission to all participants of a specific type, such as all publishers, advertisers, DSPs, or data providers.<!--  (link to sub-section) --> For example, we recommend that publishers grant sharing permission to all DSPs.
- You can grant permission to one or more specific participants<!--  (link to sub-section) -->. If you choose this option, all new participants of the selected participant type will automatically have permission to decrypt any data that you send to them. For details, see [Key Refresh Cadence for Sharing](sharing-best-practices.md#key-refresh-cadence-for-sharing).

  For example, let's say you choose to share with all of 20 existing DSPs. The next day, when DSP 21 signs up for sharing, DSP 21 will automatically have permission to decrypt data that you send. To share with DSP 21, just send one or more encrypted UID2 tokens, and DSP 21 will be able to decrypt the tokens into raw UID2s. Because you chose automatic sharing, you do not need to log in to explicitly update your sharing permissions to include DSP 21, or any future DSPs that sign up for the UID2 ecosystem.
  
  You can update your sharing permission in the UID2 Portal at any point.

### Steps for Granting Sharing Permission

At a high level, enabling sharing permissions includes the following steps. For exact instructions for configuring your sharing options in the UID2 Portal, refer to [Sharing Permissions](../portal/sharing-permissions.md).

>NOTE: As well as granting sharing permission, you'll need to integrate the SDK into your code.

1. Log in to your UID2 Portal account.
1. Click **Sharing Permissions**.
1. Do one of the following:
   - **Share with one participant**: Search for a UID2 participant that you want to send data to, and select the participant.
   - **Share with a participant type**: Select a participant type that you want to start sharing with. Sharing will be enabled for current participants of that type, and also future participants of that type that join the UID2 ecosystem.
1. Save changes.

<!-- {**GWH_KT Gen to revisit the above procedure when UID2 portal is available**} -->
 
NOTE: When you enable sharing permission, this allows the selected sharing participants to access your decryption keys. Each participant that you enable for sharing can use your keys, via the SDK, to decrypt a UID2 token into a raw UID2. However, granting permission is just the first step. In order for sharing to occur, you must send the tokens to the participant. The UID2 Portal enables the permissions. It does not send any data&#8212;that is up to you.

## Sharing for Publishers

The process for publishers sharing UID2 tokens in the bid stream is a different, and simpler, process. If your only role is publisher, see [Sharing for Publishers](sharing-publishers.md).
