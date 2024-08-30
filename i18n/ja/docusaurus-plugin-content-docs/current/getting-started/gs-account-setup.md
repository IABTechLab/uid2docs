---
title: Account Setup
description: UID2 アカウントの設定に関する情報。
hide_table_of_contents: false
sidebar_position: 02
---

import Link from '@docusaurus/Link';

# Account Setup

このページでは、UID2 でアカウントを設定するために必要な一般的な情報を提供します。

## Contact Info

UID2 フレームワークにアクセスするには、以下の The Trade Desk の担当チームにご連絡ください。

The Trade Desk (現在の UID2 管理者) とすでに取引関係がある場合は、直接連絡を取り、UID2 を開始してください。

:::note
The Trade Desk のアクセス依頼は一時的なものです。システムが独立したガバナンスに移行された時には、運営組織がアクセスリクエストを管理します。
:::

| Your Role | Contact Email |
| :--- | :--- |
| アプリ開発者<br/>パブリッシャー                                  | UID2publishers@thetradedesk.com |
| 代理店<br/>ブランド<br/>Customer Data Platform (CDP)<br/>データプロバイダー<br/>DSP<br/>SSP | UID2partners@thetradedesk.com   |

## Account Setup Details

UID2 に関心を示すと、詳細を調整するために担当者が連絡から連絡があります。

アカウント設定の一環として、以下の情報を提供してください。:
* 氏名
* メールアドレス
* 会社名
* 契約書に署名できる正式な個人の名前と連絡先

### Client-Side Web Integrations

UID2 Token を [mobile](../overviews/overview-publishers.md#mobile-integrations) アプリではなく [web](../overviews/overview-publishers.md#web-integrations) の Client Side でリクエストする場合、サイトのドメイン名のリストも提供する必要があります。これは、Client-Side 実装のみのセキュリティ対策です。

:::tip
アカウント設定に必要なのは、ルートレベルのドメインだけです。たとえば、example.com、shop.example.com、example.org の Client-Side でトークンを生成するために UID2 を実装する場合、ドメイン名 example.com と example.org だけを提供します。
:::

### Client-Side Mobile Integrations

[mobile apps](../overviews/overview-publishers.md#mobile-integrations) で Client Side から UID2 Token をリクエストする場合、すべてのモバイルアプリ ID の完全なリストを提供する必要があります:

- Android App ID: 該当するものをすべて。
- iOS/tvOS Bundle ID and corresponding iOS App Store ID: 該当するものをすべて。

## Credentials

UID2 に参加するための契約に署名した後、[UID2 credentials](gs-credentials.md) と UID2 の運用開始にに必要な追加情報を提供します。

## API Version

UID2 API の現在のバージョンは v2 です。
