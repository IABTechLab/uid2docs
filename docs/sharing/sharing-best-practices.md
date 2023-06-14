---
title: Best Practices
description: Best practices for sharing UID2 information.
hide_table_of_contents: false
sidebar_position: 05
---

# Sharing UID2 Information: Best Practices

Information about best practices for sharing UID2 information with other participants.

<!-- It includes the following:

- [xxx](#xxx)
  - [xxx](#xxx)
  - [xxx](#xxx)
- [xxx](#xxx)
  - [xxx](#xxx)
  - [xxx](#xxx)
- [xxx](#xxx)
- [xxx](#xxx) -->

Details to come.


BELOW PASDTE FROM KIMBERLY NOT YET REVIEWED -------------------------------------------------------------

## Sharing UID2: Best Practices 
  
Best Practices for Sharing  
With sharing, there are many more ways that you can use UID2 in your business. However, we all have a responsibility to maintain the privacy of users as well as the integrity of our own data and data that others share with us. Here are some best practices to help ensure UID2 sharing runs smoothly and securely:
Raw UID2  
When UID2s are within your platform, use and store raw UID2s.  
We recommend a maximum length of 100 characters when storing raw UID2s.
UID2 Token  
When data is coming in or out of your platform, the data should be a UID2 token.  
When the key used to create a UID2 token expires, the UID2 token can no longer be decrypted.  
We recommend a maximum length of 500 characters when storing UID tokens.
Decryption Key Refresh Cadence 
Call uid2client.refresh() once per hour for long/continuously running processes.
uid2client.refresh() allows the SDK to fetch the latest keys for decryption.
Example: AdvertiserABC wants to send data to DataProviderXYZ
12:00 pm  
DataProviderXYZ calls uid2client.refresh()  
12:30 pm  
AdvertiserABC will log into the portal, and give permission to DataProviderXYZ  
1:00 pm   
DataProviderXYZ calls uid2client.refresh().  
By refreshing, DataProviderXYZ now has access to AdvertiserABC’s key and can decrypt any UID2 token received from AdvertiserABC into a raw UID2.  