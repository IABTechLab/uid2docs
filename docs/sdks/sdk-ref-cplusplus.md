---
title: SDK for C++
description: Reference information about the C++ server-side SDK.
hide_table_of_contents: false
sidebar_position: 10
---

import Link from '@docusaurus/Link';

# SDK for C++ Reference Guide

You can use the SDK for C++ on the server side to facilitate decrypting of UID2 tokens to access the raw UID2. 

## Overview

The functions outlined here define the information that you'll need to configure or can retrieve from the library. The parameters and property names defined below are pseudocode. Actual parameters and property names vary by language but will be similar to the information outlined here.

## Functionality

This SDK simplifies integration with UID2 for any DSPs or UID2 sharers who are using C++ for their server-side coding. The following table shows the functions it supports.

| Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token | Generate UID2 Token from DII | Refresh UID2 Token |
| :--- | :--- | :--- | :--- |
| Supported | Supported | Not supported | Not supported |

## API Permissions

To use this SDK, you'll need to complete the UID2 account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page.

You'll be granted permission to use specific functions offered by the SDK, and given credentials for that access. Bear in mind that there might be functions in the SDK that you don't have permission to use. For example, publishers get a specific API permission to generate and refresh tokens, but the SDK might support other activities that require a different API permission.

For details, see [API Permissions](../getting-started/gs-permissions.md).

## Version

The SDK requires C++ version 11.

## GitHub Repository/Binary

This SDK is in the following open-source GitHub repository:

- [SDK for C++](https://github.com/IABTechLab/uid2-client-cpp11/blob/master/README.md).

Release tags are available in the following GitHub location, but you must build your own binaries:

- https://github.com/IABTechLab/uid2-client-cpp11/tags

## Initialization

The initialization function configures the parameters necessary for the SDK to authenticate with the UID2 service. It also allows you to configure retry intervals in the event of errors.

| Parameter | Description | Recommended Value |
| :--- | :--- | :--- |
| `endpoint` | The endpoint for the UID2 service. | N/A |
| `authKey` | The authentication token that belongs to the client. For access to UID2, see [Contact Info](../getting-started/gs-account-setup.md#contact-info). | N/A |

## Interface 

The interface allows you to decrypt UID2 advertising tokens and return the corresponding raw UID2. 

:::note
When you use an SDK, you do not need to store or manage decryption keys.
:::

If you're a DSP, for bidding, call the interface to decrypt a UID2 advertising token and return the UID2. For details on the bidding logic for handling user opt-outs, see [DSP Integration Guide](../guides/dsp-guide.md).

The following is the decrypt method in C++:

```cpp
#include <uid2/uid2client.h>
using namespace uid2;
 
const auto client = UID2ClientFactory::Create(baseUrl, apiKey, secretKey);
client->Refresh(); //Note that Refresh() should be called once after create(), and then once per hour
const auto result = client->Decrypt(adToken);
```

### Response Content

Available information returned through the SDK is outlined in the following table.

| Function | Description |
| :--- | :--- |
| `GetStatus()` | The decryption result status. For a list of possible values and definitions, see [Response Statuses](#response-statuses). |
| `GetUid()` | The raw UID2 for the corresponding UID2 advertising token. |
| `GetEstablished()` | The timestamp indicating when a user first established the UID2 with the publisher. |

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

A UID2 <Link href="../ref-info/glossary-uid#gl-sharing-participant">sharing participant</Link> is a company that takes part in sharing, either as a sender or a receiver, to share UID2s with another participant.

Advertisers and data providers can use this SDK to share UID2s with other authorized UID2 sharing participants (<Link href="../ref-info/glossary-uid#gl-tokenized-sharing">tokenized sharing</Link>). They can encrypt [raw UID2s](../ref-info/glossary-uid#gl-raw-uid2) into <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> and then send them to another participant for sharing in pixels (see [Tokenized Sharing in Pixels](../sharing/sharing-tokenized-from-data-pixel.md)). If you are not sending data in pixels, you can take part in UID2 sharing as long as you follow the requirements laid out in [Security Requirements for UID2 Sharing](../sharing/sharing-security.md).

:::important
The UID2 token generated during this process is for sharing only&#8212;you cannot use it in the <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link>. There is a different workflow for generating tokens for the bidstream: see [Tokenized Sharing in the Bidstream](../sharing/sharing-tokenized-from-data-bid-stream.md).
:::

 For an example of usage, see [com.uid2.client.test.IntegrationExamples](https://github.com/IABTechLab/uid2-client-java/blob/master/src/test/java/com/uid2/client/test/IntegrationExamples.java) (`runSharingExample` method).

The following instructions provide an example of how you can implement sharing using the SDK for C++, either as a sender or a receiver.

1. Create an ```IUID2Client``` shared pointer:
 
    ```cpp
   const auto client = UID2ClientFactory::Create(baseUrl, apiKey, secretKey);
    ```
2. Refresh once at startup, and then periodically (recommended refresh interval is hourly):

    ```cpp
   client->Refresh();
   ```
3. Senders: 
   1. Call the following:

      ```cpp
      EncryptionResult encrypted = client->Encrypt(rawUid);
      ```
   2. If encryption succeeded, send the UID2 token to the receiver:   

      ```cpp
      if (encrypted.IsSuccess()) 
      {
          // send encrypted.GetEncryptedData() to receiver
      }
      else 
      {
          // check encrypted.GetStatus() for the failure reason
      }
      ```
4. Receivers: 
   1. Call the following:

      ```cpp
      DecryptionResult decrypted = client->Decrypt(uidToken);
      ```
 
   2. If decryption succeeded, use the raw UID2:

      ```cpp    
      if (decrypted.IsSuccess())
      {
         // use decrypted.GetUid() 
      } 
      else 
      {
         // check decrypted.GetStatus() for the failure reason 
      }
      ```

## FAQs

For a list of frequently asked questions for DSPs, see [FAQs for DSPs](../getting-started/gs-faqs.md#faqs-for-dsps).
