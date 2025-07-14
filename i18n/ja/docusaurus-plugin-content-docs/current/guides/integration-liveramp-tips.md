---
title: LiveRamp Integration Tips
sidebar_label: LiveRamp Integration Tips
pagination_label: LiveRamp Integration Tips
description: LiveRamp と UID2 をインテグレーションするためのヒント。 
hide_table_of_contents: false
sidebar_position: 04
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# LiveRamp Integration Tips

LiveRamp Authenticated Traffic Solution (ATS) をすでに使用しているパブリッシャーは、そのインテグレーションを活用して、ビッドリクエストに渡す UID2 Token を生成できます。

LiveRamp ATS を使用して、UID2 Token を生成するには、LiveRamp の担当者に連絡し、以下のインテグレーションポイントを確認してください:

- [Enable RideAlong](#enable-uid2-as-an-interoperable-id)
- [Implement the Correct Hashing Methodology](#implement-the-uid2-hashing-methodology)
- [Set Envelope Refresh to 1800 Seconds](#set-envelope-refresh-to-1800-seconds)

## Enable UID2 as an Interoperable ID

LiveRamp の設定では、RideAlong が有効になっていることを確認する必要があります。RideAlong は、UID2 などの他の ID ソリューションが ATS エンベロープに識別子を埋め込むことを可能にする LiveRamp の機能です。RideAlong が有効になっていない場合、UID2 Token はエンベロープに追加されません。

この手順を完了するには、LiveRamp の担当者に連絡してください。

## Implement the UID2 Hashing Methodology

有効な UID2 Token を ATS エンベロープに追加するには、パブリッシャーは平文のメールアドレスを提供し、SHA-256 ハッシング方法論を示すか、メールアドレスの SHA-256 ハッシュバージョンを直接 LiveRamp ライブラリに提供する必要があります。

UID2 と LiveRamp の両方でサポートされている SHA-256 ハッシング方法論を使用する必要があります。他のハッシング方法論を使用したり、ステップを逃したりすると、ATS エンベロープに UID2 Token が追加されないか、無効なトークンが追加されます。

For details, see [Normalization and Encoding](../getting-started/gs-normalization-encoding.md).

## Set Envelope Refresh to 1800 Seconds

`Prebid.js` 内で `ATS.js` を有効にする場合は、`storage.refreshInSeconds` を **1800 秒** (30 分) に設定してください。

## Troubleshooting Assistance

詳細情報や LiveRamp のトラブルシューティング支援については、[LiveRamp support page](https://docs.liveramp.com/connect/en/support.html) を参照してください。ヘルプリソースを確認するか、LiveRamp の担当者に連絡してください。
