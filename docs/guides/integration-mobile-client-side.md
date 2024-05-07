---
title: UID2 Client-Side Integration Guide for Mobile
sidebar_label: Client-Side Integration for Mobile
pagination_label: UID2 Client-Side Integration Guide for Mobile
description: Information about setting up a client-side mobile integration.
hide_table_of_contents: false
sidebar_position: 04
displayed_sidebar: sidebarPublishers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';
import ReduceLatency from '/docs/snippets/_sdk-reduce-latency.mdx';

# UID2 Client-Side Integration Guide for Mobile

(**GWH__SW: audience? Is this only for publishers, or possibly advertisers also? (advertisers with apps?) 25 Android tabs 25 iOS tabs. End tabs 25. 48 tick sets 2 missing**)

This page is intended for mobile app publishers who want to integrate with UID2 with changes only within their mobile app.

This guide does not apply to publishers who want to use a Private Operator, or who want to generate tokens server-side. Those publishers should follow the [Client-Server Integration Guide for Mobile](integration-mobile-client-server.md).

The page provides a high-level overview, integration steps, and links to additional documentation.

UID2 provides a mobile SDK for Android and iOS with the following features:

- UID2 token generation
- Automatic refreshing of UID2 tokens
- Automatic storage of UID2 tokens

To integrate with UID2 client-side, you will need to complete the following steps:

1. Complete UID2 account setup.

1. Add a UID2 mobile SDK into your mobile app.

1. [Configure the UID2 mobile SDK](#configure-the-uid2-mobile-sdk).

1. [Check that the token was successfully generated and then pass it for bid stream use](#pass-generated-token-for-bid-stream-use).

1. Optionally, integrate the UID2 GMA/IMA Plugin for GAM Secure Signal integration.

<!-- It includes the following sections:

- [UID2 Mobile SDK Version](#uid2-mobile-sdk-version)
- [Client-Side Integration Example](#client-side-integration-example)
- [Complete UID2 Account Setup ](#complete-uid2-account-setup)
- [Add the UID2 Mobile SDK to Your Mobile App](#add-the-uid2-mobile-sdk-to-your-mobile-app)
- [Configure the UID2 Mobile SDK](#configure-the-uid2-mobile-sdk)
- [Format Examples for DII](#format-examples-for-dii)
- [Token Storage and Refresh](#token-storage-and-refresh)
- [Pass Generated Token for Bid Stream Use](#pass-generated-token-for-bid-stream-use)
- [Best Practice on When to Pass DII to the UID2 Mobile SDK](#best-practice-on-when-to-pass-dii-to-the-uid2-mobile-sdk)
- [Opt-Out Handling](#opt-out-handling)
- [Enable Logging](#enable-logging)
- [Optional: UID2 GMA/IMA Plugin for GAM Secure Signal integration](#optional-uid2-gmaima-plugin-for-gam-secure-signal-integration) -->

## UID2 Mobile SDK Version

To follow this client-side integration guide, it requires v1.0.0 or higher of UID2 SDK for Android and iOS. Follow the Add UID2 Mobile SDK into your mobile App section below to install these SDK versions in your apps.

## Client-Side Integration Example

For an example of how to configure a UID2 mobile SDK, and how to generate tokens using client-side integration for mobile, you can try out the UID2 development app.

Follow the instructions for the operating system you're using: Android or iOS.

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

1. Check out the main branch of the [UID2 SDK for Android source code repository on GitHub](https://github.com/IABTechLab/uid2-android-sdk/tree/main).
1. In Android Studio, open the directory that you checked out.
1. Run the **dev-app** app.

</TabItem>
<TabItem value='ios' label='iOS'>

1. Check out the [main branch of the UID2 SDK For iOS source code repository on GitHub](https://github.com/IABTechLab/uid2-ios-sdk/tree/main).
1. In Xcode, open this project file:

   ```js
   Development/UID2SDKDevelopmentApp/UID2SDKDevelopmentApp.xcodeproj
   ```
1. Run the **UID2SDKDevelopmentApp** app scheme.

</TabItem>
</Tabs>

(**GWH__SW_from_meeting: step 3 is the checkbox, then enter email or phone number. then that's the procedure.?**)

When you've started the app, ensure the **Client Side** checkbox is checked, then enter an email or phone number. The sample app makes the following UID2 SDK API call that sends a request to the UID2 service to generate an identity and resulting token for the email/phone input:

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

When the API call successfully completes, the app displays the resulting identity and persists it inside the `UID2Manager` class.

The identity contains the generated UID2 advertising token value which can be retrieved using the following method call:

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

This function call returns the value that you need to make an ad request. For details, see [Pass Generated Token for Bid Stream Use](#pass-generated-token-for-bid-stream-use).

### Testing With Your Own Configuration

By default, the development app uses a default set of subscription ID and public key stored in the following object:

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

Connect to the UID2 integration environment as specified in the following Android object/iOS file: (**GWH_ work with wording**)

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

You can change the credentials to ones assigned to you and connect to the UID2 Production environment if necessary. For details, see [Optional: Reduce Latency by Setting the API Base URL for the Production Environment](#optional-reduce-latency-by-setting-the-api-base-url-for-the-production-environment). (**GWH_SW are we still using the sample application here?**)

## Complete UID2 Account Setup

Complete the UID2 account setup by following the steps described in [Account Setup](../getting-started/gs-account-setup.md). As part of the account setup process, you'll need to provide a list of all the app names (Android Application ID, iOS App Bundle ID, and App Store ID) for the mobile apps that you'll be integrating with the UID2 mobile SDKs.

When account setup is complete, you'll receive a [subscription ID and public key](../getting-started/gs-credentials.md#subscription-id-and-public-key). These values are unique to you, and you'll be required to use them to [configure the UID2 mobile SDK](#configure-the-uid2-mobile-sdk).

## Add the UID2 Mobile SDK to Your Mobile App

to add the mobile SDK to your app, follow the applicable documentation:

- [UID2 SDK for Android Reference Guide](../sdks/uid2-sdk-ref-android.md)
- [UID2 SDK for iOS Reference Guide](../sdks/uid2-sdk-ref-ios.md)

(**GWH__SW not sure what it means "Follow the instructions on a draft version of a new UID2 SDK for Android reference guide" please clarify.**)

At this point, you are ready to start generating UID2 tokens using the SDK.

### Using the UID2 Integration Environment

By default, the SDK is configured to work with the UID2 production environment: [https://prod.uidapi.com](https://prod.uidapi.com). If you want to use the UID2 integration environment instead, provide the following URL in your call to initialize UID2Manager:

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
- You'll have a different set of credentials (Subscription ID and public key) for each environment (integ and prod). Be sure to use the correct credentials for each environment.
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

UID2 provides the publisher with the following values required to generate the UID2 token on the client side:

- A subscription ID
- A public key

You'll have one set of these values for your publisher testing environment, and a separate set for your production environment.

To configure the SDK, you are required to pass in the public key and subscription ID that you received during account setup, as well as the user’s hashed or unhashed directly identifying information ([DII](../ref-info/glossary-uid.md#gl-dii)) (email address or phone number) into the following method call.

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

Once it's configured, the UID2 mobile SDK takes care of the following:

- Generates a UID2 token for the user
- Stores the token locally on the user’s device
- Automatically refreshes the token as required while your app is open.

You can pass the user’s DII (Directly Identifiable Information) to the UID2 mobile SDK either hashed or unhashed. If you pass the DII unhashed, the SDK hashes it for you. If you want to pass the DII to the SDK already hashed, you must normalize it before hashing. For details, see [Normalization and Encoding](../getting-started/gs-normalization-encoding.md).

## Format Examples for DII

The SDK encrypts the hashed DII before sending it to the UID2 service.

You can invoke the `generateIdentity` method using any of the four accepted formats for directly identifying information (DII), for any specific user. The DII format might vary per user, but you can only send one value per user.

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

- The publisher is responsible for normalizing and hashing the email address. For details, see [Normalization and Encoding](../getting-started/gs-normalization-encoding.md).
- The UID2 mobile SDK encrypts the hash before sending it to the UID2 service.

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

- The publisher is responsible for normalizing the phone number. For details, see Phone Number Normalization.
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

- The publisher is responsible for normalizing and hashing the phone number. For details, see [Normalization and Encoding](../getting-started/gs-normalization-encoding.md).
- The UID2 mobile SDK encrypts the hash before sending it to the UID2 service.

## Token Storage and Refresh

After a call to one of the methods listed in [Configure the UID2 Mobile SDK](#configure-the-uid2-mobile-sdk) is successful, an identity is generated and stored in local file storage. The UID2 mobile SDK refreshes the UID2 token periodically. 

:::warning
The format of the file stored in the local file storage or the filename itself could change without notice. We recommend that you do not read and update the file directly.
:::
 
## Pass Generated Token for Bid Stream Use

In your mobile app, if there was a successful identity generated from the previous

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

call, subsequently, when you call: 

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

it should return a non-null string object such as the following: 

```js
AgAAAQFt3aNLXKXEyWS8Tpezcymk1Acv3n+ClOHLdAgqR0kt0Y+pQWSOVaW0tsKZI4FOv9K/rZH9+c4lpm2DBpmFJqjdF6FAaAzva5vxDIX/67UOspsYtiwxH73zU7Fj8PhVf1JcpsxUHRHzuk3vHF+ODrM13A8NAVlO1p0Wkb+cccIIhQ==
```

You can use this identity to pass downstream for sending in the RTB bid stream.

If

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

returns null, there was no identity or valid token generated for various reasons and you will need to check if there are any errors from the generateIdentity call (read Enable Logging below) or the identity generated has expired and you need to call generateIdentity again. Read the next section to learn when to do so.

## Best Practice on When to Pass DII to the UID2 Mobile SDK

The first time the app is opened with no identity, you'll need to make the following function call, with the DII, to start the token generation: (**GWH_SW why only the first time?**)

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

Once an identity is generated, the advertising token (UID2 token) that you would send to the bid stream will be available upon the successful completion of the generateIdentity function.

If the UID2 identity stored in local file storage has expired and cannot be refreshed, you must call the same function again to generate a new identity get the resulting UID2 token:

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

The only exception to this is if the following function returns a status of `OPT_OUT`, which means that the DII has opted out of UID2 and no identity/token should be generated for it. (**GWH_SW should UID2Manager.shared.identityStatus below have ()?**)

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

The best way to determine if DII is required by the UID2 mobile SDKs is to always call the following function on app startup/resumption:

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

If it returns `null`, you'll need to call the following function and pass DII into it again.

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

## Opt-Out Handling

If the DII provided to the

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

has opted out, this method will return null. Calling:

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

returns OPT_OUT status.

In this case you should avoid repeatedly making `generateIdentity()` calls again, because if the DII has a status of opted out, the UID2 token is not generated.

## Enable Logging

The UID2 mobile SDK may generate logs which could help debugging any issues during UID2 integration work. You can enable the logging by: 

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
// On iOS, you must set UID2Settings before you first access UID2Manager.shared. Any changes made to settings after the first access is not read.
```

</TabItem>
</Tabs>

## Optional: UID2 GMA/IMA Plugin for GAM Secure Signal integration

If you intend to generate UID2 tokens to send it to Google GMA/IMA SDKs, assuming you have followed the Client-Side or Server-Side Integration Guides for Mobile, you need to add UID2 GMA/IMA plugins into your mobile app. Refer to the Plugin guides on how to install it into your apps:

- [UID2 GMA Plugin for Android Integration Guide](mobile-plugin-gma-android.md)
- [UID2 GMA Plugin for iOS Integration Guide](mobile-plugin-gma-ios.md)
- [UID2 IMA Plugin for Android Integration Guide](mobile-plugin-ima-android.md)
- [UID2 IMA Plugin for iOS Integration Guide](mobile-plugin-ima-ios.md)

Note: You do not need to explicitly retrieve the advertising tokens using (**GWH__SW not sure how to put this... let's discuss.**)

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

and pass into Google GMA/IMA SDK manually – this would be done automatically by the UID2 GMA/IMA plugins.

You just need to ensure calling the following return a non-null string object:

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

Then, the Google GMA/IMA plug-ins should be able to retrieve it via the UID2 GMA/IMA plugins.
