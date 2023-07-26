---
title: SDKs - Summary
description: SDK ドキュメントの概要。
hide_table_of_contents: false
sidebar_position: 01
---

SDK の機能を確認して使用する SDK を決定し、SDK の表をクリックして参照ドキュメントを確認してください。

## SDK Functionality

以下の表は、各　SDK　で利用可能な機能をまとめたものです。

| SDK | Client or Server | Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token | Generate UID2 Token from DII | Refresh UID2 Token |
| :--- | :--- |  :--- | :--- | :--- | :--- |
|UID2 SDK for JavaScript | Client-Side | No | No | No | Yes |
|UID2 SDK for Java | Server-Side | Yes | Yes | Yes | Yes |
|UID2 SDK for Python | Server-Side | Yes | Yes | No | No |
|UID2 SDK for C# / .NET | Server-Side | Yes | Yes | No | No |
|UID2 SDK for C++ | Server-Side | Yes | Yes | No | No |

## SDKs

UID2 インテグレーションについては、以下の SDK ドキュメントを参照してください。

| SDK | Document | Description | Audience
| :--- | :--- | :--- | :--- |
| UID2 SDK for JavaScript | [UID2 SDK for JavaScript](client-side-identity.md) | Client-Side JavaScript SDK は、UID2 を使用してクライアントの ID を確立し、パブリッシャー向けに UID2 Token を取得するプロセスを容易にします。 | Publishers |
| UID2 SDK for Java | [UID2 SDK for Java (Server-Side) Reference Guide](uid2-sdk-ref-java.md) |　Java Server-Side 使用する際の SDK です：<br/>- パブリッシャーが [DII](../ref-info/glossary-uid.md#gl-dii) から UID2 Token を生成またはリフレッシュするのを支援します。<br/>- UID2 Sharer が UID2 Token を暗号化または復号化するのを支援します。<br/>- DSP が入札要求から UID2 Token を復号化するのを支援します。 | Publishers<br/>DSPs<br/>Advertisers<br/>Data Providers |
| UID2 SDK for Python | [UID2 SDK for Python (Server-Side) Reference Guide](uid2-sdk-ref-python.md) | Python Server-Side 使用する際の SDK です：<br/>- DSP が入札要求から UID2 Token を復号化するのを支援します。<br/>- UID2 Sharer が UID2 Token を暗号化または復号化するのを支援します。　| DSPs<br/>Advertisers<br/>Data Providers |
| UID2 SDK for C# / .NET | [UID2 SDK for C# / .NET (Server-Side) Reference Guide](uid2-sdk-ref-csharp-dotnet.md) | .NET Server-Side 使用する際の SDK です：<br/>- DSP が入札要求から UID2 Token を復号化するのを支援します。<br/>- UID2 Sharer が UID2 Token を暗号化または復号化するのを支援します。 | DSPs<br/>Advertisers<br/>Data Providers |
 |UID2 SDK for C++ | [UID2 SDK for C++ (Server-Side) Reference Guide](uid2-sdk-ref-cplusplus.md) | C++ Server-Side 使用する際の SDK です：<br/>- DSP が入札要求から UID2 Token を復号化するのを支援します。<br/>- UID2 Sharer が UID2 Token を暗号化または復号化するのを支援します。  | DSPs<br/>Advertisers<br/>Data Providers |
