---
title: Client-Side JavaScript SDK Integration
sidebar_label: Client-Side JavaScript SDK
pagination_label: Client-Side JavaScript SDK Integration
description: パブリッシャー向けの、UID2 対応のシングルサインオンや ID プロバイダーではなく、UID2 と直接インテグレーションしながら、RTB ビッドストリーム用に UID2 を使用して ID トークンを生成する方法。
hide_table_of_contents: false
sidebar_position: 02
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# UID2 SDK for JavaScript Integration Guide

This guide is intended for publishers with web assets who want to generate identity tokens using UID2 for the RTB bid stream, while integrating directly with UID2 rather than UID2-enabled single-sign-on or identity providers.

- For technical details about the SDK, see [UID2 SDK for JavaScript Reference Guide](../sdks/client-side-identity.md).
- For an example application, see the UID2 Google ESP with SDK v3 example:
  - Code and docs: [UID2 SDK ESP Integration Example](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-esp-integration/with_sdk_v3)
  - Running site: [Client-Side UID2 SDK Integration Example](https://esp-jssdk-integ.uidapi.com/)

<!-- It includes the following sections:

- [Introduction](#introduction)
- [Integration Steps ](#integration-steps)
  - [Establish Identity: User Login](#establish-identity-user-login)
  - [Bid Using UID2 Tokens](#bid-using-uid2-tokens)
  - [Refresh Tokens](#refresh-tokens)
  - [Clear Identity: User Logout](#clear-identity-user-logout)
- [FAQs](#faqs) -->

## Introduction

This guide outlines the basic steps that you need to consider if you are building an integration without using an SDK. For example, you need to decide how to implement user login and logout, how to manage UID2 identity information and use it for targeted advertising, and how to refresh tokens, deal with missing identities, and handle user opt-outs.

For a workflow diagram, see [Integration Steps](#integration-steps). See also [FAQs](#faqs).

To facilitate the process of establishing client identity using UID2 and retrieving advertising tokens, the web integration steps provided in this guide rely on the UID2 SDK for JavaScript. Here's an [example application](https://example-jssdk-integ.uidapi.com/) that illustrates the integration steps described in this guide and the usage of the SDK (currently only for email addresses). For the application documentation, see [UID2 SDK Integration Example](https://github.com/IABTechLab/uid2-examples/blob/main/publisher/standard/README.md).

:::tip
The first-party cookie and local storage implementation details might change in the future. To avoid potential issues, be sure to rely on the functionality documented in the [UID2 SDK for JavaScript API Reference](../sdks/client-side-identity.md#api-reference) for your identity management.
:::

For integration scenarios for publishers that do not use the UID2 SDK for JavaScript, see [Publisher Integration Guide, Server-Only](custom-publisher-integration.md). 

:::note
If you are using Google Ad Manager and want to use the secure signals feature, first follow the steps in this guide and then follow the additional steps in the [Google Ad Manager Secure Signals Integration Guide](google-ss-integration.md).
:::

## Integration Steps 

The following diagram outlines the steps required for establishing a user's UID2 token with a publisher and how the UID2 token integrates with the RTB bid stream.

![Publisher Flow](https://mermaid.ink/svg/eyJjb2RlIjoiICBzZXF1ZW5jZURpYWdyYW1cbiAgICBwYXJ0aWNpcGFudCBVIGFzIFVzZXJcbiAgICBwYXJ0aWNpcGFudCBQIGFzIFB1Ymxpc2hlclxuICAgIHBhcnRpY2lwYW50IFVJRDIgYXMgVUlEMiBTZXJ2aWNlXG4gICAgcGFydGljaXBhbnQgU1NQXG4gICAgTm90ZSBvdmVyIFUsU1NQOiAxLiBFc3RhYmxpc2ggSWRlbnRpdHlcbiAgICBVLT4-K1A6IDEtYS4gVGhlIHVzZXIgdmlzaXRzIGEgcHVibGlzaGVyIGFzc2V0LlxuICAgIFAtPj4tVTogMS1iLiBUaGUgcHVibGlzaGVyIGV4cGxhaW5zIHRoZSB2YWx1ZSBleGNoYW5nZSBvZiB0aGUgb3BlbiBpbnRlcm5ldCBhbmQgcmVxdWVzdHMgYSBsb2dpbi5cbiAgICBhY3RpdmF0ZSBVXG4gICAgVS0-PlA6IDEtYy4gVGhlIHVzZXIgYXV0aGVudGljYXRlcyBhbmQgYXV0aG9yaXplcyB0aGUgY3JlYXRpb24gb2YgYSBVSUQyLlxuICAgIGRlYWN0aXZhdGUgVVxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VUlEMjogMS1kLiBUaGUgcHVibGlzaGVyIHNlbmRzIHRoZSB1c2VyJ3MgUElJIHRvIHRoZSB0b2tlbiBnZW5lcmF0aW9uIHNlcnZpY2UuXG4gICAgZGVhY3RpdmF0ZSBQXG4gICAgYWN0aXZhdGUgVUlEMlxuICAgIFVJRDItPj5QOiAxLWUuIFRoZSB0b2tlbiBnZW5lcmF0aW9uIHNlcnZpY2UgcmV0dXJucyBVSUQyIHRva2Vucy5cbiAgICBkZWFjdGl2YXRlIFVJRDJcbiAgICBhY3RpdmF0ZSBQXG4gICAgUC0-PlU6IDEtZi4gVGhlIHB1Ymxpc2hlciBzZXRzIGEgVUlEMiBmb3IgdGhlIHVzZXIuXG4gICAgZGVhY3RpdmF0ZSBQXG4gICAgTm90ZSBvdmVyIFUsU1NQOiAyLiBCaWQgVXNpbmcgVUlEMiBUb2tlbnNcbiAgXG4gICAgUC0-PlNTUDogMi1hLiBUaGUgcHVibGlzaGVyIGNhbGxzIHRoZSBTU1AgZm9yIGFkcyB1c2luZyB0aGUgVUlEMiB0b2tlbi5cbiAgICBhY3RpdmF0ZSBTU1BcbiAgICBTU1AtPj5QOiAyLWIuIFRoZSBTU1AgcmV0dXJucyBhZHMgdG8gZGlzcGxheS5cbiAgICBkZWFjdGl2YXRlIFNTUFxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VTogMi1jLiBUaGUgcHVibGlzaGVyIGRpc3BsYXlzIHRoZSBhZHMgdG8gdGhlIHVzZXIuXG4gICAgZGVhY3RpdmF0ZSBQXG5cbiAgICBOb3RlIG92ZXIgVSxTU1A6IDMuIFJlZnJlc2ggVG9rZW5zXG4gICAgVS0-PlVJRDI6IDMtYS4gVGhlIFNESyBzZW5kcyBhIHJlcXVlc3QgdG8gcmVmcmVzaCB0aGUgVUlEMiB1c2luZyB0aGUgcmVmcmVzaCB0b2tlbi5cbiAgICBhY3RpdmF0ZSBVSUQyXG4gICAgVUlEMi0-PlU6IDMtYi4gSWYgYSB1c2VyIGhhc24ndCBvcHRlZCBvdXQsIHRoZSByZWZyZXNoIHRva2VuIHNlcnZpY2UgcmV0dXJucyBuZXcgaWRlbnRpdHkgdG9rZW5zLlxuICAgIGRlYWN0aXZhdGUgVUlEMlxuICAgIE5vdGUgb3ZlciBVLFNTUDogNC4gVXNlciBMb2dvdXRcbiAgICBVLT4-UDogNC1hLiBUaGUgdXNlciBsb2dzIG91dCBmcm9tIGEgcHVibGlzaGVyIGFzc2V0LlxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VTogNC1iLiBUaGUgdXNlcidzIGlkZW50aXR5IGNsZWFycy5cbiAgICBkZWFjdGl2YXRlIFAiLCJtZXJtYWlkIjp7InRoZW1lIjoiZm9yZXN0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)

The following sections provide additional details for each step in the diagram:
 
 1. [Establish identity: User Login](#establish-identity-user-login)
 2. [Bid Using UID2 Tokens](#bid-using-uid2-tokens)
 3. [Refresh Tokens](#refresh-tokens)
 4. [Clear Identity: User Logout](#clear-identity-user-logout)

### Establish Identity: User Login

| Step | Endpoint/SDK                                                       | Description                                                                                                                                                                                                                                                                                                                                                        |
| :--- | :----------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1-d  | [POST /token/generate](../endpoints/post-token-generate.md)        | ユーザーが認証され、UID2 の作成が許可されたら、[POST /token/generate](../endpoints/post-token-generate.md) エンドポイントを使用して、ユーザーの正規化したメールアドレスまたは電話番号を使って UID2 Token を生成します。                                                                                                                                            |
| 1-e  | [POST /token/generate](../endpoints/post-token-generate.md)        | ユーザーのメールアドレス、電話番号、またはそれぞれのハッシュから生成された UID2 Token を返します。                                                                                                                                                                                                                                                                 |
| 1-f  | UID2 SDK for JavaScript | Step 1-e で返された UID2 Token を、SDK の [init()関数](../sdks/client-side-identity.md#initopts-object-void) の `identity` プロパティで SDK に送信し、以下に示すように [コールバック関数](../sdks/client-side-identity.md#callback-function) を指定します。このメカニズムにより、ユーザーがログアウトするまで、UID2 Token がターゲティング広告に利用できるようになります。|

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

Based on the status and availability of a valid identity, the SDK does the following:

1. Sets up the background token auto-refresh.
1. Stores identity information in [local storage or a first-party cookie](../sdks/client-side-identity.md#uid2-storage-format).
1. Uses the identity information to initiate requests for targeted advertising.

<!-- (**GWH_TODO. Q: Not sure about the relationship between the steps above and the table below. And the diagram 2-a which says "the publisher calls the SSP for ads using the UID2 token". A: Diagram needs to be updated.**) -->

The bidding step is shown in the following table.

| Step | Endpoint/SDK                                                       | Description                                                                                                                                          |
| :--- | :----------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2-a | UID2 SDK for JavaScript | 以下に示すように、[getAdvertisingToken() 関数](../sdks/client-side-identity.md#getadvertisingtoken-string) を使用して、現在のユーザーの Advertising Token を取得します。|

>NOTE: UID2 Token が SSP から DSP に送信されるとき、ビッドストリーム内でどのように見えるかの例については、[What does a UID2 token look like in the bid stream?](../getting-started/gs-faqs.md#what-does-a-uid2-token-look-like-in-the-bid-stream) を参照してください。

```html
<script>
  let advertisingToken = __uid2.getAdvertisingToken();
</script>
```

:::info
You need to consider how you pass the returned advertising token to SSPs. With some other approaches to client-side UID2 implementation, such as using `Prebid.js` (see [Prebid Integration Guide](integration-prebid.md)) or Google Ad Manager Secure Signals (see [Google Ad Manager Secure Signals Integration Guide](google-ss-integration.md)), the implementation includes functions that manage passing the returned advertising token. If you're using the UID2 SDK for JavaScript you'll need to manage this yourself.
:::

:::tip
Instead of calling `__uid2.getAdvertisingToken()`, you can use the `advertising_token` property of the identity passed to the callback that you set up for step 1-g. The callback will be called every time the identity changes.
:::

### Refresh Tokens

As part of its initialization, the SDK sets up a [token auto-refresh](../sdks/client-side-identity.md#background-token-auto-refresh) for the identity, which is triggered in the background by the timestamps on the identity or by failed refresh attempts due to intermittent errors.

| Step | Endpoint/SDK | Description |
| :--- | :--- | :--- |
| 3-a | [UID2 SDK for JavaScript](../sdks/client-side-identity.md) | The SDK automatically refreshes UID2 tokens in the background. No manual action is required. |
| 3-b | [UID2 SDK for JavaScript](../sdks/client-side-identity.md) | If the user hasn't opted out, the [POST /token/refresh](../endpoints/post-token-refresh.md) endpoint automatically returns new identity tokens. |


### Clear Identity: User Logout

The client lifecycle is complete when the user decides to log out from the publisher's site (not UID2). This closes the client's identity session and clears the first-party cookie information.

| Step | Endpoint/SDK | Description |
| :--- | :--- | :--- |
| 4-a | N/A | The user logs out from the publisher's asset. |
| 4-b | [UID2 SDK for JavaScript](../sdks/client-side-identity.md) | The SDK clears the UID2 identity from the first-party cookie and disconnects the client lifecycle by using the [disconnect() function](../sdks/client-side-identity.md#disconnect-void) as shown below.|


```html
<script>
  __uid2.disconnect();
</script>
```

## FAQs

パブリッシャー向けのよくある質問については、[FAQs for Publishers](../getting-started/gs-faqs.md#faqs-for-publishers)　を参照してください。

