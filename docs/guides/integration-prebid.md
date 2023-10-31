---
title: Prebid.js Integration
sidebar_label: Prebid.js
pagination_label: Prebid.js Integration
description: Information about integrating with Prebid.js as part of your UID2 implementation.
hide_table_of_contents: false
sidebar_position: 04
---

# Prebid.js Integration Guide

This guide is for publishers who want to integrate with UID2 and generate [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) (advertising tokens) to be passed by Prebid.js in the RTB bid stream.

This guide does not apply to publishers that want to use a [private operator](../ref-info/glossary-uid.md#gl-private-operator), or those that want to generate tokens server-side.
Those publishers should follow the [Prebid.js Advanced Integration Guide](./integration-prebid-advanced.md).

UID2 provides a [Prebid.js module](https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html) with the following features:

- UID2 token generation.
- Automatic refreshing of UID2 tokens.
- Automatic storage of UID2 tokens in the browser.
- Automatic passing of UID2 tokens to the bid stream.

In order to follow this guide you will need to make changes to the HTML and JavaScript on your site. No server-side work is required.

To integrate with UID2 using Prebid.js you will need to complete the following steps:

1. Complete the [UID2 Account Setup](../getting-started/gs-account-setup.md).
2. Add Prebid.js to your site.
3. Configure the UID2 module.

## Complete UID2 Account Setup

Complete the UID2 account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page. You will need to provide a list of domain names for the sites that you will be using with Prebid.js as part of the account setup process.

When account setup is complete you will be provided with a **public key** and **subscription ID**. These will be used to configure the UID2 module.

:::tip
Only root-level domains are required for account setup. For example, if you are going to use UID2 with Prebid.js on example.com, shop.example.com, and example.org, you only need to provide the domain names example.com and example.org.
:::

## Add Prebid.js to your site

Follow the [Prebid.js documentation](https://docs.prebid.org/dev-docs/getting-started.html) to add Prebid.js to your site. Make sure to use Prebid.js version 8.21.0 or higher.

When you download the Prebid.js package, add the UID2 module by checking the box next to the module named "Unified ID 2.0". The module is listed under the section *User ID Modules*.

Once you have added Prebid.js to your site and confirmed that it is working properly, you are ready to configure the UID2 module.

:::tip
Ensure the UID2 module is installed by finding the string "uid2IdSystem" in the [`pbjs.installedModules` array](https://docs.prebid.org/dev-docs/publisher-api-reference/installedModules.html).
:::

## Configure the UID2 module

To configure the UID2 module, call `pbjs.setConfig` with an object containing the **public key** and **subscription ID** obtained during account setup, as well as the user's hashed or unhashed [DII](../ref-info/glossary-uid.md#gl-dii) (email address or phone number).

Once configured, the UID2 module will generate a UID2 token for the user and store it in the user's browser. The module will automatically refresh the token as required while your site is open in the user's browser.

The user's DII can be passed to the UID2 module hashed or unhashed. If the DII is passed to the UID2 module unhashed, the module will hash it for you. If the DII is passed to the module hashed, it must be normalized before hashing. See [Normalization and Encoding](../getting-started/gs-normalization-encoding.md) for more details.

The UID2 module will encrypt the hashed DII before sending it to the UID2 service.

For a given user on your site, the module can be configured for **one** of the following at a time:

- An email address,
- A hashed email address,
- A phone number, or
- A hashed phone number.

If the module is configured multiples times it will use the most recent configuration values.

The following sections demonstrate the different ways to configure the UID2 module and list the requirements for the DII passed to the module.

:::note
The examples assume you are using the UID2 production environment. During integration testing use the UID2 integration environment by setting `params.uid2ApiBase` to `"https://operator-integ.uidapi.com"`. Tokens from the UID2 integration environment must not be passed to the bid stream. You will have a different **subscription ID** and **public key** for the integration environment.
:::

### Configure for email address

Configure the UID2 module with an email address:

```js
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'uid2',
      params: {
        serverPublicKey: publicKey,
        subscriptionId: subscriptionId,
        email: 'user@example.com',
      }
    }]
  }
});
```

No normalization or hashing is required by the publisher.

The UID2 module will normalize and hash the email address before sending the encrypted hash to the UID2 service.

### Configure for phone number

Configure the UID2 module with a phone number:

```js
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'uid2',
      params: {
        serverPublicKey: publicKey,
        subscriptionId: subscriptionId,
        phone: '+1111111111',
      }
    }]
  }
});
```

**The publisher is responsible for normalizing the phone number**. Refer to [Normalization and Encoding](../getting-started/gs-normalization-encoding.md#phone-number-normalization) for details on phone number normalization.

The UID2 module will hash the phone number before sending the encrypted hash to the UID2 service.

### Configure for hashed email address

Configure the UID2 module with a hashed email address:

```js
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'uid2',
      params: {
        serverPublicKey: publicKey,
        subscriptionId: subscriptionId,
        emailHash: 'eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=',
      }
    }]
  }
});
```

**The publisher is responsible for normalizing and hashing the email address**. Refer to [Normalization and Encoding](../getting-started/gs-normalization-encoding.md) for details on email address normalization and hashing.

The UID2 module will encrypt the hash before sending it to the UID2 service.

### Configure for hashed phone number

Configure the UID2 module with a hashed phone number:

```js
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'uid2',
      params: {
        serverPublicKey: publicKey,
        subscriptionId: subscriptionId,
        phoneHash: 'eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=',
      }
    }]
  }
});
```

**The publisher is responsible for normalizing and hashing the phone number**. Refer to [Normalization and Encoding](../getting-started/gs-normalization-encoding.md) for details on phone number normalization and hashing.

The UID2 module will encrypt the hash before sending it to the UID2 service.

## Module storage

By default the UID2 module will store data using local storage. To use a cookie instead, set `params.storage` to "cookie". See the [UID2 module documentation](https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html#unified-id-20-configuration) for more details.

## When to pass DII to the UID2 module

If possible, configure the UID2 module with the user's DII on each page load.

When the UID2 module is configured it will check for an existing UID2 token in the user's browser. If there is an existing token that was generated from the same DII and the token has not expired or can be refreshed, the module will use or refresh the existing token instead of generating a new token.

As a result it's recommended to configure the UID2 module with the user's DII on each page load. Doing so will ensure the user has a UID2 token, and will only generate a new token if one is required.

In some cases the user's DII is not available on page load and obtaining the DII has some associated cost. For example, an API call might be required to fetch the DII, or the user has to be prompted to enter their DII.

That cost can be avoided by checking for an existing token that is able to be used or refreshed.

To check for an existing token that is able to be used or refreshed, check the value returned by `pbjs.getUserIds().uid2`:

```js
const params = {};

if (!pbjs.getUserIds().uid2) {
  // There is no token that can be used or refreshed.
  // The UID2 module must be configured with DII in order to generate a new token.
  params.email = getUserEmail();
  params.serverPublicKey = publicKey;
  params.subscriptionId = subscriptionId;
}

pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'uid2',
      params: params
    }]
  }
});
```

## Checking the integration

Check that the UID2 module has successfully generated a UID2 token by calling `pbjs.getUserIds().uid2`. If a value is returned, a token has been successfully generated.

If there are problems with the integration:

- Check the browser console logs.
- Check that you are using the correct **subscription ID** and **public key**.
- Check that the domain name of the site was provided to UID2 during account setup.
- Use the browser developer tools to inspect the API call(s) to the UID2 service.

For further help, refer to Prebid's documentation on [Troubleshooting Prebid.js](https://docs.prebid.org/troubleshooting/troubleshooting-guide.html) and [Debugging Prebid.js](https://docs.prebid.org/debugging/debugging.html).

## Optional: Reduce latency by setting the API base URL

By default, the UID2 module will make API calls to a UID2 server in the USA. Publishers should take into account where their users are based and consider choosing a server closer to their users in order to reduce latency.

Publishers can choose a different UID2 server by setting the optional `params.uid2ApiBase` parameter when configuring the UID2 module:

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
