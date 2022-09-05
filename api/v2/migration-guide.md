# v2 API Upgrade Guide

This guide explains how to migrate from previous versions of the UID2 APIs.

- Prerequisites
- Publisher Workflow
- Advertiser and Data Provider Workflow

## Prerequisites

If you have an existing API key for accessing v1 endpoints, you will need to [contact the UID2 administrator](../README.md#contact-info) to obtain the corresponding v2 client secret.

## Publisher Workflow

### Backward Compatibility

- It is possible to upgrade calls to token generation and refresh endpoints independently:
  - Refresh token returned by the [v1/token/generate](../v1/endpoints/get-token-generate.md) or [v1/token/refresh](../v1/endpoints/get-token-refresh.md) endpoints can be passed to the [v2/token/refresh](./endpoints/post-token-refresh.md) endpoint.
  - Refresh token returned by the [v2/token/generate](./endpoints/post-token-generate.md) or [v2/token/refresh](./endpoints/post-token-refresh.md) endpoint can be passed to the [v1/token/refresh](../v1/endpoints/get-token-refresh.md) endpoint.
  - The [v2/token/refresh](./endpoints/post-token-refresh.md) endpoint will encrypt the response only if it is passed refresh token  returned by the [v2/token/generate](./endpoints/post-token-generate.md) or [v2/token/refresh](./endpoints/post-token-refresh.md) endpoint. In that case it is assumed, the caller has the refresh response key returned by these endpoints.
  - If presented with a v1 refresh token, [v2/token/refresh](./endpoints/post-token-refresh.md) endpoint will not encrypt the response.
  - The [v1/token/refresh](../v1/endpoints/get-token-refresh.md) endpoint will never encrypt the response, regardless of which version of the endpoint the refresh token has been obtained from.
- The [v2 Client Side Identity JavaScript SDK](./sdks/client-side-identity.md) is a drop-in replacement for the [v1 SDK](../v1/sdks/client-side-identity-v1.md).
  - The first party cookie used for storing user's identity is fully interoperable between the two versions of the SDK, i.e. v1 SDK can read v2 cookie and vice versa.
  - The [v1 SDK init() function](../v1/sdks/client-side-identity-v1.md#initopts-object-void) will accept the identity object returned by the [v2/token/generate](./endpoints/post-token-generate.md) endpoint.
  - The [v2 SDK init() function](./sdks/client-side-identity.md#initopts-object-void) will accept the identity object returned by the [v1/token/generate](../v1/endpoints/get-token-generate.md) endpoint.

### Upgrade Steps

The following sections outline how to upgrade to the v2 APIs:

1. Upgrade Client Side Identity JavaScript SDK
1. Upgrade calls to token generate endpoint
1. Upgrade calls to token refresh endpoint

### Upgrade Client Side Identity JavaScript SDK

> If you are using an older (v0) version of the JavaScript SDK, it is recommended to [upgrade to the v1 SDK](../v1/sdks/client-side-identity-v1.md#improvements-and-changes-from-version-0) first.

On your pages replace the script to load v1 SDK to load v2 SDK instead.

Before:

```html
<script src="https://prod.uidapi.com/static/js/uid2-sdk-1.0.0.js" type="text/javascript"></script> 
```

After:

```html
<script src="https://prod.uidapi.com/static/js/uid2-sdk-2.0.0.js" type="text/javascript"></script> 
```

If you are loading the SDK from another location or hold a private of the SDK, you will need to update the locations accordingly.

### Upgrade Calls to Token Generate Endpoint

On the server side of your application you will need to replace calls to the [v1/token/generate](../v1/endpoints/get-token-generate.md) endpoint with calls to the [v2/token/generate](./endpoints/post-token-generate.md) endpoint. Performing a v2 call will require encrypting the POST request body and decrypting the response as per [instructions](./encryption-decryption.md). Note that the HTTP request type has changed from GET to POST.

> NOTE: Since the request type has changed to POST, it is no longer necessary to URL-encode the PII (email address or phone number) or their respective hash.

The response JSON from the v2 endpoint contains an additional property: `refresh_response_key`. If you are using the Client Side Identity JavaScript SDK (regardless of the version), you must pass this key to the `init()` function of the SDK along with other response properties. If you are not using the Client Side SDK and are storing the response data in custom storage (such as database or a custom first-party cookie), you must update the storage to also store refresh response key. Existing sessions which store refresh tokens returned by the [v1/token/refresh](../v1/endpoints/get-token-refresh.md) endpoint and which do not have a corresponding refresh response key do not need to be updated and will continue working.

### Upgrade Calls to Token Refresh Endpoint

If you are using Client Side Identity JavaScript SDK to manage token refreshes, no further action is required. This section is for those Publishers who perform token refreshes outside of the SDK, either on server or on client side.

When making a request to the [v2/token/refresh](./endpoints/post-token-refresh.md) endpoint, you will need to consider the following:

 - the HTTP request type has been changed from GET to POST
 - put the refresh token as is to the body (note that URL-encoding the token is not required)
 - if the refresh token came from a v1 endpoint, it will not have the associated `refresh_response_key` and thus the response will not be encrypted
 - if the refresh token came from a v2 endpoint, it is expected that you have received the corresponding `refresh_response_key` together with the refresh token. You will need this key to [decrypt the response](./encryption-decryption.md#decrypting-responses) 
 - if the response contains a new refresh token, you must save that along with corresponding `refresh_response_key` into the user's identity storage (such as database or custom first party cookie) 

## Advertiser and Data Provider Workflow

### Backward Compatibility

You need to know the following about migrating to the v2 APIs:

- The [GET v1/identity/map](../v1/endpoints/get-identity-map.md) for mapping single user's PII to UID2 has been removed. You need to use the batch endpoint regardless of the number of users you are mapping.
- The UID2s and bucket IDs returned by [v2/identity/map](./endpoints/post-identity-map.md) and [v2/identity/buckets](./endpoints/post-identity-buckets.md) endpoints are exactly the same as returned by the corresponding v1 endpoints.
- The [restrictions on batch size and requests parallelizations](./guides/advertiser-dataprovider-guide.md#should-i-store-large-volumes-of-email-address-or-email-address-hash-mappings) are the same as with the v1 endpoint.
- [Snowflake integration](./sdks/snowflake_integration.md) is not affected by v2 APIs migration; no changes are required there.

### Upgrade Steps

The following sections outline how to upgrade to the v2 APIs:

1. Update calls to list rotated buckets
1. Update calls to batched map identity
1. Replace calls to non-batch map identity

### Update Calls to List Rotated Buckets

You will need to replace calls to the [v1/identity/buckets](../v1/endpoints/get-identity-buckets.md) endpoint with calls to the [v2/identity/buckets](./endpoints/post-identity-buckets.md) endpoint. Performing a v2 call will require encrypting the POST request body and decrypting the response as per [instructions](./encryption-decryption.md). Note that the HTTP request type has changed from GET to POST.

### Update Calls to Batched Map Identity

You will need to replace calls to the [v1/identity/map](../v1/endpoints/post-identity-map.md) endpoint with calls to the [v2/identity/map](./endpoints/post-identity-map.md) endpoint. Performing a v2 call will require encrypting the POST request body and decrypting the response as per [instructions](./encryption-decryption.md).

### Replace Calls to Non-Batch Map Identity

You will need to replace calls to the [v1/identity/map](../v1/endpoints/get-identity-map.md) endpoint with calls to the [v2/identity/map](./endpoints/post-identity-map.md) endpoint. Performing a v2 call will require encrypting the POST request body and decrypting the response as per [instructions](./encryption-decryption.md). Note that the HTTP request type has changed from GET to POST and that the v2 endpoint can be used for mapping batches.

