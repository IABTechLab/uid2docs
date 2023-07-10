---
title: UID2 SDK for Python
description: Reference information about the Python server-side SDK.
hide_table_of_contents: false
sidebar_position: 06
---

# UID2 SDK for Python (Server-Side) Reference Guide

You can use UID2 server-side SDKs to facilitate decrypting of UID2 tokens to access the raw UID2. 

<!-- This guide includes the following information:

- [Overview](#overview)
- [Functionality](#functionality)
- [Initialization](#initialization)
- [Interface](#interface)
  - [Response Content](#response-content)
  - [Response Statuses](#response-statuses)
- [FAQs](#faqs)
- [Usage for UID2 Sharers](#usage-for-uid2-sharers) -->

## Overview

The functions outlined here define the information that you'll need to configure or can retrieve from the library. The parameters and property names defined below are pseudocode. Actual parameters and property names vary by language but will be similar to the information outlined here.

## Functionality

This SDK simplifies integration with UID2 for any DSPs or UID2 sharers who are using Python for their server-side coding. The following table shows the functions it supports.

| Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token | Generate UID2 Token from DII | Refresh UID2 Token |
| :--- | :--- | :--- | :--- |
| Yes | Yes | No | No |

## Version

The SDK supports Python 3.6 and above.

## SDK Repository

This SDK is available in GitHub: [UID2 SDK for Python](https://github.com/IABTechLab/uid2-client-python/blob/master/README.md).

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

The following example calls the decrypt method in Python:

```python
from uid2_client import decrypt
def decrypt(token, keys, now=dt.datetime.now(tz=timezone.utc))
```

### Response Content

Available information returned through the SDK is outlined in the following table.

| Property | Description |
| :--- | :--- |
| `Status` | The decryption result status. For a list of possible values and definitions, see [Response Statuses](#response-statuses). |
| `UID2` | The raw UID2 for the corresponding UID2 advertising token. |
| `Established` | The timestamp indicating when a user first established the UID2 with the publisher. |

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



## Usage for UID2 Sharers

A UID2 sharer is any participant that wants to share UID2s with another participant. Raw UID2s must be encrypted into UID2 tokens before sending them to another participant. For an example of usage, see [com.uid2.client.test.IntegrationExamples](https://github.com/IABTechLab/uid2-client-java/blob/master/src/test/java/com/uid2/client/test/IntegrationExamples.java) (`runSharingExample` method).

The following instructions provide an example of how you can implement sharing using the UID2 SDK for Python, either as a sender or a receiver.

1. Create a ```UID2Client``` reference:
 
   ```python
   from uid2_client import Uid2Client
   client = Uid2Client(base_url, auth_key, secret_key)
   ```
2. Refresh once at startup, and then periodically (recommended refresh interval is hourly):

   ```python
   keys = client.refresh_keys()
   ```

3. Senders: 
   1. Call the `encrypt` function. Then, if encryption succeeded, send the UID2 token to the receiver:

      ```python
      from uid2_client import encrypt
      from uid2_client.identity_scope import IdentityScope
      
      try:
         identity_scope = IdentityScope.UID2
         encrypted_data = encrypt(raw_uid, identity_scope, keys)
         #send encrypted_data to receiver
      except EncryptionError as err:
        #check for failure reason
        print(err)
      ``` 
<!-- Alternative to the above for EUID:
      from uid2_client import encrypt
      from uid2_client.identity_scope import IdentityScope
      
        try:
         identity_scope = IdentityScope.UID2  # or IdentityScope.EUID
         encrypted_data = encrypt(raw_uid, identity_scope, keys)
         #send encrypted_data to receiver
      except EncryptionError as err:
        #check for failure reason
        print(err) -->

4. Receivers:
   1. Call the `decrypt` function. Then, if decryption succeeded, use the raw UID2:
    
      ```python
      from uid2_client import decrypt
      try:
        result = decrypt(ad_token, keys)
        #use successfully decrypted result.uid2
      except EncryptionError as err:
        #check for failure reason
        print(err)
      ```

## FAQs

For a list of frequently asked questions for DSPs, see [FAQs for Demand-Side Platforms (DSPs)](../getting-started/gs-faqs.md#faqs-for-demand-side-platforms-dsps).

For a full list, see [Frequently Asked Questions](../getting-started/gs-faqs.md).
