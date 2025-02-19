---
title: How a UID2 Token Is Generated
description: Reference information about the process for generating a UID2 token.
hide_table_of_contents: false
sidebar_position: 06
---

import Link from '@docusaurus/Link';

# How a UID2 Token Is Generated

When a publisher sends <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> (email or phone number) to UID2, and in return receives a <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> to use for targeted advertising, there is a very specific sequence of processing steps that occurs.

It's very important that the exact steps are performed, in the correct sequence:
- When steps are performed in sequence, the resulting value **matches** other instances of tokens generated from online activity by the same individual, and therefore the token is **valuable** for targeted advertising.
- If steps are taken out of sequence, the resulting value **does not match** other instances of tokens generated from online activity by the same individual, and therefore the token is **not valid** for targeted advertising.

 Some preliminary steps are taken by the publisher; most processing steps are done by the UID2 Operator. For a summary, see [Steps to Create a UID2 Token](#steps-to-create-a-uid2-token). For visuals, see [Creating a UID2 Token&#8212;Example](#creating-a-uid2-tokenexample).

<!-- Here's a common scenario.

A publisher has a user's email address or phone number, and wants to generate a UID2 token. The publisher follows these steps:

1. First, performs some steps on the DII to apply some security before sending it to the UID2 service. The publisher performs these steps:
   - Normalizes the DII. This is optional for emails but is required for phone numbers. For details, see [Phone Number Normalization](../getting-started/gs-normalization-encoding.md#phone-number-normalization).
   - Applies the SHA-256 hashing algorithm to the result.
   - Optionally, applies Hex to Base64 encoding to the result. -->

## Steps to Create a UID2 Token

The following table shows the steps for creating a UID2 token from DII, the sequence, and who performs each step.

For an example showing each step performed on a sample value, see [Creating a UID2 Token&#8212;Example](#creating-a-uid2-tokenexample).

<table width="100%">
  <thead>
    <tr>
      <th width="10%">Step</th>
      <th width="30%">Action</th>
      <th width="30%">Who Does It?</th>
      <th width="30%">Documentation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Normalization</td>
      <td>**Email**: Publisher or UID2 service<br/>**Phone number**: Publisher must normalize</td>
      <td>[Email Address Normalization](../getting-started/gs-normalization-encoding.md#email-address-normalization)<br/>[Phone Number Normalization](../getting-started/gs-normalization-encoding.md#phone-number-normalization)</td>
    </tr>
    <tr>
      <td>2</td>
      <td>SHA-256 hashing</td>
      <td>Publisher or UID2 service</td>
      <td>[Email Address Hash Encoding](../getting-started/gs-normalization-encoding.md#email-address-hash-encoding)<br/>[Phone Number Hash Encoding](../getting-started/gs-normalization-encoding.md#phone-number-hash-encoding)</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Hex to Base64 encoding</td>
      <td>Publisher or UID2 service</td>
      <td>[Email Address Hash Encoding](../getting-started/gs-normalization-encoding.md#email-address-hash-encoding)<br/>[Phone Number Hash Encoding](../getting-started/gs-normalization-encoding.md#phone-number-hash-encoding)</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Send value to UID2 Operator via the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint, an SDK, Prebid.js, or another supported avenue.</td>
      <td>Publisher</td>
      <td>Various: for a summary, see [Implementation Resources](../overviews/overview-publishers.md#implementation-resources)</td>
    </tr>
  </tbody>
</table>






## Creating a UID2 Token&#8212;Example

The following diagram illustrates xxx

xxx

## xxx

xxx

