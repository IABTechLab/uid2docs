---
title: Environments
description: UID2 の環境に関する情報。
hide_table_of_contents: false
sidebar_position: 07
---

# Environments

すべての UID2 エンドポイントは、同じベース URL を使用します。

以下の表は、UID2 の現在のインテグレーション環境と本番環境の一覧です。

| Environment | Cloud Region                 | Code             | Base URL                            |
| :---------- | :--------------------------- | :--------------- | :---------------------------------- |
| インテグレーション環境  | AWS US East (Ohio)           | `us-east-2`      | `https://operator-integ.uidapi.com` |
| 本番環境    | AWS US East (Ohio)           | `us-east-2`      | `https://prod.uidapi.com`           |
| Production | AWS US West (Oregon) | `us-west-2` | `https://usw.prod.uidapi.com` |
| 本番環境    | AWS Asia Pacific (Sydney)    | `ap-southeast-2` | `https://au.prod.uidapi.com`        |
| 本番環境    | AWS Asia Pacific (Tokyo)     | `ap-northeast-1` | `https://jp.prod.uidapi.com`        |
| 本番環境    | AWS Asia Pacific (Singapore) | `ap-southeast-1` | `https://sg.prod.uidapi.com`        |

たとえば、`https://operator-integ.uidapi.com/v2/token/generate`

>NOTE: インテグレーション環境と本番環境では、異なる [API Key](../ref-info/glossary-uid.md#gl-api-key) が必要です。