---
title: Prebid.js Advanced Integration
sidebar_label: Prebid.js Advanced
pagination_label: Prebid Advanced Integration
description: Information about integrating with Prebid as part of your UID2 implementation.
hide_table_of_contents: false
sidebar_position: 04
---

# Prebid.js Advanced Integration Guide

<!-- This guide includes the following information:

- [Introduction](#introduction)
- [UID2 Prebid Module Page](#uid2-prebid-module-page)
- [Integration Steps](#integration-steps)
- [Generate UID2 Token](#generate-uid2-token)
- [UID2 User ID Submodule](#uid2-user-id-submodule)
- [Client Refresh Mode](#client-refresh-mode)
  -  [Response Storage Options](#response-storage-options)
  -  [Client Refresh Cookie Example](#client-refresh-cookie-example)
  -  [Client Refresh uid2Token Example](#client-refresh-uid2token-example)
- [Storage of Internal Values](#storage-of-internal-values)
- [Sample Token](#sample-token)
- [Prebid Implementation Notes and Tips](#prebid-implementation-notes-and-tips)
- [Configuration Parameters for `usersync`](#usersync-configuration-parameters) -->

This guide is for publishers who want to integrate with UID2 and generate [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) (advertising tokens) to be passed by Prebid in the RTB bid stream. It covers advanced use cases for publishers who want to generate and optionally refresh UID2 tokens by making server-side API calls to the UID2 operator.

For integration instructions that do not require server-side changes, see [Prebid.js Integration Guide](./integration-prebid.md).

This guide outlines the basic steps to consider if you're building a direct integration with UID2 and you use Prebid for header bidding. 

## Introduction

If you're a publisher using Prebid for header bidding, there are a few extra steps to take so that your Prebid header bidding implementation also supports UID2.

In addition, if you don't already have one, you must set up a UID2 account: see [Account Setup](../getting-started/gs-account-setup.md).

## UID2 Prebid Module Page

Information about how to integrate Prebid with UID2 is also in these locations:
- On the [Unified ID 2.0](https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html) page for the Prebid User ID submodule on the Prebid site.
- In the [UID2 User ID Submodule](https://github.com/prebid/Prebid.js/blob/master/modules/uid2IdSystem.md) page in the Prebid GitHub repository.

## Integration Steps

At a high level, to integrate with UID2 using Prebid, you'll need to complete the following steps.

| Step | Action | Link to Instructions |
| --- | --- | --- |
| 1 | Send a server-side API call to generate a UID2 token.  | [Generate UID2 Token](#generate-uid2-token) |
| 2 | Store the response value, so that the Prebid module can manage token refresh as well as opt-out if needed. | [Client Refresh Mode](#client-refresh-mode) |

## Generate UID2 Token

You can generate tokens by calling the [POST /token/generate](../endpoints/post-token-generate.md) endpoint.

## UID2 User ID Submodule

The UID2 module handles storing, providing, and optionally refreshing UID2 tokens.

>**Important:** UID2 is not designed to be used where GDPR applies. The module checks the passed-in consent data, and does not operate if the `gdprApplies` flag is set to `true`.

## Client Refresh Mode

You must provide the Prebid module with the full JSON response body from the applicable endpoint:

- [POST /token/generate](../endpoints/post-token-generate.md) for a new UID2 token.
- [POST /token/refresh](../endpoints/post-token-refresh.md) for a refreshed UID2 token.

For an example, see [Sample Token](#sample-token).

As long as the refresh token remains valid, the module refreshes the UID2 token as needed.

### Response Storage Options

When you configure the module to use Client Refresh mode, you must choose **one** of the following options for storing the API response information.

| Option | Details | Use Case | 
| --- | --- | --- |
| Set `params.uid2Cookie` to the name of the cookie that contains the response body as a JSON string. | See [Client Refresh Cookie Example](#client-refresh-cookie-example). | Do not choose this option unless you are sure there's enough space left in your cookie to store the response body. |
| Set `params.uid2Token` to the response body as a JavaScript object. | See [Client Refresh uid2Token Example](#client-refresh-uid2token-example). | You might choose to provide the response body via `params.uid2Token` in either of these cases:<br/>- If storing the response body on the cookie will exceed the cookie size limit.<br/>- If you prefer to have the flexibility to manage the storage of the response body yourself. |

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

- For an example of what a UID2 token might look like in the bid stream, when it's sent from an SSP to a DSP, see [What does a UID2 token look like in the bid stream?](../getting-started/gs-faqs.md#what-does-a-uid2-token-look-like-in-the-bid-stream)

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