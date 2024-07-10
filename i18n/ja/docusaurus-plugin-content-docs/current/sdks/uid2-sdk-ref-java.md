---
title: UID2 SDK for Java
description: Java Server-Side SDK のリファレンス情報。
hide_table_of_contents: false
sidebar_position: 04
---

import Link from '@docusaurus/Link';

# UID2 SDK for Java Reference Guide

UID2 SDK for Java を使用すると、以下が容易になります:

- UID2 Advertising Token の生成
- UID2 Advertising Token の更新
- Raw UID2 を暗号化して共有用の UID2 Token を作成する
- UID2 Token を復号化して raw UID2 にアクセスする
- DII から raw UID2 への変換

## Functionality

この SDK は、Server-Side のコーディングに Java を使用しているパブリッシャー、DSP、広告主、データプロバイダー、UID2 Sharers のために、UID2 とのインテグレーションを簡素化します。次の表に、この SDK がサポートする機能を示します。

| Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token | Generate UID2 Token from DII | Refresh UID2 Token | Map DII to a Raw UID2 |
| :--- | :--- | :--- | :--- | :--- |
| Supported | Supported | Supported | Supported | Supported |

## API Permissions

この SDK を使用するには、[Account Setup](../getting-started/gs-account-setup.md) ページに記載されている手順に従って、UID2 アカウントのセットアップを完了する必要があります。

SDK が提供する特定の機能の使用許可が与えられ、そのアクセス用の認証情報が与えられます。SDK には、使用する権限を持たない機能があるかもしれないことに留意してください。例えば、パブリッシャーはトークンの生成と更新のために特定の API Permissions を取得しますが、SDK は共有などの他のアクティビティをサポートするかもしれません。

詳細は [API Permissions](../getting-started/gs-permissions.md) を参照してください。

## Version

この SDK には Java version 1.8 以降が必要です。

## GitHub Repository/Binary

この SDK は以下のオープンソースの GitHub リポジトリにあります:

- [UID2 SDK for Java](https://github.com/IABTechLab/uid2-client-java/blob/master/README.md)

バイナリは Maven リポジトリで公開されています:

- [https://central.sonatype.com/artifact/com.uid2/uid2-client](https://central.sonatype.com/artifact/com.uid2/uid2-client)

## Initialization

初期化ステップは、次の表に示すように、役割によって異なります。

| Role                     | Create Instance of Class | Link to Instructions                                                         |
|:-------------------------| :--- |:-----------------------------------------------------------------------------|
| Publisher                | `PublisherUid2Client` | [Usage for Publishers](#usage-for-publishers)                                |
| Advertiser/Data Provider | `IdentityMapClient` | [Usage for Advertisers/Data Providers](#usage-for-advertisersdata-providers) |
| DSP                      | `BidstreamClient` | [Usage for DSPs](#usage-for-dsps)                                            |
| Sharer                   | `SharingClient` | [Usage for UID2 Sharers](#usage-for-uid2-sharers)                            |

SDK が UID2 Service で認証するために必要な値を提供する必要があります。

| Parameter | Description                                                                                | 
| :--- |:-------------------------------------------------------------------------------------------|
| `baseUrl/uid2BaseUrl` | The endpoint for the UID2 service. See [Environments](../getting-started/gs-environments). | 
| `clientApiKey` | The API key. See [UID2 Credentials](../getting-started/gs-credentials).                    | 
| `base64SecretKey` | The client secret. See [UID2 Credentials](../getting-started/gs-credentials).              | 

### Interface 

`BidstreamClient` クラスを使用すると、UID2 Token を raw UID2 に復号することができます。
ユーザーのオプトアウトを処理する入札ロジックの詳細については、[DSP Integration Guide](../guides/dsp-guide.md) を参照してください。

`SharingClient` クラスを使うと、raw UID2 を暗号化して UID2 Token にしたり、UID2 Token を復号して raw UID2 にしたりすることができます。

:::note
SDK を使用する際に、復号鍵を保存したり管理したりする必要はありません。
:::

### Encryption Response Content

`SharingClient` クラスで暗号化する場合、SDK は次の表に示す情報を返します。

| Method | Description |
| :--- | :--- |
| `getStatus()` | 暗号化結果のステータス。取り得る値のリストと定義については、[Encryption Response Statuses](#encryption-response-statuses) を参照してください。 |
| `getEncryptedData()` | 暗号化された UID2 token。 |

### Encryption Response Statuses

暗号化レスポンスコードとその意味は次の表の通りです。

| Value | Description |
| :--- | :--- |
| `SUCCESS` | raw UID2 は正常に暗号化され、UID2 Token が返されました。 |
| `NOT_AUTHORIZED_FOR_KEY` | 呼び出し元は <a href="../ref-info/glossary-uid#gl-encryption-key">暗号化キー</a> を使用する権限を持っていません。 |
| `NOT_AUTHORIZED_FOR_MASTER_KEY` | 呼び出し元はマスターキーを使用する権限を持っていません。 |
| `NOT_INITIALIZED` | クライアントライブラリは初期化待ちです。 |
| `KEYS_NOT_SYNCED` | クライアントが UID2 Service との鍵の同期に失敗しました。 |
| `ENCRYPTION_FAILURE` | 一般的な暗号化に失敗しました。 |

### Decryption Response Content

`BidstreamClient` クラスと `SharingClient` クラスのどちらで復号化しても、SDK は次の表に示す情報を返します。

| Methods | Description |
| :--- | :--- |
| `getStatus()` | 復号結果のステータス。取り得る値のリストと定義については、[Decryption Response Statuses](#decryption-response-statuses) を参照してください。 |
| `getSiteId()` | UID2 Token に対応する raw UID2  |
| `getEstablished()` | ユーザーがパブリッシャーと最初に UID2 を確立した時のタイムスタンプ。 |

### Decryption Response Statuses

復号化レスポンスコードとその意味は次の表の通りです。

| Value | Description |
| :--- | :--- |
| `SUCCESS` | UID2 Token は正常に復号化され、raw UID2が返されました。 |
| `NOT_AUTHORIZED_FOR_KEY` | 呼び出し元はこの UID2 Token を復号化する権限を持っていません。 |
| `NOT_INITIALIZED` | クライアントライブラリは初期化待ちです。 |
| `INVALID_PAYLOAD` | 受信した UID2 Token は有効なペイロードではありません。 |
| `EXPIRED_TOKEN` | 受信した UID2 Token の有効期限が切れました。 |
| `KEYS_NOT_SYNCED` | クライアントが UID2 Service との鍵の同期に失敗しました。 |
| `VERSION_NOT_SUPPORTED` | クライアントライブラリが暗号化トークンのバージョンをサポートしていません。 |
| `INVALID_TOKEN_LIFETIME` | トークンのタイムスタンプが無効です。 |

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
   <!-- - Be sure to call the POST&nbsp;/token/generate endpoint only when you have a legal basis to convert the user’s <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> to UID2 tokens for targeted advertising.

   - --> 常に `doNotGenerateTokensForOptedOut()` を適用します。これは POST&nbsp;/token/generate エンドポイントの呼び出しで `optout_check=1` を設定するのと同様のパラメータを適用します([Unencrypted JSON Body Parameters](../endpoints/post-token-generate.md#unencrypted-json-body-parameters)) を参照してください。
   :::

 <!-- uid2_euid_diff re legal basis for admonition above (first bullet not in UID2) -->

#### Client-Server Integration

Standard Integration (Client and Server) を使用している場合([Client-Server Integration Guide for JavaScript](../guides/integration-javascript-server-side.md) を参照してください)、このステップに従ってください：

* この ID を JSON 文字列としてクライアントに送り返します ([identity field](../sdks/client-side-identity.md#initopts-object-void) で使用するため):

   ```java
   tokenGenerateResponse.getIdentityJsonString()
   ```

   :::note
   ユーザーがオプトアウトした場合、このメソッドは `null` を返しますので、必ず処理してください。
   :::

#### Server-Side Integration

Server-Side Integration ([Publisher Integration Guide, Server-Side](../guides/custom-publisher-integration.md) を参照してください) を使用している場合は、以下の手順に従ってください:

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
   <!-- - Be sure to call the POST&nbsp;/token/generate endpoint only when you have a legal basis to convert the user’s <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> to UID2 tokens for targeted advertising.

   - -->常に `doNotGenerateTokensForOptedOut()` を適用してください。これは POST&nbsp;/token/generate エンドポイントの呼び出しで `optout_check=1` を設定するのと同様のパラメータを適用します ([Unencrypted JSON Body Parameters](../endpoints/post-token-generate.md#unencrypted-json-body-parameters) を参照してください)。
   :::

   <!-- uid2_euid_diff re legal basis for admonition above (first bullet not in UID2) -->

4. HTTP レスポンスステータスコードが 200 でない場合は、[Response Status Codes](../endpoints/post-token-generate.md#response-status-codes) を参照して次のステップを決定します。そうでない場合は、UID2 ID レスポンスの内容を `TokenGenerateResponse` オブジェクトに変換します:

   ```java
   TokenGenerateResponse tokenGenerateResponse = publisherUid2Helper.createTokenGenerateResponse({response body}, envelope);
   ```

#### Client-Server Integration

Standard Integration (client and server) を使用している場合 ([Client-Server Integration Guide for JavaScript](../guides/integration-javascript-server-side.md) を参照してください)、以下の手順に従ってください:

* この ID を JSON 文字列としてクライアントに送り返します ([identity field](../sdks/client-side-identity.md#initopts-object-void) で使用するため):

    ```java
    tokenGenerateResponse.getIdentityJsonString()
    ```

    :::caution
    ユーザーがオプトアウトした場合、このメソッドは `null` を返しますので、必ず処理してください。
    :::

#### Server-Side Integration

Server-Side Integration ([Publisher Integration Guide, Server-Side](../guides/custom-publisher-integration.md) を参照してください) を使用している場合は、以下の手順に従ってください:

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

## Usage for Advertisers/Data Providers
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

## Usage for DSPs

以下の手順は、UID2 SDK for Java を使用して DSP が<Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>のトークンを復号化する方法の例です。

1. `BidstreamClient` を生成します:

```java
Bidstream client = new BidstreamClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);
```

2. 起動時に一度リフレッシュし、その後定期的にリフレッシュします (推奨リフレッシュ間隔は1時間毎):

```java
client.refresh();
```

3. トークンを raw UID2に復号します。トークンを渡し、以下のいずれかを実行します:
* ビッドリクエスト元がパブリッシャーのウェブサイトである場合は、ドメイン名を渡します。ドメイン名はすべて小文字で、スペースを入れず、サブドメインを含まないものでなければなりません。例えば、`Subdomain.DOMAIN.com` は `domain.com` を代わりに渡します。
*ビッドリクエストがモバイルアプリから発生した場合は、<Link href="../ref-info/glossary-uid#gl-app-name">app name</Link> を渡します。
* 上記以外は `null` を渡します。

```java
DecryptionResponse decrypted = client.decryptTokenIntoRawUid(uidToken, domainOrAppName); 
//If decryption succeeded, use the raw UID2.
if (decrypted.isSuccess()) 
{
    //Use decrypted.getUid()
}
else 
{
    // Check decrypted.getStatus() for the failure reason.
}
```

完全な例については、[test/IntegrationExamples.java](https://github.com/IABTechLab/uid2-client-java/blob/main/src/test/java/com/uid2/client/test/IntegrationExamples.java) の `ExampleBidStreamClient` メソッドを参照してください。

## Usage for UID2 Sharers

UID2 <Link href="../ref-info/glossary-uid#gl-sharing-participant">Sharing Participant</Link> は、送信者または受信者として共有に参加し、他の参加者と UID2 を共有する企業です。

広告主やデータプロバイダは、この SDK を使用して他の認証された UID2 共有参加者と UID2 を共有できます (<Link href="../ref-info/glossary-uid#gl-tokenized-sharing">Tokenized Sharing</Link>)。彼らは [raw UID2s](../ref-info/glossary-uid#gl-raw-uid2) を <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> に暗号化し、それを他の参加者に送信して共有できます (詳細は [Tokenized Sharing in Pixels](../sharing/sharing-tokenized-from-data-pixel.md) を参照してください)。データをピクセルで送信していない場合でも、[Security Requirements for UID2 Sharing](../sharing/sharing-security.md) で示されている要件に従えば、UID2 共有に参加できます。

:::important
このプロセスで生成される UID2 Token は共有専用で、ビッドストリームでは使用できません。ビッドストリームで使用するには、別のワークフローがあります: [Tokenized Sharing in the Bid Stream](../sharing/sharing-tokenized-from-data-bid-stream.md) を参照してください。
:::

以下の手順は、UID2 SDK for Java を使用して、送信者または受信者として共有を実装する方法の例です。

1. `SharingClient`　を生成します:
```java
SharingClient client = new SharingClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);
```

2. 起動時に一度リフレッシュし、その後定期的にリフレッシュします。推奨されるリフレッシュ間隔は1時間ごとです。詳細については、[Decryption Key Refresh Cadence for Sharing](../sharing/sharing-best-practices.md#decryption-key-refresh-cadence-for-sharing) を参照してください。

   ```java
   client.refresh();
   ```
3. 送信者なら `encryptRawUidIntoToken` を呼び出します:
```java
EncryptionDataResponse encrypted = client.encryptRawUidIntoToken(raw_uid);
// If encryption succeeded, send the UID2 token to the receiver.
if (encrypted.isSuccess())
{
        // Send encrypted.getEncryptedData() to receiver
}
else
{
        // Check encrypted.getStatus() for the failure reason.
}
```
受信者なら `decryptTokenIntoRawUid` を呼び出します:

```java
DecryptionResponse decrypted = client.decryptTokenIntoRawUid(uid_token);
// If decryption succeeded, use the raw UID2.
if (decrypted.isSuccess())
{
    //  Use decrypted.getUid()
}
else
{
    // Check decrypted.getStatus() for the failure reason.
}
```

完全な例については、[test/IntegrationExamples.java](https://github.com/IABTechLab/uid2-client-java/blob/main/src/test/java/com/uid2/client/test/IntegrationExamples.java) の `ExampleSharingClient` メソッドを参照してください。

## FAQs

DSP に関するよくある質問については [FAQs for DSPs](../getting-started/gs-faqs.md#faqs-for-dsps) を参照してください。
