[UID2 API Documentation](../../README.md) > v1 > [Integration Guides](README.md) > Publisher Integration Guide

# UID2 SDK Integration Guide

>NOTE: This guide is intended for the UID2 SDK [version 1](../sdks/client-side-identity-v1.md). For the *Integration Guide* using the [previous version](../sdks/client-side-identity-v0.md) of the UID2 SDK, see [Publisher Integration Guide (Standard)](./publisher-client-side-v0.md).

This guide is intended for publishers with web assets who would like to generate identity tokens utilizing UID2 for the RTB bid stream, while integrating directly with UID2 rather than UID2-enabled single-sign-on or identity providers. 

The guide outlines the [basic steps](#integration-steps) that you need to consider for your integration. For example, you need to decide how to implement user login and logout, how to manage UID2 identity information and use it for targeted advertising, how to refresh tokens, deal with missing identities, and handle user opt-outs. See also [FAQs](#faqs).

To facilitate the process of establishing client identity using UID2 and retrieving advertising tokens, the web integration steps provided in this guide rely on the [Client-Side Identity JavaScript SDK](../sdks/client-side-identity-v1.md), also known as the UID2 SDK. For an example application that illustrates the integration steps described in this guide and the usage of the SDK, see [UID2 SDK Integration Example](https://github.com/UnifiedID2/uid2-examples/blob/main/publisher/standard/README.md).

>IMPORTANT: The UID2 SDK currently stores tokens in first-party cookies. Since implementation details like this may change in the future, to avoid potential issues, be sure to rely on the [UID2 SDK APIs](../sdks/client-side-identity-v1.md#api-reference) for your identity management.

For custom integration scenarios for app developers and CTV broadcasters without utilizing the UID2 SDK, see [Server-Only Integration Guide](./custom-publisher-integration.md). 


## Integration Steps 

The following diagram outlines the steps required for a user to establish a UID2 token with a publisher and how the UID2 token integrates with the RTB bid stream.

![Publisher Flow](https://mermaid.ink/svg/eyJjb2RlIjoiICBzZXF1ZW5jZURpYWdyYW1cbiAgICBwYXJ0aWNpcGFudCBVIGFzIFVzZXJcbiAgICBwYXJ0aWNpcGFudCBQIGFzIFB1Ymxpc2hlclxuICAgIHBhcnRpY2lwYW50IFVJRDIgYXMgVUlEMiBTZXJ2aWNlXG4gICAgcGFydGljaXBhbnQgU1NQXG4gICAgTm90ZSBvdmVyIFUsU1NQOiAxLiBFc3RhYmxpc2ggSWRlbnRpdHlcbiAgICBVLT4-K1A6IDEtYS4gVGhlIHVzZXIgdmlzaXRzIGEgcHVibGlzaGVyIGFzc2V0LlxuICAgIFAtPj4tVTogMS1iLiBUaGUgcHVibGlzaGVyIGV4cGxhaW5zIHRoZSB2YWx1ZSBleGNoYW5nZSBvZiB0aGUgb3BlbiBpbnRlcm5ldCBhbmQgcmVxdWVzdHMgYSBsb2dpbi5cbiAgICBhY3RpdmF0ZSBVXG4gICAgVS0-PlA6IDEtYy4gVGhlIHVzZXIgYXV0aGVudGljYXRlcyBhbmQgYXV0aG9yaXplcyB0aGUgY3JlYXRpb24gb2YgYSBVSUQyLlxuICAgIGRlYWN0aXZhdGUgVVxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VUlEMjogMS1kLiBUaGUgcHVibGlzaGVyIHNlbmRzIHRoZSB1c2VyJ3MgUElJIHRvIHRoZSB0b2tlbiBnZW5lcmF0aW9uIHNlcnZpY2UuXG4gICAgZGVhY3RpdmF0ZSBQXG4gICAgYWN0aXZhdGUgVUlEMlxuICAgIFVJRDItPj5QOiAxLWUuIFRoZSB0b2tlbiBnZW5lcmF0aW9uIHNlcnZpY2UgcmV0dXJucyBVSUQyIHRva2Vucy5cbiAgICBkZWFjdGl2YXRlIFVJRDJcbiAgICBhY3RpdmF0ZSBQXG4gICAgUC0-PlU6IDEtZi4gVGhlIHB1Ymxpc2hlciBzZXRzIGEgVUlEMiBmb3IgdGhlIHVzZXIuXG4gICAgZGVhY3RpdmF0ZSBQXG4gICAgTm90ZSBvdmVyIFUsU1NQOiAyLiBCaWQgVXNpbmcgVUlEMiBUb2tlbnNcbiAgXG4gICAgUC0-PlNTUDogMi1hLiBUaGUgcHVibGlzaGVyIGNhbGxzIHRoZSBTU1AgZm9yIGFkcyB1c2luZyB0aGUgVUlEMiB0b2tlbi5cbiAgICBhY3RpdmF0ZSBTU1BcbiAgICBTU1AtPj5QOiAyLWIuIFRoZSBTU1AgcmV0dXJucyBhZHMgdG8gZGlzcGxheS5cbiAgICBkZWFjdGl2YXRlIFNTUFxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VTogMi1jLiBUaGUgcHVibGlzaGVyIGRpc3BsYXlzIHRoZSBhZHMgdG8gdGhlIHVzZXIuXG4gICAgZGVhY3RpdmF0ZSBQXG5cbiAgICBOb3RlIG92ZXIgVSxTU1A6IDMuIFJlZnJlc2ggVG9rZW5zXG4gICAgVS0-PlVJRDI6IDMtYS4gVGhlIFNESyBzZW5kcyBhIHJlcXVlc3QgdG8gcmVmcmVzaCB0aGUgVUlEMiB1c2luZyB0aGUgcmVmcmVzaCB0b2tlbi5cbiAgICBhY3RpdmF0ZSBVSUQyXG4gICAgVUlEMi0-PlU6IDMtYi4gSWYgYSB1c2VyIGhhc24ndCBvcHRlZCBvdXQsIHRoZSByZWZyZXNoIHRva2VuIHNlcnZpY2UgcmV0dXJucyBuZXcgaWRlbnRpdHkgdG9rZW5zLlxuICAgIGRlYWN0aXZhdGUgVUlEMlxuICAgIE5vdGUgb3ZlciBVLFNTUDogNC4gVXNlciBMb2dvdXRcbiAgICBVLT4-UDogNC1hLiBUaGUgdXNlciBsb2dzIG91dCBmcm9tIGEgcHVibGlzaGVyIGFzc2V0LlxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VTogNC1iLiBUaGUgdXNlcidzIGlkZW50aXR5IGNsZWFycy5cbiAgICBkZWFjdGl2YXRlIFAiLCJtZXJtYWlkIjp7InRoZW1lIjoiZm9yZXN0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)

The following sections provide additional details for each step in the diagram:
 
 1. [Establish identity: user login](#establish-identity-user-login)
 2. [Bid using UID2 tokens](#bid-using-uid2-tokens)
 3. [Refresh tokens](#refresh-tokens)
 4. [Clear Identity: user logout](#clear-identity-user-logout)

### Establish Identity: User Login


After authentication in step 1-c, which forces the user to accept the rules of engagement and allows the publisher to validate their email address, a UID2 token must be generated on the server side. The following table details the token generation steps.

| Step | Endpoint/SDK | Description |
| :--- | :--- | :--- |
| 1-d | [GET /token/generate](../endpoints/get-token-generate.md) | After the user authenticates and authorizes the creation of a UID2, use the [GET /token/generate](../endpoints/get-token-generate.md) endpoint to generate a UID2 token using the provided [normalized](../../README.md#emailnormalization) email address of the user. |
| 1-e | [GET /token/generate](../endpoints/get-token-generate.md) | Return a UID2 token generated from the user's email address or hashed email address. |
| 1-f | [UID2 SDK](../sdks/client-side-identity-v1.md) | Send the returned UID2 token from step 1-e to the SDK in the `identity` property of its [init() function](../sdks/client-side-identity-v1.md#initopts-object-void) and specify a [callback function](../sdks/client-side-identity-v1.md#callback-function) as shown below. The mechanism ensures that UID2 tokens are available for the user for targeting advertising until they log out. |


```html
<script>
 __uid2.init({
   callback : function (state) {...}, // Check advertising token and its status within the passed state and initiate targeted advertising. 
   identity : {...} // The `body` property value from the token/generate API response.
 });
</script>
```

For example:

```html
<script>
 __uid2.init({
   callback : onUid2IdentityUpdated,
   identity : {
        "advertising_token": "AgmZ4dZgeuXXl6DhoXqbRXQbHlHhA96leN94U1uavZVspwKXlfWETZ3b/besPFFvJxNLLySg4QEYHUAiyUrNncgnm7ppu0mi6wU2CW6hssiuEkKfstbo9XWgRUbWNTM+ewMzXXM8G9j8Q=",
        "refresh_token": "Mr2F8AAAF2cskumF8AAAF2cskumF8AAAADXwFq/90PYmajV0IPrvo51Biqh7/M+JOuhfBY8KGUn//GsmZr9nf+jIWMUO4diOA92kCTF69JdP71Ooo+yF3V5yy70UDP6punSEGmhf5XSKFzjQssCtlHnKrJwqFGKpJkYA==",
        "identity_expires": 1633643601000,
        "refresh_from": 1633643001000,
        "refresh_expires": 1636322000000
    }
 });
</script>
```

The SDK invokes the specified [callback function](../sdks/client-side-identity-v1.md#callback-function) (which indicates the identity availability) and makes the established identity available client-side for bidding. 

### Bid Using UID2 Tokens

Based on the status and availability of a valid identity, the SDK sets up the background token auto-refresh, stores identity information in a [first-party cookie](../sdks/client-side-identity-v1.md#uid2-cookie-format), and uses it to initiate requests for targeted advertising.

| Step | Endpoint/SDK | Description |
| :--- | :--- | :--- |
| 2-a | [UID2 SDK](../sdks/client-side-identity-v1.md) | Get the current user's advertising token by using the [getAdvertisingToken() function](../sdks/client-side-identity-v1.md#getadvertisingtoken-string) as shown below. |


```html
<script>
  let advertisingToken = __uid2.getAdvertisingToken();
</script>
```

>TIP: You need to consider how you pass the returned advertising token to SSPs.

### Refresh Tokens

As part of its initialization, the SDK sets up a [token auto-refresh](../sdks/client-side-identity-v1.md#background-token-auto-refresh) for the identity, which is triggered in the background by the timestamps on the identity or failed refresh attempts due intermittent errors.

| Step | Endpoint/SDK | Description |
| :--- | :--- | :--- |
| 3-a | [UID2 SDK](../sdks/client-side-identity-v1.md) | The SDK automatically refreshes UID2 tokens in the background. No manual action is required. |
| 3-b | [UID2 SDK](../sdks/client-side-identity-v1.md) | If the user hasn't opted out, the [GET /token/refresh](../endpoints/get-token-refresh.md) automatically returns new identity tokens. |


### Clear Identity: User Logout

The client lifecycle is complete when the user decides to log out from the publisher's site (not UID2). This closes the client's identity session and clears the first-party cookie information.

| Step | Endpoint/SDK | Description |
| :--- | :--- | :--- |
| 4-a | N/A | The user logs out from the publisher's asset. |
| 4-b | [UID2 SDK](../sdks/client-side-identity-v1.md) | Clear the UID2 identity from the first-party cookie and disconnect the client lifecycle by using the [disconnect() function](../sdks/client-side-identity-v1.md#disconnect-void) as shown below.|


```html
<script>
  __uid2.disconnect();
</script>
```

## FAQs

### How will I be notified of user opt-out?

The [UID2 SDK](../sdks/client-side-identity-v1.md) background token auto-refresh process handles user opt-outs. If user opts out, when the UID2 SDK attempts token refresh, it will learn about the optout and will clear the session (including the cookie) and invoke the callback with the `OPTOUT` status.

### How can I test that the PII sent and returned tokens match?

You can use the [GET /token/validate](../endpoints/get-token-validate.md) endpoint to check whether the PII you are sending through [GET /token/generate](../endpoints/get-token-generate.md) is valid. 

1. Do either of the following:
    - Send a [GET /token/generate](../endpoints/get-token-generate.md) request using `validate@email.com` as `email`.
    - Create a [base64-encoded SHA256](../../README.md#email-address-hash-encoding) hash of `validate@email.com` and send it as an email hash. 
2. Store the returned `advertising_token` for use in the following step.
3. Send a [GET /token/validate](../endpoints/get-token-validate.md) request using the `email` or `email_hash` you sent in step 1 and the `advertising_token` (saved in step 2) as the `token` property value. 
    - If the response returns `true`, the `email` or `email_hash` you sent as a request in step 1 match the token you received in the response of step 1. 
    - If it returns `false`, there may be an issue with the way you are sending email addresses or email hashes.

### How can I test the refresh token logout workflow?

You can use the email address `optout@email.com` to test your token refresh workflow. Using this email for the request always generates an identity response with a `refresh_token` that results in a logout response.

1. Do either of the following:
    - Send a [GET /token/generate](../endpoints/get-token-generate.md) request using `optout@email.com` as `email`.
    - Create a [base64-encoded SHA256](../../README.md#email-address-hash-encoding) hash of `optout@email.com` and send it as an email hash. 
2. Wait until the SDK's [background auto-refresh](../sdks/client-side-identity-v1.md#background-token-auto-refresh) attempts to refresh the advertising token (this can take several hours) and observe the refresh attempt fail with the `OPTOUT` status. At this point the SDK also clears the first-party cookie.
