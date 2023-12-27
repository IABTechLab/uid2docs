---
title: Environments
description: UID2 の環境に関する情報。
hide_table_of_contents: false
sidebar_position: 07
---

# Environments

以下の表は、UID2 の現在のテスト環境と本番環境の一覧です。

| Environment | Cloud Region                 | Code             | Base URL                            |
| :---------- | :--------------------------- | :--------------- | :---------------------------------- |
| テスト環境   | AWS US East (Ohio)           | `us-east-2`      | `https://operator-integ.uidapi.com` |
| 本番環境    | <a href='https://aws.amazon.com/global-accelerator/'>AWS Global Accelerator</a> によるリージョンルーティングの自動最適化 | `n/a` | `https://global.prod.uidapi.com` |
| 本番環境    | AWS US East (Ohio)           | `us-east-2`      | `https://prod.uidapi.com`           |
| 本番環境    | AWS US West (Oregon)         | `us-west-2`      | `https://usw.prod.uidapi.com`       |
| 本番環境    | AWS Asia Pacific (Sydney)    | `ap-southeast-2` | `https://au.prod.uidapi.com`        |
| 本番環境    | AWS Asia Pacific (Tokyo)     | `ap-northeast-1` | `https://jp.prod.uidapi.com`        |
| 本番環境    | AWS Asia Pacific (Singapore) | `ap-southeast-1` | `https://sg.prod.uidapi.com`        |

例えば、`https://operator-integ.uidapi.com/v2/token/generate`

Notes:

- すべてのUID2エンドポイントは同じベースURLを使用します。
- テスト環境と本番環境では、異なる [API keys](../ref-info/glossary-uid.md#gl-api-key) が必要です。
- [POST /token/generate](../endpoints/post-token-generate.md) または [POST /token/refresh](../endpoints/post-token-refresh.md) エンドポイントによって返される [UID2 token](../ref-info/glossary-uid.md#gl-uid2-token) の有効期限は変更される可能性がありますが、テスト環境では常に本番環境よりも大幅に短くなります。