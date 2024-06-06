---
title: Best Practices
description: Best practices for UID2 sharing.
hide_table_of_contents: false
sidebar_position: 05
---

import Link from '@docusaurus/Link';

# UID2 Sharing: Best Practices

raw UID2 や UID2 Token を、UID2 の許可を受けた他のユーザーと安全に共有できるようになったことで、UID2 をビジネスでさまざまに活用できるようになりました。

しかし、UID2 参加者は皆、UID2 エコシステムのセキュリティを維持する責任を負っています。ここでは、UID2 の共有を円滑かつ安全に行うためのベストプラクティスをいくつか紹介します。

<!-- In this file:

- [Best Practices for Managing Raw UID2s and UID2 Tokens](#best-practices-for-managing-raw-uid2s-and-uid2-tokens)
- [Decryption Key Refresh Cadence for Sharing](#decryption-key-refresh-cadence-for-sharing) -->

## Best Practices for Managing Raw UID2s and UID2 Tokens

以下のガイドラインに従ってください:
- プラットフォーム上の UID2 は、UID2 Token としてではなく、raw UID2 として使用・保管してください。UID2 Token を受け取ったら、できるだけ早く復号化してください。

  UID2 Token は短命なので、この点は重要です。UID2 Token の作成に使われた鍵の有効期限が切れると、トークンを復号化できなくなります。

- raw UID2 は、非参加者に**渡してはなりません**。詳細については、[UID2 Token Pass-Through](sharing-tokenized-overview.md#uid2-token-pass-through) を参照してください。

- コードでは、将来の拡張性を考慮して、以下を許容してください：

  - raw UID2 の長さ: 100文字。

  - UID2 Token の長さ: 500文字。

## Decryption Key Refresh Cadence for Sharing

SDK を使用している場合、共有キーの更新スケジュールを定義することもセットアップの一部です。

長時間/継続的に実行されるプロセスでは、1時間に1回 `uid2client.refresh()` 関数を呼び出すことを推奨します。しかし、別の更新頻度を選択することもできます。

キーを1時間ごとに更新する理由は以下の通りです:

- 定期的なリフレッシュにより、SDK は復号のための最新の鍵を取得することができます。新しい共有許可が有効になると、新しい共有送信者から送信されたデータを復号するために必要な暗号鍵の追加セットは、共有受信者が `uid2client.refresh()` 関数を次回呼び出したときに返されます。このプロセスは SDK によって管理されます。
- UID2 フレームワークは定期的に暗号鍵をローテーションします。

:::note
Snowflake を使用している場合は、この手順を実行する必要はありません。Snowflake UID2 インテグレーションがキーのリフレッシュを行います。
:::
