---
title: User Opt-Out
description: ユーザーのオプトアウトに関する情報。
hide_table_of_contents: false
sidebar_position: 02
---

# User Opt-Out

さまざまなパブリッシャーや広告主が UID2 を使用しています。しかし、UID2 全体としては、すべての UID2 [参加者](../ref-info/glossary-uid.md#gl-participant) が受け入れるべき、非常に具体的なオプトアウトプロセスがあります。

<!-- It includes:

* [How Users Can Opt Out of UID2](#how-users-can-opt-out-of-uid2)
* [Results of Opting Out of UID2](#results-of-opting-out-of-uid2)
* [Difference Between Opting Out from a Single Participant and Opting Out of UID2](#difference-between-opting-out-from-a-single-participant-and-opting-out-of-uid2)
* [Opt-Out Is Final](#opt-out-is-final)
* [Opt-Out Workflow](#opt-out-workflow)
 -->

## How Users Can Opt Out of UID2

UID2 エコシステムには、2 種類のオプトアウトがあります:
- 参加者のサイトからのオプトアウト
- UID2 からのオプトアウト

各参加者には独自のオプトアウトワークフローがあるため、参加者はユーザーのオプトアウトステータスを受け入れ、したがって参加者からオプトアウトしたユーザーの UID2 を作成しないことが義務付けられています。

例えば、あるユーザーがパブリッシャーのサイトからオプトアウトしたが、UID2 からオプトアウトしていない場合、パブリッシャーはそのユーザーの UID2 Token を生成すべきではありません。 

消費者はいつでも、[Transparency and Control Portal](https://www.transparentadvertising.com/) で UID2 を完全にオプトアウトすることができます。メールアドレスまたは電話番号を選択し、データを入力し、プロンプトに従います。

:::tip
メールアドレスと電話番号の両方をオプトアウトするには、それぞれ行います。
:::

## Difference Between Opting Out from a Single Participant and Opting Out of UID2

消費者が特定の参加者からオプトアウトした場合、UID2 のガイドラインでは、その参加者は、その消費者の情報を使用して UID2 を作成したり生成したりしないことを義務付けています。これは UID2 フレームワークの要件です。

さらに、ユーザーが特定の参加者からオプトアウトした場合、その情報は UID2 には伝わりません。特定の参加者からオプトアウトしても、消費者が UID2 からオプトアウトされるわけではありません。

消費者が UID2 を完全にオプトアウトする確実な方法は、[Transparency and Control Portal](https://www.transparentadvertising.com/) にあります。

## Opt-Out Workflow

消費者が UID2 をオプトアウトすると、その個人の UID2 は、UID2 エコシステムのどこででも、ターゲティング広告のために受け入れられることはなくなります。ただし、UID2 情報の処理と更新にかかる時間には遅延があるため、オプトアウトしたユーザーの UID2 は、オプトアウト後もしばらくの間は有効である可能性があります。各参加者が UID2 を定期的に更新すると、オプトアウト情報が参加者に伝搬されます。

以下のステップは、パブリッシャーまたはその ID プロバイダーと関わるユーザーを対象とした、ワークフローの概要です。

1. ユーザーは [Transparency and Control Portal](https://www.transparentadvertising.com/) にアクセスし、UID2 のオプトアウトをグローバルに行うことができます。
2. Transparency and Control Portalは、オプトアウト要求を UID2 [Operator Service](../ref-info/glossary-uid.md#gl-operator-service) に送信します。
3. ユーザーがオプトアウトした場合、UID2 Operator Service はオプトアウト情報を UID2 参加者に以下のように配布します:

   | Participant | Distribution Method |
   | :--- | :--- | 
   | Publishers | [POST /token/generate](../endpoints/post-token-generate.md) を必須パラメータ `optout_check` を `1` に設定して呼び出したパブリッシャー、または [POST /token/refresh](../endpoints/post-token-refresh.md) を呼び出したパブリッシャーは、UID2 Token の代わりにオプトアウトレスポンスを受け取ります。|
   | DSPs | UID2 Operator Service は、この目的のために提供される Webhook を介して、すべてのオプトアウト済みユーザーの情報を DSP に配信します。詳細については、[Honor User Opt-Outs](../guides/dsp-guide#honor-user-opt-outs)を参照してください。 |
   | Advertisers | UID2 Operator Serviceは、[POST /identity/map](../endpoints/post-identity-map.md) エンドポイントを介して、オプトアウト情報を広告主に配布します。 |

このワークフローにより、ユーザーは UID2 識別子の作成に同意し、Transparency and Control Portalを通じて UID2 の同意とプライバシー設定を管理することができます。

![User Trust Workflow](images/UID2GlobalOptoutWorkflow.png)


<!-- 3. If the user has opted out, the UID2 Operator Service distributes the opt-out information to various UID2 participant types, as follows:
   - **Publishers**: A publisher calling  the [POST /token/generate](../endpoints/post-token-generate.md) or [POST /token/refresh](../endpoints/post-token-refresh.md) endpoint receives the opt-out response. At this point, there is no longer a valid UID2 token for that user.
   - **DSPs**: The UID2 Operator Service distributes information on all opted-out users to DSPs via a webhook provided for the purpose. For details, see [Honor User Opt-Outs](../guides/dsp-guide#honor-user-opt-outs).
   - **Advertisers**: The UID2 Operator Service distributes opt-out information to advertisers via the [POST /identity/map](../endpoints/post-identity-map.md) endpoint.
 -->
