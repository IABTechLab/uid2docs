---
title: Prebid Integration
sidebar_label: Prebid
pagination_label: Prebid Integration
description: UID2 実装のため、Prebid とのインテグレーションに関する情報。
hide_table_of_contents: false
sidebar_position: 04
---

# Prebid.js Express Integration Guide

This guide is for publishers who want to integrate with UID2 and generate [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) (advertising tokens) to be passed by Prebid.js in the RTB bid stream.

<!--
- [Introduction](#introduction)
- [UID2 Prebid Module Page](#uid2-prebid-module-page)
- [Integration Steps](#integration-steps)
- [Generate UID2 Token](#generate-uid2-token)
- [UID2 User ID Submodule](#uid2-user-id-submodule)
- [Client Refresh Mode](#client-refresh-mode)
  -  [Response Storage Options](#response-storage-options)
  -  [Client Refresh Cookie Example](#client-refresh-cookie-example)
  -  [Client Refresh uid2Token Example](#client-refresh-uid2token-example)
- [Storage of Internal Values](#storage-of-internal-values)
- [Sample Token](#sample-token)
- [Prebid Implementation Notes and Tips](#prebid-implementation-notes-and-tips)
- [Configuration Parameters for `usersync`](#usersync-configuration-parameters) -->

このガイドは、UID2 とインテグレーションし、RTB ビッドストリームで Prebid から渡される [UID2 Token](../ref-info/glossary-uid.md#gl-uid2-token)(Advertising Token) を生成したいパブリッシャー向けのものです。

UID2 との直接インテグレーションを行い、ヘッダービディングに Prebid を使用する場合に考慮すべき基本的なステップの概要を説明します。

- UID2 token generation
- Automatic refreshing of UID2 tokens
- Automatic storage of UID2 tokens in the browser
- Automatic passing of UID2 tokens to the bid stream

To integrate with UID2 using Prebid.js, you'll need to make changes to the HTML and JavaScript on your site. No server-side work is required if you follow this guide. If you want to generate tokens with a server-side API call, or are using a private operator, follow the [Prebid.js Advanced Integration Guide](./integration-prebid-advanced.md) instead.

You'll need to complete the following steps:

1. [Complete UID2 account setup](#complete-uid2-account-setup)
2. [Add Prebid.js to your site](#add-prebidjs-to-your-site)
3. [Configure the UID2 module](#configure-the-uid2-module)

Prebid と UID2 とのインテグレーションに関する情報は、こちらにあります:
- Prebid サイトの Prebid User ID サブモジュールの [Unified ID 2.0](https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html) ページ。
- Prebid の GitHub リポジトリの [UID2 User ID Submodule](https://github.com/prebid/Prebid.js/blob/master/modules/uid2IdSystem.md) ページ。

## Integration Steps

大まかには、Prebid を使って UID2 とインテグレーションするには、以下の手順を完了する必要があります。

| Step | Action | Link to Instructions |
| --- | --- | --- |
| 1 | UID2　Token を生成するために、サーバーサイド API を呼び出します。| [Generate UID2 Token](#generate-uid2-token) |
| 2 | レスポンス値を保存し、必要に応じて Prebid モジュールがトークンのリフレッシュとオプトアウトを管理できるようにします。 | [Client Refresh Mode](#client-refresh-mode) |

## Generate UID2 Token

UID2 では、初期トークンをサーバーサイドで生成する必要があります。これを行うには、[POST /token/generate](../endpoints/post-token-generate.md) エンドポイントを呼び出して新しい UID2 Token を生成します。

This implementation requires Prebid.js version 8.21.0 or later. For version information, see [https://github.com/prebid/Prebid.js/releases](https://github.com/prebid/Prebid.js/releases).

## Complete UID2 Account Setup

Complete the UID2 account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page. As part of the account setup process, you'll need to provide a list of domain names for the sites that you'll be using with Prebid.js.

When account setup is complete, you'll receive a **public key** and **subscription ID**. These values are unique to you, and you'll use them to configure the UID2 module.

該当するエンドポイントからの完全な JSON レスポンスボディを Prebid モジュールに提供する必要があります:

- 新しい UID2 Token を取得するには、[POST /token/generate](../endpoints/post-token-generate.md)。
- リフレッシュされた UID2 Token については、[POST /token/refresh](../endpoints/post-token-refresh.md)。

例については、[Sample Token](#sample-token) を参照してください。

Refresh Token が有効である限り、モジュールは必要に応じて UID2 Token をリフレッシュします。

### Response Storage Options

Client Refresh モードを使用するようにモジュールを構成する場合、API レスポンス情報を保存するための以下のオプションの **1つ** を選択する必要があります。

| Option | Details | Use Case | 
| --- | --- | --- |
| レスポンスボディを JSON 文字列として含むクッキーの名前を `params.uid2Cookie` に設定します。 | [Client Refresh Cookie Example](#client-refresh-cookie-example)　を参照してください。 | レスポンスボディを保存するのに十分な容量がクッキーに残っていることを確認しない限り、このオプションを選択しないでください。 |
| `params.uid2Token` を JavaScript オブジェクトとしてレスポンスボディに設定します。 | [Client Refresh uid2Token Example](#client-refresh-uid2token-example) を参照してください。 | 以下の様な場合は、レスポンスボディを `params.uid2Token` 経由で提供することもできます:<br/>- クッキーにレスポンスボディを保存すると、クッキーのサイズ制限を超える場合。<br/>- レスポンスボディの保存を自分で管理する柔軟性を持ちたい場合。 |

When you download the Prebid.js package, add the UID2 module by checking the box next to the module named **Unified ID 2.0**, listed under the section **User ID Modules**.

When you've added Prebid.js to your site and confirmed that it's working properly, you're ready to configure the UID2 module.

:::tip
To make sure that the UID2 module is installed, find the string `uid2IdSystem` in the [`pbjs.installedModules` array](https://docs.prebid.org/dev-docs/publisher-api-reference/installedModules.html).
:::

## Configure the UID2 Module

To configure the UID2 module, call `pbjs.setConfig` with an object containing the **public key** and **subscription ID** that you received during account setup, as well as the user's hashed or unhashed [DII](../ref-info/glossary-uid.md#gl-dii) (email address or phone number).

Once it's configured, the UID2 module generates a UID2 token for the user and stores it in the user's browser. The module automatically refreshes the token as required while your site is open in the user's browser.

You can pass the user's DII to the UID2 module either hashed or unhashed. If you pass the DII unhashed, the UID2 module hashes it for you. If want to pass the DII to the module already hashed, you must normalize it before hashing. For details, see [Normalization and Encoding](../getting-started/gs-normalization-encoding.md).

The UID2 module encrypts the hashed DII before sending it to the UID2 service.

You can configure the module to send any one of the four accepted DII formats, for any specific user. The DII format might vary per user but you can only send one value per user.

The following sections demonstrate the different ways that you can configure the UID2 module and list the requirements for the DII passed to the module:

- [Configure for Email Address](#configure-for-email-address)
- [Configure for Hashed Email Address](#configure-for-hashed-email-address)
- [Configure for Phone Number](#configure-for-phone-number)
- [Configure for Hashed Phone Number](#configure-for-hashed-phone-number)

If the module is configured multiples times, it uses the most recent configuration values.

:::note
The examples assume that you're using the UID2 production environment. During integration testing, use the UID2 integration environment by setting `params.uid2ApiBase` to `"https://operator-integ.uidapi.com"`. Tokens from the UID2 integration environment are not valid for passing to the bid stream. For the integration environment, you will have different **subscription ID** and **public key** values.
:::

### Configure for Email Address

Configure the UID2 module with an email address:

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

No normalization or hashing is required by the publisher.

The UID2 module normalizes and hashes the email address before sending the encrypted hash to the UID2 service.

### Configure for Hashed Email Address

Configure the UID2 module with a hashed email address:

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

**The publisher is responsible for normalizing and hashing the email address**. For details, see [Normalization and Encoding](../getting-started/gs-normalization-encoding.md).

The UID2 module encrypts the hash before sending it to the UID2 service.

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

**The publisher is responsible for normalizing the phone number**. For details, see [Phone Number Normalization](../getting-started/gs-normalization-encoding.md#phone-number-normalization).

The UID2 module hashes the phone number before sending the encrypted hash to the UID2 service.

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

**The publisher is responsible for normalizing and hashing the phone number**. For details, see [Normalization and Encoding](../getting-started/gs-normalization-encoding.md).

The UID2 module encrypts the hash before sending it to the UID2 service.

## Module Storage

By default, the UID2 module stores data using local storage. To use a cookie instead, set `params.storage` to `cookie`. For details, see the Prebid [Unified ID 2.0 Configuration](https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html#unified-id-20-configuration) module documentation.

## When to Pass DII to the UID2 Module

If possible, configure the UID2 module with the user's DII on each page load.

When the UID2 module is configured, it checks for an existing UID2 token in the user's browser. If there is an existing token that was generated from the same DII, and the token is still valid or can be refreshed, the module uses or refreshes the existing token instead of generating a new token.

If there is no existing token, or the token has expired and cannot be refreshed, the UID2 module cannot generate a new token without DII.

As a result, the recommended approach is to configure the UID2 module with the user's DII on each page load.

In some cases, the user's DII is not available on page load, and getting the DII has some associated cost. For example, an API call might be required to fetch the DII, or the user has to be prompted to provide the DII information.

You can potentially avoid that cost by checking for an existing token that you can use or refresh. To do this, check the value returned by `pbjs.getUserIds().uid2`:

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

To check that the UID2 module has successfully generated a UID2 token, call `pbjs.getUserIds().uid2`. If a value is returned, a token has been successfully generated.

If there are problems with the integration, here are some steps you can take:

- Check the browser console logs.
- Check that you're using the correct **subscription ID** and **public key**.
- Check that the domain name of the site was provided to UID2 during account setup.
- Use the browser developer tools to inspect the API calls to the UID2 service.

For additional help, refer to Prebid's documentation on [Troubleshooting Prebid.js](https://docs.prebid.org/troubleshooting/troubleshooting-guide.html) and [Debugging Prebid.js](https://docs.prebid.org/debugging/debugging.html).

## Optional: Reduce Latency by Setting the API Base URL

- UID Token が SSP から DSP に送信される際、ビッドストリームでどのように見えるかの例については、[What does a UID2 token look like in the bid stream?](../getting-started/gs-faqs.md#what-does-a-uid2-token-look-like-in-the-bid-stream) を参照してください。

## Configuration Parameters for `usersync`

To specify a different UID2 server when you're configuring the UID2 module, set the optional `params.uid2ApiBase` parameter, as shown in the following example:

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

For the list of possible base URLs, see [Environments](../getting-started/gs-environments.md).