# Publisher Integration Guide (Standard)

>NOTE: This guide is intended for the UID2 SDK [version 0](../sdks/client-side-identity-v0.md). For the *Integration Guide* using the UID2 SDK [version 1](../sdks/client-side-identity-v1.md), see [UID2 SDK Integration Guide](./publisher-client-side.md).

This guide covers integration steps for publishers with web assets who would like to generate identity tokens utilizing UID2 for the bid stream. This guide focuses on publishers who would like to integrate directly with UID2 to create and manage tokens rather than integrate with UID2-enabled single-sign-on or identity providers.

* [Integration Steps](#integration-steps)
* [FAQs](#faqs)

For custom integration scenarios for app developers and CTV broadcasters, see [Publisher Integration Guide (Custom)](./custom-publisher-integration.md).

## Integration Steps 

The following diagram outlines the integration steps for a user to establish a UID2 token with a publisher and how the UID2 token integrates with the RTB bid stream.

![Publisher Flow](https://mermaid.ink/svg/eyJjb2RlIjoiICBzZXF1ZW5jZURpYWdyYW1cbiAgICBwYXJ0aWNpcGFudCBVIGFzIFVzZXJcbiAgICBwYXJ0aWNpcGFudCBQIGFzIFB1Ymxpc2hlclxuICAgIHBhcnRpY2lwYW50IFVJRDIgYXMgVUlEMiBTZXJ2aWNlXG4gICAgcGFydGljaXBhbnQgU1NQXG4gICAgTm90ZSBvdmVyIFUsU1NQOiAxLiBFc3RhYmxpc2ggSWRlbnRpdHlcbiAgICBVLT4-K1A6IDEtYS4gVGhlIHVzZXIgdmlzaXRzIGEgcHVibGlzaGVyIGFzc2V0LlxuICAgIFAtPj4tVTogMS1iLiBUaGUgcHVibGlzaGVyIGV4cGxhaW5zIHRoZSB2YWx1ZSBleGNoYW5nZSBvZiB0aGUgb3BlbiBpbnRlcm5ldCBhbmQgcmVxdWVzdHMgYSBsb2dpbi5cbiAgICBhY3RpdmF0ZSBVXG4gICAgVS0-PlA6IDEtYy4gVGhlIHVzZXIgYXV0aGVudGljYXRlcyBhbmQgYXV0aG9yaXplcyB0aGUgY3JlYXRpb24gb2YgYSBVSUQyLlxuICAgIGRlYWN0aXZhdGUgVVxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VUlEMjogMS1kLiBUaGUgcHVibGlzaGVyIHNlbmRzIHRoZSB1c2VyJ3MgUElJIHRvIHRoZSB0b2tlbiBnZW5lcmF0aW9uIHNlcnZpY2UuXG4gICAgZGVhY3RpdmF0ZSBQXG4gICAgYWN0aXZhdGUgVUlEMlxuICAgIFVJRDItPj5QOiAxLWUuIFRoZSB0b2tlbiBnZW5lcmF0aW9uIHNlcnZpY2UgcmV0dXJucyBVSUQyIHRva2Vucy5cbiAgICBkZWFjdGl2YXRlIFVJRDJcbiAgICBhY3RpdmF0ZSBQXG4gICAgUC0-PlU6IDEtZi4gVGhlIHB1Ymxpc2hlciBzZXRzIGEgVUlEMiBmb3IgdGhlIHVzZXIuXG4gICAgZGVhY3RpdmF0ZSBQXG4gICAgTm90ZSBvdmVyIFUsU1NQOiAyLiBCaWQgVXNpbmcgVUlEMiBUb2tlbnNcbiAgXG4gICAgUC0-PlNTUDogMi1hLiBUaGUgcHVibGlzaGVyIGNhbGxzIHRoZSBTU1AgZm9yIGFkcyB1c2luZyB0aGUgVUlEMiB0b2tlbi5cbiAgICBhY3RpdmF0ZSBTU1BcbiAgICBTU1AtPj5QOiAyLWIuIFRoZSBTU1AgcmV0dXJucyBhZHMgdG8gZGlzcGxheS5cbiAgICBkZWFjdGl2YXRlIFNTUFxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VTogMi1jLiBUaGUgcHVibGlzaGVyIGRpc3BsYXlzIHRoZSBhZHMgdG8gdGhlIHVzZXIuXG4gICAgZGVhY3RpdmF0ZSBQXG5cbiAgICBOb3RlIG92ZXIgVSxTU1A6IDMuIFJlZnJlc2ggVG9rZW5zXG4gICAgVS0-PlVJRDI6IDMtYS4gVGhlIFNESyBzZW5kcyBhIHJlcXVlc3QgdG8gcmVmcmVzaCB0aGUgVUlEMiB1c2luZyB0aGUgcmVmcmVzaCB0b2tlbi5cbiAgICBhY3RpdmF0ZSBVSUQyXG4gICAgVUlEMi0-PlU6IDMtYi4gSWYgYSB1c2VyIGhhc24ndCBvcHRlZCBvdXQsIHRoZSByZWZyZXNoIHRva2VuIHNlcnZpY2UgcmV0dXJucyBuZXcgaWRlbnRpdHkgdG9rZW5zLlxuICAgIGRlYWN0aXZhdGUgVUlEMlxuICAgIE5vdGUgb3ZlciBVLFNTUDogNC4gVXNlciBMb2dvdXRcbiAgICBVLT4-UDogNC1hLiBUaGUgdXNlciBsb2dzIG91dCBmcm9tIGEgcHVibGlzaGVyIGFzc2V0LlxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VTogNC1iLiBUaGUgdXNlcidzIGlkZW50aXR5IGNsZWFycy5cbiAgICBkZWFjdGl2YXRlIFAiLCJtZXJtYWlkIjp7InRoZW1lIjoiZm9yZXN0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)

The following sections provide additional details for each step in the diagram:
 
 1. [Establish Identity](#establish-identity)
 2. [Bid Using UID2 Tokens](#bid-using-uid2-tokens)
 3. [Refresh Tokens](#refresh-tokens)
 4. [User Logout](#user-logout)

### Establish Identity

After authentication in step 1-c, which forces the user to accept the rules of engagement and allows the publisher to validate their email address, a UID2 token must be generated on the server side. The following table details the token generation steps.

| Step | Endpoint/SDK | Description |
| --- | --- | --- |
| 1-d | [GET /token/generate](../endpoints/get-token-generate.md) | There are two ways for publishers to establish identity with UID2:<br>- Integrate with a UID2-enabled single-sign-on provider.<br>- Generate UID2 tokens when a user authenticates using the [GET /token/generate](../endpoints/get-token-generate.md) endpoint. The request includes the [normalized](../../README.md#emailnormalization) email address of the user. |
| 1-e | [GET /token/generate](../endpoints/get-token-generate.md) | The token generation service that returns UID2 tokens. |
| 1-f | [UID2 client-side identity SDK](../sdks/client-side-identity-v0.md) | Send returned UID2 tokens from step 1-e to the SDK using its Identity Mechanism described below. The mechanism ensures that UID2 tokens are available for the user until they log out. |

>IMPORTANT: The SDK currently stores tokens in first-party cookies. Since implementation details like this may change in the future, to avoid potential issues, be sure to rely on the SDK APIs for your identity management.

##### Client-Side SDK Identity Mechanism

```html
<script>
  __uid2.init({
    identity : <Response from the generate token api>
  });
</script>
```

### Bid Using UID2 Tokens

| Step | Endpoint/SDK | Description |
| --- | --- | --- |
| 2-a | [UID2 client-side identity SDK](../sdks/client-side-identity-v0.md) | The established identity is available client-side for bidding. The SDK Identity Access Mechnanism described below returns access to a user's `advertising_token` to pass to SSPs. |

##### Client-Side SDK Identity Access Mechanism

```html
<script>
  __uid2.getAdvertisingToken();
</script>
```

### Refresh Tokens

| Step | Endpoint/SDK | Description |
| --- | --- | --- |
| 3-a | [UID2 client-side identity SDK](../sdks/client-side-identity-v0.md) | The SDK automatically refreshes UID2 tokens. No manual action is required. |
| 3-b | [UID2 client-side identity SDK](../sdks/client-side-identity-v0.md) | If a user hasn't opted out, the refresh token returns new identity tokens. |

>TIP: If you decide to integrate using options other than the SDK, refresh identity tokens every 5 minutes.

### User Logout

| Step | Endpoint/SDK | Description |
| --- | --- | --- |
| 4-a |  | The user logs out from a publisher asset. |
| 4-b | [UID2 client-side identity SDK](../sdks/client-side-identity-v0.md) | Remove UID2 tokens from the user's local storage when they log out.  To clear out UID2 tokens, use the SDK Disconnect Identity Mechanism described below. |

##### Client-Side SDK Disconnect Identity Mechanism

```html
<script>
  __uid2.disconnect();
</script>
```

## FAQs

### How will I be notified of user opt-out?

The token refresh process handles user opt-outs. If a user opts out, using their refresh token automatically clears their session. [UID2 client-side SDK](../sdks/client-side-identity-v1.md). No manual action is required. 

### How can I test my integration?

There are two built-in tools you can use to test your integration.

### How can I test that the PII sent and returned tokens match?

You can use the [GET /token/validate](../endpoints/get-token-validate.md) endpoint to check whether the PII you are sending through [GET /token/generate](../endpoints/get-token-generate.md) is valid. 

1. Do either of the following:
    - Send a [GET /token/generate](../endpoints/get-token-generate.md) request using `validate@email.com` as `email`.
    - Create a [base64-encoded SHA256](../../README.md#email-address-hash-encoding) hash of `validate@email.com` and send it as an email hash. 
2. Store the `advertising_token` returned to use in step 3.
3. Send a [GET /token/validate](../endpoints/get-token-validate.md) request using the `email` or `email_hash` you sent in step 1 and the `advertising_token` (saved in step 2) as the `token`. 
    - If the response returns `true`, the `email` or `email_hash` you sent as a request in step 1 match the token you received in the response of step 1. 
    - If it returns `false`, there may be an issue with the way you are sending email addresses or email hashes.

### How can I test the refresh token logout workflow?

You can use the email address `optout@email.com` to test your token refresh workflow. Using this email for the request always generates an identity response with a `refresh_token` that results in a logout response.

1. Do either of the following:
    - Send a [GET /token/generate](../endpoints/get-token-generate.md) request using `optout@email.com` as `email`.
    - Create a [base64-encoded SHA256](../../README.md#email-address-hash-encoding) hash of `optout@email.com` and send it as an email hash. 
2. Store the `refresh_token` returned to use in step 3.
3. Send a [GET /token/validate](../endpoints/get-token-validate.md) request using the `email` or `email_hash` you sent in step 1 and the `refresh_token` (saved in step 2) as the `token`. <br/>The `body` response should be empty because the `optout@email.com` email always results in a logged out refresh token.
