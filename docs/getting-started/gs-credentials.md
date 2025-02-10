---
title: UID2 Credentials
description: Learn about the credentials you'll need and how to get them.
hide_table_of_contents: false
sidebar_position: 03
---

import Link from '@docusaurus/Link';

# UID2 Credentials

Each UID2 <a href="../intro#participants">participant</a> needs at least one set of unique credentials. The set of credentials you need is determined by how you are participating in UID2, as shown in the following table.

| Audience | Credentials | Integration |
| :--- | :--- | :--- |
| Participants using a client-side implementation | Both of the following: <ul><li><Link href="../ref-info/glossary-uid#gl-subscription-id">Subscription ID</Link></li><li><Link href="../ref-info/glossary-uid#gl-public-key">Public key</Link></li></ul>These two, together, are sometimes called <Link href="../ref-info/glossary-uid#gl-client-keypair">client keypair</Link>. | Integrations using one of these: <ul><li>[UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md)</li><li>[Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md)</li><li>[UID2 Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md)</li></ul> |
| Participants using a client-server implementation | Both of the following:<ul><li><Link href="../ref-info/glossary-uid#gl-api-key">API key</Link>, also called a client key</li><li><Link href="../ref-info/glossary-uid#gl-client-secret">Client secret</Link>, a value known only to the participant and the UID2 service</li></ul> | Integrations using one of these: <ul><li>[Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md)</li><li>[UID2 Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-client-server.md)</li><li>[UID2 Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md)</li></ul> |
| Participants using a server-side implementation | Both of the following:<ul><li><Link href="../ref-info/glossary-uid#gl-api-key">API key</Link>, also called a client key</li><li><Link href="../ref-info/glossary-uid#gl-client-secret">Client secret</Link>, a value known only to the participant and the UID2 service</li></ul> | Integrations using one of these: <ul><li>[Publisher Integration Guide, Server-Side](../guides/integration-publisher-server-side.md)</li><li>[Advertiser/Data Provider Integration Overview](../guides/integration-advertiser-dataprovider-overview.md)</li></ul> |

## Separate Credentials Per Environment/Role

If you're using the integration <Link href="../ref-info/glossary-uid#gl-environment">environment</Link> as well as the production environment, you'll get a separate set of credentials for each environment. See [Getting Your Credentials](#getting-your-credentials).

In addition, in some cases, we recommend, but do not require, that you have a different set of credentials for a different scenario. For example:
- If you're a publisher who generates UID2 tokens (via [POST /token/generate](../endpoints/post-token-generate.md) or in some other way), but you also create/map raw UID2s on your own behalf (see [POST /identity/map](../endpoints/post-identity-map.md)), you might have separate credentials for each of these activities.
- If you're an advertiser, in a scenario where you allow multiple service providers to operate using your advertiser keys, you might choose to have separate credentials for each service provider.

## Getting Your Credentials

The following table shows how you get your credentials, for each [integration approach](../ref-info/ref-integration-approaches.md) and each [environment](../getting-started/gs-environments.md).

<table>
  <thead>
    <tr>
      <th>Environment</th>
      <th>Integration Type</th>
      <th>Getting Credentials</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3"><br/><br/>Prod</td>
      <td>Client-Side</td>
      <td>UID2 Portal > [Client-Side Integration](../portal/client-side-integration.md)</td>
    </tr>
    <tr>

      <td>Client-Server</td>
      <td>UID2 Portal > [API Keys](../portal/api-keys.md)</td>
    </tr>
    <tr>

      <td>Server-Side</td>
      <td>UID2 Portal > [API Keys](../portal/api-keys.md)</td>
    </tr>
    <tr>
      <td rowspan="3"><br/><br/>Integ</td>
      <td>Client-Side</td>
      <td rowspan="3"><br/><br/>Ask your UID2 contact.</td>
    </tr>
    <tr>

      <td>Client-Server</td>

    </tr>
    <tr>

      <td>Server-Side</td>

    </tr>
  </tbody>
</table>

<!-- 
For no-portal:
To get your credentials, ask your UID2 contact.
-->

## Subscription ID and Public Key

If you're using a client-side implementation (see [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md) or [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md)), you'll receive the following credentials:
- **Subscription ID**: This value identifies your site to the UID2 service.
- **Public key**: This value is used for encryption.

**Client keypair** is a group term we use for these two values, which are used to uniquely define an account that's using an implementation that generates the token on the client side.

When you're implementing UID2 on the client side, by using the UID2 JavaScript SDK, Client-Side Integration for Mobile, or Prebid.js, provide the values to the SDK or to Prebid.js as part of configuration.

Notes:

- Unlike the API key and client secret, the Subscription ID and public key do not have to be kept secure.

- The values are valid for a specific environment. If you're using both the integration and production environments, you'll get a set of credentials for each environment.

- Subscription ID and public key credentials can be used only to generate client-side tokens. If you need any additional roles (see [API Permissions](gs-permissions.md)), request API Key and Client Secret for those roles.

## API Key and Client Secret

If you're using a client-server or server-side implementation (see [UID2 Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-client-server.md) or [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md)), the API key and client secret allow you to connect to the <Link href="../ref-info/glossary-uid#gl-operator-service">Operator Service</Link> and call API endpoints. These values identify you to the service.

Here is some information about API keys and client secrets:
- You must keep these values secure. For details, see [Security of API Key and Client Secret](#security-of-api-key-and-client-secret).
- One UID2 participant can have multiple keys.
- Each key has a set of [permissions](gs-permissions.md) that determine the endpoints you can use it on.
- Each key has a corresponding client secret.
- Most API endpoints require both API key and client secret for authentication. For details, see [Authentication and Authorization](gs-auth.md).
- If you're using the integration environment as well as the production environment, you'll receive separate API keys for each environment. For details, see [Getting Your Credentials](#getting-your-credentials).
- The client secret is valid for a specific [environment](gs-environments.md). If you're using both the integration and production environments, you'll get a client secret for each environment.

As part of getting your UID2 account set up, we'll give you one or more API keys, each with a corresponding client secret. For details of who to talk to, see [Contact Info](gs-account-setup.md#contact-info).

### Security of API Key and Client Secret

Security of keys and client secrets is very important. Follow these guidelines:

- When you receive your API key and client secret, store them in a secure location.
- Keep track of all places where these values are stored and used, so that if you need to rotate the key you can do it quickly.
- Establish a process for replacing the key and secret with new values if the existing ones are compromised.

It's best to refresh your API key and client secret on a regular cadence&#8212;for example, yearly&#8212;to help reduce the risk of your credentials being compromised.

## Refreshing Credentials

To request new credentials at any time, do one of the following:

- If you have UID2 Portal access, and you need new Production credentials: go to the page listed in [Getting Your Credentials](#getting-your-credentials).
- If you don't have UID2 Portal access, or you need new credentials for the Integration environment, ask your UID2 contact.

<!-- 
For no-portal:
To request new credentials at any time, ask your UID2 contact. 
-->
