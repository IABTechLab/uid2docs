# Developer Guide for UID2 IMA Plugin (iOS and Android)

As of 2023-07-15

## Introduction

The UID2 IMA Plugin is pre-release software and should be used as such.

The UID2 IMA Plugin enables apps that use Google's IMA SDK to include
UID2 data in their ad requests. This is done automatically, with no
direct coding needed from the app developer, by:

-   The IMA SDK

-   The UID2 SDK

-   The UID2 IMA Plugin

## iOS

Refer to the following sections for iOS:

-   Requirements

-   Installation

-   Troubleshooting

### Requirements 

Install the following:

-   UID2 iOS SDK v0.1.0

-   Google IMA SDK v3.18.5

-   UID2 iOS IMA Plugin v0.1.0

### Installation

Install the UID2 iOS IMA Plugin v0.1.0 via Swift Package Manager to an
existing app with UID2 SDK and Google IMA SDK installed.

```
.package(url: https://github.com/IABTechLab/uid2-ios-plugin-google-ima.git, exact: "0.1.0")
```

### Troubleshooting

Google's IMA SDK does not currently support Swift Package Manager (SPM).
This might result in some dependency issues. When Google is ready with
SPM support, the UID2 IMA Plugin will be updated to use SPM.

To resolve any issue that might arise, it's recommended that you copy
the two source code files from the UID2 IMA Plugin directly into your
app. Be sure to use the same class and file names, to ensure that Google
IMA can find the files at runtime. The two files are:

-   UID2IMASecureSignalsAdapter.swift

-   UID2GoogleAdapterErrors.swift

## Android

Refer to the following sections for Android:

-   Requirements

-   Installation

-   Troubleshooting

### Requirements

Install the following:

-   UID2 Android SDK v0.1.0

-   Google IMA SDK v3.29.0 ([ONLY 3.29.0 not any higher version](https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side/history))

-   UID2 Android IMA Plugin v0.1.0

### Installation 

Install the UID2 Android IMA Plugin v0.1.0 via Gradle / Maven to an
existing app with the UID2 Android SDK and Google IMA SDK installed.

#### Gradle 
To install with Gradle, add the SDK as a dependency in the build.gradle
file:

```
implementation 'com.uid2:uid2-android-sdk-ima:0.1.0'
```

#### Maven

To install with Maven, add the SDK as a dependency in the pom.xml file:

```
<dependency>
    <groupId>com.uid2</groupId>
    <artifactId>uid2-android-sdk-ima</artifactId>
    <version>0.1.0</version>
</dependency>
```

### Troubleshooting

There has been an occasional issue with Google IMA SDK v3.30.0 not
running when used in non-Android TV apps. This is due to the inclusion
of com.google.android.tv:tv-ads:1.0.0-alpha as a dependency. To resolve
the problem, revert back to Google IMA SDK v3.29.0.
