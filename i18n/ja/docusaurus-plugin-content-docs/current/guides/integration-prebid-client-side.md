---
title: UID2 Client-Side Integration Guide for Prebid.js
sidebar_label: Client-Side Integration for Prebid.js
pagination_label: UID2 Client-Side Integration for Prebid.js
description: Client-Side での Prebid.js インテグレーションの設定に関する情報。
hide_table_of_contents: false
sidebar_position: 04
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import SnptIntegratingWithSSO from '../snippets/_snpt-integrating-with-sso.mdx';
import SnptPreparingEmailsAndPhoneNumbers from '../snippets/_snpt-preparing-emails-and-phone-numbers.mdx';
import SnptAddPrebidjsToYourSite from '../snippets/_snpt-prebid-add-prebidjs-to-your-site.mdx';
import SnptStoreUID2TokenInBrowser from '../snippets/_snpt-prebid-storing-uid2-token-in-browser.mdx';

# UID2 Client-Side Integration Guide for Prebid.js

このガイドは、Client-Side で <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> (メールアドレスまたは電話番号) にアクセスでき、UID2 とインテグレーションして、RTB <Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>で Prebid.js によって渡される <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 Token</Link> (Advertising Token) を生成したいパブリッシャー向けのものです。

Prebid.js を使用して UID2 とインテグレーションするには、サイトの HTML と JavaScript を変更する必要があります。このガイドに従う場合、Server-Side の作業は必要ありません。

## Prebid.js Version

この実装には、Prebid.js バージョン 8.21.0 以降が必要です。バージョン情報については、[https://github.com/prebid/Prebid.js/releases](https://github.com/prebid/Prebid.js/releases) を参照してください。

<!-- Diff in Prebid.js supported version for UID2/EUID is fine: verif SS 11/19/24 -->

以前のバージョンの Prebid.js を使用する必要がある場合は、代わりに [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md) で説明している実装ソリューションを使用してください。

## Integrating with Single Sign-On (SSO)

<SnptIntegratingWithSSO />

## Preparing DII for Processing

<SnptPreparingEmailsAndPhoneNumbers />

## Integration Overview: High-Level Steps

以下のステップを完了する必要があります:

1. [Complete UID2 account setup and configure account](#complete-uid2-account-setup-and-configure-account)
2. [Add Prebid.js to your site](#add-prebidjs-to-your-site)
3. [Configure the UID2 module](#configure-the-uid2-module)

### Complete UID2 Account Setup and Configure Account

UID2 とインテグレーションするには、UID2 アカウントが必要です。アカウントをまだ作成していない場合は、まず [Account Setup](../getting-started/gs-account-setup.md) ページの手順に従ってください。

アカウントの初期設定が完了すると、[UID2 Portal](../portal/portal-overview.md) にアクセスするための手順とリンクが送信されます。そこで本番 [環境](../getting-started/gs-environments.md) 用の [credentials](../getting-started/gs-credentials.md) を作成し、提供が必要な追加の値を設定できます。詳細は [Getting Started with the UID2 Portal](../portal/portal-getting-started.md) を参照してください。

Client-Side インテグレーションの場合、UID2 Portal の [Client-Side Integration](../portal/client-side-integration.md) ページで以下の値を設定する必要があります:

- Subscription ID と Public Key: [Adding and Managing Key Pairs](../portal/client-side-integration.md#adding-and-managing-key-pairs) を参照してください。

- Prebid.js を使用するサイトの **ドメイン名** のリスト: [Adding and Managing Root-Level Domains](../portal/client-side-integration.md#adding-and-managing-root-level-domains) を参照してください。

<!-- (earlier instructions, no-portal, for EUID)
When account setup is complete, you'll receive a client keypair consisting of two values that identify you to the UID2 servers: Subscription ID and public key. These values are unique to you, and you'll use them to configure the UID2 module. For details, see [Subscription ID and Public Key](../getting-started/gs-credentials.md#subscription-id-and-public-key). 
-->

:::tip
アカウント設定に必要なのはルートレベルのドメインのみです。たとえば、example.com、shop.example.com、example.org で Prebid.js とともに UID2 を使用する場合、提供する必要があるドメイン名は example.com と example.org のみです。
:::

### Add Prebid.js to Your Site

<SnptAddPrebidjsToYourSite />

### Configure the UID2 Module

UID2 モジュールを設定するには、アカウント設定中に受け取った **Public Key** と **Subscription ID**、およびユーザーのハッシュ化された、またはハッシュ化されていないメールアドレスまたは電話番号を含むオブジェクトを指定して `pbjs.setConfig` を呼び出します。

設定が完了すると、UID2 モジュールはユーザーの UID2 Token を生成し、ユーザーのブラウザに保存します。サイトがユーザーのブラウザで開いている限り、モジュールは必要に応じて自動的にトークンをリフレッシュします。

特定のユーザーに対して、4 つの受け入れ可能な DII フォーマットのいずれかを使用して UID2 モジュールを設定できます:

- 正規化された、または正規化されていないメールアドレス
- 正規化され、ハッシュ化され、Base64 エンコードされたメールアドレス
- 正規化された電話番号
- 正規化され、ハッシュ化され、Base64 エンコードされた電話番号

注:

- DII フォーマットはユーザーごとに異なる場合がありますが、ユーザーごとに送信できる値は 1 つだけです。
- すでにハッシュ化された DII をモジュールに渡したい場合は、次の手順に従ってください:
  1. まず正規化します。
  1. 次に、SHA-256 ハッシュアルゴリズムを使用して結果をハッシュ化します。
  1. 次に、ハッシュ値の結果のバイトを Base64 エンコーディングを使用してエンコードします。
  
  詳細については、[Normalization and Encoding](../getting-started/gs-normalization-encoding.md) を参照してください。例については、[Configuring the UID2 Module: Code Example](#configuring-the-uid2-module-code-example) を参照してください。
- UID2 モジュールは、UID2 サービスに送信する前に、ハッシュ化された DII を暗号化します。
- モジュールが複数回設定された場合は、最新の設定値が使用されます。

#### Configuring the UID2 Module: Code Example

以下のコードスニペットは、UID2 モジュールを設定するさまざまな方法を示しています。

```js
const baseConfig = {
  userSync: {
    userIds: [{
      name: 'uid2',
      params: {
        serverPublicKey: publicKey,
        subscriptionId: subscriptionId,
        // Choose only one of the following: email, emailHash, phone, or phoneHash
        email: 'user@example.com', // Normalized or non-normalized, unhashed email address
        // emailHash: 'tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=', // Normalized, hashed, and encoded email address
        // phone: '+12345678901', // Normalized phone number
        // phoneHash: 'EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=', // Normalized, hashed, and encoded phone number
      }
    }]
  }
};
```

:::note
この例では、UID2 本番環境を使用していることを前提としています。インテグレーションテスト中は、`params.uid2ApiBase` を `'https://operator-integ.uidapi.com'` に設定して UID2 インテグレーション環境を使用してください。UID2 インテグレーション環境からのトークンは、ビッドストリームに渡すためには無効です。インテグレーション環境の場合は、別途 **Subscription ID** と **Public Key** の値をリクエストする必要があります。これらは UID2 Portal では作成できません。詳細については、[Getting Your Credentials](../getting-started/gs-credentials.md#getting-your-credentials) を参照してください。
:::

## Storing the UID2 Token in the Browser

<SnptStoreUID2TokenInBrowser />

## When to Pass DII to the UID2 Module

UID2 モジュールが設定されると、ユーザーのブラウザ内に既存の UID2 Token があるかを確認します。同じ DII から生成されたトークンが存在し、それがまだ有効であるか、リフレッシュ可能である場合、モジュールはそれを使用し、必要に応じてリフレッシュします。

既存のトークンがない場合、またはトークンの有効期限が切れていてリフレッシュできない場合、UID2 モジュールは DII なしで新しいトークンを生成できません。

:::tip
ページ読み込みごとにユーザーの DII を使用して UID2 モジュールを設定してください。これが推奨されるアプローチです。
:::

場合によっては、ページ読み込み時にユーザーの DII が利用できず、DII の取得にコストがかかることがあります。たとえば、DII をフェッチするために API 呼び出しが必要な場合や、ユーザーに情報の提供を促す必要がある場合などです。

UID2 Token の有効期限が切れていてリフレッシュできない場合は、新しいトークンを生成するために DII を使用して UID2 モジュールを設定する必要があります。これを行うには、次の例に示すように、`pbjs.getUserIds().uid2` によって返される値を確認します:

```js
const params = {}; 
 
if (!pbjs.getUserIds().uid2) { 
  // There is no token that can be used or refreshed. 
  // The UID2 module must be configured with DII to generate a new token. 
  params.email = getUserEmail(); 
  params.serverPublicKey = publicKey; 
  params.subscriptionId = subscriptionId; 
} 

pbjs.setConfig({ 
  userSync: { 
    userIds: [{ 
      name: 'uid2', 
      params: params 
    }] 
  } 
}); 
```

ユーザーが以前に UID2 をオプトアウトしている可能性があります。この場合、UID2 モジュールはユーザーのオプトアウトを尊重し、Prebid.js によって UID2 Token が生成および収集されることはありません。

## Checking the Integration

UID2 モジュールが正常に UID2 Token を生成したことを確認するには、`pbjs.getUserIds().uid2` を呼び出します。値が返された場合、有効な UID2 Token が UID2 モジュールに存在します。

インテグレーションに問題がある場合、以下の手順を実行できます:

- ブラウザのコンソールログを確認してください。
- **Subscription ID** (**subscriptionId** の値) と **Public Key** (**serverPublicKey** の値) を確認してください:
  - UID2 チームから受け取った値と完全に同じであることを確認してください。
  - 使用している環境に対して正しい値を持っていることを確認してください。環境ごとに異なる **Subscription ID** と **Public Key** の値があります。[Getting Your Credentials](../getting-started/gs-credentials.md#getting-your-credentials) を参照してください。
- アカウント設定時に、サイトのドメイン名を UID2 チームに提供したことを確認してください。必要に応じて、UID2 の連絡先に確認してください。
- ブラウザの開発者ツールを使用して、UID2 サービスへの API 呼び出しを検査してください。

さらなるヘルプについては、Prebid のドキュメント [Troubleshooting Prebid.js](https://docs.prebid.org/troubleshooting/troubleshooting-guide.html) および [Debugging Prebid.js](https://docs.prebid.org/debugging/debugging.html) を参照してください。

Prebid.js の設定を検証およびデバッグするためのツールの例として、オープンソースの Chrome 拡張機能である Professor Prebid があります:

- Chrome ウェブストアのダウンロード場所: [Professor Prebid](https://chromewebstore.google.com/detail/professor-prebid/kdnllijdimhbledmfdbljampcdphcbdc)
- prebid.org のドキュメント: [Professor Prebid User Guide](https://docs.prebid.org/tools/professor-prebid.html)

## Optional: Specifying the API Base URL to Reduce Latency

デフォルトでは、UID2 モジュールは米国の UID2 本番環境サーバーへの呼び出しを行います。

ユースケースに最適な URL を選択する方法、および有効なベース URL の完全なリストについては、[Environments](../getting-started/gs-environments.md) を参照してください。

UID2 モジュールを設定する際に、デフォルト以外の UID2 サーバーを指定するには、次の例に示すように、オプションの `params.uid2ApiBase` パラメータを設定します:

```js
pbjs.setConfig({ 
  userSync: { 
    userIds: [{ 
      name: 'uid2', 
      params: { 
        uid2ApiBase: baseUrl, 
        // ... 
      } 
    }] 
  } 
}); 
```

## Optional: Deferred Client-Side UID2 Configuration with mergeConfig

すでに Prebid.js を設定しているが、初期設定に UID2 を含めなかった場合でも、Prebid.js が提供する 2 つの関数を使用して UID2 モジュールを追加できます:

- [mergeConfig()](https://docs.prebid.org/dev-docs/publisher-api-reference/mergeConfig.html): 他の設定を上書きせずに、新しい設定を既存の Prebid 設定にマージします。既存の `userSync.userIds` 配列に UID2 モジュールを追加するためにこれを使用します。
- [refreshUserIds()](https://docs.prebid.org/dev-docs/publisher-api-reference/refreshUserIds.html): ユーザー ID サブモジュールを再実行して最新の ID を取得します。`mergeConfig()` の後にこれを呼び出して、UID2 Token の生成をトリガーします。

Prebid が UID2 Token のライフサイクル全体を処理できるように、上記と同じ設定情報 (API ベース URL、credentials、DII) を渡します:

```js
// Step 1: Define the UID2 configuration
const uidConfig = {
  userSync: {
    userIds: [{
      name: 'uid2',
      params: {
        uid2ApiBase: 'https://operator-integ.uidapi.com',
        email: 'user@example.com',
        subscriptionId: subscriptionId,
        serverPublicKey: publicKey
      }
    }]
  }
};

// Step 2: Merge UID2 config into existing Prebid config (additive, won't overwrite)
pbjs.mergeConfig(uidConfig);

// Step 3: Trigger user ID refresh to generate the token
await pbjs.refreshUserIds({ submoduleNames: ['uid2'] });
```

:::note
一度設定に UID2 を追加すると、Prebid は `userIds` 配列全体を上書きせずに個々のサブモジュールを削除する機能を提供しません。Prebid が localStorage 内の UID2 Token にアクセスできる Client-Side インテグレーションの場合、ユーザーがログアウトした後にトークンが保存されている localStorage をクリアし、ページをリロードしてキャッシュをクリアすることが重要です。これにより、将来のビッドリクエストでその ID が使用されるのを防ぎます。

UID2 SDK を個別に管理している場合は、`window.__uid2.disconnect()` を使用してください。これは、ページのリフレッシュを必要とせずに、すべてのログアウト機能 (メモリとストレージの両方のクリア) を処理します。
:::

遅延設定 (Deferred configuration) の実装サンプルも利用可能です。詳細については、[Sample Implementations](#sample-implementations) を参照してください。

## Optional: Prebid.js Integration with Google Secure Signals

Prebid.js を使用しており、Google Secure Signals を使用して Google に UID2 Token を渡す予定の場合は、いくつかの追加の設定手順があります:

- Google Ad Manager アカウントで、暗号化されたシグナルがサードパーティのビダーと適切に共有されていることを確認してください: [Allow Secure Signals Sharing](integration-google-ss.md#allow-secure-signals-sharing) を参照してください。
- Prebid.js の設定を更新してください: [Optional: Enable Secure Signals in Prebid.js](integration-google-ss.md#optional-enable-secure-signals-in-prebidjs) を参照してください。

Secure Signals を使用した Prebid.js の実装サンプルも利用可能です。詳細については、[Sample Implementations](#sample-implementations) を参照してください。

## Sample Implementations

UID2 を Client-Side で Prebid.js とインテグレーションする方法を示すために、以下の実装サンプルが利用可能です:

- Prebid.js を使用した Client-Side インテグレーションの例:
  - Site: [Client-Side UID2 Integration with Prebid.js](https://prebid-client.samples.uidapi.com/)
  - Code: [uid2-examples/web-integrations/prebid-integrations/client-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/prebid-integrations/client-side)
- Prebid.js を使用した遅延 Client-Side インテグレーションの例:
  - Site: [Deferred Client-Side UID2 Integration with Prebid.js](https://prebid-deferred.samples.uidapi.com/)
  - Code: [uid2-examples/web-integrations/prebid-integrations/client-side-deferred](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/prebid-integrations/client-side-deferred)
- Google Secure Signals で Prebid.js を使用した Client-Side インテグレーションの例:
  - Site: [Client-Side UID2 Integration with Prebid.js (with Google Secure Signals)](https://prebid-secure-signals.samples.uidapi.com/)
  - Code: [uid2-examples/web-integrations/prebid-secure-signals](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/prebid-secure-signals)

各実装サンプルには独自の手順があります。
