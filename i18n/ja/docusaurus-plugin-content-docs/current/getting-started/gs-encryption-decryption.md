---
title: Encryption and Decryption
description: UID2 リクエストの暗号化とレスポンスの復号化に関する情報。
hide_table_of_contents: false
sidebar_position: 11
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';
import IdentityGenerateResponse from '/docs/snippets/_example-identity-generate-response.mdx';

# Encrypting Requests and Decrypting Responses

:::note
パブリッシャーで、クライアント側にUID2を実装している場合、暗号化と復号化は、Prebid.js ([UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md) を参照してください) や JavaScript SDK ([Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md) を参照してください) などの実装によって自動的に管理されます。
:::

ほとんどすべての UID2 [endpoints](../endpoints/summary-endpoints.md) では、エンドポイントに送られるリクエストは [encrypted](#encrypting-requests) され、エンドポイントからのレスポンスは [decrypted](#decrypting-responses) する必要があります。

唯一の例外は、[POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) エンドポイントへのリクエストは暗号化する必要がないことです。

UID2 API リクエストの暗号化と各レスポンスの復号化について知っておく必要があるのは、以下のとおりです:

- API を使用するには、クライアントの API Key に加えて、クライアントシークレットが必要です。
- 独自のコードを書くことも、提供されているコード例の一つを使うこともできます: [Encryption and Decryption Code Examples](#encryption-and-decryption-code-examples) を参照してください。
- リクエストとレスポンスには、96 ビットの初期化ベクトルと 128 ビットの認証タグを持つ AES/GCM/NoPadding 暗号化アルゴリズムが使用されます。
- リクエストの暗号化されていない JSON ボディは、バイナリの [暗号化前リクエストデータエンベローブ](#unencrypted-request-data-envelope) にラップされ、その後 [暗号化リクエストエンベローブ](#encrypted-request-envelope) に従って暗号化とフォーマットが行われます。
- レスポンス JSON ボディはバイナリの [復号化済みレスポンスデータエンベローブ](#unencrypted-response-data-envelope) にラップされ、[暗号化レスポンスエンベローブ](#encrypted-response-envelope) に従って暗号化・整形されます。

## Workflow

UID2 API のリクエストレスポンスワークフローは、以下のステップです:

1. 入力パラメータを含むリクエストボディを JSON 形式で用意します。
2. リクエスト JSON を[暗号化前リクエストデータエンベローブ](#unencrypted-request-data-envelope) でラップします。
3. AES/GCM/NoPadding アルゴリズムと秘密鍵でエンベローブを暗号化します。
4. [暗号化リクエストエンベローブ](#encrypted-request-envelope) を組み立てます。
5. 暗号化されたリクエストを送信し、暗号化されたレスポンスを受信します。
6. [暗号化レスポンスエンベローブ](#encrypted-response-envelope) を解析します。
7. レスポンスエンベローブのデータを復号化します。
8. 得られた [復号化済みレスポンスデータエンベローブ](#unencrypted-response-data-envelope) を解析します。
9.  (オプション、推奨) レスポンスエンベローブの nonce がリクエストエンベローブの nonce と一致することを確認します。
10. 暗号化されていないエンベローブからレスポンス JSON オブジェクトを抽出します。

[encrypting requests and decrypting responses](#encryption-and-decryption-code-examples) のコード例は、Step 2-10 を自動化するのに役立ち、アプリケーションでこれらのステップを実装する方法のリファレンスとなります。

各 UID2 [endpoints](../endpoints/summary-endpoints.md) では、JSON ボディのフォーマットの要件とパラメータを説明し、呼び出し例を含め、復号化されたレスポンスを示しています。以下のセクションでは、暗号化と復号化のコード例、フィールドレイアウトの要件、リクエストとレスポンスの例を示します。

## Encrypting Requests

リクエストを暗号化するコードを自分で書くか、UID2 SDK を使うか、提供されているコード例のいずれかを使うかの選択肢があります([Encryption and Decryption Code Examples](#encryption-and-decryption-code-examples) を参照してください)。自分でコードを書く場合は、[unencrypted request data envelope](#unencrypted-request-data-envelope) と [Encrypted Request Envelope](#encrypted-request-envelope) に記載されているフィールドレイアウトの要件に従うようにしてください。

### Unencrypted Request Data Envelope

次の表に、リクエスト暗号化コードのフィールドレイアウトを示します。

| Offset (Bytes) | Size (Bytes) | Description |
| :--- | :--- | :--- |
| 0 | 8 | UNIX タイムスタンプ (ミリ秒単位) です。int64 のビッグエンディアンでなければなりません。 |
| 8 | 8 | Nonce: リプレイ攻撃から保護するために使用されるランダムな 64 ビットのデータです。対応する [復号化済みレスポンスデータエンベローブ](#unencrypted-response-data-envelope) には、レスポンスが有効とみなされるために同じ nonce 値が含まれていなければなりません。 |
| 16 | N | UTF-8 エンコーディングでシリアライズされたリクエスト JSON ドキュメントをペイロードとします。 |

### Encrypted Request Envelope

次の表は、リクエスト暗号化コードのフィールドレイアウトを説明するものです。

| Offset (Bytes) | Size (Bytes) | Description |
| :--- | :--- | :--- |
| 0 | 1 | エンベローブフォーマットのバージョン。`1` でなければなりません。 |
| 1 | 12 | 96 ビットの初期化ベクトル (IV)、データ暗号化のランダム化に使用されます。 |
| 13 | N | ペイロード([暗号化前リクエストデータエンベローブ](#unencrypted-request-data-envelope)) は AES/GCM/NoPadding アルゴリズムで暗号化されます。 |
| 13 + N | 16 | データの整合性を確認するために使用される 128 ビット GCM 認証タグです。 |

## Decrypting Responses

レスポンスを復号化するコードを自分で書くか、UID2 SDKを使うか、提供されているコード例のいずれかを使うかの選択肢があります([Encryption and Decryption Code Examples](#encryption-and-decryption-code-examples) を参照してください)。独自のコードを書く場合は、[Encrypted Response Envelope](#encrypted-response-envelope) および [Encrypted Response Envelope](#unencrypted-response-data-envelope) に記載されているフィールドレイアウトの要件に従うようにしてください。

:::note
レスポンスは、サービスが HTTP ステータスコード 200 を返す場合のみ、暗号化されます。
:::

### Encrypted Response Envelope

次の表は、レスポンス復号化コードのフィールドレイアウトを説明するものです。

| Offset (Bytes) | Size (Bytes) | Description |
| :--- | :--- | :--- |
| 0 | 12 | 96 ビットの初期化ベクトル (IV)、データ暗号化のランダム化に使用されます。 |
| 12 | N | ペイロード([復号化済みレスポンスデータエンベローブ](#unencrypted-response-data-envelope)) は、AES/GCM/NoPadding アルゴリズムで暗号化されています。 |
| 12 + N | 16 | データの整合性を確認するために使用される 128 ビット GCM 認証タグ。 |

### Unencrypted Response Data Envelope

次の表は、レスポンス復号化コードのフィールドレイアウトを説明するものです。

| Offset (Bytes) | Size (Bytes) | Description |
| :--- | :--- | :--- |
| 0 | 8 | UNIX タイムスタンプ (ミリ秒単位) です。int64 のビッグエンディアンでなければなりません。 |
| 8 | 8 | Nonce: レスポンスが有効であるとみなされるためには、これは [暗号化前リクエストデータエンベローブ](#unencrypted-request-data-envelope) の nonce と一致する必要があります。 |
| 16  | N | UTF-8 エンコーディングでシリアライズされたレスポンス JSON ドキュメントをペイロードとします。 |

### Response Example

例えば、先行例 のメールアドレスに対する [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) リクエストに対する復号されたレスポンスは、次のようになります:

```json
{
    "body": {
        "advertising_token": "AgAAAQFt3aNLXKXEyWS8Tpezcymk1Acv3n+ClOHLdAgqR0kt0Y+pQWSOVaW0tsKZI4FOv9K/rZH9+c4lpm2DBpmFJqjdF6FAaAzva5vxDIX/67UOspsYtiwxH73zU7Fj8PhVf1JcpsxUHRHzuk3vHF+ODrM13A8NAVlO1p0Wkb+cccIIhQ==",
        "user_token": "AgAAAPpTqz7/Z+40Ue5G3XOM2RiyU6RS9Q5yj1n7Tlg7PN1K1LZWejvo8Er7A+Q8KxdXdj0OrKRf/XEGWsyUJscRNu1bg/MK+5AozvoJKUca8b10eQdYU86ZOHPH7pFnFhD5WHs=",
        "refresh_token": "AAAAAQLMcnV+YE6/xoPDZBJvJtWyPyhF9QTV4242kFdT+DE/OfKsQ3IEkgCqD5jmP9HuR4O3PNSVnCnzYq2BiDDz8SLsKOo6wZsoMIn95jVWBaA6oLq7uUGY5/g9SUOfFmX5uDXUvO0w2UCKi+j9OQhlMfxTsyUQUzC1VQOx6ed/gZjqH/Sw6Kyk0XH7AlziqSyyXA438JHqyJphGVwsPl2LGCH1K2MPxkLmyzMZ2ghTzrr0IgIOXPsL4lXqSPkl/UJqnO3iqbihd66eLeYNmyd1Xblr3DwYnwWdAUXEufLoJbbxifGYc+fPF+8DpykpyL9neq3oquxQWpyHsftnwYaZT5EBZHQJqAttHUZ4yQ==",
        "identity_expires": 1654623500142,
        "refresh_expires": 1657214600142,
        "refresh_from": 1654622900142,
        "refresh_response_key": "wR5t6HKMfJ2r4J7fEGX9Gw=="
    },
    "status": "success"
}
```

## Encryption and Decryption Code Examples

このセクションには、さまざまなプログラミング言語による暗号化と復号化のコード例が示されています。

[POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) エンドポイントでは、[POST&nbsp;/token/generate](../endpoints/post-token-generate.md) または [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) へのコールで事前に取得した `refresh_token` と `refresh_response_key` の値を使用します。

:::note
Windows の場合、PowerShell の代わりに Windows コマンドプロンプトを使用している場合は、JSON を囲むシングルクォートも削除する必要があります。例えば、`echo {"email": "test@example.com"}` とします。
:::

### Prerequisites and Notes

コードサンプルを使用する前に、使用している言語の前提条件と注意事項を確認してください。

<Tabs groupId="language-selection">
<TabItem value='py' label='Python'>

以下のコードサンプルは Python を使ってリクエストを暗号化し、レスポンスを復号化します。必要なパラメータはコード例の一番上に示されており、 `python3 uid2_request.py` を実行することで得ることができます。

:::note
Windowsの場合は `python3` を `python` に置き換えてください。
:::

Python のコードには `pycryptodomex` と `requests` パッケージが必要です。これらは以下のようにしてインストールできます:

```console
pip install pycryptodomex
pip install requests
```

</TabItem>
<TabItem value='java' label='Java'>

以下のコードサンプルは、Java を使用してリクエストを暗号化し、レスポンスを復号化します。必要なパラメータは main 関数の先頭に示されています:

```
java -jar Uid2Request-jar-with-dependencies.jar
```

Java のサンプルは JDK version 11 以降用に書かれており、クラスパスに com.google.code.gson ライブラリーが必要です。

Maven を使用している場合は、以下の最小限の `pom.xml` を使用し、`mvn package` を実行してプロジェクトをビルドすることができます:

```xml
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>org.example</groupId>
  <artifactId>Uid2Request</artifactId>
  <version>1.0</version>
  
  <properties>
    <maven.compiler.source>11</maven.compiler.source>
    <maven.compiler.target>11</maven.compiler.target>
  </properties>

  <dependencies>
    <dependency>
      <groupId>com.google.code.gson</groupId>
      <artifactId>gson</artifactId>
      <version>2.10</version>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <artifactId>maven-assembly-plugin</artifactId>
        <version>3.4.2</version>
        <executions>
          <execution>
            <phase>package</phase>
            <goals>
              <goal>single</goal>
            </goals>
          </execution>
        </executions>
        <configuration>
          <descriptorRefs>
            <descriptorRef>jar-with-dependencies</descriptorRef>
          </descriptorRefs>
          <archive>
              <manifest>
                <mainClass>org.example.Uid2Request</mainClass>
              </manifest>
          </archive>
        </configuration>
      </plugin>
    </plugins>
    <finalName>${artifactId}</finalName>
  </build>
</project>
```

</TabItem>
<TabItem value='cs' label='C#'>

以下のコードサンプルは、C# を使用してリクエストを暗号化し、レスポンスを復号化します。必要なパラメータはファイルの先頭に記載されています。また、`.\uid2_request` をビルドして実行することでも確認できます。

このファイルには.NET 7.0が必要です。必要であれば、それ以前のバージョンを使用することもできますが、.NET Core 3.0以降でなければなりません。バージョンを変更するには、[top-level statements](https://learn.microsoft.com/ja-jp/dotnet/csharp/fundamentals/program-structure/top-level-statements) を Main メソッドに、[using 宣言](https://learn.microsoft.com/ja-jp/cpp/cpp/using-declaration?view=msvc-170) を [using ステートメント](https://learn.microsoft.com/ja-jp/dotnet/csharp/language-reference/proposals/csharp-8.0/using) に置き換えてください。

</TabItem>
</Tabs>

### Code Example

使いたいコードサンプルを選んでください。[Prerequisites and Notes](#prerequisites-and-notes) を忘れずに確認してください。

<Tabs groupId="language-selection">
<TabItem value='py' label='Python'>

```py title="uid2_request.py"
"""
Usage:
   echo '<json>' | python3 uid2_request.py <url> <api_key> <client_secret>

Example:
   echo '{"email": "test@example.com"}' | python3 uid2_request.py https://prod.uidapi.com/v2/token/generate PRODGwJ0hP19QU4hmpB64Y3fV2dAed8t/mupw3sjN5jNRFzg= wJ0hP19QU4hmpB64Y3fV2dAed8t/mupw3sjN5jNRFzg=
   

Refresh Token Usage:
   python3 uid2_request.py <url> --refresh-token <refresh_token> <refresh_response_key>

Refresh Token Usage example:
   python3 uid2_request.py https://prod.uidapi.com/v2/token/refresh --refresh-token AAAAAxxJ...(truncated, total 388 chars) v2ixfQv8eaYNBpDsk5ktJ1yT4445eT47iKC66YJfb1s=

"""

import base64
import os
import sys	
import time
import json

import requests
from Cryptodome.Cipher import AES

def b64decode(b64string, param):
   try:
      return base64.b64decode(b64string)
   except Exception:
   	   print(f"Error: <{param}> is not base64 encoded")
   	   sys.exit()
	   
if len(sys.argv) != 4 and len(sys.argv) != 5:
   print(__doc__)
   sys.exit()

url = sys.argv[1]

is_refresh = 1 if sys.argv[2] == '--refresh-token' else 0
if is_refresh:
   refresh_token = sys.argv[3]
   secret = b64decode(sys.argv[4], "refresh_response_key")
   print(f"\nRequest: Sending refresh_token to {url}\n")
   http_response = requests.post(url, refresh_token)
else:
   api_key = sys.argv[2]
   secret = b64decode(sys.argv[3], "client_secret")
   payload = "".join(sys.stdin.readlines())

   iv = os.urandom(12)
   cipher = AES.new(secret, AES.MODE_GCM, nonce=iv)

   millisec = int(time.time() * 1000)
   request_nonce = os.urandom(8)

   print(f"\nRequest: Encrypting and sending to {url} : {payload}")

   body = bytearray(millisec.to_bytes(8, 'big'))
   body += bytearray(request_nonce)
   body += bytearray(bytes(payload, 'utf-8'))

   ciphertext, tag = cipher.encrypt_and_digest(body)

   envelope = bytearray(b'\x01')
   envelope += bytearray(iv)
   envelope += bytearray(ciphertext)
   envelope += bytearray(tag)

   base64Envelope = base64.b64encode(bytes(envelope)).decode()

   http_response = requests.post(url, base64Envelope, headers={"Authorization": "Bearer " + api_key})
   
# Decryption 
response = http_response.content
if http_response.status_code != 200:
   print(f"Response: Error HTTP status code {http_response.status_code}", end=", check api_key\n" if http_response.status_code == 401 else "\n")
   print(response.decode("utf-8"))
else:
   resp_bytes = base64.b64decode(response)
   iv = resp_bytes[:12]
   data = resp_bytes[12:len(resp_bytes) - 16]
   tag = resp_bytes[len(resp_bytes) - 16:]

   cipher = AES.new(secret, AES.MODE_GCM, nonce=iv)
   decrypted = cipher.decrypt_and_verify(data, tag)

   if is_refresh != 1:
      json_resp = json.loads(decrypted[16:].decode("utf-8"))
   else:
      json_resp = json.loads(decrypted.decode("utf-8"))
      
   print("Response JSON:")
   print(json.dumps(json_resp, indent=4))

```

</TabItem>
<TabItem value='java' label='Java'>


```java title="Uid2Request.java"
package org.example;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Arrays;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class Uid2Request {
  public static final int NONCE_LENGTH_BYTES = 8;
  private static final int GCM_TAG_LENGTH_BYTES = 16;
  private static final int GCM_IV_LENGTH_BYTES = 12;

  public static void main(String[] args) throws Exception {
    if (args.length != 3 && args.length != 4) {
      System.out.println(
              "Usage:" + "\n   "
      +             "java -jar Uid2Request-jar-with-dependencies.jar <url> <api_key> <client_secret>" + "\n\n"
      
      +       "Example:" + "\n   "  
      +             "echo '{\"email\": \"test@example.com\"}' |  java -jar Uid2Request-jar-with-dependencies.jar https://prod.uidapi.com/v2/token/generate PRODGwJ0hP19QU4hmpB64Y3fV2dAed8t/mupw3sjN5jNRFzg= wJ0hP19QU4hmpB64Y3fV2dAed8t/mupw3sjN5jNRFzg=" + "\n\n\n"
      
      +       "Refresh Token Usage:" + "\n   "
      +             "java -jar Uid2Request-jar-with-dependencies.jar <url> --refresh-token <refresh_token> <refresh_response_key>"  + "\n\n"
                      
      +       "Refresh Token Example:" + "\n   " 
      +             "java -jar Uid2Request-jar-with-dependencies.jar https://prod.uidapi.com/v2/token/refresh --refresh-token AAAAAxxJ...(truncated, total 388 chars) v2ixfQv8eaYNBpDsk5ktJ1yT4445eT47iKC66YJfb1s="  + "\n"
      );
      System.exit(1);
    }

    String url = args[0];
    boolean isRefresh = "--refresh-token".equals(args[1]);
    byte[] secret = Base64.getDecoder().decode(args[isRefresh ? 3 : 2]);

    String payload = isRefresh ? args[2] : new BufferedReader(new InputStreamReader(System.in)).readLine();

    HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
    connection.setRequestMethod("POST");

    if (!isRefresh) {
      String apiKey = args[1];

      byte[] iv = new byte[GCM_IV_LENGTH_BYTES];
      long timestamp = Instant.now().toEpochMilli();
      byte[] requestNonce = new byte[NONCE_LENGTH_BYTES];
      byte[] plaintext = payload.getBytes(StandardCharsets.UTF_8);

      SecureRandom secureRandom = new SecureRandom();
      secureRandom.nextBytes(iv);
      secureRandom.nextBytes(requestNonce);

      ByteBuffer body = ByteBuffer.allocate(8 + requestNonce.length + plaintext.length);
      body.putLong(timestamp);
      body.put(requestNonce);
      body.put(plaintext);

      Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
      GCMParameterSpec parameterSpec = new GCMParameterSpec(GCM_TAG_LENGTH_BYTES * 8, iv);
      cipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(secret, "AES"), parameterSpec);

      ByteBuffer envelope = ByteBuffer.allocate(1 + body.array().length + GCM_IV_LENGTH_BYTES + GCM_TAG_LENGTH_BYTES);
      envelope.put((byte) 1);
      envelope.put(iv);
      envelope.put(cipher.doFinal(body.array()));

      payload = Base64.getEncoder().encodeToString(envelope.array());
      connection.setRequestProperty("Authorization", "Bearer " + apiKey);
    }

    connection.setDoOutput(true);
    try (OutputStream os = connection.getOutputStream()) {
      os.write(payload.getBytes(StandardCharsets.UTF_8));
    }

    // Handle response
    int status = connection.getResponseCode();
    BufferedReader reader = status == 200 ?
        new BufferedReader(new InputStreamReader(connection.getInputStream())) :
        new BufferedReader(new InputStreamReader(connection.getErrorStream()));
    StringBuilder response = new StringBuilder();
    String line;
    while ((line = reader.readLine()) != null) {
      response.append(line);
    }
    reader.close();

    if (status != HttpURLConnection.HTTP_OK) {
      System.out.println("Error: HTTP status code " + status);
      System.out.println(response);
      return;
    }

    byte[] respBytes = Base64.getDecoder().decode(response.toString());

    Cipher respCipher = Cipher.getInstance("AES/GCM/NoPadding");
    respCipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(secret, "AES"), new GCMParameterSpec(GCM_TAG_LENGTH_BYTES * 8, respBytes, 0, GCM_IV_LENGTH_BYTES));
    byte[] decrypted = respCipher.doFinal(respBytes, GCM_IV_LENGTH_BYTES, respBytes.length - GCM_IV_LENGTH_BYTES);

    JsonObject jsonResponse;
    if (!isRefresh) {
      jsonResponse = JsonParser.parseString(new String(Arrays.copyOfRange(decrypted, 8 + NONCE_LENGTH_BYTES, decrypted.length), StandardCharsets.UTF_8)).getAsJsonObject();
    } else {
      jsonResponse = JsonParser.parseString(new String(decrypted, StandardCharsets.UTF_8)).getAsJsonObject();
    }
    String prettyJsonResponse = new GsonBuilder().disableHtmlEscaping().setPrettyPrinting().create().toJson(jsonResponse);
    System.out.println("Response JSON:");
    System.out.println(prettyJsonResponse);
  }
}
```

</TabItem>
<TabItem value='cs' label='C#'>


```cs title="uid2_request.cs"
using System.Buffers.Binary;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;


if (args.Length != 3 && args.Length != 4)
{
    Console.WriteLine("""
Usage:
   echo '<json>' | .\uid2_request <url> <api_key> <client_secret>

Example:
   echo '{"email": "test@example.com"}' | .\uid2_request https://prod.uidapi.com/v2/token/generate UID2-C-L-999-fCXrMM.fsR3mDqAXELtWWMS+xG1s7RdgRTMqdOH2qaAo= wJ0hP19QU4hmpB64Y3fV2dAed8t/mupw3sjN5jNRFzg=
   

Refresh Token Usage:
   .\uid2_request <url> --refresh-token <refresh_token> <refresh_response_key>

Refresh Token Usage example:
   .\uid2_request https://prod.uidapi.com/v2/token/refresh --refresh-token AAAAAxxJ...(truncated, total 388 chars) v2ixfQv8eaYNBpDsk5ktJ1yT4445eT47iKC66YJfb1s=
""");

    Environment.Exit(1);
}

const int GCM_IV_LENGTH = 12;

string url = args[0];
byte[] secret;

HttpResponseMessage? response;
bool isRefresh = args[1] == "--refresh-token";

if (isRefresh)
{
    string refreshToken = args[2];
    secret = Convert.FromBase64String(args[3]);

    Console.WriteLine($"\nRequest: Sending refresh_token to {url}\n");
    using HttpClient httpClient = new HttpClient();
    var content = new StringContent(refreshToken, Encoding.UTF8);
    response = await httpClient.PostAsync(url, content);
}
else
{
    string apiKey = args[1];
    secret = Convert.FromBase64String(args[2]);

    string payload = Console.In.ReadToEnd();

    var request = new HttpRequestMessage(HttpMethod.Post, url);
    request.Headers.Add("Authorization", $"Bearer {apiKey}");

    var unixTimestamp = new byte[8];
    BinaryPrimitives.WriteInt64BigEndian(unixTimestamp, DateTimeOffset.UtcNow.ToUnixTimeMilliseconds());

    var nonce = new byte[8];
    var rnd = new Random();
    rnd.NextBytes(nonce);

    var payloadBytes = Encoding.UTF8.GetBytes(payload);

    var unencryptedRequestDataEnvelope = new byte[unixTimestamp.Length + nonce.Length + payloadBytes.Length];
    unixTimestamp.CopyTo(unencryptedRequestDataEnvelope, 0);
    nonce.CopyTo(unencryptedRequestDataEnvelope, unixTimestamp.Length);
    payloadBytes.CopyTo(unencryptedRequestDataEnvelope, unixTimestamp.Length + nonce.Length);

    var iv = new byte[GCM_IV_LENGTH];
    rnd.NextBytes(iv);

    var encryptedPayload = new byte[unencryptedRequestDataEnvelope.Length];
    var tag = new byte[AesGcm.TagByteSizes.MaxSize];
    using AesGcm aesGcm = new AesGcm(secret);
    aesGcm.Encrypt(iv, unencryptedRequestDataEnvelope, encryptedPayload, tag);

    var envelopeMemoryStream = new MemoryStream(1 + iv.Length + encryptedPayload.Length + AesGcm.TagByteSizes.MaxSize);
    envelopeMemoryStream.WriteByte(1); //version of the envelope format
    envelopeMemoryStream.Write(iv);
    envelopeMemoryStream.Write(encryptedPayload);
    envelopeMemoryStream.Write(tag);
    var envelope = Convert.ToBase64String(envelopeMemoryStream.ToArray());

    request.Content = new StringContent(envelope, Encoding.UTF8);

    var client = new HttpClient();
    response = await client.SendAsync(request);
}

var responseStream = await response.Content.ReadAsStreamAsync();
using var reader = new StreamReader(responseStream);

var responseBody = await reader.ReadToEndAsync();

if (response.StatusCode != HttpStatusCode.OK)
{
    Console.WriteLine($"Response: Error HTTP status code {(int)response.StatusCode}" + ((response.StatusCode == HttpStatusCode.Unauthorized) ? ", check api_key" : ""));
    Console.WriteLine(responseBody);
}
else
{
    var encryptedResponseEnvelope = Convert.FromBase64String(responseBody);

    var responseMemoryStream = new MemoryStream(encryptedResponseEnvelope);
    byte[] iv = new byte[GCM_IV_LENGTH];
    responseMemoryStream.Read(iv);

    int encryptedPayloadLength = encryptedResponseEnvelope.Length - GCM_IV_LENGTH - AesGcm.TagByteSizes.MaxSize;
    byte[] encryptedPayload = new byte[encryptedPayloadLength];
    responseMemoryStream.Read(encryptedPayload);

    byte[] tag = new byte[AesGcm.TagByteSizes.MaxSize];
    responseMemoryStream.Read(tag);

    using AesGcm aesGcm = new AesGcm(secret);
    byte[] unencryptedResponseDataEnvelope = new byte[encryptedPayload.Length];
    aesGcm.Decrypt(iv, encryptedPayload, tag, unencryptedResponseDataEnvelope);

    int offset = isRefresh ? 0 : 16; //8 bytes for timestamp + 8 bytes for nonce
    var json = Encoding.UTF8.GetString(unencryptedResponseDataEnvelope, offset, unencryptedResponseDataEnvelope.Length - offset);

    Console.WriteLine("Response JSON:");
    
    using var jDoc = JsonDocument.Parse(json);
    Console.WriteLine(JsonSerializer.Serialize(jDoc, new JsonSerializerOptions { WriteIndented = true }));
}
```
</TabItem>
</Tabs>
