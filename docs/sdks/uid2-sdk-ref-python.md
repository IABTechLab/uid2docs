---
title: UID2 SDK for Python
description: Reference information about the Python server-side SDK.
hide_table_of_contents: false
sidebar_position: 06
---

import Link from '@docusaurus/Link';

# UID2 SDK for Python Reference Guide

You can use the UID2 SDK for Python on the server side to facilitate the following:

- Generating UID2 advertising tokens
- Refreshing UID2 advertising tokens
- Encrypting raw UID2s to create UID2 tokens
- Decrypting UID2 advertising tokens to access the raw UID2s

<!--
 This guide includes the following information:

- [Overview](#overview)
- [Functionality](#functionality)
- [API Permissions](#api-permissions)
- [Version](#version)
- [GitHub Repository/Package](#github-repositorypackage)
- [Initialization](#initialization)
- [Interface](#interface)
  - [Response Content](#response-content)
  - [Response Statuses](#response-statuses)
- [FAQs](#faqs)
- [Usage for Publishers](#usage-for-publishers) 
- [Usage for UID2 Sharers](#usage-for-uid2-sharers) 
-->

## Overview

The functions outlined here define the information that you'll need to configure or can retrieve from the library. The parameters and property names defined below are pseudocode. Actual parameters and property names vary by language but will be similar to the information outlined here.

## Functionality

This SDK simplifies integration with UID2 for any DSPs or UID2 sharers who are using Python for their server-side coding. The following table shows the functions it supports.

| Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token | Generate UID2 Token from DII | Refresh UID2 Token |
| :--- | :--- | :--- | :--- |
| Supported | Supported | Supported | Supported |

## API Permissions

To use this SDK, you'll need to complete the UID2 account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page.

You'll be granted permission to use specific functions offered by the SDK, and given credentials for that access. Bear in mind that there might be functions in the SDK that you don't have permission to use. For example, publishers get a specific API permission to generate and refresh tokens, but the SDK might support other activities, such as sharing, which require a different API permission.

For details, see [API Permissions](../getting-started/gs-permissions.md).

## Version

The SDK supports Python 3.6 and above.

## GitHub Repository/Package

This SDK is in the following open-source GitHub repository:

- [UID2 SDK for Python](https://github.com/IABTechLab/uid2-client-python/blob/master/README.md)

The package is published in this location:

- [https://pypi.org/project/uid2-client/](https://pypi.org/project/uid2-client/)

## Initialization

The initialization function configures the parameters necessary for the SDK to authenticate with the UID2 service. It also allows you to configure retry intervals in the event of errors.

| Parameter | Description | Recommended Value |
| :--- | :--- | :--- |
| `endpoint` | The endpoint for the UID2 service. | N/A |
| `authKey` | The authentication token that belongs to the client. For access to UID2, see [Contact Info](../getting-started/gs-account-setup.md#contact-info). | N/A |

## Interface 

The interface allows you to decrypt UID2 advertising tokens and return the corresponding raw UID2. 

>NOTE: When you use an SDK, you do not need to store or manage decryption keys.

If you're a DSP, for bidding, call the interface to decrypt a UID2 advertising token and return the UID2. For details on the bidding logic for handling user opt-outs, see [DSP Integration Guide](../guides/dsp-guide.md).

The following is the decrypt method in Python:

```py
from uid2_client import Uid2ClientFactory
 
client = Uid2ClientFactory.create('https://prod.uidapi.com', 'my-auth-token', 'my-secret-key')
client.refresh_keys() # Note that refresh_keys() should be called once after create(), and then once per hour
decrypted_token = client.decrypt(advertising_token)
```

### Response Content

Available information returned through the SDK is outlined in the following table.

| Instance Variable | Description |
| :--- | :--- |
| `uid2` | The raw UID2 for the corresponding UID2 advertising token. |
| `established` | The timestamp indicating when a user first established the UID2 with the publisher. |

>NOTE: If there is a decryption failure, an `EncryptionError` exception is raised.

### Response Statuses

| Value | Description |
| :--- | :--- |
| `Success` | The UID2 advertising token was decrypted successfully and a raw UID2 was returned. |
| `NotAuthorizedForKey` | The requester does not have authorization to decrypt this UID2 advertising token.|
| `NotInitialized` | The client library is waiting to be initialized. |
| `InvalidPayload` | The incoming UID2 advertising token is not a valid payload. |
| `ExpiredToken` | The incoming UID2 advertising token has expired. |
| `KeysNotSynced` | The client has failed to synchronize keys from the UID2 service. |
| `VersionNotSupported` |  The client library does not support the version of the encrypted token. |

## Usage for Publishers

1. Create an instance of Uid2PublisherClient:
   ```py
   client = Uid2PublisherClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY)
   ```
2. Call a function that takes the user's email address or phone number as input and generates a `TokenGenerateResponse` object. The following example uses an email address:

   ```py
   token_generate_response = client.generate_token(TokenGenerateInput.from_email(emailAddress).do_not_generate_tokens_for_opted_out())
   ```

      :::important
      Be sure to call this function only when you have obtained legal basis to convert the user’s <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> to UID2 tokens for targeted advertising.
      :::

 `do_not_generate_tokens_for_opted_out()` applies `optout_check=1` in the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) call. Without this, `optout_check` is omitted to maintain backwards compatibility.

#### Client-Server Integration

If you're using client-server integration (see [Server-Side Integration Guide for JavaScript](../guides/integration-javascript-server-side.md)), follow this step:

* Send this identity as a JSON string back to the client (to use in the [identity field](../sdks/client-side-identity.md#initopts-object-void)) using the following:

  ```py
  token_generate_response.get_identity_json_string()
  ```

  :::note
  If the user has opted out, this method returns None, so be sure to handle that case.
  :::

### Server-Only Integration

If you're using server-only integration (see [Publisher Integration Guide, Server-Only](../guides/custom-publisher-integration.md)):

1. Store this identity as a JSON string in the user's session, using the `token_generate_response.get_identity_json_string()` function.

   If the user has opted out, this method returns `None`, so be sure to handle that case.
2. To retrieve the user's UID2 token, use the following:

   ```py
   identity = token_generate_response.get_identity()
   if identity:
      advertising_token = identity.get_advertising_token()
   ```
3. Periodically check if the user's UID2 token should be refreshed. This can be done at fixed intervals using a timer, or can be done whenever the user accesses another page:
   1. Retrieve the identity JSON string from the user's session, and then call the following function that takes the identity information as input and generates an `IdentityTokens` object:

      ```py
      identity = IdentityTokens.from_json_string(identityJsonString)
      ```

   2. Determine if the identity can be refreshed (that is, the refresh token hasn't expired):

      ```py
      if not identity or not identity.is_refreshable(): # we must no longer use this identity (for example, remove this identity from the user's session) 
      ```

   3. Determine if a refresh is needed:

      ```py
      if identity.is_due_for_refresh()):
      ```

4. If needed, refresh the token and associated values:

   ```py
   token_refresh_response = client.refresh_token(identity)`
   ```

5. Store `token_refresh_response.get_identity_json_string()` in the user's session.

   If the user has opted out, this method returns `None`, indicating that the user's identity should be removed from the session. To confirm optout, you can use the `token_refresh_response.is_optout()` function.

## Usage for UID2 Sharers

A UID2 sharer is any participant that wants to share UID2s with another participant. Raw UID2s must be encrypted into UID2 tokens before sending them to another participant. For an example of usage, see [examples/sample_sharing.py](https://github.com/IABTechLab/uid2-client-python/blob/master/examples/sample_sharing.py) script.

>IMPORTANT: The UID2 token generated during this process is for sharing only&#8212;you cannot use it in the bid stream. There is a different workflow for generating tokens for the bid stream: see [Tokenized Sharing in the Bid Stream](../sharing/sharing-tokenized-from-data-bid-stream.md).

The following instructions provide an example of how you can implement sharing using the UID2 SDK for Python, either as a sender or a receiver.

1. Create a `UID2Client` reference:
 
   ```py
   from uid2_client import Uid2ClientFactory
   client = Uid2ClientFactory.create(base_url, auth_key, secret_key)
   ```

2. Refresh once at startup, and then periodically (recommended refresh interval is hourly):

   ```py
   client.refresh_keys()
   ```

3. Senders: 
   1. Call the `encrypt` function. Then, if encryption succeeded, send the UID2 token to the receiver:

      ```py
      try:
         encrypted_data = client.encrypt(raw_uid)
         # send encrypted_data to receiver
      except EncryptionError as err:
        # check for failure reason
        print(err)
      ```

4. Receivers:
   1. Call the `decrypt` function. Then, if decryption succeeded, use the raw UID2:
    
      ```py
      try:
        result = client.decrypt(ad_token)
        # use successfully decrypted result.uid2
      except EncryptionError as err:
        # check for failure reason
        print(err)
      ```

## FAQs

For a list of frequently asked questions for DSPs, see [FAQs for DSPs](../getting-started/gs-faqs.md#faqs-for-dsps).
