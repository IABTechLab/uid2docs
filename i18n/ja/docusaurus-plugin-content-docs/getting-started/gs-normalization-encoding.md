---
title: Normalization and Encoding
description: Learn how to normalize and encode information so it's secure and can be decoded.
hide_table_of_contents: false
sidebar_position: 13
---

# Normalization and Encoding

This page provides information about normalizing and encoding personal information. It's important that, in working with UID2, normalizing and encoding are performed correctly.

<!-- It includes the following sections:
- [Introduction](#introduction)
- [Types of Directly Identifying Information (DII))](#types-of-directly-identifying-information-dii)
- [Email Address Normalization](#email-address-normalization)
- [Email Address Hash Encoding](#email-address-hash-encoding)
- [Phone Number Normalization](#phone-number-normalization)
- [Phone Number Hash Encoding](#phone-number-hash-encoding) -->

## Introduction
When you're taking user information such as email addresses, and following the steps to create a raw UID2 and/or a UID2 advertising token, it's very important that you follow the required steps exactly. Whether you need to normalize the information or not, whether you hash it or not, follow the steps exactly. By doing so, you can ensure that the UID2 value you create can be securely and anonymously matched up with other instances of online behavior by the same user.

## Types of Directly Identifying Information (DII)
UID2 supports the following types of directly identifying information:
- Email address
- Phone number

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

An email hash is a Base64-encoded SHA-256 hash of a normalized email address. The email address is first normalized, then hashed using the SHA-256 hashing algorithm, and then encoded using Base64 encoding.

| Type | Example | Comments and Usage |
| :--- | :--- | :--- |
| Normalized email address | `user@example.com` | Normalization is always the first step. |
| SHA-256 hash of normalized email address | `b4c9a289323b21a01c3e940f150eb9b8c542587f1abfd8f0e1cc1ffc5e475514` | This 64-character string is a hex-encoded representation of 32-byte SHA-256.|
| Base64-encoded SHA-256 of normalized email address | `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=` | This 44-character string is a Base64-encoded representation of 32-byte SHA-256.<br/>Use this encoding for `email_hash` values sent in the request body. |

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

A phone number hash is a Base64-encoded SHA-256 hash of a normalized phone number. The phone number is first normalized, then hashed using the SHA-256 hashing algorithm, and then encoded using Base64 encoding.

| Type | Example | Comments and Usage |
| :--- | :--- | :--- |
| Normalized phone number | `+12345678901` | Normalization is always the first step. |
| SHA-256 hash of normalized phone number | `10e6f0b47054a83359477dcb35231db6de5c69fb1816e1a6b98e192de9e5b9ee` |This 64-character string is a hex-encoded representation of 32-byte SHA-256. |
| Base64-encoded SHA-256 hash of normalized phone number | `EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=` | This 44-character string is a Base64-encoded representation of 32-byte SHA-256.<br/>Use this encoding for `phone_hash` values sent in the request body. |
