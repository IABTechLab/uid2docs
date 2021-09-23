# Unified ID 2.0 API Documentation

For UID2 definition, forms, guiding principles, components, and other conceptual details, see [UID2 Overview](../README.md).

This page provides the following information required for you to get started with the UID2 API:
* [Contact Info](#contact-info)
* [Environment](#environment)
* [Authentication](#authentication)
* [Email Address Normalization](#email-address-normalization)
* [Query Parameter Value Encoding](#query-parameter-value-encoding)
* [Email Address Hash Encoding](#email-address-hash-encoding)
* [Response Structure and Status Codes](#response-structure-and-status-codes)
* [License](#license)

For details on using the API, see the following pages.

| Documentation | Content Description |
| :--- | :--- |
| [Endpoints](./v1/endpoints/README.md) | API reference for managing identity tokens and mapping email addresses and hashes to their UID2s and salt bucket IDs used to generate the UID2s. |
| [Integration Guides](./v1/guides/README.md) | UID2 integration workflows for UID2 participants, such as publishers, DSPs, advertisers, and data providers, as well as Operator Enterprise Partners, such as Microsoft Azure, AWS, and Snowflake. |
| [SDKs](./v1/sdks/README.md) | Client-side JavaScript for websites and RTB SDKs. | 

## Contact Info

To access to UID2, contact the appropriate team at The Trade Desk listed below. 

>Contacting The Trade Desk for access is temporary. When the system is moved to independent governance, the governing organizations will handle access requests.

| Your Role | Contact Email |
| :--- | :--- |
| App Developer<br>Publisher | UID2publishers@thetradedesk.com |
| Agency<br>Brand<br>CDP<br>Data Provider<br>DSP<br>SSP | UID2partners@thetradedesk.com |

## Environment 

All UID2 endpoints use the same base URL.

| Environment | Base URL |
| :--- | :--- |
| Testing | ```https://integ.uidapi.com/v1``` |
| Production | ```https://prod.uidapi.com/v1``` |

For example, https://integ.uidapi.com/v1/token/generate

## Authentication

To authenticate to UID2 endpoints, use a bearer token in the request's authorization header. 

```Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=```

## Email Address Normalization

>NOTE: The UID2 Operator Service normalizes automatically unhashed email addresses. Hashed email adresses must be normalized.

Prior to sending email addresses in a request, normalize them by following these steps:

1. Remove leading and trailing spaces.
2. Convert all ASCII characters to lowercase.
3. In `gmail.com` email addresses, remove the following characters from the username part of the email address:
    1. The period  (`.` (ASCII code 46)).<br/>For example, normalize `jane.doe@gmail.com` to `janedoe@gmail.com`.
    2. The plus sign (`+` (ASCII code 43)) and all subsequent characters.<br/>For example, normalize `janedoe+home@gmail.com` to `janedoe@gmail.com`.

## Query Parameter Value Encoding

When passing query parameter values in with a request, ensure the query parameter value is URL-encoded. Use JavaScript's `encodeURIcomponent()` or its equivalent in your coding language.

## Email Address Hash Encoding

Email hashes are base64-encoded SHA256 hashes of the normalized email address.

| Type | Example | Use |
| :--- | :--- | :--- |
| Email | `user@example.com` | |
| SHA256 of email | `b4c9a289323b21a01c3e940f150eb9b8c542587f1abfd8f0e1cc1ffc5e475514` | |
| base64-encoded SHA256 of email | `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=` | Use this encoding for `email_hash` values sent in the request body. |
| URL-encoded, base64-encoded SHA256 of email| `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf%2FF5HVRQ%3D` | Use this encoding for `email_hash` query parameter values. |

## Response Structure and Status Codes

All endpoints return responses with the following structure.

```json
{
    "status": "success",
    "body": {
        "property": "propertyValue"
    },
    "message": "Descriptive message"
}
```

| Property | Description |
| :--- | :--- |
| `status` | The status of the request. For details and HTTP status code equivalents, see the table below. |
| `body.property` | The response payload. If the `status` value is other than `success`, this may be an endpoint-specific value where the issue has occurred. |
| `message` | Additional information about the issue, if the `status` value is other than `success`, for example, missing or invalid parameters. |

The following table lists the `status` property values and their HTTP status code equivalents.

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | The request was successful.|
| `optout` | 200 | The user opted out. This status is returned only for authorized requests. |
| `client_error` | 400 | The request had missing or invalid parameters. For details on the issue, see the `message` property in the response.|
| `invalid_token` | 400 | The request had an invalid identity token specified. This status is returned only for authorized requests. |
| `unauthorized` | 401 | The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested operation. |

## License
All work and artifacts are licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.txt).
