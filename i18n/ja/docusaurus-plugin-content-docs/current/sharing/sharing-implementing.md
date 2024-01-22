---
title: Implementing Sharing
description:  シェアリングの実施方法について説明します。
hide_table_of_contents: false
sidebar_position: 04
---

# Implementing Sharing

<!-- It includes the following:

- [Steps to Implement Sharing With an SDK](#steps-to-implement-sharing-with-an-sdk)
- [Steps to Implement Sharing Using Snowflake](#steps-to-implement-sharing-using-snowflake) 
- [Encryption/Decryption Key Refresh Cadence for Sharing (SDK Only)](#encryptiondecryption-key-refresh-cadence-for-sharing-sdk-only) -->

UID2 sharing の設定には、各参加者がいくつかの手順を踏む必要があります:

- **送信者** は、認可された共有参加者に UID2 Token を送信します。
- **受信者** は、認可された共有参加者から UID2 Token を受信して復号化します。

>NOTE: ビッドストリームで UID2 Token を共有するパブリッシャーの場合は、[Sharing in the Bid Stream](sharing-bid-stream.md) を参照してください。

## Sharing Steps: Summary

共有の設定と構成は、次の手順で行います:

1. すべてのユーザーがアカウントを設定し、共有オプションを設定する必要があります。[Steps to Implement Sharing: UID2 Portal Account Setup](#steps-to-implement-sharing-uid2-portal-account-setup) を参照してください。

2. コードに共有を実装するには、使用しているインテグレーションオプションに応じて、以下から選択します:

   - [Steps to Implement Sharing With an SDK](#steps-to-implement-sharing-with-an-sdk)
   - [Steps to Implement Sharing Using Snowflake](#steps-to-implement-sharing-using-snowflake)

## Steps to Implement Sharing: UID2 Portal Account Setup

UID2 Portal では、送信者と受信者がアカウントを設定し、送信者が共有許可を設定する必要があります。

送信者が共有許可を設定する必要があるのは、受信者または参加者のタイプごとに1回だけです。ただし、新しい共有権限を追加したり、既存の共有権限を変更したりする場合は、もう一度設定を調整する必要があります。

詳細については、[UID2 Portal: Overview](../portal/portal-overview.md) を参照し、各タスクのリンクをたどってください。

## Steps to Implement Sharing with an SDK

以下の手順は、SDK を使用しているすべての共有参加者のためのものです&#8212;送信者と受信者。

1. 以下のオプションから使用する SDK を決定し、該当する共有ドキュメントの例を確認して、共有コードがどのように見えるかを確認します。

   | SDK/Integration Tool | Link to Sharing Section |
   | :--- | :--- | 
   | C# / .NET | [UID2 SDK for C# / .NET: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-csharp-dotnet.md#usage-for-uid2-sharers) |
   | C++ | [UID2 SDK for C++: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-cplusplus.md#usage-for-uid2-sharers) |
   | Java | [UID2 SDK for Java: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-java.md#usage-for-uid2-sharers) |
   | Python | [UID2 SDK for Python: Usage for UID2 Sharers](../sdks/uid2-sdk-ref-python.md#usage-for-uid2-sharers) |

2. SDK をコードにインテグレーションして、あなたの役割が送信者であるか受信者であるかに応じて、各ステップを実装します。使用している言語のコードサンプルを見るには、Step 1 で提供された表のリンクをたどってください。
   1. 送信者と受信者の両方: UID2 クライアントを定義します。
   
   2. 送信者と受信者の両方: 暗号化鍵を更新するスケジュールを定義します。
   
      推奨される更新間隔は1時間ごとです。例については、[暗号化/復号化キーの共有のためのリフレッシュ・ケイデンス(SDKのみ)](#encryptiondecryption-key-refresh-cadence-for-sharing-sdk-only) を参照してください。

   3. 送信者は暗号化を設定します。

   4. 受信者は復号化を設定します。

## Steps to Implement Sharing Using Snowflake

以下の手順は、送信者または受信者として UID2 sharing に参加したい Snowflake ユーザーのためのものです。

1. Snowflake インテグレーションガイドの例を確認し、共有コードがどのように見えるかを確認します。

2. あなたの役割が送信者であるか受信者であるかに従って、SDK をあなたのコードにインテグレーションします:

   - 送信者は暗号化を設定します。

   - 受信者は復号化を設定します。

## Encryption/Decryption Key Refresh Cadence for Sharing (SDK Only)

SDK を使用している場合、共有キーの更新スケジュールを定義するのは Step 2 です。

長時間あるいは継続的に実行されるプロセスでは、1 時間に 1 回 `uid2client.refresh()` 関数をコールします。これにより、SDK は復号のために最新の鍵を取得します。新しい共有許可が有効になると、新しい共有送信者が送信したデータを復号するために必要な暗号鍵の追加セットは、共有受信者が次に `uid2client.refresh()` 関数を呼び出したときに返されます。この処理は SDK によって処理されます。

>NOTE: Snowflake を使用している場合は、この手順を実行する必要はありません。Snowflake UID2 インテグレーションがキーのリフレッシュを行います。

### Decryption Key Refresh Example

この例では、`uid2client.refresh()` 関数がどのように新しい共有許可を有効にするかを説明します。この例では、広告主 ABC はデータプロバイダー XYZ にデータを送信したいとします。

1. 午後12時:

   共有パーミッションはまだ有効になっていません。

   データプロバイダー XYZ は `uid2client.refresh()` を呼び出します。広告主 ABC の復号鍵が返されないので、データプロバイダー XYZ は UID2 Token を復号できません。

2. 午後12時30分:

   広告主 ABC が UID2 Portal にログインし、データプロバイダー XYZ との共有許可を作成します。

3. 午後1時:

   データプロバイダー XYZ は、1時間ごとに再び `uid2client.refresh()` を呼び出します。新しい共有パーミッションがあるので、広告主 ABC のキーがレスポンスで返されます。

   データプロバイダー XYZ は、広告主 ABC から受け取った UID2 Token を raw UID2 に復号できるようになります。
