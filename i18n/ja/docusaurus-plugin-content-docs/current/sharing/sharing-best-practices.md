---
title: Best Practices
description: UID2 Shering のベストプラクティス。
hide_table_of_contents: false
sidebar_position: 05
---

import Link from '@docusaurus/Link';

# UID2 Sharing: Best Practices

raw UID2 や UID2 Token を、UID2 の許可を受けた他のユーザーと安全に共有できるようになったことで、UID2 をビジネスでさまざまに活用できるようになりました。

しかし、UID2 参加者は皆、UID2 エコシステムのセキュリティを維持する責任を負っています。ここでは、UID2 の共有を円滑かつ安全に行うためのベストプラクティスをいくつか紹介します。

## Best Practices for Managing Raw UID2s and UID2 Tokens

以下のガイドラインに従ってください:
- プラットフォーム上の UID2 は、UID2 Token としてではなく、raw UID2 として使用・保管してください。UID2 Token を受け取ったら、できるだけ早く復号化してください。

  UID2 Token は短命なので、この点は重要です。UID2 Token の作成に使われた鍵の有効期限が切れると、トークンを復号化できなくなります。

- raw UID2 は、非参加者に**渡してはなりません**。詳細は [UID2 Token Pass-Through](sharing-tokenized-overview.md#uid2-token-pass-through) を参照してください。

- コードでは、将来の拡張性を考慮して、以下を許容してください：

  - raw UID2 の長さ: 100文字。

  - UID2 Token の長さ: 500文字。

- raw UID2 を他の承認された共有参加者と共有する前に、[POST&nbsp;/optout/status](../endpoints/post-optout-status.md) エンドポイントを使用して、raw UID2 のオプトアウトステータスを確認してください。オプトアウトされた raw UID2 を共有しないでください。

## Decryption Key Refresh Cadence for Sharing

SDK を使用している場合、共有キーの更新スケジュールを設定することはセットアップの一部です。

長時間/連続して実行されるプロセスの場合、`uid2client.refresh()` 関数を 1 時間ごとに呼び出すことを勧めます。ただし、他の更新頻度を選択することもできます。

次の理由から、キーを 1 時間ごとに更新することを勧めます:

- 定期的な更新により、SDK が復号化のために最新のキーを取得できます。新しい共有権限が有効になると、新しい共有送信者が送信したデータを復号化するために必要な追加の暗号キーのセットが、共有受信者が次に `uid2client.refresh()` 関数を呼び出すと返されます。このプロセスは SDK によって管理されます。
- UID2 フレームワークは、定期的に暗号キーをローテーションします。

:::note
Snowflake を使用している場合、このステップは不要です。Snowflake UID2 インテグレーションがキーの更新を管理します。
:::
