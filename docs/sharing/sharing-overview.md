---
title: Overview of Sharing
description: Learn about sharing UID2s with other participants.
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# UID2 Sharing: Overview 

In UID2, sharing is a process for distributing either [raw UID2s](../ref-info/glossary-uid.md#gl-raw-uid2) or [UID2 tokens](../ref-info/glossary-uid.md#gl-raw-uid2) between UID2 participants.

All instances where a raw UID2 or UID2 token is shared with another participant fall under the definition of sharing. We encourage all participants to keep the UID2 ecosystem safe by following the standard security practices. For details, see [Security Requirements for UID2 Sharing](sharing-security.md).

<!-- In this file:
- [Sharing Participants](#sharing-participants)
- [Approved Sharing Scenarios](#approved-sharing-scenarios)
- [UID2 Sharing Approaches](#uid2-sharing-approaches)
  - [Sharing UID2 Tokens](#sharing-uid2-tokens)
  - [Sharing Raw UID2s](#sharing-raw-uid2s) -->

## Sharing Participants

In UID2, a sharing participant is a company that takes part in distributing raw UID2s or UID2 tokens from one UID2 participant to another, either as a sender or a receiver.

(**GWH__KL01 Grant x'd out the above "from one UID2 participant to another"in the glossary and I didn't understand his comment "We had proposed this in the other doc.  It sounds like it was aligned on the call.  If anyone has any objections, feel free to raise them." -- is it OK here or should it come out?**)

A sharing participant can be a publisher, advertiser, DSP, or data provider, or might have more than one of these roles.

## Approved Sharing Scenarios

There are several main sharing scenarios, summarized in the following table. 

For examples, see [Sharing UID2s: Use Cases](sharing-use-cases.md).

| Sharing Scenario | Sender | Receiver | Sharing Approach | Sharing Route | Link for Details
| :--- | :--- | :--- | :--- | :--- | :--- |
| Sharing in the bid stream | Publisher | DSP | Sharing UID2 tokens (tokenized sharing) | Publisher generates UID2 token and sends it into the bid stream.  | [Tokenized Sharing in the Bid Stream](sharing-tokenized-from-data-bid-stream.md) |
| Sharing via a pixel | Any authorized sharer | Any authorized sharer | Sharing UID2 tokens (tokenized sharing) | Sharing via any pixel, such as a tracking pixel or creative pixel. | [Tokenized Sharing in Pixels](sharing-tokenized-from-data-pixel.md) |
| Sharing with another UID2 sharing participant, outside of the bid steam or pixels | Any authorized sharer | Any authorized sharer | Sharing raw UID2s<br/>or<br/>Sharing UID2 tokens (tokenized sharing) | Sharing by any secure channel, such as via API or Amazon S3 drop. | [Raw UID2 Sharing](sharing-raw.md) or [Tokenized Sharing from Raw UID2s](sharing-tokenized-from-raw.md) |

## UID2 Sharing Approaches

If a sharing participant wants to share UID2s with another authorized sharing participant, there are two possible paths:

- [Sharing UID2 Tokens](#sharing-uid2-tokens)
- [Sharing Raw UID2s](#sharing-raw-uid2s)

### Sharing UID2 Tokens

The following are the high-level steps for sharing UID2 tokens ([tokenized sharing](../ref-info/glossary-uid.md#gl-tokenized-sharing)):

  1. The sender sets up sharing permissions in the UID2 Portal.
  2. The sender does either of the following:
  
     - Generates UID2 tokens from DII.
     - Encrypts raw UID2s into UID2 tokens.
  3. The receiver decrypts the UID2 tokens into raw UID2s, following the instructions that apply to your scenario (see [Approved Sharing Scenarios](#approved-sharing-scenarios)).

For more information about the options for sharing UID2 tokens, and links to instructions, see [Tokenized Sharing Overview](sharing-tokenized-overview.md).

### Sharing Raw UID2s

To share raw UID2s, we expect that both the sender and receiver are [sharing participants](ref-info/glossary-uid.md#gl-sharing-participant) with the resources, processes, and facilities in place to ensure that the raw UID2s are not compromised, and will follow standard security practices as defined in [Security Requirements for UID2 Sharing](sharing-security.md).
