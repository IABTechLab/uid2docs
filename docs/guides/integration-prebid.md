---
title: Prebid.js Integration Overview
sidebar_label: Prebid.js Integration Overview
pagination_label: Prebid.js Integration Overview
description: Overview of options for integrating with Prebid.js as part of your UID2 implementation.
hide_table_of_contents: false
sidebar_position: 04
---

# Prebid.js Integration Overview

This guide is an overview of integration options for publishers who want to integrate with UID2 and generate [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) (advertising tokens) to be passed by Prebid.js in the RTB bid stream.

It includes the following sections:

- [Introduction](#introduction)
- [Generating the UID2 Token](#generating-the-uid2-token)
- [Refreshing the UID2 Token](#refreshing-the-uid2-token)
- [Storing the UID2 Token in the Browser](#storing-the-uid2-token-in-the-browser)
- [Passing the UID2 Token to the Bid Stream](#passing-the-uid2-token-to-the-bid-stream)
- [Integration Overview: High-Level Steps](#integration-overview-high-level-steps)


## Introduction

UID2 provides a Prebid.js module that supports the following:

- [Generating the UID2 token](#generating-the-uid2-token)
- [Refreshing the UID2 token](#refreshing-the-uid2-token)
- [Storing the UID2 token in the browser](#storing-the-uid2-token-in-the-browser)
- [Passing the UID2 token to the bid stream](#passing-the-uid2-token-to-the-bid-stream)

For additional flexibility, UID2 also provides alternative methods for some of the features and complementary products, such as a JavaScript SDK.

## Generating the UID2 Token

Depending on access to DII, there are two methods to generate UID2 tokens for use with Prebid.js, as shown in the following table.

Determine which method is best for you, and then follow the applicable integration guide.

| Scenario | Integration Guide |
| :--- | :--- |
| You have access to DII on the client side and want to do front-end development only | [Prebid.js Client-Side Integration](integration-prebid-client-side.md) |
| You have access to DII on the server side and can do server-side development | [Prebid.js Server-Side Integration](integration-prebid-server-side.md) |

## Refreshing the UID2 Token

The Prebid.js UID2 module can automatically refresh the UID2 tokens. If you prefer to implement manual refresh outside Prebid.js, see **Server-Only Mode in the Server-Side Token Generation integration guide**. (**GWH_SW02: Why would they want to do manual refresh outside prebid.js? A bit more data here might be helpful? ANSWER (notes only) API call CSTG in JS SDK, JS SDK does refresh, do manual pass of DII into prebid.js therefore don't want prebid.js to refresh the tokens. If you don't want prebid.js to refresh the token because you're using something else. / also: the publisher might want to refresh on the server side. not sure why.**)

## Storing the UID2 Token in the Browser
<!-- GWH same section in integration-prebid.md, integration-prebid-client-side.md, and integration-prebid-client-side.md. Ensure consistency -->
By default, the UID2 module stores data using local storage. To use a cookie instead, set `params.storage` to `cookie`, as shown in the following example.

For details, see [Unified ID 2.0 Configuration](https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html#unified-id-20-configuration) in the Prebid documentation.

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

To configure the UID2 module, call `pbjs.setConfig`. For details on supported parameters, refer to the guide that applies to your implementation:

- [Prebid.js Integration Guide with Client-Side Token Generation (CSTG)](integration-prebid-client-side.md)
- [Prebid.js Integration Guide with Server-Side Token Generation (SSTG)](integration-prebid-server-side.md)

Once the UID2 module is configured, it manages a UID2 token for the user and stores it in the user's browser. When using [CSTG](../ref-info/glossary-uid.md#gl-cstg) and [SSTG](../ref-info/glossary-uid.md#gl-sstg) with Client Refresh mode, the module automatically takes care of refreshing the token as long as your site is open in the user's browser. However, you have the option to manage the refresh only on the server side. For details, see Prebid.js Integration Guide with Server-Side Token Generation (SSTG) (Specific Section link) (**GWH add link**)

## Integration Overview: High-Level Steps

At a high level, to integrate your site with UID2 using Prebid.js, you'll need to complete the following steps:

1. Complete UID2 account setup.
1. Add Prebid.js to your site.
1. Configure the UID2 module.

For detailed instructions, refer to one of the following integration guides:

- [Prebid.js Client-Side Integration](integration-prebid-client-side.md)
- [Prebid.js Server-Side Integration](integration-prebid-server-side.md)
