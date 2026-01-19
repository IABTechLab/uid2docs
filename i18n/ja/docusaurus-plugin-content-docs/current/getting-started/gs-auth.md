---
title: Authentication and Authorization
description: UID2 エンドポイントの認証要件。
hide_table_of_contents: false
sidebar_position: 05
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Authentication and Authorization

Server-Side 実装で UID2 エンドポイントへの認証を行うには、以下のものが必要です：

- クライアントの [API Key](gs-credentials.md#api-key-and-client-secret)。API Key はベアラートークンとしてリクエストの Authorization ヘッダーに含めます。たとえば:<br/>
  `Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=`
- API リクエストを暗号化し、API レスポンスを復号化するための Client Secret。これは、[POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) を除くすべてのエンドポイントで必要です。<br/>詳細と、いくつかのプログラミング言語での暗号化/復号化の例は、[Encrypting Requests and Decrypting Responses](gs-encryption-decryption.md) を参照してください。

:::note
パブリッシャーの場合、Client-Side に UID2 を実装しているなら、認証と認可は Prebid.js ([UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md) を参照) や JavaScript SDK ([Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md) を参照) などの実装によって自動的に管理されます。
:::
