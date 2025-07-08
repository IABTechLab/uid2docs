---
title: Publisher Integration with SSO Providers
sidebar_label: Publisher SSO Integration
description: UID2 と組み合わせてシングルサインオン (SSO) プロバイダーを使用するためのパブリッシャー向け情報。
hide_table_of_contents: false
sidebar_position: 06
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Publisher Integration with SSO Providers

SSO ログインを提供するために 1 つ以上の <a href="glossary-uid#gl-sso">SSO</a> プロバイダーとインテグレーションしている場合、SSO プロバイダーからログインユーザーのメールアドレスを取得して UID2 Token を生成できるかもしれません。

このガイドでは、いくつかの一般的な SSO プロバイダーとのパブリッシャー インテグレーションについて、技術情報を提供します。

:::important
UID2 の作成に使用するメールアドレスが、UID2 契約、会社のプライバシーポリシー、および会社が適用されるその他のプラットフォームまたはサードパーティの条件に一貫していることを確認する責任があります。
:::

<!-- content_note_last_line_from_GM_20250108 -->

## High-Level Steps

シングルサインオン ソリューションとインテグレーションする一般的な手順は次のとおりです:

1. SSO プロバイダーからユーザーのアイデンティティ トークンを取得します。

2. アイデンティティ トークンからユーザーのメールアドレスを抽出します。

3. ユーザーのメールアドレスを選択した [UID2 publisher integration](../guides/summary-guides.md#publisher-integrations) に渡します。

:::note
メールアドレスに [正規化とエンコード](../getting-started/gs-normalization-encoding.md) を適用する必要があるか、またはインテグレーションで自動的に適用されるかを確認するには、UID2 publisher integration のドキュメントを参照してください。
:::

## Sign In with Google

[Sign in with Google](https://support.google.com/accounts/answer/12849458?hl=ja) を実装するための次のオプションが利用可能です:

- [Sign in with Google for Android](#sign-in-with-google-for-android)
- [Sign in with Google for iOS and macOS](#sign-in-with-google-for-ios-and-macos)
- [Sign in with Google for Web](#sign-in-with-google-for-web)

### Sign In with Google for Android

[Create the Sign in with Google flow](https://developer.android.com/identity/sign-in/credential-manager-siwg#create-sign) の手順に従います。トークンが検証された後、アイデンティティ トークンのペイロードの [getEmail() メソッド](https://cloud.google.com/java/docs/reference/google-api-client/latest/com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload#com_google_api_client_googleapis_auth_oauth2_GoogleIdToken_Payload_getEmail__) を使用してメールアドレスを取得できます。

### Sign In with Google for iOS and macOS

iOS または macOS で [Sign in with Google](https://developers.google.com/identity/sign-in/ios/start-integrating) からメールアドレスを取得するには、`GIDGoogleUser` オブジェクトから取得します。詳細は、[プロファイル情報の取得](https://developers.google.com/identity/sign-in/ios/people)を参照してください。

### Sign In with Google for Web

[verify the Google ID token on your server side](https://developers.google.com/identity/gsi/web/guides/verify-google-id-token) の手順に従い、ID トークンの `email` フィールドからユーザーのメールアドレスを取得します。

## Facebook Login

UID2 と Facebook Login を組み合わせる方法は、OpenID Connect (OIDC) トークンを使用するか、使用しないかの 2 つの方法があります。

### Facebook Login Using an OIDC Token on iOS

iOS で [Facebook Login](https://developers.facebook.com/docs/facebook-login/) から¥[OIDC token](https://developers.facebook.com/docs/facebook-login/guides/access-tokens/get-oidc/) を使用してメールアドレスを取得するには:

1. Facebook Login を実装し (詳細は、[Use Facebook Login in Your iOS App](https://developers.facebook.com/docs/ios/use-facebook-login) を参照)、`email` パーミッションをリクエストします。

1. OIDC token からユーザーのメールアドレスを抽出します。たとえば、`Profile` ヘルパー クラスを使用して抽出します。詳細は、[OIDC Tokens in Facebook Login for iOS](https://developers.facebook.com/docs/facebook-login/guides/access-tokens/get-oidc) を参照してください。

### Facebook Login Without an OIDC Token

OICD token を使用せずに [Facebook Login](https://developers.facebook.com/docs/facebook-login/) からメールアドレスを取得するには:

1. `email` パーミッションを指定して、[user access token](https://developers.facebook.com/docs/facebook-login/guides/access-tokens#usertokens) をリクエストします。

1. ユーザーが `email` パーミッションを許可した場合、ユーザーアクセストークンを使用して、`email` をフィールドとして指定して、[`/me` endpoint](https://developers.facebook.com/docs/graph-api/overview#me) に対して Graph API コールを行います。

### Sample Applications

以下のアプリケーションは、Facebook Login とのインテグレーション方法を示しています:

- [Facebook Login sample application for Android](https://github.com/facebook/facebook-android-sdk/tree/main/samples/FBLoginSample)

- [Facebook Login sample application for iOS](https://github.com/facebook/facebook-ios-sdk/tree/main/samples/FacebookLoginSample)

## Sign In with Apple

Apple ID でサインインする方法は、アプリとウェブサイトで異なります。

### Sign In with Apple in an App

`email` スコープをリクエストして認証をリクエストします。詳細は、[Request Authorization with Apple ID](https://developer.apple.com/documentation/sign_in_with_apple/implementing_user_authentication_with_sign_in_with_apple#3546458) を参照してください。

承認に成功した場合、`ASAuthorizationAppleIDCredential` オブジェクトの `email` プロパティからユーザーのメールアドレスを取得します。

### Sign In with Apple JS on a Webpage

[Configure your webpage for Sign in with Apple](https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_js/configuring_your_webpage_for_sign_in_with_apple) ページの [Handle the Authorization Response](https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_js/configuring_your_webpage_for_sign_in_with_apple#3331292) を参照してください。

## Sign In with OpenPass

[OpenPass](https://openpass.thetradedesk.com/en) インテグレーションからメールアドレスを取得するには:


1. [OpenPass API](https://partner.thetradedesk.com/v3/portal/openpass/doc/OpenPassQuickstartsServerSide) または [OpenPass SDKs](https://partner.thetradedesk.com/v3/portal/openpass/doc/OpenPassSDKs) のいずれかを使用して、アイデンティティ トークンを取得します。

1. アイデンティティ トークンの `email` クレームからユーザーのメールアドレスを抽出します。詳細は、[OpenPass Authentication Tokens](https://partner.thetradedesk.com/v3/portal/openpass/doc/OpenPassTokensAuth) を参照してください。