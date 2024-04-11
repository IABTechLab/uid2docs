---
title: UID2 SDK for C# / .NET
description: C# / .NET SDK のリファレンス情報。
hide_table_of_contents: false
sidebar_position: 08
---

# UID2 SDK for C# / .NET Reference Guide

Server-Side で UID2 SDK for C# / .NET を使用すると、以下を簡単に行うことができます:

- raw UID2 を暗号化して、共有用の UID2 Token を作成する。
- raw UID2 にアクセスするための UID2 Token の復号化。

<!-- This guide includes the following information:

- [Overview](#overview)
- [Functionality](#functionality)
- [API Permissions](#api-permissions)
- [Version](#version)
- [GitHub Repository/Binary](#github-repositorybinary)
- [Initialization](#initialization)
- [Interface](#interface)
  - [Response Content](#response-content)
  - [Response Statuses](#response-statuses)
- [FAQs](#faqs)
- [Usage for UID2 Sharers](#usage-for-uid2-sharers) -->

## Functionality

この SDK は、Server-Sideのコーディングに C# / .NET を使用している DSP または UID2 sharer のために、UID2 とのインテグレーションを簡素化します。次の表は、この SDK がサポートする機能を示しています。

| Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token | Generate UID2 Token from DII | Refresh UID2 Token |
| :--- | :--- | :--- | :--- |
| Supported | Supported | Not supported | Not supported |

## API Permissions

この SDK を使用するには、[Account Setup](../getting-started/gs-account-setup.md) ページに記載されている手順に従って、UID2 アカウントのセットアップを完了する必要があります。

SDK が提供する特定の機能の使用許可が与えられ、そのアクセス用の認証情報が与えられます。SDK には、使用する権限を持たない機能があるかもしれないことに留意してください。例えば、パブリッシャーはトークンの生成と更新のために特定の API Permissions を取得しますが、SDK は共有などの他のアクティビティをサポートするかもしれません。

詳細は、[API Permissions](../getting-started/gs-permissions.md) を参照してください。

## Version

このライブラリは、.NET Standard 2.1. のユニットテストを使用しています。サンプルアプリは .NET 5.0 を使用しています。

## GitHub Repository/Binary


この SDK は以下のオープンソースの GitHub リポジトリにあります:

- [UID2 SDK for .NET](https://github.com/IABTechLab/uid2-client-net/blob/master/README.md)

バイナリはこちらに公開されています:

- [https://www.nuget.org/packages/UID2.Client](https://www.nuget.org/packages/UID2.Client)

## Initialization

DSP は `BidstreamClient` クラスのインスタンスを作成します。Sharer は `SharingClient` クラスのインスタンスを作成する必要があります。

SDK が UID2 Service で認証するために必要な値を提供する必要があります。

| Parameter | Description |
| :--- | :--- |
| `endpoint` | UID2 Service のエンドポイント。[Environments](../getting-started/gs-environments) を参照してください。 |
| `authKey` | API キー。[UID2 Credentials](../getting-started/gs-credentials) を参照してください |
| `secretKey` | クライアントシークレット。[UID2 Credentials](../getting-started/gs-credentials) を参照してください。 |

## Interface

`BidstreamClient` クラスを使用すると、UID2 Token を raw UID2 に復号することができます。
ユーザーのオプトアウトを処理する入札ロジックの詳細については、[DDSP Integration Guide](../guides/dsp-guide.md) を参照してください。

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
| `KeyInactive` | 暗号化キーはアクティブではありません。 |
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

以下では、UID2 SDK for .NET を DSP として使用してビッドストリームトークンをデコードする方法の例を示します。

1. `BidstreamClient` を作成します:

```cs
var client = new BidstreamClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);
```

2. 起動時に一度リフレッシュし、その後定期的にリフレッシュします(推奨リフレッシュ間隔は1時間毎):

```cs
client.Refresh();
```

3. トークンを raw UID2 に複合する。入札元サイトのドメイン名を渡す:

```cs
var decrypted = client.DecryptTokenIntoRawUid(uidToken, domain);
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

UID2 Sharer とは、UID2 を他の参加者と共有したい参加者のことです。raw UID2 を他の参加者に送信する前に、UID2 Tokenに暗号化する必要があります。

:::warning
このプロセスで生成される UID2 Token は共有専用です。ビッドストリームでは使用できません。ビッドストリーム用のトークン生成には別のワークフローがあります: [Sharing in the Bid Stream](../sharing/sharing-bid-stream.md) を参照してください。
:::

以下は、UID2 SDK for C# / .NET を使用して、送信側または受信側として共有を実装する方法の例です。

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

DSP に関するよくある質問については、 [FAQs for DSPs](../getting-started/gs-faqs.md#faqs-for-dsps) を参照してください。
