---
title: Raw UID2 Sharing
description: 信頼できる他の共有参加者と raw UID2 を共有する方法について学ぶ。
hide_table_of_contents: false
sidebar_position: 08
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Raw UID2 Sharing

[raw UID2](../ref-info/glossary-uid.md#gl-raw-uid2) を他の認可された共有参加者と共有したい [Sharing participants](ref-info/glossary-uid.md#gl-sharing-participant) は、[Security Requirements for UID2 Sharing](sharing-security.md) で規定されているように、認証、認可、アカウンティング、安全なトランスポートの責任を守らなければならなりません。すべての点が厳密に守られていることを確認してください。

:::note
ユーザーのオプトアウトを受け入れることは重要です。raw UID2 を他の承認された共有参加者と共有する前に、[POST&nbsp;/optout/status](../endpoints/post-optout-status.md) エンドポイントを使用して、raw UID2 のオプトアウトステータスを確認してください。オプトアウトされた raw UID2 を共有しないでください。
:::
