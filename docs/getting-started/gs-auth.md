---
title: Authentication and Authorization
description: Authentication requirements for the UID2 endpoints.
hide_table_of_contents: false
sidebar_position: 05
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Authentication and Authorization

To authenticate to the UID2 endpoints in a server-side implementation, you need the following:

- A client [API key](gs-credentials.md#api-key-and-client-secret). The API key is included as a bearer token in the request's Authorization header. For example:<br/>
  `Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=`
- A client secret for encrypting API requests and decrypting API responses. This is needed for all endpoints except [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md). <br/>For details, and encryption/decryption examples in several different programming languages, see [Encrypting Requests and Decrypting Responses](gs-encryption-decryption.md).

:::note
If you're a publisher and are implementing UID2 on the client side, the authentication and authorization is managed automatically by your implementation, such as Prebid.js (see [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md)) or the JavaScript SDK (see [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md)).
:::
