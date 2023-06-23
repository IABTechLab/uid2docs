---
title: Use Cases
description: Use cases for sharing UID2 information with partner participants.
hide_table_of_contents: false
sidebar_position: 03
---

# Sharing UID2 Information: Use Cases

There are many ways to implement sharing&#8212;many different examples of senders, receivers, and transfer methods. Here are a few sample scenarios where a sender transfers a UID2 token to a receiver.   
  
- An advertiser (sender) sends a UID2 token to a DSP (receiver) for segment creation via an API.
- A measurement partner (sender) sends a UID2 token to an advertiser (receiver) via an Amazon S3 data transfer.
- A publisher (sender) sends a UID2 token to a data provider (receiver) via a pixel.
- A DSP (sender) sends a UID2 token to an advertiser (receiver) via reporting.

These scenarios, and others, are represented in the following table.

| Sender  | Transfer Method | Receiver  |
| :--- | :--- | :--- |
| Advertiser<br/>Publisher<br/>Data Provider<br/>DSP | API call<br/>Pixel<br/>Amazon S3 file transfer<br/>Reporting<br/>Email | Advertiser<br/>Publisher<br/>Data Provider<br/>DSP |

> NOTE: Any sender can transfer a UID2 token to any receiver using one of the transfer methods. Only a handful of transfer methods have been defined here: there are many others.

<!-- {Jaime/GWH/KT_03 TO DO -- diagram per KT} -->
