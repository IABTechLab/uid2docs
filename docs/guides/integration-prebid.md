---
title: Prebid Integration
description: Information about integrating with Prebid as part of your UID2 implementation.
hide_table_of_contents: false
sidebar_position: 04
---

# Prebid Integration Guide

<!-- This guide includes the following information:

- [Prebid Overview](#prebid-overview)
- [UID2 Page on the Prebid Site](#uid2-page-on-the-prebid-site)
- [UID2 User ID Submodule](#uid2-user-id-submodule)
- [Client Refresh Mode](#client-refresh-mode)
  -  [Client Refresh Cookie Example](#client-refresh-cookie-example)
  -  [Client Refresh uid2Token Example](#client-refresh-uid2token-example)
- [Server-Only Mode](#server-only-mode)
   - [Server-Only Cookie Example](#server-only-cookie-example)
   - [Server-Only Value Example](#server-only-value-example)
- [Storage of Internal Values](#storage-of-internal-values)
- [Sample Token](#sample-token)
- [Prebid Implementation Notes and Tips](#prebid-implementation-notes-and-tips) -->

## Prebid Overview

Prebid is a premier, very popular, free, open source header bidding solution.

If you are a publisher who is using header bidding using Prebid, or wants to do so, there are a few extra steps so that your Prebid header bidding implementation also supports UID2.

In addition, if you don't already have one, you must set up a UID2 account: see [Account Setup](../getting-started/gs-account-setup.md).

## UID2 Page on the Prebid Site

For details about the UID2 Prebid integration, refer to [the Unified ID 2.0 page on the Prebid site](https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html). 
Be sure to follow all the steps.

## UID2 User ID Submodule

UID2 requires initial tokens to be generated server-side. The UID2 module handles storing, providing, and optionally refreshing them. The module can operate in one of two different modes:

- Client Refresh
- Server-Only

  *Server-Only* mode was originally called *legacy* mode, but it is a popular mode for new integrations where publishers prefer to handle token refresh server-side.

>**Important:** UID2 is not designed to be used where GDPR applies. The module checks the passed-in consent data, and does not operate if the `gdprApplies` flag is set to `true`.

## Client Refresh Mode

Client Refresh mode is recommended for most scenarios. In this mode, the full response body from the UID2 [POST /token/generate](../endpoints/post-token-generate.md) or [POST /token/refresh](../endpoints/post-token-refresh.md) endpoint must be provided to the module. As long as the refresh token remains valid, the module refreshes the UID2 token (advertising token) as needed.

To configure the module to use this mode, you must do **either** of the following:
-  Set `params.uid2Cookie` to the name of the cookie that contains the response body as a JSON string. See [Client Refresh Cookie Example](#client-refresh-cookie-example).

- Set `params.uid2Token` to the response body as a JavaScript object. See [Client Refresh uid2Token Example](#client-refresh-uid2token-example).

### Client Refresh Cookie Example

In this example, the cookie is called `uid2_pub_cookie`.

#### Cookie
```
uid2_pub_cookie={"advertising_token":"...advertising token...","refresh_token":"...refresh token...","identity_expires":1684741472161,"refresh_from":1684741425653,"refresh_expires":1684784643668,"refresh_response_key":"...response key..."}
```

#### Configuration

```javascript
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'uid2',
      params: {
        uid2Cookie: 'uid2_pub_cookie'
      }
    }]
  }
});
```

### Client Refresh uid2Token Example

The following example shows a sample configuration. For the contents of the token, see [Sample Token](#sample-token).

```javascript
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'uid2',
      params: {
        uid2Token: {
          'advertising_token': '...advertising token...',
          'refresh_token': '...refresh token...',
          // etc. - see the sample token for contents of this object
        }
      }
    }]
  }
});
```

## Server-Only Mode

In this mode, only the advertising token is provided to the module. The module will not be able to refresh the token. The publisher is responsible for implementing some other way to refresh the token.

To configure the module to use this mode, you must do **either** of the following:

- Set a cookie named `__uid2_advertising_token` to the advertising token (see [Server-Only Cookie Example](#server-only-cookie-example)).

- Set `value` to an ID block containing the advertising token (see [Server-Only Value Example](#server-only-value-example)).

### Server-Only Cookie Example

This example sets a cookie named `__uid2_advertising_token` to the advertising token.

#### Cookie

The following example uses a fictitious value for the advertising token, to show what the cookie might look like.

```
__uid2_advertising_token=eb33b0cb-8d35-4722-b9c0-1a31d4064888
```

#### Configuration

```javascript
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'uid2'
    }]
  }
});
```

### Server-Only Value Example

This example sets `value` to an ID block containing the advertising token.

Configuration:

```javascript
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'uid2'
      value: {
        'uid2': {
          'id': '...advertising token...'
        }
      }
    }]
  }
});
```

## Storage of Internal Values

The UID2 Prebid module stores some internal values. By default, all values are stored in HTML5 local storage. If needed, you can switch to cookie storage by setting `params.storage` to `cookie`. The cookie size can be significant, so we don't recommend this solution, but it is a possible solution if local storage is not an option.

## Sample Token

The following sample is fictitious, but shows what the token response object looks like:

```javascript
{
  "advertising_token": "...",
  "refresh_token": "...",
  "identity_expires": 1633643601000,
  "refresh_from": 1633643001000,
  "refresh_expires": 1636322000000,
  "refresh_response_key": "wR5t6HKMfJ2r4J7fEGX9Gw=="
}
```

## Prebid Implementation Notes and Tips

In planning your Prebid implementation, consider the following:

- If you're trying to limit the size of cookies, provide the token in configuration and use the default option of local storage.

- If you provide an expired identity, and the module has a valid identity which was refreshed from the identity you provide, the module uses the refreshed identity. The module stores the original token that it used for refreshing the token, and uses the refreshed tokens as long as the original token matches the token that you provided.

- If you provide a new token that does not match the original token used to generate any refreshed tokens, all stored tokens are discarded and the new token used instead (refreshed if necessary).

- During integration testing, you can set `params.uid2ApiBase` to `"https://operator-integ.uidapi.com"`. Be aware that you must use the same environment (production or integration) that you use for generating tokens.
