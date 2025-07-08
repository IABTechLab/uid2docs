---
title: Documentation Updates
description: UID2 ドキュメントの重要な更新の概要。
hide_table_of_contents: false
sidebar_position: 06
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import CustomTagsFilters from '@site/src/components/CustomTags/CustomTagsFilters';
import CustomTagsContainer from '@site/src/components/CustomTags/CustomTagsContainer';

# Documentation Updates

<CustomTagsFilters />

UID2 ドキュメンテーションリソースの最新アップデートを確認してください。

:::tip
タグツールバーを使用して、ドキュメントの更新の一部を表示できます。
:::

## Q1 2025

当四半期にリリースされたドキュメントは以下の通りです。

<CustomTagsContainer tags="Guides, Private Operator">

### Private Operator for AKS Integration Guide

March 19, 2025

UID2 <a href="../intro#participants">参加者</a> は、Azure Kubernetes Service (<Link href="../ref-info/glossary-uid#gl-aks">AKS</Link>) クラスターの [仮想ノード](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-virtual-nodes) 上で UID2 Operator Service を <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link> としてセットアップできるようになりました。

詳細は、[UID2 Private Operator for AKS Integration Guide](../guides/operator-guide-aks-enclave.md) を参照してください。

<!-- APIDOCS-3030 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Mobile">

### Server-Side Integration Guide for Mobile

March 18, 2025

モバイルアプリのパブリッシャーが、UID2 Token を Server-Side で完全に管理するためのガイドを追加しました。

詳細は、[UID2 Server-Side Integration Guide for Mobile](../guides/integration-mobile-server-side.md) を参照してください。

<!-- APIDOCS-2931 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Portal, Sharing">

### Portal, Sharing Permissions Page

March 11, 2025

UID2 Portal での共有権限の設定に関するドキュメントを大幅に拡充し、明確化しました。

詳細は、[Sharing Permissions](../portal/sharing-permissions.md) を参照してください。

<!-- APIDOCS-2795 -->

</CustomTagsContainer>

<CustomTagsContainer tags="SDKs">

### JavaScript SDK Version 4

March 7, 2025

UID2 JavaScript SDK の最新アップデート、Version 4 に関するドキュメントを追加しました。

詳細は、[SDK for JavaScript Reference Guide](../sdks/sdk-ref-javascript.md) を参照してください。

<!-- APIDOCS-2923 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Reference">

### How the UID2 Token Is Created

March 7, 2025

UID2 Token を生成する手順に関する情報を記載したページを追加しました。手順、役割、および図を含みます。

詳細は、[How the UID2 Token Is Created](../ref-info/ref-how-uid-is-created.md) を参照してください。

<!-- APIDOCS-2855 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides">

### Snowflake Integration Guide

February 12, 2025

UID2 Snowflake インテグレーションを大幅に更新し、ドキュメントを更新しました。

詳細は、[Snowflake Integration Guide](../guides/integration-snowflake.md) を参照してください。

<!-- APIDOCS-2918 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Portal, Reference">

### Instructions for Using the UID2 Portal

February 10, 2025

UID2 インテグレーションガイド、SDK ドキュメント、エンドポイントドキュメントに、UID2 Portal でのアカウント設定に関する情報を追加しました。

詳細は、実装ガイドを参照してください: たとえば、[Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md#complete-uid2-account-setup-and-configure-account) または [SDK for Android Reference Guide](../sdks/sdk-ref-android.md#api-permissions)。

また、これらの変更により、環境によって認証情報を取得する手順が異なることが明確になりました: [Credentials](../getting-started/gs-credentials.md) および [Environments](../getting-started/gs-environments.md) ページで詳細を確認してください。

<!-- APIDOCS-2828 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides">

### Advertiser/Data Provider Doc

January 10, 2025

広告主とデータプロバイダーのドキュメントを大幅に拡充し、再構築しました。新しい概要ドキュメントと、Snowflake、AWS Entity Resolution、HTTP エンドポイントの 3 つの主要なインテグレーションオプションに関する個別のドキュメントがあります:

広告主とデータプロバイダー向けのすべてのインテグレーションオプションの概要については、[Advertiser/Data Provider Integration Overview](../guides/integration-advertiser-dataprovider-overview.md) を参照してください。

<!-- APIDOCS-1662 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Reference">

### Publisher SSO Integration Page

January 8, 2025

SSO ログインを提供するために SSO プロバイダーとインテグレーションし、SSO プロバイダーからログインユーザーのメールアドレスを取得して UID2 Token を生成したいパブリッシャー向けの新しいリファレンスページを追加しました。

詳細は、[Publisher Integration with SSO Providers](ref-integration-sso-providers.md) を参照してください。

<!-- APIDOCS-2486 -->

</CustomTagsContainer>

<!-- ### Removed:  v1 to v2 upgrade doc

January 3, 2025

We've removed the legacy v1 to v2 upgrade doc, which is no longer needed. -->

<!-- APIDOCS-2859 -->

## Q4 2024

以下のドキュメントは2024年第4四半期にリリースされました。

<CustomTagsContainer tags="Infrastructure">

### Zoom-In Tool for Images

December 15, 2024

UID2 ドキュメントサイトに、画像のズームインツールが追加されました。

画像の上にカーソルを移動させると、虫眼鏡のアイコンが表示されます... クリックすると、画像の拡大バージョンが表示されます。

<!-- APIDOCS-2237 for both -->

</CustomTagsContainer>

<CustomTagsContainer tags="Portal">

### Portal Audit Trail Page

November 15, 2024

UID2 Portal ドキュメントに新しいページ、[Audit Trail](../portal/audit-trail.md) が追加されました。

UID2 Portal の **Audit Trail** ページでは、Admin 権限 ([User Roles](../portal/team-members.md#user-roles) を参照) を持つユーザーが、現在の <Link href="../ref-info/glossary-uid#gl-sharing-participant">参加者</Link> または参加者に代わって実行された過去のすべてのアクションの詳細なログを表示できます。

<!-- APIDOCSS-2700 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides">

### LiveRamp Integration Tips

November 14, 2024

LiveRamp の Authenticated Traffic Solution (ATS) を使用して UID2 Token を生成し、ビッドリクエストで渡すパブリッシャー向けの新しいリファレンスページを追加しました。

詳細は、[LiveRamp Integration Tips](../guides/integration-liveramp-tips.md) を参照してください。

<!-- APIDOCS-2699 -->

</CustomTagsContainer>

## Q3 2024

以下のドキュメントは2024年第3四半期にリリースされました。

<CustomTagsContainer tags="Reference">

### Tokens Page

September 10, 2024

トークンに関する情報を含む新しいリファレンスページを追加しました。

詳細は、[UID2 Tokens and Refresh Tokens](../ref-info/ref-tokens.md) を参照してください。

<!-- APIDOCS-2533 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Private Operator">

### Private Operator Integration Overview

August 28, 2024

Private Operator のインテグレーションに関する新しいページを追加しました。

詳細は [Private Operator Integrations](../guides/integration-options-private-operator) を参照してください。

<!-- APIDOCS-2164 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides">

### DSP Direct Integration Instructions

August 22, 2024

UID2 SDK を使用していない DSP 向けの新しいガイドを追加しました。

詳細は [DSP Direct Integration Instructions](../guides/integration-dsp-no-sdk.md) を参照してください。

<!-- APIDOCS-2394 -->

</CustomTagsContainer>

<!-- ### UID2 Token Reference Page

August 22, 2024

We've added a new reference page with general information about UID2 tokens, including refresh tokens.

For details, see [UID2 Tokens and Refresh Tokens]. -->

<!-- APIDOCS-1958 removed 8/26/22 -->

<CustomTagsContainer tags="Reference">

### Integration Approaches Page

July 23, 2024

Client-Side、Client-Server、Server-Side の異なるインテグレーションアプローチに関する情報を含む新しいページを追加しました。

詳細は [Integration Approaches](ref-integration-approaches.md) を参照してください。

<!-- APIDOCS-2132 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Reference">

### Server-Side Token Generation Page

July 3, 2024

Server-Side で UID2 Token を生成するパブリッシャー向けの情報を含む新しいリファレンスページを追加しました。

詳細は [Server-Side Token Generation](ref-server-side-token-generation.md) を参照してください。

<!-- APIDOCS-2255 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Mobile, Prebid.js">

### Integration with Prebid Mobile SDK (Android)

July 2, 2024

2 つのモバイルインテグレーションガイドに、Prebid を使用したモバイルインテグレーションの新しいセクションを追加しました。現在は Android のみです。

- [UID2 Client-Side Integration Guide for Mobile: Prebid Integration](../guides/integration-mobile-client-side#optional-uid2-integration-with-prebid-mobile-sdk)
- [UID2 Client-Server Integration Guide for Mobile: Prebid Integration](../guides/integration-mobile-client-server#optional-uid2-integration-with-prebid-mobile-sdk)

<!-- APIDOCS-2269 -->

</CustomTagsContainer>

## Q2 2024

以下のドキュメントは2024年第2四半期にリリースされました。

<CustomTagsContainer tags="CTV, Guides">

### CTV Integration Guide

June 21, 2024

UID2 とのインテグレーションを希望する CTV パブリッシャー向けに、新しいガイドを追加しました。

詳細は [CTV Integration Guide](../guides/integration-ctv-guide.md) を参照してください。

<!-- APIDOCS-2264 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Opt-Out">

### Opt-Out API

May 24, 2024

新しい API コールのドキュメントを追加しました。この API コールは、raw UID2 のオプトアウトステータスをチェックします。

raw UID2 のリストが与えられた場合、このエンドポイントは、オプトアウトした raw UID2 と、オプトアウトが行われた時刻を返します。

詳細は [POST&nbsp;/optout/status](../endpoints/post-optout-status.md) を参照してください。

<!-- APIDOCS-1739 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Mobile, SDKs">

### Client-Side and Server-Side Guides for Mobile

May 17, 2024

Android または iOS モバイルアプリのパブリッシャーが UID2 を実装するためのサポートを提供するため、以下のインテグレーションガイドを追加しました:

- [UID2 Mobile Integration Overview for Android and iOS](../guides/integration-mobile-overview)
- [UID2 Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side)
- [UID2 Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server)

<!-- APIDOCS-1903-->

</CustomTagsContainer>

<CustomTagsContainer tags="Portal">

### Portal Client-Side Integration Page

May 6, 2024

UID2 Portal のドキュメントに新しいページ、[Client-Side Integration](../portal/client-side-integration.md) を追加しました。

UID2 Portal の Client-Side Integration ページでは、ドメインなど、クライアントサイドで UID2 Token を生成する場合に必要な値を設定・管理できます。

<!-- APIDOCS-2120 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Portal">

### Portal API Keys Page

April 25, 2024

UID2 Portal ドキュメントに新しいページ、[API Keys](../portal/api-keys.md) を追加しました。

UID2 Portal の API Keys ページでは、UID2 アカウントの API Key、関連するシークレット値、および権限設定を管理するすべてのアクティビティを実行できます。

<!-- APIDOCS-2133 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Sharing">

### Documentation for UID2 Sharing

April 22, 2024

すべての共有シナリオに対応できるよう、共有ドキュメントを全面的に見直し、大幅に拡充しました。

このドキュメントでは、送信者と受信者が適用される法的、セキュリティ、および技術的要件に従う場合に、raw UID2 を共有する機能など、追加の共有シナリオをサポートするようになりました。

詳細は [UID2 Sharing: Overview](../sharing/sharing-overview.md) を参照してください。

<!-- APIDOCS-2134 -->

</CustomTagsContainer>

## Q1 2024

以下のドキュメントは2024年第1四半期にリリースされました。

<CustomTagsContainer tags="Reference">

### UID2 Hashing Tool

March 4, 2024

新しい UID2 ハッシュツールを追加しました。正規化とエンコーディングが正しく行われているかどうかをチェックすることができます。

詳細は *Normalization and Encoding* ドキュメントの [UID2 Hashing Tool](../getting-started/gs-normalization-encoding#uid2-hashing-tool) を参照してください。

<!-- APIDOCS-1974 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, SDKs">

### Java SDK Support, Advertiser/Data Provider

February 28, 2024

Java SDKは、[POST&nbsp;/identity/map](../endpoints/post-identity-map.md) エンドポイントの使用を希望する広告主およびデータプロバイダーをサポートするようになりました。

詳細は、*SDK for Javaリファレンスガイド*: [Usage for Advertisers and Data Providers](../sdks/sdk-ref-java.md#usage-for-advertisersdata-providers) の更新されたドキュメントを参照してください。

<!-- UID2-2759 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Infrastructure">

### Audience-Specific Sidebars

February 9, 2024

 [UID2 home page](https://unifiedid.com/) の上部にあるリンクをクリックした特定のユーザー(パブリッシャー、広告主、DSP、データプロバイダー)に、カスタマイズした左サイドバーが表示されるようにウェブサイトを改善しました。サイドバーには、その対象者に適用される特定のドキュメントが含まれています。

UID2 home page の "ドキュメント" リンクをクリックするだけで、すべてのユーザー向けのドキュメント一式を見ることができます。

多くのドキュメントは複数の対象者に適用可能であり、ドキュメント間には多くの相互リンクがあるため、サイト内を移動するにつれてサイドバーの表示が変わる可能性があることに注意してください。上部のリンクをクリックすると、いつでも特定のビューに戻ることができます。これらのリンクはすべてのページに表示されます。

カスタムサイドバーを表示するには、[https://unifiedid.com](https://unifiedid.com/) にアクセスし、上部にあるオーディエンスのリンクの1つをクリックしてください: [Publishers](../overviews/overview-publishers.md)。[Advertisers](../overviews/overview-advertisers.md)、[DSPs](../overviews/overview-dsps.md)、[Data Providers](../overviews/overview-data-providers.md)。

<!-- APIDOCS-1681 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, SDKs">

### Integration Overview for JavaScript

January 26, 2024

パブリッシャーが SDK for JavaScript を Client-Side または Server-Side のインテグレーションに使用する際のオプションをまとめた、新しい概要ガイドを追加しました。さらに、既存のガイドの名称を変更して一貫性を持たせ、マイナーアップデートを行いました。

詳細は以下を参照してください:

- [UID2 Integration Overview for JavaScript](../guides/integration-javascript)
- [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md)
- [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md)

<!-- APIDOCS-1924 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, SDKs">

### SDK for Java, Publisher Sections

22 January 2024

SDK for Java のドキュメントに、SDK を実装するパブリッシャーに役立つ新しいセクションを追加しました。

詳細は SDK for Java Reference Guide の [Usage for Publishers](../sdks/sdk-ref-java.md#usage-for-publishers) を参照してください。

<!-- APIDOCS-1705 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Reference">

### Normalization and Encoding Examples

January 19, 2024

既存の正規化とエンコードに関するドキュメントを拡張して明確にし、新しい例のセクションを追加しました。

詳細は [Normalization and Encoding](../getting-started/gs-normalization-encoding.md) を参照してください。

<!-- APIDOCS-1183, APIDOCS-1880 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Guides">

### Web Integration Overview for Publishers

January 16, 2024

UID2 とインテグレーションするパブリッシャーが利用できる Web インテグレーションオプションをまとめた新しいページを追加しました。

詳細は [Publisher Web Integration Overview](../guides/integration-options-publisher-web.md) を参照してください。

<!-- APIDOCS-1846 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Private Operator, Reference">

### UID2 Operator Page

January 3, 2024

UID2 Operator が何をするのか、Public Operator と Private Operator の違いについて説明したリファレンスコンテンツを追加しました。

詳細は [The UID2 Operator](../ref-info/ref-operators-public-private.md) を参照してください。

<!-- APIDOCS-1720 -->

</CustomTagsContainer>

## Q4 2023

以下のドキュメントは2023年第4四半期にリリースされました。

<CustomTagsContainer tags="Guides, Prebid.js">

### Integration Overview for Prebid

December 20, 2023

新しい概要ガイドには、Prebid と UID2 をインテグレーションするためのパブリッシャーオプションがまとめられています。

さらに、既存のガイドも再編成され、簡素化されました。

詳細は 以下を参照してください:

- [UID2 Integration Overview for Prebid](../guides/integration-prebid.md)
- [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md)
- [UID2 Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-client-server.md)

</CustomTagsContainer>

<CustomTagsContainer tags="Reference">

### Encrypt/Decrypt Examples, Java and C#

December 14, 2023

UID2 リクエストの暗号化とレスポンスの復号化について、追加のプログラミング言語での説明とコード例を追加しました。既存の Pythonの 例に、Java と C# を追加しました。

詳細は [Encryption and Decryption Code Examples](../getting-started/gs-encryption-decryption.md#encryption-and-decryption-code-examples) を参照してください。

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Private Operator">

### Private Operator for Azure Integration Guide

November 30, 2023

[Private Operator](../ref-info/glossary-uid.md#gl-private-operator) の運用を希望する UID2 <a href="../overviews/participants-overview">参加者は</a>、Microsoft Azure の機密コンピューティングオプションである Confidential Containers のインスタンスで UID2 Operator Service をセットアップできるようになりました。

詳細は [UID2 Private Operator for Azure Integration Guide](../guides/operator-guide-azure-enclave.md) を参照してください。

</CustomTagsContainer>

<CustomTagsContainer tags="Reference">

### API Permissions

November 22, 2023

UID2 ウェブサイトの Getting Started セクションに新しい記事が掲載され、主要な UID2 権限、よく使う参加者のタイプ、関連する主なアクティビティについての情報が提供されています。

詳細は [API Permissions](../getting-started/gs-permissions.md) を参照してください。

</CustomTagsContainer>

<CustomTagsContainer tags="Reference">

### UID2 Credentials Page

November 21, 2023

以前の **API Keys** ページを新しいページに置き換えました。このページには、Server-Sideの実装戦略に従った場合の認証情報についての情報が含まれています。

詳細は [UID2 Credentials](../getting-started/gs-credentials.md) を参照してください。

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, SDKs">

### Client-Side Integration Guide for JS

November 21, 2023

Client-Side Integration Guide for JavaScript は、既存の URL の全く新しいドキュメントで、Client-Sideパブリッシャー実装のために SDK for JavaScript を使用する、よりシンプルな新しい方法を網羅しています。

詳細は [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md) を参照してください。

以前の *SDK for JavaScript Integration Guide* にあった内容は、JavaScript SDK を Server-Side に実装したいパブリッシャーのための補足文書になりました: [JavaScript Standard Integration Guide](../guides/integration-javascript-client-server.md).

:::note
このドキュメントは2024年1月に [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md) に更新され、JavaScript Standard Integration Guide は[Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md) になりました。
:::

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Prebid.js">

### Client-Side Integration Guide for Prebid.js

November 2, 2023

UID2 Client-Side Integration Guide for Prebid.js は、既存の URL にまったく新しいドキュメントを追加したもので、UID2 と Prebid をインテグレーションする、Server-Side の作業を必要としない、よりシンプルな新しい方法について説明しています。

前バージョンの Prebid ドキュメントにあった内容は、Private Operator を使用しているパブリッシャーや、Server-Side でトークン生成を実装したいパブリッシャーのために、補足ドキュメントである *Prebid.js Advanced Integration Guide* に追加されました。

:::note
これらのドキュメントは、その後の改訂でさらに更新されました。更新されたリンクは以下のとおりです:
- [UID2 Integration Overview for Prebid](../guides/integration-prebid.md)
- [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md)
- [UID2 Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-client-server.md)
:::

</CustomTagsContainer>

<CustomTagsContainer tags="Opt-Out, Reference">

### Opt-Out Page

October 31, 2023

新しい "getting started" トピックでは、ユーザーのオプトアウトの概要を説明します。

詳細は [User Opt-Out](../getting-started/gs-opt-out.md) を参照してください。

</CustomTagsContainer>

<CustomTagsContainer tags="Guides">

### AWS Entity Resolution Integration Guide

October 19, 2023

この新しいガイドは、Amazon Web Services の ID ソリューションプロダクトである [AWS Entity Resolution](https://aws.amazon.com/entity-resolution/) を使用するための情報を提供し、AWS の顧客が UID2 フレームワークとインテグレーションできるようにします。

このサービスでは、DII (メールアドレスまたは電話番号) を raw UID2 に迅速かつ安全にマッピングすることができます。

詳細は [AWS Entity Resolution Integration Guide](../guides/integration-aws-entity-resolution.md) を参照してください。

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, SDKs">

### SDK for JavaScript Version 3 

October 10, 2023

SDK for JavaScript Version 3 の機能強化に伴い、ドキュメントが大幅に更新されました。新しいドキュメントには、以前のバージョンの SDK からのアップグレードのための [Migration Guide](../sdks/sdk-ref-javascript#migration-guide) が含まれています。

詳細は以下を参照してください:
-  [SDK for JavaScript Reference Guide](../sdks/sdk-ref-javascript.md)
-  [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md)

</CustomTagsContainer>

## Q3 2023

以下のドキュメントは2023年第3四半期にリリースされました。

<CustomTagsContainer tags="Guides, Private Operator">

### Private Operator Guide for Google Confidential Space 

September 30, 2023

この新しいガイドでは、Google Cloud Platformの Confidential Computing オプションである [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space) でUID2 Operator Service を設定するための情報を提供します。

詳細は [UID2 Private Operator for GCP Integration Guide](../guides/operator-private-gcp-confidential-space.md) を参照してください。

<!-- APIDOCS-1655 -->

</CustomTagsContainer>

<CustomTagsContainer tags="Reference">

### Normalization and Encoding Rules

September 7, 2023

[directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) を正規化してエンコードし、raw UID2 または UID2 Token を作成する手順を明確にした。

詳細は:

- [Email Address Hash Encoding](../getting-started/gs-normalization-encoding#email-address-hash-encoding)
- [Phone Number Hash Encoding](../getting-started/gs-normalization-encoding#phone-number-hash-encoding)

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Mobile, SDKs">

### IMA Mobile Plugin for Android

August 8, 2023

Android 向け UID2 Interactive Media Ads(IMA)Plugin に関する情報を提供する、パブリッシャー向けの新しいガイドです。このプラグインを使用すると、Google IMA SDK for Android を使用するパブリッシャーが、Android アプリからの広告リクエストで <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> を secure signals として送信できるようになります。

詳細は [UID2 IMA Plugin for Android Integration Guide](../guides/mobile-plugin-ima-android.md) を参照してください。

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Mobile, SDKs">

### IMA Mobile Plugin for iOS

August 8, 2023

iOS 向け UID2 Interactive Media Ads(IMA)Plugin に関する情報を提供する、パブリッシャー向けの新しいガイドです。このプラグインを使用すると、Google IMA SDK for Android を使用するパブリッシャーが、iOS アプリからの広告リクエストで <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> を secure signals として送信できるようになります。

詳細は [UID2 IMA Plugin for iOS Integration Guide](../guides/mobile-plugin-ima-ios.md) を参照してください。

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Mobile, SDKs">

### GMA Mobile Plugin for Android

August 4, 2023

Android 向け UID2 Google Mobile Ads(GMA)Plugin に関する情報を提供する、パブリッシャー向けの新しいガイドです。このプラグインを使用すると、Google GMA SDK を使用するパブリッシャーが、Android アプリからの広告リクエストで <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> を secure signals として送信できるようになります。

詳細は [UID2 GMA Plugin for Android Integration Guide](../guides/mobile-plugin-gma-android.md) を参照してください。

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Mobile, SDKs">

### GMA Mobile Plugin for iOS

August 4, 2023

iOS 向け UID2 Google Mobile Ads(GMA)Plugin に関する情報を提供する、パブリッシャー向けの新しいガイドです。このプラグインを使用すると、Google GMA SDK を使用するパブリッシャーが、iOS アプリからの広告リクエストで <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> を secure signals として送信できるようになります。

詳細は [UID2 GMA Plugin for iOS Integration Guide](../guides/mobile-plugin-gma-ios.md) を参照してください。

</CustomTagsContainer>

<CustomTagsContainer tags="Infrastructure">

### UID2 Website in Japanese

August 3, 2023

UID2 のウェブサイト全体が、英語だけでなく日本語でも利用できるようになりました。

詳細は、各サイトのページ上部にある言語ドロップダウンを使うか、直接 [Unified ID 2.0 in Japanese](https://unifiedid.com/ja/docs/intro) にアクセスしてください。

</CustomTagsContainer>

<CustomTagsContainer tags="Portal">

### Portal Documentation

3 August 2023

UID2 アカウントを管理できる新しい UID2 Portal ユーザーインターフェースをナビゲートするための新しいドキュメントページをいくつか公開しました。

詳細は [UID2 Portal: Overview](../portal/portal-overview.md) を参照してください。

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Sharing, SDKs">

### Documentation for UID2 Sharing

August 3, 2023

新しい UID2 Sharing 機能の使用をサポートするため、以下の新規および更新ドキュメントを公開しました:

- 概要、使用例、実装手順、ベストプラクティスなど、UID2 Sharing に関連する情報を提供する一連の新しいページ。[UID2 Sharing: Overview](../sharing/sharing-overview.md) を参照してください。
- UID2 Sharing をサポートするために4つの Server-side SDK を更新しました:

  - [SDK for C# / .NET: Usage for UID2 Sharers](../sdks/sdk-ref-csharp-dotnet.md#usage-for-uid2-sharers)
  - [SDK for C++: Usage for UID2 Sharers](../sdks/sdk-ref-cplusplus.md#usage-for-uid2-sharers)
  - [SDK for Java: Usage for UID2 Sharers](../sdks/sdk-ref-java.md#usage-for-uid2-sharers)
  - [SDK for Python: Usage for UID2 Sharers](../sdks/sdk-ref-python.md#usage-for-uid2-sharers)

- UID2 Sharing をサポートするための Snowflake 機能の更新。[Snowflake Integration Guide: Usage for UID2 Sharers](../guides/integration-snowflake.md#usage-for-uid2-sharers) を参照してください。

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Mobile, SDKs">

### Android SDK Guide

August 3, 2023

パブリッシャー向けの新しいガイドでは、Android アプリをサポートする必要があるパブリッシャー向けに、UID2 を使用したクライアント ID の確立と UID2 Token の取得プロセスを容易にする SDK、SDK for Android に関する情報を提供しています。

詳細は [SDK for Android Reference Guide](../sdks/sdk-ref-android.md) を参照してください。

</CustomTagsContainer>

<CustomTagsContainer tags="Guides, Mobile, SDKs">

### iOS SDK Guide

August 3, 2023

パブリッシャー向けの新しいガイドでは、iOS アプリをサポートする必要があるパブリッシャー向けに、UID2 を使用したクライアント ID の確立と UID2 Token の取得プロセスを容易にする SDK、SDK for iOS に関する情報を提供しています。

詳細は [SDK for iOS Reference Guide](../sdks/sdk-ref-ios.md) を参照してください。

</CustomTagsContainer>

<!-- UID2 website launched 12 April 2023 -->
