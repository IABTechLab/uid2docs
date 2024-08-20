---
title: CTV Integration Guide
sidebar_label: CTV
pagination_label: CTV Integration Guide
description: Summary of options for UID2 mobile integration.
hide_table_of_contents: false
sidebar_position: 04
---

import Link from '@docusaurus/Link';

# CTV Integration Guide

If you're a CTV publisher, there are several ways that you can integrate with UID2 to generate and refresh identity tokens to be passed into the RTB bidstream in the context of your CTV apps.

## Key Integration Steps
At a high level, to integrate with UID2, you'll implement these three key steps: 

1. Generate the UID2 token.
1. Refresh the UID2 token as needed.
1. Pass the UID2 token into the bidstream.

To determine how you'll implement these steps, choose from the [CTV Integration Options](#ctv-integration-options).

## CTV Integration Options

You can decide on the integration option that's best for you based on where you want to generate and refresh the UID2 token. There are three options, as follows:

- [Client-Side Integration](#client-side-integration-for-ctv-apps) (the token is generated and refreshed on the client side)
- [Server-Side Integration](#server-side-integration-for-ctv-apps) (the token is generated and refreshed on the server side)
- [Client-Server Integration](#client-server-integration-for-ctv-apps) (the token is generated on the server side and refreshed on the client side)

## Client-Side Integration for CTV Apps

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

## Server-Side Integration for CTV Apps

The server-side option is for publishers who want to manage the UID2 token entirely on the server side:

- The token is generated on the server side.
- The token is refreshed as needed on the server side.

This setup requires that most of the code changes are done on the server side, with minimal changes in the CTV app.

Another advantage of this approach is that if you're dealing with multiple platforms (Web / CTV / mobile), doing everything on the server side can reduce platform-specific efforts.

To implement using this approach, follow the instructions in [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md).

If your server-side code is in Java or Python, you can use one of the UID2 SDKs to make the HTTP requests to UID2, instead of writing your own source code. For details, refer to one of the following SDK guides:

- [SDK for Java Reference Guide: Usage for Publishers](../sdks/sdk-ref-java.md#usage-for-publishers)
- [SDK for Python Reference Guide: Usage for Publishers](../sdks/sdk-ref-python.md#usage-for-publishers)

## Client-Server Integration for CTV Apps

This option is for publishers who want to manage the UID2 tokens with a client-server approach:

- The token is generated on the server side.
- The token is refreshed as needed on the client side, from within the CTV app.

To implement using this approach, follow the instructions in the [UID2 Client-Server Integration Guide for Mobile](integration-mobile-client-server.md).

The following table shows supported operating systems, with links to applicable documentation resources.

| Operating System | Integration Guide | Link to SDK Guide |
| :--- | :--- | :--- |
| [Apple tvOS](https://developer.apple.com/tvos/) | [UID2 Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md) | [SDK for iOS Reference Guide](../sdks/sdk-ref-ios.md) |
| [Android TV](https://www.android.com/tv/) | [UID2 Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md) | [SDK for Android Reference Guide](../sdks/sdk-ref-android.md) |
