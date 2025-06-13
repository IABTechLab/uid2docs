---
title: CTV Integration Guide
sidebar_label: CTV
pagination_label: CTV Integration Guide
description: Summary of options for UID2 mobile integration.
hide_table_of_contents: false
sidebar_position: 04
---

import Link from '@docusaurus/Link';
import IntegratingWithSSO from '../snippets/_integrating-with-sso.mdx';
import PrivateOperatorOption from '../snippets/_private-operator-option.mdx';

# CTV Integration Guide

If you're a Connected TV (CTV) publisher, there are several ways that you can integrate with UID2 to generate and refresh identity tokens to be passed into the RTB bidstream in the context of your CTV apps.

## Key Integration Steps
At a high level, to integrate with UID2, you'll implement these three key steps: 

1. Generate the UID2 token.
1. Refresh the UID2 token as needed.
1. Pass the UID2 token into the bidstream.

To determine how you'll implement these steps, choose from the [CTV Integration Options](#ctv-integration-options).

## Integrating with Single Sign-On (SSO)

<IntegratingWithSSO />

## Private Operator Option

<PrivateOperatorOption/>

## Complete UID2 Account Setup and Configure Account

To integrate with UID2, you'll need to have a UID2 account. If you haven't yet created an account, first follow the steps described on the [Account Setup](../getting-started/gs-account-setup.md) page.

When initial account setup is complete, you'll receive instructions and a link to access the [UID2 Portal](../portal/portal-overview.md), where you can create your [credentials](../getting-started/gs-credentials.md) for the production environment and configure additional values, if needed. For details, see [Getting Started with the UID2 Portal](../portal/portal-getting-started.md).

The specific values you set up will depend on which of the [CTV integration options](#ctv-integration-options) you choose:

- For a client-server or server-side implementation, you'll need to set up these values, in the UID2 Portal on the [API Keys](../portal/api-keys.md) page:
  - <Link href="../ref-info/glossary-uid#gl-api-key">API key</Link>, also called a client key
  - <Link href="../ref-info/glossary-uid#gl-client-secret">Client secret</Link>, a value known only to the participant and the UID2 service

    :::important
    It's very important that you keep these values secure. For details, see [Security of API Key and Client Secret](../getting-started/gs-credentials.md#security-of-api-key-and-client-secret).
    :::
- For a client-side implementation, you'll need to set up these values, in the UID2 Portal on the [Client-Side Integration](../portal/client-side-integration.md) page:
  - Subscription ID and Public Key: See [Adding and Managing Key Pairs](../portal/client-side-integration.md#adding-and-managing-key-pairs)
  - A list of **domain names** for any sites on which you'll be using this SDK: See [Adding and Managing Root-Level Domains](../portal/client-side-integration.md#adding-and-managing-root-level-domains)
  - Mobile App IDs (any that apply): See [Adding and Managing Mobile App IDs](../portal/client-side-integration.md#adding-and-managing-mobile-app-ids)

## CTV Integration Options

You can decide on the integration option that's best for you based on where you want to generate and refresh the UID2 token. There are three options, as shown in the following table.

| Option | Details |
| :--- | :--- |
| [Client-Side Integration](#client-side-integration-for-ctv-apps) | The token is generated and refreshed on the client side. |
| [Server-Side Integration](#server-side-integration-for-ctv-apps) | The token is generated and refreshed on the server side. |
| [Client-Server Integration](#client-server-integration-for-ctv-apps) | The token is generated on the server side and refreshed on the client side. |

### Client-Side Integration for CTV Apps

The client-side option is for publishers who want to manage the UID2 token entirely on the client side:

- The token is generated on the client side, in the CTV app.
- The token is refreshed as needed on the client side, from within the CTV app.

This setup requires that all code changes are done within the CTV app.

To implement using this approach, follow the instructions in the [UID2 Client-Side Integration Guide for Mobile](integration-mobile-client-side.md).

The following table shows supported operating systems, with links to applicable documentation resources.

| Operating System | Integration Guide | Link to SDK Guide |
| :--- | :--- | :--- |
| [Apple tvOS](https://developer.apple.com/tvos/) | [UID2 Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md) | [SDK for iOS Reference Guide](../sdks/sdk-ref-ios.md) |
| [Android TV](https://www.android.com/tv/) | [UID2 Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md) | [SDK for Android Reference Guide](../sdks/sdk-ref-android.md) |

### Server-Side Integration for CTV Apps

The server-side option is for publishers who want to manage the UID2 token entirely on the server side:

- The token is generated on the server side.
- The token is refreshed as needed on the server side.

This setup requires that most of the code changes are done on the server side, with minimal changes in the CTV app.

Another advantage of this approach is that if you're dealing with multiple platforms (Web / CTV / mobile), doing everything on the server side can reduce platform-specific efforts.

To implement using this approach, follow the instructions in [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md).

If your server-side code is in Java or Python, you can use one of the UID2 SDKs to make the HTTP requests to UID2, instead of writing your own source code. For details, refer to one of the following SDK guides:

- [SDK for Java Reference Guide: Usage for Publishers](../sdks/sdk-ref-java.md#usage-for-publishers)
- [SDK for Python Reference Guide: Usage for Publishers](../sdks/sdk-ref-python.md#usage-for-publishers)

### Client-Server Integration for CTV Apps

This option is for publishers who want to manage the UID2 tokens with a client-server approach:

- The token is generated on the server side.
- The token is refreshed as needed on the client side, from within the CTV app.

To implement using this approach, follow the instructions in the [UID2 Client-Server Integration Guide for Mobile](integration-mobile-client-server.md).

The following table shows supported operating systems, with links to applicable documentation resources.

| Operating System | Integration Guide | Link to SDK Guide |
| :--- | :--- | :--- |
| [Apple tvOS](https://developer.apple.com/tvos/) | [UID2 Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md) | [SDK for iOS Reference Guide](../sdks/sdk-ref-ios.md) |
| [Android TV](https://www.android.com/tv/) | [UID2 Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md) | [SDK for Android Reference Guide](../sdks/sdk-ref-android.md) |

## Best Practices

The following points are best practices for CTV integrations:

- **Rotate tokens well in advance**

  You can refresh the UID2 token at any time that's strategic. If the token was refreshed before its expiration date, both new and old tokens are usable for a while, until the old token expires. The TTL (time to live) timestamp is part of the response body returned by the UID2 Operator when the token is generated or refreshed.
  
  Top CTV ad activity is tied to traffic spikes during ad breaks; generating or refreshing UID2 tokens during these times is not ideal. Because of this, we recommend that you plan to have tokens generated or refreshed before these busy times.

- **Rotate tokens only when needed**

  The UID2 token is tied to a user's HEM or phone, not to the viewing session or app session. As long as you have a valid UID2 token for the user, there is no need to generate new UID2 for each new viewing session or app session. For example, if the user leaves your app and then opens the app again, there is no need to generate a new UID2 if the existing one is still fresh.

- **Use the same token for multiple ad slots within a pod**

  As long as the UID2 token is valid throughout the pod duration, you can use it for any ad slot within the pod.

Ideally, if you follow these guidelines, there is no need to generate a new UID2 token during an ad break.
