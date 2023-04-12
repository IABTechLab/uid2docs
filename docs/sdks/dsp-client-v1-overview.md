---
title: Server-Side SDK Guide
description: Reference information about the server-side SDKs.
hide_table_of_contents: false
sidebar_position: 03
---

# Server-Side SDK Guide

You can use UID2 server-side SDKs to facilitate decrypting UID2 advertising tokens to access the raw UID2. 

<!-- This guide includes the following information:

- [Overview](#overview)
- [Initialization](#initialization)
- [Interface](#interface)
  - [Response Content](#response-content)
  - [Response Statuses](#response-statuses)
* [FAQs](#faqs) -->

## Overview

The following functions define the information that you'll need to configure or can retrieve from the library. The parameters and property names defined below are pseudocode. Actual parameters and property names vary by language but will be similar to the information outlined below.

Libraries are currently available in the following languages. More languages are in development. 

| Language | Link to SDK Repo |
| :--- | :--- |
| C#  | [UID2 Client for .NET](https://github.com/IABTechLab/uid2-client-net/blob/master/README.md) |
| C++ | [UID2 Client for C++](https://github.com/IABTechLab/uid2-client-cpp11/blob/master/README.md) |
| Java | [UID2 Java SDK](https://github.com/IABTechLab/uid2-client-java/blob/master/README.md) |
| Python | [UID2 Client Python](https://github.com/IABTechLab/uid2-client-python/blob/master/README.md) |

## Initialization

The initialization function configures the parameters necessary for the SDK to authenticate with the UID2 service. It also allows you to configure retry intervals in the event of errors.

| Parameter | Description | Recommended Value |
| :--- | :--- | :--- |
| `endpoint` | The endpoint for the UID2 service. | N/A |
| `authKey` | The authentication token that belongs to the client. For access to UID2, see [Contact Info](../getting-started/gs-account-setup.md#contact-info). | N/A |
| `refreshIntervalMs` | The refresh cadence, in milliseconds, for fetching the decryption keys.| `300,000` milliseconds (5 minutes) |
| `retryIntervalMs` | The retry cadence, in millisecond, for retrying the request if there is an error.  | `30,000` milliseconds (30 seconds) |

## Interface 

The interface allows you to decrypt UID2 advertising tokens and return the corresponding raw UID2. 

>NOTE: When you use an SDK, you do not need to store or manage decryption keys.

If you're a DSP, for bidding, call the interface to decrypt a UID2 advertising token and return the UID2. For details on the bidding logic for handling user opt-outs, see [DSP Integration Guide](../guides/dsp-guide.md).

```java
public Response Decrypt(String encryptedToken)
```

### Response Content

Available information returned through the SDK is outlined in the following table.

| Property | Description |
| :--- | :--- |
| `Status` | The decryption result status. For a list of possible values and definitions, see [Response Statuses](#response-statuses). |
| `UID2` | The raw UID2 for the corresponding UID2 advertising token. |
| `Established` | The timestamp when a user first established the UID2 with the publisher. |

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

## FAQs

For a list of frequently asked questions for DSPs, see [FAQs for Demand-Side Platforms (DSPs)](../getting-started/gs-faqs.md#faqs-for-demand-side-platforms-dsps).

For a full list, see [Frequently Asked Questions](../getting-started/gs-faqs.md).
