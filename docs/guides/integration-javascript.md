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
<!-- 
It includes the following sections:

- [Introduction](#introduction)
- [UID2 User ID Submodule](#uid2-user-id-submodule)
- [Generating the UID2 Token](#generating-the-uid2-token)
- [Refreshing the UID2 Token](#refreshing-the-uid2-token)
- [Storing the UID2 Token in the Browser](#storing-the-uid2-token-in-the-browser)
- [Passing the UID2 Token to the Bid Stream](#passing-the-uid2-token-to-the-bid-stream)
- [Integration Overview: High-Level Steps](#integration-overview-high-level-steps)

 -->
## Introduction

UID2 provides an SDK for JavaScript that supports the following:

- [Generating the UID2 token](#generating-the-uid2-token)
- [Refreshing the UID2 token](#refreshing-the-uid2-token)
- [Storing the UID2 token in the browser](#storing-the-uid2-token-in-the-browser)
- [Passing the UID2 token to the bid stream](#passing-the-uid2-token-to-the-bid-stream)

For additional flexibility, UID2 also provides alternative methods for some of the features and complementary products, such as a Prebid integration.

## UID2 User ID Submodule

The UID2 SDK for JavaScript handles storing, providing, and optionally refreshing UID2 tokens.

:::caution
UID2 is not designed to be used where GDPR applies. The module checks the consent data that's passed in, and does not operate if the `gdprApplies` flag is set to `true`.
:::

## Generating the UID2 Token

Depending on access to DII, there are two methods to generate UID2 tokens using the UID2 SDK for JavaScript, as shown in the following table.

Determine which method is best for you, and then follow the applicable integration guide.

| Scenario | Integration Guide |
| :--- | :--- |
| You have access to DII on the client side and want to do front-end development only | [xxx](publisher-client-side.md) |
| You have access to DII on the server side and can do server-side development | [xxx](integration-javascript-server-side.md) |

## Refreshing the UID2 Token

The UID2 SDK for JavaScript can automatically refresh the UID2 tokens. If you prefer to implement manual refresh, see [Refreshing a UID2 Token xxx CHECK UPTOHERE GEN](integration-javascript-server-side.md#refreshing-a-uid2-token) in the Server-Side Integration Guide. The client-side integration solution includes automated token refresh.

## Storing the UID2 Token in the Browser
<!-- GWH same section in integration-prebid.md, integration-prebid-client-side.md, and integration-prebid-client-side.md. Ensure consistency -->
By default, the UID2 SDK for JavaScript stores data using local storage. To use a cookie instead, set `params.storage` to `cookie`, as shown in the following example.

**UPTOHERE CHECK JS DOCS FOR EXAMPLE??? OR REFER TO THE JS DOCS. OR SOMETHING**

```js
pbjs.setConfig({ 
  userSync: { 
    userIds: [{ 
      name: 'uid2', 
      params: { 

                 //default value is ‘localStorage’ 
        storage: ‘cookie’  
      } 
    }] 
  } 
}); 
```

The cookie size can be significant, which could be a problem. However, if local storage is not an option, this is one possible approach.

## Passing the UID2 Token to the Bid Stream

To configure the UID2 module, call `pbjs.setConfig`. For details on supported parameters, refer to the guide that applies to your implementation: UPTOHERE CHFIX TITLES

- [Client-Side Integration Guide for JavaScript](publisher-client-side.md)
- [Server-Side Integration Guide for JavaScript](integration-javascript-server-side.md)

When the UID2 module is configured, it manages a UID2 token for the user and stores it in the user's browser. 

When generating tokens with Client Refresh mode on the client side or on the server side, the UID2 SDK for JavaScript client-side integration automatically takes care of refreshing the token as long as your site is open in the user's browser. However, you also have the option to manage the token refresh on the server side. For details, see [Refresh Tokens](integration-javascript-server-side.md#refresh-tokens) in the Server-Side Integration Guide for JavaScript. The client-side integration solution includes automated token refresh.

## Integration Overview: High-Level Steps

At a high level, to integrate your site with UID2 using the UID2 SDK for JavaScript, you'll need to complete the following steps:

1. Complete UID2 account setup.
1. Add the SDK to your site.
1. Configure the SDK.

For detailed instructions, refer to one of the following integration guides:

- [Client-Side Integration Guide for JavaScript](publisher-client-side.md)
- [Server-Side Integration Guide for JavaScript](integration-javascript-server-side.md)
