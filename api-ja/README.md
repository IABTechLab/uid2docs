[UID2 Overview](../README-ja.md) > Getting Started with UID2

# Getting Started with UID2

UID2 の定義、ID タイプ、指針、構成要素、その他の概念的な詳細は、 [UID2 Overview](../README-ja.md) を参照してください。

このページでは、UID2 APIを使い始めるために必要な一般的な情報を提供します。

その内容は以下の通りです：

- [Contact Info（連絡先）](#contact-info)
- [API Versions（API バージョン）](#api-versions)
- [Email Address Normalization（メールアドレスの正規化）](#email-address-normalization)
- [Email Address Hash Encoding（メールアドレスハッシュのエンコード）](#email-address-hash-encoding)
- [Phone Number Normalization（電話番号の正規化）](#phone-number-normalization)
- [Phone Number Hash Encoding（電話番号ハッシュのエンコード）](#phone-number-hash-encoding)
- [License（ライセンス）](#license)

## Contact Info

UID2 フレームワークにアクセスするには、以下の The Trade Desk の担当チームにご連絡ください。

> The Trade Desk のアクセス依頼は一時的なものです。独立したガバナンスに移行した際には、運営組織がアクセスリクエストを処理します。

| Your Role                                                        | Contact Email                   |
| :--------------------------------------------------------------- | :------------------------------ |
| アプリ開発者<br/>パブリッシャー                                  | UID2publishers@thetradedesk.com |
| 代理店<br/>ブランド<br/>CDP<br/>データプロバイダー<br/>DSP<br/>SSP | UID2partners@thetradedesk.com   |

## API Versions

UID2 API の現在のバージョンは [UID2 API v2](v2/summary-doc-v2.md) です。旧バージョンをお使いの場合は、[UID2 API v1 to v2 Upgrade Guide](https://github.com/IABTechLab/uid2docs/blob/main/api-ja/v2/upgrades/upgrade-guide.md)の説明にしたがって、必ず UID2 API v2 へアップグレードしてください。

## Email Address Normalization

UID2 Operator Service にハッシュ化されていないメールアドレスを送信すると、同サービスはメールアドレスを正規化してからハッシュ化します。メールアドレスを送信する前に自分でハッシュ化したい場合は、ハッシュ化する前に正規化する必要があります。

> IMPORTANT: ハッシュ化する前に正規化することで、生成される UID2 値が常に同じになり、データを照合できます。ハッシュ化する前に正規化しない場合、異なる UID2 が生成され、ターゲティング広告の効果が低下する可能性があります。

メールアドレスを正規化するには、次の手順を実行します:

1. 先頭と末尾のスペースを削除します。
2. ASCII 文字をすべて小文字に変換します。
3. `gmail.com`のメールアドレスでは、ユーザー名の部分から以下の文字を削除してください。
   1. ピリオド (`.` (ASCII コード 46)) <br/>たとえば、`jane.doe@gmail.com` を `janedoe@gmail.com` に正規化します。
   2. プラス記号 (`+` (ASCII code 43)) とそれに続くすべての文字。<br/>たとえば、`janedoe+home@gmail.com` を `janedoe@gmail.com` に正規化します。

## Email Address Hash Encoding

メールアドレスハッシュは、正規化されたメールアドレスの SHA-256 ハッシュを Base64 でエンコードしたものです。

| Type                                                  | Example                                                            | Comments and Usage                                                                                                                                                |
| :---------------------------------------------------- | :----------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Normalized email address                              | `user@example.com`                                                 | N/A                                                                                                                                                               |
| SHA-256 of email address                              | `b4c9a289323b21a01c3e940f150eb9b8c542587f1abfd8f0e1cc1ffc5e475514` | この 64 文字の文字列は、32 バイトの SHA-256 を 16 進数で表現したものです。                                                                                        |
| Base64-encodedd SHA-256 of email address              | `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=`                     | リクエストボディで送信される `email_hash` 値には、このエンコーディングを使用します。                                                                              |
| URL-encoded, Base64-encodedd SHA-256 of email address | `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf%2FF5HVRQ%3D`                 | この 44 文字の文字列は、32 バイトの SHA-256 を Base64 でエンコードしたものです。<br/>リクエストボディで送られる `email_hash` 値には、このエンコードを使用します。 |

## Phone Number Normalization

ハッシュ化されていない電話番号を UID2 Operator Service に送信すると、同サービスは電話番号を正規化した後、ハッシュ化します。電話番号を送信する前に自分でハッシュ化したい場合は、ハッシュ化する前に電話番号を正規化する必要があります。

> IMPORTANT: ハッシュ化する前に正規化することで、生成される UID2 値が常に同じになり、データを照合できます。ハッシュ化する前に正規化しない場合、異なる UID2 が生成され、ターゲティング広告の効果が低下する可能性があります。

ここでは、電話番号の正規化ルールについて説明します:

- UID2 Operator は、[E.164](https://ja.wikipedia.org/wiki/E.164) 形式の電話番号を受け付けます。これは、国際的に一意性を保証する国際電話番号の形式です。
- E.164 電話番号は、最大 15 桁までです。
- 正規化された E.164 電話番号では、次の構文を使用します。`[+] [国番号] [市外局番を含む加入者番号]`。スペース、ハイフン、括弧、その他の特殊文字は使用できません。たとえば、電話番号 `+123 44 555-66-77`と`1 (123) 456-7890`は、それぞれ`+123445556677`と`+11234567890` として正規化しなければなりません。

## Phone Number Hash Encoding

電話番号ハッシュは、正規化された電話番号の SHA-256 ハッシュを Base64 エンコードしたものです。

| Type                                                 | Example                                                            | Comments and Usage                                                                                                                                                  |
| :--------------------------------------------------- | :----------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Normalized phone number                              | `+12345678901`                                                     | N/A                                                                                                                                                                 |
| SHA-256 of phone number                              | `10e6f0b47054a83359477dcb35231db6de5c69fb1816e1a6b98e192de9e5b9ee` | この 64 文字の文字列は、32 バイトの SHA-256 を 16 進数で表現したものです。                                                                                          |
| Base64-encodedd SHA-256 of phone number              | `EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=`                     | リクエストボディで送信される `phone_hash` 値にはこのエンコーディングを使用します。                                                                                  |
| URL-encoded, Base64-encodedd SHA-256 of phone number | `wdN1alhrbw1Bmz49GzKGdPvGxLhCNn7n3teAOQ%2FFSK4%3D`                 | この 44 文字の文字列は、32 バイトの SHA-256 を Base64 でエンコードしたものです。<br/>リクエストボディで送られる `phone_hash` 値には、このエンコードを使用します。 |

## Response Structure and Status Codes

すべてのエンドポイントは、以下の構造のレスポンスを返します。

```json
{
  "status": "success",
  "body": {
    "property": "propertyValue"
  },
  "message": "Descriptive message"
}
```

| Property        | Description                                                                                                                |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `status`        | リクエストのステータス。詳細および HTTP ステータスコードに相当する情報は、以下の表を参照してください。                     |
| `body.property` | レスポンスのペイロード。`status` の値が `success` 以外の場合、問題が発生したエンドポイント固有の値である可能性があります。 |
| `message`       | `status` の値が `success` 以外の場合、その問題に関する追加情報 (たとえば、パラメータが足りない、無効であるなど) です。       |

次の表は、`status` プロパティの値と、それに対応する HTTP ステータスコードの一覧です。

| Status          | HTTP Status Code | Description                                                                                                                                                                      |
| :-------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `success`       | 200              | リクエストは成功しました。                                                                                                                                                       |
| `optout`        | 200              | ユーザーがオプトアウトしました。このステータスは、許可されたリクエストに対してのみ返されます。                                                                                   |
| `client_error`  | 400              | リクエストに不足している、または無効なパラメータがありました。問題の詳細は、レスポンスの `message` プロパティを参照してください。                                        |
| `invalid_token` | 400              | リクエストには無効な ID トークンが指定されました。このステータスは承認されたリクエストに対してのみ返されます。                                                                   |
| `unauthorized`  | 401              | リクエストにベアラートークンが含まれていない、無効なベアラートークンが含まれている、またはリクエストされた操作を実行するのに許可されていないベアラートークンが含まれていました。 |

## License

All work and artifacts are licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.txt).
