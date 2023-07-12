---
title: Overview of Sharing
description: Learn about sharing UID2s with other participants.
hide_table_of_contents: false
sidebar_position: 01
---

# UID2 Sharing: Overview 

<!-- This page provides information about sharing UID2s: what sharing means, who you can share with, the benefits of sharing, how to set up and manage your sharing permissions, and lots more! Use sharing permissions to expand your reach and help your business to prosper. -->

<!-- It includes the following:

  - [UID2 Token Pass-Through](#uid2-token-pass-through)
- [UID2 Sharing Workflow](#uid2-sharing-workflow)
  - [One-Time Setup Steps](#one-time-setup-steps)
  - [Action Steps](#action-steps)
- [UID2 Portal Sharing Permissions](#uid2-portal-sharing-permissions)
  - [Steps for Granting Sharing Permission](#steps-for-granting-sharing-permission) -->

In UID2, sharing is a process for distributing raw UID2s securely between UID2 participants. To protect raw UID2s from unauthorized access, the originating participant (sender) must encrypt the raw UID2s into UID2 sharing tokens before transmission. The destination participants (receivers) must decrypt the UID2 sharing tokens into raw UID2s for internal use.

The UID2 sender specifies which receivers can decrypt their UID2 sharing tokens, by configuring permissions in the UID2 Portal. When a sender grants permission to a receiver for UID2 sharing, the sender's decryption keys are shared with the receiver via a UID2 SDK. As part of sharing, the UID2 SDKs and APIs take care of the encryption and decryption.

For example, let's say that an advertiser (sender) wants to share raw UID2s with a trusted sharing partner who is a DSP, for segment creation via an API. Using sharing, the advertiser can encrypt the raw UID2s into UID2 sharing tokens and send them securely to the DSP (receiver). The DSP, who is also taking part in sharing, has access to the advertiser's decryption keys and can therefore decrypt the UID2 sharing tokens into raw UID2s for segment creation.

There are many scenarios for sharing. For details, see [Sharing Use Cases](sharing-use-cases.md).

>NOTE: The process for publishers sharing UID2 tokens in the bid stream is a different, and simpler, process. If your only role is publisher, see [Sharing for Publishers](sharing-publishers.md).

Additional resources:

- [Implementing Sharing](sharing-implementing.md)
- [Sharing UID2s: Best Practices](sharing-best-practices.md)
- [UID2 Portal Overview](../portal/portal-overview.md)

## UID2 Sharing Workflow: Integrating via an SDK
The workflow for sharing UID2 data securely between UID2 participants, which includes encrypting raw UID2s into UID2 sharing tokens that the receiver can decrypt using your encryption keys, consists of the following steps (each step links to the corresponding section):

1. The sender defines which sharing participants are allowed to decrypt the sender's UID2 sharing token.

1. The sender uses a UID2 SDK to convert raw UID2s into UID2 sharing tokens.

1. The sender transmits the UID2 sharing tokens to the receiver.

1. The receiver uses a UID2 SDK to decrypt raw UID2s from the received UID2 sharing tokens.

The following diagram illustrates the UID2 sharing permission SDK integration Workflow:

![UID2 Sharing Permission SDK Integration Workflow for SDK](images/UID2_Sharing_Diagram_Integrate_SDK_Sharing_Token.png)

## UID2 Sharing Workflow: Integrating via the API

When you want to send [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) (email addresses or phone numbers) and receive UID2 tokens, you can integrate via the API, which supports generating and refreshing the UID2 tokens, or via the Java Server-Side SDK which also supports these functions. Other SDKs do not support token generate and refresh.

The workflow for generating UID2 tokens from DII, via the API or the Java server-side SDK, consists of the following steps (each step links to the corresponding section):

1. The sender defines which sharing participants are allowed to decrypt the sender's UID2 bid stream token.

1. The sender calls a UID2 endpoint (or the [Java server-side SDK](../sdks/uid2-sdk-ref-java.md)) to convert DII to UID2 tokens.

1. The sender transmits the UID2 tokens to the receiver.

1. The receiver uses a UID2 SDK to decrypt raw UID2s from the received UID2 sharing tokens.

The following diagram illustrates the UID2 sharing workflow for integrating via the API:

![UID2 Sharing Permission SDK Integration Workflow for API](images/UID2_Sharing_Diagram_Integrate_SDK_Bid_Stream.png)

(**GWH/KT: Not sure how decrypt will work? I think they cannot decrypt except with the SDK?**)

## Generating Tokens for UID2 Sharing

When a sharing participant is sending a UID2 to another sharing participant, the raw UID2 must be encrypted into a UID2 sharing token.   

For example, when a sharing participant sends a UID2 outside the participant infrastructure, such as to an API endpoint or to a location such as S3 where it is accessible to another participant, the UID2 must be encrypted into a UID2 token.

There are two ways that you can generate a UID2 token, and the correct way to generate the token depends on the usage scenario:
- UID2 bid stream token (for use only in the bid stream): convert the input email address or phone number directly to a UID2 token.<!--  See [Token Example for Bid Stream](#token-example-for-bid-stream). --> {**GWH to add bid stream token and sharing token into the glossary**}
- UID2 sharing token (the only valid way for sharing): convert the input email address or phone number to a raw UID2, and then to a UID2 token. See [Token Example for Sharing](#token-example-for-sharing).

The correct way to generate the token depends on the scenario, as shown in the following table. All scenarios except the first one apply to sharing UID2s.

| Use Case | Encryption Method |
| :--- | :--- |
<!-- | Bid stream | [POST /token/generate](../endpoints/post-token-generate.md) endpoint when using the UID2 API, or corresponding function in a UID2 SDK. | -->
| API | Sharing `encrypt()` function in the corresponding server-side SDK: see [Steps to Implement Sharing](sharing-implementing.md#steps-to-implement-sharing). |
| File transfer | Sharing `encrypt()` function in the corresponding server-side SDK: see [Steps to Implement Sharing](sharing-implementing.md#steps-to-implement-sharing). |
| Pixel | Sharing `encrypt()` function in the corresponding server-side SDK: see [Steps to Implement Sharing](sharing-implementing.md#steps-to-implement-sharing). |
| All other sharing use cases | Sharing `encrypt()` function in the corresponding server-side SDK: see [Steps to Implement Sharing](sharing-implementing.md#steps-to-implement-sharing). |

<!-- | Use Case | Encryption Method |
| :--- | :--- |
| Bid stream | [POST /token/generate](../endpoints/post-token-generate.md) endpoint when using the UID2 API, or corresponding function in a UID2 SDK. |
| API<br/>File transfer<br/>Pixel<br/>All other sharing use cases | Sharing `encrypt()` function in the corresponding server-side SDK: see [Steps to Implement Sharing](sharing-implementing.md#steps-to-implement-sharing). | -->

### Token Example for Sharing

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
<td>Encryption from a raw UID2 to a UID2 token that a sharing participant can send securely to another participant.<br/>The SDK manages the encryption. For details, see the Sharing section in the doc for the applicable UID2 server-side SDK. For example, for Java, see <a href="../sdks/uid2-sdk-ref-javaa#usage-for-uid2-sharers">Usage for UID2 Sharers</a> step 3.</td>
<td style={{
  wordBreak: "break-all"
}}>KlKKKfE66A7xBnL/DsT1UV/Q+V/r3xwKL89Wp7hpNllxmNkPaF8vdzenDvfoatn6sSXbFf5DfW9wwbdDwMnnOVpPxojkb8KYSGUte/FLSHtg4CLKMX52UPRV7H9UbWYvXgXC4PaVrGp/Jl5zaxPIDbAW0chULHxS+3zQCiiwHbIHshM+oJ==</td>
</tr>
</tbody>
</table>

<!-- ## UID2 Token Pass-Through
The UID2 token is designed so that it can be seen by all but can only be used by UID2 participants that have access to the decryption keys.

For example, UID2 tokens are habitually passed through the bid stream from a publisher to a DSP. Although a UID2 token might go through several parties, such as an SSP, it can be decrypted only by an authorized UID2 participant. On its journey through the bid stream, the UID2 token can safely pass through one or more intermediaries.

The same is true of UID2 tokens generated for sharing. (**GWH_KT KT to report back whether we need this/how to fix it. **) -->

## UID2 Portal Sharing Permissions

For the intended receiver of UID2 tokens to be able to decrypt them into raw UID2s, the sender must grant permission to the receiver. Sharing permissions are defined through the UID2 Portal.

For UID2 Portal access, contact your UID2 {**GWH check wording elsewhere, contact, associate or whatever.**}

The following sharing options are available via the UID2 Portal. These options are not mutually exclusive; you can mix and match as needed:

- You can automatically grant permission to all participants of a specific type, such as all Publishers, Advertisers, DSPs, or Data Providers.<!--  (link to sub-section) --> For example, we recommend that publishers grant sharing permission to all DSPs.
- You can grant permission to one or more specific participants<!--  (link to sub-section) -->. If you choose this option, all new participants of the selected participant type will automatically have permission to decrypt any data that you send to them. For details, see [Encryption/Decryption Key Refresh Cadence for Sharing](sharing-best-practices.md#encryptiondecryption-key-refresh-cadence-for-sharing).

  For example, let's say you choose to share with all of 20 existing DSPs. The next day, when DSP 21 signs up for sharing, DSP 21 will automatically have permission to decrypt data that you send. To share with DSP 21, just send one or more encrypted UID2 tokens and DSP 21 will be able to decrypt the tokens into raw UID2s. Because you chose automatic sharing, you do not need to log in to explicitly update your sharing permissions to include DSP 21, or any future DSPs that sign up for the UID2 ecosystem. You can update your sharing permission in the UID2 Portal at any point.

### Steps for Granting Sharing Permission

At a high level, enabling sharing permissions includes the following steps. For exact instructions for configuring your sharing options in the UID2 Portal, refer to [Sharing Permissions](../portal/sharing-permissions.md).

>NOTE: As well as granting sharing permission, you'll need to integrate the SDK into your code.

1. Log in to the UID2 Portal account.
1. Click **Sharing Permissions**.
1. Do one of the following:
   - **Share with one participant**: Search for a UID2 participant that you want to send data to, and select the participant.
   - **Share with a participant type**: Select a participant type that you want to start sharing with. Sharing will be enabled for current participants of that type, and also future participants of that type that join the UID2 ecosystem.
1. Save changes.

<!-- {**GWH_KT Gen to revisit the above procedure when UID2 portal is available**} -->
 
NOTE: When you enable sharing permission, this allows the selected sharing participants to access your decryption keys. Each participant that you enable for sharing can use your keys, via the SDK, to decrypt a UID2 token into a raw UID2. However, granting permission is just the first step. In order for sharing to occur, you must send the tokens to the participant. The UID2 Portal enables the permissions, it does not send the data&#8212;that is up to you.
