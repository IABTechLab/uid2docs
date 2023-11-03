---
title: Data Providers
description: Information summary for data providers.
hide_table_of_contents: false
sidebar_position: 08
use_banner: true
banner_title: UID2 Overview for Data Providers
banner_description: An identity solution for the future.
---

Data and measurement providers can reduce identity fragmentation by adopting Unified ID 2.0 to connect data with a more durable, omnichannel and cross-device identifier to fulfill their customer use cases.

The following sections break down the workflows, integration types and documentation for data providers adopting UID2.

## Audience

This page is for partners offering data or related services for online or offline advertising, such as providers of the following:
- Data onboarding
- Third-party audiences
- Identity resolution and graphs
- Measurement and attribution

## Benefits of UID2 for Data Providers

Here are just some of the intended benefits for data providers using UID2:
- Upgrade to a more privacy-conscious identifier which offers opt-out for consumer privacy control.
- Facilitate the use of a connective identity thread between platforms and channels for resolution, activation, and measurement.
- Aim to future-proof audience segments with deterministic IDs for advertisers.
- Connect online and offline data with a common ID to aim for more precision.
- More accurately measure campaigns with or without third-party cookies.

## Resources

The following documentation resources are available for data providers to implement UID2.

| Integration Type | Documentation | Content Description | Audience |
| :--- | :--- | :--- | :--- |
| Integration Guide | [Advertiser/Data Provider Integration Guide](../guides/advertiser-dataprovider-guide.md) | This integration guide for advertisers and data providers covers integration workflows for mapping identity for audience-building and targeting. | Advertisers,<br/>Data Providers |
| Snowflake | [Snowflake Integration Guide](../guides/snowflake_integration.md) | Instructions for generating UIDs from emails within Snowflake. | Advertisers,<br/>Data Providers |
| AWS Entity Resolution | [AWS Entity Resolution Integration Guide](../guides/integration-aws-entity-resolution.md) | Instructions for integrating with the UID2 framework using AWS Entity Resolution. | Advertisers,<br/>Data Providers |

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

## Workflow for Data Providers

The following steps provide a high-level outline of the workflow intended for organizations that collect user data and push it to DSPs—for example, advertisers, identity graph providers, and third-party data providers.

The following process occurs in the background:
* *Data provider monitors the UID2 Operator for rotated salt buckets and updates UID2s as needed.

The following steps are an example of how an advertiser or data provider can integrate with UID2:

1. Data provider sends a user’s consented [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) to the UID2 Operator.
2. UID2 Operator generates and returns a raw UID2 and salt bucket ID.
3. Data provider stores the UID2 and salt bucket ID and sends the UID2-based first-party and third-party audience segments to the DSP. 

   Server-side: The data provider stores the UID2 in a mapping table, DMP, data lake, or other server-side application.

![Data Provider Workflow](images/UID2AdvertiserAndThirdPartyDataProviderWorkflow.jpg)

## Integration Requirements

To generate UID2s from users' DII, third-party data providers must meet the following requirements:

- Integrate with a UID2 Operator to generate UID2s and handle salt bucket rotations.
- Have access to the UID2 Operator APIs.<br/>Some advertisers may choose to work through CDPs, data on-boarders, or other service providers instead.

For details, see [Advertiser/Data Provider Integration Guide](../guides/advertiser-dataprovider-guide.md).

## FAQs for Data Providers

For a list of frequently asked questions for data providers using the UID2 framework, see [FAQs for Advertisers and Data Providers](../getting-started/gs-faqs.md#faqs-for-advertisers-and-data-providers).
