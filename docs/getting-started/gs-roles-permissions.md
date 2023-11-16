---
title: Roles and Permissions
description: Information about UID2 roles and associated permissions
hide_table_of_contents: false
sidebar_position: 07
---

# Roles and Permissions

The UID2 ecosystem includes several different roles. A UID2 participant with a specific role has associated permissions that allow access to complete all necessary activities but no others. This approach is part of the overall secure design of UID2.

For each UID2 participant, the role and associated permissions are linked to the participant's credentials (see [Account Setup](gs-account-setup.md)).

In a few cases, one participant might have more than one role. In this scenario, the participant has one set of credentials for each role.

The following table lists the key roles, the types of participants that commonly have those roles, and a summary of the key associated permissions.

| Role | Participant Type | Permissions |
| :--- | :--- | :--- |
| Generator | Publishers | Permission to generate UID2 tokens from DII and to refresh them, either via a Prebid implementation, by using the JavaScript SDK, or by an implementation that directly calls the applicable API endpoints for retrieving and managing UID2 tokens. |
| ID reader | DSPs | Permission to decrypt UID2 tokens to raw UID2s. |
| Sharer | Any participant type that takes part in UID2 sharing. For details, see [UID2 Sharing: Overview](../sharing/sharing-overview.md). | Permission to encrypt raw UID2s into UID2 tokens for sharing with another authorized sharing participant, using a UID2 SDK or Snowflake, and permission to decrypt UID2 tokens received from another authorized sharing participant into raw UID2s. |
| Mapper | Advertisers<br/>Data Providers | Permission to use the [POST /identity/buckets](../endpoints/post-identity-buckets.md) endpoint to monitor rotated salt buckets and to use the [POST /identity/map](../endpoints/post-identity-map.md) endpoint to map multiple email addresses, phone numbers, or their respective hashes to their raw UID2s and salt bucket IDs. |
