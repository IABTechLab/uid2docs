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
