---
title: SDK for JavaScript
description: Reference information about the JavaScript client-side SDK.
hide_table_of_contents: false
sidebar_position: 02
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';
import ExampleUid2Cookie from '/docs/snippets/_example-uid2-cookie.mdx';
import ExampleJavaScriptInit from '/docs/snippets/_example-javascript-init.mdx';

# SDK for JavaScript Reference Guide

export const New = () => (
  <span className='pill'>NEW IN V3</span>
);

Use this SDK to facilitate the process of establishing client identity using UID2 and retrieving advertising tokens. The following sections describe the high-level [workflow](#workflow-overview) for establishing UID2 identity, provide the SDK [API reference](#api-reference), and explain the UID2 [storage format](#uid2-storage-format).

:::tip
If you're using Prebid.js with the UID2 Identity Module, or with another product that has UID2 support, you probably don't need to use the SDK at all. The Prebid.js module manages everything. For details, see [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md).
:::

This page describes version 3 of the SDK for JavaScript. If you are maintaining an integration using an earlier version, do one of the following:
- Upgrade your integration, using the [migration guide](#migration-guide) (recommended).
- Refer to the documentation for [earlier versions of the SDK](./sdk-ref-javascript-v2.md).

Related information:

For integration steps for content publishers, see:
  - [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md)
  - [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md)

## Sample Implementation Website

For example applications with associated documentation, see:
  - The UID2 Google Secure Signals with SDK v3 example:
    - [Code and docs](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-secure-signals-integration/with_sdk_v3)
    - Running site: [Client-Side UID2 SDK Integration Example](https://secure-signals-jssdk-integ.uidapi.com/)
  - The example of JavaScript client-side integration: [Code](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/cstg) and running site ([Client-Side Integration Example, UID2 JavaScript SDK](https://cstg-integ.uidapi.com/)).

## Functionality

This SDK simplifies development for publishers who want to build their own customized UID2 integration. The following table shows the functions it supports.

| Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token to Raw UID2 | Generate UID2 Token from DII | Refresh UID2 Token | Map DII to Raw UID2s |
| :--- | :--- | :--- | :--- | :--- |
| &#8212; | &#8212; | &#9989; | &#9989; | &#8212; |

## API Permissions

To use this SDK, you'll need to complete the UID2 account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page.

You'll be granted permission to use specific functions offered by the SDK, and given credentials for that access. Bear in mind that there might be functions in the SDK that you don't have permission to use. For example, publishers get a specific API permission to generate and refresh tokens, but the SDK might support other activities that require a different API permission.

For details, see [API Permissions](../getting-started/gs-permissions.md).

## SDK Version

This documentation is for version 3 of the SDK for JavaScript.

## GitHub Repository

The source for this SDK is in the following open-source GitHub repository:

- [https://github.com/iabtechlab/uid2-web-integrations](https://github.com/iabtechlab/uid2-web-integrations)

## SDK Distribution

The SDK is published in these locations:

<!-- - NPM: [https://www.npmjs.com/package/@uid2/uid2-sdk](https://www.npmjs.com/package/@uid2/uid2-sdk)
  - This is the easiest way to include the SDK in your own build. Use this if you want to bundle the SDK along with your other JavaScript or TypeScript files.
  - You can also use this for TypeScript type information and still load the script via the CDN. If you do this, ensure that the version of NPM package you have installed matches the version in the CDN url. LP_TODO: Looking at the NPM package, I don't believe it's ready for use - it just includes the source and doesn't seem to include a ready-to-deploy build. LP 12 Sep 2023 -->
- CDN: `https://cdn.prod.uidapi.com/uid2-sdk-${VERSION_ID}.js`
  <!-- - This is the easiest way to include the SDK in your site if you don't use a build pipeline to bundle your JavaScript. LP_TODO: This doesn't make sense until we add the NPM option above. -->

  As of the latest update to this document, the most recent version is [3.4.5](https://cdn.prod.uidapi.com/uid2-sdk-3.4.5.js). You can also see [the list of available versions](https://cdn.prod.uidapi.com/).
- CDN (Integration): `https://cdn.integ.uidapi.com/uid2-sdk-${VERSION_ID}.js`

  This integration URL contains un-minified code and is intended for testing purposes only. Do not use this URL for your production site.

  As of the latest update to this document, the most recent version is [3.4.5](https://cdn.integ.uidapi.com/uid2-sdk-3.4.5.js). You can also see [the list of available versions](https://cdn.integ.uidapi.com/).

## Terminology

In this document, the following terms apply:
- **Identity** refers to a package of values, returned by the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) or [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint, that includes the UID2 token, the refresh token, and associated values such as timestamps.
- **Advertising token** refers to the UID2 token.
- **Callback function** refers to a callback function built for the current version of this SDK and registered using the [Array Push Pattern](#array-push-pattern).
- **Legacy callback function** refers to a callback function built for version 1.x or 2.x of this SDK and registered in the call to `init`.

## Include the SDK Script

On every page where you want to use UID2 for targeted advertising, include the following SDK script:

```html
<script src="https://cdn.prod.uidapi.com/uid2-sdk-3.4.5.js" type="text/javascript"></script> 
```

### Async or Defer Loading the SDK Script

Version 3 and above of the SDK can be used with `async` or `defer` script loading.

If you are using `async` or `defer` script loading on your site, do the following:
- (Required) Make sure you are calling `__uid2.init` from a [callback function](#callback-function) when it receives the `SdkLoaded` event.
- (Required) Add the relevant attribute to the script tag.
- (Recommended) Make sure that the script tag is in the `<head>` portion of the page, as shown in the following example:

   ```html
   <head>
     <!-- ... -->
     <script async src="https://cdn.prod.uidapi.com/uid2-sdk-3.4.5.js" type="text/javascript"></script>
     <!-- ... -->
   </head>
   ```

## Workflow Overview

The high-level client-side workflow for establishing UID2 identity using the SDK consists of the following steps:

1. Register a callback function using the [Array Push Pattern](#array-push-pattern).
2. When your callback receives the `SdkLoaded` event, initialize the SDK using the [init](#initopts-object-void) function.
3. Wait for your event listener to receive the `InitCompleted` event. The event data indicates the identity availability:
	- If the identity is available, it is returned in the event payload. The SDK sets up a [background token auto-refresh](#background-token-auto-refresh).
	- If the identity is unavailable, the `identity` property on the payload is null. No UID2 is available until you [provide an identity to the SDK](#provide-an-identity-to-the-sdk).
4. Handle the `IdentityUpdated` callback event that indicates changes to the identity.

	 The `identity` property on the event payload either contains the new identity, or is null if a valid identity is not available.
5. Handle the identity based on its state:
	- If the advertising token is available, use it to initiate requests for targeted advertising.
	- If the advertising token is not available, either use untargeted advertising or redirect the user to the data capture with the consent form.

For more detailed web integration steps, see [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md).

### Background Token Auto-Refresh

As part of the SDK [initialization](#initopts-object-void), a token auto-refresh for the identity is set up, which is triggered in the background by the timestamps on the identity or by failed refresh attempts due to intermittent errors.

Here's what you need to know about the token auto-refresh:

- Only one token refresh call can be active at a time. 
- If the [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) response is unsuccessful because the user has opted out, or because the refresh token has expired, this suspends the background auto-refresh process. To use UID2-based targeted advertising again, you must obtain the email or phone number from the consumer. In all other cases, auto-refresh attempts continue in the background.
- All [callback functions](#callback-function) provided using the [Array Push Pattern](#array-push-pattern) are invoked in the following cases:
	- After each successful refresh attempt.
	- When identity has become invalid&#8212;for example, because the user has opted out.<br/>NOTE: The callback is *not* invoked when identity is temporarily unavailable and the auto-refresh keeps failing. In this case, the SDK continues using the existing advertising token as long as it hasn't expired.
- A [disconnect()](#disconnect-void) call cancels the active timer. 

### Callback Function

You can register functions to receive events from the UID2 SDK using the [Array Push Pattern](#array-push-pattern). There are a number of events currently available:
- `SdkLoaded` is raised after the SDK has been parsed and the global `__uid2` object has been constructed. This is useful for calling `init()`, especially if your script loading order is not guaranteed (for example, if you are using `async` or `defer` script loading).
- `InitCompleted` is raised when `init()` has finished and the SDK is ready for use. If an identity was provided in the `init` call, or the SDK was able to load a previously-provided identity, the identity is included in the payload.
- `IdentityUpdated` is raised whenever there is a new identity available, or the existing identity is no longer available.

:::tip
You can provide as many callback functions as you want, and register them from anywhere. This allows you to split your code up in a way that makes sense for your site.
:::

#### Callback Function Signature

Your callback function should accept two parameters: an event type and a payload. The type of the payload depends on the event type.

The following example callback handles the `SdkLoaded` event to call init and then, if an identity isn't available once `init` has completed, uses the `InitCompleted` event to provide an identity.

<Tabs>
<TabItem value='js' label='JavaScript'>

```js
  window.__uid2 = window.__uid2 || {};
  window.__uid2.callbacks = window.__uid2.callbacks || [];
  window.__uid2.callbacks.push((eventType, payload) => {
    if (eventType === 'SdkLoaded') {
      __uid2.init({});
    }
    if (eventType === 'InitCompleted' && !payload.identity) {
        const generatedIdentity = await requestIdentityFromServer(); // Call your server-side integration to generate a token for the logged-in user
        __uid2.setIdentity(generatedIdentity);
    }
  });
```

</TabItem>
<TabItem value='ts' label='TypeScript'>

```tsx
  import { EventType, CallbackPayload } from "./callbackManager";

  window.__uid2 = window.__uid2 || {};
  window.__uid2.callbacks = window.__uid2.callbacks || [];
  window.__uid2.callbacks.push((eventType: EventType, payload: CallbackPayload) => {
    if (eventType === 'SdkLoaded') {
      __uid2.init({});
    }
    if (eventType === 'InitCompleted' && !payload.identity) {
        const generatedIdentity = await requestIdentityFromServer(); // Call your server-side integration to generate a token for the logged-in user
        __uid2.setIdentity(generatedIdentity);
    }
  });
```

</TabItem>
</Tabs>

#### Event Types and Payload Details

<div className='no-wrap-table-code'>

| Event | Payload | Details |
| :--- | :--- | :--- |
| `SdkLoaded` | `{}` | Called when the SDK script has loaded and the global `__uid2` has been constructed. When you receive this event, it is safe to call `__uid2.init`. Callbacks always receive this event once. If the SDK has already been loaded when the callback is registered, it receives the event immediately. |
| `InitCompleted` | `{ identity: Identity  \| null }` | Called once `init()` has finished. Callbacks always receive this event once, as long as a successful call to `init` has been made. If `init` has already been completed when the callback is registered, it receives this immediately after it receives the `SdkLoaded` event. |
| `IdentityUpdated` | `{ identity: Identity \| null }` | Called whenever the current identity changes. If the identity doesn't change after the callback is registered, callbacks do not receive this event. |

</div>

The `Identity` type is the same type as the identity you can provide when calling `init()`.

#### Array Push Pattern

In order to best support script tags that are not guaranteed to load in order (for example, if you're using `async` or `defer` script tags), use the following pattern to register callbacks:

```js
window.__uid2 = window.__uid2 || {};
window.__uid2.callbacks = window.__uid2.callbacks || [];
window.__uid2.callbacks.push(callbackFunction);
```

This ensures the following:
- If your code runs before the SDK has loaded (meaning the global `__uid2` object is not available), you can still provide a callback that the SDK can find.
- If the SDK runs before your code does, you do not overwrite the `__uid2` object or the `callbacks` array.
- If multiple callbacks are registered using this pattern, they do not overwrite each other.

### Provide an Identity to the SDK

Unless the SDK is able to load a previously-stored identity from local storage or the cookie, you must provide an identity to it. There are several ways to do this:

- [Provide an Identity by Setting a First-Party Cookie](#provide-an-identity-by-setting-a-first-party-cookie)
- [Provide an Identity in the Call to `init`](#provide-an-identity-in-the-call-to-init)
- [Provide an Identity by Calling `setIdentity`](#provide-an-identity-by-calling-setidentity)

#### Provide an Identity by Setting a First-Party Cookie

If you store a first-party cookie, as described in the [storage format section](#uid2-storage-format), and the value is newer than the value available in local storage, the SDK loads the value from the cookie. If you have set the `useCookie` init option to `true`, it always loads this value, and does not check local storage. You can control several other things about the cookie using [init parameters](#init-parameters).

#### Provide an Identity in the Call to `init`

You can provide a new identity when you call [`init`](#initopts-object-void).

#### Provide an Identity by Calling `setIdentity`

At any time after `init` has completed, you can call [`setIdentity`](#setidentityidentity-identity-void) to provide the SDK with a new identity to use.

## API Reference

All interactions with the SDK for JavaScript are done through the global `__uid2` object, which is an instance of the `UID2` class. All of the following JavaScript functions are members of the `UID2` class: 

- [constructor()](#constructor)
- [init()](#initopts-object-void)
- [getAdvertisingToken()](#getadvertisingtoken-string)
- [getAdvertisingTokenAsync()](#getadvertisingtokenasync-promise)
- [isLoginRequired()](#isloginrequired-boolean)
- [disconnect()](#disconnect-void)
- [abort()](#abort-void)
- [callbacks](#callbacks) <New />
- [setIdentity()](#setidentityidentity-identity-void) <New />
- [getIdentity()](#getidentity-identity--null) <New />
- [isInitComplete()](#isinitcomplete-boolean) <New />

### constructor()

Constructs a UID2 object. This is not intended to be used directly: when the SDK loads, it automatically initializes an instance of the UID2 class and stores it as the global __uid2 object. Advanced integrations may make use of this constructor directly, but must take care to avoid having multiple active instances of the SDK running. This is not a supported use case.

:::tip
Instead of calling this function, just use the global `__uid2` object.
:::

### init(opts: object): void

Initializes the SDK and establishes user identity for targeted advertising. 

Here's what you need to know about this function:

- You can call `init()` any time after the SDK has been loaded. The recommended way to do this is by registering a callback function that handles the `SdkLoaded` event using the [Array Push Pattern](#array-push-pattern). By using this pattern you can make sure that your code works regardless of script load order, and that using `async` or `defer` on your script tags does not cause UID2 SDK errors.
- The `identity` property in the `init()` call refers to the `body` property of the response JSON object returned from a successful [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) or [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) call with the server-side generated identity. This is a good way to provide the identity if your server-side integration ensures you always have a current token available and it is more convenient to provide it using JavaScript.
- If the `identity` property in the `init()` call is falsy, the SDK attempts to load the identity from local storage or the cookie.
  - Once `init()` is complete, all callbacks receive the `InitCompleted` event. If the `identity` property on the payload of this event is null, no identity could be loaded, and you should therefore [provide an identity to the SDK](#provide-an-identity-to-the-sdk). This is the recommended way to provide an identity if your server-side integration does not ensure a current identity is always available, and you need to request it from the server only when necessary.
  - If you are using a first-party cookie (see [UID2 Storage Format](#uid2-storage-format)) to store the passed UID2 information for the session, a call to `init()` made by a page on a different domain might not be able to access the cookie. You can adjust the settings used for the cookie with the `cookieDomain` and `cookiePath` options.
- To tune specific behaviors, initialization calls might include optional configuration [init parameters](#init-parameters).

The following is an example of an `init()` call made using a callback with the server-side generated identity included.

<ExampleJavaScriptInit />

The following is an example of an `init()` call that loads a previously-provided identity from local storage, if one is available. You can put a script like this on any page that the user might visit after the identity has been established.

```html
<script>
  window.__uid2 = window.__uid2 || {};
  window.__uid2.callbacks = window.__uid2.callbacks || [];
  window.__uid2.callbacks.push((eventType, payload) => {
    if (eventType === "SdkLoaded") {
      __uid2.init({}); // Note that you must provide a configuration object, even if you're not providing any options.
    }
  });
</script>
```

#### Init Parameters

The `opts` object supports the following properties.

| Property | Data Type | Attribute | Description | Default Value |
| :--- | :--- | :--- | :--- | :--- |
| `identity` | object | Optional | The `body` property value from a successful [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) or [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) call that has been run on the server to generate an identity.<br/>To use the identity from a first-party cookie (see [UID2 Storage Format](#uid2-storage-format)), leave this property empty. | N/A |
| `baseUrl` | string | Optional | The custom base URL of the UID2 operator to use when invoking the [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint.<br/>For example: `https://my.operator.com`. | `https://prod.uidapi.com`. |
| `refreshRetryPeriod` | number | Optional | The number of milliseconds after which to retry refreshing a token if an intermittent error occurs.<br/>This value must be >= 1000. | 5000 |
| `cookieDomain` | string | Optional | The domain name string to apply to the UID2 cookie (see [UID2 Storage Format](#uid2-storage-format)).<br/>For example, if the `baseUrl` is `https://my.operator.com`, the `cookieDomain` value might be `operator.com`. | `undefined` |
| `cookiePath` | string | Optional | The path string to apply to the UID2 cookie (see [UID2 Storage Format](#uid2-storage-format)). | `/` |
| `useCookie` | `boolean` | Optional | Set this to `true` to tell the SDK to store the identity in cookie storage instead of local storage. You can still provide an identity using a first-party cookie if this value is false or not provided. | 
| `callback` | `function(object): void` | Deprecated | The function that the SDK should invoke after validating the passed identity. Do not use this for new integrations. | N/A |

#### Multiple Init Calls

You can call the `init()` function any number of times.  In most cases, the  code will accept the latest value of a certain [init parameter](#init-parameters). For example, if init is called twice, and a different `baseUrl` is passed in each call, the `baseUrl` variable is updated to the value from the second call. 

There are two exceptions to this functionality:

1. If a new identity is passed in a subsequent call, and the new identity expires before the current identity, the new identity does not replace the current identity.  
2. For every subsequent callback function passed, the function is added to the existing array of callbacks using the [Array Push Pattern](#array-push-pattern).

:::note

If `useCookie` is updated, the location of the identity changes.  For example, if the value is updated from `true` to `false`, the first-party cookie is removed and the identity is added to local storage.

:::

### Init Config

Calling `init()` stores an init config in a first-party cookie or local storage which can include the following parameters if given: `baseUrl`, `useCookie`, `refreshRetryPeriod`, `cookiePath`, and `cookieDomain`.  This config is used to [bootstrap init](#self-bootstrap) and save load time in future page loads.  Subsequent calls to `init()` update the config with the most recent parameters.

### Self Bootstrap

When the constructor has completed and the SDK has been put on the window object, the code will check local storage and cookie storage for a stored [init config](#init-config).  If the config exists, `init()` is automatically called with the parameters from the config, and as a result, any functions that require `init()` can be used. 

#### Errors

The `init()` function can throw the following errors.

| Error | Description |
| :--- | :--- |
| `TypeError` | One of the following issues has occurred:<ul><li>The `opts` value is not an object.</li><li>A legacy callback is provided, but it is not a function.</li><li>`refreshRetryPeriod` is provided, but it is not a number.</li></ul> |
| `RangeError` | The refresh retry period is less than 1000. |

#### Legacy Callback Function

This is provided for backward compatibility only: new integrations should use the new-style [callback function](#callback-function). Note that the callback parameters are not compatible in either direction: legacy callbacks cannot be registered using the [Array Push Pattern](#array-push-pattern), and new-style callbacks cannot be provided to `init`.

For details, see [Legacy Callback Function](./sdk-ref-javascript-v2#callback-function) in the documentation for earlier versions of this SDK.

If you have already built an integration using a legacy callback function, you can use it with the current version of the SDK with no changes. However, this functionality will be removed in a future version of the SDK. We strongly recommend that you update your integration to use the new-style [callback function](#callback-function).

### getAdvertisingToken(): string

Gets the current advertising token. This function can be called without `init()` and returns the token if it is stored in local storage or a first-party cookie.  

```html
<script>
  let advertisingToken = __uid2.getAdvertisingToken();
</script>
```

The `getAdvertisingToken()` function allows you to access the advertising token from anywhere&#8212;not just from the callback that's done when initialization is complete.

This function returns `undefined` if any of the following conditions apply:

- The SDK initialization is complete, but there is no valid identity to use.
- The SDK initialization is complete, but the auto-refresh has cleared the identity&#8212;for example, because the user has opted out.

If the identity is not available, use the [isLoginRequired()](#isloginrequired-boolean) function to determine the best course of action.

### getAdvertisingTokenAsync(): Promise

Gets a `Promise` string for the current advertising token.

This function can be called before or after the [init()](#initopts-object-void) call. The returned promise is settled based on the availability of the advertising token:

- If the advertising token is available, the promise is fulfilled with the current advertising token.
- If the advertising token is not available, even temporarily, the promise is rejected with an instance of `Error`. To determine the best course of action in this case, you can use [isLoginRequired()](#isloginrequired-boolean).

You can use this function to be notified of the completion of the Client-Side JavaScript SDK initialization if you only want to receive the identity available once `init` is complete, and you do not want to continue receiving updates to the identity.

:::info
If the `getAdvertisingTokenAsync()` function is called *after* the initialization is complete, the promise is settled immediately based on the current state.
:::

:::tip
It might be easier to use the [callback function](#callback-function) to be notified whenever the identity changes.
:::

```html
<script>
  __uid2.getAdvertisingTokenAsync()
    .then(advertisingToken => { /* initiate targeted advertising */ })
    .catch(err => { /* advertising token not available */ });
</script>
```


### isLoginRequired(): boolean

Specifies whether a UID2 [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) call is required. 

```html
<script>
  __uid2.isLoginRequired();
</script>
```

#### Return Values

| Value | Description |
| :--- | :--- |
| `true` | The identity is not available. This value indicates any of the following:<ul><li>The user has opted out.</li><li>The refresh token has expired.</li><li>A first-party cookie is not available and no server-generated identity has been supplied.</li></ul> |
| `false` | This value indicates one of the following:<ul><li>The identity is present and valid.</li><li>The identity has expired (but the refresh token has not expired), and the token was not refreshed due to an intermittent error. The identity might be restored after a successful auto-refresh attempt.</li></ul> |
| `undefined` | The SDK initialization is not yet complete. |

### disconnect(): void

Clears the UID2 identity from the first-party cookie and local storage (see [UID2 Storage Format](#uid2-storage-format)). This closes the client's identity session and disconnects the client lifecycle.

When a user logs out of the publisher's site, make the following call:

```html
<script>
  __uid2.disconnect();
</script>
```

After this function is executed, the [getAdvertisingToken()](#getadvertisingtoken-string) function returns `undefined` and the [isLoginRequired()](#isloginrequired-boolean) function returns `true`.

:::warning
If you need to provide a `cookieDomain` or `cookiePath` for the SDK to access the correct cookie, and `init` has not been completed, the SDK cannot clear the cookie. In this case, no error is raised.
:::

### abort(): void
	
Terminates any background timers or requests. The UID2 object remains in an unspecified state and cannot be used anymore. 

This function is intended for use in advanced scenarios where you might want to replace the existing UID2 object with a new instance.

### callbacks

This is an array that stores all of the registered callbacks. You should only interact with it using the [Array Push Pattern](#array-push-pattern).

### setIdentity(identity: Identity): void

Use this function to provide a new identity to the UID2 SDK. Any existing refresh attempts are cancelled, and the new identity is used for all future operations. A new refresh timer is started. Once the identity has been validated, all registered event handlers are called with an `IdentityUpdated` event containing the new identity.

`setIdentity` throws an error if it is called before `init` has completed.

:::tip
`setIdentity()` is useful if your page is a single-page app that might not have the identity available when it first loads. This allows you to call `init` (and load any stored identity) on page load, and then provide an identity later if there was no stored identity.
:::

### getIdentity(): Identity | null

Returns the current stored identity, if available. `init()` does not have to be called to use this function.

If there is a valid identity available, the return value is an object representing the full stored identity. The properties of the object are the same as the stored value as described in the [contents structure](#contents-structure) section.

If there is no currently valid identity (even if the identity is only temporarily unavailable), the return value is null. If you need to know whether the identity is only temporarily unavailable, you can call [isLoginRequired()](#isloginrequired-boolean).

### isInitComplete(): boolean

Returns true if the `init()` function has been called at least once.

Returns false if `init()` has never been called.

## UID2 Storage Format

The SDK uses either local storage or a first-party cookie to store the user's identity. The default option is to use local storage, but this can be changed using an [init parameter](#init-parameters).

Even when using local storage, the SDK checks to see if there is a newer identity available in a first-party cookie. This allows the SDK to make use of local storage while still allowing you to provide an identity by setting the first-party cookie.

### UID2 Cookie Properties

If cookie storage is being used, the cookie uses the properties in the following table.

| Properties | Default Value | Comments |
| :--- | :--- | :--- |
| `Name` | `__uid_2` | N/A |
| `Expiry` | N/A | The value is the refresh token expiration timestamp as specified in the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) or [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) response. |
| `Path` | `/` | If you want to use a different value, you can set it during SDK initialization using the `cookiePath` [init() parameter](#init-parameters). |
| `Domain` | `undefined` | If you want to use a different value, you can set it during SDK initialization using the `cookieDomain` [init() parameter](#init-parameters). |

### Contents Structure

The content of the UID2 local storage or cookie is a URI-encoded string representation of a JSON object with the structure identical to that of the `body` property in a [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) or [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) response, with the exception of the `private` object. 

The following is an example of the UID2 cookie structure:

<ExampleUid2Cookie />

:::warning
The contents of the `private` object are explicitly unspecified and are left for the SDK to interpret. Do not make any assumptions about the structure, semantics, or compatibility of this object. Any updates to the cookie must retain its structure.
:::

## Migration Guide

This section includes all the information you need to upgrade from an earlier version of the SDK for JavaScript to the current version, v3. It includes:

- [Benefits of Migrating](#benefits-of-migrating)
- [Required Changes](#required-changes)
- [Recommended Changes](#recommended-changes)
- [Optional Changes](#optional-changes)

### Benefits of Migrating

If your existing integration uses version 1.x or 2.x of the SDK, version 3 is fully backwards-compatible. You can update to version 3 of the SDK just by changing your script tag to refer to the new URL. Doing this gives you the following benefits:

- The script is now distributed using the UID2 CDN, and should therefore load faster.
- The SDK tries to use local storage instead of cookies for storing the identity. If the cookie provides a newer token than the one in local storage, the SDK still loads the identity from the cookie.

   Notes about this approach:
  - A default of local storage has been requested by a number of publishers who are close to the maximum size limit for cookies.
  - If you rely on setting a first-party cookie to provide a new identity, you do not gain any benefit from this change.
  - If you only provide the identity by passing it to `init`, the SDK no longer writes to the cookie.

Some of the functionality from versions 1.x and 2.x has been deprecated, and you should make changes to future-proof your integration.
- The legacy callback system has been deprecated and will eventually be removed.

By updating your integration, you can take advantage of the additional features available:
- Script loading using `async` or `defer` is now fully supported.
- The callback system is simpler, with fewer states to manage.
- You can provide multiple callbacks, and they can be registered at any time&#8212;before or after `init` has been called.
- Full TypeScript support.
- Functions to set the identity after `init()` has been called.

  This makes the SDK much easier to use in single-page app scenarios.

### Required Changes

#### Update your script URL

Update your script tag to load the SDK from [the version 3 CDN URL](#include-the-sdk-script).

### Recommended Changes

We strongly recommend that you implement the following changes to get the benefits of version 3 of the SDK:

- [Migrate to the Version 3 Callback System](#migrate-to-the-version-3-callback-system)
- [Take advantage of `setIdentity` and other new features](#take-advantage-of-setidentity-and-other-new-features)
- [Change how you call init](#change-how-you-call-init)

#### Migrate to the Version 3 Callback System

In earlier versions, the callback accepts a single object as a parameter, with properties `advertisingToken`, `status`, and `statusText`. For version 3, change this function to use the new [Callback Function Signature](#callback-function-signature).

Your original callback probably has some logic to deal with different values of `status`. The previous system had a variety of different status values to handle, such as `EXPIRED`, `REFRESHED`, and `NO_IDENTITY`. The new system instead has only three event types: `SdkLoaded`, `InitCompleted`, and `IdentityUpdated`.

This guide cannot cover every possible scenario, and you should review the [Callback Function](#callback-function) section and consider the best way to implement your requirements using the new system. However, there are some general guidelines that should help:
- Check the `event` parameter. If the value is `SdkLoaded`, return immediately.
- Otherwise, check to see if the `payload` parameter has an `identity` property.
  - If there is no object on the `identity` property, there is no UID2 identity available. You should invoke whatever the previous callback did in the equivalent situation.
  - Otherwise, the `identity` property is an object with a `string` property named `advertising_token`. You should use this in the same way that the old callback did.

Remove the old callback from your `init` call, and provide your updated callback function to the SDK using the [Array Push Pattern](#array-push-pattern):

```
window.__uid2 = window.__uid2 || {};
window.__uid2.callbacks = window.__uid2.callbacks || [];
window.__uid2.callbacks.push(callbackFunction);
```

#### Take advantage of `setIdentity` and other new features

Previous versions of the SDK had only one way to provide a new identity: in the call to `init`. This meant that some publishers had to make use of various workarounds to provide a new identity later in the page lifecycle. You might be able to simplify your integration by removing these workarounds and simply calling `setIdentity` if you want to pass a new identity to the SDK after `init` has been called.

#### Change how you call init

The recommended way to call `init` is by using the [Array Push Pattern](#array-push-pattern). Your existing call to `init` should be moved inside a callback handler that only handles the `SdkLoaded` event, as shown in the following example:

```
window.__uid2 = window.__uid2 || {};
window.__uid2.callbacks = window.__uid2.callbacks || [];
window.__uid2.callbacks.push((eventType) => {
  // Each callback function you register with the SDK is invoked once with the `SdkLoaded` event type after the SDK has been loaded by the browser and is ready to use.
  if (eventType === 'SdkLoaded' {    
    __uid2.init({
      /* Provide the same options as in your previous code. If you're not using the legacy callback any more, remove it from here. */
    });
  })
});
```

### Optional Changes

#### Add `async` or `defer` to your script tag

If you have decided to use `async` or `defer` script loading, move the script tag that loads the SDK into the document header and add the appropriate keyword.

Deciding to use `async` or `defer` script loading is not something the UID2 team can provide advice on, because it depends on the individual website. If you're not sure, it is safe to ignore this change and leave your script tag unchanged.
