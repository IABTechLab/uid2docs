# UID2 API v2 Documentation

For UID2 definitions, ID types, guiding principles, components, and other conceptual details, see [UID2 Framework Overview](../../README.md). For contact and license information, as well as normalization and hash encoding rules, see [Getting Started](../README.md).

This page provides the following information required for you to get started with the UID2 API v2:

* [Improvements and Changes from Version 1](#improvements-and-changes-from-version-1)
* [UID2 API v1 Compatibility and Upgrade Requirements](#uid2-api-v1-compatibility-and-upgrade-requirements)
* [Environment](#environment)
* [Authentication and Authorization](#authentication-and-authorization)

For details on using the API, see the following pages.

| Documentation | Content Description |
| :--- | :--- |
| [Encrypting Requests and Decrypting Responses](./encryption-decryption.md) | The high-level request-response workflow for the UID2 APIs, requirements for encrypting requests and decrypting responses, and respective script examples in Python.  |
| [Endpoints](./endpoints/README.md) | API reference for managing identity tokens and mapping email addresses, phone numbers, or hashes to their UID2s and salt bucket IDs used to generate the UID2s. |
| [Integration Guides](./guides/README.md) | UID2 integration workflows for UID2 participants, such as publishers, DSPs, advertisers, and data providers, as well as Operator Enterprise Partners, such as Microsoft Azure, AWS, and Snowflake. |
| [SDKs](./sdks/README.md) | Client-side JavaScript for websites and RTB SDKs. | 


## Improvements and Changes from Version 1

The v2 updates to the UID2 API include the following:

- [Application API layer encryption](./encryption-decryption.md) that provides E2E content protection, which prevents sensitive UID2 information from leaking to a network operator or the UID2 service operator.
- In addition to the client API key for [authentication](#authentication-and-authorization), a client secret is now required for encrypting API requests and decrypting API responses.
- No more query parameters. New POST methods take input parameters as the request body in the JSON format. 
- No URL-encoding of parameter values is required.
- The [POST /identity/map](./endpoints/post-identity-map.md) endpoint now retrieves UID2s and salt bucket IDs for one or multiple email addresses, phone numbers, or the respective hashes. 


## UID2 API v1 Compatibility and Upgrade Requirements

Here's what you need to know about the UID2 API v2 compatibility with v1:

- UID2 API v2 is not compatible with UID2 API v1 and will require an upgrade. (The Upgrade Guide is coming soon.)
- The v1 endpoints will be supported until the migration process is complete, with the appropriate notifications issued in a timely manner.
- Previously issued client API keys will continue working with v1 endpoints and will be required for v2 endpoints.
- To use the v2 endpoints, a client secret is required for [encrypting API requests and decrypting API responses](./encryption-decryption.md).

## Environment 

All UID2 endpoints use the same base URL.

| Environment | Base URL |
| :--- | :--- |
| Testing | ```https://operator-integ.uidapi.com/v2``` |
| Production | ```https://prod.uidapi.com/v2``` |

For example, https://operator-integ.uidapi.com/v2/token/generate

## Authentication and Authorization

To authenticate to the UID2 endpoints, you need the following:

- A client API key, which is to be included as a bearer token in the request's authorization header. 
  <br/>```Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=```
- A client secret for encrypting API requests and decrypting API responses for all endpoints, except [POST /token/refresh](./endpoints/post-token-refresh.md). <br/>For details and Python examples, see [Encrypting Requests and Decrypting Responses](./encryption-decryption.md).

