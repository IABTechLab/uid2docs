[UID2 Overview](../../../README.md) > [Getting Started](../../README.md) > [v2](../summary-doc-v2.md) > Frequently Asked Questions

# Frequently Asked Questions

UID2 に関するよくある質問は、以下のカテゴリーに分かれています:

- [FAQs -- General](#faqs----general)
- [FAQs for Publishers](#faqs-for-publishers)

## FAQs -- General

UID2 フレームワークに関するよくある質問を紹介します。

<!-- (gwh note: section is taken from original readme) -->

### <!-- FAQ_01 -->EUID インフラストラクチャのすべてのインテグレーションパートナー（SSP、第三者データプロバイダー、測定プロバイダー）は、自動的に UID2 にインテグレーションされるのでしょうか？

いいえ。UID2 は EUID とは別の独自のフレームワークとして機能します。そのため、EUID フレームワークへのアクセスや使用に関する事務手続きは、UID2 フレームワークへの使用やアクセスを自動的に許可するものではありません。新規契約を UID2 用に締結する必要があります。

### <!-- FAQ_02 --> ユーザーは、UID2 ID に関連するターゲティング広告の配信を拒否することができますか？

はい。[Transparency and Control Portal](https://transparentadvertising.org)を通して、ユーザーは自分の UID2 ID に関連するターゲティング広告の配信をオプトアウトできます。各リクエストは、UID2 Opt-Ouy Service と UID2 Operator を通じて、関連するすべての参加者に配信されます。

一部のパブリッシャーやサービスプロバイダーは、ユーザーの UID2 フレームワークへの参加状況に基づいて自社製品へのアクセスを制限するオプションを持っており、ユーザーとの価値交換ダイアログの一部としてこれを伝えるのはパブリッシャーの責任です。

### <!-- FAQ_03 -->オプトアウトポータルにアクセスする場所をユーザーが知るにはどうすればよいですか？

パブリッシャー、SSO プロバイダー、または同意管理プラットフォームは、ログインフロー、同意フロー、プライバシーポリシー、およびその他の手段で、[Transparency and Control Portal](https://transparentadvertising.org)へのリンクを開示します。

### <!-- FAQ_04 -->なぜ広告主やサードパーティデータプロバイダーはオプトアウトフィードとインテグレーションする必要がないのでしょうか？

オプトアウトは、ターゲット広告のオプトアウトに関するもので、パブリッシャーと DSP のオプトアウト[ワークフロー](../../.../README.md#workflows) を通して処理されます。特定の広告主から離脱するためには、消費者は広告主に直接連絡する必要があります。

## パブリッシャー向け FAQ

ここでは、UID2 フレームワークを使用するパブリッシャーに関するよくある質問を紹介します。

<!-- (gwh note: section is taken from publisher-client-side.md) -->。

### <!-- FAQ_05 -->ユーザーオプトアウトの通知はどのように行われますか？

[Client-Side JavaScript SDK (v2)](../sdks/client-side-identity.md) のバックグラウンドトークン自動更新処理では、ユーザーのオプトアウトを処理しています。ユーザーがオプトアウトした場合、SDK がトークンのリフレッシュを試みる際に、オプトアウトを知り、セッション（クッキーを含む）をクリアし、`OPTOUT`ステータスを持つコールバックを呼び出します。

### <!-- FAQ_06 -->トークン生成の呼び出しは、サーバー側とクライアント側のどちらで行うべきですか？

UID2 Token は、認証後にサーバ側で生成する必要があります。つまり、サービスにアクセスするための API キーが秘密になるように、[POST /token/generate](../endpoints-v2/post-token-generate.md) エンドポイントは、サーバー側からのみ呼び出される必要があります。

### <!-- FAQ_07 --> クライアントサイドからトークンリフレッシュを呼び出すことはできますか？

[POST /token/refresh](../endpoints-v2/post-token-refresh.md) は、API キーを使用する必要がないため、クライアント側（ブラウザやモバイルアプリなど）から呼び出すことが可能です。

### <!-- FAQ_08 -->送信された PII と返されたトークンが一致することをテストするにはどうすればよいですか？

[POST /token/validate](../endpoints-v2/post-token-validate.md) エンドポイントを使用して、[POST /token/generate](../endpoints-v2/post-token-generate.md) を通じて送信する PII が有効かどうかをチェックすることができます。

1. PII がメールアドレスか電話番号かによって、次のいずれかの値を使用して[POST /token/generate](../endpoints-v2/post-token-generate.md) リクエストを送信します：
   - `email`の値として`validate@email.com`を指定します。
   - `validate@email.com`のハッシュを `email_hash` 値として指定します。
   - `phone`の値として `+12345678901` を指定します。
   - `phone_hash`値として`+12345678901`のハッシュを指定します。
2. 次のステップで使用するために、返された `advertising_token` を保存します。
3. ステップ 1 で送信した `email`、`email_hash`、`phone`、`phone_hash` のいずれかの値と、`token` プロパティ値として `advertising_token` （ステップ 2 で保存）を使用して [POST /token/validate](./endpoints-v2/post-token-validate.md) リクエストを送信します。
   - レスポンスが `true` の場合、ステップ 1 でリクエストとして送信した PII が、ステップ 1 のレスポンスで受け取ったトークンと一致することを示します。
   - false` の場合は、メールアドレス、電話番号、またはそれぞれのハッシュを送信する方法に問題がある可能性があることを示しています。

### <!-- FAQ_09 -->Refresh Token のログアウトワークフローをテストするにはどうすればよいですか？

メールアドレス`optout@email.com`または電話番号`+000000000`を使用して、Refresh Token ワークフローをテストできます。リクエストでいずれかのパラメータ値を使用すると、常に`refresh_token`を含む ID レスポンスが生成され、ログアウト レスポンスが返されます。

1. PII がメールアドレスか電話番号かに応じて、次のいずれかの値を使用して [POST /token/generate](../endpoints-v2/post-token-generate.md) 要求を送信します：
   - `email`の値として`optout@email.com`を指定します。
   - `optout@email.com`のハッシュを `email_hash` 値として指定します。
   - `phone`の値として `+00000000000` を指定する。
   - `phone_hash`値として`+000000000`のハッシュを指定します。
2. SDK の [background auto-refresh](../sdks/client-side-identity.md#background-token-auto-refresh) が Advertising Token のリフレッシュを試みるまで待ちます（これは数時間かかることがあります）、リフレッシュ試みが`OPTOUT`ステータスで失敗するのを観察します。この時点で SDK はファーストパーティーのクッキーもクリアします。

### <!-- FAQ_10 -->リクエストペイロードに optout@email.com を渡すと、/token/generate は "optout" 状態を返し、トークンを生成しないのでしょうか？

POST /token/generate](../endpoints-v2/post-token-generate.md) エンドポイントは、オプトアウト記録をチェックせず、有効なリクエストに対して有効な広告およびユーザートークンで `success` 状態を返します。

> 重要：このエンドポイントは、ユーザーの PII を UID2 トークンに変換する法的根拠を得た場合にのみ呼び出すようにしてください。[POST /token/generate](../endpoints-v2/post-token-generate.md) を呼び出すと、提供された PII に関連するユーザーが UID2 ベースのターゲット広告に自動的にオプトインします。
> オプトアウト要求を確認するには、[POST /token/refresh](../endpoints-v2/post-token-refresh.md) エンドポイントを使用します。
