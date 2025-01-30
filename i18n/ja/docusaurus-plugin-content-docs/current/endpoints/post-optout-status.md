---
title: POST /optout/status
description: Raw UID2 のオプトアウトステータスをチェック。
hide_table_of_contents: false
sidebar_position: 03
---

import Link from '@docusaurus/Link';

# POST /optout/status

<Link href="../ref-info/glossary-uid#gl-raw-uid2">raw UID2s</Link> のオプトアウトステータスを確認します。指定された raw UID2 のリストを使用して、このエンドポイントはオプトアウトした raw UID2 とそのオプトアウトが行われた時刻を返します。詳細は [User Opt-Out](../getting-started/gs-opt-out.md) を参照してください。

Used by: このエンドポイントは、主に広告主、データプロバイダー、DSP、共有者によって使用されます。一般的には、元のメールアドレスや電話番号にアクセスできないが、オプトアウトステータスを知りたい参加者向けです。

詳細については、役割に応じて以下のドキュメントを参照してください:

- [Advertiser/Data Provider Integration Overview](../guides/integration-advertiser-dataprovider-overview.md)
- [DSP Integration Guide](../guides/dsp-guide.md)
- [UID2 Sharing: Overview](../sharing/sharing-overview)

## Batch Size and Request Parallelization Requirements

このエンドポイントへのリクエストのバッチを管理するための主要なガイドラインは次のとおりです:

- 多数の UID2 のオプトアウトステータスを確認するには、1 バッチあたりのバッチサイズが最大 5,000 件となるように、順次バッチを送信してください。
- <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link> を使用している場合を除き、バッチを並行して送信しないでください。つまり、複数の並列接続を作成せず、単一の HTTP 接続を使用して、連続して raw UID2 のバッチを送信してください。

## Request Format

`POST '{environment}/v2/optout/status'`

認証の詳細については、 [Authentication and Authorization](../getting-started/gs-auth.md) を参照してください。

:::important
すべてのリクエストを秘密鍵で暗号化する必要があります。詳細といくつかのプログラミング言語でのコードの例は、[Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md) を参照してください。
:::

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | 必須 | テスト (インテグレーション) 環境: `https://operator-integ.uidapi.com`<br/>本番環境: `https://prod.uidapi.com`<br/>リージョンごとのオペレーターを含む全リストは [Environments](../getting-started/gs-environments.md) を参照してください。 |

:::note
インテグレーション環境と本番環境では、異なる <Link href="../ref-info/glossary-uid#gl-api-key">API Key</Link> が必要です。
:::

### Unencrypted JSON Body Parameters

ボディパラメータは 1 つだけです。

| Body Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `advertising_ids` |	string array |	必須 | オプトアウトのステータスをチェックしたい raw UID2 のリスト。<br/>１回の API 呼び出しで最大 5,000 件のエントリー。 |

### Request Example

以下は、暗号化されていない JSON リクエストボディの例です:

```json
{
  "advertising_ids": [
    "ufv1uGRovNiJNbJqiE/xzM+aKE7jP69MgspOZoEQ3xc=",
    "zstfu9RG/Ih5trR6hlaHP6hw5yt9mYd5TKg2mRpWVng=",
    "VZqcve81+ImeoNUsizTFLEMOvREptJo1ROZvKw9ibSM="
  ]
}
```

以下は、暗号化されたオプトアウトリクエストの例です:

```json
echo '{"advertising_ids": ["ufv1uGRovNiJNbJqiE/xzM+aKE7jP69MgspOZoEQ3xc="]}' | python3 uid2_request.py https://prod.uidapi.com/v2/optout/status [Your-Client-API-Key] [Your-Client-Secret]
```

詳細と、さまざまなプログラミング言語でのコード例については、[Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md) を参照してください。

## Decrypted JSON Response Format

:::note
レスポンスは、HTTP ステータスコードが 200 の場合のみ暗号化されます。それ以外の場合、レスポンスは暗号化されません。
:::

復号化に成功した応答は、オプトアウトした raw UID2 を返します。それぞれについて、オプトアウトリクエストが行われた時刻が含まれます。オプトアウトしていない UID2 は応答に含まれません。

```json
{
  "body": {
    "opted_out": [
      {
        "advertising_id": "ufv1uGRovNiJNbJqiE/xzM+aKE7jP69MgspOZoEQ3xc=",
        "opted_out_since": 1633643601000
      },
      {
        "advertising_id": "zstfu9RG/Ih5trR6hlaHP6hw5yt9mYd5TKg2mRpWVng=",
        "opted_out_since": 1709764087000
      }
    ]
  },
  "status": "success"
}
```

### Response Body Properties

レスポンスボディには、次のプロパティが含まれます。

| Property | Format | Description |
| :--- | :--- | :--- |
| `advertising_id` | string | <Link href="../ref-info/glossary-uid#gl-advertising-id">Advertising ID</Link> (raw UID2). |
| `opted_out_since` | number | raw UID2 がいつオプトアウトされたかを示す <a href="../ref-info/glossary-uid#gl-unix-time">Unix</a> タイムスタンプ (ミリ秒単位)。 |

### Response Status Codes

ステータスプロパティの値と、HTTP ステータスコードに対応する値は次の表の通りです。

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | リクエストは成功しました。応答は暗号化されます。 |
| `client_error` | 400 | リクエストにパラメータがないか無効でした。 |
| `unauthorized` | 401 | リクエストにベアラートークンが含まれていないか、無効なベアラートークンが含まれているか、またはリクエストされた操作を実行するのに許可されていないベアラートークンが含まれています。 |

ステータスの値が `success` 以外の場合、メッセージフィールドにその問題に関する追加情報が表示されます。
