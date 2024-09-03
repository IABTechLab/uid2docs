---
title: UID2 Client-Side Integration Guide for Mobile
sidebar_label: Client-Side Integration for Mobile
pagination_label: UID2 Client-Side Integration Guide for Mobile
description: Client-Side でトークン生成とリフレッシュの両方を行うモバイルインテグレーションの設定。
hide_table_of_contents: false
sidebar_position: 04
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';
import GMAIMA_Plugins from '/docs/snippets/_mobile_docs_gmaima-plugin-gss.mdx';
import EnableLogging from '/docs/snippets/_mobile-docs-enable-logging.mdx';
import PrebidMobileSDK from '/docs/snippets/_mobile_docs_prebid-mobile.mdx';
import ExampleAdvertisingToken from '/docs/snippets/_example-advertising-token.mdx';


# UID2 Client-Side Integration Guide for Mobile

このガイドは、モバイルアプリのみの変更で UID2 とインテグレーションしたいモバイルアプリパブリッシャー向けです。

以下の手順は、Private Operator を使用したいパブリッシャーや、Server-Side でトークンを生成したいパブリッシャーには適用されません。これらのパブリッシャーは、[Client-Server Integration Guide for Mobile](integration-mobile-client-server.md) に従う必要があります。

このページでは、インテグレーション手順の概要と、追加のドキュメントへのリンクを提供します。

UID2 は、[Android](../sdks/sdk-ref-android.md) および [iOS](../sdks/sdk-ref-ios.md) 向けのモバイル SDK を提供しています。各 SDK には以下の機能があります:

- UID2 <Link href="../ref-info/glossary-uid#gl-identity">identity</Link> (UID2 Token と関連する値) を生成し、ローカルファイルストレージに保存します。
- UID2 Token を自動的にリフレッシュします。

:::note
このガイドの、**UID2 mobile SDKs** は、SDK for Android と SDK for iOS の両方を含むグループ用語です。
:::

モバイルパブリッシャーインテグレーションに関する FAQs については、[FAQs for Mobile Integrations](../guides/integration-mobile-overview.md#faqs-for-mobile-integrations) を参照してください。

UID2 を Client-Side でインテグレーションするには、以下の手順を完了する必要があります:

1. [Complete the UID2 account setup](#complete-the-uid2-account-setup).

1. [Add the UID2 mobile SDK to your mobile app](#add-the-uid2-mobile-sdk-to-your-mobile-app).

1. [Configure the UID2 mobile SDK](#configure-the-uid2-mobile-sdk).

1. [Check that the token was successfully generated and then pass it for bidstream use](#pass-generated-token-for-bidstream-use).

1. [Optionally, integrate the UID2 GMA/IMA Plugin for GAM Secure Signals integration](#optional-uid2-gmaima-plugin-for-gam-secure-signals-integration).

## Mobile SDK Version

このガイドは、次のいずれかの UID2 mobile SDK のバージョン 1.2.0 以上を使用する方法について説明します:

- SDK for Android
- SDK for iOS

正しい SDK/バージョンをモバイルアプリにインストールする手順については、[Add the UID2 Mobile SDK to Your Mobile App](#add-the-uid2-mobile-sdk-to-your-mobile-app) を参照してください。

## Client-Side Integration Example

UID2 mobile SDK の設定方法と、モバイル用の Client-Side インテグレーションを使用したトークンの生成方法の例については、UID2 開発アプリを試してください。

Android または iOS 向けの適用可能な手順に従ってください:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

1. [SDK for Android source code repository on GitHub](https://github.com/IABTechLab/uid2-android-sdk/tree/main) の main ブランチをチェックアウトします。
1. Android Studio (Jellyfish/v2023.3.1 または SDK for Android リリース時に必要な Android Gradle Plugin バージョンをサポートする将来のバージョン) で、チェックアウトしたディレクトリを開きます。
1. **dev-app** アプリを実行します。
1. アプリを起動したら、**Client Side** チェックボックスがチェックされていることを確認します。
1. メールアドレスまたは電話番号を入力し、右側の矢印をクリックします。

</TabItem>
<TabItem value='ios' label='iOS'>

1. [main branch of the UID2 SDK For iOS source code repository on GitHub](https://github.com/IABTechLab/uid2-ios-sdk/tree/main) をチェックアウトします。
1. Xcode で、このプロジェクトファイルを開きます:

   ```js
   Development/UID2SDKDevelopmentApp/UID2SDKDevelopmentApp.xcodeproj
   ```
1. **UID2SDKDevelopmentApp** アプリのスキームを実行します。
1. アプリを起動したら、**Client Side** チェックボックスがチェックされていることを確認します。
1. メールアドレスまたは電話番号を入力し、右側の矢印をクリックします。

</TabItem>
</Tabs>

アプリの背後で、開発アプリは次の UID2 SDK API コールを行います。このコールは、メール/電話番号入力に対して UID2 Service に <Link href="../ref-info/glossary-uid#gl-identity">identity</Link> (UID2 Token と関連する値) を生成するリクエストを送信します:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().generateIdentity(
    identityRequest: IdentityRequest,
    subscriptionId: String,
    publicKey: String,
    onResult: (GenerateIdentityResult) -> Unit
)
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.generateIdentity(
    _ identity: IdentityType,
    subscriptionID: String,
    serverPublicKey: String,
    appName: String? = nil
)
```

</TabItem>
</Tabs>

API コールが成功すると、アプリは生成された identity を表示し、`UID2Manager` クラス内に永続化します。

identity には、`getAdvertisingToken()` メソッドコールで取得できる UID2 Advertising Token が含まれます:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().getAdvertisingToken()
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.getAdvertisingToken()
```

</TabItem>
</Tabs>

このメソッドコールは、広告リクエストを行うために必要な値を返します: 詳細は [Pass Generated Token for Bidstream Use](#pass-generated-token-for-bidstream-use) を参照してください。

### Testing With Your Own Configuration

デフォルトでは、開発アプリは Subscription ID と public key のデフォルト値を使用します。これらの値は、次のオブジェクトに保存されています:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
com.uid2.dev.ui.MainScreenViewModel.Companion
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
RootViewModel
```

</TabItem>
</Tabs>

デフォルトでは、開発アプリは UID2 インテグレーション環境に接続されています。これは、次の Android メソッドコール/iOS ファイルで指定されています:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
com.uid2.UID2Manager.Companion#init
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
see UID2SDKDevelopmentApp/UID2SDKDevelopmentApp/Info.plist
```

</TabItem>
</Tabs>

必要に応じて、デフォルトの Subscription ID と public key を割り当てられた値に変更し、UID2 本番環境に接続することもできます。詳細は [Optional: Specifying the API Base URL to Reduce Latency](#optional-specifying-the-api-base-url-to-reduce-latency) を参照してください。

## Complete the UID2 Account Setup

アカウントをセットアップするには、[Account Setup](../getting-started/gs-account-setup.md) に記載されている手順に従ってください。アカウントセットアッププロセスの一環として、UID2 mobile SDK とインテグレーションするすべてのモバイルアプリの <Link href="../ref-info/glossary-uid#gl-app-name">app names</Link> のリストを提供する必要があります。これには、以下の値が該当します:

- Android Application ID
- iOS Bundle Identifier
- iOS App Store ID

アカウントのセットアップが完了すると、UID2 サーバーがユーザーを識別するために使用する 2 つの値であるクライアントキーペアが発行されます: Subscription ID と Public key。これらの値はあなたに固有で、UID2 モジュールの設定に使用します。詳細は [Subscription ID and Public Key](../getting-started/gs-credentials.md#subscription-id-and-public-key) を参照してください。

## Add the UID2 Mobile SDK to Your Mobile App

Mobile SDK をアプリに追加するには、適用可能な以下のドキュメントに従ってください:

- [SDK for Android Reference Guide](../sdks/sdk-ref-android.md)
- [SDK for iOS Reference Guide](../sdks/sdk-ref-ios.md)

SDK をアプリに追加したら、SDK を使用して UID2 Token を生成する準備が整います。

### Using the UID2 Integration Environment

デフォルトでは、SDK は UID2 本番環境で動作するように構成されています: `https://prod.uidapi.com`。代わりにインテグレーション環境を使用する場合は、`UID2Manager` の初期化に次の URL を指定してください:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.init(
  context = this,
  serverUrl = "https://operator-integ.uidapi.com"
)
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
// Must be set before UID2Manager.shared is accessed
UID2Settings.shared.environment = .custom(
  url: URL(string: "https://operator-integ.uidapi.com")!
)
```

</TabItem>
</Tabs>

:::note
次のような環境間の違いに注意してください:
- UID2 インテグレーション環境のトークンは、<Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>に渡しても有効ではありません。
- 各環境（インテグレーションおよび本番）には異なる API Key とクライアントシークレット値があります。各環境で正しい値を使用してください。
:::

### Optional: Specifying the API Base URL to Reduce Latency

デフォルトでは、この SDK は米国の UID2 本番環境サーバーにリクエストを送信します。

ユースケースに最適な URL を選択する方法と、有効なベース URL の完リストについては、[Environments](../getting-started/gs-environments.md) を参照してください。

別の UID2 サーバを指定するには、次の例に示すように構成変更を行います:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>
 
```js
UID2Manager.init(
  context = this,
  serverUrl = "https://global.prod.uidapi.com"
)
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
// Must be set before UID2Manager.shared is accessed
UID2Settings.shared.environment = .custom(
  url: URL(string: "https://global.prod.uidapi.com")!
)
// or use a named environment
UID2Settings.shared.environment = .sydney
```

</TabItem>
</Tabs>

## Configure the UID2 Mobile SDK

UID2 は、以下の値を提供します。これらは、UID2 Token を Client-Side クライアで生成する際に必要です:

- Subscription ID
- Public key

これらの値は、アカウントセットアップ時に受け取ります。インテグレーション環境用の 1 つのセットと、本番環境用の別のセットがあります。

SDK を構成するには、アカウントセットアップ時に受け取った Subscription ID と public key、およびユーザーのハッシュ化またはハッシュ化されていない直接識別情報 (<Link href="../ref-info/glossary-uid#gl-dii">DII</Link>) (メールアドレスまたは電話番号) を次のメソッドコールに渡す必要があります:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().generateIdentity(
    identityRequest: IdentityRequest,
    subscriptionId: String,
    publicKey: String,
    onResult: (GenerateIdentityResult) -> Unit
)
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.generateIdentity(
    _ identity: IdentityType,
    subscriptionID: String,
    serverPublicKey: String,
    appName: String? = nil
)
```

</TabItem>
</Tabs>

設定が完了すると、UID2 mobile SDK は以下の操作を行います:

- ユーザーの UID2 identity (トークンを含む) を生成します。
- トークンをユーザーのデバイスにローカルに保存します。
- アプリが開いている間、必要に応じてトークンを自動的にリフレッシュします。

:::tip
ユーザーの <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> を UID2 mobile SDK に渡す際、ハッシュ化またはハッシュ化されていない DII を渡すことができます。DII をハッシュ化されていない状態で渡す場合、SDK がハッシュ化します。ハッシュ化された DII を SDK に渡す場合、ハッシュ化する前に正規化する必要があります。詳細は [Normalization and Encoding](../getting-started/gs-normalization-encoding.md) を参照してください。
:::

### Format Examples for DII

SDK は、ハッシュ化された DII を UID2 Service に送信する前に暗号化します。

ユーザーごとに、DII のフォーマットが異なる場合でも、任意のフォーマットで `generateIdentity` メソッドを呼び出すことができます。ただし、ユーザーごとに 1 つの値のみを送信できます。

以下の例は、UID2 mobile SDK を構成する異なる方法を示し、SDK に渡す DII に必要な要件を示しています:

- Email, Unhashed
- Email, Normalized and Hashed
- Phone Number, Unhashed
- Phone Number, Normalized and Hashed

`generateIdentity` メソッドが複数回呼び出される場合、UID2 mobile SDK は最新の構成値を使用します。

<Tabs>
<TabItem value='example_email_unhashed' label='Email, Unhashed'>

以下の例は、UID2 mobile SDK をメールアドレスで構成する方法を示しています。

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().generateIdentity(
    IdentityRequest.Email("test@example.com"),
    subscriptionId,
    publicKey,
) { result ->
    when (result) {
        is Error -> ...
        is Success -> ...
    }
}
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
struct InvalidEmailError: Error, LocalizedError {
    var errorDescription: String = "Invalid email address"
}
Task<Void, Never> {
    do {
        guard let normalizedEmail = IdentityType.NormalizedEmail(string: "test@example.com") else {
            throw InvalidEmailError() // email is invalid and cannot be normalized, handle error
        }
        try await UID2Manager.shared.generateIdentity(
            .email(normalizedEmail),
            subscriptionID: subscriptionID,
            serverPublicKey: serverPublicKeyString
        )
    } catch {
        // read `error` object for troubleshooting or enable logging to view it in logs
    }
}
```

</TabItem>
</Tabs>

このシナリオでは:

- パブリッシャーはメールアドレスを正規化またはハッシュ化する必要はありません。
- UID2 mobile SDK は、暗号化されたハッシュを UID2 Service に送信する前にメールアドレスを正規化およびハッシュ化します。

</TabItem>
<TabItem value='example_email_hash' label='Email, Normalized and Hashed'>

以下の例は、UID2 mobile SDK をハッシュ化されたメールアドレスで構成する方法を示しています。

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().generateIdentity(
    IdentityRequest.EmailHash(
        "EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4="
    ),
    subscriptionId,
    publicKey,
) { result ->
    when (result) {
        is Error -> ...
        is Success -> ...
    }
}
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
Task<Void, Never> {
    do {
        try await UID2Manager.shared.generateIdentity(
            .emailHash("EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4="),
            subscriptionID: subscriptionID,
            serverPublicKey: serverPublicKeyString
        )
    } catch {
        // read `error` object for troubleshooting or enable logging to view it in logs
    }
}
```

</TabItem>
</Tabs>

このシナリオでは:

- パブリッシャーはメールアドレスを正規化およびハッシュ化する責任があります。詳細は [Email Address Normalization](../getting-started/gs-normalization-encoding.md#email-address-normalization) を参照してください。
- UID2 mobile SDK は、ハッシュ化された DII を UID2 Service に送信する前に暗号化します。

</TabItem>
<TabItem value='example_phone_unhashed' label='Phone Number, Unhashed'>

以下の例は、UID2 mobile SDK を電話番号で構成する方法を示しています。

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().generateIdentity(
    IdentityRequest.Phone("+12345678901"),
    subscriptionId,
    publicKey,
) { result ->
    when (result) {
        is Error -> ...
        is Success -> ...
    }
}
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
struct InvalidPhoneError: Error, LocalizedError {
    var errorDescription: String = "Invalid phone number"
}
Task<Void, Never> {
    do {
        guard let normalizedPhone = IdentityType.NormalizedPhone(normalized: "+12345678901") else {
            throw InvalidPhoneError() // Phone number is not normalized according to ITU E.164.
        }
        try await UID2Manager.shared.generateIdentity(
            .phone(normalizedPhone),
            subscriptionID: subscriptionID,
            serverPublicKey: serverPublicKeyString
        )
    } catch {
        // read `error` object for troubleshooting or enable logging to view it in logs
    }
}
```

</TabItem>
</Tabs>

このシナリオでは:

- パブリッシャーは電話番号を正規化する責任があります。詳細は [Phone Number Normalization](../getting-started/gs-normalization-encoding.md#phone-number-normalization) を参照してください。
- UID2 mobile SDK は、ハッシュ化された電話番号を UID2 Service に送信する前に暗号化します。

</TabItem>
<TabItem value='example_phone_hash' label='Phone Number, Normalized and Hashed'>

以下の例は、UID2 mobile SDK をハッシュ化された電話番号で構成する方法を示しています。

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().generateIdentity(
    IdentityRequest.PhoneHash(
        "EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4="
    ),
    subscriptionId,
    publicKey,
) { result ->
    when (result) {
        is Error -> ...
        is Success -> ...
    }
}
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
Task<Void, Never> {
    do {
        try await UID2Manager.shared.generateIdentity(
            .phoneHash("EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4="),
            subscriptionID: subscriptionID,
            serverPublicKey: serverPublicKeyString
        )
    } catch {
        // read `error` object for troubleshooting or enable logging to view it in logs
    }
}
```

</TabItem>
</Tabs>

このシナリオでは:

- パブリッシャーは電話番号を正規化およびハッシュ化する責任があります。詳細は [Phone Number Normalization](../getting-started/gs-normalization-encoding.md#phone-number-normalization) を参照してください。
- UID2 mobile SDK は、ハッシュ化された DII を UID2 Service に送信する前に暗号化します。

</TabItem>
</Tabs>

## Token Storage and Refresh

[Format Examples for DII](#format-examples-for-dii) に記載されている適用可能なメソッドを呼び出した後、identity が生成され、ローカルファイルストレージに保存されます。UID2 mobile SDK は定期的に UID2 Token をリフレッシュします。

:::warning
ローカルファイルストレージに保存されているファイルの形式、またはファイル名自体が予告なく変更される可能性があります。ファイルを直接読み取ったり更新したりしないようにしてください。
:::
 
## Pass Generated Token for Bidstream Use

モバイルアプリで `generateIdentity` メソッドが成功すると、identity が返されます。次のステップは、次のように `getAdvertisingToken()` メソッドを呼び出すことです:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().getAdvertisingToken()
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.getAdvertisingToken()
```

</TabItem>
</Tabs>

成功すると、このメソッドコールはトークンを返します。&#8212;以下のような、非 null の文字列オブジェクトが返されます:

<ExampleAdvertisingToken />

このトークンを使用して、ビッドストリームに送信するためにダウンストリームに渡すことができます。

 `getAdvertisingToken()` メソッドコールが `null` を返す場合、identity または有効なトークンが生成されていません。

その原因として考えられることと、トラブルシューティングに役立ついくつかの方法は次のとおりです:

- Identity が無効です。この場合、いくつかのオプションがあります:
  - 前の `generateIdentity` メソッドコールからエラーがあるかどうかを確認します。
  - 次のいずれかを使用して identity のステータスを確認します:
    - **Android Java**: `UID2Manager.getInstance().getCurrentIdentityStatus()`
    - **Android Kotlin**: `UID2Manager.getInstance().currentIdentityStatus()`
    - **iOS**: `UID2Manager.shared.identityStatus`

    UID2 から DII がオプトアウトされている可能性があります: 詳細については [When to Pass DII into the SDK](#when-to-pass-dii-into-the-sdk) を参照してください。
- ロギングを有効にして詳細情報を取得できます: [Enable Logging](#enable-logging) を参照してください。
- UID2 identity 内の Advertising Token の有効期限が切れていて、Refresh Token も有効期限が切れているため、SDK がトークンをリフレッシュできません。

Identity が無い場合は、`generateIdentity` メソッドを再度呼び出す必要があります: 詳細については [Configure the UID2 Mobile SDK](#configure-the-uid2-mobile-sdk) を参照してください。

詳しくは、[When to Pass DII into the SDK](#when-to-pass-dii-into-the-sdk)(次項) を参照してください。

## When to Pass DII into the SDK

新しいユーザーがアプリを初めて開いた場合、UID2 identity は存在しません。トークン生成を開始するには、`generateIdentity` メソッドを DII と共に呼び出す必要があります:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().generateIdentity(
    identityRequest: IdentityRequest,
    subscriptionId: String,
    publicKey: String,
    onResult: (GenerateIdentityResult) -> Unit
)
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.generateIdentity(
    _ identity: IdentityType,
    subscriptionID: String,
    serverPublicKey: String,
    appName: String? = nil
)
```

</TabItem>
</Tabs>

メソッドコールが成功すると、Advertising Token (UID2 Token) が生成され、ビッドストリームに送信するために使用できます。

ローカルファイルストレージに保存されている UID2 identity が期限切れで、リフレッシュできない場合は、新しい identity を生成するために `generateIdentity` メソッドを再度呼び出す必要があります。ただし、次の Android メソッド/iOS オブジェクトの応答が示すように、DII が UID2 からオプトアウトされている場合は、UID2 Token は生成されません:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

**Android Java**:

```java
UID2Manager.getInstance().getCurrentIdentityStatus()
```

**Android Kotlin**:

```kotlin
UID2Manager.getInstance().currentIdentityStatus()
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.identityStatus
```

</TabItem>
</Tabs>

レスポンスステータスが `OPT_OUT` (Android) または `optOut` (iOS) の場合、DII は UID2 からオプトアウトされており、UID2 Token は生成されません。

UID2 mobile SDK で DII が必要かどうかを判断する最良の方法は、アプリの起動時または再開時に常に `getAdvertisingToken()` メソッドを呼び出すことです:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().getAdvertisingToken()
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.getAdvertisingToken()
```

</TabItem>
</Tabs>

`getAdvertisingToken()` が null を返し、identity ステータスが `OPT_OUT`/`optOut` でない場合、新しいトークンを生成する必要があります。これを行うには、`generateIdentity` メソッドに DII を再度渡します。詳細は [Configure the UID2 Mobile SDK](#configure-the-uid2-mobile-sdk) を参照してください。

<!--## Opt-Out Handling

If the DII provided to the `generateIdentity` method has been opted out of UID2, this method returns `null`. To check the status of the UID2 identity, you can call the following:

<Tabs groupId="language-selection">
<TabItem value='android' label='Android'>

```js
UID2Manager.getInstance().getCurrentIdentityStatus()
```

</TabItem>
<TabItem value='ios' label='iOS'>

```js
UID2Manager.shared.identityStatus
```

</TabItem>
</Tabs>

If the response status indicates that the DII has been opted out of UID2, you might want to avoid making repeated calls to check the status of the UID2 identity: if the DII has a status of opted out, the UID2 token is not generated.

-->

## Enable Logging

<EnableLogging />

## Optional: UID2 GMA/IMA Plugin for GAM Secure Signals integration

<GMAIMA_Plugins />


## Optional: UID2 Prebid Mobile SDK Integration
:::important
UID2 Prebid Mobile SDK インテグレーションは、Android のみに対応しています。UID2 Prebid Mobile SDK インテグレーションを実装するには、SDK for Android のバージョン 1.4.0 が必要です。
:::

<PrebidMobileSDK />
