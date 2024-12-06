---
title: Advertiser/Data Provider Integration Overview
sidebar_label: Advertiser/Data Provider Integration Overview
description: Overview of UID2 integration options for organizations that collect user data and push it to other participants.
hide_table_of_contents: false
sidebar_position: 07
displayed_sidebar: sidebarAdvertisers
---

import Link from '@docusaurus/Link';

# Advertiser/Data Provider Integration Overview

There are many ways for advertisers and data providers to integration with UID2. On this page, you'll find a high-level overview of integration steps and integration options, with links to additional information for each option.

These integration options apply to any  organizations that collect user data and push it to other UID2 participants. Data collectors include advertisers, data on-boarders, measurement providers, identity graph providers, third-party data providers, and any other organizations that send data to other participants.

If you are using a Public Operator service hosted in the Snowflake Data Marketplace, see also [Snowflake Integration Guide](snowflake_integration.md).

## Advertiser/Data Provider Routes to Use UID2

Within the ad tech industry, advertisers use identity to build audiences, track conversions, and generate their graphs. The following table shows some examples of how you, as an advertiser or as a data provider acting on behalf of an advertiser, can accomplish some of these goals with UID2.

:::note
There are other ways that you can use UID2, outside these use cases. These are just some examples.
:::

| Send/Receive? | Action | Advantage/Result |
| --- | --- | --- |
| Send | Send UID2s via API or pixels | Create audiences. |
| Send | Send UID2s as conversion information | Use conversion information for measurement (attribution) or for retargeting via API or pixels. |
| Receive | Receive UID2s from graph/data providers via API or pixels | Build graph data. |

<!-- - **Create/send in audiences**: You can send UID2s to create audiences via API or pixels
- **Send in conversions**: You can send UID2s as conversion information that can be used for measurement (attribution) or retargeting via API or pixels
- **Receive graph data**: You can receive UID2s from graph/data providers via API or pixels. -->

## Key Integration Steps

At a high level, to integrate with UID2 as an advertiser or data provider, you'll implement these three key activities:

1. [Retrieve a raw UID2 for DII](#1-retrieve-a-raw-uid2-for-dii)

   Generate a raw UID2 from <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link>, or receive UID2s from another UID2 participant such as a data provider acting on your behalf.
   
2. [Send stored raw UID2s to DSPs to create audiences or conversions](#2-send-stored-raw-uid2s-to-dsps-to-create-audiences-or-conversions)

   Use the UID2s you received in Step 1. For example, you might do one or more of the following:
   - Do some manipulation: for example, combine UID2s you generated from DII and UID2s received from another participant such as an advertiser or data provider.
   - Add new UID2s into an existing audience.

   As part of this step, you'll also need to [monitor for salt bucket rotations related to your stored raw UID2s](#3-monitor-for-salt-bucket-rotations-related-to-your-stored-raw-uid2s).

3.  Use the raw UID2s for some purpose such as measurement.

There are several ways you can accomplish these key steps.

## Integration Options Summary

The following integration options are available for advertisers and data providers.

| Integration Option | Integration Guide | Content Description |
| :--- | :--- | :--- |
| Client-Side JavaScript SDK |[Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md) <!-- UID2_only: Not applicable for EUID --> | A guide for advertisers and data providers who want to use this SDK for adding a UID2 token to their tracking pixels.<!-- UID2_only: Not applicable for EUID --> |
| Snowflake | [Snowflake Integration Guide](snowflake_integration.md) | Instructions for generating UID2s from emails within Snowflake. |
| AWS Entity Resolution | [AWS Entity Resolution Integration Guide](integration-aws-entity-resolution.md) | Instructions for integrating with the UID2 framework using AWS Entity Resolution. |
| Direct integration (API endpoints) | [xxx TBD](advertiser-dataprovider-identity-map.md) | Information about integrating directly to UID2 endpoints rather than using other integration options. |

## Integration Diagram

The following diagram outlines the steps that data collectors must complete to map DII to raw UID2s for audience building and targeting.

DII refers to a user's normalized email address or phone number, or the normalized and SHA-256-hashed email address or phone number.

![Advertiser Flow](images/advertiser-flow-mermaid.png)

<!-- diagram source: resource/advertiser-flow-mermaid.md.bak -->

Refer to the following sections for details about the different parts of the diagram:
1. [Retrieve a raw UID2 for DII](#1-retrieve-a-raw-uid2-for-dii)
2. [Send stored raw UID2s to DSPs to create audiences or conversions](#2-send-stored-raw-uid2s-to-dsps-to-create-audiences-or-conversions)
3. [Monitor for salt bucket rotations related to your stored raw UID2s](#3-monitor-for-salt-bucket-rotations-related-to-your-stored-raw-uid2s)

### 1: Retrieve a raw UID2 from DII

The first step is to retrieve a raw UID2. You can do this by using any of the advertiser/data provider implementation options, summarized in the following table.

[**GWH_SW all the SDKs support Map DII to Raw UID2s. Should I llist them also?**]

| Integration Method | Link to Instructions |
| :--- | :--- |
| Client-Side SDK for JavaScript | [**GWH_SW: Now I'm confused because per https://unifiedid.com/docs/sdks/sdk-ref-javascript#functionality the JS SDK doesn't support generating a raw UID2 from DII. Not sure what we're talking about here, sorry**]<!-- UID2_only: Not applicable for EUID --> |
| Snowflake | Snowflake Integration Guide, these sections:<ul><li>[Access the UID2 Shares](snowflake_integration.md#access-the-uid2-shares)</li><li>[Shared Objects](snowflake_integration.md#shared-objects)</li></ul> |
| AWS Entity&nbsp;Resolution | AWS Integration Guide, this seciton: [Integration Summary](integration-aws-entity-resolution.md#integration-summary) |
| [Direct integration (API&nbsp;endpoints)](advertiser-dataprovider-identity-map.md) | xxx TBD |

### 2: Send stored raw UID2s to DSPs to create audiences or conversions

Send the `advertising_id` (raw UID2) returned in Step 1-b to a DSP while building your audiences. Each DSP has a unique integration process for building audiences; follow the integration guidance provided by the DSP for sending raw UID2s to build an audience.

### 3: Monitor for salt bucket rotations related to your stored raw UID2s
A raw UID2 is an identifier for a user at a specific moment in time. The raw UID2 for a specific user changes at least once per year, as a result of the salt rotation. 

Even though each salt bucket is updated approximately once per year, individual bucket updates are spread over the year. Approximately 1/365th of all salt buckets are rotated daily.

:::important
To ensure that your integration has the current raw UID2s, check salt bucket rotation for active users every day.
:::

| Step | Endpoint | Description |
| --- | --- | --- |
| 3-a | [POST&nbsp;/identity/buckets](../endpoints/post-identity-buckets.md) | Send a request to the bucket status endpoint for all salt buckets that have changed since a specific timestamp. |
| 3-b | [POST&nbsp;/identity/buckets](../endpoints/post-identity-buckets.md) | UID2 service: The bucket status endpoint returns a list of `bucket_id` and `last_updated` timestamps. |
| 3-c | [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) | Compare the returned `bucket_id` to the salt buckets of raw UID2s that you've cached.<br/>If you find that the salt bucket was updated for one or more raw UID2s, re-send the DII to the identity mapping service for a new raw UID2. |
| 3-d | [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) | Store the new values returned for `advertising_id` and `bucket_id`. |

## Use an Incremental Process to Continuously Update Raw UID2s

To keep your UID2-based audience information accurate and up to date, follow these integration steps every day:

1. The response from the [UID2 retrieval step](#1-retrieve-a-raw-uid2-for-dii) contains mapping information. Cache the following:
   - The mapping between DII (`identifier`), raw UID2 (`advertising_id`), and salt bucket (`bucket_id`).
   - The most recent `last_updated` timestamp.
2. Using the results from Step 3, [Monitor for salt bucket rotations related to your stored raw UID2s](#3-monitor-for-salt-bucket-rotations-related-to-your-stored-raw-uid2s), remap any raw UID2 for which the salt buckets have been rotated by retrieving new raw UID2 for those IDs, following Step 1, [Retrieve a raw UID2 for DII](#1-retrieve-a-raw-uid2-for-dii).

   Then, use the refreshed UID2s to update audiences or conversions, following Step 2, [send raw UID2 to a DSP](#2-send-stored-raw-uid2s-to-dsps-to-create-audiences-or-conversions).

## Check Opt-Out Status

It's important to honor user opt-out status. Here are two ways you can check that you have the latest opt-out information:

- The UID2 <Link href="../ref-info/glossary-uid#gl-operator-service">Operator Service</Link> distributes opt-out information to advertisers and data providers via the [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) endpoint.

- Advertisers and data providers can check the opt-out status of raw UID2s using the [POST&nbsp;/optout/status](../endpoints/post-optout-status.md) endpoint.

For details about the UID2 opt-out workflow and how users can opt out, see [User Opt-Out](../getting-started/gs-opt-out.md).

## FAQs

For a list of frequently asked questions for advertisers and data providers using the UID2 framework, see [FAQs for Advertisers and Data Providers](../getting-started/gs-faqs.md#faqs-for-advertisers-and-data-providers).
