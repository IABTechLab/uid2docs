---
title: UID Verify Chrome Extension
description: How to use the UID Verify Chrome extension to debug and inspect UID2 or EUID integrations on any web page.
hide_table_of_contents: false
sidebar_position: 03
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# UID Verify Chrome Extension

UID Verify is a browser extension for debugging UID2 and EUID integrations. It inspects the UID2 or EUID implementation on the current page in real time, surfacing SDK configuration, identity storage, event history, and errors — without requiring any code changes to the page.

The extension supports integrations using the <Link href="../sdks/sdk-ref-javascript">UID2 JavaScript SDK</Link>, <Link href="https://docs.prebid.org/dev-docs/modules/userId.html">Prebid.js</Link>, and <Link href="../guides/integration-google-ss">Google Secure Signals</Link>.

## Overview

When integrating UID2 or EUID, it can be difficult to tell whether the SDK is initializing correctly, whether tokens are valid, or where in the lifecycle an error is occurring. UID Verify solves this by reading the SDK state, storage, and event stream directly from the page and presenting it in a structured, searchable interface.

The extension detects whether a page uses the UID2 SDK directly, Prebid.js, or Google Secure Signals (or a combination), and adjusts the displayed information accordingly. It supports both UID2 and EUID deployments.

## Prerequisites

UID Verify requires:

- **Google Chrome** or **Microsoft Edge** browser
- A web page that has a UID2 or EUID integration — one of the following must be present on the page:
  - The <Link href="../sdks/sdk-ref-javascript">UID2 JavaScript SDK</Link> (`window.__uid2`) or EUID JavaScript SDK (`window.__euid`)
  - <Link href="https://docs.prebid.org/dev-docs/modules/userId.html">Prebid.js</Link> with a UID2 or EUID user ID module configured
  - <Link href="https://developers.google.com/publisher-tag/guides/secure-signals">Google Publisher Tags (GPT)</Link> with a UID2 or EUID Secure Signals provider registered

If more than one integration type is detected, you can switch between them using the integration type tabs at the top of the popup. If neither a UID2/EUID SDK, Prebid.js, nor Google Secure Signals integration is detected, the popup displays a message indicating that no supported integration was found.

## Installing the Extension

Install UID Verify from the Chrome Web Store:

1. Go to the [UID Verify listing](https://chromewebstore.google.com/detail/uid-detective/cfpjjmdagnkmmolcddnoagffeoekkmle) in the Chrome Web Store.
2. Click **Add to Chrome**.
3. When prompted, click **Add extension**.
4. Pin the extension to your toolbar for easy access: click the Extensions icon in your browser, then click the pin icon next to UID Verify.

## Using UID Verify

1. Navigate to a web page that has a UID2 or EUID integration.
2. Click the **UID Verify** icon in your browser toolbar to open the extension popup.
3. The extension detects the integration type on the page and displays the appropriate tabs.

:::note
If both a UID2 and an EUID integration are detected on the same page, the extension displays an error. A page should use either UID2 (for North America and parts of Asia) or EUID (for Europe and other GDPR-applicable regions), not both.
:::

## Interpreting Results

### Config Tab

The **Config** tab provides a snapshot of the integration's current state.

**For SDK integrations, this includes:**

- SDK version
- SDK initialization options
- The current identity object, including:
  - Advertising token
  - Refresh token
  - Token and refresh expiration timestamps
- The result of `getAdvertisingToken()`
- The result of `isLoginRequired()`
- Status banners highlighting any issues (for example, outdated SDK version, opted-out identity, or missing configuration)

**For Prebid.js integrations, this includes:**

- Whether Prebid.js is detected and the UID2/EUID module is active
- The user ID configuration from `pbjs.getUserIds()`
- Token validity status

**For Google Secure Signals integrations, this includes:**

- Whether Google Publisher Tags is detected
- Whether the UID2 or EUID provider ID is registered
- Whether `getAdvertisingTokenAsync` is available
- The registered collector function code
- A status banner indicating whether the Secure Signals configuration is complete

### Storage Tab

The **Storage** tab shows the raw identity data stored in the browser for the current integration.

**For SDK integrations:**

| Field | Description |
|---|---|
| Storage Type | Whether the identity is stored in a cookie or `localStorage`. |
| Storage Key | The name of the cookie or `localStorage` key (`__uid_2`, `__euid`, `UID2-sdk-identity`, or `EUID-sdk-identity`). |
| Stored Value | The raw identity JSON with syntax highlighting. |
| Validity | Whether the stored identity is currently valid or opted out. |

**For Prebid.js integrations**, the tab shows the Prebid token storage location and current value.

**For Google Secure Signals integrations**, the tab shows the cached Secure Signals value (stored under `_GESPSK-uidapi.com` for UID2 or `_GESPSK-euid.eu` for EUID) and whether the signal was sent via the SDK or Prebid.

### Callbacks Tab

The **Callbacks** tab is available for SDK integrations only. It displays the source code of all callback functions registered with the SDK, with syntax highlighting. This is useful for confirming that the correct callbacks are wired up and identifying where events are being handled in the page code.

### Event History Tab

The **Event History** tab shows a searchable, real-time log of SDK events as they occur on the page. Each row in the table includes:

| Column | Description |
|---|---|
| Date | The date the event was recorded. |
| Time | The time the event was recorded. |
| Event | The event type (for example, `SdkLoaded`, `InitCompleted`, `TokenUpdated`). |
| Advertising Token | The advertising token associated with the event, if present. |

Use the search bar to filter by event type or token value.

This tab also includes an **Error Log** when errors are detected. The extension captures several categories of errors: failed network requests to the UID2 operator, failed resource loads (such as the SDK script), `console.error` calls from SDK code, and errors thrown by SDK methods.

For known error patterns, the extension displays contextual troubleshooting guidance alongside the error.
