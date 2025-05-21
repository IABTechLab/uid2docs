---
title: UID2 Mobile Integration Overview for Android and iOS
sidebar_label: Integration Overview for Mobile
pagination_label: Mobile Integration Overview for Android and iOS
description: UID2 モバイルインテグレーションオプションの概要。
hide_table_of_contents: false
sidebar_position: 04
displayed_sidebar: sidebarPublishers
---

import Link from '@docusaurus/Link';
import IntegratingWithSSO from '../snippets/_integrating-with-sso.mdx';

# UID2 Mobile Integration Overview for Android and iOS

このガイドは、SDK for Android または SDK for iOS を使用して UID2 とインテグレーションしたいモバイルアプリのパブリッシャー向けのインテグレーションオプションの概要です。

:::note
このガイドの、**UID2 mobile SDKs** は、SDK for Android と SDK for iOS の両方を含むグループ用語です。
:::

## Introduction 

UID2 は、Android/iOS 向けの SDK を提供しており、次の機能をサポートしています:

- UID2 Token の生成
- UID2 Token のリフレッシュ
- UID2 Token の保存

さらに、UID2 は、一部の機能に対して代替手段を提供し、UID2 Google GMA/IMA プラグインなどの補完製品も提供しています。利用可能なオプションについては、個々のガイドで説明されています: [Integration Overview: High-Level Steps](#integration-overview-high-level-steps) を参照してください。

## Integrating with Single Sign-On (SSO)

<IntegratingWithSSO />

## Integration Overview: High-Level Steps

UID2 mobile SDK を使用してモバイルアプリを UID2 とインテグレーションするには、次の手順を完了する必要があります:

1. UID2 アカウントのセットアップを完了します。

1. Client-Server インテグレーションのみ: Server-Side でのトークン生成をインテグレーションします。

1. SDK for Android または iOS をモバイルアプリにインテグレーションします。

1. SDK を構成します。

1. トークンが正常に生成されたことを確認し、<Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>で使用するためにトークンを渡します。

1. オプションで、[Google GMA SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) および [Google IMA SDK](https://developers.google.com/interactive-media-ads/) とのインテグレーションに UID2 GMA/IMA プラグインを構成します。

詳細は、次のガイドを参照してください:

- [Client-Side Integration Guide for Mobile](integration-mobile-client-side.md)
- [Client-Server Integration Guide for Mobile](integration-mobile-client-server.md)
- [Server-Side Integration Guide for Mobile](integration-mobile-server-side.md)

## Mobile Integration Paths

モバイルシナリオに最適なインテグレーションパスを決定するには、次の点を考慮してください:

1. UID2 Token を Client-Side または Server-Side で取得しますか？ [Client-Side, Client-Server, or Server-Side Integration?](#client-side-client-server-or-server-side-integration) を参照してください。

1. UID2 Token の取得とリフレッシュ何を使いますか？ [Generating, Storing, and Refreshing the UID2 Token](#generating-storing-and-refreshing-the-uid2-token) を参照してください。

1. UID2 Token をどのように使いたいですか？ [Sending the Token to the Bidstream](#sending-the-token-to-the-bidstream) を参照してください。

## Complete UID2 Account Setup and Configure Account

UID2 とインテグレーションんするには、UID2 アカウントが必要です。アカウントを作成していない場合は、まず [Account Setup](../getting-started/gs-account-setup.md) ページの手順に従ってください。

アカウントのセットアップが完了すると、[UID2 Portal](../portal/portal-overview.md) にアクセスするためのリンクと手順が送信されます。ここで、本番環境用の [credentials](../getting-started/gs-credentials.md) を作成し、必要に応じて追加の値を設定できます。詳細は、[Getting Started with the UID2 Portal](../portal/portal-getting-started.md) を参照してください。

UID2 Portal での手順は、実装が Client-Side、Client-Server、または Server-Side であるかによって異なります。各インテグレーションガイドに具体的な手順が記載されています。概要は、[Client-Side, Client-Server, or Server-Side Integration?](#client-side-client-server-or-server-side-integration) を参照してください。

### Client-Side, Client-Server, or Server-Side Integration?

UID2 mobile SDK を使用して UID2 とインテグレーションするためのオプションは、次の表にまとめられています。最適な <Link href="../ref-info/glossary-uid#gl-integration-approaches">Integration approach</Link> を選択してください。

詳細は、[Integration Approaches](../ref-info/ref-integration-approaches.md) を参照してください。

| Scenario | Option | Integration Guide |
| :--- | :--- | :--- |
| Client Side/モバイルアプリ内で <Link href="../ref-info/glossary-uid#gl-dii">DII</Link>（メールアドレスまたは電話番号）にアクセス可能であり、変更内容をアプリ内のみで保持したい。 | Client-Side integration | [UID2 Client-Side Integration Guide for Mobile](integration-mobile-client-side.md) |
| You have access to DII on the server side only and can do the necessary development to generate UID2 tokens server-side, but you want to refresh tokens on the client side&#8212;or you are using a <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link>. | Client-Server Integration | [UID2 Client-Server Integration Guide for Mobile](integration-mobile-client-server.md) |
| You have access to DII on the server side only and can do the necessary development to generate UID2 tokens server-side, or you are using a <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link>. | Server-Side Integration | [UID2 Server-Side Integration Guide for Mobile](integration-mobile-server-side.md) |

### Generating, Storing, and Refreshing the UID2 Token

以下の表は、UID2 Token の生成、保存、リフレッシュを管理するためのモバイルインテグレーションオプションをまとめたものです。各オプションのドキュメントへのリンクが含まれています。

<table>
  <thead>
    <tr>
      <th>UID2 Mobile Implementation Option</th>
      <th>SDK Doc</th>
      <th>Implementation Guide</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>UID2 Android SDK</td>
      <td>[SDK for Android Reference Guide](../sdks/sdk-ref-android.md)</td>
      <td>以下のいずれか:<ul><li>[UID2 Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md)</li><li>[UID2 Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md)</li></ul></td>
    </tr>
    <tr>
      <td>UID2 iOS SDK</td>
      <td>[SDK for iOS Reference Guide](../sdks/sdk-ref-ios.md)</td>
      <td>以下のいずれか:<ul><li>[UID2 Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md)</li><li>[UID2 Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md)</li></ul></td>
    </tr>
  </tbody>
</table>

### Sending the Token to the Bidstream

UID2 Token をビッドストリームに送信する方法はいくつかあります。

以下の表は、UID2 がサポートするオプションをまとめたものです。

| Scenario | Integration Guide |
| :--- | :--- |
| Google GMAを使用して、動画、バナー、インタースティシャル、ネイティブ広告を Android アプリにインテグレーションしたい | 以下の順番で:<ol><li>[UID2 GMA Plugin for Android Integration Guide](../guides/mobile-plugin-gma-android.md)</li><li>以下のいずれか:<ul><li>Client-side: [Optional: UID2 GMA/IMA Plugin for GAM Secure Signals integration](../guides/integration-mobile-client-side.md#optional-uid2-gmaima-plugin-for-gam-secure-signals-integration)</li><li>Client-server: [Optional: UID2 GMA/IMA Plugin for GAM Secure Signals integration](../guides/integration-mobile-client-server.md#optional-uid2-gmaima-plugin-for-gam-secure-signals-integration)</li></ul></li></ol> |
| Google GMAを使用して、動画、バナー、インタースティシャル、ネイティブ広告を iOS アプリにインテグレーションしたい | 以下の順番で:<ol><li>[UID2 GMA Plugin for iOS Integration Guide](../guides/mobile-plugin-gma-ios.md)</li><li>以下のいずれか:<ul><li>Client-side: [Optional: UID2 GMA/IMA Plugin for GAM Secure Signals integration](../guides/integration-mobile-client-side.md#optional-uid2-gmaima-plugin-for-gam-secure-signals-integration)</li><li>Client-server: [Optional: UID2 GMA/IMA Plugin for GAM Secure Signals integration](../guides/integration-mobile-client-server.md#optional-uid2-gmaima-plugin-for-gam-secure-signals-integration)</li></ul></li></ol> |
| Google IMA を使用して、Android アプリにマルチメディア広告をインテグレーションしたい | 以下の順番で:<ol><li>[UID2 IMA Plugin for Android Integration Guide](../guides/mobile-plugin-ima-android.md)</li><li>以下のいずれか:<ul><li>Client-side: [Optional: UID2 GMA/IMA Plugin for GAM Secure Signals integration](../guides/integration-mobile-client-side.md#optional-uid2-gmaima-plugin-for-gam-secure-signals-integration)</li><li>Client-server: [Optional: UID2 GMA/IMA Plugin for GAM Secure Signals integration](../guides/integration-mobile-client-server.md#optional-uid2-gmaima-plugin-for-gam-secure-signals-integration)</li></ul></li></ol> |
| Google IMA を使用して、iOS アプリにマルチメディア広告をインテグレーションしたい | 以下の順番で:<ol><li>[UID2 IMA Plugin for iOS Integration Guide](../guides/mobile-plugin-ima-ios.md)</li><li>以下のいずれか:<ul><li>Client-side: [Optional: UID2 GMA/IMA Plugin for GAM Secure Signals integration](../guides/integration-mobile-client-side.md#optional-uid2-gmaima-plugin-for-gam-secure-signals-integration)</li><li>Client-server: [Optional: UID2 GMA/IMA Plugin for GAM Secure Signals integration](../guides/integration-mobile-client-server.md#optional-uid2-gmaima-plugin-for-gam-secure-signals-integration)</li></ul></li></ol> |
| Prebid Mobile SDK と Prebid Server を使用して、Android または iOS アプリから広告リクエストを送信したい | 以下のいずれか:<ul><li>Client-side: [Optional: UID2 Integration with Prebid Mobile SDK](../guides/integration-mobile-client-side.md#optional-uid2-integration-with-prebid-mobile-sdk)</li><li>Client-server: [Optional: UID2 Integration with Prebid Mobile SDK](../guides/integration-mobile-client-server.md#optional-uid2-integration-with-prebid-mobile-sdk)</li></ul> |

### Functionality Summary

以下の表は、さまざまなインテグレーションオプションで利用可能な機能をまとめたものです。

すべてのオプションは、Client-Side または Server-Side インテグレーションをサポートしています。

| Implementation Option | Generate Token from DII | Refresh Token | Android/iOS? | Send Token to Bidstream |
| :--- | :--- | :--- | :--- | :--- |
| UID2 SDK for Android | &#9989; | &#9989; | Android | &ast; |
| UID2 SDK for iOS | &#9989;| &#9989; | iOS | &ast; |
| GMA Plugin for Android<br/>(Requires UID2 SDK for Android) | &#8212; | &#8212; | Android | &#9989;&ast;&ast; |
| GMA Plugin for iOS<br/>(Requires UID2 SDK for iOS) | &#8212; | &#8212; | iOS | &#9989;&ast;&ast; |
| IMA Plugin for Android <br/>(Requires UID2 SDK for Android)| &#8212; | &#8212; | Android | &#9989;&ast;&ast; |
| IMA Plugin for iOS<br/>(Requires UID2 SDK for iOS)| &#8212; | &#8212; | iOS | &#9989;&ast;&ast; |
| UID2 Integration with Prebid Mobile SDK | &#8212; | &#8212; | Either | &#9989;&ast;&ast;&ast; |

&ast;SDK を IMA/GMA プラグインまたは Prebid Mobile SDK と組み合わせて、Google または Prebid Server を介してトークンをビッドストリームに送信するか、SDK からトークンを手動で取得して別の方法でビッドストリームに渡すことができます。

&ast;&ast;セットアップ後、Google GMA/IMA はトークンを自動的に収集し、ビッドストリームに送信します。

&ast;&ast;&ast;セットアップ後、Prebid Mobile SDK はトークンを広告リクエストに追加して Prebid Server に送信します。

<!-- &#9989; = Supported | &#8212; = Not Supported -->

## FAQs for Mobile Integrations

UID2 モバイルインテグレーションに関する FAQ 情報は次のとおりです:

- [iOS: Swift Package Manager と CocoaPods/Podspec を併用できますか？](#ios-can-i-use-swift-package-manager-and-cocoapodspodspec-together)

#### iOS: Can I use Swift Package Manager and CocoaPods/Podspec together?
iOS: Swift Package Manager と CocoaPods/Podspec を併用できますか？

UID2 Mobile インテグレーションには、UID2 Mobile SDK、UID2 GMA プラグイン、UID2 IMA プラグインを Swift Package Manager または CocoaPods でインストールできます。

推奨事項:

- すでに CocoaPods を使用している場合、特に Google Ad Frameworks を自分でインテグレーションしている場合は、UID2 SDK を CocoaPods を使用してインテグレーションすることが最適です。
- 依存関係のインテグレーションが初めての場合、または Swift Package Manager ですでに依存関係がある場合は、UID2 モバイルインテグレーションには Swift Package Manager を使用することを勧めます。


:::caution
すでに CocoaPods を使用している場合、UID2 SDK とプラグインを Swift Package Manager (SPM) を使用してインテグレーションしても、アプリが UID2 SDK とプラグインを使用することを妨げるものではありません。ただし、潜在的な競合があります。すでに CocoaPods で GMA をインストールしている場合、その後 UID2 Mobile SDK を Swift Package Manager でインストールすると、実装に GMA の 2 つのコピーが含まれるため、動作しません。
:::

したがって、すでに GMA をインストールしていて UID2 をインストールする場合は、まず CocoaPods から GMA を削除してください。

:::tip
Podspec は、CocoaPods 内のファイル名で、アプリにインテグレーションするライブラリを定義するものです。
:::

## Troubleshooting Tips for Mobile Integrations

UID2 モバイルインテグレーションのトラブルシューティングに役立つ追加情報です:

- [Android SDK が本番環境に接続できない](#android-sdk-cannot-connect-in-production-environment)

#### Android SDK Cannot Connect in Production Environment
Android SDK が本番環境に接続できない

トラブルシューティングの最初のステップは、ヘルスチェックエンドポイントを確認することです。

モバイルデバイスまたは Android エミュレータから、このエンドポイントに到達できるかどうかを確認してください:

```
https://prod.uidapi.com/ops/healthcheck
```

レスポンスは `OK` である必要があります。

エラーレスポンスは、アプリが UID2 エンドポイントに到達できないネットワークの問題を示す場合があります。たとえば:

- `Caused by java.net.UnknownHostException: Unable to resolve host "prod.uidapi.com": No address associated with hostname`

   SDK はバックグラウンドで UID2 Token をリフレッシュしようとします。IOException などのエラーが発生した場合、SDK は複数回リトライします。リトライが成功しない場合、この例外が表示されます。

ログを有効にすると、別のトラブルシューティングステップが可能になります。詳細は、[Enable Logging](integration-mobile-client-side.md#enable-logging) を参照してください。
