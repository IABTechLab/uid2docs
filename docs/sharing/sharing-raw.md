---
title: Raw UID2 Sharing
description: Learn about sharing raw UID2s with other trusted sharing participants.
hide_table_of_contents: false
sidebar_position: 08
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Raw UID2 Sharing

[Sharing participants](ref-info/glossary-uid.md#gl-sharing-participant) who want to share [raw UID2s](../ref-info/glossary-uid.md#gl-raw-uid2) with another authorized sharing participant must adhere to the responsibilities of authentication, authorization, accounting, and secure transport, as specified in [Security Requirements for UID2 Sharing](sharing-security.md). Make sure that all points are rigorously followed.

:::note
It's important to honor user opt-out status. Before sharing raw UID2s with another authorized sharing participant, check the opt-out status of the raw UID2s, using the [POST&nbsp;/optout/status](../endpoints/post-optout-status.md) endpoint. Do not share raw UID2s that have been opted out.
:::
