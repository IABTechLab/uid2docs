---
title: UID Verify Chrome Extension
description: How to use the UID Verify Chrome extension to debug and inspect UID2 integrations on any web page.
hide_table_of_contents: false
sidebar_position: 03
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# UID Verify Chrome Extension

UID Verify is a browser extension for debugging UID2 integrations. It inspects the UID2 implementation on the current page in real time, surfacing UID2 SDK configuration, identity storage, event history, and errors.

The extension supports integrations using the <Link href="../sdks/sdk-ref-javascript">SDK for JavaScript</Link>, <Link href="../guides/integration-prebid">Prebid.js</Link>, and <Link href="../guides/integration-google-ss">Google Secure Signals</Link>.

## Overview

When integrating UID2, it can be difficult to tell whether the UID2 SDK is initializing correctly, whether tokens are valid, or where in the lifecycle an error is occurring. UID Verify helps debug this by reading the UID2 SDK configuration, identity data, and event stream directly from the page and presenting it in a structured, searchable interface.

The extension detects whether a page uses the UID2 SDK directly, Prebid.js, or Google Secure Signals (or a combination), and displays the relevant information for each integration type.

## Prerequisites

UID Verify requires:

- **Google Chrome** browser
- A web page that has a UID2 integration — one of the following must be present on the page:
  - The <Link href="../sdks/sdk-ref-javascript">SDK for JavaScript</Link> is loaded on the page (accessible via `window.__uid2`)
  - <Link href="../guides/integration-prebid">Prebid.js</Link> with a UID2 user ID module configured
  - <Link href="https://developers.google.com/publisher-tag/guides/secure-signals">Google Publisher Tags (GPT)</Link> with a UID2 Secure Signals provider registered

If more than one integration type is detected, you can switch between them using the integration type tabs at the top of the popup.

:::note
Server-side integrations are not currently supported. UID Verify works by reading client-side signals such as browser storage and UID2 SDK globals, which are not present in a server-side integration.
:::

## Installing the Extension

To install UID Verify from the Chrome Web Store, follow these steps:

1. Go to the [UID Verify listing](https://chromewebstore.google.com/detail/uid-verify/cfpjjmdagnkmmolcddnoagffeoekkmle) in the Chrome Web Store.
2. Click **Add to Chrome**.
3. When prompted, click **Add extension**.
4. Pin the extension to your toolbar for easy access: click the Extensions icon in your browser, then click the pin icon next to UID Verify.

## Using UID Verify

1. Navigate to a web page that has a UID2 integration.
2. Click the **UID Verify** icon in your browser toolbar to open the extension popup.
3. The extension detects the integration type on the page and displays the appropriate tabs.

:::note
UID Verify supports both UID2 and EUID. A page should use either UID2 (for North America and parts of Asia) or EUID (for Europe and other GDPR-applicable regions), not both. If both are detected on the same page, the extension displays an error.
:::

## Interpreting Results

### Config Tab

The **Config** tab provides a snapshot of the integration's current state, including status banners for successful token generation, errors, opt-out identities, and other configuration states. The information displayed depends on the integration type:

**UID2 SDK integrations:**

- UID2 SDK version
- UID2 SDK initialization options
- The current identity object, including:
  - Advertising token
  - Refresh token
  - Token and refresh expiration timestamps
- The result of `getAdvertisingToken()`
- The result of `isLoginRequired()`

**Prebid.js integrations:**

- The current UID2 token from `window.pbjs.getUserIds().uid2`
- The Prebid.js configuration parameters from `window.pbjs.getConfig().userSync.userIds` (for example, `uid2ApiBase`, `subscriptionId`, `serverPublicKey`)

**Google Secure Signals integrations:**

- Whether Google Publisher Tags is detected
- Whether the UID2 provider ID is registered
- Whether `getAdvertisingTokenAsync` is available
- Whether a collector function is registered (the function that passes the UID2 token as an encrypted signal to Google Ad Manager)

### Storage Tab

The **Storage** tab shows the raw identity data stored in the browser for the current integration.

**For UID2 SDK and Prebid.js integrations:**

| Field | Description |
|---|---|
| Storage Type | Whether the identity is stored in a cookie or `localStorage`. |
| Storage Key | The name of the cookie or `localStorage` key. For UID2 SDK integrations: `__uid_2` or `UID2-sdk-identity`. For Prebid.js integrations: `__uid2_advertising_token`. |
| Stored Value | The raw identity JSON, including `advertising_token`, `refresh_token`, `identity_expires`, `refresh_expires`, `refresh_from`, and `refresh_response_key`. |
| Valid Identity | Whether the stored identity is currently valid — that is, the advertising token has not expired and the user has not opted out. |
| Optout Identity | Whether the identity reflects an opted-out user. |

**For Google Secure Signals integrations**, the tab shows the status of the secure signal and the current UID2 advertising token. If no signal has been generated yet, it indicates that neither a cached signal nor a UID2 SDK advertising token is available. Once the token is available, it confirms that it will be included in bid requests to Google Ad Manager.

### Callbacks Tab

The **Callbacks** tab is available for UID2 SDK integrations only. It displays the source code of all callback functions registered with the UID2 SDK, with syntax highlighting. This is useful for confirming that the correct callbacks are wired up and identifying where events are being handled in the page code.

### Event History Tab

The **Event History** tab shows a searchable, real-time log of UID2 SDK events as they occur on the page. Each row in the table includes:

| Column | Description |
|---|---|
| Date | The date the event was recorded. |
| Time | The time the event was recorded. |
| Event | The event type (for example, `SdkLoaded`, `InitCompleted`, `TokenUpdated`). |
| Advertising Token | The advertising token associated with the event, if present. |

Use the search bar to filter by event type or token value.

This tab also includes an **Error Log** when errors are detected. The extension captures several categories of errors: failed network requests to the UID2 operator, failed resource loads (such as the UID2 SDK script), `console.error` calls from UID2 SDK code, and errors thrown by UID2 SDK methods.

For known error patterns, the extension displays contextual troubleshooting guidance alongside the error.
