---
title: DSP Direct Integration Tips
sidebar_label: DSP Direct Integration Tips
description: Tips for DSPs who are integrating with UID2 without using SDKs.
hide_table_of_contents: false
sidebar_position: 05
---

import Link from '@docusaurus/Link';

# DSP Direct Integration Tips

This document provides integration tips for DSPs who prefer to integrate without using one of the UID2 SDKs.

For DSPs who prefer to use an SDK, see [SDKs: Summary](../sdks/summary-sdks.md).

## Overview 
DSPs must be able to decrypt UID2 tokens to raw UID2s and use the decrypted token for targeted advertising and bidding purposes. To do this, a DSP must do the following:

- [Download a set of encryption keys](#downloadrefresh-encryption-keys)
- [Decrypt UID2 Token into Raw UID2](#decrypt-uid2-token-into-raw-uid2)
- [Periodically re-download the latest set of encryption keys](#downloadrefresh-encryption-keys)

An example implementation, in the [UID2 SDK for C#&nbsp;/&nbsp;.NET](https://github.com/IABTechLab/uid2-client-net), is the `BidstreamClient` class: see [BidstreamClient.cs](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/BidstreamClient.cs). This document refers to code sections from the C#&nbsp;/&nbsp;.NET SDK as examples of implementation.

## Download/Refresh Encryption Keys

To download or refresh the encryption keys, so that you can decrypt UID2 tokens into raw UID2s, call the following API endpoint:

```
/v2/key/bidstream
```

Refresh once at startup, and then periodically (recommended refresh interval is hourly).

(**GWH_CM_11: just checking that there isn't an actual function called Refresh, and a function called DecryptTokenIntoRawUID: because they are writing their own functions, correct? It's just that those are the things that need to be done?**)

To see how all the fields are parsed, refer to the UID2 SDK for C#&nbsp;/&nbsp;.NET `Parse` function: see [KeyParser.cs, lines 41-74](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/KeyParser.cs#L41-L74).

The API response is in JSON format, and includes `site_data`, the list of domains or app names that are allowed for the account.

(**GWH_CM_12: Is there an example anywhere of the API response, with site_data"? Since it isn't documented. I'd be interested to see what it looks like. And, we say that the code shows how the fields are parsed. Don't understand why the code would not mention site_data therefore.**)

When decrypting the token into a raw UID2, you can use the information in `site_data` to verify that a specific domain or app name is on the list of names allowed for tokens that are generated on the client side. For details, see [Verify the Domain or App Name](#verify-the-domain-or-app-name).

(**GWH_CM_13: Is it actually when decrypting, or is this a prerequisite to decrypting?**)

For more information about client-side UID2 implementation, refer to one of these implementation guides:

- [Client-Side Integration Guide for JavaScript](publisher-client-side.md)
- [Prebid.js](integration-prebid-client-side.md)
- [Mobile](integration-mobile-client-side.md)

To call the endpoint, you'll need to do two things:
- Create an envelope for the request header.
- Decrypt the response.

(**GWH_CM_14: Just checking that the above is about calling the /v2/key/bidstream endpoint... right?**)

For an implementation example, see [Encryption and Decryption Code Examples](../getting-started/gs-encryption-decryption.md#encryption-and-decryption-code-examples).

## Decrypt UID2 Token into Raw UID2

When you have current keys you'll be able to decrypt a UID2 token into a raw UID2. You also need to check several conditions to make sure that the token is eligible for use in the bid stream.

To review an example of the code for the `Decrypt` function, which decrypts UID2 tokens into raw UID2s as part of the UID2 SDK for C#&nbsp;/&nbsp;.NET, see [UID2Encryption.cs, line 29](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/UID2Encryption.cs#L29).

There are different UID2 token versions in current use, and the processing is slightly different depending on the token version. You'll need to complete the following steps:

1. [Decrypt the token](#decrypt-the-token).

1. [Check the token version](#check-the-token-version).

1. [Make sure the token has not expired](#make-sure-the-token-has-not-expired).

1. [Verify that the domain or app name is valid](#verify-the-domain-or-app-name).

1. [Decrypt the token](#decrypt-the-token).

### Decrypt the Token

Use the master key and site key to decrypt the token. For a code example, refer to the `Decrypt` function: see [UID2Encryption.cs, line 29](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/UID2Encryption.cs#L29). This function includes logic to handle different token versions.

To review an example of the code for the `Decrypt` function, which decrypts UID2 tokens into raw UID2s as part of the UID2 SDK for C#&nbsp;/&nbsp;.NET, see [UID2Encryption.cs, line 29](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/UID2Encryption.cs#L29).

(**GWH_CM_16: not sure now does decrypt come first, and then they check the other conditions? Previously we had decrypt as the last section. Also: we say "Use the master key and site key to decrypt the token" but where do they get those from? And, "This function includes logic to handle different token versions." but if we have decrypt before check the token version, does that work? I think you said first they decrypt it and then they check the two conditions, lifetime/skew duration and domain or app name, so I hope it can go first. but I also have this data: only after we know the token versions can we know how to decrypt it and compare the lifetime. Please help with sequencing. Thanks!**)

### Check the Token Version

Later processing steps are a little different depending on whether the token version is v2 or a later version.

You can check the token version using the first four characters of the header.

(**GWH_CM_14 which header actually? Is it a header on the API response? Is there an example anywhere?**)

To review the detailed logic, see [UID2Encryption.cs, lines 36-50](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/UID2Encryption.cs#L36-L50).

### Make Sure the Token Has Not Expired

(**GWH_CM_15 "has not expired" -- does this also check for other instances of invalid token? Make Sure the Token is Valid maybe?**)

During the decryption, you must make sure that the token has not expired, by checking these two conditions:

(**GWH_CM_16 we say "during the decryption" -- but, if the token has expired, do they still decrypt?**)

- The `remaining_lifetime` or `lifetime` value must not exceed the `max_bidstream_lifetime_seconds` value.
- The `skew_duration` value must not exceed the `allow_clock_skew_seconds` value.

 For an example of how this is done, review the code for the `DoesTokenHaveValidLifetimeImpl` function: see [UID2Encryption.cs, line 237](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/UID2Encryption.cs#L237).
 
The following sections show how the `lifetime` and `skew_duration` values for a token are calculated. The calculation is a little different depending on the token version:

- [Calculating Token Expiration: Token v2](#calculating-token-expiration-token-v2)
- [Calculating Token Expiration: All Later Versions](#calculating-token-expiration-all-later-versions)

#### Calculating Token Expiration: Token v2

For token v2, the calculation to make sure that the token hasn't expired is as follows:

`remaining_lifetime` = **Token Expiry** &#8211; **Current Time**

`skew_duration` = `0`

For v2, we use the token expiry minus the current time to calculate the remaining lifetime. This is because v2 does not have a **Token Generated** field, which is present in later versions. Instead, it has an **Identity Established** field: this indicates the time that the original token was generated, before any token refreshes, so it's not useful for calculating whether the token is still valid.

#### Calculating Token Expiration: All Later Versions

For all token versions later than v2, the calculation to make sure that the token hasn't expired is as follows:

`lifetime` =  **Token Expiry** &#8211; **Token Generated**

`skew_duration` = **Token Generated** &#8211; **Current Time**

Again, it's important to know that versions later than v2 have a **Token Generated** field. If the token was refreshed, this value is updated, so we can use it for calculating the token lifetime. The **Token Generated** field in v2 doesn't get updated when the token is refreshed, so it isn't useful for this calculation.

### Verify the Domain or App Name

During the decryption, if the tokens were generated on the client side, (refer to the applicable client-side integration guide for the [JavaScript SDK](publisher-client-side.md), [Prebid.js](integration-prebid-client-side.md),  or [Mobile](integration-mobile-client-side.md)), you must verify that the `domainOrAppName` value is included in the `domain_names` list of the site ID, within the `site_data` section of the response from the `/v2/key/bidstream` API endpoint.

To create code that does this, you can use the code for the `IsDomainOrAppNameAllowedForSite` function in [UID2Encryption.cs, line 245](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/UID2Encryption.cs#L245) as an example.

### Decrypt the Token

Use the master key and site key to decrypt the token. Refer to the `Decrypt` function: see [UID2Encryption.cs, line 29](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/UID2Encryption.cs#L29). This function includes logic to handle different token versions.
