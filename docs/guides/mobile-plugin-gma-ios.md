---
title: UID2 GMA Plugin for iOS
description: A guide for publishers using GMA for ad requests on iOS apps.
hide_table_of_contents: false
sidebar_position: 13
---

import Link from '@docusaurus/Link';

# UID2 GMA Plugin for iOS Integration Guide

The UID2 Google Mobile Ads (GMA) Plugin for iOS enables publishers that use the [Google Mobile Ads (GMA) SDK](https://developers.google.com/ad-manager/mobile-ads-sdk) to send [UID2 tokens](../ref-info/glossary-uid.md#gl-uid2-token) as [secure signals](https://support.google.com/admob/answer/11556288) in ad requests from iOS apps. This is done automatically, with no direct coding needed from the app developer.

## Functionality

This plugin simplifies integration with Google Mobile Ads (GMA) for any publishers who want to support UID2 for apps running on iOS devices.

## Version

<!-- As of 2024-04-17 -->

This documentation is for the UID2 GMA Plugin for iOS version 0.3.0 or later.

## GitHub Repository

This plugin is in the following open-source GitHub repository:

- [https://github.com/IABTechLab/uid2-ios-plugin-google-gma](https://github.com/IABTechLab/uid2-ios-plugin-google-gma)

## Requirements 

To run this plugin, install the following:

1. Google Mobile Ads SDK v10.7.0 or later:
   - [SDK](https://developers.google.com/admob/ios)
   - [Release Notes](https://developers.google.com/admob/ios/rel-notes)
1. UID2 SDK for iOS v0.3.0 or later:
   - [SDK](https://github.com/IABTechLab/uid2-ios-sdk)
   - [UID2 SDK for iOS Reference Guide](../sdks/uid2-sdk-ref-ios.md)
1. [UID2 GMA Plugin for iOS v0.3.0](https://github.com/IABTechLab/uid2-ios-plugin-google-gma)

## Installation

Prerequisite: Install the Google Mobile Ads SDK and the UID2 SDK for iOS.

Install the UID2 iOS GMA Plugin via Swift Package Manager or CocoaPods to an existing app with the UID2 SDK for iOS and the Google Mobile Ads SDK installed.

There are three installation options:

-   [Package.swift](#installing-with-packageswift)
-   [Xcode](#installing-with-xcode)
-   [CocoaPods](#installing-with-cocoapods)

### Installing with Package.swift

Add the following dependency to Package.swift:

```js
dependencies: [
  .package(url: "https://github.com/IABTechLab/uid2-ios-plugin-google-gma.git", exact: "0.3.0")
]
```

### Installing with Xcode

Add the following entry in the Package Dependencies for your apps:

| Name | Location | Dependency Rule                         |
| :--- | :--- |:----------------------------------------| 
| uid2-ios-plugin-google-gma | `git@github.com:IABTechLab/uid2-ios-plugin-google-gma.git` | Exact Version: 0.3.0 |

### Installing with CocoaPods

Add the following entry in your `Podfile`:

```
pod 'UID2GMAPlugin', '0.3.0'
```
