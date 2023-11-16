---
title: Prebid.js Express Integration
sidebar_label: Prebid.js Express Integration
pagination_label: Prebid.js Express Integration
description: UID2 の実装として Prebid.js とインテグレーションするための情報。
hide_table_of_contents: false
sidebar_position: 04
---

# Prebid.js Express Integration Guide

このガイドは、UID2 とインテグレーションし、RTB ビッドストリームで Prebid.js から渡される [UID2 Token](../ref-info/glossary-uid.md#gl-uid2-token)(Advertising Token) を生成したいパブリッシャー向けのものです。

このガイドは、[Private Operator](../ref-info/glossary-uid.md#gl-private-operator) を使用したいパブリッシャーや、Server-Side でトークンを生成したいパブリッシャーには適用されません。
そのようなパブリッシャーは、[Prebid.js Advanced Integration Guide](./integration-prebid-advanced.md) に従ってください。

UID2 は以下の機能を持つ [Prebid.js module](https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html) を提供しています:

- UID2 Token 生成
- UID2 Token の自動更新
- UID2 Token のブラウザへの自動保存
- ビッドストリームに UID2 Token を自動的に渡す

Prebid.js を使って UID2 とインテグレーションするには、サイトの HTML と JavaScript を変更する必要があります。このガイドに従えば、Server-Side の作業は必要ありません。サーバーサイドの API コールでトークンを生成したい場合や、Private Operator を使用している場合は、[Prebid.js Advanced Integration Guide](./integration-prebid-advanced.md) に従ってください。

以下のステップを完了する必要があります:

1. [Complete UID2 account setup](#complete-uid2-account-setup)
2. [Add Prebid.js to your site](#add-prebidjs-to-your-site)
3. [Configure the UID2 module](#configure-the-uid2-module)

アプリケーションの例については、UID2 Prebid.js の例を参照してください:
- Code: [UID2 Prebid.js code on GitHub](https://github.com/IABTechLab/uid2docs/tree/main/static/examples/cstg-prebid-example)
- 実行中のサイト: [UID2 Prebid.js example](https://unifiedid.com/examples/cstg-prebid-example/)

## Prebid.js Version

この実装には Prebid.js の version 8.21.0 以降が必要です。バージョン情報については、[https://github.com/prebid/Prebid.js/releases](https://github.com/prebid/Prebid.js/releases) を参照してください。

## Complete UID2 Account Setup

[Account Setup](../getting-started/gs-account-setup.md) ページに記載されている手順に従って、UID2 アカウントのセットアップを完了してください。アカウント設定プロセスの一環として、Prebid.js で使用するサイトのドメイン名のリストを提供する必要があります。

アカウントのセットアップが完了すると、**public key** と **subscription ID** が発行されます。これらの値はあなただけのもので、UID2モジュールの設定に使用されます。

:::tip
アカウント設定に必要なのは、ルートレベルのドメインだけです。たとえば、Prebid.js で UID2 を example.com、shop.example.com、example.orgで使用する場合、ドメイン名 example.com と example.org を指定するだけです。
:::

## Add Prebid.js to Your Site

サイトに Prebid.js を追加するには、[Prebid.jsdocumentation](https://docs.prebid.org/dev-docs/getting-started.html) に従ってください。Prebid.js の version は 8.21.0 以降を使用してください。

Prebid.js パッケージをダウンロードしたら、**User ID Modules** セクションに記載されている **Unified ID 2.0** というモジュールの隣にあるボックスをチェックして、UID2 モジュールを追加します。

サイトに Prebid.js を追加し、正常に動作することを確認したら、UID2 モジュールを設定する準備ができました。

:::tip
UID2 モジュールがインストールされていることを確認するには、[`pbjs.installedModules` array](https://docs.prebid.org/dev-docs/publisher-api-reference/installedModules.html) で文字列 `uid2IdSystem` を見つける。
:::

## Configure the UID2 Module

UID2 モジュールを設定するには、アカウント設定時に受け取った **public key** と **subscription ID**、およびユーザーのハッシュ化されたまたはハッシュ化されていない [DII](../ref-info/glossary-uid.md#gl-dii)(メールアドレスまたは電話番号) を含むオブジェクトを指定して、`pbjs.setConfig` を呼び出します。

設定が行われると、UID2 モジュールはユーザー用の UID2 Token を生成し、ユーザーのブラウザに保存します。このモジュールは、ユーザーのブラウザでサイトが開いている間、必要に応じてトークンを自動的にリフレッシュします。

ユーザーの DII を UID2 モジュールに渡すには、ハッシュ化することもハッシュ化しないこともできます。DII をハッシュせずに渡すと、UID 2モジュールが代わりにハッシュします。DII をすでにハッシュ化してモジュールに渡したい場合は、ハッシュ化する前に正規化する必要があります。詳細については、[Normalization and Encoding](../getting-started/gs-normalization-encoding.md) を参照してください。

UID2 モジュールは、UID2 Service に送信する前に、ハッシュ化された DII を暗号化します。

特定のユーザーに対して、4 つの DII フォーマットのいずれかを送信するようにモジュールを設定できます。DII フォーマットはユーザーごとに異なる場合がありますが、送信できる値はユーザーごとに 1 つだけです。

以下のセクションでは、UID2 モジュールを構成するさまざまな方法を示し、モジュールに渡される DII の要件を示します:

- [Configure for Email Address](#configure-for-email-address)
- [Configure for Hashed Email Address](#configure-for-hashed-email-address)
- [Configure for Phone Number](#configure-for-phone-number)
- [Configure for Hashed Phone Number](#configure-for-hashed-phone-number)

モジュールが複数回設定された場合、最新の設定値が使用されます。

:::note
例では、UID2 本番環境を使用することを想定しています。インテグレーションテストの際には、`params.uid2ApiBase` を `"https://operator-integ.uidapi.com"` に設定して、UID2 テスト環境を使用します。UID2 テスト環境のトークンはビッドストリームに渡しても無効です。テスト環境は、**subscription ID** と **public key** の値が異なります。
:::

### Configure for Email Address

UID2 モジュールにメールアドレスを設定します:

```js
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'uid2',
      params: {
        serverPublicKey: publicKey,
        subscriptionId: subscriptionId,
        email: 'user@example.com',
      }
    }]
  }
});
```

パブリッシャーによる正規化やハッシュ化は必要ありません。

UID2 モジュールは、暗号化されたハッシュを UID2 Service に送信する前に、メールアドレスを正規化し、ハッシュ化します。

### Configure for Hashed Email Address

ハッシュ化したメールアドレスで UID2 モジュールを設定します:

```js
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'uid2',
      params: {
        serverPublicKey: publicKey,
        subscriptionId: subscriptionId,
        emailHash: 'eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=',
      }
    }]
  }
});
```

**パブリッシャーがメールアドレスの正規化とハッシュ化を行う必要があります**。詳細は、[Normalization and Encoding](../getting-started/gs-normalization-encoding.md) を参照してください。

UID2 モジュールに電話番号を設定します:

### Configure for Phone Number

Configure the UID2 module with a phone number:

```js
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'uid2',
      params: {
        serverPublicKey: publicKey,
        subscriptionId: subscriptionId,
        phone: '+1111111111',
      }
    }]
  }
});
```

**パブリッシャーが電話番号の正規化を行う必要があります**。詳細は、[Normalization and Encoding](../getting-started/gs-normalization-encoding.md) を参照してください。

UID2モジュールは、暗号化されたハッシュを UID2 Service に送信する前に、電話番号をハッシュ化します。

### Configure for Hashed Phone Number

Configure the UID2 module with a hashed phone number:

```js
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'uid2',
      params: {
        serverPublicKey: publicKey,
        subscriptionId: subscriptionId,
        phoneHash: 'eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=',
      }
    }]
  }
});
```

**パブリッシャーが電話番号の正規化とハッシュ化を行う必要があります**。詳細は、[Normalization and Encoding](../getting-started/gs-normalization-encoding.md) を参照してください。

UID2 モジュールは、UID2 Service に送信する前にハッシュを暗号化します。

## Module Storage

デフォルトでは、UID2 モジュールはローカルストレージを使ってデータを保存します。代わりにクッキーを使用するには、`params.storage` を `cookie` に設定します。詳細については、Prebid [Unified ID 2.0 Configuration](https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html#unified-id-20-configuration) モジュールのドキュメントを参照してください。

## When to Pass DII to the UID2 Module

可能であれば、各ページのロード時に、ユーザーの DII で UID2 モジュールを設定します。

UID2 モジュールが設定されると、ユーザーのブラウザに既存の UID2 Token があるかどうかをチェックします。同じ DII から生成された既存のトークンがあり、そのトークンがまだ有効であるか、リフレッシュできる場合、モジュールは新しいトークンを生成する代わりに、既存のトークンを使用するか、リフレッシュします。

既存のトークンがないか、トークンの有効期限が切れていてリフレッシュできない場合、UID2 モジュールは DII がなければ新しいトークンを生成できません。

結果として、推奨されるアプローチは、各ページロード時にユーザーの DII で UID2 モジュールを構成することです。

ユーザーの DII はページロード時に利用できず、DII の取得には何らかの関連コストがかかる場合があります。たとえば、DII を取得するために API コールが必要な場合や、DII 情報を提供するためにユーザーにプロンプトが表示される場合などです。

使用・更新できる既存のトークンをチェックすることで、そのコストを回避できる可能性があります。これを行うには、`pbjs.getUserIds().uid2` が返す値をチェックします:

```js
const params = {};

if (!pbjs.getUserIds().uid2) {
  // There is no token that can be used or refreshed.
  // The UID2 module must be configured with DII in order to generate a new token.
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

UID2 モジュールが正常に UID2 Token を生成したかどうかを確認するには、 `pbjs.getUserIds().uid2` を呼び出します。値が返された場合、トークンは正常に生成されたことになります。

インテグレーションに問題がある場合、次のような手順があります:

- ブラウザのコンソールログを確認してください。
- 正しい **subscription ID** と **public key** を使用しているか確認します。
- アカウントのセットアップ時に、サイトのドメイン名が UID2 に提供されていることを確認します。
- ブラウザの開発者ツールを使用して、UID2 Service への API コールを調査します。
ervice.

その他のヘルプについては、Prebid のドキュメント [Troubleshooting Prebid.js](https://docs.prebid.org/troubleshooting/troubleshooting-guide.html) および [Debugging Prebid.js](https://docs.prebid.org/debugging/debugging.html) を参照してください。

## Optional: Reduce Latency by Setting the API Base URL

デフォルトでは、UID2 モジュールはアメリカにある UID2 サーバーに API コールを行います。ユーザーの居住地によっては、待ち時間を短縮するために、ユーザーに近いサーバーを選択することを検討してください。

UID2 モジュールを設定する際に別の UID2 サーバーを指定するには、次の例に示すように、オプションの `params.uid2ApiBase` パラメータを設定します:

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

base URL のリストは、[Environments](../getting-started/gs-environments.md) を参照してください。