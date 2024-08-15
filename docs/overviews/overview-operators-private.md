---
title: Private Operators
description: Information summary for Private Operators.
hide_table_of_contents: false
use_banner: true
banner_title: UID2 Overview for Private Operators
banner_description: Own the process of generating UID2s from DII in a private environment.
---

import Link from '@docusaurus/Link';

Private Operators of UID2 send first-party <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> to a secure environment for translation, and control the destinations for those identifiers. A participant that chooses to become a Private Operator can generate and manage UID2s, running a UID2 <Link href="../ref-info/glossary-uid#gl-operator">Operator</Link> service in a private environment.

Learn about what the UID2 framework offers to Private Operators, including benefits, hosting options, documentation and other resources, and how to get started.

## Benefits

Here are some of the intended benefits of participating in UID2 as a Private Operator:
- You can maintain privacy-conscious workflows for your customer data to be encrypted and activated across chosen partners.
- You can participate in UID2 using your own first-party <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> without sharing it.
- You have full control of resources, performance, and latency for UID2.
- You can plan to minimize network hops with a service that can provide regional proximity.
- You can implement processes and policies that you control, as opposed to taking part in a shared service.

For more information, see [The UID2 Operator](../ref-info/ref-operators-public-private.md).

## Hosting Options for Private Operators

If you choose to be a Private Operator, several implementation options are available. You can do any of the following:

- Use a cloud services setup. UID2 supports hosting UID2 in an <Link href="../ref-info/glossary-uid#gl-enclave">enclave</Link> on the following cloud service providers (medium level of effort to implement):
  - Amazon Web Services (AWS)
  - Microsoft Azure
  - Google Cloud Platform (GCP)
- Use your own machines to generate and manage UID2s (greater level of effort to implement).

## Getting Started

1. Request access to UID2 by filling out the form on the [Request Access](/request-access) page.
2. Decide which implementation option you want to use.

   For details about available options, see [Private Operator Integrations](../guides/integration-options-private-operator.md).
3. If you're using an SDK, download the SDK. Refer to the applicable SDK guide.
4. Follow the instructions in the implementation guide for the option you chose.

   :::note
   Be sure to encrypt request messages to UID2. For details, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).
   :::
5. Test.
6. Go live.

## Implementation Resources

The following documentation resources are available for Private Operators to implement UID2.

:::tip
For a detailed summary of options, see [Private Operator Integrations](../guides/integration-options-private-operator.md).
:::

| Integration Type| Documentation | Content Description |
| :--- | :--- | :--- |
| AWS | [UID2 Private Operator for AWS Integration Guide](../guides/operator-guide-aws-marketplace.md) | Instructions for setting up a Private Operator service for AWS Marketplace. |
| GCP Confidential Space | [UID2 Private Operator for GCP Integration Guide](../guides/operator-private-gcp-confidential-space.md) | Information for setting up the UID2 Operator Service in [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space), a confidential computing option from [Google Cloud](https://cloud.google.com/docs/overview/) Platform. |
| Azure | [UID2 Private Operator for Azure Integration Guide](../guides/operator-guide-azure-enclave.md) | Instructions for setting up the UID2 Operator Service in a Confidential Container, a confidential computing option from Microsoft Azure. |

## FAQs

For a list of frequently asked questions regarding the UID2 framework, see [Frequently Asked Questions](../getting-started/gs-faqs.md).
