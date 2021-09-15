[UID2 API Documentation](../../README.md) > v1 > [Integration Guides](README.md) > Custom Publisher Integration Guide

# 概要

本ガイドでは、アプリ開発者およびCTV放送局がUID2を利用して入札ストリーム用のID Tokenを生成するためのインテグレーション手順について説明します。本ガイドは、UID2 対応のシングルサインオンまたは ID プロバイダとのインテグレーションではなく、UID2 と直接インテグレーションしてトークンを作成および管理することを希望するパブリッシャに焦点を当てています。

## インテグレーションステップ

以下のインテグレーションステップでは、ユーザーがパブリッシャーとUID2 Tokenを確立するためのライフサイクルと、UID2 TokenがRTBビッドストリームとどのようにインテグレーションされるかについて説明します。

The following integration steps outline the lifecycle for a user establishing a UID2 token with a publisher and how the UID2 token integrates with the RTB bid stream.


![Custom Publisher Flow](https://mermaid.ink/svg/eyJjb2RlIjoiICBzZXF1ZW5jZURpYWdyYW1cbiAgICBwYXJ0aWNpcGFudCBVIGFzIOODpuODvOOCtuODvFxuICAgIHBhcnRpY2lwYW50IFAgYXMg44OR44OW44Oq44OD44K344Oj44O8XG4gICAgcGFydGljaXBhbnQgVUlEMiBhcyBVSUQyIFNlcnZpY2VcbiAgICBwYXJ0aWNpcGFudCBTU1BcbiAgICBOb3RlIG92ZXIgVSxTU1A6IDEuIOOCouOCpOODh-ODs-ODhuOCo-ODhuOCo-OBruioreWumlxuICAgIFUtPj4rUDogMS1hLiDjg6bjg7zjgrbjg7zjgYzjg5Hjg5bjg6rjg4Pjgrfjg6Pjg7zjga7jgqLjgrvjg4Pjg4jjgavjgqLjgq_jgrvjgrnjgZfjgb7jgZnjgIJcbiAgICBQLT4-LVU6IDEtYi4g44OR44OW44Oq44OD44K344Oj44O844Gv44CB44Kq44O844OX44Oz44Gq44Kk44Oz44K_44O844ON44OD44OI44Gu5L6h5YCk5Lqk5o-b44KS6Kqs5piO44GX44CB44Ot44Kw44Kk44Oz44KS6KaB5rGC44GX44G-44GZ44CCXG4gICAgYWN0aXZhdGUgVVxuICAgIFUtPj5QOiAxLWMuIOODpuODvOOCtuODvOOBr-iqjeiovOOCkuihjOOBhOOAgVVJRDLjga7kvZzmiJDjgpLoqLHlj6_jgZfjgb7jgZnjgIJcbiAgICBkZWFjdGl2YXRlIFVcbiAgICBhY3RpdmF0ZSBQXG4gICAgUC0-PlVJRDI6IDEtZC4g44OR44OW44Oq44OD44K344Oj44O844Gv44CB44Om44O844K244O844GuUElJ44KS44OI44O844Kv44Oz55Sf5oiQ44K144O844OT44K544Gr6YCB44KK44G-44GZ44CCXG4gICAgZGVhY3RpdmF0ZSBQXG4gICAgYWN0aXZhdGUgVUlEMlxuICAgIFVJRDItPj5QOiAxLWUuIOODiOODvOOCr-ODs-eUn-aIkOOCteODvOODk-OCueOBr1VJRDIgVG9rZW7jgpLov5TjgZfjgb7jgZnjgIJcbiAgICBkZWFjdGl2YXRlIFVJRDJcbiAgICBhY3RpdmF0ZSBQXG4gICAgUC0-PlU6IDEtZi4g44OR44OW44Oq44OD44K344Oj44O844Gv44CB44Om44O844K244O844GrVUlEMuOCkuioreWumuOBl-OBvuOBmeOAglxuICAgIGRlYWN0aXZhdGUgUFxuICAgIE5vdGUgb3ZlciBVLFNTUDogMi4gVUlEMiBUb2tlbuOCkuWIqeeUqOOBl-OBn-WFpeacrVxuXG4gICAgUC0-PlNTUDogMi1hLiDjg5Hjg5bjg6rjg4Pjgrfjg6Pjg7zjga_jgIFVSUQyIFRva2Vu44KS5L2_44Gj44Gm5bqD5ZGK55SoU1NQ44KS5ZG844Gz5Ye644GX44G-44GZ44CCXG4gICAgYWN0aXZhdGUgU1NQXG4gICAgU1NQLT4-UDogMi1iLiBTU1Djga_jgIHooajnpLrjgZnjgovluoPlkYrjgpLov5TjgZfjgb7jgZnjgIJcbiAgICBkZWFjdGl2YXRlIFNTUFxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VTogMi1jLiDjg5Hjg5bjg6rjg4Pjgrfjg6Pjg7zjga_jgIHjg6bjg7zjgrbjg7zjgavluoPlkYrjgpLooajnpLrjgZfjgb7jgZnjgIJcbiAgICBkZWFjdGl2YXRlIFBcblxuICAgIE5vdGUgb3ZlciBVLFNTUDogMy4g44OI44O844Kv44Oz44Gu44Oq44OV44Os44OD44K344OlXG4gICAgVS0-PlA6IDMtYS4g44Om44O844K244O844Gv44OR44OW44Oq44OD44K344Oj44O844Gu44Ki44K744OD44OI44Gr5oi744KK44G-44GZ44CCXG4gICAgYWN0aXZhdGUgUFxuICAgIFAtPj5VSUQyOiAzLWIuIOODkeODluODquODg-OCt-ODo-ODvOOBr-ODquODleODrOODg-OCt-ODpeODiOODvOOCr-ODs-OCkuS9v-OBo-OBpuOAgeODpuODvOOCtuODvOOBruaWsOOBl-OBhElE44OI44O844Kv44Oz44KS6KaB5rGC44GX44G-44GZ44CCXG4gICAgZGVhY3RpdmF0ZSBQXG4gICAgYWN0aXZhdGUgVUlEMlxuICAgIFVJRDItPj5QOiAzLWMuIOODpuODvOOCtuODvOOBjOOCquODl-ODiOOCouOCpuODiOOBl-OBpuOBhOOBquOBhOWgtOWQiOOAgeODquODleODrOODg-OCt-ODpeODiOODvOOCr-ODs-ODu-OCteODvOODk-OCueOBr-aWsOOBl-OBhElE44OI44O844Kv44Oz44KS6L-U44GX44G-44GZ44CCXG4gICAgZGVhY3RpdmF0ZSBVSUQyXG4gICAgYWN0aXZhdGUgUFxuICAgIFAtPj5VOiAzLWQuIOODkeODluODquODg-OCt-ODo-ODvOOBr-OAgeODpuODvOOCtuODvOOBq-aWsOOBl-OBhFVJRDLjgpLoqK3lrprjgZfjgb7jgZnjgIJcbiAgICBkZWFjdGl2YXRlIFBcblxuICAgIE5vdGUgb3ZlciBVLFNTUDogNC4g44Om44O844K244O844Ot44Kw44Ki44Km44OIXG4gICAgVS0-PlA6IDQtYS4g44Om44O844K244O844GM44OR44OW44Oq44OD44K344Oj44O844Gu44Ki44K744OD44OI44GL44KJ44Ot44Kw44Ki44Km44OI44GX44G-44GZ44CCXG4gICAgYWN0aXZhdGUgUFxuICAgIFAtPj5VOiA0LWIuIOODpuODvOOCtuODvOOBrklE44GM44Kv44Oq44Ki44GV44KM44G-44GZ44CCXG4gICAgZGVhY3RpdmF0ZSBQIiwibWVybWFpZCI6eyJ0aGVtZSI6ImZvcmVzdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlLCJhdXRvU3luYyI6dHJ1ZSwidXBkYXRlRGlhZ3JhbSI6ZmFsc2V9)

## 1. アイデンティティの設定

このセクションでは、上図のパブリッシャー固有のステップ1-d、1-e、1-fを中心に説明します。

><b>Note</b><br>
UID2 Tokenは、認証後にサーバー側でのみ生成する必要があります。セキュリティの観点から、ブラウザ側でトークンを生成することはできません。

| Step | Endpoint/SDK | Instruction |
| --- | --- | --- |
| d | [GET /token/generate](../endpoints/get-token-generate.md) | パブリッシャーがUID2を設定する方法は2つあります。<br>1. 2.ユーザーが[GET /token/generate](../endpoints/get-token-generate.md)エンドポイントを使用して認証する際にUID2 Tokenを生成する。このリクエストには、ユーザーのメールアドレス、またはユーザーの正規化されたメールアドレスのbase64エンコードされたSHA256ハッシュが含まれます。[メールアドレスの正規化ルールはこちら](../../README.md#emailnormalization) <br><b>Note</b><br>正規化されたメールアドレスは、メールアドレスハッシュを渡すときにのみ必要です。ハッシュ化されていないメールアドレスについては、UID2オペレーターサービスがユーザーのためにメールアドレスを正規化します。|
| e | [GET /token/generate](../endpoints/get-token-generate.md) | トークン生成サービスはUID2 Tokenを返します。 |
| f |  | 返された `advertising_token` と `refresh_token` を、ユーザーに関連付けられたストレージに保存します。ファーストパーティークッキーのようなクライアントサイドのストレージや、サーバーサイドのストレージが考えられます。 |

## 2. UID2 Tokenを利用した入札

このセクションでは、上の図に示されたパブリッシャー固有のステップ2-aに焦点を当てます。

| Step | Endpoint/SDK | Instruction |
| --- | --- | --- |
| a | | パブリッシャーは、[1](#1-establish-identity)の`advertising_token`をSSPに送り、入札を行います。値をそのまま送ります。 |

### 3. トークンのリフレッシュ

リフレッシュエンドポイントを利用して、最新のUID2 Tokenを取得します。UID2 Tokenのリフレッシュは、ユーザーの UID2 ローテーションとオプトアウトの状態を同期するために必要です。ユーザーがオプトアウトした場合、そのRefresh Tokenを使用すると、トークンのリフレッシュチェーンが終了します。

| Step | Endpoint/SDK | Instruction |
| --- | --- | --- |
| a | | ユーザーがアセットに戻って再びアクティブになったら、SSP に送信する前に ID Tokenをリフレッシュします。 |
| b | [GET /token/refresh](../endpoints/get-token-refresh.md)  | [1](#1-establish-identity)で取得した `refresh_token` をクエリパラメータとして送信します。 |
| c | [GET /token/refresh](../endpoints/get-token-refresh.md) | UID2サービスは、オプトアウトしていないユーザーに対して新しいID Tokenを発行します。 |
| d | | 返された `advertising_token` と `refresh_token` を、ユーザーに関連付けられたストレージに保存します。ファーストパーティークッキーのようなクライアントサイドのストレージや、サーバーサイドのストレージが考えられます。 |

アクティブなユーザーのID Tokenは、5分ごとに更新することを勧めます。
アクティブでないユーザーのトークンを更新する必要はありません。

### 4. ユーザーのログアウト

| Step | Endpoint/SDK | Instruction |
| --- | --- | --- |
| a |  | ユーザーがパブリッシャーのアセットからログアウトした。 |
| b |  | ユーザー用に保存していたUID2 Tokenを削除します。UID2 サービスとのやりとりは必要ありません。 |

# よくある質問

### トークンを復号化する必要がありますか？
いいえ、パブリッシャーはトークンを復号する必要はありません。

### ユーザーがオプトアウトしたことはどのように通知されますか？
トークンのリフレッシュ処理は、ユーザーのオプトアウトを処理します。Refresh Tokenを使用すると、ユーザーがオプトアウトしたときに自動的にセッションがクリアされ、``refresh_token``のチェーンが切断されます。手動での操作は必要ありません。

### UID2 Tokenの独自性とローテーションのポリシーは？
UID2サービスは、ランダムな初期化ベクターを使用してトークンを暗号化します。暗号化されたUID2は、インターネットを閲覧する特定のユーザーにとってユニークなものとなります。リフレッシュのたびに、トークンは再暗号化されます。この仕組みにより、信頼できない第三者がユーザーのアイデンティティを追跡できないようになっています。

### インテグレーションをテストするにはどうすればいいですか？
インテグレーションをテストするために使用できる2つの組み込みツールがあります。

#### 送信されたPIIと返信されたトークンが一致しているかどうかのテスト
[GET /token/validate](../endpoints/get-token-validate.md)エンドポイントを使用して、[GET /token/generate](../endpoints/get-token-generate.md)で送信するPIIが有効であるかどうかを確認することができます。

1. `validate@email.com` を `email` として [GET /token/generate](../endpoints/get-token-generate.md) リクエストを送信するか、`validate@email.com` の base64 エンコードされた SHA256 ハッシュを作成し、それをメールアドレスハッシュとして送信します。返された `advertising_token` を保存して、ステップ2で使用します。
2. ステップ1で送信した `email` または `email_hash` と、ステップ1で返された `advertising_token` としての `token` を使用して、[GET /token/validate](../endpoints/get-token-validate.md) リクエストを送信します。レスポンスが `true` を返した場合、ステップ1でリクエストとして送信した `email` または `email_hash` が、ステップ1のレスポンスで受け取ったトークンと一致します。`false`を返した場合は、メールアドレスやメールアドレスハッシュの送信方法に問題がある可能性があります。

#### Refresh Tokenのログアウト・ワークフローのテスト

トークンリフレッシュのワークフローをテストするために、メールアドレス `optout@email.com` を使用することができます。リクエストにこのメールアドレスを使用すると、常にログアウトの結果となる `refresh_token` を含む ID レスポンスが生成されます。

1. `optout@email.com` を `email` として [GET /token/generate](../endpoints/get-token-generate.md) リクエストを送信するか、`optout@email.com` の base64 エンコードされた SHA256 ハッシュを作成して、それをメールのハッシュとして送信します。返された `refresh_token` を保存して、ステップ2で使用します。
2. ステップ1で送信した `email` または `email_hash` と、ステップ1で返された `refresh_token` を使って、[GET /token/validate](../endpoints/get-token-validate.md) リクエストを送信します。`optout@email.com` のメールアドレスは常にログアウトされたRefresh Tokenになるので、`body` レスポンスは空にしてください。
