---
title: UID2 Integration Overview for JavaScript
sidebar_label: UID2 Integration Overview for JavaScript
pagination_label: UID2 Integration Overview for JavaScript
description: UID2 実装の一部として UID2 SDK for JavaScript とインテグレーションするためのオプションの概要。
hide_table_of_contents: false
sidebar_position: 04
---

# UID2 Integration Overview for JavaScript

このガイドは、UID2 とインテグレーションし、UID2 SDK for JavaScript を使って[UID2 Token](../ref-info/glossary-uid.md#gl-uid2-token)(Advertising Token) を生成したいパブリッシャー向けのインテグレーションオプションの概要です。

Prebid.js と追加 SDK オプションを含むすべてのウェブオプションの概要については、[Web Integration Overview](integration-options-publisher-web.md) を参照してください。

## Introduction

UID2 は、以下をサポートする JavaScript 用の SDK を提供しています:

- [Generating the UID2 token](#generating-the-uid2-token)
- [Refreshing the UID2 token](#refreshing-the-uid2-token)
- [Storing the UID2 token in the browser](#storing-the-uid2-token-in-the-browser)

さらに柔軟性を高めるため、UID2 は、Prebid インテグレーションなど、一部の機能や補完的な製品の代替方法も提供しています。

## Client-Side or Server-Side Integration

UID2 SDK for JavaScript を使って UID2 とインテグレーションするためのオプションを、以下の表にまとめました。最適なオプションを選択してください。

| Scenario | Option | Integration Guide |
| :--- | :--- | :--- |
| Client-Side で DII にアクセスでき、フロントエンド開発のみを行いたい。 | Client-side integration | [Client-Side Integration Guide for JavaScript](publisher-client-side.md) |
| Server-Side で DII にアクセスでき、Server-Side の開発が可能であるか、[Private Operator](../ref-info/glossary-uid.md#gl-private-operator) を使用している。 | Server-side integration | [Server-Side Integration Guide for JavaScript](integration-javascript-server-side.md) |

## Generating the UID2 Token

[DII](../ref-info/glossary-uid.md#gl-dii) へのアクセスに応じて、UID2 SDK for JavaScript を使用して UID2 Token を生成するには、Client-Side または Server-Side の2つの方法があります。

[Client-Side or Server-Side Integration](#client-side-or-server-side-integration) の表から、どちらのオプションが最適かを判断し、該当するインテグレーションガイドに従ってください。

## Refreshing the UID2 Token

UID2 SDK for JavaScript には、トークンの自動リフレッシュ機能があります。

## Storing the UID2 Token in the Browser
<!-- GWH check corresponding (not identical) section in integration-prebid.md, integration-prebid-client-side.md, integration-prebid-client-side.md, for consistency -->

Client-Side のオプションでは、ローカルストレージを使用してデータを保存します。Server-Side オプションはデフォルトでローカルストレージを使いますが、代わりにクッキーを使うこともできます。詳細については、*UID2 SDK for JavaScript Reference Guide* の [UID2 Storage Format](../sdks/client-side-identity.md#uid2-storage-format) を参照してください。

クッキーのサイズが大きくなる可能性があり、それが問題になるかもしれません。しかし、ローカルストレージがオプションでない場合、これは一つの可能なアプローチです。

## Passing the UID2 Token to the Bid Stream

JavaScript SDK は、UID2 Token の生成、更新、保存を管理しますが、トークンをビッドストリームに渡すことは管理しません。

トークンは、Prebid.jsなどのオプションを使用してビッドストリームに渡すことができます。いくつかの提案については、*Webインテグレーション概要*の [Pass the UID2 Token Into the Bid Stream](integration-options-publisher-web.md#pass-the-uid2-token-into-the-bid-stream) を参照してください。

## JavaScript Integration Overview: High-Level Steps

UID2 SDK for JavaScript を使って UID2 とインテグレーションするには、以下のステップを完了する必要があります:

1. UID2アカウントのセットアップを完了します。
1. SDKをサイトに追加します。
1. SDKを設定します。

詳細な手順については、以下のインテグレーションガイドのいずれかを参照してください:

- [Client-Side Integration Guide for JavaScript](publisher-client-side.md)
- [Server-Side Integration Guide for JavaScript](integration-javascript-server-side.md)
