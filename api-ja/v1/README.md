# UID2 API v1 (Deprecated)

> IMPORTANT: UID2 API v1 は非推奨となり、2023 年 3 月 31 日までにすべての v1 SDK ファイルとエンドポイント、v0 SDK ファイル、およびバージョン管理されていないエンドポイントが削除され、現在のユーザーのみがサポートされるようになります。2023 年 3 月 31 日までに、必ず [UID2 API v2](../v2/upgrades/upgrade-guide.md) へのアップグレードをお願いします。初めてフレームワークに触れる方は、[UID2 API v2](../v2/summary-doc-v2.md) をご利用ください。

UID2 の定義、形式、指針、構成要素、その他の概念的な詳細については、 [UID2 概要](../../README-ja.md) を参照してください。連絡先やライセンス情報、正規化やハッシュエンコーディングの規則については、[Unified ID 2.0 API Documentation](../README.md) を参照してください。API v2 の詳細については、[UID2 API v2 Documentation](../v2/README.md) を参照してください。

このページでは、UID2 API v1 を使い始めるために必要な以下の情報を提供します:

- [Environment（環境）](#environment)
- [Authentication（認証）](#authentication)
- [Query Parameter Value Encoding（クエリパラメータ値のエンコード）](#query-parameter-value-encoding)

v1 UID2 API の使用方法については、以下のページを参照してください。

| Documentation                            | Content Description                                                                                                                                                                             |
| :--------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Endpoints](./endpoints/README.md)       | ID トークンを管理し、メールアドレス、電話番号、ハッシュを UID2 と UID2 を生成するために使用したソルトバケット ID に対応付けるための API リファレンスです。                                      |
| [Integration Guides](./guides/README.md) | パブリッシャー、DSP、広告主、データプロバイダーなどの UID2 メンバー、および Microsoft Azure、AWS、Snowflake などの Operator Enterprise Partner 向けの UID2 インテグレーションワークフローです。 |
| [SDKs](./sdks/README.md)                 | Web サイト用のクライアント側 JavaScript SDK や RTB 用のサーバー側 SDK ガイドなど、SDK ドキュメントへのリンク。                                                                                  |

## Environment

すべての UID2 エンドポイントは、同じベース URL を使用します。

| Environment | Base URL                               |
| :---------- | :------------------------------------- |
| テスト環境  | `https://operator-integ.uidapi.com/v1` |
| 本番環境    | `https://prod.uidapi.com/v1`           |

例えば、https://operator-integ.uidapi.com/v1/token/generate

## Authentication

UID2 エンドポイントを認証するには、リクエストの authorization ヘッダーにベアラートークンを使用します。

`Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=`

## Query Parameter Value Encoding

リクエストにクエリパラメータの値を渡す際には、クエリパラメータの値が URL エンコードされていることを確認してください。JavaScript の `encodeURIcomponent()` またはコーディングする言語の相当するものを使用してください。

以下の表は、クエリパラメータを URL エンコードし、Base64 エンコードした SHA256 の例です。

| Type          | Example                                            | Usage                                                                      |
| :------------ | :------------------------------------------------- | :------------------------------------------------------------------------- |
| Email address | `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf%2FF5HVRQ%3D` | このエンコーディングは `email_hash` クエリパラメータの値として使用します。 |
| Phone number  | `wdN1alhrbw1Bmz49GzKGdPvGxLhCNn7n3teAOQ%2FFSK4%3D` | このエンコーディングは `phone_hash` クエリパラメータの値として使用します。 |

正規化およびハッシュエンコーディングの規則については、[Unified ID 2.0 API Documentation](../README.md) を参照してください。
