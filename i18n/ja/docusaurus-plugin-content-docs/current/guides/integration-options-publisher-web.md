---
title: Web Integration Overview
description: UID2 ウェブインテグレーションにおけるパブリッシャーオプションの概要。
hide_table_of_contents: false
sidebar_position: 02
---

# Web Integration Overview

パブリッシャーとして、UID2 とインテグレーションしてア ID トークンを生成し、ウェブページのコンテキストで RTB ビッドストリームに渡す方法はたくさんあります。

このページでは、インテグレーションステップとインテグレーションオプションの概要と、各オプションの追加情報へのリンクを紹介します。

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
| [UID2 SDK for JavaScript, server-side](integration-javascript-standard.md) | &#9989; | &#9989; | &#8212; |
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
| UID2 SDK for JavaScript, client-side implementation | [JavaScript Express Integration Guide](publisher-client-side.md) |

### Server-Side Integration Options

Server-Side で UID2 Token を生成することには、次のような利点があります:

- [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) を完全に Server-Side に置いておくことができます。
- 開発リソースがバックエンド開発者であれば、Server-Side のインテグレーションを好むかもしれません。
- Server-Side の Prebid インテグレーションでは、バージョンが 7.53.0 以降であれば、最新の Prebid バージョンにアップデートする必要はありません。

以下の表は、Server-Side で UID2 Token を生成したいパブリッシャー向けのオプションをまとめたものです。

| Option | Documentation |
| :--- | :--- |
| UID2 SDK for JavaScript, server-side implementation | [JavaScript Standard Integration Guide](integration-javascript-standard.md) |
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
| UID2 SDK for JavaScript, client-side implementation | [JavaScript Express Integration Guide](publisher-client-side.md) |
| UID2 SDK for JavaScript, server-side implementation | [JavaScript Standard Integration Guide](integration-javascript-standard.md) |
| UID2 SDK for Java | - [Publisher Integration Guide, Server-Only](custom-publisher-integration.md)<br/>- [UID2 SDK for Java](../sdks/uid2-sdk-ref-java.md) |
| UID2 SDK for Python | - [Publisher Integration Guide, Server-Only](custom-publisher-integration.md)<br/>- [UID2 SDK for Python](../sdks/uid2-sdk-ref-python.md)  |
| Direct integration (API endpoints) | [Publisher Integration Guide, Server-Only](custom-publisher-integration.md) |

## Pass the UID2 Token Into the Bid Stream

パブリッシャーは、DII（メールアドレスや電話番号）を UID2 Token に暗号化し、UID2 Token をビッドストリームに送信することで UID2 を使用します。

以下の表は、UID2 Token をビッドストリームに渡すことをサポートするインテグレーションオプションをまとめたものです。

| Option | Documentation |
| :--- | :--- |
| Prebid.js client-side implementation (8.21.0 or later) | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| Prebid.js server-side implementation (7.53.0 or later) | [UID2 Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md) |
| Google Ad Manager Secure Signals| [Google Ad Manager Secure Signals Integration Guide](google-ss-integration.md) |

:::note
トークンを生成し、それをリフレッシュし続ける限り、UID2 Token をビッドストリームに渡すために他のオプションを使用することもできます。
:::
