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

If you have an existing relationship with The Trade Desk connect directly with your UID2 Administrator to get started with UID2. Otherwise, to get access to the UID2 framework, contact the appropriate team at The Trade Desk listed below. 

| Your Role | Contact Email |
| :--- | :--- |
| Publisher, App Developer | [UID2publishers@thetradedesk.com](mailto:UID2publishers@thetradedesk.com) |
| Agency, Brand, DSP, SSP, customer data platform (CDP), Data Provider | [UID2partners@thetradedesk.com](mailto:UID2partners@thetradedesk.com) |

:::note
Temporary access is granted to The Trade Desk. Once your system is moved to independent governance, the governing organizations will manage access requests instead of The Trade Desk.
:::

## Account Setup Details

When you've expressed interest in UID2, someone from The Trade Desk will contact you.

All UID2 requestors must provide the following information:

* Name
* Email address
* Company name
* Name and contact information for an authorized individual who can sign the contract.

## Client-Side Integration for Publishers

If you're a publisher that plans to integrate UID2 in web or mobile applications, follow these steps for compliance.

### Websites

To implement UID2 and generate tokens on the client side, you must provide a list of **domain names** for your sites. 

:::tip
Only top-level (root-level) domains are required for account setup. For example, if you're going to implement UID2 to generate tokens on the client side on example.com, shop.example.com, and example.org, you only need to provide the domain names example.com and example.org.
:::

### Mobile Apps

If you publish [mobile apps](../guides/integration-mobile-client-side.md), you must provide a list of <Link href="../ref-info/glossary-uid#gl-app-name">app names</Link> for every mobile app that integrates with the UID2 mobile SDKs. 

The list must includes these values:

- Android Application ID
- iOS Bundle Identifier
- iOS App Store ID

## Credentials

Once you sign a contract and are approved for UID2, you'll be issued [UID2 credentials](gs-credentials.md) and more information for getting started with UID2.

## API Version

As of May 2024, the current version  of the UID2 API is v2.