[UID2 API Documentation](../../README.md) > [v1](../README.md) > [Endpoints](./README.md) > POST /identity/map

# POST /identity/map (Deprecated)

> IMPORTANT: UID2 API v1 は非推奨となり、2023 年 3 月 31 日までにすべての v1 SDK ファイルとエンドポイント、v0 SDK ファイル、およびバージョン管理されていないエンドポイントが削除され、現在のユーザーのみがサポートされるようになります。2023 年 3 月 31 日までに、必ず [UID2 API v2](../../v2/upgrades/upgrade-guide.md) へのアップグレードをお願いします。初めてフレームワークに触れる方は、[UID2 API v2](../../v2/README.md) をご利用ください。

複数のメールアドレスや電話番号、それぞれのハッシュを、UID2 やソルトバケット ID にマッピングします。このエンドポイントは [Advertisers/Data Providers](../guides/advertiser-dataprovider-guide.md) による利用を対象としています。

知っておくべきことは次のとおりです:

- リクエストの最大サイズは 1MB です。
- 多数のメールアドレス、電話番号、またはそれぞれのハッシュをマッピングするには、1 バッチあたり最大 5,000 アイテムのバッチサイズで、それらを _連続した_ バッチで送信してください。
- バッチを並列で送信しないでください。

## Request Format

`POST '{environment}/v1/identity/map'`

### Path Parameters

| Path Parameter  | Data Type | Attribute | Description                                                                             |
| :-------------- | :-------- | :-------- | :-------------------------------------------------------------------------------------- |
| `{environment}` | string    | 必須      | テスト環境: `https://operator-integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com` |

### Request Body Parameters

以下の 4 つのパラメータのうち、1 つだけを指定します。

| Query Parameter | Data Type    | Attribute      | Description                                                                                                                                                                    |
| :-------------- | :----------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `email`         | string array | 条件付きで必要 | マッピングするメールアドレスのリストです。                                                                                                                                     |
| `email_hash`    | string array | 条件付きで必要 | [SHA256 ハッシュし、base64 エンコード](../../README.md#email-address-hash-encoding) した [正規化](../../README.md#email-number-normalization) 済みメールアドレスのリストです。 |
| `phone`         | string array | 条件付きで必要 | マッピングする [正規化](../../README.md#phone-number-normalization) 済み電話番号のリストです。                                                                                 |
| `phone_hash`    | string array | 条件付きで必要 | [SHA256 ハッシュし、base64 エンコード](../../README.md#phone-number-hash-encoding) した [正規化](../../README.md#phone-number-normalization) 済み電話番号のリストです。        |

### Request Examples

メールアドレスのマッピングリクエスト:

```sh
curl -L -X POST 'https://operator-integ.uidapi.com/v1/identity/map' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=' -H 'Content-Type: application/json' --data-raw '{
    "email":[
        "user@example.com",
        "user2@example.com"
    ]
}'
```

メールアドレスハッシュのマッピングリクエスト:

```sh
curl -L -X POST 'https://operator-integ.uidapi.com/v1/identity/map' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=' -H 'Content-Type: application/json' --data-raw '{
    "email_hash":[
        "eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=",
        "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ="
    ]
}'
```

電話番号のマッピングリクエスト:

```sh
curl -L -X POST 'https://operator-integ.uidapi.com/v1/identity/map' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=' -H 'Content-Type: application/json' --data-raw '{
    "phone":[
        "+1111111111",
        "+2222222222"
    ]
}'
```

電話番号ハッシュのマッピングリクエスト:

```sh
curl -L -X POST 'https://operator-integ.uidapi.com/v1/identity/map' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=' -H 'Content-Type: application/json' --data-raw '{
    "phone_hash":[
        "eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=",
        "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ="
    ]
}'
```

## Response Format

レスポンスには、指定したメールアドレス、電話番号、それぞれのハッシュの UID2 とソルトバケット ID を返します。

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

### Response Body Properties

| Property         | Data Type | Description                                                                          |
| :--------------- | :-------- | :----------------------------------------------------------------------------------- |
| `identifier`     | string    | リクエストボディで指定されたメールアドレス、電話番号、またはそれぞれのハッシュです。 |
| `advertising_id` | string    | 対応する Advertising ID（raw UID2）です。                                            |
| `bucket_id`      | string    | UID2 の生成に使用したソルトバケットの ID です。                                      |

### Response Status Codes

次の表は、`status` プロパティの値と、それに対応する HTTP ステータスコードの一覧です。

| Status         | HTTP Status Code | Description                                                                                                                                                                    |
| :------------- | :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `success`      | 200              | リクエストは成功しました。                                                                                                                                                     |
| `client_error` | 400              | リクエストに不足している、または無効なパラメータがありました。問題の詳細については、レスポンスの `message` プロパティを参照してください。                                      |
| `unauthorized` | 401              | クエストにベアラートークンが含まれていない、無効なベアラートークンが含まれている、またはリクエストされた操作を実行するのに許可されていないベアラートークンが含まれていました。 |

`status` の値が `success` 以外の場合、 `message` フィールドにその問題に関する追加情報が表示されます。
