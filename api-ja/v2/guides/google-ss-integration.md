[UID2 Overview](../../../README.md) > [Getting Started](../../README.md) > [v2](../README.md) > [Integration Guides](README.md) > Google Ad Manager Secure Signals Integration Guide

# Google Ad Manager Secure Signals Integration Guide

This guide covers integration steps for publishers using UID2 with the Google Ad Manager **secure signals** feature (previously known as **encrypted signals from publishers**, ESP). It includes the following sections:

このガイドでは、UID2 を使用しているパブリッシャーが Google Ad Manager の**secure signals**機能（旧称：**encrypted signals from publishers**、ESP）を使用する際のインテグレーション手順について説明します。以下のセクションで構成されています。

- [Overview](#overview)
- [Allow Secure Signal Sharing](#allow-secure-signal-sharing)
- [Publisher Integrations](#publisher-integration)
- [Server-Only Integration](#server-only-integration)
- [UID2 SDK Integration](#uid2-sdk-integration)
<!--* [Sample Applications](#sample-applications)-->

> NOTE: To use the UID2 Google Ad Manager secure signals integration, if you are using an SDK you must have your UID2 integration already set up. This does not apply if you are using server-only integration. For a summary of all the integration options available, see [UID2 Integration Guides](README.md).

> NOTE: UID2 Google Ad Manager セキュアシグナルインテグレーションを使用するには、SDK を使用している場合、UID2 インテグレーションがすでに設定されている必要があります。サーバーのみのインテグレーションを使用している場合は、この限りではありません。使用可能なすべてのインテグレーションオプションの概要については、[UID2 Integration Guides](README.md)を参照してください。

## Overview

Google secure signals is a way for publishers to pass "encrypted" user IDs to bidders that are approved by Google, via [Google Ad Manager](https://admanager.google.com/home/) and the [Google Ad Manager Ad Exchange (Adx)](https://support.google.com/admanager/answer/6321605?hl=en). The framework is an optional part of the Google Publisher Tag (GPT) library commonly used by publishers.

Google secure signals は、パブリッシャーが [Google Ad Manager](https://admanager.google.com/home/) と [Google Ad Manager Ad Exchange (Adx)](https://support.google.com/admanager/answer/6321605?hl=ja) を通じて、Google が承認したビッダーに対して「暗号化」したユーザー ID を渡すための方法です。このフレームワークは、パブリッシャーが一般的に使用する Google Publisher Tag (GPT)ライブラリのオプションパーツとして提供されています。

With this framework, the following steps occur:

このフレームワークでは、次のようなステップを踏みます:

1. Publishers push user ID signals (advertising tokens) to the secure signals feature.
2. The secure signals feature caches them on the client side and then transparently passes them to Google Ad Manager.
3. Google Ad Manager uses the UID2 tokens to make bid requests -- forwarding the tokens to approved bidders within Google Adx based on the publisher's preferences.

（ナンバリングの確認が必要）

1. パブリッシャーは、ユーザー ID シグナル（advertising token）をセキュアシグナル機能にプッシュします。
2. セキュアシグナル機能は、クライアント側でそれらをキャッシュし、Google Ad Manager に透過的に渡します。
3. Google Ad Manager は UID2 Token を使って入札リクエストを行い、パブリッシャーの設定に基づき Google Adx 内の承認済み入札者にトークンを転送します。

## Allow Secure Signal Sharing

For your Google Ad Manager account to be eligible to receive encrypted UID tokens, you must make sure that encrypted signals are properly shared with third-party bidders on your Google Ad Manager account.

Google Ad Manager アカウントで暗号化 UID トークンを受け取るには、暗号化されたシグナルが Google Ad Manager アカウントで第三者の入札者と適切に共有されていることを確認する必要があります。

For details, see [Share encrypted signals with bidders](https://support.google.com/admanager/answer/10488752) (Google reference documentation) and then follow the steps in [Use a third-party signal provider](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/securesignals) to switch on UID2 as your signal provider.

詳しくは、[セキュア シグナルをビッダーと共有する](https://support.google.com/admanager/answer/10488752) (Google reference documentation) を確認し、[サードパーティのシグナルプロバイダーを使用する](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/securesignals) の手順に従って、シグナルプロバイダーとして UID2 をオンに設定してください。

## Publisher Integration

When an encrypted signal is cached, the secure signals feature does not execute the handler to generate a new signal. Because of this, it is necessary to clear the cache before login and after logout.

暗号化されたシグナルがキャッシュされると、セキュアシグナル機能は、新しいシグナルを生成するためのハンドラを実行しません。このため、ログイン前とログアウト後にキャッシュをクリアする必要があります。

Since the secure signals feature does not provide a way to delete or invalidate a specific ID, publishers must call the `window.googletag.secureSignalProviders.clearAllCache()` function to clear all shared encrypted signals as part of their login/logout workflows.

セキュアシグナル機能は特定の ID を削除したり無効にしたりする方法を提供しないので、パブリッシャーはログイン/ログアウトのワークフローの一部として、`window.googletag.secureSignalProviders.clearAllCache()` 関数を呼び出して、共有された暗号化シグナルすべてをクリアしなければなりません。

The following is an example of calling the `window.googletag.secureSignalProviders.clearAllCache()` function:

以下は `window.googletag.secureSignalProviders.clearAllCache()` 関数の呼び出しの例です:

```
window.googletag = window.googletag || { cmd: [] };
window.googletag.cmd.push(function () {
  window.googletag.secureSignalProviders =
    window.googletag.secureSignalProviders || [];
  window.googletag.secureSignalProviders.clearAllCache();
});
```

### Server-Only Integration

So that it can share encrypted signals, the hosted auto-loaded secure signals script must be able to make an asynchronous call to the `window.getUid2AdvertisingToken` function and, in response, receive `advertising_token` as a string.

暗号化されたシグナルを共有できるように、ホストされ、自動ロードされたセキュアシグナルスクリプトは `window.getUid2AdvertisingToken` 関数を非同期に呼び出し、その応答として `advertising_token` を文字列として受け取れるようにしなければなりません。

It's important to make sure that the identity token is fresh. For a server-side integration, we recommend making a call to the [POST /token/refresh](../endpoints/post-token-refresh.md#post-tokenrefresh) endpoint to get a fresh [advertising token](../endpoints/post-token-refresh.md#decrypted-json-response-format) from the JSON response.

ID トークンがフレッシュであることを確認することが重要です。サーバーサイドのインテグレーションでは、[POST /token/refresh](../endpoints/post-token-refresh.md#post-tokenrefresh) というエンドポイントを呼び出し、JSON レスポンスから新しい [advertising token](../endpoints/post-token-refresh.md#decrypted-json-response-format) を取得することが推奨されます。

The following code is an example of how you could do this.

次のコードは、その例です。

```
window.getUid2AdvertisingToken = async () => {
  // Make a call to get a fresh identity token which could last for at least 12 hours.
  const identity = await getFreshIdentity()
  return JSON.parse(decodeURIComponent(identity)).advertising_token
}
```

For details, see [Server-Only UID2 Integration Guide](custom-publisher-integration.md).

詳しくは、[Server-Only UID2 Integration Guide](custom-publisher-integration.md) を参照してください。

<!--A sample application is also available for server-only integration. See [Sample Applications](#sample-applications).-->

### UID2 SDK Integration

If you're using the UID2 Client-Side Identity JavaScript SDK version 3.0.0 or later, the UID2 secure signals script uses the `getAdvertisingTokenAsync` function provided in the SDK to get the fresh advertising token, and then pushes the token to Google Ad Manager.

UID2 Client-Side Identity JavaScript SDK バージョン 3.0.0 以降を使用している場合、UID2 セキュアシグナルスクリプトは、SDK で提供される `getAdvertisingTokenAsync` 関数を使用して新しい Advertising Token を取得し、Google Ad Manager にそのトークンをプッシュします。

This script is hosted on CDN, and GPT automatically loads it with the secure signals feature.

このスクリプトは CDN でホストされており、GPT はセキュアシグナル機能で自動的にロードします。

For details, see [UID2 SDK Integration Guide](publisher-client-side.md).

詳しくは、 [UID2 SDK Integration Guide](publisher-client-side.md) を参照してください。

<!--A sample application is also available for client-side integration using the SDK. See [Sample Applications](#sample-applications).-->

<!--## Sample Applications

The following sample applications are available to illustrate how to integrate with the Google Ad Manager secure signals feature:
- Server-only integration: {link to come xxx}
- UID2 SDK integration: {link to come xxx}

Each sample application has its own instructions. -->
