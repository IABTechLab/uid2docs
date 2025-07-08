---
title: Team Members
description: UID2 チームを設定および管理します。
hide_table_of_contents: false
sidebar_position: 07
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Team Members

UID2 Portal の **Team Members** ページでは、Admin 権限を持つユーザーが、アカウントへのアクセスを許可する個人の設定に関連するすべてのアクティビティを実行できます。これには、次の操作が含まれます:

- [Add a Team Member](#add-a-team-member)
- [Resend an Invitation to a Team Member](#resend-an-invitation-to-a-team-member) 
- [Edit Information for a Team Member](#edit-information-for-a-team-member) 
- [Remove a Team Member](#remove-a-team-member)

## Accessing the Team Members Page

Team Member ページにアクセスするには、UID2 Portal ユーザーインターフェースの右上にある名前が表示されている場所に移動し、下矢印をクリックして **Manage Team Members** を選択します。

各 Team Member について、次の情報が表示されます:
- Name

  招待されたがまだ承認されていない場合、名前の後に **Pending** タグが表示されます。
- Email
- Job Function
- Role
- Actions: 
  - すべての人が利用可能: ![the Edit icon](images/icon-pencil-solid.png) (Edit) と ![the Delete icon](images/icon-trash-can-solid.png) (Delete)。
  - ユーザーが招待されたがまだ承認されていない場合、**Resend Invitation** リンクも利用可能です。

例については、「チームメンバーへの招待状の再送」（#resend-an-invitation-to-a-team-member）を参照してください。

## User Roles

各 Team Member は、次の表に示す役割のいずれかを担います。

| Role | Actions |
| :--- | :--- |
| Admin | Admin 権限を持つユーザーは、[UID2 Portal Overview](portal-overview.md) に記載されているように、現在の参加組織に関連する UID2 参加に関連するすべてのアクティビティを実行できます。 |
| Operations | Operation 権限を持つユーザーは、Admin ユーザーとほぼ同じアクションを実行できます。ただし、いくつかの制限があります:<ul><li>チームメンバーを追加、変更、削除することはできません。代わりに、[Team Members](team-members.md) ページには読み取り専用アクセスがあります。</li><li>[Audit Trail](audit-trail.md) ページを表示できません。</li></ul> |

ユーザー権限は、Admin 権限を持つユーザーのみが変更できます。詳細は、[Edit Information for a Team Member](#edit-information-for-a-team-member) を参照してください。

## Add a Team Member

Team Member を追加するには、次の手順を実行します:

1. UID2 Portal アカウントでログインします。
1. 右上にある下矢印をクリックし、**Manage Team Members** を選択します。
1. **Add Team Member** をクリックします。
1. 名、姓、メール、職務、および役割を入力します。
1. **Save Team Member** をクリックします。

   Team Member がリストに追加され、保留中のステータスで、招待メールが招待された人に送信されます。

:::note
Team Member は複数の参加者に追加できます。複数の参加者に所属する Team Member は、[UID2 Portal Structure](portal-overview.md#uid2-portal-structure) に示されているように、参加者間を切り替えることができます。
:::

## Resend an Invitation to a Team Member

Team Member を追加した場合、招待状を再送する必要がある場合があります。たとえば、Team Member が招待状を受け取っていないか、誤って削除したか、招待状の有効期限が切れている場合などです。

ユーザーが招待されたがまだ承認されていない場合、Team Members リストには、次の図に示すような追加情報が表示されます:

- 氏名の後に **Pending** ラベルが表示されます。
- **Resend Invitation** リンク。

![UID2 Portal, Team Members page, pending user](images/portal-team-members-resend-invitation.png)

Team Member 宛に招待状を再送信するには、次の手順を実行します:

1. UID2 Portal アカウントでログインします。
1. 右上にある下矢印をクリックし、**Manage Team Members** を選択します。
1. リストから Team Member を見つけ、Actions 列で **Resend Invitation** をクリックします。

   ステータスが **Invitation Sent** に更新され、新しい招待状が送信されます。

:::note
招待状が送信されたがまだ承認されていない場合にのみ、Resend Invitation リンクが表示されます。
:::

## Edit Information for a Team Member

役割に関する注意事項:
- Admin 権限を持つユーザーは、参加組織内の任意の Team Member について、これらの値を更新できます。
- Operation 権限を持つユーザーは、Team Members ページを表示できますが、情報を変更することはできません。

Team Member の情報を編集するには、次の手順を実行します:

1. UID2 Portal アカウントでログインします。
1. 右上にある下矢印をクリックし、**Manage Team Members** を選択します。
1. リストから Team Member を見つけ、Actions 列で ![the Edit icon](images/icon-pencil-solid.png) (Edit) をクリックします。
1. 以下の値を更新します:
   - 名
   - 姓
   - 職務
   - 役割: 役割についての詳細は、[User Roles](#user-roles) を参照してください。
   
   **Note**: 既存の Team Member のメールアドレスを更新することはできません。メールアドレスを変更する必要がある場合は、新しいメールアドレスを使用して新しい Team Member を追加します。これにより、メールアドレスの確認プロセスが正しく実行されます。このシナリオでは、古いメールアドレスの既存エントリも削除することを忘れないでください。
1. 変更内容を保存します。

## Remove a Team Member

チームから誰かを削除するには、次の手順に従います:

1. UID2 Portal アカウントでログインします。
1. 右上にある下矢印をクリックし、**Manage Team Members** を選択します。
1. リストから Team Member を見つけ、Actions 列で ![the Delete icon](images/icon-trash-can-solid.png) (Delete) をクリックします。
1. 確認メッセージで **Remove Team Member** をクリックします。

   Team Member がチームから削除されます。

## Log In for the First Time as a Team Member

誰かがあなたを新しい Team Member として追加した場合、確認メールを送信します。メールアドレスを確認するために、次の手順に従ってください:

1. メールのリンクをクリックして招待を受け入れます。
1. 最初のデフォルトからパスワードを更新するためにクリックします。
1. 新しいパスワードを使用して UID2 Portal にログインします。これにより、アカウントが確認されます。
1. 最初のログイン時に、UID2 Sharing Portal の利用規約を確認して承認します。
