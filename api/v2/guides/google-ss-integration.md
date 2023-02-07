[UID2 Overview](../../../README.md) > [Getting Started](../../README.md) > [v2](../README.md) > [Integration Guides](README.md) > Google Ad Manager Secure Signals Integration Guide

# Google Ad Manager Secure Signals Integration Guide

This guide covers integration steps for publishers using UID2 with the Google Ad Manager **secure signals** feature (previously known as **encrypted signals from publishers**, ESP). It includes the following sections:

* [Overview](#overview)
* [Allow Secure Signal Sharing](#allow-secure-signal-sharing)
* [Publisher Integrations](#publisher-integration)
* [Server-Only Integration](#server-only-integration)
* [UID2 SDK Integration](#uid2-sdk-integration)
* [Sample Applications](#sample-applications)

>NOTE: To use the UID2 Google Ad Manager secure signals integration, if you are using an SDK you must have your UID2 integration already set up. This does not apply if you are using server-only integration. For a summary of all the integration options available, see [UID2 Integration Guides](README.md).

## Overview

Google secure signals is a way for publishers to pass "encrypted" user IDs to bidders that are approved by Google, via [Google Ad Manager](https://admanager.google.com/home/) and the [Google Ad Manager Ad Exchange (Adx)](https://support.google.com/admanager/answer/6321605?hl=en). The framework is an optional part of the Google Publisher Tag (GPT) library commonly used by publishers.

With this framework, the following steps occur:

1. Publishers push user ID signals (advertising tokens) to the secure signals feature.
2. The secure signals feature caches them on the client side and then transparently passes them to Google Ad Manager.
3. Google Ad Manager uses the UID2 tokens to make bid requests -- forwarding the tokens to approved bidders within Google Adx based on the publisher's preferences.

## Allow Secure Signal Sharing

For your Google Ad Manager account to be eligible to receive encrypted UID tokens, you must make sure that encrypted signals are properly shared with third-party bidders on your Google Ad Manager account.

For details, see [Share encrypted signals with bidders](https://support.google.com/admanager/answer/10488752) (Google reference documentation) and then follow the steps in [Use a third-party signal provider](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/securesignals) to switch on UID2 as your signal provider.

## Publisher Integration

When an encrypted signal is cached, the secure signals feature does not execute the handler to generate a new signal. Because of this, it is necessary to clear the cache before login and after logout.

Since the secure signals feature does not provide a way to delete or invalidate a specific ID, publishers must call the `window.googletag.secureSignalProviders.clearAllCache()` function to clear all shared encrypted signals as part of their login/logout workflows.

The following is an example of calling the `window.googletag.secureSignalProviders.clearAllCache()` function:

```
window.googletag = window.googletag || { cmd: [] }; 
window.googletag.cmd.push(function () { 
   window.googletag.secureSignalProviders.clearAllCache(); 
});
```

### Server-Only Integration

So that it can share encrypted signals, the hosted auto-loaded secure signals script must be able to make an asynchronous call to the `window.getUid2AdvertisingToken` function and, in response, receive `advertising_token` as a string.

It's important to make sure that the identity token is fresh. For a server-side integration, we recommend making a call to the {{/token/refresh}} endpoint](https://github.com/IABTechLab/uid2docs/blob/main/api/v2/endpoints/post-token-refresh.md#post-tokenrefresh) to get a fresh [identity token](https://github.com/IABTechLab/uid2docs/blob/main/api/v2/endpoints/post-token-refresh.md#decrypted-json-response-format).

The following code is an example of how you could do this.

```
window.getUid2AdvertisingToken = async () => {
  // Make a call to get a fresh identity token which could last for at least 12 hours.
  const identity = await getFreshIdentity
  return JSON.parse(decodeURIComponent(identity)).advertising_token
}
```

For details, see [Server-Only UID2 Integration Guide](#custom-publisher-integration.md).

A sample application is also available for server-only integration. See [Sample Applications](#sample-applications).

### UID2 SDK Integration

If you are using the UID2 Client-Side Identity JavaScript SDK version 3.0.0 onwards, the hosted auto-loaded UID2 secure signals script uses the `getAdvertisingTokenAsync` function provided in the SDK to get the fresh advertising token, and then pushes the token to Google Ad Manager.

For details, see [UID2 SDK Integration Guide](#publisher-client-side.md).

A sample application is also available for client-side integration using the SDK. See [Sample Applications](#sample-applications).

## Sample Applications

The following sample applications are available to illustrate how to integrate with the Google Ad Manager secure signals feature:
- Server-only integration: {GWH link to come xxx}
- UID2 SDK integration: {GWH link to come xxx}

Each sample application has its own instructions.
