---
title: LiveRamp Integration Tips
sidebar_label: LiveRamp Integration Tips
pagination_label: LiveRamp Integration Tips
description: LiveRamp と UID2 をインテグレーションするためのヒント。 
hide_table_of_contents: false
sidebar_position: 04
---

import Link from '@docusaurus/Link';

# LiveRamp Integration Tips

LiveRamp Authenticated Traffic Solution (ATS) をすでに使用しているパブリッシャーは、そのインテグレーションを活用して、ビッドリクエストに渡す UID2 Token を生成できます。

LiveRamp ATS を使用して、UID2 Token を生成するには、LiveRamp の担当者に連絡し、以下のインテグレーションポイントを確認してください:

- [Enable RideAlong](#enable-ridealong)
- [Implement the Correct Hashing Methodology](#implement-the-correct-hashing-methodology)
- [Set Envelope Refresh to 1800 Seconds](#set-envelope-refresh-to-1800-seconds)

## Enable RideAlong

LiveRamp の設定では、RideAlong が有効になっていることを確認する必要があります。RideAlong は、UID2 などの他の ID ソリューションが ATS エンベロープに識別子を埋め込むことを可能にする LiveRamp の機能です。RideAlong が有効になっていない場合、UID2 Token はエンベロープに追加されません。

この手順を完了するには、LiveRamp の担当者に連絡してください。

## Implement the Correct Hashing Methodology

UID2 Service で使用されているハッシュ化の方法はとても特殊です。異なるハッシュ化アルゴリズムを使用したり、ステップを逃したりすると、UID2 が正しく生成されません。

必要なハッシュ化方法については、[Normalization and Encoding](../getting-started/gs-normalization-encoding.md) を参照してください。

## Set Envelope Refresh to 1800 Seconds

When enabling `ATS.js` within `Prebid.js`, make sure that `storage.refreshInSeconds` is set to **1800 seconds** (30 minutes).
`Prebid.js` 内で `ATS.js` を有効にする場合は、`storage.refreshInSeconds` を **1800 秒** (30 分) に設定してください。

## Troubleshooting Assistance

詳細情報や LiveRamp のトラブルシューティング支援については、[LiveRamp support page](https://docs.liveramp.com/connect/en/support.html) を参照してください。ヘルプリソースを確認するか、LiveRamp の担当者に連絡してください。
