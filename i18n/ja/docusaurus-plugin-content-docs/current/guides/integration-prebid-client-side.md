---
title: UID2 Client-Side Integration Guide for Prebid.js
sidebar_label: Client-Side Integration for Prebid.js
pagination_label: UID2 Client-Side Integration for Prebid.js
description: Client-Side の Prebid.js インテグレーションの設定に関する情報。
hide_table_of_contents: false
sidebar_position: 04
---

import Link from '@docusaurus/Link';
import AddPrebidjsToYourSite from '/docs/snippets/_prebid-add-prebidjs-to-your-site.mdx';
import StoreUID2TokenInBrowser from '/docs/snippets/_prebid-storing-uid2-token-in-browser.mdx';

# UID2 Client-Side Integration Guide for Prebid.js

このガイドは、Client-Side で <Link href="../ref-info/glossary-uid#gl-dii">DII</Link>(メールアドレスまたは電話番号) にアクセスでき、UID2 とインテグレーションして、RTB <Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>で Prebid.js によって渡される <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link>(Advertising Token) を生成したいパブリッシャー向けのものです。

Prebid.js を使って UID2 とインテグレーションするには、サイトの HTML と JavaScript を変更する必要があります。このガイドに従えば、Server-Side の作業は必要ありません。

## Prebid.js Version

この実装には Prebid.js version 8.21.0 以降が必要です。バージョン情報については、[https://github.com/prebid/Prebid.js/releases](https://github.com/prebid/Prebid.js/releases) を参照してください。

以前のバージョンの Prebid.js を使用する必要がある場合は、代わりに [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md) で説明している実装ソリューションを使用してください。

## Integration Example

UID2 Prebid.js Client-Side インテグレーション例は、以下のリンクから入手できます:

- コード: [Example Prebid.js UID2 Integration](https://github.com/IABTechLab/uid2docs/tree/main/static/examples/cstg-prebid-example)
- ランニングサイト: [UID2 Prebid.js Client-Side Integration Example](https://unifiedid.com/examples/cstg-prebid-example/)

## Integration Overview: High-Level Steps

以下のステップを完了する必要があります:

1. [Complete UID2 account setup](#complete-uid2-account-setup).
2. [Add Prebid.js to your site](#add-prebidjs-to-your-site).
3. [Configure the UID2 module](#configure-the-uid2-module).


### Complete UID2 Account Setup

[Account Setup](../getting-started/gs-account-setup.md) ページに記載されている手順に従って、UID2 アカウントのセットアップを完了します。Client-Side 実装のアカウント設定プロセスの一環として、Prebid.js で使用するサイトのドメイン名のリストを提供する必要があります。

:::tip
アカウント設定に必要なのは、ルートレベルのドメインだけです。たとえば、Prebid.js で UID2 を example.com、shop.example.com、example.org で使用する場合、ドメイン名 example.com と example.org だけを指定します。
:::

アカウントのセットアップが完了すると、公開鍵(Public Key) とサブスクリプション ID(Subscription ID) が発行されます。これらの値はアカウント独自のもので、UID2 module を設定するために使います。詳細については、[Subscription ID and Public Key](../getting-started/gs-credentials.md#subscription-id-and-public-key) を参照してください。

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

  詳細については、[Normalization and Encoding](../getting-started/gs-normalization-encoding.md) を参照してください。例については、[Configuring the UID2 Module: Code Example](#configuring-the-uid2-module-code-example) を参照してください。
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
この例では、UID2 本番環境を使用することを想定しています。インテグレーションテストでは、`params.uid2ApiBase` を `'https://operator-integ.uidapi.com'` に設定して UID2 インテグレーション環境を使用します。UID2 インテグレーション環境のトークンはビッドストリームに渡すには無効です。インテグレーション環境では、**Subscription ID** と **public key** の値が異なります。
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

## Checking the Integration

UID2 module が正常に UID2 Token を生成したかどうかを確認するには `pbjs.getUserIds().uid2` を呼び出します。値が返された場合、UID2 module に有効な UID2 Token が存在していることになります。

インテグレーションに問題がある場合、以下のような手順があります:

- ブラウザのコンソールログを確認してください。
- **Subscription ID** と **Public Key** の値を確認してください:
  - UID2 チームから受け取った値と同一であることを確認してください。
  - 使用している環境の値が正しいことを確認してください。[environment](../getting-started/gs-environments.md) ごとに **Subscription IDID** と **Public Key** の値が異なります。
- アカウントのセットアップ中に、サイトのドメイン名を UID2 チームに提供したことを確認してください。必要に応じて、UID2 の担当者に確認してください。
- ブラウザのデベロッパーツールを使って、UID2 Service への API コールを調べます。

その他のヘルプについては、Prebid のドキュメント [Troubleshooting Prebid.js](https://docs.prebid.org/troubleshooting/troubleshooting-guide.html) および [Debugging Prebid.js](https://docs.prebid.org/debugging/debugging.html) を参照してください。

Prebid.js の設定を検証・デバッグするツールの例として、オープンソースの Chrome 拡張機能である Professor Prebid があります:

- Chrome ウェブストアのダウンロード場所: [Professor Prebid](https://chromewebstore.google.com/detail/professor-prebid/kdnllijdimhbledmfdbljampcdphcbdc)
- prebid.org のドキュメント: [Professor Prebid User Guide](https://docs.prebid.org/tools/professor-prebid.html)

## Optional: Specifying the API Base URL to Reduce Latency

デフォルトでは、UID2 module はアメリカにある UID2 本番環境サーバーに API コールを行います。ユーザーの居住地によっては、レイテンシー(遅延時間) を短縮するために、ユーザーに近いサーバーを選択することを検討してください。

UID2 module を設定するときに別の UID2 サーバーを指定するには、次の例に示すように、オプションの `params.uid2ApiBase` パラメータを設定します:

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

Base URL のリストは、[Environments](../getting-started/gs-environments.md) を参照してください。
