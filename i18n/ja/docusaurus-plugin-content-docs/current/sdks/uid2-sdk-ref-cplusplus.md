---
title: UID2 SDK for C++
description: C++ Server-Side SDK のリファレンス情報。
hide_table_of_contents: false
sidebar_position: 10
---

# UID2 SDK for C++ (Server-Side) Reference Guide

UID2 Server-Side SDK を使用すると、UID2 Token を復号化して raw UID2 にアクセスしやすくなります。

<!-- This guide includes the following information:

- [Overview](#overview)
- [Functionality](#functionality)
- [Version](#version)
- [GitHub Repository/Binary](#github-repositorybinary)
- [Initialization](#initialization)
- [Interface](#interface)
  - [Response Content](#response-content)
  - [Response Statuses](#response-statuses)
- [FAQs](#faqs)
- [Usage for UID2 Sharers](#usage-for-uid2-sharers) -->

## Overview

ここで説明する関数は、設定に必要な情報やライブラリから取得できる情報を定義しています。以下に定義するパラメータとプロパティ名は擬似コードです。実際のパラメータやプロパティ名は言語によって異なりますが、ここで説明する情報と同様のものになります。

## Functionality

このSDKは、Server-Sideのコーディングに C++ を使用している DSP または UID2 Sharers のために、UID2 とのインテグレーションを簡素化します。次の表に、この SDK がサポートする機能を示します。

| Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token | Generate UID2 Token from DII | Refresh UID2 Token |
| :--- | :--- | :--- | :--- |
| Supported | Supported | Not supported | Not supported |

## Version

この SDK には C++ version 11 が必要です。

## GitHub Repository/Binary

この SDK は以下のオープンソースの GitHub リポジトリにあります:

- [UID2 SDK for C++](https://github.com/IABTechLab/uid2-client-cpp11/blob/master/README.md).

Release tags は以下の GitHub で入手できますが、バイナリーは自分でビルドする必要があります:

- https://github.com/IABTechLab/uid2-client-cpp11/tags

## Initialization

初期化関数は、SDKが UID2 Service で認証するために必要なパラメータを設定します。また、エラー発生時の再試行間隔を設定することもできます。


| Parameter | Description | Recommended Value |
| :--- | :--- | :--- |
| `endpoint` | UID2 Service のエンドポイント。 | N/A |
| `authKey` | クライアントに付与された認証トークン。UID2 へのアクセスについては、 [Contact Info](../getting-started/gs-account-setup.md#contact-info) を参照してください。 | N/A |

## Interface 

このインターフェイスを使用すると、UID2 Advertising Token を復号化し、対応する raw UID2 を返すことができます。

>NOTE: SDK を使用する際に、復号鍵を保存したり管理したりする必要はありません。

DSP の場合は、入札のために UID2 Advertising Token を復号化して UID2 を返すインターフェースを呼び出します。ユーザーのオプトアウトを処理する入札ロジックの詳細については、[DSPインテグレーションガイド](../guides/dsp-guide.md) を参照してください。

以下は、C++ での decrypt メソッド呼び出しです:

```cpp
#include <uid2/uid2client.h>
using namespace uid2;

const auto client = UID2ClientFactory::Create(baseUrl, apiKey, secretKey);
client->Refresh(); //Note that Refresh() should be called once after create(), and then once per hour
const auto result = client->Decrypt(adToken);
```

### Response Content

SDK から返される利用可能な情報の概要を次の表に示します。

| Function | Description |
| :--- | :--- |
| `GetStatus()` | 復号結果のステータス。指定可能な値の一覧と定義については、[Response Statuses](#response-statuses) を参照してください。 |
| `GetUid()` | UID2 Advertising Token に対応する raw UID2。 |
| `GetEstablished()` | ユーザーがパブリッシャーと最初に UID2 を確立した時を示すタイムスタンプ。 |

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

>IMPORTANT: このプロセスで生成される UID2 Token は共有専用です&#8212;ビッドストリームでは使用できません。ビッドストリーム用のトークン生成には別のワークフローがあります: [Sharing in the Bid Stream](../sharing/sharing-bid-stream.md) を参照してください。

次の手順では、UID2 SDK for C++ を送信者または受信者として使用して共有を実装する方法の例を示します。

1. ```IUID2Client``` 共有ポインタを作成します:
 
    ```cpp
   const auto client = UID2ClientFactory::Create(baseUrl, apiKey, secretKey);
    ```
2. 起動時に一度リフレッシュし、その後定期的にリフレッシュします (推奨リフレッシュ間隔は1時間毎):

    ```cpp
   client->Refresh();
   ```
3. 送信者: 
   1. 以下を呼び出します:

      ```cpp
      EncryptionResult encrypted = client->Encrypt(rawUid);
      ```
   2. 暗号化に成功した場合、UID2 Token を受信者に送信します:   

      ```cpp
      if (encrypted.IsSuccess()) 
      {
          // send encrypted.GetEncryptedData() to receiver
      }
      else 
      {
          // check encrypted.GetStatus() for the failure reason
      }
      ```
4. 受信者: 
   1. 以下を呼び出します:

      ```cpp
      DecryptionResult decrypted = client->Decrypt(uidToken);
      ```
 
   2. 復号化に成功した場合は、raw UID2を使用します:

      ```cpp    
      if (decrypted.IsSuccess())
      {
         // use decrypted.GetUid() 
      } 
      else 
      {
         // check decrypted.GetStatus() for the failure reason 
      }
      ```

## FAQs

DSP に関するよくある質問については、 [FAQs for DSPs](../getting-started/gs-faqs.md#faqs-for-dsps) を参照してください。