# UID2 API v2 Documentation

For UID2 definition, forms, guiding principles, components, and other conceptual details, see [UID2 Overview](../../README.md). For contact information, authentication, and license information, see [Unified ID 2.0 API Documentation](../README.md).

This page provides the following information required for you to get started with the UID2 API:

* [Improvements and Changes from Version 1](#improvements-and-changes-from-version-1)
* [Compatibility and Upgrade Requirements](#compatibility-and-upgrade-requirements)
* [Environment](#environment)
* [Authentication](#authentication)
* [Encryption](#encryption)
* [Response Structure and Status Codes](#response-structure-and-status-codes)

For details on using the API, see the following pages.

| Documentation | Content Description |
| :--- | :--- |
| [Endpoints](./endpoints/README.md) | API reference for managing identity tokens and mapping email addresses, phone numbers, or hashes to their UID2s and salt bucket IDs used to generate the UID2s. |
| [Integration Guides](./guides/README.md) | UID2 integration workflows for UID2 participants, such as publishers, DSPs, advertisers, and data providers, as well as Operator Enterprise Partners, such as Microsoft Azure, AWS, and Snowflake. |
| [SDKs](./sdks/README.md) | Client-side JavaScript for websites and RTB SDKs. | 


## Improvements and Changes from Version 1

With the v2 updates to the UID2 API, you can now take advantage of the following:

- Application API layer encryption that provides E2E content protection that prevents sensitive UID2 information from leaking to network operator or UID2 service operator.
- Only POST methods with input parameters provided in the request body as in the JSON format and encrypted using a pre-shared key (PSK).
- No parameter value encoding.
- The [POST /identity/map](./endpoints/post-identity-map.md) endpoint that now retrieves UID2s and salt bucket IDs for one or multiple email addresses, phone numbers, or the respective hashes. 
- In addition to the client `key` for [authetication](#authentication), a client `secret` is now required for encrypting API requests and decrypting API responses.
- TBD `Content-Type: application/octet-stream` 
- TBD

## Compatibility and Upgrade Requirements

Here's what you need to know about UID2 API v2 compatibility with v1:

- UID2 API v2 is not compantible with UID2 API v1 and requires an upgrade.
- The v1 endpoints will be supported until the migration process is completed, with the approppiate notifications issued in a timely manner and with ample advance notice.
- Client keys have been upgraded to be compantible with both v1 and v2 API.
- Authorization tokens that are previously shared with UID2 partners will continue to work for accessing only UID2 v1 APIs.
- 

## Environment 

All UID2 endpoints use the same base URL.

| Environment | Base URL |
| :--- | :--- |
| Testing | ```https://integ.uidapi.com/v2``` |
| Production | ```https://prod.uidapi.com/v2``` |

For example, https://integ.uidapi.com/v2/token/generate

## Authentication

To authenticate to UID2 endpoints, you need the following:

- A client `key`, which is to be included as a bearer token in the request's authorization header. 
  <br/>```Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=```
- A client `secret`, or an encryption key, for encrypting API requests and decrypting API responses for all endpoints, except [POST /token/refresh](./endpoints/get-token-refresh.md).  


## Encryption

TBD


## Response Structure and Status Codes


TBD

The following table lists the `status` property values and their HTTP status code equivalents.

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | The request was successful.|
| `optout` | 200 | The user opted out. This status is returned only for authorized requests. |
| `client_error` | 400 | The request had missing or invalid parameters. For details on the issue, see the `message` property in the response.|
| `invalid_token` | 400 | The request had an invalid identity token specified. This status is returned only for authorized requests. |
| `unauthorized` | 401 | The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested operation. |



