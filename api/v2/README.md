# UID2 API v2 Documentation

For UID2 definition, forms, guiding principles, components, and other conceptual details, see [UID2 Overview](../../README.md). For contact information, authentication, and license information, see [Unified ID 2.0 API Documentation](../README.md).

This page provides the following information required for you to get started with the UID2 API:

* [Improvements and Changes from Version 1](#improvements-and-changes-from-version-1)
* [Compatibility and Upgrade Requirements](#compatibility-and-upgrade-requirements)
* [Environment](#environment)
* [Authentication and Authorization](#authentication-and-authorization)
* [Email Address Normalization](#email-address-normalization)
* [Email Address Hash Encoding](#email-address-hash-encoding)
* [Phone Number Normalization](#phone-number-normalization)
* [Phone Number Hash Encoding](#phone-number-hash-encoding)


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
- No URL-encoding of parameter values.
- The [POST /identity/map](./endpoints/post-identity-map.md) endpoint that now retrieves UID2s and salt bucket IDs for one or multiple email addresses, phone numbers, or the respective hashes. 
- In addition to the client `key` for [authetication](#authentication-and-authorization), a client `secret` is now required for encrypting API requests and decrypting API responses.
- TBD

## Compatibility and Upgrade Requirements

Here's what you need to know about UID2 API v2 compatibility with v1:

- UID2 API v2 is not compantible with UID2 API v1 and requires an upgrade.
- The v1 endpoints will be supported until the migration process is completed, with the approppiate notifications issued in a timely manner and with ample advance notice.
- Client keys have been upgraded to be compantible with both v1 and v2 API.
- Authorization tokens that are previously shared with UID2 partners will continue to work for accessing only UID2 v1 APIs.
- TBD

## Environment 

All UID2 endpoints use the same base URL.

| Environment | Base URL |
| :--- | :--- |
| Testing | ```https://integ.uidapi.com/v2``` |
| Production | ```https://prod.uidapi.com/v2``` |

For example, https://integ.uidapi.com/v2/token/generate

## Authentication and Authorization

To authenticate to UID2 endpoints, you need the following:

- A client `key`, which is to be included as a bearer token in the request's authorization header. 
  <br/>```Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=```
- A client `secret`, or an encryption key, for encrypting API requests and decrypting API responses for all endpoints, except [POST /token/refresh](./endpoints/post-token-refresh.md).  

For details on TBD, see [Generating Encrypted Requests and Decrypting Responses](./encryption-decryption.md).

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
