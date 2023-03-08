[UID2 Overview](../../../README.md) > [Getting Started](../../README.md) > [v2](../summary-doc-v2.md) > Frequently Asked Questions

# Frequently Asked Questions

Frequently asked questions for UID2 are broken into the following categories:

- [FAQs -- General](#faqs----general)
- [FAQs for Publishers](#faqs-for-publishers)

## FAQs -- General

Here are some frequently asked questions regarding the UID2 framework.
<!-- (gwh note: section is taken from original readme) -->

### <!-- FAQ_01 -->Will all integration partners in the EUID infrastructure (SSPs, third-party data providers, measurement providers) be automatically integrated with UID2? 

No. UID2 functions as its own framework, which is separate from EUID. As such, paperwork relating to accessing and using the EUID framework does not automatically grant usage and access to the UID2 framework. New contracts are required to be signed for UID2.

### <!-- FAQ_02 -->Can users opt out of targeted advertising tied to their UID2 identity?

Yes. Through the [Transparency and Control Portal](https://transparentadvertising.org), users can opt out from being served targeted ads tied to their UID2 identity. Each request is distributed through the UID2 Opt-Out Service and UID2 Operators to all relevant participants. 

Some publishers and service providers have the option to limit access to their products based on a user’s participation in the UID2 framework, and it is the publisher’s responsibility to communicate this as part of the value exchange dialog with the user.

### <!-- FAQ_03 -->How does a user know where to access the opt-out portal?

Publishers, SSO providers, or consent management platforms disclose links to the [Transparency and Control Portal](https://transparentadvertising.org) in their login flows, consent flows, and privacy policies, and by other means.

### <!-- FAQ_04 -->Why do advertisers and third-party data providers not need to integrate with the opt-out feed?

Opt-outs relate to opting out of targeted advertising, which is handled through the publisher and DSP opt-out [workflows](../../../README.md#workflows). To disengage from a specific advertiser, a consumer must contact the advertiser directly.


## FAQs for Publishers
Here are some frequently asked questions for publishers using the UID2 framework.
<!-- (gwh note: section is taken from publisher-client-side.md) -->

### <!-- FAQ_05 -->How will I be notified of user opt-out?

The [Client-Side JavaScript SDK (v2)](../sdks/client-side-identity.md) background token auto-refresh process handles user opt-outs. If user opts out, when the SDK attempts token refresh, it learns about the optout, clears the session (including the cookie), and invokes the callback with the `OPTOUT` status.

### <!-- FAQ_06 -->Where should I make token generation calls -- from the server or client side?

UID2 tokens must be generated only on the server side after authentication. In other words, to ensure that the API key used to access the service remains secret, the [POST /token/generate](../endpoints-v2/post-token-generate.md) endpoint must be called only from the server side.

### <!-- FAQ_07 -->Can I make token refresh calls from the client side?

Yes. The [POST /token/refresh](../endpoints-v2/post-token-refresh.md) can be called from the client side (for example, a browser or a mobile app) because it does not require using an API key.

### <!-- FAQ_08 -->How can I test that the PII sent and returned tokens match?

You can use the [POST /token/validate](../endpoints-v2/post-token-validate.md) endpoint to check whether the PII you are sending through [POST /token/generate](../endpoints-v2/post-token-generate.md) is valid. 

1. Depending on whether the PII is an email address or a phone number, send a [POST /token/generate](../endpoints-v2/post-token-generate.md) request using one of the following values:
    - The `validate@email.com` as the `email` value.
    - The hash of `validate@email.com` as the `email_hash` value. 
    - The `+12345678901` as the `phone` value.
    - The hash of `+12345678901` as the `phone_hash` value.
2. Store the returned `advertising_token` for use in the following step.
3. Send a [POST /token/validate](../endpoints-v2/post-token-validate.md) request using the `email`, `email_hash`, `phone`, or `phone_hash` value that you sent in step 1 and the `advertising_token` (saved in step 2) as the `token` property value. 
    - If the response returns `true`, it indicates that the PII you sent as a request in step 1 matches the token you received in the response of step 1. 
    - If it returns `false`, it indicates that there may be an issue with the way you are sending email addresses, phone numbers, or their respective hashes.

### <!-- FAQ_09 -->How can I test the refresh token logout workflow?

You can use the `optout@email.com` email address or the `+00000000000` phone number to test your token refresh workflow. Using either parameter value in a request always generates an identity response with a `refresh_token` that results in a logout response.

1. Depending on whether the PII is an email address or a phone number, send a [POST /token/generate](../endpoints-v2/post-token-generate.md) request using one of the following values:
    - The `optout@email.com` as the `email` value.
    - The hash of `optout@email.com` as the `email_hash` value. 
    - The `+00000000000` as the `phone` value.
    - The hash of `+00000000000` as the `phone_hash` value.
2. Wait until the SDK's [background auto-refresh](../sdks/client-side-identity.md#background-token-auto-refresh) attempts to refresh the advertising token (this can take several hours) and observe the refresh attempt fail with the `OPTOUT` status. At this point the SDK also clears the first-party cookie.

### <!-- FAQ_10 -->Should /token/generate return the “optout” status and generate no tokens if I pass optout@email.com in the request payload? 

The [POST /token/generate](../endpoints-v2/post-token-generate.md) endpoint does not check for opt-out records and returns the `success` status with valid advertising and user tokens in response to valid requests.

>IMPORTANT: Be sure to call this endpoint only when you have obtained legal basis to convert the user's PII to UID2 tokens. [POST /token/generate](../endpoints-v2/post-token-generate.md) calls automatically opt in users associated with the provided PII to UID2-based targeted advertising. 

To check for opt-out requests, use the [POST /token/refresh](../endpoints-v2/post-token-refresh.md) endpoint.


