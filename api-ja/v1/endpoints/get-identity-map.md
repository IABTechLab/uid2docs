[UID2 API Documentation](../../README.md) > [v1](../README.md) > [Endpoints](./README.md) > GET /identity/map

# GET /identity/map (Deprecated)

> IMPORTANT: UID2 API v1 は非推奨となり、2023 年 3 月 31 日までにすべての v1 SDK ファイルとエンドポイント、v0 SDK ファイル、およびバージョン管理されていないエンドポイントが削除され、現在のユーザーのみがサポートされるようになります。2023 年 3 月 31 日までに、必ず [UID2 API v2](../../v2/upgrade-guide.md) へのアップグレードをお願いします。初めてフレームワークに触れる方は、[UID2 API v2](../../v2/README.md) をご利用ください。

ハッシュ化された、またはされていないメールアドレスや電話番号の UID2 とソルトバケット ID を取得します。このエンドポイントは [Advertisers/Data Providers](../guides/advertiser-dataprovider-guide.md) による使用を対象としています。

## Request Format

`GET '{environment}/v1/identity/map?{queryParameter}={queryParameterValue}'`

### Path Parameters

| Path Parameter  | Data Type | Attribute | Description                                                                             |
| :-------------- | :-------- | :-------- | :-------------------------------------------------------------------------------------- |
| `{environment}` | string    | 必須      | テスト環境: `https://operator-integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com` |

### Query Parameters

> IMPORTANT: 以下のパラメーターの 1 つのみを含める必要があります。

| Query Parameter | Data Type | Attribute      | Description                                                                                                                                                                             |
| :-------------- | :-------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `email`         | string    | 条件付きで必要 | マップする [URL エンコード](../README.md#query-parameter-value-encoding) したメールアドレスです                                                                                         |
| `email_hash`    | string    | 条件付きで必要 | [SHA256 ハッシュし、URL エンコード、base64 エンコード](../../README.md#email-address-hash-encoding) した [正規化](../../README.md#email-address-normalization) 済みメールアドレスです。 |
| `phone`         | string    | 条件付きで必要 | トークンを生成する [正規化](../../README.md#phone-number-normalization) と [URL エンコード](../../README.md#query-parameter-value-encoding) した電話番号です。                          |
| `phone_hash`    | string    | 条件付きで必要 | [SHA256 ハッシュし、URL エンコード、base64 エンコード](../../README.md#phone-number-hash-encoding) した、[正規化](../../README.md#phone-number-normalization) 済み電話番号です。        |

### Request Examples

メールアドレスのマッピングリクエスト:

```sh
curl -L -X GET 'https://operator-integ.uidapi.com/v1/identity/map?email=username@example.com' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

メールアドレスハッシュのマッピングリクエスト:

```sh
curl -L -X GET 'https://operator-integ.uidapi.com/v1/identity/map?email_hash=eVvLS%2FVg%2BYZ6%2Bz3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc%3D' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

電話番号のマッピングリクエスト:

```sh
curl -L -X GET 'https://operator-integ.uidapi.com/v1/identity/map?phone=%2B1111111111' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

電話番号ハッシュのマッピングリクエスト:

```sh
curl -L -X GET 'https://operator-integ.uidapi.com/v1/identity/map?phone_hash=eVvLS%2FVg%2BYZ6%2Bz3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc%3D' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

## Response Format

指定したメールアドレス、電話番号、それぞれのハッシュの UID2 とソルトバケット ID を返します。

```json
{
  "body": {
    "identifier": "username@example.com",
    "advertising_id": "AdvtiSuYWAZSYe8t4n6sQx0gshoHYZdOzg9qUn/eKgE=",
    "bucket_id": "a30od4mNRd"
  },
  "status": "success"
}
```

### Response Body Properties

| Property         | Data Type | Description                                                                                    |
| :--------------- | :-------- | :--------------------------------------------------------------------------------------------- |
| `identifier`     | string    | リクエストクエリパラメータで指定されたメールアドレス、電話番号、またはそれぞれのハッシュです。 |
| `advertising_id` | string    | 対応する Advertising ID（raw UID2）です。                                                      |
| `bucket_id`      | string    | UID2 の生成に使用したソルトバケットの ID です。                                                |

### Response Status Codes

次の表は、`status` プロパティの値と、それに対応する HTTP ステータスコードの一覧です。

| Status         | HTTP Status Code | Description                                                                                                                                                                    |
| :------------- | :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `success`      | 200              | リクエストは成功しました。                                                                                                                                                     |
| `client_error` | 400              | リクエストに不足している、または無効なパラメータがありました。問題の詳細については、レスポンスの `message` プロパティを参照してください。                                      |
| `unauthorized` | 401              | クエストにベアラートークンが含まれていない、無効なベアラートークンが含まれている、またはリクエストされた操作を実行するのに許可されていないベアラートークンが含まれていました。 |

`status` の値が `success` 以外の場合、 `message` フィールドにその問題に関する追加情報が表示されます。
