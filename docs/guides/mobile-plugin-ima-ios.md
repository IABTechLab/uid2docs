# UID2 IMA Plugin for iOS Integration Guide

The  UID2 Interactive Media Ads (IMA) Plugin for iOS enables publishers that use the [Google Interactive Media Ads SDK](https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/) to include UID2 data in ad requests from iOS apps. This is done automatically, with no direct coding needed from the app developer.

## Functionality

This plugin simplifies integration with Google Interactive Media Ads (IMA) for any publishers who want to support UID2 for apps running on iOS devices.

## Version

<!-- As of 2023-07-15 -->

This documentation is for the UID2 IMA Plugin for iOS version 0.1.0.


## GitHub Repository

**GWH_SW do you know the repo for this?**

## Requirements 

To run this plugin, install the following:

1. Google IMA SDK v3.18.5
1. [UID2 iOS SDK v0.2.0](../sdks/uid2-sdk-ref-ios.md)
1. UID2 IMA Plugin for iOS v0.1.0

## Installation

Prerequisite: Install the Google Interactive Media Ads SDK and the UID2 iOS SDK.

Install the UID2 iOS IMA Plugin v0.1.0 via Swift Package Manager to an existing app with the UID2 iOS SDK and the Google Interactive Media Ads SDK installed.

```
.package(url: https://github.com/IABTechLab/uid2-ios-plugin-google-ima.git, exact: "0.1.0")
```

## Troubleshooting 

Google's IMA SDK does not currently support Swift Package Manager (SPM). This might result in some dependency issues. When Google is ready with SPM support, the UID2 IMA Plugin will be updated to use SPM.

To resolve any issue that might arise, it's recommended that you copy the two source code files from the UID2 IMA Plugin directly into your app. Be sure to use the same class and file names, to ensure that the Google IMA SDK can find the files at runtime. The two files are:

- `UID2IMASecureSignalsAdapter.swift`
- `UID2GoogleAdapterErrors.swift`
