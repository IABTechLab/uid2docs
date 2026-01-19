# 翻訳用語集 (Translation Glossary)

This glossary defines standard Japanese translations for technical terms used in UID2 documentation.
この用語集は、UID2 ドキュメントで使用される専門用語の標準的な日本語訳を定義するものです。

| 英語 (English) | 日本語 (Japanese) | 備考 (Notes) |
| :--- | :--- | :--- |
| **Entities & Roles** | | |
| Unified ID 2.0 (UID2) | Unified ID 2.0 (UID2) | そのまま。略称 UID2 も可。 |
| EUID | EUID | そのまま。 |
| Participant | 参加者 | |
| Sharer | 共有参加者 | UID2 Sharing における送信/受信双方の役割名。リンクテキストでは「Sharer（共有参加者）」併記可。 |
| Publisher | パブリッシャー | |
| Advertiser | 広告主 | |
| Data Provider | データプロバイダー | |
| DSP (Demand-Side Platform) | DSP (デマンドサイドプラットフォーム) | 通常は DSP。初出時にカッコ書きで説明を入れることが多い。 |
| SSP (Supply-Side Platform) | SSP | そのまま。 |
| Operator | Operator / UID2 Operator | 基本的に英語。文脈により「事業者」と訳さないこと。 |
| Public Operator | Public Operator | |
| Private Operator | Private Operator | Closed Operator とも呼ばれるが Private Operator 推奨。 |
| Consumer | 消費者 / ユーザー | 文脈による。「User」は「ユーザー」とする。 |
| Administrator | Administrator | UID2 Administrator など。 |
| **System Components** | | |
| Core Service | Core Service | |
| Opt-Out Service | Opt-Out Service | |
| Operator Service | Operator Service | |
| Webhook | Webhook | |
| UID2 Portal | UID2 Portal | |
| Transparency and Control Portal | Transparency and Control Portal | |
| Enclave | エンクレーブ | |
| **General / Industry Terms** | | |
| Connected TV (CTV) | Connected TV (CTV) | そのまま。略称 CTV も可。 |
| Real-time Bidding (RTB) | リアルタイムビディング (RTB) | |
| Programmatic | プログラマティック | Programmatic workflows -> プログラマティックなワークフロー など。 |
| Addressable | アドレサブル | Adjective。Addressable audience targeting -> アドレサブルなオーディエンスターゲティング。 |
| Omnichannel | オムニチャネル | |
| Inventory | インベントリ | 広告在庫。 |
| Audience | オーディエンス | |
| Frequency | フリークエンシー | 長音ありを推奨。 |
| Frequency Capping | フリークエンシーキャッピング | |
| Monetize / Monetization | 収益化 | |
| Measurement | 計測 / 測定 | Measurement provider -> 計測プロバイダー など。 |
| Attribution | アトリビューション / 広告効果測定 | |
| Data Onboarding | データオンボーディング | |
| Identity Resolution | ID解決 (Identity Resolution) | |
| Identity Graph | IDグラフ (Identity Graph) | |
| CMP (Consent Management Platform) | CMP | コンセントマネジメントプラットフォーム。 |
| CDP (Customer Data Platform) | CDP | カスタマーデータプラットフォーム。 |
| **Technical Terms** | | |
| Token | Token / トークン | 複合語 (UID2 Token) では英語、単独では「トークン」のケースあり。原則英語推奨。 |
| UID2 Token | UID2 Token | Advertising Token とも呼ばれる。 |
| Refresh Token | Refresh Token | |
| raw UID2 | raw UID2 | "raw" は小文字。 |
| Salt | ソルト | |
| Salt Bucket | ソルトバケット | raw UID2 や UID2 Token の生成に使用されるソルト値を管理する単位。 |
| Salt Bucket ID | ソルトバケット ID | 特定のソルトバケットを識別する一意の文字列。 |
| Hash | ハッシュ | |
| Normalize / Normalization | 正規化 | メールアドレスや電話番号を標準形式に変換すること。ハッシュ化の前に必ず実行。 |
| Encode / Encoding | エンコード / エンコーディング | Base64 encoding など。データを特定の形式に変換すること。 |
| Hex-encoded | 16進数エンコードされた | 16進数形式でエンコードされた値。SHA-256 ハッシュの表現など。 |
| Raw bytes | 生のバイト / 生のバイト列 | エンコードされていないバイナリデータ。Base64 エンコーディングの入力など。 |
| Case-sensitive | ケースセンシティブ / 大文字小文字を区別する | 大文字と小文字を区別すること。UID2 では重要な特性。 |
| Authorization header | Authorization ヘッダー | Authorization ヘッダー。`Authorization` と日本語の間は半角スペース。ベアラートークン提示に使用。 |
| Encryption | 暗号化 | |
| Encryption Key | 暗号化キー | Decryption Key -> 復号化キー との対、あるいは Encryption -> 暗号化 に合わせるが、"Key" は "キー" で統一推奨。 |
| Encrypted | 暗号化された | Encrypted request など。 |
| Unencrypted | 暗号化されていない | Unencrypted JSON Body Parameters など。 |
| Decryption | 復号化 | |
| Decryption Key | 復号キー | Encryption Key -> 暗号化キー との対、あるいは Decryption -> 復号化 に合わせるが、"Key" は "キー" で統一推奨。 |
| Decrypted | 復号化された | Decrypted JSON Response Format など。 |
| Deterministic | 決定論的 | deterministic ID、deterministic identity など。 |
| DII (Directly Identifying Information) | DII | メールアドレスや電話番号などの生のデータ。文脈により「個人の識別情報」等と補足するが、原則 DII と表記する。 |
| Durable | 耐久性のある | durable identifier など。 |
| Key | キー / 鍵 | 一般的な鍵の意味。Encryption Key -> 暗号化キー。認証関連の鍵については Authentication & Authorization Terms セクション参照。 |
| Secret | シークレット | 一般的な秘密の値。認証関連については Authentication & Authorization Terms セクション参照。 |
| Addressability | アドレサビリティ | ターゲティングの精度・到達性。 |
| Bidstream | ビッドストリーム | |
| Bid Request | ビッドリクエスト | |
| Bid Response | ビッドレスポンス | 「入札レスポンス」ではなく「ビッドレスポンス」で統一。 |
| Request | リクエスト | |
| Response | レスポンス | |
| Response Status Code | レスポンスステータスコード | HTTP レスポンスステータスコード。 |
| Third-party cookie | サードパーティクッキー | 「サードパーティー」と伸ばさない表記が優勢。 |
| First-party data | ファーストパーティデータ | |
| Tracking Pixel | トラッキングピクセル | |
| Timestamp | タイムスタンプ | Refresh Timestamp -> リフレッシュタイムスタンプ。 |
| Client-Side | Client-Side | 大文字始まりキャメルケース。 |
| Server-Side | Server-Side | 大文字始まりキャメルケース。 |
| Client-Server | Client-Server | |
| Workflow | ワークフロー | |
| Framework | フレームワーク | |
| Endpoint | エンドポイント | |
| Identity | アイデンティティ / ID | 抽象概念・設計思想は「アイデンティティ (Identity)」、具体的な識別子は「ID」。 |
| Mapping | マッピング | ID のマッピング、DII のマッピングなど。 |
| Credentials | credentials / 認証情報 | 文脈により使い分け。「UID2 credentials」など。 |
| Environment | 環境 | Integration environment -> インテグレーション環境 / Production environment -> 本番環境 |
| **API Parameters & Attributes** | | |
| Required | 必須 | API パラメータの属性。 |
| Conditionally Required | 条件付きで必須 | 特定の条件下でのみ必須となるパラメータ。 |
| Optional | オプション / 任意 | 省略可能なパラメータ。 |
| **Authentication & Authorization Terms** | | |
| API Key | API Key / API キー | Server-Side 実装における認証キー。Client Key とも呼ばれる。基本的に英語表記を推奨。 |
| Bearer Token | ベアラートークン | クライアントを識別する特別なトークン。Authorization ヘッダーで使用。 |
| Client Key | Client Key | API Key の別名。基本的に英語表記を推奨。 |
| Client Secret | クライアントシークレット | API 認証に使用される秘密鍵。API Secret とも呼ばれる。 |
| Public Key | 公開鍵 / Public Key | 暗号化や認証に使用される公開鍵。技術文書では「公開鍵」が一般的だが、UID2 固有の文脈では "Public Key" と英語表記も使用。 |
| Subscription ID | Subscription ID | Client-Side 統合で使用される識別子。英語表記。 |
| Unauthorized | 許可されていない / 権限がない | "unauthorized to perform" の文脈では「許可されていない」、"unauthorized access" では「権限がない」。統一推奨: 「許可されていない」。 |
| **SDK Development Terms** | | |
| Repository | リポジトリ | GitHub repository など。コードの保管場所。 |
| Package | パッケージ | NPM package、Python package など。配布可能なソフトウェアの単位。 |
| Binary | バイナリ | コンパイル済みの実行可能ファイル。Maven リポジトリで公開など。 |
| Dependency | 依存関係 | Package dependencies など。他のライブラリやパッケージへの依存。 |
| Initialize / Initialization | 初期化 | SDK の初期化など。使用前の準備処理。 |
| Instance | インスタンス | Create instance of class など。クラスから生成されたオブジェクト。 |
| Callback (function) | コールバック（関数） | 非同期処理の完了時や特定のイベント発生時に呼び出される関数。 |
| Synchronize / Sync | 同期（する） | データやキーの同期。KEYS_NOT_SYNCED など。 |
| Establish | 確立（する） | Establish identity など。ID やセッションを確立する。 |
| Status Code | ステータスコード | Response status code など。処理結果を示すコード。 |
| **Actions** | | |
| Activate / Activation | アクティベート / アクティベーション | データの有効活用。「データアクティベーション」「ファーストパーティデータをアクティベートする」など。 |
| Facilitate | 促進する | データアクティベーションを促進する、など。 |
| Integration | インテグレーション / 実装 / 連携 | 基本的に「インテグレーション」を推奨。「実装」(SDK導入時など)、「連携」(SSO連携時など) も文脈により可。「統合」は原則避ける。 |
| Implementation | 実装 | |
| Monitor | 監視する | リフレッシュタイムスタンプを監視する、など。 |
| Normalize | 正規化 | |
| Opt-out | オプトアウト / Opt-Out | 動詞あるいは名詞として「オプトアウト」。見出し等では英語。 |
| Propagate | 伝播する | UID2 Token をビッドストリームに伝播する、など。 |
| Refresh | リフレッシュ | トークンの有効期限更新など。 |
| Rotate | ローテーション / 更新 | Salt rotation -> ソルトのローテーション。 |
| Suppress / Suppression | 抑制 / サプレッション | オーディエンスの抑制、フリケンシーサプレッションなど。 |
| Upgrade | アップグレード | ID 解決のアップグレード、キャンペーンのアップグレードなど。 |
| High-level | (翻訳しない / 概要) | 文脈により削除するか、「概要」と訳す。「ハイレベル」とは訳さない。 |
| Request Access | アクセスリクエスト | ページタイトル等。 |
| Go live | 本番稼働する | |
| **Databricks Terms** | | |
| Clean Room | クリーンルーム | Databricks Clean Rooms (製品名) は英語。 |
| Sharing Identifier | 共有識別子 | Databricks 用語 (Delta Sharing)。 |
| Catalog Explorer | Catalog Explorer (カタログエクスプローラ) | UI 名称。 |
| Delta Sharing | Delta Sharing | 製品機能名。 |
| Unity Catalog | Unity Catalog | 製品機能名。 |
| Lineage | リネージ (系統) | データの来歴。 |
| **Privacy Terms** | | |
| Honor | 尊重する | オプトアウトリクエストを尊重する、など。プライバシー関連の義務を重んじること。「受け入れる」も可。 |
| Respect | 尊重する / 受け入れる | "respect user's opted-out status" など。文脈により使い分け。 |
| **Status & Error Codes** | | |
| Success (status) | success | API レスポンスのステータス値。そのまま。説明文では「成功」。 |
| Client Error (status) | client_error | API レスポンスのステータス値。そのまま。説明文では「クライアントエラー」。 |
| Unauthorized (status) | unauthorized | API レスポンスのステータス値。そのまま。説明文では「許可されていない」または「権限がない」。 |
| Optout (status) | optout | API レスポンスのステータス値。そのまま。説明文では「オプトアウト」。 |
| **Documentation Elements** | | |
| Used by | Used by | ドキュメント内のラベル。そのまま。コロンを含む場合は `Used by:` |
| Note | Note | 見出しやラベルは英語。内容は日本語に翻訳。 |
| Tip | Tip | 見出しやラベルは英語。内容は日本語に翻訳。 |
| Warning | Warning | 見出しやラベルは英語。内容は日本語に翻訳。 |
| Important | Important | 見出しやラベルは英語。内容は日本語に翻訳。 |
| Example | Example | 見出しやラベルは英語。内容は日本語に翻訳。 |
| Comments and Usage | Comments and Usage | 表のヘッダー。そのまま。 |
| **Table Headers (Common)** | | |
| Data Type | Data Type | 表のヘッダー。そのまま。 |
| Attribute | Attribute | 表のヘッダー。そのまま。 |
| Description | Description | 表のヘッダー。そのまま。 |
| Parameter | Parameter | 表のヘッダー。そのまま。 |
| Status | Status | 表のヘッダー。そのまま。 |
| Property | Property | 表のヘッダー。そのまま。 |
| Type | Type | 表のヘッダー。そのまま。 |
| Original Value | Original Value | 表のヘッダー。そのまま。 |
| Processing Steps and Resulting Values | Processing Steps and Resulting Values | 表のヘッダー。そのまま。 |
| **Additional API & Technical Terms** | | |
| Path Parameter | Path Parameter | API 用語。そのまま。 |
| Body Parameter | Body Parameter | API 用語。そのまま。 |
| Query Parameter | Query Parameter | API 用語。そのまま。 |
| Header | Header | HTTP header。ヘッダー名は英語のまま（例: `Authorization Header`）。説明文では「ヘッダー」も可。 |
| Payload | ペイロード | リクエスト/レスポンスのデータ本体。 |
| Endpoint URL | エンドポイント URL | |
| Base URL | ベース URL | |
| Scenario | シナリオ | 使用例やケーススタディ。 |
| Use Case | ユースケース | 利用事例。 |
