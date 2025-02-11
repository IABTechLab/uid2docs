---
title: How the UID2 Token Is Generated
description: Reference information about the process for generating a UID2 token.
hide_table_of_contents: false
sidebar_position: 06
---

import Link from '@docusaurus/Link';

# How the UID2 Token Is Generated

The process for creating a UID2 from <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> is a little different depending on the role of the UID2 participant and therefore whether they want to create a <Link href="../ref-info/glossary-uid#gl-raw-uid2">raw UID2</Link> or a <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link>.

Here's a common scenario.

A publisher has a user's email address or phone number, and wants to generate a UID2 token. The publisher follows these steps:

1. First, performs some steps on the DII to apply some security before sending it to the UID2 service. The publisher performs these steps:
   - Normalizes the DII. This is optional for emails but is required for phone numbers. For details, see [Phone Number Normalization](../getting-started/gs-normalization-encoding.md#phone-number-normalization).
   - Applies the SHA-256 hashing algorithm to the result.
   - Optionally, applies Hex to Base64 encoding to the result.

## Steps to Create a UID2 Token

The following table shows the steps for creating a UID2 token from DII, and shows who performs each step.

For an example showing each step on a sample value, see [Creating a UID2 Token&#8212;Example](#creating-a-uid2-tokenexample).

<table width="100%">
  <thead>
    <tr>
      <th width="10%">Step</th>
      <th width="45%">Action</th>
      <th width="45%">Who Does It?</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Normalization</td>
      <td>For email&#8212;Publisher or UID2 service<br/>For phone number&#8212;Publisher must normalize</td>
    </tr>
    <tr>
      <td>2</td>
      <td>SHA-256 hashing</td>
      <td>Publisher or UID2 service</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Hex to Base64 encoding</td>
      <td>Publisher or UID2 service</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Send value to UID2 Operator via the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint, an SDK, Prebid.js, or another supported avenue.</td>
      <td>Publisher</td>
    </tr>
  </tbody>
</table>

## Creating a UID2 Token&#8212;Example

The following diagram illustrates xxx

xxx

## xxx

xxx

