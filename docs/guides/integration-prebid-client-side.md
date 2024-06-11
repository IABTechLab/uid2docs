---
title: UID2 Client-Side Integration Guide for Prebid.js
sidebar_label: Client-Side Integration for Prebid.js
pagination_label: UID2 Client-Side Integration for Prebid.js
description: Information about setting up a client-side Prebid.js integration.
hide_table_of_contents: false
sidebar_position: 04
---

import Link from '@docusaurus/Link';
import AddPrebidjsToYourSite from '/docs/snippets/_prebid-add-prebidjs-to-your-site.mdx';
import StoreUID2TokenInBrowser from '/docs/snippets/_prebid-storing-uid2-token-in-browser.mdx';

# UID2 Client-Side Integration Guide for Prebid.js

This guide is for publishers who have access to <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> (email address or phone number) on the client side and want to integrate with UID2 and generate <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> (advertising tokens) to be passed by Prebid.js in the RTB <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link>.

To integrate with UID2 using Prebid.js, you'll need to make changes to the HTML and JavaScript on your site. No server-side work is required if you follow this guide.

## Prebid.js Version

This implementation requires Prebid.js version 8.21.0 or later. For version information, see [https://github.com/prebid/Prebid.js/releases](https://github.com/prebid/Prebid.js/releases).

If you need to use an earlier version of Prebid.js, use the implementation solution presented in the [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-server-side.md) instead.

## Integration Example

An example of the UID2 Prebid.js client-side integration is available at the following links:

- Code: [Example Prebid.js UID2 Integration](https://github.com/IABTechLab/uid2docs/tree/main/static/examples/cstg-prebid-example)
- Running site: [UID2 Prebid.js Client-Side Integration Example](https://unifiedid.com/examples/cstg-prebid-example/)

## Integration Overview: High-Level Steps

You'll need to complete the following steps:

1. [Complete UID2 account setup](#complete-uid2-account-setup).
2. [Add Prebid.js to your site](#add-prebidjs-to-your-site).
3. [Configure the UID2 module](#configure-the-uid2-module).


### Complete UID2 Account Setup

Complete the UID2 account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page. As part of the account setup process for a client-side implementation, you'll need to provide a list of **domain names** for the sites that you'll be using with Prebid.js.

:::tip
Only root-level domains are required for account setup. For example, if you're going to use UID2 with Prebid.js on example.com, shop.example.com, and example.org, you only need to provide the domain names example.com and example.org.
:::

When account setup is complete, you'll receive a public key and Subscription ID. These values are unique to you, and you'll use them to configure the UID2 module. For details, see [Subscription ID and Public Key](../getting-started/gs-credentials.md#subscription-id-and-public-key).

### Add Prebid.js to Your Site

<AddPrebidjsToYourSite />

### Configure the UID2 Module

To configure the UID2 module, call `pbjs.setConfig` with an object containing the **public key** and **Subscription ID** that you received during account setup, as well as the user's hashed or unhashed email address or phone number.

Once it's configured, the UID2 module generates a UID2 token for the user and stores it in the user's browser. The module automatically refreshes the token as needed as long as your site is open in the user's browser.

You can configure the UID2 module using any one of the four accepted DII formats, for any specific user:

- Normalized or un-normalized email address
- Normalized and hashed email address
- Normalized phone number
- Normalized and hashed phone number

Notes:

- The DII format might vary per user, but you can only send one value per user.
- If the module is configured multiple times, it uses the most recent configuration values.
- If you want to pass the DII to the module already hashed, remember to normalize it before hashing. For details, see [Normalization and Encoding](../getting-started/gs-normalization-encoding.md).
- The UID2 module encrypts the hashed DII before sending it to the UID2 service.

The following code snippet demonstrates the different ways that you can configure the UID2 module.

```js
const baseConfig = {
  userSync: {
    userIds: [{
      name: 'uid2',
      params: {
        serverPublicKey: publicKey,
        subscriptionId: subscriptionId,
        // Choose only one of the following: email, emailHash, phone, or phoneHash
        email: 'user@example.com', // Normalized or non-normalized, unhashed email address
        // emailHash: 'eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=', // Normalized and hashed email address
        // phone: '+1111111111', // Normalized phone number
        // phoneHash: 'eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=', // Normalized and hashed phone number
      }
    }]
  }
};
```

:::note
This example assumes that you're using the UID2 production environment. During integration testing, use the UID2 integration environment by setting `params.uid2ApiBase` to `'https://operator-integ.uidapi.com'`. Tokens from the UID2 integration environment are not valid for passing to the bidstream. For the integration environment, you will have different **Subscription ID** and **public key** values.
:::

## Storing the UID2 Token in the Browser

<StoreUID2TokenInBrowser />

## When to Pass DII to the UID2 Module

When the UID2 module is configured, it checks for an existing UID2 token in the user's browser. If there is a token that was generated from the same DII, and either it's still valid or it can be refreshed, the module uses it, and refreshes if needed.

If there is no existing token, or the token has expired and cannot be refreshed, the UID2 module cannot generate a new token without DII.

:::tip
Configure the UID2 module with the user's DII on each page load. This is the recommended approach.
:::

In some cases, the user's DII is not available on page load, and getting the DII has some associated cost. For example, an API call might be required to fetch the DII, or the user has to be prompted to provide the DII information.

If the UID2 token has expired and cannot be refreshed, you must configure the UID2 module with DII to generate a new token. To do this, check the value returned by `pbjs.getUserIds().uid2`, as shown in the following example:

```js
const params = {}; 
 
if (!pbjs.getUserIds().uid2) { 
  // There is no token that can be used or refreshed. 
  // The UID2 module must be configured with DII to generate a new token. 
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

To check that the UID2 module has successfully generated a UID2 token, call `pbjs.getUserIds().uid2`. If a value is returned, a valid UID2 token exists in the UID2 module.

If there are problems with the integration, here are some steps you can take:

- Check the browser console logs.
- Check the values for **Subscription ID** and **public key**:
  - Make sure they are exactly the same values that you received from the UID2 team.
  - Check that you have the correct values for the environment you're using. You'll have different **Subscription ID** and **public key** values for each [environment](../getting-started/gs-environments.md).
- Check that you provided the domain name of the site to the UID2 team during account setup. If needed, to confirm, ask your UID2 contact.
- Use the browser developer tools to inspect the API calls to the UID2 service.

For additional help, refer to Prebid's documentation on [Troubleshooting Prebid.js](https://docs.prebid.org/troubleshooting/troubleshooting-guide.html) and [Debugging Prebid.js](https://docs.prebid.org/debugging/debugging.html).

An example of a tool for validating and debugging Prebid.js configuration is Professor Prebid, an open-source Chrome extension:

- Chrome web store download location: [Professor Prebid](https://chromewebstore.google.com/detail/professor-prebid/kdnllijdimhbledmfdbljampcdphcbdc)
- Documentation on prebid.org: [Professor Prebid User Guide](https://docs.prebid.org/tools/professor-prebid.html)

## Optional: Reduce Latency by Setting the API Base URL for the Production Environment
<!-- GWH "Optional: Reduce Latency by Setting the API Base URL for the Production Environment" section is identical for client side and server side. -->
By default, the UID2 module makes API calls to a UID2 production environment server in the USA. Depending on where your users are based, you might consider choosing a server closer to your users to reduce latency.

To specify a different UID2 server when you're configuring the UID2 module, set the optional params.uid2ApiBase parameter, as shown in the following example:

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

For the list of valid base URLs, see [Environments](../getting-started/gs-environments.md).
