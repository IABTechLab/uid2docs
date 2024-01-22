---
title: UID2 Endpoints - Summary
description: UID2 Service で利用可能なエンドポイントの概要。
hide_table_of_contents: false
sidebar_position: 01
---

# UID2 Endpoints

すべての UID2 エンドポイントでは、API リクエストの暗号化([POST&nbsp;/token/refresh](post-token-refresh.md) を除く) とレスポンスの復号化にクライアントシークレットが必要です。詳細と Python スクリプトの例は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md) を参照してください。

## UID2 Tokens

以下のエンドポイントは、UID2 Token (identity tokens, advertising tokens) を取得および管理するためのもので、主にパブリッシャーが使用します。

| Endpoint | Description | Request Encryption | Response Decryption |
| :--- | :--- | :--- | :--- |
| [POST&nbsp;/token/generate](post-token-generate.md) | UID2 ベースのターゲティング広告を承認するためにユーザーから提供されたメールアドレスまたは電話番号から、UID2 Tokenを要求します。DII が有効で、ユーザーが UID2 をオプトアウトしていない場合、この操作は UID2 Token と関連する値をします。 | 必須 | 必須 |
| [POST&nbsp;/token/validate](post-token-validate.md) | Advertising Token (UID2) が指定されたメールアドレス、電話番号、またはそれぞれのハッシュと一致するかどうかを検証するためのテストに使用します。 | 必須 | 必須 |
| [POST&nbsp;/token/refresh](post-token-refresh.md) | [POST&nbsp;/token/generate](./post-token-generate.md) レスポンスから、ユーザーの Refresh Token 用に新しいトークンを生成します。 | N/A | 必須 |

## Identity Maps

以下のエンドポイントは、広告主とサードパーティのデータプロバイダーが使用します。パブリッシャーは、これらのエンドポイントを使用する必要はありません。

| Endpoint | Description | Request Encryption | Response Decryption |
| :--- | :--- | :--- | :--- |
| [POST&nbsp;/identity/buckets](post-identity-buckets.md) | 最後に更新されたタイムスタンプを使用して、ローテーションされたソルトバケットを監視します。 | 必須 | 必須 |
| [POST&nbsp;/identity/map](post-identity-map.md) | 1 つ以上のメールアドレス、電話番号、またはそれぞれのハッシュの UID2 とソルトバケット ID を取得します。 | 必須 | 必須 |

