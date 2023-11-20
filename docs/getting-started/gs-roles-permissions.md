---
title: API Roles and Permissions
description: Information about UID2 API roles and associated permissions
hide_table_of_contents: false
sidebar_position: 07
---

# API Roles and Permissions

The UID2 ecosystem includes several different API roles. A UID2 participant with a specific role has associated permissions that allow access to complete all necessary activities. This approach is part of the overall secure design of UID2.

For each UID2 participant, the role and associated permissions are linked to the participant's API credentials (see [Account Setup](gs-account-setup.md)).

A participant can have one or several sets of API credentials with associated roles. In cases where you have more than one API role, you have the option to have a separate set of credentials for each role or have a single set of credentials for all roles. We recommend having a separate set of credentials for each role. 

The following table lists the key roles, the types of participants that commonly have those roles, and a summary of the key associated permissions.

| Role | Participant Type | Permissions |
| :--- | :--- | :--- |
| Generator | Publishers | Permission to generate UID2 tokens from DII and to refresh them, either via a Prebid implementation, by using the JavaScript SDK, or by an implementation that directly calls the applicable API endpoints for retrieving and managing UID2 tokens. |
| ID reader {**GWH_AT suggests Bidder**} | DSPs | Permission to decrypt UID2 tokens to raw UID2s. (**GWH_AT he says: Need to briefly describe how ID reader is different from sharer.**) |
| Sharer | Any participant type that takes part in UID2 sharing. For details, see [UID2 Sharing: Overview](../sharing/sharing-overview.md). | Permission to encrypt raw UID2s into UID2 tokens for sharing with another authorized sharing participant, using a UID2 SDK or Snowflake, and permission to decrypt UID2 tokens received from another authorized sharing participant into raw UID2s. |
| Mapper | Advertisers<br/>Data Providers | Permission to use the [POST /identity/buckets](../endpoints/post-identity-buckets.md) endpoint to monitor rotated salt buckets and to use the [POST /identity/map](../endpoints/post-identity-map.md) endpoint to map multiple email addresses, phone numbers, or their respective hashes to their raw UID2s and salt bucket IDs. |
