---
title: Normalization and Encoding
description: Learn how to normalize and encode information so it's secure and can be decoded.
hide_table_of_contents: false
sidebar_position: 13
---

# Normalization and Encoding

This page provides information about normalizing and encoding [directly Identifying information (DII)](../ref-info/glossary-uid.md#gl-dii). It's important that, in working with UID2, normalizing and encoding are performed correctly.

<!-- It includes the following sections:
- [Introduction](#introduction)
- [Types of Directly Identifying Information](#types-of-directly-identifying-information)
- [Email Address Normalization](#email-address-normalization)
- [Email Address Hash Encoding](#email-address-hash-encoding)
- [Phone Number Normalization](#phone-number-normalization)
- [Phone Number Hash Encoding](#phone-number-hash-encoding)
- [Example](#example)
-->

## Introduction
When you're taking user information such as an email address, and following the steps to create a raw UID2 and/or a UID2 advertising token, it's very important that you follow all the required steps. Whether you normalize the information or not, whether you hash it or not, follow the steps exactly. By doing so, you can ensure that the UID2 value you create can be securely and anonymously matched up with other instances of online behavior by the same user.

>Note: Raw UID2s, and their associated UID2 tokens, are case sensitive. When working with UID2, it's important to pass all IDs and tokens without changing the case. Mismatched IDs can cause ID parsing or token decryption errors.

## Types of Directly Identifying Information
UID2 supports the following types of directly identifying information (DII):
- Email address
- Phone number

## Email Address Normalization

If you send unhashed email addresses to the UID2 Operator Service, the service normalizes the email addresses and then hashes them. If you want to hash the email addresses yourself before sending them, you must normalize them before you hash them.

> IMPORTANT: Normalizing before hashing ensures that the generated UID2 value will always be the same, so that the data can be matched. If you do not normalize before hashing, this might result in a different UID2, reducing the effectiveness of targeted advertising.

To normalize an email address, complete the following steps:

1. Remove leading and trailing spaces.
2. Convert all ASCII characters to lowercase.
3. In `gmail.com` email addresses, remove the following characters from the username part of the email address:
    1. The period  (`.` (ASCII code 46)).<br/>For example, normalize `jane.doe@gmail.com` to `janedoe@gmail.com`.
    2. The plus sign (`+` (ASCII code 43)) and all subsequent characters.<br/>For example, normalize `janedoe+home@gmail.com` to `janedoe@gmail.com`.

## Email Address Hash Encoding

An email hash is a Base64-encoded SHA-256 hash of a normalized email address. The email address is first normalized, then hashed using the SHA-256 hashing algorithm, and then the resulting bytes of the hash value are encoded using Base64 encoding. Note that the bytes of the hash value are encoded, not the hex-encoded string representation.

| Type | Example | Comments and Usage |
| :--- | :--- | :--- |
| Normalized email address | `user@example.com` | Normalization is always the first step. |
| SHA-256 hash of normalized email address | `b4c9a289323b21a01c3e940f150eb9b8c542587f1abfd8f0e1cc1ffc5e475514` | This 64-character string is a hex-encoded representation of the 32-byte SHA-256.|
| Hex to Base64 SHA-256 encoding of normalized email address | `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=` | This 44-character string is a Base64-encoded representation of the 32-byte SHA-256.<br/>WARNING: The SHA-256 hash string in the example above is a hex-encoded representation of the hash value. You must Base64-encode the raw bytes of the hash or use a Base64 encoder that takes a hex-encoded value as input.<br/>Use this encoding for `email_hash` values sent in the request body. |

>WARNING: When applying Base64 encoding, be sure to Base64-encode the raw bytes of the hash or use a Base64 encoder that takes a hex-encoded value as input.

## Phone Number Normalization

If you send unhashed phone numbers to the UID2 Operator Service, the service normalizes the phone numbers and then hashes them. If you want to hash the phone numbers yourself before sending them, you must normalize them before you hash them.

> IMPORTANT: Normalization before hashing ensures that the generated UID2 value will always be the same, so that the data can be matched. If you do not normalize before hashing, this might result in a different UID2, reducing the effectiveness of targeted advertising.

Here's what you need to know about phone number normalization rules:

- The UID2 Operator accepts phone numbers in the [E.164](https://en.wikipedia.org/wiki/E.164) format, which is the international phone number format that ensures global uniqueness. 
- E.164 phone numbers can have a maximum of 15 digits.
- Normalized E.164 phone numbers use the following syntax, with no spaces, hyphens, parentheses, or other special characters:<br/>
  `[+] [country code] [subscriber number including area code]`
 Examples:
   - US: `1 (123) 456-7890` is normalized to `+11234567890`.
   - Singapore: `65 1243 5678` is normalized to `+6512345678`.
   - Sydney, Australia: `(02) 1234 5678` is normalized to drop the leading zero for the city plus include the country code: `+61212345678`.

## Phone Number Hash Encoding

A phone number hash is a Base64-encoded SHA-256 hash of a normalized phone number. The phone number is first normalized, then hashed using the SHA-256 hashing algorithm, and the resulting hex value is encoded using Base64 encoding.

The example below shows a simple input phone number, and the result as each step is applied to arrive at a secure, opaque, URL-safe value.

| Type | Example | Comments and Usage |
| :--- | :--- | :--- |
| Normalized phone number | `+12345678901` | Normalization is always the first step. |
| SHA-256 hash of normalized phone number | `10e6f0b47054a83359477dcb35231db6de5c69fb1816e1a6b98e192de9e5b9ee` |This 64-character string is a hex-encoded representation of the 32-byte SHA-256. |
| Hex to Base64 SHA-256 encoding of normalized and hashed phone number | `EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=` | This 44-character string is a Base64-encoded representation of the 32-byte SHA-256.<br/>NOTE: The SHA-256 hash is a hexadecimal value. You must use a Base64 encoder that takes a hex value as input. Use this encoding for `phone_hash` values sent in the request body. |

>WARNING: When applying Base64 encoding, be sure to use a function that takes a hex value as input. If you use a function that takes text as input, the result is a longer string which is invalid for the purposes of UID2.

## Example

For an example of how to generate email and phone hashes in JavaScript, see [Example Code: Hashing and Base-64 Encoding](../guides/publisher-client-side#example-code-hashing-and-base-64-encoding).