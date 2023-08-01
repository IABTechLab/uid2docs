# Developer Guide for UID2 GMA Plugin (iOS and Android)
<!-- Sunny comment on https://github.com/IABTechLab/uid2docs/pull/231: "Developer Guide for UID2 Google Mobile Ads (GMA) Plugin (For iOS and Android) / and same for ima (Interactive Media Ads) page."  -->
<!-- Also from Sunny: Where is this page linked from? Should we have a mobile app integration guide page on these mobile sdk/GMA page? Or should we start small and just add on
https://unifiedid.com/docs/overviews/overview-publishers / Under resources section to say for mobile app integration, check the mobile sdk/gma guide? -->
<!-- Also: Refer to it as The UID2 Google Mobile Ads (GMA) Plugin once here and leave all other mentioning to The UID2 GMA Plugin just to make it clear -->
As of 2023-07-15 plugin version:
* iOS V 0.2.0
* Android V 0.4.0

## Introduction

<!-- The UID2 GMA Plugin is pre-release software and should be used as such. REMOVING PER COMMENT FROM SUNNY IN IOS/ANDROID PR https://github.com/IABTechLab/uid2docs/pull/231 -->

The  UID2 Google Mobile Ads (GMA) Plugin (UID2 GMA Plugin) enables apps that use the Google Mobile Ads (GMA) SDK to include UID2 data in their ad requests. This is done automatically, with no direct coding needed from the app developer, by:

-   The GMA Plugin for iOS / GMA Plugin for Android <!-- this was an edit from Sunny on https://github.com/IABTechLab/uid2docs/pull/231. But the doc is not split yet so I included both here -->

-   The UID2 SDK for iOS / UID2 SDK for Android <!-- this was an edit from Sunny on https://github.com/IABTechLab/uid2docs/pull/231. But the doc is not split yet so I included both here -->

-   The UID2 GMA Plugin

## iOS 

<!-- Refer to the following sections for iOS:

-   Requirements

-   Installation // REMOVING THESE LINES PER COMMENT FROM SUNNY IN IOS/ANDROID PR https://github.com/IABTechLab/uid2docs/pull/231 "don't think we need line 23-27 - it's redundant (same for IMA)"-->

### Requirements 

Install the following:

-   UID2 iOS SDK v0.2.0
-   [Google Mobile Ad SDK v10.7.0+](https://developers.google.com/admob/ios/rel-notes)
-   UID2 iOS GMA Plugin v0.2.0

## GitHub Open-Source Repository

This plugin is in the following open-source GitHub repository:

- [https://github.com/IABTechLab/uid2-ios-plugin-google-gma](https://github.com/IABTechLab/uid2-ios-plugin-google-gma)

https://github.com/IABTechLab/uid2-android-sdk/tree/main/securesignals-gma

### Installation

Install the UID2 iOS IMA Plugin v0.1.0 via Swift Package Manager to an
existing app with UID2 SDK and Google Mobile Ad SDK installed.

```
.package(url: https://github.com/IABTechLab/uid2-ios-plugin-google-gma.git, exact: "0.2.0")
```

### Troubleshooting 

To resolve any issue that might arise, it's recommended that you copy the two source code files from the UID2 GMA Plugin directly into your app. Be sure to use the same class and file names, to ensure that Google Mobile Ad SDK can find the files at runtime. The two files are:

-   UID2GMASecureSignalsAdapter.swift

-   AdvertisingTokenNotFoundError.swift

<!-- ## Android 

Refer to the following sections for Android:

-   Requirements

-   Installation

-   Troubleshooting // REMOVING THESE LINES PER COMMENT FROM SUNNY IN IOS/ANDROID PR https://github.com/IABTechLab/uid2docs/pull/231 -->

### Requirements

Install the following:

-   UID2 Android SDK v0.4.0
-   [Google Mobile Ad SDK v22.0.0+](https://developers.google.com/admob/android/sdk)
-   UID2 Android GMA Plugin v0.4.0

## GitHub Open-Source Repository <!-- (for Android doc only) -->

This plugin is in the following open-source GitHub repository:

- [https://github.com/IABTechLab/uid2-android-sdk/tree/main/securesignals-gma](https://github.com/IABTechLab/uid2-android-sdk/tree/main/securesignals-gma)

### Installation 

Install the UID2 Android GMA Plugin v0.4.0 via Gradle / Maven to an
existing app with the UID2 Android SDK and Google IMA SDK installed.

#### Gradle 

To install with Gradle, add the SDK as a dependency in the build.gradle
file:

```
implementation \'com.uid2:uid2-android-sdk-gma:0.4.0\'
```

#### Maven 

To install with Maven, add the SDK as a dependency in the pom.xml file:

```
<dependency>
    <groupId>com.uid2</groupId>
    <artifactId>uid2-android-sdk-gma</artifactId>
    <version>0.4.0</version>
</dependency>
```