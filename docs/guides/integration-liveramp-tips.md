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

Publishers already using LiveRamp Authenticated Traffic Solution (ATS) can leverage their integration to generate a UID2 token and pass the token to LiveRamp in the bid request. If you want to generate UID2 tokens using LiveRamp ATS, make sure you've correctly implemented the following integration points:

- [Enable RideAlong](#enable-ridealong)
- [Implement the Correct Hashing Methodology](#implement-the-correct-hashing-methodology)
- [Make Sure the Envelope Refresh Setting Is Valid for UID2](#make-sure-the-envelope-refresh-setting-is-valid-for-uid2)
- [Check Expiration Rate Threshold](#check-expiration-rate-threshold)

[**GWH_DR/EH_01: In the intro, do we need to mention Prebid? Like, "Publishers already using LiveRamp Authenticated Traffic Solution (ATS) in a Prebid.js instance can leverage their integration..."?**]

## Enable RideAlong

In your LiveRamp configuration, you must make sure that RideAlong is enabled. RideAlong is a LiveRamp feature that enables other identity solutions, such as UID2, to embed their identifiers in ATS envelopes. If RideAlong is not enabled, UID2 tokens are not correctly sent.

To complete this step, contact your LiveRamp representative.

## Implement the Correct Hashing Methodology

The hashing methodology used by the UID2 service is very specific. If you use a different hashing algorithm, or miss any of the steps, your UID2s will not be correctly generated.

For information about the required hashing methodology, see [Normalization and Encoding](../getting-started/gs-normalization-encoding.md).

## Make Sure the Envelope Refresh Setting Is Valid for UID2

**If using ATS.js and Prebid, what value is set in “storage.refreshInSeconds” - the value should be set to 1800 seconds (30 minutes) / review what value is set for "expire" - we are still evaluating the impact of expire, but typically either 15 or 30 days is set.**

If you're using `ATS.js` and `Prebid.js`, it's important that the value set in `storage.refreshInSeconds` is a valid value for UID2.

We recommend that you set this value to **1800 seconds** (30 minutes).

To check this setting, you can visit an example webpage. Bear in mind that you might have to authenticate in some way, but it's not always required for LiveRamp.

On the page, right-click for the developer tools, then choose Inspect. Under the Console tab, type `pbjs.getConfig()`.

Under `userSync` and `userIds`, you should see a breakout of all the user ID modules that are set up and generated in storage. 

Under `identityLink`, you can review the parameters set for the module.

[**GWH_DR/EH_02: if they are incorrect, where do users actually configure them? Not sure if the above info about checking developer tools is really TAM info but I included it for now. But where does the publisher configure these settings? If we know.**]

## Check Expiration Rate Threshold

The LiveRamp ATS envelope is typically set up to expire after 15 or 30 days; UID2 tokens have a much shorter lifetime. This is determined by the `expire` setting in the LiveRamp configuration.

A common LiveRamp recommendation to publishers is to intentionally delay the loading of ATS in the interests of user experience. As a result, the ATS tag usually isn't loaded before the first request is sent. This has the following results:

- For users with no envelope/token, the first bid request is sent without a UID2.
- For users with an existing envelope/token, the first bid request is sent with the existing UID2 token, without first refreshing the token.

The recommended approach depends on your integration type:

- If your integration is with the [LiveRamp ATS Mobile SDK](https://docs.liveramp.com/privacy-manager/en/implement-ats-mobile-sdk.html), you can update the refresh parameters in the LiveRamp platform.
- If your integration is with [ATS for Web](https://docs.liveramp.com/privacy-manager/en/implement-ats-js.html), using the [Prebid LiveRamp Module](https://docs.prebid.org/dev-docs/modules/userid-submodules/ramp.html), the refresh parameters are set on the page, in the Prebid script.

  [**GWH_DR/EH_03: in this case how do they update? Does it mean the script sets the pages in the webpage? Or "on the page" means a Prebid config page? The Confluence page says "If not set through Prebid, we need to go directly to the publisher to ask for the values." but then if the TAM person asked for the values, what then, where are they updated? Sorry... don't get it.**]

If it's more than 24 hours since the token was refreshed, the LiveRamp envelope is valid but the UID2 token has expired. Because the refresh process happens after the bidding sequence, an expired UID2 token is sent with the bid.

## Troubleshooting Assistance

For more information, or LiveRamp troubleshooting assistance, check the [LiveRamp support page](https://docs.liveramp.com/connect/en/support.html) for help resources or contact your LiveRamp representative.
