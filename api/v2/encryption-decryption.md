[UID2 Overview](../../../README.md) > [Getting Started](../../README.md) > [v2](./README.md) > Encrypting Requests and Decrypting Responses

# Encrypting Requests and Decrypting Responses

All UID2 [endpoints](./endpoints/README.md) require request [encryption](#encrypting-requests) and respective response [decryption](#decrypting-responses). 

>NOTE: [POST /token/refresh](./endpoints/post-token-refresh.md) requests do not require encryption.

Here's what you need to know about encrypting UID2 API requests and decrypting respective responses:

- To use the APIs, in addition to your client API key, you need your client secret
- You can write your own custom scripts or use the Python scripts provided in the following sections.
- Request and response use AES/GCM/NoPadding encryption algorithm with 96-bit initialization vector and 128-bit authentication tag.
- The raw, unencrypted JSON body of the request is wrapped in a binary [Unencrypted Request Data Envelope](#unencrypted-request-data-envelope) which then gets encrypted and formatted according to the [Encrypted Request Envelope](#encrypted-request-envelope).
- Response JSON body is wrapped in a binary [Unencrypted Response Data Envelope](#unencrypted-response-data-envelope) which is encrypted and formatted according to the [Encrypted Response Envelope](#encrypted-response-envelope).

## Workflow

The high-level request-response workflow for the UID2 APIs includes the following steps:

1. Prepare the request body with input parameters in the JSON format.
2. Wrap the request JSON in an [Unencrypted Request Data Envelope](#unencrypted-request-data-envelope).
3. Encrypt the envelope using AES/GCM/NoPadding algorithm and your secret key.
4. Assemble the [Encrypted Request Envelope](#encrypted-request-envelope).
5. Send the encrypted request and receive the encrypted response.
6. Parse the [Encrypted Response Envelope](#encrypted-response-envelope).
7. Decrypt the data in the response envelope.
8. Parse the resulting [Unencrypted Response Data Envelope](#unencrypted-response-data-envelope).
9. (Optional, recommended) Ensure the nonce the in the response envelope matches the nonce in the request envelope.
10. Extract the response JSON object from the unencrypted envelope.

Python example scripts for [encrypting requests](#example-encryption-script) and [decrypting responses](#example-decryption-script) can help with automating steps 2-4 and 6-10 and serve as a reference of how to implement these steps in your application.

The individual UID2 [endpoints](./endpoints/README.md) explain the respective JSON body format requirements and parameters, include call examples, and show decrypted responses. The following sections provide examples of the encryption and descriptions scripts in Python, field layout requirements as well as request and response examples. 

## Encrypting Requests

You have the option of writing your own script for encrypting requests or using the provided [Python example script](#example-encryption-script). If you choose to write your own script, be sure to follow the field layout requirements listed in [Unencrypted Request Data Envelope](#unencrypted-request-data-envelope) and [Encrypted Request Envelope](#encrypted-request-envelope).

### Unencrypted Request Data Envelope

The following table describes the field layout for request encryption scripts.

| Offset (Bytes) | Size (Bytes) | Description |
| :--- | :--- | :--- |
| 0 | 8 | The UNIX timestamp (in milliseconds). Must be int64 big endian. |
| 8 | 8 | Nonce: random 64 bits of data used to protect against replay attacks. The corresponding [Unencrypted Response Data Envelope](#unencrypted-response-data-envelope) should contain the same nonce value for the response to be considered valid. |
| 16 | N | Payload, which is a request JSON document serialized in UTF-8 encoding. |

### Encrypted Request Envelope

The following table describes the field layout for request encryption scripts.

| Offset (Bytes) | Size (Bytes) | Description |
| :--- | :--- | :--- |
| 0 | 1 | The version of the envelope format. Must be always `1`. |
| 1 | 12 | 96-bit initialization vector (IV), which is used to randomize data encryption. |
| 13 | N | Payload ([Unencrypted Request Data Envelope](#unencrypted-request-data-envelope)) encrypted using the AES/GCM/NoPadding algorithm. |
| 13 + N | 16 | 128-bit GCM authentication tag used to verify data integrity. |

### Example Encryption Script

Here's an example Python script (`encrypt_request.py`) for encrypting requests, which takes the client secret as a parameter:

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

For example, to send an encrypted [POST /token/generate](./endpoints/post-token-generate.md) request for an email address, you can run the following command.

```sh
echo '{"email": "test@example.com"}' \
  | encrypt_request.py [Your-Client-Secret] \
  | curl -X POST 'https://prod.uidapi.com/v2/token/generate' -H 'Authorization: Bearer [Your-Client-API-Key]' -d @- \
  | decrypt_response.py [Your-Client-Secret] 0
```

## Decrypting Responses

You have the option of writing your own script for decrypting responses or using the provided [Python example script](#example-decryption-script). If you choose to write your own script, be sure to follow the field layout requirements listed in [Encrypted Response Envelope](#encrypted-response-envelope) and [Unencrypted Response Data Envelope](#unencrypted-response-data-envelope).

>NOTE: Response is encrypted only if the service returns HTTP status code 200.

### Encrypted Response Envelope

The following table describes the field layout for response decryption scripts.

| Offset (Bytes) | Size (Bytes) | Description |
| :--- | :--- | :--- |
| 0 | 12 | 96-bit initialization vector (IV), which is used to randomize data encryption. |
| 12 | N | Payload ([Unencrypted Response Data Envelope](#unencrypted-response-data-envelope)) encrypted using the AES/GCM/NoPadding algorithm. |
| 12 + N | 16 | 128-bit GCM authentication tag used to verify data integrity. |

### Unencrypted Response Data Envelope

The following table describes the field layout for response decryption scripts.

| Offset (Bytes) | Size (Bytes) | Description |
| :--- | :--- | :--- |
| 0 | 8 | The UNIX timestamp (in milliseconds). Must be int64 big endian. |
| 8 | 8 | Nonce. For the response to be considered valid, this should match the nonce in the [Unencrypted Request Data Envelope](#unencrypted-request-data-envelope). |
| 16 | N | Payload, which is a response JSON document serialized in UTF-8 encoding. |

### Example Decryption Script

Here's an example Python script (`decrypt_response.py`) for decrypting responses, which takes the following parameters:

- The client secret
- (Optional) `--is-refresh` to indicate that the response is for a [POST /token/refresh](./endpoints/post-token-refresh.md) request

>IMPORTANT: To decrypt responses, you need to use the `refresh_response_key` value returned in the [POST /token/generate](./endpoints/post-token-generate.md) or `POST /token/refresh` response from which the refresh token in the request is returned.

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
