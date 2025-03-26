---
title: UID2 Components
description: Summary of key components of the UID2 technical infrastructure.
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# UID2 Components

The UID2 framework consists of the following components, all of which are currently managed by The Trade Desk.

| Component | Description |
| :--- | :--- |
| **Core Service** | A centralized service that manages access to <a href="../ref-info/glossary-uid#gl-salt">salts</a>, <a href="../ref-info/glossary-uid#gl-encryption-key">encryption keys</a>, and other relevant data in the UID2 ecosystem. | 
| **Operator Service** | A service that enables the management and storage of encryption keys and salts from the UID2 Core Service, hashing of users' personal data, encryption of raw UID2s, and decryption of UID2 tokens. There can be multiple instances of the service (public or private) operated by multiple [participants](../overviews/participants-overview.md#uid2-component-services), known as operators.<br/><Link href="../ref-info/glossary-uid#gl-public-operator">Public Operators</Link> run publicly available instances of the <Link href="../ref-info/glossary-uid#gl-operator-service">Operator Service</Link> and make them available to all relevant UID2 participants. There might also be <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operators</Link> that run private instances of the Operator Service exclusively for their own use. All instances are designed with protections to keep critical UID2 data secure and interoperable, regardless of who operates the service. |
| **Opt-Out Service** | A global service that manages and stores user opt-out requests and disseminates them to publishers, operator service instances, and DSPs. |
| **Transparency and Control Portal** | A user-facing website, [https://www.transparentadvertising.com/](https://www.transparentadvertising.com/), that allows consumers to opt out of UID2 at any time. |
