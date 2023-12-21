---
title: SDKs - Summary
description: SDK ドキュメントの概要。
hide_table_of_contents: false
sidebar_position: 01
---

<!-- This guide includes the following information:
- [SDKs](#sdks)
- [SDK Functionality](#sdk-functionality)
# SDKs -->

SDK の機能を確認して使用する SDK を決定し、SDK の表をクリックして参照ドキュメントを確認してください。

## SDK Functionality

以下の表は、各 SDK で利用可能な機能をまとめたものです。

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

UID2 インテグレーションについては、以下の SDK ドキュメントを参照してください。

| SDK | Document | Description | Audience |
| :--- | :--- | :--- | :--- |
| UID2 SDK for JavaScript | [UID2 SDK for JavaScript Reference Guide](client-side-identity.md) | Client-Side JavaScript SDK は、UID2 を使用してクライアントの ID を確立し、パブリッシャー向けに UID2 Token を取得するプロセスを容易にします。 | Publishers |
| UID2 SDK for Java | [UID2 SDK for Java (Server-Side) Reference Guide](uid2-sdk-ref-java.md) | Java Server-Side で、以下を行いたい人向けのSDK:<br/>- UID2 Token の生成または更新します。<br/>- raw UID2 を暗号化して UID2 Token を作成したり、UID2 Token を復号化して raw UID2 にアクセスします。 | Publishers<br/>DSPs<br/>Advertisers<br/>Data Providers |
| UID2 SDK for Python | [UID2 SDK for Python (Server-Side) Reference Guide](uid2-sdk-ref-python.md) | UID2 Token を作成するために raw UID2 を暗号化したい、あるいは raw UID2 にアクセスするために UID2 Token を復号化したいと考える Python Server-Side を使用する人のための SDK。 | Publishers<br/>DSPs<br/>Advertisers<br/>Data Providers |
| UID2 SDK for C# / .NET | [UID2 SDK for C# / .NET (Server-Side) Reference Guide](uid2-sdk-ref-csharp-dotnet.md) | UID2 Token を作成するために raw UID2 を暗号化したい、あるいは raw UID2 にアクセスするために UID2 Token を復号化したいと考える .NET Server-Side を使用する人のための SDK。 |DSPs<br/>Advertisers<br/>Data Providers |
| UID2 SDK for C++ | [UID2 SDK for C++ (Server-Side) Reference Guide](uid2-sdk-ref-cplusplus.md) | UID2 Token を作成するために raw UID2 を暗号化したい、あるいは raw UID2 にアクセスするために UID2 Token を復号化したいと考える C++ Server-Side を使用する人のための SDK。 | DSPs<br/>Advertisers<br/>Data Providers |
| UID2 SDK for Android | [UID2 SDK for Android Reference Guide](uid2-sdk-ref-android.md) | Android アプリをサポートする必要があるパブリッシャー向けに、UID2 を使用したクライアント identity の確立と UID2 Token の取得プロセスを容易にするSDK。 | Publishers |
| UID2 SDK for iOS | [UID2 SDK for iOS Reference Guide](uid2-sdk-ref-ios.md) | iOS アプリをサポートする必要があるパブリッシャー向けに、UID2 を使用したクライアント identity の確立と UID2 Token の取得プロセスを容易にするSDK。 | Publishers |
