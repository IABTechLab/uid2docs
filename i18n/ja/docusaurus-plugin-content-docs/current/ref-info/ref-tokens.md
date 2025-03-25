---
title: UID2 Tokens and Refresh Tokens
description: パブリッシャー向けの UID2 Token と Refresh Token に関する情報。
hide_table_of_contents: false
sidebar_position: 06
---

import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# UID2 Tokens and Refresh Tokens

パブリッシャーがユーザーの <Link href="../ref-info/glossary-uid#gl-dii">DII</Link>&#8212;ハッシュ化または非ハッシュ化されたメールアドレスまたは電話番号&#8212;を UID2 Operator に送信すると、UID2 SDK のいずれかを使用するか、[POST&nbsp;/token/generate](../endpoints/post-token-generate.md) エンドポイントを使用するかに関わらず、UID2 Operator は DII を <a href="glossary-uid#gl-raw-uid2">raw UID2</a> に変換し、<a href="glossary-uid#gl-uid2-token">UID2 Token</a> に暗号化して返します。UID2 Token には、Refresh Token を含む関連値が付属しています。パブリッシャーは、UID2 Token をビッドストリームで使用できます。

## UID2 Tokens: Key Information

UID2 Token に関する主なポイントは次のとおりです:

- UID2 Token は一意の値です: 2 つの UID2 Token が同じであることはありません。
- UID2 Token　は大文字と小文字が区別されます。
- トークンの値は、<a href="glossary-uid#gl-opaque">opaque (不透明)</a>な文字列です: 文字列の形式や長さについての仮定をしないでください。
- ブラウザ、CTV、電話、タブレットなどの電子デバイスでのユーザーのアクティビティの異なるインスタンスを表す UID2 Token は、依然として同じ raw UID2 に一致させることができます。
- トークン生成時に、UID2 Operator はユーザーのオプトアウトを確認します。ユーザーが UID2 からオプトアウトしている場合、UID2 Token は生成されません。詳細は、[User Opt-Out](../getting-started/gs-opt-out.md) を参照してください。
- トークンは有効期限がありますが、Refresh Token を使用してリフレッシュできます。
- 現在の UID2 Token が有効期限切れになる前に、常に現在の Refresh Token をリフレッシュすることで、新しい UID2 Token と対応する新しい Refresh Token を取得するために何度でもリフレッシュできます。
- トークンが期限切れの場合、または既存のトークンをリフレッシュする代わりに、元のハッシュ化されたまたは非ハッシュ化されたメールアドレスまたは電話番号から新しい UID2 Token を生成することができます。
- パブリッシャーは、UID2 Token をビッドストリームに送信します。
- UID2 Token をリフレッシュしても、元の UID2 Token は無効になりません。有効期限が切れるまで、以前のトークンを引き続き使用できます。

詳細は、[How the UID2 Token Is Created](ref-how-uid-is-created.md) を参照してください。

## Refresh Tokens: Key Information

Refresh Token に関する主なポイントは次のとおりです:

- Refresh Token は、<a href="glossary-uid#gl-uid2-token">UID2 token</a> と一緒に発行される文字列です。
- Refresh Token は大文字と小文字が区別されます。
- 値は、<a href="glossary-uid#gl-opaque">opaque (不透明)</a>な文字列です: 文字列の形式や長さについての仮定をしないでください。
- Refresh Token は、UID2 Token が有効期限切れになる前に、新しい UID2 Token と新しい Refresh Token を生成するために使用できます。
- Refresh Token の使用は任意です: 既存のトークンをリフレッシュする代わりに、毎回 DII から新しいトークンを生成することを選択することもできます。
- <a href="../ref-info/glossary-uid#gl-token-refresh">Token Refresh</a> は、さまざまな方法で管理できます:
  - UID2 SDK ([SDK Functionality](../sdks/summary-sdks.md#sdk-functionality) を参照) を使用して。
  - [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) エンドポイントを呼び出して。
  - UID2 Prebid.js モジュール ([UID2 Integration Overview for Prebid](../guides/integration-prebid.md) を参照) を使用して。
- 新しい UID2 Token が生成され、リフレッシュトークンに対するレスポンスとして返されると、新しい Refresh Token も返されます。
- ほとんどの場合、サーバーサイドで生成されたトークンでも、Client-Side でトークンをリフレッシュできます。各 SDK のリフレッシュ機能についての詳細は、[SDK Functionality](../sdks/summary-sdks.md#sdk-functionality) (*Refresh UID2 Token* 列) を参照してください。
- UID2 <Link href="../ref-info/glossary-uid#gl-operator-service">Operator Service</Link> が、新しい UID2 Token をリクエエストする際に Refresh Token を受け取ると、ユーザーのオプトアウトを確認します。ユーザーが UID2 からオプトアウトしている場合、新しい UID2 Token は生成されません。詳細は、[User Opt-Out](../getting-started/gs-opt-out.md) を参照してください。

### Recommended Token Refresh Frequency

現在、推奨されているリフレッシュ間隔は 1 時間です。1 時間ごとの間隔にすることで、トークンが期限切れになるのを避け、ビッドストリームに送信できるようになります。また、新しいトークンが生成される前にユーザーのオプトアウトが確認されるため、ユーザーのオプトアウト設定が迅速に反映されるようになります。

リフレッシュのタイミングを決定するには、以下の UID2 API エンドポイントのいずれかを呼び出した際のレスポンスの `refresh_from` フィールドのタイムスタンプを使用できます:

- [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint (see [Successful Response](../endpoints/post-token-generate.md#successful-response))
- [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint (see [Successful Response With Tokens](../endpoints/post-token-refresh.md#successful-response-with-tokens))

`refresh_from` フィールドは <a href="../ref-info/glossary-uid#gl-unix-time">Unix</a> タイムスタンプで、トークンが生成された時間から 1 時間後の値をミリ秒で表します。

:::tip
推奨されるリフレッシュ間隔は将来変更される可能性があります。固定値を使用する代わりに、`refresh_from` 値に基づいて計算することが最善です。
:::

### Managing Token Refresh with an SDK

トークンの更新を管理する簡単な方法は、その目的のために関数を持つ UID2 SDK のいずれかを使用することです: Java SDK または Python SDK。

これらの SDK のいずれも、トークンをリフレッシュする必要があるかどうかを判断するための関数を持つ publisher クラスを含んでいます。

以下の例では、これらの SDK のいずれかを使用して、まず、トークンをリフレッシュできるかどうかを確認し、次にリフレッシュが必要かどうかを確認する方法を示します。リフレッシュが必要な場合は、リフレッシュ関数を呼び出してトークンをリフレッシュできます。

<Tabs groupId="language-selection">
<TabItem value='java' label='Java'>

1. Identity がリフレッシュ可能かどうか (つまり、Refresh Token が期限切れになっていないか) を判断します:

    ```java
    if (identity == null || !identity.isRefreshable()) { we must no longer use this identity (for example, remove this identity from the user's session) }
    ```

1. リフレッシュが必要かどうかを判断します:

    ```java
    if (identity.isDueForRefresh()) {..}
    ```

</TabItem>
<TabItem value='py' label='Python'>

1. Identity がリフレッシュ可能かどうか (つまり、Refresh Token が期限切れになっていないか) を判断します:

   ```py
   if not identity or not identity.is_refreshable(): # we must no longer use this identity (for example, remove this identity from the user's session)
   ```

1. リフレッシュが必要かどうかを判断します:

   ```py
    if identity.is_due_for_refresh()):
    ```

</TabItem>
</Tabs>

コード例を使用する前に、使用している言語の前提条件と注意事項を確認してください。詳細は、該当する SDK のドキュメントを参照してください:

- [SDK for Java, Usage for Publishers, Basic Usage Server-Side Integration section](../sdks/sdk-ref-java.md#basic-usage-server-side-integration)
- [SDK for Python, Usage for Publishers, Server-Side Integration section](../sdks/sdk-ref-python.md#server-side-integration)

## FAQs

トークンのリフレッシュに関するよくある質問については、[パブリッシャー向け FAQ](../getting-started/gs-faqs.md#faqs-for-publishers) を参照してください。
