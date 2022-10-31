[UID2 Overview](./README-ja.md) > Supply-Side Workflow

# Supply-Side Workflow Overview

The following steps provide a high-level outline of the workflow intended for organizations that propagate UID2 tokens to the bid stream via SSPs—for example, identity providers, publishers, and SSO providers. Publishers can choose to work with an SSO provider or an independent ID provider that is interoperable with UID2. The latter can handle the UID2 integration on behalf of publishers.

1. A user visits a publisher website, mobile app, or CTV app.
2. The publisher explains the value exchange of the open internet and requests the user to log in.
3. Once the user logs in, the publisher sends the first-party PII and corresponding privacy settings to the UID2 Operator via an SDK or direct API integration. A publisher may authorize an SSO provider or identity provider to pass PII and privacy settings on their behalf.
4. The UID2 Operator performs the salt, hash, and encryption process and returns the UID2 Token.
5. The publisher stores the UID2 Token to share with SSPs during real-time bidding.
   - Server-side: The publisher stores the token in a mapping table, DMP, data lake, or other server-side application.
   - Client-side: The publisher stores the token in a client-side app or in the user’s browser as a first-party cookie.
6. The publisher sends the UID2 token to the SSP at the time of impression.
7. The SSP places a bid request using the UID2 token, capturing it in the bid stream.
8. The publisher requests updated UID2 tokens using a refresh token. When applicable, the refresh token includes a user’s opt-out request.

![Publisher Workflow](/images/publisher_workflow.jpg)

以下のステップは、ID プロバイダー、パブリッシャー、SSO プロバイダーなど、SSP を介して UID2 Token を入札ストリームに伝達する組織向けの、高レベルのワークフローの概要を示すものです。パブリッシャーは、SSO プロバイダーか、UID2 と相互運用可能な独立した ID プロバイダーのいずれかと連携することを選択できます。後者はパブリッシャーに代わって UID をインテグレーションすることができます。

1. ユーザーがパブリッシャーのウェブサイト、モバイルアプリ、または CTV アプリにアクセスします。
2. パブリッシャーがオープンインターネットの価値交換を説明し、ユーザーにログインをリクエストします。
3. ユーザーがログインすると、パブリッシャーは、SDK またはダイレクト API インテグレーションを通じて、ファーストパーティーの PII と対応するプライバシー設定を UID2 Operator に送信します。パブリッシャーは、SSO プロバイダーや ID プロバイダーに、PII とプライバシー設定の受け渡しを代行する権限を付与することもできます。
4. UID2 Operator は、ソルト化、ハッシュ化、暗号化処理を実行し、UID2 Token を返します。
5. パブリッシャーは UID2 Token を保存し、リアルタイム入札の際に SSP と共有します。
   - サーバーサイド: パブリッシャーは、トークンをマッピングテーブル、DMP、データレイク、その他のサーバーサイドアプリケーションに格納します。
   - クライアントサイド: パブリッシャーはトークンをクライアントサイドのアプリケーションまたはユーザーのブラウザにファーストパーティークッキーとして保存する。
6. パブリッシャーは、インプレッション時に UID2 トークンを SSP に送信します。
7. SSP は UID2 Token を使って入札リクエストを行い、ビッドストリームに取り込みます。
8. パブリッシャーは Refresh Token を使用して UID2 Token の更新を要求します。オプトアウトされていれば、Refresh Token にはユーザーのオプトアウトリクエストが含まれます。

![Publisher Workflow](/images/publisher_workflow.jpg)

## Integrations

For integration scenarios, token management, and other details, see [Publisher Integration Guides](/api/v2/guides/README.md). See also [Endpoints](/api/v2/endpoints/README.md).

インテグレーションシナリオ、トークン管理、その他の詳細については、[Publisher Integration Guides](/api-ja/v2/guides/README.md) を参照してください。[Endpoints](/api-ja/v2/endpoints/README.md) も参照してください。

### Direct Integration Requirements

Publishers who want to send users' PII and generate UID2s must meet the followign requirements:

- Have access the UID2 Operator API.
- Integrate with UID2 Operator API to generate UID2 tokens.
- Maintain refresh tokens or use the JavaScript client-side SDK provided by UID2 to manage the refresh token.
- Enable sending the UID2 token to SSPs and other integrating organizations.

ユーザーの PII を送信して UID2 を生成したいパブリッシャーは、以下の要件を満たす必要があります。

- UID2 Operator API にアクセスできること。
- UID2 Operator API のインテグレーションを行い UID2 Token を生成すること。
- Refresh Token を維持する、または UID2 が提供する JavaScript client-side SDK を使用して Refresh Token を管理すること。
- UID2 Token を SSP やその他の統合組織に送信できるようにすること。

### Integration Through SSO or Identity Providers

Publishers may choose to work with an SSO or independent ID provider who is interoperable with UID2. The provider may handle the UID2 integration on their behalf.

パブリッシャー社は、UID2 と相互運用可能な SSO または独立系 ID プロバイダーと協力するもできます。プロバイダーは、UID2 インテグレーションを代行することができます。
