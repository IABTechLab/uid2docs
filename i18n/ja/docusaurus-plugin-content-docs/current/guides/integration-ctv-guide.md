---
title: CTV Integration Guide
sidebar_label: CTV
pagination_label: CTV Integration Guide
description: UID2 モバイルインテグレーションオプションのまとめ。
hide_table_of_contents: false
sidebar_position: 04
---

import Link from '@docusaurus/Link';

# CTV Integration Guide

CTV パブリッシャーであれば、UID2 とインテグレーションして、CTV アプリのコンテキストで RTB ビッドストリームに渡す ID トークンを生成およびリフレッシュする方法がいくつかあります。

## Key Integration Steps
UID2 とインテグレーションするには、次の 3 つの主要なステップを実装します:

1. UID2 Token を生成します。
1. 必要に応じて UID2 Token をリフレッシュします。
1. UID2 Token をビッドストリームに渡します。

これらのステップをどのように実装するかを決定するには、[CTV Integration Options](#ctv-integration-options) から選択してください。

## CTV Integration Options

UID2 Token の生成とリフレッシュをどこで行うかに基づいて、最適なインテグレーションオプションを選択できます。次の 3 つのオプションがあります:

- [Client-Side Integration](#client-side-integration-for-ctv-apps) (UID2 Token は Client-Side で生成とリフレッシュされます)
- [Server-Side Integration](#server-side-integration-for-ctv-apps) (UID2 Token は Server-Side で生成とリフレッシュされます)
- [Client-Server Integration](#client-server-integration-for-ctv-apps) (UID2 Token は Server-Side で生成され、Client-Side でリフレッシュされます)

## Client-Side Integration for CTV Apps

Client-Side オプションは、UID2 Token を完全に Client-Side で管理したいパブリッシャー向けです:

- トークンは CTV アプリ内で Client-Side で生成されます。
- トークンは CTV アプリ内から必要に応じてリフレッシュされます。

このセットアップでは、すべてのコード変更が CTV アプリ内で行う必要があります。

この方法で実装するには、[UID2 Client-Side Integration Guide for Mobile](integration-mobile-client-side.md) の手順に従ってください。

次の表は、対応するオペレーティングシステムと、関連するドキュメントリソースへのリンクを示しています。

| Operating System | Integration Guide | Link to SDK Guide |
| :--- | :--- | :--- |
| [Apple tvOS](https://developer.apple.com/tvos/) | [UID2 Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md) | [SDK for iOS Reference Guide](../sdks/sdk-ref-ios.md) |
| [Android TV](https://www.android.com/tv/) | [UID2 Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md) | [SDK for Android Reference Guide](../sdks/sdk-ref-android.md) |

## Server-Side Integration for CTV Apps

Server-Side オプションは、UID2 Token を完全に Server-Side で管理したいパブリッシャー向けです:

- トークンは Server-Side で生成されます。
- 必要に応じてトークンは Server-Side でリフレッシュされます。

このセットアップでは、ほとんどのコード変更が Server-Side で行われ、CTV アプリ内での変更は最小限に抑えられます。

この方法の利点の 1 つは、複数のプラットフォーム (Web / CTV / モバイル) に対処する場合、すべてを Server-Side で行うことで、プラットフォーム固有の作業を減らすことができることです。

この方法で実装するには、[Publisher Integration Guide, Server-Side](integration-publisher-server-side.md) の手順に従ってください。

Server-Side コードが Java または Python である場合、UID2 SDK のいずれかを使用して、UID2 への HTTP リクエストを行うことができます。自分でソースコードを書く代わりに、次のいずれかの SDK ガイドを参照してください:

- [SDK for Java Reference Guide: Usage for Publishers](../sdks/sdk-ref-java.md#usage-for-publishers)
- [SDK for Python Reference Guide: Usage for Publishers](../sdks/sdk-ref-python.md#usage-for-publishers)

## Client-Server Integration for CTV Apps

このオプションは UID2 Token を Client-Server で管理したいパブリッシャー向けです:

- トークンは Server-Side で生成されます。
- トークンは CTV アプリ内から必要に応じて Client-Side でリフレッシュされます。

この方法で実装するには、[UID2 Client-Server Integration Guide for Mobile](integration-mobile-client-server.md) の手順に従ってください。

次の表は、対応するオペレーティングシステムと、関連するドキュメントリソースへのリンクを示しています。

| Operating System | Integration Guide | Link to SDK Guide |
| :--- | :--- | :--- |
| [Apple tvOS](https://developer.apple.com/tvos/) | [UID2 Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md) | [SDK for iOS Reference Guide](../sdks/sdk-ref-ios.md) |
| [Android TV](https://www.android.com/tv/) | [UID2 Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md) | [SDK for Android Reference Guide](../sdks/sdk-ref-android.md) |
