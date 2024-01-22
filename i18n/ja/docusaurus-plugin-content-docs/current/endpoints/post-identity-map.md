---
title: POST /identity/map
description: DII を raw UID2 とソルトバケット ID にマッピングします。
hide_table_of_contents: false
sidebar_position: 08
---

# POST /identity/map

複数のメールアドレス、電話番号、またはそれぞれのハッシュを、raw UID2 とソルトバケット ID にマッピングします。このエンドポイントを使用して、オプトアウト情報の更新をチェックすることもできます

Used by: このエンドポイントは、主に広告主やデータプロバイダーが使用します。詳細は、[Advertiser/Data Provider Integration Guide](../guides/advertiser-dataprovider-guide.md) を参照してください。

## Batch Size and Request Parallelization Requirements

知っておくべきことは以下のとおりです:

- リクエストの最大サイズは 1MB です。
- 大量のメールアドレス、電話番号、またはそれぞれのハッシュをマップするには、1 バッチあたり最大 5,000 アイテムのバッチサイズで、それらを *連続した* バッチで送信してください。
- Private Operator を使用している場合を除き、バッチを並行して送信しないでください。つまり、1 つの HTTP 接続を使用して、[directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) を連続してマッピングしてください。
- メールアドレス、電話番号、またはそれぞれのハッシュのマッピングを必ず保存してください。<br/>マッピングを保存しないと、数百万のメールアドレスや電話番号をマッピングする必要がある場合に、処理時間が大幅に増加する可能性があります。しかし、実際に更新が必要なマッピングのみを再計算することで、毎日更新が必要な raw UID2 の数は約 1/365 となり、総処理時間を短縮できます。[Advertiser/Data Provider Integration Guide](../guides/advertiser-dataprovider-guide.md) と [FAQs for Advertisers and Data Providers](../getting-started/gs-faqs.md#faqs-for-advertisers-and-data-providers) も参照してください。

## Request Format

`POST '{environment}/v2/identity/map'`

> IMPORTANT: すべてのリクエストは、秘密鍵を使用して暗号化する必要があります。詳細と Python スクリプトの例は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md) を参照してください。

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string  | 必須 | テスト環境: `https://operator-integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com`<br/>リージョンごとのオペレーターを含む全リストは [Environments](../getting-started/gs-environments.md) を参照してください。 |

NOTE: インテグレーション環境と本番環境では、異なる [APIキー](../ref-info/glossary-uid.md#gl-api-key) が必要です。

### Unencrypted JSON Body Parameters

> IMPORTANT: リクエストを暗号化するときは、以下の 4 つの条件パラメータのうち、 **1つ** だけをリクエストの JSON ボディにキーと値のペアとして含める必要がります。

| Body Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `email` | string array | 条件付きで必要 | マッピングするメールアドレスのリストです。 |
| `email_hash` | string array | 条件付きで必要 | マッピングする [SHA-256 ハッシュし、Base64 エンコード](../getting-started/gs-normalization-encoding.md#email-address-normalization) した [正規化](../getting-started/gs-normalization-encoding.md#email-address-hash-encoding) 済みメールアドレスのリストです。 |
| `phone` | string array | 条件付きで必要 | マッピングする [正規化](../getting-started/gs-normalization-encoding.md#phone-number-normalization) 済み電話番号のリストです。 |
| `phone_hash` | string array | 条件付きで必要 | マッピングする [SHA-256 ハッシュし、Base64 エンコード](../getting-started/gs-normalization-encoding.md#phone-number-hash-encoding) した [正規化](../getting-started/gs-normalization-encoding.md#phone-number-normalization) 済み電話番号のリストです。 |

### Request Examples

以下は、各パラメータの暗号化されていない JSON リクエストボディの例で、このうちの 1 つを ID マッピングリクエストに含める必要があります:

```json
{
  "email": [
    "user@example.com",
    "user2@example.com"
  ]
}
```
```json
{
  "email_hash": [
    "eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=",
    "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ="
  ]
}
```
```json
{
  "phone": [
    "+1111111111",
    "+2222222222"
  ]
}
```
```json
{
  "phone_hash": [
    "eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=",
    "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ="
  ]
}
```

以下は、メールアドレスハッシュに対する暗号化された ID マッピングリクエストの例です:

```sh
echo '{"phone": ["+1111111111", "+2222222222"]}' | python3 uid2_request.py https://prod.uidapi.com/v2/identity/map YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk= DELPabG/hsJsZk4Xm9Xr10Wb8qoKarg4ochUdY9e+Ow=
```

詳細と Python スクリプトの例は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md) を参照してください。

## Decrypted JSON Response Format

> NOTE: レスポンスは、HTTP ステータスコードが 200 の場合のみ暗号化されます。それ以外の場合、レスポンスは暗号化されません。

復号化に成功すると、指定したメールアドレス、電話番号、またはそれぞれのハッシュに対する raw UID2 とソルトバケット ID が返されます。

```json
{
  "body": {
    "mapped": [
      {
        "identifier": "eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=",
        "advertising_id": "AdvIvSiaum0P5s3X/7X8h8sz+OhF2IG8DNbEnkWSbYM=",
        "bucket_id": "a30od4mNRd"
      },
      {
        "identifier": "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=",
        "advertising_id": "IbW4n6LIvtDj/8fCESlU0QG9K/fH63UdcTkJpAG8fIQ=",
        "bucket_id": "ad1ANEmVZ"
      }
    ]
  },
  "status": "success"
}
```

一部の識別子が無効と判断された場合、それらの識別子は "unmapped" リストとしてレスポンスに含まれる。この場合でも、レスポンスステータスは "success" となります。すべての識別子がマッピングされた場合、"unmapped"リストはレスポンスに含まれません。

```json
{
  "body": {
    "mapped": [
      {
        "identifier": "eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=",
        "advertising_id": "AdvIvSiaum0P5s3X/7X8h8sz+OhF2IG8DNbEnkWSbYM=",
        "bucket_id": "a30od4mNRd"
      }
    ],
    "unmapped": [
      {
        "identifier": "some@malformed@email@hash",
        "reason": "invalid identifier"
      }
    ]
  },
  "status": "success"
}
```

一部の識別子が UID2 エコシステムからオプトアウトしている場合、オプトアウトした識別子は、見つかった無効な識別子とともに "unmapped" リストに移動されます。この場合でも、レスポンスステータスは "success" です。

```json
{
  "body": {
    "mapped": [
      {
        "identifier": "eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=",
        "advertising_id": "AdvIvSiaum0P5s3X/7X8h8sz+OhF2IG8DNbEnkWSbYM=",
        "bucket_id": "a30od4mNRd"
      }
    ],
    "unmapped": [
      {
        "identifier": "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=",
        "reason": "optout"
      }
    ]
  },
  "status": "success"
}
```

### Response Body Properties

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `identifier` | string | リクエストボディで指定されたメールアドレス、電話番号、またはそれぞれのハッシュです。 |
| `advertising_id` | string | 対応する Advertising ID (raw UID2) です。 |
| `bucket_id` | string | raw UID2 の生成に使用したソルトバケットの ID です。 |

### Response Status Codes

次の表は、`status` プロパティの値と、それに対応する HTTP ステータスコードの一覧です。

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | リクエストは成功しました。レスポンスは暗号化されています。 |
| `client_error` | 400 | リクエストに不足している、または無効なパラメータがありました。 |
| `unauthorized` | 401 | クエストにベアラートークンが含まれていない、無効なベアラートークンが含まれている、またはリクエストされた操作を実行するのに許可されていないベアラートークンが含まれていた。 |

`status` の値が `success` 以外であれば、 `message` フィールドにその問題に関する追加情報が表示されます。
