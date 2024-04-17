---
title: UID2 SDK for Java
description: Java Server-Side SDK のリファレンス情報。
hide_table_of_contents: false
sidebar_position: 04
---

# UID2 SDK for Java Reference Guide

UID2 SDK for Java を使用すると、以下のことが容易になります:

- UID2 Advertising Token の生成
- UID2 Advertising Token の更新
- raw UID2を暗号化して UID2 Token を作成する
- UID2 Advertising Token を復号化して raw UID2 にアクセスする

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
* [FAQs](#faqs)
- [Usage for Publishers](#usage-for-publishers) 
* [Usage for UID2 Sharers](#usage-for-uid2-sharers) -->

## Overview

ここで説明する関数は、設定に必要な情報やライブラリから取得できる情報を定義しています。以下に定義するパラメータとプロパティ名は擬似コードです。実際のパラメータやプロパティ名は言語によって異なりますが、ここで説明する情報と同様のものになります。

## Functionality

このSDKは、Server-Sideのコーディングに Java を使用しているパブリッシャー、DSP、UID2 Sharers のために、UID2 とのインテグレーションを簡素化します。次の表に、この SDK がサポートする機能を示します。

| Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token | Generate UID2 Token from DII | Refresh UID2 Token |
| :--- | :--- | :--- | :--- |
| Supported | Supported | Supported | Supported |

## API Permissions

この SDK を使用するには、[Account Setup](../getting-started/gs-account-setup.md) ページに記載されている手順に従って、UID2 アカウントのセットアップを完了する必要があります。

SDK が提供する特定の機能の使用許可が与えられ、そのアクセス用の認証情報が与えられます。SDK には、使用する権限を持たない機能があるかもしれないことに留意してください。例えば、パブリッシャーはトークンの生成と更新のために特定の API Permissions を取得しますが、SDK は共有などの他のアクティビティをサポートするかもしれません。

詳細は、[API Permissions](../getting-started/gs-permissions.md) を参照してください。

## Version

この SDK には Java version 1.8 以降が必要です。

## GitHub Repository/Binary

この SDK は以下のオープンソースの GitHub リポジトリにあります:

- [UID2 SDK for Java](https://github.com/IABTechLab/uid2-client-java/blob/master/README.md)

バイナリは Maven リポジトリで公開されています:

- [https://central.sonatype.com/artifact/com.uid2/uid2-client](https://central.sonatype.com/artifact/com.uid2/uid2-client)

## Usage for DSPs

初期化関数は、SDKが UID2 Service で認証するために必要なパラメータを設定します。また、エラー発生時の再試行間隔を設定することもできます。

| Parameter | Description | Recommended Value |
| :--- | :--- | :--- |
| `endpoint` | UID2 Service のエンドポイント。 | N/A |
| `authKey` | クライアントに付与された認証トークン。UID2 へのアクセスについては、 [Contact Info](../getting-started/gs-account-setup.md#contact-info) を参照してください。 | N/A |

### Interface 

このインターフェイスを使用すると、UID2 Advertising Token を復号化し、対応する raw UID2 を返すことができます。

:::note
SDK を使用する際に、復号鍵を保存したり管理したりする必要はありません。
:::

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

## Usage for Publishers

パブリッシャーとして、UID2 SDK for Java を使用するには 2 つの方法があります: 
1. [**Basic Usage**](#basic-usage) は、この SDK の HTTP 実装 (synchronous [OkHttp](https://square.github.io/okhttp/)) を使いたいパブリッシャー向けです。
2. [**Advanced Usage**](#advanced-usage) は、独自の HTTP ライブラリを使用したいパブリッシャー向けです。

Basic と Advanced 両方の使い方を示すサンプルアプリケーションについては、[Java UID2 Integration Example](https://github.com/UnifiedID2/uid2-examples/tree/main/publisher/uid2-java-test-site#readme) を参照してください。

### Basic Usage

SDK の HTTP 実装を使用している場合は、以下の手順に従ってください。

1. インスタンス変数として `PublisherUid2Client` のインスタンスを作成します:

   ```java
   private final PublisherUid2Client publisherUid2Client = new PublisherUid2Client(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);
   ```

2. ユーザーのメールアドレスまたは電話番号を入力として受け取り、`TokenGenerateResponse` オブジェクトを生成する関数を呼び出します。以下の例では、メールアドレスを使用しています:
   ```java
   TokenGenerateResponse tokenGenerateResponse = publisherUid2Client.generateTokenResponse(TokenGenerateInput.fromEmail(emailAddress).doNotGenerateTokensForOptedOut());
   ```

   :::important
   - POST&nbsp;/token/generate エンドポイントは、ユーザーの[directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) をターゲティング広告用の UID2 Token に変換する法的根拠を得た場合にのみ呼び出すようにしてください。

   - 常に `doNotGenerateTokensForOptedOut()` を適用します。これは POST&nbsp;/token/generate エンドポイントの呼び出しで `optout_check=1` を設定するのと同様のパラメータを適用します([Unencrypted JSON Body Parameters](../endpoints/post-token-generate.md#unencrypted-json-body-parameters)) を参照してください。
   :::

#### Client-Server Integration

Standard Integration (Client and Server) を使用している場合([Server-Side Integration Guide for JavaScript](../guides/integration-javascript-server-side.md) を参照してください)、このステップに従ってください：

* この ID を JSON 文字列としてクライアントに送り返します ([identity field](../sdks/client-side-identity.md#initopts-object-void) で使用するため):

   ```java
   tokenGenerateResponse.getIdentityJsonString()
   ```

   :::note
   ユーザーがオプトアウトした場合、このメソッドは `null` を返しますので、必ず処理してください。
   :::

#### Server-Only Integration

Server-Only Integration ([Publisher Integration Guide, Server-Only](../guides/custom-publisher-integration.md) を参照してください) を使用している場合は、以下の手順に従ってください:

1. `tokenGenerateResponse.getIdentityJsonString()` 関数を使用して、この ID をユーザーのセッションに JSON 文字列として格納します。

   ユーザーがオプトアウトした場合、このメソッドは `null` を返します。

2. ユーザーの UID2 Token を取得するには、以下を使用します:

   ```java
   IdentityTokens identity = tokenGenerateResponse.getIdentity();
   if (identity != null) { String advertisingToken = identity.getAdvertisingToken(); }
   ```
3. ユーザーが別のページにアクセスしたときや、タイマーで、更新が必要かどうかを判断します:
   1. ユーザーのセッションから ID の JSON 文字列を取得し、ID 情報を入力として受け取って `IdentityTokens` オブジェクトを生成する以下の関数を呼び出します：

      ```java
      IdentityTokens identity = IdentityTokens.fromJsonString(identityJsonString);
      ```
   2. ID をリフレッシュできるかどうか (Refresh Token の有効期限が切れていないかどうか) を判断します:

      ```java
      if (identity == null || !identity.isRefreshable()) { we must no longer use this identity (for example, remove this identity from the user's session) }
      ```
   3. リフレッシュが必要かどうかを判断します:

      ```java
      if (identity.isDueForRefresh()) {..}
      ```
4. 必要であれば、トークンと関連する値をリフレッシュします:
 
   ```java
   TokenRefreshResponse tokenRefreshResponse = publisherUid2Client.refreshToken(identity);
   ```
 
5. ユーザーのセッションに `tokenRefreshResponse.getIdentityJsonString()` を格納します。

   ユーザーがオプトアウトした場合、このメソッドは `null` を返し、ユーザーの ID をセッションから削除する必要があることを示します。オプトアウトを確認するには、`tokenRefreshResponse.isOptout()` 関数を使用します。

### Advanced Usage

1. インスタンス変数として `PublisherUid2Helper` のインスタンスを作成します:

    ```java
    private final PublisherUid2Helper publisherUid2Helper = new PublisherUid2Helper(UID2_SECRET_KEY);
    ```
2. ユーザーのメールアドレスまたは電話番号を入力として受け取り、安全なリクエストデータエンベロープを作成する関数を呼び出します。[Encrypting requests](../getting-started/gs-encryption-decryption.md#encrypting-requests) を参照してください。以下の例ではメールアドレスを使用しています:

    ```java
    EnvelopeV2 envelope = publisherUid2Helper.createEnvelopeForTokenGenerateRequest(TokenGenerateInput.fromEmail(emailAddress).doNotGenerateTokensForOptedOut());
    ```
3. 選択した HTTP クライアントライブラリを使用して、ヘッダーとボディを含むこのエンベロープを [POST&nbsp;token/generate](../endpoints/post-token-generate.md) エンドポイントにポストします:
   1. Headers: HTTP ライブラリによっては、以下のようになります:  

      `.putHeader("Authorization", "Bearer " + UID2_API_KEY)`  
      `.putHeader("X-UID2-Client-Version", PublisherUid2Helper.getVersionHeader())`
   2. Body: `envelope.getEnvelope()`
   :::important
   - POST&nbsp;/token/generateエンドポイントは、ユーザーの[directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) をターゲティング広告用の UID2 Token に変換する法的根拠を得た場合にのみ呼び出すようにしてください。

   - 常に `doNotGenerateTokensForOptedOut()` を適用してください。これは POST&nbsp;/token/generate エンドポイントの呼び出しで `optout_check=1` を設定するのと同様のパラメータを適用します ([Unencrypted JSON Body Parameters](../endpoints/post-token-generate.md#unencrypted-json-body-parameters) を参照してください)。
   :::

4. HTTP レスポンスステータスコードが 200 でない場合は、[Response Status Codes](../endpoints/post-token-generate.md#response-status-codes) を参照して次のステップを決定します。そうでない場合は、UID2 ID レスポンスの内容を `TokenGenerateResponse` オブジェクトに変換します:

   ```java
   TokenGenerateResponse tokenGenerateResponse = publisherUid2Helper.createTokenGenerateResponse({response body}, envelope);
   ```

#### Client-Server Integration

Standard Integration (client and server) を使用している場合 ([Server-Side Integration Guide for JavaScript](../guides/integration-javascript-server-side.md) を参照してください)、以下の手順に従ってください:

* この ID を JSON 文字列としてクライアントに送り返します ([identity field](../sdks/client-side-identity.md#initopts-object-void) で使用するため):

    ```java
    tokenGenerateResponse.getIdentityJsonString()
    ```

    :::caution
    ユーザーがオプトアウトした場合、このメソッドは `null` を返しますので、必ず処理してください。
    :::

#### Server-Only Integration

Server-Only Integration ([Publisher Integration Guide, Server-Only](../guides/custom-publisher-integration.md) を参照してください) を使用している場合は、以下の手順に従ってください:

1. `tokenGenerateResponse.getIdentityJsonString()` を使用して、この ID をユーザーのセッションに JSON 文字列として保存します。

   このメソッドは、ユーザーがオプトアウトした場合は `null` を返すので、必ず処理してください。
2. ユーザーの UID2 Token を取得するには、以下を使用します:

   ```java
   IdentityTokens identity = tokenGenerateResponse.getIdentity();
   if (identity != null) { String advertisingToken = identity.getAdvertisingToken(); }
   ```

3. ユーザーが別のページにアクセスしたときや、タイマーで、更新が必要かどうかを判断します:
   1. ユーザーのセッションから ID JSON 文字列を取得し、`IDentityTokens` オブジェクトを生成する以下の関数を呼び出します:
   
       ```java
       IdentityTokens identity = IdentityTokens.fromJsonString(identityJsonString);
       ```
   2. ID をリフレッシュできるかどうか (Refresh Token の有効期限が切れていないかどうか) を判断します: 

      ```java
      if (identity == null || !identity.isRefreshable()) { we must no longer use this identity (for example, remove this identity from the user's session) }
      ```
   3. リフレッシュが必要かどうかを判断します:
   
      ```java
      if (identity.isDueForRefresh()) {..}
      ```
4. リフレッシュが必要な場合は、[POST token/refresh](../endpoints/post-token-refresh.md)エンドポイントを、以下のように呼び出します:
   1. Headers: HTTPライブラリによっては、次のようになります:
    
      `.putHeader("Authorization", "Bearer " + UID2_API_KEY)`  
      `.putHeader("X-UID2-Client-Version", PublisherUid2Helper.getVersionHeader())`. 
   2. Body: `identity.getRefreshToken()`
5. Refresh HTTP レスポンスステータスコードが 200 の場合:

   ```java
   TokenRefreshResponse tokenRefreshResponse = PublisherUid2Helper.createTokenRefreshResponse({response body}, identity);
   ```
6. ユーザーのセッションに `tokenRefreshResponse.getIdentityJsonString()` を格納します。

   ユーザーがオプトアウトした場合、このメソッドは `null` を返し、ユーザーの ID をセッションから削除する必要があることを示します。オプトアウトを確認するには、`tokenRefreshResponse.isOptout()` 関数を使用します。

## Usage for Advertisers and Data Providers
1. IdentityMapClient のインスタンスをインスタンス変数として作成します。
   ```java
   final private IdentityMapClient identityMapClient = new IdentityMapClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);
   ```

2. メールアドレスまたは電話番号を入力として受け取り、IdentityMapResponse オブジェクトを生成する関数を呼び出します。以下の例では、メールアドレスを使用しています:
   ```java
   IdentityMapResponse identityMapResponse = identityMapClient.generateIdentityMap(IdentityMapInput.fromEmails(Arrays.asList("email1@example.com", "email2@example.com")));
   ```

>Note: SDK は入力値を送信する前にハッシュ化します。これにより、元のメールアドレスや電話番号がサーバーから送信されることはありません。

3. マップされた結果とマップされていない結果を以下のように取得します:
   ```java
   Map<String, IdentityMapResponse.MappedIdentity> mappedIdentities = identityMapResponse.getMappedIdentities();
   Map<String, IdentityMapResponse.UnmappedIdentity> unmappedIdentities = identityMapResponse.getUnmappedIdentities();`
   ```

4. マップされた結果とマップされていない結果を Iterate するか、lookup を行います。以下の例では lookup を行っています:
   ```java
   IdentityMapResponse.MappedIdentity mappedIdentity = mappedIdentities.get("email1@example.com");
   if (mappedIdentity != null) {
        String rawUid = mappedIdentity.getRawUid();
   } else {
        IdentityMapResponse.UnmappedIdentity unmappedIdentity = unmappedIdentities.get("email1@example.com");
        String reason = unmappedIdentity.getReason();
   }
   ```


## Usage for UID2 Sharers

UID2 Sharer とは、UID2 を他の参加者と共有したい参加者のことです。raw UID2を他の参加者に送信する前に、UID2 Token に暗号化する必要があります。使用例については、[com.uid2.client.test.IntegrationExamples](https://github.com/IABTechLab/uid2-client-java/blob/master/src/test/java/com/uid2/client/test/IntegrationExamples.java) (`runSharingExample` メソッド) を参照してください。

>IMPORTANT: このプロセスで生成される UID2 Token は共有専用です&#8212;ビッドストリームでは使用できません。ビッドストリーム用のトークン生成には別のワークフローがあります: [Sharing in the Bid Stream](../sharing/sharing-bid-stream.md) を参照してください。

次の手順では、UID2 SDK for Java を送信者または受信者として使用して共有を実装する方法の例を示します。

1. `IUID2Client` のリファレンスを作成します:

   ```java
   IUID2Client client = UID2ClientFactory.create(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);
   ```
2. 起動時に一度リフレッシュし、その後定期的にリフレッシュします。推奨されるリフレッシュ間隔は1時間ごとです。詳細については、[Best Practices for Managing UID2 Tokens](../sharing/sharing-best-practices.md#key-refresh-cadence-for-sharing) を参照してください。

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
