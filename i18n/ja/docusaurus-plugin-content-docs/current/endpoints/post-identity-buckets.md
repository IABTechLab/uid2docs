---
title: POST /identity/buckets
description: ソルトバケットのローテーションをモニターします。
hide_table_of_contents: false
sidebar_position: 07
---

# POST /identity/buckets

ソルトバケットのローテーションをモニターします。

Used by: このエンドポイントは、主に広告主とデータプロバイダーによって使用されます。詳細は、[Advertiser/Data Provider Integration Guide](../guides/advertiser-dataprovider-guide.md) を参照してください。

## Request Format

`POST '{environment}/v2/identity/buckets'`

> IMPORTANT: すべてのリクエストは、秘密鍵を使用して暗号化する必要があります。詳細と Python スクリプトの例は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md) を参照してください。

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required  | テスト環境: `https://operator-integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com`<br/>リージョンごとのオペレーターを含む全リストは [Environments](../getting-started/gs-environments.md) を参照してください。 |

NOTE: インテグレーション環境と本番環境では、異なる [APIキー](../ref-info/glossary-uid.md#gl-api-key) が必要です。

### Unencrypted JSON Body Parameters

> IMPORTANT: 暗号化する際には、リクエストの JSON ボディに以下のパラメータを key-value ペアとして含める必要があります。

| Body Parameter | Data Type | Attribute | Description | Format |
| :--- | :--- | :--- | :--- | :--- |
| `since_timestamp` | date-time or integer | 必須      | バケットの最終更新 UTC タイムスタンプを比較する日時を指定します。 | ISO 8601 形式:<br/>`YYYY-MM-DDThh:mm:ss` |

### Request Examples

以下は、暗号化されていない JSON リクエストボディの例で、ID バケットのローテーションリクエストに含める必要があります:

```json
{
  "since_timestamp": "2022-06-01T13:00:00"
}
```
以下は、暗号化された ID バケットのローテーションリクエストの例です:

```sh
echo '{"since_timestamp": "2023-04-19T13:00:00"}' | python3 uid2_request.py https://prod.uidapi.com/v2/identity/buckets [Your-Client-API-Key] [Your-Client-Secret]
```

詳細と Python スクリプトの例は、[リクエストの暗号化とレスポンスの復号化](../getting-started/gs-encryption-decryption.md) を参照してください。

## Decrypted JSON Response Format

> NOTE: レスポンスは、HTTP ステータスコードが 200 の場合のみ暗号化されます。それ以外の場合、レスポンスは暗号化されません。

復号化に成功すると、ソルトバケットの ID と最終更新時刻のリストが返されます。

```json
{
  "body": [
    {
      "bucket_id": "a30od4mNRd",
      "last_updated": "2022-06-05T22:52:03.109"
    },
    {
      "bucket_id": "aJ0jMvw9Z8",
      "last_updated": "2022-06-06T22:52:01.828"
    },
    {
      "bucket_id": "aeRQ9L7wRN",
      "last_updated": "2022-06-01T22:52:02.574"
    }
  ],
  "status": "success"
}
```
### Response Body Properties

| Property | Format | Description |
| :--- | :--- | :--- ||
| `bucket_id` | string | ソルトバケット ID です。 |
| `last_updated` | date-time | バケットソルトが最後にローテーションされた UTC タイムスタンプです。 |

### Response Status Codes

次の表は、`status` プロパティの値と、それに対応する HTTP ステータスコードの一覧です。

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | リクエストは成功しました。レスポンスは暗号化されています。 |
| `client_error` | 400 | リクエストに不足している、または無効なパラメータがありました。|
| `unauthorized` | 401 | クエストにベアラートークンが含まれていない、無効なベアラートークンが含まれている、またはリクエストされた操作を実行するのに許可されていないベアラートークンが含まれていました。 |

`status` の値が `success` 以外であれば、 `message` フィールドにその問題に関する追加情報が表示されます。
