[UID2 Overview](../../../README.md) > [Getting Started](../../README.md) > [v2](../summary-doc-v2.md) > Frequently Asked Questions

# Frequently Asked Questions

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
- [FAQs for Advertisers and Data Providers](#faqs-for-advertisers-and-data-providers)
   - [How do I know when to refresh the UID2 due to salt bucket rotation?](#how-do-i-know-when-to-refresh-the-uid2-due-to-salt-bucket-rotation)
   - [Do refreshed emails get assigned to the same bucket with which they were previously associated?](#do-refreshed-emails-get-assigned-to-the-same-bucket-with-which-they-were-previously-associated)
   - [How often should UIDs be refreshed for incremental updates?](#how-often-should-uids-be-refreshed-for-incremental-updates)
   - [How should I generate the SHA256 of PII for mapping?](#how-should-i-generate-the-sha256-of-pii-for-mapping)
   - [Should I store large volumes of email address, phone number, or their hash mappings? ](#should-i-store-large-volumes-of-email-address-phone-number-or-their-hash-mappings)
   - [How should I handle user optouts?](#how-should-i-handle-user-optouts)
- [FAQs for Demand-Side Platforms (DSPs)](#faqs-for-demand-side-platforms-dsps)
   - [How do I know which decryption key to apply to a UID2?](#how-do-i-know-which-decryption-key-to-apply-to-a-uid2)
   - [Where do I get the decryption keys?](#where-do-i-get-the-decryption-keys)
   - [How do I know if/when the salt bucket has rotated?](#how-do-i-know-ifwhen-the-salt-bucket-has-rotated)
   - [Should the DSP be concerned with latency?](#should-the-dsp-be-concerned-with-latency)
   - [How should the DSP maintain proper frequency capping with UID2?](#how-should-the-dsp-maintain-proper-frequency-capping-with-uid2)
   - [Will all user opt-out traffic be sent to the DSP?](#will-all-user-opt-out-traffic-be-sent-to-the-dsp)
   - [Is the DSP expected to handle opt-out signals only for the UID2s that they already store?](#is-the-dsp-expected-to-handle-opt-out-signals-only-for-the-uid2s-that-they-already-store)
   - [How long should the DSP keep the opt-out list?](#how-long-should-the-dsp-keep-the-opt-out-list)
   - [Is the UID of an opted-out user sent to the opt-out endpoint in an encrypted form?](#is-the-uid-of-an-opted-out-user-sent-to-the-opt-out-endpoint-in-an-encrypted-form)
   - [What request type do opt-outs use?](#what-request-type-do-opt-outs-use)
   - [How strict are the requirements for honoring opt-outs?](#how-strict-are-the-requirements-for-honoring-opt-outs)
   - [How many decryption keys may be present in memory at any point?](#how-many-decryption-keys-may-be-present-in-memory-at-any-point)
   - [How do SDK errors impact the DSP's ability to respond to a bid?](#how-do-sdk-errors-impact-the-dsps-ability-to-respond-to-a-bid)

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

## FAQs for Advertisers and Data Providers
Here are some frequently asked questions for advertisers and data providers using the UID2 framework.

### How do I know when to refresh the UID2 due to salt bucket rotation?
<!-- FAQ_19 ADP -->
Metadata supplied with the UID2 generation request indicates the salt bucket used for generating the UID2. Salt buckets persist and correspond to the underlying PII used to generate a UID2. Use the  [POST /identity/buckets](../endpoints/post-identity-buckets.md) endpoint to return which salt buckets rotated since a given timestamp. The returned rotated salt buckets inform you which UID2s to refresh.

### Do refreshed emails get assigned to the same bucket with which they were previously associated?
<!-- FAQ_20 ADP -->
Not necessarily. After you remap emails associated with a particular bucket ID, the emails might be assigned to a different bucket ID. To check the bucket ID, [call the mapping function](../guides/advertiser-dataprovider-guide.md#retrieve-a-uid2-for-pii-using-the-identity-map-endpoints) and save the returned UID2 and bucket ID again.

>IMPORTANT: When mapping and remapping emails, be sure not to make any assumptions of the number of buckets, their specific rotation dates, or to which bucket an email gets assigned. 

### How often should UIDs be refreshed for incremental updates?
<!-- FAQ_21 ADP -->
The recommended cadence for updating audiences is daily. 

Even though each salt bucket is updated roughly once a year, individual bucket updates are spread over the year. This means that about 1/365th of all buckets is rotated daily. If fidelity is critical, consider calling the [POST /identity/buckets](../endpoints/post-identity-buckets.md) endpoint more frequently, for example, hourly.

### How should I generate the SHA256 of PII for mapping?
<!-- FAQ_22 ADP -->
The system should follow the [email normalization rules](../../README.md#email-address-normalization) and hash without salting.

### Should I store large volumes of email address, phone number, or their hash mappings? 
<!-- FAQ_23 ADP -->
Yes. Not storing mappings may increase processing time drastically when you have to map millions of email addresses or phone numbers. Recalculating only those mappings that actually need to be updated, however, reduces the total processing time because only about 1/365th of UID2s need to be updated daily.

>IMPORTANT: Unless you are using a private operator, you must map email addresses, phone numbers, or hashes consecutively, using a single HTTP connection, in batches of 5,000 emails at a time. In other words, do your mapping without creating multiple parallel connections. 

### How should I handle user optouts?
<!-- FAQ_24 ADP -->
When a user opts out of UID2-based targeted advertising through the [Transparency and Control Portal](https://www.transparentadvertising.org/), the optout signal is sent to DSPs and publishers, which handle optouts at bid time. As an advertiser or data provider, you do not need to check for UID2 optout in this scenario.

If a user opts out through your website, you should follow your internal procedures for handling the optout, for example, you might choose not to generate a UID2 for that user.

## FAQs for Demand-Side Platforms (DSPs)
Here are some frequently asked questions for DSPs.

### How do I know which decryption key to apply to a UID2?
<!-- FAQ_25 DSP -->
The provided [Server-Side SDK Guide](../sdks/dsp-client-v1-overview.md) updates decryption keys automatically. Metadata supplied with the UID2 token discloses the IDs of the decryption keys to use. 

### Where do I get the decryption keys?
<!-- FAQ_26 DSP -->
You can use the [Server-Side SDK Guide](../sdks/dsp-client-v1-overview.md) library to communicate with the UID2 service and fetch the latest keys. To make sure that the keys remain up-to-date, it is recommended to fetch them periodically, for example, once every hour. 

### How do I know if/when the salt bucket has rotated?
<!-- FAQ_27 DSP -->
The DSP is not privy to when the UID2 salt bucket rotates. This is similar to a DSP being unaware if users cleared their cookies. Salt bucket rotation has no significant impact on the DSP.  

### Should the DSP be concerned with latency?
<!-- FAQ_28 DSP -->
The UID2 service does not introduce latency into the bidding process. Any latency experienced can be attributed to the network, not the UID2 service.

### How should the DSP maintain proper frequency capping with UID2?
<!-- FAQ_29 DSP -->
The UID2 has the same chance as a cookie of becoming stale. Hence, the DSP can adapt the same infrastructure currently used for cookie or deviceID-based frequency capping for UID2. For details, see this [FAQ](../guides/advertiser-dataprovider-guide.md#how-do-i-know-when-to-refresh-the-uid2-due-to-salt-bucket-rotation) on salt bucket rotation. 

### Will all user opt-out traffic be sent to the DSP?
<!-- FAQ_30 DSP -->
Yes, all opt-outs from the UID2 [Transparency and Control Portal](https://transparentadvertising.org/) hit the opt-out endpoint, which the DSP must configure to [honor user opt-outs](#honor-user-opt-outs).

### Is the DSP expected to handle opt-out signals only for the UID2s that they already store?
<!-- FAQ_31 DSP -->
In some cases a DSP may receive a UID2 token for a newly-stored UID2 where the token is generated before the opt-out timestamp. The DSP is not allowed to bid on such tokens. It is therefore recommended to store all opt-out signals regardless of whether the corresponding UID2 is currently stored by the DSP or not. For details, see the diagram in [Bidding Opt-Out Logic](../guides/dsp-guide.md#bidding-opt-out-logic).

### How long should the DSP keep the opt-out list?
<!-- FAQ_32 DSP -->
At least for 30 days.

### Is the UID of an opted-out user sent to the opt-out endpoint in an encrypted form?
<!-- FAQ_33 DSP -->
No. It is sent as an unencrypted (raw) UID2.

### What request type do opt-outs use? 
<!-- FAQ_34 DSP -->
Typically GET requests, but different DSPs may use different types.

### How strict are the requirements for honoring opt-outs? 
<!-- FAQ_35 DSP -->
Opt-outs must be always respected. It may take some time for an opt-out request to propagate through the system during which time it is expected that some bids may not honor the opt-out.

### How many decryption keys may be present in memory at any point?
<!-- FAQ_36 DSP -->
There may be thousands of decryption keys present in the system at any given point.

### How do SDK errors impact the DSP's ability to respond to a bid?
<!-- FAQ_37 DSP-client-v1 -->
If there is an error, the SDK will not decrypt the UID2 token into a UID2.
