---
title: Client-Side Integration Guide for JavaScript
sidebar_label: Client-Side Integration for JavaScript
pagination_label: Client-Side Integration Guide for JavaScript
description: Client-Side インテグレーションで SDK for JavaScript を使用する際の情報。
hide_table_of_contents: false
sidebar_position: 04
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import SnptIntegratingWithSSO from '../snippets/_snpt-integrating-with-sso.mdx';
import SnptPreparingEmailsAndPhoneNumbers from '../snippets/_snpt-preparing-emails-and-phone-numbers.mdx';

# Client-Side Integration Guide for JavaScript

<!-- The below segment is for UID2 only: not applicable for advertisers since EUID doesn't support sharing. -->
このガイドは、ウェブサイト上で JavaScript による変更のみを使用して、最小限の工数で UID2 とインテグレーションし、<Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 Token</Link> (Advertising Token) を生成したいすべての参加者を対象としています。

このアプローチは、以下の参加者タイプで使用されます:

- **パブリッシャー**: 特に、UID2 Token をビッドストリームに送信したいパブリッシャー向けのワークフローです。
- **広告主**および**データプロバイダー**: また、広告主やデータプロバイダーは、トラッキングピクセルに UID2 Token を追加するためにこれを使用します (詳細は [Tokenized Sharing in Pixels](sharing/sharing-tokenized-from-data-pixel.md) を参照)。

<!-- End of UID2-only section. -->
<!-- Begin EUID-only section. -->
<!-- This guide is for publishers who want to integrate with UID2 and generate EUID tokens (advertising tokens) using only JavaScript client-side changes on their website with minimum effort. -->
<!-- End of EUID-only section. -->

このガイドは、<Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link> を利用したいパブリッシャーや、Server-Side でトークンを生成したいパブリッシャーには適用されません。これらのパブリッシャーは、[Client-Server Integration Guide for JavaScript](integration-javascript-client-server.md) を参照してください。

UID2 は JavaScript 用の SDK (詳細は [SDK for JavaScript Reference Guide](../sdks/sdk-ref-javascript.md) を参照) を提供しており、以下の機能があります。

- UID2 Token の生成
- UID2 Token の自動リフレッシュ
- UID2 Token のブラウザへの自動保存

実装には、以下のステップを完了する必要があります:

1. [Complete UID2 account setup and configure account](#complete-uid2-account-setup-and-configure-account)
2. [Add SDK for JavaScript to your site](#add-sdk-for-javascript-to-your-site)
3. [Configure the SDK for JavaScript](#configure-the-sdk-for-javascript)
4. [Check that the token was successfully generated](#check-that-the-token-was-successfully-generated)

## SDK for JavaScript Version

Client-Side でのトークン生成は、SDK バージョン 3.4.5 以降でサポートされています。

SDK の URL は以下の通りです:

- [https://cdn.prod.uidapi.com/uid2-sdk-4.0.1.js](https://cdn.prod.uidapi.com/uid2-sdk-4.0.1.js)

以下のコードサンプルにおいて、プレースホルダー `{{ UID2_JS_SDK_URL }}` はこの URL を指します。

SDK のデバッグビルドを使用したい場合は、代わりに以下の URL を使用してください:

- [https://cdn.integ.uidapi.com/uid2-sdk-4.0.1.js](https://cdn.integ.uidapi.com/uid2-sdk-4.0.1.js)

## Integrating with Single Sign-On (SSO)

<SnptIntegratingWithSSO />

## Preparing DII for Processing

<SnptPreparingEmailsAndPhoneNumbers />

## Complete UID2 Account Setup and Configure Account

UID2 とインテグレーションするには、UID2 アカウントが必要です。まだアカウントを作成していない場合は、まず [Account Setup](../getting-started/gs-account-setup.md) ページの手順に従ってください。

アカウントの初期設定が完了すると、[UID2 Portal](../portal/portal-overview.md) へのアクセス手順とリンクが送られます。ポータルでは本番環境用の [credentials](../getting-started/gs-credentials.md) (認証情報) を作成したり、必要な追加値を設定したりできます。詳細は [Getting Started with the UID2 Portal](../portal/portal-getting-started.md) を参照してください。

Client-Side インテグレーションを行うには、UID2 Portal の [Client-Side Integration](../portal/client-side-integration.md) ページで以下の値を設定する必要があります:

- Subscription ID と Public Key: [Adding and Managing Key Pairs](../portal/client-side-integration.md#adding-and-managing-key-pairs) を参照してください。

- この SDK を使用するサイトの **ドメイン名** のリスト: [Adding and Managing Root-Level Domains](../portal/client-side-integration.md#adding-and-managing-root-level-domains) を参照してください。

- モバイルアプリ ID (該当する場合): [Adding and Managing Mobile App IDs](../portal/client-side-integration.md#adding-and-managing-mobile-app-ids) を参照してください。

<!-- (earlier instructions, no-portal, for EUID)
When account setup is complete, you'll receive a client keypair consisting of two values that identify you to the UID2 servers: Subscription ID and public key. These values are unique to you, and you'll use them to configure the UID2 module. For details, see [Subscription ID and Public Key](../getting-started/gs-credentials.md#subscription-id-and-public-key). 
-->

:::tip
アカウント設定に必要なのはルートレベルのドメインのみです。例えば、example.com、shop.example.com、example.org で JavaScript 用 SDK を使用する場合、ドメイン名 example.com と example.org のみを指定する必要があります。
:::

## Add SDK for JavaScript to Your Site

以下のコードスニペットは、ウェブサイトに追加する必要があるコードの概要です。また、SDKがトリガーする可能性のあるさまざまなイベントも示しています。

より詳細なコードスニペットについては、[Example Integration Code and When to Pass DII to the UID2 SDK](#example-integration-code-and-when-to-pass-dii-to-the-uid2-sdk) を参照してください。

`UID2_JS_SDK_URL` の値については、[SDK for JavaScript Version](#sdk-for-javascript-version) を参照してください。

```js
<script async src="{{ UID2_JS_SDK_URL }}"></script>
 
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

SDKの詳細については、[SDK for JavaScript Reference Guide](../sdks/sdk-ref-javascript.md) を参照してください。

### Using the UID2 Integration Environment

デフォルトでは、SDK は UID2 本番環境 `https://prod.uidapi.com` で動作するように設定されています。代わりに UID2 インテグレーション環境を使用したい場合 (認証情報については [Getting Your Credentials](../getting-started/gs-credentials.md#getting-your-credentials) を参照)、init の呼び出しで以下の URL を指定してください:

```js
__uid2.init({
  baseUrl: "https://operator-integ.uidapi.com",
});
```
:::note
UID2 インテグレーション環境のトークンは、<Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link> に渡すには無効です。インテグレーション環境では、異なる **Subscription ID** と **Public Key** の値を使用します。各環境の認証情報の取得については、[Getting Your Credentials](../getting-started/gs-credentials.md#getting-your-credentials) を参照してください。
:::

### Optional: Specifying the API Base URL to Reduce Latency

デフォルトでは、この SDK は米国の UID2 本番環境サーバーを呼び出します。

ユースケースに最適な URL の選択方法や有効なベース URL の完全なリストについては、[Environments](../getting-started/gs-environments.md) を参照してください。

デフォルトではない UID2 サーバーを指定するには、`init` 呼び出しで変更できます:

```js
__uid2.init({
  baseUrl: "https://global.prod.uidapi.com",
});
```

## Configure the SDK for JavaScript

UID2 は、Client-Side トークン生成機能を使用するために必要な以下の値をパブリッシャーに提供します:

* Subscription ID
* Public Key

パブリッシャーインテグレーション環境用に 1 セット、本番環境用に別のセットを用意します。

SDK を設定するには、アカウント設定時に受け取った **Public Key** と **Subscription ID**、およびユーザーのハッシュ化済みまたは未ハッシュの <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> (メールアドレスまたは電話番号) を含むオブジェクトを指定して、以下のメソッドのいずれかを呼び出します:

*  `__uid2.setIdentityFromEmail`
*  `__uid2.setIdentityFromEmailHash`
*  `__uid2.setIdentityFromPhone`
*  `__uid2.setIdentityFromPhoneHash`

:::important
`__uid2.setIdentityFromEmailHash` または `__uid2.setIdentityFromPhoneHash` の場合、`emailHash` または `PhoneHash` 引数は Base64 エンコードされた値である必要があります。詳細は [Email Address Hash Encoding](../getting-started/gs-normalization-encoding.md#email-address-hash-encoding) および [Phone Number Hash Encoding](../getting-started/gs-normalization-encoding.md#phone-number-hash-encoding) を参照してください。
:::

以下のセクションでは、各シナリオのコーディング例を示します。

設定が完了すると、UID2 SDK は以下を処理します:
- ユーザーの UID2 Token を生成します。
- トークンをユーザーのブラウザに保存します。
- サイトがユーザーのブラウザで開かれている間、必要に応じてトークンを自動的にリフレッシュします。

ユーザーの DII は、ハッシュ化済みまたは未ハッシュの状態で UID2 SDK に渡すことができます。未ハッシュの DII を渡した場合、UID2 SDK がハッシュ化を行います。すでにハッシュ化された DII を SDK に渡したい場合は、ハッシュ化の前に正規化を行う必要があります。詳細は [Normalization and Encoding](../getting-started/gs-normalization-encoding.md) を参照してください。

## Format Examples for DII

SDK は、ハッシュ化された DII を UID2 Service に送信する前に暗号化します。

特定のユーザーに対して、4 つの DII フォーマットのいずれかを使用して SDK を設定できます。DII フォーマットはユーザーによって異なる場合がありますが、ユーザーごとに送信できる値は 1 つだけです。

以下の例は、UID2 SDK を設定するさまざまな方法を示し、SDK に渡す DII の要件をリストアップしています:

- メールアドレス、未ハッシュ
- メールアドレス、正規化およびハッシュ化済み
- 電話番号、未ハッシュ
- 電話番号、正規化およびハッシュ化済み

SDKが複数回設定された場合、最新の設定値が使用されます。

JavaScript でメールアドレスと電話番号のハッシュを生成する方法の例については、[Example Code: Hashing and Base-64 Encoding](#example-code-hashing-and-base-64-encoding) を参照してください。

<Tabs>
<TabItem value='example_email_unhashed' label='Email, Unhashed'>

次の例は、メールアドレスを使用して UID2 SDK を設定します。

```js
await __uid2.setIdentityFromEmail(
    "test@example.com",
    {
        subscriptionId: subscriptionId,
        serverPublicKey: publicKey,
    }
);
```

このシナリオでは:

- パブリッシャーによる正規化やハッシュ化は必要ありません。
- UID2 SDK は、暗号化されたハッシュを UID2 Service に送信する前に、メールアドレスを正規化してハッシュ化します。

</TabItem>
<TabItem value='example_email_hash' label='Email, Normalized and Hashed'>

次の例は、ハッシュ化されたメールアドレスを使用して UID2 SDK を設定します。

```js
await __uid2.setIdentityFromEmailHash(
    'lz3+Rj7IV4X1+Vr1ujkG7tstkxwk5pgkqJ6mXbpOgTs=',
    {
        subscriptionId: subscriptionId,
        serverPublicKey: publicKey,
    }
);
```

このシナリオでは:
- **パブリッシャーはメールアドレスの正規化とハッシュ化を行う責任があります**。詳細は [Normalization and Encoding](../getting-started/gs-normalization-encoding.md) を参照してください。
- UID2 SDKは、UID2 Serviceに送信する前にハッシュを暗号化します。

</TabItem>
<TabItem value='example_phone_unhashed' label='Phone Number, Unhashed'>

次の例は、電話番号を使用して UID2 SDK を設定します。

```js
await __uid2.setIdentityFromPhone(
    '+12345678901',
    {
        subscriptionId: subscriptionId,
        serverPublicKey: publicKey,
    }
);
```
このシナリオでは:

- **パブリッシャーは電話番号を正規化する責任があります**。詳細は [Phone Number Normalization](../getting-started/gs-normalization-encoding.md#phone-number-normalization) を参照してください。
- UID2 SDK は、暗号化されたハッシュを UID2 Service に送信する前に電話番号をハッシュ化します。

</TabItem>
<TabItem value='example_phone_hash' label='Phone Number, Normalized and Hashed'>

次の例は、ハッシュ化された電話番号を使用して UID2 SDK を設定します。

```js
await __uid2.setIdentityFromPhoneHash(
    'EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=',
    {
        subscriptionId: subscriptionId,
        serverPublicKey: publicKey,
    }
);
```

このシナリオでは:
- **パブリッシャーは電話番号の正規化、ハッシュ化、および Base64 エンコードを行う責任があります**。詳細は [Normalization and Encoding](../getting-started/gs-normalization-encoding.md) を参照してください。
- UID2 SDKは、UID2 Serviceに送信する前にハッシュを暗号化します。

</TabItem>
</Tabs>

## Token Storage and Refresh

[Configure the SDK for JavaScript](#configure-the-sdk-for-javascript) に記載されているメソッドのいずれかを正常に呼び出すと、<Link href="../ref-info/glossary-uid#gl-identity">Identity</Link> が生成され、`UID2-sdk-identity` というキーでローカルストレージに保存されます。SDK は UID2 Token を定期的にリフレッシュします。

:::warning
ローカルストレージに保存されるオブジェクトの形式は予告なく変更される可能性があります。ローカルストレージ内のオブジェクトを直接読み取ったり更新したり**しない**ことを推奨します。
:::

## Example Integration Code and When to Pass DII to the UID2 SDK

パブリッシャーであり、これが <Link href="../ref-info/glossary-uid#gl-identity">Identity</Link> のない最初のページロードである場合、トークン生成呼び出しを開始するには、DII を使用して `setIdentity` メソッドのいずれかを呼び出す必要があります。Identity が生成されると、SDK からの `IdentityUpdated` イベントを待つことで、ビッドストリームに送信する Advertising Token (<Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 Token</Link>) を利用できるようになります。例として、以下のコードスニペットで `advertising_token_to_use` の値がどのように設定されるかを確認してください。

場合によっては、ページロード時にユーザーの DII が利用できず、DII の取得にコストがかかることがあります。たとえば、DII を取得するために API コールが必要だったり、ユーザーに入力を求める必要があったりする場合です。

既存の使用可能またはリフレッシュ可能なトークンを確認することで、そのコストを回避できる可能性があります。これを行うには、
ブール値を返す [__uid2.isLoginRequired](../sdks/sdk-ref-javascript#isloginrequired-boolean) を呼び出します。これが `true` を返す場合、UID2 SDK は既存のリソースで新しい Advertising Token を作成できず、まったく新しい UID2 Token を生成するために DII が必要であることを意味します。

DII を提供しても、[__uid2.isLoginRequired](../sdks/sdk-ref-javascript#isloginrequired-boolean) が `false` を返す可能性があります。これは、ユーザーが UID2 からオプトアウトしている場合に発生します。JavaScript 用 UID2 SDK はユーザーのオプトアウトを尊重し、同じ DII で `setIdentity` メソッドを再度呼び出したとしても、UID2 Token を生成しません。任意で、そのような呼び出しを繰り返し行わないようにすることもできます。

以下のコードスニペットは、これら 2 つのシナリオ（トークンなしで開始する場合と、既存の UID2 Token を再利用/リフレッシュする場合）で JavaScript 用 UID2 SDK とインテグレーションする方法を示しています。

```js
<script async src="{{ UID2_JS_SDK_URL }}"></script>
 
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
      if (payload?.identity) {
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
                clientSideConfig);
          }  
          else {
            // there is a token generation API call in flight which triggers a IdentityUpdated event 
            // or no token would be generated because one of previous `setIdentity` calls determines the DII has opted out.
          }
      }
      break;
 
    case "IdentityUpdated":
      // The IdentityUpdated event happens when a UID2 token is generated or refreshed.
      // See previous comment for an example of how the payload looks.
      // It's possible that payload/identity objects could be null for reasons such as the token
      // expired and cannot be refreshed, or the user opted out of UID2. 
      // Check that the advertising token exists before using it.
      if (payload?.identity?.advertising_token) {
          var advertising_token_to_use = payload.identity.advertising_token;
      }
      break;
  }
});
 
</script>
```

## Check that the Token Was Successfully Generated

トークンが正常に生成されたことを確認するには、ブラウザのデベロッパーツールを使用してローカルストレージ内のトークンを探します。

![Publisher Workflow](images/TokenDebugger-uid2.png)

トークンの生成に問題があった場合は、**Network** タブでリクエストを探してください。文字列 `client-generate` でフィルタリングしてリクエストを見つけることができます。リクエストが失敗した理由に関する情報は、レスポンスに含まれているはずです。

![Publisher Workflow](images/NetworkTraffic.png)

## Example Code: Hashing and Base-64 Encoding

以下のコード例は、JavaScript でメールアドレスと電話番号のハッシュを生成する方法を示しています。

```js
async function hash(value) {
  const hash = await window.crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value)
  );
  return bytesToBase64(new Uint8Array(hash));
}
 
function bytesToBase64(bytes) {
  const binString = Array.from(bytes, (x) => String.fromCodePoint(x)).join("");
  return btoa(binString);
}
```

## Sample Implementation

JavaScript 用 UID2 SDK を使用した Client-Side インテグレーションの実装サンプルが利用可能です:

- Site: [Client-Side UID2 Integration Example using JavaScript SDK](https://js-client-side.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/javascript-sdk/client-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/javascript-sdk/client-side)
