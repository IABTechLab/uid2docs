---
title: UID2 API v2 Documentation
description: UID2 API v2 を使い始めるための情報の概要。
hide_table_of_contents: false
sidebar_position: 06
---

import Link from '@docusaurus/Link';

# UID2 API v2 Documentation

:::note
アップグレードの手順については、GitHub の [UID2 API v1 to v2 Upgrade Guide](https://github.com/IABTechLab/uid2docs/blob/main/api-ja/v2/upgrades/upgrade-guide.md) を参照してください。
:::

UID2 の定義、ID タイプ、指針、構成要素、その他の概念的な詳細は [UID2 概要](intro.md) を参照してください。連絡先やライセンス情報、正規化およびハッシュエンコーディングの規則は [Getting Started](/docs/category/getting-started) を参照してください。

API の使用方法は、以下のページを参照してください。

| Documentation | Content Description |
| :--- | :--- |
| [Encrypting Requests and Decrypting Responses](getting-started/gs-encryption-decryption.md) | UID2 API のリクエスト/レスポンスワークフロー、リクエストの暗号化と応答の復号化の要件と、いくつかのプログラミング言語でのスクリプトの例です。 |
| [Endpoints](endpoints/summary-endpoints.md) | ID トークンを管理し、メールアドレス、電話番号、ハッシュを UID2 と UID2 の生成に使用したソルトバケット ID に対応付けるための API リファレンスです。<br/>NOTE: インテグレーション環境と本番環境では、異なる [API Key](ref-info/glossary-uid.md#gl-api-key) が必要です。 |
| [Integration Guides](guides/summary-guides.md) | パブリッシャー、DSP、広告主、データプロバイダーなどの UID2 参加者、および Microsoft Azure、AWS、Snowflake などの Operator Enterprise Partner 向けの UID2 インテグレーションワークフローです。 |
| [SDKs](sdks/summary-sdks.md) | UID2 SDK を使用するためのドキュメントへのリンクです。 |
