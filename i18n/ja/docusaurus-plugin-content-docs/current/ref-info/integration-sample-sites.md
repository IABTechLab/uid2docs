---
title: Integration Samples and Tools
description: UID2 のすべてのサンプルサイト例の概要とリファレンス。
hide_table_of_contents: false
---

import Link from '@docusaurus/Link';

# Integration Samples and Tools

このページでは、一般的なインテグレーションのユースケースを強調するすべての公式 UID2 サンプル実装のリストと、ライブデモサイト、ソースコード、および関連ドキュメントへのリンクを示します。このページを使用して、ニーズに合ったサンプルを見つけて、動作する例を調べてください。

## Web Integrations

このセクションでは、UID2 を直接ウェブサイトに統合したいパブリッシャー向けのサンプル統合をまとめています。ウェブサイト向けの統合オプションの完全な概要については、[Publisher Web Integration Overview](../guides/integration-options-publisher-web) を参照してください。

### Client-Side Integration Using UID2 SDK for JavaScript

このサンプルは、[SDK for JavaScript Reference Guide](../sdks/sdk-ref-javascript) を使用してブラウザ内で直接トークンを生成および管理する完全なクライアントサイド統合を好むパブリッシャー向けです。このアプローチは、最小限のバックエンド要件で迅速なプロトタイピングに最適です。

- Site: [UID2 Publisher Client-Side Integration Example using UID2 JavaScript SDK](https://cstg-integ.uidapi.com/)
- Code: [uid2-web-integrations/examples/cstg](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/cstg)
- Doc: [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side)

### Client-Server Integration Using UID2 SDK for JavaScript

このサンプルは、UID2 Token の作成をより細かく制御したいパブリッシャー向けです（サーバー側で処理されます）。クライアント側では JavaScript SDK を使用して、ブラウザ内のトークンを管理および更新します。

- Site: [UID2 SDK Integration Example](https://example-jssdk-integ.uidapi.com/)
- Code: [uid2-web-integrations/examples/js-sdk](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/js-sdk)
- Doc: [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server)

### UID2 Server-Only (Server-Side)

このサンプルは、すべての UID2 操作をサーバー側で実行し、クライアント側の SDK に依存せずに最大の制御、セキュリティ、および柔軟性を提供したいパブリッシャー向けです。

- Site: [Server-Only UID2 Integration Example](https://example-srvonly-integ.uidapi.com/login)
- Code: [uid2-examples/publisher/server_only](https://github.com/IABTechLab/uid2-examples/tree/main/publisher/server_only)
- Doc: [Publisher Integration Guide, Server-Side](../guides/integration-publisher-server-side)

## Prebid.js Integrations

このセクションには、RTB ビッドストリームで Prebid.js によって渡される UID2 Token を生成するためのサンプルページが含まれています。詳細については、[UID2 Integration Overview for Prebid](../guides/integration-prebid) を参照してください。

### Client-Side Integration with Prebid.js

このサンプルは、クライアント側で UID2 Tokenを生成し、Prebid.js を使用してヘッダービディングオークションに渡したいパブリッシャー向けです。

- Site: [UID2 Prebid.js Client-Side Integration Example](https://unifiedid.com/examples/cstg-prebid-example/)
- Code: [uid2docs/static/examples/cstg-prebid-example](https://github.com/IABTechLab/uid2docs/tree/main/static/examples/cstg-prebid-example)
- Doc: [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side)

## Google Secure Signals Integrations

このセクションには、Google の広告システムに UID2 アイデンティティデータを Secure Signals 機能を通じて渡すためのサンプルページが含まれています。詳細については、[Google Ad Manager Secure Signals Integration Guide](../guides/integration-google-ss) を参照してください。

### Client-Side Secure Signals

このサンプルは、GAM Secure Signals との純粋なクライアントサイド統合を望むパブリッシャー向けです。

- Site: [UID2 Publisher Client-Side Integration Example using UID2 JavaScript SDK, Secure Signals](https://secure-signals-client-side-integ.uidapi.com/)
- Code: [uid2-web-integrations/examples/google-secure-signals-integration/client_side](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-secure-signals-integration/client_side)
- Doc: [Google Ad Manager Secure Signals Integration Guide](../guides/integration-google-ss)

### React Client-Side Secure Signals

このサンプルは、React アプリを持つパブリッシャー向けで、UID2 と Secure Signals をコンポーネントベースのアーキテクチャに直接統合したい場合のものです。

- Site: [UID2 React Client-Side Integration Example with Google Secure Signals](https://secure-signals-react-integ.uidapi.com/)
- Code: [uid2-web-integrations/examples/google-secure-signals-integration/react_client_side](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-secure-signals-integration/react_client_side)
- Doc: [Google Ad Manager Secure Signals Integration Guide](../guides/integration-google-ss)

### Server-Side Secure Signals

このサンプルは、より良い制御とセキュリティのために、すべての Secure Signals および UID2 ロジックをサーバー側で実行したいパブリッシャー向けです。

- Site: [Server-Side UID2 Integration Example with Google Secure Signals](https://secure-signals-server-side-integ.uidapi.com/login)
- Code: [uid2-web-integrations/examples/google-secure-signals-integration/server_side](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-secure-signals-integration/server_side)
- Doc: [Google Ad Manager Secure Signals Integration Guide](../guides/integration-google-ss)
- Additional site domains:
  - [https://secure-signals-srvonly-integ.uidapi.com](https://secure-signals-srvonly-integ.uidapi.com)
  - [https://esp-srvonly-integ.uidapi.com](https://esp-srvonly-integ.uidapi.com)

### Client-Server Secure Signals

このサンプルは、トークン生成をサーバー側で行い、Secure Signals のロジックをクライアント側で実行するハイブリッドアプローチを望むパブリッシャー向けです。

- Site: [Example for Client-Server UID2 SDK Integration with Google Secure Signals](https://secure-signals-client-server-integ.uidapi.com/)
- Code: [uid2-web-integrations/examples/google-secure-signals-integration/with_sdk_v3](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-secure-signals-integration/with_sdk_v3)
- Doc: [Google Ad Manager Secure Signals Integration Guide](../guides/integration-google-ss)
- Additional site domains:
  - [https://secure-signals-jssdk-integ.uidapi.com](https://secure-signals-jssdk-integ.uidapi.com)
  - [https://esp-jssdk-integ.uidapi.com](https://esp-jssdk-integ.uidapi.com)

## UID2 Hashing Tool

このツールは、トークンリクエスト前のメールのハッシュ化や正規化など、データ準備を検証する開発者またはクライアント向けです。ツールは以下のリンクで利用できます：

- Site: [UID2 Hashing Tool](https://unifiedid.com/examples/hashing-tool/)
- Code: [uid2Docs/static/examples/hashing-tool](https://github.com/IABTechLab/uid2docs/tree/main/static/examples/hashing-tool)
- Doc: [Normalization and Encoding](../getting-started/gs-normalization-encoding)

:::note
このファイルのサンプルサイトは、一般的なインテグレーションのいくつかを強調していますが、利用可能なすべての UID2 インテグレーションオプションを表しているわけではありません。利用可能なすべてのインテグレーションオプションの概要については、[UID2 Integration Guides: Summary](../guides/summary-guides) を参照してください。
:::
