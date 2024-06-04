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
- Encrypting raw UID2s to create UID2 tokens for sharing
- Decrypting UID2 tokens to access the raw UID2s

## Functionality

This SDK simplifies integration with UID2 for any DSPs or UID2 sharers who are using Python for their server-side coding. The following table shows the functions it supports.

| Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token | Generate UID2 Token from DII | Refresh UID2 Token | Map DII to a Raw UID2       |
| :--- | :--- | :--- | :--- | :--- |
| Supported | Supported | Supported | Supported | Supported |

## API Permissions

To use this SDK, you'll need to complete the UID2 account setup by following the steps described in the [Account Setup](../getting-started/gs-account-setup.md) page.

You'll be granted permission to use specific functions offered by the SDK, and given credentials for that access. Bear in mind that there might be functions in the SDK that you don't have permission to use. For example, publishers get a specific API permission to generate and refresh tokens, but the SDK might support other activities that require a different API permission.

For details, see [API Permissions](../getting-started/gs-permissions.md).

## Version

The SDK supports Python 3.6 and above.

## GitHub Repository/Package

This SDK is in the following open-source GitHub repository:

- [UID2 SDK for Python](https://github.com/IABTechLab/uid2-client-python/blob/master/README.md)

The package is published in this location:

- [https://pypi.org/project/uid2-client/](https://pypi.org/project/uid2-client/)

## Initialization
The initialization step depends on the role, as shown in the following table.

| Role	                    | Create Instance of Class	 | Link to Instructions                                                         |
|:-------------------------|:--------------------------|:-----------------------------------------------------------------------------|
| Publisher                | `Uid2PublisherClient`     | [Usage for Publishers](#usage-for-publishers)                                |
| Advertiser/Data Provider | `IdentityMapClient`       | [Usage for Advertisers/Data Providers](#usage-for-advertisersdata-providers) |
| DSP                      | `BidstreamClient`         | [Usage for DSPs](#usage-for-dsps)                                            |
| Sharer                   | `SharingClient`           | [Usage for Sharers](#usage-for-uid2-sharers)                                 |



You will need to provide the values necessary for the SDK to authenticate with the UID2 service.

| Parameter    | Description                                                                                |
|:-------------|:-------------------------------------------------------------------------------------------|
| `base_url`   | The endpoint for the UID2 service. See [Environments](../getting-started/gs-environments). |
| `auth_key`   | The API key. See [UID2 Credentials](../getting-started/gs-credentials).                    |
| `secret_key` | The client secret. See [UID2 Credentials](../getting-started/gs-credentials).              |

## Interface 

The `BidstreamClient` class allows you to decrypt UID2 tokens into raw UID2s.
For details on the bidding logic for handling user opt-outs, see [DSP Integration Guide](../guides/dsp-guide.md).

The `SharingClient` class allows you to encrypt raw UID2s into UID2 tokens and decrypt UID2 tokens into raw UID2s.


:::note
When you use an SDK, you do not need to store or manage decryption keys.
:::

### Encryption Response Content

When encrypting with the `SharingClient`, the SDK returns the information shown in the following table.

| Property         | Description                                                                                                                                     |
|:-----------------|:------------------------------------------------------------------------------------------------------------------------------------------------|
| `status`         | The encryption result status. For a list of possible values and definitions, see [Encryption Response Statuses](#encryption-response-statuses). |
| `encrypted_data` | The encrypted UID2 token.                                                                                                                       |

### Encryption Response Statuses
Encryption response codes, and their meanings, are shown in the following table.

| Value                           | Description                                                            |
|:--------------------------------|:-----------------------------------------------------------------------|
| `SUCCESS`                       | The raw UID2 was successfully encrypted and a UID2 token was returned. |
| `NOT_AUTHORIZED_FOR_KEY`        | The requester does not have authorization to use the encryption key.   |
| `NOT_AUTHORIZED_FOR_MASTER_KEY` | The requester does not have authorization to use the master key.       |
| `NOT_INITIALIZED`               | The client library is waiting to be initialized.                       |
| `KEYS_NOT_SYNCED`               | The client has failed to synchronize keys from the UID2 service.       |
| `ENCRYPTION_FAILURE`            | A generic encryption failure occurred.                                 |

### Decryption Response Content

Whether decrypting with the `BidstreamClient` or the `SharingClient`, the SDK returns the information shown in the following table.

| Property      | Description                                                                                                                                     |
|:--------------|:------------------------------------------------------------------------------------------------------------------------------------------------|
| `status`      | The decryption result status. For a list of possible values and definitions, see [Decryption Response Statuses](#decryption-response-statuses). |
| `uid`         | The raw UID2 for the corresponding UID2 token.                                                                                                  |
| `established` | The timestamp indicating when a user first established the UID2 with the publisher.                                                             |

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
| `DOMAIN_NAME_CHECK_FAILED` | The domain name doesn't match the domain of the encrypted token.        |
| `INVALID_TOKEN_LIFETIME`   | The token has an invalid timestamp.                                     |

## Usage for Publishers

1. Create an instance of `Uid2PublisherClient`:
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

If you're using client-server integration (see [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-server-side.md)), follow this step:

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

## Usage for Advertisers/Data Providers
1. Create an instance of `IdentityMapClient` as an instance variable.
   ```py
   client = IdentityMapClient(base_url, api_key, client_secret)
   ```

2. Call a function that takes email addresses or phone numbers as input and generates an `IdentityMapResponse` object. The following example uses email addresses:
   ```py
   identity_map_response = client.generate_identity_map(IdentityMapInput.from_emails(["email1@example.com", "email2@example.com"]))
   ```

>Note: The SDK hashes input values before sending them. This ensures that raw email addresses and phone numbers do not leave your server.

3. Retrieve the mapped and unmapped results as follows:
   ```py
   mapped_identities = identity_map_response.mapped_identities
   unmapped_identities = identity_map_response.unmapped_identities
    ```

4. Iterate through the mapped and unmapped results, or do a lookup. The following example does a lookup:
   ```py
    mapped_identity = mapped_identities.get("email1@example.com")
    if mapped_identity is not None:
        raw_uid = mapped_identity.get_raw_uid()
    else:
        unmapped_identity = unmapped_identities.get("email1@example.com")
        reason = unmapped_identity.get_reason()
   ```

## Usage for DSPs

The following instructions provide an example of how you can decode bidstream tokens using the UID2 SDK for Python as a DSP.

1. Create a `BidstreamClient`:

```py
client = BidstreamClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY)
```

2. Refresh once at startup, and then periodically (recommended refresh interval is hourly):

```py
client.refresh()
```

3. Decrypt a token into a raw UID2. Pass the token, and then do one of the following:
* If the bid request originated from a publisher's website, pass the domain name. The domain name must be all lower case, without spaces and without subdomain. For example, for `Subdomain.DOMAIN.com`, pass `domain.com` instead.
* If the bid request originated from a mobile app, pass the [app name](../ref-info/glossary-uid.md#gl-app-name).
* Otherwise, pass `null`.

```py
decrypted = client.decrypt_token_into_raw_uid(uid_token, domainOrAppName)
# If decryption succeeded, use the raw UID2.
if decrypted.success:
    #  Use decrypted.uid
else:
   # Check decrypted.status for the failure reason.
```

For a full example, see the `sample_bidstream_client.py` in [examples/sample_bidstream_client.py](https://github.com/IABTechLab/uid2-client-python/blob/main/examples/sample_bidstream_client.py).

## Usage for UID2 Sharers

In UID2, sharing is a process for distributing either raw UID2s or UID2 tokens securely between UID2 participants. Raw UID2s must be encrypted into UID2 tokens before sending them to another participant.

:::important
The UID2 token generated during this process is for sharing only&#8212;you cannot use it in the bidstream. There is a different workflow for generating tokens for the bidstream: see [Tokenized Sharing in the Bidstream](../sharing/sharing-tokenized-from-data-bid-stream.md).
:::

The following instructions provide an example of how you can implement sharing using the UID2 SDK for Python, either as a sender or a receiver.

1. Create a `SharingClient`:

```py
client = SharingClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY)
```

2. Refresh once at startup, and then periodically (recommended refresh interval is hourly):

```py
client.refresh()
```

3. If you are a sender, call `encrypt_raw_uid_into_token()`:

```py
encrypted = client.encrypt_raw_uid_into_token(raw_uid)
# If encryption succeeded, send the UID2 token to the receiver.
if encrypted.success:
    # Send encrypted.encrypted_data to receiver
else:
    # Check encrypted.status for the failure reason.
```
If you are a receiver, call `decrypt_token_into_raw_uid()`:

```py
decrypted = client.decrypt_token_into_raw_uid(uid_token)
# If decryption succeeded, use the raw UID2.
if decrypted.success:
    #  Use decrypted.uid
else:
    # Check decrypted.status for the failure reason.
```

For a full example, see the `sample_sharing_client.py` in [examples/sample_sharing_client.py](https://github.com/IABTechLab/uid2-client-python/blob/main/examples/sample_sharing_client.py).

## FAQs

For a list of frequently asked questions for DSPs, see [FAQs for DSPs](../getting-started/gs-faqs.md#faqs-for-dsps).
