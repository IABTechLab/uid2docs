---
title: SDK for C# / .NET
description: Reference information about the C# / .NET server-side SDK.
hide_table_of_contents: false
sidebar_position: 08
---

import Link from '@docusaurus/Link';

# SDK for C# / .NET Reference Guide

You can use the SDK for C# / .NET on the server side to facilitate the following:

- Encrypting raw UID2s to create UID2 tokens for sharing.
- Decrypting UID2 tokens to access the raw UID2s.

## Functionality

This SDK simplifies integration with UID2 for any DSPs or UID2 sharers who are using C# / .NET for their server-side coding. The following table shows the functions it supports.

| Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token to Raw UID2 | Generate UID2 Token from DII | Refresh UID2 Token | Map DII to Raw UID2s |
| :--- | :--- | :--- | :--- | :--- |
| &#9989; | &#9989; | &#8212; | &#8212; | &#8212; |

## API Permissions

To use this SDK, you'll need to complete the UID2 account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page.

You'll be granted permission to use specific functions offered by the SDK, and given credentials for that access. Bear in mind that there might be functions in the SDK that you don't have permission to use.

For details, see [API Permissions](../getting-started/gs-permissions.md).

## Version

This documentation is for the UID2 .NET SDK version 5.6.0 and above. The SDK is built for .NET Standard 2.0.

## GitHub Repository/Binary


This SDK is in the following open-source GitHub repository:

- [SDK for .NET](https://github.com/IABTechLab/uid2-client-net/blob/master/README.md)

The binary is published in this location:

- [https://www.nuget.org/packages/UID2.Client](https://www.nuget.org/packages/UID2.Client)

## Initialization

DSPs should create an instance of the `BidstreamClient` class. Sharers should create an instance of the `SharingClient` class.

You will need to provide the values necessary for the SDK to authenticate with the UID2 service.

| Parameter | Description |
| :--- | :--- |
| `endpoint` | The endpoint for the UID2 service. See [Environments](../getting-started/gs-environments). | 
| `authKey` | The API key. See [UID2 Credentials](../getting-started/gs-credentials). |
| `secretKey` | The client secret. See [UID2 Credentials](../getting-started/gs-credentials). |

## Interface

The `BidstreamClient` class allows you to decrypt UID2 tokens into raw UID2s.

For details on the bidding logic for handling user opt-outs, see [DSP Integration Guide](../guides/dsp-guide.md).

The `SharingClient` class allows you to encrypt raw UID2s into UID2 tokens and decrypt UID2 tokens into raw UID2s.

:::note
When you use an SDK, you do not need to store or manage decryption keys.
:::

### Encryption Response Content

When encrypting with the `SharingClient`, the SDK returns the following information:

| Property | Description |
| :--- | :--- |
| `Status` | The encryption result status. For a list of possible values and definitions, see [Encryption Response Statuses](#encryption-response-statuses). |
| `EncryptedData` | The encrypted UID2 token. |

### Encryption Response Statuses

| Value | Description |
| :--- | :--- |
| `Success` | The raw UID2 was successfully encrypted and a UID2 token was returned. |
| `NotAuthorizedForKey` | The requester does not have authorization to use the <a href="../ref-info/glossary-uid#gl-encryption-key">encryption key</a>. |
| `NotAuthorizedForMasterKey` | The requester does not have authorization to use the master key. |
| `NotInitialized` | The client library is waiting to be initialized. |
| `KeysNotSynced` | The client has failed to synchronize keys from the UID2 service. |
| `KeyInactive` | The encryption key is not active. |
| `EncryptionFailure` | A generic encryption failure occurred. |
<!-- `TokenDecryptFailure` intentionally omitted. Does not seem to be used by SharingClient. -->

### Decryption Response Content

Whether decrypting with the `BidstreamClient` or the `SharingClient`, the SDK returns the following information:

| Property | Description |
| :--- | :--- |
| `Status` | The decryption result status. For a list of possible values and definitions, see [Decryption Response Statuses](#decryption-response-statuses). |
| `Uid` | The raw UID2 for the corresponding UID2 token. |
| `Established` | The timestamp indicating when a user first established the UID2 with the publisher. |

### Decryption Response Statuses

| Value | Description |
| :--- | :--- |
| `Success` | The UID2 token was decrypted successfully and a raw UID2 was returned. |
| `NotAuthorizedForKey` | The requester does not have authorization to decrypt this UID2 token.|
| `NotInitialized` | The client library is waiting to be initialized. |
| `InvalidPayload` | The incoming UID2 token is not a valid payload. |
| `ExpiredToken` | The incoming UID2 token has expired. |
| `KeysNotSynced` | The client has failed to synchronize keys from the UID2 service. |
| `VersionNotSupported` |  The client library does not support the version of the encrypted token. |

## Usage for DSPs

The following instructions provide an example of how you can decode bidstream tokens using the SDK for .NET as a DSP.

1. Create a `BidstreamClient`:

```cs
var client = new BidstreamClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);
```

2. Refresh once at startup, and then periodically (recommended refresh interval is hourly):

```cs
client.Refresh();
```

3. Decrypt a token into a raw UID2. Pass the token, and then do one of the following: 
 * If the bid request originated from a publisher's website, pass the domain name. The domain name must be all lower case, without spaces and without subdomain. For example, for `Subdomain.DOMAIN.com`, pass `domain.com` instead.
 * If the bid request originated from a mobile app, pass the <Link href="../ref-info/glossary-uid#gl-app-name">app name</Link>.
 * Otherwise, pass `null`.


```cs
var decrypted = client.DecryptTokenIntoRawUid(uidToken, domainOrAppName);
// If decryption succeeded, use the raw UID2.
if (decrypted.Success) 
{
    // Use decrypted.Uid.
} 
else 
{
    // Check decrypted.Status for the failure reason.
}
```

For a full example, see the `ExampleBidStreamClient` method in [SampleApp/Program.cs](https://github.com/IABTechLab/uid2-client-net/blob/main/src/SampleApp/Program.cs).

## Usage for UID2 Sharers

A UID2 <Link href="../ref-info/glossary-uid#gl-sharing-participant">sharing participant</Link> is a company that takes part in sharing, either as a sender or a receiver, to share UID2s with another participant.

Advertisers and data providers can use this SDK to share UID2s with other authorized UID2 sharing participants (<Link href="../ref-info/glossary-uid#gl-tokenized-sharing">tokenized sharing</Link>). They can encrypt [raw UID2s](../ref-info/glossary-uid#gl-raw-uid2) into <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> and then send them to another participant for sharing in pixels (see [Tokenized Sharing in Pixels](../sharing/sharing-tokenized-from-data-pixel.md)). If you are not sending data in pixels, you can take part in UID2 sharing as long as you follow the requirements laid out in [Security Requirements for UID2 Sharing](../sharing/sharing-security.md).

:::important
The UID2 token generated during this process is for sharing only&#8212;you cannot use it in the <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link>. There is a different workflow for generating tokens for the bidstream: see [Tokenized Sharing in the Bidstream](../sharing/sharing-tokenized-from-data-bid-stream.md).
:::

The following instructions provide an example of how you can implement sharing using the SDK for C# / .NET, either as a sender or a receiver.

1. Create a `SharingClient`:

```cs
var client = new SharingClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);
```

2. Refresh once at startup, and then periodically (recommended refresh interval is hourly):

```cs
client.Refresh();
```

3. If you are a sender, call `EncryptRawUidIntoToken`:

```cs
var encrypted = client.EncryptRawUidIntoToken(rawUid);
// If encryption succeeded, send the UID2 token to the receiver.
if (encrypted.Success) 
{ 
    // Send encrypted.EncryptedData to receiver.
} 
else 
{
    // Check encrypted.Status for the failure reason.
}
```
If you are a receiver, call `DecryptTokenIntoRawUid`:

```cs
var decrypted = client.DecryptTokenIntoRawUid(uidToken);
// If decryption succeeded, use the raw UID2.
if (decrypted.Success) 
{
    // Use decrypted.Uid.
} 
else 
{
    // Check decrypted.Status for the failure reason.
}
```

For a full example, see the `ExampleSharingClient` method in [SampleApp/Program.cs](https://github.com/IABTechLab/uid2-client-net/blob/main/src/SampleApp/Program.cs).

## FAQs

For a list of frequently asked questions for DSPs, see [FAQs for DSPs](../getting-started/gs-faqs.md#faqs-for-dsps).
