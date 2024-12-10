---
title: Team Members
description: UID2 Team の設定と管理。
hide_table_of_contents: false
sidebar_position: 07
---

import Link from '@docusaurus/Link';

# Team Members

UID2 Portal の **Team Members** ページでは、管理者は、以下のようなアカウントへのアクセスを許可する個人の設定に関する操作を実行できます:

- [Add a Team Member](#add-a-team-member)
- [Resend an Invitation to a Team Member](#resend-an-invitation-to-a-team-member) 
- [Edit Information for a Team Member](#edit-information-for-a-team-member) 
- [Remove a Team Member](#remove-a-team-member)

## Accessing the Team Members Page

Team Members ページにアクセスするには、UID2 Portal ユーザーインターフェースの右上にある名前が表示されている場所に移動します。下矢印をクリックし、**Manage Team Members** を選択します。

例については [UID2 Portal Structure](portal-overview.md#uid2-portal-structure) を参照してください。

## User Roles

各チームメンバーには、Admin または Operations のいずれかのユーザー権限があります。Admin ユーザーは、UID2 参加に関連するすべてのアクティビティを実行できます。概要は [UID2 Portal Overview](portal-overview.md) にまとめられています。

Operations ユーザーは、Admin ユーザーと同じアクティビティを実行できますが、チームメンバーを追加、変更、削除することはできません。代わりに、**Manage Team Members** ページに対して読み取り専用アクセス権があります。

ユーザー権限は、Admin 権限を持つユーザーによってのみ変更できます。詳細は [Edit Information for a Team Member](#edit-information-for-a-team-member) を参照してください。

## Add a Team Member

チームメンバーを追加するには、以下のステップを完了させます:

1. UID2 Portal アカウントにログインします。
1. 右上の下矢印をクリックし、**Manage Team Members** を選択します。
1. **Add Team Member** をクリックします。
1. 姓、名、メールアドレス、職能、役割を入力します。
1. **Save Team Member** をクリックします。

   チームメンバーがリストに追加され、ステータスが保留になり、招待メールが招待者に送信されます。

:::note
チームメンバーは、複数の参加者に追加できます。複数の参加者に所属するチームメンバーは、[UID2 Portal Structure](portal-overview.md#uid2-portal-structure) に示されているように、参加者間を切り替えることができます。
:::

## Resend an Invitation to a Team Member

チームメンバーを追加した場合、招待状を再送する必要がある場合があります。例えば、チームメンバーが招待状を受け取っていなかったり、誤って削除してしまったり、招待状の有効期限が切れてしまった場合などです。

チームメンバーに招待状を再送信するには、以下の手順を実行します:

1. UID2 Portal アカウントにログインします。
1. 右上の下矢印をクリックし、**Manage Team Members** を選択します。
1. リストでチームメンバーを見つけ、Actions 列で **Resend Invitation** をクリックします。

   ステータスが **Invitation Sent** に更新され、新しい招待メールが送信されます。

## Edit Information for a Team Member

Admin ユーザーは、名前、姓、Eメール、職務、役割のいずれの値も更新できます。

チームメンバーの情報を編集するには、以下の手順を実行します:

1. UID2 Portal アカウントにログインします。
1. 右上の下矢印をクリックし、**Manage Team Members** を選択します。
1. リストでチームメンバーを見つけ、Actions 列で ![the Edit icon](images/icon-pencil-solid.png) (編集アイコン) をクリックします。
1. 情報を更新し、変更を保存します。

## Remove a Team Member

チームから誰かを外すには、以下の手順に従ってください:

1. UID2 Portal アカウントにログインします。
1. 右上の下矢印をクリックし、**Manage Team Members** を選択します。
1. リストでチームメンバーを見つけ、Actions 列で Delete (ゴミ箱) アイコンをクリックします。
1. 確認メッセージで **Remove Team Member** をクリックします。

   チームメンバーがチームから削除されます。

## Log In for the First Time as a Team Member

誰かがあなたを新しいチームメンバーとして追加した場合、確認メールが送信されます。メールアドレスを確認するための確認メールを送信します。以下の手順に従ってください:

1. メールに記載されている accept the invitation をクリックします。
1. パスワードを初期設定から更新するには、クリックしてください。
1. メールアドレスと新しいパスワードを使用して、UID2 Portal にログインします。これでアカウントが確認されます。
1. 初回ログイン時に、UID2 Sharing Portal 利用規約を確認し、同意します。
