[UID2 API Documentation](../../README.md) > v1 > Integration Guides > Advertiser/Data Provider Integration Guide

# Advertiser/Data Provider Integration Guide

This guide covers integration steps for organizations that collect user data and push it to DSPs. Data collectors include advertisers, data on-boarders, measurement providers, identity graph providers, third-party data providers, and other organizations who send data to DSPs. The guide includes the following sections:

* [Integration Steps](#integration-steps)
* [FAQs](#faqs)


## Integration Steps

The following diagram outlines the steps data collectors need to complete to map PII to UID2 identifiers for audience-building and targeting. PII refers to a user's normalized email address or SHA256-hashed and normalized email address.

![Advertiser Flow](https://mermaid.ink/svg/eyJjb2RlIjoiICBzZXF1ZW5jZURpYWdyYW1cbiAgICBwYXJ0aWNpcGFudCBEUCBhcyBEYXRhIFByb3ZpZGVyXG4gICAgcGFydGljaXBhbnQgVUlEMiBhcyBVSUQyIFNlcnZpY2VcbiAgICBwYXJ0aWNpcGFudCBEU1BcbiAgICBsb29wIDEuIFJldHJpZXZlIGEgVUlEMiBmb3IgUElJIHVzaW5nIHRoZSBpZGVudGl0eSBtYXAgZW5kcG9pbnRzLlxuICAgIERQLT4-VUlEMjogMS1hLiBTZW5kIGEgcmVxdWVzdCBjb250YWluaW5nIFBJSSB0byB0aGUgaWRlbnRpdHkgbWFwcGluZyBlbmRwb2ludHMuXG4gICAgVUlEMi0-PkRQOiAxLWIuIFN0b3JlIHRoZSBVSUQyIGFuZCBzYWx0IGJ1Y2tldCByZXR1cm5lZCBmcm9tIHRoZSBpZGVudGl0eSBtYXBwaW5nIHNlcnZpY2UuXG4gICAgZW5kXG4gICAgRFAtLT4-RFNQOiAyLiBTZW5kIHN0b3JlZCBVSUQycyB0byBEU1BzIHRvIGNyZWF0ZSBhdWRpZW5jZXMuXG5cbiAgICBsb29wIDMuIE1vbml0b3IgZm9yIHNhbHQgYnVja2V0IHJvdGF0aW9ucyByZWxhdGVkIHRvIHlvdXIgc3RvcmVkIFVJRDJzLlxuICAgICAgIERQLT4-VUlEMjogMy1hLiBNb25pdG9yIHNhbHQgYnVja2V0IHJvdGF0aW9ucyB1c2luZyB0aGUgYnVja2V0IHNlcnZpY2UuXG4gICAgICAgVUlEMi0-PkRQOiAzLWIuIFJldHVybiBzYWx0IGJ1Y2tldHMgcm90YXRlZCBzaW5jZSBhIGdpdmVuIHRpbWVzdGFtcC5cbiAgICAgICBEUC0-PlVJRDI6IDMtYy4gQ29tcGFyZSB0aGUgcm90YXRlZCBzYWx0IGJ1Y2tldHMgdG8gc3RvcmVkIFVJRDIgc2FsdCBidWNrZXRzLjxicj5JZiByb3RhdGVkLCByZXNlbmQgUElJIHRvIGlkZW50aXR5IG1hcHBpbmcgc2VydmljZSBmb3IgYSBuZXcgVUlEMi5cbiAgICAgICBVSUQyLT4-RFA6IDMtZC4gU3RvcmUgdGhlIFVJRDIgYW5kIHNhbHQgYnVja2V0IHJldHVybmVkIGZyb20gdGhlIGlkZW50aXR5IG1hcHBpbmcgc2VydmljZS5cbiAgICBlbmRcbiIsIm1lcm1haWQiOnsidGhlbWUiOiJmb3Jlc3QifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)

### Retrieve a UID2 for PII using the identity map endpoints

| Step | Endpoint | Description |
| --- | --- | --- |
| 1-a | [GET /identity/map](../endpoints/get-identity-map.md)<br>[POST /identity/map](../endpoints/post-identity-map.md) | Send a request containing PII to the identity mapping endpoints. |
| 1-b | [GET /identity/map](../endpoints/get-identity-map.md)<br>[POST /identity/map](../endpoints/post-identity-map.md) | The returned `advertising_id` (UID2) can be used to target audiences on relevant DSPs.<br><br>The response returns a user's UID2 and a salt `bucket_id` that rotates annually. When a user's UID2 updates, the salt bucket remains the same. For details on how to check for salt bucket rotation, see [Monitor for salt bucket rotations](#monitor-for-salt-bucket-rotations-related-to-your-stored-uid2s).<br><br>We recommend storing a user's UID2 and `bucket_id` in a mapping table for ease of maintenance. For guidance on incremental updates, see [Use an incremental process to continuously update UID2](#use-an-incremental-process-to-continuously-update-uid2s). |

### Send UID2 to a DSP to build an audience
Send the `advertising_id` (UID2) from the [preceding step](#retrieve-a-uid2-for-pii-using-the-identity-map-endpoints) to a DSP while building your audiences. Each DSP has a unique integration process for building audiences. Please follow the integration guidance provided by the DSP for sending UID2s to build an audience.

### Monitor for salt bucket rotations related to your stored UID2s
Because a UID2 is an identifier for a user at a particular moment in time, a user's UID2 will rotate at least once a year. 

We recommend checking salt bucket rotation daily for active users. While salt buckets rotate annually, the date they rotate may change. Checking salt bucket rotation every day ensures your integration has the current UID2s.

| Step | Endpoint | Description |
| --- | --- | --- |
| 3-a | [GET /identity/buckets](../endpoints/get-identity-buckets.md) | Send a request to the bucket status endpoint for all salt buckets changed since a given timestamp. |
| 3-b | [GET /identity/buckets](../endpoints/get-identity-buckets.md) | The bucket status endpoint returns a list of `bucket_id` and `last_updated` timestamps. |
| 3-c | [GET /identity/map](../endpoints/get-identity-map.md)<br>[POST /identity/map](../endpoints/post-identity-map.md) | Compare the returned `bucket_id` to the salt buckets of UID2s you've cached.<br>If a UID2's salt bucket rotated, resent the PII to the identity mapping service for a new UID2. |
| 3-d | [GET /identity/map](../endpoints/get-identity-map.md)<br>[POST /identity/map](../endpoints/post-identity-map.md) | Store the returned `advertising_id` and `bucket_id`. |

### Use an incremental process to continuously update UID2

Continuously update and maintain UID2-based audiences utilizing the preceding steps.

The response from the [UID2 retrieval step](#retrieve-a-uid2-for-pii-using-the-identity-map-endpoints) contains mapping information. Cache the mapping between PII (`identifier`),  UID2 (`advertising_id`), and salt bucket (`bucket_id`), along with a last updated timestamp.

Using the results the [preceding salt bucket rotation step](#monitor-for-salt-bucket-rotations-related-to-your-stored-uid2s), remap UID2s with rotated salt buckets by [retrieving UID2s using the identity map endpoints](#retrieve-a-uid2-for-pii-using-the-identity-map-endpoints). To update the UID2s in audiences, [send UID2 to a DSP](#send-uid2-to-a-dsp-to-build-an-audience).

## FAQs
### How do I know when to refresh the UID2 due to salt bucket rotation?
Metadata supplied with the UID2 generation request indicates the salt bucket used for generating the UID2. Salt buckets persist and correspond to the underlying PII used to generate a UID2. Use the  [GET /identity/buckets](../endpoints/get-identity-buckets.md) endpoint to return which salt buckets rotated since a given timestamp. The returned rotated salt buckets inform you which UID2s to refresh. This workflow typically applies to data providers. 

### How often should UIDs be refreshed for incremental updates?
The recommended cadence for updating audiences is daily. 

### How should I generate the SHA256 of PII for mapping?
The system should follow the [email normalization rules](../../README.md#email-address-normalization) and hash without salting. The value needs to be base64-encoded before sending.
