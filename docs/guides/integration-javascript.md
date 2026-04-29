---
title: UID2 Integration Overview for JavaScript
sidebar_label: UID2 Integration Overview for JavaScript
pagination_label: UID2 Integration Overview for JavaScript
description: Overview of options for integrating with the SDK for JavaScript as part of your UID2 implementation.
hide_table_of_contents: false
sidebar_position: 04
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import SnptIntegratingWithSSO from '../snippets/_snpt-integrating-with-sso.mdx';
import SnptPreparingEmailsAndPhoneNumbers from '../snippets/_snpt-preparing-emails-and-phone-numbers.mdx';

# UID2 integration overview for JavaScript

This guide is an overview of integration options for publishers who want to integrate with UID2 and generate <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> (advertising tokens) using the SDK for JavaScript.

For a summary of all web options, including Prebid.js and additional SDK options, see [Publisher web integration overview](integration-options-publisher-web.md).

## Introduction

UID2 provides an SDK for JavaScript that supports the following:

- [Generating the UID2 token](#generating-the-uid2-token)
- [Refreshing the UID2 token](#refreshing-the-uid2-token)
- [Storing the UID2 token in the browser](#storing-the-uid2-token-in-the-browser)

For additional flexibility, UID2 also provides alternative methods for some of the features and complementary products, such as a Prebid integration.

## Integrating with single sign-on (SSO)

<SnptIntegratingWithSSO />

## Preparing DII for processing

<SnptPreparingEmailsAndPhoneNumbers />

## Client-side or client-server integration

The options for integrating with UID2 using the SDK for JavaScript are summarized in the following table. Choose the option that's best for you.

| Scenario | Option | Integration Guide |
| :--- | :--- | :--- |
| You have access to DII on the client side and want to do front-end development only. | Client-side integration | [Client-side integration guide for JavaScript](integration-javascript-client-side.md) |
| You have access to DII on the server side and can do server-side development, or you are using a <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link>. | Client-server integration | [Client-server integration guide for JavaScript](integration-javascript-client-server.md) |

## Complete UID2 account setup and configure account

To integrate with UID2, you'll need to have a UID2 account. If you haven't yet created an account, first follow the steps described on the [Account setup](../getting-started/gs-account-setup.md) page.

When initial account setup is complete, you'll receive instructions and a link to access the [UID2 portal](../portal/portal-overview.md), where you can create your [credentials](../getting-started/gs-credentials.md) for the production environment and configure additional values, if needed. For details, see [Getting started with the UID2 portal](../portal/portal-getting-started.md).

The steps you'll take in the UID2 Portal are different depending on whether your implementation will be client-side, client-server, or server-side. Specific instructions are in each implementation guide.

## Generating the UID2 token

Depending on access to <Link href="../ref-info/glossary-uid#gl-dii">DII</Link>, there are two methods to generate UID2 tokens using the SDK for JavaScript: client-side or server-side.

From the table in [Client-side or client-server integration](#client-side-or-client-server-integration), determine which option is best for you, and then follow the applicable integration guide.

## Refreshing the UID2 token

The SDK for JavaScript includes automated <a href="../ref-info/glossary-uid#gl-token-refresh">token refresh</a>.

## Storing the UID2 token in the browser
<!-- GWH check corresponding (not identical) section in integration-prebid.md, integration-prebid-client-side.md, integration-prebid-client-side.md, for consistency -->

The client-side option stores data using local storage. The client-server option uses local storage by default, but you can also choose to use a cookie instead. For details, see [UID2 storage format](../sdks/sdk-ref-javascript.md#uid2-storage-format) in the *SDK for JavaScript Reference Guide*.

The cookie size can be significant, which could be a problem. However, if local storage is not an option, this is one possible approach.

## Passing the UID2 token to the bidstream

The JavaScript SDK manages generating, refreshing, and storing the UID2 token, but it does not manage passing the token to the <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link>.

You can pass the token into the bidstream using any option you choose&#8212;for example, Prebid.js. For some suggestions, see [Pass the UID2 token into the bidstream](integration-options-publisher-web.md#pass-the-uid2-token-into-the-bidstream) in the *Publisher Web Integration Overview*.

## JavaScript integration overview: High-level steps

At a high level, to integrate your site with UID2 using the SDK for JavaScript, you'll need to complete the following steps:

1. Complete UID2 account setup.
1. Add the SDK to your site.
1. Configure the SDK.

For detailed instructions, refer to one of the following integration guides:

- [Client-side integration guide for JavaScript](integration-javascript-client-side.md)
- [Client-server integration guide for JavaScript](integration-javascript-client-server.md)
