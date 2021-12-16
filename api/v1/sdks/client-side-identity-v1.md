[UID2 API Documentation](../../README.md) > v1 > [SDKs](./README.md) > Client-Side Identity

# Client-Side Identity JavaScript SDK (v1)

>NOTE: This documentation is for version 1 of the SDK. For the previous version, see [SDK version 0](./client-side-identity-v0.md).

Use this UID2 SDK to facilitate the process of establishing client identity using UID2 and retrieving advertising tokens. The following sections describe the high-level [workflow](#workflow-overview) for establishing UID2 identity, provide the SDK [API reference](#api-reference), and explain the [UID2 cookie format](#uid2-cookie-format). 
- For integration steps for content publishers, see [UID2 SDK Integration Guide](../guides/publisher-client-side.md). 
- For an example application, see [UID2 SDK Integration Example](https://github.com/UnifiedID2/uid2-examples/blob/main/publisher/standard/README.md).

>NOTE: Within this documentation, the term "identity" refers to a package of UID2 tokens, including the advertising token.

### Improvements and Changes from Version 0

With the v1 updates to the UID2 SDK, you can now take advantage of the following: 

- The latest enhancements in the UID2 services.
- Asynchronous notifications received when the advertising token is ready, is updated, or becomes unavailable.<br/>This makes integration with targeted advertising more straightforward and provides a clearer implementation path for the publisher workflow.
- A more efficient token auto-refresh process that ensures continuity of targeted advertising.
- More granular control over how the SDK works behind the scenes to fine-tune it to your needs.

>IMPORTANT: Version 1 of the UID2 SDK supports the version 0 cookies for user session continuity, but it is not backward-compatible and requires the code changes listed below. 

The following table lists specific updates to the SDK.

| Change | Description |
|:--- |:--- |
| New required [callback function](#callback-function) | The callback must be provided to the [init()](#initopts-object-void) function. The callback is invoked  after the initialization process is complete. |
| [Background token auto-refresh](#background-token-auto-refresh) | After `init()` completes and while the identity refresh token is valid, the UID2 SDK periodically refreshes the identity in background.  |
| New `opts` [object parameters](#parameters) in `init()` |  The `opts` object passed as an argument to the [init()](#initopts-object-void) function can now include optional parameters that allow configuring the UID2 first-party cookie, the UID2 operator URL to refresh the identity, and the refresh check and retry period. |
| Updated [getAdvertisingToken()](#getadvertisingtoken-string) return value | The `getAdvertisingToken()` function can now return `undefined`. |
| New [getAdvertisingTokenAsync()](#getadvertisingtokenasync-promise) function | The function returns a promise that is settled when the initialization is complete. |
| New [abort()](#abort-void) function | The function  allows termination of any background processing performed by the UID2 SDK. | 



## Include the SDK Script

Include the following SDK script on the pages where you want to use UID2 to manage identity or retrieve an advertising token for targeted advertising:

```html
<script src="https://prod.uidapi.com/static/js/uid2-sdk-1.0.0.js" type="text/javascript"></script> 
```

## Workflow Overview

The high-level client-side workflow for establishing UID2 identity using the SDK consists of the following steps:

1. [Initialize the SDK](#initopts-object-void) and specify a [callback function](#callback-function) to be called upon a successful completion of the step.
2. Wait for the SDK to invoke the callback function. The callback function indicates the identity availability:
	- If the identity is available, the [background token auto-refresh](#background-token-auto-refresh) is set up.
	- If not, the reason for its unavailability is specified.
3. Based on the identity [state](#workflow-states-and-transitions), the SDK does the following:
	- If a valid identity is available, the SDK ensures the identity is available in a [first-party cookie](#uid2-cookie-format).
	- If the identity is unavailable, the SDK takes the appropriate action based on whether identity is refreshable or not. For details, see [Workflow States and Transitions](#workflow-states-and-transitions).
4. Handle the identity based on its state:
	- If the advertising token is available, use it to initiate requests for targeted advertising.
	- If not, either use untargeted advertising or redirect the user to the UID2 login with the consent form.

For intended web integration steps, see [Publisher Integration Guide (Standard)](../guides/publisher-client-side.md).

### Workflow States and Transitions

The following table outlines the four main states in which the SDK can be, based on the combination of values returned by two main functions, [getAdvertisingToken()](#getadvertisingtoken-string) and [isLoginRequired()](#isloginrequired-boolean), and indicates the appropriate action that you, as a developer, can take in each state. 

| State | Advertising Token | Login Required | Description| Identity Status Value |
| :--- | :--- | :---| :---| :---|
| Initialization | `undefined`| `undefined`| Initial state until the callback is invoked. | N/A |
| Identity Is Available | available |`false` | A valid identity has been successfully established or refreshed. You can use the advertising token in targeted advertising.  |`ESTABLISHED` or `REFRESHED` |
| Identity Is Temporarily Unavailable |`undefined` | `false`| The identity (advertising token) has expired, and automatic refresh failed. [Background auto-refresh](#background-token-auto-refresh) attempts will continue until the refresh token expires or the user opts out.</br>You can do either of the following:</br>- Use untargeted advertising.</br>- Redirect the user to the UID2 login with a consent form.</br>NOTE: Identity may be successfully refreshed after some time, for example, if the UID2 service is temporarily unavailable.| `EXPIRED` |
| Identity Is Not Available  | `undefined`| `false`| The identity is not available and cannot be refreshed. The SDK clears the first-party cookie.</br>To use UID2-based targeted advertising again,  you need to redirect the user to the UID2 login with a consent form. | `INVALID`, `NO_IDENTITY`, `REFRESH_EXPIRED`, or `OPTOUT` |


The following diagram illustrates the four states, including the respective identity [status values](#identity-status-values), and possible transitions between them. The SDK invokes the [callback function](#callback-function) on each transition.

![Client-Side Identity JavaScript SDK Workflow](./uid2-js-sdk-workflow.svg)


### Background Token Auto-Refresh

As part of the SDK [initialization](#initopts-object-void), a token auto-refresh for the identity is set up, which is triggered in the background by the timestamps on the identity or failed refresh attempts due to intermittent errors.

Here's what you need to know about the token auto-refresh:


- Only one token refresh call can be active at a time. 
- An unsuccessful [GET /token/refresh](../endpoints/get-token-refresh.md) response due to the user's optout or the refresh token expiration suspends  the background auto-refresh process and requires a new login ([isLoginRequired()](#isloginrequired-boolean) returns `true`). In all other cases, auto-refresh attempts will continue in the background.
- The [callback function](#callback-function) specified during the SDK initialization is invoked under the following circustances:
	- After each successful refresh attempt.
	- After an initial failure to refresh an expired advertising token.
	- When identity has become invalid, for example, because the user has opted out.</br>NOTE: The callback is *not* invoked when identify is temporarily unavailable and the auto-refresh keeps failing. In this case, the SDK continues using the existing advertising token.
- A [disconnect()](#disconnect-void) call cancels the active timer. 


## API Reference

>IMPORTANT: All interactions with the UID2 SDK are done through the global `__uid2` object, which is a member of the `UID2` class. All of following APIs are members of the `UID2` class. 

- [constructor()](#constructor)
- [init()](#initopts-object-void)
- [getAdvertisingToken()](#getadvertisingtoken-string)
- [getAdvertisingTokenAsync()](#getadvertisingtokenasync-promise)
- [isLoginRequired()](#isloginrequired-boolean)
- [disconnect()](#disconnect-void)
- [abort()](#abort-void)

### constructor()

Constructs a UID2 object.

>TIP: Instead of calling this function, you can just use the global `__uid2` object. 

### init(opts: object): void

Initializes the SDK and establishes user identity for targeted advertising. 

Here's what you need to know about this function:

- You can call `init()` any time after the SDK has been loaded by the corresponding script tag, typically during page loading.
- Initialization calls require a [callback function](#callback-function) that is invoked after the SDK is initialized.
- When creating an instance for the UID2 lifecycle on the client, the `identity` property in the `init()` call refers to the `body` property of the response JSON object returned from a successful [GET /token/generate](../endpoints/get-token-generate.md) or [GET /token/refresh](../endpoints/get-token-refresh.md) call with the server-side generated identity.
- Since the SDK relies on [first-party cookies](#uid2-cookie-format) to store the passed UID2 identity information for the session, subsequent `init()` calls on different page loads may have the `identity` property empty.
- To tune specific behaviors, initialization calls may include optional configuration [parameters](#parameters).

The following is a template of an `init()` call with the the server-side generated identity included.

```html
<script>
 __uid2.init({
   callback : function (state) {...}, // Check advertising token and its status within the passed state and initiate targeted advertising. 
   identity : {...} // The `body` property value from the token/generate or token/refresh API response.
 });
</script>
```

For example:

```html
<script>
 __uid2.init({
   callback : onUid2IdentityUpdated,
   identity : {
        "advertising_token": "AgmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b/besPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM+ewMzXXM8G9j8Q=",
        "refresh_token": "Mr2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq/90PYmajV0IPrvo51Biqh7/M+JOuhfBY8KGUn//GsmZr9nf+jIWMUO4diOA92kCTF69JdP71Ooo+yF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA==",
        "identity_expires": 1633643601000,
        "refresh_from": 1633643001000,
        "refresh_expires": 1636322000000
    }
 });
</script>
```

The following is an example of an `init()` call that uses identity from a first-party cookie. You can put a block like this on any page that the user may visit after the identity has been established.

```html
<script>
 __uid2.init({
   callback : function (state) {...} // Check advertising token and its status within the passed state and initiate targeted advertising. 
 });
</script>
```

#### Parameters

The `opts` object supports the following properties.

| Property | Data Type | Attribute | Description | Default Value |
| :--- | :--- | :--- | :--- | :--- |
| `callback` | `function(object): void` | Required | The function the SDK is to invoke after validating the passed identity. For details, see [Callback Function](#callback-function).| N/A |
| `identity` | object | Optional | The `body` property value from a successful [GET /token/generate](../endpoints/get-token-generate.md) or [GET /token/refresh](../endpoints/get-token-refresh.md) call that has been run on the server to generate an identity. To use the identity from a [first-party cookie](#uid2-cookie-format), leave this property empty. | N/A |
| `baseUrl` | string | Optional | The custom base URL of the UID2 operator to use when invoking the [GET /token/refresh](../endpoints/get-token-refresh.md) endpoint, for example, `https://my.operator.com`.  | `https://prod.uidapi.com ` |
| `refreshRetryPeriod` | number | Optional | The number of seconds after which to retry refreshing tokens if intermittent errors occur. | 5 |
| `cookieDomain` | string | Optional | The domain name string to apply to the [UID2 cookie](#uid2-cookie-format). | `undefined` |
| `cookiePath` | string | Optional | The path string to apply to the [UID2 cookie](#uid2-cookie-format). | `/` |


#### Errors

The `init()` function can throw the following errors.

| Error | Description |
| :--- | :--- |
| `TypeError` | One of the following issues has occurred:<br/>- The fuction has already been called.<br/>- The `opts` value is not an object.<br/>- There is no callback function specified.<br/>-  The `callback` value is not a function. |
| `RangeError` | The refresh retry period is less than 1. |

#### Callback Function

The `function(object): void` callback function indicates that the initialization is complete. Subsequently, the SDK invokes the callback when it successfully refreshes the established identity. For details on when the callback function is called, see [Background Token Auto-Refresh](#background-token-auto-refresh).

The `object` parameter includes the following properties.

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `advertisingToken` | string | The token to be passed to SSPs for targeted advertising. If the token/identity is invalid or unavailable, the value is `undefined`. |
| `status` | `UID2.IdentityStatus` enum | The numeric value that indicates the status of the identity. For details, see [Identity Status Values](#identity-status-values). |
| `statusText` | string | Additional information pertaining to the identity status. |

#### Identity Status Values

The [callback function](#callback-function) returns the `status` field values as numbers from the `UID2.IdentityStatus` enum, which can be turned into the corresponding strings by calling `UID2.IdentityStatus[state.status]`. The following table lists the string values for the `status` enum.

>IMPORTANT: The following values are intended only to inform you of identity availability. Do not use them in conditional logic. 

| Status | Advertising Token Availability | Description |
| :--- | :--- | :--- |
| `ESTABLISHED` | Available | The identity is valid, was set from the passed value or the first-party cookie, and is now available for targeted advertising. |
| `REFRESHED` | Available | The identity was successfully refreshed by a call to the UID2 operator is now available for targeted advertising. |
| `EXPIRED` | Not available | No identity is available for targeted advertising, as the SDK failed to refresh the token. Since there is still a valid refresh token available, auto-refresh attempts will continue. |
| `REFRESH_EXPIRED` | Not available | No identity is available for targeted advertising, as the refresh token on the first-party cookie or the passed identity has expired.  |
| `NO_IDENTITY` | Not available | No identity is available for targeted advertising, as a first-party cookie was not set and no identity has been passed to the `init()` function.  |
| `INVALID` | Not available | No identity is available for targeted advertising, as the SDK failed to parse the first-party cookie or the passed identity. |
| `OPTOUT` | Not available | No identity is available for targeted advertising, as the user has opted out from refreshing identity. |

If the identity is not available, to determine the best course of action, use the [isLoginRequired()](#isloginrequired-boolean) function.

### getAdvertisingToken(): string

Gets the current advertising token. 

Be sure to call this function *after* calling  [init()](#initopts-object-void) and invoking the supplied callback, for example: 

```html
<script>
  let advertisingToken = __uid2.getAdvertisingToken();
</script>
```

The `getAdvertisingToken()` function allows you to get access to the advertising token from anywhere (not just from the initialization completion callback) and returns `undefined` in the following cases:

- The [callback function](#callback-function) has not been called yet, which means the SDK initialization is not complete.
- The SDK initialization is complete, but there is no valid identity to use.
- The SDK initialization is complete, but the auto-refresh has cleared the identity, for example, because the user has opted out.

If the identity is not available, to determine the best course of action, use the [isLoginRequired()](#isloginrequired-boolean) function.

### getAdvertisingTokenAsync(): Promise

Gets a `Promise` string for the current advertising token.

This function can be called before or after the [init()](#initopts-object-void) call. The returned promise is settled after the initialization is complete and the [callback function](#callback-function) is invoked, based on the availability of the advertising token:

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

>TIP: You can use this function to be notified of the completion of the UID2 SDK initialization from a component that may not be the one that called `init()`.

### isLoginRequired(): boolean

Specifies whether a UID2 login ([GET /token/generate](../endpoints/get-token-generate.md) call) is required. 

The function can also provide additional context for handling missing identities, as shown in [Workflow States and Transitions](#workflow-states-and-transitions).

```html
<script>
  __uid2.isLoginRequired();
</script>
```

#### Return Values

| Value | Description |
| :--- | :--- |
| `true` | The identity is not available, and the UID2 login is required. This value indicates any of the following:<br/>- The user has opted out.<br/>- The refresh token has expired.<br/>- A first-party cookie is not available and no server-generated identity has been supplied. |
| `false` | No login is required. This value indicates either of the following:<br/>- The identity is present and valid.<br/>- The identity has expired, and the token was not refreshed due to an intermittent error. The identity may be restored after a successful auto-refresh attempt. |
| `undefined` | The SDK initialization is not complete yet. |


### disconnect(): void

Clears the UID2 identity from the [first-party cookie](#uid2-cookie-format), thus closing the client's identity session and disconnecting the client lifecycle.

When an unauthenticated user is present, or a user wants to log out of targeted advertising on the publisher's site, make the following call:

```html
<script>
  __uid2.disconnect();
</script>
```

After this function is executed, the [getAdvertisingToken()](#getadvertisingtoken-string) function returns `undefined` and the [isLoginRequired()](#isloginrequired-boolean) function returns `true`.

### abort(): void
	
Terminates any background timers or requests. The UID2 object remains in an unspecified state and cannot be used anymore. 

This function is intended for use in advanced scenarios where you might want to replace the existing UID2 object with a new instance. For example, single-page applications may want to use this to clear the current UID2 object and construct or initialize a new one after receiving a new identity in the [GET /token/generate](../endpoints/get-token-generate.md) response from the server.

## UID2 Cookie Format

The SDK uses first-party cookies to store users' identities. 

### Properties

The following table lists the cookie properties.

| Properties | Default Value | Comments |
| :--- | :--- | :--- |
| `Name` | `__uid_2` | N/A |
| `Expiry` | N/A | The value is the refresh token expiration timestamp as specified by the operator in the [GET /token/generate](../endpoints/get-token-generate.md) or [GET /token/refresh](../endpoints/get-token-refresh.md) response. |
| `Path` | `/` | You can set a different path with the `cookiePath` [init() parameter](#parameters) during the SDK initialization.  |
| `Domain` | `undefined` | You can specify a different domain with the `cookieDomain` [init() parameter](#parameters) during the SDK initialization. |

### Contents Structure

The UID2 cookie contents are a URI-encoded string representation of a JSON object with the structure identical to that of the `body` property in a [GET /token/generate](../endpoints/get-token-generate.md) or [GET /token/refresh](../endpoints/get-token-refresh.md) response, with the exception of the `private` object. 

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
>IMPORTANT: The contents of the `private` object are explicitly unspecified and left for the SDK to interpret. Do not make any assumptions about the structure, semantics, or compatibility of this object. Any updates to the cookie must retain its structure.


