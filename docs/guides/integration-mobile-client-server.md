---
title: UID2 Client-Server Integration Guide for Mobile
sidebar_label: Client-Server Integration for Mobile
pagination_label: UID2 Client-Server Integration Guide for Mobile
description: Information about setting up a client-server mobile integration.
hide_table_of_contents: false
sidebar_position: 04
displayed_sidebar: sidebarPublishers
---

import Link from '@docusaurus/Link';

# UID2 Client-Server Integration Guide for Mobile
This guide is an overview of integration options for publishers who want to  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

It includes the following sections:

- [Overview](#overview)
- [Complete UID2 Account Setup](#complete-uid2-account-setup)
- [Client-Server Mobile Integration Data Flow Overview](#client-server-mobile-integration-data-flow-overview)
- [Implement Server-Side Token Generation On Your Back-End Server](#xxx)
- [Server-Side Token Refresh](#server-side-token-refresh)
- [Add UID2 Mobile SDK into Your Mobile App](#add-uid2-mobile-sdk-into-your-mobile-app)
- [Using the UID2 Integration Environment](#using-the-uid2-integration-environment)
- [Optional: Reduce Latency by Setting the API Base URL for the Production Environment](#optional-reduce-latency-by-setting-the-api-base-url-for-the-production-environment)
- [Token Storage](#token-storage)
- [Pass Generated Token for Bid Stream Use](#pass-generated-token-for-bid-stream-use)
- [Best Practice on When to Pass New UID2 Token to the UID2 SDK](#best-practice-on-when-to-pass-new-uid2-token-to-the-uid2-sdk)
- [Enable Logging (For Android Only)](#enable-logging-for-android-only)
- [Enable Automatic Token Refresh in Mobile App/Client Side](#enable-automatic-token-refresh-in-mobile-appclient-side)
- [Optional: UID2 GMA/IMA Plugin for GAM Secure Signal integration](#optional-uid2-gmaima-plugin-for-gam-secure-signal-integration)

This page is intended for the mobile app publishers who want to integrate with UID2 by generating UID2 tokens on their backend servers (or server side) via either a public or private operators and then pass the tokens and user identities into their mobile apps which will in-turn pass the tokens for bid stream use.  

This is called Client-Server Integration because it requires critical integration steps in both client and server side.

If you want to integrate with UID2 via client-side only changes (i.e. all integration changes required are within the mobile apps), refer to the [UID2 Client-Side Integration Guide for Mobile](integration-mobile-client-side.md) instead.

This page provides a high-level overview of integration steps and links to additional documentation.

## Overview

UID2 provides a mobile SDK for Android and iOS with the following features: (**GWH__SW are we now going to have a combo mobile SDK? If we still have two I'll fix the wording.**)

- Takes in a UID2 Identity (including a UID2 token) and persisting it in local file storage
- Automatic refreshing of UID2 tokens

You'll need to complete the following steps:

1. Complete UID2 account setup.
1. Implement Server-Side Token Generation on your back-end server.
1. Add UID2 Mobile SDK into your mobile app.
1. Configure the UID2 Mobile SDK for your mobile app.
1. [Check that the token was successfully generated and then pass it for bid stream use](#pass-generated-token-for-bid-stream-use).
1. Optional: UID2 GMA/IMA Plugin for GAM Secure Signal integration.

## Complete UID2 Account Setup

Complete the UID2 account setup by following the steps described in the Account Setup page.

When account setup is complete, you'll receive your unique API key and client secret. These values are unique to you, and it is important to keep them secure. For details, see API Key and Client Secret.

## Client-Server Mobile Integration Data Flow Overview

This diagram presents the data flow this Client-Server Mobile Integration requires to be implemented by the mobile app publishers. It is demonstrating using UID2 SDK for Android in the client-side mobile app and UID2 SDK for Java on the server side.

TODO: Add Rita’s latest diagram from here


## Implement Server-Side Token Generation On Your Back-End Server

The first step of UID2 integration is to be able to generate UID2 token on your backend server to then pass it into your mobile apps for passing the token into the RTB bid stream.

There are two ways to generate UID2 tokens on the server side by providing directly identifying information (DII), as summarized in the table below:

Integration Solution 

Generate Token 

Refresh Token 

UID2 SDK for Java 

✅ 

✅ 

UID2 SDK for Python 

✅ 

✅ 

Direct Integration (API endpoints with custom code) 

✅ 

✅ 



Regardless from the integration option, you will need to implement one of the following:



Call the POST /token/generate endpoint.

The identity output you need for the rest of this guide is the content inside the body section of a successful endpoint response, see an example here

Utilize one of the server-side SDKs’ UID2 Publisher Client classes that simplifies such request into a single method call. Please refer to the Publisher Basic Usage of the UID2 SDK for Java or UID2 SDK for Python for instructions

The Identity output you need for the rest of this guide is the output of the following 2 methods.

For Python: token_generate_response.get_identity_json_string()

For Java: tokenGenerateResponse.getIdentityJsonString()

Note that the endpoint and SDK API above may return optout status if the DII (Directly Identifiable Information) you are generating token for has opted out of UID2.  You should save this information and should not call token generation endpoint for this DII again. 

You will need to pass this into the mobile app in the Configure the UID2 Mobile SDK for your mobile app section below.

Note: that for security reasons, API key and secret used in token generation must be called server-side and cannot be stored inside the mobile apps.

## Server-Side Token Refresh

Token refresh is automatically enabled inside the UID2 mobile SDKs; you don't need to manage it explicitly on the server side.

You might decide to do server-side token refresh if you want to keep your changes in the mobile apps as simple as possible.

However, if you decide you want to do it on the server side and not client/mobile side, you can do so using one of the following:

Call the POST /token/refresh endpoint.

Utilize one of the server-side SDKs’ UID2 Publisher Client classes that simplifies such request into a single method call. Please refer to the Publisher Server-Only Integration section of the UID2 SDK for Java or UID2 SDK for Python for instructions

 and pass the newly refreshed Identity to the mobile app by following the rest of this guide below.



## Add UID2 Mobile SDK into Your Mobile App

For installation instructions, please see the UID2 SDK for Android Reference Guide and iOS Reference Guide.

Follow the UID2 SDK documentation to:

Add the pre-built UID2 SDK for Android libraries into your mobile app here.

Learn how to instantiate the UID2Manager instance in your Android app here. For iOS, refer to the Usage Guidelines.



## Using the UID2 Integration Environment

By default, the SDK is configured to work with the UID2 production environment https://prod.uidapi.com . If you want to use the UID2 integration environment instead, provide the following URL in your call to UID2Manager initiation.

#### For Android:

UID2Manager.init(

  context = this,
  serverUrl = "https://operator-integ.uidapi.com"
)



#### For iOS:

// Must be set before UID2Manager.shared is accessed UID2Settings.shared.environment = .custom(

  url: URL(string: "https://operator-integ.uidapi.com")!

)

On iOS, you must set UID2Settings before you first access UID2Manager.shared. Any changes made to settings after the first access will not be read.



Note:

Tokens from the UID2 integration environment are not valid for passing to the bid stream. For the integration environment, you will have different subscription ID and public key values.



## Optional: Reduce Latency by Setting the API Base URL for the Production Environment

By default, in the production environment, the UID2 SDK for Android makes API calls to a UID2 server in the USA. Depending on where your users are based, you might consider choosing a server closer to your users to reduce latency.

For example, a publisher in Singapore can set the base URL to `https://sg.prod.uidapi.com`. This is still the UID2 production environment, but the servers are in Singapore.

For the list of valid base URLs, see [Environments](../getting-started/gs-environments.md).

You can also set the base URL to `https://global.prod.uidapi.com`. This URL directs readers to a region geographically close to them, which is ideal if your audience is geographically distributed.

To specify a different UID2 server, you can change it in the init call:

#### For Android:

UID2Manager.init(

  context = this,
  serverUrl = " https://global.prod.uidapi.com"
)



#### For iOS:

UID2Settings.shared.environment = .singapore



// or





UID2Settings.shared.environment = .custom(

  url: URL(string: "https://global.prod.uidapi.com")!

)





Configure the UID2 Mobile SDK for your mobile app



After you have instantiated UID2Manager correctly in your mobile app, you will need to pass a UID2 Identity generated from your backend server via Implement Server-Side Token Generation on your backend server section above and pass into the mobile app using the setIdentity method:

For Android: `UID2Manager.getInstance().generateIdentity()`

For iOS: `UID2Manager.shared.setIdentity()`

## Token Storage

After you call the `setIdentity` method, the UID2 Identity will be persisted in local file storage.

:::warning
The format of the file stored in the local file storage, or the filename itself, could change without notice. We recommend that you do not read and update the file directly.
:::


## Pass Generated Token for Bid Stream Use

(**GWH__SW we have to make this (heading) shorter. I wonder can we break it into two steps? Just an idea.**)

In your mobile app, you can call

For Android: UID2Manager.getInstance().getAdvertisingToken()

For iOS: UID2Manager.shared.getAdvertisingToken()

And if there was a successful identity added into the UID2Manager, it should return a string like:

AgAAAQFt3aNLXKXEyWS8Tpezcymk1Acv3n+ClOHLdAgqR0kt0Y+pQWSOVaW0tsKZI4FOv9K/rZH9+c4lpm2DBpmFJqjdF6FAaAzva5vxDIX/67UOspsYtiwxH73zU7Fj8PhVf1JcpsxUHRHzuk3vHF+ODrM13A8NAVlO1p0Wkb+cccIIhQ==



You can use this identity to pass downstream for sending in RTB bid stream.

If

For Android: UID2Manager.getInstance().getAdvertisingToken()

For iOS: UID2Manager.shared.getAdvertisingToken()



returns null, there was not an identity or valid token generated for several reasons such as:

The identity is invalid

The advertising token inside the UID2 identity has expired and the refresh token expires too so token cannot be refreshed

In such situation, you will need to follow Implement Server-Side Token Generation on your backend server section above and generate a new UID2 identity and pass the result into the mobile app’s UID2Manager again.



## Best Practice on When to Pass New UID2 Token to the UID2 SDK

(**GWH_SW can we make this into a Best Practices section and then just list this one for now? We'll get others I'm sure.**)

The best way to determine if a new UID2 identity is required by the UID2 SDK again is to always call

For Android: UID2Manager.getInstance().getAdvertisingToken()

For iOS: UID2Manager.shared.getAdvertisingToken()

On startup/resumption of the app, if it returns null, it is time to generate new identity on the backend server by following the Implement Server-Side Token Generation on your backend server section above and pass it into the mobile app’s UID2Manager instance again

## Enable Logging (For Android Only)

The UID2 SDK may generate logs which could help debugging any issues during UID2 integration work. You can enable the logging during UID2Manager initialization:

#### For Android:

UID2Manager.init(

  context = this,

  isLoggingEnabled = true

)

IOS

UID2Settings.shared.isLoggingEnabled = true

On iOS, you must set UID2Settings before you first access UID2Manager.shared. Any changes made to settings after the first access will not be read.

## Enable Automatic Token Refresh in Mobile App/Client Side

(**GWH__SW could we use tabs here?**)

The UID2Manager will perform automatic token refresh, after a valid UID2 identity has been passed into it. If for any reason token refresh should be disabled, this can be done by:



For Android Java:

UID2Manager.getInstance()setAutomaticRefreshEnabled(false)

For Android Kotlin:

UID2Manager.getInstance().automaticRefreshEnabled = false

#### For iOS:

UID2Manager.shared.automaticRefreshEnabled = false



## Optional: UID2 GMA/IMA Plugin for GAM Secure Signal integration

If you intend to generate UID2 tokens to send it to Google GMA/IMA SDKs, assuming you have followed the Client-Side or Server-Side Integration Guides for Mobile, you need to add UID2 GMA/IMA plugins into your mobile app. Refer to the Plugin guides on how to install it into your apps:

- [UID2 GMA Plugin for Android Integration Guide](mobile-plugin-gma-android.md)
- [UID2 GMA Plugin for iOS Integration Guide](mobile-plugin-gma-ios.md)
- [UID2 IMA Plugin for Android Integration Guide](mobile-plugin-ima-android.md)
- [UID2 IMA Plugin for iOS Integration Guide](mobile-plugin-ima-ios.md)

Note: You do not need to explicitly retrieve the advertising tokens using

For Android: UID2Manager.getInstance().getAdvertisingToken()

For iOS: UID2Manager.shared.getAdvertisingToken()

and pass into Google GMA/IMA SDK manually – this would be done automatically by the UID2 GMA/IMA plugins.

You just need to ensure calling

For Android: UID2Manager.getInstance().getAdvertisingToken()

For iOS: UID2Manager.shared.getAdvertisingToken()

return a non-null string object. Then Google GMA/IMA SDKs should be able to retrieve it via the UID2 GMA/IMA plugins.
