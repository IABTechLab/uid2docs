---
title: API Permissions
description: Information about UID2 API permissions.
hide_table_of_contents: false
sidebar_position: 07
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# API Permissions

The UID2 ecosystem includes several different API permissions that allow access to complete specific activities. This approach is part of the overall secure design of UID2.

For each UID2 participant that has API Key and Client Secret, the permissions are linked to the participant's API credentials (see [Account Setup](gs-account-setup.md) and [UID2 Credentials](gs-credentials.md)).

:::note
If you're a publisher and are implementing UID2 on the client side, API permissions do not apply to you. Instead, you'll receive a different set of credentials that are specifically for generating a client-side token request. For details, see [Subscription ID and Public Key](gs-credentials.md#subscription-id-and-public-key).
:::

A participant can have one or several sets of API credentials with associated permissions. In cases where you have more than one API permission, you have the option to have a separate set of credentials for each permission or have a single set of credentials for all permissions. We recommend having a separate set of credentials for each permission. 

The following table lists the key permissions, the types of participants that commonly use them, and a summary of the key associated activities.

| Name | Participant Type | Permissions |
| :--- | :--- | :--- |
| Generator | Publishers | Permission to call the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md), [POST&nbsp;/token/validate](../endpoints/post-token-validate.md), and [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoints, to generate UID2 tokens from <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> and to refresh them, using one of these integration methods:<ul><li>A Prebid integration</li><li>The SDK for JavaScript</li><li>An integration that directly calls the applicable API endpoints for retrieving and managing UID2 tokens</li></ul> |
| Bidder | DSPs | Permission to decrypt UID2 tokens coming in from the <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link> from publishers into raw UID2s for bidding purposes. |
| Sharer | Any participant type that takes part in UID2 sharing.<br/>For details, see [UID2 Sharing: Overview](../sharing/sharing-overview.md). | Permission to do both of the following:<ul><li>Encrypt raw UID2s into UID2 tokens for sharing with another authorized sharing participant, using a UID2 SDK or Snowflake</li><li>Decrypt UID2 tokens received from another authorized sharing participant into raw UID2s</li></ul> |
| Mapper | Advertisers<br/>Data Providers | Permission to call the following endpoints to map multiple email addresses, phone numbers, or their respective hashes to their raw UID2s, previous raw UID2s, and refresh timestamps:<ul><li>[POST&nbsp;/identity/map](../endpoints/post-identity-map.md) (latest version)</li><li>The earlier v2 identity mapping endpoints: [POST&nbsp;/identity/map (v2)](../endpoints/post-identity-map.md) and [POST&nbsp;/identity/buckets](../endpoints/post-identity-buckets.md)</li></ul> |
