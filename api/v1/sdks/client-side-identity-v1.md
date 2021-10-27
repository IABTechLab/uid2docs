[UID2 API Documentation](../../README.md) > v1 > [SDKs](./README.md) > Client-Side Identity

# Client-Side Identity JavaScript SDK

Use the client-side identity JS SDK to simplify your implementation, namely, to establish and de-establish identity and retrieve advertising tokens.

The following sections describe the [SDK workflow](#workflow-overview), [commonly performed tasks](#common-workflow-tasks), and provide the SDK [API Reference](#api-reference).

## Implement the SDK Script

Implement the following SDK script on the pages where you want to use UID2 to manage identity or retrieve an advertising token for targeted advertising:

```html
<script src="https://integ.uidapi.com/static/js/uid2-sdk-0.0.1b.js" type="text/javascript"></script>
```

## Workflow Overview

The high-level client-side identity JS SDK workflow consits of the following steps:

1. [Initialize the SDK](#initialize-the-sdk-and-establish-client-identity) by specifying a callback to be called upon a successful completion of the step and either explicitly providing an identity to use or allowing the SDK to look for an identity in the first-party cookie.
2. Wait for the SDK to invoke the specified [callback function](#callback-function), which indicates whether the identity is available and if not, the reason for why it is not available.
3. Based on the [status](#identity-status-values) of the identity, the SDK does the following:
	- If the identity is valid, the SDK ensures the identity is available in the first-party cookie.
	- If the identity is invalid and cannot be refreshed (the `advertisingToken` value in the callback is `undefined`), SDK may clear the cookie (depending on the nature of the error).
3. Manage the identity based on its availability:
	- If the identity is available, use it to initiate requests for targeted advertising.
	- If not, either use untargeted advertising or redirect the user to the UID2 login with the consent form.

### Workflow States and Transitions

The following table outlines the four main states in which the SDK can be, based on the combination of values returned by two main functions, [getAdvertisingToken()](#getadvertisingtoken-string) and [isLoginRequired()](#isloginrequired-boolean).

| State | Advertising Token | Login Required | Description| Identity Status |
| :--- | :--- | :---| :---| :---|
| Initialization | `undefined`| `undefined`| Initial state until the callback is invoked. | N/A |
| Identity Is Avaliable | available |`false` | An valid identity is available for targeted advertising because it has been successfully established or refreshed. |`ESTABLISHED` or `REFRESHED` | 
| Identity Is Temporarily Unavailable |`undefined` | `false`| The identity (advertising token) has expired and automatic refresh failed. If the refresh token is still valid, the identity may be automatically refreshed, unless the user has opted out or the service is no longer available.| `EXPIRED` |
| Identity Is Not Available  | `undefined`| `false`| The identity is not available and cannot be refreshed. | `INVALID`, `NO_IDENTITY`, `REFERSH_EXPIRED`, or `OPTOUT` |

The following diagram illustrates the four states, including the respective identity [status](#identity-status-values), and possible transitions between them. The SDK invokes the [callback function](#callback-function) on each transition.

![Client-Side Identity JavaScript SDK Workflow](./uid2-js-sdk-workflow.svg)

## Common Workflow Tasks

The following sections provide examples for the commonly used tasks:

- [Initialize the SDK and establish client identity](#initialize-the-sdk-and-establish-client-identity)
- [Retrieve client identity/advertising token](#retrieve-client-identity)
- [Close identity session and log out](#close-identity-session-and-log-out)

For all available tasks and functions, see [API Reference](#api-reference).


### Initialize the SDK and Establish Client Identity

To establish identity and trigger targeted advertising, complete the following steps:

1. If you want to use the identity from a first-party cookie, skip to step 3. Otherwise, generate an identity by making a [GET /token/generate](../endpoints/get-token-generate.md) or [GET /token/refresh](../endpoints/get-token-refresh.md) call.
2. In the [init()](#initopts-object-void) call, send the response payload from the call in step 1 with the server-side generated identity or leave the `identity` property empty.
3. Specify the [callback function](#callback-function) to invoke after the SDK is initialized.
4. (Optional) Set additional configuration parameters to tune specific behaviours. For details, see [init() parameters](#parameters).

To invoke the UID2 SDK and establish client identity, make a [init()](#initopts-object-void) call, using the following example:

```html
__uid2.init({
  identity : <Response payload from the token generate or refresh API calls>,
  callback : function (advertisingToken, reason) { <Check advertising token and initiate targeted advertising> },
  <additional optional configuration parameters>
});
```

### Retrieve Client Identity

To get the currently available advertising token, make a [getAdvertisingToken()](#getadvertisingtoken-string) call after calling  [init()](#initopts-object-void) and invoking the supplied callback. 

The following is a call example:

```html
<script>
  let advertisingToken = __uid2.getAdvertisingToken();
</script>
```

The function allows you to get access to the advertising token from anywhere (not just from the initialization completion callback). 


### Close Identity Session and Log Out

When an unauthenticated user is present, or a user wishes to log out of targeted advertising on the publisher's site, make a [disconnect()](#disconnect-void) call, using the following example:

```html
<script>
  __uid2.disconnect();
</script>
```
This call clears the first-party cookie containing the UID2 identity, thus closing the client's identity session and disconnecting the client lifecycle.


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

Initializes the SDK and establishes user identity for targeted advertising. For steps and examples, see [Initialize the SDK and establish client identity](#initialize-the-sdk-and-establish-client-identity).

#### Parameters

The `opts` object includes the following properties.

| Property | Type | Attribute | Description | Default Value |
| :--- | :--- | :--- | :--- | :--- |
| `identity` | object | Optional | The response body of a successful [GET /token/generate](../endpoints/get-token-generate.md) or [GET /token/refresh](../endpoints/get-token-refresh.md) call that has been run on the server to generate an identity. To use the identity from a first-party cookie, leave this property empty. | N/A |
| `callback` | `function(object): void` | Required | The function the SDK is to invoke after validating the passed identity. For details, see [Callback Function](#callback-function).| N/A |
| `baseUrl` | string | Optional | The custom base URL of the UID2 operator to use when invoking the [GET /token/refresh](../endpoints/get-token-refresh.md) endpoint, for example, `https://my.operator.com`.  | `https://prod.uidapi.com ` |
| `refreshRetryPeriod` | number | Optional | The number of seconds after which to retry refreshing tokens if intermittent errors occur. | 5 |
| `cookieDomain` | string | Optional | The domain name string to apply to the UID2 cookie. | `undefined` |
| `cookiePath` | string | Optional | The path string to apply to the UID2 cookie. | `/` |

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

>IMPORTANT: The following values are intended only to inform you of identity availability. Do not use them in conditional logic. If identity is not available, to determine the best course of action, use the [isLoginRequired()](#isloginrequired-boolean) function.

| Status | Identity Availability | Description |
| :--- | :--- | :--- |
| `ESTABLISHED` | Available | The identity is valid, was set from the passed value or the first-party cookie, and is now available for targeted advertising. |
| `REFRESHED` | Available | The identity was successfully refreshed by a call to the UID2 operator is now available for targeted advertising. |
| `EXPIRED` | Not available | No identity is available for targeted advertising, as the SDK failed to refresh the token. Since there is still a valid refresh token available, auto-refresh attempts will continue. |
| `REFRESH_EXPIRED` | Not available | No identity is available for targeted advertising, as the refresh token on the first-party cookie or the passed identity has expired.  |
| `NO_IDENTITY` | Not available | No identity is available for targeted advertising, as a first-party cookie was not set and no identity has been passed to init()  |
| `INVALID` | Not available | No identity is available for targeted advertising, as the SDK failed to parse the first-party cookie the passed identity. |
| `OPTOUT` | Not available | No identity is available for targeted advertising, as the user has opted out from refreshing identity. |

### getAdvertisingToken(): string

Gets the current advertising token. For usage example, see [Retrieve client identity/advertising token](#retrieve-client-identity).

Returns `undefined` in the following cases:

- The SDK initialization has not completed yet, in other words, the [callback function](#callback-function) has not been called yet.
- The SDK initialization is complete, but there is no valid identity to use.
- The SDK initialization is complete, but the auto-refresh has cleared the identity, for example, because the user has opted out.

### isLoginRequired(): boolean

Specifies whether UID2 login [GET /token/generate](../endpoints/get-token-generate.md) is required. 

#### Return Values

| Value | Description |
| :--- | :--- |
| `true` | Login is required. |
| `false` | No login is required. |
| `undefined` | The SDK initialization is not complete yet. |

#### Missing Identity Return Values

After the [callback function](#callback-function) is invoked, the `isLoginRequired()` function can be also used to determine how to handle the missing identity.

| Value | Description |
| :--- | :--- |
| `true` | The identity is not available. The UID2 login is required because the user has opted out or the refresh token has expired. |
| `false` | Indicates either of the following:<br/>- The identity is present and valid.<br/>- The identity has expired, and the token was not refreshed due to an intermittent error. The identity may be restored after a successful auto-refresh attempt. |

### disconnect(): void

Indicates that the user identity stored in the first-party cookie is to be cleared. For usage example, see [Close identity session and log out](#close-identity-session-and-log-out).

After this function is executed, the [getAdvertisingToken()](#getadvertisingtoken-string) function returns `undefined` and the [isLoginRequired()](#isloginrequired-boolean) function returns `true`.

### abort(): void
	
Terminates any background timers or requests. The UID2 object remains in an unspecified state and cannot be used anymore. 

