---
title: Environments
description: Information about the environments for UID2.
hide_table_of_contents: false
sidebar_position: 07
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Environments

Learn about the different environments available, and tips to reduce latency by choosing the best base URL for your integration.

## UID2 Integration and Production Environments

The following table lists all current integration (also known as testing) and production environments for UID2.

| Environment | Cloud Region | Code | Base URL |
| :--- | :--- | :--- | :--- |
| Integration (for testing) | AWS US East (Ohio) | `us-east-2` | `https://operator-integ.uidapi.com` |
| Production | Automatically optimized region routing via the <a href='https://aws.amazon.com/global-accelerator/'>AWS Global Accelerator</a> | `n/a` | `https://global.prod.uidapi.com` |
| Production | AWS US East (Ohio) | `us-east-2` | `https://prod.uidapi.com` |
| Production | AWS US West (Oregon) | `us-west-2` | `https://usw.prod.uidapi.com` |
| Production | AWS Asia Pacific (Sydney) | `ap-southeast-2` | `https://au.prod.uidapi.com` |
| Production | AWS Asia Pacific (Tokyo) | `ap-northeast-1` | `https://jp.prod.uidapi.com` |
| Production | AWS Asia Pacific (Singapore) | `ap-southeast-1` | `https://sg.prod.uidapi.com` |

For example, `https://operator-integ.uidapi.com/v2/token/generate`.

Notes:

- All UID2 endpoints use the same base URL.
- The integration environment and the production environment require different <Link href="../ref-info/glossary-uid#gl-api-key">API keys</Link>. For information about getting credentials for each environment, see [Getting Your Credentials](../getting-started/gs-credentials.md#getting-your-credentials).
- The expiration time of the <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> returned by the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) or [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoints is subject to change, but is always significantly shorter in the integration environment than it is in the production environment.

## Getting Credentials for Each Environment

If you're using the integration environment as well as the production environment, you'll need to get a separate set of credentials for each environment.

For details about getting the values you need to access each environment, see [Getting Your Credentials](gs-credentials.md#getting-your-credentials).

## Specifying the Base URL to Reduce Latency

The latency of API calls depends on the proximity of the client to the UID2 servers. To reduce the latency, especially when making API calls from consumer devices, you might consider choosing a server closer to your users.

For example, a publisher in Singapore can set the base URL to `https://sg.prod.uidapi.com`. This is still the UID2 production environment, but the servers are in Singapore.

By explicitly setting the base URL, you can direct all requests to be processed within a particular country or region.

You might also consider leveraging the AWS global accelerator, which automatically directs requests to the UID2 servers closest to the caller. This option is also great for ensuring higher availability, in case servers in one region are temporarily down.

:::note
By default, some implementation options make API calls to a UID2 production environment server in the USA. To verify the default value, and for instructions on how to update the setting, check the documentation for your integration.
:::
