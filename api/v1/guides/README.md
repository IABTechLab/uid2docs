[UID2 API Documentation](../../README.md) > [v1](../README.md) > Integration Guides

# UID2 Integration Guides (Deprecated)

>IMPORTANT: The v1 UID2 API has been deprecated and will be supported only for the current users until March 31, 2023, when all v1 SDK files and endpoints, the v0 SDK files, and any unversioned endpoints will be removed. Be sure to [upgrade to the v2 UID2 API](../../v2/upgrade-guide.md) by March 31, 2023. If you are new to the framework, use the [UID2 API v2](../../v2/README.md).

The following guides provide integration instructions based on the needs and requirements of your organization and its primary role as a publisher, DSP, or data provider/advertser. As a UID2 participant, you may also integrate via Enterprise Partners that enable engaging with an Open Operator service and hosting of a Closed Operator service. 

## Publisher, DSP, and Data Provider Integrations

| Integration Guide |  Content Description |
| :--- | :--- |
| Publisher - UID2 SDK<br/>[[with SDK v1](./publisher-client-side.md)]<br/>[[with SDK v0](./publisher-client-side-v0.md)] | This integration guide for publishers covers standard web integration scenarios that utilize the Client-Side Identity JavaScript SDK. |
| [Publisher - Server-Only](./custom-publisher-integration.md) | This integration guide for publishers covers custom integration scenarios for app developers and CTV broadcasters, without utilizing the UID2 SDK. |
| [DSP](./dsp-guide.md) | This integration guide for DSPs covers handling UID2s for bidding and honoring user opt-outs. |
| [Advertiser/Data Provider](./advertiser-dataprovider-guide.md) | This integration guide for advertisers and data partners covers integration workflows for mapping identity for audience-building and targeting. |

## Open Operator Service Integration
 
| Integration Guide |  Content Description |
| :--- | :--- |
| [Operator - Snowflake](./../sdks/snowflake_integration.md) | Instructions for engaging with an Open Operator service hosted in the Snowflake Data Marketplace. |

## Closed Operator Service Setup
 
| Integration Guide |  Content Description |
| :--- | :--- |
| [Operator - Microsoft Azure](./operator-guide-azure-enclave.md) | Instructions for setting up Closed Operator service for running on Microsoft Azure Confidential Computing platform. |
