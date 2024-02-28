---
title: UID2 Credentials
description: Learn about the credentials you'll need and how to get them.
hide_table_of_contents: false
sidebar_position: 03
---

# UID2 Credentials

Each UID2 <a href="/docs/intro#participants">participant</a> gets a set of unique credentials. The set of credentials you get is determined by how you are participating in UID2, as shown in the following table.

| Audience | Credentials | Integration |
| :--- | :--- | :--- |
| Participants using a server-side endpoint | Both of the following:<ul><li>[API key](../ref-info/glossary-uid.md#gl-api-key), also called a client key</li><li>[Client secret](../ref-info/glossary-uid.md#gl-client-secret), a value known only to the participant and the UID2 service</li></ul> | Any integration using one of these endpoints: <ul><li>[POST&nbsp;/identity/map](../endpoints/post-identity-map.md)</li><li>[POST&nbsp;/identity/buckets](../endpoints/post-identity-buckets.md)</li><li>[POST&nbsp;/token/generate](../endpoints/post-token-generate.md)</li></ul> |
| Participants using a client-side implementation | Both of the following: <ul><li>Subscription ID</li><li>Public key</li></ul> | Integrations using one of these: <ul><li>[UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md)</li><li>[Client-Side Integration Guide for JavaScript](../guides/publisher-client-side.md)</li></ul> |

If you're using the integration environment as well as the production environment, you'll get a separate set of credentials for each environment.

<!-- It includes:

* [API Key and Client Secret](#api-key-and-client-secret)
  * [Security of API Key and Client Secret](#security-of-api-key-and-client-secret)
* [Subscription ID and Public Key](#subscription-id-and-public-key)
* [Refreshing Credentials](#refreshing-credentials)
 -->

## API Key and Client Secret

If you're using a server-side implementation (see [UID2 Server-Side Integration Guide for Prebid.js](../guides/integration-prebid-server-side.md) or [Server-Side Integration Guide for JavaScript](../guides/integration-javascript-server-side.md)), the API key and client secret allow you to connect to the [Operator Service](../ref-info/glossary-uid.md#gl-operator-service) and call API endpoints. These values identify you to the service.

Here is some information about API keys and client secrets:
- One UID2 participant can have multiple keys.
- Each key has a set of [permissions](gs-permissions.md) that determine the endpoints you can use it on.
- Each key has a corresponding client secret.
- Most API endpoints require both API key and client secret for authentication. For details, see [Authentication and Authorization](gs-auth.md).
- If you're using the integration environment as well as the production environment, you'll receive separate API keys for each environment.
- The client secret is valid for a specific [environment](gs-environments.md). If you're using both the integration and production environments, you'll get a client secret for each environment.

As part of getting your UID2 account set up, one or more API keys, each with a corresponding client secret, will be issued to you. For details of who to talk to, see [Contact Info](gs-account-setup.md#contact-info).

### Security of API Key and Client Secret

Security of keys and client secrets is very important. Follow these guidelines:

- When you receive your API key and client secret, store them in a secure location.
- Keep track of all places where these values are stored and used, so that if you need to rotate the key you can do it quickly.
- Establish a process for replacing the key and secret with new values if the existing ones are compromised.

It's best to refresh your API key and client secret on a regular cadence&#8212;for example, yearly&#8212;to help reduce the risk of your credentials being compromised.

## Subscription ID and Public Key

If you're using a client-side implementation (see [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md) or [Client-Side Integration Guide for JavaScript](../guides/publisher-client-side.md)), you'll receive the following credentials:
- **Subscription ID**: This value identifies your site to the UID2 service.
- **Public key**: This value is used for encryption.

When you're implementing UID2 on the client side, by using the UID2 JavaScript SDK or Prebid, provide the values to the SDK or to Prebid as part of configuration.

Notes:

- Unlike the API key and client secret, the Subscription ID and public key do not have to be kept secure.

- The values are valid for a specific [environment](gs-environments.md). If you're using both the integration and production environments, you'll get a set of credentials for each environment.

- Subscription ID and public key credentials can be used only to generate client-side tokens. If you need any additional roles (see [API Permissions](gs-permissions.md)), request API Key and Client Secret for those roles. <!-- (**GWH_KT added last bullet to this GS article based on work on Publisher Options page. Review please.**) -->

## Refreshing Credentials

To request new credentials at any time, ask your UID2 contact.
