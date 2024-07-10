---
title: Environments
description: UID2 の環境に関する情報。
hide_table_of_contents: false
sidebar_position: 07
---

import Link from '@docusaurus/Link';

# Environments

利用可能な異なる環境と、インテグレーションのための最適なベース URL を選択するためのヒントについて説明します。

## UID2 Testing and Production Environments

次の表は、UID2 の現在のインテグレーション環境と本番環境の一覧です。

| Environment | Cloud Region | Code | Base URL |
| :--- | :--- | :--- | :--- |
| インテグレーション環境   | AWS US East (Ohio) | `us-east-2` | `https://operator-integ.uidapi.com` |
| 本番環境 | [AWS Global Accelerator](#using-the-aws-global-accelerator) によるリージョンルーティングの自動最適化 | `n/a` | `https://global.prod.uidapi.com` |
| 本番環境 | AWS US East (Ohio) | `us-east-2` | `https://prod.uidapi.com` |
| 本番環境 | AWS US West (Oregon) | `us-west-2` | `https://usw.prod.uidapi.com` |
| 本番環境 | AWS Asia Pacific (Sydney) | `ap-southeast-2` | `https://au.prod.uidapi.com` |
| 本番環境 | AWS Asia Pacific (Tokyo) | `ap-northeast-1` | `https://jp.prod.uidapi.com` |
| 本番環境 | AWS Asia Pacific (Singapore) | `ap-southeast-1` | `https://sg.prod.uidapi.com` |

例えば、`https://operator-integ.uidapi.com/v2/token/generate`

Notes:

- すべての UID2 エンドポイントは同じベース URL を使用します。
- インテグレーション環境と本番環境では異なる <Link href="../ref-info/glossary-uid#gl-api-key">API Key</Link> が必要です。
- [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) エンドポイントまたは [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) エンドポイントで返される <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 Token</Link> の有効期限は変更される可能性がありますが、常にインテグレーション環境では本番環境よりもはるかに短くなります。

## Specifying the Base URL to Reduce Latency

デフォルトでは、一部の実装オプションは米国にある UID2 本番環境サーバーに API コールを行います。

このシナリオでは、ユーザーの所在地に応じて、ユーザーに近いサーバーを選択してレイテンシを低減することを検討することができます。

例えば、シンガポールのパブリッシャーは、ベース URL を `https://sg.prod.uidapi.com` に設定できます。これは UID2 本番環境ですが、サーバーはシンガポールにあります。

また、[AWS Global Accelerator](#using-the-aws-global-accelerator) を使用することもできます。これは、ユーザーを地理的に近いリージョンに誘導します。

## Using the AWS Global Accelerator

<a href='https://aws.amazon.com/global-accelerator/'>AWS Global Accelerator</a> は、ベース URL を `https://global.prod.uidapi.com` に設定することで最適化する機能です。この URL は、読者を地理的に近いリージョンに誘導します。観客が地理的に分散している場合には理想的です。

これは、効率性と最小のレイテンシを実現するための素晴らしいアプローチです。ただし、すべてのリクエストが特定の国または地域内で処理されることを確認したい場合は、このオプションを選択しないでください。
