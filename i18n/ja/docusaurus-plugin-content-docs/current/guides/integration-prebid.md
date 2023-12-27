---
title: UID2 Integration Overview for Prebid.js
sidebar_label: UID2 Integration Overview for Prebid.js
pagination_label: UID2 Integration Overview for Prebid.js
description: UID2 実装の一部として Prebid.js とインテグレーションするためのオプションの概要。
hide_table_of_contents: false
sidebar_position: 04
---

# UID2 Integration Overview for Prebid.js

このガイドは、UID2 とインテグレーションし、RTB ビッドストリームで Prebid.js によって渡される [UID2 Token](../ref-info/glossary-uid.md#gl-uid2-token)(Advertising Token) を生成したいパブリッシャー向けのインテグレーションオプションの概要です。
<!-- 
It includes the following sections:

- [Introduction](#introduction)
- [UID2 User ID Submodule](#uid2-user-id-submodule)
- [Generating the UID2 Token](#generating-the-uid2-token)
- [Refreshing the UID2 Token](#refreshing-the-uid2-token)
- [Storing the UID2 Token in the Browser](#storing-the-uid2-token-in-the-browser)
- [Passing the UID2 Token to the Bid Stream](#passing-the-uid2-token-to-the-bid-stream)
- [Integration Overview: High-Level Steps](#integration-overview-high-level-steps)

 -->
## Introduction

UID2 は、以下をサポートする Prebid.js module を提供しています:

- [Generating the UID2 token](#generating-the-uid2-token)
- [Refreshing the UID2 token](#refreshing-the-uid2-token)
- [Storing the UID2 token in the browser](#storing-the-uid2-token-in-the-browser)
- [Passing the UID2 token to the bid stream](#passing-the-uid2-token-to-the-bid-stream)

さらに柔軟性を高めるため、UID2 は JavaScript SDK など、一部の機能や補完的なプロダクトの代替手段も提供しています。

## UID2 User ID Submodule

Prebid UID2 Module は、UID2 Token の保存、提供、およびオプションのリフレッシュを処理します。

:::caution
UID2 は GDPR が適用される場所では使用しないように設計されています。このモジュールは渡された同意データをチェックし、`gdprApplies` フラグが `true` に設定されている場合は動作しません。
:::

## Generating the UID2 Token

DII へのアクセスに応じて、Prebid.js で使用する UID2 Token を生成する方法は以下の表のように 2 種類あります 。

どの方法が最適かを判断し、該当するインテグレーションガイドに従ってください。

| Scenario | Integration Guide |
| :--- | :--- |
| Client-Side で DII にアクセスでき、フロントエンドの開発のみを行いたい。 | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| Server-Side で DII にアクセスし、Server-Side の開発ができる。 | [UID2 Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md) |

## Refreshing the UID2 Token

Prebid.js UID2 Module は、UID2 Token を自動的にリフレッシュすることができます。Prebid.js の外部で手動リフレッシュを実装したい場合は、Server-Side インテグレーションガイドの [Refreshing a UID2 Token](integration-prebid-server-side.md#refreshing-a-uid2-token) を参照してください。Client-Side のインテグレーションソリューションには、トークンの自動リフレッシュが含まれています。

## Storing the UID2 Token in the Browser
<!-- GWH same section in integration-prebid.md, integration-prebid-client-side.md, and integration-prebid-client-side.md. Ensure consistency -->
デフォルトでは、UID2 module はローカルストレージを使ってデータを保存します。代わりにクッキーを使用するには、以下の例に示すように `params.storage` を `cookie` に設定します。

詳細は、Prebid ドキュメントの [Unified ID 2.0 Configuration](https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html#unified-id-20-configuration) を参照してください。

```js
pbjs.setConfig({ 
  userSync: { 
    userIds: [{ 
      name: 'uid2', 
      params: { 

                 //default value is ‘localStorage’ 
        storage: ‘cookie’  
      } 
    }] 
  } 
}); 
```

クッキーのサイズが大きくなり、問題が発生する可能性があります。ただし、ローカルストレージがオプションでない場合、これが考えられるアプローチの 1 つです。

## Passing the UID2 Token to the Bid Stream

UID2 module を設定するには、 `pbjs.setConfig` を呼び出します。サポートされているパラメータの詳細については、実装に適用されるガイドを参照してください:

- [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md)
- [UID2 Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md)

UID2 module が設定されると、ユーザーの UID2 Token を管理し、ユーザーのブラウザに保存します。

Client-Side または Server-Side でクライアントリフレッシュモードを使用してトークンを生成する場合、ユーザーのブラウザでサイトが開いている間は、モジュールが自動的にトークンをリフレッシュします。しかし、Server-Side でトークンのリフレッシュを管理するオプションもあります。詳細については、Server-Side インテグレーションガイドの [Refreshing a UID2 Token](integration-prebid-server-side.md#refreshing-a-uid2-token) を参照してください。Client-Side のインテグレーションソリューションには、トークンの自動リフレッシュが含まれています。

## Integration Overview: High-Level Steps

Prebid.js を使ってサイトを UID2 とインテグレーションするには、以下のステップを完了する必要があります:

1. UID2 アカウントのセットアップを完了します。
1. Prebid.js をサイトに追加します。
1. UID2 module を設定します。

詳細な手順については、以下のインテグレーションガイドのいずれかを参照してください:

- [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md)
- [UID2 Server-Side Integration Guide for Prebid.js](integration-prebid-server-side.md)
