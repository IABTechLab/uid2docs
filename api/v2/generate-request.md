[UID2 API Documentation](../../README.md) > [v2](../README.md) > Generating Requests

# Generating Requests

All UID2 [endpoints](./endpoints/README.md), except [POST /token/refresh](./endpoints/post-token-refresh.md), require client `secret` for generate API requests.

Here's what you need to know about ecrypting UID2 API requests:

- They use the GCM(AES/GCM/NoPadding) encryption algorithm using 96-bit IV and 128-bit AuthTag.
- IV and encrypted payload is included in the `encrypted_body` field as base64-encoded string.
- A `nonce` field is included into the 1st-level dict of the request as a random value to protect against replay attack.

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
