---
title: Advertiser/Data Provider Integration Overview
sidebar_label: Advertiser/Data Provider Integration Overview
description: Overview of integration options for organizations that collect user data and push it to other participants.
hide_table_of_contents: false
sidebar_position: 07
---

import Link from '@docusaurus/Link';

# Advertiser/Data Provider Integration Overview

This guide provides an overview of integration options for organizations that collect user data and push it to other UID2 participants. Data collectors include advertisers, data on-boarders, measurement providers, identity graph providers, third-party data providers, and any other organizations that send data to other participants.

## Advertiser/Data Provider Routes to Use UID2

Within the ad tech industry, advertisers use identity to build audiences, track conversions, and generate their graphs. As an advertiser, or as a data provider acting on behalf of an advertiser, the following table shows some examples of how you can accomplish some of these goals with UID2.

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

## High-Level Steps

At a high level, the steps for advertisers and data providers integrating with UID2 are as follows:

1. Generate a raw UID2 from <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link>, or receive UID2s from another UID2 participant such as a data provider acting on your behalf.

2. Store the raw UID2 and the salt bucket ID returned from the identity mapping service.

3. Use the UID2s you received in Step 1. For example, you might do one or more of the following:
   - Do some manipulation: for example, combine UID2s you generated from DII and UID2s received from another participant such as an advertiser or data provider.
   - Add new UID2s into an existing audience.

4. Use the raw UID2s for some purpose such as:

   - Send stored raw UID2s to DSPs to create audiences and conversions.
   - Use the raw UID2s for measurement.

5. Monitor for salt bucket rotations related to your stored raw UID2s.

6. Periodically, monitor for opt-out status, to be sure that you don't continue using UID2s for users that have recently opted out. For details, see [Monitor for Opt-Out Status](#monitor-for-opt-out-status).

## Summary of Implementation Options

The following table shows the implementation options that are available for advertisers and data providers, for each of the high-level steps. Some steps are managed solely as part of your own custom implementation; some steps can be managed by one or more of the UID2 implementation options available. Click through on each option for applicable documentation.

| High-Level Step | Implementation Options |
| --- | --- |
| 1. Generate raw UID2s | To generate raw UID2s, use any of the following options:<ul><li>Python SDK: see <Link href="../sdks/sdk-ref-python">SDK for Python Reference Guide</Link></li><li>Snowflake: see <Link href="snowflake_integration">Snowflake Integration Guide</Link>, section titled <Link href="snowflake_integration#map-dii">Map DII</Link></li><li>AWS Entity Resolution: see <Link href="integration-aws-entity-resolution">AWS Entity Resolution Integration Guide</Link></li><li>Raw HTTP endpoint: <Link href="../endpoints/post-identity-map">POST /identity/map</Link></li></ul>How you store the raw UID2s and their associated salt bucket IDs is your choice. |
| 2. Store raw UID2s and salt bucket IDs | Custom (your choice) |
| 3. Manipulate or combine raw UID2s | Custom (your choice) |
| 4. Send raw UID2s to DSPs or use them for measurement | Custom (your choice) |
| 5. Monitor for salt bucket rotation | Any of the following options:<ul><li>Python SDK: see <Link href="../sdks/sdk-ref-python">SDK for Python Reference Guide</Link></li><li>Snowflake: see <Link href="snowflake_integration">Snowflake Integration Guide</Link>, section titled <Link href="snowflake_integration#monitor-for-salt-bucket-rotation-and-regenerate-raw-uid2s">Monitor for Salt Bucket Rotation and Regenerate Raw UID2s</Link></li><li>Raw HTTP endpoint: <Link href="../endpoints/post-identity-buckets">POST /identity/buckets</Link></li></ul> |
| 6. Monitor for opt-out status | API call to the [POST /optout/status](../endpoints/post-optout-status.md) endpoint: see [Monitor for Opt-Out Status](#monitor-for-opt-out-status) |

## Integration Diagram

The following diagram outlines the steps that data collectors must complete to map DII to raw UID2s for audience building and targeting.

DII refers to a user's normalized email address or phone number, or the normalized and SHA-256-hashed email address or phone number.

<!-- ![Advertiser Flow](images/advertiser-flow-overview-mermaid.png) -->

[![Advertiser/Data Provider Flow: Overview](https://mermaid.ink/img/pako:eNqNVFtr21AM_ivCz25Kmz6FUSjzLmGUhrpjMPKiHCvJofGRdy4pofS_T7KdxO1S1kCIY0v6bvJ5zgxXlE0ygEB_EjlDhcWVx3ruQD4N-miNbdBFuClmgAFuqi35mAL58wIjwszz1lbk_234OS0utaP9vWvIY-QTZUU5625umBu4GME3clpLgODxqWtfeq6hmE5HXalwObu-1icTuDjDEZTkKq1XESGCYRfROutW2gQp6BU6KIsfeTv0-8PDDKSnYetiDqXjp-UGHykH9nDzq4QvLtq4g3sKvEnRsuuRFVOghYAiLwRZRBHENR3JonAJuImwSOaRIkyLvlkAj_xlikifwOUIbtHZJm1Us8AbrhfWHeeFXMc7SUjmRlbDgv4aT61LqbIaXGhxRbnkE4RwENCBsWOBYWeFLSzlO-TnOaJKDOKfkmhRdpykSsVVRya9jjcJjDWB_fDTg_-bgHQeQjiiDN0eq9v3ZMhuaYgSOhihKRhGtyY0ZOzSqg5byzpg3bxH3IzgM9eyjn2E-0nD8WKGPuu9aBMePh99Wvjr6fJN4rCWzTdrdCuqRDC14ekuqvkIjp4Orr4ntxou17DhAwvWRn71OnJu4hmnKEJQ3t_TjlydeJl6_bO78gHOZYjMOO9mHPI7LeFqmFhqqtbabsCeBHxVO9yu1dcTDOpXzVsa2v4h7Vme1eRrtJUcac96e57JjJrm2UQuxQTRM8_m7kUqMUUud85kk-gT5ZnntFpnkyVugvzr6PaH4eEuVermbXdmtkdnnskh9pt5X_PyF8MiupQ?type=png)](https://mermaid.live/edit#pako:eNqNVFtr21AM_ivCz25Kmz6FUSjzLmGUhrpjMPKiHCvJofGRdy4pofS_T7KdxO1S1kCIY0v6bvJ5zgxXlE0ygEB_EjlDhcWVx3ruQD4N-miNbdBFuClmgAFuqi35mAL58wIjwszz1lbk_234OS0utaP9vWvIY-QTZUU5625umBu4GME3clpLgODxqWtfeq6hmE5HXalwObu-1icTuDjDEZTkKq1XESGCYRfROutW2gQp6BU6KIsfeTv0-8PDDKSnYetiDqXjp-UGHykH9nDzq4QvLtq4g3sKvEnRsuuRFVOghYAiLwRZRBHENR3JonAJuImwSOaRIkyLvlkAj_xlikifwOUIbtHZJm1Us8AbrhfWHeeFXMc7SUjmRlbDgv4aT61LqbIaXGhxRbnkE4RwENCBsWOBYWeFLSzlO-TnOaJKDOKfkmhRdpykSsVVRya9jjcJjDWB_fDTg_-bgHQeQjiiDN0eq9v3ZMhuaYgSOhihKRhGtyY0ZOzSqg5byzpg3bxH3IzgM9eyjn2E-0nD8WKGPuu9aBMePh99Wvjr6fJN4rCWzTdrdCuqRDC14ekuqvkIjp4Orr4ntxou17DhAwvWRn71OnJu4hmnKEJQ3t_TjlydeJl6_bO78gHOZYjMOO9mHPI7LeFqmFhqqtbabsCeBHxVO9yu1dcTDOpXzVsa2v4h7Vme1eRrtJUcac96e57JjJrm2UQuxQTRM8_m7kUqMUUud85kk-gT5ZnntFpnkyVugvzr6PaH4eEuVermbXdmtkdnnskh9pt5X_PyF8MiupQ)

<!-- diagram source: resource/advertiser-flow-overview-mermaid.md.bak -->

Refer to the following sections for details about the different parts of the diagram:
1. [Generate a raw UID2 for DII](#generate-a-raw-uid2-for-dii)
2. [Send stored raw UID2s to DSPs to create audiences or conversions](#send-stored-raw-uid2s-to-dsps-to-create-audiences-or-conversions)
3. [Monitor for salt bucket rotations related to your stored raw UID2s](#monitor-for-salt-bucket-rotations-related-to-your-stored-raw-uid2s)

### Generate a raw UID2 for DII

For instructions for generating a raw UID2 from DII, refer to one of the following:

- Python SDK: [Map DII to Raw UID2s](../sdks/sdk-ref-python.md#map-dii-to-raw-uid2s).

- Snowflake: [Map DII](snowflake_integration.md#map-dii).

- AWS Entity Resolution: [AWS Entity Resolution Integration Guide](integration-aws-entity-resolution.md).

- HTTP endpoints: [Generate a raw UID2 for DII](integration-advertiser-dataprovider-endpoints.md#generate-a-raw-uid2-for-dii).

### Send stored raw UID2s to DSPs to create audiences or conversions

Send the `advertising_id` (raw UID2) returned in Step 1 to a DSP while building your audiences. Each DSP has a unique integration process for building audiences; follow the integration guidance provided by the DSP for sending raw UID2s to build an audience.

### Monitor for salt bucket rotations related to your stored raw UID2s

A raw UID2 is an identifier for a user at a specific moment in time. The raw UID2 for a specific user changes at least once per year, as a result of the salt rotation. 

Even though each salt bucket is updated approximately once per year, individual bucket updates are spread over the year. Approximately 1/365th of all salt buckets are rotated daily.

:::important
To help ensure that your integration has the current raw UID2s, check salt bucket rotation for active users every day.
:::

For instructions for monitoring for salt bucket rotations, refer to one of the following:

- Python SDK: [Monitor Rotated Salt Buckets](../sdks/sdk-ref-python.md#monitor-rotated-salt-buckets).

- Snowflake: [Monitor for Salt Bucket Rotation and Regenerate Raw UID2s](snowflake_integration.md#monitor-for-salt-bucket-rotation-and-regenerate-raw-uid2s).

- HTTP endpoints: [Monitor for salt bucket rotations related to your stored raw UID2s](integration-advertiser-dataprovider-endpoints.md#monitor-for-salt-bucket-rotations-related-to-your-stored-raw-uid2s).

## Use an Incremental Process to Continuously Update Raw UID2s

To keep your UID2-based audience information accurate and up to date, follow these integration steps every day:

1. The response from Step 1, [Retrieve a raw UID2 for DII](#generate-a-raw-uid2-for-dii), contains mapping information. Cache the following:
   - The mapping between DII (`identifier`), raw UID2 (`advertising_id`), and salt bucket (`bucket_id`).
   - The most recent `last_updated` timestamp.
2. Using the results from Step 5, [Monitor for salt bucket rotations related to your stored raw UID2s](#monitor-for-salt-bucket-rotations-related-to-your-stored-raw-uid2s):
   1. Remap any raw UID2 for which the salt buckets have been rotated by retrieving new raw UID2 for those IDs, following Step 1, [Retrieve a raw UID2 for DII](#generate-a-raw-uid2-for-dii).
   2. Use the refreshed UID2s to update audiences or conversions, following Step 2, [Send stored raw UID2s to DSPs to create audiences or conversions](#send-stored-raw-uid2s-to-dsps-to-create-audiences-or-conversions).

## Monitor for Opt-Out Status

It's important to honor user opt-out status. Here are two ways you can check that you have the latest opt-out information:

- The UID2 <Link href="../ref-info/glossary-uid#gl-operator-service">Operator Service</Link> distributes opt-out information to advertisers and data providers via the [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) endpoint.

- Advertisers and data providers can check the opt-out status of raw UID2s using the [POST&nbsp;/optout/status](../endpoints/post-optout-status.md) endpoint.

For details about the UID2 opt-out workflow and how users can opt out, see [User Opt-Out](../getting-started/gs-opt-out.md).

## FAQs

For a list of frequently asked questions for advertisers and data providers using the UID2 framework, see [FAQs for Advertisers and Data Providers](../getting-started/gs-faqs.md#faqs-for-advertisers-and-data-providers).
