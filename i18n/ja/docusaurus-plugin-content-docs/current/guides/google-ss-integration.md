---
title: Google Ad Manager Secure Signals Integration
sidebar_label: GAM Secure Signals
pagination_label: Google Ad Manager Secure Signals Integration
description: UID2 と Google Ad Manager **セキュアシグナル** 機能を使用するパブリッシャー向けのインテグレーション手順。
hide_table_of_contents: false
sidebar_position: 10
---

# Google Ad Manager Secure Signals Integration Guide

このガイドでは、UID2 を Google Ad Manager のセキュアシグナル機能 (旧称: Encrypted Signals for Publishers、ESP) で使用するパブリッシャー向けのインテグレーション手順について説明します。

<!-- It includes the following sections:

* [Overview](#overview)
* [Allow Secure Signal Sharing](#allow-secure-signal-sharing)
* [Publisher Integrations](#publisher-integration)
* [Server-Only Integration](#server-only-integration)
* [UID2 SDK for JavaScript Client-Side Integration](#uid2-sdk-for-javascript-client-side-integration)
* [Sample Applications](#sample-applications) -->

> NOTE: UID2 Google Ad Manager セキュアシグナルインテグレーションを使用するには、SDK を使用している場合、UID2 インテグレーションがすでに設定されている必要があります。サーバーのみのインテグレーションを使用している場合は、この限りではありません。使用可能なすべてのインテグレーションオプションの概要は、[UID2 Integration Guides: Summary](summary-guides.md) を参照してください。

## Overview

Google secure signals は、パブリッシャーが [Google Ad Manager](https://admanager.google.com/home/) と [Google Ad Manager Ad Exchange (AdX)](https://support.google.com/admanager/answer/6321605?hl=ja) を通じて、Google が承認したビッダーに対して「暗号化」したユーザー ID を渡すための方法です。このフレームワークは、パブリッシャーが一般的に使用する [Google Publisher Tag (GPT)](https://developers.google.com/publisher-tag/guides/get-started)ライブラリのオプションパーツとして提供されています。

このフレームワークでは、次のようなステップを踏みます:

1. パブリッシャーは、ユーザー ID シグナル (Advertising Token) をセキュアシグナル機能にプッシュします。
2. セキュアシグナル機能は、Client-Side でそれらをキャッシュし、Google Ad Manager に透過的に渡します。
3. Google Ad Manager は UID2 Token を使ってビッドリクエストを行い、パブリッシャーの設定に基づき Google AdX 内の承認済み入札者にトークンを転送します。

## Allow Secure Signal Sharing

Google Ad Manager アカウントで暗号化 UID2 Token を受け取るには、暗号化されたシグナルが Google Ad Manager アカウントで第三者の入札者と適切に共有されていることを確認する必要があります。

詳しくは、[セキュア シグナルをビッダーと共有する](https://support.google.com/admanager/answer/10488752) (Google reference documentation) を確認し、[サードパーティのシグナルプロバイダーを使用する](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/securesignals) の手順にしたがって、シグナルプロバイダーとして UID2 をオンに設定してください。

## Publisher Integration

暗号化されたシグナルがキャッシュされると、セキュアシグナル機能は、新しいシグナルを生成するためのハンドラを実行しません。このため、ログイン前とログアウト後にキャッシュをクリアする必要があります。

セキュアシグナル機能は特定の ID を削除したり無効にしたりする方法を提供しないので、パブリッシャーはログイン/ログアウトのワークフローの一部として、`window.googletag.secureSignalProviders.clearAllCache()` 関数を呼び出して、共有された暗号化シグナルすべてをクリアしなければなりません。

以下は `window.googletag.secureSignalProviders.clearAllCache()` 関数の呼び出しの例です:

```
window.googletag = window.googletag || { cmd: [] };
window.googletag.cmd.push(function () {
  window.googletag.secureSignalProviders =
    window.googletag.secureSignalProviders || [];
  window.googletag.secureSignalProviders.clearAllCache();
});
```

### Server-Only Integration

暗号化されたシグナルを共有できるように、ホストされ、自動ロードされたセキュアシグナルスクリプトは `window.getUid2AdvertisingToken` 関数を非同期に呼び出し、そのレスポンスとして `advertising_token` を文字列として受け取れるようにしなければなりません。

ID トークンがフレッシュであることを確認することが重要です。Server-Sideのインテグレーションでは、[POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md#post-tokenrefresh) というエンドポイントを呼び出し、JSON レスポンスから新しい [Advertising Token](../endpoints/post-token-refresh.md#decrypted-json-response-format) を取得することが推奨されます。

次のコードは、その例です。

```
window.getUid2AdvertisingToken = async () => {
  // Make a call to get a fresh identity token which could last for at least 12 hours.
  const identity = await getFreshIdentity()
  return JSON.parse(decodeURIComponent(identity)).advertising_token
}
```

詳しくは、[Server-Only UID2 Integration Guide](custom-publisher-integration.md) を参照してください。

Server Only インテグレーションのためのサンプルアプリケーションも用意されています。[Sample Applications](#sample-applications) を参照してください。

### UID2 SDK for JavaScript Client-Side Integration

UID2 SDK for JavaScript バージョン 3.0.0 以降を使用している場合、UID2 セキュアシグナルスクリプトは、SDKで提供されている `getAdvertisingTokenAsync` 関数を使用して新しい Advertising Token を取得し、そのトークンを Google Ad Manager にプッシュします。

このスクリプトは CDN でホストされており、GPT はセキュアシグナル機能で自動的にロードします。

詳しくは、 [JavaScript Standard Integration Guide](integration-javascript-standard.md) を参照してください。

<!--A sample application is also available for client-side integration using the SDK. See [Sample Applications](#sample-applications).-->

## Sample Applications

Google Ad Manager のセキュアシグナル機能との連携方法については、以下のサンプルアプリケーションを参照してください:

- [Server-Only UID2 Integration Example](https://esp-srvonly-integ.uidapi.com/)
- [Client-Side UID2 SDK Integration Example](https://esp-jssdk-integ.uidapi.com/)

各サンプルアプリケーションには独自のインストラクションがあります。
