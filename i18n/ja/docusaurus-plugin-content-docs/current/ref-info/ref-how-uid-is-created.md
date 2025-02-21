---
title: How the UID2 Token Is Created
description: Reference information about the process for generating a UID2 token.
hide_table_of_contents: false
sidebar_position: 06
---

import Link from '@docusaurus/Link';

# How the UID2 Token Is Created

When a publisher sends <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> (email or phone number) to UID2, and in return receives a <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> to use for targeted advertising, there is a very specific sequence of processing steps that occurs along the way.

 Some preliminary steps are taken by the publisher, but most of the processing steps are done by the UID2 <Link href="../ref-info/glossary-uid#gl-operator">Operator</Link>.

It's very important that the publisher steps are performed in the correct sequence:
- When steps are performed in sequence, the resulting value **matches** other instances of tokens generated from online activity by the same individual, and therefore the token is **valuable** for targeted advertising.
- If steps are taken out of sequence, the resulting value **does not match** other instances of tokens generated from online activity by the same individual, and therefore the token is **not valid** for targeted advertising.

For a summary, see [Steps to Create a UID2 Token](#steps-to-create-a-uid2-token). For an example in diagram form, see [Creating a UID2 Token&#8212;Example](#creating-a-uid2-tokenexample).

## Steps to Create a UID2 Token

The following table shows the steps for creating a UID2 token from DII, the sequence, and who performs each step.

For an example showing each step performed on a sample value, see [Creating a UID2 Token&#8212;Example](#creating-a-uid2-tokenexample).

<table width="100%">
  <thead>
    <tr>
      <th width="5%">Step</th>
      <th width="30%">Action</th>
      <th width="25%">Who Does It?</th>
      <th width="25%">Documentation</th>
      <th width="15%">[Example](#creating-a-uid2-tokenexample)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Normalization</td>
      <td>**Email**: Publisher or UID2 Operator<br/>**Phone number**: Publisher must normalize</td>
      <td>[Email Address Normalization](../getting-started/gs-normalization-encoding.md#email-address-normalization)<br/>[Phone Number Normalization](../getting-started/gs-normalization-encoding.md#phone-number-normalization)</td>
      <td>Not shown. For examples, see [Normalization Examples for Email](../getting-started/gs-normalization-encoding.md#normalization-examples-for-email).</td>
    </tr>
    <tr>
      <td>2</td>
      <td>SHA-256 hashing of normalized email address</td>
      <td>Publisher or UID2 Operator</td>
      <td>[Email Address Hash Encoding](../getting-started/gs-normalization-encoding.md#email-address-hash-encoding)<br/>[Phone Number Hash Encoding](../getting-started/gs-normalization-encoding.md#phone-number-hash-encoding)</td>
      <td>Column 1</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Hex to Base64 encoding of SHA-256 hash</td>
      <td>Publisher or UID2 Operator</td>
      <td>[Email Address Hash Encoding](../getting-started/gs-normalization-encoding.md#email-address-hash-encoding)<br/>[Phone Number Hash Encoding](../getting-started/gs-normalization-encoding.md#phone-number-hash-encoding)</td>
      <td>Column 1</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Send value to UID2 Operator via the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint, an SDK, Prebid.js, or another supported integration.</td>
      <td>Publisher</td>
      <td>Various: for a summary, see [Implementation Resources](../overviews/overview-publishers.md#implementation-resources)</td>
      <td>Not shown</td>
    </tr>
     <tr>
      <td>5</td>
      <td>Perform multiple steps including hashing and adding the secret <Link href="../ref-info/glossary-uid#gl-salt">salt</Link> value to create a raw UID2.</td>
      <td>UID2 Operator</td>
      <td>Not applicable: these steps are all performed by the UID2 Operator.</td>
      <td>Column 2</td>
    </tr>
     <tr>
      <td>6</td>
      <td>Encrypt the raw UID2 to create a UID2 token.</td>
      <td>UID2 Operator</td>
      <td>Not applicable: performed by the UID2 Operator.</td>
      <td>Column 3</td>
    </tr>
 </tbody>
</table>

## Creating a UID2 Token&#8212;Example

The following diagram shows the high-level steps for creating a [raw UID2](../ref-info/glossary-uid.md#gl-raw-uid2) (first column, second column) and then a [UID2 token](../ref-info/glossary-uid.md#gl-uid2-token) (third column).

The publisher can send a request to the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint or use one of the other integration options, such as an SDK or Prebid. Whatever the integration option, the result is a UID2 token&#8212;an encrypted value that the publisher can send in the bidstream for targeted advertising.

![Sequential steps for creating a UID2](images/HowUID2Created_UID2ImplementationPlaybook.jpg)

The token cannot be reverse engineered to tie back to the advertiser side. The UID2 process operates by passing an email or its hashed equivalent to the UID2 Operator, and the Operator then processes and encrypts the value to create a UID2 token. Demand-Side Platforms (DSPs) decrypt this token to arrive at the underlying raw UID2, and can then align it with UID2 segments predefined by advertisers who have transformed their data into UID2 format. Each participant only has access to their own specific information.
