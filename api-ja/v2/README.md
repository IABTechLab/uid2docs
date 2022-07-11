 # UID2 API v2 Documentation

UID2 の定義、形式、指針、構成要素、その他の概念的な詳細については、 [UID2 概要](../../README.md) を参照してください。連絡先やライセンス情報、正規化およびハッシュエンコーディングの規則については、 [Unified ID 2.0 API Documentation](../README.md) を参照してください。

このページでは、UID2 API v2 を使い始めるために必要な以下の情報を提供します:

- [Improvements and Changes from Version 1（バージョン 1 からの改善点・変更点）](#improvements-and-changes-from-version-1)
- [UID2 API v1 Compatibility and Upgrade Requirements（UID2 API v1 の互換性とアップグレードの要件）](#uid2-api-v1-compatibility-and-upgrade-requirements)
- [Environment（環境）](#environment)
- [Authentication and Authorization（認証と承認）](#authentication-and-authorization)

API の使用方法については、以下のページを参照してください。

| Documentation                            | Content Description                                                                                                                                                                             |
| :--------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Encrypting Requests and Decrypting Responses](./encryption-decryption.md) | UID2 APIのリクエスト/レスポンスワークフロー、リクエストの暗号化と応答の復号化の要件、およびPythonでのスクリプトの例  |
| [Endpoints](./endpoints/README.md)       | ID トークンを管理し、メールアドレス、電話番号、ハッシュを UID2 と UID2 を生成するために使用したソルトバケット ID に対応付けるための API リファレンスです。                                      |
| [Integration Guides](./guides/README.md) | パブリッシャー、DSP、広告主、データプロバイダーなどの UID2 参加者、および Microsoft Azure、AWS、Snowflake などの Operator Enterprise Partner 向けの UID2 インテグレーション・ワークフローです。 |
| [SDKs](./sdks/README.md)                 | Web サイト用 Client-side JavaScript SDK と RTB SDK です。                                                                                                                                       |

## Improvements and Changes from Version 1

UID2 API の v2 アップデートは以下の通りです:

- [アプリケーション API レイヤの暗号化](./encryption-decryption.md) は、E2E コンテンツ保護を提供し、UID2 の機密情報がネットワーク事業者や UID2 サービス事業者に漏洩することを防ぎます。
- [認証](#authentication-and-authorization) のためのクライアント API キーに加え、API リクエストの暗号化および API レスポンスの復号化にクライアントシークレットが必要になりました。
- クエリパラメータは不要になりました。新しい POST メソッドは、入力パラメータを JSON 形式のリクエストボディとして受け取ります。
- パラメータ値の URL エンコーディングは必要ありません。
- [POST /identity/map](./endpoints/post-identity-map.md) エンドポイントは、1 つまたは複数のメールアドレス、電話番号、またはそれぞれのハッシュに対する UID2 とソルトバケット ID を取得するようになりました。

## UID2 API v1 Compatibility and Upgrade Requirements

ここでは、UID2 API v2 と v1 の互換性について説明します:

- UID2 API v2 は UID2 API v1 と互換性がないため、アップグレードが必要です。(アップグレードガイドは近日公開予定です)。
- v1 エンドポイントは、移行プロセスが完了するまでサポートされ、適切な通知が適時に発行されます。
- 以前に発行されたクライアント API キーは、v1 エンドポイントで引き続き機能し、v2 エンドポイントで必要になります。
- v2 エンドポイントを使用するには、[API リクエストの暗号化と API レスポンスの復号化](./encryption-decryption.md) にクライアントシークレットが必要です。

## Environment

すべての UID2 エンドポイントは、同じベース URL を使用します。

| Environment | Base URL                               |
| :---------- | :------------------------------------- |
| テスト環境  | `https://operator-integ.uidapi.com/v2` |
| 本番環境    | `https://prod.uidapi.com/v2`           |

例えば、https://operator-integ.uidapi.com/v2/token/generate

## Authentication and Authorization

UID2 エンドポイントに対して認証するには、以下が必要です:

- リクエストの認証ヘッダーにベアラートークンとして含まれるクライアント API キーです。
  <br/>`Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=`
- [POST /token/refresh](./endpoints/post-token-refresh.md) を除くすべてのエンドポイントで、API リクエストを暗号化し、API レスポンスを復号化するためのクライアントシークレットです。<br/>詳細と Python の例については、[リクエストの暗号化とレスポンスの復号化](./encryption-decryption.md) を参照してください。
