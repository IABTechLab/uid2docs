[UID2 Overview](../../../README.md) > [Getting Started](../../README.md) > [v2](../summary-doc-v2.md) > UID2 API v1 to v2 Upgrade Guide

# UID2 API v1 to v2 Upgrade Guide

This guide outlines the differences between the UID2 v1 and v2 APIs and explains how to upgrade to the v2 API.

- [Improvements and Changes from Version 1](#improvements-and-changes-from-version-1)
- [Prerequisites and Timeline](#prerequisites-and-timeline)
- [Publisher Upgrade Workflow](#publisher-upgrade-workflow)
- [Advertiser and Data Provider Upgrade Workflow](#advertiser-and-data-provider-upgrade-workflow)
- [FAQs](#faqs)

## Improvements and Changes from Version 1

The v2 updates to the UID2 API include the following:

- [Application API layer encryption](../getting-started/gs-encryption-decryption.md) has been added. It provides E2E content protection and prevents sensitive UID2 information from leaking to a network operator or the UID2 service operator.<br/>This also means that performing calls to the v2 endpoints requires encrypting the POST request body and decrypting the response.
- In addition to the client API key for [authentication](../summary-doc-v2.md#authentication-and-authorization), a client secret is now required for encrypting API requests and decrypting API responses.
- The HTTP request type of all GET endpoints in the UID2 API v1 has changed from GET to POST in the [UID2 API v2](../endpoints/summary-endpoints.md).
- No more query parameters are required in requests. The new POST methods take input parameters as the request body in JSON format. 
- No URL-encoding of parameter values is required.
- The [POST /identity/map](../endpoints/post-identity-map.md) endpoint now retrieves UID2s and salt bucket IDs for one or multiple email addresses, phone numbers, or the respective hashes. 

See also [UID2 API v2 Documentation](../summary-doc-v2.md).

## Prerequisites and Timeline

Before you start the upgrade, be sure to review the following requirements:

- To be able to authenticate to the UID2 endpoints, [contact the UID2 administrator](../../README.md#contact-info) and obtain a secret key for encrypting API requests and decrypting API responses. See also [Authentication and Authorization](../summary-doc-v2.md#authentication-and-authorization).
- You must complete your upgrade by **March 31, 2023**, when all v1 SDK files and endpoints, the v0 SDK files, and any unversioned endpoints will be deprecated and removed.


## Publisher Upgrade Workflow

This section includes the following information about backward compatibility and upgrade steps for publishers:

- [Backward Compatibility for Publishers](#backward-compatibility-for-publishers)
- [Upgrade Steps for Publishers](#upgrade-steps-for-publishers)

### Backward Compatibility for Publishers

You can upgrade calls to the token generation and refresh endpoints independently. Here's what you need to know:

 - You can pass refresh tokens returned by the v1 `GET /token/generate` or v1 `GET /token/refresh` endpoints to the v2 [POST /token/refresh](../endpoints/post-token-refresh.md) endpoint, but responses will not be encrypted.
 - The v2 [POST /token/refresh](../endpoints/post-token-refresh.md) endpoint encrypts responses only for refresh tokens returned by the v2 [POST /token/generate](../endpoints/post-token-generate.md) or v2 [POST /token/refresh](../endpoints/post-token-refresh.md) endpoints, with the assumption that the caller has the refresh response key returned by these endpoints.
 - You can pass refresh tokens returned by the v2 [POST /token/generate](../endpoints/post-token-generate.md) or v2 [POST /token/refresh](../endpoints/post-token-refresh.md) endpoint to the v1 `GET /token/refresh` endpoint, which never encrypts responses.

The [UID2 SDK for JavaScript](../sdks/client-side-identity.md) for v2 is a drop-in replacement for the UID2 SDK for JavaScript SDK v1. Here's what you need to know:
  - The first-party cookie used for storing the user's identity is fully interoperable between the two versions of the SDK. This means that the UID2 SDK for JavaScript v2 can read v1 cookies and vice versa.
  - The [v2 SDK init() function](../sdks/client-side-identity.md#initopts-object-void) accepts the identity object returned by the v1 `GET /token/generate` endpoint.
  - The v1 SDK `init()` function accepts the identity object returned by the v2 [POST /token/generate](../endpoints/post-token-generate.md) endpoint.

### Upgrade Steps for Publishers

To upgrade to the UID API v2, complete the following steps:

1. [Upgrade the UID2 SDK for JavaScript](#upgrade-the-uid2-sdk-for-javascript).
1. [Upgrade calls to the token generate endpoint](#upgrade-token-generation-calls).
1. (Required only for integrations that do not use the [UID2 SDK for JavaScript)](../sdks/client-side-identity.md): [Upgrade calls to the token refresh endpoint](#upgrade-token-refresh-calls).

#### Upgrade the UID2 SDK for JavaScript

To upgrade the UID2 SDK for JavaScript, you need to update the script that loads the SDK. Here's what you need to keep in mind during this step:

- If you are using `version 0` of the UID2 SDK for JavaScript, be sure to upgrade to `version 1` of the  SDK first.
- If you load the SDK from another location or hold a private copy of the SDK, be sure to update the locations accordingly.

On your pages, update the script to load version 2 of the SDK instead of version 1.

SDK version 1:

```html
<script src="https://prod.uidapi.com/static/js/uid2-sdk-1.0.0.js" type="text/javascript"></script> 
```

SDK version 2:

```html
<script src="https://prod.uidapi.com/static/js/uid2-sdk-2.0.0.js" type="text/javascript"></script> 
```

#### Upgrade Token Generation Calls

As part of the upgrade, on the server side of your application, you must replace calls to the v1 `GET /token/generate` endpoint with calls to the v2 [POST /token/generate](../endpoints/post-token-generate.md) endpoint. 

Here's what you need to know and do:

- Performing a [POST /token/generate](../endpoints/post-token-generate.md) call requires encrypting the request body and decrypting the response. For details and examples, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).
- The JSON response from the [POST /token/generate](../endpoints/post-token-generate.md) endpoint contains a new property: `refresh_response_key`. 
  - If you are using the [UID2 SDK for JavaScript](../sdks/client-side-identity.md) (regardless of the version), you must pass this key to the `init()` function of the SDK along with other response properties. 
  - If you are not using the SDK and are storing the response data in custom storage (for example, a database or a custom first-party cookie), you must update the storage to store the refresh response key. 
  - No updates are required for any existing sessions that store refresh tokens returned by the v1 `GET /token/refresh` endpoint and do not have a corresponding refresh response key. These sessions will continue working as is.

#### Upgrade Token Refresh Calls

>NOTE: If you are using the [UID2 SDK for JavaScript](../sdks/client-side-identity.md) to refresh and manage tokens, no further action is required. 

If you refresh tokens either on server or on client side without using the SDK, keep in mind the following, when making requests to the v2 [POST /token/refresh](../endpoints/post-token-refresh.md) endpoint:

 - You can pass the returned refresh token without any modifications in the request body.
 - Refresh tokens returned by the v2 endpoints are expected to have a `refresh_response_key` value returned together with the refresh token. This key is required for [decrypting the response](../getting-started/gs-encryption-decryption.md). 
 - If the response contains a new refresh token, you must save it along with the corresponding `refresh_response_key` value into the user's identity storage (for example, a database or a custom first-party cookie). 
 - Refresh tokens returned by the v1 endpoints do not have the associated `refresh_response_key`, so the response will not be encrypted.

## Advertiser and Data Provider Upgrade Workflow

- [Backward Compatibility for Advertisers and Data Providers](#backward-compatibility-for-advertisers-and-data-providers)
- [Upgrade Steps for Advertisers and Data Providers](#upgrade-steps-for-advertisers-and-data-providers)


### Backward Compatibility for Advertisers and Data Providers

Here's what you need to know about upgrading to the UID2 API v2:

- The v1 `GET /identity/map` endpoint for mapping a single user's directly identifying information (DII) to UID2 has been replaced with the v2 [POST /identity/map](../endpoints/post-identity-map.md) endpoint, which maps DII for single and multiple users.
- UID2s and bucket IDs returned by the v2 [POST /identity/map](../endpoints/post-identity-map.md) and [POST /identity/buckets](../endpoints/post-identity-buckets.md) endpoints are the same as those returned by the corresponding v1 endpoints.
- The [Snowflake Integration Guide](../guides/snowflake_integration.md) is not affected by the upgrade to the UID2 v2 API and requires no changes.

### Upgrade Steps for Advertisers and Data Providers

To upgrade to the UID API v2, replace calls to the following v1 endpoints with the corresponding v2 endpoints.

| v1 Endpoint | v2 Endpoint | Comments |
| :--- |:--- |:--- |
| `GET /identity/buckets` | [POST /identity/buckets](../endpoints/post-identity-buckets.md) |The HTTP request type has changed. |
| `POST /identity/map` | [POST /identity/map](../endpoints/post-identity-map.md)| The v2 endpoint is identical to the v1 endpoint, except it also maps DII for single users. |
| `GET /identity/map` |[POST /identity/map](../endpoints/post-identity-map.md) |The HTTP request type has changed.<br/>The new POST endpoint maps DII for single and multiple users. |

>IMPORTANT: Performing calls to the UID2 API v2 requires encrypting the POST request body and decrypting the response. For details and examples, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).


## FAQs

### Do I have to do the upgrade?

Yes. The UID2 API v2 is not compatible with UID2 API v1 and requires an upgrade.

### What are the key differences between the old and new APIs?

For details, see [Improvements and Changes from Version 1](#improvements-and-changes-from-version-1).

### When can I start the upgrade?

Any time, but be sure to complete it by March 31, 2023.

### Can I continue using the v1 API and API keys?

Yes. The v1 endpoints will be supported until March 31, 2023. After that date, all deprecated v1 SDK files and endpoints, the v0 SDK files, and any unversioned endpoints will be removed. Previously issued client API keys will be required for the v2 endpoints and will continue working with the v1 endpoints until their removal.

### How do I obtain a client secret key for the new API?

To obtain your secret key, [contact the UID2 administrator](../../README.md#contact-info). See also [Prerequisites and Timeline](#prerequisites-and-timeline).

### How do I encrypt requests and decrypt responses?

The [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md) page explains the workflow and provides examples in Python.
