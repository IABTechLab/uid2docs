---
title: Authentication and Authorization
description: UID2 エンドポイントの認証要件。
hide_table_of_contents: false
sidebar_position: 05
---

# Authentication and Authorization

UID2 エンドポイントの認証には、以下が必要です:

- クライアントの [API Key](gs-credentials.md#api-key-and-client-secret)。API KeyはベアラートークンとしてリクエストのAuthorizationヘッダに含めます。例えば:<br/>
  `Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=`
- API リクエストを暗号化し、API レスポンスを復号化するための Client Secret。これは [POST /token/refresh](../endpoints/post-token-refresh.md) を除くすべてのエンドポイントで必要です。<br/>詳細と Pythonの 例は [Encrypting Requests and Decrypting Responses](gs-encryption-decryption.md) を参照してください。