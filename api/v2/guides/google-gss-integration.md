[UID2 Overview](../../../README.md) > [Getting Started](../../README.md) > [v2](../README.md) > [Integration Guides](README.md) > Google Secure Signal Integration Guide

# Google Secure Signal Integration Guide

This guide covers integration steps for publishers using UID2 with Google Secure Signal (GSS, previously known as Google Encrypted Signal, ESP). It includes the following sections:

* [Overview](#overview)
* [Allow Secure Signal Sharing](#allow-secure-signal-sharing)
* [Publisher Integrations](#publisher-integration)
* [Server-Only Integration](#server-only-integration)
* [UID2 SDK Integration](#uid2-sdk-integration)

>NOTE: To use UID2 Secure Signal integration, if you are using an SDK you must have your UID2 integration already set up. This does not apply if you are using server-only integration. For a summary of all the integration options available, see [UID2 Integration Guides](README.md).

## Overview

Google Secure Signal is a way for publishers to pass "encrypted" user IDs to bidders that are approved by Google, via [Google Ad Manager](https://admanager.google.com/home/) and [Google Ad Manager Ad Exchange (Adx)](https://support.google.com/admanager/answer/6321605?hl=en). The framework is an optional part of the Google PlayTag (GPT) library commonly used by publishers.

With this framework, the following steps occur:

1. Publishers push user ID signals (advertising tokens) to Google Secure Signal.
2. Google Secure Signal caches them on the client side and then transparently passes them to Google Ad Manager.
3. Google Ad Manager uses the UID2 tokens to make bid requests -- forwarding the tokens to approved bidders within Google Adx based on the publisher's preferences.

## Allow Secure Signal Sharing

For your Google Ad Manager account to be eligible to receive encrypted UID tokens, you must make sure that encrypted signals are properly shared with third-party bidders on your Google Ad Manager account. For details, see [Share encrypted signals with bidders](https://support.google.com/admanager/answer/10488752) (Google reference documentation) and the Publisher Onboarding Workflow.

## Publisher Integration

When an encrypted signal is cached, Secure Signal does not execute the handler to generate a new signal. Because of this, it is necessary to clear the cache before login and after logout. Since Secure Signal does not provide a way to delete or invalidate a specific ID, publishers to need to call `window.googletag.secureSignalProviders.clearAllCache()` to clear all shared encrypted signals as part of their login/logout workflows.

### Server-Only Integration

In order to share encrypted signals, the hosted auto-loaded Secure Signal script must be able to make an asynchronous call to the function `window.getUid2AdvertisingToken` and, in response, receive `advertising_token` as a string, as shown in the following example.

```
window.getUid2AdvertisingToken = async () => {
  // Make a call to get a fresh identity which could last for at least 12 hours.
  const identity = await getFreshIdentity
  return JSON.parse(decodeURIComponent(identity)).advertising_token
}
```

### UID2 SDK Integration

If you are using the UID2 Client-Side Identity JavaScript SDK version 3.0.0 onwards, the hosted auto-loaded UID2 Secure Signal script uses the `getAdvertisingTokenAsync` function provided in the SDK to get the fresh advertising token, and then pushes the token to Google Ad Manager.
