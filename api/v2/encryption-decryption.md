[UID2 API Documentation](../../README.md) > [v2](./README.md) > Generating Requests

# Encryption and Decryption

All UID2 [endpoints](./endpoints/README.md) require a client `secret` for [encrypting](#encrypting-requests) API requests and [decrypting](#decrypting-responses) responses. Only [POST /token/refresh](./endpoints/post-token-refresh.md) requests do not require encryption.

Here's what you need to know about ecrypting UID2 API requests:

- They use the GCM(AES/GCM/NoPadding) encryption algorithm using 96-bit IV and 128-bit AuthTag.
- IV and encrypted payload is included in the `encrypted_body` field as base64-encoded string.
- A `nonce` field is included in the 1st-level dict of both requests and responses as a random value to protect against replay attack.

### Binary Encrypted Envelope

| Byte | Description | Comments |
| :--- | :--- | :--- |
| 1st byte | version (==1) |  |
| byte[12] | iv |  |
| byte[enc_payload_len] | Binary Encrypted Payload | AES (`client_secret`, Binary Unencrypted Envelope) |
| byte[16] | HMACSHA1 base64-encoded signature | For details on HMACSHA1 encoding, see [Microsoft documentation](https://docs.microsoft.com/en-us/dotnet/api/system.security.cryptography.hmacsha1?redirectedfrom=MSDN&view=netcore-3.1). |


## Encrypting Requests

Here's an example Python script (`encrypt_request.py`) for encrypting requests, which takes the client `secret` as a parameter:

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
print(f'Timestamp: {datetime.fromtimestamp(millisec/1000)}\n')

nonce = os.urandom(8)
print(f'nonce: {int.from_bytes(nonce, "big")}\n')

body = bytearray(millisec.to_bytes(8, 'big'))
body += bytearray(nonce)
body += bytearray(bytes(payload, 'utf-8'))

ciphertext, tag = cipher.encrypt_and_digest(body)

envelop = bytearray(b'\x01')
envelop += bytearray(iv)
envelop += bytearray(ciphertext)
envelop += bytearray(tag)

print("Request body:")
print(base64.b64encode(bytes(envelop)).decode())
print()
```
## Decrypting Responses

Here's an example Python script (`decrypt_response.py`) for decrypting responses, which takes the following parameters:

- The client `secret`
- An integer `0` or `1`, which indicates whether the response is for a token refresh request

```py
import base64
import json
import sys
from datetime import datetime

from Crypto.Cipher import AES

secret = base64.b64decode(sys.argv[1].strip())
is_refresh_response = int(sys.argv[2])
response = "".join(sys.stdin.readlines())

resp_bytes = base64.b64decode(response)

iv = resp_bytes[:12]
data = resp_bytes[12:len(resp_bytes) - 16]
tag = resp_bytes[len(resp_bytes) - 16:]

cipher = AES.new(secret, AES.MODE_GCM, nonce=iv)
decrypted = cipher.decrypt_and_verify(data, tag)

print()
if is_refresh_response != 1:
    tm = datetime.fromtimestamp(int.from_bytes(decrypted[:8], 'big') / 1000)
    print(f'Timestamp: {tm}')
    nonce = int.from_bytes(decrypted[8:16], 'big')
    print(f'Nonce: {nonce}')
    json_resp = json.loads(decrypted[16:].decode("utf-8"))
else:
    json_resp = json.loads(decrypted.decode("utf-8"))
print("Response JSON:")
print(json.dumps(json_resp, indent=4))
print()
```
