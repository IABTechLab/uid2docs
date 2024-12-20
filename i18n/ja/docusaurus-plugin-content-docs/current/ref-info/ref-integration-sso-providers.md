---
title: Publisher Integration with SSO Providers
description: Information for publishers for using single sign-on (SSO) providers with UID2.
hide_table_of_contents: false
sidebar_position: 06
---

import Link from '@docusaurus/Link';

# Publisher Integration with SSO Providers

This guide provides information for publishers who use popular single sign-on (SSO) providers and want to integrate with UID2.

## High-Level Steps

To integrate with a single sign-on solution, the general steps are as follows:

1. Get an identity token from the SSO provider.

2. Extract the user's email address from the identity token.

3. Pass the user's email address to the [UID2 publisher integration](../guides/summary-guides.md#publisher-integrations) of your choice.

:::note
To find out whether you have to apply [normalization and encoding](../getting-started/gs-normalization-encoding.md) to the email address, or the integration does it for you, check the documentation for your UID2 publisher integration.
:::

## Sign In with Google

The following options are available for sign-in with Google:

- [SO with Google for Android](#sso-with-google-for-android)
- [SSO with Google for iOS and macOS](#sso-with-google-for-ios-and-macos)
- [SSO with Google for Web](#sso-with-google-for-web)

### SSO with Google for Android

Follow the instructions in [Create the Sign in with Google flow](https://developer.android.com/identity/sign-in/credential-manager-siwg#create-sign). Once the token has been validated, you can retrieve the email address by using the [getEmail() method](https://cloud.google.com/java/docs/reference/google-api-client/latest/com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload#com_google_api_client_googleapis_auth_oauth2_GoogleIdToken_Payload_getEmail__) of the identity token payload.

### SSO with Google for iOS and macOS

To get an email address from [Sign in with Google](https://developers.google.com/identity/sign-in/ios/start-integrating) on iOS or macOS, retrieve it from the `GIDGoogleUser` object. For details, see [Getting profile information](https://developers.google.com/identity/sign-in/ios/people).

### SSO with Google for Web

Follow the instructions to [verify the Google ID token on your server side](https://developers.google.com/identity/gsi/web/guides/verify-google-id-token), and then retrieve the user's email address from the email field of the ID token.

## Facebook Login

There are two ways to integrate Facebook Login with UID2: with an OpenID Connect (OIDC) token or without.

### Facebook SSO Using an OIDC Token on iOS

To get an email address from [Facebook Login](https://developers.facebook.com/docs/facebook-login/) using an [OIDC token](https://developers.facebook.com/docs/facebook-login/guides/access-tokens/get-oidc/) on iOS:

1. Implement Facebook Login (for details, see [Use Facebook Login in Your iOS App](https://developers.facebook.com/docs/ios/use-facebook-login)) and request the email permission.

1. Extract the user's email address from the OIDC authentication token: for example, by using the Profile helper class. For details, see [OIDC Tokens in Facebook Login for iOS](https://developers.facebook.com/docs/facebook-login/guides/access-tokens/get-oidc).

### Facebook SSO Without an OIDC Token

To get an email address from [Facebook Login](https://developers.facebook.com/docs/facebook-login/) without using an OIDC token:

1. Request a [user access token](https://developers.facebook.com/docs/facebook-login/guides/access-tokens#usertokens), specifying the `email` permission.

1. If the user has granted the `email` permission, make a Graph API call to the [/me endpoint](https://developers.facebook.com/docs/graph-api/overview#me), using the user access token, and specify `email` as one of the fields.

### Sample Applications

The following applications are available as examples to help you code your Facebook SSO integration for mobile apps:

- [Facebook Login sample application for Android](https://github.com/facebook/facebook-android-sdk/tree/main/samples/FBLoginSample)

- [Facebook Login sample application for iOS](https://github.com/facebook/facebook-ios-sdk/tree/main/samples/FacebookLoginSample)

## Sign In with Apple

The instructions for signing in with Apple are different for apps and websites.

### Sign In with Apple in a Mobile App

Request authorization, making sure to request the `email` scope. For details, see [Request Authorization with Apple ID](https://developer.apple.com/documentation/sign_in_with_apple/implementing_user_authentication_with_sign_in_with_apple#3546458).

If authentication succeeds, retrieve the user's email address from the `email` property of the `ASAuthorizationAppleIDCredential` object.

### Sign In with Apple JS on a Webpage

Refer to the section [Handle the Authorization Response](https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_js/configuring_your_webpage_for_sign_in_with_apple#3331292) of the page [Configure your webpage for Sign in with Apple](https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_js/configuring_your_webpage_for_sign_in_with_apple).

## Sign In with OpenPass

To get an email address from an [OpenPass](https://openpass.thetradedesk.com/en) integration:

1. Use the [OpenPass API](https://partner.thetradedesk.com/v3/portal/openpass/doc/OpenPassQuickstartsServerSide) or one of the [OpenPass SDKs](https://partner.thetradedesk.com/v3/portal/openpass/doc/OpenPassSDKs) to get an identity token.

1. Extract the user's email address from the `email` claim of the identity token. For details, see [OpenPass Authentication Tokens](https://partner.thetradedesk.com/v3/portal/openpass/doc/OpenPassTokensAuth).
