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

# UID2 Mobile Integration Overview for Android and iOS

このガイドは、SDK for Android または SDK for iOS を使用して UID2 と統合したいモバイルアプリのパブリッシャー向けのインテグレーションオプションの概要です。

:::note
このガイドの、**UID2 mobile SDKs** は、SDK for Android と SDK for iOS の両方を含むグループ用語です。
:::

## Introduction 

UID2 は、Android/iOS 向けの SDK を提供しており、次の機能をサポートしています:

- UID2 Token の生成
- UID2 Token のリフレッシュ
- UID2 Token の保存

さらに、UID2 は、一部の機能に対して代替手段を提供し、UID2 Google GMA/IMA プラグインなどの補完製品も提供しています。利用可能なオプションについては、個々のガイドで説明されています: [Integration Overview: High-Level Steps](#integration-overview-high-level-steps) を参照してください。

## Client-Side or Client-Server Integration

UID2 mobile SDK を使用して UID2 とインテグレーションするオプションは、次の表にまとめられています。最適なオプションを選択してください。

| Scenario | Option | Integration Guide |
| :--- | :--- | :--- |
| Client Side/モバイルアプリ内で <Link href="../ref-info/glossary-uid#gl-dii">DII</Link>（メールアドレスまたは電話番号）にアクセスでき、変更をアプリ内だけに留めておきたい場合。 | Client-side integration | [UID2 Client-Side Integration Guide for Mobile](integration-mobile-client-side.md) |
| Server-Side でのみ DII にアクセスでき、Server-Side で UID2 Token を生成するために必要な開発ができるか、<Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link>を使用している場合。 | Client-Server Integration | [UID2 Client-Server Integration Guide for Mobile](integration-mobile-client-server.md) |

## Integration Overview: High-Level Steps

UID2 mobile SDK を使用してモバイルアプリを UID2 とインテグレーションするには、次の手順を完了する必要があります:

1. UID2 アカウントのセットアップを完了します。

1. Client-Server インテグレーションのみ: Server-Side でのトークン生成をインテグレーションします。

1. SDK for Android または iOS をモバイルアプリにインテグレーションします。

1. SDK を構成します。

1. トークンが正常に生成されたことを確認し、<Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>で使用するためにトークンを渡します。

1. オプションで、[Google GMA SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) および [Google IMA SDK](https://developers.google.com/interactive-media-ads/) とのインテグレーションに UID2 GMA/IMA プラグインを構成します。

詳細については、次のガイドを参照してください:

- [Client-Side Integration Guide for Mobile](integration-mobile-client-side.md)
- [Client-Server Integration Guide for Mobile](integration-mobile-client-server.md)

## FAQs for Mobile Integrations

UID2 モバイルインテグレーションに関する FAQ 情報は次のとおりです:

- [iOS: Swift Package Manager と Cocoapods/Podspec を併用できますか？](#ios-can-i-use-swift-package-manager-and-cocoapodspodspec-together)

#### iOS: Can I use Swift Package Manager and Cocoapods/Podspec together?
iOS: Swift Package Manager と Cocoapods/Podspec を併用できますか？

UID2 Mobile インテグレーションには、UID2 Mobile SDK、UID2 GMA プラグイン、UID2 IMA プラグインを Swift Package Manager または CocoaPods でインストールできます。

推奨事項:

- すでに CocoaPods を使用している場合、特に Google Ad Frameworks を自分でインテグレーションしている場合は、UID2 SDK を CocoaPods を使用してインテグレーションすることが最適です。
- 依存関係のインテグレーションが初めての場合、または Swift Package Manager ですでに依存関係がある場合は、UID2 モバイルインテグレーションには Swift Package Manager を使用することを勧めます。

:::caution
すでに CocoaPods を使用している場合、UID2 SDK とプラグインを Swift Package Manager (SPM) を使用してインテグレーションしても、アプリが UID2 SDK とプラグインを使用することを妨げるものではありません。ただし、潜在的な競合があります。すでに CocoaPods で GMA をインストールしている場合、その後 UID2 Mobile SDK を Swift Package Manager でインストールすると、実装に GMA の 2 つのコピーが含まれるため、動作しません。
:::

したがって、すでに GMA をインストールしていて UID2 をインストールする場合は、まず CocoaPods から GMA を削除してください。

:::tip
Podspec は、Cocoapods 内のファイル名で、アプリにインテグレーションするライブラリを定義するものです。
:::

## Troubleshooting Tips for Mobile Integrations

UID2 モバイルインテグレーションのトラブルシューティングに役立つ追加情報です:

- [Android SDK が本番環境に接続できない](#android-sdk-cannot-connect-in-production-environment)

#### Android SDK cannot connect in Production environment
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

ログを有効にすると、別のトラブルシューティングステップが可能になります。詳細については、[Enable Logging](integration-mobile-client-side.md#enable-logging) を参照してください。