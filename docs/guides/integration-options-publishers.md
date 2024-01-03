---
title: Publisher Options
description: A comparison of the publisher options for UID2 integration.
hide_table_of_contents: false
sidebar_position: 02
---

# Publisher Integration Options

[**GWH/KT this whole thing doesn't cover other options such as mobile. Suggestions re how to state that this is a subset (for now until it covers everything). For web integrations I think?**]

As a publisher, there are several different ways you can integrate with UID2 to generate identity tokens to be passed into the RTB bid stream.

On this page you'll find a high-level overview of each integration option, including why you might choose it, and links to additional information.

The integration option that's right for you depends on many factors. For example, if the [DII](../ref-info/glossary-uid.md#gl-dii) is available on the client side, and you can use the latest version of Prebid, you can use the UID2 Prebid module, which manages the token generate request, token refresh request, and passing the token into the bid stream.

Some questions you might ask:
- Do you want to generate the UID2 token request on the client side or the server side?
- Do you use Prebid? If yes:
  - Are you constrained to a specific Prebid version?
  - Do you want the UID2 Prebid module to do everything&#8212;generate the token, refresh the token, and pass the token into the bid stream?
  - Do you prefer to use the UID2 SDK for JavaScript to generate and refresh the token, and use Prebid to pass the token into the bid stream?

<!-- It includes:

* [Integration Steps: Summary](#integration-steps-summary)
* [Integration Options: Client-Side Token Request](#integration-options-client-side-token-request)
* [Integration Options: Server-Side Token Request](#integration-options-server-side-token-request)
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

1. Review the summary of implementation options and choose the option that's best for you:
   - [Integration Options: Client-Side Token Request](#integration-options-client-side-token-request)
   - [Integration Options: Server-Side Token Request](#integration-options-server-side-token-request)
2. Go to [Integration Details](#integration-details) and choose the section for your option. From there, click through to the step-by-step implementation instructions.

## Integration Options: Client-Side Token Request

The following table summarizes the options for publishers who want to generate the token request on the client side.

| Option | Token Generation managed by | Token Refresh managed by |Passing Token to the Bid Stream |
| :--- |  :--- | :--- | :--- |
| Prebid.js 8.21.0 or later | Prebid.js 8.21.0 or later | Prebid.js 8.21.0 or later | Prebid.js 8.21.0 or later |
| UID2 JS SDK + Prebid.js 7.53.0 or later | UID2 JS SDK | UID2 JS SDK or Prebid.js 7.53.0 or later | Prebid.js 7.53.0 or later |

## Integration Options: Server-Side Token Request

The following table summarizes the options for publishers who want to generate the token request on the server side.

| Option | Token Generation managed by | Token Refresh managed by |Passing Token to the Bid Stream |
| :--- | :--- | :--- | :--- |
| JavaScript SDK | JavaScript SDK | JavaScript SDK |  Publisher's choice. For example, Prebid.js. |
| Java SDK | Java SDK | Java SDK | Publisher's choice.<br/>Can be integrated with Prebid.js. |
| Python SDK | Python SDK | Python SDK | Publisher's choice.<br/>Can be integrated with Prebid.js. |
| Direct integration<br/>(API endpoints) | [POST /token/generate](../endpoints/post-token-generate.md) | [POST /token/refresh](../endpoints/post-token-refresh.md) | Publisher's choice.<br/>Can be integrated with Prebid.js. |

### Options to Generate/Refresh UID2 Token

Integration options for generating and refreshing the token on the client side are as follows.

| Client-Side Token Generation Integration Option | Link to Documentation |
| :--- | :--- |
| Prebid.js UID2 module (latest version; Prebid manages all steps) | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| <ol><li>JavaScript SDK for token generate</li><li>Prebid for bidding (earlier version)</li></ol> | <ol><li>[JavaScript Express Integration Guide](publisher-client-side.md)</li><li>[UID2 Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md)</li></ol> |
| <ol><li>JavaScript SDK for token generate</li><li>Publisher custom implementation for bidding.</li></ol> | [JavaScript Express Integration Guide](publisher-client-side.md) |
| Prebid.js UID2 module | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |

Integration options for generating and refreshing the token on the server side are as follows.

| Server-Side Token Generation Integration Option | Link to Documentation |
| :--- | :--- |
| JavaScript SDK, server-side implementation | Both of the following:<ul><li>[JavaScript Standard Integration Guide](integration-javascript-standard.md)</li><li>[Publisher Integration Guide, Server-Only](custom-publisher-integration.md)</li></ul> |
| JavaScript SDK on the client side and the Java SDK on the server side | Client:&nbsp;[UID2&nbsp;SDK&nbsp;for&nbsp;JavaScript&nbsp;Reference&nbsp;Guide](../sdks/client-side-identity.md)<br/>Server: [UID2 SDK for Java](../sdks/uid2-sdk-ref-java.md) |
| UID2 SDK for Java | [Publisher Integration Guide, Server-Only](custom-publisher-integration.md) |
| UID2 SDK for Python | [Publisher Integration Guide, Server-Only](custom-publisher-integration.md) |
| UID2 API endpoints | [Publisher Integration Guide, Server-Only](custom-publisher-integration.md) |

### Options to Pass the UID2 Token into the Bid Stream

There are many ways that you could pass the UID2 token into the bid stream.

Currently, the recommended option fully supported by code provided by the UID2 team is the UID2 Prebid integration (see [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md)). If you implement the client-side option, the Prebid module supports all key UID2 functions: it generates the token, manages token refresh, and puts the token into the bid stream. If you prefer to manage the UID2 token generation on the server side, you can any of the implementation options with Prebid.js: see [UID2 Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md).

You can also write your own integration to pass the UID2 token into the bid stream.

## Client-Side or Server-Side Integration?

There are two main approaches: you can initiate the UID2 token generate request on the client side or the server side. Each option has different advantages.

**Client-side integration advantages:**
- The code runs on the client side, on the consumer's web page, and no server-side coding is required.
- There is a Prebid integration that handles all functions for you&#8212;token generate, token refresh, and passing the token into the bid stream. As long as you can use Prebid 8.21.0 or later (see [Integration Using Prebid](#integration-using-prebid)), this is the simplest and easiest implementation option.

If you choose a client-side integration, you'll need to provide a list of your top-level domains, for security purposes, as part of account setup. For details, see [Account Setup Details](../getting-started/gs-account-setup.md#account-setup-details).

**Server-side integration advantages:**
- With a server-side integration, you can manage latency by using the nearest UID2 environment. For details, see [Environments](../getting-started/gs-environments.md). <!-- (**GWH_ get review by AT for this doc especially this part per KT**) -->

- For server-side Prebid integration, there is no requirement to update to the latest Prebid version. If you're using Prebid, and have a constraint with regard to version, choose server-side integration.

## Integration Using Prebid

If you want to integrate using Prebid, here are some additional questions you'll need to answer to determine the best integration approach, and some steps to take:

- What Prebid version are you using?
  - If you're using Prebid 8.21.0 or later, you can use the client-side Prebid integration option, which is the simplest and easiest implementation approach.
  - If you're using a version prior to 8.21.0 (7.53.0 or later), and can't easily upgrade, you'll choose a server-side option.
- Domain names:
  - As part of account setup, if you're using the Prebid client-side option, you'll need to provide a list of your top-level domains.
- Are you already using the UID2 JavaScript SDK to generate and refresh the token? If so, you can continue to use the Prebid server-side implementation. For details, see [UID2 Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md).

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
- [POST /token/refresh](../endpoints/post-token-refresh.md)
