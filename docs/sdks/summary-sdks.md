---
title: SDKs - Summary
description: Summary of SDK documentation available.
hide_table_of_contents: false
sidebar_position: 01
---

Review the SDK functionality to determine which SDK or SDKs you want to use, then click through in the SDKs table to review the reference documentation.
## SDK Functionality

<!-- 
 | SDK | Client or Server | Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token | Generate UID2 Token from DII | Refresh UID2 Token | Generate Raw UID2 from DII |
| :--- | :--- |  :--- | :--- | :--- | :--- | :--- |
|UID2 SDK for JavaScript | Client-Side| &#10060; | &#10060; | &#10060; | &#9989; | &#10060; |
|UID2 SDK for Java | Server-Side | &#9989; | &#9989; | &#9989; | &#9989; | &#10060; |
|UID2 SDK for Python | Server-Side | &#9989; | &#9989; | &#9989; | &#9989; | &#10060; |
|UID2 SDK for C# / .NET | Server-Side | &#9989; | &#9989; | &#10060; | &#10060; | &#10060; |
|UID2 SDK for C++ | Server-Side | &#9989; | &#9989; | &#10060; | &#10060; | &#10060; |
|UID2 SDK for iOS | Client-Side| &#10060; | &#10060; | &#10060; | &#9989; |&#10060; |
|UID2 SDK for Android | Client-Side | &#10060; | &#10060; | &#10060; | &#9989; | &#10060; |
 -->

The following table summarizes the functionality available with each SDK.

| UID2 SDK for... | Client-Side or Server-Side | Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token | Generate UID2 Token from DII | Refresh UID2 Token | Generate Raw UID2 from DII |
| :--- | :--- |  :--- | :--- | :--- | :--- | :--- |
|JavaScript | Client| &#10060; | &#10060; | &#10060; | &#9989; | &#10060; |
|Java | Server | &#9989; | &#9989; | &#9989; | &#9989; | &#10060; |
|Python | Server | &#9989; | &#9989; | &#9989; | &#9989; | &#10060; |
|C# / .NET | Server | &#9989; | &#9989; | &#10060; | &#10060; | &#10060; |
|C++ | Server | &#9989; | &#9989; | &#10060; | &#10060; | &#10060; |
|iOS | Client| &#10060; | &#10060; | &#10060; | &#9989; |&#10060; |
|Android | Client | &#10060; | &#10060; | &#10060; | &#9989; | &#10060; |

<!-- &#9989; = Supported | &#10060; = Not Supported -->

## SDKs

The following SDK documentation is available for UID2 integration.

| SDK/Guide | Description | Audience
| :--- | :--- | :--- |
| [UID2 SDK for JavaScript Reference Guide](client-side-identity.md) | Client-side JavaScript SDK that facilitates the process of establishing client identity using UID2 and retrieving UID2 tokens for publishers. | Publishers |
| [UID2 SDK for Java (Server-Side) Reference Guide](uid2-sdk-ref-java.md) | An SDK for audiences using Java server-side:<ul><li>Helps publishers to generate or refresh UID2 tokens from [DII](../ref-info/glossary-uid.md#gl-dii) ([POST&nbsp;/token/generate](../endpoints/post-token-generate.md)).</li><li>Helps UID2 sharers to encrypt or decrypt UID2 tokens ([Usage for UID2 Sharers](uid2-sdk-ref-java.md#usage-for-uid2-sharers)).</li><li>Helps DSPs to decrypt UID2 tokens from bid requests (**GWH_KT link TBD**).</li></ul> | Publishers<br/>DSPs<br/>Advertisers<br/>Data Providers |
| [UID2 SDK for Python (Server-Side) Reference Guide](uid2-sdk-ref-python.md) | An SDK for audiences using Python server-side:<ul><li>Helps publishers to generate or refresh UID2 tokens from [DII](../ref-info/glossary-uid.md#gl-dii) ([POST&nbsp;/token/generate](../endpoints/post-token-generate.md)).</li><li>Helps UID2 sharers to encrypt or decrypt UID2 tokens ([Usage for UID2 Sharers](uid2-sdk-ref-python.md#usage-for-uid2-sharers)).</li><li>Helps DSPs to decrypt UID2 tokens from bid requests (**GWH_KT link TBD**).</li></ul> | Publishers<br/>DSPs<br/>Advertisers<br/>Data Providers |
| [UID2 SDK for C# / .NET (Server-Side) Reference Guide](uid2-sdk-ref-csharp-dotnet.md) | An SDK for audiences using .NET server-side:<ul><li>Helps DSPs to decrypt UID2 tokens from bid requests.</li><li>Helps UID2 sharers to encrypt or decrypt UID2 tokens.</li></ul> | DSPs<br/>Advertisers<br/>Data Providers |
| [UID2 SDK for C++ (Server-Side) Reference Guide](uid2-sdk-ref-cplusplus.md) | An SDK for audiences using C++ server-side:<ul><li>Helps DSPs to decrypt UID2 tokens from bid requests.</li><li>Helps UID2 sharers to encrypt or decrypt UID2 tokens.</li></ul> | DSPs<br/>Advertisers<br/>Data Providers |
| [UID2 SDK for Android Reference Guide](uid2-sdk-ref-android.md) |An SDK that facilitates the process of establishing client identity using UID2 and retrieving UID2 tokens for publishers that need to support Android apps. | Publishers |
| [UID2 SDK for iOS Reference Guide](uid2-sdk-ref-ios.md) | An SDK that facilitates the process of establishing client identity using UID2 and retrieving UID2 tokens for publishers that need to support iOS apps. | Publishers |
