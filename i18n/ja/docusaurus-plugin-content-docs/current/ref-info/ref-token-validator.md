---
title: UID2 Token Validator
description: UID2 Token Validator を使用して、UID2 Token をソースの DII に対して検証し、Token 生成ワークフローが正しいことを確認する方法。
hide_table_of_contents: false
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# UID2 Token Validator

[UID2 Token Validator](https://token-validator.uidapi.com/) は、<Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 Token</Link> をその元となる <Link href="../ref-info/glossary-uid#gl-dii">DII (directly identifying information)</Link> と照合し、トークン生成プロセスが正しいかどうかを確認するためのウェブベースのツールです。

## Overview

パブリッシャーが DII を提供して UID2 Token を生成する際、結果の UID2 Token が有効に見えるが実際にはそうでない場合があります。これは、正規化やハッシュ化のステップが正しく実行されていないためです。UID2 は DII の正規化されたハッシュ化された形式を使用してトークンを生成するため、いずれかのステップでエラーが発生すると、その DII から他の参加者が生成した正しい値と対応しない UID2 Token と基になる <Link href="../ref-info/glossary-uid#gl-raw-uid2">raw UID2</Link> が生成されます。

## Prerequisites

UID2 Token Validator を使用するには、以下が必要です:

- **UID2 API Key** (Client Key)
- **UID2 Client Secret**

これらをお持ちでない場合は、UID2 Portal での作成手順について [API keys](../portal/api-keys.md) を参照してください。

## Using the Token Validator

Token Validator を使用するには、以下の手順に従います:

1. Token Validator セクションの上部にあるフィールドに、**API Key** (Client Key) と **Client Secret** を入力します。
2. 検証対象とする **Operator** (環境) を選択します。UID2 環境の詳細については、[Environments](../getting-started/gs-environments.md) を参照してください。

### Validate a single token

単一のトークンと識別子のペアを検証するには、以下の手順に従います:

1. **Input Mode** で **Single Validation** を選択します。
2. **Identifier** フィールドに、トークンの生成に使用した DII を入力します。以下のいずれかを入力できます:
   - 生のメールアドレス
   - 生の電話番号
   - 正規化し、Base64 エンコードされたメールアドレスハッシュ
   - 正規化し、Base64 エンコードされた電話番号ハッシュ
3. 入力内容に一致する識別子タイプを選択します。
4. **Token** フィールドに、検証する UID2 Token を貼り付けます。
5. **Validate Tokens** をクリックします。

### Validate multiple tokens (CSV)

トークンと識別子のペアを一括検証するには、以下の手順に従います:

1. **Input Mode** で **CSV** を選択します。
2. 次の列を持つ CSV ファイルを用意します: 
   - `identifier`: DII（生のメールアドレス、生の電話番号、メールアドレスハッシュ、または電話番号ハッシュ）。
   - `identifier_type`: `email`、`phone`、`email_hash`、または `phone_hash` のいずれか。
   - `token`: 検証する UID2 Token。
3. CSV ファイルをアップロードします。
4. **Validate Tokens** をクリックします。

## Interpret validation results

**Validate Tokens** をクリックすると、**Validation Results** テーブルにトークンと識別子の各ペアの行が、以下の表に示す形式で表示されます。

| Column | Description |
|---|---|
| Identifier | 入力した DII。 |
| Identifier Type | `email`、`phone`、`email_hash`、または `phone_hash`。 |
| Normalized Hash | 正規化された DII の Base64 エンコードされた SHA-256 ハッシュ。 |
| Token | 送信したトークン。 |
| Validation | 検証の結果。詳細については、以下の表を参照してください。 |

**Validation** 列には [POST&nbsp;/token/validate](../endpoints/post-token-validate.md) エンドポイントからのレスポンスが反映されます。

| Validation Result | Meaning |
|---|---|
| `Token matches identifier` | トークンが提供された DII と一致しています。これは、トークンが正しい正規化ハッシュから生成されたことを意味します。 |
| `Failed: Token does not match identifier` | トークンが提供された DII と一致しません。最も可能性の高い原因は、正規化またはハッシュ化の誤りです。 |
| `Failed: Invalid token` | トークンの形式が不正で、解析できません。 |
| `Failed: {"status":"unauthorized"}` | 提供された API 認証情報が無効または許可されていません。 |

:::tip
結果が **Failed: Token does not match identifier** の場合、結果に表示される **Normalized Hash** と、同じ DII に対して自身の実装で生成した値を比較してください。異なる場合は、正規化またはハッシュ化のステップに問題があります。詳細については、[Normalization and encoding](../getting-started/gs-normalization-encoding.md) および [Preparing emails and phone numbers for processing](ref-preparing-emails-and-phone-numbers-for-processing.md) を参照してください。
:::