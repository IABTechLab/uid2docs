---
title: Overview of UID2 Participants
description: An overview of different types of UID2 participants.
hide_table_of_contents: false
sidebar_position: 06
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Overview of UID2 Participants

With its transparent and interoperable approach, UID2 provides a collaborative framework for many participants across the advertising ecosystem—advertisers, publishers, DSPs, SSPs, single sign-on (SSO) providers, customer data platforms (CDPs), consent management providers (CMPs), identity providers, third-party data providers, and measurement providers.

The following tables list the key participants and their roles in the UID2 [workflows](../ref-info/uid-infrastructure.md#workflows). They are grouped into three categories:

- [UID2 Component Services](#uid2-component-services)
- [UID2 External Participants](#uid2-external-participants)
- [UID2 Consumers](#uid2-consumers)

## UID2 Component Services

The following table summarizes information about key participant components of the UID2 service.

For a diagram of how the different services work together, see [UID2 Workflows](../ref-info/uid-infrastructure.md#workflows).

| Participant | Role Description |
| :--- | :--- |
| **Core Administrator** | An organization (currently, The Trade Desk) that manages the UID2 Core Service and other component services. For example, it distributes encryption keys and salts to UID2 operators and sends user opt-out requests to operators and DSPs. |
| **Operators** | Organizations that run the <Link href="../ref-info/glossary-uid#gl-operator-service">Operator Service</Link> (via the UID2 APIs). Operators periodically receive and store up-to-date encryption keys and salts from the UID2 Core Service, salt and hash <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> to return raw UID2s, encrypt raw UID2s to generate UID2 tokens, and distribute UID2 token decryption keys.<br/>Public Operators (Open Operators) run public instances of the Operator Service. For example, The Trade Desk currently serves as a Public Operator for the UID2 framework, available to all participants. If other Public Operators are available, a participant can choose which operator to work with.<br/>Any participant can also choose to become a Private Operator to generate and manage UID2s. |

## UID2 External Participants

The following table summarizes the main types of external participant partners for UID2.

| Participant | Role Description | Link to Overview Page |
| :--- | :--- | :--- |
| **Publishers** | Organizations that propagate UID2 tokens to the bidstream via SSPs—for example, identity providers, publishers, and SSO providers. Publishers can choose to work with an SSO provider or an independent ID provider that is interoperable with UID2. Independent ID providers can handle the UID2 integration on behalf of publishers. | [UID2 Overview for Publishers](overview-publishers.md) |
| **Advertisers** | Organizations that buy impressions across a range of publisher sites and use DSPs to decide which ad impressions to purchase and how much to bid on them. | [UID2 Overview for Advertisers](overview-advertisers.md) |
| **DSPs** | DSPs integrate with the UID2 system to receive UID2s from advertisers (as first-party data) and third-party data providers (as third-party data) and leverage them to inform bidding on UID2s in the bidstream. | [UID2 Overview for DSPs](overview-dsps.md) |
| **Data Providers** | Organizations that collect user data and push it to other UID2 participants&#8212;for example, advertisers, identity graph providers, and third-party data providers. | [UID2 Overview for Data Providers](overview-data-providers.md) |

## UID2 Consumers

A UID2 consumer is a user who has had a UID2 token or raw UID2 created from an email address or phone number.

UID2 leverages multiple layers of security to help protect user and other participant data. UID2 is a privacy-compliant identifier. With UID2, consumers can enjoy more personalized advertising without compromising privacy.

Consumers can opt out of UID2 in the [Transparency and Control Portal](https://www.transparentadvertising.com/).

<!-- | Participant | Role Description |
| :--- | :--- |
| **Core Administrator** | An organization (currently, The Trade Desk) that manages the UID2 Core Service and other component services. For example, it distributes encryption keys and salts to UID2 operators and sends user opt-out requests to operators and DSPs. |
| **Operators** | Organizations that run the <Link href="../ref-info/glossary-uid#gl-operator-service">Operator Service</Link> (via the UID2 APIs). Operators periodically receive and store up-to-date encryption keys and salts from the UID2 Core Service, salt and hash <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> to return raw UID2s, encrypt raw UID2s to generate UID2 tokens, and distribute UID2 token decryption keys.<br/>Public Operators (Open Operators) run public instances of the Operator Service. For example, The Trade Desk currently serves as a Public Operator for the UID2 framework, available to all participants. If other Public Operators are available, a participant can choose which operator to work with.<br/>Any participant can also choose to become a Private Operator to generate and manage UID2s. |
| **DSPs** | DSPs integrate with the UID2 system to receive UID2s from advertisers (as first-party data) and third-party data providers (as third-party data) and leverage them to inform bidding on UID2s in the bidstream. |
| **Data Providers** | Organizations that collect user data and push it to other UID2 participants&#8212;for example, advertisers, identity graph providers, and third-party data providers. |
| **Advertisers** | Organizations that buy impressions across a range of publisher sites and use DSPs to decide which ad impressions to purchase and how much to bid on them. |
| **Publishers** | Organizations that propagate UID2 tokens to the bidstream via SSPs—for example, identity providers, publishers, and SSO providers. Publishers can choose to work with an SSO provider or an independent ID provider that is interoperable with UID2. Independent ID providers can handle the UID2 integration on behalf of publishers. |
| **Consumers** | Users who have had a UID2 token or raw UID2 created from their email address or phone number. Consumers can opt out of UID2 in the [Transparency and Control Portal](https://www.transparentadvertising.com/). | -->
