---
title: UID2 Client-Server Integration Guide for Prebid.js
sidebar_label: Client-Server Integration for Prebid.js
pagination_label: UID2 Client-Server Integration for Prebid.js
description: Information about setting up a client-server Prebid.js integration.
description: Client-Server での Prebid.js インテグレーションの設定に関する情報。
hide_table_of_contents: false
sidebar_position: 04
---

import Link from '@docusaurus/Link';
import AddPrebidjsToYourSite from '../snippets/_prebid-add-prebidjs-to-your-site.mdx';
import StoreUID2TokenInBrowser from '../snippets/_prebid-storing-uid2-token-in-browser.mdx';
import IntegratingWithSSO from '../snippets/_integrating-with-sso.mdx';

# UID2 Client-Server Integration Guide for Prebid.js

このガイドは、Server-Side で <Link href="../ref-info/glossary-uid#gl-dii">DII</Link>(メールアドレスまたは電話番号) にアクセスでき、UID2 とインテグレーションして、RTB <Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>で Prebid.js によって渡される <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link>(Advertising Token) を生成したいパブリッシャー向けのものです。

これは Client-Server インテグレーションと呼ばれ、一部のインテグレーションステップが Client-Side で行われ、一部が Server-Side で行われます。

Prebid.js を使って UID2 とインテグレーションするには、以下が必要です:

- サイトの HTML と JavaScript に変更を加えます。
- トークン生成のためにサーバーサイドを変更します(オプションで <a href="../ref-info/glossary-uid#gl-token-refresh">Token Refresh</a>)。 

## Prebid.js Version

この実装には、Prebid.js version 7.53.0 以降が必要です。バージョン情報については、[https://github.com/prebid/Prebid.js/releases](https://github.com/prebid/Prebid.js/releases) を参照してください。

<!-- Diff in Prebid.js supported version for UID2/EUID is fine: verif SS 11/19/24 -->

## UID2 Prebid Module Page

Prebid と UID2 のインテグレーション方法に関する情報は、以下の場所にもあります:
- Prebid サイトの Prebid User ID Submodule の [Unified ID 2.0](https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html) ページ。
- Prebid GitHub リポジトリの [UID2 User ID Submodule](https://github.com/prebid/Prebid.js/blob/master/modules/uid2IdSystem.md) ページ。

<!-- ## Integration Example

GWH note 12/14/23 updated 2/7/25: we have a client-side example for Prebid.js but no client-server example. -->

## Integrating with Single Sign-On (SSO)

<IntegratingWithSSO />

## Integration Overview: High-Level Steps

以下のステップを完了する必要があります:

1. [Complete UID2 account setup and configure account](#complete-uid2-account-setup-and-configure-account)
2. [Add Prebid.js to your site](#add-prebidjs-to-your-site)
3. [Configure the UID2 module](#configure-the-uid2-module)

## Complete UID2 Account Setup and Configure Account

Prebid.js を使用して UID2 とインテグレーションするには、UID2 アカウントが必要です。アカウントがまだ作成されていない場合は、まず [Account Setup](../getting-started/gs-account-setup.md) ページの手順に従ってください。

アカウントの初期設定が完了すると、[UID2 Portal](../portal/portal-overview.md) にアクセスするための手順とリンクが送信されます。ここで、本番環境用の [credentials](../getting-started/gs-credentials.md) を作成し、必要に応じて追加の値を設定できます。詳細については、[Getting Started with the UID2 Portal](../portal/portal-getting-started.md) を参照してください。

Client-Server インテグレーションの場合、UID2 Portal の [API Keys](../portal/api-keys.md) ページで以下の値を設定する必要があります:

- <Link href="../ref-info/glossary-uid#gl-api-key">API key</Link>、Client Key とも呼ばれます。
- <Link href="../ref-info/glossary-uid#gl-client-secret">Client secret</Link>、参加者と UID2 Service のみが知る値。

:::important
これらの値を安全に保管することが非常に重要です。詳細については、[Security of API Key and Client Secret](../getting-started/gs-credentials.md#security-of-api-key-and-client-secret) を参照してください。
:::

<!-- (earlier instructions, no-portal, for EUID)
When account setup is complete, you'll receive a client keypair consisting of two values that identify you to the UID2 servers: Subscription ID and public key. These values are unique to you, and you'll use them to configure the UID2 module. For details, see [Subscription ID and Public Key](../getting-started/gs-credentials.md#subscription-id-and-public-key). 
-->

## Add Prebid.js to Your Site

<AddPrebidjsToYourSite />

## Configure the UID2 Module

UID2 Prebid モジュールを設定して、以下の2つのアクションを実行する必要があります:

| Step | Action | Link to Instructions |
| --- | --- | --- |
| 1 | Server-Side API コールを送信して UID2 Token を生成します。 | [Generating a UID2 Token on the Server](#generating-a-uid2-token-on-the-server) |
| 2 | Prebid module がトークンのリフレッシュと必要に応じてオプトアウトを管理できるように、レスポンス値を保存します。 | [Refreshing a UID2 Token](#refreshing-a-uid2-token) |

### Generating a UID2 Token on the Server

Prebid の Client-Server インテグレーションの場合、最初のステップは、サーバー上で UID2 Token を生成することです。その後、トークンを Prebid に渡して RTB ビッドストリームに送信します。

手順や例を含む詳細は、[Server-Side Token Generation](../ref-info/ref-server-side-token-generation.md) を参照してください。

トークンを生成するには、いずれかの SDK または [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) エンドポイントを呼び出します。トークンを示す API レスポンスの例については、[Sample Token Response Object](#sample-token-response-object) を参照してください。`Identity` レスポンスを Prebid に渡す必要があります。

:::warning
セキュリティ上の理由から、トークン生成に使用される API キーとシークレットはサーバーサイドで呼び出す必要があります。これらの値は Prebid の実装の一部として保存しないでください。
:::

### Refreshing a UID2 Token

UID2 Token をリフレッシュするには、次の表に示すように 2 つの方法があります。

| Mode | Description | Link to Section | 
| --- | --- | --- |
| Client refresh mode | Prebid.js は内部で自動的にトークンをリフレッシュします。<br/>これは最もシンプルなアプローチです。 | [Client Refresh Mode](#client-refresh-mode) |
| Server-only mode | Prebid.js はトークンを自動的にリフレッシュしません。トークンのリフレッシュを管理するのはパブリッシャーです。<br/>このオプションを選択する理由の例:<ul><li>[SDK for JavaScript](../sdks/sdk-ref-javascript.md) を使用してトークンをリフレッシュし、Prebid.js でトークンをビッドストリームに送信したい場合。</li><li>トークンを複数の手段(Prebid.js や Google など) でビッドストリームに送信したい場合。</li></ul> | [Server-Only Mode](#server-only-mode) |

### Client Refresh Mode

該当するエンドポイントからの完全な JSON レスポンスボディを Prebid module に提供する必要があります:

- 新しい UID2 Token を取得するには、[POST&nbsp;/token/generate](../endpoints/post-token-generate.md)。
- リフレッシュされた UID2 Token については、[POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md)。

例については、[Sample Token Response Object](#sample-token-response-object) を参照してください。

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

トークンの例については、[Sample Token Response Object](#sample-token-response-object) を参照してください。

#### Client Refresh Mode uid2Token Example

次の例は、コンフィギュレーションのサンプルを示しています。トークンの内容については、[Sample Token Response Object](#sample-token-response-object)  を参照してください。

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

以下の例では、Advertising Token の値を格納する `__uid2_advertising_token` という名前のクッキーを設定しています。クッキーの値は、トークンレスポンスオブジェクトで返される値です(詳細は [Sample Token Response Object](#sample-token-response-object) を参照してください)。

この設定により、UID2 モジュールは Advertising Token の値をクッキーから取得できます。

Cookie:

```js
__uid2_advertising_token=A4AAAABlh75XmviGJi-hkLGs96duivRhMd3a3pe7yTIwbAHudfB9wFTj2FtJTdMW5TXXd1KAb-Z3ekQ_KImZ5Mi7xP75jRNeD6Mt6opWwXCCpQxYejP0R6WnCGnWawx9rLu59LsHv6YEA_ARNIUUl9koobfA9pLmnxE3dRedDgCKm4xHXYk01Fr8rOts6iJj2AhYISR3XkyBpqzT-vqBjsHH0g
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

- インテグレーションテストでは、`params.uid2ApiBase` を `"https://operator-integ.uidapi.com"` に設定します。トークンの生成に使用する環境(本番環境またはインテグレーション環境)と同じ値に設定する必要があります(資格情報については、[Getting Your Credentials](../getting-started/gs-credentials.md#getting-your-credentials) を参照してください)。

- Prebid.js client-server インテグレーションの場合、クライアントサイドインテグレーション機能を無効にして、より小さな Prebid.js ビルドを作成できます。これを行うには、`--disable UID2_CSTG` フラグを渡します:

```
    $ gulp build --modules=uid2IdSystem --disable UID2_CSTG
```

## Storing the UID2 Token in the Browser

<StoreUID2TokenInBrowser />

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

UID2 Module に有効な UID2 Token があるかどうかを確認するには `pbjs.getUserIds().uid2` を呼び出します。値が返された場合、UID2 Module に有効な UID2 Token が存在します。

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
| params.uid2Token | CR: Optional<br/>SO: N/A | Object | 最初の UID2 Token。これは `/token/generate` または `/token/refresh` エンドポイントをコールした際に復号されたレスポンスの `body` 要素でなければなりません。 | [Sample Token Response Object](#sample-token-response-object) を参照してください。 |
| params.uid2Cookie | CR: オプション<br/>SO: N/A  | String | サーバが設定した UID2 Token を保持するクッキーの名前。クッキーは uid2Token パラメータと同じ形式の JSON を含む必要があります。`uid2Token` を指定した場合、このパラメータは無視されます。 | [Sample Token Response Object](#sample-token-response-object) を参照してください。 |
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

### Sample Token Response Object

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

## Optional: Specifying the API Base URL to Reduce Latency

デフォルトでは、UID2 モジュールは米国の UID2 本番環境サーバに対して API コールを行います。

ユースケースに最適な URL を選択する方法と、有効なベース URL の完全なリストについては、[Environments](../getting-started/gs-environments.md) を参照してください。

デフォルト以外の UID2 サーバを指定するには、UID2 モジュールを構成する際に、オプションの `params.uid2ApiBase` パラメータを設定します。次の例を参照してください:

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
