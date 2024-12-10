---
title: UID2 Portal Overview
description: UID2 Portal に関する一般情報。
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# UID2 Portal: Overview

UID2 Portal は、UID2 アカウントを設定・構成するためのワンストップショップです。このセルフサービスポータルでは、UID2 参加のための基本的な設定手順をすべて完了することができます。各アクティビティの詳細については、以下のリンクをクリックしてください:

| Activity | Documentation Link |
| :--- | :--- | 
| アカウントのリクエスト、名前や場所などの基本的なアカウント情報の設定、初回ログイン、パスワードのリセットを行います。 | [Getting Started with the UID2 Portal](portal-getting-started.md) |
| プロフィールを確認します。 | [Participant Information](participant-info.md) |
| Server-Side または Client/Server インテグレーション: API Key の管理、キーの追加、変更、削除などを行います。 | [API Keys](api-keys.md) |
| Client-Side インテグレーションのみ: Client-Side で UID2 Token を生成するために必要な値を設定し、管理します。 | [Client-Side Integration](client-side-integration.md) |
| 個々の共有参加者または共有参加者のグループの権限を構成します。<br/>NOTE: 共有の使用には API Key ([API Keys](api-keys.md) を参照してください) または Client-Side キーペア ([Client-Side Integration](client-side-integration.md) を参照してください) が必要です。共有権限を設定する前にこれらの値を構成してください。 | [Sharing Permissions](sharing-permissions.md) |
| アカウントを管理する権限を持つチームメンバーを追加します。 | [Team Members](team-members.md) |
| ニュースやアップデートを通知する指定メール連絡先を設定します。 | [Email Contacts](email-contacts.md) |
| 現在の参加者、またはその代理人によって実行された過去のすべてのアクションの詳細なログを表示します。 | [Audit Trail](audit-trail.md) |

## Access the UID2 Portal

Portal にアクセスするには、UID2 の担当者にアカウントを作成する権限をリクエストしてください。リクエストにはいくつかの情報が必要です: [Request an Account](portal-getting-started.md#request-an-account) を参照してください。

担当者は、開始するためのリンクを送信します。

### UID2 Portal Structure

UID2 Portal は、ナビゲーションが簡単になるように構造化されています。

ページへのアクセス方法は、次の画像に示すように、2つの主要な方法があります:

![UID2 Portal Structure](images/portal-uid2-overview.png)

左サイドバーの上部に、参加者名が表示されます。アカウントが複数の参加者にアクセスできる場合、上記の例のように、ドロップダウンメニューが表示されます。このメニューを使用して、ポータル内の参加者を切り替えることができます。

左側のサイドバーをスクロールすると、アカウントの設定に関連する以下のページにアクセスできます:

- Home: ホームページへのリンク、常に表示されます。
- [Sharing Permissions](sharing-permissions.md)
- [API Keys](api-keys.md)
- [Client-Side Integration](client-side-integration.md)

右上のリンクから、名前が表示されます。

ここから個人のアカウント設定と日々のアクティビティに関する以下のページにアクセスできます:

- [Participant Information](participant-info.md)
- [Manage Team Members](team-members.md)
- [Email Contacts](email-contacts.md)
- [Audit Trail](audit-trail.md) (管理者のみ)
- Dark Mode: toggles dark mode on and off
- [Log Out](portal-getting-started.md#log-out)

## Set Up Your Account

アカウントを設定するには、[Getting Started with the UID2 Portal](portal-getting-started.md) を参照してください。
