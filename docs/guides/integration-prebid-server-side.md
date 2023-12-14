---
title: Prebid.js Server-Side Integration
sidebar_label: Prebid.js Server-Side Integration
pagination_label: Prebid.js Server-Side Integration
description: Information about setting up a server-side Prebid.js integration.
hide_table_of_contents: false
sidebar_position: 04
---

# Prebid.js Server-Side Integration
<!-- 
This guide includes the following information:

- [Prebid.js Version](#prebidjs-version)
- [UID2 Prebid Module Page](#uid2-prebid-module-page)
- [Module Storage](#module-storage)
- [Integration Overview: High-Level Steps](#integration-overview-high-level-steps)
- [Complete UID2 Account Setup](#complete-uid2-account-setup)
- [Add Prebid.js to Your Site](#add-prebidjs-to-your-site)
- [Configure the UID2 Module](#configure-the-uid2-module)
  - [Generating a UID2 Token on the Server](#generating-a-uid2-token-on-the-server)
  - [Client Refresh Mode](#client-refresh-mode)
    - [Client Refresh Mode Response Storage Options](#client-refresh-mode-response-storage-options)
    - [Client Refresh Mode Cookie Example](#client-refresh-mode-cookie-example)
    - [Configuration](#configuration)
    - [Client Refresh Mode uid2Token Example](#client-refresh-mode-uid2token-example)
  - [Server-Only Mode](#server-only-mode)
    - [Server-Only Mode Cookie Example](#server-only-mode-cookie-example)
    - [Server-Only Mode Value Example](#server-only-mode-value-example)
- [Prebid Implementation Notes and Tips](#prebid-implementation-notes-and-tips)
- [Storing the UID2 Token in the Browser](#storing-the-uid2-token-in-the-browser)
- [When to Pass a New Token to the UID2 Module](#when-to-pass-a-new-token-to-the-uid2-module)
  - [Passing a New Token: Client Refresh Mode](#passing-a-new-token-client-refresh-mode)
  - [Passing a New Token: Server-Only Mode](#passing-a-new-token-server-only-mode)
- [Determining Whether the Module Has a Valid Token](#determining-whether-the-module-has-a-valid-token)
- [Checking the Integration](#checking-the-integration)
- [Configuration Parameters for userSync](#configuration-parameters-for-usersync) 
  - [Configuration Parameter Examples: Value](#configuration-parameter-examples-value)
  - [Sample Token](#sample-token)
- [Optional: Reduce Latency by Setting the API Base URL](#optional-reduce-latency-by-setting-the-api-base-url) 
 -->

This guide is for publishers who have access to [DII](../ref-info/glossary-uid.md#gl-dii) (email address or phone number) on the server side and want to integrate with UID2 and generate [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) (advertising tokens) to be passed by Prebid.js in the RTB bid stream. 

To integrate with UID2 using Prebid.js, you'll need to:

- Make changes to the HTML and JavaScript on your site.
- Make server-side changes for token generation (and, optionally, token refresh).  

## Prebid.js Version
This implementation requires Prebid.js version 7.53.0 or later. For version information, see [https://github.com/prebid/Prebid.js/releases](https://github.com/prebid/Prebid.js/releases).

## UID2 Prebid Module Page
<!-- GWH TODO later: move to overview or to client side doc maybe when CSTG is added to the Prebid module pages. Now, they are only server side. -->
Information about how to integrate Prebid with UID2 is also in the following locations:
- On the Prebid site, on the [Unified ID 2.0](https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html) page for the Prebid User ID submodule.
- In the Prebid GitHub repository, on the [UID2 User ID Submodule](https://github.com/prebid/Prebid.js/blob/master/modules/uid2IdSystem.md) page.

<!-- ## Integration Example

GWH note 12/14/23: We have client-side and server-side examples for JS SDK but only server-side for Prebid. -->

## Module Storage
<!-- GWH Module Storage section is the same for client side and server-side. -->
By default, the UID2 module stores data using local storage. To use a cookie instead, set `params.storage` to cookie. For details, see [Unified ID 2.0 Configuration](https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html#unified-id-20-configuration).

## Integration Overview: High-Level Steps

You'll need to complete the following steps:

1. [Complete UID2 account setup](#complete-uid2-account-setup).
2. [Add Prebid.js to your site](#add-prebidjs-to-your-site).
3. [Configure the UID2 module](#configure-the-uid2-module).

## Complete UID2 Account Setup

Complete the UID2 account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page.

When account setup is complete, you'll receive your unique API key and client secret. These values are unique to you and it's important to keep them secure. For details, see [API Key and Client Secret](../getting-started/gs-credentials.md#api-key-and-client-secret).

## Add Prebid.js to Your Site
<!-- GWH "Add Prebid.js to Your Site" section is identical for client side and server side. -->
To add Prebid.js to your site, follow the instructions in [Getting Started for Developers](https://docs.prebid.org/dev-docs/getting-started.html) in the Prebid.js documentation. 

When you download the Prebid.js package, add the UID2 module by checking the box next to the module named **Unified ID 2.0**, listed under the section **User ID Modules**.

When you've added Prebid.js to your site and confirmed that it's working properly, you're ready to configure the UID2 module.

:::tip
To make sure that the UID2 module is installed, find the string `uid2IdSystem` in the [`pbjs.installedModules` array](https://docs.prebid.org/dev-docs/publisher-api-reference/installedModules.html).
:::

## Configure the UID2 Module

You'll need to configure the UID2 Prebid module to complete the following two actions:

| Step | Action | Link to Instructions |
| --- | --- | --- |
| 1 | Send a server-side API call to generate a UID2 token.  | [Generating a UID2 Token on the Server](#generating-a-uid2-token-on-the-server) |
| 2 | Store the response value, so that the Prebid module can manage token refresh as well as opt-out if needed. | [Refreshing a UID2 Token](#refreshing-a-uid2-token) |

### Generating a UID2 Token on the Server

To generate a token, call the [POST /token/generate](../endpoints/post-token-generate.md) endpoint.

For an example, see [Sample Token](#sample-token).

### Refreshing a UID2 Token

There are two ways to refresh a UID2 token, as shown in the following table.

| Mode | Description | Link to Section | 
| --- | --- | --- |
| Client refresh mode | Prebid.js automatically refreshes the tokens internally.<br/>This is the simplest approach. | [Client Refresh Mode](#client-refresh-mode) |
| Server-only mode | Prebid.js doesn't automatically refresh the token. It is up to the publisher to manage token refresh.<br/>Choose this option if you want to use the [UID2 SDK for JavaScript](../sdks/client-side-identity.md) to refresh the token, and Prebid.js to send the token to the bid stream. | [Server-Only Mode](#server-only-mode) |

### Client Refresh Mode

You must provide the Prebid module with the full JSON response body from the applicable endpoint:

- [POST /token/generate](../endpoints/post-token-generate.md) for a new UID2 token.
- [POST /token/refresh](../endpoints/post-token-refresh.md) for a refreshed UID2 token.

For an example, see [Sample Token](#sample-token).

As long as the refresh token remains valid, the UID2 Prebid module refreshes the UID2 token as needed.

This section includes the following information:
- [Client Refresh Mode Response Storage Options](#client-refresh-mode-response-storage-options)
- [Client Refresh Mode Cookie Example](#client-refresh-mode-cookie-example)
- [Client Refresh Mode uid2Token Example](#client-refresh-mode-uid2token-example)
- [Passing a New Token: Client Refresh Mode](#passing-a-new-token-client-refresh-mode)

#### Client Refresh Mode Response Storage Options

When you configure the module to use Client Refresh mode, you must choose **one** of the following options for storing the API response information.

| Option | Details | Use Case | 
| --- | --- | --- |
| Set `params.uid2Cookie` to the name of the cookie that contains the response body as a JSON string. | See [Client Refresh Cookie Example](#client-refresh-cookie-example). | Use this option only when there is enough space left in your cookie to store the response body. (**GWH_LP do we need to address how user will know if there is space in the cookie?**)|
| Set `params.uid2Token` to the response body as a JavaScript object. | See [Client Refresh uid2Token Example](#client-refresh-uid2token-example). | You might choose to provide the response body via `params.uid2Token` in either of these cases:<ul><li>If storing the response body on the cookie will exceed the cookie size limit.</li><li>If you prefer to have the flexibility to manage the storage of the response body yourself.</li></ul> |

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
#### Client Refresh Mode uid2Token Example

The following example shows a sample configuration. For the contents of the token, see [Sample Token](#sample-token).

```javascript
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
| Set a cookie named `__uid2_advertising_token`and store the advertising token value in it. | [Server-Only Cookie Example](#server-only-cookie-example) |
| Set `value` to an ID block containing the advertising token. | [Server-Only Value Example](#server-only-value-example) |

This section includes the following information:
- [Server-Only Mode Cookie Example](#server-only-mode-cookie-example)
- [Server-Only Mode Value Example](#server-only-mode-value-example)
- [Passing a New Token: Server-Only Mode](#passing-a-new-token-server-only-mode)

#### Server-Only Mode Cookie Example

The following example stores the advertising token value in a cookie named `__uid2_advertising_token`. The configuration allows the UID2 module to retrieve the advertising token value from the cookie.

Cookie:

```
__uid2_advertising_token=...advertising token...
```

Configuration:

```
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

```
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

In server-only mode, since the prebid.js UID2 module receives only the advertising token, the token is only valid for a short period of time. For this reason, it is best to provide an advertising token on each page load.

If needed, to determine if you need to provide a new token, see [Determining Whether the Module Has a Valid Token](#determining-whether-the-module-has-a-valid-token).

## Prebid Implementation Notes and Tips

In planning your Prebid implementation, consider the following:

(**GWH_LP first two bullet points are a) original copy, which we need to simplify, b) my proposed rewrite. Any suggestions welcome.**)

- (**ORIGINAL**): If you provide an expired identity, and the module has a valid identity which was refreshed from the identity you provide, the module uses the refreshed identity. The module stores the original token that it used for refreshing the token and uses the refreshed tokens as long as the original token matches the token that you provided. 

- (**PROPOSED REVISION FROM GWH**): The module stores the original token provided to it, refreshes it as needed, and uses the refreshed token. If you provide an expired identity, and the module has a valid update from refreshing the same identity, the module uses the refreshed identity in place of the expired one you provided.

   **ALSO SW suggests removing this bullet point altogether and said check with you (LP) (GWH)**.

- If you provide a new token that doesn't match the original token used to generate any refreshed tokens, the module discards all stored tokens and uses the new token instead, and keeps it refreshed.

- During integration testing, set `params.uid2ApiBase` to `"https://operator-integ.uidapi.com"`. You must set this value to the same environment (production or integration) that you use for generating tokens.

- For an example of what a UID2 token might look like in the bid stream, when it's sent from an SSP to a DSP, see [What does a UID2 token look like in the bid stream?](../getting-started/gs-faqs.md#what-does-a-uid2-token-look-like-in-the-bid-stream) (**GWH_SW_LP_ Should this come out, per Andrei's comment?**)

## Storing the UID2 Token in the Browser
<!-- GWH same section in integration-prebid.md, integration-prebid-client-side.md, and integration-prebid-client-side.md. Ensure consistency -->
By default, the UID2 module stores data using local storage. To use a cookie instead, set `params.storage` to `cookie`, as shown in the following example.

For details, see [Unified ID 2.0 Configuration](https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html#unified-id-20-configuration) in the Prebid documentation.

```js
pbjs.setConfig({ 
  userSync: { 
    userIds: [{ 
      name: 'uid2', 
      params: { 

                 //default value is ‘localStorage’ 
        storage: ‘cookie’  
      } 
    }] 
  } 
}); 
```

The cookie size can be significant, which could be a problem. However, if local storage is not an option, this is one possible approach.

## Determining Whether the Module Has a Valid Token

You can do a check to determine whether the Prebid.js module has a valid token or you need to provide a new one.

To do this, check the value returned by `pbjs.getUserIds().uid2`, as shown in the following example:

```js
const params = {};

if (!pbjs.getUserIds().uid2) {
  // There is no token that can be used or refreshed.
  // Configure the UID2 module with a new token
}

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

:::caution
If you configure a user ID by calling `setConfig` (or any similar function) twice, you will need to call `refreshUserIds` for the user ID submodules, to reinitialize their ID values.
:::

## Checking the Integration

To check that the UID2 module has a valid UID2 token, call `pbjs.getUserIds().uid2`. If a value is returned, a valid UID2 token still exists in the UID2 module.

If there are problems with the integration, here are some steps you can take:

- Check the browser console logs.
- Use the browser developer tools to inspect the API calls to the UID2 service.

For additional help, refer to Prebid's documentation on [Troubleshooting Prebid.js](https://docs.prebid.org/troubleshooting/troubleshooting-guide.html) and [Debugging Prebid.js](https://docs.prebid.org/debugging/debugging.html).

An example of a tool for validating and debugging Prebid.js configuration is Professor Prebid, an open-source Chrome extension:

- Chrome web store download location: [Professor Prebid](https://chromewebstore.google.com/detail/professor-prebid/kdnllijdimhbledmfdbljampcdphcbdc)
- Documentation on prebid.org: [Professor Prebid User Guide](https://docs.prebid.org/tools/professor-prebid.html)

## Configuration Parameters for userSync

The following parameters apply only to the UID2 Prebid User ID Module integration.

(**GWH_SW question I missed asking you. When we say "Optional, client refresh" -- what does that mean? Is it required for client refresh? Or N/A for server-only and optional for client refresh? And will readers know? If something is required for a specific mode we should say that.**)

| Param under userSync.userIds[] | Scope | Type | Description | Example |
| --- | --- | --- | --- | --- |
| name | Required | String | ID value for the UID2 module. Always `"uid2"`. | `"uid2"` |
| value | Optional, server-only mode | Object | An object containing the value for the advertising token. | See [Configuration Parameter Examples: Value](#configuration-parameter-examples-value). |
| params.uid2Token | Optional, client refresh mode | Object | The initial UID2 token. This should be the `body` element of the decrypted response from a call to the `/token/generate` or `/token/refresh` endpoint. | See [Sample Token](#sample-token). |
| params.uid2Cookie | Optional, client refresh mode | String | The name of a cookie that holds the initial UID2 token, set by the server. The cookie should contain JSON in the same format as the uid2Token param. **If uid2Token is supplied, this param is ignored.** | See [Sample Token](#sample-token). |
| params.uid2ApiBase | Optional, client refresh mode | String | Overrides the default UID2 API endpoint. | `"https://prod.uidapi.com"` (the default)|
| params.storage | Optional, client refresh mode | String | Specify the module internal storage method: `cookie` or `localStorage`. We recommend that you do not provide this parameter. Instead, allow the module to use the default. | `localStorage` (the default) |

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

### Sample Token

The following sample is fictitious, but shows what the token response object, returned from either the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) or [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoints, looks like:

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

## Optional: Reduce Latency by Setting the API Base URL
<!-- GWH "Reduce Latency by Setting the API Base URL" section is identical for client side and server side. -->
By default, the UID2 module makes API calls to a UID2 server in the USA. Depending on where your users are based, you might consider choosing a server closer to your users to reduce latency.

To specify a different UID2 server when you're configuring the UID2 module, set the optional params.uid2ApiBase parameter, as shown in the following example:

```
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
