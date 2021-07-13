# Unified ID 2.0 API Documentation

## Table Of Contents
* [Overview（概要）](#overview)
* [Contact Info（連絡先）](#contact-info)
* [Environment（環境）](#environment)
* [Authentication（認証）](#authentication)
* [Email Normalization（メールアドレスの正規化）](#email-normalization)
* [Encoding Query Parameter Values（クエリのパラメータ値のエンコード）](#encoding-query-parameter-values)
* [Encoding Email Hashes（電子メールハッシュのエンコード）](#encoding-email-hashes)
* [Response Structure and Status Codes（レスポンスの構造とステータスコード）](#response-structure-and-status-codes)
* [Endpoints（エンドポイント）](#endpoints)
* [Integration Guides（インテグレーションガイド）](#integration-guides)
* [License（ライセンス）](#license)


## Overview

[Unified ID 2.0の詳細はこちらを参照してください。](../README-ja.md)

## Contact Info

UID2へのアクセスを希望する方は、以下のThe Trade Deskの担当者までご連絡ください。The Trade Deskへのアクセスは一時的なものです。本システムが独立したガバナンスに移行した際には、ガバナンスを担当する組織がアクセスリクエストに対応します。

| If you are a... | Contact Email |
| --- | --- |
| アプリ開発者<br>パブリッシャー | UID2publishers@thetradedesk.com |
| 代理店<br>ブランド<br>CDP<br>データプロバイダー<br>DSP<br>SSP | UID2partners@thetradedesk.com |

## Environment

すべてのUID2エンドポイントは同じベースURLを使用します。

| Environment | Base URL |
| --- | --- |
| Testing | ```https://integ.uidapi.com/v1``` |
| Production | ```https://prod.uidapi.com/v1``` |

e.g. https://integ.uidapi.com/v1/token/generate

## Authentication

リクエストのAuthorizationヘッダに含まれるベアラートークンを使って、UID2エンドポイントを認証します。

```Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=```

## Email Normalization

リクエストでメールアドレスを送信する場合は、送信前にメールアドレスを正規化します。

1. 先頭と末尾のスペースを削除します。
2. すべてのASCII文字を小文字に変換します。

gmail.comで終わるメールアカウントの場合:

1. 先頭と末尾のスペースを削除します。
2. すべてのASCII文字を小文字に変換します。
3. メールアドレスのユーザ名から`.`（ASCIIコード46）を削除します。`jane.doe@gmail.com` は `janedoe@gmail.com` に正規化されます。
4. メールアドレスのユーザ名から、`+`（ASCIIコード43）とそれに続くすべての文字を削除します。`janedoe+home@gmail.com` は `janedoe@gmail.com` に正規化されます。

## Encoding Query Parameter Values

リクエストにクエリパラメータの値を渡す際には、クエリパラメータの値がURLエンコードされていることを確認してください。Javascriptの`encodeURIcomponent()`または使用する言語の相当するコーディングを使用してください。

## Encoding Email Hashes

電子メールのハッシュは、正規化されたメールアドレスをSHA256ハッシュし、base64エンコードしたものです。

| Type | Example | Use |
| --- | --- | --- |
| Email | `user@example.com` | |
| SHA256 of email | `b4c9a289323b21a01c3e940f150eb9b8c542587f1abfd8f0e1cc1ffc5e475514` | |
| base64-encoded SHA256 of email | `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=` | リクエストボディで送信する `email_hash` の値もこのエンコーディングを使用してください。 |
| URL-encoded, base64-encoded SHA256 of email| `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf%2FF5HVRQ%3D` | このエンコーディングは、クエリパラメータの`email_hash`の値にも使用します。 |

## Response Structure and Status Codes

すべてのエンドポイントは、以下のボディとステータスメッセージング構造を利用したレスポンスを返します。`status` プロパティは、エンドポイント固有の値を含むことができます。`message` プロパティは、`success`ではないステータスの場合、追加情報を返します。

```json
{
    "status": "success",
    "body": {
        "property": "propertyValue"
    },
    "message": "Descriptive message"
}
```

| Status | HTTP Status Code | Additional Notes |
| --- | --- | --- |
| `success` | 200 | |
| `optout` | 200 | このステータスは、許可されたリクエストに対してのみ返されます。ユーザーがオプトアウトしました。 |
| `client_error` | 400 | 不足している、あるいは無効なパラメータの詳細については、`message`フィールドを参照してください。 |
| `invalid_token` | 400 | このステータスは、許可されたリクエストに対してのみ返されます。リクエストに無効な ID トークンが指定されました。 |
| `unauthorized` | 401 | リクエストにベアラートークンが含まれていないか、無効なベアラートークンが含まれているか、リクエストされたアクションを実行する権限のないベアラートークンが含まれていました。 |

## Endpoints
[エンドポイントの一覧はこちらを参照してください。](./v1/endpoints/README.md)

## Integration Guides
[インテグレーションガイドはこちらを参照してください。](./v1/guides/README.md)

## License
All work and artifacts are licensed under the Apache License, Version 2.0. See [LICENSE](http://www.apache.org/licenses/LICENSE-2.0.txt) for the full license text.
