---
title: Deprecation Schedule
description: Deprecation timeline for versions of UID2 APIs and services.
hide_table_of_contents: false
sidebar_position: 06
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import SnptUpgradePolicy from '../snippets/_snpt-private-operator-upgrade-policy.mdx';

# Deprecation Schedule

The following sections provide information about supported versions and, where applicable, the deprecation timeline.

## Private Operator Versions

The following tables show the Private Operator versions that are currently supported, including:
- [Private Operator for AWS](#private-operator-for-aws)
- [Private Operator for GCP](#private-operator-for-gcp)
- [Private Operator for Azure](#private-operator-for-azure)
<!-- - [Private Operator for AKS](#private-operator-for-aks) -->

:::important
If you're using an older version, refer to the applicable table, Deprecation Date column, for information about the support lifetime for your version. We recommend upgrading to the latest version as soon as possible to take advantage of new and improved features.
:::

### Private Operator Upgrade Policy

<SnptUpgradePolicy />

### Private Operator for AWS

The latest ZIP file is available in the Assets section at the bottom of the linked Release Notes in the following table.

| Version Name | Version&nbsp;#/Release&nbsp;Notes | AWS Version | Date | Deprecation Date |
| ------- | ------ | ------ | ------ | ------ |
| Q2 2025 | [v5.55.9](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.55.9-r1) | v5.55.9-r1 | July 1, 2025 | July 1, 2026 |
| Q1 2025 | [v5.49.7](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.49.7) | 5.49.7 | Mar 19, 2025 | Mar 31, 2026 |
| Q3 2024 Out-of-band | [v5.41.0](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.41.0) | 5.41.0 | October 29, 2024 | Mar 31, 2026 |
| Q3 2024 | [v5.38.104](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.38.104) | 5.38.104 | September 12, 2024 | Mar 31, 2026 |
| Q2 2024 | [v5.37.12](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.37.12) | 5.37.12 | June 12, 2024 | Sep 30, 2025 |

For documentation, see [UID2 Private Operator for AWS Integration Guide](../guides/operator-guide-aws-marketplace.md).

### Private Operator for GCP

The latest ZIP file is linked in the GCP Download column in the following table.

| Version Name | Version&nbsp;#/Release&nbsp;Notes | GCP Download | Date | Deprecation Date |
| ------- | ------ | ------ | ------ | ------ |
| Q2 2025 | [v5.55.9](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.55.9-r1) | [gcp-oidc-deployment-files-5.55.9-r1.zip](https://github.com/IABTechLab/uid2-operator/releases/download/v5.55.9-r1/gcp-oidc-deployment-files-5.55.9-r1.zip) | July 1, 2025 | July 1, 2026 | 
| Q1 2025 | [v5.49.7](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.49.7) | [gcp-oidc-deployment-files-5.49.7.zip](https://github.com/IABTechLab/uid2-operator/releases/download/v5.49.7/gcp-oidc-deployment-files-5.49.7.zip) | Mar 19, 2025 | Mar 31, 2026 |
| Q3 2024 Out-of-band | [v5.41.0](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.41.0) | [gcp-oidc-deployment-files-5.41.0.zip](https://github.com/IABTechLab/uid2-operator/releases/download/v5.41.0/gcp-oidc-deployment-files-5.41.0.zip) | October 29, 2024 | Mar 31, 2026 |
| Q3 2024 | [v5.38.104](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.38.104) | [gcp-oidc-deployment-files-5.38.104.zip](https://github.com/IABTechLab/uid2-operator/releases/download/v5.38.104/gcp-oidc-deployment-files-5.38.104.zip) | September 12, 2024 | Mar 31, 2026 |
| Q2 2024 | [v5.37.12](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.37.12) | [gcp-oidc-deployment-files-5.37.12.zip](https://github.com/IABTechLab/uid2-operator/releases/download/v5.37.12/gcp-oidc-deployment-files-5.37.12.zip) | June 12, 2024 | Sep 30, 2025 |

For documentation, see [UID2 Private Operator for GCP Integration Guide](../guides/operator-private-gcp-confidential-space.md).

### Private Operator for Azure

The latest ZIP file is linked in the Azure Download column in the following table.

| Version Name | Version&nbsp;#/Release&nbsp;Notes | Azure Download | Date | Deprecation Date |
| ------- | ------ | ------ | ------ | ------ |
| Q2 2025 | [v5.55.9](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.55.9-r1) | [azure-cc-deployment-files-5.55.9-r1.zip](https://github.com/IABTechLab/uid2-operator/releases/download/v5.55.9-r1/azure-cc-deployment-files-5.55.9-r1.zip) | July 1, 2025 | July 1, 2026 |
| Q1 2025 | [v5.49.7](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.49.7) | [azure-cc-deployment-files-5.49.7.zip](https://github.com/IABTechLab/uid2-operator/releases/download/v5.49.7/azure-cc-deployment-files-5.49.7.zip) | Mar 19, 2025 | Mar 31, 2026 |
| Q3 2024 Out-of-band | [v5.41.0](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.41.0) | [azure-cc-deployment-files-5.41.0.zip](https://github.com/IABTechLab/uid2-operator/releases/download/v5.41.0/azure-cc-deployment-files-5.41.0.zip) | October 29, 2024 | Mar 31, 2026 |
| Q3 2024 | [v5.38.104](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.38.104) | [azure-cc-deployment-files-5.38.104.zip](https://github.com/IABTechLab/uid2-operator/releases/download/v5.38.104/azure-cc-deployment-files-5.38.104.zip) | September 12, 2024 | Mar 31, 2026 |
| Q2 2024 | [v5.37.12](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.37.12) | [azure-cc-deployment-files-5.37.12.zip](https://github.com/IABTechLab/uid2-operator/releases/download/v5.37.12/azure-cc-deployment-files-5.37.12.zip) | June 12, 2024 | Sep 30, 2025 |

For documentation, see [UID2 Private Operator for Azure Integration Guide](../guides/operator-guide-azure-enclave.md).

<!-- ### Private Operator for AKS

The latest ZIP file is linked in the Release Notes column in the following table.

| AKS Version Name | Version&nbsp;#/Release&nbsp;Notes | AKS Download | Date | Deprecation Date |
| ------- | ------ | ------ | ------ | ------ |
| Q2 2025 | xxx | xxx | xxx | xxx | -->
<!-- | Q1 2025 | 5.49.7 | [v5.49.7](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.49.7) | Mar 19, 2025 | Mar 31, 2026 | -->

## Endpoint Versions

Version 2 of the `POST /identity/map` endpoint has been superseded by version 3, which includes the additional advantages listed in [Version 3 Improvements](../endpoints/post-identity-map.md#version-3-improvements).

With version 3 of the `POST /identity/map` endpoint, the `POST /identity/buckets` endpoint is no longer used at all.

The following table shows the deprecation schedule for the v2 endpoints.

Endpoint | Deprecation Date | 
| ------- | ------ |
| `POST /v2/identity/map` | June 30, 2026 |
| `POST /v2/identity/buckets` | June 30, 2026 |
