---
title: Token Refresh
description: Information for publishers about refreshing the UID2 token.
hide_table_of_contents: false
sidebar_position: 06
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';

# Token Refresh

When a publisher sends a user's <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> (email address or phone number) to the UID2 Operator, whether via one of the UID2 SDKs or the [POST /token/generate](../endpoints/post-token-generate.md) endpoint, the UID2 Operator returns a <a href="glossary-uid#gl-uid2-token">UID2 token</a>. The token is an opaque alphanumeric string, and is pseudonymous&#8212;this means that different instances of activity, on browsers, phones, and CTV, can be matched to the same pseudonymous value without compromising the privacy of the individual. The token cannot be reverse engineered to arrive at the original email address or phone number.

For security reasons, the UID2 token has a short life. Along with the UID2 token, the UID2 Operator sends a <a href="glossary-uid#gl-refresh-token">refresh token</a> that the publisher can use to generate a new UID2 token. If the token is not refreshed before it expires, it becomes invalid and cannot be used for targeted advertising.

## UID2 Tokens: Key Information

Here are some key points about UID2 tokens:

- The UID2 token is a unique value; no two UID2 tokens are the same.
-  UID2 tokens are case sensitive.
- The token has a limited life, but can be refreshed using the refresh token.
- The token can be refreshed many times as long as it's always refreshed before it expires.
- Publishers send UID2 tokens in the bidstream.
- When the UID2 Operator service receives the refresh token with a request for a new UID2 token, it checks for user opt-out. If the user has opted out of UID2, no new UID2 token is generated. For details, see [User Opt-Out](../getting-started/gs-opt-out.md).

## Refresh Tokens: Key Information

Here are some key points about refresh tokens:
- A refresh token is an opaque string that is issued along with the <a href="glossary-uid#gl-uid2-token">UID2 token</a>.
- You can use the refresh token to refresh the UID2 token.
- Token refresh can be managed in a variety of ways, such as with a UID2 SDK, by calling the [POST /token/refresh](../endpoints/post-token-refresh.md) endpoint, or by using the UID2 Prebid.js module.
- When a new UID2 token is generated and returned, a new refresh token is returned along with it.
- As long as you refresh the token before it expires, you can refresh many times. There is no limit as long as the UID2 token itself is valid at the time it is refreshed.
- If you refresh the token, and get a new token before the old one has expired, you can use either the new token or the old one, as long as you use a token that is still valid.
- In most cases, you can refresh tokens on the client side, even if the token was generated on the server side. For details about refresh functionality for the various SDKs, see [SDK Functionality](../sdks/summary-sdks.md##sdk-functionality) (Refresh UID2 Token column).

<!-- KL said: how to save your data – advertiser (so to save the email, uid2, uid2_2, etc) this we need to think strategically if we want to say this. Also opt out: but to have best practices or "how to" for those would be great -->
