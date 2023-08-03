---
title: UID2 SDK for Python
description: Python Server-Side SDK のリファレンス情報。
hide_table_of_contents: false
sidebar_position: 06
---

# UID2 SDK for Python (Server-Side) Reference Guide

UID2 Server-Side SDK を使用すると、UID2 Token を復号化して raw UID2 にアクセスしやすくなります。

<!-- This guide includes the following information:

- [Overview](#overview)
- [Functionality](#functionality)
- [Initialization](#initialization)
- [Interface](#interface)
  - [Response Content](#response-content)
  - [Response Statuses](#response-statuses)
- [FAQs](#faqs)
- [Usage for UID2 Sharers](#usage-for-uid2-sharers) -->

## Overview

ここで説明する関数は、設定に必要な情報やライブラリから取得できる情報を定義しています。以下に定義するパラメータとプロパティ名は擬似コードです。実際のパラメータやプロパティ名は言語によって異なりますが、ここで説明する情報と同様のものになります。

## Functionality

この SDK は、Server-Side のコーディングに Python を使用している DSP または UID2 Sharer のために、UID2 とのインテグレーションを簡素化します。次の表に、このSDKがサポートする機能を示します。

| Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token | Generate UID2 Token from DII | Refresh UID2 Token |
| :--- | :--- | :--- | :--- |
| Yes | Yes | No | No |

## Version

この SDK には  Python 3.6 以降が必要です。

## SDK Repository

この SDK は GitHub で公開されています: [UID2 SDK for Python](https://github.com/IABTechLab/uid2-client-python/blob/master/README.md)

## Initialization

初期化関数は、SDKが UID2 Service で認証するために必要なパラメータを設定します。また、エラー発生時の再試行間隔を設定することもできます。

| Parameter | Description | Recommended Value |
| :--- | :--- | :--- |
| `endpoint` | UID2 Service　のエンドポイント。 | N/A |
| `authKey` | クライアントに付与された認証トークン。UID2 へのアクセスについては、 [Contact Info](../getting-started/gs-account-setup.md#contact-info) を参照してください。 | N/A |

## Interface 

このインターフェイスを使用すると、UID2 Advertising Token を復号化し、対応する raw UID2 を返すことができます。

>NOTE: SDK を使用する際に、復号鍵を保存したり管理したりする必要はありません。

DSP の場合は、入札のために UID2 Advertising Token を復号化して UID2 を返すインターフェースを呼び出します。ユーザーのオプトアウトを処理する入札ロジックの詳細については、[DSPインテグレーションガイド](../guides/dsp-guide.md) を参照してください。

以下の例では、Python で decrypt メソッドを呼び出しています:

```python
from uid2_client import decrypt
def decrypt(token, keys, now=dt.datetime.now(tz=timezone.utc))
```

### Response Content

SDK から返される利用可能な情報の概要を次の表に示します。

| Property | Description |
| :--- | :--- |
| `Status` | 復号結果のステータス。指定可能な値の一覧と定義については、[Response Statuses](#response-statuses) を参照してください。 |
| `UID2` | UID2 Advertising Token に対応する raw UID2。|
| `Established` | ユーザーがパブリッシャーと最初に UID2 を確立した時を示すタイムスタンプ。|

### Response Statuses

| Value | Description |
| :--- | :--- |
| `Success` | UID2 Advertising Token は正常に復号され、raw UID2 が返されました。 |
| `NotAuthorizedForKey` | リクエスト元はこの UID2 Advertising Token を復号化する権限を持っていません。|
| `NotInitialized` | クライアントライブラリは初期化待ちです。 |
| `InvalidPayload` | 受信した UID2 Advertising Token は有効なペイロードではありません。 |
| `ExpiredToken` | 受信した UID2 Advertising Token の有効期限が切れています。 |
| `KeysNotSynced` | クライアントは UID2 Service からの鍵の同期に失敗しました。|
| `VersionNotSupported` | クライアントライブラリが暗号化トークンのバージョンをサポートしていません。|


## Usage for UID2 Sharers

UID2 Sharer とは、UID2 を他の参加者と共有したい参加者のことです。raw UID2を他の参加者に送信する前に、UID2 Token に暗号化する必要があります。使用例については、[com.uid2.client.test.IntegrationExamples](https://github.com/IABTechLab/uid2-client-java/blob/master/src/test/java/com/uid2/client/test/IntegrationExamples.java) (`runSharingExample` メソッド) を参照してください。

次の手順では、UID2 SDK for Python を送信者または受信者として使用して共有を実装する方法の例を示します。


1. ```UID2Client``` のリファレンスを作成します:
 
   ```python
   from uid2_client import Uid2Client
   client = Uid2Client(base_url, auth_key, secret_key)
   ```
2. 起動時に一度リフレッシュし、その後定期的にリフレッシュします（推奨リフレッシュ間隔は1時間毎）:

   ```python
   keys = client.refresh_keys()
   ```

3. 送信者: 
   1. `encrypt` 関数を呼び出します。暗号化に成功したら、UID2 Token を受信者に送信します:

      ```python
      from uid2_client import encrypt
      from uid2_client.identity_scope import IdentityScope
      
      try:
         identity_scope = IdentityScope.UID2
         encrypted_data = encrypt(raw_uid, identity_scope, keys)
         #send encrypted_data to receiver
      except EncryptionError as err:
        #check for failure reason
        print(err)
      ``` 
<!-- Alternative to the above for EUID:
      from uid2_client import encrypt
      from uid2_client.identity_scope import IdentityScope
      
        try:
         identity_scope = IdentityScope.UID2  # or IdentityScope.EUID
         encrypted_data = encrypt(raw_uid, identity_scope, keys)
         #send encrypted_data to receiver
      except EncryptionError as err:
        #check for failure reason
        print(err) -->

4. 受信者:
   1. `decrypt` 関数を呼び出します。復号化に成功したら、raw UID2 を使用します:

      ```python
      from uid2_client import decrypt
      try:
        result = decrypt(ad_token, keys)
        #use successfully decrypted result.uid2
      except EncryptionError as err:
        #check for failure reason
        print(err)
      ```

## FAQs

DSPに関するよくある質問については、[FAQs for Demand-Side Platforms (DSPs)](../getting-started/gs-faqs.md#faqs-for-demand-side-platforms-dsps)　を参照してください。

すべてのリストは  [Frequently Asked Questions](../getting-started/gs-faqs.md) を参照してください。