---
title: Client-Side Integration
description: Client-Side インテグレーションに必要な情報を設定と管理。
hide_table_of_contents: false
sidebar_position: 09
---

# Client-Side Integration

UID2 Portal では、Client-Side でトークンを生成する実装オプションを使用する場合、次の表に示す各値の 1 つ以上を定義する必要があります。

| Value | Details | Documentation Link |
| :--- | :--- | :--- |
| Key pair | 少なくとも一つ。実装では、公開鍵を共有します。 | [Subscription ID and Public Key](getting-started/gs-credentials.md#subscription-id-and-public-key) |
| Domain | 少なくとも1つ。ルートレベルドメインの完全なリストを提供します。 | [Client-Side Implementation for Publishers](../getting-started/gs-account-setup.md#client-side-implementation-for-publishers) |

:::important
サイトのルートレベルドメインの完全なリストを提供することが重要です。これは、クライアントサイドの実装にのみ関連するセキュリティ対策です。UID2 Portal で定義されていないドメインの場合、そのドメインからの UID2 Token リクエストは失敗します。
:::

Client-Side インテグレーションページでは、これらの値の設定と管理に関連するすべてのアクティビティを実行できます。

:::note
Client-Side インテグレーションページに移動すると、少なくとも 1 つのキーペアと、少なくとも 1 つのトップレベル（ルートレベル）ドメインを作成していない場合、不足している構成項目を提供するよう促されます。
:::

## Client-Side Implementation Options

Client-Side の実装オプションは、次の表に示すとおりです。利用可能なオプションは、あなたの役割によって異なります。

| Client-Side Implementation Option | Available For (Role) | Documentation Link |
| :--- | :--- | :--- |
| UID2 JavaScript SDK | Publishers, Advertisers | [Client-Side Integration Guide for JavaScript](../guides/publisher-client-side.md) |
| Prebid.js client-side integration | Publishers only |[UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md) |

## Adding a Key Pair

キーペアを追加するには、次の手順を実行します:

1. UID2 Portal アカウントにログインします。
1. **Client-Side Integration** ページに移動し、**Add Key Pair** をクリックします。
1. **Add Key Pair** オーバーレイで名前を入力し、**Add Key Pair** をクリックします。

   **Client-Side Integration** ページに、名前、Subscription ID、Public key、および作成日が表示されます。

## Copying or Viewing a Public Key

Client-Side インテグレーションページでキーペアを作成すると、公開鍵を共有できます。UID2 Service は、メッセージを認証するために、対応する秘密鍵と他の値を使用します。

Public key を表示またはコピーするには、次の手順を実行します:

1. UID2 Portal で、**Client-Side Integration** ページに移動します。
1. リストでキーペアを見つけ、次のいずれかを実行します:

   - **Public Key** 列の ![View Public Key icon](images/icon-eye-solid.png) (View Public Key アイコン) をクリックして、ポップアップでキーを表示します。
   - **Public Key** 列の ![Copy icon](images/icon-copy-solid.png) (Copy Public Key to Clipboard アイコン) をクリックします。

     公開鍵を安全な場所に保存します。

## Changing the Name of a Key Pair

キーペアを作成した後は、名前のみを変更できます。値を変更するには、新しいキーペアを作成する必要があります。

キーペアの名前を変更するには、次の手順を実行します:

1. UID2 Portal で、**Client-Side Integration** ページに移動します。
1. リストでキーを見つけます。
1. **Actions** 列で ![the Edit icon](images/icon-pencil-solid.png) (Edit アイコン) をクリックします。
1. 名前を更新し、**Save Key Pair** をクリックします。

## Deleting a Key Pair

キーペアを削除するには、次の手順を実行します:

1. リストでキーを見つけ、**Actions** 列で ![the Delete icon](images/icon-trash-can-solid.png) (Delete アイコン) をクリックします。
1. 確認メッセージで、キーペアを削除することを確認するために Subscription ID を入力します。画面からコピーして貼り付けることができます。
1. **Delete Key Pair** をクリックします。

   キーペアはリストから削除され、有効ではなくなります。

## Adding Domains

:::tip
ルートレベルドメインのみがアカウント設定に必要です。たとえば、example.com、shop.example.com、example.org の Client-Side でトークンを生成するために UID2 を実装する場合、ドメイン名 example.com と example.org だけを提供します。
:::

1 つ以上のトップレベル（ルートレベル）ドメインを追加するには、次の手順を実行します:

1. UID2 Portal アカウントにログインします。
1. **Client-Side Integration** ページに移動し、**Add Domains** をクリックします。
1. **Add Domains** オーバーレイで、ドメインのリストを入力または貼り付けます。注:

   - ドメインのリストの区切り文字として、次のものが有効です: カンマ、セミコロン、スペース、タブ、または改行。
   - 追加するドメインはデフォルトでリストに追加されます。既存のリストを置き換える場合は、**Replace all existing domains with the new ones** をチェックします。

1. **Add Domains** をクリックします。
   
      **Client-Side Integration** ページが更新されます。

## Changing a Domain

リストのドメイン名を変更するには、次の手順を実行します:

1. UID2 Portal で、**Client-Side Integration** ページに移動します。
1. リストでドメインを見つけます。
1. **Actions** 列で ![the Edit icon](images/icon-pencil-solid.png) (Edit アイコン) をクリックします。
1. 名前を更新し、**Save Domain** をクリックします。

## Deleting a Domain

ドメインをドメインリストから削除するには、次の手順を実行します:

1. UID2 Portal で、**Client-Side Integration** ページに移動します。
1. リストでドメインを見つけます。
1. **Actions** 列で ![the Delete icon](images/icon-trash-can-solid.png) (Delete アイコン) をクリックします。
1. 確認メッセージで、**Delete Domain** をクリックします。

   ドメインはドメインリストから削除されます。

## Deleting Multiple Domains

複数のドメインを一度に削除する方法は 2 つあります:

- リストから複数のドメインを選択してから、選択したドメインを削除します。
- 既存のドメインリストを、追加する最新のリストに置き換えます。[Adding Domains](#adding-domains) を参照してください。

複数のドメインを削除するには:

1. UID2 Portal で、**Client-Side Integration** ページに移動します。
1. ページの**Top-Level Domains** セクションで、見出しの下のチェックボックスをオンにします。

   すべてのドメインが削除されます。

1. 条件付き: いくつかのドメインを保持する場合は、それらのドメインのチェックボックスをクリアします。

1. リストの上にある ![the Delete icon](images/icon-trash-can-solid.png) Delete Domains をクリックします。

1. 確認メッセージで、**Delete Domains** をクリックします。

   ドメインはドメインリストから削除されます。
