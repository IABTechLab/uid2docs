---
title: UID2 SDK for Python
description: Python Server-Side SDK のリファレンス情報。
hide_table_of_contents: false
sidebar_position: 06
---

# UID2 SDK for Python Reference Guide

UID2 Server-Side SDK を使用することで、以下のことが容易になります:

- UID2 Advertising Token の生成
- UID2 Advertising Token の更新
- raw UID2 を暗号化して UID2 Token を作成する
- UID2 Advertising Token を復号化して raw UID2 にアクセスする

<!--
 This guide includes the following information:

- [Overview](#overview)
- [Functionality](#functionality)
- [API Permissions](#api-permissions)
- [Version](#version)
- [GitHub Repository/Package](#github-repositorypackage)
- [Initialization](#initialization)
- [Interface](#interface)
  - [Response Content](#response-content)
  - [Response Statuses](#response-statuses)
- [FAQs](#faqs)
- [Usage for Publishers](#usage-for-publishers) 
- [Usage for UID2 Sharers](#usage-for-uid2-sharers) 
-->

## Overview

ここで説明する関数は、設定に必要な情報やライブラリから取得できる情報を定義しています。以下に定義するパラメータとプロパティ名は擬似コードです。実際のパラメータやプロパティ名は言語によって異なりますが、ここで説明する情報と同様のものになります。

## Functionality

この SDK は、Server-Sideのコーディングに Python を使用している DSP または UID2 Sharers のために、UID2 とのインテグレーションを簡素化します。次の表に、この SDK がサポートする機能を示します。

| Encrypt Raw UID2 to UID2 Token | Decrypt UID2 Token | Generate UID2 Token from DII | Refresh UID2 Token |
| :--- | :--- | :--- | :--- |
| Supported | Supported | Supported | Supported |

## API Permissions

この SDK を使用するには、[Account Setup](../getting-started/gs-account-setup.md) ページに記載されている手順に従って、UID2 アカウントのセットアップを完了する必要があります。

SDK が提供する特定の機能の使用許可が与えられ、そのアクセス用の認証情報が与えられます。SDK には、使用する権限を持たない機能があるかもしれないことに留意してください。例えば、パブリッシャーはトークンの生成と更新のために特定の API Permissions を取得しますが、SDK は共有などの他のアクティビティをサポートするかもしれません。

詳細は、[API Permissions](../getting-started/gs-permissions.md) を参照してください。

## Version

この SDK には  Python 3.6 以降が必要です。

## GitHub Repository/Package

この SDK は以下のオープンソースの GitHub リポジトリにあります:

- [UID2 SDK for Python](https://github.com/IABTechLab/uid2-client-python/blob/master/README.md)

パッケージは以下で公開されています:

- [https://pypi.org/project/uid2-client/](https://pypi.org/project/uid2-client/)

## Initialization

初期化関数は、SDKが UID2 Service で認証するために必要なパラメータを設定します。また、エラー発生時の再試行間隔を設定することもできます。

| Parameter | Description | Recommended Value |
| :--- | :--- | :--- |
| `endpoint` | UID2 Service のエンドポイント。 | N/A |
| `authKey` | クライアントに付与された認証トークン。UID2 へのアクセスについては、 [Contact Info](../getting-started/gs-account-setup.md#contact-info) を参照してください。 | N/A |

## Interface 

このインターフェイスを使用すると、UID2 Advertising Token を復号化し、対応する raw UID2 を返すことができます。

>NOTE: SDK を使用する際に、復号鍵を保存したり管理したりする必要はありません。

DSP の場合は、入札のために UID2 Advertising Token を復号化して UID2 を返すインターフェースを呼び出します。ユーザーのオプトアウトを処理する入札ロジックの詳細については、[DSPインテグレーションガイド](../guides/dsp-guide.md) を参照してください。

以下は、Python での decrypt メソッド呼び出しです:

```py
from uid2_client import decrypt

client = Uid2ClientFactory.create('https://prod.uidapi.com', 'my-auth-token', 'my-secret-key')
client.refresh_keys() # Note that refresh_keys() should be called once after create(), and then once per hour
decrypted_token = client.decrypt(advertising_token)
```

### Response Content

SDK から返される利用可能な情報の概要を次の表に示します。

| Instance Variable | Description |
| :--- | :--- |
| `uid2` | UID2 Advertising Token に対応する raw UID2。 |
| `established` | ユーザーがパブリッシャーと最初に UID2 を確立した時を示すタイムスタンプ。 |

>NOTE: 復号化に失敗した場合、例外 `EncryptionError` が発生します。

### Response Statuses

| Value | Description |
| :--- | :--- |
| `Success` | UID2 Advertising Token は正常に復号され、raw UID2 が返されました。 |
| `NotAuthorizedForKey` | リクエスト元はこの UID2 Advertising Token を復号化する権限を持っていません。|
| `NotInitialized` | クライアントライブラリは初期化待ちです。 |
| `InvalidPayload` | 受信した UID2 Advertising Token は有効なペイロードではありません。 |
| `ExpiredToken` | 受信した UID2 Advertising Token の有効期限が切れています。 |
| `KeysNotSynced` | クライアントは UID2 Service からの鍵の同期に失敗しました。|
| `VersionNotSupported` | クライアントライブラリが暗号化トークンのバージョンをサポートしていません。|

## Usage for Publishers

1. Uid2PublisherClientのインスタンスを作成します:
   ```py
   client = Uid2PublisherClient(UID2_BASE_URL, UID2_API_KEY, UID2_SECRET_KEY)
   ```
2. ユーザーのメールアドレスまたは電話番号を入力として受け取り、`TokenGenerateResponse` オブジェクトを生成する関数を呼び出します。以下の例では、メールアドレスを使用しています:

   ```py
   token_generate_response = client.generate_token(TokenGenerateInput.from_email(emailAddress).do_not_generate_tokens_for_opted_out())
   ```

   :::important
   この関数は、ターゲティング広告のためにユーザーの [directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii) を UID2 Token に変換する法的根拠を得た場合にのみ呼び出すようにしてください。
   :::

   `do_not_generate_tokens_for_opted_out()` は、[POST&nbsp;/token/generate](../endpoints/post-token-generate.md) 呼び出しで `optout_check=1` を適用します。これがないと、後方互換性を維持するために `optout_check` が省略されます。

### Standard Integration

標準のインテグレーション (クライアントとサーバー) を使用している場合 ([Server-Side Integration Guide for JavaScript](../guides/integration-javascript-server-side.md) を参照し)、この手順に従ってください:

* この identity を以下のように JSON 文字列としてクライアントに送り返します ([identity field](../sdks/client-side-identity.md#initopts-object-void) で使用するため):

  ```py
  token_generate_response.get_identity_json_string()
  ```

  :::note
  ユーザがオプトアウトした場合、このメソッドは None を返すので、その場合は必ず処理してください。
  :::

### Server-Only Integration

server-only インテグレーションを使用している場合 ([Publisher Integration Guide, Server-Only](../guides/custom-publisher-integration.md) を参照してください):

1. `token_generate_response.get_identity_json_string()` 関数を使用して、identity をユーザーのセッションに JSON 文字列として格納します。

   ユーザがオプトアウトした場合、このメソッドは None を返すので、その場合は必ず処理してください。
2. ユーザーの UID2 Token を取得するには、以下のようにします:

   ```py
   identity = token_generate_response.get_identity()
   if identity:
      advertising_token = identity.get_advertising_token()
   ```
3. ユーザーの UID2 Tonen をリフレッシュすべきかどうかを定期的にチェックします。これはタイマーを使って一定間隔で行うこともできますし、ユーザーが別のページにアクセスするたびに行うこともできます:
   1. ユーザーのセッションから identity の JSON 文字列を取得し、identity 情報を入力として受け取って `IdentityTokens` オブジェクトを生成する以下の関数を呼び出します:

   ```py
   identity = IdentityTokens.from_json_string(identityJsonString)
   ```
   
   2.  identity をリフレッシュできるかどうか (Refresh Token の有効期限が切れていないかどうか) を判断します:

      ```py
      if not identity or not identity.is_refreshable(): # we must no longer use this identity (for example, remove this identity from the user's session) 
      ```
   
   3. リフレッシュが必要かどうかを判断します:

      ```py
      if identity.is_due_for_refresh()):
      ```
      
   4. 必要であれば、トークンと関連する値をリフレッシュします:

   ```py
   token_refresh_response = client.refresh_token(identity)`
   ```

5. ユーザーのセッションに `token_refresh_response.get_identity_json_string()` を格納します。

   ユーザーがオプトアウトした場合、このメソッドは `None` を返し、ユーザーの identity をセッションから削除する必要があることを示します。オプトアウトを確認するには、 `token_refresh_response.is_optout()` 関数を使用します。

## Usage for UID2 Sharers

UID2 Sharer とは、UID2 を他の参加者と共有したい参加者のことです。raw UID2を他の参加者に送信する前に、UID2 Token に暗号化する必要があります。使用例については、[examples/sample_sharing.py](https://github.com/IABTechLab/uid2-client-python/blob/master/examples/sample_sharing.py) スクリプトを参照してください。

>IMPORTANT: このプロセスで生成される UID2 Token は共有専用です&#8212;ビッドストリームでは使用できません。ビッドストリーム用のトークン生成には別のワークフローがあります: [Sharing in the Bid Stream](../sharing/sharing-bid-stream.md) を参照してください。

次の手順では、UID2 SDK for Python を送信者または受信者として使用して共有を実装する方法の例を示します。

1. ```UID2Client``` のリファレンスを作成します:
 
   ```py
   from uid2_client import Uid2Client
   client = Uid2Client(base_url, auth_key, secret_key)
   ```
   
2. 起動時に一度リフレッシュし、その後定期的にリフレッシュします (推奨リフレッシュ間隔は1時間毎):

   ```py
   keys = client.refresh_keys()
   ```

3. 送信者: 
   1. `encrypt` 関数を呼び出します。暗号化に成功したら、UID2 Token を受信者に送信します:

      ```py
      try:
         encrypted_data = client.encrypt(raw_uid)
         # send encrypted_data to receiver
      except EncryptionError as err:
        # check for failure reason
        print(err)
      ```

4. 受信者:
   1. `decrypt` 関数を呼び出します。復号化に成功したら、raw UID2 を使用します:

      ```py
      try:
        result = decrypt(ad_token, keys)
        #use successfully decrypted result.uid2
      except EncryptionError as err:
        #check for failure reason
        print(err)
      ```

## FAQs

DSP に関するよくある質問については、 [FAQs for DSPs](../getting-started/gs-faqs.md#faqs-for-dsps) を参照してください。
