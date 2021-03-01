[UID2 Documentation](../../README.md) > v1 > Integration Guides > Advertiser/Data Provider Integration Guide

# Overview

The following section outlines the steps data providers and advertisers complete to map PII to UID2 identifiers to use in audience-building and targeting. PII refers to a user's normalized email address or SHA256-hashed and normalized email address.

![Advertiser Flow](advertiser-flow-mermaid.png)

# Integration Steps

## 1. Retrieve a UID2 for PII using the identity map endpoints.

Use the [/identity/map](../endpoints/post-identity-map.md) endpoint to map PII to UID2. The UID2 thus returned can be used to target audiences on relevant DSPs and for other use cases.

The response returns a user's UID2 and a salt ```bucket_id``` that rotates annually. When a user's UID2 updates, the salt bucket remains the same. See step 3 for how to check for salt bucket rotation.

We recommend storing a user's UID2 and ```bucket_id``` in a mapping table for ease of maintenance. See step 4 for guidance on incremental updates. 

## 2. Send UID2 to a DSP to build an audience.
Send the UID2 from step 1 to a DSP while building your audiences. Each DSP has a unique integration process for building audiences. Please follow the integration guidance provided by a DSP for sending UID2s to build an audience.

## 3. Check for salt bucket rotations related to your stored UID2s.

Because a UID2 is an identifier for a user at a particular moment in time, a user's UID2 will rotate at least once a year. 

Use the bucket status endpoint [/identity/buckets](../endpoints/get-identity-buckets.md) to return buckets that rotated their salt since a given timestamp. Take the list of returned ```bucket_id``` and compare that to the salt buckets of the UID2 you've cached. If a UID2's salt bucket rotated, use step 1 to refresh the UID2.

We recommend checking salt bucket rotation daily. While salt buckets rotate annually, the date they rotate may change. Checking salt bucket rotation every day ensures your integration has the current UID2s.

## 4. Use an incremental process to update UID2s.

Continuously update and maintain UID2-based audiences utilizing steps 1 and 3.

The response from step 1 contains a UID2 and the ```bucket_id``` for the UID2's salt bucket.

Cache the mapping between PII,  UID2 (```mapped.identifier```), and ```bucket_id``` along with a last updated timestamp.

Using step 3, repeat step 1 to remap UID2s with rotated salt buckets and step 2 to update them in audiences.

# Frequently Asked Questions
## How do I know when to refresh the UID2 due to salt bucket rotation?
Metadata supplied with the UID2 generation request indicates the salt bucket used for generating the UID2. Salt buckets persist and correspond to the underlying PII used to generate a UID2. Use the  [GET /identity/buckets](../endpoints/get-identity-buckets.md) endpoint to return which salt buckets rotated since a given timestamp. The returned rotated salt buckets inform you which UID2s to refresh. This workflow typically applies to data providers. 

## How often should UIDs be refreshed for incremental updates?
The recommended cadence for updating audiences is daily. 

## How should I generate the SHA256 of PII for mapping?
The system should follow the email normalization rules (described in the [Overview document](../../README.md)) and hash without salting. The value needs to be base64-encoded before sending.
