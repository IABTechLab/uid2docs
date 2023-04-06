[UID2 API Documentation](../../README.md) > [v1](../README.md) > Integration Guides

# UID2 Integration Guides (Deprecated)

> IMPORTANT: UID2 API v1 は非推奨となり、2023 年 3 月 31 日までにすべての v1 SDK ファイルとエンドポイント、v0 SDK ファイル、およびバージョン管理されていないエンドポイントが削除され、現在のユーザーのみがサポートされるようになります。2023 年 3 月 31 日までに、必ず UID2 API v2(../../v2/upgrades/upgrade-guide.md) へのアップグレードをお願いします。初めてフレームワークに触れる方は、[UID2 API v2](../../v2/summary-doc-v2.md) をご利用ください。

以下のガイドでは、パブリッシャー、DSP、データプロバイダ/広告主など、組織のニーズと要件、およびその主な役割に基づいたインテグレーション手順を提供します。UID2 メンバーとして、Open Operator Service との連携や Closed Operator Service のホスティングを可能にするエンタープライズパートナーを介してインテグレーションすることもできます。

## Publisher, DSP, and Data Provider Integrations

| Integration Guide                                                                                                                     | Content Description                                                                                                                                                              |
| :------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Publisher - Client-Side JavaScript SDK<br/>[with SDK v1](./publisher-client-side.md)<br/>[with SDK v0](./publisher-client-side-v0.md) | このパブリッシャー向けインテグレーションガイドは、Client-Side Identity JavaScript SDK を利用した標準的な Web インテグレーションシナリオをカバーしています。                      |
| [Publisher Integration Guide, Server-Only (Without SDK) (Deprecated)](./custom-publisher-integration.md)                              | このパブリッシャー向けのインテグレーションガイドでは、Client-Side JavaScript SDK を利用しない、アプリ開発者と CTV 放送局向けのカスタムインテグレーションシナリオを扱っています。 |
| [DSP Integration Guide (Deprecated)](./dsp-guide.md)                                                                                  | この DSP のためのインテグレーションガイドは、入札のための UID2 の処理と、ユーザーのオプトアウトを受け入れることについてカバーしています。                                        |
| [Advertiser/Data Provider Integration Guide (Deprecated)](./advertiser-dataprovider-guide.md)                                         | この広告主やデータパートナー向けのインテグレーションガイドは、オーディエンス構築とターゲティングのための ID マッピングのインテグレーションワークフローをカバーしています。       |

## Open Operator Service Integration

| Integration Guide                                          | Content Description                                                                            |
| :--------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| [Operator - Snowflake](./../sdks/snowflake_integration.md) | Snowflake Data Marketplace でホストされている Open Operator Service と連携するための手順です。 |

## Closed Operator Service Setup

| Integration Guide                                               | Content Description                                                                                                          |
| :-------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| [Operator - Microsoft Azure](./operator-guide-azure-enclave.md) | Microsoft Azure Confidential Computing プラットフォーム上で動作させるための Closed Operator サービスのセットアップ手順です。 |
