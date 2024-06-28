---
title: Environments
description: Information about the environments for UID2.
hide_table_of_contents: false
sidebar_position: 07
---

import Link from '@docusaurus/Link';

# Environments

Learn about the different environments available, and tips to reduce latency by choosing the best base URL for your integration.

## UID2 Testing and Production Environments

The following table lists all current testing and production environments for UID2.

| Environment | Cloud Region | Code | Base URL |
| :--- | :--- | :--- | :--- |
| Integration Testing | AWS US East (Ohio) | `us-east-2` | `https://operator-integ.uidapi.com` |
| Production | Automatically optimized region routing via the [AWS Global Accelerator](#using-the-aws-global-accelerator) | `n/a` | `https://global.prod.uidapi.com` |
| Production | AWS US East (Ohio) | `us-east-2` | `https://prod.uidapi.com` |
| Production | AWS US West (Oregon) | `us-west-2` | `https://usw.prod.uidapi.com` |
| Production | AWS Asia Pacific (Sydney) | `ap-southeast-2` | `https://au.prod.uidapi.com` |
| Production | AWS Asia Pacific (Tokyo) | `ap-northeast-1` | `https://jp.prod.uidapi.com` |
| Production | AWS Asia Pacific (Singapore) | `ap-southeast-1` | `https://sg.prod.uidapi.com` |

For example, `https://operator-integ.uidapi.com/v2/token/generate`.

Notes:

- All UID2 endpoints use the same base URL.
- The integration environment and the production environment require different <Link href="../ref-info/glossary-uid#gl-api-key">API keys</Link>.
- The expiration time of the <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> returned by the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) or [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoints is subject to change, but is always significantly shorter in the integration environment than it is in the production environment.

## Specifying the Base URL to Reduce Latency

By default, some implementation options make API calls to a UID2 production environment server in the USA.

In this scenario, depending on where your users are based, you might consider choosing a server closer to your users to reduce latency.

For example, a publisher in Singapore can set the base URL to `https://sg.prod.uidapi.com`. This is still the UID2 production environment, but the servers are in Singapore.

You can also use the [AWS Global Accelerator](#using-the-aws-global-accelerator), which directs readers to a region geographically close to them.

## Using the AWS Global Accelerator

The <a href='https://aws.amazon.com/global-accelerator/'>AWS Global Accelerator</a> is a feature that allows you to optimize by setting the base URL to `https://global.prod.uidapi.com`. This URL directs readers to a region geographically close to them, which is ideal if your audience is geographically distributed.

This is a great approach for efficiency and minimum latency: however, do not choose this option if you want to make sure that all requests are processed within a particular country or region.
