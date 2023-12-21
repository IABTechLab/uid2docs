---
title: Normalization and Encoding
description: 情報を安全かつ解読できるように正規化し、符号化する方法。
hide_table_of_contents: false
sidebar_position: 13
---

# Normalization and Encoding

このページでは、ユーザー情報の正規化とエンコードに関する情報を提供します。UID2 を使用する際には、正規化とエンコードを正しく行うことが重要です。

<!-- It includes the following sections:
- [Introduction](#introduction)
- [Types of Directly Identifying Information](#types-of-directly-identifying-information)
- [Email Address Normalization](#email-address-normalization)
- [Email Address Hash Encoding](#email-address-hash-encoding)
- [Phone Number Normalization](#phone-number-normalization)
- [Phone Number Hash Encoding](#phone-number-hash-encoding)
- [Example](#example)
-->

## Introduction
メールアドレスなどのユーザー情報を取得し、raw UID2 や UID2 Advertising Token を作成する手順に従う場合、必要な手順に正確に従うことが非常に重要です。情報を正規化する必要があろうがなかろうが、ハッシュ化する必要があろうがなかろうが、手順には正確に従ってください。そうすることで、作成した UID2 の値を、同じユーザーによる他のオンライン行動の事例と安全かつ匿名で照合できるようになります。

>Note: raw UID2 とそれに関連する UID2 Token は、大文字と小文字を区別します。UID2 を扱う際には、大文字小文字を変えずにすべてのIDとトークンを渡すことが重要です。ID が不一致の場合、ID の解析やトークンの復号化でエラーが発生する可能性があります。

## Types of Directly Identifying Information
UID2は、以下の種類の DII (direct identifying information) をサポートしています:
- メールアドレス
- 電話番号

## Email Address Normalization

UID2 Operator Service にハッシュ化されていないメールアドレスを送信すると、同サービスはメールアドレスを正規化してからハッシュ化します。メールアドレスを送信する前に自分でハッシュ化したい場合は、ハッシュ化する前に正規化する必要があります。

> IMPORTANT: ハッシュ化する前に正規化することで、生成される UID2 値が常に同じになり、データを照合できます。ハッシュ化する前に正規化しない場合、異なる UID2 が生成され、ターゲティング広告の効果が低下する可能性があります。

メールアドレスを正規化するには、次の手順を実行します:

1. 先頭と末尾のスペースを削除します。
2. ASCII 文字をすべて小文字に変換します。
3. `gmail.com`のメールアドレスでは、ユーザー名の部分から以下の文字を削除してください。
   1. ピリオド (`.` (ASCII コード 46)) <br/>例えば、`jane.doe@gmail.com` を `janedoe@gmail.com` に正規化します。
   2. プラス記号 (`+` (ASCII code 43)) とそれに続くすべての文字。<br/>例えば、`janedoe+home@gmail.com` を `janedoe@gmail.com` に正規化します。

## Email Address Hash Encoding

メールアドレスハッシュは、正規化されたメールアドレスの SHA-256 ハッシュを Base64 でエンコードしたものです。

| Type | Example | Comments and Usage |
| :--- | :--- | :--- |
| Normalized email address                              | `user@example.com`                                                 | N/A  |
| SHA-256 of email address                              | `b4c9a289323b21a01c3e940f150eb9b8c542587f1abfd8f0e1cc1ffc5e475514` | この 64 文字の文字列は、32 バイトの SHA-256 を 16 進数で表現したものです。 |
| Base64-encodedd SHA-256 of email address              | `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=`                     | リクエストボディで送信される `email_hash` 値には、このエンコーディングを使用します。 |
| URL-encoded, Base64-encodedd SHA-256 of email address | `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf%2FF5HVRQ%3D`                 | この 44 文字の文字列は、32 バイトの SHA-256 を Base64 でエンコードしたものです。<br/>リクエストボディで送られる `email_hash` 値には、このエンコードを使用します。 |

## Phone Number Normalization

ハッシュ化されていない電話番号を UID2 Operator Service に送信すると、同サービスは電話番号を正規化した後、ハッシュ化します。電話番号を送信する前に自分でハッシュ化したい場合は、ハッシュ化する前に電話番号を正規化する必要があります。

> IMPORTANT: ハッシュ化する前に正規化することで、生成される UID2 値が常に同じになり、データを照合できます。ハッシュ化する前に正規化しない場合、異なる UID2 が生成され、ターゲティング広告の効果が低下する可能性があります。

ここでは、電話番号の正規化ルールについて説明します:

- UID2 Operator は、[E.164](https://ja.wikipedia.org/wiki/E.164) 形式の電話番号を受け付けます。これは、国際的に一意性を保証する国際電話番号の形式です。
- E.164 電話番号は、最大 15 桁までです。
- 正規化された E.164 電話番号は、スペース、ハイフン、括弧、その他の特殊文字を使用せず、以下の構文を使用します:<br/>
  `[+] [country code] [subscriber number including area code]`
 Examples:
   - US: `1 (123) 456-7890` は `+11234567890` に正規化されます。
   - Singapore: `65 1243 5678` は `+6512345678` に正規化されます。
   - Sydney, Australia: `(02) 1234 5678` は、都市名の先頭のゼロを削除し、国コードを含むように正規化されます: `+61212345678`。

## Phone Number Hash Encoding

電話番号ハッシュは、正規化された電話番号を SHA-256 ハッシュを Base64 エンコードしたものです。電話番号はまず正規化され、次に SHA-256 ハッシュアルゴリズムを使ってハッシュ化され、その結果の 16 進値が Base64 エンコーディングを使ってエンコードされます。

以下の例は、単純な入力電話番号と、安全で不透明な URL-safe な値を得るために各ステップが適用された結果を示しています。

| Type | Example | Comments and Usage |
| :--- | :--- | :--- |
| Normalized phone number | `+12345678901` | N/A |
| SHA-256 of phone number | `10e6f0b47054a83359477dcb35231db6de5c69fb1816e1a6b98e192de9e5b9ee` | この 64 文字の文字列は、32 バイトの SHA-256 を 16 進数で表現したものです。 |
| Base64-encodedd SHA-256 of phone number | `EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=` | リクエストボディで送信される `phone_hash` 値にはこのエンコーディングを使用します。 |
| URL-encoded, Base64-encodedd SHA-256 of phone number | `wdN1alhrbw1Bmz49GzKGdPvGxLhCNn7n3teAOQ%2FFSK4%3D` | この 44 文字の文字列は、32 バイトの SHA-256 を Base64 でエンコードしたものです。<br/>リクエストボディで送られる `phone_hash` 値には、このエンコードを使用します。 |

## Example

JavaScript でメールアドレスと電話のハッシュを生成する方法の例については、[Example Code: Hashing and Base-64 Encoding](../guides/publisher-client-side#example-code-hashing-and-base-64-encoding) を参照してください。