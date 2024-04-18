---
title: Security Requirements for UID2 Sharing
description: Information about UID2 security, including authentication, authorization, accounting, and secure transport.
hide_table_of_contents: false
sidebar_position: 03
---

# Security Requirements for UID2 Sharing

All UID2 participants have a core responsibility to ensure that the UID2 ecosystem is safe. The following are standard security practices that we recommend all UID2 participants use.

The security requirements for sharing UID2s between authorized sharing participants include these criteria, which must all be met consistently:

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

It's important that authentication includes some type of verification such as two-factor authentication. For example, if the recipient provides an email address, first verify that the individual is the authorized owner of the email address. (**GWH__ I added this based on discussion in meeting 4/18**)

## Authorization

Authorization means that before taking an action, such as sending data, you verify that the recipient of the action is authorized and trusted.

For example, if transmission is facilitated through AWS S3, an authenticated recipient should be granted access via a role specifically for this purpose.

(**GWH__ per TimH and others in meeting 4/18 there needs to be the third party that is the authorization provider ie us... how?**)

## Accounting

Accounting means that there is a record of the transaction, so that activity can be reviewed or audited if necessary. To ensure a comprehensive and attributable transaction log for data transfers between two [sharing participants](ref-info/glossary-uid.md#gl-sharing-participant), it's important to record specific fields that capture the details and context of each transaction.

The following table shows the key fields you should consider including in the transaction log.

| Data | Explanation |
| :--- | :--- |
| Timestamp | The exact date and time when the data transfer occurred. |
| Data recipient ID | The identifier of the participant who is receiving the data. |
| Transaction ID | A unique identifier for each transaction. This ID can be used to track and reference specific transactions in the log. |
| Data volume | The amount of data transferred, typically measured in terms of lines (number of distinct UID2s) or file size (for example, megabytes or gigabytes). |
| Transfer method | The method or protocol used for the data transfer (for example, HTTPS, SFTP, or an S3 presigned URL). |
| Status of transfer | The outcome of the transfer (for example, successful, failed, or partial). |
| Error codes/logs | If the transfer fails or encounters issues, recording error codes or a brief log of the error can assist in diagnosing and resolving the problem. |
| Authorization details | Information about who authorized the transfer, including relevant permissions or approvals. |
| Checksum or hash value | A checksum or hash value to verify the integrity of the data after the transfer. This helps in ensuring that the data was not altered during the transfer. |

Additional logs, such as network logs, application logs, and cloud audit logs, can also help by providing additional information such as source and destination IP addresses or cloud platform account IDs.

## Secure Transport

Secure transport protects raw UID2s from being accessible or modifiable by an onlooker during the transition of data from sender to receiver, end to end. Examples of secure transport include:

- HTTPS or TLS
- Message-based encryption