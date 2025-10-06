---
title: Integration Samples and Tools
description: Overview and reference for all UID2 sample site examples.
hide_table_of_contents: false
---

import Link from '@docusaurus/Link';

# Integration Samples and Tools

This page lists all official UID2 sample implementations highlighting common integration use cases, along with links to live demo sites, source code, and related documentation. Use this page to quickly identify which sample matches your needs and explore working examples.

## Web Integrations

This section summarizes the sample integrations available for integrating UID2 directly into websites. For integration options by participant type, see [Publisher Web Integration Overview](https://unifiedid.com/docs/guides/integration-options-publisher-web) or [Advertiser/Data Provider Integration Overview](https://unifiedid.com/docs/guides/integration-advertiser-dataprovider-overview).

### Client-Side Integration Using UID2 SDK for JavaScript

This sample is for publishers who prefer a fully client-side integration using the [SDK for JavaScript Reference Guide](https://unifiedid.com/docs/sdks/sdk-ref-javascript) to generate and manage tokens directly in the browser. This approach is ideal for fast prototyping with minimal back-end requirements.

- Site: [UID2 Publisher Client-Side Integration Example using UID2 JavaScript SDK](https://cstg-integ.uidapi.com/)
- Code: [uid2-web-integrations/examples/cstg](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/cstg)
- Doc: [Client-Side Integration Guide for JavaScript](https://unifiedid.com/docs/guides/integration-javascript-client-side)

### Client-Server Integration Using UID2 SDK for JavaScript

This sample is for publishers who want more control over UID2 token creation (handled on your servers), while using the SDK for JavaScript on the client side to manage and refresh tokens in the browser.

- Site: [UID2 SDK Integration Example](https://example-jssdk-integ.uidapi.com/)
- Code: [uid2-web-integrations/examples/js-sdk](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/js-sdk)
- Doc: [Client-Server Integration Guide for JavaScript](https://unifiedid.com/docs/guides/integration-javascript-client-server)

### UID2 Server-Only (Server-Side)

This sample is for publishers who want all UID2 operations to occur on the server side, offering maximum control, security, and flexibility without relying on a client-side SDK.

- Site: [Server-Only UID2 Integration Example](https://example-srvonly-integ.uidapi.com/login)
- Code: [uid2-examples/publisher/server_only](https://github.com/IABTechLab/uid2-examples/tree/main/publisher/server_only)
- Doc: [Publisher Integration Guide, Server-Side](https://unifiedid.com/docs/guides/integration-publisher-server-side)

## Prebid.js Integrations

This section includes a sample page for generating UID2 tokens to be passed by Prebid.js in the RTB bidstream. For details, see [UID2 Integration Overview for Prebid](https://unifiedid.com/docs/guides/integration-prebid).

### Client-Side Integration with Prebid.js

This sample is for publishers who want to generate UID2 tokens on the client side and pass them into header bidding auctions using Prebid.js.

- Site: [UID2 Prebid.js Client-Side Integration Example](https://unifiedid.com/examples/cstg-prebid-example/)
- Code: [uid2docs/static/examples/cstg-prebid-example](https://github.com/IABTechLab/uid2docs/tree/main/static/examples/cstg-prebid-example)
- Doc: [UID2 Client-Side Integration Guide for Prebid.js](https://unifiedid.com/docs/guides/integration-prebid-client-side)

## Google Secure Signals Integrations

This section includes sample pages for passing UID2 identity data to Google's advertising systems through their Secure Signals feature. For details, see [Google Ad Manager Secure Signals Integration Guide](https://unifiedid.com/docs/guides/integration-google-ss).

### Client-Side Secure Signals

This sample is for publishers who want a purely client-side integration with GAM Secure Signals.

- Site: [UID2 Publisher Client-Side Integration Example using UID2 JavaScript SDK, Secure Signals](https://secure-signals-client-side-integ.uidapi.com/)
- Code: [uid2-web-integrations/examples/google-secure-signals-integration/client_side](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-secure-signals-integration/client_side)
- Doc: [Google Ad Manager Secure Signals Integration Guide](https://unifiedid.com/docs/guides/integration-google-ss)

### React Client-Side Secure Signals

This sample is for publishers with React apps who want to integrate UID2 + Secure Signals directly into their component-based architecture.

- Site: [UID2 React Client-Side Integration Example with Google Secure Signals](https://secure-signals-react-integ.uidapi.com/)
- Code: [uid2-web-integrations/examples/google-secure-signals-integration/react_client_side](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-secure-signals-integration/react_client_side)
- Doc: [Google Ad Manager Secure Signals Integration Guide](https://unifiedid.com/docs/guides/integration-google-ss)

### Server-Side Secure Signals

This sample is for publishers who want all Secure Signals and UID2 logic server-side for better control and security.

- Site: [Server-Side UID2 Integration Example with Google Secure Signals](https://secure-signals-server-side-integ.uidapi.com/login)
- Code: [uid2-web-integrations/examples/google-secure-signals-integration/server_side](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-secure-signals-integration/server_side)
- Doc: [Google Ad Manager Secure Signals Integration Guide](https://unifiedid.com/docs/guides/integration-google-ss)
- Additional site domains:
  - [https://secure-signals-srvonly-integ.uidapi.com](https://secure-signals-srvonly-integ.uidapi.com)
  - [https://esp-srvonly-integ.uidapi.com](https://esp-srvonly-integ.uidapi.com)

### Client-Server Secure Signals

This sample is for publishers who want a hybrid approach with token generation on the server and client-side logic for secure signals.

- Site: [Example for Client-Server UID2 SDK Integration with Google Secure Signals](https://secure-signals-client-server-integ.uidapi.com/)
- Code: [uid2-web-integrations/examples/google-secure-signals-integration/with_sdk_v3](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-secure-signals-integration/with_sdk_v3)
- Doc: [Google Ad Manager Secure Signals Integration Guide](https://unifiedid.com/docs/guides/integration-google-ss)
- Additional site domains:
  - [https://secure-signals-jssdk-integ.uidapi.com](https://secure-signals-jssdk-integ.uidapi.com)
  - [https://esp-jssdk-integ.uidapi.com](https://esp-jssdk-integ.uidapi.com)

## UID2 Hashing Tool

This tool is for developers or clients validating data preparation, such as hashing and normalization of emails before token requests. The tool is available at the following links:

- Site: [UID2 Hashing Tool](https://unifiedid.com/examples/hashing-tool/)
- Code: [uid2docs/static/examples/hashing-tool](https://github.com/IABTechLab/uid2docs/tree/main/static/examples/hashing-tool)
- Doc: [Normalization and Encoding](https://unifiedid.com/docs/getting-started/gs-normalization-encoding)

:::note
The sample sites in this file highlight some common integrations, but do not represent all available UID2 integration options. For a summary of all the integration options available, see [UID2 Integration Guides: Summary](https://unifiedid.com/docs/guides/summary-guides).
:::
