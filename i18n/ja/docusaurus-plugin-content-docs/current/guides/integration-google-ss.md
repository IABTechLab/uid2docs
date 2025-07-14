---
title: Google Ad Manager Secure Signals Integration
sidebar_label: GAM Secure Signals
pagination_label: Google Ad Manager Secure Signals Integration
description: UID2 と Google Ad Manager **セキュアシグナル** 機能を使用するパブリッシャー向けのインテグレーション手順。
hide_table_of_contents: false
sidebar_position: 10
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import IntegratingWithSSO from '../snippets/_integrating-with-sso.mdx';

# Google Ad Manager Secure Signals Integration Guide

このガイドでは、UID2 を Google Ad Manager のセキュアシグナル機能 (旧称: Encrypted Signals for Publishers、ESP) で使用するパブリッシャー向けのインテグレーション手順について説明します。

:::note
UID2 Google Ad Manager セキュアシグナルインテグレーションを使用するには、SDK を使用している場合、UID2 インテグレーションがすでに設定されている必要があります。サーバーのみのインテグレーションを使用している場合は、この限りではありません。使用可能なすべてのインテグレーションオプションの概要は、[UID2 Integration Guides: Summary](summary-guides.md) を参照してください。
:::

## Overview

Google secure signals は、パブリッシャーが [Google Ad Manager](https://admanager.google.com/home/) と [Google Ad Manager Ad Exchange (AdX)](https://support.google.com/admanager/answer/6321605?hl=ja) を通じて、Google が承認したビッダーに対して「暗号化」したユーザー ID を渡すための方法です。このフレームワークは、パブリッシャーが一般的に使用する [Google Publisher Tag (GPT)](https://developers.google.com/publisher-tag/guides/get-started)ライブラリのオプションパーツとして提供されています。

このフレームワークでは、次のようなステップを踏みます:

1. パブリッシャーは、ユーザー ID シグナル (Advertising Token) をセキュアシグナル機能にプッシュします。
2. セキュアシグナル機能は、Client-Side でそれらをキャッシュし、Google Ad Manager に透過的に渡します。
3. Google Ad Manager は UID2 Token を使ってビッドリクエストを行い、パブリッシャーの設定に基づき Google AdX 内の承認済み入札者にトークンを転送します。

## Complete UID2 Account Setup and Configure Account

UID2 とインテグレーションするには、UID2 アカウントが必要です。アカウントをまだ作成していない場合は、まず [Account Setup](../getting-started/gs-account-setup.md) ページの手順に従ってください。

アカウントの初期設定が完了すると、[UID2 Portal](../portal/portal-overview.md) にアクセスするための手順とリンクが送信されます。ここで、本番環境用の [credentials](../getting-started/gs-credentials.md) を作成し、提供する必要がある追加の値を設定できます。詳細は、[Getting Started with the UID2 Portal](../portal/portal-getting-started.md) を参照してください。

設定する値は、選択した [Publisher Integration Options](#publisher-integration-options) によって異なります:

- Client-Server または Server-Side の実装の場合、UID2 Portal の [API Keys](../portal/api-keys.md) ページで次の値を設定する必要があります:
  - <Link href="../ref-info/glossary-uid#gl-api-key">API key</Link>、Client key とも呼ばれます。
  - <Link href="../ref-info/glossary-uid#gl-client-secret">Client secret</Link>、参加者と UID2 Service のみが知っている値。

    :::important
    これらの値を安全に保管することが非常に重要です。詳細は、[Security of API Key and Client Secret](../getting-started/gs-credentials.md#security-of-api-key-and-client-secret) を参照してください。
    :::
- Client-Side の実装の場合、UID2 Portal の [Client-Side Integration](../portal/client-side-integration.md) ページで次の値を設定する必要があります:
  - Subscription ID と Public Key: [Adding and Managing Key Pairs](../portal/client-side-integration.md#adding-and-managing-key-pairs) を参照してください。
  - この SDK を使用するサイトの **domain names** のリスト: [Adding and Managing Root-Level Domains](../portal/client-side-integration.md#adding-and-managing-root-level-domains) を参照してください。
  - モバイルアプリ ID (適用される場合): [Adding and Managing Mobile App IDs](../portal/client-side-integration.md#adding-and-managing-mobile-app-ids) を参照してください。

## Allow Secure Signals Sharing

Google Ad Manager アカウントで暗号化 UID2 Token を受け取るには、暗号化されたシグナルが Google Ad Manager アカウントで第三者の入札者と適切に共有されていることを確認する必要があります。

詳細は、Google ドキュメントの [Share encrypted signals with bidders](https://support.google.com/admanager/answer/10488752) を確認し、[Use a third-party signal provider](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/securesignals) の手順に従って、シグナルプロバイダーとして UID2 をオンに設定してください。

:::important
手順に従う際、[Select allowed secure signals](https://support.google.com/admanager/answer/10488752#select-signals) の **Web Signal Deploy Option** で **Google Deploy** を選択してください。Prebid.js を使用している場合は、[Optional: Enable Secure Signals in Prebid.js](#optional-enable-secure-signals-in-prebidjs) を参照してください。
:::

### Optional: Enable Secure Signals in Prebid.js

Prebid.js で Secure Signals を使用する場合は、UID2 が正しく処理されるように、次の追加手順を完了する必要があります:

1. Google Ad Manager で、暗号化されたシグナルがサードパーティの入札者と適切に共有されていることを確認する際: **Prebid User ID Module** を選択し、**Use your Prebid configuration to automatically configure your Secure signals settings** も選択します。設定を保存する前に、正しいオプションを選択したことを再確認してください。

1. Prebid.js のセットアップ: 次のコードに示すように、Prebid 構成内の `encryptedSignalSources` セクションを更新します。

   ```
   "encryptedSignalSources": {
     "sources":[
       {
         "source":[
           "uidapi.com"
         ],
         "encrypt":false
       }
     ]
   }
   ```

   For details, see [ESP Configurations](https://docs.prebid.org/dev-docs/modules/userId.html#esp-configurations) in the Prebid documentation.

## Integrating with Single Sign-On (SSO)

<IntegratingWithSSO />

## Publisher Integration

暗号化されたシグナルがキャッシュされると、セキュアシグナル機能は、新しいシグナルを生成するためのハンドラを実行しません。このため、データキャプチャの前後にキャッシュをクリアする必要があります。

セキュアシグナル機能は特定の ID を削除したり無効にしたりする方法を提供しないので、パブリッシャーはデータキャプチャのワークフローの一部として、`window.googletag.secureSignalProviders.clearAllCache()` 関数を呼び出して、共有された暗号化シグナルすべてをクリアしなければなりません。

以下は `window.googletag.secureSignalProviders.clearAllCache()` 関数の呼び出しの例です:

```
window.googletag = window.googletag || { cmd: [] };
window.googletag.cmd.push(function () {
  window.googletag.secureSignalProviders =
    window.googletag.secureSignalProviders || [];
  window.googletag.secureSignalProviders.clearAllCache();
});
```

## Publisher Integration Options

Google Secure Signals パブリッシャーインテグレーションには、UID2 との 3 つのインテグレーションオプションがあります:
- [Server-Side Integration](#server-side-integration)
- [SDK for JavaScript Client-Server Integration](#sdk-for-javascript-client-server-integration)
- [SDK for JavaScript Client-Side Integration](#sdk-for-javascript-client-side-integration)

### Server-Side Integration

暗号化されたシグナルを共有できるように、ホストされ、自動ロードされたセキュアシグナルスクリプトは `window.getUid2AdvertisingToken` 関数を非同期に呼び出し、そのレスポンスとして `advertising_token` を文字列として受け取れるようにしなければなりません。

ID トークンがフレッシュであることを確認することが重要です。Server-Sideのインテグレーションでは、[POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) というエンドポイントを呼び出し、JSON レスポンスから新しい [Advertising Token](../endpoints/post-token-refresh.md#decrypted-json-response-format) を取得することが推奨されます。

次のコードは、その例です。

```
window.getUid2AdvertisingToken = async () => {
  // Make a call to get a fresh identity token which could last for at least 12 hours.
  const identity = await getFreshIdentity()
  return JSON.parse(decodeURIComponent(identity)).advertising_token
}
```

詳細は、[Server-Only UID2 Integration Guide](integration-publisher-server-side.md) を参照してください。

Server Only インテグレーションのためのサンプルアプリケーションも用意されています。[Sample Implementations](#sample-implementations) を参照してください。

### SDK for JavaScript Client-Server Integration

Javascript SDK Version 3.0.0 以降を使用している場合、UID2 セキュアシグナルスクリプトは、SDK で提供されている `getAdvertisingTokenAsync` 関数を使用して新しい Advertising Token を取得し、そのトークンを Google Ad Manager にプッシュします。

このスクリプトは CDN でホストされており、GPT はセキュアシグナル機能で自動的にロードします。

詳細は、[Client-Server Integration Guide for JavaScript](integration-javascript-client-server.md) を参照してください。

JavaScript SDK を使用したインテグレーションのためのサンプルアプリケーションも用意されています。[Sample Implementations](#sample-implementations) を参照してください。

### SDK for JavaScript Client-Side Integration

SDK for JavaScript バージョン 3.0.0 以降を使用している場合、UID2 セキュアシグナルスクリプトは、SDKで提供されている `getAdvertisingTokenAsync` 関数を使用して新しい Advertising Token を取得し、そのトークンを Google Ad Manager にプッシュします。

このスクリプトは CDN でホストされており、GPT はセキュアシグナル機能で自動的にロードします。

詳しくは [Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md) を参照してください。

<!--  A sample implementation is also available for integration using the SDK for JavaScript. See [Sample Implementations](#sample-implementations). [sample integration to come Jan 2025-->

## Sample Implementations

Google Ad Manager のセキュアシグナル機能との連携方法については、以下のサンプルアプリケーションを参照してください:

- UID2 JavaScript SDK と Google secure signals を使用した Server-Side インテグレーションのサンプル:
  - [Sample implementation](https://secure-signals-server-side-integ.uidapi.com/)
  - [Code repository](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-secure-signals-integration/server_side)
- UID2 JavaScript SDK と Google secure signals を使用した Client-Server インテグレーションのサンプル:
  - [Sample implementation](https://secure-signals-client-server-integ.uidapi.com/)
  - [Code repository](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-secure-signals-integration/with_sdk_v3)
- UID2 JavaScript SDK と Google secure signals を使用した Client-Side インテグレーションのサンプル:
  - [Sample implementation](https://secure-signals-client-side-integ.uidapi.com/)
  - [Code repository](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-secure-signals-integration/client_side)
- Client-side integration example using React, the UID2 JavaScript SDK, and Google secure signals:
  - [Sample implementation](https://secure-signals-react-integ.uidapi.com)
  - [Code repository](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-secure-signals-integration/react_client_side)

各サンプル実装には、それぞれのの手順があります。

## Troubleshooting

UID2 インテグレーションで Google Secure Signals を使用する際に役立つトラブルシューティング情報です:

- [I enabled Secure Signals within Google Ad Manager, but UID2s are not being passed through Google](#i-enabled-secure-signals-within-google-ad-manager-but-uid2s-are-not-being-passed-through-google)

#### I enabled Secure Signals within Google Ad Manager, but UID2s are not being passed through Google

Google Ad Manager で Secure Signals を有効にした後、Google を介して正常な UID2 が渡されない場合があります。これは、参加者が誤った **Web Signal Deployment Method** 構成を持っている場合があります。

UID2 が Google を介して渡されない場合は、セットアップ時に正しい **Web Signal Deployment Method** を選択したことを確認してください。

詳細は、[Allow Secure Signals Sharing](#allow-secure-signals-sharing) の **Important** ノートを参照してください。
