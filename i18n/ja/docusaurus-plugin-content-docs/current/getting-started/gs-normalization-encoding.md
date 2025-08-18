---
title: Normalization and Encoding
description: 情報を正規化およびエンコードして、安全にデコードできるようにする方法。
hide_table_of_contents: false
sidebar_position: 13
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Normalization and Encoding

このページでは、<Link href="../ref-info/glossary-uid#gl-dii">DII</Link> の正規化とエンコードに関する情報を提供します。UID2 を使用する際には、正規化とエンコードが正しく行われることが重要です。

## Introduction

メールアドレスなどのユーザー情報を取得し、UID2 の raw UID2 や Advertising Token を作成するには、必要なすべての手順に従うことが非常に重要です。メールアドレスを正規化するかどうか、メールアドレスや電話番号をハッシュ化するかどうかに関係なく、手順を正確に実行してください。そうすることで、作成した UID2 値が同じユーザーによる他のオンライン行動のインスタンスと安全かつ匿名で照合できることを保証できます。

:::important
- Raw UID2 と関連する UID2 Token は、ケースセンシティブです。UID2 を使用する場合は、すべての ID とトークンをケースを変更せずに渡すことが重要です。ID が一致しないと、ID の解析やトークンの復号化エラーが発生する可能性があります。
- 必須のステップを一つでも省略した場合（例えば、正規化せずにハッシュ化した場合）、入力データに対して正しい UID2 値は生成されません。<br/>たとえば、データ提供者が `JANESaoirse@gmail.com` というメールアドレスからUID2を生成したいとします。このメールアドレスは、正規化されると `janesaoirse@gmail.com` となり、ハッシュ化されてBase64でエンコードされた値は `ku4mBX7Z3qJTXWyLFB1INzkyR2WZGW4ANSJUiW21iI8=` となります。<br/>一方で、同じメールアドレスを持つパブリッシャーが、誤って正規化をせずに処理したとします。正規化されていないメールアドレス`JANESaoirse@gmail.com` をそのままハッシュ化してBase64でエンコードすると、`VpLXEp5N1bj/V1WzjgZsC+FfuYdntAOywSVIO00FD/E=` という値になります。この 2 つの異なる値からは、それぞれ異なる UID2 が生成されてしまいます。正しく処理された最初のUID2は、同じ元のデータから生成された他の UID2 と一致しますが、誤って処理された2番目の UID2 は一致しません。<br/>この場合、UID2 が同じユーザーの他のインスタンスと一致しないため、パブリッシャーはターゲティング広告の恩恵を受ける機会を逃してしまいます。
:::

## Types of Directly Identifying Information

UID2 は、次の種類の直接識別情報 (DII) をサポートしています。
- メールアドレス
- 電話番号

## Email Address Normalization

UID2 <Link href="../ref-info/glossary-uid#gl-operator-service">Operator Service</Link> にメールアドレスをハッシュ化せずに送信すると、サービスはメールアドレスを正規化してからハッシュ化します。メールアドレスを送信する前に自分でハッシュ化したい場合は、ハッシュ化する前にメールアドレスを正規化する必要があります。

:::important
ハッシュ化する前に正規化することで、生成される UID2 値が常に同じになるため、データを照合できるようになります。ハッシュ化の前に正規化しないと、異なる UID2 が生成され、ターゲティング広告の効果が低下する可能性があります。
:::

メールアドレスを正規化するには、次の手順を実行します:

1. メールアドレスの先頭と末尾のスペースを削除します。
2. メールアドレスに大文字が含まれている場合は、小文字に変換します。
3. `gmail.com` アドレスの場合のみ:
   1. ピリオド (`.`)（ASCII decimal code 46/UTF-8 hexadecimal code 2E）がアドレスに含まれている場合、それを削除します。
   
     たとえば、`jane.doe@gmail.com` を `janedoe@gmail.com` に正規化します。

   2. `@gmail.com` の前にプラス記号 (`+`) とその後の文字列がある場合、プラス記号 (`+`)（ASCII decimal code 43/UTF-8 hexadecimal code 2B）とその後のすべての文字を削除します。

     たとえば、`janedoe+home@gmail.com` を `janedoe@gmail.com` に正規化します。

:::warning
正規化されたメールアドレスが UTF-8 であることを確認してください。他のエンコーディングシステム（例: UTF-16）ではありません。
:::

様々なシナリオの例は、[Normalization Examples for Email](#normalization-examples-for-email) を参照してください。

## Email Address Hash Encoding

メールアドレスのハッシュは、正規化されたメールアドレスの Base64 エンコードされた <Link href="../ref-info/glossary-uid#gl-sha-256">SHA-256</Link> ハッシュです。メールアドレスは最初に正規化され、次に SHA-256 ハッシュアルゴリズムを使用してハッシュ化され、最後にハッシュ値のバイトを Base64 エンコードします。Base64 エンコードは、ハッシュ値のバイトに適用され、16進数でエンコードされた文字列表現ではないことに注意してください。

| Type | Example | Comments and Usage |
| :--- | :--- | :--- |
| 元のメールアドレス | `USER@example.com` | N/A |
| 正規化されたメールアドレス | `user@example.com` | 正規化は常に最初のステップです。 |
| 正規化されたメールアドレスの SHA-256 ハッシュ| `b4c9a289323b21a01c3e940f150eb9b8c542587f1abfd8f0e1cc1ffc5e475514` | これは、32 バイトの SHA-256 の16進数エンコードされた表現です。 |
| SHA-256 ハッシュの16進数から Base64 へのエンコード | `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=` | この 44 文字の文字列は、32 バイトの SHA-256 の Base64 エンコードされた表現です。<br/>SHA-256 ハッシュの文字列は、ハッシュ値の 16 進数エンコードされた表現であることに注意してください。ハッシュの生のバイトを Base64 エンコードするか、16 進数エンコードされた値を入力として受け取る Base64 エンコーダーを使用する必要があります。<br/>このエンコードをリクエストボディで送信される `email_hash` 値に使用します。 |

:::important
Base64 エンコーディングを適用する際は、ハッシュの生のバイトを Base64 エンコードするか、16 進数エンコードされた値を入力として受け取る Base64 エンコーダーを使用してください。
:::

その他の例は、[Normalization Examples for Email](#normalization-examples-for-email) を参照してください。

## Normalization Examples for Email

以下の表は、元のメールアドレスと正規化された値およびハッシュ値の例を示しています。

いくつかの例では、プラス記号（+）を含むメールアドレスと異なるドメインが示されています。`gmail` アドレスの場合、プラス記号とその後の文字は、`@` 記号まで無視されます。他のドメインでは、これらの文字は正規化された値に含まれます。

| Original Value | Normalized | Hashed and Base64-Encoded |
| :--- | :--- | :--- |
| `MyEmail@example.com`<br/>`MYEMAIL@example.com` | `myemail@example.com` | Hashed: `16c18d336f0b250f0e2d907452ceb9658a74ecdae8bc94864c23122a72cc27a5`<br/>Base64-Encoded: `FsGNM28LJQ8OLZB0Us65ZYp07NrovJSGTCMSKnLMJ6U=` |
| `My.Email@example.com` | `my.email@example.com` | Hashed: `e22b53bc6f871274f3a62ab37a3caed7214fc14d676215a96a242fcfada1c81f`<br/>Base64-Encoded: `4itTvG+HEnTzpiqzejyu1yFPwU1nYhWpaiQvz62hyB8=` |
| `JANESAOIRSE@example.com`<br/>`JaneSaoirse@example.com` | `janesaoirse@example.com` | Hashed: `d6670e7a92007f1b5ff785f1fc81e53aa6d3d7bd06bdf5c473cdc7286c284b6d`<br/>Base64-Encoded: `1mcOepIAfxtf94Xx/IHlOqbT170GvfXEc83HKGwoS20=` |
| `jane.saoirse@example.com`<br/>`Jane.Saoirse@example.com` | `jane.saoirse@example.com` | Hashed: `	b196432c7b989a2ca91c83799957c515da53e6c13abf20b78fea94f117e90bf8`<br/>Base64-Encoded: `sZZDLHuYmiypHIN5mVfFFdpT5sE6vyC3j+qU8RfpC/g=` |
| `JaneSaoirse+Work@example.com` | `janesaoirse+work@example.com` | Hashed: `28aaee4815230cd3b4ebd88c515226550666e91ac019929e3adac3f66c288180`<br/>Base64-Encoded: `KKruSBUjDNO069iMUVImVQZm6RrAGZKeOtrD9mwogYA=` |
| `JANE.SAOIRSE@gmail.com`<br/>`Jane.Saoirse@gmail.com`<br/>`JaneSaoirse+Work@gmail.com` | `janesaoirse@gmail.com` | Hashed: `92ee26057ed9dea2535d6c8b141d48373932476599196e00352254896db5888f`<br/>Base64-Encoded: `ku4mBX7Z3qJTXWyLFB1INzkyR2WZGW4ANSJUiW21iI8=` |

## Phone Number Normalization

:::important
UID2 Operator Service　へのリクエストで電話番号を送信する前に、**必ず**電話番号を正規化してください。ハッシュ化とエンコードを適用するかどうかに関係なく、正規化が必要です。
:::

ここでは、電話番号の正規化ルールについて知っておくべきことを説明します:

- UID2 Operator は、国際的な電話番号形式である [E.164](https://en.wikipedia.org/wiki/E.164) 形式の電話番号を受け入れます。これにより、グローバルな一意性が確保されます。
- E.164 電話番号は、最大 15 桁の数字を含むことができます。
- 正規化された E.164 電話番号は、スペース、ハイフン、括弧、その他の特殊文字を含まない次の構文を使用します:<br/>
  `[+] [国コード] [加入者番号（市外局番を含む）]`
  例:
   - US: `1 (234) 567-8901` は `+12345678901` に正規化されます。
   - Singapore: `65 1243 5678` は `+6512345678` に正規化されます。
   - Sydney, Australia: `(02) 1234 5678` は、先頭のゼロを削除し、国コードを含めるように正規化されます: `+61212345678`。

:::warning
正規化された電話番号が UTF-8 であることを確認してください。他のエンコーディングシステム（例: UTF-16）ではありません。
:::

## Phone Number Hash Encoding

電話番号のハッシュは、正規化された電話番号の Base64 エンコードされた SHA-256 ハッシュです。電話番号は最初に正規化し、次に SHA-256 ハッシュアルゴリズムを使用してハッシュ化し、最後にハッシュ値のバイトを Base64 エンコードします。Base64 エンコードは、ハッシュ値のバイトに適用され、16 進数でエンコードされた文字列表現ではないことに注意してください。

以下の表は、単純な入力電話番号の例と、各ステップを適用して安全で不透明な URL-safe な値にする結果を示しています。

| Type | Example | Comments and Usage |
| :--- | :--- | :--- |
| 元の電話番号 | `1 (234) 567-8901` | N/A |
| 正規化された電話番号 | `+12345678901` | 正規化は常に最初のステップです。 |
| 正規化された電話番号の SHA-256 ハッシュ | `10e6f0b47054a83359477dcb35231db6de5c69fb1816e1a6b98e192de9e5b9ee` |この 64 文字の文字列は、32 バイト SHA-256 の 16 進数エンコードされた表現です。 |
| SHA-256 ハッシュの 16 進数から Base64 へのエンコーディング | `EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=` | この 44 文字の文字列は、32 バイト SHA-256 の Base64 エンコードされた表現です。<br/>注: SHA-256 ハッシュは 16 進数の値です。16 進数の値を入力として受け取る Base64 エンコーダーを使用する必要があります。このエンコーディングは、リクエストボディに送信される `phone_hash` 値に使用します。 |

:::warning
Base64 エンコーディングを適用する際は、ハッシュの生のバイトを Base64 エンコードするか、16 進数エンコードされた値を入力として受け取る Base64 エンコーダーを使用してください。
:::

## Example Code

メールアドレスや電話番号のハッシュを生成する方法の例は、[Example Code: Hashing and Base-64 Encoding](../guides/integration-javascript-client-side#example-code-hashing-and-base-64-encoding) を参照してください。

## UID2 Hashing Tool

正規化、ハッシュ化、エンコードが正しく行われているかを確認するには、[UID2 hashing tool](https://unifiedid.com/examples/hashing-tool/) を使用できます。

Email または Phone Number を選択し、値を入力または貼り付けてから **Enter** をクリックします。

このツールは、次のことを行います:
- Email: 以下の 3 つの値を表示します:
  - Normalized value
  - Hashed value
  - Base64-encoded value

- Phone: 以下の 2 つの値を表示します:
  - Hashed value
  - Base64-encoded value

  :::important
  電話番号の場合、最初にデータを正規化する必要があります。
  :::

入力したデータが有効なメールアドレスまたは電話番号の形式でない場合、または電話番号が正規化されていない場合、ツールはエラーを返します。

このツールを使用して、内部プロセスが UID2 の正規化、ハッシュ化、およびエンコードされた値を正しく作成するように設定されていることを確認できます。
