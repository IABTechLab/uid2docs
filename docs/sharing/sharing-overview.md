---
title: Overview of Sharing
description: Learn about sharing UID2s with other participants.
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# UID2 Sharing: Overview 

In UID2, sharing is a process for distributing either [raw UID2s](../ref-info/glossary-uid.md#gl-raw-uid2) or [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) between UID2 participants.

All instances where a raw UID2 or UID2 token is shared with another participant fall under the definition of sharing. All sharing participants who send raw UID2s must follow the security requirements specified in the standard security practices. For details, see [Security Requirements for UID2 Sharing](sharing-security.md). We encourage all participants who are sharing UID2 tokens to follow these steps.

## Sharing Participants

In UID2, a sharing participant is a company that takes part in distributing raw UID2s or UID2 tokens from one UID2 participant to another, either as a sender or a receiver.

A sharing participant can be a publisher, advertiser, DSP, or data provider, or might have more than one of these roles.

## Approved Sharing Scenarios

There are several main sharing scenarios, summarized in the following table. 

For examples, see [Sharing UID2s: Use Cases](sharing-use-cases.md).

| Sharing Scenario | Sender | Receiver | Sharing Approach | Sharing Route | Link for Details
| :--- | :--- | :--- | :--- | :--- | :--- |
| Sharing in the bidstream | Publisher | DSP | Sharing UID2 tokens (tokenized sharing) | Publisher generates UID2 token and sends it into the <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link>.  | [Tokenized Sharing in the Bidstream](sharing-tokenized-from-data-bid-stream.md) |
| Sharing via a pixel | Any authorized [participant](../ref-info/glossary-uid.md#gl-sharing-participant) | Any authorized [participant](../ref-info/glossary-uid.md#gl-sharing-participant) | Sharing UID2 tokens (tokenized sharing) | Sharing via any pixel, such as a tracking pixel or creative pixel. | [Tokenized Sharing in Pixels](sharing-tokenized-from-data-pixel.md) |
| Sharing with another UID2 sharing participant, outside of the bidstream or pixels | Any authorized [participant](../ref-info/glossary-uid.md#gl-sharing-participant) | Any authorized [participant](../ref-info/glossary-uid.md#gl-sharing-participant) | Sharing raw UID2s<br/>or<br/>Sharing UID2 tokens (tokenized sharing) | Sharing by any secure channel, such as via API or Amazon S3 drop. | [Raw UID2 Sharing](sharing-raw.md)<br/>or<br/>[Tokenized Sharing from Raw UID2s](sharing-tokenized-from-raw.md) |

## UID2 Sharing Approaches

If a sharing participant wants to share UID2s with another authorized sharing participant, there are two possible paths:

- [Sharing UID2 Tokens](#sharing-uid2-tokens)
- [Sharing Raw UID2s](#sharing-raw-uid2s)

### Sharing UID2 Tokens

The following are the high-level steps for sharing UID2 tokens ([tokenized sharing](../ref-info/glossary-uid.md#gl-tokenized-sharing)):

  1. The sender sets up sharing permissions in the UID2 Portal.

     :::note
     Use of sharing requires an API key (see [API Keys](../portal/api-keys.md)) or client-side key pair (see [Client-Side Integration](../portal/client-side-integration.md)). In the UID2 Portal, configure these values before setting up sharing permissions.
     :::
  2. The sender does either of the following:
  
     - Generates UID2 tokens from DII.
     - Encrypts raw UID2s into UID2 tokens.
  3. The receiver decrypts the UID2 tokens into raw UID2s, following the instructions that apply to the sharing scenario (see [Approved Sharing Scenarios](#approved-sharing-scenarios)).

For more information about the options for sharing UID2 tokens, and links to instructions, see [Tokenized Sharing Overview](sharing-tokenized-overview.md).

### Sharing Raw UID2s

To share raw UID2s, we expect that both the sender and receiver are [sharing participants](ref-info/glossary-uid.md#gl-sharing-participant) who have the resources, processes, and facilities in place to ensure that the raw UID2s are not compromised, and who will follow standard security practices as defined in [Security Requirements for UID2 Sharing](sharing-security.md).
