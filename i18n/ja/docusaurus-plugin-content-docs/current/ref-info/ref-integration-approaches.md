---
title: Integration Approaches
description: UID2 インテグレーションに利用可能なアプローチに関する情報。
hide_table_of_contents: false
sidebar_position: 06
---

import Link from '@docusaurus/Link';

# Integration Approaches

パブリッシャーがワークフローに UID2 をインテグレーションする場合、または広告主が UID2 サポートをインテグレーションする場合、3 つの広範な統合アプローチがあります。UID2 インテグレーションは、Client-Side で完全に実装される場合、Server-Side で完全に実装される場合、または Client-Side と Server-Side 側の両方で部分的に実装される場合 (Client-Server) があります。

詳細については、以下を参照してください:

- [Client-side integration](#client-side-integration)
- [Client-server integration](#client-server-integration)
- [Server-side integration](#server-side-integration)

## Client-Side Integration

Client-Side インテグレーションでは、UID2 Token は Client-Side で生成およびリフレッシュされます。

たとえば:

- パブリッシャーは、ビッドストリームで使用するために Client-Side で UID2 Token を生成し、リフレッシュします。
- 広告主は、トラッキングピクセル用に Client-Side で UID2 Token を生成します。

パブリッシャーの Client-Side インテグレーションの例:

- [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md)
- [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md)
- [UID2 Client-Side Integration Guide for Mobile](../guides/integration-mobile-client-side.md)

Client-Side でインテグレーションする広告主は、JavaScript SDK を使用できます:

- [Client-Side Integration Guide for JavaScript](../guides/integration-javascript-client-side.md)

### Client-Side Integration: Security Values

Client-Side インテグレーションを選択する場合、UID2 サーバーに対してあなたを識別する 2 つの値からなるクライアントキーペアが提供されます: **Subscription ID** と **Public Key**。

詳細は[Subscription ID and Public Key](../getting-started/gs-credentials.md#subscription-id-and-public-key)を参照してください。

追加のセキュリティを提供するため、ルートレベルのドメインまたはアプリのリストを提供する必要があります。詳細は以下を参照してください:

- ウェブサイトの場合: [Client-Side Web Integrations](../getting-started/gs-account-setup.md#client-side-web-integrations)。
- モバイルアプリの場合: [Client-Side Mobile Integrations](../getting-started/gs-account-setup.md#client-side-mobile-integrations)。

## Client-Server Integration

Client-Server インテグレーションでは、一部のインテグレーションステップが Client-Side で実装され、他のステップが Server-Side で実装されます。

たとえば、パブリッシャーの Client-Server インテグレーションでは、UID2 Token は Server-Side で生成され、Client-Side でリフレッシュされます。

パブリッシャーの Client-Server インテグレーションの例:

- [UID2 Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-client-server.md)
- [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-client-server.md)
- [UID2 Client-Server Integration Guide for Mobile](../guides/integration-mobile-client-server.md)

### Client-Server Integration: Credentials

Client-Server インテグレーションを選択する場合、**API key** と **client secret** が必要です。これらの値は安全に保管する必要があります。

:::important
承認情報を Web ページ、モバイルアプリソースコード、または他の情報が漏洩する可能性のある場所に埋め込まないでください。セキュリティ上の理由から、サーバーに安全に保存してください。
:::

詳細は [API Key and Client Secret](../getting-started/gs-credentials.md#api-key-and-client-secret) を参照してください。

## Server-Side Integration

完全に Server-Side でインテグレーションすることも選択できます。

Server-Side インテグレーションでは、Server-Side で raw UID2 または UID2 Token が生成され、リフレッシュされます。

たとえば、Server-Side インテグレーションでは:

- パブリッシャーは、ビッドストリームで使用するために UID2 Token を Server-Side で生成します。
- 広告主は、オーディエンスターゲティングのために raw UID2 を Server-Side で生成します。

パブリッシャーの Server-Side インテグレーションの例として [Publisher Integration Guide, Server-Side](../guides/integration-publisher-server-side.md) があります。

### Server-Side Integration: Credentials

Server-Side インテグレーションを選択する場合、**API key** と **client secret** が必要です。これらの値は安全に保管する必要があります。

:::important
承認情報を Web ページ、モバイルアプリソースコード、または他の情報が漏洩する可能性のある場所に埋め込まないでください。セキュリティ上の理由から、サーバーに安全に保存してください。
:::

詳細は [API Key and Client Secret](../getting-started/gs-credentials.md#api-key-and-client-secret) を参照してください。