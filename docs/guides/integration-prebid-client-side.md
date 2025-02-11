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
import IntegratingWithSSO from '/docs/snippets/_integrating-with-sso.mdx';

# UID2 Client-Side Integration Guide for Prebid.js

This guide is for publishers who have access to <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> (email address or phone number) on the client side and want to integrate with UID2 and generate <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> (advertising tokens) to be passed by Prebid.js in the RTB <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link>.

To integrate with UID2 using Prebid.js, you'll need to make changes to the HTML and JavaScript on your site. No server-side work is required if you follow this guide.

## Prebid.js Version

This implementation requires Prebid.js version 8.21.0 or later. For version information, see [https://github.com/prebid/Prebid.js/releases](https://github.com/prebid/Prebid.js/releases).

<!-- Diff in Prebid.js supported version for UID2/EUID is fine: verif SS 11/19/24 -->

If you need to use an earlier version of Prebid.js, use the implementation solution presented in the [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md) instead.

## Integration Example

An example of the UID2 Prebid.js client-side integration is available at the following links:

- Code: [Example Prebid.js UID2 Integration](https://github.com/IABTechLab/uid2docs/tree/main/static/examples/cstg-prebid-example)
- Running site: [UID2 Prebid.js Client-Side Integration Example](https://unifiedid.com/examples/cstg-prebid-example/)

## Integrating with Single Sign-On (SSO)

<IntegratingWithSSO />

## Integration Overview: High-Level Steps

You'll need to complete the following steps:

1. [Complete UID2 account setup and configure account](#complete-uid2-account-setup-and-configure-account)
2. [Add Prebid.js to your site](#add-prebidjs-to-your-site)
3. [Configure the UID2 module](#configure-the-uid2-module)

### Complete UID2 Account Setup and Configure Account

To integrate with UID2, you'll need to have a UID2 account. If you haven't yet created an account, first follow the steps described on the [Account Setup](../getting-started/gs-account-setup.md) page.

When initial account setup is complete, you'll receive instructions and a link to access the [UID2 Portal](../portal/portal-overview.md), where you can create your [credentials](../getting-started/gs-credentials.md) for the production environment and configure additional values that you'll need to provide. For details, see [Getting Started with the UID2 Portal](../portal/portal-getting-started.md).

For a client-side integration you'll need to set up these values, in the UID2 Portal on the [Client-Side Integration](../portal/client-side-integration.md) page:

- Subscription ID and Public Key: See [Adding and Managing Key Pairs](../portal/client-side-integration.md#adding-and-managing-key-pairs)

- A list of **domain names** for the sites on which you'll be using Prebid.js: See [Adding and Managing Root-Level Domains](../portal/client-side-integration.md#adding-and-managing-root-level-domains)

<!-- (earlier instructions, no-portal, for EUID)
When account setup is complete, you'll receive a client keypair consisting of two values that identify you to the UID2 servers: Subscription ID and public key. These values are unique to you, and you'll use them to configure the UID2 module. For details, see [Subscription ID and Public Key](../getting-started/gs-credentials.md#subscription-id-and-public-key). 
-->

:::tip
Only root-level domains are required for account setup. For example, if you're going to use UID2 with Prebid.js on example.com, shop.example.com, and example.org, you only need to provide the domain names example.com and example.org.
:::

### Add Prebid.js to Your Site

<AddPrebidjsToYourSite />

### Configure the UID2 Module

To configure the UID2 module, call `pbjs.setConfig` with an object containing the **public key** and **Subscription ID** that you received during account setup, as well as the user's hashed or unhashed email address or phone number.

Once it's configured, the UID2 module generates a UID2 token for the user and stores it in the user's browser. The module automatically refreshes the token as needed as long as your site is open in the user's browser.

You can configure the UID2 module using any one of the four accepted DII formats, for any specific user:

- Normalized or un-normalized email address
- Normalized, hashed, and Base64-encoded email address
- Normalized phone number
- Normalized, hashed, and Base64-encoded phone number

Notes:

- The DII format might vary per user, but you can only send one value per user.
- If you want to pass the DII to the module already hashed, follow this sequence:
  1. First normalize.
  1. Then hash the result using the SHA-256 hashing algorithm.
  1. Then encode the resulting bytes of the hash value using Base64 encoding.
  
  For details, see [Normalization and Encoding](../getting-started/gs-normalization-encoding.md). For an example, see [Configuring the UID2 Module: Code Example](#configuring-the-uid2-module-code-example).
- The UID2 module encrypts the hashed DII before sending it to the UID2 service.
- If the module is configured multiple times, it uses the most recent configuration values.

#### Configuring the UID2 Module: Code Example

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
        // emailHash: 'tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=', // Normalized, hashed, and encoded email address
        // phone: '+12345678901', // Normalized phone number
        // phoneHash: 'EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=', // Normalized, hashed, and encoded phone number
      }
    }]
  }
};
```

:::note
This example assumes that you're using the UID2 production environment. During integration testing, use the UID2 integration environment  (for credentials, see [Getting Your Credentials](../getting-started/gs-credentials.md#getting-your-credentials)) by setting `params.uid2ApiBase` to `'https://operator-integ.uidapi.com'`. Tokens from the UID2 integration environment are not valid for passing to the bidstream. For the integration environment, you will have different **Subscription ID** and **public key** values.
:::

## Storing the UID2 Token in the Browser

<StoreUID2TokenInBrowser />

## When to Pass DII to the UID2 Module

When the UID2 module is configured, it checks for an existing UID2 token in the user's browser. If there is a token that was generated from the same DII, and either it's still valid or it can be refreshed, the module uses it, and refreshes if needed.

If there is no existing token, or the token has expired and cannot be refreshed, the UID2 module cannot generate a new token without DII.

:::tip
Configure the UID2 module with the user's DII on each page load. This is the recommended approach.
:::

In some cases, the user's DII is not available on page load, and getting the DII has some associated cost. For example, an API call might be required to fetch the DII, or the user has to be prompted to provide it.

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

It is possible that the user has opted out of UID2 previously. In this case, the UID2 module respects the user's optout and no UID2 token is generated and collected by Prebid.js.

## Checking the Integration

To check that the UID2 module has successfully generated a UID2 token, call `pbjs.getUserIds().uid2`. If a value is returned, a valid UID2 token exists in the UID2 module.

If there are problems with the integration, here are some steps you can take:

- Check the browser console logs.
- Check the values for **Subscription ID** (**subscriptionId** value) and **public key** (**serverPublicKey** value):
  - Make sure they are exactly the same values that you received from the UID2 team.
  - Check that you have the correct values for the environment you're using. You'll have different **Subscription ID** and **public key** values for each [environment](../getting-started/gs-environments.md).
- Check that you provided the domain name of the site to the UID2 team during account setup. If needed, to confirm, ask your UID2 contact.
- Use the browser developer tools to inspect the API calls to the UID2 service.

For additional help, refer to Prebid's documentation on [Troubleshooting Prebid.js](https://docs.prebid.org/troubleshooting/troubleshooting-guide.html) and [Debugging Prebid.js](https://docs.prebid.org/debugging/debugging.html).

An example of a tool for validating and debugging Prebid.js configuration is Professor Prebid, an open-source Chrome extension:

- Chrome web store download location: [Professor Prebid](https://chromewebstore.google.com/detail/professor-prebid/kdnllijdimhbledmfdbljampcdphcbdc)
- Documentation on prebid.org: [Professor Prebid User Guide](https://docs.prebid.org/tools/professor-prebid.html)

## Optional: Specifying the API Base URL to Reduce Latency

By default, the UID2 module makes calls to a UID2 production environment server in the USA.

For information about how to choose the best URL for your use case, and a full list of valid base URLs, see [Environments](../getting-started/gs-environments.md).

To specify a UID2 server that is not the default, when you're configuring the UID2 module, set the optional `params.uid2ApiBase` parameter, as shown in the following example:

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

## Optional: Prebid.js Integration with Google Secure Signals

if you're using Prebid.js, and you're planning to pass UID2 tokens to Google using Google Secure Signals, there are a couple of additional configuration steps:

- In your Google Ad Manager account, make sure that encrypted signals are properly shared with third-party bidders: see [Allow Secure Signals Sharing](integration-google-ss.md#allow-secure-signals-sharing).
- Update your Prebid.js configuration: see [Optional: Enable Secure Signals in Prebid.js](integration-google-ss.md#optional-enable-secure-signals-in-prebidjs).
