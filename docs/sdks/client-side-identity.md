---
title: UID2 SDK for JavaScript
description: Reference information about the JavaScript client-side SDK.
hide_table_of_contents: false
sidebar_position: 02
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# UID2 SDK for JavaScript Reference Guide

This page describes version 3 of the UID2 SDK for JavaScript. If you are maintaining an integration using an earlier version, either:
- Follow the [migration guide](#migration-guide) to upgrade your integration, or
- Refer to the documentation for [earlier versions of the SDK](./client-side-identity-v2.md).

Use this SDK to facilitate the process of establishing client identity using UID2 and retrieving advertising tokens. The following sections describe the high-level [workflow](#workflow-overview) for establishing UID2 identity, provide the SDK [API reference](#api-reference), and explain the [UID2 cookie format](#uid2-cookie-format).

- For integration steps for content publishers, see [UID2 SDK for JavaScript Integration Guide](../guides/publisher-client-side.md). 
- For an [example application](TODO) with associated documentation, see the [UID2 SDK Integration Example](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-esp-integration/with_sdk_v3) guide.

<!-- This guide includes the following information:

- [Functionality](#functionality)
- [SDK Version](#sdk-version)
- [GitHub Repository/Binary](#github-repositorybinary)
- [Terminology](#terminology)
- [Include the SDK Script](#include-the-sdk-script)
- [Workflow Overview](#workflow-overview)
   - [Workflow States and Transitions](#workflow-states-and-transitions)
   - [Background Token Auto-Refresh](#background-token-auto-refresh)
 - [API Reference](#api-reference)
   - [constructor()](#constructor)
   - [init()](#initopts-object-void)
   - [getAdvertisingToken()](#getadvertisingtoken-string)
   - [getAdvertisingTokenAsync()](#getadvertisingtokenasync-promise)
   - [isLoginRequired()](#isloginrequired-boolean)
   - [disconnect()](#disconnect-void)
   - [abort()](#abort-void)
- [UID2 Cookie Format](#uid2-cookie-format)
  - [Properties](#properties)
  - [Contents Structure](#contents-structure) -->

## Functionality

This SDK simplifies integration with UID2 for any publishers who want to support UID2. The following table shows the functions it supports.

| Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token | Generate UID2 Token from DII | Refresh UID2 Token |
| :--- | :--- | :--- | :--- |
| Not supported | Not supported | Coming Soon | Supported |

## SDK Version

This documentation is for version 3 of the UID2 SDK for JavaScript.

## GitHub Repository

The source for this SDK is in the following open-source GitHub repository:

- [https://github.com/iabtechlab/uid2-web-integrations](https://github.com/iabtechlab/uid2-web-integrations)

The SDK is published in these locations:

<!-- - NPM: [https://www.npmjs.com/package/@uid2/uid2-sdk](https://www.npmjs.com/package/@uid2/uid2-sdk)
  - This is the easiest way to include the SDK in your own build. Use this if you want to bundle the SDK along with your other JavaScript or TypeScript files.
  - You can also use this for TypeScript type information and still load the script via the CDN. If you do this, ensure that the version of NPM package you have installed matches the version in the CDN url. TODO: Looking at the NPM package, I don't believe it's ready for use - it just includes the source and doesn't seem to include a ready-to-deploy build. LP 12 Sep 2023 -->
- CDN: [https://cdn.prod.uidapi.com/uid2-sdk-${VERSION_ID}.js](https://cdn.prod.uidapi.com/uid2-sdk-${VERSION_ID}.js)
  <!-- - This is the easiest way to include the SDK in your site if you don't use a build pipeline to bundle your JavaScript. TODO: This doesn't make sense until we add the NPM option above. -->
  - As of the latest update to this document, the most recent version is 3.0.2.
- CDN (Integration): [https://cdn.integ.uidapi.com/uid2-sdk-${VERSION_ID}.js](https://cdn.integ.uidapi.com/uid2-sdk-${VERSION_ID}.js)
  - This integration URL contains un-minified code and is intended for testing purposes only. Do not use this URL for your production site.

## Terminology

In this document, the following terms apply:
- **Identity** refers to a package of values, returned by the [POST /token/generate](../endpoints/post-token-generate.md) or [POST /token/refresh](../endpoints/post-token-refresh.md) endpoint, that includes the UID2 token, the refresh token, and associated values such as timestamps.
- **Advertising token** refers to the UID2 token.
- **Callback function** refers to a callback function built for the current version of this SDK and registered using the [Array Push Pattern](#array-push-pattern).
- **Legacy callback function** refers to a callback function built for version 1.x or 2.x of this SDK and registered in the call to `init`.

## Include the SDK Script

On every page where you want to use UID2 for targeted advertising, include the following SDK script:

```html
<script src="https://cdn.prod.uidapi.com/uid2-sdk-3.0.2.js" type="text/javascript"></script> 
```

### Async or defer loading the SDK Script

Version 3 and above of the SDK can be used with `async` or `defer` script loading. TODO: Only in certain circumstances!

If you are using `async` or `defer` script loading on your site, you should:
- (Required) Ensure you are calling `__uid2.init` from the `SdkLoaded` [Event Handler](#event-handlers).
- (Required) Add the relevant attribute to the script tag.
- (Recommended) Ensure the script tag is in the `<head>` portion of the page.
```html
<head>
  <!-- ... -->
  <script async src="https://cdn.prod.uidapi.com/uid2-sdk-3.0.2.js" type="text/javascript"></script>
  <!-- ... -->
</head>
```

## Workflow Overview

The high-level client-side workflow for establishing UID2 identity using the SDK consists of the following steps:

1. Publisher: Register a callback function using the [Array Push Pattern](#array-push-pattern).
2. Publisher: When your callback receives the `SdkLoaded` event, initialize the SDK using the [init](#initopts-object-void) function.
3. Publisher: Wait for your event listener to receive the `InitCompleted` event. The event data indicates the identity availability:
	- If the identity is available, it will be in the event payload. The SDK will set up a [background token auto-refresh](#background-token-auto-refresh).
	- If the identity is unavailable, the `identity` property on the payload will be nullish. No UID2 will be available until you [provide a valid identity](#provide-identity).
4. Publisher: Handle the `IdentityUpdated` callback event which will indicate changes to the identity.
  - The `identity` property on the event payload will either contain the new identity, or will be nullish if a valid identity is not available.
5. Publisher: Handle the identity based on its state:
	- If the advertising token is available, use it to initiate requests for targeted advertising.
	- If the advertising token is not available, either use untargeted advertising or redirect the user to the UID2 login with the consent form.

For more detailed web integration steps, see [UID2 SDK for JavaScript Integration Guide](../guides/publisher-client-side.md).

### Background Token Auto-Refresh

As part of the SDK [initialization](#initopts-object-void), a token auto-refresh for the identity is set up, which is triggered in the background by the timestamps on the identity or by failed refresh attempts due to intermittent errors.

Here's what you need to know about the token auto-refresh:

- Only one token refresh call can be active at a time. 
- If the [POST /token/refresh](../endpoints/post-token-refresh.md) response is unsuccessful because the user has opted out, or because the refresh token has expired, this suspends the background auto-refresh process and requires a new login. In all other cases, auto-refresh attempts continue in the background.
- All [callback functions](#callback-function) provided using the [Array Push Pattern](#array-push-pattern) are invoked in the following cases:
	- After each successful refresh attempt.
	- When identity has become invalid&#8212;for example, because the user has opted out.<br/>NOTE: The callback is *not* invoked when identify is temporarily unavailable and the auto-refresh keeps failing. In this case, the SDK continues using the existing advertising token.
- A [disconnect()](#disconnect-void) call cancels the active timer. 


## API Reference

>IMPORTANT: All interactions with the Client-Side JavaScript SDK are done through the global `__uid2` object, which is a member of the `UID2` class. All of following JavaScript functions are members of the `UID2` class. 

- [constructor()](#constructor)
- [init()](#initopts-object-void)
- [getAdvertisingToken()](#getadvertisingtoken-string)
- [getAdvertisingTokenAsync()](#getadvertisingtokenasync-promise)
- [isLoginRequired()](#isloginrequired-boolean)
- [disconnect()](#disconnect-void)
- [abort()](#abort-void)

### Callback Function

You can register functions to receive events from the UID2 SDK. There are a number of events currently available:
- `SdkLoaded` will be raised once the SDK has been parsed and the global `__uid2` object has been constructed. This is useful for calling `init()`, especially if your script loading order is not guaranteed (e.g. you are using `async` or `defer` script loading.)
- `InitCompleted` will be raised when `init()` has finished and the SDK is ready for use.
- `IdentityUpdated` will be raised whenever there is a new identity available, or the existing identity is no longer available.

#### Callback Function Signature

Your callback function should accept two parameters: an event type and a payload. The type of the payload will depend on the event type.

This is an example callback which handles the `SdkLoaded` event to call init and `InitCompleted` to provide an identity if one isn't available once `init` has completed.

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
  import { EventType, Uid2CallbackPayload } from "./uid2CallbackManager";

  window.__uid2 = window.__uid2 || {};
  window.__uid2.callbacks = window.__uid2.callbacks || [];
  window.__uid2.callbacks.push((eventType: EventType, payload: Uid2CallbackPayload) => {
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


### constructor()

Constructs a UID2 object. This is not intended to be used directly: when the SDK loads, it automatically initializes an instance of the UID2 class and stores it as the global `__uid2` object. Advanced integrations may make use of this constructor directly, but care must be taken to avoid having multiple active instances of the SDK running. This is not a supported use-case.

>TIP: Instead of calling this function, just use the global `__uid2` object. 

### init(opts: object): void

Initializes the SDK and establishes user identity for targeted advertising. 

Here's what you need to know about this function:

- You can call `init()` any time after the SDK has been loaded. The recommended way to do this is by registering a callback function which handles the `SdkLoaded` event using the [Array Push Pattern](#array-push-pattern). Using this pattern means your code will work regardless of script load order, and using `async` or `defer` on your script tags will not cause UID2 SDK errors.
- The `identity` property in the `init()` call refers to the `body` property of the response JSON object returned from a successful [POST /token/generate](../endpoints/post-token-generate.md) or [POST /token/refresh](../endpoints/post-token-refresh.md) call with the server-side generated identity. This is a good way to provide the identity if your server-side integration ensures you always have a current token available, and it is more convenient to provide it using JavaScript.
- If the `identity` property in the `init()` call is `nullish`, the SDK will attempt to load the identity from the cookie.
  - Once `init()` is complete, all callbacks will receive the `InitCompleted` event. If the `identity` property on the payload of this event is nullish, no identity could be loaded and you should [provide a valid identity](#provide-identity). This is the recommended way to provide an identity if your server-side integration does not ensure a current identity is always available, and you need to request it from the server only when necessary.
  - If you are using a [first-party cookie](#uid2-cookie-format) to store the passed UID2 information for the session, a call to `init()` made by a page on a different domain might not be able to access the cookie. You can adjust the settings used for the cookie with the `cookieDomain` and `cookiePath` options.
- To tune specific behaviors, initialization calls might include optional configuration [init parameters](#init-parameters).

The following is an example of an `init()` call made using a callback with the server-side generated identity included.

```html
<script>
  window.__uid2 = window.__uid2 || {};
  window.__uid2.callbacks = window.__uid2.callbacks || [];
  window.__uid2.callbacks.push((eventType, payload) => {
    if (eventType === "SdkLoaded") {
      __uid2.init({
        identity : { // The `body` property value from the token/generate or token/refresh API response.
          "advertising_token": "AgmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b/besPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM+ewMzXXM8G9j8Q=",
          "refresh_token": "Mr2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq/90PYmajV0IPrvo51Biqh7/M+JOuhfBY8KGUn//GsmZr9nf+jIWMUO4diOA92kCTF69JdP71Ooo+yF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA==",
          "identity_expires": 1633643601000,
          "refresh_from": 1633643001000,
          "refresh_expires": 1636322000000
        }
      });
    }
  });
</script>
```

The following is an example of an `init()` call that uses identity from a first-party cookie. You can put a script like this on any page that the user might visit after the identity has been established.

```html
<script>
  window.__uid2 = window.__uid2 || {};
  window.__uid2.callbacks = window.__uid2.callbacks || [];
  window.__uid2.callbacks.push((eventType, payload) => {
    if (eventType === "SdkLoaded") {
      __uid2.init({}); // Note that you must provide a configuration object, even if you are not providing any options - the parameter must not be nullish.
    }
  });
</script>
```

#### Init Parameters

The `opts` object supports the following properties.

| Property | Data Type | Attribute | Description | Default Value |
| :--- | :--- | :--- | :--- | :--- |
| `identity` | object | Optional | The `body` property value from a successful [POST /token/generate](../endpoints/post-token-generate.md) or [POST /token/refresh](../endpoints/post-token-refresh.md) call that has been run on the server to generate an identity.<br/>To use the identity from a [first-party cookie](#uid2-cookie-format), leave this property empty. | N/A |
| `baseUrl` | string | Optional | The custom base URL of the UID2 operator to use when invoking the [POST /token/refresh](../endpoints/post-token-refresh.md) endpoint.<br/>For example: `https://my.operator.com`. | `https://prod.uidapi.com`. |
| `refreshRetryPeriod` | number | Optional | The number of milliseconds after which to retry refreshing tokens if intermittent errors occur. This value must be >= 1000. | 5000 |
| `cookieDomain` | string | Optional | The domain name string to apply to the [UID2 cookie](#uid2-cookie-format).<br/>For example, if the `baseUrl` is `https://my.operator.com`, the `cookieDomain` value might be `operator.com`. | `undefined` |
| `cookiePath` | string | Optional | The path string to apply to the [UID2 cookie](#uid2-cookie-format). | `/` |
| `callback` | `function(object): void` | Deprecated | The function that the SDK should invoke after validating the passed identity. Do not use this for new integrations. | N/A |


#### Errors

The `init()` function can throw the following errors.

| Error | Description |
| :--- | :--- |
| `TypeError` | One of the following issues has occurred:<br/>- The function has already been called.<br/>- The `opts` value is not an object.<br/>- A legacy callback is provided, but it is not a function.<br/>- `refreshRetryPeriod` is provided, but it is not a number.|
| `RangeError` | The refresh retry period is less than 1000. |

#### Legacy Callback Function

For details, see [Legacy Callback Function](./client-side-identity-v2#callback-function). This is provided for backward compatibility only: new integrations should use the new-style [Callback function](#callback-function). Note that the callback parameters are not compatible in either direction: legacy callbacks cannot be registered using the Array Push Pattern, and new-style callbacks cannot be provided to init.

If you have already built an integration using a legacy callback function you can use it with the current version of the SDK with no changes, however this functionality will be removed in a future version of the SDK. You should consider updating your integration to use the new-style [Callback function](#callback-function).

### getAdvertisingToken(): string

Gets the current advertising token. 

Before calling this function, be sure to call [init()](#initopts-object-void) and wait until your callback handler has received an `InitCompleted` event. 

```html
<script>
  let advertisingToken = __uid2.getAdvertisingToken();
</script>
```

The `getAdvertisingToken()` function allows you to access the advertising token from anywhere&#8212;not just from the callback that's done when initialization is complete. This function returns `undefined` if any of the following conditions apply:

- The [callback function](#callback-function) has not received an `InitCompleted` event, which means that the SDK initialization is not yet complete.
- The SDK initialization is complete, but there is no valid identity to use.
- The SDK initialization is complete, but the auto-refresh has cleared the identity&#8212;for example, because the user has opted out.

If the identity is not available, use the [isLoginRequired()](#isloginrequired-boolean) function to determine the best course of action.

### getAdvertisingTokenAsync(): Promise

Gets a `Promise` string for the current advertising token.

This function can be called before or after the [init()](#initopts-object-void) call. The returned promise is settled after the initialization is complete, based on the availability of the advertising token:

- If the advertising token is available, the promise is fulfilled with the current advertising token.
- If the advertising token is not available, even temporarily, the promise is rejected with an instance of `Error`. To determine the best course of action in this case, you can use [isLoginRequired()](#isloginrequired-boolean).

>NOTE: If the `getAdvertisingTokenAsync()` function is called *after* the initialization is complete, the promise is settled immediately based on the current state.


```html
<script>
  __uid2.getAdvertisingTokenAsync()
    .then(advertisingToken => { /* initiate targeted advertising */ })
    .catch(err => { /* advertising token not available */ });
</script>
```

>TIP: You can use this function to be notified of the completion of the Client-Side JavaScript SDK initialization if you only want to receive the identity available once `init` is complete, and you do not want to continue receiving updates to the identity.

### isLoginRequired(): boolean

Specifies whether a UID2 login ([POST /token/generate](../endpoints/post-token-generate.md) call) is required. 

```html
<script>
  __uid2.isLoginRequired();
</script>
```

#### Return Values

| Value | Description |
| :--- | :--- |
| `true` | The identity is not available, and the UID2 login is required. This value indicates any of the following:<br/>- The user has opted out.<br/>- The refresh token has expired.<br/>- A first-party cookie is not available and no server-generated identity has been supplied. |
| `false` | No login is required. This value indicates one of the following:<br/>- The identity is present and valid.<br/>- The identity has expired, and the token was not refreshed due to an intermittent error. The identity might be restored after a successful auto-refresh attempt. |
| `undefined` | The SDK initialization is not yet complete. |

### disconnect(): void

Clears the UID2 identity from the [first-party cookie](#uid2-cookie-format). This closes the client's identity session and disconnects the client lifecycle.

When an unauthenticated user is present, or a user wants to log out of targeted advertising on the publisher's site, make the following call:

```html
<script>
  __uid2.disconnect();
</script>
```

After this function is executed, the [getAdvertisingToken()](#getadvertisingtoken-string) function returns `undefined` and the [isLoginRequired()](#isloginrequired-boolean) function returns `true`.

>NOTE: If you need to provide a `cookieDomain` or `cookiePath` for the SDK to access the correct cookie, and init has not been complete, the SDK will not be able to clear the cookie. In this case, there will be no error raised.

### abort(): void
	
Terminates any background timers or requests. The UID2 object remains in an unspecified state and cannot be used anymore. 

This function is intended for use in advanced scenarios where you might want to replace the existing UID2 object with a new instance. 

## UID2 Cookie Format

The SDK uses a first-party cookie to store the user's identity.

### Properties

The following table lists the cookie properties.

| Properties | Default Value | Comments |
| :--- | :--- | :--- |
| `Name` | `__uid_2` | N/A |
| `Expiry` | N/A | The value is the refresh token expiration timestamp as specified in the [POST /token/generate](../endpoints/post-token-generate.md) or [POST /token/refresh](../endpoints/post-token-refresh.md) response. |
| `Path` | `/` | If you want to use a different value, you can set it during SDK initialization using the `cookiePath` [init() parameter](#parameters). |
| `Domain` | `undefined` | If you want to use a different value, you can set it during SDK initialization using the `cookieDomain` [init() parameter](#parameters). |

### Contents Structure

The UID2 cookie contents are a URI-encoded string representation of a JSON object with the structure identical to that of the `body` property in a [POST /token/generate](../endpoints/post-token-generate.md) or [POST /token/refresh](../endpoints/post-token-refresh.md) response, with the exception of the `private` object. 

The following is an example of the UID2 cookie structure:

```json
{
   "advertising_token":"AgAAAAVacu1uAxgAxH+HJ8+nWlS2H4uVqr6i+HBDCNREHD8WKsio/x7D8xXFuq1cJycUU86yXfTH9Xe/4C8KkH+7UCiU7uQxhyD7Qxnv251pEs6K8oK+BPLYR+8BLY/sJKesa/koKwx1FHgUzIBum582tSy2Oo+7C6wYUaaV4QcLr/4LPA==",
   "refresh_token":"AgAAAXxcu2RbAAABfGHhwFsAAAF79zosWwAAAAWeFJRShH8u1AYc9dYNTB20edyHJU9mZv11e3OBDlLTlS5Vb97iQVumc7b/8QY/DDxr6FrRfEB/D85E8GzziB4YH7WUCLusHaXKLxlKBSRANSD66L02H3ss56xo92LMDMA=",
   "identity_expires":1633643601000,
   "refresh_from":1633643001000,
   "refresh_expires":1636322000000,
   "private":{     
   }
}
```
>IMPORTANT: The contents of the `private` object are explicitly unspecified and are left for the SDK to interpret. Do not make any assumptions about the structure, semantics, or compatibility of this object. Any updates to the cookie must retain its structure.

## Migration Guide

### Benefits of Migrating

If you have built an integration using version 1.x or 2.x of the SDK, version 3 is fully backwards-compatible. You can update to the new SDK just by changing your script tag to refer to the new URL. You will gain some benefits just by doing this:

- The script is now distributed using our CDN. It should load faster.
- Coming soon: The SDK will try to use local storage instead of cookies for storing the identity. It will still load the identity from the cookie if it provides a newer token than the one in local storage.
  - This has been requested by a number of publishers who are close to the maximum size limit for cookies.
  - If you rely on setting a first-party cookie to provide a new identity, you will not gain any benefit from this change.
  - If you only provide the identity by passing it to `init`, the SDK will no longer write to the cookie.

Some functionality from versions 1.x and 2.x has been deprecated, and you should make changes to future-proof your integration:
- The legacy callback system has been deprecated and will eventually be removed.

By updating your integration, you can take advantage of the new features available:
- Script loading using `async` or `defer` is now fully supported.
- A simplified callback system without multiple states to manage.
- You can provide multiple callbacks, and they can be registered at any time - before or after init has been called.
- Full TypeScript support.
- Functions to set the identity after `init()` has been called.
  - This makes the SDK much easier to use in Single-Page App scenarios.
- Coming soon: Client-side token generate.
  - This upcoming feature will allow you to build a client-only UID2 integration with no need for server-side changes.

### Required changes

You will need to change your callback to support the new 