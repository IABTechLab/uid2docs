[UID2 API Documentation](../../README.md) > v1 > [SDKs](./README.md) > RTB SDK

# RTB SDK Client

UID2 RTB SDKは、UID2 Tokenを復号してraw UID2にアクセスできるようにします。

以下の関数は、設定に必要な情報やライブラリから取得できる情報を定義しています。以下に定義されているパラメータやプロパティ名は、擬似的なものです。実際のパラメータやプロパティ名は言語によって異なりますが、以下に示す情報と同様のものになります。

現在、以下の言語でライブラリが提供されています。さらに多くの言語を開発中です。

+ C#
+ C++

## Initialization

初期化関数では、SDKがUID2サービスで認証を行うために必要なパラメータを設定します。また、エラー発生時のリトライ間隔の設定も可能です。

| Parameter | Description |
| --- | --- |
| `endpoint` | UID2サービスのエンドポイント |
| `authKey` | クライアントに属する認証トークンです。UID2へのアクセス方法については、[Contact Info（連絡先）](../../README.md#contact-info)を参照してください。 |
| `refreshIntervalMs` | 復号化キーを取得する際の更新頻度（ミリ秒）<br>推奨値：5分（`300,000`ミリ秒 |
| `retryIntervalMs` | エラーが発生したときにリクエストを再試行するタイミングを（ミリ秒）<br>推奨値：30秒 (`30,000` ミリ秒) |


## Interface

このインターフェイスにより、UID2 Tokenを復号し、対応する UID2 を返すことができます。このSDKを使用すれば、復号鍵の保管・管理は必要ありません。

RTBの間、インターフェースを呼び出してUID Tokenを復号し、UID2を返します。 [ユーザーのオプトアウトを処理する入札ロジックの詳細については、DSPガイドを参照してください。](../guides/dsp-guide.md)

```java
public Response Decrypt(String encryptedToken)
```

SDKから得られる情報の概要は以下の通りです。

| Property | Description |
| --- | --- |
| `Status` | 復号結果のステータスです。レスポンスステータスの一覧とその定義は、以下の表を参照ください。 |
| `UID2` | UID2 Tokenに対応するUID2です。 |
| `Established` | パブリッシャーがユーザーに初めてUID2を設定した時のタイムスタンプです。 |

Response Statuses

| Value | Description |
| --- | --- |
| `Success` | UID2 Tokenの復号化に成功し、UID2 が返されました。 |
| `NotAuthorizedForKey` | リクエスタ（呼び出し元）はこの UID2 Tokenを復号化する権限を持っていません。 |
| `NotInitialized` | クライアントライブラリは初期化されるのを待っています。 |
| `InvalidPayload` | 受信したUID2 Tokenは有効なペイロードではありません。 |
| `ExpiredToken` | 受信したUID2 Tokenの有効期限が切れています。 |
| `KeysNotSynced` | クライアントは、UID2 サービスからのキーの同期に失敗しました。 |
| `VersionNotSupported` | クライアントライブラリは、暗号化されたトークンのバージョンをサポートしていません。 |

## よくある質問

### SDKのエラーは、DSPの入札応答能力にどのような影響を与えますか？

エラーが発生した場合、SDKはUID2 TokenをUID2に復号しません。
