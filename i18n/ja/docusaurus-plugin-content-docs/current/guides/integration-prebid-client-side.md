---
title: UID2 Client-Side Integration Guide for Prebid.js
sidebar_label: Client-Side Integration for Prebid.js
pagination_label: UID2 Client-Side Integration for Prebid.js
description: Client-Side での Prebid.js インテグレーションの設定に関する情報。
hide_table_of_contents: false
sidebar_position: 04
---

import Link from '@docusaurus/Link';
import AddPrebidjsToYourSite from '../snippets/_prebid-add-prebidjs-to-your-site.mdx';
import StoreUID2TokenInBrowser from '../snippets/_prebid-storing-uid2-token-in-browser.mdx';
import IntegratingWithSSO from '../snippets/_integrating-with-sso.mdx';

# UID2 Client-Side Integration Guide for Prebid.js

このガイドは、Client-Side で <Link href="../ref-info/glossary-uid#gl-dii">DII</Link>(メールアドレスまたは電話番号) にアクセスでき、UID2 とインテグレーションして、RTB <Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>で Prebid.js によって渡される <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link>(Advertising Token) を生成したいパブリッシャー向けのものです。

Prebid.js を使って UID2 とインテグレーションするには、サイトの HTML と JavaScript を変更する必要があります。このガイドに従えば、Server-Side の作業は必要ありません。

## Prebid.js Version

この実装には Prebid.js version 8.21.0 以降が必要です。バージョン情報については、[https://github.com/prebid/Prebid.js/releases](https://github.com/prebid/Prebid.js/releases) を参照してください。

<!-- Diff in Prebid.js supported version for UID2/EUID is fine: verif SS 11/19/24 -->

以前のバージョンの Prebid.js を使用する必要がある場合は、代わりに [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md) で説明している実装ソリューションを使用してください。

## Integration Example

UID2 Prebid.js Client-Side インテグレーション例は、以下のリンクから入手できます:

- コード: [Example Prebid.js UID2 Integration](https://github.com/IABTechLab/uid2docs/tree/main/static/examples/cstg-prebid-example)
- ランニングサイト: [UID2 Prebid.js Client-Side Integration Example](https://unifiedid.com/examples/cstg-prebid-example/)

## Integrating with Single Sign-On (SSO)

<IntegratingWithSSO />

## Integration Overview: High-Level Steps

以下のステップを完了する必要があります:

1. [Complete UID2 account setup and configure account](#complete-uid2-account-setup-and-configure-account)
2. [Add Prebid.js to your site](#add-prebidjs-to-your-site).
3. [Configure the UID2 module](#configure-the-uid2-module).

### Complete UID2 Account Setup and Configure Account

UID2 とインテグレーションするには、UID2 アカウントが必要です。アカウントをまだ作成していない場合は、まず [Account Setup](../getting-started/gs-account-setup.md) ページの手順に従ってください。

アカウントの初期設定が完了すると、[UID2 Portal](../portal/portal-overview.md) にアクセスするための手順とリンクが送信されます。UID2 Portalでは、[本番環境](../getting-started/gs-environments.md) のための [credentials](../getting-started/gs-credentials.md) を作成し、提供する必要がある追加の値を設定できます。詳細については、[Getting Started with the UID2 Portal](../portal/portal-getting-started.md) を参照してください。

Client-Side インテグレーションには、UID2 Portalの [Client-Side Integration](../portal/client-side-integration.md) ページで以下の値を設定する必要があります:

- Subscription ID と Public Key: [Adding and Managing Key Pairs](../portal/client-side-integration.md#adding-and-managing-key-pairs) を参照してください。

- Prebid.js を使用するサイトの **domain names** のリスト: [Adding and Managing Root-Level Domains](../portal/client-side-integration.md#adding-and-managing-root-level-domains) を参照してください。

<!-- (earlier instructions, no-portal, for EUID)
When account setup is complete, you'll receive a client keypair consisting of two values that identify you to the UID2 servers: Subscription ID and public key. These values are unique to you, and you'll use them to configure the UID2 module. For details, see [Subscription ID and Public Key](../getting-started/gs-credentials.md#subscription-id-and-public-key). 
-->

:::tip
アカウント設定に必要なのは、ルートレベルのドメインだけです。たとえば、Prebid.js で UID2 を example.com、shop.example.com、example.org で使用する場合、ドメイン名 example.com と example.org だけを指定します。
:::

### Add Prebid.js to Your Site

<AddPrebidjsToYourSite />

### Configure the UID2 Module

UID2 module を設定するには、アカウント設定時に受け取った **Public Key** と **Subscription ID**、およびユーザーのハッシュ化された、またはハッシュ化されていないメールアドレスまたは電話番号を含むオブジェクトを使用して `pbjs.setConfig` を呼び出します。

いったん設定されると、UID2 module はユーザー用の UID2 Token を生成し、それをユーザーのブラウザに保存します。このモジュールは、あなたのサイトがユーザーのブラウザで開かれている限り、必要に応じてトークンを自動的にリフレッシュします。

UID2 module は、4つの DII フォーマットのいずれかを使用して、特定のユーザー用に設定することができます:

- 正規化した、または正規化していないメールアドレス
- 正規化とハッシュ化したメールアドレス
- 正規化した電話番号
- 正規化とハッシュ化した電話番号

Notes:

- DII フォーマットはユーザーごとに異なる場合がありますが、送信できる値はユーザーごとに 1 つだけです。
- すでにハッシュ化された DII をモジュールに渡したい場合は、以下の手順に従ってください:
  1. まず正規化します。
  1. 次に、SHA-256 ハッシングアルゴリズムを使用して結果をハッシュ化します。
  1. 次に、ハッシュ値のバイトを Base64 エンコードして結果をエンコードします。

  詳細は [Normalization and Encoding](../getting-started/gs-normalization-encoding.md) を参照してください。例については、[Configuring the UID2 Module: Code Example](#configuring-the-uid2-module-code-example) を参照してください。
- UID2 module は、ハッシュ化された DII を UID2 Service に送信する前に暗号化します。
- モジュールが複数回設定された場合、最新の設定値が使用されます。

#### Configuring the UID2 Module: Code Example

以下のコードスニペットは、UID2 module を設定するさまざまな方法を示しています。

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
この例では、UID2 本番環境を使用していると仮定しています。インテグレーションテスト中は、`params.uid2ApiBase` を `'https://operator-integ.uidapi.com'` に設定して UID2 インテグレーション環境を使用してください (資格情報については [Getting Your Credentials](../getting-started/gs-credentials.md#getting-your-credentials) を参照)。UID2 インテグレーション環境からのトークンはビッドストリームに渡すために有効ではありません。インテグレーション環境では、異なる **Subscription ID** と **public key** の値があります。詳細は、[Getting Your Credentials](../getting-started/gs-credentials.md#getting-your-credentials) を参照してください。
:::

## Storing the UID2 Token in the Browser

<StoreUID2TokenInBrowser />

## When to Pass DII to the UID2 Module

UID2 module が設定されると、ユーザーのブラウザに既存の UID2 Token があるかどうかをチェックします。同じ DII から生成されたトークンがあり、まだ有効であるか、リフレッシュ可能である場合、モジュールはそれを使用し、必要に応じてリフレッシュします。

既存のトークンがないか、トークンの有効期限が切れていてリフレッシュできない場合、UID2 module は DII なしで新しいトークンを生成できません。

:::tip
各ページのロード時に、ユーザーの DII で UID2 module を構成します。これが推奨される方法です。
:::

場合によっては、ユーザーの DII はページロード時に利用できず、DII の取得には何らかの関連コストがかかることがあります。たとえば、DII を取得するために API コールが必要な場合や、DII 情報を提供するためにユーザーにプロンプトが表示される場合があります。

UID2 Token の有効期限が切れてリフレッシュできない場合は、DII で UID2 module を設定して新しいトークンを生成する必要があります。これを行うには、次の例に示すように、`pbjs.getUserIds().uid2` が返す値をチェックします:

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

ユーザーが以前に UID2 をオプトアウトしている可能性があります。この場合、UID2 module はユーザーのオプトアウトを受け入れ、Prebid.js によって UID2 Token が生成されずに収集されません。

## Checking the Integration

UID2 module が正常に UID2 Token を生成したかどうかを確認するには `pbjs.getUserIds().uid2` を呼び出します。値が返された場合、UID2 module に有効な UID2 Token が存在していることになります。

インテグレーションに問題がある場合、以下のような手順があります:

- ブラウザのコンソールログを確認してください。
- **Subscription ID** (**subscriptionId** の値) と **Public Key** (**serverPublicKey** の値) を確認してください:
  - UID2 チームから受け取った値と同一であることを確認してください。
  - 使用している環境の値が正しいことを確認してください。[environment](../getting-started/gs-environments.md) ごとに **Subscription IDID** と **Public Key** の値が異なります。[Getting Your Credentials](../getting-started/gs-credentials.md#getting-your-credentials) を参照してください。
- アカウントのセットアップ中に、サイトのドメイン名を UID2 チームに提供したことを確認してください。必要に応じて、UID2 の担当者に確認してください。
- ブラウザのデベロッパーツールを使って、UID2 Service への API コールを調べます。

その他のヘルプについては、Prebid のドキュメント [Troubleshooting Prebid.js](https://docs.prebid.org/troubleshooting/troubleshooting-guide.html) および [Debugging Prebid.js](https://docs.prebid.org/debugging/debugging.html) を参照してください。

Prebid.js の設定を検証・デバッグするツールの例として、オープンソースの Chrome 拡張機能である Professor Prebid があります:

- Chrome ウェブストアのダウンロード場所: [Professor Prebid](https://chromewebstore.google.com/detail/professor-prebid/kdnllijdimhbledmfdbljampcdphcbdc)
- prebid.org のドキュメント: [Professor Prebid User Guide](https://docs.prebid.org/tools/professor-prebid.html)

## Optional: Specifying the API Base URL to Reduce Latency

デフォルトでは、UID2 モジュールは米国の UID2 本番環境サーバーに対して呼び出しを行います。

ユースケースに最適な URL を選択する方法と、有効なベース URL の完全なリストについては、[Environments](../getting-started/gs-environments.md) を参照してください。

UID2 モジュールをデフォルト以外の UID2 サーバーに指定するには、UID2 モジュールを設定する際に、オプションの `params.uid2ApiBase` パラメータを次の例に示すように設定します:

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

## Optional: Prebid.js Integration with Google Secure Signals

Prebid.js を使用しており、Google Secure Signals を使用して UID2 Token を Google に渡す場合、追加の設定手順がいくつかあります:

- Google Ad Manager アカウントで、暗号化されたシグナルが適切にサードパーティビッダと共有されていることを確認します: [Secure Signals Sharing を許可](integration-google-ss.md#allow-secure-signals-sharing) を参照してください。
- Prebid.js の設定を更新します: [Optional: Enable Secure Signals in Prebid.js](integration-google-ss.md#optional-enable-secure-signals-in-prebidjs) を参照してください。
