[UID2 API Documentation](../../getting-started.md) > [v1](../README.md) > [SDKs](./README.md) > Server-Side SDK

# Server-Side SDK Guide for RTB (Deprecated)

> IMPORTANT: UID2 API v1 は非推奨となり、2023 年 3 月 31 日までにすべての v1 SDK ファイルとエンドポイント、v0 SDK ファイル、およびバージョン管理されていないエンドポイントが削除され、現在のユーザーのみがサポートされるようになります。2023 年 3 月 31 日までに、必ず UID2 API v2(../../v2/upgrades/upgrade-guide.md) へのアップグレードをお願いします。初めてフレームワークに触れる方は、[UID2 API v2](../../v2/summary-doc-v2.md) をご利用ください。

server-side SDK は、UID2 Token を復号化して raw UID2 にアクセスできるようにします。

以下の関数は、設定する必要がある情報、またはライブラリから取得できる情報を定義しています。以下で定義されるパラメータとプロパティ名は疑似コードです。実際のパラメータやプロパティ名は言語によって異なりますが、以下に示す情報と同様のものになります。

ライブラリは現在、以下の言語で提供されています。その他の言語も開発中です。

- C#
- C++

## Initialization

初期化関数は、SDK が UID2 Service との認証を行うために必要なパラメータを設定します。また、エラーが発生した場合の再試行間隔を設定することもできます。

| Parameter           | Description                                                                                                                             | Recommended Value                  |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------- |
| `endpoint`          | UID2 サービスのエンドポイントです。                                                                                                     | N/A                                |
| `authKey`           | クライアントの認証トークンです。UID2 へのアクセスについては、[Contact Info](../../getting-started.md#contact-info) を参照してください。 | N/A                                |
| `refreshIntervalMs` | 復号鍵を取得するためのリフレッシュ間隔（ミリ秒単位）。                                                                                  | 5 minutes (`300,000` milliseconds) |
| `retryIntervalMs`   | エラーが発生したときにリクエストを再試行するための再試行間隔（ミリ秒単位）です。                                                        | 30 seconds (`30,000` milliseconds) |

## Interface

このインターフェースにより、UID2 Token を復号化して対応する UID2 を返すことができます。

> NOTE: SDK を使用する場合、復号鍵の保存や管理は必要ありません。

RTB 中に、UID2 Token を復号化して UID2 を返すインターフェースを呼び出します。ユーザーのオプトアウトを処理するための入札ロジックの詳細については、[DSP Integration Guide](../guides/dsp-guide.md) を参照してください。

```java
public Response Decrypt(String encryptedToken)
```

SDK から返される情報の概要は、以下のとおりです。

| Property      | Description                                                                                      |
| :------------ | :----------------------------------------------------------------------------------------------- |
| `Status`      | 復号化結果のステータスです。応答ステータスの一覧とその定義については、次の表を参照してください。 |
| `UID2`        | UID2 Token に対応する UID2。                                                                     |
| `Established` | ユーザーがパブリッシャーと最初に UID2 を確立した時のタイムスタンプです。                         |

Response Statuses

| Value                 | Description                                                                  |
| :-------------------- | :--------------------------------------------------------------------------- |
| `Success`             | UID2 Token が正常に復号化され、UID2 が返されました。                         |
| `NotAuthorizedForKey` | 呼び出し元はこの UID2 Token を復号化する権限を持っていません。               |
| `NotInitialized`      | クライアントライブラリは初期化待ちです。                                     |
| `InvalidPayload`      | 受信した UID2 Token は有効なペイロードではありません。                       |
| `ExpiredToken`        | 受信した UID2 Token の有効期限が切れています。                               |
| `KeysNotSynced`       | クライアントが UID2 Service との鍵の同期に失敗しました。                     |
| `VersionNotSupported` | クライアントライブラリが暗号化されたトークンのバージョンに対応していません。 |

## FAQ

### SDK のエラーは、DSP の入札応答能力にどのような影響を与えますか？

エラーが発生した場合、SDK は UID2 Token を UID2 に復号化することができません。
