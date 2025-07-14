---
title: Server-Side Token Generation
description: パブリッシャー向けのサーバーサイドでのトークン生成に関する情報。
hide_table_of_contents: false
sidebar_position: 06
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Server-Side Token Generation

パブリッシャーが Client-Server または Server-Side UID2 インテグレーションを設定する場合、最初のステップはサーバーで UID2 Token を生成することです。その後、トークンを Client-Side または Server-Side でリフレッシュし、RTB ビッドストリームに送信するためにトークンを Client-Side に渡すことができます。

パブリッシャーが Server-Side で直接識別情報 (<Link href="../ref-info/glossary-uid#gl-dii">DII</Link>) (メールアドレスまたは電話番号) を提供して UID2 Token を生成するための 2 つのアプローチがあります:

- SDK のインテグレーション
- API エンドポイントへのダイレクトインテグレーション

:::warning
セキュリティ上の理由により、トークン生成に使用される API キーとシークレットは Server-Side で呼び出す必要があります。これらの値を Web ページ、モバイルアプリ、または Prebid に保存しないでください。詳細は、[Security of API Key and Client Secret](../getting-started/gs-credentials.md#security-of-api-key-and-client-secret) を参照してください。
:::

オプションは次の表にまとめられています。

| Integration Solution | Generate Token | Refresh Token |
| :--- | :--- | :--- |
| [SDK for Java](../sdks/sdk-ref-java.md) | ✅ | ✅ |
| [SDK for Python](../sdks/sdk-ref-python.md) | ✅ | ✅ |
| [Direct integration (API endpoints with custom code)](../endpoints/post-token-generate.md) | ✅ | ✅ |

<Link href="../ref-info/glossary-uid#gl-identity">Identity</Link> (UID2 Token と関連する値) を生成するために選択したインテグレーションオプションに関係なく、次のいずれかを実装する必要があります:

- **SDK**: UID2 Server-Side SDK を使用して、Publisher Client クラスのいずれかを使用します。これらのクラスは、リクエストを 1 つのメソッド呼び出しに簡素化します。

   手順については、次のいずれかを参照してください:
   
   - [SDK for Java, Usage for Publishers, Basic Usage](../sdks/sdk-ref-java.md#basic-usage)
   - [SDK for Python, Usage for Publishers](../sdks/sdk-ref-python.md#usage-for-publishers)

   SDK オプションを使用している場合、このガイドの残りの部分で必要な `Identity` レスポンスは、次のいずれかのメソッドの出力です:

   <Tabs groupId="language-selection">
   <TabItem value='java' label='Java'>

   ```java
   tokenGenerateResponse.getIdentityJsonString()
   ```

   </TabItem>
   <TabItem value='py' label='Python'>

   ```py
   token_generate_response.get_identity_json_string()
   ```

   </TabItem>
   </Tabs>

- **API**: [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) エンドポイントを呼び出します。

  このガイドの残りの部分で必要な `Identity` レスポンスは、成功したエンドポイントのレスポンスの body セクション内のコンテンツです。例については、[Successful Response](../endpoints/post-token-generate.md#successful-response) を参照してください。
  
:::important
トークンを生成する DII が UID2 からオプトアウトされている場合、エンドポイントと SDK API はオプトアウトステータスを返します。この場合、情報を保存し、同じ DII に対してトークン生成エンドポイントを呼び出さないでください。
:::
