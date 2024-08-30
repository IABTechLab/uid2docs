---
title: UID2 Tokens and Refresh Tokens
description: Information for publishers about UID2 tokens and refresh tokens.
hide_table_of_contents: false
sidebar_position: 06
---

import Link from '@docusaurus/Link';

# UID2 Tokens and Refresh Tokens

When a publisher sends a user's <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> (email address or phone number) to the UID2 Operator, whether via one of the UID2 SDKs or the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint, the UID2 Operator returns a <a href="glossary-uid#gl-uid2-token">UID2 token</a> with associated values such as refresh token. The token is an opaque alphanumeric string. Every time a token is generated from DII input, the token value is different. Token values are never the same. Because of the way UID2 works, different instances of activity, on browsers, CTV, and electronic devices such as phone and tablets, can be matched without compromising the privacy of the individual. The token is designed so that it cannot be reverse engineered to arrive at the original email address or phone number.

For security reasons, the UID2 token has a short life. Along with the UID2 token, the UID2 Operator sends a <a href="glossary-uid#gl-refresh-token">refresh token</a> that the publisher can use to generate a new UID2 token. If the token is not refreshed before it expires, it becomes invalid and cannot be used for targeted advertising.

## UID2 Tokens: Key Information

Here are some key points about UID2 tokens:

- The UID2 token is a unique value: no two UID2 tokens are the same.
- UID2 tokens are case sensitive.
- The token value is opaque: do not make any assumptions about the format or about the length of the string.
- The token generation logic checks for user opt-out. If the user has opted out of UID2, no UID2 token is generated. For details, see [User Opt-Out](../getting-started/gs-opt-out.md).
- The token has a limited life, but can be refreshed using the refresh token.
- The token can be refreshed many times, to get a new UID2 token, as long as the UID2 token is always refreshed before the refresh token expires.
- As an alternative to refreshing an existing UID2 token, you can always generate a new UID2 token from the original hashed or unhashed email address or phone number instead. 
- If the token has expired, or as an alternative to refreshing an existing token, you can always generate a new UID2 token from the original hashed or unhashed email address or phone number.
- Publishers send UID2 tokens in the bidstream.
- Refreshing a UID2 token does not invalidate/expire the original or previous UID2 token. You can still use the earlier token until it expires.

## Refresh Tokens: Key Information

Here are some key points about refresh tokens:

- A refresh token is an opaque string that is issued along with the <a href="glossary-uid#gl-uid2-token">UID2 token</a>.
- Refresh tokens are case sensitive.
- The token value is opaque: do not make any assumptions about the format or about the length of the string.
- You can use the refresh token to generate a new UID2 token before the old one expires.
- Using refresh tokens is optional: you could choose to generate a new token from DII each time rather than refreshing an existing token. 
- Token refresh can be managed in a variety of ways, such as:
  - With a UID2 SDK (see [SDK Functionality](../sdks/summary-sdks.md#sdk-functionality))
  - By calling the [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint
  - By using the UID2 Prebid.js module (see [UID2 Integration Overview for Prebid.js](../guides/integration-prebid.md))
- The [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint does not require authentication with your UID2 credentials.
- When a new UID2 token is generated and returned, a new refresh token is returned along with it.
- As long as you refresh the token before it expires, you can refresh many times. There is no limit as long as the UID2 token and corresponding refresh token are valid.
- If you refresh the token, and get a new token before the old one has expired, you can use either the new token or the old one, as long as you use a token that is still valid/has not expired.
- In most cases, you can refresh tokens on the client side, even if the token was generated on the server side. For details about refresh functionality for the various SDKs, see [SDK Functionality](../sdks/summary-sdks.md#sdk-functionality) (Refresh UID2 Token column).
- When the UID2 Operator service receives the refresh token with a request for a new UID2 token, it checks for user opt-out. If the user has opted out of UID2, no new UID2 token is generated. For details, see [User Opt-Out](../getting-started/gs-opt-out.md).

## Recommended Token Refresh Frequency

The recommended refresh interval is hourly.

To determine when to refresh, you can use the timestamp of the `refresh_from` field in the response to the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint (see [Successful Response](../endpoints/post-token-generate.md#successful-response)) or [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint (see [Successful Response With Tokens](../endpoints/post-token-refresh.md#successful-response-with-tokens)). The value of this field is a timestamp in UNIX time, expressed in milliseconds.

## FAQs

There are some frequently asked questions relating to token refresh: see [FAQs for Publishers](../getting-started/gs-faqs.md#faqs-for-publishers).
