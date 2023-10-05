---
title: UID2 IMA Plugin for iOS
description: A guide for publishers using IMA for ad requests on iOS apps.
hide_table_of_contents: false
sidebar_position: 15
---

# UID2 IMA Plugin for iOS Integration Guide

The UID2 Interactive Media Ads (IMA) Plugin for iOS enables publishers that use the [Google IMA SDK for iOS](https://developers.google.com/interactive-media-ads/docs/sdks/ios/client-side) to send [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from iOS apps. This is done automatically, with no direct coding needed from the app developer.

## Functionality

This plugin simplifies integration with Google Interactive Media Ads (IMA) for any publishers who want to support UID2 for apps running on iOS devices.

## Version

<!-- As of 2023-07-15 -->

This documentation is for the UID2 IMA Plugin for iOS version 0.2.0.

## GitHub Repository

This plugin is in the following open-source GitHub repository:

- [https://github.com/IABTechLab/uid2-ios-plugin-google-ima](https://github.com/IABTechLab/uid2-ios-plugin-google-ima)

## Requirements 

To run this plugin, install the following:

1. Google IMA SDK v3.19.1 or later:
   - [SDK](https://developers.google.com/interactive-media-ads/docs/sdks/ios/client-side)
   - [Release history](https://developers.google.com/interactive-media-ads/docs/sdks/ios/client-side/history)
1. UID2 SDK for iOS v0.2.0:
   - [SDK](https://github.com/IABTechLab/uid2-ios-sdk)
   - [UID2 SDK for iOS Reference Guide](../sdks/uid2-sdk-ref-ios.md)
1. [UID2 IMA Plugin for iOS v0.2.0](https://github.com/IABTechLab/uid2-ios-plugin-google-ima)

## Installation

Prerequisite: Install the Google Interactive Media Ads SDK and the UID2 iOS SDK.

Install the UID2 iOS IMA Plugin v0.2.0 via Swift Package Manager to an existing app with the UID2 iOS SDK and the Google Interactive Media Ads SDK installed.

```
.package(url: https://github.com/IABTechLab/uid2-ios-plugin-google-ima.git, exact: "0.2.0")
```
