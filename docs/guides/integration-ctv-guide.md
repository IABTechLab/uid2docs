---
title: CTV Integration Guide
sidebar_label: CTV Integration Guide
pagination_label: CTV Integration Guide
description: Summary of options for UID2 mobile integration.
hide_table_of_contents: false
sidebar_position: 04
displayed_sidebar: sidebarPublishers
---

import Link from '@docusaurus/Link';

# CTV Integration Guide

If you're a CTV publisher, there are several ways that you can integrate with UID2 to generate and refresh identity tokens to be passed into the RTB bidstream in the context of your CTV apps.

## Key Integration Steps
At a high level, to integrate with UID2, you'll implement these three key activities: 

1. Generate the UID2 token.
1. Refresh the UID2 token as needed.
1. Pass the UID2 token into the bidstream.

To determine how you'll implement these steps, choose from the [CTV Integration Options](#ctv-integration-options).

## CTV Integration Options

You can decide on the integration option that's best for you based on where you want to generate and refresh the UID2 token, as shown in the following table.

In this table, "client-side" means the CTV application.

| Integration Option | Token Is Generated... | Token Is Refreshed... |
| :--- | :--- | :--- |
| [Client-Side Integration](#client-side-integration-for-ctv-apps) | On the client side | On the client side |
| [Server-Side Integration](#server-side-integration-for-ctv-apps) | On the server side | On the server side |
| [Client-Server Integration](#client-server-integration-for-ctv-apps) | On the server side | On the client side |

## Client-Side Integration for CTV Apps

The client-side option is for publishers who want to perform both activities on the client side: generate the UID2 token, and then refresh the UID2 token as needed, in the CTV application.

This setup requires that all code changes are done on the client side.

To implement using this approach, follow the instructions in the [UID2 Client-Side Integration Guide for Mobile](integration-mobile-client-side.md).

:::note
The UID2 iOS SDK is also compatible with [Apple tvOS](https://developer.apple.com/tvos/). Similarly, the UID2 Android SDK is compatible with [Android TV](https://www.android.com/tv/).
:::

## Server-Side Integration for CTV Apps

The server-side option is for publishers who want to perform both activities on the server side: generate the UID2 token, and refresh as needed, on the server side.

This setup requires that most of the code changes are done on the server side, with minimal changes in the CTV application.

To implement using this approach, follow the instructions in [Publisher Integration Guide, Server-Side](custom-publisher-integration.md).

If your server-side code is in Java or Python, you can use one of the UID2 SDKs to make the HTTP requests to UID2, instead of writing your own source code. For details, refer to one of the following SDK guides:

- [UID2 SDK for Java Reference Guide: Usage for Publishers](../sdks/uid2-sdk-ref-java.md#usage-for-publishers)
- [UID2 SDK for Python Reference Guide: Usage for Publishers](../sdks/uid2-sdk-ref-python.md#usage-for-publishers)

## Client-Server Integration for CTV Apps

The client-server option is for publishers who want to generate UID2 tokens on the server side and then refresh them as needed from within the CTV application.

If your CTV application is mobile based, to implement using this approach, follow the instructions in the[ UID2 Client-Server Integration Guide for Mobile](integration-mobile-client-server.md).

:::note
The UID2 iOS SDK is also compatible with [Apple tvOS](https://developer.apple.com/tvos/). Similarly, the UID2 Android SDK is compatible with [Android TV](https://www.android.com/tv/).
:::
