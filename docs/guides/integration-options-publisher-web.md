---
title: Web Integration Overview
description: Overview of the publisher options for UID2 web integration.
hide_table_of_contents: false
sidebar_position: 02
displayed_sidebar: sidebarPublishers
---

import Link from '@docusaurus/Link';

# Web Integration Overview

As a publisher, there are many ways that you can integrate with UID2 to generate identity tokens to be passed into the RTB <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link> in the context of your web pages.

On this page, you'll find a high-level overview of integration steps and integration options, with links to additional information for each option.

<!-- The integration option that's right for you depends on many factors. For example, if the <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> is available on the client side, and you can use the latest version of Prebid, you can use the UID2 Prebid module, which manages the token generate request, token refresh request, and passing the token into the bidstream.

Some questions you might ask:
- Do you want to generate the UID2 token request on the client side or the server side?
- Do you use Prebid? If yes:
  - Are you constrained to a specific Prebid version?
  - Do you want the UID2 Prebid module to do everything&#8212;generate the token, refresh the token, and pass the token into the bidstream?
  - Do you prefer to use the UID2 SDK for JavaScript to generate and refresh the token, and use Prebid to pass the token into the bidstream? -->

## Key Integration Steps

At a high level, to integrate with UID2, you'll implement these three key activities:

1. [Generate the UID2 token](#generate-the-uid2-token)
1. [Refresh the UID2 token as needed](#refresh-the-uid2-token)
1. [Pass the UID2 token into the bidstream](#pass-the-uid2-token-into-the-bidstream)

There are many ways you can accomplish these key steps. The simplest and fastest implementation is a full client-side implementation using Prebid.js 8.21.0 or later.

## Integration Options Summary

The following table summarizes the solutions available for each integration step.

To accomplish all steps, you can combine solutions. For example, you could use the UID2 SDK for JavaScript, client-side, to generate and refresh the token, and Google Ad Manager Secure Signals to pass the token to the bidstream.

| Integration Solution | Generate Token | Refresh Token |Pass Token to the Bidstream |
| :--- | :--- | :--- | :--- |
| [Prebid.js client-side (8.21.0 or later)](integration-prebid-client-side.md) | &#9989; | &#9989; | &#9989; |
| [Prebid.js server-side (7.53.0 or later)](integration-prebid-server-side.md) | &#8212; | &#9989; | &#9989; |
| [UID2 SDK for JavaScript, client-side](publisher-client-side.md) | &#9989; | &#9989; | &#8212; |
| [UID2 SDK for JavaScript, server-side](integration-javascript-server-side.md) | &#9989; | &#9989; | &#8212; |
| [UID2 SDK for Java](../sdks/uid2-sdk-ref-java.md) | &#9989; | &#9989; | &#8212; |
| [UID2 SDK for Python](../sdks/uid2-sdk-ref-python.md) | &#9989; | &#9989; | &#8212; |
| [Direct integration (API endpoints)](custom-publisher-integration.md) | &#9989; | &#9989; | &#8212; |
| [Google Ad Manager Secure Signals](google-ss-integration.md) | &#8212; | &#8212; | &#9989; |

<!-- &#9989; = Supported | &#8212; = Not Supported -->

To choose your implementation and get started, follow these steps:

1. Review the summary of options to generate a UID2 token:
   - [Client-Side Integration Options](#client-side-integration-options)
   - [Server-Side Integration Options](#server-side-integration-options)
1. Review the options to [refresh the UID2 token](#refresh-the-uid2-token).
1. Review the options to [pass the token into the bidstream](#pass-the-uid2-token-into-the-bidstream).
1. Choose the option that's best for you, and then click through to the implementation documentation.

## Generate the UID2 Token

There are two main paths that you can choose to generate a UID2 token&#8212;you can choose to initiate the UID2 token generate request:

- On the client side (in the user's browser): see [Client-Side Integration Options](#client-side-integration-options).
- On the server side: see [Server-Side Integration Options](#server-side-integration-options).

Each option has different advantages. We recommend client-side integration using Prebid.js 8.21.0 or later as the easiest and fastest integration option.

:::note
For all integration options, you can choose to store the UID2 token in local storage or cookie storage.
:::

### Client-Side Integration Options

Generating the UID2 token on the client side has the following advantages:

- The code runs on the client side, on the consumer's web page, and no server-side coding is required.
- There is a Prebid integration that handles all functions for you&#8212;token generation, token refresh, and passing the token into the bidstream. If you use Prebid 8.21.0 or later, this is the simplest and fastest implementation option.

If you choose a client-side integration, you'll need to provide a list of your top-level domains, for security purposes, as part of account setup. For details, see [Client-Side Implementation for Publishers](../getting-started/gs-account-setup.md#client-side-implementation-for-publishers) on the Account Setup page.

The following table summarizes the options for publishers who want to generate the UID2 token on the client side, via the web page, with corresponding documentation resources.

| Option | Documentation |
| :--- | :--- |
| Prebid.js client-side implementation (8.21.0 or later) | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| UID2 SDK for JavaScript, client-side implementation | [Client-Side Integration Guide for JavaScript](publisher-client-side.md) |

### Server-Side Integration Options

Generating the UID2 token on the server side has the following advantages:

- You can keep your <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> entirely on the server side.
- If your development resources are back-end developers, you might prefer a server-side integration.
- For server-side Prebid integration, there is no requirement to update to the latest Prebid version, as long as your version is 7.53.0 or later.

The following table summarizes the options for publishers who want to generate the UID2 token on the server side.

<!-- (**GWH_SW His query: "why is Prebid.js server integration not listed here?" I thought the server-side option didn't support token/generate + per KK's diagram. Let's discuss. Affects summary table also.**) -->

| Option | Documentation |
| :--- | :--- |
| UID2 SDK for JavaScript, client-server implementation | [Client-Server Integration Guide for JavaScript](integration-javascript-server-side.md) |
| UID2 SDK for Java | - [Publisher Integration Guide, Server-Side](custom-publisher-integration.md)<br/>- [UID2 SDK for Java](../sdks/uid2-sdk-ref-java.md) |
| UID2 SDK for Python | - [Publisher Integration Guide, Server-Side](custom-publisher-integration.md)<br/>- [UID2 SDK for Python](../sdks/uid2-sdk-ref-python.md)  |
| Direct integration (API endpoints) | [Publisher Integration Guide, Server-Side](custom-publisher-integration.md) |

## Refresh the UID2 Token

For security reasons, the UID2 token has a limited life, but there is a built-in mechanism to refresh the token so that you can still use it.

When you get the token, it comes with a refresh token and a time stamp indicating how long the token is valid for. As long as you use the refresh token to generate a new UID2 token before the current UID2 token expires, you'll get a new UID2 token and an updated refresh token each time. You can continue to refresh to keep the information valid.

The following table shows the integration options that support refreshing the UID2 token.

| Option | Documentation |
| :--- | :--- |
| Prebid.js client-side implementation (8.21.0 or later) | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| Prebid.js server-side implementation (7.53.0 or later) | [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-server-side.md) |
| UID2 SDK for JavaScript, client-side implementation | [Client-Side Integration Guide for JavaScript](publisher-client-side.md) |
| UID2 SDK for JavaScript, client-server implementation | [Client-Server Integration Guide for JavaScript](integration-javascript-server-side.md) |
| UID2 SDK for Java | - [Publisher Integration Guide, Server-Side](custom-publisher-integration.md)<br/>- [UID2 SDK for Java](../sdks/uid2-sdk-ref-java.md) |
| UID2 SDK for Python | - [Publisher Integration Guide, Server-Side](custom-publisher-integration.md)<br/>- [UID2 SDK for Python](../sdks/uid2-sdk-ref-python.md)  |
| Direct integration (API endpoints) | [Publisher Integration Guide, Server-Side](custom-publisher-integration.md) |

## Pass the UID2 Token Into the Bidstream

Publishers use UID2s by encrypting DII (email addresses or phone numbers) into UID2 tokens and then sending the UID2 tokens into the bidstream.

The following table shows integration options that support passing UID2 token into the bidstream.

| Option | Documentation |
| :--- | :--- |
| Prebid.js client-side implementation (8.21.0 or later) | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| Prebid.js server-side implementation (7.53.0 or later) | [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-server-side.md) |
| Google Ad Manager Secure Signals| [Google Ad Manager Secure Signals Integration Guide](google-ss-integration.md) |

:::note
As long as you generate the token and keep it refreshed, you can also use other options for passing the UID2 token into the bidstream.
:::

<!-- ## Integration Using Prebid

(**GWH_KK not sure if we want this section. Would appreciate your input.**)

If you want to integrate using Prebid, here are some additional questions you'll need to answer to determine the best integration approach, and some steps to take:

- What Prebid version are you using?
  - If you're using Prebid 8.21.0 or later, you can use the client-side Prebid integration option, which is the simplest and easiest implementation approach.
  - If you're using a version prior to 8.21.0 (7.53.0 or later), and can't easily upgrade, you'll choose a server-side option.
- Domain names:
  - As part of account setup, if you're using the Prebid.js client-side option, you'll need to provide a list of your top-level domains.
- Are you already using the UID2 JavaScript SDK to generate and refresh the token? If so, you can continue to use the Prebid.js server-side implementation. For details, see [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-server-side.md). -->

<!-- 
## Advantages: Summary

The following table summarizes the advantages of each integration option.
(**GWH_KK don't like having two tables but I can't fit it all into one. Also the docs are different. Need input re the best docs to link to... SDK ref or integration guide?**)

| Option | Client/Server | Advantages | Documentation |
| :--- |  :--- | :--- | :--- |
| Prebid.js 8.21.0 or later | Client | <ul><li>No server-side coding needed.</li><li>Fast and easy implementation.</li></ul> | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| UID2 JavaScript SDK + Prebid.js 7.53.0 or later | Client | <ul><li>No need to upgrade to the latest Prebid version.</li><li>Easier to manage latency with a server-side implementation.</li><li>The JavaScript SDK takes care of generating and refreshing the token, and Prebid takes care of sending the token to the bidstream.</li></ul> | <ul><li>[Client-Side Integration Guide for JavaScript](publisher-client-side.md)</li><li>[UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-server-side.md)</li></ul> |
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
- The JavaScript SDK takes care of generating and refreshing the token, and Prebid takes care of sending the token to the bidstream.

For details, see:
- [UID2 SDK for JavaScript Reference Guide](../sdks/client-side-identity.md)
- [UID2 Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-server-side.md)

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


<!-- 
## TABLE STASH

| Option | Token Generation managed by | Token Refresh managed by |Passing Token to the Bidstream |
| :--- | :--- | :--- | :--- |
| Prebid.js 8.21.0 or later<br/>[UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) | Prebid.js 8.21.0 or later | Prebid.js 8.21.0 or later | Prebid.js 8.21.0 or later |
| UID2 JavaScript SDK + <br/>Prebid.js 7.53.0 or later | UID2 JS SDK<br/>[Client-Side Integration Guide for JavaScript](publisher-client-side.md) | UID2 JS SDK or Prebid.js 7.53.0 or later | Prebid.js 7.53.0 or later<br/>[UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-server-side.md) |
| UID2 SDK for JavaScript<ul><li>[Client-Server Integration Guide for JavaScript](integration-javascript-server-side.md)</li><li>[Publisher Integration Guide, Server-Side](custom-publisher-integration.md)</li></ul> | JavaScript SDK | JavaScript SDK |  Publisher's choice. For example, Prebid.js.<br/>[UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-server-side.md) |
| UID2 SDK for Java<br/>[Publisher Integration Guide, Server-Side](custom-publisher-integration.md) | [UID2 SDK for Java](../sdks/uid2-sdk-ref-java.md) | [UID2 SDK for Java](../sdks/uid2-sdk-ref-java.md)| Publisher's choice.<br/>Can be integrated with Prebid.js. |
| UID2 SDK for Python<br/> [Publisher Integration Guide, Server-Side](custom-publisher-integration.md)| [UID2 SDK for Python](../sdks/uid2-sdk-ref-python.md) | [UID2 SDK for Python](../sdks/uid2-sdk-ref-python.md) | Publisher's choice.<br/>Can be integrated with Prebid.js. |
| GAM Secure Signals<br/> [xxx](custom-publisher-integration.md)| [Google Ad Manager Secure Signals Integration Guide](google-ss-integration.md) | [Google Ad Manager Secure Signals Integration Guide](google-ss-integration.md) | [Google Ad Manager Secure Signals Integration Guide](google-ss-integration.md) |
| Direct integration<br/>(API endpoints)<br/>[Publisher Integration Guide, Server-Side](custom-publisher-integration.md) | [POST /token/generate](../endpoints/post-token-generate.md) | [POST /token/refresh](../endpoints/post-token-refresh.md) | Publisher's choice.<br/>Can be integrated with Prebid.js. |
 -->
