[UID2 API Documentation](../../README.md) > [v2](./README.md) > Generating Requests

# Encryption and Decryption

All UID2 [endpoints](./endpoints/README.md), except [POST /token/refresh](./endpoints/post-token-refresh.md), require a client `secret` for [encrypting](#encrypting-requests) API requests and [decrypting](#decrypting-responses) responses.

Here's what you need to know about ecrypting UID2 API requests:

- They use the GCM(AES/GCM/NoPadding) encryption algorithm using 96-bit IV and 128-bit AuthTag.
- IV and encrypted payload is included in the `encrypted_body` field as base64-encoded string.
- A `nonce` field is included into the 1st-level dict of the request as a random value to protect against replay attack.

## Encrypting Requests

Here's an example Python script for generating requests, which takes the client `secret` as parameter.

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

TBD
Here's an example Python script for generating requests, which takes the client `secret` as parameter.

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
