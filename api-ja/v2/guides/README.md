[UID2 API Documentation](../../README.md) > [v2](../README.md) > Integration Guides

# UID2 Integration Guides

以下のガイドでは、パブリッシャー、DSP、データプロバイダー/広告主など、組織のニーズと要件、およびその主な役割に基づいたインテグレーション手順を提供します。メンバーとして、Open Operator Service との連携や Closed Operator Service のホスティングを可能にするエンタープライズパートナーを介してインテグレーションすることもできます。

## Publisher, DSP, and Data Provider Integrations

| Integration Guide                                              | Content Description                                                                                                                                                                            |
| :------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Publisher - UID2 SDK](./publisher-client-side.md)             | このパブリッシャー向けインテグレーションガイドは、Client-Side Identity JavaScript SDK を利用した標準的なウェブインテグレーションシナリオをカバーしています。                                   |
| [Publisher - Server-Only](./custom-publisher-integration.md)   | このパブリッシャー向けのこのインテグレーションガイドは、UID2 SDK を使用しない、アプリ開発者と CTV 放送局のカスタムインテグレーションシナリオをカバーしています。                               |
| [DSP](./dsp-guide.md)                                          | この DSP のためのインテグレーションガイドは、入札のための UID2 の処理と、ユーザーのオプトアウトに対応することをカバーしています。                                                              |
| [Advertiser/Data Provider](./advertiser-dataprovider-guide.md) | この広告主やデータパートナー向けのインテグレーションガイドは、オーディエンスの構築とターゲティングのためのアイデンティティマッピングのためのインテグレーションワークフローをカバーしています。 |

## Open Operator Service Integration

| Integration Guide                                          | Content Description                                                                            |
| :--------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| [Operator - Snowflake](./../sdks/snowflake_integration.md) | Snowflake Data Marketplace でホストされている Open Operator Service と連携するための手順です。 |

## Closed Operator Service Setup

| Integration Guide                                               | Content Description                                                                                                          |
| :-------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| [Operator - Microsoft Azure](./operator-guide-azure-enclave.md) | Closed Operator Service を Microsoft Azure Confidential Computing プラットフォーム上で動作させるためのセットアップ手順です。 |
| [Operator - AWS](./operator-guide-aws-nitro-enclave.md)         | Closed Operator Service を AWS Nitro Enclave 上で動作させるためのセットアップ手順です。                                      |
