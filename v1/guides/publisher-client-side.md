[UID2 Documentation](../../README.md) > v1 > [Integration Guides](README.md) > Publisher Integration Guide

# Overview

The following integration workflow is the lifecycle for a user establishing a UID2 token with a publisher and how the UID2 token integrates with the RTB bid stream.

![Publisher Flow](publisher-flow-mermaid.png)

## Integration Steps 

Publisher-specific workflows are covered in steps 3, 4, 5-1, 6, 7-2.

### 3. Generate a UID2 token for an authenticated user.

There are two ways for publishers to establish identity for a user with UID2. The first way is to integrate with a UID2-enabled single-sign-on provider. The second way is for a publisher to generate UID2 tokens themselves.

This article focuses on publishers who want to generate UID2 tokens themselves.

Publishers can generate a UID2 identity token when a user authenticates using the  [GET /token/generate](../endpoints/get-token-generate.md) endpoint.

### 4. Set a user's UID2 tokens in their browser using the client-side SDK.

Send returned UID2 tokens from step 3 to the [UID2 client-side identity SDK](../sdks/client-side-identity-v1.md).

The mechanism below ensures that UID2 tokens are available for the user until they logout.

```html
<script>
  __uid2.init({
    identity : <Response from the generate token api>
  });
</script>
```

### 5-1. Use a UID2 token to query an SSP for relevant ads.

The established identity is available client-side for RTB. The following mechanism in the SDK gives access to the identity to pass to SSPs.

```html
<script>
  __uid2.getAdvertisingToken();
</script>
```

### 6. Refresh client-side UID2 identity token.
UID2 Tokens are refreshed automatically by the [UID2 client-side identity SDK](../sdks/client-side-identity-v1.md). No manual action is required. 

If you decide to integrate using options other than the SDK, we recommend refreshing identity tokens every 5 minutes.

### 7-2. Clear user identity.

Remove UID2 tokens from the user's local storage when they log out. Use the following mechanism from the [UID2 client-side SDK](../sdks/client-side-identity-v1.md) to clear out UID2 tokens.

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
