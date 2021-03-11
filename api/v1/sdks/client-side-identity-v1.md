[UID2 API Documentation](../../README.md) > v1 > [SDKs](./README.md) > Client-Side Identity

# Client-Side Identity SDK

Use our client-side SDK to simplify your implementation. Use the SDK to establish identity, de-establish identity, and retrieve advertising tokens.

## Implement The SDK Script

Implement our SDK script on the pages you'll use UID2 to manage identity or retrieve an advertising token for real-time bidding (RTB).

```html
<script src="https://integ.uidapi.com/static/js/uid2-sdk-0.0.1a.js" type="text/javascript"></script>
```

## Client-Side SDK Functions

### Open Client Lifecycle and Establish Client Identity

Implement the following script when you would like to create an instance for the UID2 lifecycle on the client. Send the identity payload response from [GET /token/generate](../endpoints/get-token-generate.md) the first time the script runs for a given client.

```html
<script>
  __uid2.init({
    identity : <Response from the generate token api>
  });
</script>
```

### Retrieve Client Identity for Real-Time Bidding

Implement the following script when you would like to retrieve a client's `advertising_token`, or if opted out, an empty string.

```html
<script>
  __uid2.getAdvertisingToken();
</script>
```

### Close Identity Session and Disconnect Client Lifecycle

When an unauthenticated user is present, or a user logs out, implement the following script to close a client's identity session and disconnect the client lifecycle.

```html
<script>
  __uid2.disconnect();
</script>
```