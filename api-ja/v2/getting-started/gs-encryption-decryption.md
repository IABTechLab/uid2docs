[UID2 Overview](../../../README-ja.md) > [Getting Started](../../README.md) > [v2](../summary-doc-v2.md) > Encrypting Requests and Decrypting Responses

# Encrypting Requests and Decrypting Responses

すべての UID2 [エンドポイント](../endpoints/summary-endpoints.md) は、リクエストの [暗号化](#encrypting-requests) とそれぞれのレスポンスの [復号化](#decrypting-responses) を必要とします。

> NOTE: [POST /token/refresh](../endpoints/post-token-refresh.md) リクエストは暗号化を必要としません。

UID2 API リクエストの暗号化と各レスポンスの復号化について知っておく必要があるのは、以下のとおりです:

- API を使用するには、クライアントの API キーに加えて、クライアントシークレットが必要です。
- 独自のカスタムスクリプトを作成するか、以下のセクションで提供される Python スクリプトを使用できます。
- リクエストとレスポンスには、96 ビットの初期化ベクトルと 128 ビットの認証タグを持つ AES/GCM/NoPadding 暗号化アルゴリズムが使用されます。
- リクエストの生の暗号化されていない JSON ボディは、バイナリの　[暗号化前リクエストデータエンベローブ](#unencrypted-request-data-envelope) にラップされ、その後 [暗号化リクエストエンベローブ](#encrypted-request-envelope) にしたがって暗号化とフォーマットが行われます。
- レスポンス JSON ボディはバイナリの　[復号化済みレスポンスデータエンベローブ](#unencrypted-response-data-envelope) にラップされ、[暗号化レスポンスエンベローブ](#encrypted-response-envelope) にしたがって暗号化・整形されます。

## Workflow

UID2 API のハイレベルなリクエスト・レスポンスワークフローは、以下のステップです:

1. 入力パラメータを含むリクエストボディを JSON 形式で用意します。
2. リクエスト JSON を[暗号化前リクエストデータエンベローブ](#unencrypted-request-data-envelope) でラップします。
3. AES/GCM/NoPadding アルゴリズムと秘密鍵でエンベローブを暗号化します。
4. [暗号化リクエストエンベローブ](#encrypted-request-envelope)を組み立てます。
5. 暗号化されたリクエストを送信し、暗号化されたレスポンスを受信します。
6. [暗号化レスポンスエンベローブ](#encrypted-response-envelope) を解析します。
7. レスポンスエンベローブのデータを復号化します。
8. 得られた [復号化済みレスポンスデータエンベローブ](#unencrypted-response-data-envelope) を解析します。
9. （オプション、推奨）レスポンスエンベローブの nonce がリクエストエンベローブの nonce と一致することを確認します。
10. 暗号化されていないエンベローブからレスポンス JSON オブジェクトを抽出します。

[リクエストの暗号化とレスポンスの復号化](#example-encryption-and-decryption-script)の Python サンプルスクリプトは、ステップ2〜10の自動化に役立ち、アプリケーションにこれらのステップを実装する方法の参考となります。

それぞれの UID2 [エンドポイント](../endpoints/summary-endpoints.md) では、それぞれの JSON ボディフォーマットの要件とパラメータを説明し、呼び出し例を含み、復号した応答を示しています。以下のセクションでは、Python による暗号化および記述スクリプトの例、フィールドレイアウトの要件、リクエストとレスポンスの例を示します。

## Encrypting Requests

リクエストを暗号化するための独自のスクリプトを作成するか、UID2 SDK を使用するか、提供されている[Pythonサンプルスクリプト](#example-encryption-and-decryption-script)を使用するかを選択できます。独自のスクリプトを作成する場合は、[暗号化前リクエストデータエンベローブ](#unencrypted-request-data-envelope)および[暗号化リクエストエンベローブ](#encrypted-request-envelope)に記載のフィールドレイアウト要件に必ずしたがってください。

### Unencrypted Request Data Envelope

次の表は、リクエスト暗号化スクリプトのフィールドレイアウトを説明するものです。

| Offset (Bytes) | Size (Bytes) | Description                                                                                                                                                                                                                                                   |
| :------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0              | 8            | UNIX タイムスタンプ（ミリ秒単位）です。int64 のビッグエンディアンでなければなりません。                                                                                                                                                                       |
| 8              | 8            | Nonce: リプレイ攻撃から保護するために使用されるランダムな 64 ビットのデータです。対応する [復号化済みレスポンスデータエンベローブ](#unencrypted-response-data-envelope) には、レスポンスが有効とみなされるために同じ nonce 値が含まれていなければなりません。 |
| 16             | N            | UTF-8 エンコーディングでシリアライズされたリクエスト JSON ドキュメントをペイロードとします。                                                                                                                                                                  |

### Encrypted Request Envelope

次の表は、リクエスト暗号化スクリプトのフィールドレイアウトを説明するものです。

| Offset (Bytes) | Size (Bytes) | Description                                                                                                                                 |
| :------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| 0              | 1            | エンベローブフォーマットのバージョン。常に `1` でなければなりません。                                                                       |
| 1              | 12           | 96 ビットの初期化ベクトル（IV）、データ暗号化のランダム化に使用されます。                                                                   |
| 13             | N            | ペイロード([暗号化前リクエストデータエンベローブ](#unencrypted-request-data-envelope)) は AES/GCM/NoPadding アルゴリズムで暗号化されます。 |
| 13 + N         | 16           | データの整合性を確認するために使用される 128 ビット GCM 認証タグです。                                                                      |

## Decrypting Responses

レスポンスを復号化するスクリプトを独自に作成するか、UID2 SDK を使用するか、提供されている [Python サンプルスクリプト](#example-encryption-and-decryption-script) を使用するかを選択できます。独自のスクリプトを作成する場合は、[暗号化前リクエストデータエンベローブ](#encrypted-response-envelope)および[復号化済みレスポンスデータエンベローブ](#unencrypted-response-data-envelope)に記載のフィールドレイアウト要件に必ずしたがってください。

> NOTE: レスポンスは、サービスが HTTP ステータスコード 200 を返す場合のみ、暗号化されます。

### Encrypted Response Envelope

次の表は、応答復号化スクリプトのフィールドレイアウトを説明するものです。

| Offset (Bytes) | Size (Bytes) | Description                                                                                                                                        |
| :------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0              | 12           | 96 ビットの初期化ベクトル（IV）、データ暗号化のランダム化に使用されます。                                                                          |
| 12             | N            | ペイロード([復号化済みレスポンスデータエンベローブ](#unencrypted-response-data-envelope)) は、AES/GCM/NoPadding アルゴリズムで暗号化されています。 |
| 12 + N         | 16           | データの整合性を確認するために使用される 128 ビット GCM 認証タグ。                                                                                 |

### Unencrypted Response Data Envelope

次の表は、応答復号化スクリプトのフィールドレイアウトを説明するものです。

The following table describes the field layout for response decryption scripts.

| Offset (Bytes) | Size (Bytes) | Description                                                                                                                                                                |
| :------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0              | 8            | UNIX タイムスタンプ（ミリ秒単位）です。int64 のビッグエンディアンでなければなりません。                                                                                    |
| 8              | 8            | Nonce: レスポンスが有効であるとみなされるためには、これは [暗号化前リクエストデータエンベローブ](#unencrypted-request-data-envelope) の nonce と一致する必要があります。　 |
| 16             | N            | UTF-8 エンコーディングでシリアライズされたレスポンス JSON ドキュメントをペイロードとします。                                                                               |

### Response Example

たとえば、[先行例](#request-example) のメールアドレスに対する [POST /token/generate](../endpoints/post-token-generate.md) リクエストに対する復号されたレスポンスは、次のようになることが考えられます:

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

## Example Encryption and Decryption Script

リクエストを暗号化し、レスポンスを復号化するための Python スクリプト (`uid2_request.py`) の例を以下に示します。必要なパラメータはスクリプトの先頭に記載されています。また、`python3 uid2_request.py` を実行することでも確認できます。
>Windowsの場合は、`python3`を`python`に置き換えてください。PowerShellの代わりにWindowsコマンドプロンプトを使用する場合は、JSONを囲むシングルクォートも削除する必要があります（たとえば、`echo {"email": "test@example.com"}` を使用します）。

[POST /token/refresh](../endpoints/post-token-refresh.md) エンドポイントでは、スクリプトは `refresh_token` と `refresh_response_key` に、事前に [POST /token/generate](../endpoints/post-token-generate.md) または [POST /token/refresh](../endpoints/post-token-refresh.md) で取得した値を使用します。

### Prerequisites
このスクリプトは `pycryptodomex` と `requests` パッケージを必要とします。これらは以下の手順でインストールできます：
```console
pip install pycryptodomex
pip install requests
```

#### uid2_request.py
```py
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