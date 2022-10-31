[UID2 Overview](./README-ja.md) > Third-Party Data Provider Workflow

# Third-Party Data Provider Workflow Overview

The following steps provide a high-level outline of the workflow intended for organizations that collect user data and push it to DSPs—for example, advertisers, identity graph providers, and third-party data providers.

1. Data provider sends a user’s consented personally identifiable information (PII) to the UID2 Operator.
2. UID2 Operator generates and returns a raw UID2.
3. Data provider stores the UID2 and salt bucket.<br/>
   Server-side: The data provider stores the UID2 in a mapping table, DMP, data lake, or other server-side application.
4. Data provider sends the UID2 to a DSP using permitted transport protocols defined in the code of conduct.
5. Data provider monitors the UID2 Operator for rotated salt buckets and updates UID2s as needed.

![Data Provider Workflow](/images/data_provider.jpg)

以下のステップは、ユーザーデータを収集し DSP にプッシュする組織（広告主、ID グラフプロバイダー、サードパーティデータプロバイダーなど）を対象としたワークフローのアウトラインを提供するものです。

1. データプロバイダーが、同意を得たユーザーの個人識別情報 (PII) を UID2 Operator に送信します。
2. UID2 Operator は raw UID2 を生成して返します。
3. データプロバイダーは UID2 とソルトバケットを保管します。<br/>
   サーバーサイド: データプロバイダー者は、UID2 をマッピングテーブルや DMP、データレイクなどのサーバーサイドのアプリケーションに格納します。
4. データプロバイダーは、行動規範で定義された許可されたトランスポートプロトコルを使用して、UID2 を DSP に送信します。
5. データプロバイダーは、UID2 Operator がローテーションしたソルトバケットを監視し、必要に応じて UID2 を更新します。

![Data Provider Workflow](/images/data_provider.jpg)

## Integration Requirements

To generate UID2s from users' PII, third-party data providers must meet the following requirements:

- Integrate with a UID2 Operator to generate UID2s and handle salt bucket rotations.
- Have access to the UID2 Operator APIs.<br/>Some advertisers may choose to work through CDPs, data on-boarders, or other service providers instead.

For details, see [Advertiser and Third-party Data Provider Integration Guide](/api/v2/guides/advertiser-dataprovider-guide.md).

ユーザーの PII から UID2 を生成するためには、サードパーティデータプロバイダーは以下の要件を満たしている必要があります。

- UID2 Operator とインテグレーションして UID2 を生成し、ソルトバケットのローテーションを処理する。
- UID2 Operator の API にアクセスできること。<br/>広告主によっては、CDP、データオンボーダー、またはその他のサービスプロバイダを経由する場合もあります。

詳細は、[Advertiser and Third-party Data Provider Integration Guide](/api-ja/v2/guides/advertiser-dataprovider-guide.md) を参照してください。
