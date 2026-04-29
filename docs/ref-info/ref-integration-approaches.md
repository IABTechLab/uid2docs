---
title: Integration Approaches
description: Information about the approaches available for UID2 integration.
hide_table_of_contents: false
sidebar_position: 06
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Integration approaches

For publishers integrating UID2 into their workflows, or advertisers integrating UID2 support, there are three broad integration approaches. UID2 integrations can be implemented entirely on the client side, entirely on the server side, or partially on the client side and partially on the server side (client-server).

For details, see:

- [Client-side integration](#client-side-integration)
- [Client-server integration](#client-server-integration)
- [Server-side integration](#server-side-integration)

## Client-side integration

In a client-side integration, UID2 tokens are generated and refreshed on the client side.

For example:

- Publishers generate UID2 tokens on the client side for bidstream use, as well as refreshing the tokens.
- Advertisers generate UID2 tokens on the client side for tracking pixels.

Examples of documentation for publisher client-side integrations:

- [UID2 client-side integration guide for Prebid.js](../guides/integration-prebid-client-side.md)
- [Client-side integration guide for JavaScript](../guides/integration-javascript-client-side.md)
- [UID2 client-side integration guide for mobile](../guides/integration-mobile-client-side.md)

Advertisers integrating on the client side can use the JavaScript SDK:

- [Client-side integration guide for JavaScript](../guides/integration-javascript-client-side.md)

### Client-side integration: Security values

If you choose a client-side integration, you'll get a client keypair consisting of two values that identify you to the UID2 servers: **Subscription ID** and **Public Key**.

For details, see [Subscription ID and public key](../getting-started/gs-credentials.md#subscription-id-and-public-key).

For added security, you'll need to provide a list of your root-level domains or apps. For details, see:

- For websites: [Client-side web integrations](../getting-started/gs-account-setup.md#client-side-web-integrations).
- For mobile apps: [Client-side mobile integrations](../getting-started/gs-account-setup.md#client-side-mobile-integrations).

## Client-server integration

In a client-server integration, some integration steps are implemented on the client side and others on the server side.

For example, in a client-server integration for a publisher, the UID2 token is generated on the server side and refreshed on the client side.

Examples of documentation for publisher client-server integrations:

- [UID2 client-server integration guide for Prebid.js](../guides/integration-prebid-client-server.md)
- [Client-server integration guide for JavaScript](../guides/integration-javascript-client-server.md)
- [UID2 client-server integration guide for mobile](../guides/integration-mobile-client-server.md)

### Client-server integration: Credentials

If you choose a client-server integration, you'll need to have an **API key** and **client secret**, values that you must store securely.

:::important
Do not embed the credentials in a web page, in mobile app source code, or anywhere else that they could be compromised. Store them securely on your server.
:::

For details, see [API key and client secret](../getting-started/gs-credentials.md#api-key-and-client-secret).

## Server-side integration

You can choose to integrate entirely on the server side.

In a server-side integration, raw UID2s or UID2 tokens are generated and refreshed on the server.

For example, in a server-side integration:

- Publishers generate UID2 tokens on the server side for bidstream use.
- Advertisers generate raw UID2s on the server side to be delivered for audience targeting.

An example of documentation for publisher server-side integration is [Publisher integration guide, server-side](../guides/integration-publisher-server-side.md).

### Server-side integration: Credentials

If you choose a client-side integration, you'll need to have an **API key** and **client secret**, values that you must store securely.

:::important
Do not embed the credentials in a web page, in mobile app source code, or anywhere else that they could be compromised. Store them securely on your server.
:::

For details, see [API key and client secret](../getting-started/gs-credentials.md#api-key-and-client-secret).