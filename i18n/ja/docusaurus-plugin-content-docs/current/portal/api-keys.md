---
title: API Keys
description: Set up and manage your API keys.
hide_table_of_contents: false
sidebar_position: 07
---

import Link from '@docusaurus/Link';

# API Keys

In the UID2 Portal, on the **API Keys** page, you can perform all activities relating to managing the API keys for your UID2 account, including the following:

- [Adding an API Key](#adding-an-api-key)
- [Modifying an API Key](#modifying-an-api-key)
- [Deleting an API Key](#deleting-an-api-key)

## Overview

The API key and client secret allow you to connect to the UID2 Operator Service and call API endpoints, directly or via one of the UID2 SDKs. These values identify you to the service.

When you add an API key in the UID2 Portal, it's very important that you store the key and its corresponding secret securely and do everything necessary to make sure that these values are not compromised. For more information, see [API Key and Client Secret](../getting-started/gs-credentials.md#api-key-and-client-secret).

We recommend rotating each API key on a yearly basis. 

When you add an API key, you can assign one or more of the following permissions:

- Mapper
- Generator
- Sharer
- Bidder

For details, see [API Permissions](../getting-started/gs-permissions.md).

## Adding an API Key

To add an API key, complete the following steps:

1. Log in to your UID2 Portal account.
1. On the **API Keys** page, click **Add API Key**.
1. In the  **Add API Key** page, provide a name for the new key.
1. In the API Permissions section, choose one or more permissions for your key.

    Choose only the permissions that you need. For example, if you're a publisher, choose the Generator role. For details, see [API Permissions](../getting-started/gs-permissions.md).

    :::note
    If the permission that you want to add isn't available for selection, ask your UID2 contact.
    :::

1. Click **Add API Key**.

   In the **API Key (Your API Key Name) Credentials** page, the API key and secret are displayed.
   
1. In each field, click ![the Copy icon](images/icon-copy-solid.png) (the Copy icon) to copy the value. Store the Secret and Key values in a secure location, and do not share them.

   When you close the window, these values are not saved and are no longer available to you. If they are lost, you'll need to add a new key.

1. When done, click **Close**.

1. At the reminder prompt, you have a chance to go back if you didn't yet save the values. Click **Cancel** to go back, or **Close** to confirm.

   On the **API Keys** page, the new key is displayed with the name, Key ID, permissions, and the date it was created.

## Modifying an API Key

After you've added an API key, you can edit the following:

- API key name
- Permission assignments 

To modify an API key, complete the following steps:

1. In the UID2 Portal, go to the **API Keys** page.
1. Find the key on the list.
1. In the Actions column, click ![the Edit icon](images/icon-pencil-solid.png) (the Edit icon).
1. Update the information, and then click **Save Key**.

## Deleting an API Key

If a key is compromised, you'll need to remove it.

:::warning
Be sure that your implementation is updated with a new key before deleting an active key. When you delete a key, any subsequent API traffic using that key is rejected.
:::

To delete an API key, follow these steps:

1. Find the key on the list and then, in the Actions column, click ![the Delete icon](images/icon-trash-can-solid.png) (the Delete icon).
1. At the confirmation message, type the API key to confirm that you want to delete it. You can copy and paste from the display.
2. Click **Delete Key**.

   The key is removed from the display and is no longer valid.
