---
title: The UID2 Operator
description: Information about Public and Private Operators and the differences between them.
hide_table_of_contents: false
sidebar_position: 06
---

import Link from '@docusaurus/Link';

# The UID2 Operator

The UID2 Operator Service enables the management and storage of <a href="../ref-info/glossary-uid#gl-encryption-key">encryption keys</a> and [salts](../ref-info/glossary-uid.md#gl-salt) from the UID2 Core Service, hashing of users' personal data (<Link href="../ref-info/glossary-uid#gl-dii">DII</Link>), encryption of [raw UID2s](../ref-info/glossary-uid.md#gl-raw-uid2), and decryption of <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link>.

All instances of the Operator Service are designed with rigorous protections in place to keep critical UID2 data secure and interoperable, regardless of who operates the service.

## UID2 Operator: Overview

There can be multiple instances of the Operator Service, operated by multiple participants. Each of these participants is known as a UID2 Operator.

A UID2 Operator is an organization that runs the Operator Service. Operators periodically perform multiple tasks including the following:

- Receive and store up-to-date encryption keys and salts from the UID2 Core Service.
- Salt and hash <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> to return raw UID2s.
- Encrypt raw UID2s to generate UID2 tokens.
- Distribute UID2 token decryption keys to server-side SDKs (see [SDKs: Summary](../sdks/summary-sdks.md)).
- Download the latest user opt-out information from the UID2 <a href="glossary-uid#gl-opt-out-service">Opt-Out Service</a>.
- Support a number of UID2 endpoints. For details, see [UID2 Endpoints: Summary](../endpoints/summary-endpoints.md).

UID2 Operators fall into two categories:

- [Public Operators](#public-operators)
- [Private Operators](#private-operators)

The Operator is the operational code of UID2&#8212;the code that turns an email into a raw UID2 or a UID2 token, and that a participant who is sharing uses to refresh decryption keys.

## Public Operators

A Public Operator is a UID2 Operator instance that is available to all relevant UID2 participants. Public Operators run publicly available instances of the Operator Service and make them available to participants.

In most cases, UID2 participants use a Public Operator.

The Public Operator is owned and managed by the UID2 administration. For example, The Trade Desk currently serves as a Public Operator for the UID2 framework, available to all participants. If other Public Operators are available, a participant can choose which operator to work with.

## Public Operator: Benefits

When you use a Public Operator, there is no additional work for you to do to host, configure, maintain, or update the Operator. All you need to do is configure your integration to use an SDK or to call the UID2 endpoints.

There is no cost, to the participant, for using a Public Operator.

The participant must sign a contract (see [Account Setup](../getting-started/gs-account-setup.md)) to get the applicable credentials (see [UID2 Credentials](../getting-started/gs-credentials.md)) to use the UID2 APIs hosted on the Public Operator.

:::note
With a Public Operator, data leaves the participant's infrastructure and is sent to the Operator. Rigorous security measures are in place to help protect the data within the Public Operator.
:::

## Private Operators

A Private Operator is a private instance of the UID2 Operator. This means that a specific entity hosts a private instance exclusively for their own use.

Any participant can also choose to become a Private Operator to generate and manage their UID2s. However, becoming a Private Operator includes several additional steps, and uses resources that the participant must provide.

For details, see [Private Operator Integrations](../guides/integration-options-private-operator.md).

## Summary

For most participants, Public Operator is the simplest solution.

The down side of the Private Operator option is that it requires ongoing engineering effort to build and maintain. Because a Private Operator instance is managed by the participant, there are continual updates and changes that are required and must be completed within a specified time frame.

A Public Operator integration is a much easier option than hosting your own instance. There is no cost to the participant, and virtually no engineering work is needed other than initial setup and configuration.

For these reasons, we recommend choosing a Public Operator. 
