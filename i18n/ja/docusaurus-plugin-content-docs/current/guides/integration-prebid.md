---
title: Prebid Integration
description: UID2 実装のため、Prebid とのインテグレーションに関する情報。
hide_table_of_contents: false
sidebar_position: 04
---

# Prebid Integration Guide

このガイドは、UID2 と直接インテグレーションし、RTB ビッドストリームで Prebid から渡される ID トークン を生成したいパブリッシャー向けのものです。
UID2 との直接インテグレーションを行い、ヘッダービディングに Prebid を使用する場合に考慮すべき基本的なステップの概要を説明します。

## Introduction

ヘッダービディングに Prebid を使用しているパブリッシャーの場合、Prebid ヘッダービディング実装が UID2 もサポートできるように、いくつかの追加ステップがあります。

まだ UID2 account を持っていない場合は、UID2 account をセットアップする必要があります: [Account Setup](../getting-started/gs-account-setup.md)　を参照してください。

## UID2 Prebid Module Page

Prebid と UID2 のインテグレーション方法の詳細については、Prebid サイトの [Unified ID 2.0 Prebid User ID module](https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html) を参照してください。必ずすべての手順に従ってください。

## UID2 User ID Submodule

UID2 では、サーバーサイドで初期トークンを生成する必要があります。UID2 モジュールは、トークンの保存、提供、およびオプションのリフレッシュを処理します。このモジュールは Client Refresh モードで動作します。

>**Important:** UID2 は GDPR が適用される場所で使用できないように設計されています。このモジュールは渡された同意データをチェックし、`gdprApplies` フラグが `true` に設定されている場合は動作しません。

## Client Refresh Mode

Client Refresh モードでは、UID2 [POST /token/generate](../endpoints/post-token-generate.md) または [POST /token/refresh](../endpoints/post-token-refresh.md) エンドポイントからの完全なレスポンスボディをモジュールに提供する必要があります。Refresh Token が有効である限り、モジュールは必要に応じて UID2 Token (Advertising Token) をリフレッシュします。

Client Refresh モードを使用するようにモジュールを設定するには、以下の **どちらか** を実行する必要があります:
- `params.uid2Cookie` に、レスポンスボディを JSON 文字列として含むクッキーの名前を設定します。[Client Refresh Cookie Example](#client-refresh-cookie-example) を参照してください。

- レスポンス本文に `params.uid2Token` を JavaScript オブジェクトとして設定します。[Client Refresh uid2Token Example](#client-refresh-uid2token-example) を参照してください。

### Client Refresh Cookie Example

この例では、Cookie は `uid2_pub_cookie` です。

#### Cookie
```
uid2_pub_cookie={"advertising_token":"...advertising token...","refresh_token":"...refresh token...","identity_expires":1684741472161,"refresh_from":1684741425653,"refresh_expires":1684784643668,"refresh_response_key":"...response key..."}
```

#### Configuration

```javascript
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'uid2',
      params: {
        uid2Cookie: 'uid2_pub_cookie'
      }
    }]
  }
});
```

### Client Refresh uid2Token Example

次の例は、コンフィギュレーションのサンプルを示しています。トークンの内容については、[Sample Token](#sample-token) を参照してください。

```javascript
pbjs.setConfig({
  userSync: {
    userIds: [{
      name: 'uid2',
      params: {
        uid2Token: {
          'advertising_token': '...advertising token...',
          'refresh_token': '...refresh token...',
          // etc. - see the sample token for contents of this object
        }
      }
    }]
  }
});
```

## Storage of Internal Values

UID2 Prebid モジュールは、いくつかの内部値を保存します。デフォルトでは、すべての値は HTML5 のローカルストレージに保存されます。必要に応じて、`params.storage` を `cookie` に設定することで、Cookie ストレージに切り替えることができます。Cookie のサイズが大きくなる可能性があるため、この解決策は推奨しませんが、ローカルストレージが選択できない場合には可能な解決策です。

## Sample Token

以下のサンプルは架空のものですが、トークンレスポンスオブジェクトがどのように見えるかを示しています:

```javascript
{
  "advertising_token": "...",
  "refresh_token": "...",
  "identity_expires": 1633643601000,
  "refresh_from": 1633643001000,
  "refresh_expires": 1636322000000,
  "refresh_response_key": "wR5t6HKMfJ2r4J7fEGX9Gw=="
}
```

## Prebid Implementation Notes and Tips

Prebid の実装を計画する際には、以下を考慮してください:

- Cookie のサイズを制限しようとしている場合、コンフィギュレーションでトークンを提供し、ローカルストレージのデフォルトオプションを使用します。

- 期限切れの Identity を提供し、モジュールが提供した Identity からリフレッシュされた有効な Identity を持っている場合、モジュールはリフレッシュされた Identity を使用します。モジュールはトークンのリフレッシュに使用した元のトークンを保存し、元のトークンが提供したトークンと一致する限り、リフレッシュされたトークンを使用します。

- リフレッシュされたトークンを生成するために使用された元のトークンと一致しない新しいトークンを提供した場合、保存されたトークンはすべて破棄され、代わりに新しいトークンが使用されます（必要に応じてリフレッシュされます）。

- インテグレーションテストの際には、`params.uid2ApiBase` を `"https://operator-integ.uidapi.com"` に設定することができます。トークンの生成に使用する環境と同じ環境 (本番環境またはテスト環境) を使用しなければならないことに注意してください。

## Configuration Parameters for `usersync`

以下のパラメータは、UID2 Prebid User ID モジュールインテグレーションにのみ適用されます。

| Param under userSync.userIds[] | Scope | Type | Description | Example |
| --- | --- | --- | --- | --- |
| name | 必須 | String | UID2 モジュールの ID 値 - `"uid2"` | `"uid2"` |
| value | オプション, server only | Object | Advertising Token の値を含むオブジェクト。 | [Sample Token](#sample-token) を参照してください。 |
| params.uid2Token  | オプション, client refresh | Object | 初期 UID2 Token。これは `/token/generate` または `/token/refresh` エンドポイントをコールした際に復号されたレスポンスの `body` 要素でなければなりません。 | [Sample Token](#sample-token) を参照してください。 |
| params.uid2Cookie | オプション, client refresh | String | サーバが設定した UID2 Token を保持する Cookie の名前。この Cookie は uid2Token パラメータと同じ形式の JSON 出なければなりません。**uid2Token を指定した場合、このパラメータは無視されます。** | [Sample Token](#sample-token) を参照してください。  |
| params.uid2ApiBase | オプション, client refresh | String | デフォルトの UID2 API エンドポイントをオーバーライドします。 | `"https://prod.uidapi.com"` (デフォルト) |
| params.storage | オプション, client refresh | String | モジュール内部の保存方法を指定します: `cookie` または `localStorage`。このパラメータは指定しないことを推奨します。代わりに、モジュールがデフォルトを使用するようにします。 | `localStorage` (デフォルト) |

<!-- eng_jp -->
