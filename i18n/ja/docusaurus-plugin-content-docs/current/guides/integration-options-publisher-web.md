---
title: Web Integration Overview
description: UID2 Web インテグレーションにおけるパブリッシャーオプションの概要。
hide_table_of_contents: false
sidebar_position: 02
---

# Web Integration Overview

パブリッシャーとして、UID2 とインテグレーションしてア ID トークンを生成し、ウェブページのコンテキストで RTB ビッドストリームに渡す方法はたくさんあります。

このページでは、インテグレーションステップとインテグレーションオプションの概要と、各オプションの追加情報へのリンクを紹介します。

<!-- The integration option that's right for you depends on many factors. For example, if the [DII](../ref-info/glossary-uid.md#gl-dii) is available on the client side, and you can use the latest version of Prebid, you can use the UID2 Prebid module, which manages the token generate request, token refresh request, and passing the token into the bid stream.

Some questions you might ask:
- Do you want to generate the UID2 token request on the client side or the server side?
- Do you use Prebid? If yes:
  - Are you constrained to a specific Prebid version?
  - Do you want the UID2 Prebid module to do everything&#8212;generate the token, refresh the token, and pass the token into the bid stream?
  - Do you prefer to use the UID2 SDK for JavaScript to generate and refresh the token, and use Prebid to pass the token into the bid stream? -->

<!-- It includes:

* [Integration Steps: Summary](#integration-steps-summary)
* [Integration Options: Client Side](#integration-options-client-side)
* [Integration Options: Server Side](#integration-options-server-side)
* [Options to Generate/Refresh UID2 Token](#options-to-generaterefresh-uid2-token)
* [Options to Pass the UID2 Token into the Bid Stream](#options-to-pass-the-uid2-token-into-the-bid-stream)
* [Client-Side or Server-Side Integration?](#client-side-or-server-side-integration)
* [Integration Using Prebid](#integration-using-prebid)
* [IntegrationDetails](#integration-details)
  * [Prebid.js 8.21.0 or Later](#prebidjs-8210-or-later)
  * [UID2 JavaScript SDK + Prebid.js 7.53.0 or later](#uid2-sdk-for-javascript--prebidjs-7530-or-later)
  * [UID2 SDK for JavaScript](#uid2-sdk-for-javascript)
  * [UID2 SDK for Java](#uid2-sdk-for-java)
  * [UID2 SDK for Python](#uid2-sdk-for-python)
  * [Direct integration (API endpoints)](#direct-integration-api-endpoints)
 -->

## Key Integration Steps

UID2 とインテグレーションするには、次の 3 つの主要なアクティビティを実装します。

1. [Generate the UID2 token](#generate-the-uid2-token)
1. [Refresh the UID2 token as needed](#refresh-the-uid2-token)
1. [Pass the UID2 token into the bid stream](#pass-the-uid2-token-into-the-bid-stream)

これらの重要なステップを達成する方法はたくさんあります。最もシンプルで高速な実装は、Prebid.js 8.21.0 以降を使用した完全な Client-Side の実装です。

## Integration Options Summary

以下の表は、インテグレーションステップごとに利用可能なソリューションをまとめたものです。

すべてのステップを実行するには、ソリューションを組み合わせることができます。たとえば、Client-Side で UID2 SDK for JavaScript を使用してトークンを生成してリフレッシュし、Google Ad Manager Secure Signals を使用してトークンをビッドストリームに渡すことができます。

| Integration Solution | Generate Token | Refresh Token |Pass Token to the Bid Stream |
| :--- | :--- | :--- | :--- |
| [Prebid.js client-side (8.21.0 or later)](integration-prebid-client-side.md) | &#9989; | &#9989; | &#9989; |
| [Prebid.js server-side (7.53.0 or later)](integration-prebid-server-side.md) | &#8212; | &#9989; | &#9989; |
| [UID2 SDK for JavaScript, client-side](publisher-client-side.md) | &#9989; | &#9989; | &#8212; |
| [UID2 SDK for JavaScript, server-side](integration-javascript-server-side.md) | &#9989; | &#9989; | &#8212; |
| [UID2 SDK for Java](../sdks/uid2-sdk-ref-java.md) | &#9989; | &#9989; | &#8212; |
| [UID2 SDK for Python](../sdks/uid2-sdk-ref-python.md) | &#9989; | &#9989; | &#8212; |
| [Direct integration (API endpoints)](custom-publisher-integration.md) | &#9989; | &#9989; | &#8212; |
| [Google Ad Manager Secure Signals](google-ss-integration.md) | &#8212; | &#8212; | &#9989; |

<!-- &#9989; = Supported | &#8212; = Not Supported -->

実装を選択し、開始するには、以下の手順に従ってください:

1. UID2 Token を生成するオプションの概要を確認します:
   - [Client-Side Integration Options](#client-side-integration-options)
   - [Server-Side Integration Options](#server-side-integration-options)
1. [UID2 Token をリフレッシュする](#refresh-the-uid2-token) オプションを確認します。
1. [トークンをビッドストリームに渡す](#pass-the-uid2-token-into-the-bid-stream) オプションを確認します。
1. 最適なオプションを選択し、実装ドキュメントをクリックしてください。

## Generate the UID2 Token

UID2 Token を生成するには、主に 2 つの方法があります。Client-Side (ユーザーのブラウザ内) で UID2 Token 生成リクエストを開始するか、Server-Side で UID2 Token 生成リクエストを開始するかです。

それぞれのオプションには異なる利点があります。Client-Side のインテグレーションは簡単で高速です。Prebid.js 8.21.0 以降を使用したインテグレーションは、最も簡単で高速なインテグレーションオプションです。

:::note
すべてのインテグレーションオプションで、UID2 Token をローカルストレージまたはクッキーストレージに保存することを選択できます。
:::

### Client-Side Integration Options

Client-Side で UID2 Token を生成することには、次のような利点があります:

- コードは消費者のウェブページ上の Client-Side で実行され、Server-Side のコーディングは必要ありません。
- トークンの生成、トークンのリフレッシュ、トークンのビッドストリームへの受け渡しなど、すべての機能を処理する Prebid インテグレーションがあります。Prebid 8.21.0 以降を使用している場合、これが最もシンプルで高速な実装オプションです。

Client-Side のインテグレーションを選択した場合、アカウント設定の一環として、セキュリティのためにトップレベルドメインのリストを提供する必要があります。詳細については、アカウント設定ページの [Client-Side Implementation for Publishers](../getting-started/gs-account-setup.md#client-side-implementation-for-publishers) を参照してください。

以下の表は、Client-Side で UID2 Token を生成したいパブリッシャーが、ウェブページから UID2 Token を生成するためのオプションと、それに対応するドキュメントリソースをまとめたものです。

| Option | Documentation |
| :--- | :--- |
| Prebid.js client-side implementation (8.21.0 or later) | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| UID2 SDK for JavaScript, client-side implementation | [Client-Side Integration Guide for JavaScript](publisher-client-side.md) |

### Server-Side Integration Options

Server-Side で UID2 Token を生成することには、次のような利点があります:

- [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) を完全に Server-Side に置いておくことができます。
- 開発リソースがバックエンド開発者であれば、Server-Side のインテグレーションを好むかもしれません。
- Server-Side の Prebid インテグレーションでは、バージョンが 7.53.0 以降であれば、最新の Prebid バージョンにアップデートする必要はありません。

以下の表は、Server-Side で UID2 Token を生成したいパブリッシャー向けのオプションをまとめたものです。

<!-- (**GWH_SW His query: "why is Prebid.js server integration not listed here?" I thought the server-side option didn't support token/generate + per KK's diagram. Let's discuss. Affects summary table also.**) -->

| Option | Documentation |
| :--- | :--- |
| UID2 SDK for JavaScript, server-side implementation | [Server-Side Integration Guide for JavaScript](integration-javascript-server-side.md) |
| UID2 SDK for Java | - [Publisher Integration Guide, Server-Only](custom-publisher-integration.md)<br/>- [UID2 SDK for Java](../sdks/uid2-sdk-ref-java.md) |
| UID2 SDK for Python | - [Publisher Integration Guide, Server-Only](custom-publisher-integration.md)<br/>- [UID2 SDK for Python](../sdks/uid2-sdk-ref-python.md)  |
| Direct integration (API endpoints) | [Publisher Integration Guide, Server-Only](custom-publisher-integration.md) |

## Refresh the UID2 Token

セキュリティ上の理由から、UID2 Token の寿命は限られていますが、トークンをリフレッシュするメカニズムが組み込まれているので、続けて使用することができます。

トークンを取得すると、Refresh Token と、トークンの有効期間を示すタイムスタンプが付いてきます。現在の UID2 Token の有効期限が切れる前に Refresh Token を使って新しい UID2 Token を生成すれば、毎回新しい UID2 Token と更新されたリフレッシュトークンが発行されます。情報を有効に保つためにリフレッシュを続けることができます。

次の表は、UID2 Token のリフレッシュをサポートするインテグレーションオプションをまとめたものです。

| Option | Documentation |
| :--- | :--- |
| Prebid.js client-side implementation (8.21.0 or later) | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| Prebid.js server-side implementation (7.53.0 or later) | [UID2 Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md) |
| UID2 SDK for JavaScript, client-side implementation | [Client-Side Integration Guide for JavaScript](publisher-client-side.md) |
| UID2 SDK for JavaScript, server-side implementation | [Server-Side Integration Guide for JavaScript](integration-javascript-server-side.md) |
| UID2 SDK for Java | - [Publisher Integration Guide, Server-Only](custom-publisher-integration.md)<br/>- [UID2 SDK for Java](../sdks/uid2-sdk-ref-java.md) |
| UID2 SDK for Python | - [Publisher Integration Guide, Server-Only](custom-publisher-integration.md)<br/>- [UID2 SDK for Python](../sdks/uid2-sdk-ref-python.md)  |
| Direct integration (API endpoints) | [Publisher Integration Guide, Server-Only](custom-publisher-integration.md) |

## Pass the UID2 Token Into the Bid Stream

パブリッシャーは、DII (メールアドレスや電話番号) を UID2 Token に暗号化し、UID2 Token をビッドストリームに送信することで UID2 を使用します。

以下の表は、UID2 Token をビッドストリームに渡すことをサポートするインテグレーションオプションをまとめたものです。

| Option | Documentation |
| :--- | :--- |
| Prebid.js client-side implementation (8.21.0 or later) | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| Prebid.js server-side implementation (7.53.0 or later) | [UID2 Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md) |
| Google Ad Manager Secure Signals| [Google Ad Manager Secure Signals Integration Guide](google-ss-integration.md) |

:::note
トークンを生成し、それをリフレッシュし続ける限り、UID2 Token をビッドストリームに渡すために他のオプションを使用することもできます。
:::

<!-- ## Integration Using Prebid

(**GWH_KK not sure if we want this section. Would appreciate your input.**)

If you want to integrate using Prebid, here are some additional questions you'll need to answer to determine the best integration approach, and some steps to take:

- What Prebid version are you using?
  - If you're using Prebid 8.21.0 or later, you can use the client-side Prebid integration option, which is the simplest and easiest implementation approach.
  - If you're using a version prior to 8.21.0 (7.53.0 or later), and can't easily upgrade, you'll choose a server-side option.
- Domain names:
  - As part of account setup, if you're using the Prebid.js client-side option, you'll need to provide a list of your top-level domains.
- Are you already using the UID2 JavaScript SDK to generate and refresh the token? If so, you can continue to use the Prebid.js server-side implementation. For details, see [UID2 Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md). -->

<!-- 
## Advantages: Summary

The following table summarizes the advantages of each integration option.
(**GWH_KK don't like having two tables but I can't fit it all into one. Also the docs are different. Need input re the best docs to link to... SDK ref or integration guide?**)

| Option | Client/Server | Advantages | Documentation |
| :--- |  :--- | :--- | :--- |
| Prebid.js 8.21.0 or later | Client | <ul><li>No server-side coding needed.</li><li>Fast and easy implementation.</li></ul> | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| UID2 JavaScript SDK + Prebid.js 7.53.0 or later | Client | <ul><li>No need to upgrade to the latest Prebid version.</li><li>Easier to manage latency with a server-side implementation.</li><li>The JavaScript SDK takes care of generating and refreshing the token, and Prebid takes care of sending the token to the bid stream.</li></ul> | <ul><li>[Client-Side Integration Guide for JavaScript](publisher-client-side.md)</li><li>[UID2 Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md)</li></ul> |
| UID2 SDK for JavaScript | Server | <ul><li>The SDK takes care of generating and refreshing the token.</li><li>Coded in JavaScript.</li></ul> If you use JavaScript, and client-side implementation is not suitable for you, this is your best choice. | [UID2 SDK for JavaScript Reference Guide (2.x and earlier versions)](../sdks/client-side-identity-v2.md) |
| UID2 SDK for Java | Server | <ul><li>The SDK takes care of generating and refreshing the token.</li><li>Coded in Java.</li></ul> If your server-side coding is Java, and client-side implementation is not suitable for you, this is your best choice. | [UID2 SDK for Java (Server-Side) Reference Guide](../sdks/uid2-sdk-ref-java.md) |
| UID2 SDK for Python] | Server | <ul><li>The SDK takes care of generating and refreshing the token.</li><li>Coded in Python.</li></ul> If your server-side coding is Python, and client-side implementation is not suitable for you, this is your best choice. | [UID2 SDK for Python (Server-Side) Reference Guide](../sdks/uid2-sdk-ref-python.md) |
| Direct integration (API endpoints) | Server | You're free to implement the APIs in whatever way you choose. | <ul><li>[POST /token/generate](../endpoints/post-token-generate.md)</li><li>[POST /token/refresh](../endpoints/post-token-refresh.md)</li></ul> | 
-->

<!-- ## BELOW = TO DELETE
-----------------------------BELOW = TO DELETE

## Integration Details

The following sections provide additional information on each of the integration options, with links to documentation resources:

* [Prebid.js 8.21.0 or Later](#prebidjs-8210-or-later)
* [UID2 JavaScript SDK + Prebid.js 7.53.0 or later](#uid2-sdk-for-javascript--prebidjs-7530-or-later)
* [UID2 SDK for JavaScript](#uid2-sdk-for-javascript)
* [UID2 SDK for Java](#uid2-sdk-for-java)
* [UID2 SDK for Python](#uid2-sdk-for-python)
* [Direct integration (API endpoints)](#direct-integration-api-endpoints)

### Prebid.js 8.21.0 or Later

The advantages of this implementation approach are as follows:

- No server-side coding needed.
- Fast and easy implementation.

For details, see [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md).

### UID2 SDK for JavaScript + Prebid.js 7.53.0 or later

The advantages of this implementation approach are as follows:

- No need to upgrade to the latest Prebid version.
- Easier to manage latency with a server-side implementation.
- The JavaScript SDK takes care of generating and refreshing the token, and Prebid takes care of sending the token to the bid stream.

For details, see:
- [UID2 SDK for JavaScript Reference Guide](../sdks/client-side-identity.md)
- [UID2 Server-Side Integration Guide for Prebid.js](../guides/integration-prebid-server-side.md)

### UID2 SDK for JavaScript

The advantages of this implementation approach are as follows:

- The SDK takes care of generating and refreshing the token.
- Coded in JavaScript. If you use JavaScript, and client-side implementation is not suitable for you, this is your best choice.

For details, see [UID2 SDK for JavaScript Reference Guide (2.x and earlier versions)](../sdks/client-side-identity-v2.md).

### UID2 SDK for Java

The advantages of this implementation approach are as follows:

- The SDK takes care of generating and refreshing the token.
- Coded in Java. If your server-side coding is Java, and client-side implementation is not suitable for you, this is your best choice.

For details, see [UID2 SDK for Java (Server-Side) Reference Guide](../sdks/uid2-sdk-ref-java.md).

### UID2 SDK for Python

The advantages of this implementation approach are as follows:

- The SDK takes care of generating and refreshing the token.
- Coded in Python. If your server-side coding is Python, and client-side implementation is not suitable for you, this is your best choice.

For details, see [UID2 SDK for Python (Server-Side) Reference Guide](../sdks/uid2-sdk-ref-python.md).

### Direct integration (API endpoints)

The advantages of this implementation approach are as follows:

- You're free to implement the APIs in whatever way you choose.

For details, see:
- [POST /token/generate](../endpoints/post-token-generate.md)
- [POST /token/refresh](../endpoints/post-token-refresh.md) -->


<!-- 
## TABLE STASH

| Option | Token Generation managed by | Token Refresh managed by |Passing Token to the Bid Stream |
| :--- | :--- | :--- | :--- |
| Prebid.js 8.21.0 or later<br/>[UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) | Prebid.js 8.21.0 or later | Prebid.js 8.21.0 or later | Prebid.js 8.21.0 or later |
| UID2 JavaScript SDK + <br/>Prebid.js 7.53.0 or later | UID2 JS SDK<br/>[Client-Side Integration Guide for JavaScript](publisher-client-side.md) | UID2 JS SDK or Prebid.js 7.53.0 or later | Prebid.js 7.53.0 or later<br/>[UID2 Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md) |
| UID2 SDK for JavaScript<ul><li>[Server-Side Integration Guide for JavaScript](integration-javascript-server-side.md)</li><li>[Publisher Integration Guide, Server-Only](custom-publisher-integration.md)</li></ul> | JavaScript SDK | JavaScript SDK |  Publisher's choice. For example, Prebid.js.<br/>[UID2 Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md) |
| UID2 SDK for Java<br/>[Publisher Integration Guide, Server-Only](custom-publisher-integration.md) | [UID2 SDK for Java](../sdks/uid2-sdk-ref-java.md) | [UID2 SDK for Java](../sdks/uid2-sdk-ref-java.md)| Publisher's choice.<br/>Can be integrated with Prebid.js. |
| UID2 SDK for Python<br/> [Publisher Integration Guide, Server-Only](custom-publisher-integration.md)| [UID2 SDK for Python](../sdks/uid2-sdk-ref-python.md) | [UID2 SDK for Python](../sdks/uid2-sdk-ref-python.md) | Publisher's choice.<br/>Can be integrated with Prebid.js. |
| GAM Secure Signals<br/> [xxx](custom-publisher-integration.md)| [Google Ad Manager Secure Signals Integration Guide](google-ss-integration.md) | [Google Ad Manager Secure Signals Integration Guide](google-ss-integration.md) | [Google Ad Manager Secure Signals Integration Guide](google-ss-integration.md) |
| Direct integration<br/>(API endpoints)<br/>[Publisher Integration Guide, Server-Only](custom-publisher-integration.md) | [POST /token/generate](../endpoints/post-token-generate.md) | [POST /token/refresh](../endpoints/post-token-refresh.md) | Publisher's choice.<br/>Can be integrated with Prebid.js. |
 -->
