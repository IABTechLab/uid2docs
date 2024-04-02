---
title: Tokenized Sharing in Pixels
description: Learn about sharing UID2 tokens in pixels.
hide_table_of_contents: false
sidebar_position: 08
---

# Tokenized Sharing in Pixels

UID2 data shared in pixels must be in the form of UID2 tokens generated in one of these two ways:

- By encrypting [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) (an email address or phone number) directly into a UID2 token.
- By encrypting a raw UID2 into a UID2 token.

Tokenized sharing can be used in any sharing route, but the main implementation outside of the bid stream is tokenized sharing in pixels. 

:::caution
Data in pixels can be viewed in web traffic, so it is never acceptable to share raw UID2s in pixels. If you're sharing in pixels, tokenized sharing is required.
:::

In this file:

- [Audience](#audience)
- [Sharing UID2 Tokens in Pixels](#sharing-uid2-tokens-in-pixels)
- [Account Setup in the UID2 Portal](#account-setup-in-the-uid2-portal)
- [Workflow: Tokenized Sharing Via Tracking Pixels](#workflow-tokenized-sharing-via-tracking-pixels)
- [Workflow: Tokenized Sharing Via Creative Pixels](#workflow-tokenized-sharing-via-creative-pixels)
- [Information for Sharing Receivers](#information-for-sharing-receivers)

### Audience

Tokenized sharing in pixels is applicable to the following audiences:

- **Sender**: Most commonly an advertiser or data provider, but can be any authorized sharing participant.
- **Receiver**: Any authorized sharing participant. See [Tokenized Sharing: Information for Sharing Receiver](#tokenized-sharing-information-for-sharing-receiver).

## Sharing UID2 Tokens in Pixels

:::tip
We recommend generating the UID2 token directly from DII. You can do this in several ways; our recommendation is to generate the UID2 token client-side. For instructions, see [Client-Side Integration Guide for JavaScript](../guides/publisher-client-side.md).
:::

Different participants might use pixels in different ways. The following table shows two very common use cases for pixels in the advertising technology ecosystem.

(**GWH_KL_new I combined the note you requested with the intro copy -- hope that's OK. Just don't want to have too many notes and tips and we have one above already.**)

Pixel Type |  Tracking Pixel | Creative Pixel |
| :--- | :--- | :--- |
| What it measures | Conversion/retargeting (user does something) | Impression (user sees an ad) |
| Where | Advertiser or publisher site | Publisher site via DSP |
| For | Advertiser, data provider, or publisher | Advertiser or data provider |
| Starting point | DII | Raw UID2 |
| Format shared in pixel | UID2 token | UID2 token |

(**GWH_KL_new I added last line but if you don't like it we can lose it. Just wanted to spell it out.**)

There are two scenarios:

- [Tokenized Sharing Via Tracking Pixels](#workflow-tokenized-sharing-via-tracking-pixels)
- [Tokenized Sharing Via Creative Pixels](#workflow-tokenized-sharing-via-creative-pixels)

## Account Setup in the UID2 Portal

In the UID2 Portal, for tokenized sharing in pixels, the sender and the receiver must set up an account and then configure their sharing permissions.

The sender needs to set up sharing permission only once for each receiver or participant type. However, if you want to add new sharing permissions or change existing ones, you'll need to go back to adjust your settings.

For details, see [UID2 Portal: Overview](../portal/portal-overview.md) and follow the links for each task.

## Workflow: Tokenized Sharing Via Tracking Pixels

If you're using tracking pixels that fire when someone completes an action such as purchasing a product on a website, it's most likely that you'll start with DII and convert it to a UID2 token, for tokenized sharing.

The UID2 sender specifies which receivers can decrypt their UID2 tokens, by configuring permissions in the UID2 Portal (see [Sharing Permissions](../portal/sharing-permissions.md)). When a sender grants permission to a receiver for UID2 sharing, the sender's decryption keys are shared with the receiver via a UID2 SDK or Snowflake. As part of sharing, the UID2 SDKs and APIs take care of the encryption and decryption.

For example, let's say that an advertiser (sender) wants to share UID2 tokens with a trusted sharing participant who is a UID2 DSP, for conversion tracking via a tracking pixel. Using sharing, here's the sequence:

1. The advertiser is the sender, and does the following:

   1. Enables the DSP with sharing permission via the UID2 Portal.

   2. Directly generates UID2 tokens from the [DII](../ref-info/glossary-uid.md#gl-dii) provided by the user using the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint or one of the SDKs that support generating a UID2 token from DII.
   
      For a summary of options, see [SDK Functionality](../sdks/summary-sdks.md#sdk-functionality). We recommend using the [Client-Side Integration Guide for JavaScript](../guides/publisher-client-side.md).
   
   3. Sends the UID2 tokens securely to the DSP (receiver).

2. The DSP, who is also taking part in sharing, is the receiver. The DSP has access to the advertiser's decryption keys, through the UID2 Portal sharing permissions setup, and can therefore decrypt the UID2 tokens into raw UID2s for segment creation.

Both the UID2 sender and receiver must create a UID2 Portal account (see [Account Setup in the UID2 Portal](#account-setup-in-the-uid2-portal)) in order to take part in sharing. Without an account, a UID2 participant is not displayed in the list of sharing participants in the UID2 Portal.

## Workflow: Tokenized Sharing Via Creative Pixels

If you're using creative pixels, the DSP takes the raw UID2 and encrypts it into a UID2 token. The token is added into the creative pixel that is fired on impression.

All the implementation steps are the same as for [tokenized sharing from raw UID2](sharing-tokenized-from-raw.md).

## Information for Sharing Receivers

To be able to decrypt a UID2 token into a raw UID2, you must be an authorized sharing receiver and have the sender's decryption keys. The sender must also create a sharing relationship with you.

For details, see [Sharing Overview: Information for Tokenized Sharing Receivers](sharing-tokenized-overview.md#information-for-tokenized-sharing-receivers). 
