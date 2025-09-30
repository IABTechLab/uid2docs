---
title: Email Contacts
description: UID2 アップデートのための連絡先の設定と管理。
hide_table_of_contents: false
sidebar_position: 09
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Email Contacts

UID2 Portal では、UID2 の最新アップデートやリリースに関する情報を通知する組織内の担当者を指定できます。個別のメールアドレスを設定することも、組織内の複数の人に通知するために組織内に設定したメールグループを参照することもできます。

個人ではなくメールグループを追加することには、次のような利点があります:
- 多くの個別エントリーを作成することなく、複数の人に通知する効率的な方法です。
- UID2 Portal の外部で、内部メール設定の管理の一環としてリストを管理できます。

:::tip
メール連絡先は UID2 Portal にログインしたり、アカウントを変更したりすることはできません。メール連絡先は情報通知のみを受け取ります。メール連絡先を削除するには、チームメンバーがその操作を行う必要があります。
:::

## Accessing the Email Contacts Page

メール連絡先ページにアクセスするには、UID2 Portal ユーザーインターフェースの右上にある名前が表示されている場所に移動します。下矢印をクリックし、**Email Contacts** を選択します。

例は [UID2 Portal Structure](portal-overview.md#uid2-portal-structure) を参照してください。

## Configuring Email Contacts

Email Contacts ページでは、UID2 の更新について通知を受ける個人を設定するための、以下のような操作を実行できます:

- [Add an email contact](#add-an-email-contact)
- [Edit information for an email contact](#edit-information-for-an-email-contact)
- [Remove an email contact](#remove-an-email-contact)

## Add an Email Contact

メール連絡先を追加するには、以下のステップを完了させます:

1. UID2 Portal アカウントにログインします。
1. 右上の下矢印をクリックし、**Email Contacts** を選択します。
1. **Add Email Contact** をクリックします。
2. Add Email Contact ウィンドウで、メールアドレス連絡先の以下の情報を入力します:
   - Email Group Name: 以下のいずれかを入力します:
   
     - 個人の場合: メールアドレスに関連付けられた名前または役割。
     - メールアドレスグループの場合: グループのテキスト名。たとえば、`Engineering`。
   - Email Alias: 以下のいずれかを入力してください:
   
     - 個人の場合: メールアドレス。
     - グループの場合: グループに有効なメールアドレス。たとえば、`engineering@example.com`。
   - Contact Type: コンタクトタイプのドロップダウンリストから選択します。たとえば、`Business` または `Technical` を選択します。
3. **Save Email Contact** をクリックします。エントリーがリストに追加されます。

:::note
Email Contacts では、確認のメールは送信されません。
:::

## Edit Information for an Email Contact

値を変更できます: Email Group Name、Email Alias、Contact Type

メール連絡先の情報を編集するには、以下の手順を完了します:

1. UID2 Portal アカウントにログインします。
1. 右上の下矢印をクリックし、**Email Contacts** を選択します。
1. リストで連絡先を見つけ、Actions 列で ![the Edit icon](images/icon-pencil-solid.png) (編集アイコン) をクリックします。
1. 情報を更新し、変更を保存します。

## Remove an Email Contact

メールコンタクトを削除するには、以下の手順に従ってください:

1. UID2 Portal アカウントにログインします。
1. 右上の下矢印をクリックし、**Email Contacts** を選択します。
1. リストで連絡先を見つけ、Actions 列で Delete (trashcan) アイコンをクリックします。
1. 確認メッセージが表示されたら、削除を確定します。
