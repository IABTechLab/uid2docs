---
title: Server-Side SDK Guide
description: サーバーサイド SDK に関する参考情報。
hide_table_of_contents: false
sidebar_position: 03
---

# Server-Side SDK Guide

UID2 サーバーサイド SDK を使用すると、UID2 Advtising Token のを復号して raw UID2 に容易にアクセスできます。

このガイドには、以下の情報が含まれています：

- [Overview](#overview)
- [Initialization](#initialization)
- [Interface](#interface)
  - [Response Content](#response-content)
  - [Response Statuses](#response-statuses)

* [FAQs](#faqs)

## Overview

以下の関数は、設定する必要がある情報、またはライブラリから取得できる情報を定義しています。以下で定義されるパラメータとプロパティ名は疑似コードです。実際のパラメータやプロパティ名は言語によって異なりますが、以下に示す情報と同様のものになります。

ライブラリは現在、以下の言語で提供されています。その他の言語も開発中です。

| Language | Link to SDK Repogitory                                                                       |
| :------- | :------------------------------------------------------------------------------------------- |
| C#/.NET       | [UID2 SDK for .NET](https://github.com/IABTechLab/uid2-client-net/blob/master/README.md)  |
| C++      | [UID2 SDK for C++](https://github.com/IABTechLab/uid2-client-cpp11/blob/master/README.md) |
| Java     | [UID2 SDK for Java](https://github.com/IABTechLab/uid2-client-java/blob/master/README.md)        |
| Python   | [UID2 SDK for Python](https://github.com/IABTechLab/uid2-client-python/blob/master/README.md) |

## Initialization

初期化関数は、SDK が UID2 Service との認証を行うために必要なパラメータを設定します。また、エラーが発生した場合の再試行間隔を設定することもできます。

| Parameter           | Description                                                                                                              | Recommended Value                  |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------- | :--------------------------------- |
| `endpoint`          | UID2 サービスのエンドポイントです。                                                                                      | N/A                                |
| `authKey`           | クライアントの認証トークンです。UID2 へのアクセスは、[連絡先](../getting-started/gs-account-setup.md#contact-info) を参照してください。 | N/A                                |
| `refreshIntervalMs` | 復号鍵を取得するためのリフレッシュ間隔（ミリ秒単位）です。                                                           | `300,000` milliseconds (5 minutes) |
| `retryIntervalMs`   | エラーが発生したときにリクエストを再試行するための再試行間隔（ミリ秒単位）です。                                         | `30,000` milliseconds (30 seconds) |

## Interface

UID2 Advertising Token を復号化し、対応する raw UID2 を返すことができるインターフェースです。

> NOTE: SDK を使用する場合、復号鍵の保存や管理は必要ありません。

DSP であれば、入札のために、UID2 Advertising Token を復号化し、UID2 を返すインターフェースを呼び出します。ユーザーのオプトアウトを処理する入札ロジックの詳細は、[DSP Integration Guide](../guides/dsp-guide.md) を参照してください。

```java
public Response Decrypt(String encryptedToken)
```

### Response Content

SDK から返される情報の概要は、以下のとおりです。

| Property      | Description                                                                                                                                       |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Status`      | 復号化結果のステータスです。取り得る値の一覧と定義は、次の表を参照してください[Response Statuses](#response-statuses)を参照してください。 |
| `UID2`        | UID2 Token に対応する UID2 です。                                                                                                                 |
| `Established` | ユーザーがパブリッシャーと最初に UID2 を確立したときのタイムスタンプです。                                                                          |

### Response Statuses

| Value                 | Description                                                                  |
| :-------------------- | :--------------------------------------------------------------------------- |
| `Success`             | UID2 Advertising Token が正常に復号化され、raw UID2 が返されました。         |
| `NotAuthorizedForKey` | 呼び出し元はこの UID2 Advertising Token を復号化する権限を持っていません。   |
| `NotInitialized`      | クライアントライブラリは初期化待ちです。                                     |
| `InvalidPayload`      | 受信した UID2 Advertising Token は有効なペイロードではありません。           |
| `ExpiredToken`        | 受信した UID2 Advertising Token の有効期限が切れています。                   |
| `KeysNotSynced`       | クライアントが UID2 Service との鍵の同期に失敗しました。                     |
| `VersionNotSupported` | クライアントライブラリが暗号化されたトークンのバージョンに対応していません。 |

## FAQs

DSP に関するよくある質問は、 [FAQs for Demand-Side Platforms (DSPs)](../getting-started/gs-faqs.md#faqs-for-demand-side-platforms-dsps) を参照してください。

すべてのリストは、[Frequently Asked Questions](../getting-started/gs-faqs.md)を参照してください。
