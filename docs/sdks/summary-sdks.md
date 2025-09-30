---
title: SDKs - Summary
sidebar_label: SDKs - Summary
pagination_label: SDKs - Summary
description: Summary of SDK documentation available.
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# SDKs: Summary

Review the SDK functionality to determine which SDK or SDKs you want to use, then click through in the SDKs table to review the reference documentation.

## SDK Functionality

The following table summarizes the functionality available with each SDK.

<!-- | UID2 SDK for... | Client-Side or Server-Side | Generate UID2 Token from DII | Refresh UID2 Token | Map DII to Raw UID2s&ast; | Monitor Rotated Salt Buckets&ast;&ast; | Encrypt Raw UID2 to UID2 Token for Sharing | Decrypt UID2 Token to Raw UID2 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
|JavaScript | Client | &#9989; | &#9989; | &#8212; | &#8212; | &#8212; | &#8212; |
|Java | Server | &#9989; | &#9989; | &#9989; | &#8212; | &#9989; | &#9989; |
|Python | Server | &#9989; | &#9989; | &#9989; | &#9989; | &#9989; | &#9989; |
|C# / .NET | Server | &#8212; | &#8212; | &#8212; | &#8212; | &#9989; | &#9989; |
|C++ | Server | &#8212; | &#8212; | &#8212; | &#8212; | &#9989; | &#9989; |
|Android | Client&nbsp;(Mobile) | &#9989; | &#9989; | &#8212; | &#8212; | &#8212; | &#8212; |
|iOS | Client (Mobile) | &#9989;| &#9989; |&#8212; | &#8212; | &#8212; | &#8212; | -->

<table>
  <thead>
    <tr>
      <th colspan="2">Audience&nbsp;&nbsp;&gt;&nbsp;&gt;&nbsp;&gt;</th>
      <th colspan="2">Publisher</th>
      <th colspan="2">Advertiser&nbsp;/ Data Provider</th>
      <th colspan="2">DSP</th>
    </tr>
    <tr>
      <th> SDK for...</th>
      <th>Client-Side or Server-Side</th>
      <th>Generate UID2 Token from DII</th>
      <th>Refresh UID2 Token</th>
      <th>Map DII to Raw UID2s&ast;</th>
      <th>Monitor Rotated Salt Buckets&ast;&ast;</th>
      <th>Encrypt Raw UID2 to UID2 Token for Sharing</th>
      <th>Decrypt UID2 Token to Raw UID2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>JavaScript</td>
      <td>Client</td>
      <td>&#9989;</td>
      <td>&#9989;</td>
      <td>&#8212;</td>
      <td>&#8212;</td>
      <td>&#8212;</td>
      <td>&#8212;</td>
    </tr>
    <tr>
      <td>Java</td>
      <td>Server</td>
      <td>&#9989;</td>
      <td>&#9989;</td>
      <td>&#9989;</td>
      <td>&#8212;</td>
      <td>&#9989;</td>
      <td>&#9989;</td>
    </tr>
    <tr>
      <td>Python</td>
      <td>Server</td>
      <td>&#9989;</td>
      <td>&#9989;</td>
      <td>&#9989;</td>
      <td>&#9989;</td>
      <td>&#9989;</td>
      <td>&#9989;</td>
    </tr>
    <tr>
      <td>C# / .NET</td>
      <td>Server</td>
      <td>&#8212;</td>
      <td>&#8212;</td>
      <td>&#8212;</td>
      <td>&#8212;</td>
      <td>&#9989;</td>
      <td>&#9989;</td>
    </tr>
    <tr>
      <td>C++</td>
      <td>Server</td>
      <td>&#8212;</td>
      <td>&#8212;</td>
      <td>&#8212;</td>
      <td>&#8212;</td>
      <td>&#9989;</td>
      <td>&#9989;</td>
    </tr>
    <tr>
      <td>Android</td>
      <td>Client&nbsp;(Mobile)</td>
      <td>&#9989;</td>
      <td>&#9989;</td>
      <td>&#8212;</td>
      <td>&#8212;</td>
      <td>&#8212;</td>
      <td>&#8212;</td>
    </tr>
    <tr>
      <td>iOS</td>
      <td>Client&nbsp;(Mobile)</td>
      <td>&#9989;</td>
      <td>&#9989;</td>
      <td>&#8212;</td>
      <td>&#8212;</td>
      <td>&#8212;</td>
      <td>&#8212;</td>
    </tr>
  </tbody>
</table>

&ast; Advertisers and Data Providers who need to generate raw UID2s from DII can also do this via Snowflake (see [Snowflake Integration Guide](../guides/integration-snowflake.md)) or by using the [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) endpoint.

&ast;&ast; Monitoring rotated salt buckets is not necessary for implementations using the latest version of the [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) endpoint.

<!-- &#9989; = Supported | &#8212; = Not Supported -->

## SDK Documentation

The following SDK documentation is available for UID2 integration. Documentation links are in the first column.

| SDK/Link&nbsp;to&nbsp;Guide | Description | Audience
| :--- | :--- | :--- |
| [SDK for JavaScript](sdk-ref-javascript.md) | Client-side JavaScript SDK that facilitates the process of establishing client identity using UID2 and retrieving UID2 tokens for publishers. | Publishers |
| [SDK for Java](sdk-ref-java.md) | An SDK for audiences using Java server-side:<ul><li>Helps publishers to generate or refresh UID2 tokens from <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> ([POST&nbsp;/token/generate](../endpoints/post-token-generate)).</li><li>Helps UID2 sharers to encrypt or decrypt UID2 tokens ([Usage for UID2 Sharers](sdk-ref-java.md#usage-for-uid2-sharers)).</li><li>Helps DSPs to decrypt UID2 tokens from bid requests ([Decrypt UID2 Tokens for RTB Use](guides/dsp-guide.md#decrypt-uid2-tokens-for-rtb-use)).</li></ul> | Publishers<br/>DSPs<br/>Advertisers<br/>Data&nbsp;Providers<br/>Sharers |
| [SDK for Python](sdk-ref-python.md) | An SDK for audiences using Python server-side:<ul><li>Helps publishers to generate or refresh UID2 tokens from <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> ([POST&nbsp;/token/generate](../endpoints/post-token-generate)).</li><li>Helps UID2 sharers to encrypt or decrypt UID2 tokens ([Usage for UID2 Sharers](sdk-ref-python.md#usage-for-uid2-sharers)).</li><li>Helps DSPs to decrypt UID2 tokens from bid requests ([Decrypt UID2 Tokens for RTB Use](guides/dsp-guide.md#decrypt-uid2-tokens-for-rtb-use)).</li></ul> | Publishers<br/>DSPs<br/>Data Providers<br/>Sharers |
| [SDK for C# / .NET](sdk-ref-csharp-dotnet.md) | An SDK for audiences using .NET server-side:<ul><li>Helps DSPs to decrypt UID2 tokens from bid requests.</li><li>Helps UID2 sharers to encrypt or decrypt UID2 tokens.</li></ul> | DSPs<br/>Data Providers<br/>Sharers |
| [SDK for C++](sdk-ref-cplusplus.md) | An SDK for audiences using C++ server-side:<ul><li>Helps DSPs to decrypt UID2 tokens from bid requests.</li><li>Helps UID2 sharers to encrypt or decrypt UID2 tokens.</li></ul> | DSPs<br/>Data Providers<br/>Sharers |
| [SDK for Android](sdk-ref-android.md) |An SDK that facilitates the process of generating or establishing client identity using UID2 and retrieving UID2 tokens for publishers that need to support Android apps. | Publishers |
| [SDK for iOS](sdk-ref-ios.md) | An SDK that facilitates the process of generating or establishing client identity using UID2 and retrieving UID2 tokens for publishers that need to support iOS apps. | Publishers |
