---
title: SDK for JavaScript
description: JavaScript Client-Side SDK に関するリファレンス情報。
hide_table_of_contents: false
sidebar_position: 02
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';

# SDK for JavaScript Reference Guide

export const New = () => (
  <span className='pill'>NEW IN V3</span>
);

この SDK を使用すると、UID2 を使用してクライアントの ID を確立し、Advertising Token を取得するプロセスが容易になります。以下のセクションでは、UID2 ID を確立するための [workflow](#workflow-overview) について説明し、SDK の [API reference](#api-reference) を提供し、UID2の[storage format](#uid2-storage-format)について説明します。

:::tip
Prebid.js を UID2 ID モジュールと一緒に使用しているや、UID2 をサポートしている他の製品と一緒に使用している場合、おそらく SDK を使用する必要はないでしょう。Prebid.js モジュールがすべてを管理します。詳細については、[UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md) を参照してください。
:::

このページでは、SDK for JavaScript version 3 について説明します。以前のバージョンを使用してインテグレーションを管理している場合は、以下のいずれかを行ってください:
- [migration guide](#migration-guide) を使用して、インテグレーションをアップグレードします。(推奨) 
- [earlier versions of the SDK](./sdk-ref-javascript-v2.md) のドキュメントを参照します。

関連情報:

コンテンツパブリッシャーのインテグレーションステップについては、以下を参照してください:
  - [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md).
  - [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md). 

アプリケーションのサンプルと関連文書については、以下を参照してください:
  - SDK v3を使用したUID2 Google Secure Signals のサンプル:
    - [Code and docs](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-secure-signals-integration/with_sdk_v3)
    - Running site: [Client-Side UID2 SDK Integration Example](https://secure-signals-jssdk-integ.uidapi.com/)
  - JavaScript Client-Side インテグレーションの例: [Code](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/cstg)、Running site ([Client-Side Integration Example, UID2 JavaScript SDK](https://cstg-integ.uidapi.com/)).

## Functionality

この SDK は、独自にカスタマイズした UID2 インテグレーションを行いたいパブリッシャーの開発を簡素化します。次の表は、SDK がサポートする機能を示しています。

| Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token | Generate UID2 Token from DII | Refresh UID2 Token |
| :--- | :--- | :--- | :--- |
| Not supported | Not supported | Not supported | Supported |

## API Permissions

この SDK を使用するには、[Account Setup](../getting-started/gs-account-setup.md) ページに記載されている手順に従って、UID2 アカウントのセットアップを完了する必要があります。

SDK が提供する特定の機能の使用許可が与えられ、そのアクセス用の認証情報が与えられます。SDK には、使用する権限を持たない機能があるかもしれないことに留意してください。例えば、パブリッシャーはトークンの生成と更新のために特定の API Permissions を取得しますが、SDK は共有などの他のアクティビティをサポートするかもしれません。

詳細は [API Permissions](../getting-started/gs-permissions.md) を参照してください。

## SDK Version

このドキュメントは SDK for JavaScript version 3 用です。

## GitHub Repository

この SDK のソースは、以下のオープンソースの GitHub リポジトリにあります:

- [https://github.com/iabtechlab/uid2-web-integrations](https://github.com/iabtechlab/uid2-web-integrations)

## SDK Distribution

この SDK は、以下のロケーションに公開されています:

<!-- - NPM: [https://www.npmjs.com/package/@uid2/uid2-sdk](https://www.npmjs.com/package/@uid2/uid2-sdk)
  - This is the easiest way to include the SDK in your own build. Use this if you want to bundle the SDK along with your other JavaScript or TypeScript files.
  - You can also use this for TypeScript type information and still load the script via the CDN. If you do this, ensure that the version of NPM package you have installed matches the version in the CDN url. LP_TODO: Looking at the NPM package, I don't believe it's ready for use - it just includes the source and doesn't seem to include a ready-to-deploy build. LP 12 Sep 2023 -->
- CDN: `https://cdn.prod.uidapi.com/uid2-sdk-${VERSION_ID}.js`
  <!-- - This is the easiest way to include the SDK in your site if you don't use a build pipeline to bundle your JavaScript. LP_TODO: This doesn't make sense until we add the NPM option above. -->

  この文書の最新更新時点での最新バージョンは [3.2.0](https://cdn.prod.uidapi.com/uid2-sdk-3.2.0.js) です。[the list of available versions](https://cdn.prod.uidapi.com/) も参照してください。
- CDN (Integration): `https://cdn.integ.uidapi.com/uid2-sdk-${VERSION_ID}.js`

  このインテグレーション URL には最小化されていないコードが含まれており、テストのみを目的としています。この URL を本番サイトに使用しないでください。

  このドキュメントの最新更新時点での最新バージョンは [3.2.0](https://cdn.integ.uidapi.com/uid2-sdk-3.2.0.js) です。[the list of available versions](https://cdn.integ.uidapi.com/) も参照してください。

## Terminology

このドキュメントでは、以下の用語が使われます:
- **ID** とは、[POST&nbsp;/token/generate](../endpoints/post-token-generate.md) または [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) エンドポイントによって返される、UID2 Token、Refresh Token、および Timestamp などの関連値を含む値のパッケージを指します。
- **Advertising Token** は UID2 Token を指します。
- **Callback function**は、本 SDK の現在のバージョン用に構築され、[Array Push Pattern](#array-push-pattern) を使用して登録されたコールバック関数を指します。
- **Legacy callback function** は、この SDK のバージョン 1.x または 2.x 用に構築され、`init` の呼び出しで登録されたコールバック関数を指します。

## Include the SDK Script

UID2 をターゲティング広告に使用したいすべてのページに、以下の SDK スクリプトを含めます:

```html
<script src="https://cdn.prod.uidapi.com/uid2-sdk-3.2.0.js" type="text/javascript"></script> 
```

### Async or Defer Loading the SDK Script

Version 3 以降の SDK は、`async` または `defer` スクリプトローディングとともに使用することができます。

サイトで `async` または `defer` スクリプトのロードを使用している場合は、次のようにしてください:
- (必須) `SdkLoaded` イベントを受信したときに、[callback function](#callback-function) から `__uid2.init` を呼び出していることを確認します。
- (必須) Scriptタグに関連する属性を追加します。
- (推奨) 以下の例のように、Script タグがページの `<head>` 部分にあることを確認してください:

   ```html
   <head>
     <!-- ... -->
     <script async src="https://cdn.prod.uidapi.com/uid2-sdk-3.2.0.js" type="text/javascript"></script>
     <!-- ... -->
   </head>
   ```

## Workflow Overview

SDK を使用して UID2 ID を確立するための Client-Side ワークフローは、以下の Step で構成されます:

1. [Array Push Pattern](#array-push-pattern) を使ってコールバック関数を登録します。
2. コールバックが `SdkLoaded` イベントを受信したら、[init](#initopts-object-void) 関数を使用して SDK を初期化します。
3. イベントリスナーが `InitCompleted` イベントを受信するのを待ちます。イベントデータは ID が利用可能かどうかを示します:
	- ID が利用可能な場合、その ID がイベントペイロードに返されます。SDK は [background token auto-refresh](#background-token-auto-refresh) を設定します。
	- ID が利用できない場合、ペイロードの `identity` プロパティは null になります。[provide an identity to the SDK](#provide-an-identity-to-the-sdk) するまで、UID2 は利用できません。
4. ID の変更を示す `IdentityUpdated` コールバックイベントを処理します。

	 イベントペイロードの `identity` プロパティには新しい ID が格納されるか、有効な ID がない場合は null が格納されます。
5. 状態に基づいて ID を処理します:
	- Advertising Token が利用可能な場合、それを使用してターゲティング広告のリクエストを開始します。
	- Advertising Token が利用可能でない場合は、ターゲティング広告を使用しないか、同意フォームでユーザーをデータキャプチャにリダイレクトします。

より詳細な Web インテグレーションの手順については、[Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md) を参照してください。

### Background Token Auto-Refresh

SDKの [initialization](#initopts-object-void) の一部として、ID の Token Auto-refresh が設定され、ID の Timestamp または断続的なエラーによるリフレッシュの失敗によってバックグラウンドでトリガーされます。

Token の Auto-refresh について知っておくべきことは以下のとおりです:

- 一度にアクティブにできる Token refresh call は 1 つだけです。
- [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) レスポンスが、ユーザーがオプトアウトしたため、あるいは Refresh Token の有効期限が切れたために失敗した場合、バックグラウンドでの自動更新処理を一時停止します。UID2ベースのターゲティング広告を再び使用するには、ユーザーからメールアドレスまたは電話番号を取得する必要があります（[isLoginRequired()](#isloginrequired-boolean)は`true`を返します）。
- SDK の初期化時に指定された [callback function](#callback-function) は、以下の場合に呼び出されます:
	- リフレッシュが成功するたびに呼び出されます。
	- ユーザがオプトアウトした場合など、IDが無効になった場合。<br/>NOTE: ID が一時的に使用できなくなり、自動リフレッシュに失敗し続けた場合、コールバックは呼び出されません。この場合、SDK は有効期限が切れていない限り、既存の Advertising Token を使用し続けます。
- [disconnect()](#disconnect-void) 呼び出しはアクティブなタイマーをキャンセルします。

### Callback Function

[Array Push Pattern](#array-push-pattern) を使用して、UID2 SDK からイベントを受信する関数を登録できます。現在利用可能なイベントはいくつかあります:
- `SdkLoaded` は SDK がパースされ、グローバルな `__uid2` オブジェクトが構築された後に発生します。これは `init()` を呼び出す際に便利で、特にスクリプトのロード順序が保証されていない場合に便利です (例えば、スクリプトのロードに `async` や `defer` を使用している場合など)。
- `init()` が終了し、SDK を使用できる状態になると `InitCompleted` が発生します。`init` 呼び出しで ID が提供された場合、または SDK が以前に提供された ID をロードできた場合、その ID がペイロードに含まれます。
- `IdentityUpdated` は、新しいIDが利用可能になるか、既存の ID が利用できなくなるたびに発生します。

:::tip
コールバック関数はいくつでも用意でき、どこからでも登録できます。これにより、サイトにとって意味のある方法でコードを分割することができます。
:::

#### Callback Function Signature

コールバック関数は、イベントタイプとペイロードの2つのパラメータを受け取る必要があります。ペイロードのタイプはイベントのタイプにより異なります。

次の例のコールバックは `SdkLoaded` イベントを処理して init を呼び出し、`init` が完了した後に ID が利用できない場合は `InitCompleted` イベントを使用して ID を提供します。

<Tabs>
<TabItem value='js' label='JavaScript'>

```js
  window.__uid2 = window.__uid2 || {};
  window.__uid2.callbacks = window.__uid2.callbacks || [];
  window.__uid2.callbacks.push((eventType, payload) => {
    if (eventType === 'SdkLoaded') {
      __uid2.init({});
    }
    if (eventType === 'InitCompleted' && !payload.identity) {
        const generatedIdentity = await requestIdentityFromServer(); // Call your server-side integration to generate a token for the logged-in user
        __uid2.setIdentity(generatedIdentity);
    }
  });
```

</TabItem>
<TabItem value='ts' label='TypeScript'>

```tsx
  import { EventType, CallbackPayload } from "./callbackManager";

  window.__uid2 = window.__uid2 || {};
  window.__uid2.callbacks = window.__uid2.callbacks || [];
  window.__uid2.callbacks.push((eventType: EventType, payload: CallbackPayload) => {
    if (eventType === 'SdkLoaded') {
      __uid2.init({});
    }
    if (eventType === 'InitCompleted' && !payload.identity) {
        const generatedIdentity = await requestIdentityFromServer(); // Call your server-side integration to generate a token for the logged-in user
        __uid2.setIdentity(generatedIdentity);
    }
  });
```

</TabItem>
</Tabs>

#### Event Types and Payload Details

<div className='no-wrap-table-code'>

| Event | Payload | Details |
| :--- | :--- | :--- |
| `SdkLoaded` | `{}` | SDK スクリプトがロードされ、グローバルな `__uid2` が構築されたときに呼び出されます。このイベントを受け取ると、安全に `__uid2.init` を呼び出すことができます。コールバックは常にこのイベントを一度だけ受け取ります。コールバックが登録されたときに SDK が既にロードされていた場合、コールバックは直ちにこのイベントを受け取ります。 |
| `InitCompleted` | `{ identity: Identity  \| null }` | `init()` が終了すると呼び出されます。コールバックは `init` が正常に呼び出されている限り、常にこのイベントを一度だけ受け取ります。コールバックが登録されたときに `init` が完了していた場合は、`SdkLoaded` イベントを受信した直後にこのイベントを受け取ります。 |
| `IdentityUpdated` | `{ identity: Identity \| null }` | 現在の ID が変更されるたびに呼び出されます。コールバックが登録された後に ID が変更されなかった場合、コールバックはこのイベントを受け取りません。 |

</div>

`Identity` 型は `init()` を呼び出す時に指定できる ID と同じ型です。

#### Array Push Pattern

順番にロードされることが保証されていないスクリプトタグ (例えば、`async` や `defer` スクリプトタグを使用している場合など) を最適にサポートするために、コールバックを登録するには以下のパターンを使用します:

```js
window.__uid2 = window.__uid2 || {};
window.__uid2.callbacks = window.__uid2.callbacks || [];
window.__uid2.callbacks.push(callbackFunction);
```

これにより、以下が保証されます:
- SDK がロードされる前にコードを実行した場合 (つまり、グローバルな `__uid2` オブジェクトが利用できない場合)、SDK が見つけることができるコールバックを提供することができます。
- あなたのコードより先に SDK が実行された場合、`__uid2` オブジェクトや `callbacks` 配列は上書きされません。
- このパターンを使用して複数のコールバックが登録された場合、それらは互いに上書きされません。

### Provide an Identity to the SDK

SDK がローカルストレージまたはクッキーから以前に保存された ID をロードできる場合を除き、SDK に ID を提供する必要があります。これにはいくつかの方法があります:

- [Provide an Identity by Setting a First-Party Cookie](#provide-an-identity-by-setting-a-first-party-cookie)
- [Provide an Identity in the Call to `init`](#provide-an-identity-in-the-call-to-init)
- [Provide an Identity by Calling `setIdentity`](#provide-an-identity-by-calling-setidentity)

#### Provide an Identity by Setting a First-Party Cookie

[storage format section](#uid2-storage-format) で説明されているように、ファーストパーティクッキーを保存していて、その値がローカルストレージで利用可能な値よりも新しい場合、SDK はその値をクッキーからロードします。もし `useCookie` init オプションを `true` に設定した場合、SDK は常にこの値をロードし、ローカルストレージをチェックしません。[init parameters](#init-parameters) を使用して、クッキーに関することを制御できます。

#### Provide an Identity in the Call to `init`

[`init`](#initopts-object-void) を呼び出す時に、新しい ID を指定できます。

#### Provide an Identity by Calling `setIdentity`

`init` が完了したら、いつでも [`setIdentity`](#setidentityidentity-identity-void) を呼び出して、SDK に新しい ID を渡すことができあす。

## API Reference

SDK for JavaScript とのすべてのインストラクションは、グローバルな `__uid2` オブジェクトを介して行われます。このオブジェクトは `UID2` クラスのインスタンスであり、以下の JavaScript 関数はすべて `UID2` クラスのメンバーです:

- [constructor()](#constructor)
- [init()](#initopts-object-void)
- [getAdvertisingToken()](#getadvertisingtoken-string)
- [getAdvertisingTokenAsync()](#getadvertisingtokenasync-promise)
- [isLoginRequired()](#isloginrequired-boolean)
- [disconnect()](#disconnect-void)
- [abort()](#abort-void)
- [callbacks](#callbacks) <New />
- [setIdentity()](#setidentityidentity-identity-void) <New />
- [getIdentity()](#getidentity-identity--null) <New />

### constructor()

UID2 オブジェクトを構築します。SDK がロードされると、自動的に UID2 クラスのインスタンスが初期化され、グローバルな __uid2 オブジェクトとして保存されます。高度なインテグレーションでは、このコンストラクタを直接使用することができますが、SDK の複数のアクティブなインスタンスが実行されないように注意する必要があります。これはサポートされていない使用例です。

:::tip
この関数を呼び出す代わりに、グローバルの `__uid2` オブジェクトを使用することができます。
:::

### init(opts: object): void

SDK を初期化し、ターゲティング広告用のユーザー ID を確立します。

この関数について知っておくべきことは以下のとおりです:

- `init()` は SDK がロードされた後であれば、いつでも呼び出すことができます。これを行うには、[Array Push Pattern](#array-push-pattern) を使用して `SdkLoaded` イベントを処理するコールバック関数を登録することを推奨します。このパターンを使うことで、スクリプトのロード順序に関係なくコードが動作し、スクリプトタグで `async` や `defer` を使っても UID2 SDK のエラーが発生しないようにすることができます。
- `init()` 呼び出しの `identity` プロパティは、[POST&nbsp;/token/generate](../endpoints/post-token-generate.md) または [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) 呼び出しが成功したときに返されるレスポンス JSON オブジェクトの `body` プロパティを参照します。Server-side のインテグレーションで常に現在のトークンを使用できるようにしていて、JavaScript を使用して ID を提供するほうが便利な場合は、この方法を使用するとよいでしょう。
- `init()` 呼び出しの `identity` プロパティが不正な場合、SDK はローカルストレージまたはクッキーから ID をロードしようとします。
  - `init()` が完了すると、すべてのコールバックは `InitCompleted` イベントを受信します。このイベントのペイロードの `identity` プロパティが null の場合、ID をロードできなかったことになるので、[provide an identity to the SDK](#provide-an-identity-to-the-sdk) する必要があります。これは、Server-side のインテグレーションによって常に現在の ID が利用可能であることが保証されておらず、必要な場合にのみサーバーから ID を要求する必要がある場合に推奨される ID の提供方法です。
  - 渡された UID2 情報をセッションに保存するためにファーストパーティクッキー ([UID2 Storage Format](#uid2-storage-format) を参照) を使用している場合、異なるドメインのページから `init()` を呼び出すと、そのクッキーにアクセスできないことがあります。`cookieDomain` オプションと `cookiePath` オプションで、クッキーに使用する設定を調整することができます。
- 特定の動作を調整するために、初期化呼び出しにはオプションの設定 [init prarmeters](#init-parameters) を含めることができます。

以下は、Server-side で生成された ID を含むコールバックを使った `init()` 呼び出しの例です。

```html
<script>
  window.__uid2 = window.__uid2 || {};
  window.__uid2.callbacks = window.__uid2.callbacks || [];
  window.__uid2.callbacks.push((eventType, payload) => {
    if (eventType === "SdkLoaded") {
      __uid2.init({
        identity : { // The `body` property value from the token/generate or token/refresh API response.
          "advertising_token": "AgmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b/besPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM+ewMzXXM8G9j8Q=",
          "refresh_token": "Mr2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq/90PYmajV0IPrvo51Biqh7/M+JOuhfBY8KGUn//GsmZr9nf+jIWMUO4diOA92kCTF69JdP71Ooo+yF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA==",
          "identity_expires": 1633643601000,
          "refresh_from": 1633643001000,
          "refresh_expires": 1636322000000
        }
      });
    }
  });
</script>
```

以下は、以前に提供された ID があれば、それをローカルストレージからロードする `init()` 呼び出しの例です。このようなスクリプトは、ID が確立された後にユーザーが訪れる可能性のある任意のページに配置することができます。

```html
<script>
  window.__uid2 = window.__uid2 || {};
  window.__uid2.callbacks = window.__uid2.callbacks || [];
  window.__uid2.callbacks.push((eventType, payload) => {
    if (eventType === "SdkLoaded") {
      __uid2.init({}); // Note that you must provide a configuration object, even if you're not providing any options.
    }
  });
</script>
```

#### Init Parameters

`opts` オブジェクトは、以下のプロパティをサポートしています。

| Property | Data Type | Attribute | Description | Default Value |
| :--- | :--- | :--- | :--- | :--- |
| `identity` | object | オプション | [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) または [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) 呼び出しが成功したときの `body` プロパティ値です。<br/>[ファーストパーティクッキー](sdk-ref-javascript-v2.md#uid2-cookie-format) からの ID を使用するには、このプロパティを空にしておきます。 | N/A |
| `baseUrl` | string | オプション | [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) エンドポイントを呼び出す際に使用する UID2 Operator のカスタム Base URLです。<br/>例えば: `https://my.operator.com`.  | `https://prod.uidapi.com`. |
| `refreshRetryPeriod` | number | オプション | 断続的なエラーが発生した場合に、トークンのリフレッシュを再試行するミリ秒数です。<br/>この値は 1000 以上でなければなりません。 | 5000 |
| `cookieDomain` | string | オプション | [UID2 cookie](sdk-ref-javascript-v2.md#uid2-cookie-format) に適用するドメイン名文字列です。<br/>例えば、`baseUrl` が `https://my.operator.com` の場合、`cookieDomain` の値は `operator.com` となります。 | `undefined` |
| `cookiePath` | string | オプション | [UID2 cookie](sdk-ref-javascript-v2.md#uid2-cookie-format) に適用する Path 文字列です。 | `/` |
| `useCookie` | `boolean` | オプション | この値を `true` に設定すると、SDK はローカルストレージではなくクッキーに ID を保存します。この値がfalseであるか、提供されていない場合でも、ファーストパーティクッキーを使用して ID を提供することができます。 | 
| `callback` | `function(object): void` | 非推奨 | 渡された ID を検証した後に SDK が呼び出す関数です。新しいインテグレーションには使用しないでください。 | N/A |


#### Errors

`init()` 関数は、以下のエラーを throw することがあります。

| Error | Description |
| :--- | :--- |
| `TypeError` | 以下のいずれかの問題が発生しました:<br/>- 関数がすでに呼び出されている。<br/>- `opts` の値がオブジェクトではありません。<br/>- コールバック関数が指定されていません。<br/>-  `callback` の値が関数でありません。 |
| `RangeError` | リフレッシュの再試行期間が 1000 未満である。 |

#### Legacy Callback Function

これは後方互換性のためだけに提供されています。新しいインテグレーションでは、新しいスタイルの [callback function](#callback-function) を使う必要があります。レガシーコールバックは [Array Push Pattern](#array-push-pattern) を使って登録することができません。また、新スタイルのコールバックは `init` に渡すことができません。

詳細については、以前のバージョンの SDK のドキュメントの[Legacy Callback Function](./sdk-ref-javascript-v2#callback-function) を参照してください。

すでにレガシーコールバック関数を使用してインテグレーションを構築している場合は、現在のバージョンの SDK で変更なく使用できます。ただし、この機能は SDK の将来のバージョンで削除される予定です。新しいスタイルの [callback function](#callback-function) を使用するようにインテグレーションを更新することを強く勧めます。

### getAdvertisingToken(): string

現在の Advertising Token を取得します。

この関数を呼び出す前に、必ず [init()](#initopts-object-void) を呼び出し、コールバックハンドラが `InitCompleted` イベントを受信するまで待ちます。

```html
<script>
  let advertisingToken = __uid2.getAdvertisingToken();
</script>
```

`getAdvertisingToken()` 関数を使うと、初期化完了時のコールバックだけでなく、どこからでも Advertising Token にアクセスすることができます。この関数は以下の条件のいずれかに該当する場合に `undefined` をします:

この関数は、以下の条件のいずれかに該当する場合、`undefined` を返します:

- [callback function](#callback-function) はまだ呼び出されていません。これは SDK の初期化が完了していないことを意味します。
- SDK の初期化は完了していますが、使用する有効な ID がありません。
- SDK の初期化は完了しましたが、自動更新により ID がクリアされました&#8212;例えば、ユーザーがオプトアウトした場合などです。

ID が利用できない場合は、[isLoginRequired()](#isloginrequired-boolean) 関数を使用して最良の対処法を決定します。

### getAdvertisingTokenAsync(): Promise

現在の Advertising Token の `Promise` 文字列を取得します。

この関数は、[init()](#initopts-object-void) の呼び出しの前でも後でも呼び出すことができます。返された promise は、初期化が完了し、[callback function](#callback-function) が呼び出された後、Advertising Token が利用可能かどうかに基づいて Settle されます:

- Advertising Token が利用可能な場合、Promise は現在の Advertising Token で実行されます。
- Advertising Token が利用可能であれば、Promise は現在の Advertising Token で実行されます。Advertising Token が一時的にでも利用できない場合、Promise は `Error` のインスタンスで拒否されます。この場合に最適なアクションを決定するには、[isLoginRequired()](#isloginrequired-boolean) を使います。

`init` の完了後に利用可能な ID を受信するだけで、ID の更新の受信を継続したくない場合は、この関数を使用して Client-side JavaScript SDK の初期化の完了の通知を受け取ることができます。

:::info
もし `getAdvertisingTokenAsync()` 関数が初期化が完了した *後* に呼ばれた場合、Promise は現在の状態に基づいて即座に Settle されます。
:::

:::tip
[callback function](#callback-function) を使って、ID が変更されるたびに通知を受ける方が簡単かもしれません。
:::

```html
<script>
  __uid2.getAdvertisingTokenAsync()
    .then(advertisingToken => { /* initiate targeted advertising */ })
    .catch(err => { /* advertising token not available */ });
</script>
```


### isLoginRequired(): boolean

UID2 ログイン [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) 呼び出しが必要かどうかを指定します。

```html
<script>
  __uid2.isLoginRequired();
</script>
```

#### Return Values

| Value | Description |
| :--- | :--- |
| `true` | ID が利用できません。この値は以下のいずれかを示します:<ul><li>ユーザーがオプトアウトした。</li><li>Refresh token の有効期限が切れた。</li><li>ファーストパーティクッキーは利用できず、サーバーで生成した ID も提供されていません。</li></ul> |
| `false` | この値は以下のいずれかを示します:<ul><li>ID が存在し、有効。</li><li>ID の有効期限が切れており、断続的なエラーによりトークンがリフレッシュされなかった。</li><li>ID の有効期限が切れており、断続的なエラーによりトークンがリフレッシュされなかった。</li></ul> |
| `undefined` | SDK の初期化はまだ完了していません。 |

### disconnect(): void

UID2 ID をファーストパーティクッキーとローカルストレージから消去します ([UID2 ストレージフォーマット](#uid2-storage-format) を参照してください)。これによりクライアントの ID セッションが閉じられ、クライアントのライフサイクルが切断されます。

ユーザーがパブリッシャーのサイトからログアウトしたら、次の呼び出しを行います:

```html
<script>
  __uid2.disconnect();
</script>
```

この関数が実行されると、[getAdvertisingToken()](#getadvertisingtoken-string) 関数は `undefined` を返し、[isLoginRequired()](#isloginrequired-boolean) 関数は `true` を返します。

:::warning
SDK が正しいクッキーにアクセスするために `cookieDomain` または `cookiePath` を指定する必要があり、かつ `init` が完了していない場合、SDK はクッキーをクリアできません。この場合、エラーは発生しません。
:::

### abort(): void

バックグラウンドのタイマーやリクエストを終了します。UID2 オブジェクトは指定されていない状態のままで、これ以上使用することはできません。

この関数は、既存の UID2 オブジェクトを新しいインスタンスで置き換えるような高度なシナリオで使用するためのものです。

### callbacks

これは、登録されたコールバックをすべて格納する配列です。[Array Push Pattern](#array-push-pattern) を使ってのみ、この配列とやりとりする必要があります。

### setIdentity(identity: Identity): void

UID2 SDK に新しい ID を提供するには、この関数を使用します。既存のリフレッシュ試行はすべてキャンセルされ、新しい ID が今後のすべての操作に使用されます。新しいリフレッシュタイマーが開始されます。ID が検証されると、登録されているすべてのイベントハンドラが新しい ID を含む `IdentityUpdated` イベントと共に呼び出されます。

`setIdentity` は `init` が完了する前に呼び出されるとエラーを throw します。

:::tip
`setIdentity()` は、ページがシングルページのアプリで、最初に読み込んだときに ID が利用できない場合に便利です。これにより、ページロード時に `init` (および保存されている ID を読み込む) を呼び出しし、保存されている ID がない場合は後で ID を指定することができます。
:::

### getIdentity(): Identity | null

有効な ID がある場合は、現在格納されている ID を返します。

利用可能な有効な ID がある場合、返り値は保存されている完全な ID を表すオブジェクトです。オブジェクトのプロパティは、[contents structure](#contents-structure) セクションで説明した、格納されている値と同じです。

現在有効な ID がない場合 (ID が一時的に使用できないだけであっても)、戻り値は null です。ID が一時的に使用できないだけなのかどうかを知る必要がある場合は [isLoginRequired()](#isloginrequired-boolean) を呼び出します。

## UID2 Storage Format

SDK はユーザーの ID を保存するのに、ローカルストレージかファーストパーティクッキーのどちらかを使用します。デフォルトではローカルストレージを使用しますが、[init parameter](#init-parameters) を使用して変更できます。

ローカルストレージを使用する場合でも、SDK はファーストパーティクッキーに利用可能な新しい ID があるかどうかを確認します。これにより、SDK はローカルストレージを利用しながら、ファーストパーティクッキーを設定することでIDを提供することができます。

### UID2 Cookie Properties

クッキーが使用されている場合、クッキーは次の表のプロパティを使用します。

| Properties | Default Value | Comments |
| :--- | :--- | :--- |
| `Name` | `__uid_2` | N/A |
| `Expiry` | N/A | 値は、[POST&nbsp;/token/generate](../endpoints/post-token-generate.md) または [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) レスポンスで指定された Refresh Token の有効期限タイムスタンプです。 |
| `Path` | `/` | 別の値を使用したい場合は、SDK の初期化時に `cookiePath` [init() parameter](#init-parameters) を使用して設定することができます。 |
| `Domain` | `undefined` | 別の値を使用したい場合は、SDK の初期化時に `cookieDomain` [init() parameter](#init-parameters) を使用して設定することができます。 |

### Contents Structure

UID2 Cookie の内容は、[POST&nbsp;/token/generate](../endpoints/post-token-generate.md) または [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) レスポンスの `body` プロパティと同じ構造を持つ JSON オブジェクトを、`private` オブジェクトを除いてURI エンコードした文字列表現です。

以下は UID2 cookie 構造の例です:

```json
{
   "advertising_token":"AgAAAAVacu1uAxgAxH+HJ8+nWlS2H4uVqr6i+HBDCNREHD8WKsio/x7D8xXFuq1cJycUU86yXfTH9Xe/4C8KkH+7UCiU7uQxhyD7Qxnv251pEs6K8oK+BPLYR+8BLY/sJKesa/koKwx1FHgUzIBum582tSy2Oo+7C6wYUaaV4QcLr/4LPA==",
   "refresh_token":"AgAAAXxcu2RbAAABfGHhwFsAAAF79zosWwAAAAWeFJRShH8u1AYc9dYNTB20edyHJU9mZv11e3OBDlLTlS5Vb97iQVumc7b/8QY/DDxr6FrRfEB/D85E8GzziB4YH7WUCLusHaXKLxlKBSRANSD66L02H3ss56xo92LMDMA=",
   "identity_expires":1633643601000,
   "refresh_from":1633643001000,
   "refresh_expires":1636322000000,
   "refresh_response_key":"dYNTB20edyHJU9mZv11e3OBDlLTlS5Vb97iQVumc7b/8QY/DDxr6FrRfEB/D",
   "private":{     
   }
}
```
:::warning
`private` オブジェクトの内容は明示的に指定されておらず、SDK が解釈するようになっています。このオブジェクトの構造、セマンティクス、互換性について、いかなる仮定もしないでください。クッキーの更新はその構造を保持しなければなりません。
:::

## Migration Guide

このセクションには、以前のバージョンの SDK for JavaScript から現在のバージョンである v3 にアップグレードするために必要な情報がすべて含まれています:

- [Benefits of Migrating](#benefits-of-migrating)
- [Required Changes](#required-changes)
- [Recommended Changes](#recommended-changes)
- [Optional Changes](#optional-changes)

### Benefits of Migrating

既存のインテグレーションが SDK の version 1.x または 2.x を使用している場合、version 3 は完全に下位互換性があります。新しい URL を参照するようにスクリプトタグを変更するだけで、SDK を version 3 に更新できます。こうすることで、次のような利点があります:

- スクリプトは UID2 CDN を使用して配布されるようになったため、読み込みが速くなります。
- SDK は、ID の保存に Cookie の代わりにローカルストレージを使用しようとします。Cookie がローカルストレージのものより新しいトークンを提供する場合でも、SDK は Cookie から ID をロードします。

   このアプローチに関する注意事項
  - ローカルストレージのデフォルトは、Cookie の最大サイズ制限に近い多くのパブリッシャーから要求されています。
  - 新しい ID を提供するためにファーストパーティクッキーの設定に依存している場合、この変更の利点はありません。
  - `init` に ID を渡すことによってのみ ID を提供する場合、SDK は Cookie に書き込みません。

Version 1.x と 2.x の機能の一部は非推奨となっており、将来のインテグレーションを考慮した変更を行う必要があります。
- legacy callback system は非推奨となり、最終的には削除される予定です。

インテグレーションをアップデートすることで、追加機能を利用することができます:
- `async` または `defer` を使用したスクリプトのロードが完全にサポートされました。
- コールバックシステムがよりシンプルになり、管理するステートが少なくなりました。
- 複数のコールバックを提供することができ、それらは `init` が呼ばれる前でも後でも、いつでも登録することができます。
- TypeScript を完全にサポートしています。
- `init()` が呼ばれた後に ID を設定する関数。

  これにより、SDK はシングルページのアプリシナリオで使いやすくなりました。

### Required Changes

#### Update your script URL

[Version 3 CDN URL](#include-the-sdk-script) から SDK をロードするようにスクリプトタグを更新します。

### Recommended Changes

SDK の version 3 の利点を得るために、以下の変更を実施することを強く推奨します:

- [Migrate to the Version 3 Callback System](#migrate-to-the-version-3-callback-system)
- [Take advantage of `setIdentity` and other new features](#take-advantage-of-setidentity-and-other-new-features)
- [Change how you call init](#change-how-you-call-init)

#### Migrate to the Version 3 Callback System

以前のバージョンでは、コールバックは `advertisingToken`、`status`、`statusText` プロパティを持つ単一のオブジェクトをパラメータとして受け取っていました。Version 3 では、この関数を新しい [Callback Function Signature](#callback-function-signature) を使用するように変更してください。

元のコールバックには、おそらく `status` の異なる値を処理するためのロジックがあると思われます。以前のシステムでは、`EXPIRED`、`REFRESHED`、`NO_IDENTITY` などのさまざまなステータス値を扱うことができました。その代わり、新しいシステムには 3 つのイベントタイプしかありません: `SdkLoaded`、`InitCompleted`、`IdentityUpdated` です。

[Callback Function](#callback-function) のセクションを確認し、新しいシステムを使用してあなたの要求を実装するための最良の方法を検討する必要があります。しかし、参考になる一般的なガイドラインがいくつかあります:
- `event` パラメータをチェックしてください。値が `SdkLoaded` の場合は、すぐにリターンします。
- そうでなければ、`payload` パラメータに `identity` プロパティがあるかどうかを確認します。
  - `identity` プロパティにオブジェクトがない場合、UID2 ID は利用できません。同じような状況では、前のコールバックが行った処理を呼び出す必要があります。
  - そうでない場合、`identity` プロパティは `advertising_token` という名前の `string` プロパティを持つオブジェクトとなります。これは、以前のコールバックと同じように使用する必要があります。

古いコールバックを `init` 呼び出しから削除し、更新したコールバック関数を [Array Push Pattern](#array-push-pattern) を使用して SDK に提供します:

```
window.__uid2 = window.__uid2 || {};
window.__uid2.callbacks = window.__uid2.callbacks || [];
window.__uid2.callbacks.push(callbackFunction);
```

#### Take advantage of `setIdentity` and other new features

以前のバージョンの SDK では新しい ID を提供する方法は一つしかありませんでした: `init` の呼び出しです。このため、パブリッシャーによっては、ページのライフサイクルの後半で新しい ID を提供するために、さまざまな回避策を利用しなければなりませんでした。これらの回避策を取り除き、`init` が呼ばれた後に SDK に新しい ID を渡したい場合は `setIdentity` を呼び出すだけで、インテグレーションを簡素化できるかもしれません。

#### Change how you call init

`init` を呼び出すには、[Array Push Pattern](#array-push-pattern) を使用することを推奨します。既存の `init` 呼び出しは、次の例に示すように、`SdkLoaded` イベントのみを処理するコールバックハンドラ内に移動する必要があります:

```
window.__uid2 = window.__uid2 || {};
window.__uid2.callbacks = window.__uid2.callbacks || [];
window.__uid2.callbacks.push((eventType) => {
  // Each callback function you register with the SDK is invoked once with the `SdkLoaded` event type after the SDK has been loaded by the browser and is ready to use.
  if (eventType === 'SdkLoaded' {    
    __uid2.init({
      /* Provide the same options as in your previous code. If you're not using the legacy callback any more, remove it from here. */
    });
  })
});
```

### Optional Changes

#### Add `async` or `defer` to your script tag

`async` または `defer` スクリプトローディングを使用する場合は、SDK をロードするスクリプトタグをドキュメントヘッダに移動し、適切なキーワードを追加してください。

`async` または `defer` スクリプトローディングを使用するかどうかは、個々のウェブサイトに依存するため、UID2 チームがアドバイスを提供できるものではありません。よくわからない場合は、この変更を無視して script タグを変更しないままにしておくのが安全です。