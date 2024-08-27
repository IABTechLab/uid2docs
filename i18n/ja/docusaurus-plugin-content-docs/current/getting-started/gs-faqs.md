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

   - [EUID インフラのすべてのインテグレーションパートナー(SSP、サードパーティデータプロバイダー、測定プロバイダー)は、自動的に UID2 にインテグレーションされますか？](#will-all-integration-partners-in-the-euid-infrastructure-ssps-third-party-data-providers-measurement-providers-be-automatically-integrated-with-uid2)
   - [ユーザーは、自分の UID2 ID に基づいたターゲティング広告をオプトアウトできますか？](#can-users-opt-out-of-targeted-advertising-tied-to-their-uid2-identity)
   - [UID2 に DII を送信すると、UID2 はその情報を保存しますか？](#when-i-send-dii-to-uid2-does-uid2-store-the-information)
   - [UID2 は HIPAA で規制されているデータの処理を許可しますか？](#does-uid2-allow-the-processing-of-hipaa-regulated-data)

#### Will all integration partners in the EUID infrastructure (SSPs, third-party data providers, measurement providers) be automatically integrated with UID2?
EUID インフラのすべてのインテグレーションパートナー(SSP、サードパーティデータプロバイダー、測定プロバイダー)は、自動的に UID2 にインテグレーションされますか？

いいえ。UID2 は EUID とは別の独自のフレームワークとして機能します。そのため、EUID フレームワークへのアクセスや使用に関する事務手続きは、UID2 フレームワークへの使用やアクセスを自動的に許可するものではありません。新規契約を UID2 用に締結する必要があります。

#### Can users opt out of targeted advertising tied to their UID2 identity?
ユーザーは、自分の UID2 ID に基づいたターゲティング広告をオプトアウトできますか？

はい。[Transparency and Control Portal](https://www.transparentadvertising.com/) を通して、ユーザーは自分の UID2 ID に関連するターゲティング広告の配信をオプトアウトできます。各リクエストは、UID2 Opt-Opt Service と UID2 Operator を通じて配信され、UID2 Operator はオプトアウト情報を関連するすべての参加者に公開します。

#### When I send DII to UID2, does UID2 store the information?
UID2 に DII を送信すると、UID2 はその情報を保存しますか？

いいえ。<Link href="../ref-info/glossary-uid#gl-uid2-service">UID2 service</Link> のコンポーネントは、DII を保存しません。

さらに、ほとんどの場合、UID2 は、[POST&nbsp;/token/generate](../endpoints/post-token-generate.md)、[POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md)、または [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) の呼び出しが完了すると、値を全く保存しません。必要な例外は、ユーザーがオプトアウトした場合です。この場合、UID2 は、オプトアウトしたユーザーを示すハッシュ化された不透明な値を保存します。保存された値は、DII から生成された同じ UID2 に関する将来のリクエストを識別するために使用され、そのため拒否されます。

#### Does UID2 allow the processing of HIPAA-regulated data?
UID2 は HIPAA で規制されているデータの処理を許可しますか？

いいえ。UID2 の参加者は、HIPAA (Health Insurance Portability and Accountability Act of 1996;医療保険の携行性と責任に関する法律) で定義されている、保護対象保険情報 (PHI: Protected Health Information) から UID2 を生成してはなりません。

## FAQs for Publishers

UID2 フレームワークを使用するパブリッシャーからのよくある質問です。

  - [送信した DII と返されたトークンが一致していることをテストするにはどうすればよいですか？](#how-can-i-test-that-the-dii-sent-and-the-returned-token-match-up)
  - [トークンを復号化する必要がありますか？](#do-i-need-to-decrypt-tokens)
  - [ユーザーのオプトアウトはどのように通知されますか？](#how-will-i-be-notified-of-user-opt-out)
  - [トークン生成の呼び出しは、Server-Side と Client-Side のどちらで行うべきですか？](#where-should-i-make-token-generation-callsfrom-the-server-or-client-side)
  - [Client-Side からトークンのリフレッシュを呼び出すことはできますか？](#can-i-make-token-refresh-calls-from-the-client-side)
  - [Refresh Token のワークフローをテストするにはどうすればよいですか？](#how-can-i-test-the-refresh-token-workflow)
  - [UID2 Token の一意性とローテーションポリシーは何ですか？](#what-is-the-uniqueness-and-rotation-policy-for-uid2-tokens)
  - [UID2 Token は、ビッドストリームではどのように見えますか？](#what-does-a-uid2-token-look-like-in-the-bidstream)

#### How can I test that the DII sent and the returned token match up?
送信した DII と返されたトークンが一致していることをテストするにはどうすればよいですか？

[POST&nbsp;/token/validate](../endpoints/post-token-validate.md) エンドポイントを使用して、[POST&nbsp;/token/generate](../endpoints/post-token-generate.md) で送信している <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> が有効かどうかをチェックできます。`POST /token/validate` は主にテスト目的で使用されます。

詳細は [Using POST&nbsp;/token/validate to Test](../endpoints/post-token-validate.md#using-post-tokenvalidate-to-test) を参照してください。

#### Do I need to decrypt tokens?
トークンを復号化する必要がありますか？

いいえ、パブリッシャーは <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> を復号化する必要はありません。しかし、社内でのみ使用するために [raw UID2](../ref-info/glossary-uid.md#gl-raw-uid2) にアクセスしたい場合は、UID2 support と協力してアクセスしてください。

#### How will I be notified of user opt-out?
ユーザーのオプトアウトはどのように通知されますか？

ユーザーがオプトアウトした場合、API レスポンスは以下のいずれかのケースで通知します:
- 直接または UID2 SDK のいずれかで [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) エンドポイントを呼び出し、UID2 Token を生成する場合、必須の `optout_check` パラメータに `1` を指定します。
- 直接または UID2 SDK のいずれかで [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) エンドポイントを呼び出し、UID2 Token をリフレッシュした場合。

#### Where should I make token generation calls&#8212;from the server or client side?
トークン生成の呼び出しは、Server-Side と Client-Side のどちらで行うべきですか？

UID2 Token は、Client-Side、Server-Sideのどちらでも生成できます。詳細については、以下を参照してください:
- Prebid.js を使用して Client-Side からトークンを生成します: [UID2 Client-Side Integration Guide for Prebid.js](../guides/integration-prebid-client-side.md).
- Prebid.js を使用して Server-Side からトークンを生成します: [UID2 Client-Server Integration Guide for Prebid.js](../guides/integration-prebid-client-server.md).
- その他の Server-Side オプション: [Publisher Integrations](../guides/summary-guides.md#publisher-integrations).

#### Can I make token refresh calls from the client side?
Client-Side からトークンのリフレッシュを呼び出すことはできますか？

はい。[POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) は、API Key を使用する必要がないため、Client-Side (例えば、ブラウザやモバイルアプリ) から呼び出すことができます。

#### How can I test the refresh token workflow?
Refresh Token のワークフローをテストするにはどうすればよいですか？

`refresh-optout@example.com` のメールアドレスまたは `+00000000002` の電話番号を使用して、トークンリフレッシュのワークフローをテストすることができます。どちらかのパラメータ値をリクエストに使用すると、常に `refresh_token` を含む identity レスポンスが生成され、ログアウトレスポンスが返されます。

SDKを使うかどうかで手順は少し異なります。

##### With SDK:

1. DII がメールアドレスか電話番号かに応じて、以下の値のいずれかを使用して [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) リクエストを送信します:
   - `email` の値として `refresh-optout@example.com` を指定します。
   - ``refresh-optout@example.com` のハッシュを `email_hash` 値として指定します。
   - `phone` の値として `+00000000002` を指定します。
   - `phone_hash` 値として `+00000000002` のハッシュを指定します。
2. SDK の [background auto-refresh](../sdks/sdk-ref-javascript.md#background-token-auto-refresh) が Advertising Token のリフレッシュを試み(これには数時間かかることがあります)、リフレッシュの試みが `OPTOUT` ステータスで失敗するのを観察するまで待ちます。この時点で SDK はファーストパーティクッキーもクリアします。

##### Without SDK:

1. DII がメールアドレスか電話番号かに応じて、以下の値のいずれかを使用して [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) リクエストを送信します:
   - `email` の値として `refresh-optout@example.com` を指定します。
   - `refresh-optout@example.com` のハッシュを `email_hash` 値として指定します。
   - `phone` の値として `+00000000002` を指定します。
   - `phone_hash` 値として `+00000000002` のハッシュを指定します。
2. 返された `refresh_token` を次のステップで使用するために保存します。
3. [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) リクエストを `refresh_token` (Step 2 で保存) を `token` 値として送信します。<br/>ボディのレスポンスは空でなければならず、`refresh-optout@example.com` のメールアドレスと `+00000000002` の電話番号は常にログアウトしたユーザになるので、`status` の値は `optout` でなければなりません。

#### What is the uniqueness and rotation policy for UID2 tokens?
UID2 Token の一意性とローテーションポリシーは何ですか？

UID2 Service は、ランダムな初期化ベクトルを使用して UID2 Token を暗号化します。UID2 Token は、ユーザーがインターネットを閲覧する際に、特定のユーザーに対して一意になります。つまり、UID2 Token が生成されるたびに、同じ UID2 であっても常に異なるトークンが生成されます。トークンが更新されるたびに新しいトークンが生成され、暗号化されます。この仕組みにより、信頼できない当事者がユーザーの身元を追跡できないようにすることができます。

#### What does a UID2 token look like in the bidstream?
UID2 Token は、ビッドストリームではどのように見えますか？

UID2 実装のアプローチにはさまざまな方法があります。以下は、UID2 Token が<Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>でどのように渡されるかを示すコードスニペットの一例です:

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

   - [ソルトバケットのローテーションによって UID2 をリフレッシュするタイミングを知るには？](#how-do-i-know-when-to-refresh-the-uid2-due-to-salt-bucket-rotation)
   - [更新されたメールアドレスは、以前関連付けられていたバケットと同じバケットに割り当てられますか？](#do-refreshed-emails-get-assigned-to-the-same-bucket-with-which-they-were-previously-associated)
   - [インクリメンタルアップデートの場合、UID2 はどのくらいの頻度で更新するべきですか？](#how-often-should-uid2s-be-refreshed-for-incremental-updates)
   - [マッピング用の DII の SHA-256 はどのように生成すればよいですか？](#how-should-i-generate-the-sha-256-of-dii-for-mapping)
   - [大量のメールアドレスや電話番号やそれらのハッシュマッピングを保存すべきか？](#should-i-store-large-volumes-of-email-address-phone-number-or-their-hash-mappings)
   - [ユーザーのオプトアウトはどのように処理すればよいですか？](#how-should-i-handle-user-opt-outs)
   - [同じ DII は常に同じ生UID2になりますか？](#does-the-same-dii-always-result-in-the-same-raw-uid2)

#### How do I know when to refresh the UID2 due to salt bucket rotation?
ソルトバケットのローテーションによって UID2 をリフレッシュするタイミングを知るには？

UID2 生成リクエストで提供されるメタデータには、UID2 の生成に使用されるソルトバケットが含まれます。ソルトバケットは持続し、UID2 の生成に使用された基礎的な DII に対応します。指定されたタイムスタンプ以降にローテーションしたソルトバケットを得るには、[POST&nbsp;/identity/buckets](../endpoints/post-identity-buckets.md) エンドポイントを使用します。返されたローテーションしたソルトバケットは、どの UID2 をリフレッシュすべきかを教えてくれます。

:::note
ローテーションがいつ行われるかについては、いかなる約束もいたしません。可能な限り最新の状態を保つため、1 時間に 1 回のチェックを勧めます。
:::

#### Do refreshed emails get assigned to the same bucket with which they were previously associated?
更新されたメールアドレスは、以前関連付けられていたバケットと同じバケットに割り当てられますか？

必ずしもそうとは限りません。特定のバケット ID に関連付けられたメールアドレスを再マッピングした後、そのメールが異なるバケット ID に割り当てられる可能性があります。バケット ID を確認するには、[マッピング関数を呼び出す](../guides/advertiser-dataprovider-guide.md#1-retrieve-a-raw-uid2-for-dii-using-the-identity-map-endpoint) そして返された UID2 とバケット ID を再び保存してください。

:::info
メールアドレスのマッピングや再マッピングを行う際には、バケットの数やローテーションする日、メールアドレスが割り当てられる特定のバケットについて、いかなる仮定も行わないようにしてください。
:::

#### How often should UID2s be refreshed for incremental updates?
インクリメンタルアップデートの場合、UID2 はどのくらいの頻度で更新するべきですか？

オーディエンスの更新は、毎日行うことが推奨されています。

ソルトバケットは 1 年に 1 回程度更新されますが、個々のバケットの更新は 1 年に分散して行われます。これは、全バケットの約 1/365 が毎日ローテーションされることを意味します。もし忠実さが重要であれば、[POST&nbsp;/identity/buckets](../endpoints/post-identity-buckets.md) エンドポイントをもっと頻繁に、例えば 1 時間ごとに呼び出すことを検討してください。

#### How should I generate the SHA-256 of DII for mapping?
マッピング用の DII の SHA-256 はどのように生成すればよいですか？

システムは[メールアドレス正規化ルール](../getting-started/gs-normalization-encoding#email-address-normalization)に従って、salt せずにハッシュ化する必要があります。

#### Should I store large volumes of email address, phone number, or their hash mappings?
大量のメールアドレスや電話番号やそれらのハッシュマッピングを保存すべきか？

はい。何百万ものメールアドレスや電話番号をマッピングする必要がある場合、マッピングを保存しないことで処理時間が大幅に増加する可能性があります。しかし、実際に更新が必要なマッピングだけを再計算すると、毎日更新する必要があるのは UID2 の約 365 分の 1 なので、総処理時間が短縮されます。

:::info
Private Operator を使用している場合を除き、メールアドレス、電話番号、ハッシュのマッピングは、単一の HTTP 接続を使用して、一度に 5,000件 ずつ連続して行う必要があります。言い換えれば、複数の並列接続を作成せずにマッピングを行うことです。
:::

#### How should I handle user opt-outs?
ユーザーのオプトアウトはどのように処理すればよいですか？

ユーザーが [Transparency and Control Portal](https://www.transparentadvertising.com/) を通じて UID2 ベースのターゲティング広告をオプトアウトすると、オプトアウト信号が DSP とパブリッシャーに送信され、DSP とパブリッシャーが入札時にオプトアウトを処理します。広告主やデータプロバイダーは、[POST&nbsp;/identity/map](../endpoints/post-identity-map.md) エンドポイントを通じて、ユーザーがオプトアウトしたかどうかを定期的に確認することを勧めます。

広告主やデータプロバイダーは、raw UID2 に対するオプトアウトステータスを確認するために、[POST&nbsp;/optout/status](../endpoints/post-optout-status.md) エンドポイントを使用することもできます。

ウェブサイトを通じてユーザーがオプトアウトした場合、オプトアウトを処理するための内部手順に従ってください。たとえば、そのユーザーの UID2 を生成しないことを選択することもできます。

#### Does the same DII always result in the same raw UID2?
同じ DII は常に同じ生UID2になりますか？

一般的にその通りです。DII から raw UID2 を生成するプロセスは同じであり、誰がリクエストを送信したかに関係なく、結果は同じ値になります。 2 人の UID2 参加者が同じメールアドレスを [POST&nbsp;/identity/map](../endpoints/post-identity-map.md) エンドポイントに同時に送信した場合、応答として両方とも同じ raw UID2 を取得します。 

ただし、raw UID2 の生成に使用される [ソルト](../ref-info/glossary-uid.md#gl-salt) 値という可変要素があります。ソルト値は定期的にローテーションされます(詳細については、[How often should UID2s be refreshed for incremental updates?](#how-often-should-uid2s-be-refreshed-for-incremental-updates)) を参照してください)。あるリクエストと別のリクエストの間でソルト値が変化する場合、DII が同じであっても、これら 2 つのリクエストは 2 つの異なる raw UID2 になります。

詳細については、*Advertiser/Data Provider Integration Guide*の [Monitor for salt bucket rotations related to your stored raw UID2s](../guides/advertiser-dataprovider-guide.md#3-monitor-for-salt-bucket-rotations-related-to-your-stored-raw-uid2s) を参照してください。

## FAQs for DSPs

demand-side platform (DSP) に関するよくある質問を紹介します。

   - [UID2 に適用する復号キーを知るには？](#how-do-i-know-which-decryption-key-to-apply-to-a-uid2)
   - [復号キーはどこで入手できますか？](#where-do-i-get-the-decryption-keys)
   - [メモリ上に存在する復号鍵の数は？](#how-many-decryption-keys-may-be-present-in-memory-at-any-point)
   - [ソルトバケットがローテーションしたかどうか、あるいはいつローテーションしたかを知るにはどうしたらいいですか？](#how-do-i-know-ifwhen-the-salt-bucket-has-rotated)
   - [DSP はレイテンシーを気にすべきでしょうか？](#should-the-dsp-be-concerned-with-latency)
   - [UID2 で DSP はどのように適切なフリクエンシーキャッピング周波数キャッピングを維持すべきでしょうか？](#how-should-the-dsp-maintain-proper-frequency-capping-with-uid2)
   - [ユーザーのオプトアウトトラフィックはすべて DSP に送られますか？](#will-all-user-opt-out-traffic-be-sent-to-the-dsp)
   - [DSP は、すでに保存している UID2 についてのみオプトアウトシグナルを処理することを期待されているのか？](#is-the-dsp-expected-to-handle-opt-out-signals-only-for-the-uid2s-that-they-already-store)
   - [DSP はオプトアウトリストをどれくらいの期間保管すべきですか？](#how-long-should-the-dsp-keep-the-opt-out-list)
   - [オプトアウトされたユーザーの UID2 は、暗号化された形式でオプトアウトエンドポイントに送信されますか？](#is-the-uid2-of-an-opted-out-user-sent-to-the-opt-out-endpoint-in-an-encrypted-form)
   - [オプトアウトされたユーザーの UID2 は、どのような形式で Webhook に送信されますか？](#in-what-format-is-the-uid2-of-an-opted-out-user-sent-to-the-webhook)
   - [オプトアウトはどのリクエストタイプを使いますか？](#what-request-type-do-opt-outs-use)
   - [オプトアウトに応じるための条件はどの程度厳しいのですか？](#how-strict-are-the-requirements-for-honoring-opt-outs)
   - [ユーザーがオプトアウトしたかどうかを確認するにはどうすればよいですか？](#how-can-i-check-if-a-user-has-opted-out)
   - [SDK のエラーは DSP の入札対応能力にどのような影響を与えますか？](#how-do-sdk-errors-impact-the-dsps-ability-to-respond-to-a-bid)

#### How do I know which decryption key to apply to a UID2?
UID2 に適用する復号キーを知るには？

各 Server-Side SDK ([SDKs: Summary](../sdks/summary-sdks.md) を参照)は、復号鍵を自動的に更新します。UID2 Token と共に提供されるメタデータは、使用する復号鍵の ID を示します。

#### Where do I get the decryption keys?
復号キーはどこで入手できますか？

Server-Side SDK のいずれか([SDK](../sdks/summary-sdks.md) を参照してください) を使用して UID2 Service と通信し、最新の鍵を取得することができます。鍵を確実に最新に保つため、1 時間に 1 回など、定期的に鍵を取得することを推奨します。

#### How many decryption keys may be present in memory at any point?
メモリ上に存在する復号鍵の数は？

システムには、ある時点で何千もの復号鍵が存在する可能性があります。

#### How do I know if/when the salt bucket has rotated?
ソルトバケットがローテーションしたかどうか、あるいはいつローテーションしたかを知るにはどうしたらいいですか？

DSP は、UID2 ソルトバケットがいつローテーションしたかを知ることができません。これは、ユーザーが Cookie をクリアしても DSP が気づかないのと同じです。ソルトバケットのローテーションは、DSP に大きな影響を与えません。

#### Should the DSP be concerned with latency?
DSP はレイテンシーを気にすべきでしょうか？

UID2 Service は、入札プロセスに遅延を生じさせることはありません。発生した遅延は、UID2 Service ではなく、ネットワークに起因すると考えられます

#### How should the DSP maintain proper frequency capping with UID2?
UID2 で DSP はどのように適切なフリクエンシーキャッピング周波数キャッピングを維持すべきでしょうか？

UID2 は、クッキーと同じように古くなる可能性があります。したがって、DSP は、クッキーまたは Device ID ベースのフリークエンシーキャッピングに現在使用されているものと同じインフラを UID2 に適応させることができます。詳細は [How do I know when to refresh the UID2 due to salt bucket rotation?](#how-do-i-know-when-to-refresh-the-uid2-due-to-salt-bucket-rotation) を参照してください。

#### Will all user opt-out traffic be sent to the DSP?
ユーザーのオプトアウトトラフィックはすべて DSP に送られますか？

はい、UID2 [Transparency and Control Portal](https://www.transparentadvertising.com/) からのすべてのオプトアウトは、オプトアウトエンドポイントに到達します。DSP は、ユーザーの[オプトアウトを受け入れる](../guides/dsp-guide.md#honor-user-opt-outs)ように構成する必要があります。

#### Is the DSP expected to handle opt-out signals only for the UID2s that they already store?
DSP は、すでに保存している UID2 についてのみオプトアウトシグナルを処理することを期待されているのか？

場合によっては、DSP は、オプトアウトタイムスタンプ以前に生成された、新たに保管された UID2 に対する UID2 Token を受け取ることがあります。DSP はこのようなトークンに入札することはできません。したがって、対応する UID2 が現在 DSP によって保存されているかどうかにかかわらず、すべてのオプトアウトシグナルを保存することが推奨されます。詳細は [Bidding Opt-Out Logic](../guides/dsp-guide.md#bidding-opt-out-logic) の図を参照してください。

#### How long should the DSP keep the opt-out list?
DSP はオプトアウトリストをどれくらいの期間保管すべきですか？

オプトアウト情報は無期限に保管することを勧めます。

#### Is the UID2 of an opted-out user sent to the opt-out endpoint in an encrypted form?
オプトアウトされたユーザーの UID2 は、暗号化された形式でオプトアウトエンドポイントに送信されますか？

暗号化されていない (raw)UID2 として送信されます。

#### In what format is the UID2 of an opted-out user sent to the webhook?
オプトアウトされたユーザーの UID2 は、どのような形式で Webhook に送信されますか？

ユーザーがオプトアウトした場合、UID2 Operator は raw UID2 を URL エンコードされたクエリパラメータとして返します。

DSP のオプトアウトプロセスの詳細については、[Honor User Opt-Outs](../guides/dsp-guide.md#honor-user-opt-outs) を参照してください。

#### What request type do opt-outs use?
オプトアウトはどのリクエストタイプを使いますか？

一般的には GET リクエストですが、DSP によって異なるタイプを使用することがあります。

#### How strict are the requirements for honoring opt-outs?
オプトアウトに応じるための条件はどの程度厳しいのですか？

オプトアウトは常に受け入れなければなりません。オプトアウトリクエストがシステムを通じて伝播するまでに時間がかかる場合があり、その間に一部の入札がオプトアウトを受け入れないことがあります。

#### How can I check if a user has opted out?
ユーザーがオプトアウトしたかどうかを確認するにはどうすればよいですか？

DSP は、[POST&nbsp;/optout/status](../endpoints/post-optout-status.md) エンドポイントを使用して、生 UID2 に対するオプトアウトステータスを確認できます。

#### How do SDK errors impact the DSP's ability to respond to a bid?
SDK のエラーは DSP の入札対応能力にどのような影響を与えますか？

エラーが発生した場合、SDK は UID2 Token を UID2 に復号化しません。
