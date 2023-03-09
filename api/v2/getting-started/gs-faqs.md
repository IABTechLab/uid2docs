[UID2 Overview](../../../README.md) > [Getting Started](../../README.md) > [v2](../summary-doc-v2.md) > Frequently Asked Questions

# Frequently Asked Questions
<!-- Note I have two sets of similar FAQs, for SDK vs non-SDK. For now until I can study, and organize them better, I've varied the naming so the anchors work correctly. GWH 3/9/23 -->
Frequently asked questions for UID2 are broken into the following categories:

- [FAQs -- General](#faqs----general)
   - [Will all integration partners in the EUID infrastructure (SSPs, third-party data providers, measurement providers) be automatically integrated with UID2?](#will-all-integration-partners-in-the-euid-infrastructure-ssps-third-party-data-providers-measurement-providers-be-automatically-integrated-with-uid2)
   - [Can users opt out of targeted advertising tied to their UID2 identity?](#can-users-opt-out-of-targeted-advertising-tied-to-their-uid2-identity)
   - [How does a user know where to access the opt-out portal?](#how-does-a-user-know-where-to-access-the-opt-out-portal)
   - [Why do advertisers and third-party data providers not need to integrate with the opt-out feed?](#why-do-advertisers-and-third-party-data-providers-not-need-to-integrate-with-the-opt-out-feed)
- [FAQs for Publishers Using an SDK](#faqs-for-publishers-using-an-sdk)
   - [How will I be notified of user opt-out?](#how-will-i-be-notified-of-user-opt-out-with-sdk)
   - [Where should I make token generation calls -- from the server or client side?](#where-should-i-make-token-generation-calls----from-the-server-or-client-side-with-sdk)
   - [Can I make token refresh calls from the client side?](#can-i-make-token-refresh-calls-from-the-client-side-with-sdk)
   - [How can I test that the PII sent and the returned token match up?](#how-can-i-test-that-the-pii-sent-and-the-returned-token-match-up-with-sdk)
   - [How can I test the refresh token logout workflow?](#how-can-i-test-the-refresh-token-logout-workflow-with-sdk)
   - [Should /token/generate return the “optout” status and generate no tokens if I pass optout@email.com in the request payload?](#should-tokengenerate-return-the-optout-status-and-generate-no-tokens-if-i-pass-optoutemailcom-in-the-request-payload-with-sdk)
- [FAQs for Publishers Not Using an SDK](#faqs-for-publishers-not-using-an-sdk)
   - [Do I need to decrypt tokens?](#do-i-need-to-decrypt-tokens)
   - [How will I be notified of user opt-out?](#how-will-i-be-notified-of-user-opt-out-without-sdk)
   - [Where should I make token generation calls -- from the server or client side?](#where-should-i-make-token-generation-calls----from-the-server-or-client-side-without-sdk)
   - [Can I make token refresh calls from the client side?](#can-i-make-token-refresh-calls-from-the-client-side-without-sdk)
   - [What is the uniqueness and rotation policy for UID2 tokens?](#what-is-the-uniqueness-and-rotation-policy-for-uid2-tokens)
   - [How can I test that the PII sent and the returned token match up?](#how-can-i-test-that-the-pii-sent-and-the-returned-token-match-up-without-sdk)
   - [How can I test the refresh token logout workflow?](#how-can-i-test-the-refresh-token-logout-workflow-without-sdk)
   - [Should /token/generate return the “optout” status and generate no tokens if I pass optout@email.com in the request payload?](#should-tokengenerate-return-the-optout-status-and-generate-no-tokens-if-i-pass-optoutemailcom-in-the-request-payload-without-sdk)

## FAQs -- General

Here are some frequently asked questions regarding the UID2 framework.

### Will all integration partners in the EUID infrastructure (SSPs, third-party data providers, measurement providers) be automatically integrated with UID2?
<!-- FAQ_01 -->
No. UID2 functions as its own framework, which is separate from EUID. As such, paperwork relating to accessing and using the EUID framework does not automatically grant usage and access to the UID2 framework. New contracts are required to be signed for UID2.

### Can users opt out of targeted advertising tied to their UID2 identity?
<!-- FAQ_02 -->
Yes. Through the [Transparency and Control Portal](https://transparentadvertising.org), users can opt out from being served targeted ads tied to their UID2 identity. Each request is distributed through the UID2 Opt-Out Service and UID2 Operators to all relevant participants. 

Some publishers and service providers have the option to limit access to their products based on a user’s participation in the UID2 framework, and it is the publisher’s responsibility to communicate this as part of the value exchange dialog with the user.

### How does a user know where to access the opt-out portal?
<!-- FAQ_03 -->
Publishers, SSO providers, or consent management platforms disclose links to the [Transparency and Control Portal](https://transparentadvertising.org) in their login flows, consent flows, and privacy policies, and by other means.

### Why do advertisers and third-party data providers not need to integrate with the opt-out feed?
<!-- FAQ_04 -->
Opt-outs relate to opting out of targeted advertising, which is handled through the publisher and DSP opt-out [workflows](../../../README.md#workflows). To disengage from a specific advertiser, a consumer must contact the advertiser directly.

## FAQs for Publishers Using an SDK

Here are some frequently asked questions for publishers using the UID2 framework, when a client-side SDK is in use.

### How will I be notified of user opt-out? (With SDK)
<!-- FAQ_05 -->
The [Client-Side JavaScript SDK (v2)](../sdks/client-side-identity.md) background token auto-refresh process handles user opt-outs. If user opts out, when the SDK attempts token refresh, it learns about the optout, clears the session (including the cookie), and invokes the callback with the `OPTOUT` status.

### Where should I make token generation calls -- from the server or client side? (With SDK)
<!-- FAQ_06 -->
UID2 tokens must be generated only on the server side after authentication. In other words, to ensure that the API key used to access the service remains secret, the [POST /token/generate](../endpoints/post-token-generate.md) endpoint must be called only from the server side.

### Can I make token refresh calls from the client side? (With SDK)
<!-- FAQ_07 -->
Yes. The [POST /token/refresh](../endpoints/post-token-refresh.md) can be called from the client side (for example, a browser or a mobile app) because it does not require using an API key.

### How can I test that the PII sent and the returned token match up? (With SDK)
<!-- FAQ_08 -->
You can use the [POST /token/validate](../endpoints/post-token-validate.md) endpoint to check whether the personal data you are sending through [POST /token/generate](../endpoints/post-token-generate.md) is valid. 

1. Depending on whether the the personal data is an email address or a phone number, send a [POST /token/generate](../endpoints/post-token-generate.md) request using one of the following values:
    - The `validate@email.com` as the `email` value.
    - The hash of `validate@email.com` as the `email_hash` value. 
    - The `+12345678901` as the `phone` value.
    - The hash of `+12345678901` as the `phone_hash` value.
2. Store the returned `advertising_token` for use in the following step.
3. Send a [POST /token/validate](../endpoints/post-token-validate.md) request using the `email`, `email_hash`, `phone`, or `phone_hash` value that you sent in step 1 and the `advertising_token` (saved in step 2) as the `token` property value. 
    - If the response returns `true`, it indicates that the the personal data you sent as a request in step 1 matches the token you received in the response of step 1. 
    - If it returns `false`, it indicates that there may be an issue with the way you are sending email addresses, phone numbers, or their respective hashes.

### How can I test the refresh token logout workflow? (With SDK)
<!-- FAQ_09 -->
You can use the `optout@email.com` email address or the `+00000000000` phone number to test your token refresh workflow. Using either parameter value in a request always generates an identity response with a `refresh_token` that results in a logout response.

1. Depending on whether the the personal data is an email address or a phone number, send a [POST /token/generate](../endpoints/post-token-generate.md) request using one of the following values:
    - The `optout@email.com` as the `email` value.
    - The hash of `optout@email.com` as the `email_hash` value. 
    - The `+00000000000` as the `phone` value.
    - The hash of `+00000000000` as the `phone_hash` value.
2. Wait until the SDK's [background auto-refresh](../sdks/client-side-identity.md#background-token-auto-refresh) attempts to refresh the advertising token (this can take several hours) and observe the refresh attempt fail with the `OPTOUT` status. At this point the SDK also clears the first-party cookie.

### Should /token/generate return the “optout” status and generate no tokens if I pass optout@email.com in the request payload?  (With SDK)
<!-- FAQ_10 -->
The [POST /token/generate](../endpoints/post-token-generate.md) endpoint does not check for opt-out records and returns the `success` status with valid advertising and user tokens in response to valid requests.

>IMPORTANT: Be sure to call this endpoint only when you have obtained legal basis to convert the user's the personal data to UID2 tokens. [POST /token/generate](../endpoints/post-token-generate.md) calls automatically opt in users associated with the provided PII to UID2-based targeted advertising. 

To check for opt-out requests, use the [POST /token/refresh](../endpoints/post-token-refresh.md) endpoint.

## FAQs for Publishers Not Using an SDK
Here are some frequently asked questions for publishers using the UID2 framework, when the publisher is not using a client-side SDK.

### Do I need to decrypt tokens?
<!-- FAQ_11 -->
No, publishers do not need to decrypt tokens.

### How will I be notified of user opt-out? (Without SDK)
<!-- FAQ_12 -->
The token refresh process handles user opt-outs. The [POST /token/refresh](../endpoints/post-token-refresh.md) returns empty identity and the optout status for the user. To resume using UID2-based targeted advertising, the user needs to log in again to re-establish the UID2 identity.

### Where should I make token generation calls -- from the server or client side? (Without SDK)
<!-- FAQ_13 -->
UID2 tokens must be generated only on the server side after authentication. In other words, to ensure that the API key used to access the service remains secret, the [POST /token/generate](../endpoints/post-token-generate.md) endpoint must be called only from the server side.

### Can I make token refresh calls from the client side? (Without SDK)
<!-- FAQ_14 -->
Yes. The [POST /token/refresh](../endpoints/post-token-refresh.md) can be called from the client side (for example, a browser or a mobile app) because it does not require using an API key.

### What is the uniqueness and rotation policy for UID2 tokens?
<!-- FAQ_15 -->
The UID2 service encrypts tokens using random initialization vectors. The encrypted UID2 is unique for a given user as they browse the internet. At every refresh, the token re-encrypts. This mechanism ensures that untrusted parties cannot track a user's identity.

### How can I test that the PII sent and the returned token match up? (Without SDK)
<!-- FAQ_16 -->
You can use the [POST /token/validate](../endpoints/post-token-validate.md) endpoint to check whether the PII you are sending through [POST /token/generate](../endpoints/post-token-generate.md) is valid. 

1. Depending on whether the PII is an email address or a phone number, send a [POST /token/generate](../endpoints/post-token-generate.md) request using one of the following values:
    - The `validate@email.com` as the `email` value.
    - The hash of `validate@email.com` as the `email_hash` value. 
    - The `+12345678901` as the `phone` value.
    - The hash of `+12345678901` as the `phone_hash` value.
2. Store the returned `advertising_token` for use in the following step.
3. Send a [POST /token/validate](../endpoints/post-token-validate.md) request using the `email`, `email_hash`, `phone`, or `phone_hash` value that you sent in step 1 and the `advertising_token` (saved in step 2) as the `token` property value. 
    - If the response returns `true`, the PII that you sent as a request in step 1 match the token you received in the response of step 1. 
    - If it returns `false`, there may be an issue with the way you are sending email addresses, phone numbers, or their respective hashes.

### How can I test the refresh token logout workflow? (Without SDK)
<!-- FAQ_17 -->
You can use the `optout@email.com` email address or the `+00000000000` phone number to test your token refresh workflow. Using the email address or phone number in request always generates an identity response with a `refresh_token` that results in a logout response.

1. Depending on whether the PII is an email address or a phone number, send a [POST /token/generate](../endpoints/post-token-generate.md) request using one of the following values:
    - The `optout@email.com` as the `email` value.
    - The hash of `optout@email.com` as the `email_hash` value. 
    - The `+00000000000` as the `phone` value.
    - The hash of `+00000000000` as the `phone_hash` value.
2. Store the returned `refresh_token` for use in the following step.
3. Send a [POST /token/refresh](../endpoints/post-token-refresh.md) request with the `refresh_token` (saved in step 2) as the `token` value.<br/>The body response should be empty, and the `status` value should be set to `optout` because the `optout@email.com` email and the `+00000000000` phone number always result in a logged out user.

### Should /token/generate return the “optout” status and generate no tokens if I pass optout@email.com in the request payload?  (Without SDK)
<!-- FAQ_18 -->
The [POST /token/generate](../endpoints/post-token-generate.md) endpoint does not check for opt-out records and returns the `success` status with valid advertising and user tokens in response to valid requests.

>IMPORTANT:Be sure to call this endpoint only when you have obtained legal basis to convert the user's PII to UID2 tokens. [POST /token/generate](../endpoints/post-token-generate.md) calls automatically opt in users associated with the provided PII to UID2-based targeted advertising. 
 
To check for opt-out requests, use the [POST /token/refresh](../endpoints/post-token-refresh.md) endpoint.
