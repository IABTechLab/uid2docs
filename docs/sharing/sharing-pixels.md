---
title: Sharing UID2 Tokens in Pixels
description: Learn about sharing UID2 in pixels.
hide_table_of_contents: false
sidebar_position: 08
---

# Sharing UID2 Tokens in Pixels

In instances where a UID2 is used in a pixel, client-side, it must always be a UID2 token, not a raw UID2. Client-side activity is not secure and can be viewed by anyone inspecting web traffic.

In general, UID2 activity encompasses the pixel uses shown in the following table.

Pixel Type | Creative Pixel | Tracking Pixel (Universal Pixel) | 
| :--- | :--- | :--- |
| What it measures | Impression (user sees an ad) | Conversion (user does something) |
| Where | Publisher site |Advertiser site  |
| For | Advertiser or third party | Advertiser or third party |
