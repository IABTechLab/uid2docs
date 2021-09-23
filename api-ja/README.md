# Unified ID 2.0 API Documentation

* [UID2 Overview（概要）](../README-ja.md)
* [Contact Info（連絡先）](#contact-info)
* [Environment（環境）](#environment)
* [Authentication（認証）](#authentication)
* [Normalizing Emails（メールアドレスの正規化）](#email-normalization)
* [Encoding Query Parameter Values（クエリのパラメータ値のエンコード）](#encoding-query-parameter-values)
* [Encoding Email Hashes（メールアドレスハッシュのエンコード）](#encoding-email-hashes)
* [Response Structure and Status Codes（レスポンスの構造とステータスコード）](#response-structure-and-status-codes)
* [Endpoints（エンドポイント）](./v1/endpoints/README.md)
* [Integration Guides（インテグレーションガイド）](./v1/guides/README.md)
* [License（ライセンス）](#license)


## Contact Info

UID2へのアクセスをご希望の方は、以下のThe Trade Deskの担当者までご連絡ください。

>The Trade Deskへのアクセス要求は一時的なものです。システムが独立したガバナンスに移行した際には、ガバナンスを担当する組織がアクセスリクエストに対応します。

| Your Role | Contact Email |
| :--- | :--- |
| アプリ開発者<br>パブリッシャー | UID2publishers@thetradedesk.com |
| 代理店<br>ブランド<br>CDP<br>データプロバイダー<br>DSP<br>SSP | UID2partners@thetradedesk.com |

## Environment

すべてのUID2エンドポイントは同じベースURLを使用します。

| Environment | Base URL |
| --- | --- |
| テスト環境 | ```https://integ.uidapi.com/v1``` |
| 本番環境 | ```https://prod.uidapi.com/v1``` |

例えば、https://integ.uidapi.com/v1/token/generate

## Authentication

UID2エンドポイントを認証するには、リクエストのauthorizationヘッダーにベアラートークンを使用します。

```
Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=
```

## Email Normalization

リクエストでメールアドレスを送信する前に、以下の手順でメールアドレスを正規化します:

1. 先頭と末尾のスペースを削除します。
2. すべてのASCII文字を小文字に変換します。
3. `gmail.com`のメールアドレスでは、ユーザー名の部分から以下の文字を削除してください。
    1. ピリオド（`.`（ASCIIコード46））。<br/>例えば、`jane.doe@gmail.com`を`janedoe@gmail.com`に正規化します。
    2. プラス記号（`+`（ASCIIコード43））とそれに続くすべての文字。<br/>例えば、`janedoe+home@gmail.com`を`janedoe@gmail.com`に正規化します。

## Encoding Query Parameter Values

リクエストにクエリパラメータの値を渡す際には、クエリパラメータの値がURLエンコードされていることを確認してください。JavaScriptの`encodeURIcomponent()`またはそれに相当するコーディング言語を使用してください。

## Encoding Email Hashes

メールアドレスハッシュは、正規化されたメールアドレスをSHA256ハッシュし、base64エンコードしたものです。

| Type | Example | Use |
| :--- | :--- | :--- |
| Email | `user@example.com` | |
| SHA256 of email | `b4c9a289323b21a01c3e940f150eb9b8c542587f1abfd8f0e1cc1ffc5e475514` | |
| base64-encoded SHA256 of email | `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=` | リクエストボディで送信する `email_hash` の値もこのエンコーディングを使用してください。 |
| URL-encoded, base64-encoded SHA256 of email| `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf%2FF5HVRQ%3D` | このエンコーディングは、クエリパラメータの`email_hash`の値にも使用します。 |

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

| Property | Description |
| :--- | :--- |
| `status` | リクエストのステータスです。詳細およびHTTPステータスコードについては、以下の表を参照してください。 |
| `body.property` | レスポンスのペイロードです。`status`の値が`success`以外の場合、問題が発生したエンドポイント固有の値である可能性があります。|
| `message` | `status`の値が `success`以外の場合、問題に関する追加情報（例：パラメータがない、無効など）。 |

以下の表は、`status`プロパティの値と、それに対応するHTTPステータスコードの一覧です。

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | リクエストは成功しました。|
| `optout` | 200 | ユーザーがオプトアウトしました。このステータスは、許可されたリクエストに対してのみ返されます。 |
| `client_error` | 400 | リクエストに不足または無効なパラメーターがありました。問題の詳細については、レスポンスの `message` プロパティを参照してください。|
| `invalid_token` | 400 | リクエストに無効な ID Tokenが指定されていました。このステータスは、許可されたリクエストに対してのみ返されます。 |
| `unauthorized` | 401 | リクエストにベアラートークンが含まれていないか、無効なベアラートークンが含まれているか、リクエストされた操作を実行する権限のないベアラートークンが含まれていました。 |

## License
All work and artifacts are licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.txt).
