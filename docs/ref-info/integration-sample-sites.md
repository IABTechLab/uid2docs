---
title: Sample Sites Reference
description: Overview and reference for all UID2 sample site examples.
hide_table_of_contents: false
---

import Link from '@docusaurus/Link';

# UID2 Integration Samples

This page lists all official UID2 sample implementations, with links to code, live demo sites, related documentation, and common use cases. Use this page to quickly find, compare, and switch between sample integrations that may match your setup.

---

### Web Integrations

This section includes sample pages that demonstrate how organizations can integrate UID2 directly into their websites to generate and manage UID2 tokens used for targeted advertising. For details, see [Web Integration Overview](https://unifiedid.com/docs/guides/integration-options-publisher-web).

#### Client-Side Integration Using UID2 JavaScript SDK

- Site: [UID2 Client-Side with JS SDK Example](https://cstg-integ.uidapi.com/)
- Code: [`uid2-web-integrations/examples/cstg`](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/cstg)
- Docs: [Client-Side Integration Guide for JavaScript](https://unifiedid.com/docs/guides/integration-javascript-client-side)
- Use Case: For publishers who prefer a fully client-side integration using the UID2 JavaScript SDK to generate and manage tokens directly in the browser. Ideal for fast prototyping with minimal backend requirements.

#### Client-Server Integration Using UID2 JavaScript SDK

- Site: [UID2 Client-Server Integration Example](https://example-jssdk-integ.uidapi.com/)
- Code: [`uid2-web-integrations/examples/js-sdk`](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/js-sdk)
- Docs: [Client-Server Integration Guide for JavaScript](https://unifiedid.com/docs/guides/integration-javascript-client-server)
- Use Case: For publishers who want more control over UID2 token creation (handled on your servers), while using the JavaScript SDK on the client side to manage and refresh tokens in the browser.

#### UID2 Server-Only (Server-Side)

- Site: [UID2 Server-Only Integration Example](https://example-srvonly-integ.uidapi.com/login)
- Code: [`uid2-examples/publisher/server_only`](https://github.com/IABTechLab/uid2-examples/tree/main/publisher/server_only)
- Docs: [Publisher Integration Guide, Server-Side](https://unifiedid.com/docs/guides/integration-publisher-server-side)
- Use Case: For publishers who want all UID2 operations to occur on the server-side, offering maximum control, security, and flexibility without relying on a client-side SDK.

---

### Prebid.js Integrations

This section includes a sample implementation demonstrating how organizations can integrate with UID2 to generate tokens and pass UID2 identity data into header bidding auctions. For details, see [Prebid Integration Overview](https://unifiedid.com/docs/guides/integration-prebid).

#### UID2 Client-Side Integration with Prebid.js

- Site: [UID2 Prebid.js Client-Side Integration Example](https://unifiedid.com/examples/cstg-prebid-example/)
- Code: [`uid2docs/static/examples/cstg-prebid-example`](https://github.com/IABTechLab/uid2docs/tree/main/static/examples/cstg-prebid-example)
- Docs: [Client-Side Integration Guide for Prebid.js](https://unifiedid.com/docs/guides/integration-prebid-client-side)
- Use Case: For publishers using Prebid header bidding who want to generate UID2 tokens using client-side token generation to be passed by Prebid.

---

### Google Secure Signals Integrations

This section includes sample pages for passing UID2 identity data to Google's advertising systems through their Secure Signals feature. For details, see [Google Ad Manager Secure Signals Guide](https://unifiedid.com/docs/guides/integration-google-ss).

#### Client-Side Secure Signals

- Site: [UID2 Client-Side Integration Example (JS SDK + Secure Signals)](https://secure-signals-client-integ.uidapi.com)
- Code: [`uid2-web-integrations/examples/google-secure-signals-integration/client_side`](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-secure-signals-integration/client_side)
- Docs: [Secure Signals Integration Guide](https://unifiedid.com/docs/guides/integration-google-ss)
- Use Case: For publishers who want a purely client-side integration with GAM Secure Signals.

#### React Client-Side Secure Signals

- Site: [UID2 React Client-Side Integration Example with Google Secure Signals](https://secure-signals-react-integ.uidapi.com/)
- Code: [`uid2-web-integrations/examples/google-secure-signals-integration/react_client_side`](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-secure-signals-integration/react_client_side)
- Docs: [Secure Signals Integration Guide](https://unifiedid.com/docs/guides/integration-google-ss)
- Use Case: For publishers with React apps who want to integrate UID2 + Secure Signals directly into their component-based architecture.

#### Server-Side Secure Signals

- Site: [UID2 Server-Side Integration Example with Google Secure Signals](https://secure-signals-server-side-integ.uidapi.com/login)
- Code: [`uid2-web-integrations/examples/google-secure-signals-integration/server_side`](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-secure-signals-integration/server_side)
- Docs: [Secure Signals Integration Guide](https://unifiedid.com/docs/guides/integration-google-ss)
- Additional Site Domains:
  - [https://secure-signals-srvonly-integ.uidapi.com](https://secure-signals-srvonly-integ.uidapi.com)
  - [https://esp-srvonly-integ.uidapi.com](https://esp-srvonly-integ.uidapi.com)
- Use Case: For publishers who want all Secure Signals and UID2 logic server-side for better control and security.

#### Client-Server Secure Signals

- Site: [UID2 Client-Server Integration Example (Server + JS SDK + Secure Signals)](https://secure-signals-client-server-integ.uidapi.com/)
- Code: [`uid2-web-integrations/examples/google-secure-signals-integration/with_sdk_v3`](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-secure-signals-integration/with_sdk_v3)
- Docs: [Secure Signals Integration Guide](https://unifiedid.com/docs/guides/integration-google-ss)
- Additional Site Domains:
  - [https://secure-signals-jssdk-integ.uidapi.com](https://secure-signals-jssdk-integ.uidapi.com)
  - [https://esp-jssdk-integ.uidapi.com](https://esp-jssdk-integ.uidapi.com)
- Use Case: For publishers who want a hybrid approach (token generation on the server, client-side logic for secure signals).

---

### Utilities

#### UID2 Hashing Tool

- Site: [UID2 Hashing Tool](https://unifiedid.com/examples/hashing-tool/)
- Code: [`uid2Docs/static/examples/hashing-tool`](https://github.com/IABTechLab/uid2docs/tree/main/static/examples/hashing-tool)
- Docs: [Normalization and Encoding](https://unifiedid.com/docs/getting-started/gs-normalization-encoding)
- Use Case: For developers or clients validating data preparation, such as hashing and normalization of emails before token requests.

---

:::note
The Sample Sites above highlight some common integrations, but do not represent all available UID2 integration options. For a summary of all the integration options available, see [UID2 Integration Guides Overview](https://unifiedid.com/docs/guides/summary-guides).
:::
