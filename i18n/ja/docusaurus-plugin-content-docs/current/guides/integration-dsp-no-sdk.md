---
title: DSP Direct Integration Instructions
sidebar_label: DSP Direct Integration Instructions
description: Information for DSPs who are integrating with UID2 without using SDKs.
hide_table_of_contents: false
sidebar_position: 05
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# DSP Direct Integration Instructions

このドキュメントは、既存の UID2 SDK でサポートされていないプログラミング言語を使用していて、UID2 とインテグレーションを行いたい DSP 向けの手順を提供します。

全ての SDK のリストについては、[SDKs: Summary](../sdks/summary-sdks.md) を参照してください。

## Overview

DSP が、ターゲティング広告や入札の目的で復号化されたトークンを使用使用できるようにするには、UID2 Token を raw UID2 に復号化し、トークンの有効性を検証できる必要があります。これを行うために、DSP は以下を行う必要があります:

- [Retrieve a set of encryption keys](#retrieverefresh-encryption-keys)
- [Decrypt UID2 tokens into raw UID2s](#decrypt-uid2-tokens-into-raw-uid2s)
- [Periodically re-retrieve the latest set of encryption keys](#retrieverefresh-encryption-keys)

[UID2 SDK for C#&nbsp;/&nbsp;.NET](https://github.com/IABTechLab/uid2-client-net) での実装例は、`BidstreamClient` クラスです。[BidstreamClient.cs](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/BidstreamClient.cs) を参照してください。

このドキュメントでは、例として C#&nbsp;/&nbsp;.NET SDK の追加のコードセクションを参照します。

## Retrieve/Refresh Encryption Keys

UID2 Token を raw UID2 に復号化できるように、暗号化キーを取得またはリフレッシュするには、以下を行うコードを記述する必要があります:

- リクエストを暗号化する。
- エンドポイントを呼び出す。
- レスポンスを復号化する。
- レスポンスをパースする。

次の API エンドポイントを呼び出します:

```
/v2/key/bidstream
```

起動時に一度キーをリフレッシュし、その後定期的にリフレッシュします (推奨されるリフレッシュ間隔は 1 時間ごとです)。

UID2 SDK for C# / .NET は `Refresh` 関数を使用します。詳細は、[BidstreamClient.cs, line 26](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/BidstreamClient.cs#L26) を参照してください。

リクエストの暗号化とレスポンスの復号化を示す実装例については、[Encryption and Decryption Code Examples](../getting-started/gs-encryption-decryption.md#encryption-and-decryption-code-examples) を参照してください。

復号化された API レスポンスは JSON 形式で、`site_data` (サイトに許可されたドメインまたはアプリ名のリスト) が含まれています。

すべてのフィールドがどのようにパースされるかを確認するには、UID2 SDK for C#&nbsp;/&nbsp;.NET の parse 関数を参照してください: [KeyParser.cs, lines 41-74](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/KeyParser.cs#L41-L74)。

トークンを raw UID2 に復号化した後、トークンが Client-Side で生成された場合は、特定のドメインまたはアプリ名が許可された名前のリストにあることを確認するために、`site_data` の情報を使用する必要があります。詳細は、[Verify the Domain or App Name](#for-tokens-generated-on-the-client-side-verify-the-domain-or-app-name) を参照してください。

## Decrypt UID2 Tokens into Raw UID2s

現在のキーがあれば、UID2 Token を raw UID2 に復号化できます。また、トークンがビッドストリームで使用可能であることを確認するために、いくつかの条件をチェックする必要があります。

以下の手順を完了する必要があります:


1. [Decrypt the token](#decrypt-the-token).

1. [Make sure token lifetime and expiration values are valid](#make-sure-token-lifetime-and-expiration-are-valid).

1. [Verify that the domain or app name is valid](#for-tokens-generated-on-the-client-side-verify-the-domain-or-app-name).

UID2 SDK for C# / .NET は、これらのステップを実行するために `DecryptTokenIntoRawUid` 関数を使用します: [BidstreamClient.cs, line 15](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/BidstreamClient.cs#L15) を参照してください。

### Decrypt the Token

マスターキーとサイトキーを使用してトークンを復号化します。コード例については、`Decrypt` 関数を参照してください: [UID2Encryption.cs, line 29](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/UID2Encryption.cs#L29)。この関数は UID2 SDK for C# / .NET の一部として、UID2 Token を raw UID2 に復号化します。

<!--
### For Tokens Generated on the Client Side: Honor Opt-Out Status

For tokens generated on the client side, there is an additional step with regard to opt-out. After decrypting the token, you must check for opt-out information indicating that the token does not contain a targetable UID2. If the user has opted out, you must not use the token for bidding.

For an example of how to do this check, review the code for the `DecryptV3` function: see [UID2Encryption.cs, line 201](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/UID2Encryption.cs#L201).

:::note
This step, which is only for tokens generated on the client side, is additional to checking the token against your opt-out records, which is required in all instances. For details, see [Honor User Opt-Out After Token Decryption](#honor-user-opt-out-after-token-decryption).
:::

For more information about client-side UID2 integration, refer to one of these integration guides:

- [Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md)
- [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md)
- [UID2 Client-Side Integration Guide for Mobile](integration-mobile-client-side.md)
-->

### Make Sure Token Lifetime and Expiration Are Valid

ビッドストリームで使用するためには、トークンが有効で最新である必要があります。次の 2 つのことを行う必要があります:

- トークンの有効期限が切れていないことを確認する。
- トークンの寿命が有効な値であることを確認する。

トークンの有効期限が切れていないことを確認するコードの例については、[UID2Encryption.cs, line 196](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/UID2Encryption.cs#L196) を参照してください。

トークンの寿命が有効な値であることを確認するには、次の 2 つの条件をチェックします:

- トークンの寿命が、`/v2/key/bidstream` レスポンスの `max_bidstream_lifetime_seconds` 値を超えていないこと。
- トークン生成までの時間が、`allow_clock_skew_seconds` 値を超えていないこと。

これがどのように行われるかの例については、`DoesTokenHaveValidLifetimeImpl` 関数のコードを確認してください: [UID2Encryption.cs, line 237](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/UID2Encryption.cs#L237) を参照してください。

#### Calculating Token Lifetime

ビッドストリームの使用に対してトークンの寿命が有効であることを確認するための計算式は次のとおりです:

```
lifetime = token expiry - token generated

time until token generation = token generated - current time
```

トークンには **Token Generated** フィールドが含まれており、トークンがリフレッシュされると更新されるため、これを使用してトークンの寿命を計算します。

### For Tokens Generated on the Client Side: Verify the Domain or App Name

Client-Side で生成されたトークンの場合、トークンを復号化した後、ドメイン名またはアプリ名が有効であることを確認する必要があります。これを行うには、`/v2/key/bidstream` API エンドポイントからのレスポンスの `site_data` セクション内のサイト ID の `domain_names` リストに `domainOrAppName` の値が含まれていることを確認します。

これを行うコードの例については、[UID2Encryption.cs, line 245](https://github.com/IABTechLab/uid2-client-net/blob/6ac53b106301e431a4aada3cbfbb93f8164ff7be/src/UID2.Client/UID2Encryption.cs#L245) の `IsDomainOrAppNameAllowedForSite` 関数を参照してください。

Client-Side UID2 インテグレーションの詳細は、以下のインテグレーションガイドのいずれかを参照してください:

- [Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md)
- [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md)
- [UID2 Client-Side Integration Guide for Mobile](integration-mobile-client-side.md)

## Honor User Opt-Out After Token Decryption

トークンを復号化した後、結果の raw UID2 をオプトアウトレコードと照合する必要があります。オプトアウトレコードにある場合は、入札に UID2 を使用しないなど、ユーザーのオプトアウト設定を尊重する必要があります。

詳細については、*DSP Integration Guide* の [Honor User Opt-Outs](dsp-guide.md#honor-user-opt-outs) を参照してください。
