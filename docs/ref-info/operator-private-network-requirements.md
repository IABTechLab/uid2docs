---
title: Private Operator network egress
sidebar_label: Private Operator network egress
pagination_label: Private Operator network egress
description: Outbound network destinations a Private Operator must reach, for configuring egress firewall allowlists.
hide_table_of_contents: false
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Private Operator network egress

A <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link> connects to the UID2 <Link href="../ref-info/glossary-uid#gl-core-service">Core</Link> and <Link href="../ref-info/glossary-uid#gl-opt-out-service">Opt-Out</Link> services, and downloads data files directly from AWS S3 using URLs that the Core service provides. For details, see [Private Operator workflow](../guides/integration-options-private-operator.md#private-operator-workflow).

If your environment restricts outbound network traffic, you must allow outbound HTTPS (port 443) to all of the destinations below, or the operator cannot start.

## Integration

The following table lists the hostnames you must allow for the integration environment.

| Hostname | Purpose |
| --- | --- |
| `core-integ.uidapi.com` | Core Service (attestation, keys, salts, configuration) |
| `optout-integ.uidapi.com` | Opt-Out Service |
| `uid2-core-integ-store.s3.us-east-2.amazonaws.com` | Core data storage |
| `uid2-optout-integ-store.s3.us-east-2.amazonaws.com` | Opt-out data storage |

## Production

The following table lists the hostnames you must allow for the production environment.

| Hostname | Purpose |
| --- | --- |
| `core-prod.uidapi.com` | Core Service (attestation, keys, salts, configuration) |
| `optout-prod.uidapi.com` | Opt-Out Service |
| `uid2-core-prod-store.s3.us-east-2.amazonaws.com` | Core data storage |
| `uid2-core-prod-store-replica.s3.us-west-2.amazonaws.com` | Core data storage (failover replica) |
| `uid2-optout-prod-store.s3.us-east-2.amazonaws.com` | Opt-out data storage |
| `uid2-optout-prod-store-replica.s3.us-west-2.amazonaws.com` | Opt-out data storage (failover replica) |

Allow these by hostname rather than by IP address, because the underlying addresses might change.
