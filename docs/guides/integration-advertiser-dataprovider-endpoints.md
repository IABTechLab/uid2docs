---
title: Advertiser/Data Provider Integration to HTTP Endpoints
sidebar_label: HTTP Endpoints
description: Integration for organizations that collect user data and push it to other participants, coding to HTTP endpoints rather than an SDK or Snowflake.
hide_table_of_contents: false
sidebar_position: 07
displayed_sidebar: sidebarAdvertisers
---

import Link from '@docusaurus/Link';

# Advertiser/Data Provider Integration to HTTP Endpoints

This guide covers integration steps for advertisers and data providers to integrate with UID2 by writing code to call UID2 HTTP endpoints, rather than using another implementation options such as an SDK, Snowflake, or AWS Entity Resolution.

:::tip
For a summary of all integration options and steps for advertisers and data providers, see [Advertiser/Data Provider Integration Overview](integration-advertiser-dataprovider-overview.md).
:::

## Integration Diagram

The following diagram outlines the steps that data collectors must complete to map DII to raw UID2s for audience building and targeting.

DII refers to a user's normalized email address or phone number, or the normalized and SHA-256-hashed email address or phone number.

![Advertiser Flow](images/advertiser-flow-endpoints-mermaid.png)

<!-- diagram source: resource/advertiser-flow-endpoints-mermaid.md.bak -->


## Detailed Steps

The steps for advertisers and data providers integrating with UID2 by calling the HTTP endpoints are given in the following sections:

1. Generate a raw UID2 from <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link>, or receive UID2s from another UID2 participant such as a data provider acting on your behalf.

    **Instructions**: see [Generate Raw UID2s from DII](#1-generate-raw-uid2s-from-dii).

2. Use the UID2s you received in Step 1. For example, you might do one or more of the following:
   - Do some manipulation: for example, combine UID2s you generated from DII and UID2s received from another participant such as an advertiser or data provider.
   - Add new UID2s into an existing audience.

    **Instructions**: This step is is out of band and entirely up to you.

3. Use the raw UID2s for some purpose such as:
   - Send stored raw UID2s to DSPs to create audiences and conversions.
   - Use the raw UID2s for measurement.

    **Instructions**: see [Send stored raw UID2s to DSPs to create audiences or conversions](#4-send-stored-raw-uid2s-to-dsps-to-create-audiences-or-conversions).

4.	Store the raw UID2 and the salt bucket ID returned from the identity mapping service.

    **Instructions**: This step is is out of band and entirely up to you.

5.	Monitor for salt bucket rotations related to your stored raw UID2s.

    **Instructions**: See [Monitor for salt bucket rotations related to your stored raw UID2s](#5-monitor-for-salt-bucket-rotations-related-to-your-stored-raw-uid2s).

6.	Periodically, monitor for opt-out status, to be sure that you don't continue using UID2s for users that have recently opted out.

    **Instructions**: See [Monitor for Opt-Out Status](#monitor-for-opt-out-status).

### 1: Generate Raw UID2s from DII

| Step | Endpoint | Description |
| --- | --- | --- |
| 1-a | [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) request | Send a request containing DII to the identity mapping endpoint. |
| 1-b | [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) response | The `advertising_id` (raw UID2) returned in the response can be used to target audiences on relevant DSPs.<br/>The response returns a user's raw UID2 and the corresponding `bucket_id` for the salt bucket. The salt assigned to the bucket rotates annually, which impacts the generated raw UID2. For details on how to check for salt bucket rotation, see [5: Monitor for salt bucket rotations related to your stored raw UID2s](#5-monitor-for-salt-bucket-rotations-related-to-your-stored-raw-uid2s). |

### 2: Send stored raw UID2s to DSPs to create audiences or conversions

Send the `advertising_id` (raw UID2) returned in Step 1-b to a DSP while building your audiences. Each DSP has a unique integration process for building audiences; follow the integration guidance provided by the DSP for sending raw UID2s to build an audience.

### 3: Manipulate or Combine Raw UID2s

Use the UID2s you received in Step 1. For example, you might do one or more of the following:

- Do some manipulation: for example, combine UID2s you generated from DII and UID2s received from another participant such as an advertiser or data provider.
- Add new UID2s into an existing audience.

### 4: Send Stored Raw UID2s to DSPs to Create Audiences or Conversions

xxx uptohere TODO

### 5: Monitor for salt bucket rotations related to your stored raw UID2s

A raw UID2 is an identifier for a user at a specific moment in time. The raw UID2 for a specific user changes at least once per year, as a result of the salt rotation. 

Even though each salt bucket is updated approximately once per year, individual bucket updates are spread over the year. Approximately 1/365th of all salt buckets are rotated daily.

:::important
To help ensure that your integration has the current raw UID2s, check salt bucket rotation for active users every day.
:::

| Step | Endpoint | Description |
| --- | --- | --- |
| 5-a | [POST&nbsp;/identity/buckets](../endpoints/post-identity-buckets.md) | Send a request to the bucket status endpoint for all salt buckets that have changed since a specific timestamp. |
| 5-b | [POST&nbsp;/identity/buckets](../endpoints/post-identity-buckets.md) | UID2 service: The bucket status endpoint returns a list of `bucket_id` and `last_updated` timestamps. |
| 5-c | [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) | Compare the returned `bucket_id` to the salt buckets of raw UID2s that you've cached.<br/>If you find that the salt bucket was updated for one or more raw UID2s, re-send the DII to the identity mapping service for a new raw UID2. |
| 5-d | [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) | Store the new values returned for `advertising_id` and `bucket_id`. |

## Monitor for Opt-Out Status

It's important to honor user opt-out status. Here are two ways you can check that you have the latest opt-out information:

- The UID2 <Link href="../ref-info/glossary-uid#gl-operator-service">Operator Service</Link> distributes opt-out information to advertisers and data providers via the [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) endpoint.

- Advertisers and data providers can check the opt-out status of raw UID2s using the [POST&nbsp;/optout/status](../endpoints/post-optout-status.md) endpoint.

For details about the UID2 opt-out workflow and how users can opt out, see [User Opt-Out](../getting-started/gs-opt-out.md).
