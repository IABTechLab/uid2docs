[UID2 API Documentation](../../README.md) > v1 > [SDKs](./README.md) > Client-Side Identity

# Client-Side Identity JavaScript SDK

Use this SDK to facilitate the process of establishing client identity using UID2 and retrieving advertising tokens. The following sections describe the [SDK workflow](#workflow-overview), provide the SDK [API reference](#api-reference), and explain the [UID2 cookie format](#uid2-cookie-format). For intended web integration scenarios, see [Publisher Integration Guide (Standard)](../guides/publisher-client-side.md).

## Implement the SDK Script

Implement the following SDK script on the pages where you want to use UID2 to manage identity or retrieve an advertising token for targeted advertising:

```html
<script src="https://integ.uidapi.com/static/js/uid2-sdk-0.0.1b.js" type="text/javascript"></script>
```

## Workflow Overview

The high-level client-side identity JS SDK workflow consists of the following steps:

1. [Initialize the SDK](#initopts-object-void) and specify a [callback function](#callback-function) to be called upon a successful completion of the step.
2. Wait for the SDK to invoke the callback function. The callback function indicates the identity availability:
	- If the identity is available, the [background token auto-refresh](#background-token-auto-refresh) is set up.
	- If not, the reason for its unavailability is specified.
4. Based on the [status](#identity-status-values) of the identity, the SDK does the following:
	- If the identity is valid, the SDK ensures the identity is available in a [first-party cookie](#uid2-cookie-format).
	- If the identity is invalid and cannot be refreshed (the `advertisingToken` value in the callback is `undefined`), SDK may clear the cookie (depending on the nature of the error).
5. Manage the identity based on its availability:
	- If the identity is available, use it to initiate requests for targeted advertising.
	- If not, either use untargeted advertising or redirect the user to the UID2 login with the consent form.

For intended web integration scenarios, see [Publisher Integration Guide (Standard)](../guides/publisher-client-side.md).

### Workflow States and Transitions

The following table outlines the four main states in which the SDK can be, based on the combination of values returned by two main functions, [getAdvertisingToken()](#getadvertisingtoken-string) and [isLoginRequired()](#isloginrequired-boolean).

| State | Advertising Token | Login Required | Description| Identity Status Value |
| :--- | :--- | :---| :---| :---|
| Initialization | `undefined`| `undefined`| Initial state until the callback is invoked. | N/A |
| Identity Is Available | available |`false` | A valid identity is available for targeted advertising because it has been successfully established or refreshed. |`ESTABLISHED` or `REFRESHED` | 
| Identity Is Temporarily Unavailable |`undefined` | `false`| The identity (advertising token) has expired, and automatic refresh failed. If the refresh token is still valid, the identity may be automatically refreshed, unless the user has opted out or the service is no longer available.| `EXPIRED` |
| Identity Is Not Available  | `undefined`| `false`| The identity is not available and cannot be refreshed. | `INVALID`, `NO_IDENTITY`, `REFERSH_EXPIRED`, or `OPTOUT` |

The following diagram illustrates the four states, including the respective identity [status values](#identity-status-values), and possible transitions between them. The SDK invokes the [callback function](#callback-function) on each transition.

![Client-Side Identity JavaScript SDK Workflow](./uid2-js-sdk-workflow.svg)


### Background Token Auto-Refresh

As part of the SDK [initialization](#initopts-object-void), a token auto-refresh for the identity is set up, which is triggered in the background by the timestamps on the identity or failed refresh attempts due intermittent errors.

Here's what you need to know about the token auto-refresh:

- Only one token refresh call can be active at a time. 
- The [callback function](#callback-function) specified during the SDK initialization is invoked after each auto-refresh attempt. 
- A [disconnect()](#disconnect-void) or [init()](#initopts-object-void) call cancels the active timer.
- An unsuccessful [GET /token/refresh](../endpoints/get-token-refresh.md) response, for example, due to the user's optout or the refresh token expiration, suspends  the background auto-refresh process and requires a new login ([isLoginRequired()](#isloginrequired-boolean) returns `true`). 


## API Reference

>NOTE: All interactions with the UID2 SDK are done through the global `__uid2` object and UID2 class.

- [constructor()](#constructor)
- [init()](#initopts-object-void)
- [getAdvertisingToken()](#getadvertisingtoken-string)
- [isLoginRequired()](#isloginrequired-boolean)
- [disconnect()](#disconnect-void)
- [abort()](#abort-void)

### constructor()
Constructs a UID2 object.

### init(opts: object): void

Initializes the SDK and establishes user identity for targeted advertising. 

Here's what you need to know about this function:

- Initialization calls require a [callback function](#callback-function) that is invoked after the SDK is initialized and after each token auto-refresh attempt.
- When creating an instance for the UID2 lifecycle on the client, the `identity` property in the `init()` call includes response payload body from a successful [GET /token/generate](../endpoints/get-token-generate.md) or [GET /token/refresh](../endpoints/get-token-refresh.md) call with the server-side generated identity.
- Since the SDK relies on [first-party cookies](#uid2-cookie-format) to store the passed UID2 identity information for the session, subsequent `init()` calls may have the `identity` property empty.
- To tune specific behaviors, initialization calls may include optional configuration [parameters](#parameters).

The following is an example of an `init()` call with the the server-side generated identity included.

```html
<script>
 __uid2.init({
   callback : function (state) { <Check advertising token and status within the passed state and initiate targeted advertising> },
   identity : <Response payload body from the token generate or refresh API calls>
 });
</script>
```

The following is an example of an `init()` call that uses identity from a first-party cookie. You can put a block like this on any page that the user may visit after the identity has been established.

```html
<script>
 __uid2.init({
   callback : function (state) { <Check advertising token and status within the passed state and initiate targeted advertising> }
 });
</script>
```

#### Parameters

The `opts` object includes the following properties.

| Property | Type | Attribute | Description | Default Value |
| :--- | :--- | :--- | :--- | :--- |
| `callback` | `function(object): void` | Required | The function the SDK is to invoke after validating the passed identity. For details, see [Callback Function](#callback-function).| N/A |
| `identity` | object | Optional | The response body of a successful [GET /token/generate](../endpoints/get-token-generate.md) or [GET /token/refresh](../endpoints/get-token-refresh.md) call that has been run on the server to generate an identity. To use the identity from a [first-party cookie](#uid2-cookie-format), leave this property empty. | N/A |
| `baseUrl` | string | Optional | The custom base URL of the UID2 operator to use when invoking the [GET /token/refresh](../endpoints/get-token-refresh.md) endpoint, for example, `https://my.operator.com`.  | `https://prod.uidapi.com ` |
| `refreshRetryPeriod` | number | Optional | The number of seconds after which to retry refreshing tokens if intermittent errors occur. | 5 |
| `cookieDomain` | string | Optional | The domain name string to apply to the [UID2 cookie](#uid2-cookie-format). | `undefined` |
| `cookiePath` | string | Optional | The path string to apply to the [UID2 cookie](#uid2-cookie-format). | `/` |


#### Errors

The `init()` function can return the following errors.

| Error | Description |
| :--- | :--- |
| `TypeError` | One of the following issues has occurred:<br/>- The fuction has already been called.<br/>- The `opts` value is not an object.<br/>- There is no callback function specified.<br/>-  The `callback` value is not a function. |
| `RangeError` | The refresh retry period is less than 1. |

#### Callback Function

The `function(object): void` callback function indicates that the initialization is complete. Subsequently, the SDK invokes the callback when it performs a background refresh, which results in the identity being updated or cleared. If the identity has expired, but the refresh token is still valid, the identity is automatically refreshed, unless the user has opted out or the service is not available.

The `object` parameter includes the following properties.

| Property | Type | Description |
| :--- | :--- | :--- |
| `advertisingToken` | string | The token to be passed to SSPs for targeted advertising. If the token/identity is invalid or unavailable, the value is `undefined`. |
| `status` | string | The status of the identity. For details, see [Identity Status Values](#identity-status-values). |
| `statusText` | string | The `status` value description. |

#### Identity Status Values

The following table lists all possible `status` field values and their `statusText` descriptions that the [callback function](#callback-function) can return.

>IMPORTANT: The following values are intended only to inform you of identity availability. Do not use them in conditional logic. 

| Status | Identity Availability | Description |
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

- The [callback function](#callback-function) has not been called yet, which means the SDK initialization is not complete yet.
- The SDK initialization is complete, but there is no valid identity to use.
- The SDK initialization is complete, but the auto-refresh has cleared the identity, for example, because the user has opted out.

If the identity is not available, to determine the best course of action, use the [isLoginRequired()](#isloginrequired-boolean) function.

### isLoginRequired(): boolean

Specifies whether a UID2 login ([GET /token/generate](../endpoints/get-token-generate.md) call) is required. 

Use this function to handle missing identities, as shown in [Workflow States and Transitions](#workflow-states-and-transitions).

```html
<script>
  __uid2.isLoginRequired();
</script>
```

#### Return Values

| Value | Description |
| :--- | :--- |
| `true` | The identity is not available. The UID2 login is required because the user has opted out or the refresh token has expired. |
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

The UID2 cookie contents are a URI-encoded string representation of a JSON object with the structure identical to that of the [GET /token/generate](../endpoints/get-token-generate.md) or [GET /token/refresh](../endpoints/get-token-refresh.md) response body, with the exception of the `private` object. 

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


