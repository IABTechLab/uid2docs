[UID2 API Documentation](../../README.md) > v1 > [Integration Guides](README.md) > Custom Publisher Integration Guide 

# Server-Only UID2 Integration Guide

This guide is intended for app developers and CTV broadcasters who would like to generate identity tokens utilizing UID2 for the RTB bid stream, while integrating directly with UID2 rather than UID2-enabled single-sign-on or identity providers. 

The guide outlines the [basic steps](#integration-steps) that you need to consider for your custom integration. For example, you need to decide how to implement user login and logout, how to manage UID2 identity information and use it for targeted advertising, how to refresh tokens, deal with missing identities, and handle user opt-outs. See also [FAQs](#faqs) and [Server-Only UID2 Integration Example](https://github.com/UnifiedID2/uid2-examples/blob/main/publisher/server_only/README.md).

>TIP: To facilitate the process of establishing client identity using UID2 and retrieving advertising tokens, consider using the [Client-Side Identity JavaScript SDK](../sdks/client-side-identity-v1.md). For details, see [UID2 SDK Integration Guide](./publisher-client-side.md).

## Integration Steps

The following diagram outlines the steps required for a user to establish a UID2 token with a publisher and how the UID2 token integrates with the RTB bid stream.

![Custom Publisher Flow](https://mermaid.ink/svg/eyJjb2RlIjoiICBzZXF1ZW5jZURpYWdyYW1cbiAgICBwYXJ0aWNpcGFudCBVIGFzIFVzZXJcbiAgICBwYXJ0aWNpcGFudCBQIGFzIFB1Ymxpc2hlclxuICAgIHBhcnRpY2lwYW50IFVJRDIgYXMgVUlEMiBTZXJ2aWNlXG4gICAgcGFydGljaXBhbnQgU1NQXG4gICAgTm90ZSBvdmVyIFUsU1NQOiAxLiBFc3RhYmxpc2ggSWRlbnRpdHlcbiAgICBVLT4-K1A6IDEtYS4gVGhlIHVzZXIgdmlzaXRzIGEgcHVibGlzaGVyIGFzc2V0LlxuICAgIFAtPj4tVTogMS1iLiBUaGUgcHVibGlzaGVyIGV4cGxhaW5zIHRoZSB2YWx1ZSBleGNoYW5nZSBvZiB0aGUgb3BlbiBpbnRlcm5ldCBhbmQgcmVxdWVzdHMgYSBsb2dpbi5cbiAgICBhY3RpdmF0ZSBVXG4gICAgVS0-PlA6IDEtYy4gVGhlIHVzZXIgYXV0aGVudGljYXRlcyBhbmQgYXV0aG9yaXplcyB0aGUgY3JlYXRpb24gb2YgYSBVSUQyLlxuICAgIGRlYWN0aXZhdGUgVVxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VUlEMjogMS1kLiBUaGUgcHVibGlzaGVyIHNlbmRzIHRoZSB1c2VyJ3MgUElJIHRvIHRoZSB0b2tlbiBnZW5lcmF0aW9uIHNlcnZpY2UuXG4gICAgZGVhY3RpdmF0ZSBQXG4gICAgYWN0aXZhdGUgVUlEMlxuICAgIFVJRDItPj5QOiAxLWUuIFRoZSB0b2tlbiBnZW5lcmF0aW9uIHNlcnZpY2UgcmV0dXJucyBVSUQyIHRva2Vucy5cbiAgICBkZWFjdGl2YXRlIFVJRDJcbiAgICBhY3RpdmF0ZSBQXG4gICAgUC0-PlU6IDEtZi4gVGhlIHB1Ymxpc2hlciBzZXRzIGEgVUlEMiBmb3IgdGhlIHVzZXIuXG4gICAgZGVhY3RpdmF0ZSBQXG4gICAgTm90ZSBvdmVyIFUsU1NQOiAyLiBCaWQgVXNpbmcgVUlEMiBUb2tlbnNcbiAgXG4gICAgUC0-PlNTUDogMi1hLiBUaGUgcHVibGlzaGVyIGNhbGxzIHRoZSBTU1AgZm9yIGFkcyB1c2luZyB0aGUgVUlEMiB0b2tlbi5cbiAgICBhY3RpdmF0ZSBTU1BcbiAgICBTU1AtPj5QOiAyLWIuIFRoZSBTU1AgcmV0dXJucyBhZHMgdG8gZGlzcGxheS5cbiAgICBkZWFjdGl2YXRlIFNTUFxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VTogMi1jLiBUaGUgcHVibGlzaGVyIGRpc3BsYXlzIHRoZSBhZHMgdG8gdGhlIHVzZXIuXG4gICAgZGVhY3RpdmF0ZSBQXG5cbiAgICBOb3RlIG92ZXIgVSxTU1A6IDMuIFJlZnJlc2ggVG9rZW5zXG4gICAgVS0-PlA6IDMtYS4gVGhlIHVzZXIgcmV0dXJucyB0byBhIHB1Ymxpc2hlciBhc3NldC5cbiAgICBhY3RpdmF0ZSBQXG4gICAgUC0-PlVJRDI6IDMtYi4gVGhlIHB1Ymxpc2hlciB1c2VzIGEgcmVmcmVzaCB0b2tlbiB0byByZXF1ZXN0IG5ldyBpZGVudGl0eSB0b2tlbnMgZm9yIHRoZSB1c2VyLlxuICAgIGRlYWN0aXZhdGUgUFxuICAgIGFjdGl2YXRlIFVJRDJcbiAgICBVSUQyLT4-UDogMy1jLiBJZiBhIHVzZXIgaGFzbid0IG9wdGVkIG91dCwgdGhlIHJlZnJlc2ggdG9rZW4gc2VydmljZSByZXR1cm5zIG5ldyBpZGVudGl0eSB0b2tlbnMuXG4gICAgZGVhY3RpdmF0ZSBVSUQyXG4gICAgYWN0aXZhdGUgUFxuICAgIFAtPj5VOiAzLWQuIFRoZSBwdWJsaXNoZXIgc2V0cyB0aGUgbmV3IFVJRDIgZm9yIHRoZSB1c2VyLlxuICAgIGRlYWN0aXZhdGUgUFxuXG4gICAgTm90ZSBvdmVyIFUsU1NQOiA0LiBVc2VyIExvZ291dFxuICAgIFUtPj5QOiA0LWEuIFRoZSB1c2VyIGxvZ3Mgb3V0IGZyb20gYSBwdWJsaXNoZXIgYXNzZXQuXG4gICAgYWN0aXZhdGUgUFxuICAgIFAtPj5VOiA0LWIuIFRoZSB1c2VyJ3MgaWRlbnRpdHkgY2xlYXJzLlxuICAgIGRlYWN0aXZhdGUgUCIsIm1lcm1haWQiOnsidGhlbWUiOiJmb3Jlc3QifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0)

The following sections provide additional details for each step in the diagram:
 
 1. [Establish identity: user login](#establish-identity-user-login)
 2. [Bid using UID2 tokens](#bid-using-uid2-tokens)
 3. [Refresh tokens](#refresh-tokens)
 4. [Clear Identity: user logout](#clear-identity-user-logout)

### Establish Identity: User Login

After authentication in step 1-c, which forces the user to accept the rules of engagement and allows the publisher to validate their email address, a UID2 token must be generated on the server side. The following table details the token generation steps.

| Step | Endpoint | Description |
| :--- | :--- | :--- |
| 1-d | [GET /token/generate](../endpoints/get-token-generate.md) | There are two ways for publishers to establish identity with UID2:<br/>- Integrate with a UID2-enabled single-sign-on provider.<br/>- Use the [GET /token/generate](../endpoints/get-token-generate.md) endpoint to generate a UID2 token using the provided [normalized](../../README.md#emailnormalization) email address of the user. |
| 1-e | [GET /token/generate](../endpoints/get-token-generate.md) | Return a UID2 token generated from the user's email address or hashed email address. |
| 1-f | N/A | Place the returned `advertising_token` and `refresh_token` in a store tied to a user. You may consider client-side storage like a first-party cookie or server-side storage. |

### Bid Using UID2 Tokens

You need to consider how you want to manage UID2 identity information and use it for targeted advertising, for example, pass the returned advertising token to SSPs.

| Step | Endpoint | Description |
| :--- | :--- | :--- |
| 2-a | N/A| Send the `advertising_token` from step [1-e](#establish-identity) to the SSP for bidding. Send the value as is. |

### Refresh Tokens

Leverage the refresh endpoint to retrieve the latest version of UID2 tokens. The UID2 token must be refreshed to sync the user's UID2 rotation and opt-out status. If the user opts out, using their refresh token will end their token refresh chain.

| Step | Endpoint | Description |
| :--- | :--- | :--- |
| 3-a |N/A | When a user returns to an asset and becomes active again, refresh the identity token before sending it to the SSP. | 
| 3-b | [GET /token/refresh](../endpoints/get-token-refresh.md)  | Send the `refresh_token` obtained in step [1-e](#establish-identity) as a query parameter. |
| 3-c | [GET /token/refresh](../endpoints/get-token-refresh.md) | The UID2 service issues a new identity token for users that haven't opted out. |
| 3-d | N/A| Place the returned `advertising_token` and `refresh_token` in a store tied to a user. You may consider client-side storage like a first-party cookie or server-side storage. |

>TIP: Refresh tokens starting from the `refresh_from` timestamp on the identity returned by the [GET /token/generate](../endpoints/get-token-generate.md) or [GET /token/refresh](../endpoints/get-token-refresh.md) calls. 

### Clear Identity: User Logout

| Step | Endpoint | Description |
| :--- | :--- | :--- |
| 4-a | N/A | The user logs out from a publisher asset. |
| 4-b | N/A | Remove the UID2 tokens you have stored for that user. No interaction with the UID2 service is required. |

## FAQs

### Do I need to decrypt tokens?
No, publishers do not need to decrypt tokens.

### How will I be notified of user opt-out?
The token refresh process handles user opt-outs. The [GET /token/refresh](../endpoints/get-token-refresh.md) returns empty identity and the optout status for the user. To resume using UID2-based targeted advertising, the user needs to log in again to re-establish the UID2 identity.

### What is the uniqueness and rotation policy for UID2 token?

The UID2 service encrypts tokens using random initialization vectors. The encrypted UID2 is unique for a given user as they browse the internet. At every refresh, the token re-encrypts. This mechanism ensures that untrusted parties cannot track a user's identity.

### How can I test that the PII sent and returned tokens match?

You can use the [GET /token/validate](../endpoints/get-token-validate.md) endpoint to check whether the PII you are sending through [GET /token/generate](../endpoints/get-token-generate.md) is valid. 

1. Do either of the following:
    - Send a [GET /token/generate](../endpoints/get-token-generate.md) request using `validate@email.com` as `email`.
    - Create a [base64-encoded SHA256](../../README.md#email-address-hash-encoding) hash of `validate@email.com` and send it as an email hash. 
2. Store the returned `advertising_token` for use in the following step.
3. Send a [GET /token/validate](../endpoints/get-token-validate.md) request using the `email` or `email_hash` you sent in step 1 and the `advertising_token` (saved in step 2) as the `token`. 
    - If the response returns `true`, the `email` or `email_hash` you sent as a request in step 1 match the token you received in the response of step 1. 
    - If it returns `false`, there may be an issue with the way you are sending email addresses or email hashes.

### How can I test the refresh token logout workflow?

You can use the email address `optout@email.com` to test your token refresh workflow. Using this email for the request always generates an identity response with a `refresh_token` that results in a logout response.

1. Do either of the following:
    - Send a [GET /token/generate](../endpoints/get-token-generate.md) request using `optout@email.com` as `email`.
    - Create a [base64-encoded SHA256](../../README.md#email-address-hash-encoding) hash of `optout@email.com` and send it as an email hash. 
2. Store the returned `refresh_token` for use in the following step.
3. Send a [GET /token/refresh](../endpoints/get-token-refresh.md) request with the `refresh_token` (saved in step 2) as the `token` value.<br/>The body response should be empty, and the `status` value should be set to `optout` because the `optout@email.com` email always results in a logged out user.

