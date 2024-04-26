---
title: FAQs
description: UID2 の実装に関するよくある質問。
hide_table_of_contents: false
sidebar_position: 20
---

import Link from '@docusaurus/Link';

# Frequently Asked Questions

UID2 に関するよくある質問は、以下のカテゴリーに分かれています:

<!-- This page includes:

- [FAQs&#8212;General](#faqsgeneral)
- [FAQs for Publishers](#faqs-for-publishers)
- [FAQs for Advertisers and Data Providers](#faqs-for-advertisers-and-data-providers)
- [FAQs for DSPs)](#faqs-for-dsps) -->

## FAQs&#8212;General

UID2 フレームワークに関するよくある質問を紹介します。

   - [Will all integration partners in the EUID infrastructure (SSPs, third-party data providers, measurement providers) be automatically integrated with UID2?](#will-all-integration-partners-in-the-euid-infrastructure-ssps-third-party-data-providers-measurement-providers-be-automatically-integrated-with-uid2)
   - [Can users opt out of targeted advertising tied to their UID2 identity?](#can-users-opt-out-of-targeted-advertising-tied-to-their-uid2-identity)
   - [When I send DII to UID2, does UID2 store the information?](#when-i-send-dii-to-uid2-does-uid2-store-the-information)
   - [Does UID2 allow the processing of HIPAA-regulated data?](#does-uid2-allow-the-processing-of-hipaa-regulated-data)

<!-- - [EUID インフラストラクチャのすべてのインテグレーションパートナー (SSP、第三者データプロバイダー、測定プロバイダー)は、自動的に UID2 にインテグレーションされるのでしょうか？](#EUID-%E3%82%A4%E3%83%B3%E3%83%95%E3%83%A9%E3%82%B9%E3%83%88%E3%83%A9%E3%82%AF%E3%83%81%E3%83%A3%E3%81%AE%E3%81%99%E3%81%B9%E3%81%A6%E3%81%AE%E3%82%A4%E3%83%B3%E3%83%86%E3%82%B0%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%91%E3%83%BC%E3%83%88%E3%83%8A%E3%83%BC-%28SSP%E3%80%81%E7%AC%AC%E4%B8%89%E8%80%85%E3%83%87%E3%83%BC%E3%82%BF%E3%83%97%E3%83%AD%E3%83%90%E3%82%A4%E3%83%80%E3%83%BC%E3%80%81%E6%B8%AC%E5%AE%9A%E3%83%97%E3%83%AD%E3%83%90%E3%82%A4%E3%83%80%E3%83%BC%29%E3%81%AF%E3%80%81%E8%87%AA%E5%8B%95%E7%9A%84%E3%81%AB-UID2-%E3%81%AB%E3%82%A4%E3%83%B3%E3%83%86%E3%82%B0%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%95%E3%82%8C%E3%82%8B%E3%81%AE%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8B%EF%BC%9F)
- [ユーザーは、UID2 ID に関連するターゲティング広告の配信を拒否できますか？](#%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%81%AF%E3%80%81UID2-ID-%E3%81%AB%E9%96%A2%E9%80%A3%E3%81%99%E3%82%8B%E3%82%BF%E3%83%BC%E3%82%B2%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0%E5%BA%83%E5%91%8A%E3%81%AE%E9%85%8D%E4%BF%A1%E3%82%92%E6%8B%92%E5%90%A6%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%99%E3%81%8B%EF%BC%9F)
- [UID2 に DII を送信すると、UID2 はその情報を保存しますか？](#UID2-%E3%81%AB-DII-%E3%82%92%E9%80%81%E4%BF%A1%E3%81%99%E3%82%8B%E3%81%A8%E3%80%81UID2-%E3%81%AF%E3%81%9D%E3%81%AE%E6%83%85%E5%A0%B1%E3%82%92%E4%BF%9D%E5%AD%98%E3%81%97%E3%81%BE%E3%81%99%E3%81%8B%EF%BC%9F)
 - [DUID2 では、HIPAA で規制されているデータを処理できますか？](#UID2-%E3%81%A7%E3%81%AF%E3%80%81HIPAA-%E3%81%A7%E8%A6%8F%E5%88%B6%E3%81%95%E3%82%8C%E3%81%A6%E3%81%84%E3%82%8B%E3%83%87%E3%83%BC%E3%82%BF%E3%82%92%E5%87%A6%E7%90%86%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%99%E3%81%8B%EF%BC%9F) -->

#### Will all integration partners in the EUID infrastructure (SSPs, third-party data providers, measurement providers) be automatically integrated with UID2?

いいえ。UID2 は EUID とは別の独自のフレームワークとして機能します。そのため、EUID フレームワークへのアクセスや使用に関する事務手続きは、UID2 フレームワークへの使用やアクセスを自動的に許可するものではありません。新規契約を UID2 用に締結する必要があります。

#### Can users opt out of targeted advertising tied to their UID2 identity?

はい。[Transparency and Control Portal](https://www.transparentadvertising.com/) を通して、ユーザーは自分の UID2 ID に関連するターゲティング広告の配信をオプトアウトできます。各リクエストは、UID2 Opt-Opt Service と UID2 Operator を通じて配信され、UID2 Operator はオプトアウト情報を関連するすべての参加者に公開します。

#### When I send DII to UID2, does UID2 store the information?

いいえ、UID2 にはは DII を保存しません。さらに、ほとんどの場合、UID2は[POST&nbsp;/token/generate](../endpoints/post-token-generate.md), [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md)、[POST /identity/map](../endpoints/post-identity-map.md) が実行されると、値をまったく保存しません。

必要な例外は、ユーザーがオプトアウトした場合です。このシナリオでは、UID2 には、オプトアウトされたユーザーを示すハッシュ化された不透明な値が格納されます。保存された値をリバース エンジニアリングして DII の元の値に戻すことはできませんが、同じ DII から生成された UID2 に対する将来の要求を識別するために使用できるため、これらのリクエストは拒否されます。

#### Does UID2 allow the processing of HIPAA-regulated data?

いいえ。UID2 の参加者は、HIPAA (Health Insurance Portability and Accountability Act of 1996;医療保険の携行性と責任に関する法律) で定義されている、保護対象保険情報 (PHI: Protected Health Information) から UID2 を生成してはなりません。

## FAQs for Publishers

UID2 フレームワークを使用するパブリッシャーからのよくある質問です。

  - [How can I test that the DII sent and the returned token match up?](#how-can-i-test-that-the-dii-sent-and-the-returned-token-match-up)
  - [Do I need to decrypt tokens?](#do-i-need-to-decrypt-tokens)
  - [How will I be notified of user opt-out?](#how-will-i-be-notified-of-user-opt-out)
  - [Where should I make token generation calls&#8212;from the server or client side?](#where-should-i-make-token-generation-callsfrom-the-server-or-client-side)
  - [Can I make token refresh calls from the client side?](#can-i-make-token-refresh-calls-from-the-client-side)
  - [How can I test the refresh token workflow?](#how-can-i-test-the-refresh-token-workflow)
  - [What is the uniqueness and rotation policy for UID2 tokens?](#what-is-the-uniqueness-and-rotation-policy-for-uid2-tokens)
  - [What does a UID2 token look like in the bid stream?](#what-does-a-uid2-token-look-like-in-the-bid-stream)

<!--   - [送信された DII と返されたトークンが一致していることをテストするにはどうすればよいですか？](#%E9%80%81%E4%BF%A1%E3%81%95%E3%82%8C%E3%81%9F-DII-%E3%81%A8%E8%BF%94%E3%81%95%E3%82%8C%E3%81%9F%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3%E3%81%8C%E4%B8%80%E8%87%B4%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E3%81%93%E3%81%A8%E3%82%92%E3%83%86%E3%82%B9%E3%83%88%E3%81%99%E3%82%8B%E3%81%AB%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8C%E3%81%B0%E3%82%88%E3%81%84%E3%81%A7%E3%81%99%E3%81%8B%EF%BC%9F)
  - [トークンを復号化する必要がありますか？](#%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3%E3%82%92%E5%BE%A9%E5%8F%B7%E5%8C%96%E3%81%99%E3%82%8B%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8A%E3%81%BE%E3%81%99%E3%81%8B%EF%BC%9F)
  - [ユーザーの out-out はどのように通知されますか？](#%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%81%AE-out-out-%E3%81%AF%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AB%E9%80%9A%E7%9F%A5%E3%81%95%E3%82%8C%E3%81%BE%E3%81%99%E3%81%8B%EF%BC%9F)
  - [トークン生成の呼び出しは、Server-Side とClient-Side のどちらで行うべきですか？](#%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3%E7%94%9F%E6%88%90%E3%81%AE%E5%91%BC%E3%81%B3%E5%87%BA%E3%81%97%E3%81%AF%E3%80%81Server-Side-%E3%81%A8Client-Side-%E3%81%AE%E3%81%A9%E3%81%A1%E3%82%89%E3%81%A7%E8%A1%8C%E3%81%86%E3%81%B9%E3%81%8D%E3%81%A7%E3%81%99%E3%81%8B%EF%BC%9F)
  - [Client-Side からトークンのリフレッシュを呼び出すことはできますか？](#Client-Side-%E3%81%8B%E3%82%89%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3%E3%81%AE%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5%E3%82%92%E5%91%BC%E3%81%B3%E5%87%BA%E3%81%99%E3%81%93%E3%81%A8%E3%81%AF%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%99%E3%81%8B%EF%BC%9F)
  - [リフレッシュトークンのワークフローをテストするにはどうすればよいですか？](#%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3%E3%81%AE%E3%83%AF%E3%83%BC%E3%82%AF%E3%83%95%E3%83%AD%E3%83%BC%E3%82%92%E3%83%86%E3%82%B9%E3%83%88%E3%81%99%E3%82%8B%E3%81%AB%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8C%E3%81%B0%E3%82%88%E3%81%84%E3%81%A7%E3%81%99%E3%81%8B%EF%BC%9F)
  - [UID2 Token の一意性とローテーションポリシーは？](#uid2-token-%E3%81%AE%E4%B8%80%E6%84%8F%E6%80%A7%E3%81%A8%E3%83%AD%E3%83%BC%E3%83%86%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%9D%E3%83%AA%E3%82%B7%E3%83%BC%E3%81%AF%EF%BC%9F)
  - [ビッドストリームで UID2 Token はどのように見えますか？](#%E3%83%93%E3%83%83%E3%83%89%E3%82%B9%E3%83%88%E3%83%AA%E3%83%BC%E3%83%A0%E3%81%A7-UID2-Token-%E3%81%AF%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AB%E8%A6%8B%E3%81%88%E3%81%BE%E3%81%99%E3%81%8B%EF%BC%9F) -->

#### How can I test that the DII sent and the returned token match up?

[POST&nbsp;/token/validate](../endpoints/post-token-validate.md) エンドポイントを使用して、[POST&nbsp;/token/generate](../endpoints/post-token-generate.md) で送信している [DII](../ref-info/glossary-uid.md#gl-dii) が有効かどうかをチェックできます。`POST /token/validate` は主にテスト目的で使用されます。

詳細は、[Using POST&nbsp;/token/validate to Test](../endpoints/post-token-validate.md#using-post-tokenvalidate-to-test) を参照してください。

#### Do I need to decrypt tokens?

いいえ、パブリッシャーは [UID2 Token](../ref-info/glossary-uid.md#gl-uid2-token) を復号化する必要はありません。しかし、社内でのみ使用するために [raw UID2](../ref-info/glossary-uid.md#gl-raw-uid2) にアクセスしたい場合は、UID2 support と協力してアクセスしてください。

#### How will I be notified of user opt-out?

ユーザーがオプトアウトした場合、API レスポンスは以下のいずれかのケースで通知します:
- 直接または UID2 SDK のいずれかで [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) エンドポイントを呼び出し、UID2 Token を生成する場合、必須の `optout_check` パラメータに `1` を指定します。
- 直接または UID2 SDK のいずれかで [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) エンドポイントを呼び出し、UID2 Token をリフレッシュした場合。

#### Where should I make token generation calls&#8212;from the server or client side?

UID2 Token は、Client-Side、Server-Sideのどちらでも生成できます。詳細については、以下を参照してください:
- Prebid.js を使用して Client-Side からトークンを生成します: [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md).
- Prebid.js を使用して Server-Side からトークンを生成します: [UID2 Server-Side Integration Guide for Prebid.js](../guides/integration-prebid-server-side.md).
- その他の Server-Side オプション: [Publisher Integrations](../guides/summary-guides.md#publisher-integrations).

#### Can I make token refresh calls from the client side?

はい。[POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) は、API Key を使用する必要がないため、Client-Side (例えば、ブラウザやモバイルアプリ) から呼び出すことができます。

#### How can I test the refresh token workflow?

`refresh-optout@example.com` のメールアドレスまたは `+00000000002` の電話番号を使用して、トークンリフレッシュのワークフローをテストすることができます。どちらかのパラメータ値をリクエストに使用すると、常に `refresh_token` を含む identity レスポンスが生成され、ログアウトレスポンスが返されます。

SDKを使うかどうかで手順は少し異なります。

##### With SDK:

1. DII がメールアドレスか電話番号かに応じて、以下の値のいずれかを使用して [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) リクエストを送信します:
   - `email` の値として `refresh-optout@example.com` を指定します。
   - ``refresh-optout@example.com` のハッシュを `email_hash` 値として指定します。
   - `phone` の値として `+00000000002` を指定します。
   - `phone_hash` 値として `+00000000002` のハッシュを指定します。
2. SDK の [background auto-refresh](../sdks/client-side-identity.md#background-token-auto-refresh) が Advertising Token のリフレッシュを試み(これには数時間かかることがあります)、リフレッシュの試みが `OPTOUT` ステータスで失敗するのを観察するまで待ちます。この時点で SDK はファーストパーティクッキーもクリアします。

##### Without SDK:

1. DII がメールアドレスか電話番号かに応じて、以下の値のいずれかを使用して [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) リクエストを送信します:
   - `email` の値として `refresh-optout@example.com` を指定します。
   - `refresh-optout@example.com` のハッシュを `email_hash` 値として指定します。
   - `phone` の値として `+00000000002` を指定します。
   - `phone_hash` 値として `+00000000002` のハッシュを指定します。
2. 返された `refresh_token` を次のステップで使用するために保存します。
3. [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) リクエストを `refresh_token` (Step 2 で保存) を `token` 値として送信します。<br/>ボディのレスポンスは空でなければならず、`refresh-optout@example.com` のメールアドレスと `+00000000002` の電話番号は常にログアウトしたユーザになるので、`status` の値は `optout` でなければなりません。

#### What is the uniqueness and rotation policy for UID2 tokens?

UID2 Service は、ランダムな初期化ベクトルを使用して UID2 Token を暗号化します。UID2 Token は、ユーザーがインターネットを閲覧する際に、特定のユーザーに対して一意になります。つまり、UID2 Token が生成されるたびに、同じ UID2 であっても常に異なるトークンが生成されます。トークンが更新されるたびに新しいトークンが生成され、暗号化されます。この仕組みにより、信頼できない当事者がユーザーの身元を追跡できないようにすることができます。

#### What does a UID2 token look like in the bid stream?

UID2 実装のアプローチにはさまざまな方法があります。以下は、UID2 Token がビッドストリームでどのように渡されるかを示すコードスニペットの一例です:

```js
{
  "user":{
    "ext":{
      "eids":[
        {
          "source":"uidapi.com",
          "uids":[
            {
              "id":"AgAAAHcy2ka1tSweERARV/wgwM+zM5wK98b9XItZGVgHaU23Eh0XOmAixO6VBcMd3k2ir/TGHLf7O7kQGLyeRPC5/VBSPmugOblMlzgy0B1ZfHQ7ccVurbyzgL1ZZOZ5cBvPDrvfR9MsKqPgWvrIKRkKVTYyUkG5YRAc++xRKfbL/ZSYxQ==",
              "rtiPartner":"UID2"
            }
          ]
        }
      ]
    }
  }
}
```

## FAQs for Advertisers and Data Providers

UID2 フレームワークを使用する広告主やデータプロバイダーによくある質問を紹介します。

   - [How do I know when to refresh the UID2 due to salt bucket rotation?](#how-do-i-know-when-to-refresh-the-uid2-due-to-salt-bucket-rotation)
   - [Do refreshed emails get assigned to the same bucket with which they were previously associated?](#do-refreshed-emails-get-assigned-to-the-same-bucket-with-which-they-were-previously-associated)
   - [How often should UID2s be refreshed for incremental updates?](#how-often-should-uid2s-be-refreshed-for-incremental-updates)
   - [How should I generate the SHA-256 of DII for mapping?](#how-should-i-generate-the-sha-256-of-dii-for-mapping)
   - [Should I store large volumes of email address, phone number, or their hash mappings?](#should-i-store-large-volumes-of-email-address-phone-number-or-their-hash-mappings)
   - [How should I handle user opt-outs?](#how-should-i-handle-user-opt-outs)
   - [Does the same DII always result in the same raw UID2?](#does-the-same-dii-always-result-in-the-same-raw-uid2)

<!-- - [ソルトバケットのローテーションにより、UID2 を更新するタイミングを知るにはどうすればよいですか？](#%E3%82%BD%E3%83%AB%E3%83%88%E3%83%90%E3%82%B1%E3%83%83%E3%83%88%E3%81%AE%E3%83%AD%E3%83%BC%E3%83%86%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AB%E3%82%88%E3%82%8Auid2-%E3%82%92%E6%9B%B4%E6%96%B0%E3%81%99%E3%82%8B%E3%82%BF%E3%82%A4%E3%83%9F%E3%83%B3%E3%82%B0%E3%82%92%E7%9F%A5%E3%82%8B%E3%81%AB%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8C%E3%81%B0%E3%82%88%E3%81%84%E3%81%A7%E3%81%99%E3%81%8B)
- [リフレッシュされたメールアドレスは、以前関連付けられていたバケットと同じバケットに割り当てられるのでしょうか？](#%E3%83%AA%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5%E3%81%95%E3%82%8C%E3%81%9F%E3%83%A1%E3%83%BC%E3%83%AB%E3%82%A2%E3%83%89%E3%83%AC%E3%82%B9%E3%81%AF%E4%BB%A5%E5%89%8D%E9%96%A2%E9%80%A3%E4%BB%98%E3%81%91%E3%82%89%E3%82%8C%E3%81%A6%E3%81%84%E3%81%9F%E3%83%90%E3%82%B1%E3%83%83%E3%83%88%E3%81%A8%E5%90%8C%E3%81%98%E3%83%90%E3%82%B1%E3%83%83%E3%83%88%E3%81%AB%E5%89%B2%E3%82%8A%E5%BD%93%E3%81%A6%E3%82%89%E3%82%8C%E3%82%8B%E3%81%AE%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8B)
- [インクリメンタルアップデートの場合、UID2 はどれくらいの頻度で更新されるべきですか？](#%E3%82%A4%E3%83%B3%E3%82%AF%E3%83%AA%E3%83%A1%E3%83%B3%E3%82%BF%E3%83%AB%E3%82%A2%E3%83%83%E3%83%97%E3%83%87%E3%83%BC%E3%83%88%E3%81%AE%E5%A0%B4%E5%90%88%E3%80%81UID2-%E3%81%AF%E3%81%A9%E3%82%8C%E3%81%8F%E3%82%89%E3%81%84%E3%81%AE%E9%A0%BB%E5%BA%A6%E3%81%A7%E6%9B%B4%E6%96%B0%E3%81%95%E3%82%8C%E3%82%8B%E3%81%B9%E3%81%8D%E3%81%A7%E3%81%99%E3%81%8B%EF%BC%9F)
- [マッピング用の DII の SHA-256 はどのように生成すればよいですか？](#%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E7%94%A8%E3%81%AE-dii-%E3%81%AE-sha-256-%E3%81%AF%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AB%E7%94%9F%E6%88%90%E3%81%99%E3%82%8C%E3%81%B0%E3%82%88%E3%81%84%E3%81%A7%E3%81%99%E3%81%8B)
- [大量のメールアドレスや電話番号、またはそれらのハッシュマッピングを保存する必要がありますか？](#%E5%A4%A7%E9%87%8F%E3%81%AE%E3%83%A1%E3%83%BC%E3%83%AB%E3%82%A2%E3%83%89%E3%83%AC%E3%82%B9%E3%82%84%E9%9B%BB%E8%A9%B1%E7%95%AA%E5%8F%B7%E3%81%BE%E3%81%9F%E3%81%AF%E3%81%9D%E3%82%8C%E3%82%89%E3%81%AE%E3%83%8F%E3%83%83%E3%82%B7%E3%83%A5%E3%83%9E%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%82%92%E4%BF%9D%E5%AD%98%E3%81%99%E3%82%8B%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8A%E3%81%BE%E3%81%99%E3%81%8B)
- [ユーザーのオプトアウトはどのように処理すればよいですか？](#%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%81%AE%E3%82%AA%E3%83%97%E3%83%88%E3%82%A2%E3%82%A6%E3%83%88%E3%81%AF%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AB%E5%87%A6%E7%90%86%E3%81%99%E3%82%8C%E3%81%B0%E3%82%88%E3%81%84%E3%81%A7%E3%81%99%E3%81%8B)
- [同じ DII は常に同じ raw UID2 になりますか？](#%E5%90%8C%E3%81%98-DII-%E3%81%AF%E5%B8%B8%E3%81%AB%E5%90%8C%E3%81%98-raw-UID2-%E3%81%AB%E3%81%AA%E3%82%8A%E3%81%BE%E3%81%99%E3%81%8B%EF%BC%9F) -->


#### How do I know when to refresh the UID2 due to salt bucket rotation?

UID2 生成リクエストで提供されるメタデータには、UID2 の生成に使用されるソルトバケットが含まれます。ソルトバケットは持続し、UID2 の生成に使用された基礎的な DII に対応します。指定されたタイムスタンプ以降にローテーションしたソルトバケットを得るには、[POST&nbsp;/identity/buckets](../endpoints/post-identity-buckets.md) エンドポイントを使用します。返されたローテーションしたソルトバケットは、どの UID2 をリフレッシュすべきかを教えてくれます。

:::note
ローテーションがいつ行われるかについては、いかなる約束もいたしません。可能な限り最新の状態を保つため、1 時間に 1 回のチェックをお勧めします。
:::

#### Do refreshed emails get assigned to the same bucket with which they were previously associated?

必ずしもそうとは限りません。特定のバケット ID に関連付けられたメールアドレスを再マッピングした後、そのメールが異なるバケット ID に割り当てられる可能性があります。バケット ID を確認するには、[マッピング関数を呼び出す](../guides/advertiser-dataprovider-guide.md#1-retrieve-a-raw-uid2-for-dii-using-the-identity-map-endpoint) そして返された UID2 とバケット ID を再び保存してください。

:::info
メールアドレスのマッピングや再マッピングを行う際には、バケットの数やローテーションする日、メールアドレスが割り当てられる特定のバケットについて、いかなる仮定も行わないようにしてください。
:::

#### How often should UID2s be refreshed for incremental updates?

オーディエンスの更新は、毎日行うことが推奨されています。

ソルトバケットは 1 年に 1 回程度更新されますが、個々のバケットの更新は 1 年に分散して行われます。これは、全バケットの約 1/365 が毎日ローテーションされることを意味します。もし忠実さが重要であれば、[POST&nbsp;/identity/buckets](../endpoints/post-identity-buckets.md) エンドポイントをもっと頻繁に、例えば 1 時間ごとに呼び出すことを検討してください。

#### How should I generate the SHA-256 of DII for mapping?

システムは[メールアドレス正規化ルール](../getting-started/gs-normalization-encoding#email-address-normalization)にしたがって、salt せずにハッシュ化する必要があります。

#### Should I store large volumes of email address, phone number, or their hash mappings?

はい。何百万ものメールアドレスや電話番号をマッピングする必要がある場合、マッピングを保存しないことで処理時間が大幅に増加する可能性があります。しかし、実際に更新が必要なマッピングだけを再計算すると、毎日更新する必要があるのは UID2 の約 365 分の 1 なので、総処理時間が短縮されます。

:::info
Private Operator を使用している場合を除き、メールアドレス、電話番号、ハッシュのマッピングは、単一の HTTP 接続を使用して、一度に 5,000件 ずつ連続して行う必要があります。言い換えれば、複数の並列接続を作成せずにマッピングを行うことです。
:::

#### How should I handle user opt-outs?

ユーザーが [Transparency and Control Portal](https://www.transparentadvertising.com/) を通じて UID2 ベースのターゲティング広告をオプトアウトすると、オプトアウト信号が DSP とパブリッシャーに送信され、DSP とパブリッシャーが入札時にオプトアウトを処理します。広告主やデータプロバイダーは、[POST /identity/map](../endpoints/post-identity-map.md) エンドポイントを通じて、ユーザーがオプトアウトしたかどうかを定期的に確認することを勧めます。

ウェブサイトを通じてユーザーがオプトアウトした場合、オプトアウトを処理するための内部手順に従ってください。たとえば、そのユーザーの UID2 を生成しないことを選択することもできます。

#### Does the same DII always result in the same raw UID2?

一般的にその通りです。DII から raw UID2 を生成するプロセスは同じであり、誰がリクエストを送信したかに関係なく、結果は同じ値になります。 2 人の UID2 参加者が同じメールアドレスを [POST /identity/map](../endpoints/post-identity-map.md) エンドポイントに同時に送信した場合、応答として両方とも同じ raw UID2 を取得します。 

ただし、raw UID2 の生成に使用される [ソルト](../ref-info/glossary-uid.md#gl-salt) 値という可変要素があります。ソルト値は定期的にローテーションされます(詳細については、[How often should UID2s be refreshed for incremental updates?](#how-often-should-uid2s-be-refreshed-for-incremental-updates)) を参照してください)。あるリクエストと別のリクエストの間でソルト値が変化する場合、DII が同じであっても、これら 2 つのリクエストは 2 つの異なる raw UID2 になります。

詳細については、*Advertiser/Data Provider Integration Guide*の [Monitor for salt bucket rotations related to your stored raw UID2s](../guides/advertiser-dataprovider-guide.md#3-monitor-for-salt-bucket-rotations-related-to-your-stored-raw-uid2s) を参照してください。

## FAQs for DSPs

demand-side platform (DSP) に関するよくある質問を紹介します。

   - [How do I know which decryption key to apply to a UID2?](#how-do-i-know-which-decryption-key-to-apply-to-a-uid2)
   - [Where do I get the decryption keys?](#where-do-i-get-the-decryption-keys)
   - [How many decryption keys may be present in memory at any point?](#how-many-decryption-keys-may-be-present-in-memory-at-any-point)
   - [How do I know if/when the salt bucket has rotated?](#how-do-i-know-ifwhen-the-salt-bucket-has-rotated)
   - [Should the DSP be concerned with latency?](#should-the-dsp-be-concerned-with-latency)
   - [How should the DSP maintain proper frequency capping with UID2?](#how-should-the-dsp-maintain-proper-frequency-capping-with-uid2)
   - [Will all user opt-out traffic be sent to the DSP?](#will-all-user-opt-out-traffic-be-sent-to-the-dsp)
   - [Is the DSP expected to handle opt-out signals only for the UID2s that they already store?](#is-the-dsp-expected-to-handle-opt-out-signals-only-for-the-uid2s-that-they-already-store)
   - [How long should the DSP keep the opt-out list?](#how-long-should-the-dsp-keep-the-opt-out-list)
   - [Is the UID2 of an opted-out user sent to the opt-out endpoint in an encrypted form?](#is-the-uid2-of-an-opted-out-user-sent-to-the-opt-out-endpoint-in-an-encrypted-form)
   - [In what format is the UID2 of an opted-out user sent to the webhook?](#in-what-format-is-the-uid2-of-an-opted-out-user-sent-to-the-webhook)
   - [What request type do opt-outs use?](#what-request-type-do-opt-outs-use)
   - [How strict are the requirements for honoring opt-outs?](#how-strict-are-the-requirements-for-honoring-opt-outs)
   - [How do SDK errors impact the DSP's ability to respond to a bid?](#how-do-sdk-errors-impact-the-dsps-ability-to-respond-to-a-bid)

<!-- - [UID2 に適用する復号鍵はどのように決定すればよいですか？](#UID2-%E3%81%AB%E9%81%A9%E7%94%A8%E3%81%99%E3%82%8B%E5%BE%A9%E5%8F%B7%E9%8D%B5%E3%81%AF%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AB%E6%B1%BA%E5%AE%9A%E3%81%99%E3%82%8C%E3%81%B0%E3%82%88%E3%81%84%E3%81%A7%E3%81%99%E3%81%8B%EF%BC%9F)
- [復号鍵はどこで手に入りますか？](#%E5%BE%A9%E5%8F%B7%E9%8D%B5%E3%81%AF%E3%81%A9%E3%81%93%E3%81%A7%E6%89%8B%E3%81%AB%E5%85%A5%E3%82%8A%E3%81%BE%E3%81%99%E3%81%8B%EF%BC%9F)
- [メモリ上に存在する復号鍵の数はいくつですか？](#%E3%83%A1%E3%83%A2%E3%83%AA%E4%B8%8A%E3%81%AB%E5%AD%98%E5%9C%A8%E3%81%99%E3%82%8B%E5%BE%A9%E5%8F%B7%E9%8D%B5%E3%81%AE%E6%95%B0%E3%81%AF%E3%81%84%E3%81%8F%E3%81%A4%E3%81%A7%E3%81%99%E3%81%8B%EF%BC%9F)
- [ソルトバケットがローテーションしたかどうかを知るにはどうしたらよいですか？](#%E3%82%BD%E3%83%AB%E3%83%88%E3%83%90%E3%82%B1%E3%83%83%E3%83%88%E3%81%8C%E3%83%AD%E3%83%BC%E3%83%86%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%97%E3%81%9F%E3%81%8B%E3%81%A9%E3%81%86%E3%81%8B%E3%82%92%E7%9F%A5%E3%82%8B%E3%81%AB%E3%81%AF%E3%81%A9%E3%81%86%E3%81%97%E3%81%9F%E3%82%89%E3%82%88%E3%81%84%E3%81%A7%E3%81%99%E3%81%8B)
- [DSP はレイテンシーを気にする必要があるのでしょうか？](#dsp-%E3%81%AF%E3%83%AC%E3%82%A4%E3%83%86%E3%83%B3%E3%82%B7%E3%83%BC%E3%82%92%E6%B0%97%E3%81%AB%E3%81%99%E3%82%8B%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8B%E3%81%AE%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8B)
- [UID2 で DSP がフリークエンシーキャッピングを行には、どのようにすればよいですか？](#uid2-%E3%81%A7-dsp-%E3%81%8C%E3%83%95%E3%83%AA%E3%83%BC%E3%82%AF%E3%82%A8%E3%83%B3%E3%82%B7%E3%83%BC%E3%82%AD%E3%83%A3%E3%83%83%E3%83%94%E3%83%B3%E3%82%B0%E3%82%92%E8%A1%8C%E3%81%86%E3%81%AB%E3%81%AF%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AB%E3%81%99%E3%82%8C%E3%81%B0%E3%82%88%E3%81%84%E3%81%A7%E3%81%99%E3%81%8B)
- [ユーザーのオプトアウトのトラフィックはすべて DSP に送信されるのでしょうか？](#%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%81%AE%E3%82%AA%E3%83%97%E3%83%88%E3%82%A2%E3%82%A6%E3%83%88%E3%81%AE%E3%83%88%E3%83%A9%E3%83%95%E3%82%A3%E3%83%83%E3%82%AF%E3%81%AF%E3%81%99%E3%81%B9%E3%81%A6-dsp-%E3%81%AB%E9%80%81%E4%BF%A1%E3%81%95%E3%82%8C%E3%82%8B%E3%81%AE%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8B)
- [DSP は、既に記憶している UID2 に対してのみオプトアウト信号を処理することを想定しているのでしょうか？](#dsp-%E3%81%AF%E6%97%A2%E3%81%AB%E8%A8%98%E6%86%B6%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B-uid2-%E3%81%AB%E5%AF%BE%E3%81%97%E3%81%A6%E3%81%AE%E3%81%BF%E3%82%AA%E3%83%97%E3%83%88%E3%82%A2%E3%82%A6%E3%83%88%E4%BF%A1%E5%8F%B7%E3%82%92%E5%87%A6%E7%90%86%E3%81%99%E3%82%8B%E3%81%93%E3%81%A8%E3%82%92%E6%83%B3%E5%AE%9A%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E3%81%AE%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8B)
- [オプトアウトリストはいつまで保存しておくべきですか？](#%E3%82%AA%E3%83%97%E3%83%88%E3%82%A2%E3%82%A6%E3%83%88%E3%83%AA%E3%82%B9%E3%83%88%E3%81%AF%E3%81%84%E3%81%A4%E3%81%BE%E3%81%A7%E4%BF%9D%E5%AD%98%E3%81%97%E3%81%A6%E3%81%8A%E3%81%8F%E3%81%B9%E3%81%8D%E3%81%A7%E3%81%99%E3%81%8B)
- [オプトアウトしたユーザーの UID は、暗号化された形でオプトアウトエンドポイントに送信されますか？](#%E3%82%AA%E3%83%97%E3%83%88%E3%82%A2%E3%82%A6%E3%83%88%E3%81%97%E3%81%9F%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%81%AE-uid2-%E3%81%AF%E6%9A%97%E5%8F%B7%E5%8C%96%E3%81%95%E3%82%8C%E3%81%9F%E5%BD%A2%E3%81%A7%E3%82%AA%E3%83%97%E3%83%88%E3%82%A2%E3%82%A6%E3%83%88%E3%82%A8%E3%83%B3%E3%83%89%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%81%AB%E9%80%81%E4%BF%A1%E3%81%95%E3%82%8C%E3%81%BE%E3%81%99%E3%81%8B)
 - [オプトアウトされたユーザーの UID2 は、どのような形式で Webhook に送信されますか？](#%E3%82%AA%E3%83%97%E3%83%88%E3%82%A2%E3%82%A6%E3%83%88%E3%81%95%E3%82%8C%E3%81%9F%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E3%81%AE-UID2-%E3%81%AF%E3%80%81%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AA%E5%BD%A2%E5%BC%8F%E3%81%A7-Webhook-%E3%81%AB%E9%80%81%E4%BF%A1%E3%81%95%E3%82%8C%E3%81%BE%E3%81%99%E3%81%8B%EF%BC%9F)
- [オプトアウトはどのようなリクエストタイプを使用するのですか？](#%E3%82%AA%E3%83%97%E3%83%88%E3%82%A2%E3%82%A6%E3%83%88%E3%81%AF%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AA%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E3%82%BF%E3%82%A4%E3%83%97%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B%E3%81%AE%E3%81%A7%E3%81%99%E3%81%8B)
- [オプトアウトに対応するための要件はどの程度厳しいのでしょうか？](#%E3%82%AA%E3%83%97%E3%83%88%E3%82%A2%E3%82%A6%E3%83%88%E3%81%AB%E5%AF%BE%E5%BF%9C%E3%81%99%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AE%E8%A6%81%E4%BB%B6%E3%81%AF%E3%81%A9%E3%81%AE%E7%A8%8B%E5%BA%A6%E5%8E%B3%E3%81%97%E3%81%84%E3%81%AE%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8B)
- [SDK のエラーは、DSP の入札対応にどのような影響を与えるのでしょうか？](#sdk-%E3%81%AE%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%AFdsp-%E3%81%AE%E5%85%A5%E6%9C%AD%E5%AF%BE%E5%BF%9C%E3%81%AB%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AA%E5%BD%B1%E9%9F%BF%E3%82%92%E4%B8%8E%E3%81%88%E3%82%8B%E3%81%AE%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8B) -->

#### How do I know which decryption key to apply to a UID2?

各 Server-Side SDK ([SDKs: Summary](../sdks/summary-sdks.md) を参照)は、復号鍵を自動的に更新します。UID2 Token と共に提供されるメタデータは、使用する復号鍵の ID を示します。

#### Where do I get the decryption keys?

Server-Side SDK のいずれか([SDK](../sdks/summary-sdks.md) を参照してください) を使用して UID2 Service と通信し、最新の鍵を取得することができます。鍵を確実に最新に保つため、1 時間に 1 回など、定期的に鍵を取得することを推奨します。

#### How many decryption keys may be present in memory at any point?

システムには、ある時点で何千もの復号鍵が存在する可能性がある。

#### How do I know if/when the salt bucket has rotated?

DSP は、UID2 ソルトバケットがいつローテーションしたかを知ることができません。これは、ユーザーが Cookie をクリアしても DSP が気づかないのと同じです。ソルトバケットのローテーションは、DSP に大きな影響を与えません。

#### Should the DSP be concerned with latency?

UID2 Service は、入札プロセスに遅延を生じさせることはありません。発生した遅延は、UID2 Service ではなく、ネットワークに起因すると考えられます

#### How should the DSP maintain proper frequency capping with UID2?

UID2 は、クッキーと同じように古くなる可能性があります。したがって、DSP は、クッキーまたは Device ID ベースのフリークエンシーキャッピングに現在使用されているものと同じインフラを UID2 に適応させることができます。詳細は、[How do I know when to refresh the UID2 due to salt bucket rotation?](#how-do-i-know-when-to-refresh-the-uid2-due-to-salt-bucket-rotation) を参照してください。

#### Will all user opt-out traffic be sent to the DSP?

はい、UID2 [Transparency and Control Portal](https://www.transparentadvertising.com/) からのすべてのオプトアウトは、オプトアウト エンドポイントに到達します。DSP は、ユーザーの[オプトアウトを受け入れる](../guides/dsp-guide.md#honor-user-opt-outs)ように構成する必要があります。

#### Is the DSP expected to handle opt-out signals only for the UID2s that they already store?

場合によっては、DSP は、オプトアウト・タイムスタンプ以前に生成された、新たに保管された UID2 に対する UID2 Token を受け取ることがあります。DSP はこのようなトークンに入札することはできません。したがって、対応する UID2 が現在 DSP によって保存されているかどうかにかかわらず、すべてのオプトアウト信号を保存することが推奨されます。詳細は、[Bidding Opt-Out Logic](../guides/dsp-guide.md#bidding-opt-out-logic) の図を参照してください。

#### How long should the DSP keep the opt-out list?

オプトアウト情報は無期限に保管することを勧めます。

#### Is the UID2 of an opted-out user sent to the opt-out endpoint in an encrypted form?

暗号化されていない (raw)UID2 として送信されます。

#### In what format is the UID2 of an opted-out user sent to the webhook?

ユーザーがオプトアウトした場合、UID2 Operator は raw UID2 を URL エンコードされたクエリパラメータとして返します。

DSP のオプトアウトプロセスの詳細については、[Honor User Opt-Outs](../guides/dsp-guide.md#honor-user-opt-outs) を参照してください。

#### What request type do opt-outs use?

一般的には GET リクエストですが、DSP によって異なるタイプを使用することがあります。

#### How strict are the requirements for honoring opt-outs?

オプトアウトは常に受け入れなければなりません。オプトアウトリクエストがシステムを通じて伝播するまでに時間がかかる場合があり、その間に一部の入札がオプトアウトを受け入れないことがあります。

#### How do SDK errors impact the DSP's ability to respond to a bid?

エラーが発生した場合、SDK は UID2 Token を UID2 に復号化しません。
