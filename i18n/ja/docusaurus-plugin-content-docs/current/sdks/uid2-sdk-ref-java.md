---
title: UID2 SDK for Java
description: Java Server-Side SDK のリファレンス情報。
hide_table_of_contents: false
sidebar_position: 04
---

# UID2 SDK for Java (Server-Side) Reference Guide

UID2 SDK for Java (Server-Side) を使用すると、以下のことが容易になります:

- UID2 Advertising Token の生成
- UID2 Advertising Token の更新
- raw UID2を暗号化して UID2 Token を作成する
- UID2 Advertising Token を復号化して raw UID2 にアクセスする

<!-- This guide includes the following information:

- [Overview](#overview)
- [Functionality](#functionality)
- [Version](#version)
- [GitHub Repository/Binary](#github-repositorybinary)
- [Initialization](#initialization)
- [Interface](#interface)
  - [Response Content](#response-content)
  - [Response Statuses](#response-statuses)
* [FAQs](#faqs)
* [Usage for UID2 Sharers](#usage-for-uid2-sharers) -->

## Overview

ここで説明する関数は、設定に必要な情報やライブラリから取得できる情報を定義しています。以下に定義するパラメータとプロパティ名は擬似コードです。実際のパラメータやプロパティ名は言語によって異なりますが、ここで説明する情報と同様のものになります。

## Functionality

このSDKは、Server-Sideのコーディングに Java を使用しているパブリッシャー、DSP、UID2 Sharers のために、UID2 とのインテグレーションを簡素化します。次の表に、この SDK がサポートする機能を示します。

| Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token | Generate UID2 Token from DII | Refresh UID2 Token |
| :--- | :--- | :--- | :--- |
| Supported | Supported | Supported | Supported |

## Version

この SDK には Java version 1.8 以降が必要です。

## GitHub Repository/Binary

この SDK は以下のオープンソースの GitHub リポジトリにあります:

- [UID2 SDK for Java](https://github.com/IABTechLab/uid2-client-java/blob/master/README.md)

バイナリは Maven リポジトリで公開されています:

- [https://central.sonatype.com/artifact/com.uid2/uid2-client](https://central.sonatype.com/artifact/com.uid2/uid2-client)

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

以下は、Java での decrypt メソッド呼び出しです:

```java
import com.uid2.client.IUID2Client

IUID2Client client = UID2ClientFactory.create(TEST_ENDPOINT, TEST_API_KEY, TEST_SECRET_KEY);
client.refresh(); //Note that refresh() should be called once after create(), and then once per hour
DecryptionResponse result = client.decrypt(TEST_TOKEN);
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

次の手順では、UID2 SDK for Java を送信者または受信者として使用して共有を実装する方法の例を示します。

1. ```IUID2Client``` のリファレンスを作成します:

   ```java
   IUID2Client client = UID2ClientFactory.create(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);
   ```
2. 起動時に一度リフレッシュし、その後定期的にリフレッシュします (推奨リフレッシュ間隔は1時間毎):

   ```java
   client.refresh();
   ```

3. 送信者: 
   1. 以下を呼び出します:

      ```java
      EncryptionDataResponse encrypted = client.encrypt(rawUid);
      ```
   2. 暗号化に成功した場合、UID2 Token を受信者に送信します:    

      ```java
      if (encrypted.isSuccess()) 
      { 
         //send encrypted.getEncryptedData() to receiver
      } 
      else 
      {
         //check encrypted.getStatus() for the failure reason
      }
      ```
4. 受信者: 
   1. 以下を呼び出します:

      ```java
      DecryptionResponse decrypted = client.decrypt(uidToken);
      ```
   2. 復号化に成功した場合は、raw UID2を使用します:

      ```java    
      if (decrypted.isSuccess()) 
      {
         //use decrypted.getUid() 
      } 
      else 
      {
       //check decrypted.getStatus() for the failure reason 
      }
      ```

## FAQs

DSP に関するよくある質問については、 [FAQs for DSPs](../getting-started/gs-faqs.md#faqs-for-dsps) を参照してください。