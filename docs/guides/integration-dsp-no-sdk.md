---
title: DSP Tips for Direct Integration
sidebar_label: DSP Tips for Direct Integration
description: Tips for DSPs who are integrating with UID2 without using SDKs.
hide_table_of_contents: false
sidebar_position: 05
---

import Link from '@docusaurus/Link';

# DSP Tips for Direct Integration

This document provides integration tips for DSPs who prefer to integrate without using one of the UID2 SDKs.

For DSPs who prefer to use an SDK, see [SDKs: Summary](../sdks/summary-sdks.md).

## Overview 
DSPs must be able to decrypt UID2 tokens to raw UID2s and use the decrypted token for targeted advertising and bidding purposes. To do this, a DSP must do the following:

- Download a set of encryption keys
- Decrypt UID2 tokens into raw UID2s using the downloaded keys
- Periodically re-download the latest set of encryption keys

An example implementation is the BidstreamClient xxx in the UID2 C# SDK: see [BidstreamClient.cs](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/BidstreamClient.cs). This document refers to code sections from the [UID2 SDK for .NET](https://github.com/IABTechLab/uid2-client-net) as an example of implementation.

(**GWH_CM_01 is BidstreamClient a function? Or, a what?**)

## Functions

This section provides information on the following functions:

- [Refresh Function](#refresh-function)
- [DecryptTokenIntoRawUid Function](#decrypttokenintorawuid-function)

### Refresh Function

To refresh the token, call the following API endpoint:

```
/v2/key/bidstream
```

This function needs to be called periodically to refresh the key.

(**GWH_CM_02 what should we recommend re "periodically"? Hourly is it?**)

To see how all the fields are parsed, refer to the C# SDK `Parse` function: [KeyParser.cs, lines 41-74](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/KeyParser.cs#L41-L74).

In the response, `site_data` is used to check whether domainOrAppName is allowed for tokens that are generated on the client side while decrypting the token into a raw UID.

(**GWH_CM_03 We say "is used" but who uses it? What do DSPs actually need to do here?**)

(**GWH_CM_04 I don't understand this part "while decrypting the token into a raw UID." could you help me understand that? Probably need to adjust the wording.**)

For details, refer to the applicable section in one of these client-side implementation guides: (**GWH_CM_05 should we link to specific sections in the guides?**)

- [Client-Side Integration Guide for JavaScript](publisher-client-side.md)
- [Prebid.js](integration-prebid-client-side.md)
- [Mobile](integration-mobile-client-side.md)

To call the endpoint, you'll need to create an envelope for the header. In addition, you'll need to decrypt the response. For details, and an example, see [Encryption and Decryption Code Examples](../getting-started/gs-encryption-decryption.md#encryption-and-decryption-code-examples).

(**GWH_CM_06 Is that actually an example of both things? Or just of decrypting the response? We say two things and then "for details" so need to be clear about what we're showing.**)

### DecryptTokenIntoRawUid Function

This function decrypts a UID2 token into a raw UID2.

To review an example of the code for the `Decrypt` function, see [UID2Encryption.cs, line 29](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/UID2Encryption.cs#L29).

There are different UID2 token versions in current use, and the processing is slightly different depending on the token version. You'll need to do the following:

1. Check the version of the token. You can do this using the first four characters of the header. To review the detailed logic, see [UID2Encryption.cs, lines 36-50](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/UID2Encryption.cs#L36-L50).

1. Use the master key and site key to decrypt the token. Refer to the `Decrypt` function: see [UID2Encryption.cs, line 29](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/UID2Encryption.cs#L29). This function includes logic to handle different token versions.

During the decryption, you must make sure that the token has not expired, by checking these two conditions:

- The `remaining_lifetime` or `lifetime` value must not exceed the `max_bidstream_lifetime_seconds` value.
- The `skew_duration` value must not exceed the `allow_clock_skew_seconds`value.

 For an example of how this is done, review the code for the `DoesTokenHaveValidLifetimeImpl` function: see [UID2Encryption.cs, line 237](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/UID2Encryption.cs#L237).
 
The following sections show how the `lifetime` and `skew_duration` values for a token are calculated. The calculation is a little different depending on the token version:

- [Token v2](#token-v2)
- [All Later Versions](#all-later-versions)

#### Token v2

For token v2, the calculation is as follows:

`remaining_lifetime` = **Token Expiry** &#8211; **Current time**

`skew_duration` = `0`

This is because v2 does not have a **Token Generated** field. Instead, it has an **Identity Established** field, indicating the time that the original token was generated, before any token refreshes.

#### All Later Versions

For all token versions later than v2, the calculation is as follows:

`lifetime` =  **Token Expiry** &#8211; **Token Generated**

`skew_duration` = **token generated** &#8211; **now**

Again, it's important to know that v2 has an **Identity Established** field but later versions have a **Token Generated** field, and these two are not the same.

(**GWH_CM_07: Did we actually say what the difference is? If so I missed it. We said what Identity Established is, but what's the difference with Token Generated, other than a different name?**)

During the decryption, if the tokens were generated on the client side, (refer to the applicable client-side integration guide for the [JavaScript SDK](publisher-client-side.md), [Prebid.js](integration-prebid-client-side.md),  or [Mobile](integration-mobile-client-side.md)), you must verify that the `domainOrAppName` value is included in the `domain_names` list of the site ID, within the `site_data` section of the response from the `/v2/key/bidstream` API endpoint.

To do this, you can refer to the code for the `IsDomainOrAppNameAllowedForSite` function in [UID2Encryption.cs, line 245](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/UID2Encryption.cs#L245).
