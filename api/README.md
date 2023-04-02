[UID2 Overview](../README.md) > Getting Started with UID2

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
| App Developer<br/>Publisher | UID2publishers@thetradedesk.com |
| Agency<br/>Brand<br/>CDP<br/>Data Provider<br/>DSP<br/>SSP | UID2partners@thetradedesk.com |

## API Versions

The only valid version of the UID2 API is v2.

>IMPORTANT: The UID2 API v1 has been deprecated and was supported only for the current users until March 31, 2023, when all v1 SDK files and endpoints, the v0 SDK files have been removed<!-- , and any unversioned endpoints will be removed -->. Be sure to [upgrade to the UID2 API v2](v2/upgrades/upgrade-guide.md) by March 31, 2023. If you are new to the framework, use the [UID2 API v2](v2/summary-doc-v2.md).

## Email Address Normalization

If you send unhashed email addresses to the UID2 Operator Service, the service normalizes the email addresses and then hashes them. If you want to hash the email addresses yourself before sending them, you must normalize them before you hash them.

> IMPORTANT: Normalization before hashing ensures that the generated UID2 value will always be the same, so that the data can be matched. If you do not normalize before hashing, this might result in a different UID2, reducing the effectiveness of targeted advertising.

To normalize an email address, complete the following steps:

1. Remove leading and trailing spaces.
2. Convert all ASCII characters to lowercase.
3. In `gmail.com` email addresses, remove the following characters from the username part of the email address:
    1. The period  (`.` (ASCII code 46)).<br/>For example, normalize `jane.doe@gmail.com` to `janedoe@gmail.com`.
    2. The plus sign (`+` (ASCII code 43)) and all subsequent characters.<br/>For example, normalize `janedoe+home@gmail.com` to `janedoe@gmail.com`.

## Email Address Hash Encoding

an email hash is a Base64-encoded SHA-256 hash of a normalized email address.

| Type | Example | Comments and Usage |
| :--- | :--- | :--- |
| Normalized email address | `user@example.com` | N/A |
| SHA-256 of email address | `b4c9a289323b21a01c3e940f150eb9b8c542587f1abfd8f0e1cc1ffc5e475514` | This 64-character string is a hex-encoded representation of 32-byte SHA-256.|
| Base64-encoded SHA-256 of email address | `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=` | This 44-character string is a Base64-encoded representation of 32-byte SHA-256.<br/>Use this encoding for `email_hash` values sent in the request body. |

## Phone Number Normalization

If you send unhashed phone numbers to the UID2 Operator Service, the service normalizes the phone numbers and then hashes them. If you want to hash the phone numbers yourself before sending them, you must normalize them before you hash them.

> IMPORTANT: Normalization before hashing ensures that the generated UID2 value will always be the same, so that the data can be matched. If you do not normalize before hashing, this might result in a different UID2, reducing the effectiveness of targeted advertising.

Here's what you need to know about phone number normalization rules:

- The UID2 Operator accepts phone numbers in the [E.164](https://en.wikipedia.org/wiki/E.164) format, which is the international telephone number format that ensures global uniqueness. 
- E.164 phone numbers can have a maximum of 15 digits.
- Normalized E.164 phone numbers use the following syntax: `[+] [country code] [subscriber number including area code]`, with no spaces, hyphens, parentheses, or other special characters. For example, the phone numbers `+123 44 555-66-77` and `1 (123) 456-7890` must be normalized as `+123445556677` and `+11234567890`, respectively.

## Phone Number Hash Encoding

Phone number hashes are Base64-encoded SHA-256 hashes of a normalized phone number.

| Type | Example | Comments and Usage |
| :--- | :--- | :--- |
| Normalized phone number | `+12345678901` | N/A |
| SHA-256 of phone number | `10e6f0b47054a83359477dcb35231db6de5c69fb1816e1a6b98e192de9e5b9ee` |This 64-character string is a hex-encoded representation of 32-byte SHA-256. |
| Base64-encoded SHA-256 of phone number | `EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=` | This 44-character string is a Base64-encoded representation of 32-byte SHA-256.<br/>Use this encoding for `phone_hash` values sent in the request body. |

## License
All work and artifacts are licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.txt).
