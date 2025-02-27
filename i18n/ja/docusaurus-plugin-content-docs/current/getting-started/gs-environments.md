---
title: Environments
description: UID2 の環境に関する情報。
hide_table_of_contents: false
sidebar_position: 07
---

import Link from '@docusaurus/Link';

# Environments

利用可能な異なる環境と、インテグレーションのための最適なベース URL を選択するためのヒントについて説明します。

## UID2 Integration and Production Environments

次の表は、UID2 のすべての現在のインテグレーション(テスト)環境と本番環境を示しています。

| Environment | Cloud Region | Code | Base URL |
| :--- | :--- | :--- | :--- |
| インテグレーション環境 (テスト様)   | AWS US East (Ohio) | `us-east-2` | `https://operator-integ.uidapi.com` |
| 本番環境 | <a href='https://aws.amazon.com/global-accelerator/'>AWS Global Accelerator</a> によるリージョンルーティングの自動最適化 | `n/a` | `https://global.prod.uidapi.com` |
| 本番環境 | AWS US East (Ohio) | `us-east-2` | `https://prod.uidapi.com` |
| 本番環境 | AWS US West (Oregon) | `us-west-2` | `https://usw.prod.uidapi.com` |
| 本番環境 | AWS Asia Pacific (Sydney) | `ap-southeast-2` | `https://au.prod.uidapi.com` |
| 本番環境 | AWS Asia Pacific (Tokyo) | `ap-northeast-1` | `https://jp.prod.uidapi.com` |
| 本番環境 | AWS Asia Pacific (Singapore) | `ap-southeast-1` | `https://sg.prod.uidapi.com` |

たとえば、`https://operator-integ.uidapi.com/v2/token/generate`

Notes:

- すべての UID2 エンドポイントは同じベース URL を使用します。
- インテグレーション環境と本番環境では、異なる <Link href="../ref-info/glossary-uid#gl-api-key">API Key</Link> が必要です。各環境用の認証情報の取得方法については、[Getting Your Credentials](../getting-started/gs-credentials.md#getting-your-credentials) を参照してください。
- [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) エンドポイントまたは [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) エンドポイントで返される <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 Token</Link> の有効期限は変更される可能性がありますが、常にインテグレーション環境では本番環境よりもはるかに短くなります。

## Getting Credentials for Each Environment

インテグレーション環境と本番環境の両方を使用している場合は、それぞれの環境用に別々の認証情報が必要です。

各環境にアクセスするために必要な値を取得する方法については、[Getting Your Credentials](gs-credentials.md#getting-your-credentials) を参照してください。

## Specifying the Base URL to Reduce Latency

クライアントと UID2 サーバーの近接性に依存して API コールのレイテンシが決まります。特に消費者デバイスから API コールを行う場合、ユーザーに近いサーバーを選択することでレイテンシを低減できます。

たとえば、シンガポールのパブリッシャーは、ベース URL を `https://sg.prod.uidapi.com` に設定できます。これは UID2 の本番環境ですが、サーバーはシンガポールにあります。

ベース URL を明示的に設定することで、すべてのリクエストを特定の国または地域内で処理するように指示できます。

UID2 サーバーに最も近い場所にリクエストを自動的に送信する AWS グローバルアクセラレータを活用することも検討してください。このオプションは、一部のリージョンのサーバーが一時的にダウンしている場合にも高い可用性を確保するためにも優れています。

:::note
デフォルトでは、一部の実装オプションは UID2 本番環境サーバーに米国のサーバーを使用して API コールを行います。デフォルト値を確認し、設定の更新方法については、インテグレーションのドキュメントを参照してください。
:::
