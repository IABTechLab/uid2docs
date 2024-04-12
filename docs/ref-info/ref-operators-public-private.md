---
title: The UID2 Operator
description: Information about Public and Private Operators and the differences between them.
hide_table_of_contents: false
sidebar_position: 06
---

# The UID2 Operator

The UID2 Operator Service enables the management and storage of encryption keys and [salts](../ref-info/glossary-uid.md#gl-salt) from the UID2 Core Service, hashing of users' personal data ([DII](../ref-info/glossary-uid.md#gl-dii)), encryption of [raw UID2s](../ref-info/glossary-uid.md#gl-raw-uid2), and decryption of [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token).

All instances of the Operator Service are designed with rigorous protections in place to keep critical UID2 data secure and interoperable, regardless of who operates the service.

## UID2 Operator: Overview

There can be multiple instances of the Operator Service, operated by multiple participants. Each of these participants is known as a UID2 Operator.

A UID2 Operator is simply an organization that runs the Operator Service. Operators receive and store encryption keys and salts from the UID2 Core Service, salt and hash personal data to return raw UID2s, encrypt raw UID2s to generate UID2 tokens, and distribute UID2 token decryption keys.

UID2 Operators fall into two categories:

- [Public Operators](#public-operators)
- [Private Operators](#private-operators)

The Operator is the operational code of UID2&#8212;the code that turns an email into a raw UID2 or a UID2 token, and that a participant who is sharing uses to refresh decryption keys.

## Public Operators

A Public Operator, or Open Operator, is a UID2 Operator instance that is available to all relevant UID2 participants. Public Operators run publicly available instances of the Operator Service and make them available to participants.

In most cases, UID2 participants use a Public Operator.

The Public Operator is owned and managed by the UID2 administration. For example, The Trade Desk currently serves as a Public Operator for the UID2 framework, available to all participants. If other Public Operators are available, a participant can choose which operator to work with.

## Public Operator: Benefits

When you use a Public Operator, there is no additional work for you to do to host, configure, maintain, or update the Operator. All you need to do is configure your integration to use an SDK or to call the UID2 endpoints.

There is no cost, to the participant, for using a Public Operator.

The participant must sign a contract to get the applicable credentials ([API key and client secret](../getting-started/gs-credentials.md#api-key-and-client-secret)) to use the UID2 APIs hosted on the Public Operator.

:::note
With a Public Operator, data leaves the participant's infrastructure and is sent to the Operator. Of course, rigorous measures are in place to keep the data secure.
:::

##  Private Operators

A Private Operator, or Closed Operator, is a private instance of the UID2 Operator. This means that a specific entity hosts a private instance exclusively for their own use.

Any participant can also choose to become a Private Operator to generate and manage UID2s. However, becoming a Private Operator includes several additional steps, and uses resources that the participant must provide.

The participant must host, configure, maintain, and update the Private Operator instance, and must conform to strict security measures. Engineering resources are required to integrate and to make ongoing updates.

The participant must sign a contract to host a Private Operator instance.

:::note
A Private Operator cannot process raw UID2s or UID2 tokens from a Public Operator or another Private Operator. Each Private Operator is a completely closed infrastructure.
:::

## Private Operator: Benefits

Some reasons why a participant might choose to become a Private Operator:

- Within a Private Operator solution, DII does not leave your infrastructure.

- When you have a Private Operator, you're completely in charge of resources. You have more control. For example, you can provide greater availability, without rate limitations.

- If you are not physically located near to a Public Operator instance, you might choose to host a Private Operator solution for latency reasons.

If you have significant security or latency concerns and also have extensive engineering resources to both build and maintain your UID2 implementation, you might consider the Private Operator solution. 

## Summary

For most participants, Public Operator is the best solution.

The down side of the Private Operator option is that it requires ongoing engineering effort to build and maintain. Because a Private Operator instance is managed by the participant, there are continual updates and changes that are required and must be completed within a specified time frame.

A Public Operator integration is a much easier option than creating your own instance. There is no cost to the participant, and virtually no engineering work is needed other than initial setup and configuration.

For these reasons, we recommend choosing a Public Operator. 
