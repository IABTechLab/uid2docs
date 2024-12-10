---
title: LiveRamp Integration Tips
sidebar_label: LiveRamp Integration Tips
pagination_label: LiveRamp Integration Tips
description: Tips for integrating with UID2 with LiveRamp. 
hide_table_of_contents: false
sidebar_position: 04
---

import Link from '@docusaurus/Link';

# LiveRamp Integration Tips

Publishers who are using LiveRamp's Authenticated Traffic Solution (ATS) can leverage their integration to generate a UID2 token to be passed in the bid request.

If you want to generate UID2 tokens using LiveRamp ATS, reach out to your LiveRamp representative and also make sure you've addressed the following integration points: 

- [Enable UID2 as an Interoperable ID](#enable-uid2-as-an-interoperable-id)
- [Implement the UID2 Hashing Methodology](#implement-the-uid2-hashing-methodology)
- [Set Envelope Refresh to 1800 Seconds](#set-envelope-refresh-to-1800-seconds)

## Enable UID2 as an Interoperable ID

In your LiveRamp configuration, you must make sure that the Interoperable IDs feature is enabled. Interoperable IDs is a LiveRamp feature that enables other identity solutions, such as UID2, to embed their identifiers in ATS envelopes. If UID2 is not enabled as an interoperable ID, UID2 tokens will not be appended to the envelope.

To complete this step, contact your LiveRamp representative.

## Implement the UID2 Hashing Methodology

To add a valid UID2 token to the ATS envelope, a publisher must provide plain text emails, indicate the <Link href="../ref-info/glossary-uid#gl-sha-256">SHA-256</Link> hashing methodology, or supply an SHA-256 hashed version of the email directly into the LiveRamp Library.

You must use the SHA-256 hashing methodology, which is supported by both UID2 and LiveRamp. Using any other hashing methodology, or missing any step, results in either no UID2 token added to the ATS envelope or an invalid token added.

For details, see [Normalization and Encoding](../getting-started/gs-normalization-encoding.md).

## Set Envelope Refresh to 1800 Seconds

When enabling ATS within `Prebid.js`, make sure that `storage.refreshInSeconds` is set to **1800 seconds** (30 minutes). To avoid sending expired envelopes into the bidstream, or passing envelopes where an opt-out has occurred, LiveRamp checks for a new ATS envelope (containing the UID2) every 30 minutes.

## Troubleshooting Assistance

For more information, or LiveRamp troubleshooting assistance, check the [LiveRamp support page](https://docs.liveramp.com/connect/en/support.html) for help resources or contact your LiveRamp representative.
