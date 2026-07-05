---
title: Private Operator network egress
sidebar_label: Private Operator network egress
pagination_label: Private Operator network egress
description: Egress ファイアウォールの許可リストを設定するために、Private Operator が到達する必要があるアウトバウンドのネットワーク送信先。
hide_table_of_contents: false
sidebar_position: 16
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Private Operator network egress

<Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link> は、UID2 の <Link href="../ref-info/glossary-uid#gl-core-service">Core</Link> Service と <Link href="../ref-info/glossary-uid#gl-opt-out-service">Opt-Out</Link> Service に接続し、Core Service が提供する URL を使用して AWS S3 からデータファイルを直接ダウンロードします。詳細については、[Private Operator workflow](../guides/integration-options-private-operator.md#private-operator-workflow) を参照してください。

環境でアウトバウンドのネットワークトラフィックが制限されている場合、以下のすべての送信先に対してアウトバウンドの HTTPS（ポート 443）を許可する必要があります。許可しないと、Operator を起動できません。

## Integration

次の表に、インテグレーション環境で許可する必要があるホスト名を示します。

| ホスト名 | 用途 |
| --- | --- |
| `core-integ.uidapi.com` | Core Service（証明、キー、ソルト、構成） |
| `optout-integ.uidapi.com` | Opt-Out Service |
| `uid2-core-integ-store.s3.us-east-2.amazonaws.com` | Core データストレージ |
| `uid2-optout-integ-store.s3.us-east-2.amazonaws.com` | Opt-out データストレージ |

## Production

次の表に、本番環境で許可する必要があるホスト名を示します。

| ホスト名 | 用途 |
| --- | --- |
| `core-prod.uidapi.com` | Core Service（証明、キー、ソルト、構成） |
| `optout-prod.uidapi.com` | Opt-Out Service |
| `uid2-core-prod-store.s3.us-east-2.amazonaws.com` | Core データストレージ |
| `uid2-core-prod-store-replica.s3.us-west-2.amazonaws.com` | Core データストレージ（フェイルオーバーレプリカ） |
| `uid2-optout-prod-store.s3.us-east-2.amazonaws.com` | Opt-out データストレージ |
| `uid2-optout-prod-store-replica.s3.us-west-2.amazonaws.com` | Opt-out データストレージ（フェイルオーバーレプリカ） |

IP アドレスではなくホスト名で許可してください。基盤となるアドレスは変更される可能性があります。
