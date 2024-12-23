---
title: UID2 Integration Overview for JavaScript
sidebar_label: UID2 Integration Overview for JavaScript
pagination_label: UID2 Integration Overview for JavaScript
description: Overview of options for integrating with the SDK for JavaScript as part of your UID2 implementation.
hide_table_of_contents: false
sidebar_position: 04
---

import Link from '@docusaurus/Link';
import IntegratingWithSSO from '/docs/snippets/_integrating-with-sso.mdx';

# UID2 Integration Overview for JavaScript

This guide is an overview of integration options for publishers who want to integrate with UID2 and generate <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> (advertising tokens) using the SDK for JavaScript.

For a summary of all web options, including Prebid.js and additional SDK options, see [Web Integration Overview](integration-options-publisher-web.md).

## Introduction

UID2 provides an SDK for JavaScript that supports the following:

- [Generating the UID2 token](#generating-the-uid2-token)
- [Refreshing the UID2 token](#refreshing-the-uid2-token)
- [Storing the UID2 token in the browser](#storing-the-uid2-token-in-the-browser)

For additional flexibility, UID2 also provides alternative methods for some of the features and complementary products, such as a Prebid integration.

## Client-Side or Client-Server Integration

The options for integrating with UID2 using the SDK for JavaScript are summarized in the following table. Choose the option that's best for you.

| Scenario | Option | Integration Guide |
| :--- | :--- | :--- |
| You have access to DII on the client side and want to do front-end development only. | Client-side integration | [Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md) |
| You have access to DII on the server side and can do server-side development, or you are using a <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link>. | Server-side integration | [Client-Server Integration Guide for JavaScript](integration-javascript-client-server.md) |

## Generating the UID2 Token

Depending on access to <Link href="../ref-info/glossary-uid#gl-dii">DII</Link>, there are two methods to generate UID2 tokens using the SDK for JavaScript: client-side or server-side.

From the table in [Client-Side or Client-Server Integration](#client-side-or-client-server-integration), determine which option is best for you, and then follow the applicable integration guide.

## Refreshing the UID2 Token

The SDK for JavaScript includes automated <a href="../ref-info/glossary-uid#gl-token-refresh">token refresh</a>.

## Storing the UID2 Token in the Browser
<!-- GWH check corresponding (not identical) section in integration-prebid.md, integration-prebid-client-side.md, integration-prebid-client-side.md, for consistency -->

The client-side option stores data using local storage. The client-server option uses local storage by default, but you can also choose to use a cookie instead. For details, see [UID2 Storage Format](../sdks/sdk-ref-javascript.md#uid2-storage-format) in the *SDK for JavaScript Reference Guide*.

The cookie size can be significant, which could be a problem. However, if local storage is not an option, this is one possible approach.

## Passing the UID2 Token to the Bidstream

The JavaScript SDK manages generating, refreshing, and storing the UID2 token, but it does not manage passing the token to the <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link>.

You can pass the token into the bidstream using any option you choose&#8212;for example, Prebid.js. For some suggestions, see [Pass the UID2 Token Into the Bidstream](integration-options-publisher-web.md#pass-the-uid2-token-into-the-bidstream) in the *Web Integration Overview*.

## JavaScript Integration Overview: High-Level Steps

At a high level, to integrate your site with UID2 using the SDK for JavaScript, you'll need to complete the following steps:

1. Complete UID2 account setup.
1. Add the SDK to your site.
1. Configure the SDK.

For detailed instructions, refer to one of the following integration guides:

- [Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md)
- [Client-Server Integration Guide for JavaScript](integration-javascript-client-server.md)

## Integrating with SSO

<IntegratingWithSSO />
