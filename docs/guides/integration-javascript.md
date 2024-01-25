---
title: UID2 Integration Overview for JavaScript
sidebar_label: UID2 Integration Overview for JavaScript
pagination_label: UID2 Integration Overview for JavaScript
description: Overview of options for integrating with the UID2 SDK for JavaScript as part of your UID2 implementation.
hide_table_of_contents: false
sidebar_position: 04
---

# UID2 Integration Overview for JavaScript

This guide is an overview of integration options for publishers who want to integrate with UID2 and generate [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) (advertising tokens) using the UID2 SDK for JavaScript.

For a summary of all web options, including Prebid.js and additional SDK options, see [Web Integration Overview](integration-options-publisher-web.md).

## Introduction

UID2 provides an SDK for JavaScript that supports the following:

- [Generating the UID2 token](#generating-the-uid2-token)
- [Refreshing the UID2 token](#refreshing-the-uid2-token)
- [Storing the UID2 token in the browser](#storing-the-uid2-token-in-the-browser)

For additional flexibility, UID2 also provides alternative methods for some of the features and complementary products, such as a Prebid integration.

## Client-Side or Server-Side Integration

The options for integrating with UID2 using the UID2 SDK for JavaScript are summarized in the following table. Choose the option that's best for you.

| Scenario | Option | Integration Guide |
| :--- | :--- | :--- |
| You have access to DII on the client side and want to do front-end development only. | Client-side integration | [Client-Side Integration Guide for JavaScript](publisher-client-side.md) |
| You have access to DII on the server side and can do server-side development, or you are using a [Private Operator](../ref-info/glossary-uid.md#gl-private-operator). | Server-side integration | [Server-Side Integration Guide for JavaScript](integration-javascript-server-side.md) |

## Generating the UID2 Token

Depending on access to [DII](../ref-info/glossary-uid.md#gl-dii), there are two methods to generate UID2 tokens using the UID2 SDK for JavaScript: client-side or server-side.

From the table in [Client-Side or Server-Side Integration](#client-side-or-server-side-integration), determine which option is best for you, and then follow the applicable integration guide.

## Refreshing the UID2 Token

The UID2 SDK for JavaScript includes automated token refresh.

## Storing the UID2 Token in the Browser
<!-- GWH check corresponding (not identical) section in integration-prebid.md, integration-prebid-client-side.md, integration-prebid-client-side.md, for consistency -->

The client-side option stores data using local storage. The server-side option uses local storage by default, but you can also choose to use a cookie instead. For details, see [UID2 Storage Format](../sdks/client-side-identity.md#uid2-storage-format) in the *UID2 SDK for JavaScript Reference Guide*.

The cookie size can be significant, which could be a problem. However, if local storage is not an option, this is one possible approach.

## Passing the UID2 Token to the Bid Stream

The JavaScript SDK manages generating, refreshing, and storing the UID2 token, but it does not manage passing the token to the bid stream.

You can pass the token into the bid stream using any option you choose&#8212;for example, Prebid.js. For some suggestions, see [Pass the UID2 Token Into the Bid Stream](integration-options-publisher-web.md#pass-the-uid2-token-into-the-bid-stream) in the *Web Integration Overview*.

## JavaScript Integration Overview: High-Level Steps

At a high level, to integrate your site with UID2 using the UID2 SDK for JavaScript, you'll need to complete the following steps:

1. Complete UID2 account setup.
1. Add the SDK to your site.
1. Configure the SDK.

For detailed instructions, refer to one of the following integration guides:

- [Client-Side Integration Guide for JavaScript](publisher-client-side.md)
- [Server-Side Integration Guide for JavaScript](integration-javascript-server-side.md)
