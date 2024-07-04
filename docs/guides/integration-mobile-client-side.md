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
import EnableLogging from '/docs/snippets/_mobile-docs-enable-logging.mdx';
import GMAIMA_Plugins from '/docs/snippets/_mobile_docs_gmaima-plugin-gss.mdx';
import PrebidMobileSDK from '/docs/snippets/_mobile_docs_prebid-mobile.mdx';


# UID2 Client-Side Integration Guide for Mobile

This guide is for mobile app publishers who want to integrate with UID2 with changes only within their mobile app.

These instructions do not apply to publishers who want to use a Private Operator, or who want to generate tokens server-side. Those publishers should follow the [Client-Server Integration Guide for Mobile](integration-mobile-client-server.md).

This page provides a high-level overview of integration steps and links to additional documentation.

UID2 provides mobile SDKs for [Android](../sdks/uid2-sdk-ref-android.md) and [iOS](../sdks/uid2-sdk-ref-ios.md). Each SDK has the following features:

- Generates a UID2 <Link href="../ref-info/glossary-uid#gl-identity">identity</Link> (a UID2 token and associated values) and persists it in local file storage.
- Automatically refreshes UID2 tokens.

:::note
This guide uses the group term **UID2 mobile SDKs** to include both the UID2 SDK for Android and the UID2 SDK for iOS.
:::

To integrate with UID2 client-side, you'll need to complete the following steps:

1. [Complete the UID2 account setup](#complete-the-uid2-account-setup).

1. [Add the UID2 mobile SDK to your mobile app](#add-the-uid2-mobile-sdk-to-your-mobile-app).

1. [Configure the UID2 mobile SDK](#configure-the-uid2-mobile-sdk).

1. [Check that the token was successfully generated and then pass it for bidstream use](#pass-generated-token-for-bidstream-use).

1. [Optionally, integrate the UID2 GMA/IMA Plugin for GAM Secure Signal integration](#optional-uid2-gmaima-plugin-for-gam-secure-signal-integration).

## Mobile SDK Version

This guide provides instructions for using version 1.2.0 or higher of either of these UID2 mobile SDKs:

- UID2 SDK for Android
- UID2 SDK for iOS

For instructions for installing the correct SDK/version into your mobile app, see [Add the UID2 Mobile SDK to Your Mobile App](#add-the-uid2-mobile-sdk-to-your-mobile-app).

## Client-Side Integration Example

For an example of how to configure a UID2 mobile SDK, and how to generate tokens using client-side integration for mobile, you can try out the UID2 development app.

Follow the applicable instructions, for Android or iOS:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

1. Check out the main branch of the [UID2 SDK for Android source code repository on GitHub](https://github.com/IABTechLab/uid2-android-sdk/tree/main).
1. In Android Studio (check the version required in the [Minimum Requirements](../sdks/uid2-sdk-ref-android.md#minimum-requirements) section in the UID2 SDK for Android Reference Guide), open the directory that you checked out.
1. Run the **dev-app** app.
1. When you've started the app, make sure that the **Client Side** checkbox is checked.
1. Enter an email or phone number, and then click the arrow to the right.

</TabItem>
<TabItem value='ios' label='iOS'>

1. Check out the [main branch of the UID2 SDK For iOS source code repository on GitHub](https://github.com/IABTechLab/uid2-ios-sdk/tree/main).
1. In Xcode, open this project file:

   ```js
   Development/UID2SDKDevelopmentApp/UID2SDKDevelopmentApp.xcodeproj
   ```
1. Run the **UID2SDKDevelopmentApp** app scheme.
1. When you've started the app, make sure that the **Client Side** checkbox is checked.
1. Enter an email or phone number, and then click the arrow to the right.

</TabItem>
</Tabs>

Behind the scenes, the development app makes the following UID2 SDK API call. This call sends a request to the UID2 service to generate an <Link href="../ref-info/glossary-uid#gl-identity">identity</Link> (a UID2 token and associated values) for the email/phone input:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().generateIdentity(
    identityRequest: IdentityRequest,
    subscriptionId: String,
    publicKey: String,
    onResult: (GenerateIdentityResult) -> Unit
)
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.generateIdentity(
    _ identity: IdentityType,
    subscriptionID: String,
    serverPublicKey: String,
    appName: String? = nil
)
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

This method call returns the value that you need to make an ad request: see [Pass Generated Token for Bidstream Use](#pass-generated-token-for-bidstream-use).

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

By default, the development app is configured to connect to the UID2 integration environment, as specified in the following Android method call/iOS file:

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

If necessary, you can also change the default Subscription ID and public key to values assigned to you, and connect to the UID2 Production environment. For details, see [Optional: Specifying the API Base URL to Reduce Latency](#optional-specifying-the-api-base-url-to-reduce-latency).

## Complete the UID2 Account Setup

To set up your account, follow the steps described in [Account Setup](../getting-started/gs-account-setup.md). As part of the account setup process, you'll need to provide a list of <Link href="../ref-info/glossary-uid#gl-app-name">app names</Link> for all the mobile apps that you'll be integrating with the UID2 mobile SDKs, including any of these values that apply:

- Android Application ID
- iOS Bundle Identifier
- iOS App Store ID

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
- Tokens from the UID2 integration environment are not valid for passing to the <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link>.
- You'll have a different set of Subscription ID and public key values for each environment (integration and production). Be sure to use the correct values for each environment.
:::

### Optional: Specifying the API Base URL to Reduce Latency

By default, this SDK makes calls to a UID2 production environment server in the USA.

For information about how to choose the best URL for your use case, and a full list of valid base URLs, see [Environments](../getting-started/gs-environments.md).

To specify a UID2 server that is not the default, you can make config changes, as shown in the following examples:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>
 
```js
UID2Manager.init(
  context = this,
  serverUrl = "https://global.prod.uidapi.com"
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

You'll have one set of these values for your Integration environment, and a separate set for your production environment.

To configure the SDK, you must pass in the Subscription ID and public key that you received during account setup, as well as the user’s hashed or unhashed directly identifying information (<Link href="../ref-info/glossary-uid#gl-dii">DII</Link>) (email address or phone number), into the following method call:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().generateIdentity(
    identityRequest: IdentityRequest,
    subscriptionId: String,
    publicKey: String,
    onResult: (GenerateIdentityResult) -> Unit
)
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.generateIdentity(
    _ identity: IdentityType,
    subscriptionID: String,
    serverPublicKey: String,
    appName: String? = nil
)
```

</TabItem>
</Tabs>

Once it's configured, the UID2 mobile SDK does the following:

- Generates a UID2 identity, including token, for the user.
- Stores the token locally on the user’s device.
- Automatically refreshes the token as required while your app is open.

:::tip
You can pass the user’s <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> to the UID2 mobile SDK either hashed or unhashed. If you pass the DII unhashed, the SDK hashes it for you. If you want to pass the DII to the SDK already hashed, you must normalize it before hashing. For details, see [Normalization and Encoding](../getting-started/gs-normalization-encoding.md).
:::

### Format Examples for DII

The SDK encrypts the hashed DII before sending it to the UID2 service.

You can invoke the `generateIdentity` method using any of the four accepted formats for DII, for any specific user. The DII format might vary per user, but you can only send one value per user.

The following examples demonstrate the different ways that you can configure the UID2 mobile SDK and list the requirements for the DII passed into the SDK:

- Email, Unhashed
- Email, Normalized and Hashed
- Phone Number, Unhashed
- Phone Number, Normalized and Hashed

If the `generateIdentity` method is called multiple times, the UID2 mobile SDK uses the most recent configuration values.

<Tabs>
<TabItem value='example_email_unhashed' label='Email, Unhashed'>

The following example configures the UID2 mobile SDK with an email address.

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().generateIdentity(
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
struct InvalidEmailError: Error, LocalizedError {
    var errorDescription: String = "Invalid email address"
}
Task<Void, Never> {
    do {
        guard let normalizedEmail = IdentityType.NormalizedEmail(string: "test@example.com") else {
            throw InvalidEmailError() // email is invalid and cannot be normalized, handle error
        }
        try await UID2Manager.shared.generateIdentity(
            .email(normalizedEmail),
            subscriptionID: subscriptionID,
            serverPublicKey: serverPublicKeyString
        )
    } catch {
        // read `error` object for troubleshooting or enable logging to view it in logs
    }
}
```

</TabItem>
</Tabs>

In this scenario:

- No normalization or hashing is required by the publisher.
- The UID2 mobile SDK normalizes and hashes the email address before sending the encrypted hash to the UID2 service.

</TabItem>
<TabItem value='example_email_hash' label='Email, Normalized and Hashed'>

The following example configures the UID2 SDK with a hashed email address.

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().generateIdentity(
    IdentityRequest.EmailHash(
        "EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4="
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
Task<Void, Never> {
    do {
        try await UID2Manager.shared.generateIdentity(
            .emailHash("EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4="),
            subscriptionID: subscriptionID,
            serverPublicKey: serverPublicKeyString
        )
    } catch {
        // read `error` object for troubleshooting or enable logging to view it in logs
    }
}
```

</TabItem>
</Tabs>

In this scenario:

- The publisher is responsible for normalizing and hashing the email address. For details, see [Email Address Normalization](../getting-started/gs-normalization-encoding.md#email-address-normalization).
- The UID2 mobile SDK encrypts the hashed DII before sending it to the UID2 service.

</TabItem>
<TabItem value='example_phone_unhashed' label='Phone Number, Unhashed'>

The following example configures the UID2 mobile SDK with a phone number.

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().generateIdentity(
    IdentityRequest.Phone("+12345678901"),
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
struct InvalidPhoneError: Error, LocalizedError {
    var errorDescription: String = "Invalid phone number"
}
Task<Void, Never> {
    do {
        guard let normalizedPhone = IdentityType.NormalizedPhone(normalized: "+12345678901") else {
            throw InvalidPhoneError() // Phone number is not normalized according to ITU E.164.
        }
        try await UID2Manager.shared.generateIdentity(
            .phone(normalizedPhone),
            subscriptionID: subscriptionID,
            serverPublicKey: serverPublicKeyString
        )
    } catch {
        // read `error` object for troubleshooting or enable logging to view it in logs
    }
}
```

</TabItem>
</Tabs>

In this scenario:

- The publisher is responsible for normalizing the phone number. For details, see [Phone Number Normalization](../getting-started/gs-normalization-encoding.md#phone-number-normalization).
- The UID2 mobile SDK hashes the phone number before sending the encrypted hash to the UID2 service.

</TabItem>
<TabItem value='example_phone_hash' label='Phone Number, Normalized and Hashed'>

The following example configures the UID2 mobile SDK with a hashed and Base64-encoded phone number.

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().generateIdentity(
    IdentityRequest.PhoneHash(
        "EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4="
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
Task<Void, Never> {
    do {
        try await UID2Manager.shared.generateIdentity(
            .phoneHash("EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4="),
            subscriptionID: subscriptionID,
            serverPublicKey: serverPublicKeyString
        )
    } catch {
        // read `error` object for troubleshooting or enable logging to view it in logs
    }
}
```

</TabItem>
</Tabs>

In this scenario: 

- The publisher is responsible for normalizing and hashing the phone number. For details, see [Phone Number Hash Encoding](../getting-started/gs-normalization-encoding.md#phone-number-hash-encoding).
- The UID2 mobile SDK encrypts the hashed DII before sending it to the UID2 service.

</TabItem>
</Tabs>

## Token Storage and Refresh

After a call to the applicable method listed in [Format Examples for DII](#format-examples-for-dii) is successful, an identity is generated and stored in local file storage. The UID2 mobile SDK refreshes the UID2 token periodically.

:::warning
The format of the file stored in the local file storage, or the filename itself, could change without notice. We recommend that you do not read or update the file directly.
:::
 
## Pass Generated Token for Bidstream Use

In your mobile app, if the call to `generateIdentity` was successful, it returned an identity. The next step is to call the `getAdvertisingToken()` method, as follows:

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

If successful, this method call returns the token&#8212;a non-null string object such as the following: 

```js
AgAAAQFt3aNLXKXEyWS8Tpezcymk1Acv3n+ClOHLdAgqR0kt0Y+pQWSOVaW0tsKZI4FOv9K/rZH9+c4lpm2DBpmFJqjdF6FAaAzva5vxDIX/67UOspsYtiwxH73zU7Fj8PhVf1JcpsxUHRHzuk3vHF+ODrM13A8NAVlO1p0Wkb+cccIIhQ==
```

You can use this token to pass downstream for sending in the RTB bidstream.

If the `getAdvertisingToken()` method call returns `null`, there was no identity or valid token generated.

Some possible reasons for this, and some things you could do to troubleshoot, are as follows:

- The identity is invalid. In this scenario there are a couple of options:
  - Check to see whether there are any errors from the previous `generateIdentity` call.
  - Check the status of the identity, using one of the following:
    - **Android Java**: `UID2Manager.getInstance().getCurrentIdentityStatus()`
    - **Android Kotlin**: `UID2Manager.getInstance().currentIdentityStatus()`
    - **iOS**: `UID2Manager.shared.identityStatus`

    It's possible that the DII has been opted out of UID2: for details, see [When to Pass DII into the SDK](#when-to-pass-dii-into-the-sdk).
- You could enable logging to get more information: see [Enable Logging](#enable-logging).
- The advertising token inside the UID2 identity has expired, and the refresh token has also expired, so the SDK cannot refresh the token.

If there is no identity, you'll need to call the `generateIdentity` method again: see [Configure the UID2 Mobile SDK](#configure-the-uid2-mobile-sdk).

For more information, see [When to Pass DII into the SDK](#when-to-pass-dii-into-the-sdk) (next section).

## When to Pass DII into the SDK

The first time a new user opens the app, no UID2 identity exists. You'll need to call the `generateIdentity` method, with the DII, to start the token generation:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().generateIdentity(
    identityRequest: IdentityRequest,
    subscriptionId: String,
    publicKey: String,
    onResult: (GenerateIdentityResult) -> Unit
)
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.generateIdentity(
    _ identity: IdentityType,
    subscriptionID: String,
    serverPublicKey: String,
    appName: String? = nil
)
```

</TabItem>
</Tabs>

When this method call completes successfully, the advertising token (UID2 token) is available for you to send to the bidstream.

If the UID2 identity stored in local file storage has expired and cannot be refreshed, you must call the `generateIdentity` method again to generate a new identity and get the resulting UID2 token. The only exception is when the response to the following Android method/iOS object indicates that the DII was opted out of UID2:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

**Android Java**:

```java
UID2Manager.getInstance().getCurrentIdentityStatus()
```

**Android Kotlin**:

```kotlin
UID2Manager.getInstance().currentIdentityStatus()
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.identityStatus
```

</TabItem>
</Tabs>

A response status of `OPT_OUT` for Android, or `optOut` for iOS, indicates that the DII has been opted out of UID2 and no identity/token should be generated for it. You might want to avoid making repeated `generateIdentity` calls: if the DII has a status of opted out, the UID2 token is not generated.

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

If `getAdvertisingToken()` returns null, and the identity status is not `OPT_OUT`/`optOut`, you'll need to generate a new token. To do this, pass the DII into the `generateIdentity` method again. For details, see [Configure the UID2 mobile SDK](#configure-the-uid2-mobile-sdk).

<!--## Opt-Out Handling

If the DII provided to the `generateIdentity` method has been opted out of UID2, this method returns `null`. To check the status of the UID2 identity, you can call the following:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().getCurrentIdentityStatus()
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.identityStatus
```

</TabItem>
</Tabs>

If the response status indicates that the DII has been opted out of UID2, you might want to avoid making repeated calls to check the status of the UID2 identity: if the DII has a status of opted out, the UID2 token is not generated.

-->

## Enable Logging

<EnableLogging />

## Optional: UID2 GMA/IMA Plugin for GAM Secure Signal integration

<GMAIMA_Plugins />

## Optional: UID2 Prebid Mobile SDK Integration
:::important
The UID2 Prebid Modile SDK integration is for Android only, and requires version 1.4.0 of the UID2 SDK for Android.
:::

<PrebidMobileSDK />
