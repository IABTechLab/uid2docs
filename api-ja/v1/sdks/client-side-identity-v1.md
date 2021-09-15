[UID2 API Documentation](../../README.md) > v1 > [SDKs](./README.md) > Client-Side Identity

# Client-Side Identity SDK

Use our client-side SDK to simplify your implementation. Use the SDK to establish identity, de-establish identity, and retrieve advertising tokens.

クライアントサイドSDKを使用することで、実装を簡素化できます。このSDKを使って、アイデンティティの確立、アイデンティティの解除、Advertising Tokenの取得を行います。


## Implement The SDK Script

UID2を使ってアイデンティティを管理したり、RTB（リアルタイムビッディング）のためにアドバタイジングトークンを取得するページに、このSDKスクリプトを実装してください。

```html
<script src="https://integ.uidapi.com/static/js/uid2-sdk-0.0.1a.js" type="text/javascript"></script>
```

## Client-Side SDK Functions

### Open Client Lifecycle and Establish Client Identity

クライアントにUID2ライフサイクルのインスタンスを作成する場合は、以下のスクリプトを実装します。指定されたクライアントに対してスクリプトが初めて実行されたときに、[GET /token/generate](../endpoints/get-token-generate.md)からのIDペイロードのレスポンスを送信します。

```html
<script>
  __uid2.init({
    identity : <Response from the generate token api>
  });
</script>
```

### Retrieve Client Identity for Real-Time Bidding

クライアントの `advertising_token` を取得したい場合、またはオプトアウトされている場合は空の文字列を取得したい場合は、以下のスクリプトを実装してください。

```html
<script>
  AdvertisingToken = __uid2.getAdvertisingToken();
</script>
```

### Close Identity Session and Disconnect Client Lifecycle

認証されていないユーザーが存在する場合、またはユーザーがログアウトした場合は、以下のスクリプトを実装して、クライアントのIDセッションを閉じ、クライアントのライフサイクルを切断します。

```html
<script>
  __uid2.disconnect();
</script>
```
