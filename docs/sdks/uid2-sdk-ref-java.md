---
title: UID2 SDK for Java
description: Reference information about the Java server-side SDK.
hide_table_of_contents: false
sidebar_position: 04
---

import Link from '@docusaurus/Link';

# UID2 SDK for Java Reference Guide

You can use the UID2 SDK for Java on the server side to facilitate the following:

- Generating UID2 advertising tokens
- Refreshing UID2 advertising tokens
- Encrypting raw UID2s to create UID2 tokens for sharing
- Decrypting UID2 tokens to access the raw UID2s

<!-- This guide includes the following information:

- [Functionality](#functionality)
- [API Permissions](#api-permissions)
- [Version](#version)
- [GitHub Repository/Binary](#github-repositorybinary)
- [Initialization](#initialization)
- [Interface](#interface)
  - [Response Content](#response-content)
  - [Response Statuses](#response-statuses)
* [FAQs](#faqs)
- [Usage for Publishers](#usage-for-publishers) 
* [Usage for UID2 Sharers](#usage-for-uid2-sharers) -->

## Functionality

This SDK simplifies integration with UID2 for any publishers, DSPs, and UID2 sharers who are using Java for their server-side coding. The following table shows the functions it supports.

| Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token | Generate UID2 Token from DII | Refresh UID2 Token |
| :--- | :--- | :--- | :--- |
| Supported | Supported | Supported | Supported |

## API Permissions

To use this SDK, you'll need to complete the UID2 account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page.

You'll be granted permission to use specific functions offered by the SDK, and given credentials for that access. Bear in mind that there might be functions in the SDK that you don't have permission to use. For example, publishers get a specific API permission to generate and refresh tokens, but the SDK might support other activities, such as sharing, which require a different API permission.

For details, see [API Permissions](../getting-started/gs-permissions.md).

## Version

The SDK requires Java version 1.8 or later.

## GitHub Repository/Binary

This SDK is in the following open-source GitHub repository:

- [UID2 SDK for Java](https://github.com/IABTechLab/uid2-client-java/blob/master/README.md)

The binary is published on the Maven repository:

- [https://central.sonatype.com/artifact/com.uid2/uid2-client](https://central.sonatype.com/artifact/com.uid2/uid2-client)

## Initialization

The initialization step depends on the role, as shown in the following table.

| Role                           | Create Instance of Class | Link to Instructions                              |
|:-------------------------------| :--- |:--------------------------------------------------|
| Publisher                      | `PublisherUid2Client` | [Usage for Publishers](#usage-for-publishers)     |
| Advertisers and Data Providers | `IdentityMapClient` | [Usage for Advertisers and Data Providers](#usage-for-advertisers-and-data-providers)     |
| DSP                            | `BidstreamClient` | [Usage for DSPs](#usage-for-dsps)                 |
| Sharer                         | `SharingClient` | [Usage for UID2 Sharers](#usage-for-uid2-sharers) |

You will need to provide the values necessary for the SDK to authenticate with the UID2 service.

| Parameter | Description                                                                                | 
| :--- |:-------------------------------------------------------------------------------------------|
| `baseUrl/uid2BaseUrl` | The endpoint for the UID2 service. See [Environments](../getting-started/gs-environments). | 
| `clientApiKey` | The API key. See [UID2 Credentials](../getting-started/gs-credentials).                    | 
| `base64SecretKey` | The client secret. See [UID2 Credentials](../getting-started/gs-credentials).              | 

### Interface 

The `BidstreamClient` class allows you to decrypt UID2 tokens into raw UID2s.
For details on the bidding logic for handling user opt-outs, see [DSP Integration Guide](../guides/dsp-guide.md).

The `SharingClient` class allows you to encrypt raw UID2s into UID2 tokens and decrypt UID2 tokens into raw UID2s.

:::note
When you use an SDK, you do not need to store or manage decryption keys.
:::

### Encryption Response Content

When encrypting with the `SharingClient` class, the SDK returns the information shown in the following table.

| Method               | Description                                                                                                                                     |
|:---------------------|:------------------------------------------------------------------------------------------------------------------------------------------------|
| `getStatus()`        | The encryption result status. For a list of possible values and definitions, see [Encryption Response Statuses](#encryption-response-statuses). |
| `getEncryptedData()` | The encrypted UID2 token.                                                                                                                       |

### Encryption Response Statuses

Encryption response codes, and their meanings, are shown in the following table.

| Value                           | Description
|:--------------------------------|:-----------------------------------------------------------------------|
| `SUCCESS`                       | The raw UID2 was successfully encrypted and a UID2 token was returned. |
| `NOT_AUTHORIZED_FOR_KEY`        | The requester does not have authorization to use the encryption key.   |
| `NOT_AUTHORIZED_FOR_MASTER_KEY` | The requester does not have authorization to use the master key.       |
| `NOT_INITIALIZED`               | The client library is waiting to be initialized.                       |
| `KEYS_NOT_SYNCED`               | The client has failed to synchronize keys from the UID2 service.       |
| `ENCRYPTION_FAILURE`            | A generic encryption failure occurred.                                 |

### Decryption Response Content

Whether decrypting with the `BidstreamClient` class or the `SharingClient` class, the SDK returns the information shown in the following table.

| Methods            | Description                                                                                                                                     |
|:-------------------|:------------------------------------------------------------------------------------------------------------------------------------------------|
| `getStatus()`      | The decryption result status. For a list of possible values and definitions, see [Decryption Response Statuses](#decryption-response-statuses). |
| `getSiteId()`      | The raw UID2 for the corresponding UID2 token.                                                                                                  |
| `getEstablished()` | The timestamp indicating when a user first established the UID2 with the publisher.                                                             |

### Decryption Response Statuses

Decryption response codes, and their meanings, are shown in the following table.

| Value                      | Description                                                             |
|:---------------------------|:------------------------------------------------------------------------|
| `SUCCESS`                  | The UID2 token was decrypted successfully and a raw UID2 was returned.  |
| `NOT_AUTHORIZED_FOR_KEY`   | The requester does not have authorization to decrypt this UID2 token.   |
| `NOT_INITIALIZED`          | The client library is waiting to be initialized.                        |
| `INVALID_PAYLOAD`          | The incoming UID2 token is not a valid payload.                         |
| `EXPIRED_TOKEN`            | The incoming UID2 token has expired.                                    |
| `KEYS_NOT_SYNCED`          | The client has failed to synchronize keys from the UID2 service.        |
| `VERSION_NOT_SUPPORTED`    | The client library does not support the version of the encrypted token. |
| `INVALID_TOKEN_LIFETIME`   | The token has an invalid timestamp.                                     |

## Usage for Publishers

As a publisher, there are two ways to use the UID2 SDK for Java: 
1. [**Basic Usage**](#basic-usage) is for publishers who want to use this SDK's HTTP implementation (synchronous [OkHttp](https://square.github.io/okhttp/)).
2. [**Advanced Usage**](#advanced-usage) is for publishers who prefer to use their own HTTP library. 

For an example application that demonstrates both Basic and Advanced usage, see [Java UID2 Integration Example](https://github.com/UnifiedID2/uid2-examples/tree/main/publisher/uid2-java-test-site#readme).

### Basic Usage

If you're using the SDK's HTTP implementation, follow these steps.

1. Create an instance of `PublisherUid2Client` as an instance variable:

   ```java
   private final PublisherUid2Client publisherUid2Client = new PublisherUid2Client(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);
   ```

2. Call a function that takes the user's email address or phone number as input and generates a `TokenGenerateResponse` object. The following example uses an email address:
   ```java
   TokenGenerateResponse tokenGenerateResponse = publisherUid2Client.generateTokenResponse(TokenGenerateInput.fromEmail(emailAddress).doNotGenerateTokensForOptedOut());
   ```

   :::important
   - Be sure to call the POST&nbsp;/token/generate endpoint only when you have obtained legal basis to convert the user’s <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> to UID2 tokens for targeted advertising.

   - Always apply `doNotGenerateTokensForOptedOut()`. This applies a parameter similar to setting `optout_check=1` in the call to the POST&nbsp;/token/generate endpoint (see [Unencrypted JSON Body Parameters](../endpoints/post-token-generate.md#unencrypted-json-body-parameters)).
   :::

#### Client-Server Integration

If you're using client-server integration (see [Server-Side Integration Guide for JavaScript](../guides/integration-javascript-server-side.md)), follow this step:

* Send this identity as a JSON string back to the client (to use in the [identity field](../sdks/client-side-identity.md#initopts-object-void)), using the following:

   ```java
   tokenGenerateResponse.getIdentityJsonString()
   ```

   :::note
   If the user has opted out, this method returns `null`, so be sure to handle that case.
   :::

#### Server-Only Integration

If you're using server-only integration (see [Publisher Integration Guide, Server-Only](../guides/custom-publisher-integration.md)), follow these steps:

1. Store this identity as a JSON string in the user's session, using the `tokenGenerateResponse.getIdentityJsonString()` function.

   If the user has opted out, this method returns `null`, so be sure to handle that case.

2. To retrieve the user's UID2 token, use the following:

   ```java
   IdentityTokens identity = tokenGenerateResponse.getIdentity();
   if (identity != null) { String advertisingToken = identity.getAdvertisingToken(); }
   ```
3. When the user accesses another page, or on a timer, determine whether a refresh is needed:
   1. Retrieve the identity JSON string from the user's session, and then call the following function that takes the identity information as input and generates an `IdentityTokens` object:

      ```java
      IdentityTokens identity = IdentityTokens.fromJsonString(identityJsonString);
      ```
   2. Determine if the identity can be refreshed (that is, the refresh token hasn't expired):

      ```java
      if (identity == null || !identity.isRefreshable()) { we must no longer use this identity (for example, remove this identity from the user's session) }
      ```
   3. Determine if a refresh is needed:

      ```java
      if (identity.isDueForRefresh()) {..}
      ```
4. If needed, refresh the token and associated values:
 
   ```java
   TokenRefreshResponse tokenRefreshResponse = publisherUid2Client.refreshToken(identity);
   ```
 
5. Store `tokenRefreshResponse.getIdentityJsonString()` in the user's session.

   If the user has opted out, this method returns `null`, indicating that the user's identity should be removed from the session. To confirm optout, you can use the `tokenRefreshResponse.isOptout()` function.

### Advanced Usage

1. Create an instance of `PublisherUid2Helper` as an instance variable:

    ```java
    private final PublisherUid2Helper publisherUid2Helper = new PublisherUid2Helper(UID2_SECRET_KEY);
    ```
2. Call a function that takes the user's email address or phone number as input and creates a secure request data envelope. See [Encrypting requests](../getting-started/gs-encryption-decryption.md#encrypting-requests). The following example uses an email address:

    ```java
    EnvelopeV2 envelope = publisherUid2Helper.createEnvelopeForTokenGenerateRequest(TokenGenerateInput.fromEmail(emailAddress).doNotGenerateTokensForOptedOut());
    ```
3. Using an HTTP client library of your choice, post this envelope to the [POST&nbsp;token/generate](../endpoints/post-token-generate.md) endpoint, including headers and body:
   1. Headers: Depending on your HTTP library, this might look something like the following:  
    
      `.putHeader("Authorization", "Bearer " + UID2_API_KEY)`  
      `.putHeader("X-UID2-Client-Version", PublisherUid2Helper.getVersionHeader())`
   2. Body: `envelope.getEnvelope()`
   :::important
   - Be sure to call the POST&nbsp;/token/generate endpoint only when you have obtained legal basis to convert the user’s <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> to UID2 tokens for targeted advertising.

   - Always apply `doNotGenerateTokensForOptedOut()`. This applies a parameter similar to setting `optout_check=1` in the call to the POST&nbsp;/token/generate endpoint (see [Unencrypted JSON Body Parameters](../endpoints/post-token-generate.md#unencrypted-json-body-parameters)).
   :::

4. If the HTTP response status code is _not_ 200, see [Response Status Codes](../endpoints/post-token-generate.md#response-status-codes) to determine next steps. Otherwise, convert the UID2 identity response content into a `TokenGenerateResponse` object:

   ```java
   TokenGenerateResponse tokenGenerateResponse = publisherUid2Helper.createTokenGenerateResponse({response body}, envelope);
   ```

#### Client-Server Integration

If you're using client-server integration (see [Server-Side Integration Guide for JavaScript](../guides/integration-javascript-server-side.md)), follow this step:

* Send this identity as a JSON string back to the client (to use in the [identity field](../sdks/client-side-identity.md#initopts-object-void)) using the following:

    ```java
    tokenGenerateResponse.getIdentityJsonString()
    ```

    :::caution
    This method returns null if the user has opted out, so be sure to handle that case.
    :::

#### Server-Only Integration

If you're using server-only integration (see [Publisher Integration Guide, Server-Only](../guides/custom-publisher-integration.md)):

1. Store this identity as a JSON string in the user's session, using: `tokenGenerateResponse.getIdentityJsonString()`.

   This method returns null if the user has opted out, so be sure to handle that case.
2. To retrieve the user's UID2 token, use:

   ```java
   IdentityTokens identity = tokenGenerateResponse.getIdentity();
   if (identity != null) { String advertisingToken = identity.getAdvertisingToken(); }
   ```

3. When the user accesses another page, or on a timer, determine whether a refresh is needed:
   1. Retrieve the identity JSON string from the user's session, and then call the following function that generates an `IdentityTokens` object:
   
       ```java
       IdentityTokens identity = IdentityTokens.fromJsonString(identityJsonString);
       ```
   2. Determine whether the identity can be refreshed (that is, the refresh token hasn't expired): 
    
      ```java
      if (identity == null || !identity.isRefreshable()) { we must no longer use this identity (for example, remove this identity from the user's session) }
      ```
   3. Determine whether a refresh is needed:
   
      ```java
      if (identity.isDueForRefresh()) {..}
      ```
4. If a refresh is needed, call the [POST token/refresh](../endpoints/post-token-refresh.md) endpoint, with the following:
   1. Headers: Depending on your HTTP library, this might look something like the following:
    
      `.putHeader("Authorization", "Bearer " + UID2_API_KEY)`  
      `.putHeader("X-UID2-Client-Version", PublisherUid2Helper.getVersionHeader())`. 
   2. Body: `identity.getRefreshToken()`
5. If the refresh HTTP response status code is 200:

   ```java
   TokenRefreshResponse tokenRefreshResponse = PublisherUid2Helper.createTokenRefreshResponse({response body}, identity);
   ```
6. Store `tokenRefreshResponse.getIdentityJsonString()` in the user's session.

   If the user has opted out, this method returns null, indicating that the user's identity should be removed from the session. To confirm optout, you can use the `tokenRefreshResponse.isOptout()` function.

## Usage for Advertisers and Data Providers
1. Create an instance of IdentityMapClient as an instance variable.
   ```java
   final private IdentityMapClient identityMapClient = new IdentityMapClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);
   ```

2. Call a function that takes email addresses or phone numbers as input and generates an IdentityMapResponse object. The following example uses email addresses:
   ```java
   IdentityMapResponse identityMapResponse = identityMapClient.generateIdentityMap(IdentityMapInput.fromEmails(Arrays.asList("email1@example.com", "email2@example.com")));
   ```

>Note: The SDK hashes input values before sending them. This ensures that raw email addresses and phone numbers do not leave your server.

3. Retrieve the mapped and unmapped results as follows:
   ```java
   Map<String, IdentityMapResponse.MappedIdentity> mappedIdentities = identityMapResponse.getMappedIdentities();
   Map<String, IdentityMapResponse.UnmappedIdentity> unmappedIdentities = identityMapResponse.getUnmappedIdentities();`
   ```

4. Iterate through the mapped and unmapped results, or do a lookup. The following example does a lookup:
   ```java
   IdentityMapResponse.MappedIdentity mappedIdentity = mappedIdentities.get("email1@example.com");
   if (mappedIdentity != null) {
        String rawUid = mappedIdentity.getRawUid();
   } else {
        IdentityMapResponse.UnmappedIdentity unmappedIdentity = unmappedIdentities.get("email1@example.com");
        String reason = unmappedIdentity.getReason();
   }
   ```

## Usage for DSPs

The following instructions provide an example of how a DSP can decode bid stream tokens using the UID2 SDK for Java.

1. Create a `BidstreamClient`:

```java
Bidstream client = new BidstreamClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);
```

2. Refresh once at startup, and then periodically (recommended refresh interval is hourly):

```java
client.refresh();
```

3. Decrypt a token into a raw UID2. Pass the token, and then do one of the following:
* If the bid request originated from a publisher's website, pass the domain name. The domain name must be all lower case, without spaces and without subdomain. For example, for `Subdomain.DOMAIN.com`, pass `domain.com` instead.
* If the bid request originated from a mobile app, pass the [app name](../ref-info/glossary-uid.md#gl-app-name).
* Otherwise, pass `null`.

```java
DecryptionResponse decrypted = client.decryptTokenIntoRawUid(uidToken, domainOrAppName); 
//If decryption succeeded, use the raw UID2.
if (decrypted.isSuccess()) 
{
    //Use decrypted.getUid()
}
else 
{
    // Check decrypted.getStatus() for the failure reason.
}
```

For a full example, see the `ExampleBidStreamClient` method in [test/IntegrationExamples.java](https://github.com/IABTechLab/uid2-client-java/blob/main/src/test/java/com/uid2/client/test/IntegrationExamples.java).

## Usage for UID2 Sharers

In UID2, sharing is a process for distributing either raw UID2s or UID2 tokens securely between UID2 participants. Raw UID2s must be encrypted into UID2 tokens before sending them to another participant.

>IMPORTANT: The UID2 token generated during this process is for sharing only&#8212;you cannot use it in the bid stream. There is a different workflow for generating tokens for the bid stream: see [Tokenized Sharing in the Bid Stream](../sharing/sharing-tokenized-from-data-bid-stream.md).

The following instructions provide an example of how you can implement sharing using the UID2 SDK for Java, either as a sender or a receiver.

1. Create a `SharingClient`:
```java
SharingClient client = new SharingClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY);
```

2. Refresh once at startup, and then periodically. Recommended refresh interval is hourly: for details, see [Decryption Key Refresh Cadence for Sharing](../sharing/sharing-best-practices.md#decryption-key-refresh-cadence-for-sharing).
```java
client.refresh();
```

3. If you are a sender, call `encryptRawUidIntoToken`:
```java
EncryptionDataResponse encrypted = client.encryptRawUidIntoToken(raw_uid);
// If encryption succeeded, send the UID2 token to the receiver.
if (encrypted.isSuccess())
{
        // Send encrypted.getEncryptedData() to receiver
}
else
{
        // Check encrypted.getStatus() for the failure reason.
}
```
If you are a receiver, call `decryptTokenIntoRawUid`:

```java
DecryptionResponse decrypted = client.decryptTokenIntoRawUid(uid_token);
// If decryption succeeded, use the raw UID2.
if (decrypted.isSuccess())
{
    //  Use decrypted.getUid()
}
else
{
    // Check decrypted.getStatus() for the failure reason.
}
```

For a full example, see the `ExampleSharingClient` method in [test/IntegrationExamples.java](https://github.com/IABTechLab/uid2-client-java/blob/main/src/test/java/com/uid2/client/test/IntegrationExamples.java).

## FAQs

For a list of frequently asked questions for DSPs, see [FAQs for DSPs](../getting-started/gs-faqs.md#faqs-for-dsps).
