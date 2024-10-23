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

Publishers already using LiveRamp Authenticated Traffic Solution (ATS) can leverage their integration to generate a UID2 token to be passed in the bid request.

If you want to generate UID2 tokens using LiveRamp ATS, reach out to your LiveRamp representative and also make sure you've addressed the following integration points: 

- [Enable RideAlong](#enable-ridealong)
- [Implement the Correct Hashing Methodology](#implement-the-correct-hashing-methodology)
- [Set Envelope Refresh to 1800 Seconds](#set-envelope-refresh-to-1800-seconds)

## Enable RideAlong

In your LiveRamp configuration, you must make sure that RideAlong is enabled. RideAlong is a LiveRamp feature that enables other identity solutions, such as UID2, to embed their identifiers in ATS envelopes. If RideAlong is not enabled, UID2 tokens will not be appended to the envelope.

To complete this step, contact your LiveRamp representative.

## Implement the Correct Hashing Methodology

The hashing methodology used by the UID2 service is very specific. If you use a different hashing algorithm, or miss any of the steps, your UID2s will not be correctly generated.

For information about the required hashing methodology, see [Normalization and Encoding](../getting-started/gs-normalization-encoding.md).

## Set Envelope Refresh to 1800 Seconds

When enabling `ATS.js` within `Prebid.js`, make sure that `storage.refreshInSeconds` is set to **1800 seconds** (30 minutes).

## Troubleshooting Assistance

For more information, or LiveRamp troubleshooting assistance, check the [LiveRamp support page](https://docs.liveramp.com/connect/en/support.html) for help resources or contact your LiveRamp representative.
