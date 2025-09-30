---
title: UID2 Client-Server Integration Guide for Prebid.js
sidebar_label: Client-Server Integration for Prebid.js
pagination_label: UID2 Client-Server Integration for Prebid.js
description: Information about setting up a client-server Prebid.js integration.
hide_table_of_contents: false
sidebar_position: 04
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import AddPrebidjsToYourSite from '../snippets/_prebid-add-prebidjs-to-your-site.mdx';
import StoreUID2TokenInBrowser from '../snippets/_prebid-storing-uid2-token-in-browser.mdx';
import IntegratingWithSSO from '../snippets/_integrating-with-sso.mdx';

# UID2 Client-Server Integration Guide for Prebid.js

This guide is for publishers who have access to <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> (email address or phone number) on the server side and want to integrate with UID2 and generate <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> (advertising tokens) to be passed by Prebid.js in the RTB <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link>. 

This is called client-server integration because some integration steps are client-side and some are server-side.

To integrate with UID2 using Prebid.js, you'll need to:

- Make changes to the HTML and JavaScript on your site.
- Make server-side changes for token generation (and, optionally, <a href="../ref-info/glossary-uid#gl-token-refresh">token refresh</a>).  

## Prebid.js Version

This implementation requires Prebid.js version 7.53.0 or later. For version information, see [https://github.com/prebid/Prebid.js/releases](https://github.com/prebid/Prebid.js/releases).

<!-- Diff in Prebid.js supported version for UID2/EUID is fine: verif SS 11/19/24 -->

## UID2 Prebid Module Page

Information about how to integrate Prebid with UID2 is also in the following locations:
- On the Prebid site, on the [Unified ID 2.0](https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html) page for the Prebid User ID submodule.
- In the Prebid GitHub repository, on the [UID2 User ID Submodule](https://github.com/prebid/Prebid.js/blob/master/modules/uid2IdSystem.md) page.

<!-- ## Integration Example

GWH note 12/14/23 updated 2/7/25: we have a client-side example for Prebid.js but no client-server example. -->

## Integrating with Single Sign-On (SSO)

<IntegratingWithSSO />

## Integration Overview: High-Level Steps

You'll need to complete the following steps:

1. [Complete UID2 account setup and configure account](#complete-uid2-account-setup-and-configure-account).
2. [Add Prebid.js to your site](#add-prebidjs-to-your-site).
3. [Configure the UID2 module](#configure-the-uid2-module).

## Complete UID2 Account Setup and Configure Account

To integrate with UID2 using Prebid.js, you'll need to have a UID2 account. If you haven't yet created an account, first follow the steps described on the [Account Setup](../getting-started/gs-account-setup.md) page.

When initial account setup is complete, you'll receive instructions and a link to access the [UID2 Portal](../portal/portal-overview.md), where you can create your [credentials](../getting-started/gs-credentials.md) for the production environment and configure additional values, if needed. For details, see [Getting Started with the UID2 Portal](../portal/portal-getting-started.md).

For a client-server integration you'll need to set up these values, in the UID2 Portal on the [API Keys](../portal/api-keys.md) page:

- <Link href="../ref-info/glossary-uid#gl-api-key">API key</Link>, also called a client key
- <Link href="../ref-info/glossary-uid#gl-client-secret">Client secret</Link>, a value known only to the participant and the UID2 service

:::important
It's very important that you keep these values secure. For details, see [Security of API Key and Client Secret](../getting-started/gs-credentials.md#security-of-api-key-and-client-secret).
:::

<!-- (earlier instructions, no-portal, for EUID)
When account setup is complete, you'll receive a client keypair consisting of two values that identify you to the UID2 servers: Subscription ID and public key. These values are unique to you, and you'll use them to configure the UID2 module. For details, see [Subscription ID and Public Key](../getting-started/gs-credentials.md#subscription-id-and-public-key). 
-->

## Add Prebid.js to Your Site

<AddPrebidjsToYourSite />

## Configure the UID2 Module

You'll need to configure the UID2 Prebid module to complete the following two actions:

| Step | Action | Link to Instructions |
| --- | --- | --- |
| 1 | Send a server-side API call to generate a UID2 token.  | [Generating a UID2 Token on the Server](#generating-a-uid2-token-on-the-server) |
| 2 | Store the response value, so that the Prebid module can manage token refresh as well as opt-out if needed. | [Refreshing a UID2 Token](#refreshing-a-uid2-token) |

### Generating a UID2 Token on the Server

For a client-server UID2 integration for Prebid, the first step is to generate the UID2 token on your server. Then, you can pass the token to Prebid for sending to the RTB bidstream.

For details, including instructions and examples, see [Server-Side Token Generation](../ref-info/ref-server-side-token-generation.md).

To generate a token, call one of the SDKs or the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint. For an example of the API response, showing the token, see [Sample Token Response Object](#sample-token-response-object). You will need to pass the `Identity` response to Prebid.

:::warning
For security reasons, the API key and secret used in token generation must be called server-side. Do not store these values as part of your Prebid implementation.
:::

### Refreshing a UID2 Token

There are two ways to refresh a UID2 token, as shown in the following table.

| Mode | Description | Link to Section | 
| --- | --- | --- |
| Client refresh mode | Prebid.js automatically refreshes the tokens internally.<br/>This is the simplest approach. | [Client Refresh Mode](#client-refresh-mode) |
| Server-only mode | Prebid.js doesn't automatically refresh the token. It is up to the publisher to manage token refresh.<br/>Examples of why you might want to choose this option:<ul><li>If you want to use the [SDK for JavaScript](../sdks/sdk-ref-javascript.md) to refresh the token, and Prebid.js to send the token to the bidstream.</li><li>If you want to send the token to the bidstream via multiple avenues (such as Prebid.js and also Google).</li></ul> | [Server-Only Mode](#server-only-mode) |

### Client Refresh Mode

You must provide the Prebid module with the full JSON response body from the applicable endpoint:

- [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) for a new UID2 token.
- [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) for a refreshed UID2 token.

For an example, see [Sample Token Response Object](#sample-token-response-object).

As long as the refresh token remains valid, the UID2 Prebid module refreshes the UID2 token as needed.

This section includes the following information:
- [Client Refresh Mode Response Configuration Options](#client-refresh-mode-response-configuration-options)
- [Client Refresh Mode Cookie Example](#client-refresh-mode-cookie-example)
- [Client Refresh Mode uid2Token Example](#client-refresh-mode-uid2token-example)
- [Passing a New Token: Client Refresh Mode](#passing-a-new-token-client-refresh-mode)

#### Client Refresh Mode Response Configuration Options

When you configure the module to use Client Refresh mode, you must choose **one** of the following options for providing the token to the Prebid module.

| Option | Details | Use Case | 
| --- | --- | --- |
| Set `params.uid2Cookie` to the name of the cookie that contains the response body as a JSON string. | See [Client Refresh Mode Cookie Example](#client-refresh-mode-cookie-example) | Use this option only if you're sure that there is enough space left in your cookie to store the response body. If you're not sure, or the cookie storage needs might vary, choose the other option. |
| Set `params.uid2Token` to the response body as a JavaScript object. | See [Client Refresh Mode uid2Token Example](#client-refresh-mode-uid2token-example) | You might choose to provide the response body via `params.uid2Token` in either of these cases:<ul><li>If you are already storing a lot of data in the cookie and adding the response body might exceed the cookie size limit.</li><li>If you prefer to have the Prebid module store the token value for you.</li></ul> |

#### Client Refresh Mode Cookie Example

In Client Refresh mode, Prebid.js takes care of refreshing the token. To do this, you must configure it to store the token. The following example shows the cookie and also the configuration for storing the token in a cookie called `uid2_pub_cookie`.

Cookie:

```
uid2_pub_cookie={"advertising_token":"...advertising token...","refresh_token":"...refresh token...","identity_expires":1684741472161,"refresh_from":1684741425653,"refresh_expires":1684784643668,"refresh_response_key":"...response key..."}
```

Configuration:

```js
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'uid2',
      params: {
        uid2Cookie: 'uid2_pub_cookie'
      }
    }]
  }
});
```

For an example of the token, see [Sample Token Response Object](#sample-token-response-object).

#### Client Refresh Mode uid2Token Example

The following example shows a sample configuration. For the contents of the token, see [Sample Token Response Object](#sample-token-response-object).

```js
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'uid2',
      params: {
        uid2Token: {
          'advertising_token': '...advertising token...',
          'refresh_token': '...refresh token...',
          // etc. - see the sample token for contents of this object
        }
      }
    }]
  }
});
```

#### Passing a New Token: Client Refresh Mode

If the refresh token expires, you'll need to supply a new token response so that a new advertising token and a new refresh token are available for future refreshes. 

For information on how to determine if you need to provide a new token, see [Determining Whether the Module Has a Valid Token](#determining-whether-the-module-has-a-valid-token).

### Server-Only Mode

In server-only mode, only the advertising token is provided to the module. The module cannot refresh the token. You are responsible for implementing a way to refresh the token.

To configure the module to use server-only mode, do **one** of the following:

| Implementation Method | Link to Example |
| --- | --- |
| Set a cookie named `__uid2_advertising_token` and store the advertising token value in it. | [Server-Only Mode Cookie Example](#server-only-mode-cookie-example) |
| Set `value` to an ID block containing the advertising token. | [Server-Only Mode Value Example](#server-only-mode-value-example) |

This section includes the following information:
- [Server-Only Mode Cookie Example](#server-only-mode-cookie-example)
- [Server-Only Mode Value Example](#server-only-mode-value-example)
- [Passing a New Token: Server-Only Mode](#passing-a-new-token-server-only-mode)

#### Server-Only Mode Cookie Example

The following example stores the advertising token value in a cookie named `__uid2_advertising_token`. The value of the cookie is the value returned in the token response object (see [Sample Token Response Object](#sample-token-response-object)).

The configuration allows the UID2 module to retrieve the advertising token value from the cookie.

Cookie:

```js
__uid2_advertising_token=A4AAAABlh75XmviGJi-hkLGs96duivRhMd3a3pe7yTIwbAHudfB9wFTj2FtJTdMW5TXXd1KAb-Z3ekQ_KImZ5Mi7xP75jRNeD6Mt6opWwXCCpQxYejP0R6WnCGnWawx9rLu59LsHv6YEA_ARNIUUl9koobfA9pLmnxE3dRedDgCKm4xHXYk01Fr8rOts6iJj2AhYISR3XkyBpqzT-vqBjsHH0g
```

Configuration:

```js
pbjs.setConfig({
    userSync: {
        userIds: [{
            name: 'uid2'
        }]
    }
});
```

#### Server-Only Mode Value Example

The following example sets the `value` field to an ID block containing the advertising token without storing it in a cookie.

```js
pbjs.setConfig({
    userSync: {
        userIds: [{
            name: 'uid2'
            value: {
                'uid2': {
                    'id': '...advertising token...'
                }
            }
        }]
    }
});
```

#### Passing a New Token: Server-Only Mode

In server-only mode, since the Prebid.js UID2 module receives only the advertising token, the token is only valid for a short period of time. For this reason, it's best to provide an advertising token on each page load.

If needed, to determine if you need to provide a new token, see [Determining Whether the Module Has a Valid Token](#determining-whether-the-module-has-a-valid-token).

## Prebid Implementation Notes and Tips

In planning your Prebid implementation, consider the following:

- The module stores the original token provided to it, refreshes it as needed, and uses the refreshed token. If you provide an expired identity, and the module has a valid update from refreshing the same identity, the module uses the refreshed identity in place of the expired one you provided.

- If you provide a new token that doesn't match the original token used to generate any refreshed tokens, the module discards all stored tokens and uses the new token instead, and keeps it refreshed.

- During integration testing, set `params.uid2ApiBase` to `"https://operator-integ.uidapi.com"`. You must set this value to the same environment (production or integration) that you use for generating tokens (for credentials, see [Getting Your Credentials](../getting-started/gs-credentials.md#getting-your-credentials)).

- For a Prebid.js client-server integration, you can create a smaller Prebid.js build by disabling client-side integration functionality. To do this, pass the `--disable UID2_CSTG` flag:

```
    $ gulp build --modules=uid2IdSystem --disable UID2_CSTG
```

## Storing the UID2 Token in the Browser

<StoreUID2TokenInBrowser />

## Determining Whether the Module Has a Valid Token

You can do a check to determine whether the Prebid.js module has a valid token or you need to provide a new one.

To do this, check the value returned by `pbjs.getUserIds().uid2`, as shown in the following example:

```js
if (!pbjs.getUserIds().uid2) {
  // There is no token that can be used or refreshed.
  // Configure the UID2 module with a new token
  pbjs.setConfig({
      userSync: {
          userIds: [{
              name: 'uid2',
              params: {
                  uid2Token: {
                      'advertising_token': '...advertising token...',
                      'refresh_token': '...refresh token...',
                      // etc. - see the sample token for contents of this object
                  }
              }
          }]
      }
  });  
}
```

:::caution
If you configure a user ID by calling `setConfig` (or any similar function) twice, you will need to call `refreshUserIds` for the user ID submodules, to reinitialize their ID values.
:::

## Checking the Integration

To check that the UID2 module has a valid UID2 token, call `pbjs.getUserIds().uid2`. If a value is returned, a valid UID2 token exists in the UID2 module.

If there are problems with the integration, here are some steps you can take:

- Check the browser console logs.
- Use the browser developer tools to inspect the API calls to the UID2 service.

For additional help, refer to Prebid's documentation on [Troubleshooting Prebid.js](https://docs.prebid.org/troubleshooting/troubleshooting-guide.html) and [Debugging Prebid.js](https://docs.prebid.org/debugging/debugging.html).

An example of a tool for validating and debugging Prebid.js configuration is Professor Prebid, an open-source Chrome extension:

- Chrome web store download location: [Professor Prebid](https://chromewebstore.google.com/detail/professor-prebid/kdnllijdimhbledmfdbljampcdphcbdc)
- Documentation on prebid.org: [Professor Prebid User Guide](https://docs.prebid.org/tools/professor-prebid.html)

## Configuration Parameters for userSync

The following parameters apply only to the UID2 Prebid User ID Module integration.

In this table, CR = client refresh mode, SO = server-only mode, and N/A = not applicable.

| Param under userSync.userIds[] | Mode/Scope | Type | Description | Example |
| --- | --- | --- | --- | --- |
| name | CR: Required<br/>SO:&nbsp;Required | String | ID value for the UID2 module. Always `"uid2"`. | `"uid2"` |
| value | CR: N/A<br/>SO: Optional | Object | An object containing the value for the advertising token. | See [Configuration Parameter Examples: Value](#configuration-parameter-examples-value) |
| params.uid2Token | CR: Optional<br/>SO: N/A | Object | The initial UID2 token. This should be the `body` element of the decrypted response from a call to the `/token/generate` or `/token/refresh` endpoint. | See [Sample Token Response Object](#sample-token-response-object) |
| params.uid2Cookie | CR: Optional<br/>SO: N/A  | String | The name of a cookie that holds the initial UID2 token, set by the server. The cookie should contain JSON in the same format as the uid2Token param. If `uid2Token` is supplied, this parameter is ignored. | See [Sample Token Response Object](#sample-token-response-object) |
| params.uid2ApiBase | CR: Optional<br/>SO: Optional | String | Overrides the default UID2 API endpoint. For details, and an example, see [Optional: Specifying the API Base URL to Reduce Latency](#optional-specifying-the-api-base-url-to-reduce-latency). | `"https://prod.uidapi.com"` (the default)|
| params.storage | CR: Optional<br/>SO: Optional | String | Specify the module internal storage method: `cookie` or `localStorage`. We recommend that you do not provide this parameter. Instead, allow the module to use the default. | `"localStorage"` (the default) |

### Configuration Parameter Examples: Value

The following code snippet shows an example of the `value` UID2 configuration parameter.

```js
pbjs.setConfig({
    userSync: {
        userIds: [{
            name: 'uid2'
            value: {
                'uid2': {
                    'id': '...advertising token...'
                }
            }
        }]
    }
});
```

### Sample Token Response Object

The following sample is fictitious, but shows what the token response object, returned from either the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) or [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint, looks like:

```js
{
  "advertising_token": "...",
  "refresh_token": "...",
  "identity_expires": 1633643601000,
  "refresh_from": 1633643001000,
  "refresh_expires": 1636322000000,
  "refresh_response_key": "wR5t6HKMfJ2r4J7fEGX9Gw=="
}
```

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
