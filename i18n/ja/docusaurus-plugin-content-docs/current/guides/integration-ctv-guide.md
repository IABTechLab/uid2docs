---
title: CTV Integration Guide
sidebar_label: CTV
pagination_label: CTV Integration Guide
description: UID2 モバイルインテグレーションオプションのまとめ。
hide_table_of_contents: false
sidebar_position: 04
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import SnptIntegratingWithSSO from '../snippets/_snpt-integrating-with-sso.mdx';
import SnptPrivateOperatorOption from '../snippets/_snpt-private-operator-option.mdx';

# CTV Integration Guide

Connected TV (CTV) パブリッシャーであれば、UID2 とインテグレーションして、CTV アプリのコンテキストで RTB ビッドストリームに渡す ID トークンを生成およびリフレッシュする方法がいくつかあります。

## Key Integration Steps
UID2 とインテグレーションするには、次の 3 つの主要なステップを実装します:

1. UID2 Token を生成します。
1. 必要に応じて UID2 Token をリフレッシュします。
1. UID2 Token をビッドストリームに渡します。

これらのステップをどのように実装するかを決定するには、[CTV Integration Options](#ctv-integration-options) から選択してください。

## Integrating with Single Sign-On (SSO)

<SnptIntegratingWithSSO />

## Private Operator Option

<SnptPrivateOperatorOption />

## Complete UID2 Account Setup and Configure Account

UID2 とインテグレーションするには、UID2 のアカウントが必要です。まだアカウントを作成していない場合は、最初に [Account Setup](../getting-started/gs-account-setup.md) ページの手順に従ってください。

アカウントの初期設定が完了すると、本番環境用の [credentials](../getting-started/gs-credentials.md) を作成し、必要に応じて追加の値を設定できる [UID2 Portal](../portal/portal-overview.md) にアクセスするための手順とリンクが送信されます。詳細は、[UID2 Portal での開始](../portal/portal-getting-started.md) を参照してください。

設定する具体的な値は、[CTV integration options](#ctv-integration-options) で選択したオプションによって異なります:

- Client-Server または Server-Side の実装の場合、UID2 Portal の [API Keys](../portal/api-keys.md) ページで次の値を設定する必要があります:
  - <Link href="../ref-info/glossary-uid#gl-api-key">API key</Link>、Client Key とも呼ばれます。
  - <Link href="../ref-info/glossary-uid#gl-client-secret">Client secret</Link>、参加者と UID2 Servivce のみが知る値です。

    :::important
    これらの値を安全に保管することは非常に重要です。詳細は、[Security of API Key and Client Secret](../getting-started/gs-credentials.md#security-of-api-key-and-client-secret) を参照してください。
    :::
- Client-Side の実装には、UID2 Portal の [Client-Side Integration](../portal/client-side-integration.md) ページで次の値を設定する必要があります:
  - Subscription ID と Public Key: [Adding and Managing Key Pairs](../portal/client-side-integration.md#adding-and-managing-key-pairs) を参照してください。
  - この SDK を使用するすべてのサイトの **domain names** のリスト: [Adding and Managing Root-Level Domains](../portal/client-side-integration.md#adding-and-managing-root-level-domains) を参照してください。
  - モバイルアプリ ID (適用される場合): [モバイルアプリ ID の追加と管理](../portal/client-side-integration.md#adding-and-managing-mobile-app-ids) を参照してください。

## CTV Integration Options

UID2 Token の生成とリフレッシュをどこで行うかに基づいて、最適なインテグレーションオプションを選択できます。以下の表に示すように、3 つのオプションがあります:

| Option | Details |
| :--- | :--- |
| [Client-Side Integration](#client-side-integration-for-ctv-apps) | トークンは Client-Side で生成され、リフレッシュされます。 |
| [Server-Side Integration](#server-side-integration-for-ctv-apps) | トークンは Server-Side で生成され、リフレッシュされます。 |
| [Client-Server Integration](#client-server-integration-for-ctv-apps) | トークンは Server-Side で生成され、Client-Side でリフレッシュされます。 |

### Client-Side Integration for CTV Apps

Client-Side オプションは、UID2 Token を完全に Client-Side で管理したいパブリッシャー向けです:

- トークンは CTV アプリ内で Client-Side で生成されます。
- トークンは CTV アプリ内から必要に応じてリフレッシュされます。

このセットアップでは、すべてのコード変更が CTV アプリ内で行う必要があります。

この方法で実装するには、[UID2 Client-Side Integration Guide for Mobile](integration-mobile-client-side.md) の手順に従ってください。

次の表は、対応するオペレーティングシステムと、関連するドキュメントリソースへのリンクを示しています。

| Operating System | Integration Guide | Link to SDK Guide |
| :--- | :--- | :--- |
| [Apple tvOS](https://developer.apple.com/tvos/) | [UID2 Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md) | [SDK for iOS Reference Guide](../sdks/sdk-ref-ios.md) |
| [Android TV](https://www.android.com/tv/) | [UID2 Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md) | [SDK for Android Reference Guide](../sdks/sdk-ref-android.md) |

### Server-Side Integration for CTV Apps

Server-Side オプションは、UID2 Token を完全に Server-Side で管理したいパブリッシャー向けです:

- トークンは Server-Side で生成されます。
- 必要に応じてトークンは Server-Side でリフレッシュされます。

このセットアップでは、ほとんどのコード変更が Server-Side で行われ、CTV アプリ内での変更は最小限に抑えられます。

この方法の利点の 1 つは、複数のプラットフォーム (Web / CTV / モバイル) に対処する場合、すべてを Server-Side で行うことで、プラットフォーム固有の作業を減らすことができることです。

この方法で実装するには、[Publisher Integration Guide, Server-Side](integration-publisher-server-side.md) の手順に従ってください。

Server-Side コードが Java または Python である場合、UID2 SDK のいずれかを使用して、UID2 への HTTP リクエストを行うことができます。自分でソースコードを書く代わりに、次のいずれかの SDK ガイドを参照してください:

- [SDK for Java Reference Guide: Usage for Publishers](../sdks/sdk-ref-java.md#usage-for-publishers)
- [SDK for Python Reference Guide: Usage for Publishers](../sdks/sdk-ref-python.md#usage-for-publishers)

### Client-Server Integration for CTV Apps

このオプションは UID2 Token を Client-Server で管理したいパブリッシャー向けです:

- トークンは Server-Side で生成されます。
- トークンは CTV アプリ内から必要に応じて Client-Side でリフレッシュされます。

この方法で実装するには、[UID2 Client-Server Integration Guide for Mobile](integration-mobile-client-server.md) の手順に従ってください。

次の表は、対応するオペレーティングシステムと、関連するドキュメントリソースへのリンクを示しています。

| Operating System | Integration Guide | Link to SDK Guide |
| :--- | :--- | :--- |
| [Apple tvOS](https://developer.apple.com/tvos/) | [UID2 Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md) | [SDK for iOS Reference Guide](../sdks/sdk-ref-ios.md) |
| [Android TV](https://www.android.com/tv/) | [UID2 Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md) | [SDK for Android Reference Guide](../sdks/sdk-ref-android.md) |

## Best Practices

CTV インテグレーションのベストプラクティスは次のとおりです:

- **トークンを事前にローテーションさせる**

  CTV 広告は広告ブレイク中のトラフィックスパイクに関連付けられています。これらの時間帯に UID2 Token を生成またはリフレッシュすることは理想的ではありません。忙しい時間帯の前にトークンを生成またはリフレッシュすることを推奨します。

  トークンが有効期限前にリフレッシュされた場合、古いトークンが有効期限切れになるまで、新しいトークンまたは古いトークンのいずれかを使用できます。TTL (time to live) タイムスタンプは、トークンが生成またはリフレッシュされたときに UID2 Operator から返されるレスポンスボディの一部です。

- **トークンは必要な場合のみローテーションさせる**

  UID2 Token はユーザーの HEM (Household Email Address) または電話番号に紐付けられており、視聴セッションやアプリセッションには紐付けられていません。ユーザーに有効な UID2 Token がある限り、新しい視聴セッションやアプリセッションごとに新しいトークンを生成する必要はありません。たとえば、ユーザーがアプリを離れ、再度開いた場合、既存のトークンがまだ有効であれば、新しい UID2 Token を生成する必要はありません。

- **ポッド内の複数の広告スロットで同じトークンを使用する**

  UID2 Token がポッドの期間中に有効である限り、ポッド内の任意の広告スロットで使用できます。

理想的には、これらのガイドラインに従うと、広告ブレイク中に新しい UID2 Token を生成する必要はありません。
