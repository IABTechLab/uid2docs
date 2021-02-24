[UID2 Documentation](../../README.md) > v1 > Integration Guides > Custom Publisher Integration Guide 

# Overview

Following is the Lifecycle for User establishing UID2 on publisher and how it integrates with RTB.

```mermaid
 sequenceDiagram
   participant User
   participant Publisher
   participant UID Service
   participant SSP

   User->>Publisher: 1 Visits
   User->>Publisher: 2 Authenticates
   Publisher->>UID Service: 3-1 Generate UID2
   UID Service->>Publisher: 3-2 UID2 Tokens Returned
   Publisher-->>SSP: 4-1 Calling SSP for Ads
   Publisher-->>User: 4-2 Ads Displayed to User
   User->>Publisher: 5-1 Revisits Publisher
   Publisher-->>UID Service: 5-2 Refresh UID2 Tokens
   UID Service-->>Publisher: Refreshed UID2 Tokens 
   User->>Publisher: 6 User Logout
```

### Steps

Steps 3-1, 4-1, 5-2, 6 are integration points for Publisher

## 3-1 Generate UID2

The publisher calls the token generation endpoint [/token/generate](../endpoints/get-token-generate.md) endpoint for the user by providing either their email address or SHA256 hash of normalized email address (See Normalization rules [here](../../README.md). The returned tokens should be placed in a store tied to the User (e.g. first-party cookie, or server-side storage) as publisher sees fit.

## 4-1 Calling SSP for Ads
The Publisher needs to pass the "advertising_token" part of the UID2 Tokens payload (from step 3-1) to the SSP for RTB purposes. The value needs to be passed as is.

## 5-2 Refresh UID2
Publisher must keep the UID2 Tokens fresh by leveraging the refresh API. Following two user lifecycle events should be used:
1 User returning to the site.
2 An interval has passed (recommedation of 5 minutes) since the last refresh.

No refresh needs to be done for inactive user.

The UID2 Tokens can be refreshed by passing the "refresh_token" part of the UID2 Tokens (from step 3-1) to the [/token/refresh](../endpoints/get-token-refresh.md) endpoint.

Refreshing the tokens is necessary to sync user's opt-out and UID2 rotation in the background. After refresh, the Publisher should update the set of tokens as done in step 3-1.

## 6 User Logout
Publisher should remove the UID2 Tokens stored for that user. No interaction with UID Service is required.

# Frequently Asked Questions

### Q: Do I need to decrypt any of the Tokens?
No, Publisher does not need to decrypt any tokens.

### Q: How will I be notified of user opt-out?
User opt-outs are handled as part of token refresh. No more Publisher action is necessary.

### Q: What is the uniqueness and rotation policy for UID2 Token?
The tokens are encrypted using random initialization vectors, so the encrypted payload will look different for a given user as they browse through the Internet. The token also gets re-encrypted on every refresh. The intent of the mechanism is to ensure that a User's identity is un-trackable by non-trusted parties. 






