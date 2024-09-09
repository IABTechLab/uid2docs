---
title: UID2 Integrations for Private Operators
description: Information summary for Private Operators.
hide_table_of_contents: false
---

import Link from '@docusaurus/Link';

# UID2 Private Operator Integration Overview

UID2 participants that host their own Private Operator send their own first-party <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> to their own, local UID2 <Link href="../ref-info/glossary-uid#gl-operator">Operator</Link> service, running in a private environment.

A Private Operator runs in an <Link href="../ref-info/glossary-uid#gl-enclave">enclave</Link>&#8212;a virtual machine with additional security features to prevent unauthorized access, so that unauthorized individuals cannot download any configuration information or data from the virtual machine.

Becoming a Private Operator includes several additional steps, and uses resources that the participant must provide.

Learn about what the UID2 framework offers for Private Operators, including benefits, hosting options, documentation and other resources, and how to get started.

## Private Operator Benefits

Here are some of the intended benefits of participating in UID2 as a Private Operator:
- You can maintain privacy-conscious workflows for your customer data to be encrypted and activated across chosen partners.
- You can participate in UID2 using your own first-party <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> without sharing it.

  Within a Private Operator solution, DII does not leave your infrastructure.
- You have full control of resources, performance, and latency for UID2. For example:  
  - You can provide greater availability, without rate limitations.
  - If you are not physically located near to a Public Operator instance, you might choose to host a Private Operator solution for latency reasons.
- You can plan to minimize network hops with a service that can provide regional proximity.
- You can implement processes and policies that you control, as opposed to taking part in a shared service.

If you have significant latency concerns, or your security requirements dictate that data stays within your systems, and you also have extensive engineering resources to both build and maintain your UID2 implementation, you might consider the Private Operator solution. 

## Private Operator Requirements

The participant must host, configure, maintain, and update the Private Operator instance, and must conform to strict security measures. Engineering resources are required to integrate and to make ongoing updates.

The participant must sign a contract (see [Account Setup](../getting-started/gs-account-setup.md)) to host a Private Operator instance.

:::note
A Private Operator has no visibility into the raw UID2s or UID2 tokens processed by a Public Operator or another Private Operator. Each Private Operator is isolated from all other Operators.
:::

## Hosting Options for Private Operators

If you choose to be a Private Operator, several implementation options are available. UID2 supports hosting UID2 in an <Link href="../ref-info/glossary-uid#gl-enclave">enclave</Link> on the following cloud service providers (medium level of effort to implement):
- [Nitro Enclave](https://aws.amazon.com/ec2/nitro/) from AWS
- [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space), a confidential computing option from [Google Cloud](https://cloud.google.com/docs/overview/) Platform
- [Confidential Containers](https://learn.microsoft.com/en-us/azure/confidential-computing/confidential-containers), a confidential computing option from Microsoft Azure

## Private Operator Workflow

The basic workflow for a Private Operator is as follows:

1. On startup, the Private Operator goes through an attestation process with the <a href="../ref-info/glossary-uid#gl-core-service">Core</a> service. The attestation process verifies that the Operator is running in a secure trusted execution environment (TEE), and that the environment hasn't been tampered with.

1. When the Operator passes the attestation process, the Core service gives the Private Operator secure S3 URLs for retrieving the information it needs for startup.

1. The Private Operator retrieves the security information from Amazon S3 that it needs to process UID2s, such as salts, encryption keys, and user opt-out records. For security details, see [Private Operator Security](#private-operator-security).

1. If an Operator is restarted, it goes through the attestation process again, and retrieves a fresh set of security information.

1. The Operator re-attests periodically with the Core service to ensure that it is still running in a protected environment. If attestation fails, the Operator shuts down.

## Private Operator Security

Each supported Private Operator implementation must meet rigorous security standards. Some security points include:

- The Private Operator runs in a hardware-based trusted execution environment (TEE) hosted by one of the supported cloud providers listed in [Hosting Options for Private Operators](#hosting-options-for-private-operators).
- The Private Operator must complete an attestation process before accessing the information needed to process UID2s.
- The information on S3 is encrypted at rest and also encrypted in transit through TLS. In addition, access is limited to only correctly authorized and attested Private Operators.
- The information retrieved at startup is not stored locally at any point. It is only ever held in memory, and the Private Operator is running in a protected environment that makes it difficult for anyone running the Operator (such as an Administrator), as well as any external players, to see the data that's in memory.
- The Private Operator never stores <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> that is sent for processing (emails addresses and/or phone numbers). The data is only used within the enclave, to generate UID2s, and is discarded immediately after processing.

## Private Operator Limitations

There are a couple of limitations to Private Operator functionality:
- Private Operators do not currently support <Link href="../ref-info/glossary-uid#gl-client-side">client-side integration</Link>.
- Private Operator updates are released three times per year; Public Operator updates are released on a more frequent cadence.

## Getting Started

To get started as a Private Operator, follow these steps:

1. Request access to UID2 by filling out the form on the [Request Access](/request-access) page.
2. Decide which implementation option you want to use.

   For details about available options, see [Hosting Options for Private Operators](#hosting-options-for-private-operators).
3. If you're using an SDK, download the SDK. Refer to the applicable SDK guide.
4. Follow the instructions in the implementation guide for the option you chose.

   :::note
   Be sure to encrypt request messages to UID2. For details, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).
   :::
5. Test.
6. Go live.

## Implementation Resources

The following documentation resources are available for Private Operators to implement UID2.

There is no functional difference between the Private Operator versions.

| Integration Type| Documentation | Content Description |
| :--- | :--- | :--- |
| AWS | [UID2 Private Operator for AWS Integration Guide](../guides/operator-guide-aws-marketplace.md) | Instructions for setting up a Private Operator service for AWS Marketplace. |
| GCP Confidential Space | [UID2 Private Operator for GCP Integration Guide](../guides/operator-private-gcp-confidential-space.md) | Information for setting up the UID2 Operator Service in [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space), a confidential computing option from [Google Cloud](https://cloud.google.com/docs/overview/) Platform. |
| Azure | [UID2 Private Operator for Azure Integration Guide](../guides/operator-guide-azure-enclave.md) | Instructions for setting up the UID2 Operator Service in an instance of Confidential Containers, a confidential computing option from Microsoft Azure. |
