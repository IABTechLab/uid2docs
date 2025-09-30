---
title: UID2 Sample Sites Reference
description: Overview and reference for all UID2 Sample Site examples.
hide_table_of_contents: false
---

import Link from '@docusaurus/Link';

# UID2 Sites

This page lists all official UID2 sample implementations, with links to code, live demo sites, related documentation, and the primary use cases each serves. Use this page to quickly find, compare, and switch between sample integrations that match your setup.

---

### Web Integrations

Sample pages for publishers integrating UID2 directly into their websites using JavaScript or server-side logic. For more details, see [Publisher Web Integration Overview](../guides/integration-options-publisher-web.md).

#### UID2 CSTG with JavaScript SDK

- Site: [UID2 Publisher Client-Side Integration Example using UID2 JavaScript SDK](https://cstg-integ.uidapi.com/)
- Code: [`uid2-web-integrations/examples/cstg`](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/cstg)
- Docs: [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md)
- Use Case: For publishers who want a purely client-side integration with consent gating (CSTG). Best for fast prototyping or when minimal server infrastructure is available.

#### UID2 Client-Server JS SDK (no CSTG)

- Site: [UID2 Publisher Standard Integration Example](https://example-jssdk-integ.uidapi.com/)
- Code: [`uid2-web-integrations/examples/js-sdk`](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/js-sdk)
- Docs: [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md)
- Use Case: For publishers who already have a backend and want token generation centralized server-side, while still running UID2 logic on the client.

#### UID2 Server-Only (Server-Side)

- Site: [UID2 Publisher Server-Only Integration Example](https://example-srvonly-integ.uidapi.com/login)
- Code: [`uid2-examples/publisher/server_only`](https://github.com/IABTechLab/uid2-examples/tree/main/publisher/server_only)
- Docs: [Publisher Integration Guide, Server-Side](../guides/integration-publisher-server-side.md)
- Use Case: For publishers who want all UID2 logic handled server-side (no client SDK). Good for environments with strict client limitations or security requirements.

---

### Prebid Integrations

Sample pages for adding UID2 support to Prebid.js header bidding setups. For more details, see [Prebid Integration Overview](../guides/integration-prebid.md).

#### UID2 CSTG with Prebid.js

- Site: [UID2 Prebid.js Client-Side Integration Example](https://unifiedid.com/examples/cstg-prebid-example/)
- Code: [`uid2docs/static/examples/cstg-prebid-example`](https://github.com/IABTechLab/uid2docs/tree/main/static/examples/cstg-prebid-example)
- Docs: [Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md)
- Use Case: For publishers using Prebid header bidding who want client-side token generation with consent gating.

---

### Google Secure Signals Integrations

Sample pages for passing UID2 tokens to Google Ad Manager via Secure Signals. For more details, see [Google Ad Manager Secure Signals Guide](../guides/integration-google-ss.md).

#### Client-Side Secure Signals

- Site: [UID2 Publisher Client-Side Integration Example (JS SDK + Secure Signals)](https://secure-signals-client-integ.uidapi.com)
- Code: [`uid2-web-integrations/examples/google-secure-signals-integration/client_side`](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-secure-signals-integration/client_side)
- Docs: [Secure Signals Integration Guide](../guides/integration-google-ss.md)
- Use Case: For publishers who want front-end only integration with GAM Secure Signals.

#### React Client-Side Secure Signals

- Site: [UID2 Publisher Client-Side React Integration Example](https://secure-signals-react-integ.uidapi.com/)
- Code: [`uid2-web-integrations/examples/google-secure-signals-integration/react_client_side`](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-secure-signals-integration/react_client_side)
- Docs: [Secure Signals Integration Guide](../guides/integration-google-ss.md)
- Use Case: For publishers with React apps who want to integrate UID2 + Secure Signals directly into their component-based architecture.

#### Server-Side Secure Signals

- Site: [Server-Side UID2 Integration Example with Google Secure Signals](https://secure-signals-server-side-integ.uidapi.com/login)
- Code: [`uid2-web-integrations/examples/google-secure-signals-integration/server_side`](https://github.com/IABTechLab/uid2-web-integrations/tree/main/examples/google-secure-signals-integration/server_side)
- Docs: [Secure Signals Sample Implementation](../guides/integration-google-ss.md)
- Additional Domains:
  - `secure-signals-srvonly-integ.uidapi.com`
  - `esp-srvonly-integ.uidapi.com`
- Use Case: For publishers who want all Secure Signals logic server-side for better control and security.

#### Hybrid Client-Server Secure Signals (JS SDK v3)

- Site: [UID2 Publisher Hybrid Integration Example (Server + JS SDK + Secure Signals)](https://secure-signals-client-server-integ.uidapi.com/)
- Code: [`uid2-web-integrations/examples/google-secure-signals-integration/with_sdk_v3`](https://secure-signals-client-server-integ.uidapi.com/)
- Docs: [Secure Signals Integration Guide](../guides/integration-google-ss.md)
- Additional Domains:
  - `secure-signals-jssdk-integ.uidapi.com`
  - `esp-jssdk-integ.uidapi.com`
- Use Case: For publishers who want a hybrid approach (token generation on the server, client SDK logic for secure signals).

---

### Utilities

#### UID2 Hashing Tool

- Site: [UID2 Hashing Tool](https://unifiedid.com/examples/hashing-tool/)
- Code: [`uid2Docs/static/examples/hashing-tool`](https://github.com/IABTechLab/uid2docs/tree/main/static/examples/hashing-tool)
- Docs: [Normalization and Encoding](../getting-started/gs-normalization-encoding.md)
- Use Case: For developers or clients validating data preparation, such as hashing and normalization of emails before token requests.

---

:::note
The Sample Sites above highlight some common integrations, but do not represent all available UID2 integration options. For a summary of all the integration options available, see [UID2 Integration Guides Overview](../guides/integration-guides-summary.md).
:::
