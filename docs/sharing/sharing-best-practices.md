---
title: Best Practices
description: Best practices for sharing UID2 information.
hide_table_of_contents: false
sidebar_position: 05
---

# Sharing UID2 Information: Best Practices

<!-- It includes the following:

- [Best Practices for Managing Raw UID2s](#best-practices-for-managing-raw-uid2s)
- [Best Practices for Managing UID2 Tokens](#best-practices-for-managing-uid2-tokens)
- [Decryption Key Refresh Cadence](#decryption-key-refresh-cadence)
  - [Decryption Key Refresh Example](#decryption-key-refresh-example) -->

The ability to securely share UID2 information with other authorized UID2 users opens the door to using UID2 in many additional ways in your business.

However, every UID2 participant has a responsibility to maintain the privacy of users as well as the integrity of data&#8212;our own data, and also data that others share with us. Here are some best practices to help ensure UID2 sharing runs smoothly and securely.

## Best Practices for Managing Raw UID2s

Follow these guidelines:
- For any UID2s that are in your platform, whether they are your own or shared with you, use and store them as raw UID2, not as advertising tokens.
- For storing raw UID2s, we recommend a maximum length of 100 characters.

## Best Practices for Managing UID2 Tokens

Follow these guidelines:

- When data is coming into your platform, or you are sending it out, make sure the data is always in the form of UID2 tokens, not raw UID2s.

  It's important to keep raw UID2s, rather than tokens, because a UID2 has a much shorter life. When the key used to create a UID2 token expires, you can no longer decrypt the token. 

- For storing UID2 tokens, we recommend a maximum length of 500 characters.

{**gwh/KT_01: it's not clear to me from this why we are recommending a length for storing UID2 tokens, when we just said don't do it.**}

## Decryption Key Refresh Cadence 

For long/continuously running processes, call the `uid2client.refresh()` function once per hour. This allows the SDK to fetch the latest keys for decryption. When a new sharing relationship is enabled, the additional set of encryption keys needed to actually share data is returned the next time the sharer calls the `uid2client.refresh()` function.

### Decryption Key Refresh Example

This example illustrates how the `uid2client.refresh()` function enables a new sharing relationship. In this example, Advertiser ABC wants to send data to Data Provider XYZ.

1. 12:00 pm:

   The sharing relationship is not yet enabled.

   Data Provider XYZ calls `uid2client.refresh()`. The keys for Advertiser ABC are not returned, so sharing cannot occur.

2. 12:30 pm:

   Advertiser ABC logs in to the UID2 Portal and creates a sharing relationship with Data Provider XYZ.

3. 1:00 pm:

   Data Provider XYZ, on an hourly cadence, again calls `uid2client.refresh()`. Because there is a new sharing relationship, the keys for Advertiser ABC are returned.

   Data Provider XYZ can now decrypt any UID2 token received from Advertiser ABC into a raw UID2.  