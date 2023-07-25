---
title: Sharing Permissions
description: Learn how to configure sharing permissions in the UID2 Portal.
hide_table_of_contents: false
sidebar_position: 03
---

# Sharing Permissions

Configuring your sharing permissions opens the door to you being able to share UID2 information with other UID2 participants.

<!-- It includes the following:

- [UID2 Portal Sharing Permissions](#xxx)
  - [Steps for Granting Sharing Permission](#xxx)
  - [xxx](#xxx)
- [xxx](#xxx)
  - [xxx](#xxx)
  - [xxx](#xxx)
- [xxx](#xxx)
- [xxx](#xxx) -->

There are many options so that you can create the exact sharing relationships that you want:

- You can share with one, multiple, or all participants in a specific category (Publishers, Advertisers, DSPs, or Data Providers)
- You can create a sharing relationship only with current participants or, optionally, you can also choose to automatically create relationships with future participants that also choose to share.
- You can choose to have your name on the sharing list, so that others can create sharing relationships with you, or you can participate in sharing without your name appearing on the list.
- You can generate a Sharing Number that you can share with specific participants you want to share with. They can use the Sharing Number to create a sharing relationship with you even if you chose to be private.

>NOTE: Configuring a sharing relationship with another participant doesn't mean that data is shared. It only makes it possible. Information is only shared when you explicitly send it to another participant, or another participant sends it to you.

## Sharing Permissions Overview

So that the intended receiver of UID2 tokens can decrypt them into raw UID2s, the sender must grant permission to the receiver. Sharing permissions are defined through the UID2 Portal. For details, see [Sharing Permissions](../portal/sharing-permissions.md).

For UID2 Portal access, ask your UID2 contact. For details, see [Before Creating Your Account](participant-info.md#before-creating-your-account). If you're completely new to UID2, see [Account Setup](../getting-started/gs-account-setup.md).

## Sharing Options

The following sharing options are available via the UID2 Portal. These options are not mutually exclusive&#8212;you can mix and match as needed:

- You can automatically grant permission to all participants of a specific type, such as all publishers, advertisers, DSPs, or data providers.<!--  (link to sub-section) --> For example, we recommend that publishers grant sharing permission to all DSPs.
- You can grant permission to one or more specific participants<!--  (link to sub-section) -->. If you choose this option, all new participants of the selected participant type will automatically have permission to decrypt any data that you send to them. For details, see [Key Refresh Cadence for Sharing](sharing-best-practices.md#key-refresh-cadence-for-sharing).

  For example, let's say you choose to share with all of 20 existing DSPs. The next day, when DSP 21 signs up for sharing, DSP 21 will automatically have permission to decrypt data that you send. To share with DSP 21, just send one or more UID2 tokens, and DSP 21 will be able to decrypt the tokens into raw UID2s. Because you chose automatic sharing, you do not need to log in to explicitly update your sharing permissions to include DSP 21, or any future DSPs that sign up for the UID2 ecosystem.
  
You can update your sharing permission in the UID2 Portal at any point.

### Steps for Granting Sharing Permission

At a high level, enabling sharing permissions includes the following steps. For exact instructions for configuring your sharing options in the UID2 Portal, refer to [Sharing Permissions](../portal/sharing-permissions.md).

>NOTE: As well as granting sharing permission, you'll need to integrate the SDK into your code.

1. Log in to your UID2 Portal account.
1. Click **Sharing Permissions**.
1. Do one of the following:
   - **Share with one participant**: Search for a UID2 participant that you want to send data to, and select the participant.
   - **Share with a participant type**: Select a participant type that you want to start sharing with. Sharing will be enabled for current participants of that type, and also future participants of that type that join the UID2 ecosystem.
1. Save changes.

<!-- {**GWH_KT Gen to revisit the above procedure when UID2 portal is available**} -->
 
NOTE: When you enable sharing permission, this allows the selected sharing participants to access your decryption keys. Each participant that you enable for sharing can use your keys, via the SDK, to decrypt a UID2 token into a raw UID2. However, granting permission is just the first step. In order for sharing to occur, you must send the tokens to the participant. The UID2 Portal enables the permissions. It does not send any data&#8212;that is up to you.
