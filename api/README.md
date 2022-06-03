# Unified ID 2.0 API Documentation

For UID2 definition, forms, guiding principles, components, and other conceptual details, see [UID2 Overview](../README.md).

This page provides the following information required for you to get started with the UID2 API:
* [Contact Info](#contact-info)
* [API Versions](#api-versions)
* [Environment](#environment)
* [Email Address Normalization](#email-address-normalization)
* [Phone Number Normalization](#phone-number-normalization)
* [Response Status Codes](#response-status-codes)
* [License](#license)


## Contact Info

To access to UID2, contact the appropriate team at The Trade Desk listed below. 

>Contacting The Trade Desk for access is temporary. When the system is moved to independent governance, the governing organizations will handle access requests.

| Your Role | Contact Email |
| :--- | :--- |
| App Developer<br>Publisher | UID2publishers@thetradedesk.com |
| Agency<br>Brand<br>CDP<br>Data Provider<br>DSP<br>SSP | UID2partners@thetradedesk.com |

## API Versions

Currently, there are two versions of the UID2 APIs: [v1](./v1/README.md) and [v2](./v1/README.md).

TBD on differences

## Environment 

All UID2 endpoints use the same base URL.

| Environment | Base URL |
| :--- | :--- |
| Testing | ```https://integ.uidapi.com/{version}``` |
| Production | ```https://prod.uidapi.com/{version}``` |

For example, https://integ.uidapi.com/v2/token/generate


## Email Address Normalization

The UID2 Operator Service normalizes unhashed email addresses automatically. If you want to send hashed email addresses, you must normalize them before they are hashed.

To normalize an email address, complete the following steps:

1. Remove leading and trailing spaces.
2. Convert all ASCII characters to lowercase.
3. In `gmail.com` email addresses, remove the following characters from the username part of the email address:
    1. The period  (`.` (ASCII code 46)).<br/>For example, normalize `jane.doe@gmail.com` to `janedoe@gmail.com`.
    2. The plus sign (`+` (ASCII code 43)) and all subsequent characters.<br/>For example, normalize `janedoe+home@gmail.com` to `janedoe@gmail.com`.


## Phone Number Normalization

>IMPORTANT: You must normalize phone numbers before sending them in a request, regardless of whether you send them hashed or unhashed in a request.

Here's what you need to know about phone number normalization rules:

- The UID2 Operator accepts phone numbers in the [E.164](https://en.wikipedia.org/wiki/E.164) format, which is the international telephone number format that ensures global uniqueness. 
- E.164 phone numbers can have a maximum of 15 digits.
- Normalized E.164 phone numbers use the following syntax: `[+] [country code] [subscriber number including area code]`, with no spaces, hyphens, parentheses, or other special characters. For example, the phone numbers `+123 44 555-66-77` and `1 (123) 456-7890` must be normalized as `+123445556677` and `+11234567890`, respectively.


## Response Status Codes

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
