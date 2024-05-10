---
title: UID2 Client-Server Integration Guide for Mobile
sidebar_label: Client-Server Integration for Mobile
pagination_label: UID2 Client-Server Integration Guide for Mobile
description: Setting up a mobile integration with token generate on server and refresh on client.
hide_table_of_contents: false
sidebar_position: 04
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';
import ReduceLatency from '/docs/snippets/_sdk-reduce-latency.mdx';
import EnableLogging from '/docs/snippets/_mobile-docs-enable-logging.mdx';
import GMAIMA_Plugins from '/docs/snippets/_mobile_docs_gmaima-plugin-gss.mdx';

# UID2 Client-Server Integration Guide for Mobile

This guide is intended for mobile app publishers who want to integrate with UID2 by generating UID2 tokens server-side via either a public or Private Operator and then passing the tokens and user identities into their mobile apps, which will in turn pass the tokens for bid stream use.  

This is called Client-Server Integration because some integration steps are client-side and some are server-side.

If you want to integrate with UID2 via client-side only changes (that is, all integration changes required are within the mobile apps), refer to the [UID2 Client-Side Integration Guide for Mobile](integration-mobile-client-side.md) instead.

This page provides a high-level overview of integration steps and links to additional documentation.

<!-- It includes the following sections:

- [Overview](#overview)
- [Complete the UID2 Account Setup](#complete-the-uid2-account-setup)
- [Client-Server Mobile Integration Data Flow Overview](#client-server-mobile-integration-data-flow-overview)
- [Implement Server-Side Token Generation](#implement-server-side-token-generation)
- [Server-Side Token Refresh](#server-side-token-refresh)
- [Add the UID2 Mobile SDK into Your Mobile App](#add-the-uid2-mobile-sdk-into-your-mobile-app)
- [Using the UID2 Integration Environment](#using-the-uid2-integration-environment)
- [Optional: Reduce Latency by Setting the API Base URL for the Production Environment](#optional-reduce-latency-by-setting-the-api-base-url-for-the-production-environment)
- [Token Storage](#token-storage)
- [Pass Generated Token for Bid Stream Use](#pass-generated-token-for-bid-stream-use)
- [When to Pass a New UID2 Identity into the SDK](#when-to-pass-a-new-uid2-identity-into-the-sdk)
- [Enable Logging)](#enable-logging)
- [Enable Automatic Token Refresh in Mobile App/Client Side](#enable-automatic-token-refresh-in-mobile-appclient-side)
- [Optional: UID2 GMA/IMA Plugin for GAM Secure Signal integration](#optional-uid2-gmaima-plugin-for-gam-secure-signal-integration) -->

(**GWH__SW_001 do we need to have a "Mobile SDK Version" section as we do in the client-side doc?**)

(**GWH__SW_002 in the client-side doc we have a separate "Opt-Out Handling" section. I think it would be good to have that here also. opt-out is mentioned only once in this doc.**)

:::note
This guide uses the group term **UID2 mobile SDKs** to include both the UID2 SDK for Android and the UID2 SDK for iOS.
:::

## Overview

UID2 provides mobile SDKs for [Android](../sdks/uid2-sdk-ref-android.md) and [iOS](../sdks/uid2-sdk-ref-ios.md). Each SDK has the following features:

- Takes in a UID2 <Link href="../ref-info/glossary-uid#gl-identity">identity</Link> (a UID2 token and associated values) and persists it in local file storage.
- Automatically refreshes UID2 tokens.

You'll need to complete the following steps:

1. [Complete the UID2 account setup](#complete-the-uid2-account-setup).
2. [Implement server-side token generatio](#implement-server-side-token-generation).
3. [Add the UID2 mobile SDK into your mobile app](#add-the-uid2-mobile-sdk-into-your-mobile-app).
4. [Configure the UID2 mobile SDK for your mobile app](#configure-the-uid2-mobile-sdk-for-your-mobile-app).
5. [Check that the token was successfully generated and then pass it for bid stream use](#pass-generated-token-for-bid-stream-use).
6. [Optional: UID2 GMA/IMA Plugin for GAM Secure Signal integration](#optional-uid2-gmaima-plugin-for-gam-secure-signal-integration).

## Complete the UID2 Account Setup

To set up your account, follow the steps described in [Account Setup](../getting-started/gs-account-setup.md).

When account setup is complete, you'll receive your unique API key and client secret. These values are unique to you, and it is important to keep them secure. For details, see [API Key and Client Secret](../getting-started/gs-credentials.md#api-key-and-client-secret).

## Client-Server Mobile Integration Data Flow Overview

The following diagram shows the data flow that the publisher must implement for UID2 client-server mobile integration.

This example uses the [UID2 SDK for Android](../sdks/uid2-sdk-ref-android.md) in the client-side mobile app and the [UID2 SDK for Java](../sdks/uid2-sdk-ref-java.md) on the server side.

**GWH__KL_01: diagram updates to remove TTD colors at least?**)

![Mobile Client-Server Integration Example](images/integration-mobile-client-server.png)

<!-- (**GWH_ https://ttdcorp-my.sharepoint.com/:p:/r/personal/rita_aleksanyan_thetradedesk_com/_layouts/15/Doc.aspx?sourcedoc=%7BDF894943-3D6A-4A60-A1E2-176ACD0BBBCC%7D&file=Sample%20Data%20Flow.pptx&wdLOR=c8FEF9DB2-E2FD-4F07-B411-B094C4813ACE&fromShare=true&action=edit&mobileredirect=true**) -->

## Implement Server-Side Token Generation

The first step of UID2 integration is to be able to generate the UID2 token on your server. Then, you can pass the token into your mobile apps for sending to the RTB bid stream.

There are two approaches to generating UID2 tokens on the server side by providing directly identifying information (<Link href="../ref-info/glossary-uid#gl-dii">DII</Link>) (email address or phone number):

- Integration with an SDK
- Direct integration to API endpoints.

Options are summarized in the following table.

| Integration Solution  | Generate Token | Refresh Token |
| :--- | :--- |  :--- |
| [UID2 SDK for Java](../sdks/uid2-sdk-ref-java.md) | ✅ | ✅ |
| [UID2 SDK for Python](../sdks/uid2-sdk-ref-python.md) | ✅ | ✅ |
| [Direct integration (API endpoints with custom code)](../endpoints/post-token-generate.md) | ✅ | ✅ |

Whatever integration option you choose to generate the <Link href="../ref-info/glossary-uid#gl-identity">identity</Link> (UID2 token and associated values), you'll need to implement one of the following:

- Call the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint.

  The identity output that you need for the rest of this guide is the content inside the body section of a successful endpoint response. For an example, see [Successful Response](../endpoints/post-token-generate.md#successful-response).

-  Use one of the Publisher Client classes, in one of the UID2 server-side SDKs. These classes simplify the request into a single method call. 

   For instructions, see [UID2 SDK for Java, Publisher Basic Usage](../sdks/uid2-sdk-ref-java.md#basic-usage) or [UID2 SDK for Python, Usage for Publishers](../sdks/uid2-sdk-ref-python.md#usage-for-publishers).

   (**GWH__SW_003 in the Python SDK doc there is no Basic Usage section.**)

   If you're using one of these options, the `Identity` response that you need for the rest of this guide is the output of the applicable method, as follows:

   <Tabs groupId="language-selection">
   <TabItem value='java' label='Java'>

   ```java
   tokenGenerateResponse.getIdentityJsonString()
   ```

   </TabItem>
   <TabItem value='py' label='Python'>

   ```py
   token_generate_response.get_identity_json_string()
   ```

   </TabItem>
   </Tabs>

:::important
The endpoint and SDK API returns opt-out status if the <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> you are generating the token for has been opted out of UID2. If this happens, save the information and do not call the token generation endpoint for the same DII again. 
:::

You will need to pass the `Identity` response into the mobile app: see [Configure the UID2 Mobile SDK for your mobile app](#configure-the-uid2-mobile-sdk-for-your-mobile-app).

:::note
For security reasons, the API key and secret used in token generation must be called server-side. Do not store these values inside a mobile app. For details, see [Security of API Key and Client Secret](../getting-started/gs-credentials.md#security-of-api-key-and-client-secret).
:::

## Server-Side Token Refresh

Token refresh is automatically enabled inside the UID2 mobile SDKs; you don't need to manage it explicitly on the server side.

You might decide to do server-side token refresh if you want to keep your changes in the mobile apps as simple as possible.

However, if you decide you want to manage token refresh on the server side and not the client/mobile side, you can do so using one of the following:

- Call the [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint.
- Use one of the Publisher Client classes, in one of the UID2 server-side SDKs. These classes simplify the request into a single method call. 

  For instructions, see [UID2 SDK for Java, Publisher Server-Only Integration section](../sdks/uid2-sdk-ref-java.md#server-only-integration) or [UID2 SDK for Python, Publisher Server-Only Integration section](../sdks/uid2-sdk-ref-python.md#server-only-integration).

Then, pass the newly refreshed `Identity` value to the mobile app by following the rest of this guide.

## Add the UID2 Mobile SDK into Your Mobile App

For installation instructions, refer to one of the following:

- [UID2 SDK for Android Reference Guide](../sdks/uid2-sdk-ref-android.md)
- [UID2 SDK for iOS Reference Guide](../sdks/uid2-sdk-ref-ios.md)

For example, for Android, follow the UID2 SDK documentation to:
- Add the pre-built UID2 SDK for Android libraries into your mobile app: see [Installation](../sdks/uid2-sdk-ref-android.md#installation).
- Learn how to instantiate the UID2Manager instance in your Android app: see [Android Initialization](../sdks/uid2-sdk-ref-android.md#android-initialization).
 here.
 
 For iOS, refer to the [Usage Guidelines](../sdks/uid2-sdk-ref-ios.md#usage-guidelines).

## Using the UID2 Integration Environment

By default, the SDK is configured to work with the UID2 production environment: `https://prod.uidapi.com`. If you want to use the UID2 integration environment instead, provide the following URL in your call to UID2Manager initialization:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.init(
  context = this,
  serverUrl = "https://operator-integ.uidapi.com"
)
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
// Must be set before UID2Manager.shared is accessed UID2Settings.shared.environment = .custom(
  url: URL(string: "https://operator-integ.uidapi.com")!
)
```

</TabItem>
</Tabs>

On iOS, you must set `UID2Settings` before you first access `UID2Manager.shared`. Any changes made to settings after the first access are  not read.

:::note
Bear in mind the following differences between environments:
- Tokens from the UID2 integration environment are not valid for passing to the bid stream.
- You'll have a different set of Subscription ID and public key values for each environment (integ and prod). Be sure to use the correct values for each environment.
:::

## Optional: Reduce Latency by Setting the API Base URL for the Production Environment

<ReduceLatency />

To specify a different UID2 server, you can change it in the `init` call:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.init(
  context = this,
  serverUrl = " https://global.prod.uidapi.com"
)
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Settings.shared.environment = .singapore
// or
UID2Settings.shared.environment = .custom(
  url: URL(string: "https://global.prod.uidapi.com")!
)
```

</TabItem>
</Tabs>

## Configure the UID2 Mobile SDK for Your Mobile App

After you've instantiated `UID2Manager` correctly in your mobile app, you'll need to pass a UID2 <Link href="../ref-info/glossary-uid#gl-identity">identity</Link> generated server-side (see [Implement server-side token generation](#implement-server-side-token-generation)), and then pass it into the mobile app using the `setIdentity` method, as shown in the following:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().generateIdentity()
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.setIdentity()
```

</TabItem>
</Tabs>

## Token Storage

After you call the `setIdentity` method, the UID2 Identity is persisted in local file storage.

:::warning
The format of the file stored in the local file storage, or the filename itself, could change without notice. We recommend that you do not read and update the file directly.
:::

## Pass Generated Token for Bid Stream Use

(**GWH__KL02 Question from SW: "his is a question for PM probably - bid stream does not exist in UID2 Glossary - should it? I dunno if bid stream actually makes sense to publishers to be honest" Do we add it into glossary... I'd thought everyone would know that term, SW doesn't think so. And, bid stream two words... is that a company decision?**)

To retrieve the token, in your mobile app, call the following:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().getAdvertisingToken()
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.getAdvertisingToken()
```

</TabItem>
</Tabs>

If a successful identity was added into the UID2Manager, this method returns a string such as the following:

```
AgAAAQFt3aNLXKXEyWS8Tpezcymk1Acv3n+ClOHLdAgqR0kt0Y+pQWSOVaW0tsKZI4FOv9K/rZH9+c4lpm2DBpmFJqjdF6FAaAzva5vxDIX/67UOspsYtiwxH73zU7Fj8PhVf1JcpsxUHRHzuk3vHF+ODrM13A8NAVlO1p0Wkb+cccIIhQ==
```

You can use this identity to pass downstream for sending in the RTB bid stream.

If the `getAdvertisingToken()` method call returns `null`, there was no identity or valid token generated. Some possible reasons for this, and some things you could do to troubleshoot, are as follows:

- The identity is invalid. Check to see whether there are any errors from the previous `setIdentity()` call.
- You could enable logging to get more information: see [Enable Logging](#enable-logging).
- The advertising token inside the UID2 identity has expired, and the refresh token has also expired, so the SDK cannot refresh the token.

If there is no identity, follow the instructions in [Implement Server-Side Token Generation](#implement-server-side-token-generation) again, generate a new identity, and pass the result into your mobile app's UID2Manager again.

## When to Pass a New UID2 Identity into the SDK

The best way to determine whether a new UID2 identity is required by the UID2 SDK again is to call the `getAdvertisingToken()` method in all cases:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

UID2Manager.getInstance().getAdvertisingToken()

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.getAdvertisingToken()
```

</TabItem>
</Tabs>

On startup/resumption of the app, if `getAdvertisingToken()` returns `null`, it is time to generate new identity on the server by following the instructions in [Implement Server-Side Token Generation](#implement-server-side-token-generation). Then, pass the result into the mobile app’s UID2Manager again.

## Enable Logging

<EnableLogging />

## Enable Automatic Token Refresh in Mobile App/Client Side

By default, after a valid UID2 identity has been passed into the UID2Manager, it performs automatic token refresh. If for any reason token refresh was disabled, you can enable it with the following method call:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

**Android Java**:

```java
UID2Manager.getInstance()setAutomaticRefreshEnabled(false)
```

**Android Kotlin**:

```kotlin
UID2Manager.getInstance().automaticRefreshEnabled = false
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.automaticRefreshEnabled = false
```

</TabItem>
</Tabs>

## Optional: UID2 GMA/IMA Plugin for GAM Secure Signal integration

<GMAIMA_Plugins />
