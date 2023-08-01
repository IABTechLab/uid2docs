---
title: UID2 Integration Guides - Summary
description: Summary of all the integration guides available.
hide_table_of_contents: false
sidebar_position: 01
---

# UID2 Integration Guides

The following guides provide integration instructions based on the needs and requirements of your organization and its primary role as a publisher, DSP, or data provider/advertiser. As a UID2 participant, you may also integrate via Enterprise Partners that enable engaging with an Open Operator service and hosting of a Private Operator service. 

## Publisher, DSP, and Data Provider Integrations

| Integration Guide |  Content Description |
| :--- | :--- |
| [Prebid Integration Guide](integration-prebid.md) | An integration guide for publishers who want to directly integrate with UID2 and generate identity tokens to be passed by Prebid in the RTB bid stream. |
| [UID2 SDK for JavaScript Integration Guide](publisher-client-side.md) | This integration guide for publishers covers standard web integration scenarios that use the [UID2 SDK for JavaScript](../sdks/client-side-identity.md). |
| [Publisher Integration Guide, Server-Only](custom-publisher-integration.md) | This integration guide is for publishers that do not use the [UID2 SDK for JavaScript](../sdks/client-side-identity.md). |
| [DSP](dsp-guide.md) | This integration guide for DSPs covers handling UID2s for bidding and honoring user opt-outs. |
| [Advertiser/Data Provider](advertiser-dataprovider-guide.md) | This integration guide for advertisers and data providers covers integration workflows for mapping identity for audience-building and targeting. |

## Supplementary Integrations

| Integration Guide |  Content Description |
| :--- | :--- |
| [Publisher - Google Ad Manager Secure Signals](google-ss-integration.md) | This integration guide covers the additional steps needed for publishers using UID2 with the Google Ad Manager Secure Signals feature (previously known as Encrypted Signals for Publishers, ESP). |

## Open Operator Service Integration
 
| Integration Guide |  Content Description |
| :--- | :--- |
| [Snowflake Integration Guide](snowflake_integration.md) | Instructions for generating UIDs from emails within Snowflake. |

## Private Operator Service Setup
 
| Integration Guide |  Content Description |
| :--- | :--- |
| [Operator - AWS Marketplace](operator-guide-aws-marketplace.md) | Instructions for setting up a Private Operator service for AWS Marketplace. |
| [Operator - Google Cloud Platform Confidential Computing package](operator-guide-gcp-enclave.md) | Instructions for setting up the Google Cloud Platform Confidential Computing package (GCP). |
| [Operator - Microsoft Azure](operator-guide-azure-enclave.md) | IMPORTANT: This documentation is currently only a proof of concept. For additional guidance, please [contact](../getting-started/gs-account-setup.md#contact-info) the UID2 administrator.<br/>Instructions for setting up a Private Operator service for running on Microsoft Azure Confidential Computing platform.  |
