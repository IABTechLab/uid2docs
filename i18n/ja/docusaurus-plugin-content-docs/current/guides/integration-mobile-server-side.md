---
title: UID2 Server-Side Integration Guide for Mobile
sidebar_label: Server-Side Integration for Mobile
pagination_label: UID2 Server-Side Integration Guide for Mobile
description: Server-Sideでのトークン生成とリフレッシュを行うモバイルインテグレーションの設定
hide_table_of_contents: false
sidebar_position: 04
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# UID2 Server-Side Integration Guide for Mobile

このガイドは、UID2 Token をServer-Sideで完全に管理したいモバイルアプリのパブリッシャー向けです:

- トークンはServer-Sideで生成されます。
- トークンは必要に応じてServer-Sideでリフレッシュされます。

この設定では、コードの変更の大部分はServer-Sideで行われ、モバイルアプリの変更は最小限に抑えられます。

このアプローチのメリットの一つは、複数のプラットフォーム（Web / CTV / mobile）を扱う場合、すべてをServer-Sideで行うことで、プラットフォーム固有の作業を減らすことができることです。

このアプローチを実装するには、[Publisher Integration Guide, Server-Side](integration-publisher-server-side.md)の手順に従ってください。

Server-side のコードが Java または Python の場合、UID2 SDK のいずれかを使用して、UID2 への HTTP リクエストを行うことができます。独自のソースコードを書く代わりに、次の SDK ガイドのいずれかを参照してください:

- [SDK for Java Reference Guide: Usage for Publishers](../sdks/sdk-ref-java.md#usage-for-publishers)
- [SDK for Python Reference Guide: Usage for Publishers](../sdks/sdk-ref-python.md#usage-for-publishers)
