---
title: Prebid Integration
description: Information about integrating with Prebid as part of your UID2 implementation.
hide_table_of_contents: false
sidebar_position: 04
---

# Prebid Integration Guide

<!-- This guide includes the following information:

- [Prebid Overview](#prebid-overview)
- [UID2 Prebid Module Page](#uid2-prebid-module-page)
- [UID2 User ID Submodule](#uid2-user-id-submodule)
- [Client Refresh Mode](#client-refresh-mode)
  -  [Client Refresh Cookie Example](#client-refresh-cookie-example)
  -  [Client Refresh uid2Token Example](#client-refresh-uid2token-example)
- [Storage of Internal Values](#storage-of-internal-values)
- [Sample Token](#sample-token)
- [Prebid Implementation Notes and Tips](#prebid-implementation-notes-and-tips)
- [Configuration Parameters for `usersync`](#usersync-configuration-parameters) -->


This guide is for publishers who want to directly integrate with UID2 and generate identity tokens to be passed by Prebid in the RTB bid stream.
It outlines the basic steps to consider if you're building a direct integration with UID2 and use Prebid for header bidding. 

## Introduction

If you are a publisher using Prebid for header bidding, there are a few extra steps so that your Prebid header bidding implementation also supports UID2.

In addition, if you don't already have one, you must set up a UID2 account: see [Account Setup](../getting-started/gs-account-setup.md).

## UID2 Prebid Module Page

For details about how to integrate Prebid with UID2, refer to the [Unified ID 2.0 Prebid User ID module](https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html) on the Prebid site. Be sure to follow all the steps.

## UID2 User ID Submodule

UID2 requires initial tokens to be generated server-side. The UID2 module handles storing, providing, and optionally refreshing them. The module operates in Client Refresh mode.

>**Important:** UID2 is not designed to be used where GDPR applies. The module checks the passed-in consent data, and does not operate if the `gdprApplies` flag is set to `true`.

## Client Refresh Mode

In Client Refresh mode, the full response body from the UID2 [POST /token/generate](../endpoints/post-token-generate.md) or [POST /token/refresh](../endpoints/post-token-refresh.md) endpoint must be provided to the module. As long as the refresh token remains valid, the module refreshes the UID2 token (advertising token) as needed.

To configure the module to use Client Refresh mode, you must do **either** of the following:
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

## Configuration Parameters for `usersync`

The following parameters apply only to the UID2 Prebid User ID Module integration.

| Param under userSync.userIds[] | Scope | Type | Description | Example |
| --- | --- | --- | --- | --- |
| name | Required | String | ID value for the UID2 module - `"uid2"` | `"uid2"` |
| value | Optional, server only | Object | An object containing the value for the advertising token. | See [Sample Token](#sample-token). |
| params.uid2Token | Optional, client refresh | Object | The initial UID2 token. This should be the `body` element of the decrypted response from a call to the `/token/generate` or `/token/refresh` endpoint. | See [Sample Token](#sample-token). |
| params.uid2Cookie | Optional, client refresh | String | The name of a cookie that holds the initial UID2 token, set by the server. The cookie should contain JSON in the same format as the uid2Token param. **If uid2Token is supplied, this param is ignored.** | See [Sample Token](#sample-token). |
| params.uid2ApiBase | Optional, client refresh | String | Overrides the default UID2 API endpoint. | `"https://prod.uidapi.com"` (the default)|
| params.storage | Optional, client refresh | String | Specify the module internal storage method: `cookie` or `localStorage`. We recommend that you do not provide this parameter. Instead, allow the module to use the default. | `localStorage` (the default) |