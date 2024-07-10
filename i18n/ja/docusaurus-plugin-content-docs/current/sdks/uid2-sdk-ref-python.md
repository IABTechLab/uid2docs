---
title: UID2 SDK for Python
description: Python Server-Side SDK のリファレンス情報。
hide_table_of_contents: false
sidebar_position: 06
---

import Link from '@docusaurus/Link';

# UID2 SDK for Python Reference Guide

UID2 Server-Side SDK を使用することで、以下が容易になります:

- UID2 Advertising Token の生成
- UID2 Advertising Token の更新
- raw UID2 を暗号化して UID2 Token を作成する
- UID2 Advertising Token を復号化して raw UID2 にアクセスする

## Functionality

この SDK は、Server-Sideのコーディングに Python を使用している DSP または UID2 Sharers のために、UID2 とのインテグレーションを簡素化します。次の表に、この SDK がサポートする機能を示します。

| Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token | Generate UID2 Token from DII | Refresh UID2 Token |
| :--- | :--- | :--- | :--- |
| Supported | Supported | Supported | Supported |

## API Permissions

この SDK を使用するには、[Account Setup](../getting-started/gs-account-setup.md) ページに記載されている手順に従って、UID2 アカウントのセットアップを完了する必要があります。

SDK が提供する特定の機能の使用許可が与えられ、そのアクセス用の認証情報が与えられます。SDK には、使用する権限を持たない機能があるかもしれないことに留意してください。例えば、パブリッシャーはトークンの生成と更新のために特定の API Permissions を取得しますが、SDK は共有などの他のアクティビティをサポートするかもしれません。

詳細は [API Permissions](../getting-started/gs-permissions.md) を参照してください。

## Version

この SDK には  Python 3.6 以降が必要です。

## GitHub Repository/Package

この SDK は以下のオープンソースの GitHub リポジトリにあります:

- [UID2 SDK for Python](https://github.com/IABTechLab/uid2-client-python/blob/master/README.md)

パッケージは以下で公開されています:

- [https://pypi.org/project/uid2-client/](https://pypi.org/project/uid2-client/)

## Installation
SDK をインストールするには、[Pip](https://packaging.python.org/en/latest/guides/tool-recommendations/#installing-packages) パッケージマネージャを使用します。

```
pip install uid2-client
```

## Initialization
初期化ステップは、次の表に示すように役割によって異なります。

| Role	                    | Create Instance of Class	 | Link to Instructions                                                         |
|:-------------------------|:--------------------------|:-----------------------------------------------------------------------------|
| Publisher                | `Uid2PublisherClient`     | [Usage for Publishers](#usage-for-publishers)                                |
| Advertiser/Data Provider | `IdentityMapClient`       | [Usage for Advertisers/Data Providers](#usage-for-advertisersdata-providers) |
| DSP                      | `BidstreamClient`         | [Usage for DSPs](#usage-for-dsps)                                            |
| Sharer                   | `SharingClient`           | [Usage for Sharers](#usage-for-uid2-sharers)                                 |



SDK が　UID2 Service と通信するために必要な値を提供する必要があります。

| Parameter    | Description                                                                                |
|:-------------|:-------------------------------------------------------------------------------------------|
| `base_url`   | The endpoint for the UID2 service. See [Environments](../getting-started/gs-environments). |
| `auth_key`   | The API key. See [UID2 Credentials](../getting-started/gs-credentials).                    |
| `secret_key` | The client secret. See [UID2 Credentials](../getting-started/gs-credentials).              |

## Interface 

`BidstreamClient` クラスを利用すると UID2 Token を raw UID2 に復号化できます。
ユーザーのオプトアウトを処理する入札ロジックの詳細については、[DSP Integration Guide](../guides/dsp-guide.md) を参照してください。

`SharingClient` クラスを利用すると、raw UID2 を UID2 Token に暗号化し、UID2 Token を raw UID2 に復号化することができます。


:::note
SDK を使用すると、復号化キーを保存または管理する必要がありません。
:::

### Encryption Response Content

`SharingClient` を使用して暗号化すると、SDK が次の表に示す情報を返します。

| Property | Description |
| :--- | :--- |
| `status` | 暗号化結果のステータス。取り得る値のリストと定義については、[Encryption Response Statuses](#encryption-response-statuses) を参照してください。 |
| `encrypted_data` | 暗号化された UID2 Token。 |

### Encryption Response Statuses
暗号化のレスポンスコードとその意味は、次の表に示します。

| Value | Description |
| :--- | :--- |
| `SUCCESS` | raw UID2 は正常に暗号化され、UID2 Token が返されました。 |
| `NOT_AUTHORIZED_FOR_KEY` | 呼び出し元は <a href="../ref-info/glossary-uid#gl-encryption-key">暗号化キー</a> を使用する権限を持っていません。 |
| `NOT_AUTHORIZED_FOR_MASTER_KEY` | 呼び出し元はマスターキーを使用する権限を持っていません。 |
| `NOT_INITIALIZED` | クライアントライブラリは初期化待ちです。 |
| `KEYS_NOT_SYNCED` | クライアントが UID2 Service からの鍵の同期に失敗しました。 |
| `ENCRYPTION_FAILURE` | 一般的な暗号化に失敗しました。 |

### Decryption Response Content

`BidstreamClient` または `SharingClient` を使用して復号化すると、SDK が次の表に示す情報を返します。

| Property　| Description |
| :--- | :--- |
| `status` | 復号結果のステータス。取り得る値のリストと定義につては、[Decryption Response Statuses](#decryption-response-statuses) を参照してください。 |
| `uid` | UID2 Token に対応する raw UID2。 |
| `established` | ユーザーがパブリッシャーと最初に UID2 を確立した時のタイムスタンプ。 |

### Decryption Response Statuses
Decryption response codes, and their meanings, are shown in the following table.

| Value | Description |
| :--- | :--- |
| `SUCCESS` | UID2 Token は正常に複合化され、raw UID2 が返されました。 |
| `NOT_AUTHORIZED_FOR_KEY` | 呼び出し元は、この UID2 Token を複合化する権限を持っていません。 |
| `NOT_INITIALIZED` | クライアントライブラリは初期化待ちです。 |
| `INVALID_PAYLOAD` | 受信した UID2 Token は有効なペイロードではありません。 |
| `EXPIRED_TOKEN` | 受信した UID2 Token の有効期限が切れています。 |
| `KEYS_NOT_SYNCED` | クライアントが UID2 Service からの鍵の同期に失敗しました。 |
| `VERSION_NOT_SUPPORTED` | クライアントライブラリが暗号化トークンのバージョンをサポートしていません。 |
| `DOMAIN_NAME_CHECK_FAILED` | ドメイン名が暗号化されたトークンのドメインと一致しません。 |
| `INVALID_TOKEN_LIFETIME` | トークンのタイムスタンプが無効です。 |

## Usage for Publishers

1. `Uid2PublisherClient` のインスタンスを作成します:
   ```py
   client = Uid2PublisherClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY)
   ```
2. ユーザーのメールアドレスまたは電話番号を入力として受け取り、`TokenGenerateResponse` オブジェクトを生成する関数を呼び出します。次の例では、メールアドレスを使用しています:

   ```py
   token_generate_response = client.generate_token(TokenGenerateInput.from_email(emailAddress).do_not_generate_tokens_for_opted_out())
   ```

    <!-- :::important
    Be sure to call this function only when you have a legal basis to convert the user’s <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> to UID2 tokens for targeted advertising.
    :::

   <!-- uid2_euid_diff re legal basis for admonition above (not in UID2) -->

 `do_not_generate_tokens_for_opted_out()`　は、[POST&nbsp;/token/generate](../endpoints/post-token-generate.md) の呼び出しに `optout_check=1` を適用します。これを行わないと、後方互換性が維持を維持するために `optout_check` が省略されます。

#### Client-Server Integration

Client-Server インテグレーションを使用している場合 (詳細は [Client-Server Integration Guide for JavaScript](../guides/integration-javascript-server-side.md) を参照してください):

* Identity を JSON 文字列としてクライアントに返します (Client-Side で使用するための [identity field](../sdks/client-side-identity.md#initopts-object-void) で使用) するには、次の手順に従います:

  ```py
  token_generate_response.get_identity_json_string()
  ```

  :::note
  ユーザーがオプトアウトしている場合、このメソッドは None を返します。その場合は、適切に処理してください。
  :::

### Server-Side Integration

Server-Side インテグレーションを使用している場合 (詳細は [Publisher Integration Guide, Server-Side](../guides/custom-publisher-integration.md) を参照してください):

1. `token_generate_response.get_identity_json_string()` 関数を使用して、ユーザーのセッションに JSON 文字列としてこの Identity を保存します。

   ユーザーがオプトアウトしている場合、このメソッドは `None` を返します。その場合は、適切に処理してください。
2. ユーザーの UID2 Token を取得するには、次の手順を使用します:

   ```py
   identity = token_generate_response.get_identity()
   if identity:
      advertising_token = identity.get_advertising_token()
   ```
3. ユーザーの UID2 Token をリフレッシュすべきかどうかを定期的にチェックします。これは、タイマーを使って一定に間隔で行うことも、ユーザーが別のページにアクセスするたびに行うこともできます:
    1. ユーザーのセッション情報から Identity の JSON 文字列を取得し、Identity 情報を入力として、`IdentityTokens` オブジェクトを生成する以下の関数を呼び出しますt:

       ```py
       identity = IdentityTokens.from_json_string(identityJsonString)
       ```

    2. Identity をリフレッシュできるかどうかを判断 (つまり、Refresh Token の有効期限が切れていないかどうか) を判断します:

       ```py
       if not identity or not identity.is_refreshable(): # we must no longer use this identity (for example, remove this identity from the user's session)
       ```

    3. リフレッシュが必要かを判断します:

       ```py
       if identity.is_due_for_refresh()):
       ```

4. 必要であれば、トークンと関連する値をリフレッシュします:

   ```py
   token_refresh_response = client.refresh_token(identity)`
   ```

5. ユーザーのセッションに `token_refresh_response.get_identity_json_string()` を格納します。

   ユーザーがオプトアウトしている場合、このメソッドは `None` を返します。ユーザーがオプトアウトしていることを確認するには、`token_refresh_response.is_optout()` 関数を使用できます。

## Usage for Advertisers/Data Providers
1. `IdentityMapClient` のインスタンスをインスタンス変数として生成します。
   ```py
   client = IdentityMapClient(base_url, api_key, client_secret)
   ```

2. メールアドレスまたは電話番号を入力として受け取り、`IdentityMapResponse` オブジェクトを生成する関数を呼び出します。以下の例では、メールアドレスを使用しています:
   ```py
   identity_map_response = client.generate_identity_map(IdentityMapInput.from_emails(["email1@example.com", "email2@example.com"]))
   ```

>Note: SDK は入力値を送信する前にハッシュ化します。これにより、生のメールアドレスや電話番号がサーバーから外に出ることがなくなります。

3. マップされた結果とマップされなかった結果を取得します:
   ```py
   mapped_identities = identity_map_response.mapped_identities
   unmapped_identities = identity_map_response.unmapped_identities
    ```

4. マップされた結果とマップされなかった結果をいてレートするか、ルックアップを行います。以下の例では、ルックアップを行なっています:
   ```py
    mapped_identity = mapped_identities.get("email1@example.com")
    if mapped_identity is not None:
        raw_uid = mapped_identity.get_raw_uid()
    else:
        unmapped_identity = unmapped_identities.get("email1@example.com")
        reason = unmapped_identity.get_reason()
   ```

## Usage for DSPs

以下の手順は、DSP として UID2 SDK for Python を使用して <Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link> トークンをデコードする方法の例です。

1. `BidstreamClient` を作成します:

```py
client = BidstreamClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY)
```

2. 起動時に一度リフレッシュし、その後定期的にリフレッシュします (推奨リフレッシュ感覚は1時間ごと):

```py
client.refresh()
```

3. トークンを raw UID2 に復号化します。トークンを渡し、次のいずれかを行います:
* ビッドリクエストがパブリッシャーのウェブサイトから発信された場合、ドメイン名を渡します。ドメイン名は、すべて小文字で、スペースなし、サブドメインなしである必要があります。例えば、`Subdomain.DOMAIN.com` の場合、`domain.com` を渡します。
* ビッドリクエストがモバイルアプリから発信された場合、<Link href="../ref-info/glossary-uid#gl-app-name">app name</Link> を渡します。
* それ以外の場合は、`null` を渡します。

```py
decrypted = client.decrypt_token_into_raw_uid(uid_token, domainOrAppName)
# If decryption succeeded, use the raw UID2.
if decrypted.success:
    #  Use decrypted.uid
else:
   # Check decrypted.status for the failure reason.
```

完全な例については、[examples/sample_bidstream_client.py](https://github.com/IABTechLab/uid2-client-python/blob/main/examples/sample_bidstream_client.py) の `sample_bidstream_client.py` を参照してください。

## Usage for UID2 Sharers

UID2 <Link href="../ref-info/glossary-uid#gl-sharing-participant">Sharing Participant</Link> は、送信者または受信者として共有に参加し、他の参加者と UID2 を共有する企業です。

広告主やデータプロバイダは、この SDK を使用して他の認証された UID2 共有参加者と UID2 を共有できます (<Link href="../ref-info/glossary-uid#gl-tokenized-sharing">Tokenized Sharing</Link>)。彼らは [raw UID2s](../ref-info/glossary-uid#gl-raw-uid2) を <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> に暗号化し、それを他の参加者に送信して共有できます (詳細は [Tokenized Sharing in Pixels](../sharing/sharing-tokenized-from-data-pixel.md) を参照してください)。データをピクセルで送信していない場合でも、[Security Requirements for UID2 Sharing](../sharing/sharing-security.md) で示されている要件に従えば、UID2 共有に参加できます。

:::important
このプロセスで生成される UID2 Token は共有専用で、ビッドストリームでは使用できません。ビッドストリーム用のトークンを生成するには、[Tokenized Sharing in the Bidstream](../sharing/sharing-tokenized-from-data-bid-stream.md) を参照してください。
:::

以下の手順は、UID2 SDK for Python を使用して、送信者または受信者として Sharing を実装する方法の例です。

1. `SharingClient` を生成します:

```py
client = SharingClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY)
```

2. 起動時に一度リフレッシュし、その後定期的にリフレッシュします (推奨リフレッシュ感覚は1時間ごと):

```py
client.refresh()
```

3. 送信者であれば、`encrypt_raw_uid_into_token()` を呼び出します:

```py
encrypted = client.encrypt_raw_uid_into_token(raw_uid)
# If encryption succeeded, send the UID2 token to the receiver.
if encrypted.success:
    # Send encrypted.encrypted_data to receiver
else:
    # Check encrypted.status for the failure reason.
```
受信者であれば、`decrypt_token_into_raw_uid()` を呼び出します:

```py
decrypted = client.decrypt_token_into_raw_uid(uid_token)
# If decryption succeeded, use the raw UID2.
if decrypted.success:
    #  Use decrypted.uid
else:
    # Check decrypted.status for the failure reason.
```

完全な例については、[examples/sample_sharing_client.py](https://github.com/IABTechLab/uid2-client-python/blob/main/examples/sample_sharing_client.py) の `sample_sharing_client.py` を参照してください。

## Development

### Example Usage
[examples](https://github.com/IABTechLab/uid2-client-python/blob/main/examples) ディレクトリから特定の例を実行できます。

```py
python3 examples/sample_bidstream_client.py $BASE_URL $AUTH_KEY $SECRET_KEY $DOMAIN_NAME $AD_TOKEN
```

### Running tests
コマンドラインからユニットテストを実行したり、お使いの Python IDE (例: PyCharm) を使用することができます。
```py
python3 -m unittest discover -s ./tests/
```

## FAQs

DSP に関するよくある質問については、[FAQs for DSPs](../getting-started/gs-faqs.md#faqs-for-dsps) を参照してください。
