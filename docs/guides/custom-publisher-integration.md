---
title: Publisher Integration Guide, Server-Only
description: Information about generating identity tokens using UID2 for the RTB bid stream, while integrating directly with UID2 rather than UID2-enabled single-sign-on or identity providers.
hide_table_of_contents: false
sidebar_position: 03
---

# Publisher Integration Guide, Server-Only

This guide is for publishers who want to generate identity tokens using UID2 for the RTB bid stream, while integrating directly with UID2 rather than UID2-enabled single-sign-on or identity providers. 

<!-- It includes the following sections:

- [Introduction](#introduction)
- [Integration Steps ](#integration-steps)
  - [Establish Identity: User Login](#establish-identity-user-login)
  - [Bid Using UID2 Tokens](#bid-using-uid2-tokens)
  - [Refresh Tokens](#refresh-tokens)
  - [Clear Identity: User Logout](#clear-identity-user-logout)
- [FAQs](#faqs) -->

## Introduction

The guide outlines the [basic steps](#integration-steps) that you need to consider if you're building an integration without using a client-side or server-side SDK. For example, you need to decide how to implement user login and logout, how to manage UID2 identity information and use it for targeted advertising, and how to refresh tokens, deal with missing identities, and handle user opt-outs. See also [FAQs](#faqs).

The following are the options available for publishers to integrate with UID2:

- Client [UID2 SDK for JavaScript](../sdks/client-side-identity.md), with [UID2 SDK for Java](../sdks/uid2-sdk-ref-java.md) on the server.
- Client [UID2 SDK for JavaScript](../sdks/client-side-identity.md), with custom server code.
- Server-only integration, with [UID2 SDK for Java](../sdks/uid2-sdk-ref-java.md) on the server.
- Server-only integration, with custom server code.

This document provides information for the last two options.

Here's an [example application](https://example-srvonly-integ.uidapi.com/) that demonstrates the workflow. For the application documentation, see [Server-Only UID2 Integration Example](https://github.com/IABTechLab/uid2-examples/blob/main/publisher/server_only/README.md). See also [FAQs](#faqs).

>TIP: To facilitate the process of establishing client identity using UID2 and retrieving advertising tokens, consider using the [UID2 SDK for JavaScript](../sdks/client-side-identity.md). For details, see [UID2 SDK for JavaScript Integration Guide](publisher-client-side.md).

## Integration Steps

The following diagram outlines the steps required for a user to establish a UID2 token with a publisher and how the UID2 token integrates with the RTB bid stream.

If you're using a server-side SDK, the SDK takes care of all the steps that mention endpoints: for example, step 1-d, the publisher sends the user's PII to the token generation service.. 

![Publisher Flow Without SDK](https://mermaid.ink/svg/eyJjb2RlIjoiICBzZXF1ZW5jZURpYWdyYW1cbiAgICBwYXJ0aWNpcGFudCBVIGFzIFVzZXJcbiAgICBwYXJ0aWNpcGFudCBQIGFzIFB1Ymxpc2hlclxuICAgIHBhcnRpY2lwYW50IFVJRDIgYXMgVUlEMiBTZXJ2aWNlXG4gICAgcGFydGljaXBhbnQgU1NQXG4gICAgTm90ZSBvdmVyIFUsU1NQOiAxLiBFc3RhYmxpc2ggSWRlbnRpdHlcbiAgICBVLT4-K1A6IDEtYS4gVGhlIHVzZXIgdmlzaXRzIGEgcHVibGlzaGVyIGFzc2V0LlxuICAgIFAtPj4tVTogMS1iLiBUaGUgcHVibGlzaGVyIGV4cGxhaW5zIHRoZSB2YWx1ZSBleGNoYW5nZSBvZiB0aGUgb3BlbiBpbnRlcm5ldCBhbmQgcmVxdWVzdHMgYSBsb2dpbi5cbiAgICBhY3RpdmF0ZSBVXG4gICAgVS0-PlA6IDEtYy4gVGhlIHVzZXIgYXV0aGVudGljYXRlcyBhbmQgYXV0aG9yaXplcyB0aGUgY3JlYXRpb24gb2YgYSBVSUQyLlxuICAgIGRlYWN0aXZhdGUgVVxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VUlEMjogMS1kLiBUaGUgcHVibGlzaGVyIHNlbmRzIHRoZSB1c2VyJ3MgUElJIHRvIHRoZSB0b2tlbiBnZW5lcmF0aW9uIHNlcnZpY2UuXG4gICAgZGVhY3RpdmF0ZSBQXG4gICAgYWN0aXZhdGUgVUlEMlxuICAgIFVJRDItPj5QOiAxLWUuIFRoZSB0b2tlbiBnZW5lcmF0aW9uIHNlcnZpY2UgcmV0dXJucyBVSUQyIHRva2Vucy5cbiAgICBkZWFjdGl2YXRlIFVJRDJcbiAgICBhY3RpdmF0ZSBQXG4gICAgUC0-PlU6IDEtZi4gVGhlIHB1Ymxpc2hlciBzZXRzIGEgVUlEMiBmb3IgdGhlIHVzZXIuXG4gICAgZGVhY3RpdmF0ZSBQXG4gICAgTm90ZSBvdmVyIFUsU1NQOiAyLiBCaWQgVXNpbmcgVUlEMiBUb2tlbnNcbiAgXG4gICAgUC0-PlNTUDogMi1hLiBUaGUgcHVibGlzaGVyIGNhbGxzIHRoZSBTU1AgZm9yIGFkcyB1c2luZyB0aGUgVUlEMiB0b2tlbi5cbiAgICBhY3RpdmF0ZSBTU1BcbiAgICBTU1AtPj5QOiAyLWIuIFRoZSBTU1AgcmV0dXJucyBhZHMgdG8gZGlzcGxheS5cbiAgICBkZWFjdGl2YXRlIFNTUFxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VTogMi1jLiBUaGUgcHVibGlzaGVyIGRpc3BsYXlzIHRoZSBhZHMgdG8gdGhlIHVzZXIuXG4gICAgZGVhY3RpdmF0ZSBQXG5cbiAgICBOb3RlIG92ZXIgVSxTU1A6IDMuIFJlZnJlc2ggVG9rZW5zXG4gICAgVS0-PlA6IDMtYS4gVGhlIHVzZXIgcmV0dXJucyB0byBhIHB1Ymxpc2hlciBhc3NldC5cbiAgICBhY3RpdmF0ZSBQXG4gICAgUC0-PlVJRDI6IDMtYi4gVGhlIHB1Ymxpc2hlciB1c2VzIGEgcmVmcmVzaCB0b2tlbiB0byByZXF1ZXN0IG5ldyBpZGVudGl0eSB0b2tlbnMgZm9yIHRoZSB1c2VyLlxuICAgIGRlYWN0aXZhdGUgUFxuICAgIGFjdGl2YXRlIFVJRDJcbiAgICBVSUQyLT4-UDogMy1jLiBJZiBhIHVzZXIgaGFzbid0IG9wdGVkIG91dCwgdGhlIHJlZnJlc2ggdG9rZW4gc2VydmljZSByZXR1cm5zIG5ldyBpZGVudGl0eSB0b2tlbnMuXG4gICAgZGVhY3RpdmF0ZSBVSUQyXG4gICAgYWN0aXZhdGUgUFxuICAgIFAtPj5VOiAzLWQuIFRoZSBwdWJsaXNoZXIgc2V0cyB0aGUgbmV3IFVJRDIgZm9yIHRoZSB1c2VyLlxuICAgIGRlYWN0aXZhdGUgUFxuXG4gICAgTm90ZSBvdmVyIFUsU1NQOiA0LiBVc2VyIExvZ291dFxuICAgIFUtPj5QOiA0LWEuIFRoZSB1c2VyIGxvZ3Mgb3V0IGZyb20gYSBwdWJsaXNoZXIgYXNzZXQuXG4gICAgYWN0aXZhdGUgUFxuICAgIFAtPj5VOiA0LWIuIFRoZSB1c2VyJ3MgaWRlbnRpdHkgY2xlYXJzLlxuICAgIGRlYWN0aXZhdGUgUCIsIm1lcm1haWQiOnsidGhlbWUiOiJmb3Jlc3QifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)

The following sections provide additional details for each step in the diagram:
 
 1. [Establish identity: user login](#establish-identity-user-login)
 2. [Bid using UID2 tokens](#bid-using-uid2-tokens)
 3. [Refresh tokens](#refresh-tokens)
 4. [Clear Identity: user logout](#clear-identity-user-logout)

### Establish Identity: User Login

After authentication in step 1-c, which forces the user to accept the rules of engagement and allows the publisher to validate their email address or phone number, a UID2 token must be generated on the server side. The following table details the token generation steps.

| Step | Endpoint | Description |
| :--- | :--- | :--- |
| 1-d | [POST /token/generate](../endpoints/post-token-generate.md) | There are two ways for publishers to establish identity with UID2:<br/>- Integrate with a UID2-enabled single-sign-on provider.<br/>- Use the [POST /token/generate](../endpoints/post-token-generate.md) endpoint to generate a UID2 token using the provided normalized email address or phone number of the user. |
| 1-e | [POST /token/generate](../endpoints/post-token-generate.md) | Return a UID2 token generated from the user's email address, phone number, or the respective hash. |
| 1-f | N/A | Place the returned `advertising_token` and `refresh_token` in a store tied to a user. You may consider client-side storage like a first-party cookie or server-side storage. |

### Bid Using UID2 Tokens

You need to consider how you want to manage UID2 identity information and use it for targeted advertising, for example, to pass the returned advertising token to SSPs.

| Step | Endpoint | Description |
| :--- | :--- | :--- |
| 2-a | N/A| Send the `advertising_token` from step [1-e](#establish-identity) to the SSP for bidding. Send the value as is. |

### Refresh Tokens

Leverage the refresh endpoint to retrieve the latest version of UID2 tokens. The UID2 token must be refreshed to sync the user's UID2 rotation and opt-out status. If the user opts out, using their refresh token will end their token refresh chain.

| Step | Endpoint | Description |
| :--- | :--- | :--- |
| 3-a |N/A | When a user returns to an asset and becomes active again, refresh the identity token before sending it to the SSP. | 
| 3-b | [POST /token/refresh](../endpoints/post-token-refresh.md)  | Send the `refresh_token` obtained in step [1-e](#establish-identity) as a query parameter. |
| 3-c | [POST /token/refresh](../endpoints/post-token-refresh.md) | The UID2 service issues a new identity token for users that haven't opted out. |
| 3-d | N/A| Place the returned `advertising_token` and `refresh_token` in a store tied to a user. You may consider client-side storage like a first-party cookie or server-side storage. |

>TIP: Refresh tokens starting from the `refresh_from` timestamp on the identity returned by the [POST /token/generate](../endpoints/post-token-generate.md) or [POST /token/refresh](../endpoints/post-token-refresh.md) calls. 

### Clear Identity: User Logout

| Step | Endpoint | Description |
| :--- | :--- | :--- |
| 4-a | N/A | The user logs out from a publisher asset. |
| 4-b | N/A | Remove the UID2 tokens you have stored for that user. No interaction with the UID2 service is required. |

## FAQs

For a list of frequently asked questions for the publisher audience, see [FAQs for Publishers Not Using an SDK](../getting-started/gs-faqs.md#faqs-for-publishers-not-using-an-sdk).

For a full list, see [Frequently Asked Questions](../getting-started/gs-faqs.md).