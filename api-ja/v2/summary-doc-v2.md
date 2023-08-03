[UID2 Overview](../../README.md) > [Getting Started](../README.md) > UID2 API v2 Documentation

# UID2 API v2 Documentation

UID2 の定義、ID タイプ、指針、構成要素、その他の概念的な詳細は、 [UID2 概要](../../README-ja.md) を参照してください。連絡先やライセンス情報、正規化およびハッシュエンコーディングの規則は、 [Getting Started](../README.md) を参照してください。

このページでは、UID2 API v2 を使い始めるために必要な以下の情報を提供します:

- [Environments（環境）](#environments)
- [Authentication and Authorization（認証と承認）](#authentication-and-authorization)

API の使用方法は、以下のページを参照してください。

| Documentation                                                                               | Content Description                                                                                                                                                                             |
| :------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Encrypting Requests and Decrypting Responses](getting-started/gs-encryption-decryption.md) | UID2 API のリクエスト/レスポンスワークフロー、リクエストの暗号化と応答の復号化の要件、および Python でのスクリプトの例です。                                                                          |
| [Endpoints](endpoints/summary-endpoints.md)                                                 | ID トークンを管理し、メールアドレス、電話番号、ハッシュを UID2 と UID2 の生成に使用したソルトバケット ID に対応付けるための API リファレンスです。<br/>NOTE: インテグレーション環境と本番環境では、異なる[APIキー](../ref-info/glossary-uid.md#gl-api-key)が必要です。 |
| [Integration Guides](guides/summary-guides.md)                                              | パブリッシャー、DSP、広告主、データプロバイダーなどの UID2 参加者、および Microsoft Azure、AWS、Snowflake などの Operator Enterprise Partner 向けの UID2 インテグレーション・ワークフローです。 |
| [SDKs](sdks/summary-sdks.md)                                                                | UID2 SDK を使用するためのドキュメントへのリンクです。                                                                                                                                           |

API バージョン 1 からの改善点・変更点の一覧は、[UID2 API v1→v2 アップグレードガイド](https://github.com/IABTechLab/uid2docs/blob/main/api-ja/v2/upgrades/upgrade-guide.md) を参照してください。

## Environments

すべての UID2 エンドポイントは、同じベース URL を使用します。

| Environment | Cloud Region                 | Code             | Base URL                            |
| :---------- | :--------------------------- | :--------------- | :---------------------------------- |
| テスト環境  | AWS US East (Ohio)           | `us-east-2`      | `https://operator-integ.uidapi.com` |
| 本番環境    | AWS US East (Ohio)           | `us-east-2`      | `https://prod.uidapi.com`           |
| 本番環境    | AWS Asia Pacific (Sydney)    | `ap-southeast-2` | `https://au.prod.uidapi.com`        |
| 本番環境    | AWS Asia Pacific (Tokyo)     | `ap-northeast-1` | `https://jp.prod.uidapi.com`        |
| 本番環境    | AWS Asia Pacific (Singapore) | `ap-southeast-1` | `https://sg.prod.uidapi.com`        |

たとえば、https://operator-integ.uidapi.com/v2/token/generate

## Authentication and Authorization

UID2 エンドポイントに対して認証するには、以下が必要です:

- リクエストの認証ヘッダーにベアラートークンとして含まれるクライアント API キーです。
  <br/>`Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=`
- [POST /token/refresh](endpoints/post-token-refresh.md) を除くすべてのエンドポイントで、API リクエストを暗号化し、API レスポンスを復号化するためのクライアントシークレットです。<br/>詳細と Python の例は、[リクエストの暗号化とレスポンスの復号化](getting-started/gs-encryption-decryption.md) を参照してください。
