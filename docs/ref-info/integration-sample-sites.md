---
title: Integration Samples and Tools
description: Overview and reference for all UID2 sample site examples.
hide_table_of_contents: false
---

import Link from '@docusaurus/Link';

# Integration Samples and Tools

This page lists all official UID2 sample implementations highlighting common integration use cases, along with links to live demo sites, source code, and related documentation. Use this page to quickly identify which sample matches your needs and explore working examples.

All sample sites are available at [https://samples.uidapi.com/](https://samples.uidapi.com/).

## Web Integrations

This section summarizes the sample integrations available for integrating UID2 directly into websites. For integration options by participant type, see [Publisher Web Integration Overview](https://unifiedid.com/docs/guides/integration-options-publisher-web) or [Advertiser/Data Provider Integration Overview](https://unifiedid.com/docs/guides/integration-advertiser-dataprovider-overview).

### Client-Side Integration Using UID2 SDK for JavaScript

This sample is for publishers who prefer a fully client-side integration using the [SDK for JavaScript Reference Guide](https://unifiedid.com/docs/sdks/sdk-ref-javascript) to generate and manage tokens directly in the browser. This approach is ideal for fast prototyping with minimal back-end requirements.

- Site: [UID2 Publisher Client-Side Integration Example](https://js-client-side.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/javascript-sdk/client-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/javascript-sdk/client-side)
- Doc: [Client-Side Integration Guide for JavaScript](https://unifiedid.com/docs/guides/integration-javascript-client-side)

### Client-Server Integration Using UID2 SDK for JavaScript

This sample is for publishers who want more control over UID2 token creation (handled on your servers), while using the SDK for JavaScript on the client side to manage and refresh tokens in the browser.

- Site: [UID2 Client-Server Integration Example](https://js-client-server.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/javascript-sdk/client-server](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/javascript-sdk/client-server)
- Doc: [Client-Server Integration Guide for JavaScript](https://unifiedid.com/docs/guides/integration-javascript-client-server)

### React Client-Side Integration Using UID2 SDK for JavaScript

This sample is for publishers with React apps who want to integrate UID2 directly into their component-based architecture using the SDK for JavaScript.

- Site: [UID2 React Client-Side Integration Example](https://js-react.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/javascript-sdk/react-client-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/javascript-sdk/react-client-side)
- Doc: [Client-Side Integration Guide for JavaScript](https://unifiedid.com/docs/guides/integration-javascript-client-side)

### UID2 Server-Only (Server-Side)

This sample is for publishers who want all UID2 operations to occur on the server side, offering maximum control, security, and flexibility without relying on a client-side SDK.

- Site: [Server-Only UID2 Integration Example](https://server-side.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/server-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/server-side)
- Doc: [Publisher Integration Guide, Server-Side](https://unifiedid.com/docs/guides/integration-publisher-server-side)

## Prebid.js Integrations

This section includes sample pages for generating UID2 tokens to be passed by Prebid.js in the RTB bidstream. For details, see [UID2 Integration Overview for Prebid](https://unifiedid.com/docs/guides/integration-prebid).

### Client-Side Integration with Prebid.js

This sample is for publishers who want to generate UID2 tokens on the client side and pass them into header bidding auctions using Prebid.js.

- Site: [UID2 Prebid.js Client-Side Integration Example](https://prebid-client.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/prebid-integrations/client-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/prebid-integrations/client-side)
- Doc: [UID2 Client-Side Integration Guide for Prebid.js](https://unifiedid.com/docs/guides/integration-prebid-client-side)

### Client-Server Integration with Prebid.js

This sample is for publishers who want to generate UID2 tokens on the server side and pass them to Prebid.js for header bidding.

- Site: [UID2 Prebid.js Client-Server Integration Example](https://prebid-client-server.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/prebid-integrations/client-server](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/prebid-integrations/client-server)
- Doc: [UID2 Client-Server Integration Guide for Prebid.js](https://unifiedid.com/docs/guides/integration-prebid-client-server)

### Deferred Configuration with Prebid.js

This sample demonstrates how to add UID2 to Prebid.js *after* the page has loaded, using `mergeConfig()` and `refreshUserIds()`. This pattern is useful for async login flows, delayed consent, or Single Page Applications (SPAs).

- Site: [UID2 Prebid.js Deferred Integration Example](https://prebid-deferred.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/prebid-integrations/client-side-deferred](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/prebid-integrations/client-side-deferred)
- Doc: [UID2 Client-Side Integration Guide for Prebid.js](https://unifiedid.com/docs/guides/integration-prebid-client-side)

### Prebid.js with Secure Signals

This sample demonstrates how to use UID2 with Prebid.js and Google Secure Signals together.

- Site: [UID2 Prebid.js Secure Signals Integration Example](https://prebid-secure-signals.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/prebid-secure-signals](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/prebid-secure-signals)
- Doc: [Google Ad Manager Secure Signals Integration Guide](https://unifiedid.com/docs/guides/integration-google-ss)

## Google Secure Signals Integrations

This section includes sample pages for passing UID2 identity data to Google's advertising systems through their Secure Signals feature. For details, see [Google Ad Manager Secure Signals Integration Guide](https://unifiedid.com/docs/guides/integration-google-ss).

### Client-Side Secure Signals

This sample is for publishers who want a purely client-side integration with GAM Secure Signals.

- Site: [UID2 Client-Side Integration Example with Google Secure Signals](https://secure-signals-client-side.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/google-secure-signals/client-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/google-secure-signals/client-side)
- Doc: [Google Ad Manager Secure Signals Integration Guide](https://unifiedid.com/docs/guides/integration-google-ss)

### Client-Server Secure Signals

This sample is for publishers who want a hybrid approach with token generation on the server and client-side logic for secure signals.

- Site: [UID2 Client-Server Integration Example with Google Secure Signals](https://secure-signals-client-server.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/google-secure-signals/client-server](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/google-secure-signals/client-server)
- Doc: [Google Ad Manager Secure Signals Integration Guide](https://unifiedid.com/docs/guides/integration-google-ss)

### Server-Side Secure Signals

This sample is for publishers who want all Secure Signals and UID2 logic server-side for better control and security.

- Site: [UID2 Server-Side Integration Example with Google Secure Signals](https://secure-signals-server-side.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/google-secure-signals/server-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/google-secure-signals/server-side)
- Doc: [Google Ad Manager Secure Signals Integration Guide](https://unifiedid.com/docs/guides/integration-google-ss)

### React Client-Side Secure Signals

This sample is for publishers with React apps who want to integrate UID2 + Secure Signals directly into their component-based architecture.

- Site: [UID2 React Client-Side Integration Example with Google Secure Signals](https://secure-signals-react.samples.uidapi.com/)
- Code: [uid2-examples/web-integrations/google-secure-signals/react-client-side](https://github.com/IABTechLab/uid2-examples/tree/main/web-integrations/google-secure-signals/react-client-side)
- Doc: [Google Ad Manager Secure Signals Integration Guide](https://unifiedid.com/docs/guides/integration-google-ss)

## Tools

### UID2 Hashing Tool

This tool is for developers or clients validating data preparation, such as hashing and normalization of emails or phone numbers before token requests.

- Site: [UID2 Hashing Tool](https://hashing-tool.samples.uidapi.com/)
- Code: [uid2-examples/tools/hashing-tool](https://github.com/IABTechLab/uid2-examples/tree/main/tools/hashing-tool)
- Doc: [Normalization and Encoding](https://unifiedid.com/docs/getting-started/gs-normalization-encoding)

:::note
The sample sites on this page highlight some common integrations, but do not represent all available UID2 integration options. For a summary of all the integration options available, see [UID2 Integration Guides: Summary](https://unifiedid.com/docs/guides/summary-guides).
:::
