# UID2 API v1 Documentation

For UID2 definition, forms, guiding principles, components, and other conceptual details, see [UID2 Overview](../../README.md). For contact information, authentication, and license information, see [Unified ID 2.0 API Documentation](../README.md).

This page provides the following information required for you to get started with the UID2 API v1:

* [Environment](#environment)
* [Query Parameter Value Encoding](#query-parameter-value-encoding)
* [Email Address Normalization](#email-address-normalization)
* [Email Address Hash Encoding](#email-address-hash-encoding)
* [Phone Number Normalization](#phone-number-normalization)
* [Phone Number Hash Encoding](#phone-number-hash-encoding)
* [Response Structure and Status Codes](#response-structure-and-status-codes)

For details on using the v1 UID2 API, see the following pages.

| Documentation | Content Description |
| :--- | :--- |
| [Endpoints](./endpoints/README.md) | API reference for managing identity tokens and mapping email addresses, phone numbers, or hashes to their UID2s and salt bucket IDs used to generate the UID2s. |
| [Integration Guides](./guides/README.md) | UID2 integration workflows for UID2 participants, such as publishers, DSPs, advertisers, and data providers, as well as Operator Enterprise Partners, such as Microsoft Azure, AWS, and Snowflake. |
| [SDKs](./sdks/README.md) | Client-side JavaScript for websites and RTB SDKs. | 

## Environment 

All UID2 endpoints use the same base URL.

| Environment | Base URL |
| :--- | :--- |
| Testing | ```https://integ.uidapi.com/v1``` |
| Production | ```https://prod.uidapi.com/v1``` |

For example, https://integ.uidapi.com/v1/token/generate


## Query Parameter Value Encoding

When passing query parameter values in a request, ensure the query parameter value is URL-encoded. Use JavaScript's `encodeURIcomponent()` or its equivalent in your coding language.

## Email Address Normalization

The UID2 Operator Service normalizes unhashed email addresses automatically. If you want to send hashed email addresses, you must normalize them before they are hashed.

To normalize an email address, complete the following steps:

1. Remove leading and trailing spaces.
2. Convert all ASCII characters to lowercase.
3. In `gmail.com` email addresses, remove the following characters from the username part of the email address:
    1. The period  (`.` (ASCII code 46)).<br/>For example, normalize `jane.doe@gmail.com` to `janedoe@gmail.com`.
    2. The plus sign (`+` (ASCII code 43)) and all subsequent characters.<br/>For example, normalize `janedoe+home@gmail.com` to `janedoe@gmail.com`.

## Email Address Hash Encoding

Email hashes are base64-encoded SHA256 hashes of the normalized email address.

| Type | Example | Usage |
| :--- | :--- | :--- |
| Normalized email address | `user@example.com` | |
| SHA256 of email address | `b4c9a289323b21a01c3e940f150eb9b8c542587f1abfd8f0e1cc1ffc5e475514` | |
| base64-encoded SHA256 of email address | `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=` | Use this encoding for `email_hash` values sent in the request body. |
| URL-encoded, base64-encoded SHA256 of email address| `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf%2FF5HVRQ%3D` | Use this encoding for `email_hash` query parameter values. |

## Phone Number Normalization

>IMPORTANT: You must normalize phone numbers before sending them in a request, regardless of whether you send them hashed or unhashed in a request.

Here's what you need to know about phone number normalization rules:

- The UID2 Operator accepts phone numbers in the [E.164](https://en.wikipedia.org/wiki/E.164) format, which is the international telephone number format that ensures global uniqueness. 
- E.164 phone numbers can have a maximum of 15 digits.
- Normalized E.164 phone numbers use the following syntax: `[+] [country code] [subscriber number including area code]`, with no spaces, hyphens, parentheses, or other special characters. For example, the phone numbers `+123 44 555-66-77` and `1 (123) 456-7890` must be normalized as `+123445556677` and `+11234567890`, respectively.

## Phone Number Hash Encoding

Phone number hashes are base64-encoded SHA256 hashes of the normalized phone number.

| Type | Example | Usage |
| :--- | :--- | :--- |
| Normalized phone number | `+12345678901` | |
| SHA256 of phone number | `c1d3756a586b6f0d419b3e3d1b328674fbc6c4b842367ee7ded780390fc548ae` | |
| base64-encoded SHA256 of phone number | `wdN1alhrbw1Bmz49GzKGdPvGxLhCNn7n3teAOQ/FSK4=` | Use this encoding for `phone_hash` values sent in the request body. |
| URL-encoded, base64-encoded SHA256 of phone number| `wdN1alhrbw1Bmz49GzKGdPvGxLhCNn7n3teAOQ%2FFSK4%3D` | Use this encoding for `phone_hash` query parameter values. |

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
