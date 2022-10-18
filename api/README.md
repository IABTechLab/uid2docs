# Getting Started with UID2

For UID2 definitions, ID types, guiding principles, components, and other conceptual details, see [UID2 Overview](../README.md).

This page provides the following information required for you to get started with the UID2 API:
* [Contact Info](#contact-info)
* [API Versions](#api-versions)
* [Email Address Normalization](#email-address-normalization)
* [Email Address Hash Encoding](#email-address-hash-encoding)
* [Phone Number Normalization](#phone-number-normalization)
* [Phone Number Hash Encoding](#phone-number-hash-encoding)
* [License](#license)


## Contact Info

To get access to the UID2 framework, contact the appropriate team at The Trade Desk listed below. 

>Contacting The Trade Desk for access is temporary. When the system is moved to independent governance, the governing organizations will handle access requests.

| Your Role | Contact Email |
| :--- | :--- |
| App Developer<br>Publisher | UID2publishers@thetradedesk.com |
| Agency<br>Brand<br>CDP<br>Data Provider<br>DSP<br>SSP | UID2partners@thetradedesk.com |

## API Versions

Currently, there are two versions of the UID2 APIs: [UID2 API v1](./v1/README.md) and [UID2 API v2](./v2/README.md). 

>IMPORTANT: The UID2 API v1 has been deprecated and will be supported only for the current users until March 31, 2023, when all v1 SDK files and endpoints, the v0 SDK files, and any unversioned endpoints will be removed. Be sure to [upgrade to the UID2 API v2](../api/v2/upgrade-guide.md) by March 31, 2023. If you are new to the framework, use the [UID2 API v2](../api/v2/README.md).


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

## License
All work and artifacts are licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.txt).
