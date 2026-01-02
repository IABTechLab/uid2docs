---
title: Integration Samples and Tools
description: UID2 のすべてのサンプルサイト例の概要とリファレンス。
hide_table_of_contents: false
---

import Link from '@docusaurus/Link';

# Integration Samples and Tools

このページでは、一般的なインテグレーションのユースケースを強調するすべての公式 UID2 サンプル実装のリストと、ライブデモサイト、ソースコード、および関連ドキュメントへのリンクを示します。このページを使用して、ニーズに合ったサンプルを見つけて、動作する例を調べてください。

## JavaScript SDK Integrations

このセクションでは、Prebid.js や Google Secure Signals を使用せずに UID2 SDK for JavaScript を直接使用したサンプル統合をまとめています。

### Client-Side Integration Using UID2 SDK for JavaScript

このサンプルは、[SDK for JavaScript Reference Guide](../sdks/sdk-ref-javascript) を使用してブラウザ内で直接トークンを生成および管理する完全なクライアントサイド統合を好むパブリッシャー向けです。このアプローチは、最小限のバックエンド要件で迅速なプロトタイピングに最適です。

- Site: [Client-Side UID2 Integration Example using JavaScript SDK](https://js-client-side.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/javascript-sdk/client-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/javascript-sdk/client-side)
- Doc: [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side)

### Client-Server Integration Using UID2 SDK for JavaScript

このサンプルは、UID2 Token の作成をより細かく制御したいパブリッシャー向けです（サーバー側で処理されます）。クライアント側では JavaScript SDK を使用して、ブラウザ内のトークンを管理および更新します。

- Site: [Client-Server UID2 Integration Example using JavaScript SDK](https://js-client-server.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/javascript-sdk/client-server](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/javascript-sdk/client-server)
- Doc: [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server)

### React Client-Side Integration Using UID2 SDK for JavaScript

このサンプルは、React アプリを持つパブリッシャー向けで、SDK for JavaScript を使用して UID2 をコンポーネントベースのアーキテクチャに直接統合したい場合のものです。

- Site: [React Client-Side UID2 Integration Example using JavaScript SDK](https://js-react.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/javascript-sdk/react-client-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/javascript-sdk/react-client-side)
- Doc: [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side)

### UID2 Server-Only (Server-Side)

このサンプルは、すべての UID2 操作をサーバー側で実行し、クライアント側の SDK に依存せずに最大の制御、セキュリティ、および柔軟性を提供したいパブリッシャー向けです。

- Site: [Server-Side UID2 Integration Example](https://server-side.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/server-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/server-side)
- Doc: [Publisher Integration Guide, Server-Side](../guides/integration-publisher-server-side)

## Prebid.js Integrations

このセクションには、RTB ビッドストリームで Prebid.js によって渡される UID2 Token を生成するためのサンプルページが含まれています。詳細については、[UID2 Integration Overview for Prebid](../guides/integration-prebid) を参照してください。

### Client-Side Integration with Prebid.js

このサンプルは、クライアント側で DII にアクセスでき、フロントエンド開発のみを行いたいパブリッシャー向けです。Prebid.js がトークン生成、ストレージ、自動更新を含む UID2 ワークフロー全体を処理します。

- Site: [Client-Side UID2 Integration with Prebid.js](https://prebid-client.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/prebid-integrations/client-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/prebid-integrations/client-side)
- Doc: [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side)

### Client-Server Integration with Prebid.js

このサンプルは、サーバー側で DII にアクセスでき、サーバー側開発を行えるパブリッシャー向けです。サーバーが初期 UID2 トークンを生成し、Prebid.js がストレージと自動更新を含むトークンライフサイクルを引き続き管理します。

- Site: [Client-Server UID2 Integration with Prebid.js](https://prebid-client-server.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/prebid-integrations/client-server](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/prebid-integrations/client-server)
- Doc: [UID2 Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-client-server)

### Deferred Client-Side Integration with Prebid.js

このサンプルは、すでに Prebid.js を設定しているパブリッシャーが、Prebid が提供する機能を使用して UID2 モジュールを追加する方法を示しています。

- Site: [Deferred Client-Side UID2 Integration with Prebid.js](https://prebid-deferred.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/prebid-integrations/client-side-deferred](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/prebid-integrations/client-side-deferred)
- Doc: [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side)

### Prebid.js with Secure Signals

このサンプルは、UID2 と Google Secure Signals の両方で Prebid.js を設定し、ヘッダービディングと Google Ad Manager 間の統合を可能にする方法を示しています。

- Site: [Client-Side UID2 Integration with Prebid.js (with Google Secure Signals)](https://prebid-secure-signals.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/prebid-secure-signals](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/prebid-secure-signals)
- Doc: [Google Ad Manager Secure Signals Integration Guide](../guides/integration-google-ss)

## Google Secure Signals Integrations

このセクションには、Google の広告システムに UID2 アイデンティティデータを Secure Signals 機能を通じて渡すためのサンプルページが含まれています。詳細については、[Google Ad Manager Secure Signals Integration Guide](../guides/integration-google-ss) を参照してください。

### Client-Side Secure Signals

このサンプルは、GAM Secure Signals との純粋なクライアントサイド統合を望むパブリッシャー向けです。UID2 SDK for JavaScript がトークンを生成および管理し、Secure Signals スクリプトがトークンを Google Ad Manager と自動的に共有します。

- Site: [Client-Side UID2 Integration with Google Secure Signals](https://secure-signals-client-side.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/google-secure-signals/client-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/google-secure-signals/client-side)
- Doc: [Google Ad Manager Secure Signals Integration Guide](../guides/integration-google-ss)

### Client-Server Secure Signals

このサンプルは、サーバー側で UID2 トークンを生成し、クライアント側で SDK for JavaScript を使用してトークンを管理したいパブリッシャー向けです。Secure Signals スクリプトがトークンを Google Ad Manager と自動的に共有します。

- Site: [Client-Server UID2 SDK Integration Example with Google Secure Signals](https://secure-signals-client-server.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/google-secure-signals/client-server](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/google-secure-signals/client-server)
- Doc: [Google Ad Manager Secure Signals Integration Guide](../guides/integration-google-ss)

### Server-Side Secure Signals

このサンプルは、すべての UID2 トークンロジックをサーバー側で処理したいパブリッシャー向けです。Secure Signals スクリプトがトークンを読み取り、Google Ad Manager と自動的に共有します。

- Site: [Server-Side UID2 Integration with Google Secure Signals](https://secure-signals-server-side.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/google-secure-signals/server-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/google-secure-signals/server-side)
- Doc: [Google Ad Manager Secure Signals Integration Guide](../guides/integration-google-ss)

### React Client-Side Secure Signals

このサンプルは、React アプリを持つパブリッシャー向けで、UID2 と Secure Signals をコンポーネントベースのアーキテクチャに直接統合したい場合のものです。

- Site: [React Client-Side UID2 Integration with Google Secure Signals](https://secure-signals-react.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/google-secure-signals/react-client-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/google-secure-signals/react-client-side)
- Doc: [Google Ad Manager Secure Signals Integration Guide](../guides/integration-google-ss)

## Tools

### UID2 Hashing Tool

このツールは、トークンリクエスト前のメールや電話番号のハッシュ化や正規化など、データ準備を検証する開発者またはクライアント向けです。ツールは以下のリンクで利用できます：

- Site: [UID2 Hashing Tool](https://hashing-tool.samples.uidapi.com/)
- Code: [uid2-examples/tools/hashing-tool](https://github.com/IABTechLab/uid2-examples/tree/main/tools/hashing-tool)
- Doc: [Normalization and Encoding](../getting-started/gs-normalization-encoding)

:::note
このファイルのサンプルサイトは、一般的なインテグレーションのいくつかを強調していますが、利用可能なすべての UID2 インテグレーションオプションを表しているわけではありません。利用可能なすべてのインテグレーションオプションの概要については、[UID2 Integration Guides: Summary](../guides/summary-guides) を参照してください。
:::
