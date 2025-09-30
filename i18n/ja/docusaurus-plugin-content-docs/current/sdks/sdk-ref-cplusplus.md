---
title: SDK for C++
description: C++ Server-Side SDK のリファレンス情報。
hide_table_of_contents: false
sidebar_position: 10
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# SDK for C++ Reference Guide

UID2 Server-Side SDK を使用すると、UID2 Token を復号化して raw UID2 にアクセスしやすくなります。

## Overview

ここで説明する関数は、設定に必要な情報やライブラリから取得できる情報を定義しています。以下に定義するパラメータとプロパティ名は擬似コードです。実際のパラメータやプロパティ名は言語によって異なりますが、ここで説明する情報と同様のものになります。

## Functionality

このSDKは、Server-Sideのコーディングに C++ を使用している DSP または UID2 Sharers のために、UID2 とのインテグレーションを簡素化します。次の表に、この SDK がサポートする機能を示します。

| Encrypt Raw UID2 to UID2 Token for Sharing | Decrypt UID2 Token to Raw UID2 | Generate UID2 Token from DII | Refresh UID2 Token | Map DII to Raw UID2s | Monitor Rotated Salt Buckets |
| :--- | :--- | :--- | :--- | :--- | :--- |
| &#9989; | &#9989; | &#8212; | &#8212; | &#8212; | &#8212; |

## UID2 Account Setup

UID2 とインテグレーションするには、UID2 アカウントが必要です。アカウントを作成していない場合は、まず [Account Setup](../getting-started/gs-account-setup.md) ページの手順に従ってください。

## API Permissions

アカウントの初期設定が完了すると、パブリッシャー、広告主、またはデータプロバイダーの場合、[UID2 Portal](../portal/portal-overview.md) にアクセスするための手順とリンクが送信されます。以下の操作が可能です:
- アカウント用の [credentials](../getting-started/gs-credentials.md) を生成します。
- オプションとして、チームメンバーに関する情報を設定するなど、他の値を設定します。

SDK が提供する特定の機能を使用する権限が与えられ、そのアクセスのための資格情報が提供されます。SDK には使用権限がない機能がある可能性があることに注意してください。詳細は、[API Permissions](../getting-started/gs-permissions.md) を参照してください。

DSP の場合は、資格情報を送信します。

## Version

この SDK には C++ version 11 が必要です。

## GitHub Repository/Binary

この SDK は以下のオープンソースの GitHub リポジトリにあります:

- [SDK for C++](https://github.com/IABTechLab/uid2-client-cpp11/blob/master/README.md).

Release tags は以下の GitHub で入手できますが、バイナリーは自分でビルドする必要があります:

- https://github.com/IABTechLab/uid2-client-cpp11/tags

## Initialization

初期化関数は、SDKが UID2 Service で認証するために必要なパラメータを設定します。また、エラー発生時の再試行間隔を設定することもできます。

| Parameter | Description | Recommended Value |
| :--- | :--- | :--- |
| `endpoint` | UID2 Service のエンドポイント。 | N/A |
| `authKey` | クライアントに付与された認証トークン。UID2 へのアクセスは [Contact Info](../getting-started/gs-account-setup.md#contact-info) を参照してください。 | N/A |

## Interface 

このインターフェイスを使用すると、UID2 Advertising Token を復号化し、対応する raw UID2 を返すことができます。

:::note
SDK を使用する際に、復号鍵を保存したり管理したりする必要はありません。
:::

DSP の場合は、入札のために UID2 Advertising Token を復号化して UID2 を返すインターフェースを呼び出します。ユーザーのオプトアウトを処理する入札ロジックの詳細は [DSPインテグレーションガイド](../guides/dsp-guide.md) を参照してください。

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
| `GetStatus()` | 復号結果のステータス。指定可能な値の一覧と定義は、[Response Statuses](#response-statuses) を参照してください。 |
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

UID2 <Link href="../ref-info/glossary-uid#gl-sharing-participant">Sharing Participant</Link> は、送信者または受信者として共有に参加し、他の参加者と UID2 を共有する企業です。

広告主やデータプロバイダは、この SDK を使用して他の認証された UID2 共有参加者と UID2 を共有できます (<Link href="../ref-info/glossary-uid#gl-tokenized-sharing">Tokenized Sharing</Link>)。彼らは [raw UID2s](../ref-info/glossary-uid#gl-raw-uid2) を <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> に暗号化し、それを他の参加者に送信して共有できます (詳細は [Tokenized Sharing in Pixels](../sharing/sharing-tokenized-from-data-pixel.md) を参照)。データをピクセルで送信していない場合でも、[Security Requirements for UID2 Sharing](../sharing/sharing-security.md) で示されている要件に従えば、UID2 共有に参加できます。

:::important
このプロセスで生成される UID2 Token は共有専用です&#8212;<Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>では使用できません。ビッドストリーム用のトークン生成には別のワークフローがあります: [Tokenized Sharing in the Bidstream](../sharing/sharing-tokenized-from-data-bid-stream.md) を参照してください。
:::

 使用例は [com.uid2.client.test.IntegrationExamples](https://github.com/IABTechLab/uid2-client-java/blob/master/src/test/java/com/uid2/client/test/IntegrationExamples.java) (`runSharingExample` メソッド) を参照してください。
 
 次の手順では、SDK for C++ を送信者または受信者として使用して共有を実装する方法の例を示します。

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
