---
title: Audit Trail
description: UID2 Portal で過去に実行されたアクションの詳細なログを表示します。
hide_table_of_contents: false
sidebar_position: 09
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Audit Trail

UID2 Portal では、Admin 権限を持つユーザー（[User Roles](team-members.md#user-roles) を参照）は、**Audit Trail** ページにアクセスして、現在の <Link href="../ref-info/glossary-uid#gl-sharing-participant">参加者</Link> によって実行された過去のすべてのアクションの詳細なログを表示できます。

Audit Trail ログには、以下の表にまとめられた情報が表示されます。

| Column | Details |
| :--- | :--- | 
| Date | アクションが発生した日時。 |
| User | アクションを実行したユーザー。 |
| Event | 実行したアクションの詳細。 有効な値の概要については、[Audit Trail Event Types](#audit-trail-event-types) を参照してください。 |
| Event Data | アクションの詳細。 |
| Succeeded | アクションが成功したかどうか。 |

## Audit Trail Event Types

Audit trail ログは、以下のアクティビティの種類を報告します。Event 列にリストされています:

- Approve Account
- Manage API Key
- Manage Key Pair
- Manage Participant
- Manage Team Members
- Update App Names
- Update Domain Names
- Update Sharing Permissions
- Update Sharing Types
