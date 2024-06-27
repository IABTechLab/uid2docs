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

If you're a DSP and prefer to use an SDK, see [SDKs: Summary](../sdks/summary-sdks.md).

## Overview

DSPs must be able to decrypt UID2 tokens to raw UID2s and verify the token validity, so that they can use the decrypted tokens for targeted advertising and bidding purposes. To do this, a DSP must do the following:

- [Download a set of encryption keys](#downloadrefresh-encryption-keys)
- [Decrypt UID2 tokens into raw UID2s](#decrypt-uid2-tokens-into-raw-uid2s)
- [Periodically re-download the latest set of encryption keys](#downloadrefresh-encryption-keys)

An example implementation, in the [UID2 SDK for C#&nbsp;/&nbsp;.NET](https://github.com/IABTechLab/uid2-client-net), is the `BidstreamClient` class: see [BidstreamClient.cs](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/BidstreamClient.cs).

This document refers to additional code sections from the C#&nbsp;/&nbsp;.NET SDK as examples.

## Download/Refresh Encryption Keys

To download or refresh the encryption keys, so that you can decrypt UID2 tokens into raw UID2s, you'll need to write code to do the following:

- Encrypt the request.
- Call the endpoint.
- Decrypt the response.
- Parse the response.

You'll call the following API endpoint:

```
/v2/key/bidstream
```

Refresh the keys once at startup, and then periodically (recommended refresh interval is hourly).

The UID2 SDK for C#&nbsp;/&nbsp;.NET uses a `Refresh` function.

For an implementation example that shows encrypting the request and decrypting the response, see [Encryption and Decryption Code Examples](../getting-started/gs-encryption-decryption.md#encryption-and-decryption-code-examples).

The API response is in JSON format, and includes `site_data`, the list of domains or app names that are allowed for the site.

To see how all the fields are parsed, refer to the UID2 SDK for C#&nbsp;/&nbsp;.NET parse function: see [KeyParser.cs, lines 41-74](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/KeyParser.cs#L41-L74).

After decrypting the token into a raw UID2, if the token was generated on the client side, you can use the information in `site_data` to verify that a specific domain or app name is on the list of names allowed for it. For details, see [Verify the Domain or App Name](#verify-the-domain-or-app-name).

## Decrypt UID2 Tokens into Raw UID2s

When you have current keys, you'll be able to decrypt a UID2 token into a raw UID2. You also need to check several conditions to make sure that the token is eligible for use in the bidstream.

You'll need to complete the following steps:

1. [Check the token version](#check-the-token-version).

1. [Decrypt the token](#decrypt-the-token).

1. [Make sure the token has not expired](#make-sure-the-token-has-not-expired).

1. [Verify that the domain or app name is valid](#verify-the-domain-or-app-name).

The UID2 SDK for C# / .NET uses a `DecryptTokenIntoRawUid` function to perform these steps: see [BidstreamClient.cs, Line 15](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/BidstreamClient.cs#L15).

### Check the Token Version

There are different UID2 token versions in current use, and later processing steps are a little different depending on whether the token version is v2 or a later version.

You can check the token version using the first four characters of the token.

To review detailed logic, see [UID2Encryption.cs, lines 36-50](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/UID2Encryption.cs#L36-L50).

### Decrypt the Token

Use the master key and site key to decrypt the token. For a code example, refer to the `Decrypt` function: see [UID2Encryption.cs, line 29](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/UID2Encryption.cs#L29). This function decrypts UID2 tokens into raw UID2s as part of the UID2 SDK for C# / .NET, and includes logic to handle different token versions.

### Make Sure the Token Has Not Expired

A token must be valid and current so that it can be used in the bidstream. You must make sure that it hasn't expired. To do this, check these two conditions:

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

For v2, we use the token expiry minus the current time to calculate the remaining lifetime. This is because v2 doesn't have a **Token Generated** field, which is present in later versions. All token versions have an **Identity Established** field, but this indicates the time that the original token was generated, before any token refreshes, so it can't be used to calculate whether the token is still valid.

#### Calculating Token Expiration: All Later Versions

For all token versions later than v2, the calculation to make sure that the token hasn't expired is as follows:

`lifetime` = **Token Expiry** &#8211; **Token Generated**

`skew_duration` = **Token Generated** &#8211; **Current Time**

Versions later than v2 have a **Token Generated** field, which is updated if the token is refreshed, so we use this to calculate the token lifetime.

### Verify the Domain or App Name

After decrypting the token, if it was generated on the client side, you must verify that the `domainOrAppName` value is included in the `domain_names` list of the site ID, within the `site_data` section of the response from the `/v2/key/bidstream` API endpoint.

For an example of code that does this, refer to the `IsDomainOrAppNameAllowedForSite` function in [UID2Encryption.cs, line 245](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/UID2Encryption.cs#L245).

For more information about client-side UID2 integration, refer to one of these integration guides:

- [Client-Side Integration Guide for JavaScript](publisher-client-side.md)
- [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md)
- [UID2 Client-Side Integration Guide for Mobile](integration-mobile-client-side.md)
