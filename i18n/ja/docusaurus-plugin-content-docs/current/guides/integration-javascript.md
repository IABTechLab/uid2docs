---
title: UID2 Integration Overview for JavaScript
sidebar_label: UID2 Integration Overview for JavaScript
pagination_label: UID2 Integration Overview for JavaScript
description: UID2 実装の一部として SDK for JavaScript とインテグレーションするためのオプションの概要。
hide_table_of_contents: false
sidebar_position: 04
---

import Link from '@docusaurus/Link';
import IntegratingWithSSO from '../snippets/_integrating-with-sso.mdx';

# UID2 Integration Overview for JavaScript

このガイドは、UID2 とインテグレーションし、SDK for JavaScript を使って<Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link>(Advertising Token) を生成したいパブリッシャー向けのインテグレーションオプションの概要です。

Prebid.js と追加 SDK オプションを含むすべてのウェブオプションの概要については、[Web Integration Overview](integration-options-publisher-web.md) を参照してください。

## Introduction

UID2 は、以下をサポートする JavaScript 用の SDK を提供しています:

- [Generating the UID2 token](#generating-the-uid2-token)
- [Refreshing the UID2 token](#refreshing-the-uid2-token)
- [Storing the UID2 token in the browser](#storing-the-uid2-token-in-the-browser)

さらに柔軟性を高めるため、UID2 は、Prebid インテグレーションなど、一部の機能や補完的な製品の代替方法も提供しています。

## Integrating with Single Sign-On (SSO)

<IntegratingWithSSO />

## Client-Side or Client-Server Integration

SDK for JavaScript を使って UID2 とインテグレーションするためのオプションを、次の表にまとめました。最適なオプションを選択してください。

| Scenario | Option | Integration Guide |
| :--- | :--- | :--- |
| Client-Side で DII にアクセスでき、フロントエンド開発のみを行いたい。 | Client-side integration | [Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md) |
| Server-Side で DII にアクセスでき、Server-Side の開発が可能であるか、<Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link> を使用している。 | Server-side integration | [Client-Server Integration Guide for JavaScript](integration-javascript-client-server.md) |

## Complete UID2 Account Setup and Configure Account

UID2 とインテグレーションするには、UID2 アカウントが必要です。アカウントをまだ作成していない場合は、最初に[Account Setup](../getting-started/gs-account-setup.md) ページの手順に従ってください。

アカウントの初期設定が完了すると、[UID2 Portal](../portal/portal-overview.md) にアクセスするための手順とリンクが送信されます。ここで、本番環境用の [credentials](../getting-started/gs-credentials.md) を作成し、提供する必要がある追加の値を設定できます。詳細は、[Getting Started with the UID2 Portal](../portal/portal-getting-started.md) を参照してください。

UID2 Portal で行う手順は、実装が Client-Side、Client-Server、または Server-Side であるかによって異なります。各実装ガイドに具体的な手順が記載されています。

## Generating the UID2 Token

<Link href="../ref-info/glossary-uid#gl-dii">DII</Link> へのアクセスに応じて、SDK for JavaScript を使用して UID2 Token を生成するには、Client-Side または Server-Side の2つの方法があります。

[Client-Side or Client-Server Integration](#client-side-or-client-server-integration) の表から、どちらのオプションが最適かを判断し、該当するインテグレーションガイドに従ってください。

## Refreshing the UID2 Token

SDK for JavaScript には、自動の <a href="../ref-info/glossary-uid#gl-token-refresh">Token Refresh</a> 機能があります。

## Storing the UID2 Token in the Browser
<!-- GWH check corresponding (not identical) section in integration-prebid.md, integration-prebid-client-side.md, integration-prebid-client-side.md, for consistency -->

Client-Side のオプションでは、ローカルストレージを使用してデータを保存します。Server-Side オプションはデフォルトでローカルストレージを使いますが、代わりにクッキーを使うこともできます。詳細は、*SDK for JavaScript Reference Guide* の [UID2 Storage Format](../sdks/sdk-ref-javascript.md#uid2-storage-format) を参照してください。

クッキーのサイズが大きくなる可能性があり、それが問題になるかもしれません。しかし、ローカルストレージがオプションでない場合、これは一つの可能なアプローチです。

## Passing the UID2 Token to the Bidstream

JavaScript SDK は、UID2 Token の生成、更新、保存を管理しますが、トークンをビッドストリームに渡すことは管理しません。

トークンは、Prebid.jsなどのオプションを使用して<Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>に渡すことができます。いくつかの提案については、*Webインテグレーション概要*の [Pass the UID2 Token Into the Bidstream](integration-options-publisher-web.md#pass-the-uid2-token-into-the-bidstream) を参照してください。

## JavaScript Integration Overview: High-Level Steps

SDK for JavaScript を使って UID2 とインテグレーションするには、以下のステップを完了する必要があります:

1. UID2アカウントのセットアップを完了します。
1. SDKをサイトに追加します。
1. SDKを設定します。

詳細な手順については、以下のインテグレーションガイドのいずれかを参照してください:

- [Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md)
- [Client-Server Integration Guide for JavaScript](integration-javascript-client-server.md)
