---
title: Best Practices
description: Best practices for sharing UID2s.
hide_table_of_contents: false
sidebar_position: 05
---

# Sharing UID2s: Best Practices

<!--It includes the following:

 - [Best Practices for Managing Raw UID2s](#best-practices-for-managing-raw-uid2s)
- [Best Practices for Managing UID2 Tokens](#best-practices-for-managing-uid2-tokens)
- [Decryption Key Refresh Cadence](#encryptiondecryption-key-refresh-cadence-for-sharing)
  - [Decryption Key Refresh Example](#decryption-key-refresh-example) -->

The ability to securely share UID2 tokens with other authorized UID2 users opens the door to using UID2 in many additional ways in your business.

However, every UID2 participant has a responsibility to maintain the privacy of the UID2 ecosystem. Here are some best practices to help ensure UID2 sharing runs smoothly and securely.

## Best Practices for Managing Raw UID2s

Follow these guidelines:
- For any UID2s that are in your platform, use and store them as raw UID2s, not as UID2 tokens.
- In your code, for future extensibility, we recommend allowing for a maximum UID2 token length of 100 characters.

## Best Practices for Managing UID2 Tokens

Follow these guidelines:

- When data is coming into your platform, or you are sending it out, make sure the data is always in the form of UID2 tokens, not raw UID2s.

  Within your infrastructure, it's important to store raw UID2s, rather than UID2 tokens, because a UID2 token has a short life. When the key used to create a UID2 token expires, you can no longer decrypt the token. 

- In your code, for future extensibility, we recommend allowing for a maximum UID2 token length of 500 characters.

## Encryption/Decryption Key Refresh Cadence for Sharing

For long/continuously running processes, call the `uid2client.refresh()` function once per hour. This allows the SDK to fetch the latest keys for decryption. When a new sharing permission is enabled, the additional set of encryption keys needed to decrypt the data sent by the sharing sender is returned the next time the sharing receiver calls the `uid2client.refresh()` function. This process is handled by the SDK.

### Decryption Key Refresh Example

This example illustrates how the `uid2client.refresh()` function enables a new sharing permission. In this example, Advertiser ABC wants to send data to Data Provider XYZ.

1. 12:00 pm:

   The sharing permission is not yet enabled.

   Data Provider XYZ calls `uid2client.refresh()`. The decryption key for Advertiser ABC is not returned, so sharing cannot occur.

2. 12:30 pm:

   Advertiser ABC logs in to the UID2 Portal and creates a sharing permission with Data Provider XYZ.

3. 1:00 pm:

   Data Provider XYZ, on an hourly cadence, again calls `uid2client.refresh()`. Because there is a new sharing permission, the key for Advertiser ABC is returned in the response.

   Data Provider XYZ can now decrypt any UID2 token received from Advertiser ABC into a raw UID2.  
