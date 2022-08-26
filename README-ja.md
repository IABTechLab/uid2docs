# UID 2.0

[English](README.md) | 日本語

このページでは、UID2 について以下の情報を提供します:

- [Introduction（概要）](#introduction)
- [ID Forms（ID の形式）](#id-forms)
- [Components（コンポーネント）](#components)
- [Roles（役割）](#roles)
- [Workflow Summaries（ワークフローの概要）](#workflow-summaries)
- [FAQs（よくある質問）](#faqs)
- [License（ライセンス）](#license)

インテグレーションガイド、対応 SDK、エンドポイントリファレンスは[UID 2.0 API Documentation](/api-ja/README.md)を参照してください。

## Introduction

アドレサブル広告によって、パブリッシャーと開発者は、モバイルアプリ、ストリーミングテレビ、ウェブ体験など、消費者が楽しめるコンテンツとサービスを提供できるようになります。この価値交換は、必ずしも消費者によく理解されておらず、また消費者にも伝わっていません。業界がサードパーティクッキーへの依存を減らすにつれ、オープンなインターネット上で適切な広告を消費者に提供する方法を改善する機会があります。その解決策は、コンテンツ制作者と消費者の両方が、消費者データの透明な管理によるエンゲージメント機会の向上から利益を得ることができる識別システムです。

Unified ID 2.0（UID2）は、ユーザーの透明性とプライバシー制御を備えた、PII（メールアドレスや電話番号など）に基づく決定論的な識別子です。UID2 識別子により、パブリッシャーのウェブサイト、モバイルアプリ、CTV アプリからのログイン体験が、プログラマティックワークフローを通じてマネタイズできるようになります。何重ものセキュリティとプライバシー対策により、UID2 はオープンインターネット上で安全に配布することができます。UID2 は当初、The Trade Desk によって構築・維持されていましたが、オープンソースのコード管理、ガバナンス、管理、システム運用のため、独立した組織に移管される予定です。UID2 は非独占的な規格であり、広告主、パブリッシャー、DSP、SSP、SSO、CDP、CMP、ID プロバイダー、データプロバイダ、測定プロバイダーなど、広告エコシステム全体のメンバーが、行動規範を遵守しながらアクセスできるようになっています。

UID2 のゴールは、消費者の透明性を確保し、統制の取れたオープンなインターネット上での広告機会において、決定論的な ID を可能にすることです。UID2 は、透明で相互運用可能なアプローチを利用することにより、すべてのメンバーに協調的なフレームワークを提供し、健全で開かれたインターネットを実現します。

### Guiding Principles

**First-Party Relationships:** UID2 により、広告主はオープンなインターネット上でパブリッシャーのファーストパーティデータを簡単にアクティベートすることができるようになります。

**Non-Proprietary (Universal) Standard:** UID2 は、行動規範を遵守する広告エコシステムのすべてのメンバーがアクセスでき、個々の企業がアクセスを制御することはありません。これには、DSP、SSP、データプロバイダ、測定プロバイダー、ID サービスなどが含まれます。

**Open Source:** UID2 のコードは、オープンソースフレームワークで透過的に公開される予定です。

**Interoperable:** UID2 は、他の ID ソリューション（商用およびプロプライエタリ）が UID2 を統合し、提供することを許可しています。

**Secure and Encrypted Data:** UID2 は、何重ものセキュリティ、暗号化、暗号化により、PII とユーザーデータを保護します。

**Consumer Control:** 消費者は、[Transparency and Control Portal](https://transparentadvertising.org)を通じて、いつでも UID2 をオプトアウトすることができます。

### Technical Design Principles

**Accountability:** アクセスするメンバーには、独立した機関が管理する行動規範を遵守することを求めています。

**Distributed Integration:** パブリッシャー、広告主、データプロバイダが UID2 を生成するための複数の認定されたインテグレーションパスが提供されます。

**Decentralized Storage:** PII-UID2 マッピングによる集中ロケーションを廃止し、悪意ある行為者をブロックします。

**Lean Infrastructure:** インフラは軽量で、安価に運用できます。

**Self-Reliant:** RTB データのリアルタイム処理時に外部サービスに依存しません。

## ID Forms

### UID2

UID2（raw UID2）は、ユーザーの検証可能な PII を入力として、一連の API または SDK を通じて作成される暗号化されていない英数字の識別子です。PII の例としては、メールアドレスや電話番号などがあります。

UID2 は、広告主、データプロバイダ、DSP によって保存されるように設計されており、ビッドストリームで共有されることはありません。UID2 Token (または UID2 の暗号化形式) はビッドストリームで共有されることに注意してください。

#### Technical Details

- UID2 を作成するには、UID2 Operator API または SDK インターフェイスを使用します。

- UID2 Operator は、ユーザーの PII を SHA256 でハッシュ化し、シークレットソルトを加えて UID2 を生成します。

- 各 UID2 にはソルトバケット（Salt Bucket）が割り当てられています。各バケットのソルトは 12 ヶ月に一度、ローテーションします。各ソルトバケットには 1 ～ 1,000,000 の英数字が指定されています。

- UID2 を保管するメンバーは、UID2 Operator API を監視して、UID2 のソルトバケットがいつローテーションしたかを知ることができます。

### UID2 Token

UID2（raw UID2）を暗号化すると、UID2 Token が作成されます。これは、ビッドストリームのための一時的なものです。暗号化ノンスと暗号化を利用することで、UID2 Token はビッドストリームに入るたびに異なるものになります。これにより、UID2 エコシステムが保護され、UID2 メンバー以外が UID2 Token を使ってプロファイルを構築するのを防ぐことができます。

UID2 Token は、パブリッシャーまたはパブリッシャーサービスプロバイダー（例えば、SSO）によって保管されるように設計されています。SSP は入札ストリームで UID2 Token を渡し、DSP はビッドリクエスト時に復号化します。

#### Technical Details

- 暗号化ノンスを生成して UID2 に付加し、暗号化して UID2 Token を作成します。

  - ノンスは一度だけ使用できる任意の数字です。
  - 暗号化には AES/CBC/PKCS5P の 256bit キーを使用し、キーは日次でローテーションします。

- UID2 の暗号化タイムスタンプは、ペイロードメタデータとして添付されます。

## Components

![Infrastructure](/images/key_mgmt.jpg)

### Administrator

分散した UID2 システムへのアクセスを管理する中央集権的なサービスです。

#### Functions

- UID2 Operator に暗号鍵とソルトを配布します。

- UID2 Token の復号化に使用する復号鍵を準拠メンバーに配布します。

- UID2 ユーザーのオプトアウトリクエストを Operator と DSP に送信します。

### Open Operators

UID2 および UID2 Token を生成・管理するサービスを（API を介して）運営する、すべての参加者がアクセス可能な組織です。

UID2 システムを構成する Operator は複数あり、メンバーはいずれかの Operator と協力するか、Closed Operator（下記参照）になるかを選択することができます。

#### Functions

- UID2 Administrator サービスから暗号鍵とソルトを受け取り、保存します。

- PII をソルト化、ハッシュ化し、UID2 を返します。

- UID2 を暗号化して UID2 Token を生成します。

- UID2 Token の更新（オプトアウトやソルトバケットのローテーションの処理を含む）を、Refreh Token を利用するパブリッシャーにブロードキャストします。

### Closed Operators

UID2 および UID2 Token を生成・管理するために、独自の内部版サービスを運用する組織です。メンバーは誰でも Closed Operator になることを選択でき、クラウドプロバイダーを通じて複数のインテグレーションパスが用意されています。

Closed Operator Service の設定方法については、[Operator Integration Guide](/api-ja/v2/guides/README.md) 参照してください。

#### Functions

- UID2 Administrator サービスから暗号鍵とソルトを受け取り、保存します。

- PII をソルト化、ハッシュ化し、UID2 を返します。

- UID2 を暗号化して UID2 Token を生成します。

- UID2 Token の更新（オプトアウトやソルトバケットのローテーションの処理を含む）を、Refresh Token を利用するパブリッシャーにブロードキャストします。

### Opt-Out Portal

消費者は、ユーザー向けのウェブサイト[Transparency and Control Portal](https://transparentadvertising.org)を通じて、いつでも UID2 をオプトアウトすることができます。

#### Functions

- ユーザーの UID2 について透明性を提供します。

- ユーザーに UID のグローバルなオプトアウトを選択する方法を提供し、これによりすべての UID2 データホルダーに対してオプトアウトリクエストが行われます。

### UID2 Compliance Manager

この組織は、すべての UID2 メンバーが規定されたルールに準拠しているかどうかを監査します。

#### Functions

- 信頼できる UID2 エコシステムのメンバーを監査して、コンプライアンスを判断します。

- UID2 Administrator、UID2 Operator にコンプライアンス情報を伝えます。

## Roles

UID2 メンバーは、UID2 をどのように使用するかに基づいて、あらかじめ定義された役割を選択する必要があります。役割によって、UID2 メンバーが UID2 システムとどのようにやり取りするかが決定されます。また、役割によって、行動規範の要件とそれに対応するコンプライアンスチェックも決定されます。

UID2 メンバーは複数の役割を果たすことができます。

**Generator:** 適切な同意を得た上で、メールアドレスまたは電話番号から UID2 値を生成し、オプトアウトを尊重する関係者です。

責任:

- API キーにアクセスするために Administrator に登録します。
- 消費者から、PII から UID 2.0 を生成し、UID 2.0 を広告目的に使用することに対する同意を得ます。
- UID 2.0 への同意を管理するために、消費者にオプトアウトポータルへのアクセスを提供します。
- Closed Operator または Open Operator とのインテグレーションにより、UID 2.0 を生成します。
- UID2 のオプトアウトを尊重します。
- UID2 Token を常に更新された状態に保ちます。

例: パブリッシャー、広告主、データプロバイダ、オンボードプロバイダー、ログインプロバイダー

**Observer:** Generator から UID2 を受け取り保管し、広告のターゲティングや計測の目的で使う関係者です。

責任:

- API キーにアクセスするために Administrator に登録します。
- UID 2.0 への同意を管理するために、消費者にオプトアウトポータルへのアクセスを提供します。
- UID2 復号化ライブラリを使って UID2 を復号化します。
- UID2 のオプトアウトを尊重します。

例: DSP、計測プロバイダ、広告主

## Workflow Summaries

UID2 エコシステムを構成する主要なワークフローは 4 つあります:

1. [Buy-Side（バイサイド）Workflow](#buy-side-workflow)
2. [Data Provider（データプロバイダ）Workflow](#data-provider-workflow)
3. [Publisher（パブリッシャー）Workflow](#publisher-workflow)
4. [User Trust（ユーザートラスト）Workflow](#user-trust-workflow)

**Summary of Workflows**

![The UID2 Ecosystem](/images/macro_view.jpg)

以下のセクションでは、各ワークフローを個別に掘り下げて、UID2 プロセス全体における位置づけを明確にしています。

### Buy-Side Workflow

![Buy-Side Workflow](/images/buy_side.jpg)

このワークフローは、ビッドストリームで UID2 を取引する DSP のためのものです。

#### Buy-Side (DSP) Workflow Overview

1. データプロバイダは、ファーストパーティおよびサードパーティのデータを UID2(raw UID2)の形で DSP に渡します。
2. DSP は UID2 Administrator と同期し、復号鍵を受け取ります。
3. DSP はビッドストリーム内の UID2 Token にアクセスし、入札時に復号化します。
4. DSP は UID2 Administrator からのオプトアウト要求を受け取り、オプトアウトした UID2 での購入をブロックします。

#### Buy-Side Integration

DSP は UID2 とインテグレーションし、ブランド（ファーストパーティデータ）やデータプロバイダ（サードパーティデータ）から UID2 を受け取り、それを活用してビッドストリーム内の UID2 に対する入札情報を提供します。

##### Requirements

- UID2 形式のデータを受け取ります。
- UID2 形式のデータで入札します。
- オプトアウト要求を処理するための Webhook を構築します。
- UID2 Administrator と暗号鍵を日時で同期させます。

##### Optional

DSP がメールアドレスから UID2 を自分で生成したい場合も、Data Provider Workflow（下記参照）に従います。

### Data Provider Workflow

![Data Provider Workflow](/images/data_provider.jpg)

このワークフローは、ユーザーデータを収集し、DSP にプッシュする組織のためのものです。データコレクターには、広告主、データオンボーダー、測定プロバイダー、ID グラフプロバイダー、サードパーティデータプロバイダ、および DSP にデータをプッシュするその他の組織が含まれます。

#### Data Provider Workflow Overview

1. データプロバイダは、同意を得たユーザーの個人識別情報（PII）を UID2 Operator に送信します。
2. UID2 Operator は raw UID2 を生成して返します。
3. データプロバイダは UID2 とソルトバケットを保存します。
   - サーバーサイド: データプロバイダは UID2 をマッピングテーブルや DMP、データレイクなどのサーバーサイドアプリケーションに格納します。
4. データプロバイダは、行動規範で定義された許可されたトランスポートプロトコルを使用して、UID2 を DSP に送信します。
5. データプロバイダは、ローテーションされたソルトバケットの UID2 Operator を監視し、必要に応じて UID2 を更新します。

#### Data Provider Integration

ユーザーの PII から UID2 を生成するには、データプロバイダが UID2 Operator API にアクセスする必要があります。広告主によっては、CDP、データオンボーダー、またはその他のサービスプロバイダーを通して作業を行うことを選択する場合もあります。

[Advertiser/Data Provider Integration Guide](/api-ja/v2/guides/advertiser-dataprovider-guide.md)も参照してください。

##### Requirements

- UID2 Operator とインテグレーションして UID2 を生成し、ソルトバケットのローテーションを処理します。

### Publisher Workflow

![Publisher Workflow](/images/publisher_workflow.jpg)

このワークフローは、SSP を介して入札ストリームに ID を伝播する組織向けです。ID プロバイダー、パブリッシャー、SSO が含まれます。

#### Publisher Workflow Overview

1. ユーザーがパブリッシャーのウェブサイト、モバイルアプリ、または CTV アプリにアクセスします。
2. パブリッシャーは、オープンインターネットの価値交換を説明し、ユーザーにログインをリクエストします。
3. ユーザーがログインすると、パブリッシャーは、SDK またはダイレクト API インテグレーションを通じて、ファーストパーティの PII と対応するプライバシー設定を UID2 Operator に送信します。パブリッシャーは、SSO プロバイダーや ID プロバイダーに、PII とプライバシー設定の受け渡しを代行する権限を付与することもできます。
4. UID2 Operator は、ソルト化、ハッシュ化、暗号化処理を実行し、UID2 Token を返します。
5. パブリッシャーは UID2 Token を保存し、リアルタイム入札の際に SSP と共有します。
   a. サーバーサイド: パブリッシャーは Token をマッピングテーブル、DMP、データレイク、その他のサーバーサイドアプリケーションに格納します。
   b. クライアントサイド: パブリッシャーはトークンをクライアントサイドのアプリケーション、またはユーザーのブラウザにファーストパーティクッキーとして保存します。
6. パブリッシャーはインプレッション時に UID2 Token を SSP に送信します。
7. SSP は UID2 Token を使ってビッドリクエストを行い、ビッドストリームに取り込みます。
8. パブリッシャーは Refresh Token を使用して UID2 Token の更新を要求します。オプトアウトされていれば、Refresh Token にはユーザーのオプトアウトリクエストが含まれます。

#### Publisher Integration

インテグレーションシナリオ、トークン管理、その他の詳細については、[Publisher Integration Guides](/api-ja/v2/guides/README.md)を参照してください。また、[Endpoints](/api-ja/v2/endpoints/README.md)も参照してください。

##### Publisher Direct Integration

ユーザーの PII を送信して UID2 を生成したいパブリッシャーは、UID2 Operator API にアクセスする必要があります。

##### Requirements

- UID2 Operator API とインテグレーションして UID2 Token を生成します。
- Refresh Token を管理するか、UID2 が提供する JavaScript Client-Side SDK を使用して Refresh Token を管理します。
- UID2 Token を SSP やその他のインテグレーション組織に送信できるようにします。

##### Publisher Integration Through SSO or Identity Providers

パブリッシャーは、UID2 と相互運用可能な SSO または独立系 ID プロバイダーと協力することを選択できます。プロバイダーは、UID2 インテグレーションを代行することができます。

#### User Trust Workflow

![User Trust Workflow](/images/user_trust_workflow.jpg)

このワークフローは、パブリッシャーまたはパブリッシャー関連の SSO および ID プロバイダーと関わっているユーザー向けです。このワークフローにより、ユーザーは UID2 の作成に同意し、UID2 への同意とプライバシー設定をオプトアウトポータルで管理することができます。

#### User Trust Workflow Overview

1. ユーザーはオプトアウトポータルにアクセスし、すべてのパブリッシャーに対して UID2 をグローバルにオプトアウトすることができます。
2. オプトアウトのリクエストは、UID2 Administrator に送信されます。
3. UID2 Administrator がリクエストを DSP に配布します。
4. UID2 Operator が Refresh Token を使ってパブリッシャーにリクエストを配布します。

## FAQs

### Identity

#### UID2 の保持者は、ソルトローテーションによる UID2 の更新時期をどのように知ることができますか？

UID2 生成リクエストで提供されるメタデータには、UID2 の生成に使用されたソルトバケットが含まれています。ソルトバケットは永続的で、もとになる PII に割り当てられています。指定されたタイムスタンプ以降にローテーションされたソルトバケットを受け取るは、提供された API を使用します。返されたローテーション済みのソルトバケットは、UID2 保持者にどの UID2 をリフレッシュすべきかを知らせます。このワークフローは、通常データプロバイダに適用されます。

#### UID2 Token の保持者は、いつリフレッシュすればよいかをどのように知ることができますか？

UID2 Token は、Refresh Token の一部として自動的にリフレッシュされます。このワークフローは、通常、パブリッシャーと SSO に適用されます。

### UID2 Token を扱う企業は、どの復号鍵を適用すべきかをどのように知ることができますか？

UID2 Token と共に提供されるメタデータは、暗号化のタイムスタンプを開示し、どの復号鍵が適用されるかを知らせます。

### User Trust

#### ユーザーは、自分の UID2 に関連付けられたターゲティング広告をオプトアウトできますか？

はい。オプトアウトポータル (別名 [Transparency and Control Portal](https://transparentadvertising.org)) を通じて、ユーザーは自分の UID2 に関連するターゲティング広告の配信を拒否することができます。このリクエストは、UID2 Administrator および UID2 Operator を通じて、関連するメンバー全員に配布されます。パブリッシャーやサービスプロバイダーの中には、ユーザーの UID2 参加状況に基づいて自社製品へのアクセスを制限するオプションを持っているところもあり、このことをユーザーとの価値交換対話の一環として伝えるのはパブリッシャーの責任となります。

#### ユーザーは、オプトアウトポータルにアクセスする場所をどのように知ることができますか？

パブリッシャー、SSO、または同意管理プラットフォームは、ログイン/同意フロー、プライバシーポリシー、およびその他の手段で、オプトアウトポータルへのリンクを開示します。

#### 広告主/データプロバイダがオプトアウトフィードとのインテグレーションを必要としない理由は何ですか？

オプトアウトは、ターゲティング広告のオプトアウトに関連しており、パブリッシャーと DSP のオプトアウトワークフローで処理されます。消費者が特定の広告主との関わりを断ちたい場合は、広告主に直接連絡する必要があります。

## License

All work and artifacts are licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.txt).
