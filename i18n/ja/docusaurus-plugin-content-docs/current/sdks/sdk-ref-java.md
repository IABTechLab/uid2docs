---
title: SDK for Java
description: Java Server-Side SDK のリファレンス情報。
hide_table_of_contents: false
sidebar_position: 04
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import SnptPOSTIdentityMapImprovements from '../snippets/_snpt-post-identity-map-improvements-v3.mdx';

# SDK for Java Reference Guide

Server-Side で Java SDK を使用すると、UID2 を使用してクライアント ID を生成または確立し、ビッドストリームで使用する Advertising Token を取得し、UID2 Token を自動的にリフレッシュするプロセスを簡素化できます。適用可能な権限がある場合、共有のために暗号化および復号化し、DII を raw UID2 にマップすることもできます。

## Functionality

この SDK は、Server-Side のコーディングに Java を使用しているパブリッシャー、DSP、広告主、データプロバイダー、UID2 Sharers のために、UID2 とのインテグレーションを簡素化します。次の表に、この SDK がサポートする機能を示します。

| Encrypt Raw UID2 to UID2 Token for Sharing | Decrypt UID2 Token to Raw UID2 | Generate UID2 Token from DII | Refresh UID2 Token | Map DII to Raw UID2s | Monitor Rotated Salt Buckets |
| :--- | :--- | :--- | :--- | :--- | :--- |
| &#9989; | &#9989; | &#9989; | &#9989; | &#9989; | &#8212; |

## UID2 Account Setup

UID2 とインテグレーションするには、UID2 アカウントが必要です。アカウントをまだ作成していない場合は、最初に [Account Setup](../getting-started/gs-account-setup.md) ページの手順に従ってください。

## API Permissions

アカウントの初期設定が完了すると、パブリッシャー、広告主、またはデータプロバイダーの場合、[UID2 Portal](../portal/portal-overview.md) にアクセスするための手順とリンクが送信されます。以下の操作が可能です:
- アカウント用の [credentials](../getting-started/gs-credentials.md) を生成します。
- オプションとして、チームメンバーに関する情報を設定するなど、他の値を設定します。

SDK が提供する特定の機能を使用する権限が与えられ、そのアクセスのための資格情報が提供されます。SDK には使用権限がない機能がある可能性があることに注意してください。詳細は、[API Permissions](../getting-started/gs-permissions.md) を参照してください。

DSP の場合は、資格情報を送信します。

## Version

この SDK には Java version 1.8 以降が必要です。

## GitHub Repository/Binary

この SDK は以下のオープンソースの GitHub リポジトリにあります:

- [SDK for Java](https://github.com/IABTechLab/uid2-client-java/blob/master/README.md)

バイナリは Maven リポジトリで公開されています:

- [https://central.sonatype.com/artifact/com.uid2/uid2-client](https://central.sonatype.com/artifact/com.uid2/uid2-client)

## Initialization

初期化ステップは、次の表に示すように、役割によって異なります。

| Role | Create Instance of Class | Link to Instructions |
| :--- | :--- | :--- |
| Publisher | `PublisherUid2Client` | [Usage for Publishers](#usage-for-publishers) |
| Advertiser/Data Provider | `IdentityMapClient` | [Usage for Advertisers/Data Providers](#usage-for-advertisersdata-providers) |
| DSP | `BidstreamClient` | [Usage for DSPs](#usage-for-dsps) |
| Sharer | `SharingClient` | [Usage for UID2 Sharers](#usage-for-uid2-sharers) |

SDK が UID2 Service で認証するために必要な値を提供する必要があります。

| Parameter | Description | 
| :--- | :--- |
| `baseUrl/uid2BaseUrl` | The endpoint for the UID2 service. See [Environments](../getting-started/gs-environments). |
| `clientApiKey` | The API key. See [UID2 Credentials](../getting-started/gs-credentials). |
| `base64SecretKey` | The client secret. See [UID2 Credentials](../getting-started/gs-credentials). |

### Interface 

`BidstreamClient` クラスを利用すると UID2 Token を raw UID2 に復号化できます。

ユーザーのオプトアウトを処理する入札ロジックの詳細は [DSP Integration Guide](../guides/dsp-guide.md) を参照してください。

`SharingClient` クラスを利用すると、raw UID2 を UID2 Token に暗号化し、UID2 Token を raw UID2 に復号化することができます。

:::note
SDK を使用する際に、復号鍵を保存したり管理したりする必要はありません。
:::

### Encryption Response Content

`SharingClient` クラスで暗号化する場合、SDK は次の表に示す情報を返します。

| Method | Description |
| :--- | :--- |
| `getStatus()` | 暗号化結果のステータス。取り得る値のリストと定義は、[Encryption Response Statuses](#encryption-response-statuses) を参照してください。 |
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
| `getStatus()` | 復号結果のステータス。取り得る値のリストと定義は、[Decryption Response Statuses](#decryption-response-statuses) を参照してください。 |
| `getUid()`    | UID2 Token に対応する raw UID2  |
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

パブリッシャーとして、SDK for Java を使用するには 2 つの方法があります: 
1. [**Basic Usage**](#basic-usage) は、この SDK の HTTP 実装 (synchronous [OkHttp](https://square.github.io/okhttp/)) を使いたいパブリッシャー向けです。
2. [**Advanced Usage**](#advanced-usage) は、独自の HTTP ライブラリを使用したいパブリッシャー向けです。

Basic と Advanced 両方の使い方を示すサンプルアプリケーションは、[Java UID2 Integration Example](https://github.com/UnifiedID2/uid2-examples/tree/main/publisher/uid2-java-test-site#readme) を参照してください。

### Basic Usage

SDK の HTTP 実装を使用している場合は、以下の手順に従ってください。

1. インスタンス変数として `PublisherUid2Client` のインスタンスを作成します:

   ```java
   private final PublisherUid2Client publisherUid2Client = new PublisherUid2Client(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);
   ```

2. ユーザーのメールアドレスまたは電話番号を入力として受け取り、`TokenGenerateResponse` オブジェクトを生成する関数を呼び出します。以下の例では、メールアドレスを使用しています:
   ```java
   TokenGenerateResponse tokenGenerateResponse = publisherUid2Client.generateTokenResponse(TokenGenerateInput.fromEmail("user@example.com").doNotGenerateTokensForOptedOut());
   ```

   :::important
   <!-- - Be sure to call the POST&nbsp;/token/generate endpoint only when you have a legal basis to convert the user’s <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> to UID2 tokens for targeted advertising.

   - --> 常に `doNotGenerateTokensForOptedOut()` を適用します。これは POST&nbsp;/token/generate エンドポイントの呼び出しで `optout_check=1` を設定するのと同様のパラメータを適用します([Unencrypted JSON Body Parameters](../endpoints/post-token-generate.md#unencrypted-json-body-parameters)) を参照してください。
   :::

 <!-- uid2_euid_diff re legal basis for admonition above (first bullet not in UID2) -->

#### Basic Usage, Client-Server Integration

Standard Integration (Client and Server) を使用している場合([Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md) を参照)、このステップに従ってください：

* この ID を JSON 文字列としてクライアントに送り返します ([identity field](../sdks/sdk-ref-javascript.md#initopts-object-void) で使用するため):

   ```java
   tokenGenerateResponse.getIdentityJsonString()
   ```

   :::note
   ユーザーがオプトアウトした場合、このメソッドは `null` を返しますので、必ず処理してください。
   :::

#### Basic Usage, Server-Side Integration

Server-Side Integration ([Publisher Integration Guide, Server-Side](../guides/integration-publisher-server-side.md) を参照) を使用している場合は、以下の手順に従ってください:

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
      if (identity == null || !identity.isRefreshable()) { 
          // we must no longer use this identity (for example, remove this identity from the user's session) 
      }
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
    EnvelopeV2 envelope = publisherUid2Helper.createEnvelopeForTokenGenerateRequest(TokenGenerateInput.fromEmail("user@example.com").doNotGenerateTokensForOptedOut());
    ```
3. 選択した HTTP クライアントライブラリを使用して、ヘッダーとボディを含むこのエンベロープを [POST&nbsp;token/generate](../endpoints/post-token-generate.md) エンドポイントにポストします:
   1. Headers: HTTP ライブラリによっては、以下のようになります:  

      `.putHeader("Authorization", "Bearer " + UID2_API_KEY)`  
      `.putHeader("X-UID2-Client-Version", PublisherUid2Helper.getVersionHttpHeader())`
   2. Body: `envelope.getEnvelope()`
   :::important
   <!-- - Be sure to call the POST&nbsp;/token/generate endpoint only when you have a legal basis to convert the user’s <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> to UID2 tokens for targeted advertising.

   - -->常に `doNotGenerateTokensForOptedOut()` を適用してください。これは POST&nbsp;/token/generate エンドポイントの呼び出しで `optout_check=1` を設定するのと同様のパラメータを適用します ([Unencrypted JSON Body Parameters](../endpoints/post-token-generate.md#unencrypted-json-body-parameters) を参照)。
   :::

   <!-- uid2_euid_diff re legal basis for admonition above (first bullet not in UID2) -->

4. HTTP レスポンスステータスコードが 200 でない場合は、[Response Status Codes](../endpoints/post-token-generate.md#response-status-codes) を参照して次のステップを決定します。そうでない場合は、UID2 ID レスポンスの内容を `TokenGenerateResponse` オブジェクトに変換します:

   ```java
   TokenGenerateResponse tokenGenerateResponse = publisherUid2Helper.createTokenGenerateResponse({response body}, envelope);
   ```

#### Advanced Usage, Client-Server Integration

Standard Integration (client and server) を使用している場合 ([Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md) を参照)、以下の手順に従ってください:

* この ID を JSON 文字列としてクライアントに送り返します ([identity field](../sdks/sdk-ref-javascript.md#initopts-object-void) で使用するため):

    ```java
    tokenGenerateResponse.getIdentityJsonString()
    ```

    :::caution
    ユーザーがオプトアウトした場合、このメソッドは `null` を返しますので、必ず処理してください。
    :::

#### Advanced Usage, Server-Side Integration

Server-Side Integration ([Publisher Integration Guide, Server-Side](../guides/integration-publisher-server-side.md) を参照) を使用している場合は、以下の手順に従ってください:

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
      if (identity == null || !identity.isRefreshable()) { 
          // we must no longer use this identity (for example, remove this identity from the user's session) 
      }
      ```
   3. リフレッシュが必要かどうかを判断します:
   
      ```java
      if (identity.isDueForRefresh()) {..}
      ```
4. リフレッシュが必要な場合は、[POST token/refresh](../endpoints/post-token-refresh.md)エンドポイントを、以下のように呼び出します:
   1. Headers: HTTPライブラリによっては、次のようになります:
    
      `.putHeader("Authorization", "Bearer " + UID2_API_KEY)`  
      `.putHeader("X-UID2-Client-Version", PublisherUid2Helper.getVersionHttpHeader())`. 
   2. Body: `identity.getRefreshToken()`
5. Refresh HTTP レスポンスステータスコードが 200 の場合:

   ```java
   TokenRefreshResponse tokenRefreshResponse = PublisherUid2Helper.createTokenRefreshResponse({response body}, identity);
   ```
6. ユーザーのセッションに `tokenRefreshResponse.getIdentityJsonString()` を格納します。

   ユーザーがオプトアウトした場合、このメソッドは `null` を返し、ユーザーの ID をセッションから削除する必要があることを示します。オプトアウトを確認するには、`tokenRefreshResponse.isOptout()` 関数を使用します。

## Usage for Advertisers/Data Providers

1. IdentityMapClient のインスタンスをインスタンス変数として作成します:
   ```java
   final private IdentityMapV3Client identityMapV3Client = new IdentityMapV3Client(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);
   ```

2. メールアドレスまたは電話番号を入力として受け取り、IdentityMapResponse オブジェクトを生成する関数を呼び出します。以下の例では、メールアドレスを使用しています:
   ```java
   IdentityMapV3Input input = IdentityMapV3Input.fromEmails(Arrays.asList("user@example.com", "user2@example.com"));
   ```

 複数の ID タイプを組み合わせることもできます:
   ```java
   IdentityMapV3Input input = new IdentityMapV3Input()
       .withEmail("user@example.com")
       .withPhone("+12345678901")
       .withHashedEmail("preHashedEmail")
       .withHashedPhone("preHashedPhone");
   ```

3. `input` を受け取り、IdentityMapV3Response オブジェクトを生成する関数を呼び出します:
   ```java
   IdentityMapV3Response identityMapResponse = identityMapV3Client.generateIdentityMap(input);
   ```

4. マッピングされた結果とマッピングされていない結果を取得します:
   ```java
   HashMap<String, IdentityMapV3Response.MappedIdentity> mappedIdentities = identityMapResponse.getMappedIdentities();
   HashMap<String, IdentityMapV3Response.UnmappedIdentity> unmappedIdentities = identityMapResponse.getUnmappedIdentities();
   ```

5. 結果を処理します。マッピングされた ID が成功した場合は、以下のようにします:
   ```java
   IdentityMapV3Response.MappedIdentity mappedIdentity = mappedIdentities.get("user@example.com");
   if (mappedIdentity != null) {
       String currentUid = mappedIdentity.getCurrentRawUid();     // Current raw UID2
       String previousUid = mappedIdentity.getPreviousRawUid();   // Previous raw UID2 (nullable, only available for 90 days after rotation)
       Instant refreshFrom = mappedIdentity.getRefreshFrom();     // When to refresh this identity
   } else {
       IdentityMapV3Response.UnmappedIdentity unmappedIdentity = unmappedIdentities.get("user@example.com");
       UnmappedIdentityReason reason = unmappedIdentity.getReason(); // OPTOUT, INVALID_IDENTIFIER, or UNKNOWN
   }
   ```

>**Note:** SDKは、メールアドレスの正規化とハッシュ化を自動的に処理し、生のメールアドレスや電話番号がサーバーから送信されないようにします。

### Usage Example

```java
IdentityMapV3Client client = new IdentityMapV3Client(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);

// Example 1: Single identity type
IdentityMapV3Input emailInput = IdentityMapV3Input.fromEmails(
    Arrays.asList("user@example.com", "optout@example.com")
);
IdentityMapV3Response emailResponse = client.generateIdentityMap(emailInput);

// Process email results
emailResponse.getMappedIdentities().forEach((email, identity) -> {
    System.out.println("Email: " + email);
    System.out.println("Current UID: " + identity.getCurrentRawUid());
    System.out.println("Previous UID: " + identity.getPreviousRawUid());
    System.out.println("Refresh from: " + identity.getRefreshFrom());
});

emailResponse.getUnmappedIdentities().forEach((email, identity) -> {
    System.out.println("Unmapped email: " + email + " - Reason: " + identity.getReason());
});

// Example 2: Mixed identity types in single request
IdentityMapV3Input mixedInput = new IdentityMapV3Input()
    .withEmail("user1@example.com")
    .withPhone("+12345678901")
    .withHashedEmail("preHashedEmailValue")
    .withHashedPhone("preHashedPhoneValue");

IdentityMapV3Response mixedResponse = client.generateIdentityMap(mixedInput);
```

## Migration From Version Using v2 Identity Map

以下のセクションでは、この SDK の最新バージョンへの移行に関する一般的な情報とガイダンスを提供します。最新バージョンは `POST /identity/map` バージョン 3 を参照しています:

- [Version 3 Improvements](#version-3-improvements)
- [Required Changes](#required-changes)
- [Recommended Changes](#recommended-changes)

### Version 3 Improvements

<SnptPOSTIdentityMapImprovements />

### Required Changes

アップグレードするには、以下の手順に従ってください:

1. [Update dependency version](#1-update-dependency-version)
2. [Change client class](#2-change-client-class)
3. [Update import statements](#3-update-import-statements)

#### 1. Update dependency version

コード内で参照されている依存関係のバージョンを、次の例のように更新します。

```xml
<dependency>
  <groupId>com.uid2</groupId>
  <artifactId>uid2-client</artifactId>
  <version>4.8.0</version>
</dependency>
```

#### 2. Change client class

コード内で参照されているクライアントクラスを更新します。以下の例を参照してください。

```java
// Before
IdentityMapClient identityMapClient = new IdentityMapClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);

// After
IdentityMapV3Client identityMapClient = new IdentityMapV3Client(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);
```

#### 3. Update import statements

以下の例のように、インポートステートメントを更新します。

```java
import com.uid2.client.IdentityMapV3Client;
import com.uid2.client.IdentityMapV3Input;
import com.uid2.client.IdentityMapV3Response;
import com.uid2.client.UnmappedIdentityReason;
```

### Recommended Changes

以下の変更は**オプション**ですが、新しい v3 機能を活用できます。[必須の変更](#required-changes) で基本的な機能は十分ですが、これらの推奨される変更により、機能が向上します。

1. **Mix identity types in a single request** - 1 回のリクエストでメールアドレスと電話番号の両方を処理します:
   ```java
   // Before - single identity type only
   IdentityMapInput input = IdentityMapInput.fromEmails(Arrays.asList("user@example.com"));
   
   // After - can mix identity types (new v3 capability)
   IdentityMapV3Input input = new IdentityMapV3Input()
       .withEmail("user@example.com")
       .withPhone("+12345678901")
       .withHashedEmail("preHashedEmail")
       .withHashedPhone("preHashedPhone");
   ```

2. **Access previous UID2s** - 90 日間の測定継続性のために、現在の UID2 と以前の UID2 の両方を取得します:
   ```java
   // Before - only current UID2 available
   IdentityMapResponse response = client.generateIdentityMap(input);
   MappedIdentity mapped = response.getMappedIdentities().get("user@example.com");
   String uid = mapped.getRawUid();
   
   // After - access to both current and previous UID2s
   IdentityMapV3Response response = client.generateIdentityMap(input);
   IdentityMapV3Response.MappedIdentity mapped = response.getMappedIdentities().get("user@example.com");
   String currentUid = mapped.getCurrentRawUid();
   String previousUid = mapped.getPreviousRawUid();  // Available for 90 days after rotation
   Instant refreshFrom = mapped.getRefreshFrom();
   ```

3. **Use structured error reasons** - マッピングされない理由を文字列ではなく、肩安全な列挙方として取得します:
   ```java
   // Before - string-based error reasons
   IdentityMapResponse.UnmappedIdentity unmapped = identityMapResponse.getUnmappedIdentities().get("user@example.com");
   String reason = unmapped.getReason();
   
   // After - structured enum-based error reasons
   IdentityMapV3Response.UnmappedIdentity unmapped = response.getUnmappedIdentities().get("user@example.com");
   UnmappedIdentityReason reason = unmapped.getReason(); // Enum: OPTOUT, INVALID_IDENTIFIER, UNKNOWN
   
   // Or continue using string reasons if preferred
   String rawReason = unmapped.getRawReason();
   ```

## Previous SDK Version (using POST /identity/map v2)

:::note
下位互換性のために、`POST /identity/map` v2 エンドポイントを参照する SDK for Java の以前のバージョンも利用可能です。パフォーマンスの向上、複数の ID タイプのサポート、UID ローテーション管理の改善のために、現在の SDK に移行してください。新しいインテグレーションではこのバージョンを使用しないでください。
詳細は [Migration From Version Using v2 Identity Map](#migration-from-version-using-v2-identity-map) を参照してください。
:::

以前のバージョンを使用するには、以下の手順に従ってください。

1. IdentityMapClient のインスタンスをインスタンス変数として作成します:
   ```java
   final private IdentityMapClient identityMapClient = new IdentityMapClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);
   ```

2. メールアドレスまたは電話番号を入力として受け取り、IdentityMapResponse オブジェクトを生成する関数を呼び出します。以下の例ではメールアドレスを使用しています:
   ```java
   IdentityMapResponse identityMapResponse = identityMapClient.generateIdentityMap(IdentityMapInput.fromEmails(Arrays.asList("email1@example.com", "email2@example.com")));
   ```

   >**Note:** SDK は、送信する前に入力値をハッシュ化します。これにより、生のメールアドレスや電話番号がサーバーから出ることはありません。

3. マッピングされた結果とマッピングされていない結果を次のように取得します:
   ```java
   Map<String, IdentityMapResponse.MappedIdentity> mappedIdentities = identityMapResponse.getMappedIdentities();
   Map<String, IdentityMapResponse.UnmappedIdentity> unmappedIdentities = identityMapResponse.getUnmappedIdentities();
   ```

4. マッピングされた結果とマッピングされていない結果を反復処理するか、ルックアップを行います。次の例ではルックアップを行います:
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

以下の手順は、DSP が SDK for Java を使用して <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link> のトークンを復号化する方法の例を示しています。

1. `BidstreamClient` のインスタンスを作成します:

```java
BidstreamClient client = new BidstreamClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);
```

2. 起動時に 1 回リフレッシュし、その後定期的にリフレッシュします (推奨されるリフレッシュ間隔は 1 時間ごとです):

```java
client.refresh();
```

3. トークンを raw UID2 に復号化します。トークンを渡し、次のいずれかを行います:
   * ビッドリクエストがパブリッシャーのウェブサイトから発信された場合は、ドメイン名を渡します。ドメイン名はすべて小文字で、スペースやサブドメインなしで指定する必要があります。たとえば、`Subdomain.DOMAIN.com` の場合は、代わりに `domain.com` を渡します。
   * ビッドリクエストがモバイルアプリから発信された場合は、<Link href="../ref-info/glossary-uid#gl-app-name">アプリ名</Link>を渡します。
   * それ以外の場合は、`null` を渡します。

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

詳細な例は、[test/IntegrationExamples.java](https://github.com/IABTechLab/uid2-client-java/blob/main/src/test/java/com/uid2/client/test/IntegrationExamples.java) を参照してください。

## Usage for UID2 Sharers

UID2 <Link href="../ref-info/glossary-uid#gl-sharing">共有参加者</Link>は、送信者または受信者として共有に参加し、他の参加者と UID2 を共有する企業です。

広告主およびデータプロバイダーは、この SDK を使用して、他の承認された UID2 共有参加者と UID2 を共有できます (<Link href="../ref-info/glossary-uid#gl-tokenized-sharing">トークン化された共有</Link>)。彼らは [raw UID2](../ref-info/glossary-uid#gl-raw-uid2) を <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 Token</Link> に暗号化し、それを共有のために別の参加者に送信できます (ピクセルでの [Tokenized Sharing in Pixels](../sharing/sharing-tokenized-from-data-pixel.md)を参照)。ピクセルでデータを送信しない場合は、[Security Requirements for UID2 Sharing](../sharing/sharing-security.md)に記載されている要件に従う限り、UID2 共有に参加できます。

:::important
このプロセスで生成される UID2 Token は共有専用であり、ビッドストリームでは使用できません。ビッドストリーム用のトークンを生成するための別のワークフローがあります: [Tokenized Sharing in the Bidstream](../sharing/sharing-tokenized-from-data-bid-stream.md)を参照してください。
:::

以下の手順は、SDK for Java を使用して、送信者または受信者として共有を実装する方法の例を示しています。

1. インスタンス変数として `SharingClient` のインスタンスを作成します:
```java
SharingClient client = new SharingClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);
```

2. 起動時に 1 回リフレッシュし、その後定期的にリフレッシュします (推奨されるリフレッシュ間隔は 1 時間ごとです):
```java
client.refresh();
```

3. 送信者の場合は、`encryptRawUidIntoToken` を呼び出します:
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
受信者である場合は、`decryptTokenIntoRawUid` を呼び出します:

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

詳細な例は、[test/IntegrationExamples.java](https://github.com/IABTechLab/uid2-client-java/blob/main/src/test/java/com/uid2/client/test/IntegrationExamples.java) の `ExampleSharingClient` メソッドを参照してください。
