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

```java
<script>
  __uid2.init({
     identity : <Response from the generate token api>
  });
</script>
```

### 5-1. Use a UID2 token to query an SSP for relevant ads.

The established identity is available client-side for RTB. The following mechanism in the SDK gives access to the identity to pass to SSPs.

```java
<script>
   __uid2.getAdvertisingToken();
</script>
```

### 6. Refresh client-side UID2 identity token.
UID2 Tokens are refreshed automatically by the [UID2 client-side identity SDK](../sdks/client-side-identity-v1.md). No manual action is required. 

If you decide to integrate using options other than the SDK, we recommend refreshing identity tokens every 15-30 minutes.

### 7-2. Clear user identity.

Remove UID2 tokens from the user's local storage when they log out. Use the following mechanism from the [UID2 client-side SDK](../sdks/client-side-identity-v1.md) to clear out UID2 tokens.

```java
<script>
   __uid2.disconnect();
</script>
```

# Frequently Asked Questions
### How will I be notified of user opt-out?
The token refresh process handles user opt-outs. If a user opts out, using their refresh token automatically clears their session. [UID2 client-side SDK](../sdks/client-side-identity-v1.md). No manual action is required. 

