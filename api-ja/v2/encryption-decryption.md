[UID2 API Documentation](../../README.md) > [v2](./README.md) > Encrypting Requests and Decrypting Responses

# Encrypting Requests and Decrypting Responses

すべての UID2 [エンドポイント](./endpoints/README.md) は、リクエストの [暗号化](#encrypting-requests) とそれぞれのレスポンスの [復号化](#decrypting-responses) を必要とします。

> NOTE: [POST /token/refresh](./endpoints/post-token-refresh.md) リクエストは暗号化を必要としません。

UID2 API リクエストの暗号化と各レスポンスの復号化について知っておく必要があるのは、以下の通りです:

- API を使用するには、クライアントの API キーに加えて、クライアントシークレットが必要です。
- 独自のカスタムスクリプトを作成するか、以下のセクションで提供される Python スクリプトを使用することができます。
- リクエストとレスポンスには、96 ビットの初期化ベクトルと 128 ビットの認証タグを持つ AES/GCM/NoPadding 暗号化アルゴリズムが使用されます。
- リクエストの生の暗号化されていない JSON ボディは、バイナリの　[暗号化前リクエストデータエンベロープ](#unencrypted-request-data-envelope) にラップされ、その後 [暗号化リクエストエンべローブ](#encrypted-request-envelope) に従って暗号化とフォーマットが行われます。
- レスポンス JSON ボディはバイナリの　[復号化済みレスポンスデータエンベロープ](#unencrypted-response-data-envelope) にラップされ、[暗号化レスポンスエンベロープ](#encrypted-response-envelope) に従って暗号化・整形されます。

## Workflow

UID2 API のハイレベルなリクエスト・レスポンスワークフローは、以下のステップです:

1. 入力パラメータを含むリクエストボディを JSON 形式で用意します。
2. リクエスト JSON を[暗号化前リクエストデータエンベロープ](#unencrypted-request-data-envelope) でラップします。
3. AES/GCM/NoPadding アルゴリズムと秘密鍵でエンベロープを暗号化します。
4. [暗号化リクエストエンべローブ](#encrypted-request-envelope)を組み立てます。
5. 暗号化されたリクエストを送信し、暗号化されたレスポンスを受信します。
6. [暗号化レスポンスエンベローブ](#encrypted-response-envelope) を解析します。
7. レスポンスエンベロープのデータを復号化します。
8. 得られた [復号化済みレスポンスデータエンベロープ](#unencrypted-response-data-envelope) を解析します。
9. （オプション、推奨）レスポンスエンベロープの nonce がリクエストエンベロープの nonce と一致することを確認します。
10. 暗号化されていないエンベロープからレスポンス JSON オブジェクトを抽出します。

[リクエストの暗号化](#example-encryption-script) と [レスポンスの復号化](#example-decryption-script) の Python サンプルスクリプトは、ステップ 2-4 と 6-10 の自動化に役立ち、アプリケーションにこれらの手順を実装する方法のリファレンスとして役に立ちます。

それぞれの UID2 [エンドポイント](./endpoints/README.md) では、それぞれの JSON ボディフォーマットの要件とパラメータを説明し、呼び出し例を含み、復号した応答を示しています。以下のセクションでは、Python による暗号化および記述スクリプトの例、フィールドレイアウトの要件、リクエストとレスポンスの例を示します。

## Encrypting Requests

リクエストを暗号化するための独自のスクリプトを作成するか、提供されている [Python サンプルスクリプト](#example-encryption-script) を使用するかのいずれかを選択することができます。独自のスクリプトを作成する場合は、[暗号化前リクエストデータエンベロープ](#unencrypted-request-data-envelope) と [暗号化リクエストエンべローブ](#encrypted-request-envelope) に記載されているフィールドレイアウト要件に必ず従ってください。

### Unencrypted Request Data Envelope

次の表は、リクエスト暗号化スクリプトのフィールドレイアウトを説明するものです。

| Offset (Bytes) | Size (Bytes) | Description                                                                                                                                                                                                                                                   |
| :------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0              | 8            | UNIX タイムスタンプ（ミリ秒単位）です。int64 のビッグエンディアンでなければなりません。                                                                                                                                                                       |
| 8              | 8            | Nonce: リプレイ攻撃から保護するために使用されるランダムな 64 ビットのデータです。対応する [復号化済みレスポンスデータエンベロープ](#unencrypted-response-data-envelope) には、レスポンスが有効とみなされるために同じ nonce 値が含まれていなければなりません。 |
| 16             | N            | UTF-8 エンコーディングでシリアライズされたリクエスト JSON ドキュメントをペイロードとします。                                                                                                                                                                  |

### Encrypted Request Envelope

次の表は、リクエスト暗号化スクリプトのフィールドレイアウトを説明するものです。

| Offset (Bytes) | Size (Bytes) | Description                                                                                                                                 |
| :------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| 0              | 1            | エンベロープフォーマットのバージョン。常に `1` でなければなりません。                                                                       |
| 1              | 12           | 96 ビットの初期化ベクトル（IV）、データ暗号化のランダム化に使用されます。                                                                   |
| 13             | N            | ペイロード（[暗号化前リクエストデータエンベロープ](#unencrypted-request-data-envelope)) は AES/GCM/NoPadding アルゴリズムで暗号化されます。 |
| 13 + N         | 16           | データの整合性を確認するために使用される 128 ビット GCM 認証タグです。                                                                      |

### Example Encryption Script

以下に、リクエストを暗号化するための Python スクリプトの例 (`encrypt_request.py`) を示します。このスクリプトは、クライアントシークレットをパラメータとして受け取ります。

```py
import base64
import os
import sys
import time
from datetime import datetime

from Crypto.Cipher import AES

secret = base64.b64decode(sys.argv[1])
payload = "".join(sys.stdin.readlines())

iv = os.urandom(12)
cipher = AES.new(secret, AES.MODE_GCM, nonce=iv)

millisec = int(time.time() * 1000)
nonce = os.urandom(8)

print(f'Request timestamp: {datetime.fromtimestamp(millisec/1000)}', file=sys.stderr)
print(f'Request nonce: {int.from_bytes(nonce, "big")}', file=sys.stderr)
print(file=sys.stderr)

body = bytearray(millisec.to_bytes(8, 'big'))
body += bytearray(nonce)
body += bytearray(bytes(payload, 'utf-8'))

ciphertext, tag = cipher.encrypt_and_digest(body)

envelope = bytearray(b'\x01')
envelope += bytearray(iv)
envelope += bytearray(ciphertext)
envelope += bytearray(tag)

print(base64.b64encode(bytes(envelope)).decode() + "\n")
```

### Request Example

たとえば、メールアドレスに対して暗号化された [POST /token/generate](./endpoints/post-token-generate.md) リクエストを送信するには、次のコマンドを実行します。

```sh
echo '{"email": "test@example.com"}' \
  | encrypt_request.py [Your-Client-Secret] \
  | curl -X POST 'https://prod.uidapi.com/v2/token/generate' -H 'Authorization: Bearer [Your-Client-API-Key]' -d @- \
  | decrypt_response.py [Your-Client-Secret] 0
```

## Decrypting Responses

応答の暗号化を解除するための独自のスクリプトを作成するか、提供されている [Python サンプルスクリプト](#example-decryption-script) を使用するかを選択することができます。独自のスクリプトを作成する場合は、[暗号化レスポンスエンベロープ](#encrypted-response-envelope) と [復号化済みレスポンスデータエンベロープ](#unencrypted-response-data-envelope) に記載したフィールド配置要件に必ず従ってください。

> NOTE: レスポンスは、サービスが HTTP ステータスコード 200 を返す場合のみ、暗号化されます。

### Encrypted Response Envelope

次の表は、応答復号化スクリプトのフィールドレイアウトを説明するものです。

| Offset (Bytes) | Size (Bytes) | Description                                                                                                                                        |
| :------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0              | 12           | 96 ビットの初期化ベクトル（IV）、データ暗号化のランダム化に使用されます。                                                                          |
|                |
| 12             | N            | ペイロード([復号化済みレスポンスデータエンベロープ](#unencrypted-response-data-envelope)) は、AES/GCM/NoPadding アルゴリズムで暗号化されています。 |
| 12 + N         | 16           | データの整合性を確認するために使用される 128 ビット GCM 認証タグ。                                                                                 |

### Unencrypted Response Data Envelope

次の表は、応答復号化スクリプトのフィールドレイアウトを説明するものです。

The following table describes the field layout for response decryption scripts.

| Offset (Bytes) | Size (Bytes) | Description                                                                                                                                                                |
| :------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0              | 8            | UNIX タイムスタンプ（ミリ秒単位）です。int64 のビッグエンディアンでなければなりません。                                                                                    |
| 8              | 8            | Nonce: レスポンスが有効であるとみなされるためには、これは [暗号化前リクエストデータエンベロープ](#unencrypted-request-data-envelope) の nonce と一致する必要があります。　 |
| 16             | N            | UTF-8 エンコーディングでシリアライズされたレスポンス JSON ドキュメントをペイロードとします。                                                                               |

### Example Decryption Script

以下は、レスポンスを復号するための Python スクリプトの例です (`decrypt_response.py`) で、以下のパラメータを受け取ります:

- クライアントシークレット
- (オプション) `--is-refresh` は、レスポンスが [POST /token/refresh](./endpoints/post-token-refresh.md) リクエストに対するものであることを表します。

IMPORTANT: レスポンスを復号するには、[POST /token/generate](./endpoints/post-token-generate.md) または `POST /token/refresh` レスポンスで、リクエストの Refresh Token を返す `refresh_response_key` 値を使用する必要があります。

```py
import base64
import json
import sys
from datetime import datetime

from Crypto.Cipher import AES

secret = base64.b64decode(sys.argv[1].strip())
is_refresh_response = 1 if len(sys.argv) > 2 and sys.argv[2] == '--is-refresh' else 0
response = "".join(sys.stdin.readlines())

print()
try:
    err_resp = json.loads(response)
    print("Error response:")
    print(json.dumps(err_resp, indent=4))
except:
    resp_bytes = base64.b64decode(response)
    iv = resp_bytes[:12]
    data = resp_bytes[12:len(resp_bytes) - 16]
    tag = resp_bytes[len(resp_bytes) - 16:]

    cipher = AES.new(secret, AES.MODE_GCM, nonce=iv)
    decrypted = cipher.decrypt_and_verify(data, tag)

    if is_refresh_response != 1:
        tm = datetime.fromtimestamp(int.from_bytes(decrypted[:8], 'big') / 1000)
        print(f'Response timestamp: {tm}')
        nonce = int.from_bytes(decrypted[8:16], 'big')
        print(f'Response nonce: {nonce}')
        json_resp = json.loads(decrypted[16:].decode("utf-8"))
    else:
        json_resp = json.loads(decrypted.decode("utf-8"))
    print("Response JSON:")
    print(json.dumps(json_resp, indent=4))
    print()
```

### Response Example

例えば、[先行例](#request-example) のメールアドレスに対する [POST /token/generate](./endpoints/post-token-generate.md) リクエストに対する復号されたレスポンスは、次のようになることが考えられます:

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
