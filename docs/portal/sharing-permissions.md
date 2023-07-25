---
title: Sharing Permissions
description: Learn how to configure sharing permissions in the UID2 Portal.
hide_table_of_contents: false
sidebar_position: 09
---

# Sharing Permissions

Configuring your sharing permissions opens the door to you being able to share UID2 information with other UID2 participants.

<!-- It includes the following:

- [Sharing Permissions Overview](#sharing-permissions-overview)
- [Sharing Options](#sharing-options)
- [Bulk Add Sharing Permissions](#bulk-add-sharing-permissions)
- [Using Search to Add Sharing Relationships](#using-search-to-add-sharing-relationships)
- [Steps for Granting Sharing Permission](#steps-for-granting-sharing-permission) DONE -->

There are many options so that you can create the exact sharing relationships that you want:

- **Recommendations**: You can accept recommendations, with one click, to share with all current and future participants in one or more categories (Publishers, Advertisers, DSPs, or Data Providers). See [Bulk Add Sharing Permissions](#bulk-add-sharing-permissions).

  Recommendations are based on the participant type specified in your account setup.
- **Sharing Categories**: You can share with all current and future participants in one or more specific categories that you configure (All, Publishers, Advertisers, DSPs, or Data Providers).
- **Individual Sharing Relationships**: You can create a sharing relationship with one or more current participants. With this option, you must manually add any future sharing relationships.
<!-- - You can choose to have your name on the sharing list, so that others can create sharing relationships with you, or you can participate in sharing without your name appearing on the list. (GWH_KT I didn't see this in the wireframes or UI?) -->
<!-- - You can generate a Sharing Number that you can share with specific participants you want to share with. They can use the Sharing Number to create a sharing relationship with you even if you chose to be private. (GWH_KT I didn't see this in the wireframes or UI?) -->

>NOTE: Configuring a sharing relationship with another participant doesn't mean that data is shared. It only makes it possible. Information is only shared when you explicitly send it to another participant, or another participant sends it to you.

## Sharing Permissions Overview

The sender must grant permission to the receiver, so that the intended receiver of UID2 tokens can decrypt them into raw UID2s. Sharing permissions are defined through the UID2 Portal.

For UID2 Portal access, ask your UID2 contact. For details, see [Before Creating Your Account](participant-info.md#before-creating-your-account). If you're completely new to UID2, see [Account Setup](../getting-started/gs-account-setup.md).

## Sharing Options

The following sharing options are available via the UID2 Portal. These options are not mutually exclusive&#8212;you can mix and match as needed:

- You can automatically grant permission to all participants of a specific type, such as all publishers, advertisers, DSPs, or data providers.<!--  (link to sub-section) --> For example, we recommend that publishers grant sharing permission to all DSPs.
- You can grant permission to one or more specific participants<!--  (link to sub-section) -->. If you choose this option, all new participants of the selected participant type will automatically have permission to decrypt any data that you send to them. For details, see [Key Refresh Cadence for Sharing](../sharing/sharing-best-practices.md#key-refresh-cadence-for-sharing).

  For example, let's say you choose to share with all of 20 existing DSPs. The next day, when DSP 21 signs up for sharing, DSP 21 will automatically have permission to decrypt data that you send. To share with DSP 21, just send one or more UID2 tokens, and DSP 21 will be able to decrypt the tokens into raw UID2s. Because you chose automatic sharing, you do not need to log in to explicitly update your sharing permissions to include DSP 21, or any future DSPs that sign up for the UID2 ecosystem.
  
You can update your sharing permission in the UID2 Portal at any point.

## Bulk Add Sharing Permissions

The UID2 Portal makes recommendations based on your role. For example:
- If you're a publisher, you could share with all DSPs (current and future).
- If you're an advertiser, you could share with all data providers (current and future).

Accepting the recommendations is the fastest and easiest way to configure your sharing options.

If you prefer, you can set up individual sharing relationships with one or more sharing partners.

## Using Search to Add Sharing Relationships

If you prefer to create sharing relationships with specific sharing partners, click **Search and Add Permissions** to find sharing partners and add them.

The following filters are available on the list of available sharing partners:
- Publishers
- Advertisers
- Data Providers
- DSPs

NOTE: When you manually create your sharing relationships using the search feature, you create current relationships, but not future ones. The only way to configure your sharing relationships to include future participants is to accept the recommendations. Alternatively, to add future participants, you must log in to the UID2 Portal again and search for the additional sharing partners.

## Steps for Granting Sharing Permission

Enabling sharing permissions includes the following steps.

>NOTE: As well as granting sharing permission in the UID2 Portal, you'll also need to integrate an SDK, or Snowflake functionality, into your code. See [Sharing Steps: Summary](../sharing/sharing-implementing.md#sharing-steps-summary).

1. Log in to your UID2 Portal account.
1. Click **Sharing Permissions**.
1. Do one of the following:
   - **Bulk Add Permissions**: Review the recommendations, add or clear recommendation categories as needed, and then click **Add Permissions**.

     If you accept a participant category, such as All or DSPs, sharing is enabled for current participants of that type, and also future participants of that type that join the UID2 ecosystem.
   
   - **Search and Add Permissions**: If you prefer, you can search for individual participants to share with. For details, see [Using Search to Add Sharing Relationships](#using-search-to-add-sharing-relationships).
1. Save changes.

NOTE: When you enable sharing permission, this allows the selected sharing participants to access your decryption keys. Each participant that you enable for sharing can use your keys, via the SDK, to decrypt a UID2 token into a raw UID2. However, granting permission is just the first step. In order for sharing to occur, you must send the tokens to the participant. The UID2 Portal enables the permissions. It does not send any data&#8212;that is up to you.
