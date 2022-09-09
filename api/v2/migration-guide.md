[UID2 Overview](../../../README.md) > [Getting Started](../../README.md) > [v2](./README.md) > UID2 API v1 to v2 Upgrade Guide

# UID2 API v1 to v2 Upgrade Guide

This guide explains the compatibility of the UID2 v1 and v2 APIs and explains how to upgrade to the v2 API.

- [Prerequisites](#prerequisites)
- [Publisher Upgrade Workflow](#publisher-upgrade-workflow)
- [Advertiser and Data Provider Upgrade Workflow](#advertiser-and-data-provider-upgrade-workflow)

## Prerequisites

To authenticate to the UID2 endpoints, be sure to [contact the UID2 administrator](../README.md#contact-info) and obtain the v2 client API key. See also [Authentication and Authorization](./README.md#authentication-and-authorization).

## Publisher Upgrade Workflow

- [Backward Compatibility](#backward-compatibility-for-publishers)
- [Upgrade Steps](#upgrade-steps-for-publishers)

### Backward Compatibility for Publishers

You can upgrade calls to the token generation and refresh endpoints independently. Here's what you need to know:

 - You can pass refresh tokens returned by the [v1/token/generate](../v1/endpoints/get-token-generate.md) or [v1/token/refresh](../v1/endpoints/get-token-refresh.md) endpoints to the [v2/token/refresh](./endpoints/post-token-refresh.md) endpoint, but the response will not be encrypted.
 - The [v2/token/refresh](./endpoints/post-token-refresh.md) endpoint encrypts responses only if for refresh tokens returned by the [v2/token/generate](./endpoints/post-token-generate.md) or [v2/token/refresh](./endpoints/post-token-refresh.md) endpoints, with the assumption that the caller has the refresh response key returned by these endpoints.
 - You can pass refresh tokens returned by the [v2/token/generate](./endpoints/post-token-generate.md) or [v2/token/refresh](./endpoints/post-token-refresh.md) endpoint to the [v1/token/refresh](../v1/endpoints/get-token-refresh.md) endpoint, which never encrypts responses.

The [UID2 SDK v2](./sdks/client-side-identity.md) is a drop-in replacement for the [UID2 SDK v1](../v1/sdks/client-side-identity-v1.md). Here's what you need to know:
  - The first-party cookie used for storing user's identity is fully interoperable between the two versions of the SDK. This means that the UID2 SDK v2 can read v1 cookies and vice versa.
  - The [v2 SDK init() function](./sdks/client-side-identity.md#initopts-object-void) accepts the identity object returned by the [v1/token/generate](../v1/endpoints/get-token-generate.md) endpoint and vice versa.

### Upgrade Steps for Publishers

To upgrade to the UID API v2, complete the following steps:

1. [Upgrade the UID2 SDK](#upgrade-the-uid2-js-sdk).
1. [Upgrade calls to token generate endpoint](#upgrade-calls-to-the-token-generation-endpoint).
1. (Required only for custom interations) [Upgrade calls to token refresh endpoint](#upgrade-calls-to-the-token-refresh-endpoint).

#### Upgrade the UID2 JS SDK

To upgrade the UID2 SDK, you need update the script to load the new version of the SDK. Here's what you need to keep in mind during this step:

- If you are using [version 0](../v1/sdks/client-side-identity-v0.md) of the UID2 SDK, be sure to upgrade to [version 1](../v1/sdks/client-side-identity-v1.md#improvements-and-changes-from-version-0) of the UID2 SDK first.
- If you load the SDK from another location or hold a private (TBD-private what? Version?) of the SDK, be sure to update the locations accordingly.

On your pages, update the script to load version 2 of the SDK instead of verison 1.

SDK version 1:

```html
<script src="https://prod.uidapi.com/static/js/uid2-sdk-1.0.0.js" type="text/javascript"></script> 
```

SDK version 2:

```html
<script src="https://prod.uidapi.com/static/js/uid2-sdk-2.0.0.js" type="text/javascript"></script> 
```

#### Upgrade Calls to the Token Generation Endpoint

As part of the upgrade, on the server side of your application, you must replace calls to the [v1/token/generate](../v1/endpoints/get-token-generate.md) endpoint with calls to the [v2/token/generate](./endpoints/post-token-generate.md) endpoint. 

Here's what you need to know and do:

- The HTTP request type of the `token/generate` endpoint has changed from GET to POST. So, you are no longer required to URL-encode the PII (email address or phone number) or their respective hashes. TBD XREF.
- Performing a [v2/token/generate](./endpoints/post-token-generate.md) call requires encrypting the POST request body and decrypting the response. For details and examples, see as per [Encrypting Requests and Decrypting Responses](./encryption-decryption.md).
- The JSON response from the [v2/token/generate](./endpoints/post-token-generate.md) endpoint contains an additional property: `refresh_response_key`. 
  - If you are using the UID2 SDK (regardless of the version), you must pass this key to the `init()` function of the SDK along with other response properties. 
  - If you are not using the SDK and are storing the response data in a custom storage (such as database or a custom first-party cookie), you must update the storage to also store refresh response key. 
  - No updates are required for any existing sessions that store refresh tokens returned by the [v1/token/refresh](../v1/endpoints/get-token-refresh.md) endpoint and  do not have a corresponding refresh response key. These sessions will continue working.

#### Upgrade Calls to the Token Refresh Endpoint

>NOTE: If you are using the UID2 SDK to refresh and manage tokens, no further action is required. 

If you perform refresh tokens without using the UID2 SDK, either on server or on client side, keep in mind the following, when making requests to the [v2/token/refresh](./endpoints/post-token-refresh.md) endpoint:

 - The HTTP request type of the `token/refresh` endpoint has changed from GET to POST. So, you are no longer required to URL-encode the PII (email address or phone number) or their respective hashes. TBD XREF.
 - Pass the returned refresh token without any modifications in the request body.
 - Refresh tokens returned by the v2 endpoints are expected to have a `refresh_response_key` value returned together with the refresh token. This key is required for decrypting the response. For details and examples, see as per [Encrypting Requests and Decrypting Responses](./encryption-decryption.md). 
 - If the response (TBD-which one? token/refresh?) contains a new refresh token, you must save it along with corresponding `refresh_response_key` value into the user's identity storage (for example, database or a custom first-party cookie). 
 - Refresh tokens returned by the v1 endpoints do not have the associated `refresh_response_key`, so the response will not be encrypted. See also XREF.

## Advertiser and Data Provider Upgrade Workflow

- [Backward Compatibility](#backward-compatibility-for-advertisers-and-data-providers)
- [Upgrade Steps](#upgrade-steps-for-advertisers-and-data-providers)


### Backward Compatibility for Advertisers and Data Providers

Here's what you need to know about migrating to the UID2 API v2:

- The [GET v1/identity/map](../v1/endpoints/get-identity-map.md) endpoint for mapping single user's PII to UID2 has been removed. Instead, use the batch [v2/identity/map](./endpoints/post-identity-map.md) endpoint, regardless of the number of users you are mapping.
- UID2s and bucket IDs returned by the [v2/identity/map](./endpoints/post-identity-map.md) and [v2/identity/buckets](./endpoints/post-identity-buckets.md) endpoints are the same as returned by the corresponding v1 endpoints.
- The same [restrictions on batch size and requests parallelizations](./guides/advertiser-dataprovider-guide.md#should-i-store-large-volumes-of-email-address-or-email-address-hash-mappings) apply to the v2 APIs.
- The [Snowflake integration](./sdks/snowflake_integration.md) is not affected by the migration to the UID2 v2 API and requires no changes.

### Upgrade Steps for Advertisers and Data Providers

>IMPORTANT: Performing calls to the UID2 API v2 requires encrypting the POST request body and decrypting the response. For details and examples, see as per [Encrypting Requests and Decrypting Responses](./encryption-decryption.md).

To upgrade to the UID API v2, replace calls to the following v1 endpoints with the corresponding v2 endpoints.

| v1 Endpoint | v2 Endpoint | Comments |
| :--- |:--- |:--- |
|[GET /identity/buckets](../v1/endpoints/get-identity-buckets.md) | [POST /identity/buckets](./endpoints/post-identity-buckets.md) |The HTTP request type has changed. |
|[POST /identity/map](../v1/endpoints/post-identity-map.md) | [POST /identity/map](./endpoints/post-identity-map.md)|N/A |
|[GET /identity/map](../v1/endpoints/get-identity-map.md) |[POST /identity/map](./endpoints/post-identity-map.md) |The HTTP request type has changed.<br/>You can use the v2 endpoint for mapping batches. |


