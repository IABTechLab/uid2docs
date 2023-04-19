---
title: Normalization and Encoding
description: Learn how to normalize and encode information so it's secure and can be decoded.
hide_table_of_contents: false
sidebar_position: 13
---

# Normalization and Encoding

This page provides information about normalizing and encoding personal information before sending it to UID2. It's important that, in working with UID2, normalizing and encoding are performed correctly.

<!-- It includes the following sections:
- [Introduction](#introduction)
- [Types of Directly Identifying Information (DII))](#types-of-directly-identifying-information-dii)
- [Email Address Normalization](#email-address-normalization)
- [Email Address Hash Encoding](#email-address-hash-encoding)
- [Phone Number Normalization](#phone-number-normalization)
- [Phone Number Hash Encoding](#phone-number-hash-encoding) -->

## Introduction
When you're taking user information such as email addresses, and following the steps to create a raw UID2 and possibly also a UID2 advertising token, it's very important that you follow the required steps exactly. Whether you need to normalize the information or not, whether you hash it or not, follow the steps exactly, and in the exact sequence they are given. By doing so, you can ensure that the UID2 value you create can be securely and anonymously matched up with other instances of online behavior by the same user.{**gwh/AT_01: Copy previously said and/or a UID2 advertising token. But I don't think they could start with PII and create an advertising token without first going to raw UID2 -- correct?**}

## Types of Directly Identifying Information (DII)
UID2 supports the following types of directly identifying information:
- Email address
- Phone number

## Reasons for Normalization and Encoding
When you send user information to the UID2 service, these things are important:
* Every piece of user information must be processed into an opaque value before sending, to keep the information secure.
* The information must be relayed accurately.
* The information must be processed with the exact set of steps defined by UID2, in sequence. This helps ensure that the resulting value can be matched to another instance of the same email address or phone number, processed in the same way.

If a step is missed, or the steps are applied out of sequence, the value you produce will not match another instance of the same piece of personal information run through the same process. This would defeat the purpose of UID2. The exact steps must be followed.

Normalization is important so that all the values are in a standard format before encoding. For example:
- Email addresses sometimes contain special characters or other variables that can result in two renditions of the same email address.
- The same phone number might be represented in different formats: with or without the country code, with or without brackets, spaces, or dashes. Therefore, normalization must be done before hashing.

Hashing is important for the security of the information.

Encoding ensures that the value only contains characters that are URL-safe and can be relayed accurately to the UID2 service.

## Processing the Information

Whether you are processing an email address or a phone number, there are three steps:

1. Normalize the information:
   - For email addresses, see [Email Address Normalization](#email-address-normalization)
   - For phone numbers, see [Phone Number Normalization](#phone-number-normalization)
1. Take the normalized value and create an SHA-256 hash.
    You could use a tool such as [https://md5hashing.net/hash](https://md5hashing.net/hash).
1. Take the normalized and hashed value, and apply hex to Base64 SHA-256 encoding to it.
    IMPORTANT: You must use a Base64 encoder that takes a hex value as input, such as [https://base64.guru/converter/encode/hex](https://base64.guru/converter/encode/hex). If you use an encoder that reads the input value as plain text, such as [https://www.base64encode.org/](https://www.base64encode.org/), the output will be incorrect.

Another approach to applying the Base64 SHA-256 encoding is to run the following command at a Bash terminal:

`echo [SHA-256 hash of normalized phone number] | xxd -r -p | base64`

## Email Address Normalization

If you send unhashed email addresses to the UID2 Operator Service, the service normalizes the email addresses and then hashes them. If you want to hash the email addresses yourself before sending them, you must normalize them before you hash them.

> IMPORTANT: Normalizing before hashing ensures that the generated UID2 value will always be the same, so that the data can be matched. If you do not normalize before hashing, this might result in a different UID2, reducing the effectiveness of targeted advertising.

To normalize an email address, follow these steps exactly:

1. Remove leading and trailing spaces.
2. Convert all ASCII characters to lowercase.
3. In `gmail.com` email addresses, remove the following characters from the username part of the email address:
    1. The period  (`.` (ASCII code 46)).<br/>For example, normalize `jane.doe@gmail.com` to `janedoe@gmail.com`.
    2. The plus sign (`+` (ASCII code 43)) and all subsequent characters.<br/>For example, normalize `janedoe+home@gmail.com` to `janedoe@gmail.com`.


## Email Address Hash Encoding Example

An email hash is a Base64-encoded SHA-256 hash of a normalized email address. The email address is first normalized, then hashed using the SHA-256 hashing algorithm, and the resulting hex value is encoded using Base64 encoding.

The example below shows a simple input email value, and the result as each step is applied to arrive at a secure, opaque, URL-safe value.

| Type | Example | Comments and Usage |
| :--- | :--- | :--- |
| Normalized email address | `user@example.com` | Normalization is always the first step. |
| SHA-256 hash of normalized email address | `b4c9a289323b21a01c3e940f150eb9b8c542587f1abfd8f0e1cc1ffc5e475514` | This 64-character string is a hex-encoded representation of the 32-byte SHA-256 hash.|
| Hex to Base64 SHA-256 encoding of normalized and hashed email address | `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=` | This 44-character string is a Base64-encoded representation of the 32-byte SHA-256 hex value.<br/>NOTE: The SHA-256 hash is a hexadecimal value. You must use a Base64 encoder that takes a hex value as input, such as [https://base64.guru/converter/encode/hex](https://base64.guru/converter/encode/hex). |

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

## Phone Number Hash Encoding Example

A phone number hash is a Base64-encoded SHA-256 hash of a normalized phone number. The phone number is first normalized, then hashed using the SHA-256 hashing algorithm, and the resulting hex value is encoded using Base64 encoding.

The example below shows a simple input phone number, and the result as each step is applied to arrive at a secure, opaque, URL-safe value.

| Type | Example | Comments and Usage |
| :--- | :--- | :--- |
| Normalized phone number | `+12345678901` | Normalization is always the first step. |
| SHA-256 hash of normalized phone number | `10e6f0b47054a83359477dcb35231db6de5c69fb1816e1a6b98e192de9e5b9ee` | SHA-256 produces a 256-bit (32-byte) hash value.<br/>This 64-character string is a hex-encoded representation of the 32-byte SHA-256 hash.|
| Hex to Base64 SHA-256 encoding of normalized and hashed phone number | `EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=` | This 44-character string is a Base64-encoded representation of the 32-byte SHA-256 hex value.<br/>NOTE: The SHA-256 hash is a hexadecimal value. You must use a Base64 encoder that takes a hex value as input, such as [https://base64.guru/converter/encode/hex](https://base64.guru/converter/encode/hex). |
