---
title: Getting Started
description: UID2 Portal のアカウント作成方法。
hide_table_of_contents: false
sidebar_position: 03
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Getting Started with the UID2 Portal

UID2 Portal アカウントをリクエストする際には、自分自身と会社に関する情報を UID2 連絡先に提供する必要があります。

リクエストを処理した後、UID2 Portal にログインしてアカウントの詳細を確認し、参加者とチームを設定し、UID2 共有権限の設定を構成できる確認メールが送信されます。

最初のステップでは、次の手順に従います。

- [Request an Account](#request-an-account)
- [Log In for the First Time](#log-in-for-the-first-time)
- [Change Your Password](#change-your-password)

オンボーディング プロセスが必要な場合は、UID2 連絡先にお問い合わせください。

## Request an Account

UID2 の連絡先にアカウントのリクエストを行う際には、情報を提供いただく必要があります。次の表に示す詳細情報を含めてください。

:::note
UID2 の連絡先がまだない場合は、[Request Access to UID2](/request-access) ページに移動し、フォームに記入してください。
:::

| Item | Details |
| :--- | :--- |
| Information about yourself | 次の情報を提供してください。<br/>- 名<br/>- 姓<br/>- メールアドレス<br/>- 職務 |
| Information about your company | 次の情報を提供してください。<br/>- 参加者名（会社名）<br/>- 参加者タイプ（パブリッシャー、広告主、DSP、またはデータプロバイダー） |

## Account Approval

アクセスをリクエストした後、UID2 連絡先がリクエストを処理します。承認プロセスが完了し、アカウントが作成されると、UID2 Portal にログインするためのリンクが記載された確認メールが送信されます。

## Prepare Setup Information

アカウントが作成された後、設定を行うために必要な情報があります。設定手順は、役割と実装シナリオによって異なります。準備が整うよう、以下のセクションを確認し、必要な情報を準備してください:

- [Determine Integration Path](#determine-integration-path)

  :::tip
  Client-Side 実装の場合、ルートレベル ドメインの完全なリストが必要です。
  :::
- [Set Up Team Members and Email Contacts](#set-up-team-members-and-email-contacts)

## Determine Integration Path

UID2 Service を使用するには、キーのセットが必要です。Client-Side または Server-Side でインテグレーションを行うかによって、キーの種類が異なります。会社のアカウントにアクセスできると、UID2 Portal を使用してキーを取得できます。

次の表に、インテグレーションオプションが示されています。

| Integration | Examples | Instructions |
| :--- | :--- | :--- |
| Client-Side インテグレーション | **広告主** はトラッキングピクセル用に Client-Side で UID2 Token を生成します。<br/>**パブリッシャー** は <Link href="../ref-info/glossary-uid#gl-bidstream">bidstream</Link> 用に Client-Side で UID2 Token を生成します。| **Client-Side Integration** ページに移動し、キーペアとルートレベルドメインを設定します。<br/>詳細は [Client-Side Integration](client-side-integration.md) を参照してください。 |
| Server-Side インテグレーション | **広告主** はオーディエンスターゲティングのために配信される raw UID2 を生成します。<br/>**パブリッシャー** は<Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>ように Server-Side で UID2 Token を生成します。| **API Keys** ページに移動し、少なくとも1組の認証情報を生成します。API Key を追加すると、シークレットとキーの2つの値が割り当てられます。<br/>詳細は [API Keys](api-keys.md) を参照してください。 |

参加者の中には、Client-Side と Server-Side の両方のインテグレーションを使用するかもしれません。たとえば、広告主はピクセルのために Client-Side で UID2 Token を生成 ([Client-Side Integration](client-side-integration.md)) し、raw UID2 の生成は、Server-Side でインテグレーションします ([API Keys](api-keys.md))。

## Log In for the First Time

確認メールが届いたら、メールに記載されている **Accept Invitation** リンクをクリックして開始し、その後、クリックして以下のタスクを完了してください:
- [Change your password](#change-your-password)
- [Log In](#log-in)
- [Configure unique account values](#configure-unique-account-values)

新しいパスワードを作成し、UID2 Portal にログインします。

## Change Your Password

**Accept Invitation** リンクをクリックすると、**Set Password** ページに移動します。

:::tip
 アカウントが漏洩した可能性があるためにパスワードを変更する場合は、**Sign out from other devices** チェックボックスがチェックされていることを確認してください。
:::

新しいパスワードを入力し、確認してから **Save Password** をクリックします。

アカウントが承認されたことを通知する通知が表示され、**Log In** ボタンが表示されます。

## Log In

ログインの準備が整いました。

1. **Log In** ボタンをクリックします。

   UID2 Sharing Portal Terms of Service が表示されます。

2. 必要に応じて確認し、下にスクロールし、**Accept Terms and Conditions** をクリックします。
   
      UID2 Portal ホームページが表示されます。

次のステップは、アカウントの設定です。

## Configure Unique Account Values

アカウントの設定手順は、シナリオによって異なります。以下は、推奨されるシーケンスです。

1. インテグレーション パスを決定します。[Determine Integration Path](#determine-integration-path) を参照してください。

1. アカウントに固有の値を設定します。適用可能なページで値を構成できます。&#8212;以下のいずれかのページです:

    - [Client-Side Integration](client-side-integration.md)
    - [API Keys](api-keys.md)

1. アカウントに固有の値を設定すると、[sharing permissions](sharing-permissions.md) を設定できます。

1. チームメンバーを追加すると、チーム全体での作業負荷が分散されるため、効果的です。[Team Members](team-members.md) を参照してください。

1. プロジェクトに関わるすべての人が通知を受けるようにするために、メール連絡先を追加することも役立ちます。[Email Contacts](email-contacts.md) を参照してください。

## Set Up Team Members and Email Contacts

初回ログイン時に、以下の設定手順を完了できます:

- チームメンバーを設定します。
- UID2 の最新の更新とリリースに関する通知を受け取るべき人物の情報を追加します。

次の表に、必要な情報と手順へのリンクが示されています。

| Item | Details | Link to Instructions | 
| :--- | :--- | :--- |
| Team member information | 以下を提供してください。<br/>- 名<br/>- 姓<br/>- メールアドレス<br/>- 職務<br/>- 役割 | [Team Members](team-members.md) |
| Email contact information | 以下を提供してください。<br/>- メールグループ名<br/>- メールエイリアス<br/>- 連絡先タイプ | [Email Contacts](email-contacts.md) |

## Reset Password

パスワードを忘れた場合は、ログインページの **Forgot Password** リンクをクリックします。メールアドレスを提供し、メールアカウントでパスワードリセットメッセージを確認してください。

## Log Out

アカウントの更新が完了したら、ログアウトすることを忘れないでください。

1. 右上の自分の名前をクリックします。
1. ドロップダウンリストから **Log Out** をクリックします。

## Password Change Requirement

場合によっては、パスワードを変更する必要があるかもしれません。たとえば、パスワードの要件が変更され、現在のパスワードが新しい要件を満たさない場合は、新しいパスワードを選択する必要があります。

この場合、ログイン時に **Set Password** ページが表示されます。

現在のパスワード要件がページに表示されます。新しいパスワードを選択し、確認のためにもう一度入力し、保存してください。

必ず覚えやすいパスワードを選択してください。
