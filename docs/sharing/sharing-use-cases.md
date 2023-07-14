---
title: Use Cases
description: Use cases for sharing UID2s with partner participants.
hide_table_of_contents: false
sidebar_position: 03
---

# Sharing UID2s: Use Cases

There are many ways to implement sharing&#8212;many different examples of senders, receivers, and transfer methods.

The secure sharing workflow allows you to share raw UID2s securely with trusted partners. For example, here are some sample scenarios where a sender wants to share UID2s with a receiver: 

- A publisher (sender) sends a UID2 token via the bid stream to a DSP (receiver). If you're a publisher, this is the only use case. For details, see [Sharing for Publishers](sharing-publishers.md).
- A measurement partner (sender) sends a UID2 token to an advertiser (receiver) via Amazon Simple Storage Service (S3).
- A DSP (sender) sends a UID2 token to an advertiser (receiver) via reporting.

These scenarios, and others, are represented in the following diagram.

![Illustration of Sharing Use Cases](images/UID2_Sharing_Diagram_UseCases.png)

(**GWH_KT (new) I think this diagram needs updating. It shows Publisher to all, not just publisher to DSP.**)

> NOTE: Any sender can transfer a UID2 token to any receiver using one of the transfer methods. Only a handful of transfer methods have been defined here. There are many others.
