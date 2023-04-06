[UID2 Overview](../../../README.md) > [Getting Started](../../README.md) > [v2](../summary-doc-v2.md) > [Endpoints](summary-endpoints.md) > POST /identity/map

# POST /identity/map

複数のメールアドレス、電話番号、それぞれのハッシュを UID2 やソルトバケット ID にマッピングします。

Used by: このエンドポイントは、主に広告主やデータプロバイダーが使用します。詳細は、[Advertiser/Data Provider Integration Guide](../guides/advertiser-dataprovider-guide.md)を参照してください。

## Batch Size and Request Parallelization Requirements

知っておくべきことは次のとおりです:

- リクエストの最大サイズは 1MB です。
- 多数のメールアドレス、電話番号、またはそれぞれのハッシュをマッピングするには、1 バッチあたり最大 5,000 アイテムのバッチサイズで、それらを _連続した_ バッチで送信してください。
- バッチを並列で送信しないでください。
- プライベートオペレーターを使用している場合を除き、バッチを並行して送信しないでください。つまり、1 つの HTTP 接続を使用して、PII を連続してマッピングしてください。
- メールアドレス、電話番号、またはそれぞれのハッシュのマッピングを必ず保存してください。<br/>マッピングを保存しないと、数百万のメールアドレスや電話番号をマッピングする必要がある場合に、処理時間が大幅に増加する可能性があります。しかし、実際に更新が必要なマッピングのみを再計算することで、毎日更新が必要な UID2 の数は約 1/365 となり、総処理時間を短縮することができます。[Advertiser/Data Provider Integration Guide and FAQs](../guides/advertiser-dataprovider-guide.md) も参照してください。

## Request Format

`POST '{environment}/v2/identity/map'`

> IMPORTANT: すべてのリクエストは、秘密鍵を使用して暗号化する必要があります。詳細と Python スクリプトの例については、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md) を参照してください。

### Path Parameters

| Path Parameter  | Data Type | Attribute | Description                                                                                                                                                                                                   |
| :-------------- | :-------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `{environment}` | string    | 必須      | テスト環境: `https://operator-integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com`<br/>リージョンごとのオペレータを含む全リストは [Environments](../summary-doc-v2.md#environments) を参照してください。 |

### Unencrypted JSON Body Parameters

> IMPORTANT: リクエストを暗号化する際、JSON ボディに Key-Value ペアとして以下のパラメータのうち 1 つだけを含める必要があります。

| Body Parameter | Data Type    | Attribute      | Description                                                                                                                                                                     |
| :------------- | :----------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `email`        | string array | 条件付きで必要 | マッピングするメールアドレスのリストです。                                                                                                                                      |
| `email_hash`   | string array | 条件付きで必要 | [正規化](../../README.md#email-address-hash-encoding) したメールアドレスを [SHA256 ハッシュし、base64 エンコード](../../README.md#email-address-normalization) したリストです。 |
| `phone`        | string array | 条件付きで必要 | マッピングする [正規化](../../README.md#phone-number-normalization) 済み電話番号のリストです。                                                                                  |
| `phone_hash`   | string array | 条件付きで必要 | [SHA256 ハッシュし、base64 エンコード](../../README.md#phone-number-hash-encoding) した [正規化](../../README.md#phone-number-normalization) 済み電話番号のリストです。         |

### Request Examples

以下は、各パラメータの暗号化されていない JSON リクエストボディの例で、このうちの 1 つを ID マッピングリクエストに含める必要があります:

```json
{
  "email": ["user@example.com", "user2@example.com"]
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
  "phone": ["+1111111111", "+2222222222"]
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

以下は、プレースホルダー値を含む暗号化された ID マッピングのリクエスト形式です:

```sh
echo '[Unencrypted-JSON-Request-Body]' \
  | encrypt_request.py [Your-Client-Secret] \
  | curl -X POST 'https://prod.uidapi.com/v2/identity/map' -H 'Authorization: Bearer [Your-Client-API-Key]' -d @- \
  | decrypt_response.py [Your-Client-Secret]
```

以下は、メールアドレスハッシュに対する暗号化された ID マッピングリクエストの例です:

```sh
echo '{"phone": ["+1111111111", "+2222222222"]}' \
  | encrypt_request.py DELPabG/hsJsZk4Xm9Xr10Wb8qoKarg4ochUdY9e+Ow= \
  | curl -X POST 'https://prod.uidapi.com/v2/identity/map' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=' -d @- \
  | decrypt_response.py DELPabG/hsJsZk4Xm9Xr10Wb8qoKarg4ochUdY9e+Ow=
```

詳細と Python スクリプトの例については、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md) を参照してください。

## Decrypted JSON Response Format

> NOTE: レスポンスは、HTTP ステータスコードが 200 の場合のみ暗号化されます。それ以外の場合、レスポンスは暗号化されません。

復号化に成功すると、指定したメールアドレス、電話番号、またはそれぞれのハッシュに対する UID2 とソルトバケット ID が返されます。

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
| `success`      | 200              | リクエストは成功しました。レスポンスは暗号化されています。                                                                                                                     |
| `client_error` | 400              | リクエストに不足している、または無効なパラメータがありました。                                                                                                                 |
| `unauthorized` | 401              | クエストにベアラートークンが含まれていない、無効なベアラートークンが含まれている、またはリクエストされた操作を実行するのに許可されていないベアラートークンが含まれていました。 |

`status` の値が `success` 以外の場合、 `message` フィールドにその問題に関する追加情報が表示されます。
