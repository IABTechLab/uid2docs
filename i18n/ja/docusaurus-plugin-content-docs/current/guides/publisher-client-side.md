---
title: JavaScript Express Integration
sidebar_label: JavaScript Express
pagination_label: JavaScript Express Integration
description: Information about integrating with UID2 SDK for JavaScript as part of your UID2 implementation.
hide_table_of_contents: false
sidebar_position: 04
---

# JavaScript Express Integration Guide

This guide is for publishers who want to integrate with UID2 and generate [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) (advertising tokens) using only JavaScript client-side changes on their website with minimum effort.

このガイドは、UID2 対応のシングルサインオンや ID プロバイダーではなく、UID2 と直接インテグレーションしながら、RTB ビッドストリーム用に UID2 を使用して ID トークンを生成したいウェブアセットを持つパブリッシャーを対象としています。

- SDK の技術的な詳細については、[UID2 SDK for JavaScript Reference Guide](../sdks/client-side-identity.md) を参照してください。

- UID2 token generation
- Automatic refreshing of UID2 tokens
- Automatic storage of UID2 tokens in the browser

You'll need to complete the following steps:

1. [Complete UID2 account setup](#complete-uid2-account-setup)
2. [Add UID2 SDK For JavaScript to your site](#add-js-to-your-site)
3. [Configure the UID2 SDK for JavaScript](#configure-the-uid2-sdk-for-javascript)
4. [Check that the token was successfully generated](#check-that-the-token-was-successfully-generated)

## UID2 SDK for JavaScript Version

Support for client-side token generation is available in version 3.2 and above of the SDK. 

The URL for the SDK is:

- [https://cdn.prod.uidapi.com/uid2-sdk-3.2.0.js](https://cdn.prod.uidapi.com/uid2-sdk-3.2.0.js)

In the following code examples, the placeholder `{{ UID2_JS_SDK_URL }}` refers to this URL.

If you want to use a debug build of the SDK, use the following URL instead:

- [https://cdn.integ.uidapi.com/uid2-sdk-3.2.0.js](https://cdn.integ.uidapi.com/uid2-sdk-3.2.0.js)

## Sample Implementation Website

アプリケーションの例については、SDK v3 を使用した UID2 Google ESP の例を参照してください:
- Code and docs: [UID2 SDK ESP Integration Example](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-esp-integration/with_sdk_v3)
- 実行中のサイト: [Client-Side UID2 SDK Integration Example](https://esp-jssdk-integ.uidapi.com/)

## Complete UID2 Account Setup

このガイドでは、SDK を使用せずにインテグレーションを行う場合に考慮すべき基本的なステップの概要を説明します。例えば、ユーザーのログインとログアウトの実装方法、UID2 ID 情報の管理方法とターゲティング広告への使用方法、トークンのリフレッシュ方法、紛失した ID の処理方法、ユーザーのオプトアウトの処理方法などを決定する必要があります。

ワークフロー図は [Integration Steps](#integration-steps) を参照してください。[FAQ](#faqs) も参照してください。

UID2 を使用してクライアントの ID を確立し、Advertising Token を取得するプロセスを容易にするために、このガイドで提供する Web インテグレーション手順は、JavaScript 用の UID2 SDK に依存しています。このガイドで説明するインテグレーション手順と SDK の使用方法(現在はメールアドレスのみ)を示す [example application](https://example-jssdk-integ.uidapi.com/) を以下に示します。アプリケーションのドキュメントについては、[UID2 SDK Integration Example](https://github.com/IABTechLab/uid2-examples/blob/main/publisher/standard/README.md) を参照してください。

:::tip
first-party cookie とローカルストレージの実装の詳細は、将来変更される可能性があります。潜在的な問題を回避するため、ID 管理には [UID2 SDK for JavaScript API Reference](../sdks/client-side-identity.md#api-reference) に記載されている機能を使用するようにしてください。
:::

UID2 SDK for JavaScript を使用しないパブリッシャー向けのインテグレーションシナリオについては、[Publisher Integration Guide, Server-Only](custom-publisher-integration.md) を参照してください。

:::note
Google Ad Manager を使用していて、セキュアシグナル機能を使用したい場合は、まず本ガイドの手順に従い、次に [Google Ad Manager Secure Signals Integration Guide](google-ss-integration.md) の追加手順に従ってください。
:::

## Integration Steps 

以下の図は、ユーザーの UID2 Token をパブリッシャーと確立するために必要なステップと、UID2 Token が RTB ビッドストリームとどのようにインテグレーションされるかを概説しています。

![Publisher Flow](images/publisher-flow-mermaid.png)

以下のセクションでは、図中の各ステップについての詳細を説明します:
 
 1. [Establish identity: User Login](#establish-identity-user-login)
 2. [Bid Using UID2 Tokens](#bid-using-uid2-tokens)
 3. [Refresh Tokens](#refresh-tokens)
 4. [Clear Identity: User Logout](#clear-identity-user-logout)

### Establish Identity: User Login

Step 1-c で認証を行い、ユーザーに利用規約を受け入てもらい、パブリッシャーがユーザーのメールアドレスまたは電話番号を検証した後、Server-Side で UID2 Token を生成する必要があります。次の表は、トークン生成ステップの詳細です。

| Step | Endpoint/SDK                                                       | Description                                                                                                                                                                                                                                                                                                                                                        |
| :--- | :----------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1-d  | [POST /token/generate](../endpoints/post-token-generate.md)        | ユーザーが認証され、UID2 の作成が許可されたら、[POST /token/generate](../endpoints/post-token-generate.md) エンドポイントを使用して、ユーザーの正規化したメールアドレスまたは電話番号を使用して UID2 Token を生成します。正規化されていることを確認してください。 |
| 1-e  | [POST /token/generate](../endpoints/post-token-generate.md)        | エンドポイントは、ユーザーのメールアドレス、電話番号、またはそれぞれのハッシュから生成された UID2 Token を返します。 |
| 1-f  | UID2 SDK for JavaScript | SDKは、[init()関数](../sdks/client-side-identity.md#initopts-object-void) の `identity` プロパティで Step 1-e から返された UID2 Token を SDK に送信します。|
| 1-g | UID2 SDK for JavaScript | SDK から ID 更新を受け取り、ターゲティング広告を開始するために使用するコールバック関数を SDK に提供します。 |

<Tabs>
<TabItem value='js' label='JavaScript'>

```js
  window.__uid2 = window.__uid2 || {};
  window.__uid2.callbacks = window.__uid2.callbacks || [];

  // Step 1-f
  window.__uid2.callbacks.push((eventType, payload) => {
    if (eventType === 'SdkLoaded') {
      __uid2.init({
        identity : {
          "advertising_token": "AgmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b/besPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM+ewMzXXM8G9j8Q=",
          "refresh_token": "Mr2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq/90PYmajV0IPrvo51Biqh7/M+JOuhfBY8KGUn//GsmZr9nf+jIWMUO4diOA92kCTF69JdP71Ooo+yF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA==",
          "identity_expires": 1633643601000,
          "refresh_from": 1633643001000,
          "refresh_expires": 1636322000000,
          "refresh_response_key":"dYNTB20edyHJU9mZv11e3OBDlLTlS5Vb97iQVumc7b/8QY/DDxr6FrRfEB/D",
        }
      });
    }
  });

  // Step 1-g
  window.__uid2.callbacks.push((eventType, payload) => {
    if (eventType !== 'SdkLoaded') {
      if (payload.identity) {
        const advertisingToken = payload.identity.advertising_token;
        // Pass advertising_token to your advertising system to use
      } else {
        // No identity is available for targeted advertising - trigger a login flow if you want to use UID2 for targeted advertising
      }
    }
  });
```

</TabItem>
<TabItem value='ts' label='TypeScript'>

```tsx
  import { EventType, Uid2CallbackPayload } from "./uid2CallbackManager";

  window.__uid2 = window.__uid2 || {};
  window.__uid2.callbacks = window.__uid2.callbacks || [];

  // Step 1-f
  window.__uid2.callbacks.push((eventType: EventType, payload: Uid2CallbackPayload) => {
    if (eventType === 'SdkLoaded') {
      __uid2.init({
        identity : {
          "advertising_token": "AgmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b/besPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM+ewMzXXM8G9j8Q=",
          "refresh_token": "Mr2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq/90PYmajV0IPrvo51Biqh7/M+JOuhfBY8KGUn//GsmZr9nf+jIWMUO4diOA92kCTF69JdP71Ooo+yF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA==",
          "identity_expires": 1633643601000,
          "refresh_from": 1633643001000,
          "refresh_expires": 1636322000000,
          "refresh_response_key":"dYNTB20edyHJU9mZv11e3OBDlLTlS5Vb97iQVumc7b/8QY/DDxr6FrRfEB/D",
        }
      });
    }
  });

  // Step 1-g
  window.__uid2.callbacks.push((eventType: EventType, payload: Uid2CallbackPayload) => {
    if (eventType !== 'SdkLoaded') {
      if (payload.identity) {
        const advertisingToken = payload.identity.advertising_token;
        // Pass advertising_token to your advertising system to use
      } else {
        // No identity is available for targeted advertising - trigger a login flow if you want to use UID2 for targeted advertising
      }
    }
  });
```

</TabItem>
</Tabs>

SDK は、指定された [callback function](../sdks/client-side-identity.md#callback-function) (ID の可用性を示す) を呼び出し、確立された ID をクライアントサイドで入札可能な状態にします。

:::tip
コードの構造によっては、Step 1-f と 1-g のコールバックを 1 つのコールバック関数にまとめると便利かもしれません。
:::

### Bid Using UID2 Tokens

有効な ID のステータスと利用可能性に基づいて、SDK は以下を実行します:

1. バックグラウンドでのトークンの自動更新を設定します。
1. ID 情報を [local storage or a first-party cookie](../sdks/client-side-identity.md#uid2-storage-format) に格納します。
1. ID 情報を使用して、ターゲティング広告のリクエストを開始します。

<!-- (**GWH_TODO. Q: Not sure about the relationship between the steps above and the table below. And the diagram 2-a which says "the publisher calls the SSP for ads using the UID2 token". A: Diagram needs to be updated.**) -->

入札ステップを以下の表に示します。

| Step | Endpoint/SDK                                                       | Description                                                                                                                                          |
| :--- | :----------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2-a | UID2 SDK for JavaScript | 以下に示すように、[getAdvertisingToken() function](../sdks/client-side-identity.md#getadvertisingtoken-string) を使用して、現在のユーザーの Advertising Token を取得します。 |

>NOTE: UID2 Token が SSP から DSP に送信される際に、ビッドストリームでどのように見えるかの例については、[What does a UID2 token look like in the bid stream?](../getting-started/gs-faqs.md#what-does-a-uid2-token-look-like-in-the-bid-stream) を参照してください。

```html
<script>
 
// When the UID2 SDK is executed, it looks for these callbacks and invokes them.
window.__uid2 = window.__uid2 || {};
window.__uid2.callbacks = window.__uid2.callbacks || [];
window.__uid2.callbacks.push((eventType, payload) => {
  switch (eventType) {
    case "SdkLoaded":
      // The SdkLoaded event occurs just once.
      __uid2.init({});
      break;
 
    case "InitCompleted":
      // The InitCompleted event occurs just once.
      //
      // If there is a valid UID2 token, it is in payload.identity.
      break;
 
    case "IdentityUpdated":
      // The IdentityUpdated event happens when a UID2 token is generated or refreshed.
      // payload.identity contains the resulting latest identity.
      break;
  }
});
 
</script>
```

:::info
返された Advertising Token をどのように SSP に渡すかを検討する必要があります。`Prebid.js`（[Prebid Integration Guide](integration-prebid.md) を参照してください）や Google Ad Manager セキュアシグナル（[Google Ad Manager Secure Signals Integration Guide](google-ss-integration.md) を参照してください）を使用するなど、Client-Side で UID2 を実装する他のいくつかのアプローチでは、実装に、返された Advertising Token の受け渡しを管理する関数が含まれています。UID2 SDK for JavaScript を使用している場合は、これを自分で管理する必要があります。
:::

:::tip
`__uid2.getAdvertisingToken()` を呼び出す代わりに、Step 1-g で設定したコールバックに渡された ID の `advertising_token` プロパティを使用することができます。このコールバックは ID が変更されるたびに呼び出されます。
:::

## Example Integration Code and When to Pass DII to the UID2 SDK

初期化の一環として、SDK は ID の [token auto-refresh](../sdks/client-side-identity.md#background-token-auto-refresh) を設定します。これは、ID のタイムスタンプまたは断続的なエラーによるリフレッシュの失敗によってバックグラウンドでトリガーされます。

| Step | Endpoint/SDK | Description |
| :--- | :--- | :--- |
| 3-a | [UID2 SDK for JavaScript](../sdks/client-side-identity.md) | SDK はバックグラウンドで自動的に UID2 Token をリフレッシュします。手動で操作する必要はありません。 |
| 3-b | [UID2 SDK for JavaScript](../sdks/client-side-identity.md) | ユーザーがオプトアウトしていない場合、[POST /token/refresh](../endpoints/post-token-refresh.md) エンドポイントは自動的に新しい ID トークンを返します。 |

The following code snippet demonstrates how you might integrate with the UID2 SDK for JavaScript for the two scenarios above&#8212;starting with no token as well as reusing/refreshing any existing UID2 token if found. 

ユーザーがパブリッシャーのサイトからログアウトすると、クライアントのライフサイクルは完了します(UID2 ではありません)。これによってクライアントのアイデンティティセッションが閉じられ、first-party cookie の情報が消去されます。

| Step | Endpoint/SDK | Description |
| :--- | :--- | :--- |
| 4-a | N/A | ユーザーはパブリッシャーのアセットからログアウトします。 |
| 4-b | [UID2 SDK for JavaScript](../sdks/client-side-identity.md) | SDKは、以下に示すように、[disconnect() function](../sdks/client-side-identity.md#disconnect-void) を使用して、first-party cookie から UID2 ID をクリアし、クライアントのライフサイクルを切断します。 |

```html
<script>
 
// UID2 provides these configuration values to the publisher.
const clientSideConfig = {
  subscriptionId: "...",
  serverPublicKey: "...",
};
  
// Example of a base-64 encoded SHA-256 hash of an email address.
const emailHash = "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=";

// When the UID2 SDK is executed, it looks for these callbacks and invokes them.
window.__uid2 = window.__uid2 || {};
window.__uid2.callbacks = window.__uid2.callbacks || [];
window.__uid2.callbacks.push(async (eventType, payload) => {
  switch (eventType) {
    case "SdkLoaded":
      // The SdkLoaded event occurs just once.
      __uid2.init({});
      break;
 
    case "InitCompleted":
      // The InitCompleted event occurs just once.
      //
      // If there is a valid UID2 token, it is in payload.identity.
      if (payload.identity) {
        // Pass the UID2 token to Prebid.js.
        //
        // payload looks like this:
        // {
        //   "identity": {
        //     "advertising_token": "A4A...MqA",
        //     "refresh_token": "A3A...pdg==",
        //     "identity_expires": 1692257038260,
        //     "refresh_expires": 1692339838260,
        //     "refresh_from": 1692254338260
        //     "refresh_response_key": "z0v...zL0="
        //   }
        // }
        var advertising_token_to_use = payload.identity.advertising_token;
      } else {
          if (__uid2.isLoginRequired()) {
            // Call one of the setIdentityFrom functions to generate a new UID2 token.
            // Add any retry logic around this call as required.
            await __uid2.setIdentityFromEmailHash(
                emailHash,
                clientSideConfig
          );
          else {
            // there is a token generation API call in flight which triggers
            // a IdentityUpdated event 
          }
        }
      }
      break;
 
    case "IdentityUpdated":
      // The IdentityUpdated event happens when a UID2 token is generated or refreshed.
      // See previous comment for an example of how the payload looks.
      var advertising_token_to_use = payload.identity.advertising_token;
      break;
  }
});
 
</script>
```

## Check that the Token Was Successfully Generated

パブリッシャー向けのよくある質問については、[FAQs for Publishers](../getting-started/gs-faqs.md#faqs-for-publishers) を参照してください。
