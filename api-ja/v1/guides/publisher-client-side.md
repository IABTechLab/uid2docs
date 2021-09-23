[UID2 API Documentation](../../README.md) > v1 > [Integration Guides](README.md) > Publisher Integration Guide

# 概要

このガイドでは、Web アセットを持つパブリッシャが UID2 を使用して入札ストリーム用のID Tokenを生成するためのインテグレーション手順について説明します。本ガイドは、UID2 対応のシングルサインオンまたは ID プロバイダとのインテグレーションではなく、UID2 と直接インテグレーションしてトークンを作成および管理したいと考えているパブリッシャを対象としています。

## インテグレーションステップ

以下のインテグレーションステップでは、パブリッシャーがユーザーにUID2 Toeknを設定するためのライフサイクルと、UID2 TokenがRTBビッドストリームとどのようにインテグレーションされるかについて説明します。

![Publisher Flow](https://mermaid.ink/svg/eyJjb2RlIjoiICBzZXF1ZW5jZURpYWdyYW1cbiAgICBwYXJ0aWNpcGFudCBVIGFzIOODpuODvOOCtuODvFxuICAgIHBhcnRpY2lwYW50IFAgYXMg44OR44OW44Oq44OD44K344Oj44O8XG4gICAgcGFydGljaXBhbnQgVUlEMiBhcyBVSUQyIFNlcnZpY2VcbiAgICBwYXJ0aWNpcGFudCBTU1BcbiAgICBOb3RlIG92ZXIgVSxTU1A6IDEuIOOCouOCpOODh-ODs-ODhuOCo-ODhuOCo-OBruioreWumlxuICAgIFUtPj4rUDogMS1hLiDjg6bjg7zjgrbjg7zjgYzjg5Hjg5bjg6rjg4Pjgrfjg6Pjg7zjga7jgqLjgrvjg4Pjg4jjgavjgqLjgq_jgrvjgrnjgZfjgb7jgZnjgIJcbiAgICBQLT4-LVU6IDEtYi4g44OR44OW44Oq44OD44K344Oj44O844Gv44CB44Kq44O844OX44Oz44Gq44Kk44Oz44K_44O844ON44OD44OI44Gu5L6h5YCk5Lqk5o-b44KS6Kqs5piO44GX44CB44Ot44Kw44Kk44Oz44KS6KaB5rGC44GX44G-44GZ44CCXG4gICAgYWN0aXZhdGUgVVxuICAgIFUtPj5QOiAxLWMuIOODpuODvOOCtuODvOOBr-iqjeiovOOCkuihjOOBhOOAgVVJRDLjga7kvZzmiJDjgpLoqLHlj6_jgZfjgb7jgZnjgIJcbiAgICBkZWFjdGl2YXRlIFVcbiAgICBhY3RpdmF0ZSBQXG4gICAgUC0-PlVJRDI6IDEtZC4g44OR44OW44Oq44OD44K344Oj44O844Gv44CB44Om44O844K244O844GuUElJ44KS44OI44O844Kv44Oz55Sf5oiQ44K144O844OT44K544Gr6YCB44KK44G-44GZ44CCXG4gICAgZGVhY3RpdmF0ZSBQXG4gICAgYWN0aXZhdGUgVUlEMlxuICAgIFVJRDItPj5QOiAxLWUuIOODiOODvOOCr-ODs-eUn-aIkOOCteODvOODk-OCueOBr1VJRDIgVG9rZW7jgpLov5TjgZfjgb7jgZnjgIJcbiAgICBkZWFjdGl2YXRlIFVJRDJcbiAgICBhY3RpdmF0ZSBQXG4gICAgUC0-PlU6IDEtZi4g44OR44OW44Oq44OD44K344Oj44O844Gv44CB44Om44O844K244O844GrVUlEMuOCkuioreWumuOBl-OBvuOBmeOAglxuICAgIGRlYWN0aXZhdGUgUFxuICAgIE5vdGUgb3ZlciBVLFNTUDogMi4gVUlEMiBUb2tlbuOCkuWIqeeUqOOBl-OBn-WFpeacrVxuXG4gICAgUC0-PlNTUDogMi1hLiDjg5Hjg5bjg6rjg4Pjgrfjg6Pjg7zjga_jgIFVSUQyIFRva2Vu44KS5L2_44Gj44Gm5bqD5ZGK55SoU1NQ44KS5ZG844Gz5Ye644GX44G-44GZ44CCXG4gICAgYWN0aXZhdGUgU1NQXG4gICAgU1NQLT4-UDogMi1iLiBTU1Djga_jgIHooajnpLrjgZnjgovluoPlkYrjgpLov5TjgZfjgb7jgZnjgIJcbiAgICBkZWFjdGl2YXRlIFNTUFxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VTogMi1jLiDjg5Hjg5bjg6rjg4Pjgrfjg6Pjg7zjga_jgIHjg6bjg7zjgrbjg7zjgavluoPlkYrjgpLooajnpLrjgZfjgb7jgZnjgIJcbiAgICBkZWFjdGl2YXRlIFBcblxuICAgIE5vdGUgb3ZlciBVLFNTUDogMy4g44OI44O844Kv44Oz44Gu44Oq44OV44Os44OD44K344OlXG4gICAgVS0-PlVJRDI6IDMtYS4gU0RL44Gv44CB44Oq44OV44Os44OD44K344Ol44OI44O844Kv44Oz44KS5L2_55So44GX44GmVUlEMuOCkuODquODleODrOODg-OCt-ODpeOBmeOCi-ODquOCr-OCqOOCueODiOOCkumAgeS_oeOBl-OBvuOBmeOAglxuICAgIGFjdGl2YXRlIFVJRDJcbiAgICBVSUQyLT4-VTogMy1iLiDjg6bjg7zjgrbjg7zjgYzjgqrjg5fjg4jjgqLjgqbjg4jjgZfjgabjgYTjgarjgYTloLTlkIjjgIHjg6rjg5Xjg6zjg4Pjgrfjg6Xjg4jjg7zjgq_jg7Pjg7vjgrXjg7zjg5Pjgrnjga_mlrDjgZfjgYRJROODiOODvOOCr-ODs-OCkui_lOOBl-OBvuOBmeOAglxuICAgIGRlYWN0aXZhdGUgVUlEMlxuICAgIE5vdGUgb3ZlciBVLFNTUDogNC4g44Om44O844K244O844Ot44Kw44Ki44Km44OIXG4gICAgVS0-PlA6IDQtYS4g44Om44O844K244O844GM44OR44OW44Oq44OD44K344Oj44O844Gu44Ki44K744OD44OI44GL44KJ44Ot44Kw44Ki44Km44OI44GX44G-44GZ44CCXG4gICAgYWN0aXZhdGUgUFxuICAgIFAtPj5VOiA0LWIuIOODpuODvOOCtuODvOOBrklE44GM44Kv44Oq44Ki44GV44KM44G-44GZ44CCXG4gICAgZGVhY3RpdmF0ZSBQIiwibWVybWFpZCI6eyJ0aGVtZSI6ImZvcmVzdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlLCJhdXRvU3luYyI6dHJ1ZSwidXBkYXRlRGlhZ3JhbSI6ZmFsc2V9)

### 1. アイデンティティの設定

このセクションでは、上図のパブリッシャー固有のステップ1-d、1-e、1-fを中心に説明します。

><b>Note</b><br>
UID2 Tokenは、認証後にサーバー側でのみ生成する必要があります。セキュリティの観点から、ブラウザ側でトークンを生成することはできません。

| Step | Endpoint/SDK | Instruction |
| --- | --- | --- |
| d | [GET /token/generate](../endpoints/get-token-generate.md) | パブリッシャーがUID2でアイデンティティを確立するには2つの方法があります。<br>1. UID2対応のシングルサインオンプロバイダとインテグレーションします。<br> 2. ユーザーを認証したときに [GET /token/generate](../endpoints/get-token-generate.md) エンドポイントを使用してUID2 Tokenを生成します。このリクエストには、ユーザーの正規化されたメールアドレスが含まれます。  <br><b>Note</b><br>UID2オペレーターサービスが正規化するので、ハッシュしていないメールアドレスは正規化する必要はありません。メールアドレスハッシュは正規化する必要があります。|
| e | [GET /token/generate](../endpoints/get-token-generate.md) | トークン生成サービスはUID2 Tokenを返します。 |
| f | [UID2 client-side identity SDK](../sdks/client-side-identity-v1.md) | ステップeから返されたUID2 Tokenを、以下の`identity`メカニズムを使ってSDKに送ります。このメカニズムは、ユーザーがログアウトするまでUID2 Tokenを利用できるようにします。 |

#### Client-Side SDK Identity Mechanism

```html
<script>
  __uid2.init({
    identity : <Response from the generate token api>
  });
</script>
```

### 2. UID2 Tokenを利用した入札

このセクションでは、上の図に示されたパブリッシャー固有のステップ2-aに焦点を当てます。

| Step | Endpoint/SDK | Instruction |
| --- | --- | --- |
| a | [UID2 client-side identity SDK](../sdks/client-side-identity-v1.md) | 設定されたIDは、クライアントサイドで入札に利用できます。以下のメカニズムは、SSPに渡すユーザーの`advertising_token`へのアクセスを返します。 |

#### Client-Side SDK Identity Access Mechanism

```html
<script>
  AdvertisingToken = __uid2.getAdvertisingToken();
</script>
```

### 3. トークンのリフレッシュ

| Step | Endpoint/SDK | Instruction |
| --- | --- | --- |
| a | [UID2 client-side identity SDK](../sdks/client-side-identity-v1.md) | SDK は UID2 Tokenを自動的に更新します。手動での操作は必要ありません。 |
| b | [UID2 client-side identity SDK](../sdks/client-side-identity-v1.md) | ユーザーがオプトアウトしていない場合、Refresh Tokenは新しいアイデンティティ・トークンを返します。 |

SDK以外のオプションを使用してインテグレーションする場合は、5分ごとにID Tokenを更新することを勧めます。

### 4. ユーザーのログアウト

| Step | Endpoint/SDK | Instruction |
| --- | --- | --- |
| a |  | ユーザーがパブリッシャーのアセットからログアウトした。 |
| b | [UID2 client-side identity SDK](../sdks/client-side-identity-v1.md) | ログアウト時にユーザーのローカルストレージからUID2 Tokenを削除します。UID2 Tokenを消去するには、SDK の `disconnect` メカニズムを使用してください。 |

#### Client-Side SDK Disconnect Identity

```html
<script>
  __uid2.disconnect();
</script>
```

# よくある質問

### ユーザーがオプトアウトしたことはどのように通知されますか？
トークンのリフレッシュ処理は、ユーザーのオプトアウトを処理します。ユーザーがオプトアウトした場合、Refresh Tokenを使用すると、自動的にセッションがクリアされます。UID2クライアントサイドSDK](../sdks/client-side-identity-v1.md)を参照してください。手動での操作は必要ありません。

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
