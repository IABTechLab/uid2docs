---
title: UID2 GMA Plugin for iOS
description: A guide for publishers using GMA for ad requests on iOS apps.
hide_table_of_contents: false
sidebar_position: 13
---

# UID2 GMA Plugin for iOS Integration Guide

The UID2 Google Mobile Ads (GMA) Plugin for iOS enables publishers that use the [Google Mobile Ads (GMA) SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) to send [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from iOS apps. This is done automatically, with no direct coding needed from the app developer.

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

1. Google Mobile Ads SDK v10.7.0 or later:
   - [SDK](https://developers.google.com/admob/ios)
   - [Release Notes](https://developers.google.com/admob/ios/rel-notes)
1. UID2 SDK for iOS v0.2.0:
   - [SDK](https://github.com/IABTechLab/uid2-ios-sdk)
   - [UID2 SDK for iOS Reference Guide](../sdks/uid2-sdk-ref-ios.md)
1. [UID2 GMA Plugin for iOS v0.2.0](https://github.com/IABTechLab/uid2-ios-plugin-google-gma)

## Installation

Prerequisite: Install the Google Mobile Ads SDK and the UID2 iOS SDK.

Install the UID2 iOS IMA Plugin via Swift Package Manager to an existing app with the UID2 iOS SDK and the Google Mobile Ads SDK installed:

``` javascript
.package(url: https://github.com/IABTechLab/uid2-ios-plugin-google-gma.git, exact: "0.2.0")
```
