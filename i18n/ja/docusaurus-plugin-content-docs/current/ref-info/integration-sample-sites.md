---
title: Integration Samples and Tools
description: UID2 のすべてのサンプルサイト例の概要とリファレンス。
hide_table_of_contents: false
---

import Link from '@docusaurus/Link';

# Integration samples and tools

このページでは、一般的なインテグレーションのユースケースを強調するすべての公式 UID2 サンプル実装のリストと、ライブデモサイト、ソースコード、および関連ドキュメントへのリンクを示します。このページを使用して、ニーズに合ったサンプルを見つけて、動作する例を調べてください。

すべてのサンプルサイトは [https://samples.uidapi.com/](https://samples.uidapi.com/) で利用できます。

:::note
このページに掲載されているサンプル実装はメールベースのインテグレーションを行っていますが、電話番号も同様にサポートされており、別の SDK メソッドを使用し追加の正規化ステップを必要とするものの、同じインテグレーションパターンに従います。電話番号インテグレーションの例については、[UID2 hashing tool](#uid2-hashing-tool)を参照してください。
:::

## JavaScript SDK integrations

このセクションでは、Prebid.js や Google Secure Signals を使用せずに UID2 SDK for JavaScript を直接使用したサンプルインテグレーションをまとめています。参加者タイプ別のインテグレーションオプションについては、[Publisher web integration overview](../guides/integration-options-publisher-web) または [Advertiser/data provider integration overview](../guides/integration-advertiser-dataprovider-overview) を参照してください。

### Client-side integration using UID2 SDK for JavaScript

このサンプルは、[SDK for JavaScript reference guide](../sdks/sdk-ref-javascript) を使用してブラウザ内で直接トークンを生成および管理する完全な Client-Side インテグレーションを好むパブリッシャー向けです。このアプローチは、最小限のバックエンド要件で迅速なプロトタイピングに最適です。

- Site: [Client-Side UID2 Integration Example using JavaScript SDK](https://js-client-side.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/javascript-sdk/client-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/javascript-sdk/client-side)
- Doc: [Client-side integration guide for JavaScript](../guides/integration-javascript-client-side)

### Client-server integration using UID2 SDK for JavaScript

このサンプルは、UID2 Token の作成をより細かく制御したいパブリッシャー向けです（Server-Side で処理されます）。Client-Side では JavaScript SDK を使用して、ブラウザ内のトークンを管理および更新します。

- Site: [Client-Server UID2 Integration Example using JavaScript SDK](https://js-client-server.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/javascript-sdk/client-server](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/javascript-sdk/client-server)
- Doc: [Client-server integration guide for JavaScript](../guides/integration-javascript-client-server)

### React client-side integration using UID2 SDK for JavaScript

このサンプルは、React アプリを持つパブリッシャー向けで、SDK for JavaScript を使用して UID2 をコンポーネントベースのアーキテクチャに直接インテグレーションしたい場合のものです。

- Site: [React Client-Side UID2 Integration Example using JavaScript SDK](https://js-react.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/javascript-sdk/react-client-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/javascript-sdk/react-client-side)
- Doc: [Client-side integration guide for JavaScript](../guides/integration-javascript-client-side)

### UID2 server-only (server-side)

このサンプルは、すべての UID2 操作を Server-Side で実行し、Client-Side の SDK に依存せずに最大の制御、セキュリティ、および柔軟性を提供したいパブリッシャー向けです。

- Site: [Server-Side UID2 Integration Example](https://server-side.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/server-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/server-side)
- Doc: [Publisher integration guide, server-side](../guides/integration-publisher-server-side)

## Prebid.js integrations

このセクションには、RTB ビッドストリームで Prebid.js によって渡される UID2 Token を生成するためのサンプルページが含まれています。詳細については、[UID2 integration overview for Prebid](../guides/integration-prebid) を参照してください。

### Client-side integration with Prebid.js

このサンプルは、Client-Side で DII にアクセスでき、フロントエンド開発のみを行いたいパブリッシャー向けです。Prebid.js がトークン生成、ストレージ、自動更新を含む UID2 ワークフロー全体を処理します。

- Site: [Client-Side UID2 Integration with Prebid.js](https://prebid-client.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/prebid-integrations/client-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/prebid-integrations/client-side)
- Doc: [UID2 client-side integration guide for Prebid.js](../guides/integration-prebid-client-side)

### Client-server integration with Prebid.js

このサンプルは、Server-Side で DII にアクセスでき、Server-Side 開発を行えるパブリッシャー向けです。サーバーが初期 UID2 Token を生成し、Prebid.js がストレージと自動更新を含むトークンライフサイクルを引き続き管理します。

- Site: [Client-Server UID2 Integration with Prebid.js](https://prebid-client-server.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/prebid-integrations/client-server](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/prebid-integrations/client-server)
- Doc: [UID2 client-server integration guide for Prebid.js](../guides/integration-prebid-client-server)

### Deferred client-side integration with Prebid.js

このサンプルは、すでに Prebid.js を設定しているパブリッシャーが、Prebid が提供する機能を使用して UID2 モジュールを追加する方法を示しています。

- Site: [Deferred Client-Side UID2 Integration with Prebid.js](https://prebid-deferred.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/prebid-integrations/client-side-deferred](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/prebid-integrations/client-side-deferred)
- Doc: [UID2 client-side integration guide for Prebid.js](../guides/integration-prebid-client-side)

### Prebid.js with Secure Signals

このサンプルは、UID2 と Google Secure Signals の両方で Prebid.js を設定し、ヘッダービディングと Google Ad Manager 間のインテグレーションを可能にする方法を示しています。

- Site: [Client-Side UID2 Integration with Prebid.js (with Google Secure Signals)](https://prebid-secure-signals.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/prebid-secure-signals](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/prebid-secure-signals)
- Doc: [Google Ad Manager Secure Signals integration guide](../guides/integration-google-ss)

## Google Secure Signals integrations

このセクションには、Google の広告システムに UID2 アイデンティティデータを Secure Signals 機能を通じて渡すためのサンプルページが含まれています。詳細については、[Google Ad Manager Secure Signals integration guide](../guides/integration-google-ss) を参照してください。

### Client-side Secure Signals

このサンプルは、GAM Secure Signals との Client-Side インテグレーションを望むパブリッシャー向けです。UID2 SDK for JavaScript がトークンを生成および管理し、Secure Signals スクリプトがトークンを Google Ad Manager と自動的に共有します。

- Site: [Client-Side UID2 Integration with Google Secure Signals](https://secure-signals-client-side.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/google-secure-signals/client-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/google-secure-signals/client-side)
- Doc: [Google Ad Manager Secure Signals integration guide](../guides/integration-google-ss)

### Client-server Secure Signals

このサンプルは、Server-Side で UID2 Token を生成し、Client-Side で SDK for JavaScript を使用してトークンを管理したいパブリッシャー向けです。Secure Signals スクリプトがトークンを Google Ad Manager と自動的に共有します。

- Site: [Client-Server UID2 SDK Integration Example with Google Secure Signals](https://secure-signals-client-server.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/google-secure-signals/client-server](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/google-secure-signals/client-server)
- Doc: [Google Ad Manager Secure Signals integration guide](../guides/integration-google-ss)

### Server-side Secure Signals

このサンプルは、すべての UID2 Token ロジックを Server-Side で処理したいパブリッシャー向けです。Secure Signals スクリプトがトークンを読み取り、Google Ad Manager と自動的に共有します。

- Site: [Server-Side UID2 Integration with Google Secure Signals](https://secure-signals-server-side.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/google-secure-signals/server-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/google-secure-signals/server-side)
- Doc: [Google Ad Manager Secure Signals integration guide](../guides/integration-google-ss)

### React client-side Secure Signals

このサンプルは、React アプリを持つパブリッシャー向けで、UID2 と Secure Signals をコンポーネントベースのアーキテクチャに直接インテグレーションしたい場合のものです。

- Site: [React Client-Side UID2 Integration with Google Secure Signals](https://secure-signals-react.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/google-secure-signals/react-client-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/google-secure-signals/react-client-side)
- Doc: [Google Ad Manager Secure Signals integration guide](../guides/integration-google-ss)

## Tools

### UID2 hashing tool

このツールは、トークンリクエスト前のメールや電話番号のハッシュ化や正規化など、データ準備を検証する開発者またはクライアント向けです。ツールは以下のリンクで利用できます：

- Site: [UID2 Hashing Tool](https://hashing-tool.samples.uidapi.com/)
- Code: [uid2-examples/tools/hashing-tool](https://github.com/IABTechLab/uid2-examples/tree/main/tools/hashing-tool)
- Doc: [Normalization and encoding](../getting-started/gs-normalization-encoding)

:::note
このファイルのサンプルサイトは、一般的なインテグレーションのいくつかを強調していますが、利用可能なすべての UID2 インテグレーションオプションを表しているわけではありません。利用可能なすべてのインテグレーションオプションの概要については、[UID2 integration guides: Summary](../guides/summary-guides) を参照してください。
:::
