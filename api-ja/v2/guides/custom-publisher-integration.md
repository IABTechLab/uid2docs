[UID2 Overview](../../../README-ja.md) > [Getting Started](../../README.md) > [v2](../README.md) > [Integration Guides](README.md) > Custom Publisher Integration Guide

# Server-Only UID2 Integration Guide

このガイドは、UID2 対応のシングルサインオンや ID プロバイダーではなく、UID2 と直接インテグレーションしながら、RTB ビッドストリーム用に UID2 を利用した ID トークンを生成したいと考えるアプリ開発者や CTV 放送局を対象としています。

このガイドでは、カスタムインテグレーションで考慮すべき [基本的な手順](#integration-steps) を概説しています。たとえば、ユーザーのログインとログアウトをどのように実装するか、UID2 ID 情報をどのように管理しターゲティング広告に使用するか、トークンを更新する方法、ID が見つからない場合の対処、ユーザーのオプトアウトを処理する方法などを決定する必要があります。ワークフローを示す [サンプルアプリケーション](https://example-srvonly-integ.uidapi.com/) はこちらです。アプリケーションのドキュメントについては、[Server-Only UID2 Integration Example](https://github.com/UnifiedID2/uid2-examples/blob/main/publisher/server_only/README.md) を参照してください。[FAQ](#faqs)も参照してください。

> TIP: UID2 を使ったクライアント ID の確立と Advertising Token の取得を容易にするために、[Client-Side Identity JavaScript SDK](../sdks/client-side-identity.md) を使用することを検討してください。詳しくは、[UID2 SDK Integration Guide](./publisher-client-side.md) を参照してください。

## Integration Steps

以下の図は、ユーザーがパブリッシャーと UID2 Token を確立するために必要なステップと、UID2 Token が RTB ビッドストリームとどのようにインテグレーションされるかを概説したものです。

```mermaid
sequenceDiagram
  participant U as User
  participant P as Publisher
  participant UID2 as UID2 Service
  participant SSP
  Note over U,SSP: 1. アイデンティティの確立
  U->>+P: 1-a. ユーザーがパブリッシャーアセットにアクセスした。
  P->>-U: 1-b. パブリッシャーは、オープンなインターネットの価値交換を説明し、ログインをリクエストします。
  activate U
  U->>P: 1-c. ユーザーが認証し、UID2 の作成を許可します。
  deactivate U
  activate P
  P->>UID2: 1-d. パブリッシャーはユーザーの PII をトークン生成サービスに送信します。
  deactivate P
  activate UID2
  UID2->>P: 1-e. トークン生成サービスは、UID2 Token を返します。
  deactivate UID2
  activate P
  P->>U: 1-f. パブリッシャーはユーザーに UID2 を設定します。
  deactivate P
  Note over U,SSP: 2. UID2 Token を用いた入札

  P->>SSP: 2-a. パブリッシャーは UID2 Token を使って広告のために SSP を呼び出します。
  activate SSP
  SSP->>P: 2-b. SSP は、表示する広告を返します。
  deactivate SSP
  activate P
  P->>U: 2-c. パブリッシャーは、ユーザーに広告を表示します。
  deactivate P

  Note over U,SSP: 3. トークンのリフレッシュ
  U->>P: 3-a. ユーザーがパブリッシャーアセットに戻ります。
  activate P
  P->>UID2: 3-b. パブリッシャーは Refresh Token を使って、ユーザーの新しいアイデンティティトークンを要求します。
  deactivate P
  activate UID2
  UID2->>P: 3-c. ユーザーがオプトアウトしていない場合、Refresh Token Service は新しいアイデンティティトークンを返します。
  deactivate UID2
  activate P
  P->>U: 3-d. パブリッシャーはユーザーの新しい UID2 を設定します。
  deactivate P

  Note over U,SSP: 4. ユーザーログアウト
  U->>P: 4-a. ユーザーがパブリッシャーアセットからログアウトしました。
  activate P
  P->>U: 4-b. ユーザーのIDをクリアします。
  deactivate P
```

次のセクションでは、図中の各ステップについて詳細を説明します:

1.  [Establish identity: user login](#establish-identity-user-login)
2.  [Bid using UID2 tokens](#bid-using-uid2-tokens)
3.  [Refresh tokens](#refresh-tokens)
4.  [Clear Identity: user logout](#clear-identity-user-logout)

### Establish Identity: User Login

ステップ 1-c で認証が行われ、ユーザーに規約を受け入てもらい、パブリッシャーがメールアドレスや電話番号を検証した後、サーバーサイドで UID2 Token を生成する必要があります。次の表は、トークン生成のステップの詳細を示しています。

| Step | Endpoint                                                    | Description                                                                                                                                                                                                                                                                                                                                |
| :--- | :---------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1-d  | [POST /token/generate](../endpoints/post-token-generate.md) | パブリッシャーが UID2 を使用してアイデンティティを確立するには、2 つの方法があります:<br/>- UID2 対応のシングルサインオンプロバイダーとインテグレーションします。<br/>- [POST /token/generate](../endpoints/post-token-generate.md) エンドポイントを使って、ユーザーの正規化したメールアドレスまたは電話番号から UID2 Token を生成します。 |
| 1-e  | [POST /token/generate](../endpoints/post-token-generate.md) | ユーザーのメールアドレス、電話番号、またはそれぞれのハッシュから生成された UID2 Token を返します。                                                                                                                                                                                                                                         |
| 1-f  | N/A                                                         | 返された `advertising_token` と `refresh_token` は、ユーザーに紐づくストレージに保存します。ファーストパーティクッキーのようなクライアントサイドのストレージや、サーバーサイドのストレージを検討するとよいでしょう。                                                                                                                       |

### Bid Using UID2 Tokens

UID2 ID 情報をどのように管理し、ターゲティング広告に使用したいか、たとえば返された Advertising Token を SSP に渡すかについて検討する必要があります。

| Step | Endpoint | Description                                                                                                            |
| :--- | :------- | :--------------------------------------------------------------------------------------------------------------------- |
| 2-a  | N/A      | ステップ [1-e](#establish-identity) の `advertising_token` を入札のために SSP に送信します。そのままの値を送信します。 |

### Refresh Tokens

リフレッシュエンドポイントを活用して、最新バージョンの UID2 Token を取得します。ユーザーの UID2 ローテーションとオプトアウトの状態を同期させるには、UID2 Token をリフレッシュする必要があります。ユーザーがオプトアウトした場合、その Refresh Token を使用すると、トークン更新チェーンが終了します。

| Step | Endpoint                                                  | Description                                                                                                                                                                                                          |
| :--- | :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 3-a  | N/A                                                       | ユーザーがアセットに戻り、再びアクティブになったとき、ID トークンをリフレッシュしてから、SSP に送信します。                                                                                                          |
| 3-b  | [POST /token/refresh](../endpoints/post-token-refresh.md) | ステップ [1-e](#establish-identity) で取得した `refresh_token` をクエリパラメータとして送信します。                                                                                                                  |
| 3-c  | [POST /token/refresh](../endpoints/post-token-refresh.md) | UID2 Service は、オプトアウトしていないユーザーに対して新しい ID トークンを発行します。                                                                                                                              |
| 3-d  | N/A                                                       | 返された `advertising_token` と `refresh_token` は、ユーザーに紐づくストレージに保存します。ファーストパーティクッキーのようなクライアントサイドのストレージや、サーバーサイドのストレージを検討するとよいでしょう。 |

> TIP: [POST /token/generate](../endpoints/post-token-generate.md) または [POST /token/refresh](../endpoints/post-token-refresh.md) コールによって返された ID の `refresh_from` タイムスタンプからトークンのリフレッシュを始めてください。

### Clear Identity: User Logout

| Step | Endpoint | Description                                                                                       |
| :--- | :------- | :------------------------------------------------------------------------------------------------ |
| 4-a  | N/A      | ユーザーがパブリッシャーアセットからログアウトしました。                                          |
| 4-b  | N/A      | そのユーザー用に保存してある UID2 Token を削除します。UID2 Service とのやりとりは必要ありません。 |

## FAQs

### トークンを復号化する必要がありますか？

いいえ、パブリッシャーはトークンを復号化する必要はありません。

### オプトアウトはどのように通知されますか？

トークンのリフレッシュ処理では、ユーザーのオプトアウトを処理します。[POST /token/refresh](../endpoints/post-token-refresh.md) は、そのユーザーの空の ID とオプトアウトステータスを返します。UID2 ベースのターゲティング広告の使用を再開するには、ユーザーは再ログインして UID2 ID を再確立する必要があります。

### トークン生成の呼び出しは、サーバーサイドとクライアントサイドのどちらで行うべきですか？

UID2 Token は、認証後にサーバーサイドでのみ生成する必要があります。つまり、サービスにアクセスするために使用される API キーを秘密にするために、[POST /token/generate](../endpoints/post-token-generate.md) エンドポイントはサーバーサイドからのみコールされる必要があります。

### クライアント側からトークン リフレッシュの呼び出しを行うことはできますか。

[POST /token/refresh](../endpoints/post-token-refresh.md) は、API キーを使用する必要がないため、クライアントサイド（ブラウザやモバイルアプリなど）から呼び出すことが可能です。

### UID2 Token の一意性とローテーションのポリシーは？

UID2 Service では、ランダムな初期化ベクトルを使用してトークンを暗号化します。暗号化された UID2 は、インターネットを閲覧している特定のユーザーに対して一意となります。更新されるたびに、トークンは再暗号化されます。このメカニズムにより、信頼できない第三者がユーザーを追跡することができないようにします。

### 送信された PII と返されたトークンが一致するかどうかをテストするにはどうすればよいですか?

[POST /token/validate](../endpoints/post-token-validate.md) エンドポイントを使用して、[POST /token/generate](../endpoints/post-token-generate.md) を通じて送信する PII が有効であるか確認することができます。

1. PII がメールアドレスか電話番号かに応じて、次のいずれかの値を使用して [POST /token/generate](../endpoints/post-token-generate.md) リクエストを送信してください。
   - `email` の値として `validate@email.com` を指定します。
   - `validate@email.com` のハッシュを `email_hash` の値として指定します。
   - `phone` の値として `+12345678901` を指定します。
   - `phone_hash` 値として `+12345678901` のハッシュを指定します。
2. 返された `advertising_token` を次のステップで使用するために保存します。
3. [POST /token/validate](../endpoints/post-token-validate.md) で、ステップ 1 で送信した `email`, `email_hash`, `phone`, または `phone_hash` 値と `advertising_token` （ステップ 2 で保存）をプロパティ値としてリクエストを送信します。
   - もしレスポンスが `true` を返したら、ステップ 1 でリクエストとして送った PII は、ステップ 1 のレスポンスで受け取ったトークンと一致します。
   - `false` が返された場合、メールアドレス、電話番号、またはそれぞれのハッシュを送信する方法に問題がある可能性があります。

### Refresh Token のログアウトワークフローをテストするにはどうすればいいですか？

`optout@email.com` メールアドレスまたは `+00000000000` 電話番号を使用して、Refresh Token ワークフローをテストすることができます。これらのメールアドレスまたは電話番号をリクエストに使用すると、常に `refresh_token` を含む ID レスポンスが生成され、その結果、ログアウト レスポンスが生成されます。

1. PII がメールアドレスか電話番号かに応じて、以下の値のいずれかを使用して [POST /token/generate](../endpoints/post-token-generate.md) リクエストを送信してください。
   - `email` の値として `optout@email.com` を指定します。
   - `optout@email.com` のハッシュを `email_hash` の値として指定します。
   - `phone` の値として `+00000000000` を指定します。
   - `phone_hash` 値として `+00000000000` のハッシュを指定します。
2. 返された `refresh_token` を次のステップで使用するために保存します。
3. (ステップ 2 で保存した) `refresh_token` を `token` 値として [POST /token/refresh](../endpoints/post-token-refresh.md) リクエストを送信します。<br/>レスポンスボディは空で、`optout@email.com` というメールアドレスと `+00000000000` という電話番号は常にログアウトしたユーザーとなるため、`status` 値に `optout` が設定されていなければなりません。
