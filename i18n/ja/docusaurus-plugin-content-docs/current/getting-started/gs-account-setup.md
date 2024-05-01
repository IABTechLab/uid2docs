---
title: Account Setup
description: UID2 アカウントの設定に関する情報。
hide_table_of_contents: false
sidebar_position: 02
---

import Link from '@docusaurus/Link';

# Account Setup

このページでは、UID2 でアカウントを設定するために必要な一般的な情報を提供します。

<!-- It includes:

* [Contact Info](#contact-info)
* [Account Setup](#account-setup-details)
* [Credentials](#credentials)
* [API Version](#api-version)
 -->
## Contact Info

UID2 フレームワークにアクセスするには、以下の The Trade Desk の担当チームにご連絡ください。

現在の UID2 Administrator である The Trade Desk とすでに取引がある場合は、その担当者と直接連絡を取り、UID2 を開始してください。

:::note
The Trade Desk のアクセス依頼は一時的なものです。システムが独立したガバナンスに移行された時には、運営組織がアクセスリクエストを管理します。
:::

| Your Role | Contact Email |
| :--- | :--- |
| アプリ開発者<br/>パブリッシャー                                  | UID2publishers@thetradedesk.com |
| 代理店<br/>ブランド<br/>Customer Data Platform (CDP)<br/>データプロバイダー<br/>DSP<br/>SSP | UID2partners@thetradedesk.com   |

## Account Setup Details

UID2 に興味を示していただいたら、詳細を詰めるために担当者からご連絡を差し上げます。

参加者は少なくとも以下の情報を提供する必要があります:
* 氏名
* メールアドレス
* 会社名
* 契約書に署名できる正式な個人の名前と連絡先

### Client-Side Implementation for Publishers

パブリッシャーが、Client-Side でトークンが生成されるように UID2 を実装することに決めた場合は、サイトの**ドメイン名**のリストも提供する必要があります。これは、Client-Side の実装のみを対象としたセキュリティ対策です。

:::tip
アカウント設定に必要なのは、ルートレベルのドメインだけです。たとえば、example.com、shop.example.com、example.org の Client-Side でトークンを生成するために UID2 を実装する場合、ドメイン名 example.com と example.org だけを提供します。
:::

## Credentials

UID2 に参加する契約を結ぶと、[UID2 credentials](gs-credentials.md) と UID2 を始めるために必要な情報が提供されます。

## API Version

UID2 API の現在のバージョンは UID2 API v2 です。
