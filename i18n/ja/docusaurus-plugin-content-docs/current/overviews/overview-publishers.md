---
title: Publishers
description: パブリッシャー向けの情報の概要。
hide_table_of_contents: false
sidebar_position: 02
use_banner: true
banner_title: パブリッシャー向け UID2 概要
banner_description: 変化し続ける広告業界においてオーディエンスターゲティングを維持し、より良いインプレッション収益化と関連性の向上を実現。
banner_icon: 'publishers'
banner_text_color: 'white'
banner_text_color_dark: 'black'
banner_background_color: '#035959'
banner_background_color_dark: '#DCDEE1'
displayed_sidebar: sidebarPublishers
---

import Link from '@docusaurus/Link';
import IntegratingWithSSO from '../snippets/_integrating-with-sso.mdx';
import PrivateOperatorOption from '../snippets/_private-operator-option.mdx';
import PublisherImplementationResources from '../snippets/_publisher-implementation-resources.mdx';

パブリッシャーとして、Unified ID 2.0 (UID2) のクロスデバイスプレゼンスの恩恵を受け、すべてのインベントリで一貫した ID ファブリックを活用することができます。

UID2 を採用するパブリッシャーにとってのメリット、ワークフロー、ドキュメント、その他のリソース、および UID2 の導入手順について説明します。

:::note
UID2 のドキュメント一式に左サイドバーからアクセスしたい場合は、[Unified ID 2.0 Overview](../intro.md) を参照してください。
:::

## Benefits of UID2 for Publishers

UID2 とインテグレーションすることで得られるメリットの一部を次に示します:
- デスクトップ、モバイル、CTVで、単一の識別子でアドレサブルなオーディエンスターゲティング。
- デバイスをまたいだフリケンシー。
- より適切なコンテンツのリコメンデーション。
- 関連するコンテンツでパーソナライズされた広告体験を提供する機能。
- 消費者のプライバシー管理を向上させることを目的とした、オプトアウトを提供する機能。

## Workflow for Publishers

以下の手順は、ID プロバイダー、パブリッシャー、SSO プロバイダーなど、SSP を介して UID2 Token を<Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>に伝播する組織を想定したワークフローの概要です。パブリッシャーは、UID2 と相互運用可能で、パブリッシャーに代わって UID2 インテグレーションを処理できる SSO プロバイダーまたは独立した ID プロバイダーと連携することを選択できます。

1. ユーザーがパブリッシャーウェブサイト、モバイルアプリ、または CTV アプリを訪れます。

1. パブリッシャーは、ユーザーにデータの取り扱いについての透明性を確保し、ユーザーにメールアドレスまたは電話番号を提供するよう求めます。

1. ユーザーがメールアドレスまたは電話番号を提供すると、パブリッシャーは SDK または直接の API インテグレーションを介して、それを UID2 Operator に送信します。
   :::tip
    パブリッシャーは、SSO プロバイダーまたは ID プロバイダーに、自身の代わりに <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> を渡すことを許可できます。
    :::

1. UID2 Operator:
   - メールアドレスまたは電話番号を受け取ります。
   - ソルト、ハッシュ、暗号化プロセスを実行します。
   - UID2 Token を返します。

1. リアルタイムビディング中に SSP と共有するために、パブリッシャーは UID2 Token を保存します。
   - Server-Side: パブリッシャーは、マッピングテーブル、DMP、データレイク、または他のサーバーサイドアプリケーションにトークンを保存します。
   - Client-Side: パブリッシャーは、トークンをクライアントサイドアプリケーションまたはユーザーのブラウザにファーストパーティクッキーとして保存します。

1. パブリッシャーは UID2 Token をストレージから取得します。

1. パブリッシャーは SSP に UID2 Token を送信します。

1. SSP は UID2 Token とともにビッドリクエストをビッドストリームに入れます。

<!-- The publisher requests updated UID2 tokens using a refresh token. When applicable, the refresh token includes a user’s opt-out request. -->

![Publisher Workflow](images/UID2PublisherAndSSPWorkflow.jpg)

## Integrating with Single Sign-On (SSO)

<IntegratingWithSSO />

## Private Operator Option

<PrivateOperatorOption/>

## Getting Started

次の手順で始めます:

1. [Request Access](/request-access) ページのフォームに記入して、UID2 へのアクセスをリクエストします。
1. UID2 とインテグレーションしたいプロパティを特定します。
1. UID2 契約を締結します。
1. <Link href="../ref-info/glossary-uid#gl-client-side">client-side</Link>、<Link href="../ref-info/glossary-uid#gl-client-server">client-server</Link>、<Link href="../ref-info/glossary-uid#gl-server-side">server-side</Link> いずれのインテグレーションを行うか決め、UID2 の連絡先に伝えてください。

   これらのオプションについての詳細は、[Integration Approaches](../ref-info/ref-integration-approaches.md) を参照してください。

1. UID2 credential([UID2 Credentials](../getting-started/gs-credentials.md)) を受け取ります。
1. 該当する [implementation resources](#implementation-resources) を使用して、SDK または UID2 と直接インテグレーションしてください。

   :::note
   UID2 へのリクエストメッセージは必ず暗号化してください。詳細は [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md) を参照してください。
   :::

1. テスト: 

   - ビッドリクエストで UID2 Token が正しく生成され、渡されていることを確認します。
   - 必要に応じてトラブルシューティングを行い、ビッドリクエストで UID2 Token が正しく渡されるように SSP と協力します。
1. 本番稼動します。

## Implementation Resources

<PublisherImplementationResources/>

## FAQs for Publishers

UID2 フレームワークを使用するうパブリッシャー向けのよくある質問のリストは、[FAQs for Publishers](../getting-started/gs-faqs.md#faqs-for-publishers) を参照してください。
