---
title: Advertiser/Data Provider Integration
description: Covers integration steps for organizations that collect user data and push it to other UID2 participants.
hide_table_of_contents: false
sidebar_position: 07
---

# Advertiser/Data Provider Integration Guide

This guide covers integration steps for organizations that collect user data and push it to other UID2 participants. Data collectors include advertisers, data on-boarders, measurement providers, identity graph providers, third-party data providers, and any other organizations that send data to other participants.

<!-- It includes the following sections:

* [Integration Steps](#integration-steps)
   - [Retrieve a raw UID2 for DII using the identity map endpoints](#retrieve-a-raw-uid2-for-dii-using-the-identity-map-endpoints)
   - [Send raw UID2 to a DSP to build an audience](#send-raw-uid2-to-a-dsp-to-build-an-audience)
   - [Monitor for salt bucket rotations related to your stored raw UID2s](#monitor-for-salt-bucket-rotations-related-to-your-stored-raw-uid2s)
   - [Use an incremental process to continuously update raw UID2s](#use-an-incremental-process-to-continuously-update-raw-uid2s)
* [FAQs](#faqs) -->

If you are using an Open Operator service hosted in the Snowflake Data Marketplace, see also [Snowflake Integration Guide](snowflake_integration.md).

## Integration Steps

The following diagram outlines the steps that data collectors must complete to map [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) to UID2 identifiers for audience building and targeting. DII refers to a user's normalized email address or phone number, or the normalized and SHA-256-hashed email address or phone number.

![Advertiser Flow](https://mermaid.ink/svg/eyJjb2RlIjoiICBzZXF1ZW5jZURpYWdyYW1cbiAgICBwYXJ0aWNpcGFudCBEUCBhcyBEYXRhIFByb3ZpZGVyXG4gICAgcGFydGljaXBhbnQgVUlEMiBhcyBVSUQyIFNlcnZpY2VcbiAgICBwYXJ0aWNpcGFudCBEU1BcbiAgICBsb29wIDEuIFJldHJpZXZlIGEgVUlEMiBmb3IgUElJIHVzaW5nIHRoZSBpZGVudGl0eSBtYXAgZW5kcG9pbnRzLlxuICAgIERQLT4-VUlEMjogMS1hLiBTZW5kIGEgcmVxdWVzdCBjb250YWluaW5nIFBJSSB0byB0aGUgaWRlbnRpdHkgbWFwcGluZyBlbmRwb2ludHMuXG4gICAgVUlEMi0-PkRQOiAxLWIuIFN0b3JlIHRoZSBVSUQyIGFuZCBzYWx0IGJ1Y2tldCByZXR1cm5lZCBmcm9tIHRoZSBpZGVudGl0eSBtYXBwaW5nIHNlcnZpY2UuXG4gICAgZW5kXG4gICAgRFAtLT4-RFNQOiAyLiBTZW5kIHN0b3JlZCBVSUQycyB0byBEU1BzIHRvIGNyZWF0ZSBhdWRpZW5jZXMuXG5cbiAgICBsb29wIDMuIE1vbml0b3IgZm9yIHNhbHQgYnVja2V0IHJvdGF0aW9ucyByZWxhdGVkIHRvIHlvdXIgc3RvcmVkIFVJRDJzLlxuICAgICAgIERQLT4-VUlEMjogMy1hLiBNb25pdG9yIHNhbHQgYnVja2V0IHJvdGF0aW9ucyB1c2luZyB0aGUgYnVja2V0IHNlcnZpY2UuXG4gICAgICAgVUlEMi0-PkRQOiAzLWIuIFJldHVybiBzYWx0IGJ1Y2tldHMgcm90YXRlZCBzaW5jZSBhIGdpdmVuIHRpbWVzdGFtcC5cbiAgICAgICBEUC0-PlVJRDI6IDMtYy4gQ29tcGFyZSB0aGUgcm90YXRlZCBzYWx0IGJ1Y2tldHMgdG8gc3RvcmVkIFVJRDIgc2FsdCBidWNrZXRzLjxicj5JZiByb3RhdGVkLCByZXNlbmQgUElJIHRvIGlkZW50aXR5IG1hcHBpbmcgc2VydmljZSBmb3IgYSBuZXcgVUlEMi5cbiAgICAgICBVSUQyLT4-RFA6IDMtZC4gU3RvcmUgdGhlIFVJRDIgYW5kIHNhbHQgYnVja2V0IHJldHVybmVkIGZyb20gdGhlIGlkZW50aXR5IG1hcHBpbmcgc2VydmljZS5cbiAgICBlbmRcbiIsIm1lcm1haWQiOnsidGhlbWUiOiJmb3Jlc3QifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)

### Retrieve a raw UID2 for DII using the identity map endpoints

| Step | Endpoint | Description |
| --- | --- | --- |
| 1-a | [POST /identity/map](../endpoints/post-identity-map.md) request | Send a request containing DII to the identity mapping endpoint. |
| 1-b | [POST /identity/map](../endpoints/post-identity-map.md) response | The `advertising_id` (raw UID2) returned in the response can be used to target audiences on relevant DSPs.<br/>The response returns a user's raw UID2 and the corresponding `bucket_id` for the salt bucket. The salt assigned to the bucket rotates annually, which impacts the generated UID2. For details on how to check for salt bucket rotation, see [Monitor for salt bucket rotations](#monitor-for-salt-bucket-rotations-related-to-your-stored-raw-uid2s).<br/>For ease of maintenance, a recommended approach is to store a user's raw UID2 and `bucket_id` in a mapping table. For guidance on incremental updates, see [Use an incremental process to continuously update raw UID2s](#use-an-incremental-process-to-continuously-update-raw-uid2s). |

### Send raw UID2 to a DSP to build an audience

Send the `advertising_id` (raw UID2) returned in the [preceding step](#retrieve-a-raw-uid2-for-dii-using-the-identity-map-endpoints) (Step 1-b) to a DSP while building your audiences. Each DSP has a unique integration process for building audiences. Follow the integration guidance provided by the DSP for sending raw UID2s to build an audience.

### Monitor for salt bucket rotations related to your stored raw UID2s
A raw UID2 is an identifier for a user at a specific moment in time. The raw UID2 for a specific user changes at least once per year, as a result of the salt rotation. 

Even though each salt bucket is updated approximately once a year, individual bucket updates are spread over the year. Approximately 1/365th of all salt buckets are rotated daily.

>IMPORTANT: To ensure that your integration has the current raw UID2s, check salt bucket rotation for active users every day.

| Step | Endpoint | Description |
| --- | --- | --- |
| 3-a | [POST /identity/buckets](../endpoints/post-identity-buckets.md) | Send a request to the bucket status endpoint for all salt buckets that have changed since a specific timestamp. |
| 3-b | [POST /identity/buckets](../endpoints/post-identity-buckets.md) | The bucket status endpoint returns a list of `bucket_id` and `last_updated` timestamps. |
| 3-c | [POST /identity/map](../endpoints/post-identity-map.md) | Compare the returned `bucket_id` to the salt buckets of raw UID2s that you've cached.<br/>If you find that the salt bucket was updated for one or more raw UID2s, re-send the DII to the identity mapping service for a new UID2. |
| 3-d | [POST /identity/map](../endpoints/post-identity-map.md) | Store the new values returned for `advertising_id` and `bucket_id`. |

### Use an incremental process to continuously update raw UID2s

To keep your UID2-based audience information accurate and up to date, follow these integration steps every day.

1. The response from the [UID2 retrieval step](#retrieve-a-raw-uid2-for-dii-using-the-identity-map-endpoints) contains mapping information. Cache the mapping between DII (`identifier`), raw UID2 (`advertising_id`), and salt bucket (`bucket_id`), along with the most recent `last_updated` timestamp.

2. Using the results from the [preceding salt bucket rotation step](#monitor-for-salt-bucket-rotations-related-to-your-stored-raw-uid2s), remap any raw UID2 for which the salt buckets have been rotated by [retrieving raw UID2s using the identity map endpoints](#retrieve-a-raw-uid2-for-dii-using-the-identity-map-endpoints). To update the UID2s in audiences, [send raw UID2 to a DSP](#send-raw-uid2-to-a-dsp-to-build-an-audience).

## FAQs

For a list of frequently asked questions for advertisers and data providers using the UID2 framework, see [FAQs for Advertisers and Data Providers](../getting-started/gs-faqs.md#faqs-for-advertisers-and-data-providers).

For a full list, see [Frequently Asked Questions](../getting-started/gs-faqs.md).
