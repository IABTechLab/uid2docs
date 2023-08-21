---
title: API Keys
description: 必要な API Key とその取得方法。
hide_table_of_contents: false
sidebar_position: 03
---

# API Keys

UID2 <a href="/docs/intro#participants">参加者</a> はそれぞれ、クライアントキーとも呼ばれる API Key を持っています。各キーには対応する [client secret](../ref-info/glossary-uid.md#gl-client-secret) があり、これは参加者と UID2 Service だけが知っている値です。

API Key と Client Secretにより、参加者は [Operator Service](../ref-info/glossary-uid.md#gl-operator-service) に接続し、API エンドポイントを呼び出すことができます。これらの値は、サービスへの参加者を識別します。

ここでは、API Key と Client Secret について説明します:
- UID2 参加者は、複数のキーを持つことができます。
- 各キーには、どのエンドポイントで使用できるかを決定する一連の権限があります。
- 各キーには、対応する Client Secret があります。
- ほとんどの API エンドポイントは、認証のために API Key と Client Secret の両方を必要とします。詳細は [認証と認可](gs-auth.md) を参照してください。
- インテグレーション環境と本番環境の両方を使用する場合は、それぞれの環境で別々の API Key が必要になります。

UID2 アカウントのセットアップの一環として、1つ以上の API Key が発行され、それぞれに対応するクライアントシークレットが割り当てられます。相談先の詳細については、[連絡先情報](gs-account-setup.md#contact-info) を参照してください。

## Security of Keys and Client Secrets

キー と Client Secret のセキュリティは非常に重要です。以下のガイドラインに従ってください:

- API キーと Client Secrets を受け取ったら、安全な場所に保管してください。
- これらの値が保存され使用されているすべての場所を追跡しておき、キーをローテーションする必要がある場合にすぐに実行できるようにしておいてください。
- 既存のキーとシークレットが漏洩した場合は、新しいキーとシークレットに置き換えるプロセスを確立します。

認証情報が漏洩するリスクを減らすため、API キーと Client Secret を定期的に更新することをお勧めします。

新しい認証情報をリクエストするには、いつでも UID2 の担当者にお尋ねください。