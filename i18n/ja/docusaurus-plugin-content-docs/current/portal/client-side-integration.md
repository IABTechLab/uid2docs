---
title: Client-Side Integration
description: Set up and manage information needed for client-side integration.
hide_table_of_contents: false
sidebar_position: 09
---

# Client-Side Integration

In the UID2 Portal, if you want to use an implementation option that generates UID2 tokens on the client side, you'll need to define one or more of each of the values shown in the following table.

| Value | Details | Documentation Link |
| :--- | :--- | :---|
| Key pair | At least one. In your implementation, you'll share the public key. | [Subscription ID and Public Key](getting-started/gs-credentials.md#subscription-id-and-public-key) |
| Domain | At least one. Provide a complete list of your root-level domains. | [Client-Side Implementation for Publishers](../getting-started/gs-account-setup.md#client-side-implementation-for-publishers) |

:::important
It's important to provide a complete list of root-level domain names for your sites. This is a security measure, for client-side implementation only. If a domain is not defined in the UID2 Portal, UID2 token requests from that domain will fail.
:::

On the Client-Side Integration page you can perform all activities relating to setting up and managing these values.

:::note
When you go into the Client-Side Integration page, you'll be prompted to provide missing configuration items if you haven't yet created at least one key pair and at least one top-level (root-level) domain.
:::

## Client-Side Implementation Options

Client-side implementation options are shown in the following table. The options available to you depend on your role.

| Client-Side Implementation Option | Available For (Role) | Documentation Link |
| :--- | :--- | :---|
| UID2 JavaScript SDK | Publishers, Advertisers | [Client-Side Integration Guide for JavaScript](../guides/publisher-client-side.md) |
| Prebid.js client-side integration | Publishers only |[UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md) |

## Adding a Key Pair

To add a key pair, complete the following steps:

1. Log in to your UID2 Portal account.
1. On the **Client-Side Integration** page, click **Add Key Pair**.
1. In the **Add Key Pair** overlay, provide a name, and then click **Add Key Pair**.

   On the **Client-Side Integration** page, the new key pair is displayed with the name, Subscription ID, public key, and the date it was created.

## Copying or Viewing a Public Key

When you create a key pair in the Client-Side Integration page, you can share your public key. The UID2 service uses the corresponding private key, plus other values, to authenticate your messages.

To view or copy a public key, follow these steps:

1. In the UID2 Portal, go to the **Client-Side Integration** page.
1. Find the key pair on the list and then, in the Public Key column, do one of the following:

   - Click ![the View Public Key icon](images/icon-eye-solid.png) (the View Public Key icon) to view the key in a popup.
   - Click ![the Copy icon](images/icon-copy-solid.png)  (the Copy Public Key to Clipboard icon).

     Save the public key in a safe place.

## Changing the Name of a Key Pair

When you've created a key pair, the only value you can change is the name. To change the value, you'll need to create a new key pair.

To change the name of a key pair, complete the following steps:

1. In the UID2 Portal, go to the **Client-Side Integration** page.
1. Find the key pair on the list.
1. In the Actions column, click ![the Edit icon](images/icon-pencil-solid.png) (the Edit icon).
1. Update the name, and then click **Save Key Pair**.

## Deleting a Key Pair

To delete a key pair, follow these steps:

1. Find the key on the list and then, in the Actions column, click ![the Delete icon](images/icon-trash-can-solid.png) (the Delete icon).
1. At the confirmation message, type the Subscription ID to confirm that you want to delete the key pair. You can copy and paste from the display.
1. Click **Delete Key Pair**.

   The key pair is removed from the display and is no longer valid.

## Adding Domains

:::tip
Only root-level domains are required for account setup. For example, if you're going to implement UID2 to generate tokens on the client side on example.com, shop.example.com, and example.org, you only need to provide the domain names example.com and example.org.
:::

To add one or more top-level (root-level) domains, complete the following steps:

1. Log in to your UID2 Portal account.
1. On the **Client-Side Integration** page, click **Add Domains**.
1. In the **Add Domains** overlay, type or paste the list of domains. Note:

   - The following are valid as separators for domains in the list: comma, semicolon, space, tab, or new line.
   - By default, the domains you add are appended to the list. To replace the existing list, check **Replace all existing domains with the new ones.**

1. Click **Add Domains**.

   On the **Client-Side Integration** page, the list is updated.

## Changing a Domain

To change the name of a domain on the list, complete the following steps:

1. In the UID2 Portal, go to the **Client-Side Integration** page.
1. Find the domain on the list.
1. In the Actions column, click ![the Edit icon](images/icon-pencil-solid.png) (the Edit icon).
1. Update the name, and then click **Save Domain**.

## Deleting a Domain

To delete a domain from your domains list, follow these steps:

1. In the UID2 Portal, go to the **Client-Side Integration** page.
1. Find the domain on the list.
1. In the Actions column, click ![the Delete icon](images/icon-trash-can-solid.png) (the Delete icon).
1. At the confirmation message, click **Delete Domain**.

   The domain is removed from your domains list.

## Deleting Multiple Domains

There are two ways that you can delete more than one domain at a time:

- Choose multiple individual domains from the list and then delete the selected domains.
- Replace your existing domains list with an updated list that you are adding. See [Adding Domains](#adding-domains).

To multi-select domains for deletion:

1. In the UID2 Portal, go to the **Client-Side Integration** page.
1. In the **Top-Level Domains** section of the page, check the box below the heading.

   All domains are selected for deletion.

1. Conditional: if you want to keep some of the domains, clear the check boxes for those domains.

1. Above the list, click ![the Delete icon](images/icon-trash-can-solid.png) Delete Domains.

1. At the confirmation message, click **Delete Domains**.

   The domains are removed from your domains list.
