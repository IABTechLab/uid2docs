---
title: Overview of Sharing
description: Learn about sharing UID2s with other participants.
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

# UID2 Sharing: Overview 

In UID2, sharing is a process for distributing either [raw UID2s](../ref-info/glossary-uid.md#gl-raw-uid2) or [UID2 tokens](../ref-info/glossary-uid.md#gl-raw-uid2) securely between UID2 participants.

All instances where a raw UID2 or UID2 token is shared with another participant fall under the definition of sharing, and all instances must follow all of the standard [sharing scenarios](#sharing-scenarios). In addition, sharing must meet the [security requirements](#security-requirements-for-uid2-sharing).

In this file:
- [Sharing Scenarios](#sharing-scenarios)
- [UID2 Sharing Approaches](#uid2-sharing-approaches)
  - [Sharing UID2 Tokens](#sharing-uid2-tokens)
  - [Sharing Raw UID2s](#sharing-raw-uid2s)
- [Security Requirements for UID2 Sharing](#security-requirements-for-uid2-sharing)
  - [Authentication](#authentication)
  - [Authorization](#authorization)
  - [Accounting](#accounting)
  - [Secure Transport](#secure-transport)

## Sharing Scenarios

There are several main sharing scenarios, summarized in the following table.

| Sharing Scenario | Sender | Receiver | Sharing Approach | Sharing Route | Link for Details
| :--- | :--- | :--- | :--- | :--- | :--- |
| Sharing in the bid stream | Publisher | DSP | Tokenized sharing (UID2 token) | Publisher generates UID2 token and sends it into the bid stream.  | [Tokenized Sharing in the Bid Stream](sharing-tokenized-from-data-bid-stream.md) |
| Sharing via a pixel | Any authorized sharer | Any authorized sharer | Tokenized sharing (UID2 token) | Sharing via any pixel, such as a tracking pixel or creative pixel. | [Tokenized Sharing in Pixels](sharing-tokenized-from-data-pixel.md) |
| Sharing with another UID2 sharing participant, outside of the bid steam or pixels. | Any authorized sharer | Any authorized sharer | Raw UID2 sharing or optional tokenized sharing | Sharing by any secure channel, such as via API or Amazon S3 drop. | [Raw UID2 Sharing](sharing-raw.md) or [Tokenized Sharing from Raw UID2s](sharing-tokenized-from-raw.md) |

## UID2 Sharing Approaches

If a sharing participant wants to share UID2s with another authorized sharing participant, there are two possible paths:

- [Sharing UID2 Tokens](#sharing-uid2-tokens)
- [Sharing Raw UID2s](#sharing-raw-uid2s)

### Sharing UID2 Tokens

The following are the high-level steps for sharing UID2 tokens ([tokenized sharing](../ref-info/glossary-uid.md#gl-tokenized-sharing)):

  1. The sender sets up sharing permissions in the UID2 Portal (see [Sharing Permissions](../portal/sharing-permissions.md)).
  2. The sender generates a UID2 token from DII (see [Tokenized Sharing in the Bid Stream: Implementation Options](sharing-tokenized-from-bid-stream.md#tokenized-sharing-in-the-bid-stream-implementation-options)), or encrypts raw UID2s into UID2 tokens using [one of the UID2 server-side SDKs](sharing-tokenized-overview.md#implementing-sharing-encryptiondecryption-with-an-sdk) or the [UID2 Snowflake integration](sharing-tokenized-overview.md#implementing-sharing-encryptiondecryption-using-snowflake).
  3. The receiver decrypts the UID2 tokens into raw UID2s, using [one of the UID2 server-side SDKs](sharing-tokenized-overview.md#implementing-sharing-encryptiondecryption-with-an-sdk) or the [UID2 Snowflake integration](sharing-tokenized-overview.md#implementing-sharing-encryptiondecryption-using-snowflake).

For more information about the options for sharing UID2 tokens, see [Tokenized Sharing Overview](sharing-tokenized-overview.md).

### Sharing Raw UID2s

To share raw UID2s, both sender and receiver must have  the resources, processes, and facilities in place to ensure secure transit of the raw UID2s, without risk of compromising the data. In this scenario, as long as all UID2 [security requirements](#security-requirements-for-uid2-sharing) are met, the sender can send raw UID2s to an authorized sharing participant.

## Security Requirements for UID2 Sharing

All UID2 participants have a core responsibility to make sure that the UID2 data is protected from unauthorized access or use, in all states including storage and transit.

The security requirements for sharing UID2s between authorized sharing participants include these criteria, which must all be met consistently:

- [Authentication](#authentication)
- [Authorization](#authorization)
- [Accounting](#accounting)
- [Secure Transport](#secure-transport)

### Authentication

Authentication means that you verify that the sharing participant you're working with is who they say they are.

Common ways of achieving this are to require verification via credentials, such as:
- Username and password
- API keys

### Authorization

Authorization means that you verify that the sharing participant you're working with is authorized to receive the data that you're sending&#8212;or to send the data that you're receiving. In the context of sharing, this means that the participant has the appropriate role required to access the specific UID2 data. Some examples are the following:

- The receiver has accepted the terms of the applicable UID2 participation policy. (**GWH_KL note 3/7: "we'll need to confirm with legal that we need that"**)
- The receiver has an appropriate security role for all steps of the transmission flow. For example, if transmission is via Amazon AWS, the receiver must have an appropriate security role for the applicable Amazon AWS account.

:::note
Only authorized sharing participants are available for creating a sharing relationship in the UID2 Portal.
:::

### Accounting

Accounting means that there is a record of what happens, so that activity can be reviewed or audited if necessary. The following are some examples of accounting:

- Application logs
- Web server logs
- Cloud storage logs

### Secure Transport

Secure transport protects raw UID2s from being accessible or modifiable by an onlooker during the transition of data from sender to receiver, end to end. There must be no possibility that the UID2s can be accessed or modified by an onlooker. Examples of secure transport include:

- HTTPS or TLS
- Message-based encryption

:::important
ALL the above security points must be in place, continuously, if you are sending or receiving UID2s.
:::
