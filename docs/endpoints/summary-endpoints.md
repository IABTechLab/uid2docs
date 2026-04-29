---
title: UID2 Endpoints - Summary
description: Summary of the endpoints available in the UID2 service.
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# UID2 endpoints: Summary

All UID2 endpoints require a client secret for encrypting API requests (except [POST&nbsp;/token/refresh](post-token-refresh.md) requests) and decrypting responses. For details, and code examples in different programming languages, see [Encrypting requests and decrypting responses](../getting-started/gs-encryption-decryption.md).

## UID2 endpoints by audience

The following table shows the UID2 endpoints, with the audience for each. For details, click through to the applicable sections.

| Endpoint | Audience | Details |
| :--- | :--- | :--- |
| [POST&nbsp;/token/generate](post-token-generate.md) | Publishers | [UID2 tokens](#uid2-tokens) |
| [POST&nbsp;/token/validate](post-token-validate.md) | Publishers | [UID2 tokens](#uid2-tokens) |
| [POST&nbsp;/token/refresh](post-token-refresh.md) | Publishers | [UID2 tokens](#uid2-tokens) |
| [POST&nbsp;/identity/map](post-identity-map.md) | Advertisers, data providers | [Identity map](#identity-map) |
| [POST&nbsp;/optout/status](post-optout-status.md)  | Advertisers, data providers, DSPs, sharers | [Opt-out status](#opt-out-status)|

## UID2 tokens

The following endpoints are for retrieving and managing UID2 tokens (identity tokens, advertising tokens), and are used mainly by publishers.

| Endpoint | Description | Request Encryption | Response Decryption |
| :--- | :--- | :--- | :--- |
| [POST&nbsp;/token/generate](post-token-generate.md) | Requests a UID2 token generated from a user's <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> (email address or phone number). If the DII is valid, and the user has not opted out of UID2, this operation returns a UID2 token and associated values. | Required | Required |
| [POST&nbsp;/token/validate](post-token-validate.md) | Used for testing, to validate that an advertising token (UID2) matches the specified email address, phone number, or the respective hash. | Required | Required |
| [POST&nbsp;/token/refresh](post-token-refresh.md) | Generates a new token for a user for their refresh token from the [POST&nbsp;/token/generate](post-token-generate.md) response. | N/A | Required |

## Identity map

The following endpoints are used by advertisers and third-party data providers. Publishers do not need to use these endpoints.

### Latest identity map endpoint (v3)

In the latest identity map integration, you only need to call one endpoint, `POST /identity/map`. The `POST /identity/buckets` endpoint is not part of the workflow.

:::important
If you're using the earlier version, we recommend that you upgrade as soon as possible, to take advantage of improvements.
:::

The latest identity map integration uses the following endpoint:

| Endpoint | Description | Request Encryption | Response Decryption |
| :--- | :--- | :--- | :--- |
| [POST&nbsp;/identity/map](post-identity-map.md) | Maps raw UID2s, previous raw UID2s, and refresh timestamps for one or more email addresses, phone numbers, or their respective hashes.  | Required | Required |

### Earlier identity map endpoints (v2)

The following endpoints are part of the earlier identity map integration (version 2).  

| Endpoint | Description | Request Encryption | Response Decryption |
| :--- | :--- | :--- | :--- |
| [POST&nbsp;/identity/buckets](post-identity-buckets.md) | Monitors rotated salt buckets using their last updated timestamp. | Required | Required |
| [POST&nbsp;/identity/map (v2)](post-identity-map-v2.md) | Maps raw UID2s and salt bucket IDs for one or more email addresses, phone numbers, or their respective hashes.  | Required | Required |

## Opt-out status

The following endpoint can be used by advertisers, third-party data providers, DSPs, and sharers. Publishers do not need to use this endpoint.

For details about the UID2 opt-out workflow and how users can opt out, see [User opt-out](../getting-started/gs-opt-out.md).

| Endpoint | Description | Request Encryption | Response Decryption |
| :--- | :--- | :--- | :--- |
| [POST&nbsp;/optout/status](post-optout-status.md) | Checks the opt-out status of UID2s. This endpoint takes a list of UID2s as input, and returns the UID2s that have opted out, as well as the time that the opt-out took place.  | Required | Required |
