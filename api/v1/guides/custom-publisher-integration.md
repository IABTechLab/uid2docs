[UID2 API Documentation](../../README.md) > v1 > [Integration Guides](README.md) > Custom Publisher Integration Guide 

# Overview

This guide covers integration steps for app developers and CTV broadcasters who would like to generate identity tokens utilizing UID2 for the bid stream. This guide focuses on publishers who would like to integrate directly with UID2 to create and manage tokens rather than integrate with UID2-enabled single-sign-on or identity providers.

## Integration Steps

The following integration steps outline the lifecycle for a user establishing a UID2 token with a publisher and how the UID2 token integrates with the RTB bid stream.

![Custom Publisher Flow](https://mermaid.ink/svg/eyJjb2RlIjoiICBzZXF1ZW5jZURpYWdyYW1cbiAgICBwYXJ0aWNpcGFudCBVIGFzIFVzZXJcbiAgICBwYXJ0aWNpcGFudCBQIGFzIFB1Ymxpc2hlclxuICAgIHBhcnRpY2lwYW50IFVJRDIgYXMgVUlEMiBTZXJ2aWNlXG4gICAgcGFydGljaXBhbnQgU1NQXG4gICAgTm90ZSBvdmVyIFUsU1NQOiAxLiBFc3RhYmxpc2ggSWRlbnRpdHlcbiAgICBVLT4-K1A6IDEtYS4gVGhlIHVzZXIgdmlzaXRzIGEgcHVibGlzaGVyIGFzc2V0LlxuICAgIFAtPj4tVTogMS1iLiBUaGUgcHVibGlzaGVyIGV4cGxhaW5zIHRoZSB2YWx1ZSBleGNoYW5nZSBvZiB0aGUgb3BlbiBpbnRlcm5ldCBhbmQgcmVxdWVzdHMgYSBsb2dpbi5cbiAgICBhY3RpdmF0ZSBVXG4gICAgVS0-PlA6IDEtYy4gVGhlIHVzZXIgYXV0aGVudGljYXRlcyBhbmQgYXV0aG9yaXplcyB0aGUgY3JlYXRpb24gb2YgYSBVSUQyLlxuICAgIGRlYWN0aXZhdGUgVVxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VUlEMjogMS1kLiBUaGUgcHVibGlzaGVyIHNlbmRzIHRoZSB1c2VyJ3MgUElJIHRvIHRoZSB0b2tlbiBnZW5lcmF0aW9uIHNlcnZpY2UuXG4gICAgZGVhY3RpdmF0ZSBQXG4gICAgYWN0aXZhdGUgVUlEMlxuICAgIFVJRDItPj5QOiAxLWUuIFRoZSB0b2tlbiBnZW5lcmF0aW9uIHNlcnZpY2UgcmV0dXJucyBVSUQyIHRva2Vucy5cbiAgICBkZWFjdGl2YXRlIFVJRDJcbiAgICBhY3RpdmF0ZSBQXG4gICAgUC0-PlU6IDEtZi4gVGhlIHB1Ymxpc2hlciBzZXRzIGEgVUlEMiBmb3IgdGhlIHVzZXIuXG4gICAgZGVhY3RpdmF0ZSBQXG4gICAgTm90ZSBvdmVyIFUsU1NQOiAyLiBCaWQgVXNpbmcgVUlEMiBUb2tlbnNcbiAgXG4gICAgUC0-PlNTUDogMi1hLiBUaGUgcHVibGlzaGVyIGNhbGxzIHRoZSBTU1AgZm9yIGFkcyB1c2luZyB0aGUgVUlEMiB0b2tlbi5cbiAgICBhY3RpdmF0ZSBTU1BcbiAgICBTU1AtPj5QOiAyLWIuIFRoZSBTU1AgcmV0dXJucyBhZHMgdG8gZGlzcGxheS5cbiAgICBkZWFjdGl2YXRlIFNTUFxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VTogMi1jLiBUaGUgcHVibGlzaGVyIGRpc3BsYXlzIHRoZSBhZHMgdG8gdGhlIHVzZXIuXG4gICAgZGVhY3RpdmF0ZSBQXG5cbiAgICBOb3RlIG92ZXIgVSxTU1A6IDMuIFJlZnJlc2ggVG9rZW5zXG4gICAgVS0-PlA6IDMtYS4gVGhlIHVzZXIgcmV0dXJucyB0byBhIHB1Ymxpc2hlciBhc3NldC5cbiAgICBhY3RpdmF0ZSBQXG4gICAgUC0-PlVJRDI6IDMtYi4gVGhlIHB1Ymxpc2hlciB1c2VzIGEgcmVmcmVzaCB0b2tlbiB0byByZXF1ZXN0IG5ldyBpZGVudGl0eSB0b2tlbnMgZm9yIHRoZSB1c2VyLlxuICAgIGRlYWN0aXZhdGUgUFxuICAgIGFjdGl2YXRlIFVJRDJcbiAgICBVSUQyLT4-UDogMy1jLiBJZiBhIHVzZXIgaGFzbid0IG9wdGVkIG91dCwgdGhlIHJlZnJlc2ggdG9rZW4gc2VydmljZSByZXR1cm5zIG5ldyBpZGVudGl0eSB0b2tlbnMuXG4gICAgZGVhY3RpdmF0ZSBVSUQyXG4gICAgYWN0aXZhdGUgUFxuICAgIFAtPj5VOiAzLWQuIFRoZSBwdWJsaXNoZXIgc2V0cyB0aGUgbmV3IFVJRDIgZm9yIHRoZSB1c2VyLlxuICAgIGRlYWN0aXZhdGUgUFxuXG4gICAgTm90ZSBvdmVyIFUsU1NQOiA0LiBVc2VyIExvZ291dFxuICAgIFUtPj5QOiA0LWEuIFRoZSB1c2VyIGxvZ3Mgb3V0IGZyb20gYSBwdWJsaXNoZXIgYXNzZXQuXG4gICAgYWN0aXZhdGUgUFxuICAgIFAtPj5VOiA0LWIuIFRoZSB1c2VyJ3MgaWRlbnRpdHkgY2xlYXJzLlxuICAgIGRlYWN0aXZhdGUgUCIsIm1lcm1haWQiOnsidGhlbWUiOiJmb3Jlc3QifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)

## 1. Establish Identity

This section focuses on publisher-specific steps 1-d, 1-e, and 1-f illustrated in the above diagram.

| Step | Endpoint/SDK | Instruction |
| --- | --- | --- |
| d | [GET /token/generate](../endpoints/get-token-generate.md) | There are two ways for publishers to establish identity with UID2.<br>1. Integrate with a UID2-enabled single-sign-on provider.<br>2. Generate UID2 tokens when a user authenticates using the [GET /token/generate](../endpoints/get-token-generate.md) endpoint. The request includes a user's normalized email address or the base64-encoded SHA256 hash of the user's normalized email address. [Click here to view email normalization rules.](../../README.md##email-normalization) |
| e | [GET /token/generate](../endpoints/get-token-generate.md) | The token generation service returns UID2 tokens. |
| f |  | Place the returned `advertising_token` and `refresh_token` in a store tied to a user. You may consider client-side storage like a first-party cookie or server-side storage. |

## 2. Bid Using UID2 Tokens

This section focuses on publisher-specific step 2-a illustrated in the above diagram.

| Step | Endpoint/SDK | Instruction |
| --- | --- | --- |
| a | | The publisher sends the `advertising_token` from [1](#1-establish-identity) to the SSP for bidding. Send the value as-is. |

### 3. Refresh Tokens

Leverage the refresh endpoints to retrieve the latest version of UID2 tokens. UID2 token refreshes are required to sync a user's UID2 rotation and opt-out status. If a user opts out, using their refresh token will end their token refresh chain.

| Step | Endpoint/SDK | Instruction |
| --- | --- | --- |
| a | | When a user returns to an asset and becomes active again, refresh the identity token before sending it to the SSP. | 
| b | [GET /token/refresh](../endpoints/get-token-refresh.md)  | Send the `refresh_token` obtained in [1](#1-establish-identity) as a query parameter. |
| c | [GET /token/refresh](../endpoints/get-token-refresh.md) | The UID2 service issues a new identity token for users that haven't opted out. |
| d | | Place the returned `advertising_token` and `refresh_token` in a store tied to a user. You may consider client-side storage like a first-party cookie or server-side storage. |

We recommend refreshing active user identity tokens every 5 minutes. 
There is no need to refresh tokens for inactive users.

### 4. User Logout

| Step | Endpoint/SDK | Instruction |
| --- | --- | --- |
| a |  | The user logs out from a publisher asset. |
| b |  | Remove the UID2 tokens you have stored for that user. No interaction with the UID2 service is required. |

# Frequently Asked Questions

### Do I need to decrypt tokens?
No, publishers do not need to decrypt tokens.

### How will I be notified of user opt-out?
The token refresh process handles user opt-outs. Using their refresh token automatically clears their session and disrupts their ```refresh_token``` chain when a user opts out. No manual action is required. 

### What is the uniqueness and rotation policy for UID2 token?

The UID2 service encrypts tokens using random initialization vectors. The encrypted UID2 is unique for a given user as they browse the internet. At every refresh, the token re-encrypts. This mechanism ensures that untrusted parties cannot track a user's identity.

### How can I test my integration?
There are two built-in tools you can use to test your integration.

#### Test that PII sent and returned tokens match
You can use the [GET /token/validate](../endpoints/get-token-validate.md) endpoint to check whether the PII you are sending through [GET /token/generate](../endpoints/get-token-generate.md) is valid. 

1. Send a [GET /token/generate](../endpoints/get-token-generate.md) request using `validate@email.com` as `email`, or create a base64-encoded SHA256 hash of `validate@email.com` and send it through as an email hash. Store the `advertising_token` returned to use in step 2.
2. Send a [GET /token/validate](../endpoints/get-token-validate.md) request using the `email` or `email_hash` you sent in step 1 and the `token` as the `advertising_token` returned in step 1. If the response returns `true`, the `email` or `email_hash` you sent as a request in step 1 match the token you received in the response of step 1. If it returns `false`, there may be an issue with the way you are sending email addresses or email hashes.

#### Test refresh token logout workflow

You can use the email address `optout@email.com` to test your token refresh workflow. Using this email for the request always generates an identity response with a `refresh_token` that results in a logout response.

1. Send a [GET /token/generate](../endpoints/get-token-generate.md) request using `optout@email.com` as `email`, or create a base64-encoded SHA256 hash of `optout@email.com` and send it through as an email hash. Store the `refresh_token` returned to use in step 2.
2. Send a [GET /token/validate](../endpoints/get-token-validate.md) request using the `email` or `email_hash` you sent in step 1 and the `refresh_token` as the `refresh_token` returned in step 1. The `body` response should be empty because the `optout@email.com` email always results in a logged out refresh token.
