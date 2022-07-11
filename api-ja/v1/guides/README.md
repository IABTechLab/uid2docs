[UID2 API Documentation](../../README.md) > [v1](../README.md) > Integration Guides

# UID2 Integration Guides

以下のガイドでは、パブリッシャー、DSP、データプロバイダ/広告主など、組織のニーズと要件、およびその主な役割に基づいたインテグレーション手順を提供します。UID2 メンバーとして、Open Operator Service との連携や Closed Operator Service のホスティングを可能にするエンタープライズパートナーを介してインテグレーションすることもできます。

## Publisher, DSP, and Data Provider Integrations

| Integration Guide                                                                                                       | Content Description                                                                                                                                                        |
| :---------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Publisher - UID2 SDK<br/>[[with SDK v1](./publisher-client-side.md)]<br/>[[with SDK v0](./publisher-client-side-v0.md)] | このパブリッシャー向けインテグレーションガイドは、Client-Side Identity JavaScript SDK を利用した標準的な Web インテグレーションシナリオをカバーしています。                |
| [Publisher - Server-Only](./custom-publisher-integration.md)                                                            | このパブリッシャー向けのインテグレーションガイドでは、UID2 SDK を利用しない、アプリ開発者と CTV 放送局向けのカスタムインテグレーションシナリオを扱っています。             |
| [DSP](./dsp-guide.md)                                                                                                   | この DSP のためのインテグレーションガイドは、入札のための UID2 の処理と、ユーザーのオプトアウトを尊重することについてカバーしています。                                    |
| [Advertiser/Data Provider](./advertiser-dataprovider-guide.md)                                                          | この広告主やデータパートナー向けのインテグレーションガイドは、オーディエンス構築とターゲティングのための ID マッピングのインテグレーションワークフローをカバーしています。 |

## Open Operator Service Integration

| Integration Guide                                          | Content Description                                                                            |
| :--------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| [Operator - Snowflake](./../sdks/snowflake_integration.md) | Snowflake Data Marketplace でホストされている Open Operator Service と連携するための手順です。 |

## Closed Operator Service Setup

| Integration Guide                                               | Content Description                                                                                                          |
| :-------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| [Operator - Microsoft Azure](./operator-guide-azure-enclave.md) | Microsoft Azure Confidential Computing プラットフォーム上で動作させるための Closed Operator サービスのセットアップ手順です。 |
| [Operator - AWS](./operator-guide-aws-nitro-enclave.md)         | AWS Nitro Enclave 上で動作させるためのクローズドオペレータサービスのセットアップ手順です。                                   |
