---
title: Advertisers
description: Information summary for advertisers.
hide_table_of_contents: false
sidebar_position: 04
use_banner: true
banner_title: UID2 Overview for Advertisers
banner_description: Upgrade campaign activation with Unified ID 2.0.
---

Advertisers can upgrade their first-party data tactics with Unified ID 2.0 to deliver omnichannel campaigns across devices with one identifier.

The following sections provide information about benefits, workflow, documentation, and other resources for advertisers adopting UID2.

## Audience

This page is for advertisers who want to leverage first-party data for more durable identity strategies and better addressability.

## Benefits of UID2 for Advertisers

Here are just some of the intended benefits of using UID2 as part of your advertising strategy:
- Use a privacy-conscious form of CRM data in media-buying platforms.
- Simplify identity resolution at the household and individual level.
- Manage frequency and suppress audiences across channels and devices.
- Support identity use cases on Connected TV and Mobile app where cookies don’t exist.
- Target and measure campaigns more holistically.
- Offer opt-out, with the goal of improving consumer privacy controls.

## Workflow for Advertisers

The following steps provide a high-level outline of the workflow intended for organizations that collect user data and push it to DSPs—for example, advertisers, identity graph providers, and third-party data providers.

The following process occurs in the background:
* Data provider monitors the UID2 Operator for rotated salt buckets and updates UID2s as needed.

The following steps are an example of how an advertiser or data provider can integrate with UID2:

1. Data provider sends a user’s consented [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) to the UID2 Operator.
2. UID2 Operator generates and returns a raw UID2 and salt bucket ID.
3. Data provider stores the UID2 and salt bucket ID and sends the UID2-based first-party and third-party audience segments to the DSP. 

   Server-side: The data provider stores the UID2 in a mapping table, DMP, data lake, or other server-side application.

![Data Provider Workflow](images/UID2AdvertiserAndThirdPartyDataProviderWorkflow.jpg)

## Getting Started

To get started, follow these steps:

1. Request access to UID2 by filling out the form on the [Request Access](/request-access) page.

   Someone will contact you to discuss your needs and advise on appropriate next steps.
1. Decide on your [participant](../intro.md#participants) role or roles.
1. Decide which implementation option you want to use.
1. Receive your credentials (see [API keys](../getting-started/gs-api-keys.md)) and follow the instructions in the implementation guide for the option you chose.

     NOTE: Be sure to encrypt request messages to UID2. For details, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).
1. Test.
1. Go live.

## Resources

The following documentation resources are available for advertisers to implement UID2.

| Integration Type| Documentation | Content Description | Audience |
| :--- | :--- | :--- | :--- |
| Integration steps for organizations that collect user data and push it to other UID2 participants | [Advertiser/Data Provider Integration Guide](../guides/advertiser-dataprovider-guide.md) | This integration guide for advertisers and data providers covers integration workflows for mapping identity for audience-building and targeting. | Advertisers,<br/>Data Providers |
| Snowflake | [Snowflake Integration Guide](../guides/snowflake_integration.md) | Instructions for generating UID2s from emails within Snowflake. | Advertisers,<br/>Data Providers |
| AWS Entity Resolution | [AWS Entity Resolution Integration Guide](../guides/integration-aws-entity-resolution.md) | Instructions for integrating with the UID2 framework using AWS Entity Resolution. | Advertisers,<br/>Data Providers |

<!-- ## Integration Requirements

To generate UID2s from users' DII, third-party data providers must meet the following requirements:

- Integrate with a UID2 Operator to generate UID2s and handle salt bucket rotations.
- Have access to the UID2 Operator APIs.<br/>Some advertisers may choose to work through CDPs, data on-boarders, or other service providers instead.

For details, see [Advertiser/Data Provider Integration Guide](../guides/advertiser-dataprovider-guide.md). -->

## FAQs for Advertisers

For a list of frequently asked questions for advertisers using the UID2 framework, see [FAQs for Advertisers and Data Providers](../getting-started/gs-faqs.md#faqs-for-advertisers-and-data-providers).
