[UID2 Documentation](../../README.md) > v1 > [Integration Guides](README.md) > Publisher Integration Guide

# Overview

This guide covers integration steps for publishers that would like to generate identity tokens utilizing UID2 for the bid stream. This guide focuses on publishers who would like to create UID2 tokens on their own rather than using a single-sign-on or identity provider.

## Integration Steps 

The following integration steps outline the lifecycle for a user establishing a UID2 token with a publisher and how the UID2 token integrates with the RTB bid stream.

![Publisher Flow](https://mermaid.ink/svg/eyJjb2RlIjoiICBzZXF1ZW5jZURpYWdyYW1cbiAgICBwYXJ0aWNpcGFudCBVIGFzIFVzZXJcbiAgICBwYXJ0aWNpcGFudCBQIGFzIFB1Ymxpc2hlclxuICAgIHBhcnRpY2lwYW50IFVJRDIgYXMgVUlEMiBTZXJ2aWNlXG4gICAgcGFydGljaXBhbnQgU1NQXG4gICAgTm90ZSBvdmVyIFUsU1NQOiAxLiBFc3RhYmxpc2ggSWRlbnRpdHlcbiAgICBVLT4-K1A6IDEtYS4gVGhlIHVzZXIgdmlzaXRzIGEgcHVibGlzaGVyIGFzc2V0LlxuICAgIFAtPj4tVTogMS1iLiBUaGUgcHVibGlzaGVyIGV4cGxhaW5zIHRoZSB2YWx1ZSBleGNoYW5nZSBvZiB0aGUgb3BlbiBpbnRlcm5ldCBhbmQgcmVxdWVzdHMgYSBsb2dpbi5cbiAgICBhY3RpdmF0ZSBVXG4gICAgVS0-PlA6IDEtYy4gVGhlIHVzZXIgYXV0aGVudGljYXRlcyBhbmQgYXV0aG9yaXplcyB0aGUgY3JlYXRpb24gb2YgYSBVSUQyLlxuICAgIGRlYWN0aXZhdGUgVVxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VUlEMjogMS1kLiBUaGUgcHVibGlzaGVyIHNlbmRzIHRoZSB1c2VyJ3MgUElJIHRvIHRoZSB0b2tlbiBnZW5lcmF0aW9uIHNlcnZpY2UuXG4gICAgZGVhY3RpdmF0ZSBQXG4gICAgYWN0aXZhdGUgVUlEMlxuICAgIFVJRDItPj5QOiAxLWUuIFRoZSB0b2tlbiBnZW5lcmF0aW9uIHNlcnZpY2UgcmV0dXJucyBVSUQyIHRva2Vucy5cbiAgICBkZWFjdGl2YXRlIFVJRDJcbiAgICBhY3RpdmF0ZSBQXG4gICAgUC0-PlU6IDEtZi4gVGhlIHB1Ymxpc2hlciBzZXRzIGEgVUlEMiBmb3IgdGhlIHVzZXIuXG4gICAgZGVhY3RpdmF0ZSBQXG4gICAgTm90ZSBvdmVyIFUsU1NQOiAyLiBCaWQgVXNpbmcgVUlEMiBUb2tlbnNcbiAgXG4gICAgUC0-PlNTUDogMi1hLiBUaGUgcHVibGlzaGVyIGNhbGxzIHRoZSBTU1AgZm9yIGFkcyB1c2luZyB0aGUgVUlEMiB0b2tlbi5cbiAgICBhY3RpdmF0ZSBTU1BcbiAgICBTU1AtPj5QOiAyLWIuIFRoZSBTU1AgcmV0dXJucyBhZHMgdG8gZGlzcGxheS5cbiAgICBkZWFjdGl2YXRlIFNTUFxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VTogMi1jLiBUaGUgcHVibGlzaGVyIGRpc3BsYXlzIHRoZSBhZHMgdG8gdGhlIHVzZXIuXG4gICAgZGVhY3RpdmF0ZSBQXG5cbiAgICBOb3RlIG92ZXIgVSxTU1A6IDMuIFJlZnJlc2ggVG9rZW5zXG4gICAgVS0-PlVJRDI6IDMtYS4gVGhlIFNESyBzZW5kcyBhIHJlcXVlc3QgdG8gcmVmcmVzaCB0aGUgVUlEMiB1c2luZyB0aGUgcmVmcmVzaCB0b2tlbi5cbiAgICBhY3RpdmF0ZSBVSUQyXG4gICAgVUlEMi0-PlU6IDMtYi4gSWYgYSB1c2VyIGhhc24ndCBvcHRlZCBvdXQsIHRoZSByZWZyZXNoIHRva2VuIHNlcnZpY2UgcmV0dXJucyBuZXcgaWRlbnRpdHkgdG9rZW5zLlxuICAgIGRlYWN0aXZhdGUgVUlEMlxuICAgIE5vdGUgb3ZlciBVLFNTUDogNC4gVXNlciBMb2dvdXRcbiAgICBVLT4-UDogNC1hLiBUaGUgdXNlciBsb2dzIG91dCBmcm9tIGEgcHVibGlzaGVyIGFzc2V0LlxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VTogNC1iLiBUaGUgdXNlcidzIGlkZW50aXR5IGNsZWFycy5cbiAgICBkZWFjdGl2YXRlIFAiLCJtZXJtYWlkIjp7InRoZW1lIjoiZm9yZXN0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)

### 1. Establish Identity

This section focuses on publisher-specific steps 1-d, 1-e, and 1-f illustrated in the above diagram.

| Step | Endpoint/SDK | Instruction |
| --- | --- | --- |
| d | [GET /token/generate](../endpoints/get-token-generate.md) | There are two ways for publishers to establish identity with UID2.<br>1. Integrate with a UID2-enabled single-sign-on provider.<br>2. Generate UID2 tokens when a user authenticates using the [GET /token/generate](../endpoints/get-token-generate.md) endpoint. |
| e | [GET /token/generate](../endpoints/get-token-generate.md) | The token generation service returns UID2 tokens. |
| f | [UID2 client-side identity SDK](../sdks/client-side-identity-v1.md) | Send returned UID2 tokens from step e to the SDK using `identity` mechanism below. The mechanism ensures UID2 tokens are available for the user until they logout. |

#### Client-Side SDK Identity Mechanism

```html
<script>
  __uid2.init({
    identity : <Response from the generate token api>
  });
</script>
```

### 2. Bid Using UID2 Tokens

This section focuses on publisher-specific step 2-a illustrated in the above diagram.

| Step | Endpoint/SDK | Instruction |
| --- | --- | --- |
| a | [UID2 client-side identity SDK](../sdks/client-side-identity-v1.md) | The established identity is available client-side for bidding. The mechnanism below returns access to a user's `advertising_token` to pass to SSPs. |

#### Client-Side SDK Identity Access Mechanism

```html
<script>
  __uid2.getAdvertisingToken();
</script>
```

### 3. Refresh Tokens

| Step | Endpoint/SDK | Instruction |
| --- | --- | --- |
| a | [UID2 client-side identity SDK](../sdks/client-side-identity-v1.md) | The SDK automatically refreshes UID2 tokens. No manual action is required. |
| b | [UID2 client-side identity SDK](../sdks/client-side-identity-v1.md) | If a user hasn't opted out, the refresh token returns new identity tokens. |

If you decide to integrate using options other than the SDK, we recommend refreshing identity tokens every 5 minutes.

### 4. User Logout

| Step | Endpoint/SDK | Instruction |
| --- | --- | --- |
| a |  | The user logs out from a publisher asset. |
| b | [UID2 client-side identity SDK](../sdks/client-side-identity-v1.md) | Remove UID2 tokens from the user's local storage thwne they log out. Use the `disconnect` mechanism from the SDK to clear out UID2 tokens. |

#### Client-Side SDK Disconnect Identity

```html
<script>
  __uid2.disconnect();
</script>
```

# Frequently Asked Questions
### How will I be notified of user opt-out?
The token refresh process handles user opt-outs. If a user opts out, using their refresh token automatically clears their session. [UID2 client-side SDK](../sdks/client-side-identity-v1.md). No manual action is required. 

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
