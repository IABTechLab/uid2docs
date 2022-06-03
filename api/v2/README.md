# UID2 API v2 Documentation

For UID2 definition, forms, guiding principles, components, and other conceptual details, see [UID2 Overview](../../README.md). For contact information, authentication, and license information, see [Unified ID 2.0 API Documentation](../README.md).

This page provides the following information required for you to get started with the UID2 API:

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


## Environment 

All UID2 endpoints use the same base URL.

| Environment | Base URL |
| :--- | :--- |
| Testing | ```https://integ.uidapi.com/v2``` |
| Production | ```https://prod.uidapi.com/v2``` |

For example, https://integ.uidapi.com/v2/token/generate

## Authentication

To authenticate to UID2 endpoints, use a bearer token in the request's authorization header. 

```Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=```


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



