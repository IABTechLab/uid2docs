---
title: UID2 Client-Side Integration Guide for Mobile
sidebar_label: Client-Side Integration for Mobile
pagination_label: UID2 Client-Side Integration Guide for Mobile
description: Setting up a mobile integration with token generate and refresh both on the client side.
hide_table_of_contents: false
sidebar_position: 04
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';
import ReduceLatency from '/docs/snippets/_sdk-reduce-latency.mdx';

# UID2 Client-Side Integration Guide for Mobile

This page is intended for mobile app publishers who want to integrate with UID2 with changes only within their mobile app.

This guide does not apply to publishers who want to use a Private Operator, or who want to generate tokens server-side. Those publishers should follow the [Client-Server Integration Guide for Mobile](integration-mobile-client-server.md).

The page provides a high-level overview, integration steps, and links to additional documentation.

UID2 provides mobile SDKs for [Android](../sdks/uid2-sdk-ref-android.md) and [iOS](../sdks/uid2-sdk-ref-ios.md). Each SDK has the following features:

- Generates UID2 tokens.
- Automatically refreshes UID2 tokens.
- Manages automatic storage of UID2 tokens.

(**GWH__SW_11: Should the list of what the SDKs do be identical for client-side and client-server? They are not currently.**)

To integrate with UID2 client-side, you'll need to complete the following steps:

1. [Complete the UID2 account setup](#complete-the-uid2-account-setup).

1. [Add the UID2 mobile SDK into your mobile app](#add-the-uid2-mobile-sdk-into-your-mobile-app).

1. [Configure the UID2 mobile SDK](#configure-the-uid2-mobile-sdk).

1. [Check that the token was successfully generated and then pass it for bid stream use](#pass-generated-token-for-bid-stream-use).

1. Optionally, integrate the UID2 GMA/IMA Plugin for GAM Secure Signal integration.

<!-- It includes the following sections:

- [UID2 Mobile SDK Version](#uid2-mobile-sdk-version)
- [Client-Side Integration Example](#client-side-integration-example)
- [Complete the UID2 Account Setup](#complete-the-uid2-account-setup)
- [Add the UID2 Mobile SDK into Your Mobile App](#add-the-uid2-mobile-sdk-into-your-mobile-app)
- [Configure the UID2 Mobile SDK](#configure-the-uid2-mobile-sdk)
- [Format Examples for DII](#format-examples-for-dii)
- [Token Storage and Refresh](#token-storage-and-refresh)
- [Pass Generated Token for Bid Stream Use](#pass-generated-token-for-bid-stream-use)
- [Best Practice on When to Pass DII to the UID2 Mobile SDK](#best-practice-on-when-to-pass-dii-to-the-uid2-mobile-sdk)
- [Opt-Out Handling](#opt-out-handling)
- [Enable Logging](#enable-logging)
- [Optional: UID2 GMA/IMA Plugin for GAM Secure Signal integration](#optional-uid2-gmaima-plugin-for-gam-secure-signal-integration) -->

## Add UID2 Mobile SDK Version

This guide provides instructions for using version v1.0.0 or higher of either of these UID2 mobile SDKs:

- [UID2 SDK for Android Reference Guide](../sdks/uid2-sdk-ref-android.md)
- [UID2 SDK for iOS Reference Guide](../sdks/uid2-sdk-ref-ios.md)

For instructions for installing the correct SDK/version into your mobile app, see [Add the UID2 Mobile SDK into Your Mobile App](#add-the-uid2-mobile-sdk-into-your-mobile-app).

## Client-Side Integration Example

For an example of how to configure a UID2 mobile SDK, and how to generate tokens using client-side integration for mobile, you can try out the UID2 development app.

Follow the applicable instructions, for Android or iOS:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

1. Check out the main branch of the [UID2 SDK for Android source code repository on GitHub](https://github.com/IABTechLab/uid2-android-sdk/tree/main).
1. In Android Studio, open the directory that you checked out.
1. Run the **dev-app** app.
1. When you've started the app, make sure that the **Client Side** checkbox is checked.
1. Enter an email or phone number.

</TabItem>
<TabItem value='ios' label='iOS'>

1. Check out the [main branch of the UID2 SDK For iOS source code repository on GitHub](https://github.com/IABTechLab/uid2-ios-sdk/tree/main).
1. In Xcode, open this project file:

   ```js
   Development/UID2SDKDevelopmentApp/UID2SDKDevelopmentApp.xcodeproj
   ```
1. Run the **UID2SDKDevelopmentApp** app scheme.
1. When you've started the app, make sure that the **Client Side** checkbox is checked.
1. Enter an email or phone number.

</TabItem>
</Tabs>

Behind the scenes, the sample app makes the following UID2 SDK API call. This call sends a request to the UID2 service to generate an <Link href="../ref-info/glossary-uid#gl-identity">identity</Link> (a UID2 token and associated values) for the email/phone input:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().generateIdentity()
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.generateIdentity()
```

</TabItem>
</Tabs>

When the API call is successful, the app displays the resulting identity and persists it inside the `UID2Manager` class.

The identity includes the generated UID2 advertising token value, which you can retrieve using the `getAdvertisingToken()` method call:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().getAdvertisingToken()
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.getAdvertisingToken()
```

</TabItem>
</Tabs>

This method call returns the value that you need to make an ad request: see [Pass Generated Token for Bid Stream Use](#pass-generated-token-for-bid-stream-use).

### Testing With Your Own Configuration

By default, the development app uses default values for Subscription ID and public key, which are stored in the following object:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
com.uid2.dev.ui.MainScreenViewModel.Companion
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
RootViewModel
```

</TabItem>
</Tabs>

To test, you can connect to the UID2 integration environment as specified in the following Android method call/iOS file:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
com.uid2.UID2Manager.Companion#init
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
see UID2SDKDevelopmentApp/UID2SDKDevelopmentApp/Info.plist
```

</TabItem>
</Tabs>

If necessary, you can also change the default Subscription ID and public key to ones assigned to you, and connect to the UID2 Production environment. For details, see [Optional: Reduce Latency by Setting the API Base URL for the Production Environment](#optional-reduce-latency-by-setting-the-api-base-url-for-the-production-environment).

## Complete the UID2 Account Setup

To set up your account, follow the steps described in [Account Setup](../getting-started/gs-account-setup.md). As part of the account setup process, you'll need to provide a list of <Link href="../ref-info/glossary-uid#gl-app-name">app names</Link> for all the mobile apps that you'll be integrating with the UID2 mobile SDKs, including any of these values that apply:

- Android Application ID
- iOS App Bundle ID
- App Store ID

When account setup is complete, you'll receive a [Subscription ID and public key](../getting-started/gs-credentials.md#subscription-id-and-public-key). These values are unique to you, and you'll use them when you [configure the UID2 mobile SDK](#configure-the-uid2-mobile-sdk).

## Add the UID2 Mobile SDK to Your Mobile App

To add the mobile SDK to your app, follow the applicable documentation:

- [UID2 SDK for Android Reference Guide](../sdks/uid2-sdk-ref-android.md)
- [UID2 SDK for iOS Reference Guide](../sdks/uid2-sdk-ref-ios.md)

At this point, you are ready to start generating UID2 tokens using the SDK.

### Using the UID2 Integration Environment

By default, the SDK is configured to work with the UID2 production environment: `https://prod.uidapi.com`. If you want to use the integration environment instead, provide the following URL in your call to initialize `UID2Manager`:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.init(
  context = this,
  serverUrl = "https://operator-integ.uidapi.com"
)
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
// Must be set before UID2Manager.shared is accessed
UID2Settings.shared.environment = .custom(
  url: URL(string: "https://operator-integ.uidapi.com")!
)
```

</TabItem>
</Tabs>

:::note
Bear in mind the following differences between environments:
- Tokens from the UID2 integration environment are not valid for passing to the bid stream.
- You'll have a different set of Subscription ID and public key values for each environment (integ and prod). Be sure to use the correct values for each environment.
:::

### Optional: Reduce Latency by Setting the API Base URL for the Production Environment

<ReduceLatency />

To specify a different UID2 server, you can change it in the `init` call, as shown in the following examples.

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>
 
```js
UID2Manager.init(
  context = this,
  serverUrl = " https://global.prod.uidapi.com"
)
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
// Must be set before UID2Manager.shared is accessed
UID2Settings.shared.environment = .custom(
  url: URL(string: "https://global.prod.uidapi.com")!
)
// or use a named environment
UID2Settings.shared.environment = .sydney
```

</TabItem>
</Tabs>

## Configure the UID2 Mobile SDK

UID2 provides the publisher with the following values, which are needed for generating the UID2 token on the client side:

- Subscription ID
- Public key

You'll have one set of these values for your testing environment, and a separate set for your production environment.

To configure the SDK, you must pass in the Subscription ID and public key that you received during account setup, as well as the user’s hashed or unhashed directly identifying information (<Link href="../ref-info/glossary-uid#gl-dii">DII</Link>) (email address or phone number), into the following method call:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().generateIdentity()
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.generateIdentity()
```

</TabItem>
</Tabs>

Once it's configured, the UID2 mobile SDK does the following:

- Generates a UID2 token for the user
- Stores the token locally on the user’s device
- Automatically refreshes the token as required while your app is open

:::tip
You can pass the user’s <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> to the UID2 mobile SDK either hashed or unhashed. If you pass the DII unhashed, the SDK hashes it for you. If you want to pass the DII to the SDK already hashed, you must normalize it before hashing. For details, see [Normalization and Encoding](../getting-started/gs-normalization-encoding.md).
:::

## Format Examples for DII

The SDK encrypts the hashed DII before sending it to the UID2 service.

You can invoke the `generateIdentity` method using any of the four accepted formats for DII, for any specific user. The DII format might vary per user, but you can only send one value per user.

The following examples demonstrate the different ways that you can configure the UID2 mobile SDK and list the requirements for the DII passed into the SDK.

- Configure for Email Address
- Configure for Hashed Email Address
- Configure for Phone Number
- Configure for Hashed Phone Number

If the `generateIdentity` method is called multiple times, the UID2 mobile SDK uses the most recent configuration values.

### Email, Unhashed

The following example configures the UID2 mobile SDK with an email address.

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
manager.generateIdentity(
    IdentityRequest.Email("test@example.com"),
    subscriptionId,
    publicKey,
) { result ->
    when (result) {
        is Error -> ...
        is Success -> ...
    }
}
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
guard let normalizedEmail = IdentityType.NormalizedEmail(string: "test@example.com") else {
    // email is invalid and cannot be normalized, handle error
}
try await UID2Manager.shared.generateIdentity(
    .email(normalizedEmail),
    subscriptionID: subscriptionID,
    serverPublicKey: serverPublicKeyString
) 
```

</TabItem>
</Tabs>

In this scenario:

- No normalization or hashing is required by the publisher
- The UID2 mobile SDK normalizes and hashes the email address before sending the encrypted hash to the UID2 service.

### Email, Normalized and Hashed

The following example configures the UID2 SDK with a hashed email address.

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
manager.generateIdentity(
    IdentityRequest.EmailHash(
        “eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=”
    ),
    subscriptionId,
    publicKey,
) { result ->
    when (result) {
        is Error -> ...
        is Success -> ...
    }
}
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
try await UID2Manager.shared.generateIdentity(
    .emailHash("eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc="),
    subscriptionID: subscriptionID,
    serverPublicKey: serverPublicKeyString
)
```

</TabItem>
</Tabs>

In this scenario:

- The publisher is responsible for normalizing and hashing the email address. For details, see [Email Address Normalization](../getting-started/gs-normalization-encoding.md#email-address-normalization).
- The UID2 mobile SDK encrypts the hashed DII before sending it to the UID2 service.

### Phone Number, Unhashed

The following example configures the UID2 mobile SDK with a phone number.

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
manager.generateIdentity(
    IdentityRequest.Phone(“+1111111111”),
    subscriptionId,
    publicKey,
) { result ->
    when (result) {
        is Error -> ...
        is Success -> ...
    }
}
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
guard let normalizedPhone = IdentityType.NormalizedPhone(normalized: "+1111111111") else {
    // phone number is invalid and cannot be normalized, handle error
}
try await UID2Manager.shared.generateIdentity(
    .phone(normalizedPhone),
    subscriptionID: subscriptionID,
    serverPublicKey: serverPublicKeyString
) 
```

</TabItem>
</Tabs>

In this scenario:

- The publisher is responsible for normalizing the phone number. For details, see [Phone Number Normalization](../getting-started/gs-normalization-encoding.md#phone-number-normalization).
- The UID2 mobile SDK hashes the phone number before sending the encrypted hash to the UID2 service.

### Phone Number, Normalized and Hashed

The following example configures the UID2 mobile SDK with a hashed phone number.

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
manager.generateIdentity(
    IdentityRequest.PhoneHash(
        “eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc=”
    ),
    subscriptionId,
    publicKey,
) { result ->
    when (result) {
        is Error -> ...
        is Success -> ...
    }
}
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
try await UID2Manager.shared.generateIdentity(
    .phoneHash("eVvLS/Vg+YZ6+z3i0NOpSXYyQAfEXqCZ7BTpAjFUBUc="),
    subscriptionID: subscriptionID,
    serverPublicKey: serverPublicKeyString
) 
```

</TabItem>
</Tabs>

In this scenario: 

- The publisher is responsible for normalizing and hashing the phone number. For details, see [Phone Number Hash Encoding](../getting-started/gs-normalization-encoding.md#phone-number-hash-encoding).
- The UID2 mobile SDK encrypts the hashed DII before sending it to the UID2 service.

## Token Storage and Refresh

After a call to the applicable method listed in [Configure the UID2 Mobile SDK](#configure-the-uid2-mobile-sdk) is successful, an identity is generated and stored in local file storage. The UID2 mobile SDK refreshes the UID2 token periodically. 

:::warning
The format of the file stored in the local file storage, or the filename itself, could change without notice. We recommend that you do not read and update the file directly.
:::
 
## Pass Generated Token for Bid Stream Use

In your mobile app, if the call to `generateIdentity()` was successful, it returned an identity, which you can then use in the bid stream.

First, the method call to generate the identity:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().generateIdentity()
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.generateIdentity()
```

</TabItem>
</Tabs>

Then, the method call to get the advertising token:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().getAdvertisingToken()
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.getAdvertisingToken()
```

</TabItem>
</Tabs>

If successful, this method call returns a non-null string object such as the following: 

```js
AgAAAQFt3aNLXKXEyWS8Tpezcymk1Acv3n+ClOHLdAgqR0kt0Y+pQWSOVaW0tsKZI4FOv9K/rZH9+c4lpm2DBpmFJqjdF6FAaAzva5vxDIX/67UOspsYtiwxH73zU7Fj8PhVf1JcpsxUHRHzuk3vHF+ODrM13A8NAVlO1p0Wkb+cccIIhQ==
```

You can use this identity to pass downstream for sending in the RTB bid stream.

If the `getAdvertisingToken()` method call returns `null`, there was no identity or valid token generated.

Some possible reasons for this, and some things you could do to troubleshoot, are as follows:

- Check to see whether there are any errors from the `generateIdentity()` call.
- Enable logging to get more information: see [Enable Logging](#enable-logging)
- It's possible that the identity that was generated has expired. If this happens, you'll need to call the `generateIdentity()` method again: see [Client-Side Integration Example](#client-side-integration-example).

For more information, see [Best Practices on When to Pass DII to the UID2 Mobile SDK](#best-practices-on-when-to-pass-dii-to-the-uid2-mobile-sdk).

## Best Practices on When to Pass DII to the UID2 Mobile SDK

The first time a new user opens the app, no UID2 identity exists. You'll need to call the `generateIdentity()` method, with the DII, to start the token generation:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().generateIdentity()
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.generateIdentity()
```

</TabItem>
</Tabs>

When this method call completes successfully, the advertising token (UID2 token) is available for you to send to the bid stream.

If the UID2 identity stored in local file storage has expired and cannot be refreshed, you must call the `generateIdentity()` method again to generate a new identity and get the resulting UID2 token.

The only exception is if the following Android method/iOS object returns a status of `OPT_OUT`, which means that the DII has been opted out of UID2 and no identity/token should be generated for it:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().getIdentityStatus()
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.identityStatus
```

</TabItem>
</Tabs>

The best way to determine if DII is required by the UID2 mobile SDKs is to always call the `getAdvertisingToken()` method when the app starts up or resumes:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().getAdvertisingToken()
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.getAdvertisingToken()
```

</TabItem>
</Tabs>

If `getAdvertisingToken()` returns `null`, you'll need to generate a new token. Pass the DII into a call to the `generateIdentity()` method again.

## Opt-Out Handling

(**GWH note: reviewed this doc up to this point. Rest is partially unreviewed (and the below needs fixing).**)

If the DII provided to the `generateIdentity()` method has been opted out of UID2, this method returns `null`. To check the status of the UID2, you can call the following method:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().getIdentityStatus()
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.identityStatus
```

</TabItem>
</Tabs>

In this case you should avoid making repeated calls to check the identity, because if the DII has a status of opted out, the UID2 token is not generated. (**GWH__SW_12 is there any more to this than a wasted API call?**)

## Enable Logging

The UID2 mobile SDK can generate logs, which could help in debugging any issues during UID2 integration work. To enable logging, do the following:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
// During UID2Manager initialization:
UID2Manager.init(
  context = this,
  isLoggingEnabled = true
)
```

</TabItem>
<TabItem value='ios' label='iOS'>

```swift
UID2Settings.shared.isLoggingEnabled = true
// On iOS, you must set UID2Settings before you first access UID2Manager.shared. Changes made to settings after first access are not read.
```

</TabItem>
</Tabs>

## Optional: UID2 GMA/IMA Plugin for GAM Secure Signal integration

If you intend to generate UID2 tokens to send to Google GMA/IMA SDKs, assuming you have followed the instructions in the [Client-Side Integration Guide for Mobile](integration-mobile-client-side.md) or the [Client-Server Integration Guide for Mobile](integration-mobile-client-server.md), you must also add the UID2 GMA/IMA plugins into your mobile app. For instructions, refer to the applicable plug-in guide:

- [UID2 GMA Plugin for Android Integration Guide](mobile-plugin-gma-android.md)
- [UID2 GMA Plugin for iOS Integration Guide](mobile-plugin-gma-ios.md)
- [UID2 IMA Plugin for Android Integration Guide](mobile-plugin-ima-android.md)
- [UID2 IMA Plugin for iOS Integration Guide](mobile-plugin-ima-ios.md)

:::note
You do not need to explicitly run the `getAdvertisingToken()` method call to retrieve the advertising tokens and pass them into Google GMA/IMA SDK manually. The UID2 GMA/IMA plugins manage this for you.
:::

All you need to do is make sure that `getAdvertisingToken()` returns a non-null string object:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().getAdvertisingToken()
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.getAdvertisingToken()
```

</TabItem>
</Tabs>

If the token exists, the Google GMA/IMA plug-ins can retrieve it via the UID2 GMA/IMA plugins.
