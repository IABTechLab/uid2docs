---
title: UID2 Server-Side Integration Guide for Prebid.js
sidebar_label: Server-Side Integration for Prebid.js
pagination_label: UID2 Server-Side Integration for Prebid.js
description: Server-Side の Prebid.js インテグレーションの設定に関する情報。
hide_table_of_contents: false
sidebar_position: 04
---

# UID2 Server-Side Integration Guide for Prebid.js
<!-- 
This guide includes the following information:

- [Prebid.js Version](#prebidjs-version)
- [UID2 Prebid Module Page](#uid2-prebid-module-page)
- [Integration Overview: High-Level Steps](#integration-overview-high-level-steps)
- [Complete UID2 Account Setup](#complete-uid2-account-setup)
- [Add Prebid.js to Your Site](#add-prebidjs-to-your-site)
- [Configure the UID2 Module](#configure-the-uid2-module)
  - [Generating a UID2 Token on the Server](#generating-a-uid2-token-on-the-server)
  - [Client Refresh Mode](#client-refresh-mode)
    - [Client Refresh Mode Response Configuration Options](#client-refresh-mode-response-configuration-options)
    - [Client Refresh Mode Cookie Example](#client-refresh-mode-cookie-example)
    - [Configuration](#configuration)
    - [Client Refresh Mode uid2Token Example](#client-refresh-mode-uid2token-example)
  - [Server-Only Mode](#server-only-mode)
    - [Server-Only Mode Cookie Example](#server-only-mode-cookie-example)
    - [Server-Only Mode Value Example](#server-only-mode-value-example)
- [Prebid Implementation Notes and Tips](#prebid-implementation-notes-and-tips)
- [Storing the UID2 Token in the Browser](#storing-the-uid2-token-in-the-browser)
- [When to Pass a New Token to the UID2 Module](#when-to-pass-a-new-token-to-the-uid2-module)
  - [Passing a New Token: Client Refresh Mode](#passing-a-new-token-client-refresh-mode)
  - [Passing a New Token: Server-Only Mode](#passing-a-new-token-server-only-mode)
- [Determining Whether the Module Has a Valid Token](#determining-whether-the-module-has-a-valid-token)
- [Checking the Integration](#checking-the-integration)
- [Configuration Parameters for userSync](#configuration-parameters-for-usersync) 
  - [Configuration Parameter Examples: Value](#configuration-parameter-examples-value)
  - [Sample Token](#sample-token)
- [Optional: Reduce Latency by Setting the API Base URL for the Production Environment](#optional-reduce-latency-by-setting-the-api-base-url-for-the-production-environment) 
 -->

このガイドは、Server-Side で [DII](../ref-info/glossary-uid.md#gl-dii)(メールアドレスまたは電話番号) にアクセスでき、UID2 とインテグレーションして、RTB ビッドストリームで Prebid.js によって渡される [UID2 Token](../ref-info/glossary-uid.md#gl-uid2-token)(Advertising Token) を生成したいパブリッシャー向けのものです。

Prebid.js を使って UID2 とインテグレーションするには、以下のことが必要です:

- サイトの HTML と JavaScript に変更を加えます。
- トークン生成のためにサーバーサイドを変更します(オプションでトークンのリフレッシュ)。 

## Prebid.js Version
この実装には、Prebid.js version 7.53.0 以降が必要です。バージョン情報については、[https://github.com/prebid/Prebid.js/releases](https://github.com/prebid/Prebid.js/releases) を参照してください。

## UID2 Prebid Module Page
<!-- GWH TODO later: move to overview or to client side doc maybe when client-side implementation is added to the Prebid module pages. Now, they are only server side. -->
Prebid と UID2 のインテグレーション方法に関する情報は、以下の場所にもあります:
- Prebid サイトの Prebid User ID Submodule の [Unified ID 2.0](https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html) ページ。
- Prebid GitHub リポジトリの [UID2 User ID Submodule](https://github.com/prebid/Prebid.js/blob/master/modules/uid2IdSystem.md) ページ。

<!-- ## Integration Example

GWH note 12/14/23: We have client-side and server-side examples for JS SDK but only server-side for Prebid. -->

## Integration Overview: High-Level Steps

以下のステップを完了する必要があります:

1. [Complete UID2 account setup](#complete-uid2-account-setup).
2. [Add Prebid.js to your site](#add-prebidjs-to-your-site).
3. [Configure the UID2 module](#configure-the-uid2-module).

## Complete UID2 Account Setup

[Account Setup](../getting-started/gs-account-setup.md) ページに記載されている手順に従って、UID2 アカウントのセットアップを完了します。

アカウントのセットアップが完了すると、固有の API Keyと クライアントシークレットが発行されます。ここれらの値はアカウント独自のもので、安全に管理することが重要です。詳細は [API Key and Client Secret](../getting-started/gs-credentials.md#api-key-and-client-secret) を参照してください。

## Add Prebid.js to Your Site
<!-- GWH "Add Prebid.js to Your Site" section is identical for client side and server side. -->
Prebid.js をサイトに追加するには、Prebid.js ドキュメントの [Getting Started for Developers](https://docs.prebid.org/dev-docs/getting-started.html) の指示に従ってください。

Prebid.js パッケージをダウンロードするときに、**User ID Modules** セクションに記載されている **Unified ID 2.0** というモジュールの隣にあるボックスをチェックして、UID2 module を追加します。

サイトに Prebid.js を追加し、正常に動作することを確認したら、UID2 module を設定する準備が整います。

:::tip
UID2 module がインストールされていることを確認するには、[`pbjs.installedModules` array](https://docs.prebid.org/dev-docs/publisher-api-reference/installedModules.html) で文字列 `uid2IdSystem` を見つけます。
:::

## Configure the UID2 Module

UID2 Prebid モジュールを設定して、以下の2つのアクションを実行する必要があります:

| Step | Action | Link to Instructions |
| --- | --- | --- |
| 1 | Server-Side API コールを送信して UID2 Token を生成する。 | [Generating a UID2 Token on the Server](#generating-a-uid2-token-on-the-server) |
| 2 | Prebid module がトークンのリフレッシュと必要に応じてオプトアウトを管理できるように、レスポンス値を保存します。 | [Refreshing a UID2 Token](#refreshing-a-uid2-token) |

### Generating a UID2 Token on the Server

トークンを生成するには、[POST&nbsp;/token/generate](../endpoints/post-token-generate.md) エンドポイントを呼び出します。

例については、[Sample Token](#sample-token) を参照してください。

### Refreshing a UID2 Token

UID2 Token をリフレッシュするには、次の表に示すように 2 つの方法があります。

| Mode | Description | Link to Section | 
| --- | --- | --- |
| Client refresh mode | Prebid.js は内部で自動的にトークンをリフレッシュします。<br/>これは最もシンプルなアプローチです。 | [Client Refresh Mode](#client-refresh-mode) |
| Server-only mode | Prebid.js はトークンを自動的にリフレッシュしません。トークンのリフレッシュを管理するのはパブリッシャーです。<br/>このオプションを選択する理由の例:<ul><li>[UID2 SDK for JavaScript](../sdks/client-side-identity.md) を使用してトークンをリフレッシュし、Prebid.js でトークンをビッドストリームに送信したい場合。</li><li>トークンを複数の手段(Prebid.js や Google など) でビッドストリームに送信したい場合。</li></ul> | [Server-Only Mode](#server-only-mode) |

### Client Refresh Mode

該当するエンドポイントからの完全な JSON レスポンスボディを Prebid module に提供する必要があります:

- 新しい UID2 Token を取得するには、[POST&nbsp;/token/generate](../endpoints/post-token-generate.md)。
- リフレッシュされた UID2 Token については、[POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md)。

例については、[Sample Token](#sample-token) を参照してください。

Refresh Token が有効である限り、UID2 Prebid module は必要に応じて UID2 Token をリフレッシュします。

このセクションには以下の情報が含まれます:
- [Client Refresh Mode Response Configuration Options](#client-refresh-mode-response-configuration-options)
- [Client Refresh Mode Cookie Example](#client-refresh-mode-cookie-example)
- [Client Refresh Mode uid2Token Example](#client-refresh-mode-uid2token-example)
- [Passing a New Token: Client Refresh Mode](#passing-a-new-token-client-refresh-mode)

#### Client Refresh Mode Response Configuration Options

Client Refresh Mode を使用するようにモジュールを構成する場合、Prebid module にトークンを提供するための以下のオプションの **1つ** を選択する必要があります。

| Option | Details | Use Case | 
| --- | --- | --- |
| `params.uid2Cookie` に、JSON 文字列としてレスポンスボディを含むクッキーの名前を設定します。 |  [Client Refresh Mode Cookie Example](#client-refresh-mode-cookie-example) を参照してください。 | レスポンスボディを保存するのに十分なスペースがクッキーに残っていることが確実な場合のみ、このオプションを使用してください。確信が持てない場合や、クッキーの保存の必要性が異なる可能性がある場合は、他のオプションを選択してください。 |
| `params.uid2Token`をJavaScriptオブジェクトとしてレスポンスボディに設定します。 | [Client Refresh Mode uid2Token Example](#client-refresh-mode-uid2token-example) を参照してください。 | `params.uid2Token` を介してレスポンスボディを提供することもできます:<ul><li>すでに多くのデータをクッキーに保存していて、レスポンスボディを追加するとクッキーのサイズ制限を超える可能性がある場合。</li><li>Prebid module にトークン値を保存させたい場合。</li></ul> |

#### Client Refresh Mode Cookie Example

Client Refresh Mode では、Prebid.js がトークンの更新を行います。そのためには、トークンを保存するように設定する必要があります。以下の例では、Cookie と、`uid2_pub_cookie` という Cookie にトークンを保存するための設定しています。

Cookie:

```
uid2_pub_cookie={"advertising_token":"...advertising token...","refresh_token":"...refresh token...","identity_expires":1684741472161,"refresh_from":1684741425653,"refresh_expires":1684784643668,"refresh_response_key":"...response key..."}
```

Configuration:

```js
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

トークンの例については、[Sample Token](#sample-token) を参照してください。

#### Client Refresh Mode uid2Token Example

次の例は、コンフィギュレーションのサンプルを示しています。トークンの内容については、[Sample Token](#sample-token)  を参照してください。

```js
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

#### Passing a New Token: Client Refresh Mode

Refresh Token の有効期限が切れた場合は、新しい Advertising Token と新しい Refresh Token を将来のリフレッシュのために利用できるように、新しいトークンレスポンスを提供する必要があります。

新しいトークンを提供する必要があるかどうかを判断する方法については、[Determining Whether the Module Has a Valid Token](#determining-whether-the-module-has-a-valid-token) を参照してください。

### Server-Only Mode

Server-Only Mode では、Advertising Token のみがモジュールに提供されます。モジュールはトークンをリフレッシュできません。トークンをリフレッシュする方法を実装する責任があります。

Server-Only Mode を使用するようにモジュールを設定するには、以下の **1つ** を実行します:

| Implementation Method | Link to Example |
| --- | --- |
| `__uid2_advertising_token` という名前のクッキーを設定し、Advertising Token の値を格納します。 | [Server-Only Mode Cookie Example](#server-only-mode-cookie-example) |
| Advertising Token を含む ID ブロックに `value` を設定します。 | [Server-Only Mode Value Example](#server-only-mode-value-example) |

このセクションには以下の情報が含まれます:
- [Server-Only Mode Cookie Example](#server-only-mode-cookie-example)
- [Server-Only Mode Value Example](#server-only-mode-value-example)
- [Passing a New Token: Server-Only Mode](#passing-a-new-token-server-only-mode)

#### Server-Only Mode Cookie Example

以下の例では、Advertising Token の値を `__uid2_advertising_token` という名前のクッキーに格納しています。この設定により、UID2 module がクッキーから Advertising Token の値を取得できるようになります。

Cookie:

```js
__uid2_advertising_token=...advertising token...
```

Configuration:

```js
pbjs.setConfig({
    userSync: {
        userIds: [{
            name: 'uid2'
        }]
    }
});
```

#### Server-Only Mode Value Example

次の例では、`value` フィールドをクッキーに保存せずに、Advertising Token を含む ID ブロックに設定しています。

```js
pbjs.setConfig({
    userSync: {
        userIds: [{
            name: 'uid2'
            value: {
                'uid2': {
                    'id': '...advertising token...'
                }
            }
        }]
    }
});
```

#### Passing a New Token: Server-Only Mode

Server-Only Mode では、Prebid.js UID2 module は Advertising Token のみを受け取るため、トークンは短時間しか有効ではありません。このため、各ページのロード時に Advertising Token を提供するのが最善です。

必要であれば、新しいトークンを提供する必要があるかどうかを判断するために、[Determining Whether the Module Has a Valid Token](#determining-whether-the-module-has-a-valid-token) を参照してください。

## Prebid Implementation Notes and Tips

Prebid の実施を計画する際には、以下を考慮してください:

- モジュールは提供されたオリジナルのトークンを保存し、必要に応じてリフレッシュし、リフレッシュされたトークンを使用します。期限切れの ID を提供し、モジュールが同じ ID をリフレッシュした有効な更新を持っている場合、モジュールは提供した期限切れの ID の代わりにリフレッシュされた ID を使用します。

- リフレッシュされたトークンを生成するために使用された元のトークンと一致しない新しいトークンを提供した場合、モジュールは保存されているすべてのトークンを破棄し、代わりに新しいトークンを使用し、リフレッシュされた状態を維持します。

- インテグレーションテストでは、`params.uid2ApiBase` を `"https://operator-integ.uidapi.com"` に設定します。この値は、トークンを生成する環境と同じ環境 (本番環境またはテスト環境) に設定しなければなりません。

## Storing the UID2 Token in the Browser
<!-- GWH same section in integration-prebid.md, integration-prebid-client-side.md, and integration-prebid-client-side.md. Ensure consistency -->
デフォルトでは、UID2 module はローカルストレージを使ってデータを保存します。代わりにクッキーを使用するには、以下の例に示すように `params.storage` を `cookie` に設定します。

詳細は Prebid ドキュメントの [Unified ID 2.0 Configuration](https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html#unified-id-20-configuration) を参照してください。

```js
pbjs.setConfig({ 
  userSync: { 
    userIds: [{ 
      name: 'uid2', 
      params: { 
        // default value is 'localStorage' 
        storage: 'cookie'    
      } 
    }] 
  } 
}); 
```

クッキーのサイズが大きくなり、問題が発生する可能性があります。ただし、ローカルストレージがオプションでない場合、これが考えられるアプローチの 1 つです。

## Determining Whether the Module Has a Valid Token

Prebid.js module が有効なトークンを持っているか、新しいトークンを提供する必要があるかを判断するためにチェックを行うことができます。

これを行うには、次の例に示すように、`pbjs.getUserIds().uid2` が返す値をチェックします:

```js
if (!pbjs.getUserIds().uid2) {
  // There is no token that can be used or refreshed.
  // Configure the UID2 module with a new token
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
}
```

:::caution
 `setConfig`(または同様の関数) を 2 回呼び出してユーザー ID を設定した場合、User ID Submodule の ID 値を再初期化するために、`refreshUserIds` を呼び出す必要があります。
:::

## Checking the Integration

UID2 Module に有効な UID2 Token があるかどうかを確認するには、 `pbjs.getUserIds().uid2` を呼び出します。値が返された場合、UID2 Module に有効な UID2 Token が存在します。

インテグレーションに問題がある場合、以下のような手順があります:

- ブラウザのコンソールログを確認してください。
- ブラウザのデベロッパーツールを使って、UID2 Service への API コールを調べます。

その他のヘルプについては、Prebidのドキュメント [Troubleshooting Prebid.js](https://docs.prebid.org/troubleshooting/troubleshooting-guide.html) and [Debugging Prebid.js](https://docs.prebid.org/debugging/debugging.html) を参照してください。

Prebid.js の設定を検証・デバッグするツールの例として、オープンソースの Chrome 拡張機能である Professor Prebid があります:

- Chrome ウェブストアのダウンロード場所: [Professor Prebid](https://chromewebstore.google.com/detail/professor-prebid/kdnllijdimhbledmfdbljampcdphcbdc)
- prebid.org のドキュメント: [Professor Prebid User Guide](https://docs.prebid.org/tools/professor-prebid.html)

## Configuration Parameters for userSync

以下のパラメータは、UID2 Prebid User ID Module のインテグレーションにのみ適用されます。

この表では、CR = client refresh mode, SO = server-only mode, and N/A = 該当なし。

| Param under userSync.userIds[] | Mode/Scope | Type | Description | Example |
| --- | --- | --- | --- | --- |
| name | CR: 必須<br/>SO:&nbsp;必須 | String | UID2 module の ID 値。常に `"uid2"`。 | `"uid2"` |
| value | CR: N/A<br/>SO: オプション | Object | Advertising Token の値を含むオブジェクト。 | [Configuration Parameter Examples: Value](#configuration-parameter-examples-value) を参照してください。 |
| params.uid2Token | CR: Optional<br/>SO: N/A | Object | 最初の UID2 Token。これは `/token/generate` または `/token/refresh` エンドポイントをコールした際に復号されたレスポンスの `body` 要素でなければなりません。 | [Sample Token](#sample-token) を参照してください。 |
| params.uid2Cookie | CR: オプション<br/>SO: N/A  | String | サーバが設定した UID2 Token を保持するクッキーの名前。クッキーは uid2Token パラメータと同じ形式の JSON を含む必要があります。`uid2Token` を指定した場合、このパラメータは無視されます。 | [Sample Token](#sample-token) を参照してください。 |
| params.uid2ApiBase | CR: オプション<br/>SO: オプション | String | デフォルトの UID2 API エンドポイントを上書きします。有効な値については、[Environments](../getting-started/gs-environments.md) を参照してください。 | `"https://prod.uidapi.com"` (デフォルト)|
| params.storage | CR: オプション<br/>SO: オプション | String | モジュール内部の保存方法を指定します: `cookie` または `localStorage`。このパラメータは指定しないことを推奨します。代わりに、モジュールがデフォルトを使用するようにします。 | `"localStorage"` (デフォルト) |

### Configuration Parameter Examples: Value

以下のコードスニペットは、`value` UID2 設定パラメータの例を示しています。

```js
pbjs.setConfig({
    userSync: {
        userIds: [{
            name: 'uid2'
            value: {
                'uid2': {
                    'id': '...advertising token...'
                }
            }
        }]
    }
});
```

### Sample Token

以下のサンプルは架空のものですが、[POST&nbsp;/token/generate](../endpoints/post-token-generate.md) または [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) エンドポイントから返されるトークンレスポンスオブジェクトがどのように見えるかを示しています:

```js
{
  "advertising_token": "...",
  "refresh_token": "...",
  "identity_expires": 1633643601000,
  "refresh_from": 1633643001000,
  "refresh_expires": 1636322000000,
  "refresh_response_key": "wR5t6HKMfJ2r4J7fEGX9Gw=="
}
```

## Optional: Reduce Latency by Setting the API Base URL for the Production Environment
<!-- GWH "Optional: Reduce Latency by Setting the API Base URL for the Production Environment" section is identical for client side and server side. -->
デフォルトでは、UID2 module はアメリカにある UID2 サーバーに API コールを行います。ユーザーの居住地によっては、レイテンシー(遅延時間) を短縮するために、ユーザーに近いサーバーを選択することを検討してください。

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
