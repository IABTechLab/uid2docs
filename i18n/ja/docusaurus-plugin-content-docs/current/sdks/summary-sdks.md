---
title: SDKs - Summary
sidebar_label: SDKs - Summary
pagination_label: SDKs - Summary
description: SDK ドキュメントの概要。
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# SDKs: Summary

SDK の機能を確認して使用する SDK を決定し、SDK の表をクリックして参照ドキュメントを確認してください。

## SDK Functionality

次の表は、各 SDK で利用可能な機能をまとめたものです。

| UID2 SDK for... | Client-Side or Server-Side | Encrypt Raw UID2 to UID2 Token for Sharing | Decrypt UID2 Token to Raw UID2 | Generate UID2 Token from DII | Refresh UID2 Token | Map DII to Raw UID2s&ast; | Monitor Rotated Salt Buckets      |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
|JavaScript | Client | &#8212; | &#8212; | &#9989; | &#9989; | &#8212; | &#8212; |
|Java | Server | &#9989; | &#9989; | &#9989; | &#9989; | &#9989; | &#8212; |
|Python | Server | &#9989; | &#9989; | &#9989; | &#9989; | &#9989; | &#9989; |
|C# / .NET | Server | &#9989; | &#9989; | &#8212; | &#8212; | &#8212; | &#8212; |
|C++ | Server | &#9989; | &#9989; | &#8212; | &#8212; | &#8212; | &#8212; |
|Android | Client&nbsp;(Mobile) | &#8212; | &#8212; | &#9989; | &#9989; | &#8212; | &#8212; |
|iOS | Client (Mobile) | &#8212; | &#8212; | &#9989;| &#9989; |&#8212; | &#8212; |

&ast;DII から raw UID2 を生成する必要がある広告主およびデータプロバイダは Snowflake ([Snowflake Integration Guide](../guides/integration-snowflake.md) を参照してください) または [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) エンドポイントを使用することができます。

<!-- &#9989; = Supported | &#8212; = Not Supported -->

## SDK Documentation

UID2 インテグレーションについては、以下の SDK ドキュメントを参照してください。ドキュメンテーションのリンクは最初の欄にあります。

| SDK/Link&nbsp;to&nbsp;Guide | Description | Audience
| :--- | :--- | :--- |
| [SDK for JavaScript](sdk-ref-javascript.md) | UID2 を使用したクライアント ID の確立と、パブリッシャー向けの UID2 Token の取得プロセスを容易にする、Client-Side  JavaScript SDK。 | Publishers |
| [SDK for Java](sdk-ref-java.md) | Java Server-Side を使用するオーディエンスのための SDK:<ul><li>パブリッシャーが <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> から UID2 Token を生成したりリフレッシュしたりするのを支援します。([POST&nbsp;/token/generate](../endpoints/post-token-generate))</li><li>UID2 Sharer が UID2 Token を暗号化・復号化するのを支援します。([Usage for UID2 Sharers](sdk-ref-java.md#usage-for-uid2-sharers))</li><li>ビッドリクエストから UID2 Token を復号する DSP を支援します。([Decrypt UID2 Tokens for RTB Use](guides/dsp-guide.md#decrypt-uid2-tokens-for-rtb-use))</li></ul> | Publishers<br/>DSPs<br/>Advertisers<br/>Data&nbsp;Providers |
| [SDK for Python](sdk-ref-python.md) | Python Server-Side を使用するオーディエンスのための SDK:<ul><li>パブリッシャーが <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> から UID2 Token を生成したりリフレッシュしたりするのを支援します。([POST&nbsp;/token/generate](../endpoints/post-token-generate))</li><li>UID2 Sharer が UID2 Token を暗号化・復号化するのを支援します。([Usage for UID2 Sharers](sdk-ref-java.md#usage-for-uid2-sharers))</li><li>ビッドリクエストから UID2 Token を復号する DSP を支援します。([Decrypt UID2 Tokens for RTB Use](guides/dsp-guide.md#decrypt-uid2-tokens-for-rtb-use))</li></ul> | Publishers<br/>DSPs<br/>Advertisers<br/>Data Providers |
| [SDK for C# / .NET](sdk-ref-csharp-dotnet.md) | .NET Server-Side を使用するオーディエンスのための SDK:<ul><li>DSP がビッドリクエストから UID2 Token を復号化するのを支援します。</li><li>UID2 Sharer が UID2 Token を暗号化または復号化するのを支援します。</li></ul> | DSPs<br/>Advertisers<br/>Data Providers |
| [SDK for C++](sdk-ref-cplusplus.md) | C++ Server-Side を使用するオーディエンスのための SDK:<ul><li>DSP がビッドリクエストから UID2 Token を復号化するのを支援します。</li><li>UID2 Sharer が UID2 Token を暗号化または復号化するのを支援します。</li></ul> | DSPs<br/>Advertisers<br/>Data Providers |
| [SDK for Android](sdk-ref-android.md) | Android アプリをサポートする必要があるパブリッシャー向けに、UID2 を使用してクライアント ID の生成または確立し、UID2 Token の取得プロセスを容易にする SDK。 | Publishers |
| [SDK for iOS](sdk-ref-ios.md) | iOS アプリをサポートする必要があるパブリッシャー向けに、UID2 を使用してクライアント ID の生成または確立し、UID2 Token の取得プロセスを容易にする SDK。 | Publishers |
