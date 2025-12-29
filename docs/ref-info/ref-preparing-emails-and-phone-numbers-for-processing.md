---
title: Preparing DII for Processing
description: Summary of key steps to prepare your input data for conversion to UID2s.
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Preparing Emails and Phone Numbers for Processing

The input data that you provide to the UID2 Service must be in the correct format so that the data is correctly converted to valid UID2s that you can use for targeted advertising.

This is true in all cases, whichever of these solutions you're using to convert your emails and phone numbers to UID2s:
- By making direct calls to the UID2 APIs.
- Via your own Private Operator.
- By using any of the UID2 SDK integrations, Prebid.js integration, or Android/iOS integration.
- By using Snowflake.

The exact steps for preparing your data to be consumed by the UID2 service are laid out in the [Normalization and Encoding](../getting-started/gs-normalization-encoding.md) documentation. The steps, in sequence, are as follows:
1. Normalize the raw data.
2. Create a 32-byte SHA-256 hash of the normalized raw data.
3. Apply Base64-encoding to the 32-byte SHA-256 value.

If you're making direct calls to the UID2 APIs, or calling the UID2 APIs via your own Private Operator, you must complete each step, exactly as described and in the correct sequence.

If you're using a UID2 SDK, or other integration solution such as the Prebid.js integration, Android/iOS integration, or Snowflake, the options for your input data are shown in the following table.

<table>
  <thead>
    <tr>
      <th>Type of DII</th>
      <th>Input Format</th>
      <th>Instructions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Email</td>
      <td>Must be one of the following:<ul><li>Raw email</li><li>Normalized email</li><li>Normalized, then hashed, then base64-encoded</li></ul></td>
      <td>[Email Address Normalization](../getting-started/gs-normalization-encoding#email-address-normalization)<br/>[Email Address Hash Encoding](../getting-started/gs-normalization-encoding#email-address-hash-encoding)</td>
    </tr>
    <tr>
      <td>Phone Number</td>
      <td>Must be one of the following:<ul><li>Normalized, including country code</li><li>Normalized, then hashed, then base64-encoded</li></ul></td>
      <td>[Phone Number Normalization](../getting-started/gs-normalization-encoding#phone-number-normalization)<br/>[Phone Number Hash Encoding](../getting-started/gs-normalization-encoding#phone-number-hash-encoding)</td>
    </tr>
 </tbody>
</table>
