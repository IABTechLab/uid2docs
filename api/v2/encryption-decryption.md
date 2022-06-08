[UID2 API Documentation](../../README.md) > [v2](./README.md) > Encrypting Requests and Decrypting Responses

# Encrypting Requests and Decrypting Responses

All UID2 [endpoints](./endpoints/README.md) require request [encryption](#encrypting-requests) and respective response [decryption](#decrypting-responses). 

>NOTE: [POST /token/refresh](./endpoints/post-token-refresh.md) requests do not require encryption.

Here's what you need to know about encrypting UID2 API requests and decrypting respective responses:

- In addition to your client API key, you need your client `secret`.
- You can write your own custom scripts or use the Python scripts provided in the following sections.
- With the GCM(AES/GCM/NoPadding) encryption algorithm using 96-bit IV and 128-bit AuthTag utilized, all requests must contain the following:
  - A version, IV, encrypted payload and auth tag as base64-encoded string. For field layout details, see [Binary Encrypted Envelope](#binary-encrypted-envelope).
  - A `nonce` field is included in the 1st-level dict of both requests and responses as a random value to protect against replay attack.
  - A timestamp.
- For field layout details for decrypting responses, see [Binary Unencrypted Envelope](#binary-unencrypted-envelope).

## Workflow

The high-level request-response workflow for the UID2 APIs includes the following steps:

1. Prepare the request body with input parameters in the JSON format.
2. Run a script to create an encrypted payload from the JSON body.
3. Send the encrypted request.
4. Run another script to decrypt the returned response to to plain JSON.

Individual [endpoints](./endpoints/README.md) explain the respective format requirements and parameters, include call examples, and show decrypted responses. The following sections  provide examples of the encryption and descriptions scripts in Python as well as request and response examples.. 

## Encrypting Requests

You have the option of writing your own script for encrypting requests or using the provided [Python example script](#example-encryption-script). If you choose to write your own script, be sure to follow the field layout requirements listed in [Binary Encrypted Envelope](#binary-encrypted-envelope).

### Binary Encrypted Envelope

The following table describes the field layout for request encryption scripts.

| Byte | Description TBD Value? | Comments |
| :--- | :--- | :--- |
| 1st byte | version (==1) |  |
| byte[12] | iv | Initialization vector, which is used to randomize data encryption. |
| byte[enc_payload_len] | Binary Encrypted Payload | AES (`client_secret`, Binary Unencrypted Envelope) |
| byte[16] | GCM authentication tag | This tag is used to verify the integrity of data. |

### Example Encryption Script

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
### Request Example

For example, to send an encrypted [POST /token/generate](./endpoints/post-token-generate.md) request for an email address, you can run the following command.

```sh
echo '{"email": "test@example.com"}' \
  | encrypt_request.py DELPabG/hsJsZk4Xm9Xr10Wb8qoKarg4ochUdY9e+Ow= \
  | curl -X POST 'https://prod.uidapi.com/v2/token/generate' -H 'Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=' \
  | decrypt_response.py DELPabG/hsJsZk4Xm9Xr10Wb8qoKarg4ochUdY9e+Ow= 0
```

## Decrypting Responses

You have the option of writing your own script for decrypting responses or using the provided [Python example script](#example-decryption-script). If you choose to write your own script, be sure to follow the field layout requirements listed in [Binary Unencrypted Envelope](#binary-unencrypted-envelope).


### Binary Unencrypted Envelope

The following table describes the field layout for response decryption scripts.

| Byte | Description | Comments |
| :--- | :--- | :--- |
| byte[8] | timestamp unix epoch seconds |  |
| byte[8] | nonce |  |
| byte[json_payload_len] | Unencrypted Json Payload |  |

### Example Decryption Script

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
### Response Example

For example, a decrypted response to the [POST /token/generate](./endpoints/post-token-generate.md) request for an email address in the [preceding example](#request-example), may look like this:

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
