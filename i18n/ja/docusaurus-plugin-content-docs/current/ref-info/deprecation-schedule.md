---
title: Deprecation Schedule
description: UID2 APIおよびサービスのバージョンに関する廃止スケジュール
hide_table_of_contents: false
sidebar_position: 06
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import SnptUpgradePolicy from '../snippets/_snpt-private-operator-upgrade-policy.mdx';

# Deprecation Schedule

以下のセクションでは、サポートされているバージョンと、該当する場合は廃止スケジュールに関する情報を提供します。

## Private Operator Versions

以下の表は、現在サポートされている Private Operator バージョンを示しています。具体的には以下の通りです:
- [Private Operator for AWS](#private-operator-for-aws)
- [Private Operator for GCP](#private-operator-for-gcp)
- [Private Operator for Azure](#private-operator-for-azure)
<!-- - [Private Operator for AKS](#private-operator-for-aks) -->

:::important
古いバージョンを使用している場合は、該当する表の「Deprecation Date」列を参照して、バージョンのサポート期間に関する情報を確認してください。新しい機能や改善された機能を利用するために、できるだけ早く最新バージョンにアップグレードすることを推奨します。
:::

### Private Operator Upgrade Policy

<SnptUpgradePolicy />

### Private Operator for AWS

最新の ZIP ファイルは、以下の表のリンクされたリリースノートの Assets セクションで入手できます。

| Version Name | Version&nbsp;#/Release&nbsp;Notes | AWS Version | Date | Deprecation Date |
| ------- | ------ | ------ | ------ | ------ |
| Q2 2025 | [v5.55.9](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.55.9-r1) | v5.55.9-r1 | July 1, 2025 | July 1, 2026 |
| Q1 2025 | [v5.49.7](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.49.7) | 5.49.7 | Mar 19, 2025 | Mar 31, 2026 |
| Q3 2024 Out-of-band | [v5.41.0](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.41.0) | 5.41.0 | October 29, 2024 | Mar 31, 2026 |
| Q3 2024 | [v5.38.104](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.38.104) | 5.38.104 | September 12, 2024 | Mar 31, 2026 |
| Q2 2024 | [v5.37.12](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.37.12) | 5.37.12 | June 12, 2024 | Sep 30, 2025 |

ドキュメントは、[UID2 Private Operator for AWS Integration Guide](../guides/operator-guide-aws-marketplace.md)を参照してください。

### Private Operator for GCP

最新の ZIP ファイルは、以下の表のリンクされたリリースノートの Assets セクションで入手できます。

| Version Name | Version&nbsp;#/Release&nbsp;Notes | GCP Download | Date | Deprecation Date |
| ------- | ------ | ------ | ------ | ------ |
| Q2 2025 | [v5.55.9](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.55.9-r1) | [gcp-oidc-deployment-files-5.55.9-r1.zip](https://github.com/IABTechLab/uid2-operator/releases/download/v5.55.9-r1/gcp-oidc-deployment-files-5.55.9-r1.zip) | July 1, 2025 | July 1, 2026 | 
| Q1 2025 | [v5.49.7](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.49.7) | [gcp-oidc-deployment-files-5.49.7.zip](https://github.com/IABTechLab/uid2-operator/releases/download/v5.49.7/gcp-oidc-deployment-files-5.49.7.zip) | Mar 19, 2025 | Mar 31, 2026 |
| Q3 2024 Out-of-band | [v5.41.0](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.41.0) | [gcp-oidc-deployment-files-5.41.0.zip](https://github.com/IABTechLab/uid2-operator/releases/download/v5.41.0/gcp-oidc-deployment-files-5.41.0.zip) | October 29, 2024 | Mar 31, 2026 |
| Q3 2024 | [v5.38.104](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.38.104) | [gcp-oidc-deployment-files-5.38.104.zip](https://github.com/IABTechLab/uid2-operator/releases/download/v5.38.104/gcp-oidc-deployment-files-5.38.104.zip) | September 12, 2024 | Mar 31, 2026 |
| Q2 2024 | [v5.37.12](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.37.12) | [gcp-oidc-deployment-files-5.37.12.zip](https://github.com/IABTechLab/uid2-operator/releases/download/v5.37.12/gcp-oidc-deployment-files-5.37.12.zip) | June 12, 2024 | Sep 30, 2025 |

ドキュメントは、[UID2 Private Operator for GCP Integration Guide](../guides/operator-private-gcp-confidential-space.md)を参照してください。

### Private Operator for Azure

最新の ZIP ファイルは、以下の表のリンクされたリリースノートの Assets セクションで入手できます。

| Version Name | Version&nbsp;#/Release&nbsp;Notes | Azure Download | Date | Deprecation Date |
| ------- | ------ | ------ | ------ | ------ |
| Q2 2025 | [v5.55.9](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.55.9-r1) | [azure-cc-deployment-files-5.55.9-r1.zip](https://github.com/IABTechLab/uid2-operator/releases/download/v5.55.9-r1/azure-cc-deployment-files-5.55.9-r1.zip) | July 1, 2025 | July 1, 2026 |
| Q1 2025 | [v5.49.7](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.49.7) | [azure-cc-deployment-files-5.49.7.zip](https://github.com/IABTechLab/uid2-operator/releases/download/v5.49.7/azure-cc-deployment-files-5.49.7.zip) | Mar 19, 2025 | Mar 31, 2026 |
| Q3 2024 Out-of-band | [v5.41.0](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.41.0) | [azure-cc-deployment-files-5.41.0.zip](https://github.com/IABTechLab/uid2-operator/releases/download/v5.41.0/azure-cc-deployment-files-5.41.0.zip) | October 29, 2024 | Mar 31, 2026 |
| Q3 2024 | [v5.38.104](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.38.104) | [azure-cc-deployment-files-5.38.104.zip](https://github.com/IABTechLab/uid2-operator/releases/download/v5.38.104/azure-cc-deployment-files-5.38.104.zip) | September 12, 2024 | Mar 31, 2026 |
| Q2 2024 | [v5.37.12](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.37.12) | [azure-cc-deployment-files-5.37.12.zip](https://github.com/IABTechLab/uid2-operator/releases/download/v5.37.12/azure-cc-deployment-files-5.37.12.zip) | June 12, 2024 | Sep 30, 2025 |

ドキュメントは、[UID2 Private Operator for Azure Integration Guide](../guides/operator-guide-azure-enclave.md)を参照してください。

<!-- ### Private Operator for AKS

The latest ZIP file is linked in the Release Notes column in the following table.

| AKS Version Name | Version&nbsp;#/Release&nbsp;Notes | AKS Download | Date | Deprecation Date |
| ------- | ------ | ------ | ------ | ------ |
| Q2 2025 | xxx | xxx | xxx | xxx | -->
<!-- | Q1 2025 | 5.49.7 | [v5.49.7](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.49.7) | Mar 19, 2025 | Mar 31, 2026 | -->

## Endpoint Versions

`POST /identity/map` エンドポイントのバージョン 2 は、バージョン 3 に置き換えられました。バージョン 3 では、[Version 3 Improvements](../endpoints/post-identity-map.md#version-3-improvements)で説明されている追加の利点が含まれています。

`POST /identity/map` エンドポイントのバージョン 3 では、`POST /identity/buckets` エンドポイントは完全に使用されなくなりました。

以下の表は、v2 エンドポイントの廃止スケジュールを示しています。

Endpoint | Deprecation Date | 
| ------- | ------ |
| `POST /v2/identity/map` | June 30, 2026 |
| `POST /v2/identity/buckets` | June 30, 2026 |
