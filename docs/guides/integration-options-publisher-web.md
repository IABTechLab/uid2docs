---
title: Publisher Web Integration Overview
description: Overview of the publisher options for UID2 web integration.
hide_table_of_contents: false
sidebar_position: 02
displayed_sidebar: sidebarPublishers
---

import Link from '@docusaurus/Link';

# Publisher Web Integration Overview

As a publisher, there are many ways that you can integrate with UID2 to generate identity tokens to be passed into the RTB <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link> in the context of your web pages.

On this page, you'll find a high-level overview of integration steps and integration options, with links to additional information for each option.

## Key Integration Steps

At a high level, to integrate with UID2, you'll implement these three key activities:

1. [Generate the UID2 token](#generate-the-uid2-token)
1. [Refresh the UID2 token as needed](#refresh-the-uid2-token)
1. [Pass the UID2 token into the bidstream](#pass-the-uid2-token-into-the-bidstream)

There are many ways you can accomplish these key steps. The simplest and fastest implementation is a full client-side implementation using Prebid.js 8.21.0 or later.

## Integration Options Summary

The following table summarizes the solutions available for each integration step.

To accomplish all steps, you can combine solutions. For example, you could use the SDK for JavaScript, client-side, to generate and refresh the token, and Google Ad Manager Secure Signals to pass the token to the bidstream.

| Integration Solution | Generate Token | Refresh Token |Pass Token to the Bidstream |
| :--- | :--- | :--- | :--- |
| [Prebid.js client-side (8.21.0 or later)](integration-prebid-client-side.md) | &#9989; | &#9989; | &#9989; |
| [Prebid.js client-server (7.53.0 or later)](integration-prebid-client-server.md) | &#8212; | &#9989; | &#9989; |
| [SDK for JavaScript, client-side](integration-javascript-client-side.md) | &#9989; | &#9989; | &#8212; |
| [SDK for JavaScript, client-server](integration-javascript-client-server.md) | &#9989; | &#9989; | &#8212; |
| [SDK for Java](../sdks/sdk-ref-java.md) | &#9989; | &#9989; | &#8212; |
| [SDK for Python](../sdks/sdk-ref-python.md) | &#9989; | &#9989; | &#8212; |
| [Direct integration (API endpoints)](integration-publisher-server-side.md) | &#9989; | &#9989; | &#8212; |
| [Google Ad Manager Secure Signals](integration-google-ss.md) | &#8212; | &#8212; | &#9989; |

<!-- &#9989; = Supported | &#8212; = Not Supported -->

## Publisher Web Options Workflow

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
- There is a Prebid.js integration that handles all functions for you&#8212;token generation, token refresh, and passing the token into the bidstream. If you use Prebid.js 8.21.0 or later, this is the simplest and fastest implementation option.

If you choose a client-side integration, you'll need to provide a list of your root-level domains, for security purposes, as part of account setup. For details, see [Client-Side Web Integrations](../getting-started/gs-account-setup.md#client-side-web-integrations) on the Account Setup page.

The following table summarizes the options for publishers who want to generate the UID2 token on the client side, via the web page, with corresponding documentation resources.

| Option | Documentation |
| :--- | :--- |
| Prebid.js client-side implementation (8.21.0 or later) | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| SDK for JavaScript, client-side implementation | [Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md) |

### Server-Side Integration Options

Generating the UID2 token on the server side has the following advantages:

- You can keep your <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> entirely on the server side.
- If your development resources are back-end developers, you might prefer a server-side integration.
- For server-side Prebid.js integration, there is no requirement to update to the latest Prebid.js version, as long as your version is 7.53.0 or later.

The following table summarizes the options for publishers who want to generate the UID2 token on the server side.

| Option | Documentation |
| :--- | :--- |
| SDK for JavaScript, client-server implementation | [Client-Server Integration Guide for JavaScript](integration-javascript-client-server.md) |
| SDK for Java | - [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md)<br/>- [SDK for Java](../sdks/sdk-ref-java.md) |
| SDK for Python | - [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md)<br/>- [SDK for Python](../sdks/sdk-ref-python.md)  |
| Direct integration (API endpoints) | [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md) |

## Refresh the UID2 Token

For security reasons, the UID2 token has a limited life, but there is a built-in mechanism to refresh the token so that you can still use it.

When you get the token, it comes with a refresh token and a timestamp indicating how long the token is valid for. As long as you use the refresh token to generate a new UID2 token before the current UID2 token expires, you'll get a new UID2 token and an updated refresh token each time. You can continue to refresh to keep the information valid.

The following table shows the integration options that support refreshing the UID2 token.

| Option | Documentation |
| :--- | :--- |
| Prebid.js client-side implementation (8.21.0 or later) | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| Prebid.js client-server implementation (7.53.0 or later) | [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md) |
| SDK for JavaScript, client-side implementation | [Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md) |
| SDK for JavaScript, client-server implementation | [Client-Server Integration Guide for JavaScript](integration-javascript-client-server.md) |
| SDK for Java | - [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md)<br/>- [SDK for Java](../sdks/sdk-ref-java.md) |
| SDK for Python | - [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md)<br/>- [SDK for Python](../sdks/sdk-ref-python.md)  |
| Direct integration (API endpoints) | [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md) |

## Pass the UID2 Token Into the Bidstream

Publishers use UID2s by encrypting DII (email addresses or phone numbers) into UID2 tokens and then sending the UID2 tokens into the bidstream.

The following table shows integration options that support passing UID2 token into the bidstream.

| Option | Documentation |
| :--- | :--- |
| Prebid.js client-side implementation (8.21.0 or later) | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| Prebid.js client-server implementation (7.53.0 or later) | [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md) |
| Google Ad Manager Secure Signals| [Google Ad Manager Secure Signals Integration Guide](integration-google-ss.md) |

:::note
As long as you generate the token and keep it refreshed, you can also use other options for passing the UID2 token into the bidstream.
:::
