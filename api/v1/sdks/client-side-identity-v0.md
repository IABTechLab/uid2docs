# Client-Side Identity SDK (v0)

>NOTE: This documentation is for version 0 of the UID2 SDK. 

To simplify your implementation for establishing identity and retrieving advertising tokens, consider upgrading to the newer and improved version, [UID2 SDK version 1](./client-side-identity-v1.md).

>IMPORTANT: The new version of the SDK supports the version 0 cookies for user session continuity, but the SDK is not backward-compatible and requires [code changes](./client-side-identity-v1.md#improvements-and-changes-from-version-0). 

## Implement the SDK Script

Implement the folloiwng SDK script on the pages you'll use UID2 to manage identity or retrieve an advertising token for real-time bidding (RTB):

```html
<script src="https://integ.uidapi.com/static/js/uid2-sdk-0.0.1a.js" type="text/javascript"></script>
```

## Client-Side SDK Functions

The client-side SDKs provides several scripts to perform the following functions.

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
