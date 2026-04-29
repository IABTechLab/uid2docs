---
title: Account Setup
description: Information about setting up a UID2 account.
hide_table_of_contents: false
sidebar_position: 02
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Account Setup

This page provides general information required for you to get your account set up with UID2.

## Contact Info

To get access to the UID2 framework, contact the appropriate team at The Trade Desk listed below. 

If you have an existing relationship with The Trade Desk (the current UID2 Administrator), connect directly with your contact to get started with UID2.

:::note
Contacting The Trade Desk for access is temporary. When the system is moved to independent governance, the governing organizations will manage access requests.
:::

| Your Role | Contact Email |
| :--- | :--- |
| Publisher, App Developer | [UID2publishers@thetradedesk.com](mailto:UID2publishers@thetradedesk.com) |
| Agency, Brand, DSP, SSP, customer data platform (CDP), Data Provider | [UID2partners@thetradedesk.com](mailto:UID2partners@thetradedesk.com) |

## Account Setup Details

When you've expressed interest in UID2, someone will contact you to help work out the details.

As part of account setup, provide the following information:

* Company name: The legal company name to be used in the UID2 contract.

* A primary contact person. This individual becomes the primary administrator for the account. Include these values:
  * Name
  * Email address
  * Job title

### Client-Side Web Integrations

If you'll be requesting UID2 tokens from the client side on the [web](../overviews/overview-publishers.md#web-integrations) rather than in [mobile](../overviews/overview-publishers.md#mobile-integrations) apps, you must also provide a list of **domain names** for your sites. This is a security measure, for client-side implementation only.

:::tip
Only root-level domains are required for account setup. For example, if you're going to implement UID2 to generate tokens on the client side on example.com, shop.example.com, and example.org, you only need to provide the domain names example.com and example.org.
:::
 
### Client-Side Mobile Integrations

If you'll be requesting UID2 tokens from the client side in [mobile apps](../guides/integration-mobile-client-side.md), it's important to provide a complete list of all your mobile app IDs, including:

- Android App ID: any that apply.
- iOS/tvOS Bundle ID and corresponding iOS App Store ID: any that apply.

## Credentials

When you've signed a contract for participating in UID2, we'll give you [UID2 credentials](gs-credentials.md) and additional information for getting up and running with UID2.

## API Version

The current version of the UID2 API is v2.
