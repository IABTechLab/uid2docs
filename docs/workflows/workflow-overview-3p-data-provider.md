---
title: Advertiser and Data Provider Workflow
description: Workflow for third-party data providers.
hide_table_of_contents: false
sidebar_position: 03
---

# Advertiser and Data Provider Workflow Overview

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
