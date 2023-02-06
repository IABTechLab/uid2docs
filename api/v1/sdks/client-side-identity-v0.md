[UID2 API Documentation](../../README.md) > [v1](../README.md) > [SDKs](./README.md) > Client-Side Identity

# Client-Side Identity SDK v0 (Deprecated)

>IMPORTANT: The UID2 API v1 has been deprecated and will be supported only for the current users until March 31, 2023, when all v1 SDK files and endpoints, the v0 SDK files, and any unversioned endpoints will be removed. Be sure to [upgrade to the UID2 API v2](../../v2/upgrades/upgrade-guide.md) by March 31, 2023. If you are new to the framework, use the [UID2 API v2](../../v2/README.md).

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
