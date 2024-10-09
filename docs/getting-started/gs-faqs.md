---
title: FAQs
description: Common questions about implementing UID2.
hide_table_of_contents: false
sidebar_position: 20
---

import Link from '@docusaurus/Link';
import ExampleUid2InBidstream from '/docs/snippets/_example-uid2-in-bidstream.mdx';

# Frequently Asked Questions

Frequently asked questions for UID2 are grouped into general categories by audience.

## FAQs&#8212;General

Here are some frequently asked questions regarding the UID2 framework.

- [Will all integration partners in the EUID infrastructure (SSPs, third-party data providers, measurement providers) be automatically integrated with UID2?](#will-all-integration-partners-in-the-euid-infrastructure-ssps-third-party-data-providers-measurement-providers-be-automatically-integrated-with-uid2)
- [Can users opt out of targeted advertising tied to their UID2 identity?](#can-users-opt-out-of-targeted-advertising-tied-to-their-uid2-identity)
- [When I send DII to UID2, does UID2 store the information?](#when-i-send-dii-to-uid2-does-uid2-store-the-information)
- [Does UID2 allow the processing of HIPAA-regulated data?](#does-uid2-allow-the-processing-of-hipaa-regulated-data)

:::note
For FAQs relating to mobile publisher integrations, see [FAQs for Mobile Integrations](../guides/integration-mobile-overview.md#faqs-for-mobile-integrations).
:::

#### Will all integration partners in the EUID infrastructure (SSPs, third-party data providers, measurement providers) be automatically integrated with UID2?

No. UID2 has its own framework, which is separate from EUID. As such, paperwork relating to accessing and using the EUID framework does not automatically grant usage and access to the UID2 framework. New contracts are required to be signed for UID2.

#### Can users opt out of targeted advertising tied to their UID2 identity?

Yes. Through the [Transparency and Control Portal](https://www.transparentadvertising.com/), users can opt out from being served targeted ads tied to their UID2 identity. Each request is distributed through the UID2 Opt-Out Service, and UID2 Operators make the opt-out information available to all relevant participants.

#### When I send DII to UID2, does UID2 store the information?

No. None of the components of the <Link href="../ref-info/glossary-uid#gl-uid2-service">UID2 service</Link> store any DII.

In addition, in almost all cases, UID2 doesn't store any values at all once the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md), [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md), or [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) call is complete. A necessary exception is the case where a user has opted out. In this scenario, UID2 stores a hashed, opaque value to indicate the opted-out user. The stored value cannot be reverse engineered back to the original value of the DII, but can be used to identify future requests for a UID2 generated from the same DII, which are therefore denied.

#### Does UID2 allow the processing of HIPAA-regulated data?

No. UID2 participants must not generate UID2s from Protected Health Information, as defined by the Health Insurance Portability and Accountability Act (HIPAA), even if they have obtained consent to engage in marketing with respect to such data.

## FAQs for Publishers

Here are some frequently asked questions for publishers using the UID2 framework.

- [How can I test that the DII sent and the returned token match up?](#how-can-i-test-that-the-dii-sent-and-the-returned-token-match-up)
- [Do I need to decrypt tokens?](#do-i-need-to-decrypt-tokens)
- [How will I be notified of user opt-out?](#how-will-i-be-notified-of-user-opt-out)
- [Where should I make token generation calls&#8212;from the server side or the client side?](#where-should-i-make-token-generation-callsfrom-the-server-side-or-the-client-side)
- [Can I make token refresh calls from the client side?](#can-i-make-token-refresh-calls-from-the-client-side)
- [If I choose to manually refresh the token, how will I know when to refresh the token?](#if-i-choose-to-manually-refresh-the-token-how-will-i-know-when-to-refresh-the-token)
- [How can I test the refresh token workflow?](#how-can-i-test-the-refresh-token-workflow)
- [What is the uniqueness and rotation policy for UID2 tokens?](#what-is-the-uniqueness-and-rotation-policy-for-uid2-tokens)
- [What does a UID2 token look like in the bidstream?](#what-does-a-uid2-token-look-like-in-the-bidstream)

#### How can I test that the DII sent and the returned token match up?

You can use the [POST&nbsp;/token/validate](../endpoints/post-token-validate.md) endpoint to check whether the <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> that you are sending through [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) is valid. `POST /token/validate` is used primarily for testing purposes.

For details, see [Using POST&nbsp;/token/validate to Test](../endpoints/post-token-validate.md#using-post-tokenvalidate-to-test).

#### Do I need to decrypt tokens?

No, publishers do not need to decrypt <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link>. However, if you want to get access to [raw UID2s](../ref-info/glossary-uid.md#gl-raw-uid2) for internal use only, please work with UID2 support to gain access.

#### How will I be notified of user opt-out?

If the user has opted out, the API response notifies you in either of these cases:
- When you generate the UID2 token by a call to the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint, either directly or via one of the UID2 SDKs, using the required `optout_check` parameter with a value of `1`.
- When you refresh the UID2 token by a call to the [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint, either directly or via one of the UID2 SDKs.

#### Where should I make token generation calls&#8212;from the server side or the client side?

You can generate UID2 tokens from either the client side or the server side. For more information, see:
- Generating tokens from the client side using Prebid.js: [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md).
- Generating tokens from the server side using Prebid.js: [UID2 Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-client-server.md).
- Other server-side options: [Publisher Integrations](../guides/summary-guides.md#publisher-integrations).

#### Can I make token refresh calls from the client side?

Yes. The [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) can be called from the client side (for example, a browser or a mobile app) because it does not require using an API key.

#### If I choose to manually refresh the token, how will I know when to refresh the token?

The recommended refresh interval is hourly.

To determine when to refresh, you can use the timestamp of the `refresh_from` field in the response to the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint (see [Successful Response](../endpoints/post-token-generate.md#successful-response)) or [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint (see [Successful Response With Tokens](../endpoints/post-token-refresh.md#successful-response-with-tokens)).

You could also use one of the SDKs that has a function to check if token refresh is needed.

For details, see [Recommended Token Refresh Frequency](../ref-info/ref-tokens.md#recommended-token-refresh-frequency) and [Managing Token Refresh with an SDK](../ref-info/ref-tokens.md#managing-token-refresh-with-an-sdk).

#### How can I test the refresh token workflow?

You can use the `refresh-optout@example.com` email address or the `+00000000002` phone number to test your token refresh workflow. Using either parameter value in a request always generates an identity response with a `refresh_token` that results in a logout response.

The procedure is a little different depending on whether or not you are using an SDK.

##### With SDK:

1. Depending on whether the DII is an email address or a phone number, send a [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) request using one of the following values:
    - The `refresh-optout@example.com` as the `email` value.
    - The hash of `refresh-optout@example.com` as the `email_hash` value. 
    - The `+00000000002` as the `phone` value.
    - The hash of `+00000000002` as the `phone_hash` value.
2. Wait until the SDK's [background auto-refresh](../sdks/sdk-ref-javascript.md#background-token-auto-refresh) attempts to refresh the advertising token (this can take several hours) and observe the refresh attempt fail with the `OPTOUT` status. At this point the SDK also clears the first-party cookie.

##### Without SDK:

1. Depending on whether the <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> is an email address or a phone number, send a [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) request using one of the following values:
    - The `refresh-optout@example.com` as the `email` value.
    - The hash of `refresh-optout@example.com` as the `email_hash` value. 
    - The `+00000000002` as the `phone` value.
    - The hash of `+00000000002` as the `phone_hash` value.
2. Store the returned `refresh_token` for use in the following step.
3. Send a [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) request with the `refresh_token` (saved in step 2) as the `token` value.<br/>The body response should be empty, and the `status` value should be set to `optout` because the `refresh-optout@example.com` email and the `+00000000002` phone number always result in a logged out user.

#### What is the uniqueness and rotation policy for UID2 tokens?

The UID2 service encrypts UID2 tokens using random initialization vectors. The UID2 token is unique for a given user as the user browses the internet. This means that every time a UID2 token is generated, the token is always different, even for the same underlying raw UID2. Every time the token is refreshed, a new token is generated and encrypted.

#### What does a UID2 token look like in the bidstream?

There are many ways to approach UID2 implementation. Here is one example of a code snippet showing how a UID2 token is passed in the <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link>:

<ExampleUid2InBidstream />

## FAQs for Advertisers and Data Providers

Here are some frequently asked questions for advertisers and data providers using the UID2 framework.

- [How do I know when to refresh the UID2 due to salt bucket rotation?](#how-do-i-know-when-to-refresh-the-uid2-due-to-salt-bucket-rotation)
- [Do refreshed emails get assigned to the same bucket with which they were previously associated?](#do-refreshed-emails-get-assigned-to-the-same-bucket-with-which-they-were-previously-associated)
- [How often should UID2s be refreshed for incremental updates?](#how-often-should-uid2s-be-refreshed-for-incremental-updates)
- [How should I generate the SHA-256 of DII for mapping?](#how-should-i-generate-the-sha-256-of-dii-for-mapping)
- [Should I store mapping of email addresses, phone numbers, or corresponding hashes to raw UID2s in my own datasets?](#should-i-store-mapping-of-email-addresses-phone-numbers-or-corresponding-hashes-to-raw-uid2s-in-my-own-datasets)
- [How should I handle user opt-outs?](#how-should-i-handle-user-opt-outs)
- [Does the same DII always result in the same raw UID2?](#does-the-same-dii-always-result-in-the-same-raw-uid2)
- [If two operators process the same DII, are the results the same?](#if-two-operators-process-the-same-dii-are-the-results-the-same)

#### How do I know when to refresh the UID2 due to salt bucket rotation?

Metadata supplied with the UID2 generation request indicates the salt bucket used for generating the UID2. Salt buckets persist and correspond to the underlying <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> used to generate a UID2. Use the [POST&nbsp;/identity/buckets](../endpoints/post-identity-buckets.md) endpoint to return which salt buckets rotated since a given timestamp. The returned rotated salt buckets inform you which UID2s to refresh.

:::note
We do not make any promises about when the rotation takes place. To stay as up-to-date as possible, we recommend doing the checks once per hour.
:::

#### Do refreshed emails get assigned to the same bucket with which they were previously associated?

Not necessarily. After you remap emails associated with a particular bucket ID, the emails might be assigned to a different bucket ID. To check the bucket ID, [call the mapping function](../guides/advertiser-dataprovider-guide.md#1-retrieve-a-raw-uid2-for-dii-using-the-identity-map-endpoint) and save the returned UID2 and bucket ID again.

:::info
When mapping and remapping emails, do not make any assumptions about the number of buckets, their rotation dates, or the specific bucket that an email gets assigned to.
:::

#### How often should UID2s be refreshed for incremental updates?

The recommended cadence for updating audiences is daily.

Even though each salt bucket is updated roughly once a year, individual bucket updates are spread over the year. This means that about 1/365th of all buckets are rotated daily. If fidelity is critical, consider calling the [POST&nbsp;/identity/buckets](../endpoints/post-identity-buckets.md) endpoint more frequently; for example, hourly.

#### How should I generate the SHA-256 of DII for mapping?

The system should follow the [email normalization rules](gs-normalization-encoding.md#email-address-normalization) and hash without salting.

#### Should I store mapping of email addresses, phone numbers, or corresponding hashes to raw UID2s in my own datasets?

Yes. Not storing mappings may increase processing time drastically when you have to map millions of email addresses or phone numbers. Recalculating only those mappings that actually need to be updated, however, reduces the total processing time because only about 1/365th of UID2s need to be updated daily.

:::info
Unless you are using a <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link>, you must map email addresses, phone numbers, or hashes consecutively, using a single HTTP connection, in batches of 5,000 emails at a time. In other words, do your mapping without creating multiple parallel connections. 
:::

#### How should I handle user opt-outs?

When a user opts out of UID2-based targeted advertising through the [Transparency and Control Portal](https://www.transparentadvertising.com/), the opt-out signal is sent to DSPs and publishers, who handle opt-outs at bid time. We recommend that advertisers and data providers regularly check whether a user has opted out, via the [POST /identity/map](../endpoints/post-identity-map.md) endpoint.

Advertisers and data providers can also check the opt-out status of raw UID2s using the [POST&nbsp;/optout/status](../endpoints/post-optout-status.md) endpoint.

If a user opts out through your website, you should follow your internal procedures for handling the opt-out. For example, you might choose not to generate a UID2 for that user.

#### Does the same DII always result in the same raw UID2?

In general yes, the process of generating a raw UID2 from DII is the same, and results in the same value, no matter who sent the request. If two UID2 participants were to send the same email address to the [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) endpoint at the same time, they would both get the same raw UID2 in response.

However, there is a variable factor, which is the <Link href="../ref-info/glossary-uid#gl-salt">salt</Link> value that's used in generating the raw UID2. The salt values are rotated roughly once per year (for details, see [How often should UID2s be refreshed for incremental updates?](#how-often-should-uid2s-be-refreshed-for-incremental-updates)). If the salt value changes between one request and another, those two requests result in two different raw UID2, even when the DII is the same.

For more information, see [Monitor for salt bucket rotations related to your stored raw UID2s](../guides/advertiser-dataprovider-guide.md#3-monitor-for-salt-bucket-rotations-related-to-your-stored-raw-uid2s) in the *Advertiser/Data Provider Integration Guide*.

#### If two operators process the same DII, are the results the same?

Yes, if the request is for a <Link href="../ref-info/glossary-uid#gl-raw-uid2">raw UID2</Link>. As covered in the previous FAQ, [Does the same DII always result in the same raw UID2?](#does-the-same-dii-always-result-in-the-same-raw-uid2), if an advertiser or data provider sends the same DII to the UID2 Operator, by using an SDK or the [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) endpoint, at the same time, the same raw UID2 is created.

The result is the same, regardless of the operator and whether it's a Private Operator or a Public Operator.

The timing is important only because of salt bucket rotation. If the salt value changes between one request and another, the result is a different raw UID2.

However, if a publisher sends DII in a request for a <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link>, via the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) or [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoint or via an SDK, the resulting UID2 token contains the same encrypted raw UID2, but the token itself is always unique.

## FAQs for DSPs

Here are some frequently asked questions for demand-side platforms (DSPs).

- [How do I know which decryption key to apply to a UID2?](#how-do-i-know-which-decryption-key-to-apply-to-a-uid2)
- [Where do I get the decryption keys?](#where-do-i-get-the-decryption-keys)
- [How many decryption keys may be present in memory at any point?](#how-many-decryption-keys-may-be-present-in-memory-at-any-point)
- [How do I know if/when the salt bucket has rotated?](#how-do-i-know-ifwhen-the-salt-bucket-has-rotated)
- [Should the DSP be concerned with latency?](#should-the-dsp-be-concerned-with-latency)
- [How should the DSP maintain proper frequency capping with UID2?](#how-should-the-dsp-maintain-proper-frequency-capping-with-uid2)
- [Will all user opt-out traffic be sent to the DSP?](#will-all-user-opt-out-traffic-be-sent-to-the-dsp)
- [Is the DSP expected to handle opt-out signals only for the UID2s that they already store?](#is-the-dsp-expected-to-handle-opt-out-signals-only-for-the-uid2s-that-they-already-store)
- [How long should the DSP keep the opt-out list?](#how-long-should-the-dsp-keep-the-opt-out-list)
- [Is the UID2 of an opted-out user sent to the opt-out endpoint in an encrypted form?](#is-the-uid2-of-an-opted-out-user-sent-to-the-opt-out-endpoint-in-an-encrypted-form)
- [In what format is the UID2 of an opted-out user sent to the webhook?](#in-what-format-is-the-uid2-of-an-opted-out-user-sent-to-the-webhook)
- [What request type do opt-outs use?](#what-request-type-do-opt-outs-use)
- [How strict are the requirements for honoring opt-outs?](#how-strict-are-the-requirements-for-honoring-opt-outs)
- [How can I check if a user has opted out?](#how-can-i-check-if-a-user-has-opted-out)
- [How do SDK errors impact the DSP's ability to respond to a bid?](#how-do-sdk-errors-impact-the-dsps-ability-to-respond-to-a-bid)

#### How do I know which decryption key to apply to a UID2?

Each of the server-side SDKs (see [SDKs: Summary](../sdks/summary-sdks.md)) updates decryption keys automatically. Metadata supplied with the UID2 token discloses the IDs of the decryption keys to use. 

#### Where do I get the decryption keys?

You can use one of the server-side SDKs (see [SDKs: Summary](../sdks/summary-sdks.md)) to communicate with the UID2 service and fetch the latest keys. To make sure that the keys remain up-to-date, it is recommended to fetch them periodically; for example, once every hour.

#### How many decryption keys may be present in memory at any point?

There may be thousands of decryption keys present in the system at any given point.

#### How do I know if/when the salt bucket has rotated?

The DSP is not privy to when the UID2 salt bucket rotates. This is similar to a DSP being unaware if users cleared their cookies. Salt bucket rotation has no significant impact on the DSP.

#### Should the DSP be concerned with latency?

The UID2 service does not introduce latency into the bidding process. Any latency experienced can be attributed to the network, not the UID2 service.

#### How should the DSP maintain proper frequency capping with UID2?

The UID2 has the same chance as a cookie of becoming stale. Hence, the DSP can adapt the same infrastructure currently used for cookie or deviceID-based frequency capping for UID2. For details, see [How do I know when to refresh the UID2 due to salt bucket rotation?](#how-do-i-know-when-to-refresh-the-uid2-due-to-salt-bucket-rotation).

#### Will all user opt-out traffic be sent to the DSP?

Yes, all opt-outs from the UID2 [Transparency and Control Portal](https://www.transparentadvertising.com/) hit the opt-out endpoint, which the DSP must configure to [honor user opt-outs](../guides/dsp-guide.md#honor-user-opt-outs).

#### Is the DSP expected to handle opt-out signals only for the UID2s that they already store?

In some cases a DSP may receive a UID2 token for a newly-stored UID2 where the token is generated before the opt-out timestamp. The DSP is not allowed to bid on such tokens. It is therefore recommended to store all opt-out signals regardless of whether the corresponding UID2 is currently stored by the DSP or not. For details, see the diagram in [Bidding Opt-Out Logic](../guides/dsp-guide.md#bidding-opt-out-logic).

#### How long should the DSP keep the opt-out list?

We recommend that you keep the opt-out information indefinitely.

#### Is the UID2 of an opted-out user sent to the opt-out endpoint in an encrypted form?

No. It is sent as an unencrypted (raw) UID2.

#### In what format is the UID2 of an opted-out user sent to the webhook?

If a user has opted out, the UID2 Operator returns the raw UID2s as URL-encoded query parameters.

For details about the opt-out process for DSPs, see [Honor User Opt-Outs](../guides/dsp-guide.md#honor-user-opt-outs).

#### What request type do opt-outs use? 

Typically GET requests, but different DSPs may use different types.

#### How strict are the requirements for honoring opt-outs? 

Opt-outs must always be respected. It may take some time for an opt-out request to propagate through the system during which time it is expected that some bids may not honor the opt-out.

#### How can I check if a user has opted out?

DSPs can check the opt-out status of raw UID2s using the [POST&nbsp;/optout/status](../endpoints/post-optout-status.md) endpoint.

#### How do SDK errors impact the DSP's ability to respond to a bid?

If there is an error, the SDK will not decrypt the UID2 token into a UID2.
