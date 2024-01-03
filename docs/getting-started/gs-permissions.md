---
title: API Permissions
description: Information about UID2 API permissions
hide_table_of_contents: false
sidebar_position: 07
---

# API Permissions

The UID2 ecosystem includes several different API permissions that allow access to complete specific activities. This approach is part of the overall secure design of UID2.

For each UID2 participant, the permissions are linked to the participant's API credentials (see [Account Setup](gs-account-setup.md) and [UID2 Credentials](gs-credentials.md)).

A participant can have one or several sets of API credentials with associated permissions. In cases where you have more than one API permission, you have the option to have a separate set of credentials for each permission or have a single set of credentials for all permissions. We recommend having a separate set of credentials for each permission. 

The following table lists the key permissions, the types of participants that commonly use them, and a summary of the key associated activities.

| Name | Participant Type | Permissions |
| :--- | :--- | :--- |
| Generator | Publishers | Permission to call the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md), [POST&nbsp;/token/validate](../endpoints/post-token-validate.md), and [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoints, to generate UID2 tokens from DII and to refresh them, using one of these integration methods:<ul><li>A Prebid integration</li><li>The UID2 SDK for JavaScript</li><li>An integration that directly calls the applicable API endpoints for retrieving and managing UID2 tokens.</li></ul> |
| Bidder | DSPs | Permission to decrypt UID2 tokens coming in from the bid stream from publishers into raw UID2s for bidding purposes. |
| Sharer | Any participant type that takes part in UID2 sharing. For details, see [UID2 Sharing: Overview](../sharing/sharing-overview.md). | Permission to do both of the following:<ul><li>Encrypt raw UID2s into UID2 tokens for sharing with another authorized sharing participant, using a UID2 SDK or Snowflake</li><li>Decrypt UID2 tokens received from another authorized sharing participant into raw UID2s.</li></ul> |
| Mapper | Advertisers<br/>Data Providers | Permission to use the [POST&nbsp;/identity/buckets](../endpoints/post-identity-buckets.md) endpoint to monitor rotated salt buckets and to use the [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) endpoint to map multiple email addresses, phone numbers, or their respective hashes to their raw UID2s and salt bucket IDs. |
