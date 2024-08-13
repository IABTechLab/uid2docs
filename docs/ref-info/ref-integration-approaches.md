---
title: Integration Approaches
description: Information about the approaches available for UID2 integration.
hide_table_of_contents: false
sidebar_position: 06
---

import Link from '@docusaurus/Link';

# Integration Approaches

For publishers integrating UID2 into their workflows, or advertisers integrating UID2 support, there are three broad integration approaches. UID2 integrations can be implemented entirely on the client side, entirely on the server side, or partially on the client side and partially on the server side (client-server).

For details, see:

- [Client-side integration](#client-side-integration)
- [Client-server integration](#client-server-integration)
- [Server-side integration](#server-side-integration)

## Client-Side Integration

In a client-side integration, UID2 tokens are generated and refreshed on the client side.

For example:

- Publishers generate UID2 tokens on the client side for bidstream use, as well as refreshing the tokens.
- Advertisers generate UID2 tokens on the client side for tracking pixels.

Examples of documentation for publisher client-side integrations:

- [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md)
- [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md)
- [UID2 Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md)

Advertisers integrating on the client side can use the JavaScript SDK:

- [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md)

### Client-Side Integration: Security Values

If you choose a client-side integration, you'll get a client keypair consisting of two values that identify you to the UID2 servers: **Subscription ID** and **Public Key**.

For details, see [Subscription ID and Public Key](../getting-started/gs-credentials.md#subscription-id-and-public-key).

For added security, you'll need to provide a list of your root-level domains or apps. For details, see:

- For websites: [Client-Side Implementation for Publishers](../getting-started/gs-account-setup.md#client-side-implementation-for-publishers).
- For mobile apps: [Client-Side Mobile Integrations](../getting-started/gs-account-setup.md#client-side-mobile-integrations).

## Client-Server Integration

In a client-server integration, some integration steps are implemented on the client side and others on the server side.

For example, in a client-server integration for a publisher, the UID2 token is generated on the server side and refreshed on the client side.

Examples of documentation for publisher client-server integrations:

- [UID2 Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-client-server.md)
- [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md)
- [UID2 Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md)

### Client-Server Integration: Credentials

If you choose a client-server integration, you'll need to have an **API key** and **client secret**, values that you must store securely.

:::important
Do not embed the credentials in a web page, in mobile app source code, or anywhere else that they could be compromised. Store them securely on your server.
:::

For details, see [API Key and Client Secret](../getting-started/gs-credentials.md#api-key-and-client-secret).

## Server-Side Integration

You can choose to integrate entirely on the server side.

In a server-side integration, raw UID2s or UID2 tokens are generated and refreshed on the server.

For example, in a server-side integration:

- Publishers generate UID2 tokens on the server side for bidstream use.
- Advertisers generate raw UID2s on the server side to be delivered for audience targeting.

An example of documentation for publisher server-side integration is [Publisher Integration Guide, Server-Side](../guides/integration-publisher-server-side.md).

### Server-Side Integration: Credentials

If you choose a client-side integration, you'll need to have an **API key** and **client secret**, values that you must store securely.

:::important
Do not embed the credentials in a web page, in mobile app source code, or anywhere else that they could be compromised. Store them securely on your server.
:::

For details, see [API Key and Client Secret](../getting-started/gs-credentials.md#api-key-and-client-secret).