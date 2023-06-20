---
title: Private Operators
description: Information summary for private operators.
hide_table_of_contents: false
use_banner: true
banner_title: UID2 Overview for Private Operators
banner_description: Own the process of generating UID2s from DII in a private environment.
---

Private operators of UID2 send first-party [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) to a secure environment for translation, and control the destinations for those identifiers.

This page provides information about what the Unified ID 2.0 (UID2) framework offers to private operators, available implementation options, and how to get started.

## Audience

This page is for any participant that chooses to become a private operator (previously known as closed operator) to generate and manage UID2s, running a UID2 Operator service in a private environment.

Here are some of the intended benefits of participating in UID2 as a private operator:
- You can maintain privacy-conscious workflows for your customer data to be encrypted and activated across chosen partners.
- You can participate in UID2 using your own first-party [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) without sharing it.
- You have full control of resources, performance, and latency for UID2.
- You can aim to minimize network hops with a service that can provide regional proximity.
- You can implement processes and policies that you control, as opposed to taking part in a shared service.

## Hosting Options for Private Operators

If you choose to be a private operator, the following implementation options are available:

- Use a cloud services setup. UID2 supports hosting UID2 in an [enclave](../ref-info/glossary-uid.md#gl-enclave) on the following cloud service providers (see documentation in the [Resources](#resources) section) (medium level of effort to implement):
  - Amazon Web Services (AWS)
  - Microsoft Azure
  - Google Cloud Platform (GCP)
- Use your own machines to generate and manage UID2s (harder level of effort to implement).

## Resources

The following documentation resources are available for private operators to implement UID2.

| Integration Type| Documentation | Content Description | Audience |
| :--- | :--- | :--- | :--- |
| Operator | [UID2 Operator - AWS Marketplace Integration Guide](../guides/operator-guide-aws-marketplace.md) | Instructions for setting up a Private Operator service for AWS Marketplace. | Private Operators<br/>Publishers |
| GCP| [UID2 Operator - Google Cloud Platform Confidential Computing package](../guides/operator-guide-gcp-enclave.md) | Instructions for setting up the Google Cloud Platform Confidential Computing package (GCP). | Private Operators<br/>Publishers |
| Azure | [Operator - Microsoft Azure](../guides/operator-guide-azure-enclave.md) | IMPORTANT: This documentation is currently only a proof of concept. For additional guidance, please [contact](../getting-started/gs-account-setup.md#contact-info) the UID2 administrator.<br/>Instructions for setting up a Private Operator service for running on Microsoft Azure Confidential Computing platform.  | Private Operators<br/>Publishers |

## Getting Started

1. Request access to UID2 by filling out the form on the [Request Access](/request-access) page.
2. Decide which implementation option you want to use.
3. If you're using an SDK, download the SDK. Refer to the applicable SDK guide.
4. Follow the instructions in the implementation guide for the option you chose.

     NOTE: Be sure to encrypt request messages to UID2. For details, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).
5. Test.
6. Go live.

## Frequently Asked Questions

Here are some FAQs regarding the UID2 framework: [Frequently Asked Questions](../getting-started/gs-faqs.md).
