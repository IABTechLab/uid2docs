---
title: POST /identity/map
description: DII を raw UID2 にマップします。
hide_table_of_contents: false
sidebar_position: 08
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import POSTIdentityMapImprovements from '../snippets/_post-identity-map-improvements-v3.mdx';

# POST /identity/map

複数のメールアドレス、電話番号、またはそれぞれのハッシュを、raw UID2 にマッピングします。このエンドポイントを使用して、オプトアウト情報の更新をチェックしたり、raw UID2 の更新が可能な時期を確認したり、現在の raw UID2 が 発行されてから 90 日未満の場合に前の UID2 を表示することもできます。

Used by: このエンドポイントは、主に広告主とデータプロバイダーによって使用されます。詳細は、[Advertiser/Data Provider Integration Overview](../guides/integration-advertiser-dataprovider-overview.md) を参照してください。

UID2 のオプトアウト手順とユーザーがオプトアウトする方法は、[User Opt-Out](../getting-started/gs-opt-out.md) を参照してください。

## Version

このドキュメントは、エンドポイントの最新版であるバージョン 3 を対象としています。

必要に応じて、以前のバージョンのドキュメントも利用可能です: [POST /identity/map (v2)](post-identity-map-v2.md) を参照してください。

## Batch Size and Request Parallelization Requirements

以下が必要な情報です:

- 最大リクエストサイズは 1MB です。
- 大量のメールアドレス、電話番号、またはそれぞれのハッシュをマッピングする場合は、1 バッチあたり最大 5,000 アイテムの *順次* バッチで送信します。
- <Link href="../ref-info/glossary-uid#gl-private-operator">プライベートオペレーター</Link>を使用していない限り、バッチを並行して送信しないでください。つまり、単一の HTTP 接続を使用し、ハッシュ化または非ハッシュ化された <Link href="../ref-info/glossary-uid#gl-dii">直接識別情報 (DII)</Link> 値のバッチを連続して送信し、複数の並行接続を作成しないでください。
- メールアドレス、電話番号、またはそれぞれのハッシュのマッピングを必ず保存してください。<br/>マッピングを保存しないと、数百万のメールアドレスや電話番号をマッピングする際に処理時間が大幅に増加する可能性があります。ただし、実際に更新が必要なマッピングのみを再計算すると、UID2 の約 1/365 が毎日更新されるため、総処理時間が短縮されます。詳細は、[Advertiser/Data Provider Integration Overview](../guides/integration-advertiser-dataprovider-overview.md) と [FAQs for Advertisers and Data Providers](../getting-started/gs-faqs.md#faqs-for-advertisers-and-data-providers) を参照してください。

## Request Format

`POST '{environment}/v3/identity/map'`

認証の詳細は、[Authentication and Authorization](../getting-started/gs-auth.md) を参照してください。

:::important
すべてのリクエストをシークレットを使用して暗号化する必要があります。詳細は、[Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md) を参照してください。
:::

### Path Parameters

| Path Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `{environment}` | string | Required | テスト（インテグレーション）環境: `https://operator-integ.uidapi.com`<br/>本番環境: 最適な選択は、ユーザーの所在地によって異なります。ユースケースに適したURLの選択方法や、有効なベース URL の一覧は、[Environments](../getting-started/gs-environments.md) を参照してください。 |

:::note
インテグレーション環境と本番環境では、異なる <Link href="../ref-info/glossary-uid#gl-api-key">API Key</Link> が必要です。各環境の認証情報の取得方法は、[Getting Your Credentials](../getting-started/gs-credentials.md#getting-your-credentials) を参照してください。
:::

### Unencrypted JSON Body Parameters

:::important
暗号化を行う際には、リクエストの JSON 本文に次の 4 つのパラメーターのいずれかをキーと値のペアとして含めてください。
:::

| Body Parameter | Data Type | Attribute | Description |
| :--- | :--- | :--- | :--- |
| `email` | string array | 条件付きで必須 | マッピングするメールアドレスのリスト。 |
| `email_hash` | string array | 条件付きで必須 | マッピングする[正規化済み](../getting-started/gs-normalization-encoding.md#email-address-normalization)メールアドレスの[Base64エンコードされた SHA-256](../getting-started/gs-normalization-encoding.md#email-address-hash-encoding)ハッシュのリスト。 |
| `phone` | string array | 条件付きで必須 | マッピングする[正規化済み](../getting-started/gs-normalization-encoding.md#phone-number-normalization)電話番号のリスト。 |
| `phone_hash` | string array | 条件付きで必須 | マッピングする[正規化済み](../getting-started/gs-normalization-encoding.md#phone-number-normalization)電話番号の[Base64エンコードされた SHA-256](../getting-started/gs-normalization-encoding.md#phone-number-hash-encoding)ハッシュのリスト。 |


### Request Examples

以下の例は、`POST /identity/map` エンドポイントへの暗号化されていない JSON リクエスト本文の例です:

```json
{
    "email":[
        "user@example.com",
        "user2@example.com"
    ],
    "phone":[
        "+12345678901",
        "+441234567890"
    ]
}
```

```json
{
    "email_hash":[
        "tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=",
        "KzsrnOhCq4tqbGFMsflgS7ig1QLRr0nFJrcrEIlOlbU="
    ],
    "phone_hash":[
        "EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=",
        "Rx8SW4ZyKqbPypXmswDNuq0SPxStFXBTG/yvPns/2NQ="
    ]
}
```

以下は、電話番号の `POST /identity/map` エンドポイントへの暗号化されたリクエストの例です:

```sh
echo '{"phone": ["+12345678901", "+441234567890"]}' | python3 uid2_request.py https://prod.uidapi.com/v3/identity/map [YOUR_CLIENT_API_KEY] [YOUR_CLIENT_SECRET]
```

詳細および異なるプログラミング言語でのコード例は、[Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md) を参照してください。

## Decrypted JSON Response Format

:::note
HTTPステータスコードが 200 の場合、レスポンスは暗号化されます。それ以外の場合、レスポンスは暗号化されません。
:::

復号化に成功したレスポンスは、指定されたメールアドレス、電話番号、またはそれぞれのハッシュに対する現在の raw UID2、以前の raw UID2、および更新タイムスタンプを返します。

レスポンスの配列は、入力配列の順序を保持します。レスポンス配列の各要素は、対応するリクエスト配列の同じインデックスにある要素に直接マッピングされます。これにより、結果をその対応する入力と信頼性高く関連付けることができます。

raw UID2 にマッピングできない入力値は、マッピングできなかった理由を含むエラーオブジェクトにマッピングされます。マッピングに失敗するのは、DII が無効であるか、UID2 エコシステムからオプトアウトされている場合です。このような場合、レスポンスステータスは `success` ですが、raw UID2 は返されません。

以下の例は、入力と対応するレスポンスを示しています。

Input:

```json
{
    "email": [
        "user@example.com",      // Corresponding UID2 rotated in the last 90 days
        "user2@example.com",     // Corresponding UID2 rotated more than 90 days ago
        "invalid email string",  // Invalid identifier
        "optout@example.com"     // DII is opted out
    ]
}
```

Response:

```json
{
    "body":{
        "email": [
            {
                "u": "AdvIvSiaum0P5s3X/7X8h8sz+OhF2IG8DNbEnkWSbYM=",
                "p": "EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=",
                "r": 1735689600000
            },
            {
                "u": "IbW4n6LIvtDj/8fCESlU0QG9K/fH63UdcTkJpAG8fIQ=",
                "p": null,
                "r": 1735862400000
            },
            { "e": "invalid identifier" },
            { "e": "optout" }
        ],
      "email_hash": [],
      "phone": [],
      "phone_hash": []
    },
    "status": "success"
}
```

### Response Body Properties

レスポンス本文には、以下の表に示すプロパティのいずれかが含まれます。

| Body Parameter | Data Type | Description |
| :--- | :--- | :--- |
| `email`        | マッピングされた DII オブジェクトの配列 | リクエスト内のメールアドレスのリストに対応するマッピングされた DII オブジェクトのリスト。 |
| `email_hash`   | マッピングされた DII オブジェクトの配列 | リクエスト内のメールアドレスハッシュのリストに対応するマッピングされた DII オブジェクトのリスト。 |
| `phone`        | マッピングされた DII オブジェクトの配列 | リクエスト内の電話番号のリストに対応するマッピングされた DII オブジェクトのリスト。 |
| `phone_hash`   | マッピングされた DII オブジェクトの配列 | リクエスト内の電話番号ハッシュのリストに対応するマッピングされた DII オブジェクトのリスト。 |


DII が正常にマッピングされた場合、マッピングされたオブジェクトには以下の表に示すプロパティが含まれます。

| Property | Data Type | Description |
| :--- | :--- | :--- |
| `u` | string | リクエストで提供されたメールアドレスまたは電話番号に対応する raw UID2。 |
| `p` | string | 以下のいずれか:<ul><li>現在の raw UID2 が過去 90 日以内にローテーションされた場合: 以前の raw UID2。</li><li>それ以外の場合: `null`。</li></ul> |
| `r` | number | Unix タイムスタンプ（ミリ秒単位）で、raw UID2 がリフレッシュされる可能性のある時刻を示します。このタイムスタンプまで、raw UID2 は有効であることが保証されています。 |

マッピングできなかった入力値に対しては、マッピングされたオブジェクトに以下の表に示すプロパティが含まれます。

| Property | Data Type | Description|
| :--- | :--- | :--- |
| `e`| string | マッピングできなかった理由。次のいずれかの値:<ul><li>`optout`</li><li>`invalid identifier`</li></ul> |  

### Response Status Codes

以下の表は、`status` プロパティの値とその HTTP ステータスコードの対応を示しています。

| Status | HTTP Status Code | Description |
| :--- | :--- | :--- |
| `success` | 200 | リクエストは成功しました。レスポンスは暗号化されます。 |
| `client_error` | 400 | リクエストに欠落または無効なパラメーターが含まれていました。 |
| `unauthorized` | 401 | リクエストにベアラートークンが含まれていない、無効なベアラートークンが含まれている、またはリクエストされた操作を実行する権限のないベアラートークンが含まれていました。 |

`status` プロパティの値が `success` 以外の場合、`message` フィールドには問題に関する追加情報が提供されます。

## Migration from v2 Identity Map

以下のセクションでは、以前のバージョンからバージョン 3 への移行に関する一般的な情報とガイダンスを提供します:

- [Version 3 Improvements](#version-3-improvements)
- [Key Differences Between v2 and v3](#key-differences-between-v2-and-v3)
- [Required Changes](#required-changes)
- [Additional Resources](#additional-resources)

### Version 3 Improvements

<POSTIdentityMapImprovements />

### Key Differences Between v2 and v3

以下の表は、バージョン間の主な違いを示しています。

| Feature | v2 Implementation | v3 Implementation |
| :--- | :--- | :--- |
| 必要なエンドポイント | `/v2/identity/map` + `/v2/identity/buckets` | `/v3/identity/map` のみ |
| リクエストごとのアイデンティティタイプ | 単一のアイデンティティタイプのみ | 複数のアイデンティティタイプ |
| リフレッシュ管理 | `/identity/buckets` エンドポイントを介してソルトバケットのローテーションをモニター | `refresh_from` タイムスタンプを過ぎたときに再マッピング |
| 前の UID2 アクセス | 利用不可 | 90 日間利用可能 |

### Required Changes

以前のバージョンからバージョン 3 へのアップグレードは、以下の手順に従ってください。

1. [Update Endpoint URL](#1-update-endpoint-url)
2. [Update v3 Response Parsing Logic](#2-update-v3-response-parsing-logic)
3. [Replace Salt Bucket Monitoring with Refresh Timestamp Logic](#3-replace-salt-bucket-monitoring-with-refresh-timestamp-logic)

#### 1. Update Endpoint URL

エンドポイント URL を更新して、/v3/ 実装を参照するようにしてください。以下の例を参照してください。

```python
# Before (v2)
url = '/v2/identity/map'

# After (v3) 
url = '/v3/identity/map'
```

#### 2. Update v3 Response Parsing Logic

以下の例に従って、レスポンスの解析ロジックを更新してください。

v2 Response Parsing:
```python
# v2: Process mapped/unmapped objects with identifier lookup
for item in response['body']['mapped']:
    raw_uid = item['advertising_id']
    bucket_id = item['bucket_id']
    original_identifier = item['identifier']
    # Store mapping using identifier as key
    store_mapping(original_identifier, raw_uid, bucket_id)
```

v3 Response Parsing:
```python
# v3: Process array-indexed responses
for index, item in enumerate(response['body']['email']):
    original_email = request_emails[index]  # Use array index to correlate
    if 'u' in item:
        # Successfully mapped
        current_uid = item['u']
        previous_uid = item.get('p')  # Available for 90 days after rotation, otherwise None
        refresh_from = item['r']
        store_mapping(original_email, current_uid, previous_uid, refresh_from)
    elif 'e' in item:
        # Handle unmapped with reason
        handle_unmapped(original_email, item['e'])
```

#### 3. Replace Salt Bucket Monitoring with Refresh Timestamp Logic

Salt Bucketのモニタリングを更新して、`refresh_from` タイムスタンプをチェックし、raw UID2 の更新が必要なものを判断するコードに置き換えます。

以下の例は、リフレッシュタイムスタンプをチェックするための v3 アプローチの実装を示しています:

```python
import time

def is_refresh_needed(mapping):
    now = int(time.time() * 1000)  # Convert to milliseconds
    return now >= mapping['refresh_from']

# Check individual mappings for refresh needs
to_remap = [mapping for mapping in mappings if is_refresh_needed(mapping)]
remap_identities(to_remap)
```

### Additional Resources
- [SDK for Java](../sdks/sdk-ref-java.md) Java 実装 (Advertisers/Data Providers section を参照)

<!-- For SDK-specific migration guidance, see:
- [SDK for Python](../sdks/sdk-ref-python.md) for Python implementations -->

<!-- GWH 7/7 Commenting out the above until the SDK docs are available. -->

ID マッピングの一般的な情報は、[Advertiser/Data Provider Integration Overview](../guides/integration-advertiser-dataprovider-overview.md) を参照してください。
