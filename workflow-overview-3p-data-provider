# Third-Party Data Provider Workflow Overview

![Data Provider Workflow](/images/data_provider.jpg)

This workflow is for organizations that collect user data and push it to DSPs. Data collectors include advertisers, data on-boarders, measurement providers, identity graph providers, third-party data providers, and other organizations who push data to DSPs.


1. Data provider sends a user’s consented personally identifiable information (PII) to the UID2 Operator.
2. UID2 Operator generates and returns a raw UID2.
3. Data provider stores the UID2 and salt bucket.
    - Server-side: The data provider stores the UID2 in a mapping table, DMP, data lake, or other server-side application.
4. Data provider sends the UID2 to a DSP using permitted transport protocols defined in the code of conduct.
5. Data provider monitors the UID2 Operator for rotated salt buckets and updates UID2s as needed.

## Data Provider Integration

To generate UID2s from users' PII, data providers must access the UID2 Operator APIs. Some advertisers may choose to work through CDPs, data on-boarders, or other service providers instead.

See also [Advertiser/Data Provider Integration Guide](/api/v1/guides/advertiser-dataprovider-guide.md).

## Requirements

- Integrate with the UID2 Operator to generate UID2s and handle salt bucket rotations.
