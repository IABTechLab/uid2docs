---
title: Authentication and Authorization
description: Authentication requirements for the UID2 endpoints.
hide_table_of_contents: false
sidebar_position: 05
---

# Authentication and Authorization

To authenticate to the UID2 endpoints in a server-side implementation, you need the following:

- A client [API key](gs-credentials.md#api-key-and-client-secret). The API key is included as a bearer token in the request's Authorization header. For example:<br/>
  `Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=`
- A client secret for encrypting API requests and decrypting API responses. This is needed for all endpoints except [POST /token/refresh](../endpoints/post-token-refresh.md). <br/>For details and Python examples, see [Encrypting Requests and Decrypting Responses](gs-encryption-decryption.md).