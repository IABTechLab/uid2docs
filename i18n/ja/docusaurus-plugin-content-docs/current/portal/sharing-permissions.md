---
title: Sharing Permissions
description: UID2 Portal での共有権限の設定。
hide_table_of_contents: false
sidebar_position: 04
---

import Link from '@docusaurus/Link';

# Sharing Permissions

Sharing permissions (共有権限) を設定することで、他の UID2 参加者と UID2 を共有できるようになります。

適切な共有関係を作成するのに役立つ多くのオプションがあります:

- **Recommendations**: 1つ以上のカテゴリ (パブリッシャー、広告主、DSP、またはデータプロバイダー) の現在および将来の参加者全員と共有するための推奨を、ワンクリックで受け入れることができます。 [Bulk Add Sharing Permissions](#bulk-add-sharing-permissions) を参照してください。

  Recommendations は、アカウント設定で指定した参加者のタイプに基づいています。
- **Sharing Categories**: 設定した1つ以上の特定のカテゴリ (パブリッシャー、広告主、DSP、またはデータプロバイダー) のすべての現在および将来の参加者と共有することができます。
- **Individual Sharing Relationships**: 1つ以上の現在の参加者との共有関係を作成できます。このオプションでは、将来の共有権限を手動で追加する必要があります。

:::note
他の参加者と共有許可を設定しても、データが共有されるわけではありません。受信者があなたの UID2 Token を raw UID2 に復号化できるようになるだけです。情報が共有されるのは、あなたが他の参加者に明示的に送信するか、他の参加者があなたに送信した場合のみです。
:::

## Sharing Permissions Overview

意図した UID2 Token の受信者が UID2 Token を解読して raw UID2 にできるよう、送信者は受信者に許可を与える必要があります。共有許可は UID2 Portal で定義します。

UID2 Portal へのアクセスについては、UID2 の担当者にお尋ねください。詳細については、[Request an Account](portal-getting-started.md#request-an-account) を参照してください。UID2 を初めて使用する場合は、[Account Setup](../getting-started/gs-account-setup.md) を参照してください。

:::note
Sharing の使用には API Key (詳細は [API Keys](api-keys.md) を参照) またはクライアントサイドキーペア (詳細は [Client-Side Integration](client-side-integration.md) を参照) が必要です。共有許可を設定する前にこれらの値を設定してください。
:::

## Sharing Options

UID2 Portal では、以下の共有オプションを利用できます。これらのオプションは相互に排他的なものではありません&#8212;必要に応じて組み合わせることができます:

- すべてのパブリッシャー、広告主、DSP、データプロバイダーなど、特定のタイプの参加者全員に自動的に許可を与えることができます。例えば、パブリッシャーはすべての DSP に共有許可を与えることを勧めます。

  このオプションを選択すると、選択した参加者タイプのすべての新規参加者に、送信したデータを復号化する権限が自動的に付与されます。[Bulk Add Sharing Permissions](#bulk-add-sharing-permissions) を参照してください。

- 1人以上の特定の参加者に権限を付与できます。[Using Search to Add Sharing Relationships](#using-search-to-add-sharing-relationships) を参照してください。
 
共有許可は、UID2 Portal でいつでも更新できます。

## Bulk Add Sharing Permissions

UID2 Portal は、あなたの役割に基づいて推奨を行います。例えば:
- パブリッシャーであれば、すべてのDSP (現在および将来) と共有できます。
- 広告主であれば、すべてのデータプロバイダー (現在および将来) と共有できます。
- DSP であれば、すべての広告主とすべてのデータプロバイダー (現在および将来) と共有できます。
- データプロバイダーであれば、すべての広告主、すべてのパブリッシャー、すべてのDSP (現在および将来) と共有できます。 

以下の図は、広告主向けの推奨を示しています。

![UID2 Portal, Sharing Permissions page, Recommendations (Advertiser)](images/portal-sharing-permissions.png)

推奨を受け入れることが、共有オプションを設定する最も速く簡単な方法です。

例えば、既存の 20 の DSP すべてと共有することを選択したとします。翌日、DSP 21 が共有にサインアップすると、DSP 21 は自動的に、あなたが送信したデータを復号化する権限を持つことになります。DSP 21 と共有するには、1つ以上の UID2 Token を送信するだけで、DSP 21 はトークンを復号化して raw UID2 に変換できるようになります。自動共有を選択したため、ログインして共有権限を明示的に更新する必要はありません。

必要に応じて、1 つ以上の共有参加者と個別の共有関係を設定すできます。

## Using Search to Add Sharing Relationships

特定の共有関係を作成したい場合は、**Add Permissions** をクリックして、共有参加者を見つけて追加します。

利用可能な共有参加者のリストでは、次のフィルタが利用可能です:
- パブリッシャー
- 広告主
- データプロバイダー
- DSP

:::note
検索機能を使用して手動で共有関係を作成する場合、現在のアクセス許可は作成されますが、将来のアクセス許可は作成されません。将来の参加者を含むように共有パーミッションを設定する唯一の方法は、推奨を受け入れることです。または、将来の参加者を追加するには、UID2 Portal に再度ログインし、追加の共有参加者を検索する必要があります。
:::

## Steps for Granting Sharing Permission

共有許可を有効にするには、以下の手順を実行します。

:::note
UID2 Portal で共有許可を与えるだけでなく、SDK または Snowflake の機能をコードにインテグレーションする必要があります。[Tokenized Sharing Overview](../sharing/sharing-tokenized-overview.md) を参照してください。
:::

1. UID2 Portal アカウントにログインします。
1. **Sharing Permissions** をクリックします。
1. 以下のいずれかを実行します:

   - **Bulk Add Permission to Sharing Categories**: 設定した1つ以上の特定のカテゴリ (パブリッシャー、広告主、DSP、またはデータプロバイダー) の現在および将来の参加者全員と共有できます。

   - **Review and Accept Recommendations**: 推奨を確認し、必要に応じて推奨カテゴリを追加またはクリアし、**Add Permissions** をクリックします。

    広告主や DSP などの参加者カテゴリーを承認すると、そのタイプの現在の参加者だけでなく、将来 UID2 エコシステムに参加する同じタイプの参加者にも共有が有効になります。
   
   - **Add Permissions**: 必要に応じて、共有する個々の参加者を検索することができます。詳しくは [Using Search to Add Sharing Relationships](#using-search-to-add-sharing-relationships) を参照してください。
1. 変更を保存します。

:::note
共有権限を有効にすると、選択した共有参加者が復号鍵にアクセスできるようになります。共有許可を有効にした各参加者は、UID2 SDK または Snowflake インテグレーションを介して、UID2 Token を raw UID2 に復号化するためにあなたのキーを使用できます。ただし、許可を与えることは最初のステップに過ぎません。共有するためには、トークンを参加者に送信する必要があります。UID2 Portal は許可を有効にしますが、データを送信することはありません。
:::
