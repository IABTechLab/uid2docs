[UID2 Documentation](../../README.md) > v1 > Integration Guides > Advertiser/Data Provider Integration Guide

# Overview

This workflow includes organizations that collect user data and push it to DSPs. Data collectors include advertisers, data on-boarders, measurement providers, identity graph providers, third-party data providers, and other organizations who send data to DSPs.

The following section outlines the steps data providers and advertisers complete to map PII to UID2 identifiers to use in audience-building and targeting. PII refers to a user's normalized email address or SHA256-hashed and normalized email address.

![Advertiser Flow](https://mermaid.ink/svg/eyJjb2RlIjoiICBzZXF1ZW5jZURpYWdyYW1cbiAgICBwYXJ0aWNpcGFudCBEUCBhcyBEYXRhIFByb3ZpZGVyXG4gICAgcGFydGljaXBhbnQgVUlEMiBhcyBVSUQyIFNlcnZpY2VcbiAgICBwYXJ0aWNpcGFudCBEU1BcbiAgICBEUC0-PlVJRDI6IEEtMTogU2VuZCBQSUkgdG8gaWRlbnRpdHkgbWFwcGluZyBzZXJ2aWNlLlxuICAgIFVJRDItPj5EUDogQS0yOiBTdG9yZSB0aGUgVUlEMiBhbmQgc2FsdCBidWNrZXQgcmV0dXJuZWQgZnJvbSB0aGUgaWRlbnRpdHkgbWFwcGluZyBzZXJ2aWNlLlxuICAgIERQLS0-PkRTUDogQi0xLiBTZW5kIHN0b3JlZCBVSUQyIHRvIERTUHMgdG8gY3JlYXRlIGF1ZGllbmNlcy5cbiAgICBsb29wIFNhbHQgQnVja2V0IFJvdGF0aW9uIFVJRDIgUmVmcmVzaFxuICAgICAgIERQLT4-VUlEMjogQy0xOiBNb25pdG9yIHNhbHQgYnVja2V0IHJvdGF0aW9ucyB1c2luZyB0aGUgYnVja2V0IHNlcnZpY2UuXG4gICAgICAgVUlEMi0-PkRQOiBDLTI6IFJldHVybiBzYWx0IGJ1Y2tldHMgcm90YXRlZCBzaW5jZSBhIGdpdmVuIHRpbWVzdGFtcC5cbiAgICAgICBEUC0-PlVJRDI6IEMtMzogQ2hlY2sgaWYgYW55IHN0b3JlZCBVSUQycyBzYWx0IGJ1Y2tldHMgcm90YXRlZC48YnI-SWYgdGhleSBkaWQsIHJlc2VuZCBQSUkgdG8gaWRlbnRpdHkgbWFwcGluZyBzZXJ2aWNlIGZvciBhIG5ldyBVSUQyLlxuICAgICAgIFVJRDItPj5EUDogQy00OiBTdG9yZSB0aGUgVUlEMiBhbmQgc2FsdCBidWNrZXQgcmV0dXJuZWQgZnJvbSB0aGUgaWRlbnRpdHkgbWFwcGluZyBzZXJ2aWNlLlxuICAgIGVuZFxuICAgIFxuIiwibWVybWFpZCI6e30sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)

# Integration Steps

## Workflow A: Retrieve a UID2 for PII using the identity map endpoints.

| Step | Endpoint | Instruction |
| --- | --- | --- |
| 1 | [GET /identity/map](../endpoints/get-identity-map.md)<br>[POST /identity/map](../endpoints/post-identity-map.md) | Send a request containing PII to the identity mapping endpoints. |
| 2 | [GET /identity/map](../endpoints/get-identity-map.md)<br>[POST /identity/map](../endpoints/post-identity-map.md) | The returned `advertising_id` (UID2) can be used to target audiences on relevant DSPs.<br><br>The response returns a user's UID2 and a salt `bucket_id` that rotates annually. When a user's UID2 updates, the salt bucket remains the same. See [Workflow C](#workflow-c-monitor-for-salt-bucket-rotations-related-to-your-stored-uid2s) for how to check for salt bucket rotation.<br><br>We recommend storing a user's UID2 and `bucket_id` in a mapping table for ease of maintenance. See [Workflow D](#workflow-d-use-an-incremental-process-to-continuously-update-uid2s) for guidance on incremental updates. |

## Workflow B: Send UID2 to a DSP to build an audience.
Send the `advertising_id` (UID2) from [Workflow A](#workflow-a-retrieve-a-uid2-for-pii-using-the-identity-map-endpoints) to a DSP while building your audiences. Each DSP has a unique integration process for building audiences. Please follow the integration guidance provided by the DSP for sending UID2s to build an audience.

## Workflow C: Monitor for salt bucket rotations related to your stored UID2s.
Because a UID2 is an identifier for a user at a particular moment in time, a user's UID2 will rotate at least once a year. 

We recommend checking salt bucket rotation daily for active users. While salt buckets rotate annually, the date they rotate may change. Checking salt bucket rotation every day ensures your integration has the current UID2s.

| Step | Endpoint | Instruction |
| --- | --- | --- |
| 1 | [GET /identity/buckets](../endpoints/get-identity-buckets.md) | Send a request to the bucket status endpoint for all salt buckets changed since a given timestamp. |
| 2 | [GET /identity/buckets](../endpoints/get-identity-buckets.md) | The bucket status endpoint will return a list of `bucket_id` and `last_updated` timestamps. |
| 3 | [GET /identity/map](../endpoints/get-identity-map.md)<br>[POST /identity/map](../endpoints/post-identity-map.md) | Compare the returned `bucket_id` to the salt buckets of UID2s you've cached.<br>If a UID2's salt bucket rotated, resent the PII to the identity mapping service for a new UID2. |
| 4 | [GET /identity/map](../endpoints/get-identity-map.md)<br>[POST /identity/map](../endpoints/post-identity-map.md) | Store the returned `advertising_id` and `bucket_id`. |

## Workflow D: Use an incremental process to continuously update UID2s.

Continuously update and maintain UID2-based audiences utilizing the preceding workflows.

The response from [Workflow A](#workflow-a-retrieve-a-uid2-for-pii-using-the-identity-map-endpoints) contains mapping information. Cache the mapping between PII (`identifier`),  UID2 (`advertising_id`), and  salt bucket (`bucket_id`), along with a last updated timestamp.

Using the results of [Workflow C](#workflow-c-monitor-for-salt-bucket-rotations-related-to-your-stored-uid2s), repeat [Workflow A](#workflow-a-retrieve-a-uid2-for-pii-using-the-identity-map-endpoints) to remap UID2s with rotated salt buckets. Repeat [Workflow B](#workflow-b-send-uid2-to-a-dsp-to-build-an-audience) to update the UID2s in audiences.

# Frequently Asked Questions
## How do I know when to refresh the UID2 due to salt bucket rotation?
Metadata supplied with the UID2 generation request indicates the salt bucket used for generating the UID2. Salt buckets persist and correspond to the underlying PII used to generate a UID2. Use the  [GET /identity/buckets](../endpoints/get-identity-buckets.md) endpoint to return which salt buckets rotated since a given timestamp. The returned rotated salt buckets inform you which UID2s to refresh. This workflow typically applies to data providers. 

## How often should UIDs be refreshed for incremental updates?
The recommended cadence for updating audiences is daily. 

## How should I generate the SHA256 of PII for mapping?
The system should follow the [email normalization rules](../../README.md#email-normalization) and hash without salting. The value needs to be base64-encoded before sending.