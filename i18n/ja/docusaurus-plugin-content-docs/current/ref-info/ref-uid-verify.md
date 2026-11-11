---
title: UID Verify Chrome extension
description: UID Verify Chrome 拡張機能を使用して、任意の Web ページの UID2 インテグレーションをデバッグおよび検査する方法。
hide_table_of_contents: false
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# UID Verify Chrome extension

UID Verify は、UID2 インテグレーションのデバッグ用ブラウザ拡張機能です。現在のページの UID2 実装をリアルタイムで検査し、UID2 SDK の設定、アイデンティティストレージ、イベント履歴、エラーを表示します。

この拡張機能は、<Link href="../sdks/sdk-ref-javascript">SDK for JavaScript</Link>、<Link href="../guides/integration-prebid">Prebid.js</Link>、<Link href="../guides/integration-google-ss">Google Secure Signals</Link> を使用したインテグレーションをサポートします。

## Overview

UID2 のインテグレーションを行う際、UID2 SDK が正しく初期化されているか、Token が有効か、ライフサイクルのどこでエラーが発生しているかを判断することが難しい場合があります。UID Verify は、UID2 SDK の設定、アイデンティティデータ、イベントストリームをページから直接読み取り、構造化された検索可能なインターフェースで表示することでデバッグを支援します。

この拡張機能は、ページが UID2 SDK を直接使用しているか、Prebid.js を使用しているか、Google Secure Signals を使用しているか（またはその組み合わせ）を検出し、各インテグレーションタイプに関連する情報を表示します。

## Prerequisites

UID Verify には以下が必要です:

- **Google Chrome** ブラウザ
- UID2 インテグレーションを持つ Web ページ — 以下のいずれかがページに存在する必要があります:
  - <Link href="../sdks/sdk-ref-javascript">SDK for JavaScript</Link> がページに読み込まれている（`window.__uid2` 経由でアクセス可能）
  - <Link href="../guides/integration-prebid">Prebid.js</Link> と UID2 ユーザー ID モジュールが設定されている
  - <Link href="https://developers.google.com/publisher-tag/guides/secure-signals">Google Publisher Tags (GPT)</Link> に UID2 Secure Signals プロバイダーが登録されている

複数のインテグレーションタイプが検出された場合は、ポップアップ上部のインテグレーションタイプタブを使用して切り替えができます。

:::note
Server-Side インテグレーションは現在サポートされていません。UID Verify は、ブラウザストレージや UID2 SDK グローバル変数などの Client-Side シグナルを読み取ることで動作しますが、Server-Side インテグレーションにはこれらが存在しません。
:::

## Installing the extension

Chrome ウェブストアから UID Verify をインストールするには、次の手順に従います:

1. Chrome ウェブストアで [UID Verify のリスト](https://chromewebstore.google.com/detail/uid-verify/cfpjjmdagnkmmolcddnoagffeoekkmle) を開きます。
2. **Chrome に追加** をクリックします。
3. プロンプトが表示されたら、**拡張機能を追加** をクリックします。
4. 拡張機能をツールバーにピン留めしてアクセスしやすくします: ブラウザの拡張機能アイコンをクリックし、UID Verify の横にあるピンアイコンをクリックします。

## Using UID Verify

インストール後、UID2 インテグレーションを検査するには次の手順に従います:

1. UID2 インテグレーションを持つ Web ページに移動します。
2. ブラウザのツールバーにある **UID Verify** アイコンをクリックして、拡張機能のポップアップを開きます。
3. 拡張機能はページ上のインテグレーションタイプを検出し、適切なタブを表示します。

:::note
UID Verify は UID2 と EUID の両方をサポートしています。ページは UID2（北米とアジアの一部）または EUID（ヨーロッパおよびその他の GDPR 適用地域）のいずれかを使用する必要があり、両方を使用することはできません。同じページで両方が検出された場合、拡張機能はエラーを表示します。
:::

## Interpreting results

以下のセクションでは、UID Verify ポップアップの各タブで利用可能な情報について説明します。各タブのコンテンツは、検出されたインテグレーションタイプによって異なります。

### Config tab

**Config** タブは、トークン生成の成功、エラー、オプトアウトアイデンティティ、その他の設定状態のステータスバナーを含む、インテグレーションの現在の状態のスナップショットを提供します。表示される情報はインテグレーションタイプによって異なります（以下のセクションを参照）。

**UID2 SDK integrations:**

- UID2 SDK バージョン
- UID2 SDK 初期化オプション
- 現在のアイデンティティオブジェクト（以下を含む）:
  - Advertising Token
  - Refresh Token
  - Token とリフレッシュの有効期限タイムスタンプ
- `getAdvertisingToken()` の結果
- `isLoginRequired()` の結果

**Prebid.js integrations:**

- `window.pbjs.getUserIds().uid2` からの現在の UID2 Token
- `window.pbjs.getConfig().userSync.userIds` からの Prebid.js 設定パラメータ（例: `uid2ApiBase`、`subscriptionId`、`serverPublicKey`）

**Google Secure Signals integrations:**

- Google Publisher Tags が検出されているか
- UID2 プロバイダー ID が登録されているか
- `getAdvertisingTokenAsync` が利用可能か
- コレクター関数が登録されているか（UID2 Token を暗号化されたシグナルとして Google Ad Manager に渡す関数）

### Storage tab

**Storage** タブは、現在のインテグレーションのブラウザに保存されている生のアイデンティティデータを表示します。

**UID2 SDK and Prebid.js integrations**

SDK と Prebid.js インテグレーションには、次の表に示すフィールドが含まれます。

| Field | Description |
|---|---|
| Storage Type | アイデンティティがクッキーと `localStorage` のどちらに保存されているかを示します。|
| Storage Key | クッキーまたは `localStorage` キーの名前。UID2 SDK インテグレーションの場合: `__uid_2` または `UID2-sdk-identity`。Prebid.js インテグレーションの場合: `__uid2_advertising_token`。|
| Stored Value | `advertising_token`、`refresh_token`、`identity_expires`、`refresh_expires`、`refresh_from`、`refresh_response_key` を含む生のアイデンティティ JSON。|
| Valid Identity | 保存されているアイデンティティが現在有効かどうかを示します — つまり、Advertising Token の有効期限が切れておらず、ユーザーがオプトアウトしていないことを意味します。|
| Optout Identity | アイデンティティがオプトアウトしたユーザーを反映しているかどうかを示します。|

Google Secure Signals インテグレーションの場合、このタブはセキュアシグナルの状態と現在の UID2 Advertising Token を表示します。シグナルがまだ生成されていない場合は、キャッシュされたシグナルも UID2 SDK の Advertising Token も利用できないことを示します。コレクター関数が正常に実行されると、拡張機能は「Secure signal is cached」というステータスメッセージを表示し、`_GESPSK-uidapi.com` に保存されたキャッシュ値を表示します。キャッシュされたシグナルは `[providerId, advertisingToken, expiryTimestamp]` の形式です。現在の UID2 Advertising Token も別途表示されます。

### Callbacks tab

**Callbacks** タブは UID2 SDK インテグレーションのみで利用可能です。UID2 SDK に登録されたすべてのコールバック関数のソースコードをシンタックスハイライト付きで表示します。これは、正しいコールバックが登録されていることを確認し、ページコードのどこでイベントが処理されているかを特定するのに役立ちます。

### Event History tab

**Event History** タブは、ページで発生する UID2 SDK イベントのリアルタイムで検索可能なログを表示します。次の表に示す列が含まれます。

| Column | Description |
|---|---|
| Date | イベントが記録された日付。|
| Time | イベントが記録された時刻。|
| Event | イベントタイプ（例: `SdkLoaded`、`InitCompleted`、`TokenUpdated`）。|
| Advertising Token | イベントに関連する Advertising Token（存在する場合）。|

検索バーを使用して、イベントタイプまたはトークン値でフィルタリングします。

このタブには、エラーが検出された場合の **Error Log** も含まれます。拡張機能は以下を含む複数のソースからエラーをキャプチャします:

- UID2 Operator へのネットワークリクエストの失敗
- リソースの読み込み失敗（UID2 SDK スクリプトなど）
- UID2 SDK コードからの `console.error` 呼び出し
- UID2 SDK メソッドによってスローされたエラー

既知のエラーパターンについては、拡張機能はエラーとともにコンテキストに応じたトラブルシューティングガイダンスを表示します。
