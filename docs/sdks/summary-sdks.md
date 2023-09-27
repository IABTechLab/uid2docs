---
title: SDKs - Summary
description: Summary of SDK documentation available.
hide_table_of_contents: false
sidebar_position: 01
---

Review the SDK functionality to determine which SDK or SDKs you want to use, then click through in the SDKs table to review the reference documentation.
## SDK Functionality

The following table summarizes the functionality available with each SDK.

| SDK | Client or Server | Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token | Generate UID2 Token from DII | Refresh UID2 Token |
| :--- | :--- |  :--- | :--- | :--- | :--- |
|UID2 SDK for JavaScript | Client-Side| Not supported | Not supported | Not supported | Supported |
|UID2 SDK for Java | Server-Side | Supported | Supported | Supported | Supported |
|UID2 SDK for Python | Server-Side | Supported | Supported | Supported | Supported |
|UID2 SDK for C# / .NET | Server-Side | Supported | Supported | Not supported | Not supported |
|UID2 SDK for C++ | Server-Side | Supported | Supported | Not supported | Not supported |
|UID2 SDK for iOS | Client-Side| Not supported | Not supported | Not supported | Supported |
|UID2 SDK for Android | Client-Side | Not supported | Not supported | Not supported | Supported |

## SDKs

The following SDK documentation is available for UID2 integration.

| SDK | Document | Description | Audience
| :--- | :--- | :--- | :--- |
| UID2 SDK for JavaScript | [UID2 SDK for JavaScript Reference Guide](client-side-identity.md) | Client-Side JavaScript SDK that facilitates the process of establishing client identity using UID2 and retrieving UID2 tokens for publishers. | Publishers |
| UID2 SDK for Java | [UID2 SDK for Java (Server-Side) Reference Guide](uid2-sdk-ref-java.md) | An SDK for audiences using Java server-side:<br/>- Helps publishers to generate or refresh UID2 tokens from [DII](../ref-info/glossary-uid.md#gl-dii).<br/>- Helps UID2 sharers to encrypt or decrypt UID2 tokens.<br/>- Helps DSPs to decrypt UID2 tokens from bid requests. | Publishers<br/>DSPs<br/>Advertisers<br/>Data Providers |
| UID2 SDK for Python | [UID2 SDK for Python (Server-Side) Reference Guide](uid2-sdk-ref-python.md) | An SDK for audiences using Python server-side:<br/>- Helps publishers to generate or refresh UID2 tokens from [DII](../ref-info/glossary-uid.md#gl-dii).<br/>- Helps UID2 sharers to encrypt or decrypt UID2 tokens.<br/>- Helps DSPs to decrypt UID2 tokens from bid requests. | Publishers<br/>DSPs<br/>Advertisers<br/>Data Providers |
| UID2 SDK for C# / .NET | [UID2 SDK for C# / .NET (Server-Side) Reference Guide](uid2-sdk-ref-csharp-dotnet.md) | An SDK for audiences using .NET server-side:<br/>- Helps DSPs to decrypt UID2 tokens from bid requests.<br/>- Helps UID2 sharers to encrypt or decrypt UID2 tokens. | DSPs<br/>Advertisers<br/>Data Providers |
 |UID2 SDK for C++ | [UID2 SDK for C++ (Server-Side) Reference Guide](uid2-sdk-ref-cplusplus.md) | An SDK for audiences using C++ server-side:<br/>- Helps DSPs to decrypt UID2 tokens from bid requests.<br/>- Helps UID2 sharers to encrypt or decrypt UID2 tokens. | DSPs<br/>Advertisers<br/>Data Providers |
 |UID2 SDK for Android | [UID2 SDK for Android Reference Guide](uid2-sdk-ref-android.md) |An SDK that facilitates the process of establishing client identity using UID2 and retrieving UID2 tokens for publishers that need to support Android apps. | Publishers |
 |UID2 SDK for iOS | [UID2 SDK for iOS Reference Guide](uid2-sdk-ref-ios.md) | An SDK that facilitates the process of establishing client identity using UID2 and retrieving UID2 tokens for publishers that need to support iOS apps. | Publishers |
