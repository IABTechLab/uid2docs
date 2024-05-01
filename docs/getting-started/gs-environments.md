---
title: Environments
description: Information about the environments for UID2.
hide_table_of_contents: false
sidebar_position: 07
---

import Link from '@docusaurus/Link';

# Environments

The following table lists all current testing and production environments for UID2.

| Environment | Cloud Region | Code | Base URL |
| :--- | :--- | :--- | :--- |
| Integration Testing | AWS US East (Ohio) | `us-east-2` | `https://operator-integ.uidapi.com` |
| Production | Automatically optimized region routing via <a href='https://aws.amazon.com/global-accelerator/'>AWS Global Accelerator</a> | `n/a` | `https://global.prod.uidapi.com` |
| Production | AWS US East (Ohio) | `us-east-2` | `https://prod.uidapi.com` |
| Production | AWS US West (Oregon) | `us-west-2` | `https://usw.prod.uidapi.com` |
| Production | AWS Asia Pacific (Sydney) | `ap-southeast-2` | `https://au.prod.uidapi.com` |
| Production | AWS Asia Pacific (Tokyo) | `ap-northeast-1` | `https://jp.prod.uidapi.com` |
| Production | AWS Asia Pacific (Singapore) | `ap-southeast-1` | `https://sg.prod.uidapi.com` |

For example, `https://operator-integ.uidapi.com/v2/token/generate`.

Notes:

- All UID2 endpoints use the same base URL.
- The integration environment and the production environment require different <Link href="../ref-info/glossary-uid#gl-api-key">API keys</Link>.
- The expiration time of the [UID2 token](../ref-info/glossary-uid.md#gl-uid2-token) returned by  the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) or [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoints is subject to change, but is always significantly shorter in the integration environment than it is in the production environment.
