---
title: Sharing UID2 Tokens in Pixels
description: Learn about sharing UID2 in pixels.
hide_table_of_contents: false
sidebar_position: 08
---

# Sharing UID2 Tokens in Pixels

In instances where a UID2 is used in a pixel, client-side, it must always be a UID2 token, not a raw UID2. Client-side activity is not secure and can be viewed by anyone inspecting web traffic.

:::tip
We recommend generating the UID2 token directly from DII. You can do this in several ways; our recommendation is to generate the UID2 token client-side. For instructions, see [Client-Side Integration Guide for JavaScript](../guides/publisher-client-side.md).
:::

In general, UID2 activity encompasses the pixel uses shown in the following table.

Pixel Type | Creative Pixel | Tracking Pixel (Universal Pixel) | 
| :--- | :--- | :--- |
| What it measures | Impression (user sees an ad) | Conversion (user does something) |
| Where | Publisher site via DSP |Advertiser site  |
| For | Advertiser or data provider | Advertiser or data provider |
