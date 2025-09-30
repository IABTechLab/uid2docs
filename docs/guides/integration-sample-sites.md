---
title: UID2 Sample Sites Reference
description: Overview and reference for all UID2 sample site integrations.
hide_table_of_contents: false
---

import Link from '@docusaurus/Link';

# UID2 Sample Sites

This page lists all official UID2 sample implementations, with links to code, live demo sites, related documentation, and the primary use cases each serves. Use this page to quickly find, compare, and switch between sample integrations that match your setup.

---

### Client-Side and JavaScript Integrations

#### UID2 CSTG with JavaScript SDK

- **Sample Site:** [UID2 Publisher Client-Side Integration Example using UID2 JavaScript SDK](https://uid2-pub-cstg-js-integ.uidapi.com)
- **Code:** [`uid2-web-integrations/examples/cstg`](#)
- **Docs:** [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md)
- **Use Case:** For publishers who want a purely client-side integration with consent gating (CSTG). Best for fast prototyping or when minimal server infrastructure is available.

#### UID2 Client-Server JS SDK (no CSTG)

- **Sample Site:** [UID2 Publisher Standard Integration Example](https://uid2-pub-js-integ.uidapi.com)
- **Code:** [`uid2-web-integrations/examples/js-sdk`](#)
- **Docs:** [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md)
- **Use Case:** For publishers who already have a backend and want token generation centralized server-side, while still running UID2 logic on the client.

#### UID2 Server-Only (Server-Side)

- **Sample Site:** [UID2 Publisher Server-Only Integration Example](https://uid2-pub-srvonly-integ.uidapi.com)
- **Code:** [`uid2-examples/publisher/server_only`](#)
- **Docs:** [Publisher Integration Guide, Server-Side](../guides/integration-publisher-server-side.md)
- **Use Case:** For publishers who want all UID2 logic handled server-side (no client SDK). Good for environments with strict client limitations or security requirements.

---

### Prebid Integrations

#### UID2 CSTG with Prebid.js

- **Sample Site:** [UID2 Prebid.js Client-Side Integration Example](https://uid2-prebid-cstg-integ.uidapi.com)
- **Code:** [`uid2docs/static/examples/cstg-prebid-example`](#)
- **Docs:** [Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md)
- **Use Case:** For publishers using Prebid header bidding who want client-side token generation with consent gating.

---

### Google Secure Signals Integrations

#### Client-Side Secure Signals

- **Sample Site:** [UID2 Publisher Client-Side Integration Example (JS SDK + Secure Signals)](https://secure-signals-client-integ.uidapi.com)
- **Code:** [`uid2-web-integrations/examples/google-secure-signals-integration/client_side`](#)
- **Docs:** [Secure Signals Integration Guide](../guides/integration-google-ss.md)
- **Use Case:** For publishers who want front-end only integration with GAM Secure Signals.

#### React Client-Side Secure Signals

- **Sample Site:** [UID2 Publisher Client-Side React Integration Example](https://secure-signals-react-integ.uidapi.com)
- **Code:** [`uid2-web-integrations/examples/google-secure-signals-integration/react_client_side`](#)
- **Docs:** [Secure Signals Integration Guide](../guides/integration-google-ss.md)
- **Use Case:** For publishers with React apps who want to integrate UID2 + Secure Signals directly into their component-based architecture.

#### Server-Side Secure Signals

- **Sample Site:** [Server-Side UID2 Integration Example with Google Secure Signals](https://secure-signals-srvonly-integ.uidapi.com)
- **Code:** [`uid2-web-integrations/examples/google-secure-signals-integration/server_side`](#)
- **Docs:** [Secure Signals Sample Implementation](../guides/integration-google-ss.md)
- **Additional Domains:**
  - `secure-signals-srvonly-integ.uidapi.com`
  - `esp-srvonly-integ.uidapi.com`
- **Use Case:** For publishers who want all Secure Signals logic server-side for better control and security.

#### Hybrid Client-Server Secure Signals (JS SDK v3)

- **Sample Site:** [UID2 Publisher Hybrid Integration Example (Server + JS SDK + Secure Signals)](https://secure-signals-jssdk-integ.uidapi.com)
- **Code:** [`uid2-web-integrations/examples/google-secure-signals-integration/with_sdk_v3`](#)
- **Docs:** [Secure Signals Integration Guide](../guides/integration-google-ss.md)
- **Additional Domains:**
  - `secure-signals-jssdk-integ.uidapi.com`
  - `esp-jssdk-integ.uidapi.com`
- **Use Case:** For publishers who want a hybrid approach (token generation on the server, client SDK logic for secure signals).

---

### Utilities

#### UID2 Hashing Tool

- **Sample Site:** [UID2 Hashing Tool](https://uid2-hashing-tool.uidapi.com)
- **Code:** [`uid2docs/static/examples/hashing-tool`](#)
- **Docs:** [Normalization and Encoding](../getting-started/gs-normalization-encoding.md)
- **Use Case:** For developers or clients validating data preparation, such as hashing and normalization of emails before token requests.

---

:::tip
For additional integration examples, see:

- [Publisher Web Integration Overview](../guides/integration-options-publisher-web.md)
- [Prebid Integration Overview](../guides/integration-prebid.md)
- [Google Ad Manager Secure Signals Guide](../guides/integration-google-ss.md)  
  :::
