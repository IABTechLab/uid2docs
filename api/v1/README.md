# UID2 API v1 (Deprecated)

>IMPORTANT: The UID2 API v1 has been deprecated and will be supported only for the current users until March 31, 2023, when all v1 SDK files and endpoints, the v0 SDK files, and any unversioned endpoints will be removed. Be sure to [upgrade to the UID2 API v2](../v2/upgrades/upgrade-guide.md) by March 31, 2023. If you are new to the framework, use the [UID2 API v2](../v2/summary-doc-v2.md).


For UID2 definition, forms, guiding principles, components, and other conceptual details, see [UID2 Overview](../../README.md). For contact and license information, as well as normalization and hash encoding rules, see [Unified ID 2.0 API Documentation](../README.md). For the API v2 details, see [UID2 API v2 Documentation](../v2/summary-doc-v2.md).

This page provides the following information required for you to get started with the UID2 API v1:

* [Environment](#environment)
* [Authentication](#authentication)
* [Query Parameter Value Encoding](#query-parameter-value-encoding)

For details on using the v1 UID2 API, see the following pages.

| Documentation | Content Description |
| :--- | :--- |
| [Endpoints](./endpoints/README.md) | API reference for managing identity tokens and mapping email addresses, phone numbers, or hashes to their UID2s and salt bucket IDs used to generate the UID2s. |
| [Integration Guides](./guides/README.md) | UID2 integration workflows for UID2 participants, such as publishers, DSPs, advertisers, and data providers, as well as Operator Enterprise Partners, such as Microsoft Azure, AWS, and Snowflake. |
| [SDKs](./sdks/README.md) | Links to SDK docs, including the Client-Side JavaScript SDK for websites and the Server-Side SDK Guide for RTB. | 

## Environment 

All UID2 endpoints use the same base URL.

| Environment | Base URL |
| :--- | :--- |
| Testing | ```https://operator-integ.uidapi.com/v1``` |
| Production | ```https://prod.uidapi.com/v1``` |

For example, https://operator-integ.uidapi.com/v1/token/generate

## Authentication

To authenticate to UID2 endpoints, use a bearer token in the request's authorization header. 

```Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=```


## Query Parameter Value Encoding

When passing query parameter values in a request, ensure the query parameter value is URL-encoded. Use JavaScript's `encodeURIcomponent()` or its equivalent in your coding language.

The following table provides URL-encoded, base64-encoded SHA256  examples of query parameters. 

| Type | Example | Usage |
| :--- | :--- | :--- |
| Email address| `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf%2FF5HVRQ%3D` | Use this encoding for `email_hash` query parameter values. |
| Phone number| `wdN1alhrbw1Bmz49GzKGdPvGxLhCNn7n3teAOQ%2FFSK4%3D` | Use this encoding for `phone_hash` query parameter values. |

For normalization and hash encoding rules, see [Unified ID 2.0 API Documentation](../README.md).
