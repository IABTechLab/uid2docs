[UID2 Overview](../../../README.md) > [Getting Started](../../README.md) > [v2](../summary-doc-v2.md) > Integration Guides

# UID2 Integration Guides

The following guides provide integration instructions based on the needs and requirements of your organization and its primary role as a publisher, DSP, or data provider/advertiser. As a UID2 participant, you may also integrate via Enterprise Partners that enable engaging with an Open Operator service and hosting of a Closed Operator service. 

## Publisher, DSP, and Data Provider Integrations

| Integration Guide |  Content Description |
| :--- | :--- |
| [Client-Side JavaScript SDK Integration Guide](publisher-client-side.md) | This integration guide for publishers covers standard web integration scenarios that use the [Client-Side JavaScript SDK (v2)](../sdks/client-side-identity.md). |
| [Publisher Integration Guide, Server-Only (Without SDK)](custom-publisher-integration.md) | This integration guide for publishers covers integration scenarios that do not use the [Client-Side JavaScript SDK (v2)](../sdks/client-side-identity.md). |
| [DSP](dsp-guide.md) | This integration guide for DSPs covers handling UID2s for bidding and honoring user opt-outs. |
| [Advertiser/Data Provider](advertiser-dataprovider-guide.md) | This integration guide for advertisers and data providers covers integration workflows for mapping identity for audience-building and targeting. |

## Supplementary Integrations

| Integration Guide |  Content Description |
| :--- | :--- |
| [Publisher - Google Ad Manager Secure Signals](google-ss-integration.md) | This integration guide covers the additional steps needed for publishers using UID2 with the Google Ad Manager secure signals feature (previously known as encrypted signals for publishers, ESP). |

## Open Operator Service Integration
 
| Integration Guide |  Content Description |
| :--- | :--- |
| [Snowflake Integration Guide](../sdks/snowflake_integration.md) | Instructions for generating UIDs from emails within Snowflake |

## Closed Operator Service Setup
 
| Integration Guide |  Content Description |
| :--- | :--- |
| [Operator - Microsoft Azure](operator-guide-azure-enclave.md) | IMPORTANT: This documentation is currently only a proof of concept. Please [contact](../../README.md#contact-info) the UID2 administrator for additional guidance.<br/>Instructions for setting up Closed Operator service for running on Microsoft Azure Confidential Computing platform.  |
| [Operator - AWS Marketplace](operator-guide-aws-marketplace.md) | Instructions for setting up Closed Operator service for AWS Marketplace. |
| [Operator - Google Cloud Platform Confidential Computing package](operator-guide-gcp-enclave.md) | Instructions for setting up the Google Cloud Platform Confidential Computing package (GCP). |
