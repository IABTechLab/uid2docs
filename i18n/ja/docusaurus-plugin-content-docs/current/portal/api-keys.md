---
title: API Keys
description: API Key の設定と管理。
hide_table_of_contents: false
sidebar_position: 07
---

import Link from '@docusaurus/Link';

# API Keys

UID2 Portal の **API Keys** ページでは、UID2 アカウントの API Key を管理するためのすべての操作を実行できます:

- [Adding an API Key](#adding-an-api-key)
- [Modifying an API Key](#modifying-an-api-key)
- [Deleting an API Key](#deleting-an-api-key)
- [Rotating an API Key](#rotating-an-api-key)

## Overview

API Key とクライアント シークレットを使用すると、UID2 <Link href="../ref-info/glossary-uid#gl-operator-service">Operator Service</Link> に接続して API エンドポイントを呼び出すことができます。これらの値は、サービスに対してあなたを識別します。

UID2 Portal で API Key を追加するときは、キーとそれに対応するシークレットを安全に保存し、これらの値が漏洩しないようにするために必要なすべての措置を講じることが重要です。詳細は [API Key and Client Secret](../getting-started/gs-credentials.md#api-key-and-client-secret) を参照してください。

各 API Keyは、1 年ごとにローテーションすることを勧めます。

API Key を追加するときには、次のいずれかの権限を割り当てることができます:

- Mapper
- Generator
- Sharer
- Bidder

詳細は [API Permissions](../getting-started/gs-permissions.md) を参照してください。

## Adding an API Key

API Key を追加するには、次の手順を実行します:

1. UID2 Portal アカウントにログインします。
1. **API Keys** ページに移動し、**Add API Key** をクリックします。
1. **Add API Key** ページで、新しいキーの名前を指定します。
1. API Permissions セクションで、キーに割り当てる権限を 1 つ以上選択します。

    必要な権限のみを選択してください。たとえば、パブリッシャーの場合は Generator ロールを選択します。詳細は [API Permissions](../getting-started/gs-permissions.md) を参照してください。

    :::note
    選択可能な権限が表示されない場合は、UID2 連絡先に問い合わせてください。
    :::

1. **Add API Key** をクリックします。
   
      **API Key (Your API Key Name) Credentials** ページに API Key とシークレットが表示されます。

1. 各フィールドで、値をコピーするために ![the Copy icon](images/icon-copy-solid.png) (コピーアイコン) をクリックします。シークレットとキーの値を安全な場所に保存し、共有しないでください。
   
      ウィンドウを閉じると、これらの値は保存されず、利用できなくなります。失った場合は、新しいキーを追加する必要があります。

1. 完了したら、**Close** をクリックします。

1. リマインダープロンプトで、まだ値を保存していない場合は戻ることができます。値を保存していない場合は、**Cancel** をクリックして戻るか、**Close** をクリックして確認します。

   **API Keys** ページには、新しいキーが名前、キー ID、権限、および作成日付とともに表示されます。

## Modifying an API Key

API Key を追加した後は、次の情報を編集できます:

- API key name
- Permission assignments 

API Key を変更するには、次の手順を実行します:

1. UID2 Portal で **API Keys** ページに移動します。
1. リストでキーを見つけます。
1. アクション列で ![the Edit icon](images/icon-pencil-solid.png) (編集アイコン) をクリックします。
1. 情報を更新し、**Save Key** をクリックします。

## Deleting an API Key

Key が漏洩した場合、その Key を削除する必要があります。

:::warning
アクティブな Key を削除する前に、実装が新しい Key で更新されていることを確認してください。Key を削除すると、その Key を使用するすべての API トラフィックが拒否されます。
:::

API Key を削除するには、次の手順を実行します:

1. UID2 Portal で **API Keys** ページに移動します。
1. リストでキーを見つけ、アクション列で ![the Delete icon](images/icon-trash-can-solid.png) (削除アイコン) をクリックします。
1. 確認メッセージで、削除を確認するために API Key を入力します。表示からコピーして貼り付けることができます。
2. **Delete Key** をクリックします。

   キーは表示から削除され、無効になります。

## Rotating an API Key

API Key をローテーションすることをお勧めします。API Key をローテーションするには、次の手順を実行します:

1. UID2 Portal で **API Keys** ページに移動します。
1. リストでローテーションする Key を見つけます。
1. ローテーションする Key と同じ権限を持つ新しい Key を追加します。詳細は [Adding an API Key](#adding-an-api-key) を参照してください。
1. UID2 の実装を更新して、ローテーションする Key の代わりに新しい Key を使用するようにします。
1. 新しい Key が問題なく使用されていることを確認します。たとえば、サービスに対する劣化や API Key の使用に関連するエラーログがないことを確認します。
1. 古い Key を削除します。詳細は [Deleting an API Key](#deleting-an-api-key) を参照してください。

## Security Recommendations for API Keys

セキュリティのベストプラクティスとして、異なる役割に対して異なるキーを持つことが推奨されます。

追加のセキュリティに関する推奨事項については、[API Key and Client Secret のセキュリティ](../getting-started/gs-credentials.md#security-of-api-key-and-client-secret) を参照してください。

<!-- In some instances, you might create API keys for one permission/role and then want to add a role to your account. For example, you might be an advertiser, but also want to operate as an inventory provider.

In this scenario, we recommend that you follow these best security practices:

- Your credentials should have the minimum permissions necessary to complete the specific task. Activities as an advertiser require the Mapper role; activities as an inventory provider require the Generator role.

- Best practice is to use different credentials in different contexts and for different use cases. For example, each app or service should use its own credentials.

These practices are standard measures to help ensure that, in case a service or app is compromised or credentials are leaked, any negative result is minimized.

These are guidelines, not rules. If you need to add a permission, you can modify an existing API key, but we recommend that you use separate keys for separate permission. -->
