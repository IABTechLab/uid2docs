---
title: SDK for C# / .NET
description: C# / .NET SDK のリファレンス情報。
hide_table_of_contents: false
sidebar_position: 08
---

import Link from '@docusaurus/Link';

# SDK for C# / .NET Reference Guide

Server-Side では、C# / .NET SDK を使用して、raw UID2 を暗号化して UID2 Token を生成し、UID2 Token を復号して raw UID2 にアクセスすることができます。

## Overview

ここで説明する機能は、ライブラリの設定に必要な情報を定義するか、取得できる情報を定義します。以下で定義されているパラメータとプロパティ名は疑似コードです。実際のパラメータとプロパティ名は言語によって異なりますが、ここで説明されている情報に類似しています。

## Functionality

この SDK は、Server-Sideのコーディングに C# / .NET を使用している DSP または UID2 sharer のために、UID2 とのインテグレーションを簡素化します。次の表は、この SDK がサポートする機能を示しています。

| Encrypt Raw UID2 to UID2 Token for Sharing | Decrypt UID2 Token to Raw UID2 | Generate UID2 Token from DII | Refresh UID2 Token | Map DII to Raw UID2s | Monitor Rotated Salt Buckets |
| :--- | :--- | :--- | :--- | :--- | :--- |
| &#9989; | &#9989; | &#8212; | &#8212; | &#8212; | &#8212; |

## API Permissions

この SDK を使用するには、[Account Setup](../getting-started/gs-account-setup.md) ページに記載されている手順に従って、UID2 アカウントのセットアップを完了する必要があります。

SDK が提供する特定の機能の使用許可が与えられ、そのアクセス用の認証情報が与えられます。SDK には、使用する権限を持たない機能があるかもしれないことに留意してください。例えば、パブリッシャーはトークンの生成と更新のために特定の API Permissions を取得しますが、SDK は共有などの他のアクティビティをサポートするかもしれません。

詳細は [API Permissions](../getting-started/gs-permissions.md) を参照してください。

## Version

このライブラリは、.NET Standard 2.1. のユニットテストを使用しています。サンプルアプリは .NET 5.0 を使用しています。

## GitHub Repository/Binary

この SDK は以下のオープンソースの GitHub リポジトリにあります:

- [SDK for .NET](https://github.com/IABTechLab/uid2-client-net/blob/master/README.md)

バイナリはこちらに公開されています:

- [https://www.nuget.org/packages/UID2.Client](https://www.nuget.org/packages/UID2.Client)

## Initialization

DSP は `BidstreamClient` クラスのインスタンスを作成します。Sharer は `SharingClient` クラスのインスタンスを作成する必要があります。

SDK が UID2 Service で認証するために必要な値を提供する必要があります。

| Parameter | Description |
| :--- | :--- |
| `endpoint` | UID2 Service のエンドポイント。[Environments](../getting-started/gs-environments) を参照してください。 |
| `authKey` | API Key。[UID2 Credentials](../getting-started/gs-credentials) を参照してください |
| `secretKey` | クライアントシークレット。[UID2 Credentials](../getting-started/gs-credentials) を参照してください。 |

## Interface

`BidstreamClient` クラスを使用すると、UID2 Token を raw UID2 に復号することができます。

ユーザーのオプトアウトを処理する入札ロジックの詳細は [DDSP Integration Guide](../guides/dsp-guide.md) を参照してください。

`SharingClient` クラスを使うと、raw UID2 を暗号化して UID2 Token に変換したり、UID2 Token を復号して生の UID2 に変換したりすることができます。

:::note
SDK を使用する場合、復号鍵を保存したり管理したりする必要はありません。
:::

### Encryption Response Content

`SharingClient`で暗号化する場合、SDKは以下の情報を返します：

| Property | Description |
| :--- | :--- |
| `Status` | 暗号化結果のステータス。取り得る値のリストと定義については [Encryption Response Statuses](#encryption-response-statuses) を参照してください。 |
| `EncryptedData` | 暗号化された UID2 Token。 |

### Encryption Response Statuses

| Value | Description |
| :--- | :--- |
| `Success` | raw UID2 は正常に暗号化され、UID2 Token が返されました。 |
| `NotAuthorizedForKey` | 要求者には暗号鍵を使用する権限がありません。 |
| `NotAuthorizedForMasterKey` |要求者はマスターキーを使用する権限がありません。 |
| `NotInitialized` | クライアントライブラリは初期化待ちです。 |
| `KeysNotSynced` | クライアントが UID2 Service からの鍵の同期に失敗しました。 |
| `KeyInactive` | <a href="../ref-info/glossary-uid#gl-encryption-key">暗号化キー</a> はアクティブではありません。 |
| `EncryptionFailure` | 一般的な暗号化に失敗しました。 |
<!-- `TokenDecryptFailure` intentionally omitted. Does not seem to be used by SharingClient. -->

### Decryption Response Content

`BidstreamClient`、`SharingClient` いずれでも、SDK は以下の情報を返します:

| Property | Description |
| :--- | :--- |
| `Status` | 復号結果のステータス。取り得る値のリストと定義については [Decryption Response Statuses](#decryption-response-statuses) を参照してください。 |
| `Uid` | UID2 Token に対応する raw UID2。 |
| `Established` | ユーザーがパブリッシャーと最初に UID2 を確立した時のタイムスタンプ。 |

### Decryption Response Statuses

| Value | Description |
| :--- | :--- |
| `Success` | UID2 Token は正常に復号化され、raw UID2 が返されました。 |
| `NotAuthorizedForKey` | 要求者はこの UID2 Token を復号化する権限を持っていません。 |
| `NotInitialized` | クライアントライブラリは初期化待ちです。 |
| `InvalidPayload` | 受信した UID2 Token は有効なペイロードではありません。 |
| `ExpiredToken` | 受信した UID2 Token の有効期限が切れています。 |
| `KeysNotSynced` | クライアントが UID2 Service からの鍵の同期に失敗しました。 |
| `VersionNotSupported` | クライアントライブラリはこのバージョンの暗号化トークンをサポートしていません。 |

## Usage for DSPs

以下では、SDK for .NET を DSP として使用してビッドストリームトークンをデコードする方法の例を示します。

1. `BidstreamClient` を作成します:

```cs
var client = new BidstreamClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);
```

2. 起動時に一度リフレッシュし、その後定期的にリフレッシュします(推奨リフレッシュ間隔は1時間毎):

```cs
client.Refresh();
```

3. トークンを raw UID2 に復号化します。トークンを渡し、次のいずれかを行います:
 * ビッドリクエストがパブリッシャーのウェブサイトから発信された場合、ドメイン名を渡します。ドメイン名は、すべて小文字で、スペースなし、サブドメインなしである必要があります。例えば、`Subdomain.DOMAIN.com` の場合、`domain.com` を渡します。
 * ビッドリクエストがモバイルアプリから発信された場合、<Link href="../ref-info/glossary-uid#gl-app-name">app name</Link> を渡します。
 * それ以外の場合は、`null` を渡します。


```cs
var decrypted = client.DecryptTokenIntoRawUid(uidToken, domainOrAppName);
// If decryption succeeded, use the raw UID2.
if (decrypted.Success) 
{
    // Use decrypted.Uid.
} 
else 
{
    // Check decrypted.Status for the failure reason.
}
```

完全な例については、[SampleApp/Program.cs](https://github.com/IABTechLab/uid2-client-net/blob/main/src/SampleApp/Program.cs) の `ExampleBidStreamClient` メソッドを参照してください。

## Usage for UID2 Sharers

UID2 <Link href="../ref-info/glossary-uid#gl-sharing-participant">Sharing Participant</Link> は、送信者または受信者として共有に参加し、他の参加者と UID2 を共有する企業です。

広告主やデータプロバイダは、この SDK を使用して他の認証された UID2 共有参加者と UID2 を共有できます (<Link href="../ref-info/glossary-uid#gl-tokenized-sharing">Tokenized Sharing</Link>)。彼らは [raw UID2s](../ref-info/glossary-uid#gl-raw-uid2) を <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> に暗号化し、それを他の参加者に送信して共有できます (詳細は [Tokenized Sharing in Pixels](../sharing/sharing-tokenized-from-data-pixel.md) を参照してください)。データをピクセルで送信していない場合でも、[Security Requirements for UID2 Sharing](../sharing/sharing-security.md) で示されている要件に従えば、UID2 共有に参加できます。

:::important
このプロセスで生成される UID2 Token は共有専用です&#8212;<Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>では使用できません。ビッドストリーム用のトークン生成には別のワークフローがあります: [Tokenized Sharing in the Bidstream](../sharing/sharing-tokenized-from-data-bid-stream.md) を参照してください。
:::

以下は、SDK for C# / .NET を使用して、送信側または受信側として共有を実装する方法の例です。

1. `SharingClient` を作成します:

```cs
var client = new SharingClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);
```

2. 起動時に一度リフレッシュし、その後定期的にリフレッシュします(推奨リフレッシュ間隔は1時間毎):

```cs
client.Refresh();
```

3. 送信者の場合、`EncryptRawUidIntoToken` を呼び出します:

```cs
var encrypted = client.EncryptRawUidIntoToken(rawUid);
// If encryption succeeded, send the UID2 token to the receiver.
if (encrypted.Success) 
{ 
    // Send encrypted.EncryptedData to receiver.
} 
else 
{
    // Check encrypted.Status for the failure reason.
}
```
受信者の場合は、`DecryptTokenIntoRawUid` を呼び出します。:

```cs
var decrypted = client.DecryptTokenIntoRawUid(uidToken);
// If decryption succeeded, use the raw UID2.
if (decrypted.Success) 
{
    // Use decrypted.Uid.
} 
else 
{
    // Check decrypted.Status for the failure reason.
}
```

For a full example, see the `ExampleSharingClient` method in [SampleApp/Program.cs](https://github.com/IABTechLab/uid2-client-net/blob/main/src/SampleApp/Program.cs).

## FAQs

DSP に関するよくある質問については [FAQs for DSPs](../getting-started/gs-faqs.md#faqs-for-dsps) を参照してください。
