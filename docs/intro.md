---
title: UID2 Overview
description: Introduction to UID2 documentation.
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

# Unified ID 2.0 Overview

UID2 is a framework that enables deterministic identity for advertising opportunities on the open internet for many [participants](#participants) across the advertising ecosystem. The UID2 framework enables consumer experiences from publisher websites, mobile apps, and Connected TV (CTV) apps to be monetized through programmatic workflows. Built as an open-source, standalone solution with its own unique namespace, the framework offers the user transparency and privacy controls designed to meet local market requirements. 

:::note
The term "UID2" can refer to either the framework or an actual [UID2 identifier](ref-info/ref-infrastructure.md#uid2-identifier-types).
:::

## Why UID2?

UID2 is structured to enable deterministic identity for advertising opportunities on the open internet, centered on full consumer transparency and controls. UID2s are built on hashed [DII](ref-info/glossary-uid.md#gl-dii) which is physically changed so that it cannot be reverse engineered back to a phone number or email.

This layer of deterministic identity means that an instance of online activity can be tied to a specific pseudo-anonymous synthetic identifier that can then be matched to behaviors across a user's browsing behavior in a privacy-compliant way.

Here's an example of what a [raw UID2](ref-info/glossary-uid.md#gl-raw-uid2) looks like after starting life as an email:

`AdvIvSiaum0P5s3X/7X8h8sz+OhF2IG8DNbEnkWSbYM=`

This raw UID2 is further encrypted with metadata in the bid stream to prevent any misuse of the identifier.

The result is the perfect marriage of privacy and targeted advertising, enabling consumers to be served ads that are more relevant to them while at the same time preserving anonymity. Following this open and interoperable approach, UID2 provides a collaborative framework for all participants. This facilitates a healthy open internet where consumers can consent to targeted advertising in exchange for viewing quality content, without compromising their privacy.

## Additional Resources

For overview information, refer to the following sections:

- [UID2 Principles](ref-info/ref-principles.md)
- [UID2 Infrastructure](ref-info/ref-infrastructure.md)
- [UID2 Participants](ref-info/ref-participants.md)
- [Frequently Asked Questions](getting-started/gs-faqs.md)

## Getting Started

When you're ready to get started, first review the overview page that's applicable to your role:

- [UID2 Overview for Publishers](overviews/overview-publishers.md)
- [UID2 Overview for Advertisers](overviews/overview-advertisers.md)
- [UID2 Overview for DSPs](overviews/overview-dsps.md)
- [UID2 Overview for Data Providers](overviews/overview-data-providers.md)

To request an account, see [Account Setup](getting-started/gs-account-setup.md).

## License
All work and artifacts are licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.txt).
