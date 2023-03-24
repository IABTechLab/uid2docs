[UID2 API Documentation](../../getting-started.md) > [v1](../README.md) > [SDKs](./README.md) > Client-Side Identity SDK v0 (Deprecated)

# Client-Side Identity SDK v0 (Deprecated)

> IMPORTANT: UID2 API v1 は非推奨となり、2023 年 3 月 31 日までにすべての v1 SDK ファイルとエンドポイント、v0 SDK ファイル、およびバージョン管理されていないエンドポイントが削除され、現在のユーザーのみがサポートされるようになります。2023 年 3 月 31 日までに、必ず UID2 API v2(../../v2/upgrades/upgrade-guide.md) へのアップグレードをお願いします。初めてフレームワークに触れる方は、[UID2 API v2](../../v2/summary-doc-v2.md) をご利用ください。

> NOTE: このドキュメントは UID2 SDK の version 0 用です。

ID の確立と Advertising Token 取得のための実装を簡素化するには、より新しい改良版である [Client-Side JavaScript SDK v1](./client-side-identity-v1.md) へのアップグレードを検討ください。

> IMPORTANT: 新バージョンの SDK は、ユーザーセッション継続のための version 0 クッキーをサポートしていますが、SDK は下位互換性がなく、[コードの修正](./client-side-identity-v1.md#improvements-and-changes-from-version-0) が必要です。

## Implement the SDK Script

UID2 を使用して ID を管理するページや、リアルタイム入札（RTB）用の Advertising Token を取得するページに、以下の SDK スクリプトを実装してください:

```html
<script
  src="https://integ.uidapi.com/static/js/uid2-sdk-0.0.1a.js"
  type="text/javascript"
></script>
```

## Client-Side SDK Functions

クライアントサイド SDK は、以下の機能を実行するためのいくつかのスクリプトを提供しています。

### Open Client Lifecycle and Establish Client Identity

クライアントで UID2 ライフサイクル用のインスタンスを作成したい場合は、以下のスクリプトを実装します。指定されたクライアントに対してスクリプトを最初に実行したときに、 [GET /token/generate](../endpoints/get-token-generate.md) からの ID ペイロードレスポンスを送信します。

```html
<script>
  __uid2.init({
    identity : <Response from the generate token api>
  });
</script>
```

### Retrieve Client Identity for Real-Time Bidding

クライアントの `advertising_token` 、またはオプトアウトされている場合は空文字列を取得したい場合は、以下のスクリプトを実装してください。

```html
<script>
  __uid2.getAdvertisingToken();
</script>
```

### Close Identity Session and Disconnect Client Lifecycle

未認証のユーザーが存在する場合、またはユーザーがログアウトした場合、以下のスクリプトを実装してクライアントの ID セッションを閉じ、クライアントのライフサイクルを切断します。

```html
<script>
  __uid2.disconnect();
</script>
```
