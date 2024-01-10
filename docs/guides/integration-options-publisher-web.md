---
title: Web Integration Options
description: A comparison of the publisher options for UID2 web integration.
hide_table_of_contents: false
sidebar_position: 02
---

# Web Integration Options

As a publisher, there are several different ways you can integrate with UID2 to generate identity tokens to be passed into the RTB bid stream in the context of your web pages.

On this page you'll find a high-level overview of integration steps and integration options, with links to additional information.

<!-- The integration option that's right for you depends on many factors. For example, if the [DII](../ref-info/glossary-uid.md#gl-dii) is available on the client side, and you can use the latest version of Prebid, you can use the UID2 Prebid module, which manages the token generate request, token refresh request, and passing the token into the bid stream.

Some questions you might ask:
- Do you want to generate the UID2 token request on the client side or the server side?
- Do you use Prebid? If yes:
  - Are you constrained to a specific Prebid version?
  - Do you want the UID2 Prebid module to do everything&#8212;generate the token, refresh the token, and pass the token into the bid stream?
  - Do you prefer to use the UID2 SDK for JavaScript to generate and refresh the token, and use Prebid to pass the token into the bid stream? -->

<!-- It includes:

* [Integration Steps: Summary](#integration-steps-summary)
* [Integration Options: Client Side](#integration-options-client-side)
* [Integration Options: Server Side](#integration-options-server-side)
* [Options to Generate/Refresh UID2 Token](#options-to-generaterefresh-uid2-token)
* [Options to Pass the UID2 Token into the Bid Stream](#options-to-pass-the-uid2-token-into-the-bid-stream)
* [Client-Side or Server-Side Integration?](#client-side-or-server-side-integration)
* [Integration Using Prebid](#integration-using-prebid)
* [IntegrationDetails](#integration-details)
  * [Prebid.js 8.21.0 or Later](#prebidjs-8210-or-later)
  * [UID2 JavaScript SDK + Prebid.js 7.53.0 or later](#uid2-sdk-for-javascript--prebidjs-7530-or-later)
  * [UID2 SDK for JavaScript](#uid2-sdk-for-javascript)
  * [UID2 SDK for Java](#uid2-sdk-for-java)
  * [UID2 SDK for Python](#uid2-sdk-for-python)
  * [Direct integration (API endpoints)](#direct-integration-api-endpoints)
 -->

## Integration Steps: Summary

At a high level, to integrate with UID2 requires the following key steps:

1. Generate a UID2 token.
1. Keep the UID2 token refreshed as needed.
1. Pass the UID2 token into the bid stream.

There are many ways you can accomplish these key steps. The simplest and fastest implementation is a full client-side implementation using the latest version of Prebid.js.

To choose your implementation and get started, follow these steps:

1. Review the summary of implementation options:
   - [Client-Side Integration Options](#client-side-integration-options)
   - [Server-Side Integration Options](#server-side-integration-options)
2. Choose the option that's best for you, and then click through to the implementation documentation.

## Token Generation Options

There are two main paths that you can choose in integrating with UID2: you can choose to initiate the UID2 token generate request on the client side (in the user's browser) or on the server side.

Each option has different advantages. Client-side integration is easy and fast; integration using Prebid.js 8.21.0 or later is the easiest and fastest integration option.

For additional information see the following sections.

:::note
For all integration options, you could store the UID2 token in local storage or cookie storage.
:::

### Client-Side Integration Options

Client-side integration has the following advantages:

- The code runs on the client side, on the consumer's web page, and no server-side coding is required.
- There is a Prebid integration that handles all functions for you&#8212;token generate, token refresh, and passing the token into the bid stream. As long as you can use Prebid 8.21.0 or later (see [Integration Using Prebid](#integration-using-prebid)), this is the simplest and easiest implementation option.

If you choose a client-side integration, you'll need to provide a list of your top-level domains, for security purposes, as part of account setup. For details, see [Account Setup Details](../getting-started/gs-account-setup.md#account-setup-details).

The following table summarizes the options for publishers who want to integrate with UID2 on the client side, via the web page. Documentation resources are listed inline.

| Option | Token Generation managed by | Token Refresh managed by |Passing Token to the Bid Stream |
| :--- |  :--- | :--- | :--- |
| Prebid.js 8.21.0 or later<br/>[UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) | Prebid.js 8.21.0 or later | Prebid.js 8.21.0 or later | Prebid.js 8.21.0 or later |
| UID2 JavaScript SDK + <br/>Prebid.js 7.53.0 or later | UID2 JS SDK<br/>[JavaScript Express Integration Guide](publisher-client-side.md) | UID2 JS SDK or Prebid.js 7.53.0 or later | Prebid.js 7.53.0 or later<br/>[UID2 Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md) |

### Server-Side Integration Options

Server-side integration has the following advantages:

- You can keep your DII entirely on the server side&#8212;there is no need to embed DII into the web pages.
- If your development resources are back-end developers, you might prefer a server-side integration
- For server-side Prebid integration, there is no requirement to update to the latest Prebid version. If you're using Prebid, and have a constraint with regard to version, choose server-side integration.

The following table summarizes the options for publishers who want to integrate with UID2 on the server side.

| Option | Token Generation managed by | Token Refresh managed by |Passing Token to the Bid Stream |
| :--- | :--- | :--- | :--- |
| UID2 SDK for JavaScript<ul><li>[JavaScript Standard Integration Guide](integration-javascript-standard.md)</li><li>[Publisher Integration Guide, Server-Only](custom-publisher-integration.md)</li></ul> | JavaScript SDK | JavaScript SDK |  Publisher's choice. For example, Prebid.js.<br/>[UID2 Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md) |
| UID2 SDK for Java<br/>[Publisher Integration Guide, Server-Only](custom-publisher-integration.md) | [UID2 SDK for Java](../sdks/uid2-sdk-ref-java.md) | [UID2 SDK for Java](../sdks/uid2-sdk-ref-java.md)| Publisher's choice.<br/>Can be integrated with Prebid.js. |
| UID2 SDK for Python<br/> [Publisher Integration Guide, Server-Only](custom-publisher-integration.md)| [UID2 SDK for Python](../sdks/uid2-sdk-ref-python.md) | [UID2 SDK for Python](../sdks/uid2-sdk-ref-python.md) | Publisher's choice.<br/>Can be integrated with Prebid.js. |
| GAM Secure Signals<br/> [xxx](custom-publisher-integration.md)| TBD XXX GWH_SW | TBD XXX GWH_SW | Google Ad Manager |
| Direct integration<br/>(API endpoints)<br/>[Publisher Integration Guide, Server-Only](custom-publisher-integration.md) | [POST /token/generate](../endpoints/post-token-generate.md) | [POST /token/refresh](../endpoints/post-token-refresh.md) | Publisher's choice.<br/>Can be integrated with Prebid.js. |

<!-- ## Integration Using Prebid

(**GWH_KK not sure if we want this section. Would appreciate your input.**)

If you want to integrate using Prebid, here are some additional questions you'll need to answer to determine the best integration approach, and some steps to take:

- What Prebid version are you using?
  - If you're using Prebid 8.21.0 or later, you can use the client-side Prebid integration option, which is the simplest and easiest implementation approach.
  - If you're using a version prior to 8.21.0 (7.53.0 or later), and can't easily upgrade, you'll choose a server-side option.
- Domain names:
  - As part of account setup, if you're using the Prebid client-side option, you'll need to provide a list of your top-level domains.
- Are you already using the UID2 JavaScript SDK to generate and refresh the token? If so, you can continue to use the Prebid server-side implementation. For details, see [UID2 Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md). -->

<!-- 
## Advantages: Summary

The following table summarizes the advantages of each integration option.
(**GWH_KK don't like having two tables but I can't fit it all into one. Also the docs are different. Need input re the best docs to link to... SDK ref or integration guide?**)

| Option | Client/Server | Advantages | Documentation |
| :--- |  :--- | :--- | :--- |
| Prebid.js 8.21.0 or later | Client | <ul><li>No server-side coding needed.</li><li>Fast and easy implementation.</li></ul> | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| UID2 JavaScript SDK + Prebid.js 7.53.0 or later | Client | <ul><li>No need to upgrade to the latest Prebid version.</li><li>Easier to manage latency with a server-side implementation.</li><li>The JavaScript SDK takes care of generating and refreshing the token, and Prebid takes care of sending the token to the bid stream.</li></ul> | <ul><li>[JavaScript Express Integration Guide](publisher-client-side.md)</li><li>[UID2 Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md)</li></ul> |
| UID2 SDK for JavaScript | Server | <ul><li>The SDK takes care of generating and refreshing the token.</li><li>Coded in JavaScript.</li></ul> If you use JavaScript, and client-side implementation is not suitable for you, this is your best choice. | [UID2 SDK for JavaScript Reference Guide (2.x and earlier versions)](../sdks/client-side-identity-v2.md) |
| UID2 SDK for Java | Server | <ul><li>The SDK takes care of generating and refreshing the token.</li><li>Coded in Java.</li></ul> If your server-side coding is Java, and client-side implementation is not suitable for you, this is your best choice. | [UID2 SDK for Java (Server-Side) Reference Guide](../sdks/uid2-sdk-ref-java.md) |
| UID2 SDK for Python] | Server | <ul><li>The SDK takes care of generating and refreshing the token.</li><li>Coded in Python.</li></ul> If your server-side coding is Python, and client-side implementation is not suitable for you, this is your best choice. | [UID2 SDK for Python (Server-Side) Reference Guide](../sdks/uid2-sdk-ref-python.md) |
| Direct integration (API endpoints) | Server | You're free to implement the APIs in whatever way you choose. | <ul><li>[POST /token/generate](../endpoints/post-token-generate.md)</li><li>[POST /token/refresh](../endpoints/post-token-refresh.md)</li></ul> | 
-->

<!-- ## BELOW = TO DELETE
-----------------------------BELOW = TO DELETE

## Integration Details

The following sections provide additional information on each of the integration options, with links to documentation resources:

* [Prebid.js 8.21.0 or Later](#prebidjs-8210-or-later)
* [UID2 JavaScript SDK + Prebid.js 7.53.0 or later](#uid2-sdk-for-javascript--prebidjs-7530-or-later)
* [UID2 SDK for JavaScript](#uid2-sdk-for-javascript)
* [UID2 SDK for Java](#uid2-sdk-for-java)
* [UID2 SDK for Python](#uid2-sdk-for-python)
* [Direct integration (API endpoints)](#direct-integration-api-endpoints)

### Prebid.js 8.21.0 or Later

The advantages of this implementation approach are as follows:

- No server-side coding needed.
- Fast and easy implementation.

For details, see [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md).

### UID2 SDK for JavaScript + Prebid.js 7.53.0 or later

The advantages of this implementation approach are as follows:

- No need to upgrade to the latest Prebid version.
- Easier to manage latency with a server-side implementation.
- The JavaScript SDK takes care of generating and refreshing the token, and Prebid takes care of sending the token to the bid stream.

For details, see:
- [UID2 SDK for JavaScript Reference Guide](../sdks/client-side-identity.md)
- [UID2 Server-Side Integration Guide for Prebid.js](../guides/integration-prebid-server-side.md)

### UID2 SDK for JavaScript

The advantages of this implementation approach are as follows:

- The SDK takes care of generating and refreshing the token.
- Coded in JavaScript. If you use JavaScript, and client-side implementation is not suitable for you, this is your best choice.

For details, see [UID2 SDK for JavaScript Reference Guide (2.x and earlier versions)](../sdks/client-side-identity-v2.md).

### UID2 SDK for Java

The advantages of this implementation approach are as follows:

- The SDK takes care of generating and refreshing the token.
- Coded in Java. If your server-side coding is Java, and client-side implementation is not suitable for you, this is your best choice.

For details, see [UID2 SDK for Java (Server-Side) Reference Guide](../sdks/uid2-sdk-ref-java.md).

### UID2 SDK for Python

The advantages of this implementation approach are as follows:

- The SDK takes care of generating and refreshing the token.
- Coded in Python. If your server-side coding is Python, and client-side implementation is not suitable for you, this is your best choice.

For details, see [UID2 SDK for Python (Server-Side) Reference Guide](../sdks/uid2-sdk-ref-python.md).

### Direct integration (API endpoints)

The advantages of this implementation approach are as follows:

- You're free to implement the APIs in whatever way you choose.

For details, see:
- [POST /token/generate](../endpoints/post-token-generate.md)
- [POST /token/refresh](../endpoints/post-token-refresh.md) -->
