---
title: Account Setup
description: Information about setting up a UID2 account.
hide_table_of_contents: false
sidebar_position: 02
---

import Link from '@docusaurus/Link';

# Account Setup

This page provides general information required for you to get your account set up with UID2.

## Contact Info

To get access to the UID2 framework, contact the appropriate team at The Trade Desk listed below. 

If you have an existing relationship with The Trade Desk, the current UID2 Administrator, connect directly with your contact to get started with UID2.

:::note
Contacting The Trade Desk for access is temporary. When the system is moved to independent governance, the governing organizations will manage access requests.
:::

| Your Role | Contact Email |
| :--- | :--- |
| Publisher, App Developer | [UID2publishers@thetradedesk.com](mailto:UID2publishers@thetradedesk.com) |
| Agency, Brand, DSP, SSP, customer data platform (CDP), Data Provider | [UID2partners@thetradedesk.com](mailto:UID2partners@thetradedesk.com) |

## Account Setup Details

Once you've expressed interest in UID2, someone will contact you to help work out the details.

All participants will need to provide at least the following information:
* Name
* Email address
* Company name
* Name and contact information for an authorized individual who can sign the contract.

### Client-Side Implementation for Publishers

If you're a publisher publishing to [web](../overviews/overview-publishers.md#web-integrations) rather than [mobile](../overviews/overview-publishers.md#mobile-integrations), and you determine that you want to implement UID2 so that tokens are generated on the client side, you'll also need to provide a list of **domain names** for your sites. This is a security measure, for client-side implementation only.

:::tip
Only root-level domains are required for account setup. For example, if you're going to implement UID2 to generate tokens on the client side on example.com, shop.example.com, and example.org, you only need to provide the domain names example.com and example.org.
:::

### Client-Side Mobile Integrations

If you're publishing to [mobile apps](../guides/integration-mobile-client-side.md), you'll need to provide a list of <Link href="../ref-info/glossary-uid#gl-app-name">app names</Link> for all the mobile apps that you'll be integrating with the UID2 mobile SDKs, including any of these values that apply:

- Android Application ID
- iOS Bundle Identifier
- iOS App Store ID

## Credentials

When you've signed a contract for participating in UID2, you'll be issued with [UID2 credentials](gs-credentials.md) and other information for getting up and running with UID2.

## API Version

The current version of the UID2 API is UID2 API v2.
