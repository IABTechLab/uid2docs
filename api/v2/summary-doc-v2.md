[UID2 Overview](../../README.md) > [Getting Started](../README.md) > UID2 API v2 Documentation

# UID2 API v2 Documentation

For UID2 definitions, ID types, guiding principles, components, and other conceptual details, see [UID2 Overview](../../README.md). For contact and license information, as well as normalization and hash encoding rules, see [Getting Started](../README.md).

This page provides the following information required for you to get started with the UID2 API v2:

* [Environments](#environments)
* [Authentication and Authorization](#authentication-and-authorization)

For details on using the API, see the following pages.

| Documentation | Content Description |
| :--- | :--- |
| [Encrypting Requests and Decrypting Responses](getting-started/gs-encryption-decryption.md) | The high-level request-response workflow for the UID2 APIs, requirements for encrypting requests and decrypting responses, and respective script examples in Python.  |
| [Endpoints](endpoints/summary-endpoints.md) | The API reference for managing identity tokens and mapping email addresses, phone numbers, or hashes to their UID2s and salt bucket IDs used to generate the UID2s. |
| [Integration Guides](guides/summary-guides.md) | The UID2 integration workflows for UID2 participants, such as publishers, DSPs, advertisers, and data providers, as well as Operator Enterprise Partners, such as Microsoft Azure, AWS, and Snowflake. |
| [SDKs](sdks/summary-sdks.md) | Links to documentation for using UID2 SDKs. | 

For a list of improvements and changes from version 1 of the API, see [UID2 API v1 to v2 Upgrade Guide](upgrades/upgrade-guide.md).

## Environments 

All UID2 endpoints use the same base URL.

| Environment | Cloud Region | Code | Base URL |
| :--- | :--- | :--- | :--- |
| Testing | AWS US East (Ohio) | `us-east-2` | `https://operator-integ.uidapi.com` |
| Production | AWS US East (Ohio) | `us-east-2` | `https://prod.uidapi.com` |
| Production| AWS Asia Pacific (Sydney) | `ap-southeast-2` | `https://au.prod.uidapi.com` |
| Production | AWS Asia Pacific (Tokyo) | `ap-northeast-1` | `https://jp.prod.uidapi.com` |
| Production | AWS Asia Pacific (Singapore) | `ap-southeast-1` | `https://sg.prod.uidapi.com` |

For example, https://operator-integ.uidapi.com/v2/token/generate

## Authentication and Authorization

To authenticate to the UID2 endpoints, you need the following:

- A client API key, which is to be included as a bearer token in the request's authorization header. 
  <br/>`Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=`
- A client secret for encrypting API requests and decrypting API responses for all endpoints, except [POST /token/refresh](endpoints/post-token-refresh.md). <br/>For details and Python examples, see [Encrypting Requests and Decrypting Responses](getting-started/gs-encryption-decryption.md).

