---
title: UID2 GMA Plugin for iOS
description: A guide for publishers using GMA for ad requests on iOS apps.
hide_table_of_contents: false
sidebar_position: 12
---

# UID2 GMA Plugin for iOS Integration Guide

The UID2 Google Mobile Ads (GMA) Plugin for iOS enables publishers that use the [Google Mobile Ads (GMA) SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) to send [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) in ad requests from iOS apps. This is done automatically, with no direct coding needed from the app developer.

## Functionality

This plugin simplifies integration with Google Mobile Ads (GMA) for any publishers who want to support UID2 for apps running on iOS devices.

## Version

<!-- As of 2023-07-15 -->

This documentation is for the UID2 GMA Plugin for iOS version 0.2.0.

## GitHub Repository

This plugin is in the following open-source GitHub repository:

- [https://github.com/IABTechLab/uid2-ios-plugin-google-gma](https://github.com/IABTechLab/uid2-ios-plugin-google-gma)

## Requirements 

To run this plugin, install the following:

1. [Google Mobile Ads SDK v10.7.0+](https://developers.google.com/admob/ios/rel-notes)
1. [UID2 SDK for iOS v0.2.0](../sdks/uid2-sdk-ref-ios.md)
1. UID2 GMA Plugin for iOS v0.2.0

## Installation

Prerequisite: Install the Google Mobile Ads SDK and the UID2 iOS SDK.

Install the UID2 iOS IMA Plugin via Swift Package Manager to an existing app with the UID2 iOS SDK and the Google Mobile Ads SDK installed:

```
.package(url: https://github.com/IABTechLab/uid2-ios-plugin-google-gma.git, exact: "0.2.0")
```

## Troubleshooting 

To resolve any issue that might arise, we recommend that you copy the two source code files from the UID2 GMA Plugin for iOS, directly into your app. Be sure to use the same class and file names, to ensure that the Google Mobile Ads SDK can find the files at runtime. The two files are:

- `UID2GMASecureSignalsAdapter.swift`
- `AdvertisingTokenNotFoundError.swift`
