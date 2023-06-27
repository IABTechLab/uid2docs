---
title: UID2 Endpoints - Summary
description: Summary of the endpoints available in the UID2 service.
hide_table_of_contents: false
sidebar_position: 01
---

# UID2 Endpoints

All UID2 endpoints require a client secret for encrypting API requests (except [POST /token/refresh](post-token-refresh.md) requests) and decrypting responses. For details and Python script examples, see [Encrypting Requests and Decrypting Responses](../getting-started/gs-encryption-decryption.md).

## Identity Tokens

The following endpoints are for retrieving and managing UID2 tokens, and are used mainly by publishers.

| Endpoint | Description | Request Encryption |  Response Decryption |
| :--- | :--- | :--- | :--- |
| [POST /token/generate](post-token-generate.md) | Opt in the user to UID2-based targeted advertising and generate a UID2 token from their provided email address or phone number. | Required | Required |
| [POST /token/validate](post-token-validate.md) | Used for testing, to validate that an advertising token (UID2) matches the specified email address, phone number, or the respective hash. | Required | Required |
| [POST /token/refresh](post-token-refresh.md) | Generate a new token for a user for their refresh token from the [POST /token/generate](post-token-generate.md) response. | N/A | Required |

## Identity Maps

The following endpoints are used by advertisers and third-party data providers. Publishers do not need to use these endpoints.

| Endpoint | Description | Request Encryption |  Response Decryption |
| :--- | :--- | :--- | :--- |
| [POST /identity/buckets](post-identity-buckets.md) | Monitor rotated salt buckets using their last updated timestamp. | Required | Required |
| [POST /identity/map](post-identity-map.md) | Retrieve UID2s and salt bucket IDs for one or more email addresses, phone numbers, or their respective hashes.  | Required | Required |

