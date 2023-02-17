[UID2 API Documentation](../../README.md) > [v1](../README.md) > [Endpoints](./README.md) > GET /identity/buckets

# GET /identity/buckets (Deprecated)

> IMPORTANT: UID2 API v1 は非推奨となり、2023 年 3 月 31 日までにすべての v1 SDK ファイルとエンドポイント、v0 SDK ファイル、およびバージョン管理されていないエンドポイントが削除され、現在のユーザーのみがサポートされるようになります。2023 年 3 月 31 日までに、必ず [UID2 API v2](../../v2/upgrades/upgrade-guide.md) へのアップグレードをお願いします。初めてフレームワークに触れる方は、[UID2 API v2](../../v2/README.md) をご利用ください。

ローテーションされたソルトバケットを監視します。このエンドポイントは、[Advertisers/Data Providers](../guides/advertiser-dataprovider-guide.md) による使用を対象としています。

## Request Format

`GET '{environment}/v1/identity/buckets?since_timestamp={queryParameterValue}'`

### Path Parameters

| Path Parameter  | Data Type | Attribute | Description                                                                             |
| :-------------- | :-------- | :-------- | :-------------------------------------------------------------------------------------- |
| `{environment}` | string    | 必須      | テスト環境: `https://operator-integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com` |

### Query Parameters

| Query Parameter   | Data Type            | Attribute | Description                                                       | Format                                                                                                         |
| :---------------- | :------------------- | :-------- | :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| `since_timestamp` | date-time or integer | 必須      | バケットの最終更新 UTC タイムスタンプを比較する日時を指定します。 | ISO 8601 形式:<br/>`YYYY-MM-DDThh:mm:ss`<br/>パラメータの値が URL エンコードされていることを確認してください。 |

### Request Example

```curl
curl -L -X GET 'https://operator-integ.uidapi.com/v1/identity/buckets?since_timestamp=2021-03-01T01%3A01%3A01' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk='
```

## Response Format

ソルトバケットの ID と最終更新時刻のリストを返します。

```json
{
  "body": [
    {
      "bucket_id": "a3pPl64opk",
      "last_updated": "2021-03-01T00:00:00"
    },
    {
      "bucket_id": "aENdq9K3VQ",
      "last_updated": "2021-03-01T00:00:00"
    },
    {
      "bucket_id": "adVEM9ywVo",
      "last_updated": "2021-03-01T00:00:00"
    }
  ],
  "status": "success"
}
```

### Response Body Properties

| Property       | Format    | Description                                                     |
| :------------- | :-------- | :-------------------------------------------------------------- |
| `bucket_id`    | string    | ソルトバケット ID です。                                        |
| `last_updated` | date-time | バケットソルトが最後にローテートされた UTC タイムスタンプです。 |

### Response Status Codes

次の表は、`status` プロパティの値と、それに対応する HTTP ステータスコードの一覧です。

| Status         | HTTP Status Code | Description                                                                                                                                                                    |
| :------------- | :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `success`      | 200              | リクエストは成功しました。                                                                                                                                                     |
| `client_error` | 400              | リクエストに不足している、または無効なパラメータがありました。問題の詳細については、レスポンスの `message` プロパティを参照してください。                                      |
| `unauthorized` | 401              | クエストにベアラートークンが含まれていない、無効なベアラートークンが含まれている、またはリクエストされた操作を実行するのに許可されていないベアラートークンが含まれていました。 |

`status` の値が `success` 以外の場合、 `message` フィールドにその問題に関する追加情報が表示されます。
