---
title: UID2 Integration Overview for Prebid
sidebar_label: UID2 Integration Overview for Prebid
pagination_label: UID2 Integration Overview for Prebid
description: UID2 実装の一部として Prebid とインテグレーションするためのオプションの概要。
hide_table_of_contents: false
sidebar_position: 04
displayed_sidebar: sidebarPublishers
---

import Link from '@docusaurus/Link';
import StoreUID2TokenInBrowser from '/docs/snippets/_prebid-storing-uid2-token-in-browser.mdx';

# UID2 Integration Overview for Prebid

このガイドは、UID2 とインテグレーションし、RTB <Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>で Prebid.js によって渡される <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link>(Advertising Token) を生成したいパブリッシャー向けのインテグレーションオプションの概要です。

## Prebid.js Support for Web

UID2 は、以下をサポートする Prebid.js module を提供しています:

- [Generating the UID2 token](#generating-the-uid2-token)
- [Refreshing the UID2 token](#refreshing-the-uid2-token)
- [Storing the UID2 token in the browser](#storing-the-uid2-token-in-the-browser)
- [Passing the UID2 token to the bidstream](#passing-the-uid2-token-to-the-bidstream)

さらに柔軟性を高めるため、UID2 は JavaScript SDK など、一部の機能や補完的なプロダクトの代替手段も提供しています。

:::caution
UID2 は GDPR が適用される場所では使用しないように設計されています。このモジュールは渡された同意データをチェックし、`gdprApplies` フラグが `true` に設定されている場合は動作しません。
:::

### Generating the UID2 Token

DII へのアクセスに応じて、Prebid.js で使用する UID2 Token を生成する方法は次の表のように 2 種類あります 。

どの方法が最適かを判断し、該当するインテグレーションガイドに従ってください。

| Scenario | Integration Guide |
| :--- | :--- |
| Client-Side で DII にアクセスでき、フロントエンドの開発のみを行いたい。 | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| Server-Side で DII にアクセスし、Server-Side の開発ができる。 | [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md) |

### Refreshing the UID2 Token

Prebid.js UID2 Module は、UID2 Token を自動的にリフレッシュすることができます。Prebid.js の外部で手動リフレッシュを実装したい場合は、Server-Side インテグレーションガイドの [Refreshing a UID2 Token](integration-prebid-client-server.md#refreshing-a-uid2-token) を参照してください。Client-Side のインテグレーションソリューションには、トークンの自動リフレッシュが含まれています。

### Storing the UID2 Token in the Browser

<StoreUID2TokenInBrowser />

### Passing the UID2 Token to the Bidstream

UID2 module を設定するには `pbjs.setConfig` を呼び出します。サポートされているパラメータの詳細については、実装に適用されるガイドを参照してください:

- [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md)
- [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md)

UID2 module が設定されると、ユーザーの UID2 Token を管理し、ユーザーのブラウザに保存します。

Client-Side または Server-Side でクライアントリフレッシュモードを使用してトークンを生成する場合、ユーザーのブラウザでサイトが開いている間は、モジュールが自動的にトークンをリフレッシュします。しかし、Server-Side でトークンのリフレッシュを管理するオプションもあります。詳細については、Server-Side インテグレーションガイドの [Refreshing a UID2 Token](integration-prebid-client-server.md#refreshing-a-uid2-token) を参照してください。Client-Side のインテグレーションソリューションには、トークンの自動リフレッシュが含まれています。

### Integration Overview: High-Level Steps

Prebid.js を使ってサイトを UID2 とインテグレーションするには、以下のステップを完了する必要があります:

1. UID2 アカウントのセットアップを完了します。
1. Prebid.js をサイトに追加します。
1. UID2 module を設定します。

詳細な手順については、以下のインテグレーションガイドのいずれかを参照してください:

- [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md)
- [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md)

## Prebid Mobile SDK Support for Mobile Devices

UID2 と Prebid のインテグレーションは、Prebid Mobile SDK を使用して Android と iOS のモバイルデバイスでサポートされています。

詳細は [UID2 Mobile Integration for Prebid Mobile SDK](integration-prebid-mobile-summary.md) を参照してください。
