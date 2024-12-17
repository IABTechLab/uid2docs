---
title: Normalization and Encoding
description: 情報を安全かつ解読できるように正規化し、符号化する方法。
hide_table_of_contents: false
sidebar_position: 13
---

import Link from '@docusaurus/Link';

# Normalization and Encoding

このページでは、ユーザー情報の正規化とエンコードに関する情報を提供します。UID2 を使用する際には、正規化とエンコードを正しく行うことが重要です。

## Introduction

メールアドレスなどのユーザー情報を取得し、raw UID2 や UID2 Advertising Token を作成する手順に従う場合、必要な手順に正確に従うことが非常に重要です。情報を正規化する必要があろうがなかろうが、ハッシュ化する必要があろうがなかろうが、手順には正確に従ってください。そうすることで、作成した UID2 の値を、同じユーザーによる他のオンライン行動の事例と安全かつ匿名で照合できるようになります。

:::important
- Raw UID2 とそれに関連する UID2 Token は、大文字と小文字を区別します。UID2 を扱う際には、大文字小文字を変えずにすべての ID とトークンを渡すことが重要です。ID が不一致の場合、ID の解析やトークンの復号化でエラーが発生する可能性があります。
- 必要なステップのどれかを欠いた場合&#8212;たとえば、最初に正規化せずにハッシュした場合&#8212;その結果は有効な UID2 値にはなりません。<br/>例えば、データプロバイダが `Jane.Saoirse@gmail.com` から UID2 を生成したいとします。これは `janesaoirse@gmail.com` に正規化され、ハッシュ化されて Base64 エンコードされた値は `ku4mBX7Z3qJTXWyLFB1INzkyR2WZGW4ANSJUiW21iI8=` となります。<br/>同じメールアドレスを持つパブリッシャーは誤って正規化しませんでした。メールアドレス `Jane.Saoirse@gmail.com` をハッシュ化し Base64 エンコードした値は `f8upG1hJazYKK8aEtAMq3j7loeAf5aA4lSq6qYOBR/w=` です。これら2つの異なる値は、2つの異なる UID2 になります。最初のものは正しく処理され、同じ元データから生成された他のインスタンスと一致すします。2つ目は正しく処理されていないため、一致しません。<br/>このシナリオでは、UID2 が同じユーザーの他のインスタンスと一致しないため、パブリッシャーはターゲティング広告から利益を得る機会を逃してしまいます。
:::

## Types of Directly Identifying Information

UID2は、以下の種類の DII (direct identifying information) をサポートしています:
- メールアドレス
- 電話番号

## Email Address Normalization

UID2 <Link href="../ref-info/glossary-uid#gl-operator-service">Operator Service</Link> にハッシュ化されていないメールアドレスを送信すると、同サービスはメールアドレスを正規化してからハッシュ化します。メールアドレスを送信する前に自分でハッシュ化したい場合は、ハッシュ化する前に正規化する必要があります。

:::important
ハッシュ化する前に正規化することで、生成される UID2 値が常に同じになり、データを照合できます。ハッシュ化する前に正規化しない場合、異なる UID2 が生成され、ターゲティング広告の効果が低下する可能性があります。
:::

メールアドレスを正規化するには、次の手順を実行します:

1. 先頭と末尾のスペースを削除します。
2. 大文字があれば小文字に変換します。
3. `gmail.com` アドレスのみ:
   1. アドレスの中にピリオド(`.`)(ASCII 10 進コード 46 / UTF-8 16 進コード 2E) があれば、それを削除します。

      例えば、`jane.doe@gmail.com` を `janedoe@gmail.com` に正規化します。

   2. プラス記号(`+`)とその後ろに追加文字列がある場合、`@gmail.com` の前にあるプラス記号 (`+`)(ASCII 10 進コード 43 / UTF-8 16 進コード 2B)とそれに続くすべての文字を削除します。  

       例えば、`janedoe+home@gmail.com` を `janedoe@gmail.com` に正規化します。

:::warning
正規化されたメールアドレスが UTF-16 のような他のエンコーディングシステムではなく、UTF-8 であることを確認してください。
:::

さまざまなシナリオの例は、[Normalization Examples for Email](#normalization-examples-for-email) を参照してください。

## Email Address Hash Encoding

メールアドレスハッシュは、正規化されたメールアドレスの SHA-256 ハッシュを Base64 エンコードしたものです。メールアドレスはまず正規化され、次に <Link href="../ref-info/glossary-uid#gl-sha-256">SHA-256</Link> ハッシュアルゴリズムを使ってハッシュ化され、その結果のハッシュ値のバイトが Base64 エンコーディングを使ってエンコードされます。Base64 エンコーディングはハッシュ値のバイトに適用されるのであって、16 進エンコーディングされた文字列表現には適用されないことに注意してください。

| Type | Example | Comments and Usage |
| :--- | :--- | :--- |
| 正規化メールアドレス  | `user@example.com` | 正規化は常に最初のステップです。 |
| 正規化されたメールアドレスのSHA-256ハッシュ | `b4c9a289323b21a01c3e940f150eb9b8c542587f1abfd8f0e1cc1ffc5e475514` | この 64 文字の文字列は、32 バイトの SHA-256 を 16 進符号化したものです。 |
| 正規化されたメールアドレスの 16 進数から Base64 SHA-256 エンコーディングへの変換 | `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=` | この 44 文字の文字列は、32 バイトの SHA-256 を Base64 エンコードしたものです。<br/>WARNING: 上の例の SHA-256 ハッシュ文字列は、ハッシュ値を 16 進符号化したものです。ハッシュの Raw バイトを Base64 エンコードするか、16 進エンコードされた値を入力とする Base64 エンコーダを使用する必要があります。<br/>リクエストボディに送られる `email_hash` 値にはこのエンコーディングを使用します。 |

:::important
Base64 エンコードを適用する場合、ハッシュの Raw バイトを必ず Base64 エンコードするか、16 進エンコードされた値を入力とする Base64 エンコーダを使用してください。
:::

その他の例は、[Normalization Examples for Email](#normalization-examples-for-email) を参照してください。

## Phone Number Normalization

:::important
ハッシュ化する前に正規化することで、生成される UID2 値が常に同じになり、データを照合できます。ハッシュ化する前に正規化しない場合、異なる UID2 が生成され、ターゲティング広告の効果が低下する可能性があります。
:::

ここでは、電話番号の正規化ルールについて説明します:

- UID2 Operator は、[E.164](https://ja.wikipedia.org/wiki/E.164) 形式の電話番号を受け付けます。これは、国際的に一意性を保証する国際電話番号の形式です。
- E.164 電話番号は、最大 15 桁までです。
- 正規化された E.164 電話番号は、スペース、ハイフン、括弧、その他の特殊文字を使用せず、以下の構文を使用します:<br/>
  `[+] [country code] [subscriber number including area code]`
 Examples:
   - US: `1 (234) 567-8901` は `+12345678901` に正規化されます。
   - Singapore: `65 1243 5678` は `+6512345678` に正規化されます。
   - Sydney, Australia: `(02) 1234 5678` は、都市名の先頭のゼロを削除し、国コードを含むように正規化されます: `+61212345678`。

:::warning
正規化されたメールアドレスが UTF-16 のような他のエンコーディングシステムではなく、UTF-8 であることを確認してください。
:::

## Phone Number Hash Encoding

電話番号ハッシュは、正規化された電話番号の SHA-256 ハッシュを Base64 エンコードしたものです。電話番号はまず正規化され、次にSHA-256ハッシュアルゴリズムを使ってハッシュ化され、その結果のハッシュ値のバイトが Base64 エンコーディングを使ってエンコードされます。Base64 エンコーディングはハッシュ値のバイトに適用されるのであって、16 進エンコーディングされた文字列表現には適用されないことに注意してください。

次の表は、単純な入力電話番号の例と、安全で不透明な URL-safe な値を得るために各ステップが適用された結果を示しています。

| Type | Example | Comments and Usage |
| :--- | :--- | :--- |
| 正規化電話番号 | `+12345678901` | 正規化は常に最初のステップです。 |
| 正規化された電話番号の SHA-256 ハッシュ  | `10e6f0b47054a83359477dcb35231db6de5c69fb1816e1a6b98e192de9e5b9ee` | この64文字の文字列は、32 バイトの SHA-256 を 16 進符号化したものです。 |
| 正規化およびハッシュ化された電話番号の 16 進数から Base64 SHA-256 エンコーディングへの変換 | `EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=` | この 44 文字の文字列は、32 バイトの SHA-256 を Base64 エンコードしたものです。<br/>NOTE: SHA-256 ハッシュは 16 進数値です。16 進値を入力とする Base64 エンコーダを使う必要があります。リクエストボディに送られる `phone_hash` の値にはこのエンコーディングを使います。|

:::warning
Base64 エンコーディングを適用する場合は、必ず 16 進数値を入力として受け取る関数を使用してください。テキストを入力として受け取る関数を使った場合、結果は UID2 の目的には無効な長い文字列となります。
:::

## Normalization Examples for Email

次の表は、元のメールアドレスと正規化された値、ハッシュ化された値の例を示しています。

いくつかの例では、プラス記号 (+) を含み、ドメインが異なるメールアドレスを示しています。`gmail` アドレスの場合、プラス記号とそれに続く文字 (`@`記号まで) は正規化では無視されます。その他のドメインの場合、これらの文字は正規化された値に含まれます。

| Original Value | Normalized | Hashed and Base64-Encoded |
| :--- | :--- | :--- |
| `MyEmail@example.com`<br/>`MYEMAIL@example.com` | `myemail@example.com` | Hashed: `16c18d336f0b250f0e2d907452ceb9658a74ecdae8bc94864c23122a72cc27a5`<br/>Base64-Encoded: `FsGNM28LJQ8OLZB0Us65ZYp07NrovJSGTCMSKnLMJ6U=` |
| `My.Email@example.com` | `my.email@example.com` | Hashed: `e22b53bc6f871274f3a62ab37a3caed7214fc14d676215a96a242fcfada1c81f`<br/>Base64-Encoded: `4itTvG+HEnTzpiqzejyu1yFPwU1nYhWpaiQvz62hyB8=` |
| `JANESAOIRSE@example.com`<br/>`JaneSaoirse@example.com` | `janesaoirse@example.com` | Hashed: `d6670e7a92007f1b5ff785f1fc81e53aa6d3d7bd06bdf5c473cdc7286c284b6d`<br/>Base64-Encoded: `1mcOepIAfxtf94Xx/IHlOqbT170GvfXEc83HKGwoS20=` |
| `jane.saoirse@example.com`<br/>`Jane.Saoirse@example.com` | `jane.saoirse@example.com` | Hashed: `	b196432c7b989a2ca91c83799957c515da53e6c13abf20b78fea94f117e90bf8`<br/>Base64-Encoded: `sZZDLHuYmiypHIN5mVfFFdpT5sE6vyC3j+qU8RfpC/g=` |
| `JaneSaoirse+Work@example.com` | `janesaoirse+work@example.com` | Hashed: `28aaee4815230cd3b4ebd88c515226550666e91ac019929e3adac3f66c288180`<br/>Base64-Encoded: `KKruSBUjDNO069iMUVImVQZm6RrAGZKeOtrD9mwogYA=` |
| `JANE.SAOIRSE@gmail.com`<br/>`Jane.Saoirse@gmail.com`<br/>`JaneSaoirse+Work@gmail.com` | `janesaoirse@gmail.com` | Hashed: `92ee26057ed9dea2535d6c8b141d48373932476599196e00352254896db5888f`<br/>Base64-Encoded: `ku4mBX7Z3qJTXWyLFB1INzkyR2WZGW4ANSJUiW21iI8=` |

## Example Code

JavaScript でメールアドレスと電話のハッシュを生成する方法の例については、[Example Code: Hashing and Base-64 Encoding](../guides/integration-javascript-client-side#example-code-hashing-and-base-64-encoding) を参照してください。

## UID2 Hashing Tool

正規化、ハッシュ化、エンコードが正しく行われているかチェックするには、[UID2 hashing tool](https://unifiedid.com/examples/hashing-tool/) を使ってテストすることができます。

Email または Phone Number を選択し、値を入力またはペーストして、**Enter** をクリックします。

このツールは以下を行います:
- Email: 以下の３つの値を表示します:
  - Normalized value (正規化した値)
  - Hashed value (ハッシュした値)
  - Base64-encoded value (Base64 エンコードした値)

- Phone: 以下の2つの値を表示します:
  - Hashed value (ハッシュした値)
  - Base64-encoded value (Base64 エンコードした値)

  :::important
  電話番号の場合は、まずデータを正規化する必要があります。
  :::

入力データが有効なメールアドレスまたは電話番号の形式でない場合、または電話番号が正規化されていない場合、ツールはエラーを表示します。

このツールを使って、UID2 の正規化した値、ハッシュした値、エンコードした値が正しく作成されるように内部プロセスが設定されているかどうかを確認することができます。
