---
title: Best Practices
description: UID2 sharing のベストプラクティス。
hide_table_of_contents: false
sidebar_position: 05
---

# UID2 Sharing: Best Practices

<!-- It includes the following:

- [Best Practices for Managing Raw UID2s](#best-practices-for-managing-raw-uid2s)
- [Best Practices for Managing UID2 Tokens](#best-practices-for-managing-uid2-bid-stream-tokens-or-sharing-tokens)
- [Key Refresh Cadence for Sharing](#key-refresh-cadence-for-sharing) -->

UID2 Token を他の UID2 正規のユーザーと安全に共有できるようになったことで、UID2 をビジネスでさまざまな形で活用する道が開けました。

しかし、UID2 参加者は皆、UID2 エコシステムのセキュリティを維持する責任を負っています。ここでは、UID2 sharing を円滑かつ安全に行うためのベストプラクティスをいくつかご紹介します。

## Best Practices for Managing Raw UID2s

以下のガイドラインに従ってください:
- プラットフォームの UID2 については、UID2 Token としてではなく、UID2 として使用・保存してください。

  UID2 Token は短命であるため、これは重要です。UID2 Token の作成に使用した鍵の有効期限が切れると、トークンを復号化できなくなります。
- コードでは、将来の拡張性を考慮して、raw UID2 の長さを 100 文字としてください。

## Best Practices for Managing UID2 Tokens

以下のガイドラインに従ってください:

- データがプラットフォームに入るとき、またはデータを送信するときは、データが常に UID2 Token の形式であり、raw UID2 ではないことを確認してください。

  ただしインフラストラクチャ内では、UID2 Token ではなく raw UID2 を保存することが重要です (上記の [Best Practices for Managing Raw UID2s](#best-practices-for-managing-raw-uid2s) を参照してください)。 

- コードでは、将来の拡張性を考慮して、UID2 Token の長さを 500 文字まで許容してください。

## Key Refresh Cadence for Sharing

長時間/継続的に実行されるプロセスでは、1時間に1回 `uid2client.refresh()` 関数を呼び出します。

1時間に1回の頻度で鍵を更新する理由は以下のとおりです:

- 定期的に更新することで、SDK が復号のために最新の鍵を取得できるようになります。
- UID2 フレームワークは定期的に暗号鍵をローテーションしています。

詳細については、[Encryption/Decryption Key Refresh Cadence for Sharing (SDK Only)](sharing-implementing.md#encryptiondecryption-key-refresh-cadence-for-sharing-sdk-only) を参照してください。
