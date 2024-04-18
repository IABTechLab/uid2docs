---
title: Security Within UID2 Sharing
description: Information about UID2 security, including authentication, authorization, accounting, and secure transport.
hide_table_of_contents: false
sidebar_position: 03
---

# Security Within UID2 Sharing

All UID2 participants have a core responsibility to make sure that the UID2 data is protected from unauthorized access or use, in all states including storage and transit.

The security guidelines for sharing UID2s between authorized sharing participants include these criteria, which must all be met consistently:

- [Authentication](#authentication)
- [Authorization](#authorization)
- [Accounting](#accounting)
- [Secure Transport](#secure-transport)

:::important
**All** these security points must be in place, continuously, if you are sending or receiving UID2s.
:::

## Authentication

Authentication means that you verify that the sharing participant you're working with is who they say they are.

Common ways of achieving this are to require verification via credentials, such as:
- Username and password
- API keys

## Authorization

Authorization means that you verify that the sharing participant you're working with is authorized to receive the data that you're sending&#8212;or to send the data that you're receiving. In the context of sharing, this means that the participant has the appropriate role required to access the specific UID2 data. Some examples are the following:

- The receiver has accepted the terms of the applicable UID2 participation policy.
- The receiver has an appropriate security role for all steps of the transmission flow. For example, if transmission is via Amazon AWS, the receiver must have an appropriate security role for the applicable Amazon AWS account.

## Accounting

Accounting means that there is a record of the transaction, so that activity can be reviewed or audited if necessary. The following are some examples of accounting:

- Application logs
- Web server logs
- Cloud storage logs

## Secure Transport

Secure transport protects raw UID2s from being accessible or modifiable by an onlooker during the transition of data from sender to receiver, end to end. Examples of secure transport include:

- HTTPS or TLS
- Message-based encryption