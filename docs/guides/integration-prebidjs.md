---
id: integration-prebid
title: Prebid.js Integration
sidebar_label: Prebid.js
pagination_label: Prebid.js Integration
description: Information about integrating with Prebid.js as part of your UID2 implementation.
hide_table_of_contents: false
sidebar_position: 04
---

# Prebid.js Integration Guide

This guide is for publishers who want to integrate with UID2 and generate [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) (advertising tokens) to be passed by Prebid.js in the RTB bid stream.

UID2 provides a [Prebid.js module](https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html) that handles generating, storing, and refreshing UID2 tokens, as well as passing these tokens to the bid stream.

In order to follow this guide you will need to make changes to the HTML and JavaScript on your site. There is no server-side work required.

To integrate with UID2 using Prebid.js you will need to complete the following steps:

1. Complete the [UID2 Account Setup](../getting-started/gs-account-setup.md).
2. Add Prebid.js to your site.
3. Configure the UID2 module.

:::info
The UID2 module supports more advanced use-cases in which UID2 tokens are generated or refreshed server-side. To learn more, see the [Prebid.js Advanced Integration Guide](./integration-prebid.md).
:::

## Complete UID2 Account Setup

Complete the UID2 account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page. You will need to provide a list of domain names for the sites that you will be using with Prebid.js.

When account setup is complete you will be provided with a **public key** and **subscription ID**. These will be used to configure the UID2 module.

:::tip
Only root-level domains are required for account setup. For example, if you are going to use UID2 with Prebid.js on example.com and shop.example.com, you only need to provide the domain name example.com.
:::

## Add Prebid.js to your site

Follow the [Prebid.js documentation](https://docs.prebid.org/dev-docs/getting-started.html) to add Prebid.js to your site. Make sure to use Prebid.js version **TODO** or higher.

When you download the Prebid.js package, add the UID2 module by checking the box next to the module named "Unified ID 2.0". The module is listed under the section *User ID Modules*.

Once you have added Prebid.js to your site and confirmed that it is working properly, you are ready to configure the UID2 module.

:::tip
Ensure the UID2 module is installed by finding the string "uid2IdSystem" in the [`pbjs.installedModules` array](https://docs.prebid.org/dev-docs/publisher-api-reference/installedModules.html).
:::

## Configure the UID2 module

To configure the UID2 module, call `pbjs.setConfig` with an object containing the **public key** and **subscription ID** obtained during account setup, as well as the user's [DII](../ref-info/glossary-uid.md#gl-dii) (email address or phone number).

The following sections demonstrate the different ways to configure the UID2 module, as well as the requirements for the DII passed to the module.

:::info
The user's DII can be passed to the UID2 module hashed or unhashed. If the DII is passed to the module hashed, it must be normalized before hashing.

See [Normalization and Encoding](../getting-started/gs-normalization-encoding.md) for more details.
:::

:::tip
The UID2 module will ensure that all DII is hashed and encrypted before sending it to the UID2 service.
:::

### Configure for email

Configure the UID2 module with an email address:

```js
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'uid2',
      params: {
        serverPublicKey: '...server public key...',
        subscriptionId: '...subcription id...',
        email: 'user@example.com',
      }
    }]
  }
});
```

The UID2 module will normalize and hash the email address before sending the encrypted hash to the UID2 service.

### Configure for phone

Configure the UID2 module with a phone number:

```js
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'uid2',
      params: {
        serverPublicKey: '...server public key...',
        subscriptionId: '...subcription id...',
        phone: '+1111111111',
      }
    }]
  }
});
```

The UID2 module will hash the phone number before sending the encrypted hash to the UID2 service.

The publisher is responsible for normalizing the phone number. Refer to [Normalization and Encoding](../getting-started/gs-normalization-encoding.md#phone-number-normalization) for details on phone number normalization.

### Configure for hashed email

Configure the UID2 module with a hashed email address:

```js
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'uid2',
      params: {
        serverPublicKey: '...server public key...',
        subscriptionId: '...subcription id...',
        emailHash: 'eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=',
      }
    }]
  }
});
```

The UID2 module will encrypt the hash before sending it to the UID2 service.

The publisher is responsible for normalizing and hashing the email address. Refer to [Normalization and Encoding](../getting-started/gs-normalization-encoding.md) for details on email address normalization and hashing.

### Configure for hashed phone

Configure the UID2 module with a hashed phone number:

```js
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'uid2',
      params: {
        serverPublicKey: '...server public key...',
        subscriptionId: '...subcription id...',
        phoneHash: 'eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=',
      }
    }]
  }
});
```

The UID2 module will encrypt the hash before sending it to the UID2 service.

The publisher is responsible for normalizing and hashing the phone number. Refer to [Normalization and Encoding](../getting-started/gs-normalization-encoding.md) for details on phone number normalization and hashing.

## Check the integration

Check that Prebid.js and the UID2 module are configured correctly by calling `pbjs.getUserIds().uid2`. If everything is working, this will return the UID2 token.

## Reconfigure the UID2 module as required

If a user is visiting your site frequently, the UID2 module will be able to continually refresh the UID2 token.  However there are cases where this is not possible.

A UID2 token can only be refreshed for a certain amount of time. If a user returns to your site after this amount of time, you will need to re-configure the UID2 module.

To check if the UID2 module needs to be reconfigured:

```js
TODO
```

## Optional: Set the UID2 API Base URL

The UID2 module uses a default UID2 API base URL of `https://prod.uidapi.com`. To use a different base URL, set the `params.uid2ApiBase` parameter when configuring the UID2 module:

```js
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'uid2',
      params: {
        uid2ApiBase: baseUrl,
        // ...
      }
    }]
  }
});
```

Refer to [Environments](../getting-started/gs-environments.md) for the list of possible base URLs.

The default URL points to a server in the USA. Publishers should take into account where their readers are based, and consider choosing a different base URL in order to reduce latency.
