---
title: Web Integration Overview
description: UID2 Web インテグレーションにおけるパブリッシャーオプションの概要。
hide_table_of_contents: false
sidebar_position: 02
displayed_sidebar: sidebarPublishers
---

import Link from '@docusaurus/Link';

# Web Integration Overview

パブリッシャーとして、UID2 とインテグレーションしてア ID トークンを生成し、ウェブページのコンテキストで RTB <Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>に渡す方法はたくさんあります。

このページでは、インテグレーションステップとインテグレーションオプションの概要と、各オプションの追加情報へのリンクを紹介します。

<!-- The integration option that's right for you depends on many factors. For example, if the <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> is available on the client side, and you can use the latest version of Prebid.js, you can use the UID2 Prebid.js module, which manages the token generate request, token refresh request, and passing the token into the bidstream.

Some questions you might ask:
- Do you want to generate the UID2 token request on the client side or the server side?
- Do you use Prebid.js? If yes:
  - Are you constrained to a specific Prebid.js version?
  - Do you want the UID2 Prebid.js module to do everything&#8212;generate the token, refresh the token, and pass the token into the bidstream?
  - Do you prefer to use the SDK for JavaScript to generate and refresh the token, and use Prebid.js to pass the token into the bidstream? -->

## Key Integration Steps

UID2 とインテグレーションするには、次の 3 つの主要なアクティビティを実装します。

1. [Generate the UID2 token](#generate-the-uid2-token)
1. [Refresh the UID2 token as needed](#refresh-the-uid2-token)
1. [Pass the UID2 token into the bidstream](#pass-the-uid2-token-into-the-bidstream)

これらの重要なステップを達成する方法はたくさんあります。最もシンプルで高速な実装は、Prebid.js 8.21.0 以降を使用した完全な Client-Side の実装です。

## Integration Options Summary

次の表は、インテグレーションステップごとに利用可能なソリューションをまとめたものです。

すべてのステップを実行するには、ソリューションを組み合わせることができます。たとえば、Client-Side で SDK for JavaScript を使用してトークンを生成してリフレッシュし、Google Ad Manager Secure Signals を使用してトークンをビッドストリームに渡すことができます。

| Integration Solution | Generate Token | Refresh Token |Pass Token to the Bidstream |
| :--- | :--- | :--- | :--- |
| [Prebid.js client-side (8.21.0 or later)](integration-prebid-client-side.md) | &#9989; | &#9989; | &#9989; |
| [Prebid.js client-server (7.53.0 or later)](integration-prebid-client-server.md) | &#8212; | &#9989; | &#9989; |
| [SDK for JavaScript, client-side](integration-javascript-client-side.md) | &#9989; | &#9989; | &#8212; |
| [SDK for JavaScript, server-side](integration-javascript-client-server.md) | &#9989; | &#9989; | &#8212; |
| [SDK for Java](../sdks/sdk-ref-java.md) | &#9989; | &#9989; | &#8212; |
| [SDK for Python](../sdks/sdk-ref-python.md) | &#9989; | &#9989; | &#8212; |
| [Direct integration (API endpoints)](integration-publisher-server-side.md) | &#9989; | &#9989; | &#8212; |
| [Google Ad Manager Secure Signals](integration-google-ss.md) | &#8212; | &#8212; | &#9989; |

<!-- &#9989; = Supported | &#8212; = Not Supported -->

実装を選択し、開始するには、以下の手順に従ってください:

1. UID2 Token を生成するオプションの概要を確認します:
   - [Client-Side Integration Options](#client-side-integration-options)
   - [Server-Side Integration Options](#server-side-integration-options)
1. [UID2 Token をリフレッシュする](#refresh-the-uid2-token) オプションを確認します。
1. [トークンをビッドストリームに渡す](#pass-the-uid2-token-into-the-bidstream) オプションを確認します。
1. 最適なオプションを選択し、実装ドキュメントをクリックしてください。

## Generate the UID2 Token

UID2 Token を生成するには、主に2つの方法があります。&#8212;UID2 Token 生成リクエストを選択することができます:

- Client-Side (ユーザーのブラウザ内): [Client-Side Integration Options](#client-side-integration-options) を参照してください。
- Server-Side: [Server-Side Integration Options](#server-side-integration-options) を参照してください。

それぞれのオプションには利点があります。最も簡単で高速なインテグレーションオプションとして、Prebid.js 8.21.0 以降を使用した Client-Side インテグレーションを勧めます。

:::note
すべてのインテグレーションオプションで、UID2 Token をローカルストレージまたはクッキーストレージに保存することを選択できます。
:::

### Client-Side Integration Options

Client-Side で UID2 Token を生成することには、次のような利点があります:

- コードは消費者のウェブページ上の Client-Side で実行され、Server-Side のコーディングは必要ありません。
- Prebid.js のインテグレーションにより、すべての機能が処理されます&#8212;トークンの生成、トークンのリフレッシュ、トークンのビッドストリームへの受け渡しなど。Prebid.js 8.21.0 以降を使用している場合、これが最もシンプルで高速な実装オプションです。

Client-Side のインテグレーションを選択した場合、アカウント設定の一環として、セキュリティのためにルートレベルドメインのリストを提供する必要があります。詳細については、アカウント設定ページの [Client-Side Web Integrations](../getting-started/gs-account-setup.md#client-side-web-integrations) を参照してください。

次の表は、Client-Side で UID2 Token を生成したいパブリッシャーが、ウェブページから UID2 Token を生成するためのオプションと、それに対応するドキュメントリソースをまとめたものです。

| Option | Documentation |
| :--- | :--- |
| Prebid.js client-side implementation (8.21.0 or later) | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| SDK for JavaScript, client-side implementation | [Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md) |

### Server-Side Integration Options

Server-Side で UID2 Token を生成することには、次のような利点があります:

- [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) を完全に Server-Side に置いておくことができます。
- 開発リソースがバックエンド開発者であれば、Server-Side のインテグレーションを好むかもしれません。
- Server-Side の Prebid.js インテグレーションでは、バージョンが 7.53.0 以降であれば、最新の Prebid.js バージョンにアップデートする必要はありません。

次の表は、Server-Side で UID2 Token を生成したいパブリッシャー向けのオプションをまとめたものです。

<!-- (**GWH_SW His query: "why is Prebid.js server integration not listed here?" I thought the server-side option didn't support token/generate + per KK's diagram. Let's discuss. Affects summary table also.**) -->

| Option | Documentation |
| :--- | :--- |
| SDK for JavaScript, client-server implementation | [Client-Server Integration Guide for JavaScript](integration-javascript-client-server.md) |
| SDK for Java | - [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md)<br/>- [SDK for Java](../sdks/sdk-ref-java.md) |
| SDK for Python | - [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md)<br/>- [SDK for Python](../sdks/sdk-ref-python.md)  |
| Direct integration (API endpoints) | [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md) |

## Refresh the UID2 Token

セキュリティ上の理由から、UID2 Token の寿命は限られていますが、トークンをリフレッシュするメカニズムが組み込まれているので、続けて使用することができます。

トークンを取得すると、Refresh Token と、トークンの有効期間を示すタイムスタンプが付いてきます。現在の UID2 Token の有効期限が切れる前に Refresh Token を使って新しい UID2 Token を生成すれば、毎回新しい UID2 Token と更新された Refresh Token が発行されます。情報を有効に保つためにリフレッシュを続けることができます。

次の表は、UID2 Token のリフレッシュをサポートするインテグレーションオプションをまとめたものです。

| Option | Documentation |
| :--- | :--- |
| Prebid.js client-side implementation (8.21.0 or later) | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| Prebid.js client-server implementation (7.53.0 or later) | [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md) |
| SDK for JavaScript, client-side implementation | [Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md) |
| SDK for JavaScript, client-server implementation | [Client-Server Integration Guide for JavaScript](integration-javascript-client-server.md) |
| SDK for Java | - [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md)<br/>- [SDK for Java](../sdks/sdk-ref-java.md) |
| SDK for Python | - [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md)<br/>- [SDK for Python](../sdks/sdk-ref-python.md)  |
| Direct integration (API endpoints) | [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md) |

## Pass the UID2 Token Into the Bidstream

パブリッシャーは、DII (メールアドレスや電話番号) を UID2 Token に暗号化し、UID2 Token をビッドストリームに送信することで UID2 を使用します。

次の表は、UID2 Token をビッドストリームに渡すことをサポートするインテグレーションオプションをまとめたものです。

| Option | Documentation |
| :--- | :--- |
| Prebid.js client-side implementation (8.21.0 or later) | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| Prebid.js client-server implementation (7.53.0 or later) | [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md) |
| Google Ad Manager Secure Signals| [Google Ad Manager Secure Signals Integration Guide](integration-google-ss.md) |

:::note
トークンを生成し、それをリフレッシュし続ける限り、UID2 Token をビッドストリームに渡すために他のオプションを使用することもできます。
:::

<!-- ## Integration Using Prebid.js

(**GWH_KK not sure if we want this section. Would appreciate your input.**)

If you want to integrate using Prebid.js, here are some additional questions you'll need to answer to determine the best integration approach, and some steps to take:

- What Prebid.js version are you using?
  - If you're using Prebid.js 8.21.0 or later, you can use the client-side Prebid.js integration option, which is the simplest and easiest implementation approach.
  - If you're using a version prior to 8.21.0 (7.53.0 or later), and can't easily upgrade, you'll choose a server-side option.
- Domain names:
  - As part of account setup, if you're using the Prebid.js client-side option, you'll need to provide a list of your root-level domains.
- Are you already using the UID2 JavaScript SDK to generate and refresh the token? If so, you can continue to use the Prebid.js client-server implementation. For details, see [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md). -->

<!-- 
## Advantages: Summary

The following table summarizes the advantages of each integration option.
(**GWH_KK don't like having two tables but I can't fit it all into one. Also the docs are different. Need input re the best docs to link to... SDK ref or integration guide?**)

| Option | Client/Server | Advantages | Documentation |
| :--- | :--- | :--- | :--- |
| Prebid.js 8.21.0 or later | Client | <ul><li>No server-side coding needed.</li><li>Fast and easy implementation.</li></ul> | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| UID2 JavaScript SDK + Prebid.js 7.53.0 or later | Client | <ul><li>No need to upgrade to the latest Prebid.js version.</li><li>Easier to manage latency with a server-side implementation.</li><li>The JavaScript SDK takes care of generating and refreshing the token, and Prebid.js takes care of sending the token to the bidstream.</li></ul> | <ul><li>[Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md)</li><li>[UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md)</li></ul> |
| SDK for JavaScript | Server | <ul><li>The SDK takes care of generating and refreshing the token.</li><li>Coded in JavaScript.</li></ul> If you use JavaScript, and client-side implementation is not suitable for you, this is your best choice. | [SDK for JavaScript Reference Guide (2.x and earlier versions)](../sdks/sdk-ref-javascript-v2.md) |
| SDK for Java | Server | <ul><li>The SDK takes care of generating and refreshing the token.</li><li>Coded in Java.</li></ul> If your server-side coding is Java, and client-side implementation is not suitable for you, this is your best choice. | [SDK for Java (Server-Side) Reference Guide](../sdks/sdk-ref-java.md) |
| SDK for Python] | Server | <ul><li>The SDK takes care of generating and refreshing the token.</li><li>Coded in Python.</li></ul> If your server-side coding is Python, and client-side implementation is not suitable for you, this is your best choice. | [SDK for Python (Server-Side) Reference Guide](../sdks/sdk-ref-python.md) |
| Direct integration (API endpoints) | Server | You're free to implement the APIs in whatever way you choose. | <ul><li>[POST /token/generate](../endpoints/post-token-generate.md)</li><li>[POST /token/refresh](../endpoints/post-token-refresh.md)</li></ul> | 
-->

<!-- ## BELOW = TO DELETE
-----------------------------BELOW = TO DELETE

## Integration Details

The following sections provide additional information on each of the integration options, with links to documentation resources:

* [Prebid.js 8.21.0 or Later](#prebidjs-8210-or-later)
* [UID2 JavaScript SDK + Prebid.js 7.53.0 or later](#uid2-sdk-for-javascript--prebidjs-7530-or-later)
* [SDK for JavaScript](#uid2-sdk-for-javascript)
* [SDK for Java](#uid2-sdk-for-java)
* [SDK for Python](#uid2-sdk-for-python)
* [Direct integration (API endpoints)](#direct-integration-api-endpoints)

### Prebid.js 8.21.0 or Later

The advantages of this implementation approach are as follows:

- No server-side coding needed.
- Fast and easy implementation.

For details, see [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md).

### SDK for JavaScript + Prebid.js 7.53.0 or later

The advantages of this implementation approach are as follows:

- No need to upgrade to the latest Prebid.js version.
- Easier to manage latency with a server-side implementation.
- The JavaScript SDK takes care of generating and refreshing the token, and Prebid.js takes care of sending the token to the bidstream.

For details, see:
- [SDK for JavaScript Reference Guide](../sdks/sdk-ref-javascript.md)
- [UID2 Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-client-server.md)

### SDK for JavaScript

The advantages of this implementation approach are as follows:

- The SDK takes care of generating and refreshing the token.
- Coded in JavaScript. If you use JavaScript, and client-side implementation is not suitable for you, this is your best choice.

For details, see [SDK for JavaScript Reference Guide (2.x and earlier versions)](../sdks/sdk-ref-javascript-v2.md).

### SDK for Java

The advantages of this implementation approach are as follows:

- The SDK takes care of generating and refreshing the token.
- Coded in Java. If your server-side coding is Java, and client-side implementation is not suitable for you, this is your best choice.

For details, see [SDK for Java (Server-Side) Reference Guide](../sdks/sdk-ref-java.md).

### SDK for Python

The advantages of this implementation approach are as follows:

- The SDK takes care of generating and refreshing the token.
- Coded in Python. If your server-side coding is Python, and client-side implementation is not suitable for you, this is your best choice.

For details, see [SDK for Python (Server-Side) Reference Guide](../sdks/sdk-ref-python.md).

### Direct integration (API endpoints)

The advantages of this implementation approach are as follows:

- You're free to implement the APIs in whatever way you choose.

For details, see:
- [POST /token/generate](../endpoints/post-token-generate.md)
- [POST /token/refresh](../endpoints/post-token-refresh.md) -->


<!-- 
## TABLE STASH

| Option | Token Generation managed by | Token Refresh managed by |Passing Token to the Bidstream |
| :--- | :--- | :--- | :--- |
| Prebid.js 8.21.0 or later<br/>[UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) | Prebid.js 8.21.0 or later | Prebid.js 8.21.0 or later | Prebid.js 8.21.0 or later |
| UID2 JavaScript SDK + <br/>Prebid.js 7.53.0 or later | UID2 JS SDK<br/>[Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md) | UID2 JS SDK or Prebid.js 7.53.0 or later | Prebid.js 7.53.0 or later<br/>[UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md) |
| SDK for JavaScript<ul><li>[Client-Server Integration Guide for JavaScript](integration-javascript-client-server.md)</li><li>[Publisher Integration Guide, Server-Side](integration-publisher-server-side.md)</li></ul> | JavaScript SDK | JavaScript SDK | Publisher's choice. For example, Prebid.js.<br/>[UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md) |
| SDK for Java<br/>[Publisher Integration Guide, Server-Side](integration-publisher-server-side.md) | [SDK for Java](../sdks/sdk-ref-java.md) | [SDK for Java](../sdks/sdk-ref-java.md)| Publisher's choice.<br/>Can be integrated with Prebid.js. |
| SDK for Python<br/> [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md)| [SDK for Python](../sdks/sdk-ref-python.md) | [SDK for Python](../sdks/sdk-ref-python.md) | Publisher's choice.<br/>Can be integrated with Prebid.js. |
| GAM Secure Signals<br/> [xxx](integration-publisher-server-side.md)| [Google Ad Manager Secure Signals Integration Guide](integration-google-ss.md) | [Google Ad Manager Secure Signals Integration Guide](integration-google-ss.md) | [Google Ad Manager Secure Signals Integration Guide](integration-google-ss.md) |
| Direct integration<br/>(API endpoints)<br/>[Publisher Integration Guide, Server-Side](integration-publisher-server-side.md) | [POST /token/generate](../endpoints/post-token-generate.md) | [POST /token/refresh](../endpoints/post-token-refresh.md) | Publisher's choice.<br/>Can be integrated with Prebid.js. |
 -->
