---
title: API Permissions
description: UID2 API パーミッションに関する情報
hide_table_of_contents: false
sidebar_position: 07
---

# API Permissions

UID2 エコシステムには、特定のアクティビティを完了するためのアクセスを許可する、いくつかの異なる API パーミッション(権限) が含まれています。このアプローチは、UID2 の全体的な安全設計の一部です。

各 UID2 参加者は、パーミッションが参加者の API クレデンシャルにリンクされています([Account Setup](gs-account-setup.md) と [UID2 Credentials](gs-credentials.md) を参照してください)。

:::note
パブリッシャーで、Client-Side に UID2 を実装している場合、API パーミッションは適用されません。代わりに、Client-Side のトークンリクエストを生成するための別の認証情報を受け取ることになります。詳細については、[Subscription ID and Public Key](gs-credentials.md#subscription-id-and-public-key) を参照してください。
:::

参加者は、関連するパーミッションを持つ API クレデンシャルのセットを 1 つ以上持つことができます。複数の API パーミッションを持つ場合、それぞれのパーミッションに対して個別のクレデンシャルセットを持つか、すべてのパーミッションに対して単一のクレデンシャルセットを持つかのオプションがあります。各パーミッションに対して別々のクレデンシャルセットを持つことを推奨します。

次の表は、主なパーミッション、一般的に使用する参加者のタイプ、関連する主なアクティビティの概要を示したものです。

| Name | Participant Type | Permissions |
| :--- | :--- | :--- |
| Generator | Publishers | Permission to call the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md), [POST&nbsp;/token/validate](../endpoints/post-token-validate.md), and [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) の各エンドポイントを呼び出して、[DII](../ref-info/glossary-uid.md#gl-dii) から UID2 Token を生成/リフレッシュする権限:<ul><li>Prebid インテグレーション</li><li>The UID2 SDK for JavaScript</li><li>UID2 Token の取得と管理のために、該当する API エンドポイントを直接呼び出すインテグレーション</li></ul> |
| Bidder | DSPs | パブリッシャーからのビッドストリームから送られてくる UID2 Token を、入札目的で raw UID2 に復号化する権限。 |
| Sharer | UID2 sharing に参加するすべての参加者タイプ。詳細は、 [UID2 Sharing: Overview](../sharing/sharing-overview.md) を参照してください。 | 以下両方の権限:<ul><li>UID2 SDK または S nowflake を使用して、raw UID2 を UID2 Token に暗号化し、許可された別の共有参加者と共有する。</li><li>他の認可された共有参加者から受け取った UID2 Token を raw UID2 に復号する。</li></ul> |
| Mapper | Advertisers<br/>Data Providers | [POST&nbsp;/identity/buckets](../endpoints/post-identity-buckets.md) エンドポイントを使用して、ローテーションされたソルトバケットをモニターし、[POST&nbsp;/identity/map](../endpoints/post-identity-map.md) エンドポイントを使用して、複数のメールアドレス、電話番号、またはそれぞれのハッシュを、raw UID2 とソルトバケット ID にマッピングする権限。 |
