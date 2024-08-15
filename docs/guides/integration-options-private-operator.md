---
title: Private Operator Integrations
description: Overview of UID2 Private Operator options.
hide_table_of_contents: false
sidebar_position: 02
---

import Link from '@docusaurus/Link';

# Private Operator Integrations

A Private Operator is a private instance of the UID2 <Link href="../ref-info/glossary-uid#gl-operator">Operator</Link>. This means that a specific entity hosts a private instance of the UID2 Operator, exclusively for their own use.

A Cloud-based Private Operator runs in an <Link href="../ref-info/glossary-uid#gl-enclave">enclave</Link>&#8212;a memory-hardened virtual machine that prevents unauthorized access, so that unauthorized individuals, even if they are administrators, cannot download any configuration information or data from the virtual machine.

This is an extra layer of security so that no one can see the salt values used to produce raw UID2s, and instead only the salt bucket ID is stored outside the Operator.

Becoming a Private Operator includes several additional steps, and uses resources that the participant must provide.

On this page, you'll find a high-level overview of integration steps and integration options, with links to additional information for each option.

## Private Operator Requirements

The participant must host, configure, maintain, and update the Private Operator instance, and must conform to strict security measures. Engineering resources are required to integrate and to make ongoing updates.

The participant must sign a contract (see [Account Setup](../getting-started/gs-account-setup.md)) to host a Private Operator instance.

:::note
A Private Operator has no visibility into the raw UID2s or UID2 tokens processed by a Public Operator or another Private Operator. Each Private Operator is a completely closed infrastructure.
:::

## Private Operator Workflow

Every Private Operator runs in an enclave (AWS), confidential space (GCP), or confidential computing environment, (Azure). Each of these ensures that the Private Operator runs in a protected memory space.

The basic workflow is as follows:

1. On startup, the Private Operator goes through an attestation process with the Core service. The attestation process verifies that the Operator is running in a secure and memory-hardened environment that is known and trusted, and that the environment hasn't been tampered with.

1. When the Operator passes that attestation process, the Core service gives the Private Operator a secure S3 URL for retrieving the information it needs for startup.

1. The Private Operator retrieves the security information from Amazon S3 that it needs to process UID2s, such as salts, encryption keys, and user opt-out records. For security details, see [Private Operator Security](#private-operator-security).

1. If an Operator is restarted, it goes through the attestation process again, and retrieves a fresh set of security information.

1. The Operator re-attests periodically with Core to ensure that it is still running in a protected environment. If any compromise is detected, the Operator shuts down.

The information exchange between the UID2 Core service and the UID2 Opt-Out service is secured using TLS. (**GWH_TM01: is this actually part of the Private Operator?**)

## Private Operator Security

Each supported Private Operator implementation must meet rigorous security standards. Some security points include:

- The environment is secure and memory-hardened.
- The Private Operator must complete an attestation process before accessing the information needed to process UID2s.
- The information on S3 is encrypted at rest, and is encrypted in transit through TLS.
- The information retrieved at startup is not stored locally at any point. It is only ever held in memory, and the Private Operator is running in a protected environment that makes it difficult for anyone running the Operator (an Administrator), as well as any external players, to see the data that's in memory.

## Private Operator Integration Options

The following Private Operator integrations are available.

| Integration Type| Documentation | Content Description |
| :--- | :--- | :--- |
| AWS | [UID2 Private Operator for AWS Integration Guide](../guides/operator-guide-aws-marketplace.md) | Instructions for setting up a Private Operator service for AWS Marketplace. |
| GCP Confidential Space | [UID2 Private Operator for GCP Integration Guide](../guides/operator-private-gcp-confidential-space.md) | Information for setting up the UID2 Operator Service in [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space), a confidential computing option from [Google Cloud](https://cloud.google.com/docs/overview/) Platform. |
| Azure | [UID2 Private Operator for Azure Integration Guide](../guides/operator-guide-azure-enclave.md) | Instructions for setting up the UID2 Operator Service in a Confidential Container, a confidential computing option from Microsoft Azure. |

## Additional Information

The following resources are available for those interested in becoming a Private Operator:

- General information about Private Operators, including a summary of benefits: see [UID2 Overview for Private Operators](../overviews/overview-operators-private.md).

- General information about how Operators work: see [The UID2 Operator](../ref-info/ref-operators-public-private.md).
