---
title: Prebid.js Express Integration
sidebar_label: Prebid.js Express Integration
pagination_label: Prebid.js Express Integration
description: Information about integrating with Prebid.js as part of your UID2 implementation.
hide_table_of_contents: false
sidebar_position: 04
---

# Prebid.js Express Integration Guide

This guide is for publishers who want to integrate with UID2 and generate [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) (advertising tokens) to be passed by Prebid.js in the RTB bid stream.

This guide does not apply to publishers who want to use a [private operator](../ref-info/glossary-uid.md#gl-private-operator), or want to generate tokens server-side.
Those publishers should follow the [Prebid.js Advanced Integration Guide](./integration-prebid-advanced.md).

UID2 provides a [Prebid.js module](https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html) with the following features:

- UID2 token generation
- Automatic refreshing of UID2 tokens
- Automatic storage of UID2 tokens in the browser
- Automatic passing of UID2 tokens to the bid stream

To integrate with UID2 using Prebid.js, you'll need to make changes to the HTML and JavaScript on your site. No server-side work is required if you follow this guide. If you want to generate tokens with a server-side API call, or are using a private operator, follow the [Prebid.js Advanced Integration Guide](./integration-prebid-advanced.md) instead.

You'll need to complete the following steps:

1. [Complete UID2 account setup](#complete-uid2-account-setup)
2. [Add Prebid.js to your site](#add-prebidjs-to-your-site)
3. [Configure the UID2 module](#configure-the-uid2-module)

For an example application, see the UID2 Prebid.js example:
- Code: [UID2 Prebid.js code on GitHub](https://github.com/IABTechLab/uid2docs/tree/main/static/examples/cstg-prebid-example)
- Running site: [UID2 Prebid.js example](https://unifiedid.com/examples/cstg-prebid-example/)

## Prebid.js Version

This implementation requires Prebid.js version 8.21.0 or later. For version information, see [https://github.com/prebid/Prebid.js/releases](https://github.com/prebid/Prebid.js/releases).

## Complete UID2 Account Setup

Complete the UID2 account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page. As part of the account setup process, you'll need to provide a list of domain names for the sites that you'll be using with Prebid.js.

When account setup is complete, you'll receive a **public key** and **subscription ID**. These values are unique to you, and you'll use them to configure the UID2 module.

:::tip
Only root-level domains are required for account setup. For example, if you're going to use UID2 with Prebid.js on example.com, shop.example.com, and example.org, you only need to provide the domain names example.com and example.org.
:::

## Add Prebid.js to Your Site

To add Prebid.js to your site, follow the [Prebid.js documentation](https://docs.prebid.org/dev-docs/getting-started.html). Be sure to use Prebid.js version 8.21.0 or later.

When you download the Prebid.js package, add the UID2 module by checking the box next to the module named **Unified ID 2.0**, listed under the section **User ID Modules**.

When you've added Prebid.js to your site and confirmed that it's working properly, you're ready to configure the UID2 module.

:::tip
To make sure that the UID2 module is installed, find the string `uid2IdSystem` in the [`pbjs.installedModules` array](https://docs.prebid.org/dev-docs/publisher-api-reference/installedModules.html).
:::

## Configure the UID2 Module

To configure the UID2 module, call `pbjs.setConfig` with an object containing the **public key** and **subscription ID** that you received during account setup, as well as the user's hashed or unhashed [DII](../ref-info/glossary-uid.md#gl-dii) (email address or phone number).

Once it's configured, the UID2 module generates a UID2 token for the user and stores it in the user's browser. The module automatically refreshes the token as required while your site is open in the user's browser.

You can pass the user's DII to the UID2 module either hashed or unhashed. If you pass the DII unhashed, the UID2 module hashes it for you. If want to pass the DII to the module already hashed, you must normalize it before hashing. For details, see [Normalization and Encoding](../getting-started/gs-normalization-encoding.md).

The UID2 module encrypts the hashed DII before sending it to the UID2 service.

You can configure the module to send any one of the four accepted DII formats, for any specific user. The DII format might vary per user but you can only send one value per user.

The following sections demonstrate the different ways that you can configure the UID2 module and list the requirements for the DII passed to the module:

- [Configure for Email Address](#configure-for-email-address)
- [Configure for Hashed Email Address](#configure-for-hashed-email-address)
- [Configure for Phone Number](#configure-for-phone-number)
- [Configure for Hashed Phone Number](#configure-for-hashed-phone-number)

If the module is configured multiples times, it uses the most recent configuration values.

:::note
The examples assume that you're using the UID2 production environment. During integration testing, use the UID2 integration environment by setting `params.uid2ApiBase` to `"https://operator-integ.uidapi.com"`. Tokens from the UID2 integration environment are not valid for passing to the bid stream. For the integration environment, you will have different **subscription ID** and **public key** values.
:::

### Configure for Email Address

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

The UID2 module normalizes and hashes the email address before sending the encrypted hash to the UID2 service.

### Configure for Hashed Email Address

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

**The publisher is responsible for normalizing and hashing the email address**. For details, see [Normalization and Encoding](../getting-started/gs-normalization-encoding.md).

The UID2 module encrypts the hash before sending it to the UID2 service.

### Configure for Phone Number

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

**The publisher is responsible for normalizing the phone number**. For details, see [Phone Number Normalization](../getting-started/gs-normalization-encoding.md#phone-number-normalization).

The UID2 module hashes the phone number before sending the encrypted hash to the UID2 service.

### Configure for Hashed Phone Number

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

**The publisher is responsible for normalizing and hashing the phone number**. For details, see [Normalization and Encoding](../getting-started/gs-normalization-encoding.md).

The UID2 module encrypts the hash before sending it to the UID2 service.

## Module Storage

By default, the UID2 module stores data using local storage. To use a cookie instead, set `params.storage` to `cookie`. For details, see the Prebid [Unified ID 2.0 Configuration](https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html#unified-id-20-configuration) module documentation.

## When to Pass DII to the UID2 Module

If possible, configure the UID2 module with the user's DII on each page load.

When the UID2 module is configured, it checks for an existing UID2 token in the user's browser. If there is an existing token that was generated from the same DII, and the token is still valid or can be refreshed, the module uses or refreshes the existing token instead of generating a new token.

If there is no existing token, or the token has expired and cannot be refreshed, the UID2 module cannot generate a new token without DII.

As a result, the recommended approach is to configure the UID2 module with the user's DII on each page load.

In some cases, the user's DII is not available on page load, and getting the DII has some associated cost. For example, an API call might be required to fetch the DII, or the user has to be prompted to provide the DII information.

You can potentially avoid that cost by checking for an existing token that you can use or refresh. To do this, check the value returned by `pbjs.getUserIds().uid2`:

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

## Checking the Integration

To check that the UID2 module has successfully generated a UID2 token, call `pbjs.getUserIds().uid2`. If a value is returned, a token has been successfully generated.

If there are problems with the integration, here are some steps you can take:

- Check the browser console logs.
- Check that you're using the correct **subscription ID** and **public key**.
- Check that the domain name of the site was provided to UID2 during account setup.
- Use the browser developer tools to inspect the API calls to the UID2 service.

For additional help, refer to Prebid's documentation on [Troubleshooting Prebid.js](https://docs.prebid.org/troubleshooting/troubleshooting-guide.html) and [Debugging Prebid.js](https://docs.prebid.org/debugging/debugging.html).

## Optional: Reduce Latency by Setting the API Base URL

By default, the UID2 module makes API calls to a UID2 server in the USA. Depending on where your users are based, you might consider choosing a server closer to your users in order to reduce latency.

To specify a different UID2 server when you're configuring the UID2 module, set the optional `params.uid2ApiBase` parameter, as shown in the following example:

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

For the list of possible base URLs, see [Environments](../getting-started/gs-environments.md).
