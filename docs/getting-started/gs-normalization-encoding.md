---
title: Normalization and Encoding
description: Learn how to normalize and encode information so it's secure and can be decoded.
hide_table_of_contents: false
sidebar_position: 13
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Normalization and Encoding

This page provides information about normalizing and encoding <Link href="../ref-info/glossary-uid#gl-dii">DII</Link>. It's important that, in working with UID2, normalizing and encoding are performed correctly.

## Introduction

When you're taking user information such as an email address, and following the steps to create a raw UID2 and/or a UID2 advertising token, it's very important that you follow all the required steps. Whether you normalize emails or not, and whether you hash emails and phone numbers or not, follow the steps exactly. By doing so, you can ensure that the UID2 value you create can be securely and anonymously matched up with other instances of online behavior by the same user.

:::important
- Raw UID2s, and their associated UID2 tokens, are case sensitive. When working with UID2, it's important to pass all IDs and tokens without changing the case. Mismatched IDs can cause ID parsing or token decryption errors.
- If you miss any of the required steps&#8212;for example, you hash without first normalizing&#8212;the result will not be the correct valid UID2 value for the input data.<br/>For example, let's say a data provider wants to generate a UID2 from `JANESaoirse@gmail.com`. This normalizes to `janesaoirse@gmail.com`, and the hashed and Base64-encoded value is `ku4mBX7Z3qJTXWyLFB1INzkyR2WZGW4ANSJUiW21iI8=`.<br/>The publisher, with the same email address, by mistake does not normalize. The hashed and Base64-encoded value for the un-normalized email, `JANESaoirse@gmail.com`, is `VpLXEp5N1bj/V1WzjgZsC+FfuYdntAOywSVIO00FD/E=`. These two different values result in two different UID2s. The first, processed correctly, matches other instances generated from the same original data. The second, incorrectly processed, does not.<br/>In this scenario, because the UID2 does not match other instances for the same user, the publisher misses the opportunity to benefit from targeted advertising.
:::

## Types of Directly Identifying Information

UID2 supports the following types of directly identifying information (DII):
- Email address
- Phone number

## Email Address Normalization

If you send unhashed email addresses to the UID2 <Link href="../ref-info/glossary-uid#gl-operator-service">Operator Service</Link>, the service normalizes the email addresses and then hashes them. If you want to hash the email addresses yourself before sending them, you must normalize them before you hash them.

:::important
Normalizing before hashing ensures that the generated UID2 value will always be the same, so that the data can be matched. If you do not normalize before hashing, this might result in a different UID2, reducing the effectiveness of targeted advertising.
:::

To normalize an email address, complete the following steps:

1. Remove leading and trailing spaces.
2. If there are uppercase characters, convert them to lowercase.
3. In `gmail.com` addresses only:
   1. If there is a period (`.`) in the address (ASCII decimal code 46/UTF-8 hexadecimal code 2E), remove it.
   
      For example, normalize `jane.doe@gmail.com` to `janedoe@gmail.com`.

   2. If there is a plus sign (`+`) with an additional string after it, before the `@gmail.com`, remove the plus sign (`+`) (ASCII decimal code 43/UTF-8 hexadecimal code 2B) and all subsequent characters.
    
       For example, normalize `janedoe+home@gmail.com` to `janedoe@gmail.com`.

:::warning
Make sure that the normalized email is UTF-8, not another encoding system such as UTF-16.
:::

For examples of various scenarios, see [Normalization Examples for Email](#normalization-examples-for-email).

## Email Address Hash Encoding

An email hash is a Base64-encoded <Link href="../ref-info/glossary-uid#gl-sha-256">SHA-256</Link> hash of a normalized email address. The email address is first normalized, then hashed using the SHA-256 hashing algorithm, and then the resulting bytes of the hash value are encoded using Base64 encoding. Note that the Base64 encoding is applied to the bytes of the hash value, not the hex-encoded string representation.

The following table shows an example of a simple input email address, and the result as each step is applied to arrive at a secure, opaque value.

The final value, the hex to Base64 encoded representation of the SHA-256 hash, is the value to provide to the UID2 Operator endpoint.

:::warning
When applying Base64 encoding, be sure to Base64-encode the raw bytes of the hash or use a Base64 encoder that takes a hex-encoded value as input. If you use a function that takes text as input, the result is a longer string which is invalid for the purposes of UID2.
:::

| Type | Example | Comments and Usage |
| :--- | :--- | :--- |
| Raw email address | `USER@example.com` | N/A |
| Normalized email address | `user@example.com` | Normalization is always the first step. |
| SHA-256 hash of normalized email address | `b4c9a289323b21a01c3e940f150eb9b8c542587f1abfd8f0e1cc1ffc5e475514` | This 64-character string is a hex-encoded representation of the 32-byte SHA-256. |
| Hex to Base64 encoding of SHA-256 hash | `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=` | This 44-character string is a Base64-encoded representation of the 32-byte SHA-256.<br/>WARNING: The SHA-256 hash string in the example above is a hex-encoded representation of the hash value. You must Base64-encode the raw bytes of the hash or use a Base64 encoder that takes a hex-encoded value as input.<br/>Use this encoding for `email_hash` values sent in the request body. |

For additional examples, see [Normalization Examples for Email](#normalization-examples-for-email).

## Normalization Examples for Email

The following table shows examples of original email addresses and the normalized and hashed values.

Some of the examples show email addresses that include the plus sign (+), with different domains. For `gmail` addresses, the plus sign and following characters, up to the `@` sign, are ignored in normalization. For other domains, these characters are included in the normalized value.

:::important
In working with your own UID2s, always provide the final value, the Base64-encoded value, to the UID2 Operator endpoint.
:::

<table>
  <thead>
    <tr>
      <th>Original Value</th>
      <th>Processing Steps and Resulting Values</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`MyEmail@example.com`<br/>`MYEMAIL@example.com`</td>
      <td>1. Normalize: `myemail@example.com`<br/>2. Hash: `16c18d336f0b250f0e2d907452ceb9658a74ecdae8bc94864c23122a72cc27a5`<br/>3. Base64-Encode: `FsGNM28LJQ8OLZB0Us65ZYp07NrovJSGTCMSKnLMJ6U=`</td>
    </tr>
    <tr>
      <td>`My.Email@example.com`</td>
      <td>1. Normalize: `my.email@example.com`<br/>2. Hash: `e22b53bc6f871274f3a62ab37a3caed7214fc14d676215a96a242fcfada1c81f`<br/>3. Base64-Encode: `4itTvG+HEnTzpiqzejyu1yFPwU1nYhWpaiQvz62hyB8=`</td>
    </tr>
    <tr>
      <td>`JANESAOIRSE@example.com`<br/>`JaneSaoirse@example.com`</td>
      <td>1. Normalize: `janesaoirse@example.com`<br/>2. Hash: `d6670e7a92007f1b5ff785f1fc81e53aa6d3d7bd06bdf5c473cdc7286c284b6d`<br/>3. Base64-Encode: `1mcOepIAfxtf94Xx/IHlOqbT170GvfXEc83HKGwoS20=`</td>
    </tr>
    <tr>
      <td>`jane.saoirse@example.com`<br/>`Jane.Saoirse@example.com`</td>
      <td>1. Normalize: `jane.saoirse@example.com`<br/>2. Hash: `b196432c7b989a2ca91c83799957c515da53e6c13abf20b78fea94f117e90bf8`<br/>3. Base64-Encode: `sZZDLHuYmiypHIN5mVfFFdpT5sE6vyC3j+qU8RfpC/g=`</td>
    </tr>
    <tr>
      <td>`JaneSaoirse+Work@example.com`</td>
      <td>1. Normalize: `janesaoirse+work@example.com`<br/>2. Hash: `28aaee4815230cd3b4ebd88c515226550666e91ac019929e3adac3f66c288180`<br/>3. Base64-Encode: `KKruSBUjDNO069iMUVImVQZm6RrAGZKeOtrD9mwogYA=`</td>
    </tr>
    <tr>
      <td>`JANE.SAOIRSE@gmail.com`<br/>`Jane.Saoirse@gmail.com`<br/>`JaneSaoirse+Work@gmail.com`</td>
      <td>1. Normalize: `janesaoirse@gmail.com`<br/>2. Hash: `92ee26057ed9dea2535d6c8b141d48373932476599196e00352254896db5888f`<br/>3. Base64-Encode: `ku4mBX7Z3qJTXWyLFB1INzkyR2WZGW4ANSJUiW21iI8=`</td>
    </tr>
 </tbody>
</table>

## Phone Number Normalization

:::important
You **must** normalize phone numbers before sending them in a request to the UID2 Operator Service, regardless of whether you apply hashing and encoding.
:::

Here's what you need to know about phone number normalization rules:

- The UID2 Operator accepts phone numbers in the [E.164](https://en.wikipedia.org/wiki/E.164) format, which is the international phone number format that ensures global uniqueness. 
- E.164 phone numbers can have a maximum of 15 digits.
- Normalized E.164 phone numbers use the following syntax, with no spaces, hyphens, parentheses, or other special characters:<br/>
  `[+] [country code] [subscriber number including area code]`
 Examples:
   - US: `1 (234) 567-8901` is normalized to `+12345678901`.
   - Singapore: `65 1243 5678` is normalized to `+6512345678`.
   - Sydney, Australia: `(02) 1234 5678` is normalized to drop the leading zero for the city plus include the country code: `+61212345678`.

:::warning
Make sure that the normalized phone number is UTF-8, not another encoding system such as UTF-16.
:::

## Phone Number Hash Encoding

A phone number hash is a Base64-encoded SHA-256 hash of a normalized phone number. The phone number is first normalized, then hashed using the SHA-256 hashing algorithm, and then the resulting bytes of the hash value are encoded using Base64 encoding. Note that the Base64 encoding is applied to the bytes of the hash value, not the hex-encoded string representation. 

The following table shows an example of a simple input phone number, and the result as each step is applied to arrive at a secure, opaque value.

The final value, the hex to Base64 encoded representation of the SHA-256 hash, is the value to provide to the UID2 Operator endpoint.

:::warning
When applying Base64 encoding, be sure to use a function that takes a hex value as input. If you use a function that takes text as input, the result is a longer string which is invalid for the purposes of UID2.
:::

| Type | Example | Comments and Usage |
| :--- | :--- | :--- |
| Raw phone number | `1 (234) 567-8901` | N/A |
| Normalized phone number | `+12345678901` | Normalization is always the first step. |
| SHA-256 hash of normalized phone number | `10e6f0b47054a83359477dcb35231db6de5c69fb1816e1a6b98e192de9e5b9ee` |This 64-character string is a hex-encoded representation of the 32-byte SHA-256. |
| Hex to Base64 encoding of SHA-256 hash | `EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=` | This 44-character string is a Base64-encoded representation of the 32-byte SHA-256.<br/>NOTE: The SHA-256 hash is a hexadecimal value. You must use a Base64 encoder that takes a hex value as input. Use this encoding for `phone_hash` values sent in the request body. |

## Example Code

For an example of how to generate email and phone hashes in JavaScript, see [Example Code: Hashing and Base-64 Encoding](../guides/integration-javascript-client-side#example-code-hashing-and-base-64-encoding).

## UID2 Hashing Tool

To check that you're correctly normalizing, hashing, and encoding, you can test with the [UID2 hashing tool](https://unifiedid.com/examples/hashing-tool/).

Choose Email or Phone Number, type or paste the value, and then click **Enter**.

The tool does the following:
- Email: Displays each of the following three values:
  - Normalized value
  - Hashed value
  - Base64-encoded value

- Phone: Displays each of the following two values:
  - Hashed value
  - Base64-encoded value

  :::important
  For phone numbers, you must first normalize the data.
  :::

If the input data doesn't have a valid email or phone number format, or if the phone number is not normalized, the tool gives an error.

You can use this tool to verify that your internal processes are set up to correctly create normalized, hashed, and encoded values for UID2.

## Troubleshooting

In all scenarios, follow the steps on your side to prepare your DII for processing, and then check your resulting values by using the [UID2 Hashing Tool](#uid2-hashing-tool). If the results don't match, check each step to find the error.

If you're having trouble or getting errors, or if you just want to be sure you're following the steps correctly, here are some things you can check:

- **Phone numbers**: Make sure you're normalizing&#8212;and normalizing correctly&#8212;as the first step.

  The service normalizes emails, but it can't normalize phone numbers. For example, it can't determine the value for a missing country code. Use these resources:
  - Instructions:  [Phone Number Normalization](#phone-number-normalization).
  - Tool for cross-checking: [UID2 Hashing Tool](#uid2-hashing-tool).

- **Use the Base64-encoded value**: The process includes normalizing, then hashing, then Base64-encoding the bytes of the hash value. When generating UID2s, the input is the Base64-encoded value. Make sure you're using this 44-character string value.

- You might see the following error message: "The hashing value must be 44 characters." In this scenario, there is an error with the hashing function you're using. Use the hex to Base64 encoding of the SHA-256 hash. For details, see [Email Address Hash Encoding](#email-address-hash-encoding) or [Phone Number Hash Encoding](#phone-number-hash-encoding). To cross-check, test using the [UID2 Hashing Tool](#uid2-hashing-tool).