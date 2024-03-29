---
title: Overview of Sharing
description: Learn about sharing UID2s with other participants.
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

# UID2 Sharing: Overview 

In UID2, sharing is a process for distributing either [raw UID2s](../ref-info/glossary-uid.md#gl-raw-uid2) or [UID2 tokens](../ref-info/glossary-uid.md#gl-raw-uid2) securely between UID2 participants.

All instances where a raw UID2 or UID2 token is shared with another participant fall under the definition of sharing, and all instances must follow one of the standard [sharing scenarios](#sharing-scenarios). In addition, sharing of raw UID2s must meet the [security requirements](#security-requirements-for-raw-uid2-sharing).

## Sharing Scenarios

There are several main sharing scenarios, summarized in the following table.

| Sharing scenario | Audience | Sharing methodology | Sharing route | Link for details
| :--- | :--- | :--- | :--- | :--- |
| Sharing in the bid stream | Publisher | Tokenized sharing (UID2 token) | Publisher generates UID2 token and sends it into the bid stream.  | [Tokenized Sharing for Publishers in the Bid Stream](sharing-tokenized.md#tokenized-sharing-for-publishers-in-the-bid-stream) |
| Sharing via a pixel | Any authorized sharer | Tokenized sharing (UID2 token) | Sharing via any pixel, such as a tracking pixel or creative pixel. | [Sharing UID2 Tokens in Pixels](sharing-pixels.md) |
| Sharing with another UID2 sharing participant, outside of the bid steam or pixels. | Any authorized sharer | Raw UID2 sharing or optional tokenized sharing | Sharing by any secure channel, such as via API or Amazon S3 drop. | [Raw UID2 Sharing](#raw-uid2-sharing) |

## UID2 Sharing: Responsibilities

All UID2 participants have a core responsibility to make sure that the UID2 data is protected from unauthorized access or use, in all states including storage and transit.

A key reason for the creation of a UID2 token from a raw UID2 is that the UID2 token is more secure.

In a scenario where a sharing participant wants to share UID2s with another authorized sharing participant, there are two possible paths:

- **UID2 Tokens**:

  1. The sender sets up sharing permissions in the UID2 Portal (see [Sharing Permissions](../portal/sharing-permissions.md)).
  2. The sender encrypts the raw UID2s into UID2 tokens, using one of the UID2 server-side SDKs or the UID2 Snowflake integration.
  3. The receiver decrypts the UID2 sharing tokens into raw UID2s.

- **Raw UID2s**: Both sender and receiver have the resources, processes, and facilities in place to ensure secure transit of the raw UID2s, without risk of compromising the data. In this scenario, as long as all UID2 [security requirements](#security-requirements-for-raw-uid2-sharing) are met, the sender can send raw UID2s to an authorized sharing participant.

## Security Requirements for UID2 Sharing

The security requirements for sharing UID2s between authorized sharing participants include these criteria, which must all be met consistently:

- [Authentication](#authentication)
- [Authorization](#authorization)
- [Accounting](#accounting)
- [Secure Transport](#secure-transport)

### Authentication

In essence, authentication means that you verify that the sharing participant you're working with is who they say they are.

Common ways of achieving this are to require verification via credentials, such as:
- Username and password
- API keys

### Authorization

Essentially, authorization means that you verify that the sharing participant you're working with is authorized to receive the data you're sending -- or to send the data you're receiving. In the context of sharing, this means that the participant has the appropriate role required to access the specific UID2 data. Some examples are the following:

- The receiver has an appropriate security role for all steps of the transmission flow. For example, if transmission is via Amazon AWS, the receiver must have an appropriate security role for the applicable Amazon AWS account.

- The receiver has accepted the terms of the applicable UID2 participation policy. (**GWH_KL note 3/7: "we'll need to confirm with legal that we need that"**)

:::note
Only authorized sharing participants are available for creating a sharing relationship in the UID2 Portal.
:::

### Accounting

Accounting means that there is a record of what happens, so that activity can be reviewed or audited if necessary. The following are some examples of accounting:

- Application logs
- Web server logs
- Cloud storage logs

### Secure Transport

Secure transport is the mechanism that's in place to ensure that the transition of the UID2s from sender to receiver is secure, end to end. There must be no possibility that the UID2s are accessible or modifiable by an onlooker. Examples of secure transport include:

- HTTPS or TLS
- Message-based encryption

>NOTE: ALL the above security points must be in place, continuously, if you are sending or receiving UID2s.
