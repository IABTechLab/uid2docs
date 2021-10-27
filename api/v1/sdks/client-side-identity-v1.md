[UID2 API Documentation](../../README.md) > v1 > [SDKs](./README.md) > Client-Side Identity

# Client-Side Identity JavaScript SDK

Use the client-side JS SDK to simplify your implementation, namely, to establish and de-establish identity and retrieve advertising tokens.

## Workflow Overview

![Client-Side Identity JavaScript SDK Workflow](./uid2-js-sdk-workflow.svg)

## Initialize the SDK

To establish identity and trigger targeted advertising, complete the following steps:

1. If you want to use the identity from a first-party cookie, skip to step 3. Otherwise, generate an identity by making a [GET /token/generate](../endpoints/get-token-generate.md) or [GET /token/refresh](../endpoints/get-token-refresh.md) call.
2. In the initialization call, send the response payload from the call in step 1 with the server-side generated identity or leave the `identity` property empty.
3. Specify the callback to invoke when the SDK is initialized.
4. (Optional) Set additional configuration parameters to tune specific behaviours. For details, see TBD XREF.

The following is an example of how to invoke the UID2 SDK:

```html
__uid2.init({
  identity : <Response body from the token generate or refresh API calls>,
  callback : function (advertisingToken, reason) { <Check advertising token and initiate targeted advertising> },
  <additional optional configuration parameters>
});
```

| Property | Description |
| :--- | :--- |
| `identity` | The response body of a successful [GET /token/generate](../endpoints/get-token-generate.md) or [GET /token/refresh](../endpoints/get-token-refresh.md) call that has been run on the server to generate an identity. To use the identity from a first-party cookie, leave this property empty.<br/>If the identity has expired, and the refresh token is still valid, the identity is automatically refreshed, unless the user has opted out or the service is not available. |
| `callback` | The function the SDK is to invoke after validating the passed identity. If there is no identity available, the callback returns the `advertisingToken` value undefined and provides the explanation, for example, "opt-out", in the `reason` parameter. |

## Get the Advertizing Token
TBD 

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

The `function(object): void` callback function indicates that the initialisation is complete. Subsequently, the SDK invokes the callback when it performs a background refresh, which results in the identity being updated or cleared. If the identity has expired, but the refresh token is still valid, the identity is automatically refreshed, unless the user has opted out or the service is not available.

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

Gets the current advertising token. 

Returns `undefined` in the following cases:

- The SDK initialisation has not completed yet, in other words, the [callback function](#callback-function) has not been called yet.
- The SDK initialisation is complete, but there is no valid identity to use.
- The SDK initialisation is complete, but the auto-refresh has cleared the identity, for example, because the user has opted out.

### isLoginRequired(): boolean

Specifies whether UID2 login [GET /token/generate](../endpoints/get-token-generate.md) is required. 

#### Return Values

| Value | Description |
| :--- | :--- |
| `true` | Login is required. |
| `false` | No login is required. |
| `undefined` | The SDK initialization is not complete yet. |

#### Handling Missing Identity Return Values

After the [callback function](#callback-function) is invoked, the `isLoginRequired()` function can be also used to determine how to handle the missing identity.

| Value | Description |
| :--- | :--- |
| `true` | The identity is not available. The UID2 login is required because the user has opted out or the refresh token has expired. |
| `false` | Indicates either of the following:<br/>- The identity is present and valid.<br/>- The identity has expired, and the token was not refreshed due to an intermittent error. The identity may be restored after a successful auto-refresh attempt. |

### disconnect(): void

Indicates that the user identity stored in the first-party cookie is to be cleared. 

After this function is executed, the [getAdvertisingToken()](#getadvertisingtoken-string) function returns `undefined` and the [isLoginRequired()](#isloginrequired-boolean) function returns `true`.

### abort(): void
	
Terminates any background timers or requests. The UID2 object remains in an unspecified state and cannot be used anymore. 



## Implement the SDK Script

Implement the following SDK script on the pages you'll use UID2 to manage identity or retrieve an advertising token for real-time bidding (RTB):

```html
<script src="https://integ.uidapi.com/static/js/uid2-sdk-0.0.1a.js" type="text/javascript"></script>
```

## Client-Side SDK Functions

The client-side SDKs provides several scripts to perform the following functions.

### Open Client Lifecycle and Establish Client Identity

Implement the following script when you would like to create an instance for the UID2 lifecycle on the client. Send the identity payload response from [GET /token/generate](../endpoints/get-token-generate.md) the first time the script runs for a given client.

```html
<script>
  __uid2.init({
    identity : <Response from the generate token api>
  });
</script>
```

### Retrieve Client Identity for Real-Time Bidding

Implement the following script when you would like to retrieve a client's `advertising_token`, or if opted out, an empty string.

```html
<script>
  __uid2.getAdvertisingToken();
</script>
```

### Close Identity Session and Disconnect Client Lifecycle

When an unauthenticated user is present, or a user logs out, implement the following script to close a client's identity session and disconnect the client lifecycle.

```html
<script>
  __uid2.disconnect();
</script>
```
