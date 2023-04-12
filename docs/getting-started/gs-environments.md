---
title: Environments
description: Information about the environments for UID2.
hide_table_of_contents: false
sidebar_position: 07
---

# Environments

All UID2 endpoints use the same base URL.

The following table lists all current testing and production environments for UID2.

| Environment | Cloud Region | Code | Base URL |
| :--- | :--- | :--- | :--- |
| Testing | AWS US East (Ohio) | `us-east-2` | `https://operator-integ.uidapi.com` |
| Production | AWS US East (Ohio) | `us-east-2` | `https://prod.uidapi.com` |
| Production| AWS Asia Pacific (Sydney) | `ap-southeast-2` | `https://au.prod.uidapi.com` |
| Production | AWS Asia Pacific (Tokyo) | `ap-northeast-1` | `https://jp.prod.uidapi.com` |
| Production | AWS Asia Pacific (Singapore) | `ap-southeast-1` | `https://sg.prod.uidapi.com` |

For example, `https://operator-integ.uidapi.com/v2/token/generate`.
