---
title: Private Operator Integrations
description: Overview of UID2 Private Operator options.
hide_table_of_contents: false
sidebar_position: 02
---

import Link from '@docusaurus/Link';

# Private Operator Integrations

A Private Operator is a private instance of the UID2 <Link href="../ref-info/glossary-uid#gl-operator">Operator</Link>. This means that a specific entity hosts a private instance of the UID2 Operator, exclusively for their own use.

A Private Operator runs in an <Link href="../ref-info/glossary-uid#gl-enclave">enclave</Link>&#8212;a virtual machine with additional security features to prevent unauthorized access, so that unauthorized individuals cannot download any configuration information or data from the virtual machine.

Enclaves provide hardware-based security features, ensuring that the VM's data and operations are protected from external threats, including the host operating system, hypervisor, and even system administrators.

Running in an enclave provides an extra layer of security to protect the secure data used to produce raw UID2s.

Becoming a Private Operator includes several additional steps, and uses resources that the participant must provide.

On this page, you'll find a high-level overview of integration options and steps, with links to additional information for each option.

## Private Operator Requirements

The participant must host, configure, maintain, and update the Private Operator instance, and must conform to strict security measures. Engineering resources are required to integrate and to make ongoing updates.

The participant must sign a contract (see [Account Setup](../getting-started/gs-account-setup.md)) to host a Private Operator instance.

:::note
A Private Operator has no visibility into the raw UID2s or UID2 tokens processed by a Public Operator or another Private Operator. Each Private Operator is isolated from all other Operators.
:::

## Private Operator Workflow

Every Private Operator runs in one of the following:

- [Nitro](https://aws.amazon.com/ec2/nitro/) Enclave (AWS)
- Confidential space (GCP)
- Confidential computing environment (Azure)

Each of these ensures that the Private Operator runs in a protected memory space.

The basic workflow is as follows:

1. On startup, the Private Operator goes through an attestation process with the <a href="../ref-info/glossary-uid#gl-core-service">Core</a> service. The attestation process verifies that the Operator is running in a secure trusted execution environment (TEE), and that the environment hasn't been tampered with.

1. When the Operator passes the attestation process, the Core service gives the Private Operator secure S3 URLs for retrieving the information it needs for startup.

1. The Private Operator retrieves the security information from Amazon S3 that it needs to process UID2s, such as salts, encryption keys, and user opt-out records. For security details, see [Private Operator Security](#private-operator-security).

1. If an Operator is restarted, it goes through the attestation process again, and retrieves a fresh set of security information.

1. The Operator re-attests periodically with the Core service to ensure that it is still running in a protected environment. If any compromise is detected, the Operator shuts down.

## Private Operator Security

Each supported Private Operator implementation must meet rigorous security standards. Some security points include:

- The Private Operator runs in a hardware-based trusted execution environment (TEE) hosted by one of the supported cloud providers listed in [Private Operator Integration Options](#private-operator-integration-options).
- The Private Operator must complete an attestation process before accessing the information needed to process UID2s.
- The information on S3 is encrypted at rest and also encrypted in transit through TLS. In addition, access is limited to only correctly authorized and attested Private Operators.
- The information retrieved at startup is not stored locally at any point. It is only ever held in memory, and the Private Operator is running in a protected environment that makes it difficult for anyone running the Operator (such as an Administrator), as well as any external players, to see the data that's in memory.

## Private Operator Integration Options

The following Private Operator integrations are available. 

There is no functional difference between the Private Operator versions.

| Integration Type| Documentation | Content Description |
| :--- | :--- | :--- |
| AWS | [UID2 Private Operator for AWS Integration Guide](../guides/operator-guide-aws-marketplace.md) | Instructions for setting up a Private Operator service for AWS Marketplace. |
| GCP Confidential Space | [UID2 Private Operator for GCP Integration Guide](../guides/operator-private-gcp-confidential-space.md) | Information for setting up the UID2 Operator Service in [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space), a confidential computing option from [Google Cloud](https://cloud.google.com/docs/overview/) Platform. |
| Azure | [UID2 Private Operator for Azure Integration Guide](../guides/operator-guide-azure-enclave.md) | Instructions for setting up the UID2 Operator Service in a Confidential Container, a confidential computing option from Microsoft Azure. |

## Additional Information

The following additional resources are available for those interested in hosting a Private Operator:

- General information about Private Operators, including a summary of benefits: see [UID2 Overview for Private Operators](../overviews/overview-operators-private.md).

- General information about how Operators work: see [The UID2 Operator](../ref-info/ref-operators-public-private.md).
