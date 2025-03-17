---
title: UID2 Overview
description: Introduction to UID2 documentation.
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Unified ID 2.0 Overview

UID2 is a framework that enables deterministic identity for advertising opportunities on the open internet for many [participants](overviews/participants-overview.md#uid2-external-participants) across the advertising ecosystem. The UID2 framework enables publisher websites, mobile apps, and Connected TV (CTV) apps to monetize through programmatic workflows. Built as an open-source, standalone solution with its own unique namespace, the framework offers privacy controls designed to help participants meet local market requirements.

:::note
The term "UID2" can refer to either the framework or an actual identifier. Unless otherwise indicated, this page provides an overview of the UID2 framework.
:::

## Guiding Principles

The UID2 framework has the following principles as its foundation:

- **First-party relationships**: UID2 enables advertisers to activate their first-party data on publisher websites across the open internet.

- **Non-proprietary (universal) standard**: All [participants](overviews/participants-overview.md#uid2-external-participants) in the advertising ecosystem who execute an appropriate participation agreement can access UID2.

- **Open source**: The source code for the [UID2 Component Services](overviews/participants-overview.md#uid2-component-services) is publicly available.

- **Interoperable**: The framework allows other identity solutions (commercial and proprietary) to integrate and provide UID2 tokens with their offerings.

- **Secure and encrypted data**: UID2 leverages multiple layers of security to help protect user and other participant data.

- **Consumer control**: Consumers can opt out of UID2 at any time through the [Transparency and Control Portal](https://www.transparentadvertising.com/).

### Technical Design Principles

The UID2 framework is built on the following technical principles:

- **Distributed integration**: Multiple certified integration paths provide options for publishers, advertisers, and third-party data providers to manage and exchange UID2 tokens.

- **Decentralized storage**: The framework does not have centralized storage for personal data (<Link href="ref-info/glossary-uid#gl-dii">DII</Link>) mappings. All participants maintain only their own data.

- **Lean infrastructure**: The UID2 system is light and inexpensive to operate.

- **Internet scale**: The UID2 infrastructure can scale to address the continuously increasing needs of [participants](overviews/participants-overview.md#uid2-external-participants) and to meet the performance demands of specific geographic regions.

- **Self-reliant**: UID2 does not rely on external services for the processing of real-time bidding (RTB) data.

## Elements of the UID2 Infrastructure

For details, see [UID2 Infrastructure](ref-info/uid-infrastructure.md).

## Components

For details, see [UID2 Component Services](overviews/participants-overview.md#uid2-component-services).

## FAQs

See [Frequently Asked Questions](getting-started/gs-faqs.md).

## License
All work and artifacts are licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.txt).
