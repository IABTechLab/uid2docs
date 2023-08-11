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


This guide is for publishers who want to directly integrate with UID2 and generate [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) (advertising tokens) to be passed by Prebid in the RTB bid stream.

It outlines the basic steps to consider if you're building a direct integration with UID2 and you use Prebid for header bidding. 

## Introduction

If you're a publisher using Prebid for header bidding, there are a few extra steps to take so that your Prebid header bidding implementation also supports UID2.

In addition, if you don't already have one, you must set up a UID2 account: see [Account Setup](../getting-started/gs-account-setup.md).

## UID2 Prebid Module Page

Information about how to integrate Prebid with UID2 is also on the [Unified ID 2.0 Prebid User ID module](https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html) on the Prebid site. 

## Integration Steps

At a high level, to integrate with UID2 using Prebid, you'll need to complete the following steps.

| Step | Action | Link to Instructions |
| --- | --- | --- |
| 1 | Send a server-side API call to generate or refresh the UID2 token.  | [UID2 User ID Submodule](#uid2-user-id-submodule) |
| 2 | Store the response value, so that the Prebid module can manage token refresh as well as opt-out if needed. | [Client Refresh Mode](#client-refresh-mode) |

## UID2 User ID Submodule

UID2 requires initial tokens to be generated server-side. You can do this by calling one of the following endpoints:

- [POST /token/generate](../endpoints/post-token-generate.md) to generate a new UID2 token.
- [POST /token/refresh](../endpoints/post-token-refresh.md) to refresh an existing token.

The UID2 module handles storing, providing, and optionally refreshing UID2 tokens. The module operates in Client Refresh mode.

>**Important:** UID2 is not designed to be used where GDPR applies. The module checks the passed-in consent data, and does not operate if the `gdprApplies` flag is set to `true`.

## Client Refresh Mode

You must provide the Prebid module with the full response body from the applicable endpoint:

- [POST /token/generate](../endpoints/post-token-generate.md) for a new UID2 token.
- [POST /token/refresh](../endpoints/post-token-refresh.md) for a refreshed UID2 token.

As long as the refresh token remains valid, the module refreshes the UID2 token as needed.

### Response Storage Options

When you configure the module to use Client Refresh mode, you must choose **either** of the following options for storing the API response information.

| Option | Details | Use Case | 
| --- | --- | --- |
| Set `params.uid2Cookie` to the name of the cookie that contains the response body as a JSON string. | See [Client Refresh Cookie Example](#client-refresh-cookie-example). | {**GWH_SW data to come**) |
| Set `params.uid2Token` to the response body as a JavaScript object. | See [Client Refresh uid2Token Example](#client-refresh-uid2token-example). | {**GWH_SW data to come**) |

(**GWH_SW query_01: I've been asked to provide information about why the publisher might choose one or the other. For example, because if the cookie size is too big it's a problem and so we offer a local storage option? She said there was feedback on the cookie size, that it was too large, so as a solution it could be set in local storage. Is this correct? Or are there other reasons they might choose one or the other of these two options?**)

(**GWH_SW query_02: Another question. We said "you can switch to cookie storage by setting params.storage to cookie." But in the earlier section we say "Set `params.uid2Cookie` to the name of the cookie" which is not the same. Is one right and one'w wrong? Or, maybe I'm mixing up two different things here. We tell them to set params.storage but I don't see params.storage anywhere. Only `params.uid2Cookie` and `params.uid2Token`.**)

(**GWH_SW query_03: Is the second option, above, the local storage option? If so I'll say that. It's not entirely clear to me.**

**Also: if yes, I think it's the default so I should say that also.**

**Also: where/what is the configuration file? Apologies if I missed that.**)

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