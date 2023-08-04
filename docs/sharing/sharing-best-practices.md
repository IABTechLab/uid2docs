---
title: Best Practices
description: Best practices for UID2 sharing.
hide_table_of_contents: false
sidebar_position: 05
---

# UID2 Sharing: Best Practices

<!-- It includes the following:

- [Best Practices for Managing Raw UID2s](#best-practices-for-managing-raw-uid2s)
- [Best Practices for Managing UID2 Tokens](#best-practices-for-managing-uid2-bid-stream-tokens-or-sharing-tokens)
- [Key Refresh Cadence for Sharing](#key-refresh-cadence-for-sharing) -->

The ability to securely share UID2 tokens with other authorized UID2 users opens the door to using UID2 in many additional ways in your business.

However, every UID2 participant has a responsibility to maintain the security of the UID2 ecosystem. Here are some best practices to help ensure that UID2 sharing runs smoothly and securely.

## Best Practices for Managing Raw UID2s

Follow these guidelines:
- For any UID2s that are in your platform, use and store them as raw UID2s, not as UID2 tokens.

  This is important because a UID2 token is short-lived. When the key used to create a UID2 token expires, you can no longer decrypt the token.
- In your code, for future extensibility, allow for a raw UID2 length of 100 characters.

## Best Practices for Managing UID2 Tokens

Follow these guidelines:

- When data is coming into your platform, or you are sending it out, make sure that the data is always in the form of UID2 tokens, not raw UID2s.

  However, within your infrastructure, it's important to store raw UID2s, rather than UID2 tokens (see [Best Practices for Managing Raw UID2s](#best-practices-for-managing-raw-uid2s) above). 

- In your code, for future extensibility, allow for a UID2 token length of 500 characters.

## Key Refresh Cadence for Sharing

For long/continuously running processes, call the `uid2client.refresh()` function once per hour. 

The following are reasons to refresh the keys on an hourly cadence:

- Regular refresh allows the SDK to fetch the latest keys for decryption.
- The UID2 framework periodically rotates encryption keys.

For details, see [Encryption/Decryption Key Refresh Cadence for Sharing (SDK Only)](sharing-implementing.md#encryptiondecryption-key-refresh-cadence-for-sharing-sdk-only).
