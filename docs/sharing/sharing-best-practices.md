---
title: Best Practices
description: Best practices for UID2 sharing.
hide_table_of_contents: false
sidebar_position: 05
---

import Link from '@docusaurus/Link';

# UID2 Sharing: Best Practices

The ability to securely share raw UID2s or UID2 tokens with other authorized UID2 users opens the door to using UID2 in many additional ways in your business.

However, every UID2 participant has a responsibility to maintain the security of the UID2 ecosystem. Here are some best practices to help ensure that UID2 sharing runs smoothly and securely.

<!-- In this file:

- [Best Practices for Managing Raw UID2s and UID2 Tokens](#best-practices-for-managing-raw-uid2s-and-uid2-tokens)
- [Decryption Key Refresh Cadence for Sharing](#decryption-key-refresh-cadence-for-sharing) -->

## Best Practices for Managing Raw UID2s and UID2 Tokens

Follow these guidelines:
- For any UID2s that are in your platform, use and store them as raw UID2s, not as UID2 tokens. When you receive UID2 tokens, decrypt them as soon as possible.

  This is important because a UID2 token is short-lived. When the key that was used to create a UID2 token expires, you can no longer decrypt the token.

- A raw UID2 **must not** be passed through non-participants. For more information, see [UID2 Token Pass-Through](sharing-tokenized-overview.md#uid2-token-pass-through).

- In your code, for future extensibility, allow for the following:

  - Raw UID2 length: 100 characters.

  - UID2 token length: 500 characters.

## Decryption Key Refresh Cadence for Sharing

If you're using an SDK, defining the schedule for refreshing the sharing keys is part of setup.

For long/continuously running processes, we recommend calling the `uid2client.refresh()` function once per hour. However, you can choose another refresh cadence if you prefer.

The following are reasons to refresh the keys on an hourly cadence:

- Regular refresh allows the SDK to fetch the latest keys for decryption. When a new sharing permission is enabled, the additional set of cryptographic keys needed to decrypt the data sent by the new sharing sender is returned the next time the sharing receiver calls the `uid2client.refresh()` function. This process is managed by the SDK.
- The UID2 framework periodically rotates cryptographic keys.

:::note
If you're using Snowflake, you don't need to do this step. The Snowflake UID2 integration takes care of refreshing the keys.
:::
