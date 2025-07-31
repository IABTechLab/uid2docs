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

## Identity Map

以下のエンドポイントは、広告主とサードパーティのデータプロバイダーが使用します。パブリッシャーはこれらのエンドポイントを使用する必要はありません。

### Latest Identity Map Endpoint (v3)

最新の Identity Map インテグレーションでは、1 つのエンドポイント `POST /identity/map` を呼び出すだけで済みます。`POST /identity/buckets` エンドポイントはワークフローの一部ではありません。

:::important
以前のバージョンを使用している場合は、改善点を活用するためにできるだけ早くアップグレードすることを推奨します。
:::

最新の Identity Map インテグレーションでは、次のエンドポイントを使用します:

| Endpoint | Description | Request Encryption | Response Decryption |
| :--- | :--- | :--- | :--- |
| [POST&nbsp;/identity/map](post-identity-map.md) |1 つ以上のメールアドレス、電話番号、またはそのハッシュに対して、raw UID2、以前の raw UID2、および更新タイムスタンプをマップします。 | 必須 | 必須 |

### Earlier Identity Map Endpoints (v2)

以下のエンドポイントは、以前の Identity Map インテグレーション (バージョン 2) の一部です。

| Endpoint | Description | Request Encryption | Response Decryption |
| :--- | :--- | :--- | :--- |
| [POST&nbsp;/identity/buckets](post-identity-buckets.md) | ローテーションしたソルトバケットの最終更新タイムスタンプをモニターします。 | 必須 | 必須 |
| [POST&nbsp;/identity/map (v2)](post-identity-map-v2.md) | 1 つ以上のメールアドレス、電話番号、またはそれぞれのハッシュに対して、raw UID2 と salt bucket ID をマッピングします。 | 必須 | 必須 |

## Opt-Out Status

以下のエンドポイントは、広告主、サードパーティのデータプロバイダー、DSP、共有者が使用できます。パブリッシャーは、このエンドポイントを使用する必要はありません。

UID2 の Opt-Out ワークフローとユーザーが Opt-Out する方法の詳細は、[User Opt-Out](../getting-started/gs-opt-out.md) を参照してください。

| Endpoint | Description | Request Encryption | Response Decryption |
| :--- | :--- | :--- | :--- |
| [POST&nbsp;/optout/status](post-optout-status.md) | raw UID2 のオプトアウトステータスをチェックします。このエンドポイントは raw UID2 のリストを入力として受け取り、オプトアウトした raw UID2 と、オプトアウトが行われた時刻を返します。 | 必須 | 必須 |
