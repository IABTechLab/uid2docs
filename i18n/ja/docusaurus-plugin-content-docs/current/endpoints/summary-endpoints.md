---
title: UID2 Endpoints - Summary
description: UID2 Service で利用可能なエンドポイントの概要。
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# UID2 Endpoints: Summary

すべての UID2 エンドポイントでは、API リクエストの暗号化([POST&nbsp;/token/refresh](post-token-refresh.md) を除く) とレスポンスの復号化にクライアントシークレットが必要です。詳細といくつかのプログラミング言語でのコードの例は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md) を参照してください。

## UID2 Tokens

以下のエンドポイントは、UID2 Token (identity tokens, advertising tokens) を取得および管理するためのもので、主にパブリッシャーが使用します。

| Endpoint | Description | Request Encryption | Response Decryption |
| :--- | :--- | :--- | :--- |
| [POST&nbsp;/token/generate](post-token-generate.md) | ユーザーの <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> (メールアドレスまたは電話番号) から UID2 Token を生成します。DII が有効で、ユーザーがUID2をオプトアウトしていない場合、UID2 Token と関連する値を返します。 | 必須 | 必須 |
| [POST&nbsp;/token/validate](post-token-validate.md) | Advertising Token (UID2) が指定されたメールアドレス、電話番号、またはそれぞれのハッシュと一致するかどうかを検証するためのテストに使用します。 | 必須 | 必須 |
| [POST&nbsp;/token/refresh](post-token-refresh.md) | [POST&nbsp;/token/generate](./post-token-generate.md) レスポンスから、ユーザーの Refresh Token 用に新しいトークンを生成します。 | N/A | 必須 |

## Identity Maps

以下のエンドポイントは、広告主とサードパーティのデータプロバイダーが使用します。パブリッシャーは、これらのエンドポイントを使用する必要はありません。

| Endpoint | Description | Request Encryption | Response Decryption |
| :--- | :--- | :--- | :--- |
| [POST&nbsp;/identity/buckets](post-identity-buckets.md) | 最後に更新されたタイムスタンプを使用して、ローテーションされたソルトバケットを監視します。 | 必須 | 必須 |
| [POST&nbsp;/identity/map](post-identity-map.md) | 1 つ以上のメールアドレス、電話番号、またはそれぞれのハッシュの UID2 とソルトバケット ID を取得します。 | 必須 | 必須 |

## Opt-Out Status

以下のエンドポイントは、広告主、サードパーティのデータプロバイダー、DSP、共有者が使用できます。パブリッシャーは、このエンドポイントを使用する必要はありません。

UID2 の Opt-Out ワークフローとユーザーが Opt-Out する方法の詳細については、[User Opt-Out](../getting-started/gs-opt-out.md) を参照してください。

| Endpoint | Description | Request Encryption | Response Decryption |
| :--- | :--- | :--- | :--- |
| [POST&nbsp;/optout/status](post-optout-status.md) | raw UID2 のオプトアウトステータスをチェックします。このエンドポイントは raw UID2 のリストを入力として受け取り、オプトアウトした raw UID2 と、オプトアウトが行われた時刻を返します。 | 必須 | 必須 |
