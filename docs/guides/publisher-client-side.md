---
title: Client-Side JavaScript SDK Integration
sidebar_label: Client-Side JavaScript SDK
pagination_label: Client-Side JavaScript SDK Integration
description: Information for publishers about how to generate identity tokens using UID2 for the RTB bid stream, while integrating directly with UID2 rather than UID2-enabled single-sign-on or identity providers. 
hide_table_of_contents: false
sidebar_position: 02
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# UID2 SDK for JavaScript Integration Guide

This guide is intended for publishers with web assets who want to generate identity tokens using UID2 for the RTB bid stream, while integrating directly with UID2 rather than UID2-enabled single-sign-on or identity providers.

- For the technical details about the SDK, see [UID2 SDK for JavaScript Reference Guide](../sdks/client-side-identity.md).
- For an example application, see the UID2 Google ESP with SDK v3 example: [Code and docs](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-esp-integration/with_sdk_v3) and [running site](https://esp-jssdk-integ.uidapi.com/).

<!-- It includes the following sections:

- [Introduction](#introduction)
- [Integration Steps ](#integration-steps)
  - [Establish Identity: User Login](#establish-identity-user-login)
  - [Bid Using UID2 Tokens](#bid-using-uid2-tokens)
  - [Refresh Tokens](#refresh-tokens)
  - [Clear Identity: User Logout](#clear-identity-user-logout)
- [FAQs](#faqs) -->

## Introduction

This guide outlines the [basic steps](#integration-steps) that you need to consider if you are building an integration without using an SDK. For example, you need to decide how to implement user login and logout, how to manage UID2 identity information and use it for targeted advertising, and how to refresh tokens, deal with missing identities, and handle user opt-outs. See also [FAQs](#faqs).

To facilitate the process of establishing client identity using UID2 and retrieving advertising tokens, the web integration steps provided in this guide rely on the UID2 SDK for JavaScript. Here's an [example application](https://example-jssdk-integ.uidapi.com/) that illustrates the integration steps described in this guide and the usage of the SDK (currently only for email addresses). For the application documentation, see [UID2 SDK Integration Example](https://github.com/IABTechLab/uid2-examples/blob/main/publisher/standard/README.md).

:::warning
The SDK currently stores tokens in first-party cookies. Since implementation details like this may change in the future, to avoid potential issues, be sure to rely on the [Client-Side JavaScript SDK](../sdks/client-side-identity.md#api-reference) for your identity management.
:::

For integration scenarios for publishers that do not use the UID2 SDK for JavaScript, see [Publisher Integration Guide, Server-Only](custom-publisher-integration.md). 

:::note
If you are using Google Ad Manager and want to use the secure signals feature, first follow the steps in this guide and then follow the additional steps in the [Google Ad Manager Secure Signals Integration Guide](google-ss-integration.md).
:::

## Integration Steps 

The following diagram outlines the steps required for a user to establish a UID2 token with a publisher and how the UID2 token integrates with the RTB bid stream.

![Publisher Flow](https://mermaid.ink/svg/eyJjb2RlIjoiICBzZXF1ZW5jZURpYWdyYW1cbiAgICBwYXJ0aWNpcGFudCBVIGFzIFVzZXJcbiAgICBwYXJ0aWNpcGFudCBQIGFzIFB1Ymxpc2hlclxuICAgIHBhcnRpY2lwYW50IFVJRDIgYXMgVUlEMiBTZXJ2aWNlXG4gICAgcGFydGljaXBhbnQgU1NQXG4gICAgTm90ZSBvdmVyIFUsU1NQOiAxLiBFc3RhYmxpc2ggSWRlbnRpdHlcbiAgICBVLT4-K1A6IDEtYS4gVGhlIHVzZXIgdmlzaXRzIGEgcHVibGlzaGVyIGFzc2V0LlxuICAgIFAtPj4tVTogMS1iLiBUaGUgcHVibGlzaGVyIGV4cGxhaW5zIHRoZSB2YWx1ZSBleGNoYW5nZSBvZiB0aGUgb3BlbiBpbnRlcm5ldCBhbmQgcmVxdWVzdHMgYSBsb2dpbi5cbiAgICBhY3RpdmF0ZSBVXG4gICAgVS0-PlA6IDEtYy4gVGhlIHVzZXIgYXV0aGVudGljYXRlcyBhbmQgYXV0aG9yaXplcyB0aGUgY3JlYXRpb24gb2YgYSBVSUQyLlxuICAgIGRlYWN0aXZhdGUgVVxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VUlEMjogMS1kLiBUaGUgcHVibGlzaGVyIHNlbmRzIHRoZSB1c2VyJ3MgUElJIHRvIHRoZSB0b2tlbiBnZW5lcmF0aW9uIHNlcnZpY2UuXG4gICAgZGVhY3RpdmF0ZSBQXG4gICAgYWN0aXZhdGUgVUlEMlxuICAgIFVJRDItPj5QOiAxLWUuIFRoZSB0b2tlbiBnZW5lcmF0aW9uIHNlcnZpY2UgcmV0dXJucyBVSUQyIHRva2Vucy5cbiAgICBkZWFjdGl2YXRlIFVJRDJcbiAgICBhY3RpdmF0ZSBQXG4gICAgUC0-PlU6IDEtZi4gVGhlIHB1Ymxpc2hlciBzZXRzIGEgVUlEMiBmb3IgdGhlIHVzZXIuXG4gICAgZGVhY3RpdmF0ZSBQXG4gICAgTm90ZSBvdmVyIFUsU1NQOiAyLiBCaWQgVXNpbmcgVUlEMiBUb2tlbnNcbiAgXG4gICAgUC0-PlNTUDogMi1hLiBUaGUgcHVibGlzaGVyIGNhbGxzIHRoZSBTU1AgZm9yIGFkcyB1c2luZyB0aGUgVUlEMiB0b2tlbi5cbiAgICBhY3RpdmF0ZSBTU1BcbiAgICBTU1AtPj5QOiAyLWIuIFRoZSBTU1AgcmV0dXJucyBhZHMgdG8gZGlzcGxheS5cbiAgICBkZWFjdGl2YXRlIFNTUFxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VTogMi1jLiBUaGUgcHVibGlzaGVyIGRpc3BsYXlzIHRoZSBhZHMgdG8gdGhlIHVzZXIuXG4gICAgZGVhY3RpdmF0ZSBQXG5cbiAgICBOb3RlIG92ZXIgVSxTU1A6IDMuIFJlZnJlc2ggVG9rZW5zXG4gICAgVS0-PlVJRDI6IDMtYS4gVGhlIFNESyBzZW5kcyBhIHJlcXVlc3QgdG8gcmVmcmVzaCB0aGUgVUlEMiB1c2luZyB0aGUgcmVmcmVzaCB0b2tlbi5cbiAgICBhY3RpdmF0ZSBVSUQyXG4gICAgVUlEMi0-PlU6IDMtYi4gSWYgYSB1c2VyIGhhc24ndCBvcHRlZCBvdXQsIHRoZSByZWZyZXNoIHRva2VuIHNlcnZpY2UgcmV0dXJucyBuZXcgaWRlbnRpdHkgdG9rZW5zLlxuICAgIGRlYWN0aXZhdGUgVUlEMlxuICAgIE5vdGUgb3ZlciBVLFNTUDogNC4gVXNlciBMb2dvdXRcbiAgICBVLT4-UDogNC1hLiBUaGUgdXNlciBsb2dzIG91dCBmcm9tIGEgcHVibGlzaGVyIGFzc2V0LlxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VTogNC1iLiBUaGUgdXNlcidzIGlkZW50aXR5IGNsZWFycy5cbiAgICBkZWFjdGl2YXRlIFAiLCJtZXJtYWlkIjp7InRoZW1lIjoiZm9yZXN0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)

The following sections provide additional details for each step in the diagram:
 
 1. [Establish identity: user login](#establish-identity-user-login)
 2. [Bid using UID2 tokens](#bid-using-uid2-tokens)
 3. [Refresh tokens](#refresh-tokens)
 4. [Clear Identity: user logout](#clear-identity-user-logout)

### Establish Identity: User Login


After authentication in step 1-c, which forces the user to accept the rules of engagement and allows the publisher to validate their email address or phone number, a UID2 token must be generated on the server side. The following table details the token generation steps.

| Step | Endpoint/SDK | Description |
| :--- | :--- | :--- |
| 1-d | [POST /token/generate](../endpoints/post-token-generate.md) | After the user authenticates and authorizes the creation of a UID2, use the [POST /token/generate](../endpoints/post-token-generate.md) endpoint to generate a UID2 token using the provided normalized email address or phone number of the user. |
| 1-e | [POST /token/generate](../endpoints/post-token-generate.md) | Return a UID2 token generated from the user's email address, phone number, or the respective hash. |
| 1-f | UID2 SDK for JavaScript | Send the returned UID2 token from step 1-e to the SDK in the `identity` property of its [init() function](../sdks/client-side-identity.md#initopts-object-void). |
| 1-g | UID2 SDK for JavaScript | Provide a callback function to the SDK which will receive identity updates and use them to initiate targeted advertising. |

<Tabs>
<TabItem value='js' label='JavaScript'>

```js
  window.__uid2 = window.__uid2 || {};
  window.__uid2.callbacks = window.__uid2.callbacks || [];

  // Step 1-f
  window.__uid2.callbacks.push((eventType, payload) => {
    if (eventType === 'SdkLoaded') {
      __uid2.init({
        identity : {
          "advertising_token": "AgmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b/besPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM+ewMzXXM8G9j8Q=",
          "refresh_token": "Mr2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq/90PYmajV0IPrvo51Biqh7/M+JOuhfBY8KGUn//GsmZr9nf+jIWMUO4diOA92kCTF69JdP71Ooo+yF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA==",
          "identity_expires": 1633643601000,
          "refresh_from": 1633643001000,
          "refresh_expires": 1636322000000,
          "refresh_response_key":"dYNTB20edyHJU9mZv11e3OBDlLTlS5Vb97iQVumc7b/8QY/DDxr6FrRfEB/D",
        }
      });
    }
  });

  // Step 1-g
  window.__uid2.callbacks.push((eventType, payload) => {
    if (eventType !== 'SdkLoaded') {
      if (payload.identity) {
        const advertisingToken = payload.identity.advertising_token;
        // Pass advertising_token to your advertising system to use
      } else {
        // No identity is available for targeted advertising - trigger a login flow if you want to use UID2 for targeted advertising
      }
    }
  });
```

</TabItem>
<TabItem value='ts' label='TypeScript'>

```tsx
  import { EventType, Uid2CallbackPayload } from "./uid2CallbackManager";

  window.__uid2 = window.__uid2 || {};
  window.__uid2.callbacks = window.__uid2.callbacks || [];

  // Step 1-f
  window.__uid2.callbacks.push((eventType: EventType, payload: Uid2CallbackPayload) => {
    if (eventType === 'SdkLoaded') {
      __uid2.init({
        identity : {
          "advertising_token": "AgmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b/besPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM+ewMzXXM8G9j8Q=",
          "refresh_token": "Mr2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq/90PYmajV0IPrvo51Biqh7/M+JOuhfBY8KGUn//GsmZr9nf+jIWMUO4diOA92kCTF69JdP71Ooo+yF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA==",
          "identity_expires": 1633643601000,
          "refresh_from": 1633643001000,
          "refresh_expires": 1636322000000,
          "refresh_response_key":"dYNTB20edyHJU9mZv11e3OBDlLTlS5Vb97iQVumc7b/8QY/DDxr6FrRfEB/D",
        }
      });
    }
  });

  // Step 1-g
  window.__uid2.callbacks.push((eventType: EventType, payload: Uid2CallbackPayload) => {
    if (eventType !== 'SdkLoaded') {
      if (payload.identity) {
        const advertisingToken = payload.identity.advertising_token;
        // Pass advertising_token to your advertising system to use
      } else {
        // No identity is available for targeted advertising - trigger a login flow if you want to use UID2 for targeted advertising
      }
    }
  });
```

</TabItem>
</Tabs>

The SDK invokes the specified [callback function](../sdks/client-side-identity.md#callback-function) (which indicates the identity availability) and makes the established identity available client-side for bidding. 

:::tip
Depending on the structure of your code, it might be convenient to combine the callbacks for steps 1-f and 1-g into a single callback function.
:::

### Bid Using UID2 Tokens

Based on the status and availability of a valid identity, the SDK sets up the background token auto-refresh, stores identity information in [local storage or a first-party cookie](../sdks/client-side-identity.md#uid2-storage-format), and uses it to initiate requests for targeted advertising.

| Step | Endpoint/SDK | Description |
| :--- | :--- | :--- |
| 2-a | UID2 SDK for JavaScript | Get the current user's advertising token by using the [getAdvertisingToken() function](../sdks/client-side-identity.md#getadvertisingtoken-string) as shown below. |

>NOTE: For an example of what a UID2 token might look like in the bid stream, when it's sent from an SSP to a DSP, see [What does a UID2 token look like in the bid stream?](../getting-started/gs-faqs.md#what-does-a-uid2-token-look-like-in-the-bid-stream)

```html
<script>
  let advertisingToken = __uid2.getAdvertisingToken();
</script>
```

:::info
You need to consider how you pass the returned advertising token to SSPs.
:::

:::tip
Instead of calling `__uid2.getAdvertisingToken()`, you can use the `advertising_token` property of the identity passed to the callback you set up for step 1-g. The callback will be called every time the identity changes.
:::

### Refresh Tokens

As part of its initialization, the SDK sets up a [token auto-refresh](../sdks/client-side-identity.md#background-token-auto-refresh) for the identity, which is triggered in the background by the timestamps on the identity or failed refresh attempts due intermittent errors.

| Step | Endpoint/SDK | Description |
| :--- | :--- | :--- |
| 3-a | [UID2 SDK for JavaScript](../sdks/client-side-identity.md)  | The SDK automatically refreshes UID2 tokens in the background. No manual action is required. |
| 3-b | [UID2 SDK for JavaScript](../sdks/client-side-identity.md)  | If the user hasn't opted out, the [POST /token/refresh](../endpoints/post-token-refresh.md) automatically returns new identity tokens. |


### Clear Identity: User Logout

The client lifecycle is complete when the user decides to log out from the publisher's site (not UID2). This closes the client's identity session and clears the first-party cookie information.

| Step | Endpoint/SDK | Description |
| :--- | :--- | :--- |
| 4-a | N/A | The user logs out from the publisher's asset. |
| 4-b | [UID2 SDK for JavaScript](../sdks/client-side-identity.md) | Clear the UID2 identity from the first-party cookie and disconnect the client lifecycle by using the [disconnect() function](../sdks/client-side-identity.md#disconnect-void) as shown below.|


```html
<script>
  __uid2.disconnect();
</script>
```

## FAQs

For a list of frequently asked questions for the publisher audience, see [FAQs for Publishers](../getting-started/gs-faqs.md#faqs-for-publishers).

For a full list, see [Frequently Asked Questions](../getting-started/gs-faqs.md).
