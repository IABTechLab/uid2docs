---
title: UID2 Glossary
description: UID2 に関する用語の定義。
hide_table_of_contents: false
sidebar_position: 10
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import MdxJumpAnchor from '@site/src/components/MdxJumpAnchor';

# Unified ID 2.0 Glossary
<p>このページでは、UID2のドキュメントで使用されるいくつかの重要な用語を定義しています。</p>

<!-- 
**A**
<a href="#gl-advertising-id">Advertising ID</a> | 
<a href="#gl-advertising-token">Advertising token</a> | 
<a href="#gl-aks">AKS</a> |
<a href="#gl-api-key">API key</a> | 
<a href="#gl-api-secret">API secret</a> | 
<a href="#gl-app-name">App name</a> | 
<a href="#gl-authorization-header">Authorization header</a> 

**B**
<a href="#gl-bearer-token">Bearer token</a> | 
<a href="#gl-bidstream">Bidstream</a> 

**C**

<a href="#gl-client-key">Client key</a> | 
<a href="#gl-client-keypair">Client keypair</a> | 
<a href="#gl-client-secret">Client secret</a> | 
<a href="#gl-client-server">Client-server integration</a> | 
<a href="#gl-client-side">Client-side integration</a> | 
<a href="#gl-closed-operator">Closed Operator</a> | 
<a href="#gl-confidential-computing">Confidential Computing (GCP)</a> | 
<a href="#gl-confidential-containers">Confidential containers (Azure)</a> | 
<a href="#gl-confidential-space">Confidential Space (GCP)</a> | 
<a href="#gl-core-service">Core Service</a> 

**D**
<a href="#gl-data-provider">Data provider</a> | 
<a href="#gl-demand-side-platform">Demand-side platform</a> | 
<a href="#gl-dii">Directly identifying information (DII)</a> | 
<a href="#gl-docker">Docker</a> 

**E**
<a href="#gl-enclave">Enclave</a> 
<a href="#gl-encryption-key">Encryption key</a> 
<a href="#gl-euid-framework">EUID framework</a>

**F**
<a href="#gl-first-level-hash">First-level hash</a> 

**G**
<a href="#gl-gdpr">GDPR</a>

**H**
<a href="#gl-hash">Hash</a> 

**I**
<a href="#gl-identity">Identity</a> | 
<a href="#gl-integration-approaches">Integration approaches</a> 

**J**
<a href="#gl-json-web-token">JSON Web Token (JWT)</a> 

**K**
<a href="#gl-key">Key</a> 

**N**
<a href="#gl-normalize">Normalize</a> 

**O**
<a href="#gl-oidc">OpenID Connect (OIDC)</a> | 
<a href="#gl-opaque">Opaque</a> | 
<a href="#gl-open-operator">Open Operator</a> | 
<a href="#gl-operator">Operator</a> | 
<a href="#gl-operator-key">Operator key</a> | 
<a href="#gl-operator-service">Operator Service</a> | 
<a href="#gl-opt-out">Opt-out</a> | 
<a href="#gl-opt-out-service">Opt-Out Service</a> 

**P**
<a href="#gl-participant">Participant</a> | 
<a href="#gl-private-operator">Private Operator</a> | 
<a href="#gl-private-operator-service">Private Operator Service</a> | 
<a href="#gl-public-key">Public key</a> | 
<a href="#gl-public-operator">Public Operator</a> 

**R**
<a href="#gl-raw-uid2">Raw UID2</a> | 
<a href="#gl-refresh-token">Refresh token</a> 

**S**
<a href="#gl-salt">Salt</a> | 
<a href="#gl-salted-hash">Salted hash</a> | 
<a href="#gl-secret">Secret</a> | 
<a href="#gl-secure-signals">Secure Signals</a> | 
<a href="#gl-server-side">Server-side integration</a> | 
<a href="#gl-sha-256">SHA-256</a> | 
<a href="#gl-sharing">Sharing (in UID2)</a> | 
<a href="#gl-sharing-participant">Sharing participant</a> | 
<a href="#gl-sso">Single sign-on (SSO)</a> | 
<a href="#gl-subscription-id">Subscription ID</a> 

**T**
<a href="#gl-tokenized-refresh">Token refresh</a> | 
<a href="#gl-tokenized-sharing">Tokenized sharing</a> | 
<a href="#gl-transparency-and-control-portal">Transparency and Control Portal</a> 

**U** 
<a href="#gl-uid">UID</a> |
<a href="#gl-uid2-framework">UID2 framework</a> | 
<a href="#gl-uid2-identifier">UID2 identifier</a> | 
<a href="#gl-uid2-portal">UID2 Portal</a> | 
<a href="#gl-uid2-service">UID2 Service</a> | 
<a href="#gl-uid2-token">UID2 Token (Advertising Token)</a> | 
<a href="#gl-unified-id-20">Unified ID 2.0</a> | 
<a href="#gl-utc">UTC</a>
 -->

### A
<dl>

<dt><MdxJumpAnchor id="gl-advertising-id">Advertising ID</MdxJumpAnchor></dt>
<dd>Advertising ID は <a href="#gl-raw-uid2">raw UID2 の別名です。</a>.</dd>

<dt><MdxJumpAnchor id="gl-advertising-token">Advertising token</MdxJumpAnchor></dt>
<dd>Advertising token は <a href="#gl-uid2-token">UID2 token の別名です。</a>.</dd>

<dt><MdxJumpAnchor id="gl-aks"><a href="#gl-aks">AKS</a></MdxJumpAnchor></dt>
<dd>AKS は Azure Kubernetes Service の略です。詳細は、[Azure Kubernetes Service (AKS) とは?](https://learn.microsoft.com/ja-jp/azure/aks/what-is-aks) (Microsoft documentation) を参照してください。</dd>
<dd>機密コンテナ上で AKS クラスターを実行するために、Microsoft は、Microsoft Azure コンテナインスタンス上の仮想ノードで実行するソリューションを提供しています。詳細は、[Virtual nodes on Azure Container Instances](https://learn.microsoft.com/ja-jp/azure/container-instances/container-instances-virtual-nodes) (Microsoft documentation) を参照してください。</dd>
<dd>UID2 のコンテキストでは、AKS は <a href="#gl-private-operator">Private Operator</a> をホストするためのサポートされるセキュアコンピューティング環境の1つです。</dd>
<dd>詳細は、<a href="../guides/operator-guide-aks-enclave">UID2 Private Operator for AKS Integration Guide</a> を参照してください。</dd>
<!-- <dd>**new**</dd> -->

<dt><MdxJumpAnchor id="gl-api-key">API key</MdxJumpAnchor></dt>
<dd>UID2 <a href="../overviews/participants-overview">参加者</a> はそれぞれ、API Key (Client Key) と、そのキーに関連付けられた <a href="#gl-client-secret">Client Secret</a> (APIシークレット) と呼ばれる秘密の値を持っています。Client Secretは、参加者と UID Service だけが知っています。</dd>
<dd>詳細は <a href="../getting-started/gs-credentials">UID2 Credentials</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-api-secret">API secret</MdxJumpAnchor></dt>
<dd><a href="#gl-client-secret">client secret</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-app-name">App name</MdxJumpAnchor></dt>
<dd>モバイル実装の文脈では、アプリ名は、Android　application ID、iOS app store ID、または iOS  bundle identifier のグループ用語です。</dd>

<dt><MdxJumpAnchor id="gl-authorization-header">Authorization header</MdxJumpAnchor></dt>
<dd>Authorization header は、UID2 Service に対してクライアントを認証する方法です。</dd>
<dd>詳細は、HTTP 仕様の RFC 9110 <a href="https://www.rfc-editor.org/rfc/rfc9110.html#field.authorization">11.6.2. Authorization</a> を参照してください。</dd>

</dl>

### B

<dl>

<dt><MdxJumpAnchor id="gl-bearer-token">Bearer token</MdxJumpAnchor></dt>
<dd>Bearer token はクライアントを識別する特別な文字列です。認証のために、いくつかのUID2 エンドポイントはリクエストの Authorization header で <a href="#gl-client-key">client key</a> を Beare token として指定する必要があります。たとえば、<a href="../endpoints/post-token-generate">POST&nbsp;/token/generate</a> です。</dd>

<dt><MdxJumpAnchor id="gl-bidstream"><a href="#gl-bidstream">Bidstream</a></MdxJumpAnchor></dt>
<dd>広告スポットに広告を配置するためのリクエスト (ビッドリクエスト) を行うために、パブリッシャーは異なる情報を送信します。広告主が入札するために、通常は広告交換または DSP を介して、広告主が入札するための異なる情報を送信します。入札データの流れは、ビッドストリームです。</dd>
<dd>ビッドストリームデータは、パブリッシャーから他のエンティティ (パブリッシャーの構成によって異なります) に送信され、パブリッシャーに戻ります。</dd>

</dl>

### C

<dl>

<dt><MdxJumpAnchor id="gl-client-key">Client key</MdxJumpAnchor></dt>
<dd><a href="#gl-api-key">API key</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-client-keypair"><a href="#gl-client-keypair">Client keypair</a></MdxJumpAnchor></dt>
<dd>Client-Side のパブリッシャーインテグレ＾ションの場合、アカウントを一意に識別するためにパブリッシャーに発行される2つの値は、<a href="#gl-subscription-id">Subscription ID</a> と <a href="#gl-public-key">public key</a> です。Client keypair とは、この2つの値をまとめて呼ぶ用語です。</dd>
<dd>詳細は　<a href="../getting-started/gs-credentials#subscription-id-and-public-key">Subscription ID and Public Key</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-client-secret">Client secret</MdxJumpAnchor></dt>
<dd>各 UID2 <a href="../overviews/participants-overview#uid2-external-participants#uid2-external-participants">参加者</a>は、API Key (Client Key) と、そのキーに関連付けられた秘密値 (Client secret (API シークレット)) を持っています。Client secretは、参加者と UID2 Service だけが知っています。</dd>
<dd>詳細は、<a href="../getting-started/gs-credentials">UID2 Credentials</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-client-server"><a href="#gl-client-server">Client-server integration</a></MdxJumpAnchor></dt>
<dd>UID2の <a href="#gl-integration-approaches">インテグレーションアプローチ</a> の1つは、Client-Side と Server-Side の両方でインテグレーションする方法です (Client-Server)。</dd>
<dd>たとえば、パブリッシャーの Client-Server インテグレーションでは、UID2 Token は Server-Side で生成され、Client-Side でリフレッシュされます。</dd>
<dd>パブリッシャーの Client-Server インテグレーションに関するドキュメントの例: <a href="../guides/integration-prebid-client-server">UID2 Client-Server Integration Guide for Prebid.js</a>, <a href="../guides/integration-javascript-client-server">Client-Server Integration Guide for JavaScript</a>, <a href="../guides/integration-mobile-client-server">UID2 Client-Server Integration Guide for Mobile</a>.</dd>

<dt><MdxJumpAnchor id="gl-client-side"><a href="#gl-client-side">Client-side integration</a></MdxJumpAnchor></dt>
<dd>UID2の <a href="#gl-integration-approaches">インテグレーションアプローチ</a> の1つは、完全に Client-Side でインテグレーションする方法です。</dd>
<dd>Client-Side インテグレーションでは、UID2 Token はクライアントサイドで生成およびリフレッシュされます。</dd>
<dd>たとえば、広告主は、トラッキングピクセルのために Client-Side で UID2 Token を生成し、パブリッシャーは、ビッドストリームのために Client-Side で UID2 Token を生成し、トークンをリフレッシュします。</dd>
<dd>パブリッシャーの Client-Side インテグレーションに関するドキュメントの例:: <a href="../guides/integration-prebid-client-side">UID2 Client-Side Integration Guide for Prebid.js</a>, <a href="../guides/integration-javascript-client-side">Client-Side Integration Guide for JavaScript</a>, <a href="../guides/integration-mobile-client-side">UID2 Client-Side Integration Guide for Mobile</a>.</dd>

<dt><MdxJumpAnchor id="gl-closed-operator">Closed Operator</MdxJumpAnchor></dt>
<dd>Closed Operator は <a href="#gl-private-operator">Private Operator</a> の別名です。</dd>

<dt><MdxJumpAnchor id="gl-confidential-computing"><a href="#gl-confidential-computing">Confidential Computing (GCP)</a></MdxJumpAnchor></dt>
<dd>Google Cloud Platform (GCP) の機密コンピューティングオプションの1つである Confidential Computing は、UID2 <a href="#gl-private-operator">Private Operator</a> のホスティングをサポートしています。</dd>
<dd>詳細は <a href="#gl-confidential-space">Confidential Space</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-confidential-containers"><a href="#gl-confidential-containers">Confidential containers (Azure)</a></MdxJumpAnchor></dt>
<dd>Confidential Containers は、Microsoft Azure のセキュアな機密コンピューティングオプションの名称です。各 Confidential Containers の実装は、データ整合性、データ機密性、コード整合性などの本質的な機能を提供する、ハードウェアで保護された Trusted Execution Environment(TEE) で実行されます。</dd>
<dd>UID2 のコンテキストでは、AzureのConfidential Containersは、<a href="#gl-private-operator">Private Operator</a> をホストするためのサポートされるセキュアコンピューティング環境の1つです。</dd>
<dd>詳細は <a href="../guides/operator-guide-azure-enclave">UID2 Private Operator for Azure Integration Guide</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-confidential-space"><a href="#gl-confidential-space">Confidential Space (GCP)</a></MdxJumpAnchor></dt>
<dd>Confidential Space は、Google Cloud Platform(GCP) のConfidential Computing オプションの1つです。Confidential Space は、Trusted Execution Environment(TEE) として知られるセキュアエンクレーブ環境を提供します。</dd>
<dd>UID2 のコンテキストでは、GCP Confidential Space は、<a href="#gl-private-operator">Private Operator</a> をホストするためのサポートされるセキュアコンピューティング環境の1つです。</dd>
<dd>詳細は <a href="../guides/operator-private-gcp-confidential-space">UID2 Private Operator for GCP Integration Guide</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-core-service">Core Service</MdxJumpAnchor></dt>
<dd>UID2 Core Serviceは、UID2 エコシステムの 秘密の <a href="#gl-salt">ソルト</a>、暗号化キー、その他の関連データへのアクセスを管理する一元的なサービスです。</dd>
<dd>すべてのUID2 Service の概要については、<a href="../overviews/participants-overview#uid2-component-services">UID2 Component Services</a> を参照してください。</dd>

</dl>

### D

<dl>

<dt><MdxJumpAnchor id="gl-data-provider">Data provider</MdxJumpAnchor></dt>
<dd>UID2 のコンテキストでは、データプロバイダーは、データパートナー、測定パートナー、オフライン測定プロバイダーなど、広告に関連するデータおよび測定サービスを提供する事業社を指します。</dd>
<dd>詳細は <a href="../overviews/participants-overview#uid2-external-participants">participant</a> (Data Providers) を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-demand-side-platform">Demand-side platform (DSP)</MdxJumpAnchor></dt>
<dd>デマンドサイドプラットフォーム (DSP)は、広告主、ブランド、メディアエージェンシーなど、デジタル広告を購入したい企業にサービスを提供するプラットフォームです。</dd>

<dt><MdxJumpAnchor id="gl-dii">Directly Identifying Information (DII)</MdxJumpAnchor></dt>
<dd>直接識別情報 (directly identifying information, DII) とは、氏名、メールアドレス、電話番号など、個人を直接識別する情報のことです。</dd>
<dd>UID2 はメールアドレスと電話番号をサポートし、DII をターゲットを絞った広告の目的で使用できる値に変換しますが、元の値に遡ることはできません。</dd>

<dt><MdxJumpAnchor id="gl-docker">Docker</MdxJumpAnchor></dt>
<dd>Docker は Platform as a Service (PaaS)製品群で、コンテナと呼ばれるパッケージを介してソフトウェアのデプロイを自動化するために使用します。Docker 製品群は、アプリケーションを、そのすべての依存関係とともに、ほとんどのオペレーティングシステム上で実行可能な仮想コンテナにパッケージ化できるため、アプリケーションをさまざまな環境で効率的に動作させることができます。</dd>
<dd>詳細は <a href="https://www.docker.com">https://www.docker.com</a> を参照してください。</dd>

</dl>

### E

<dl>

<dt><MdxJumpAnchor id="gl-enclave">Enclave</MdxJumpAnchor></dt>
<dd>Enclave は、コンピューティング環境のセキュアなサブセクションです。エンクレーブには追加のビジネスロジックとセキュリティ対策が施され、改ざんできないようになっています。</dd>
<dd>UID2 のコンテキストでは、<a href="#gl-private-operator">Private Operator</a> はエンクレーブ内で実行されなければなりません。サポートされるエンクレーブバージョンの概要については、*UID2 Private Operator Integration Overview* の <a href="../guides/integration-options-private-operator#hosting-options-for-private-operators">Hosting Options for Private Operators</a> を参照してください。</dd>
<dd>Enclave では、オペレータイメージは特殊で、事前に定義されたバージョンでなければならず、セキュリティを確保するために追加の制約が適用されます。</dd>

<dt><MdxJumpAnchor id="gl-encryption-key"><a href="#gl-encryption-key">Encryption key</a></MdxJumpAnchor></dt>
<dd>各 <a href="#gl-uid2-token">UID2 Token</a> は、リクエストしたパブリッシャーに固有の暗号化キーを使用して暗号化されます。このキーはパブリッシャーを識別し、トークンを復号化するために必要です。これにより、UID2 Token を不正な個人が復号化できないようになります。</dd>

<dt><MdxJumpAnchor id="gl-environment"><a href="#gl-environment">Environment</a></MdxJumpAnchor></dt>
<dd>UID2 は、インテグレーション環境と本番環境の2つの環境を提供しています。</dd>
<dd>両方を使用する場合は、それぞれの環境に対して別々の資格情報を取得する必要があります。</dd>
<dd>詳細は、[Environments](../getting-started/gs-environments.md) を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-euid-framework"><a href="#gl-euid-framework">EUID framework</a></MdxJumpAnchor></dt>
<dd>European Unified ID (EUID) フレームワークは、広告エコシステム全体の多くの参加者に対し、オープンインターネット上の広告機会に対する決定論的な ID を提供します。これにより、パブリッシャーウェブサイト、モバイルアプリ、Connected TV (CTV) アプリがプログラマティックワークフローを通じて収益化できます。独自の名前空間を持つオープンソースのスタンドアロンソリューションとして構築されたフレームワークは、参加者が地域の要件を満たすのに役立つプライバシーコントロールを提供します。</dd>
<dd>EUID は、フランス、イタリア、スペインなどのヨーロッパ諸国、アイスランドなどの非ヨーロッパ諸国、アゾレス諸島、マルティニーク、イギリスなどのその他の地域を含むヨーロッパ地域で運用されています。これは、EU プライバシー法の遵守を念頭に置いて設計されています。</dd>
<dd>UID2 と EUID の間には多くの類似点がありますが、両者は完全に別物であり、トークンに互換性はありません。</dd>
<dd>詳細は <a href="https://euid.eu/docs/intro">European Unified ID Overview</a> を参照してください。</dd>

</dl>

### F

<dl>

<dt><MdxJumpAnchor id="gl-first-level-hash">First-level hash</MdxJumpAnchor></dt>
<dd>UID2 のコンテキストでは、First-level hash は匿名化された不透明で安全な値であり、そこから <a href="#gl-raw-uid2">raw UID2</a>、<a href="#gl-uid2-token">UID2 Token</a>、<a href="#gl-refresh-token">Refresh Token</a>が生成されます。ソルティングやハッシュを含むいくつかの暗号関数が、メールアドレスや電話番号などの初期値に適用され、First-level hash が生成されます。</dd>

</dl>

### G

<dl>

<dt><MdxJumpAnchor id="gl-gdpr"><a href="#gl-gdpr">GDPR</a></MdxJumpAnchor></dt>
<dd>GDPR (一般データ保護規則) は、ヨーロッパ連合 (EU) の居住者に関連するデータを対象とするか収集する方法を規制するヨーロッパのプライバシーおよびセキュリティに関する法律です。</dd>

</dl>

### H

<dl>
<dt><MdxJumpAnchor id="gl-hash">Hash</MdxJumpAnchor></dt>
<dd>ハッシュ関数は、様々な/任意のサイズのデータセットを固定サイズのデータセットに変換します。ハッシュ関数の結果は、ハッシュ、ダイジェスト、またはハッシュ値と呼ばれます。</dd>
<dd>ハッシュは一方向性関数です。同じ入力値をハッシュ化すると、常に同じ出力値が得られますが、出力値を受け取って入力値に到達する対応する関数は存在しません。ハッシュはセキュリティ対策です。</dd>
<dd>UID2 は <a href="#gl-sha-256">SHA-256</a> ハッシュアルゴリズムを使用しています。</dd>

</dl>

### I

<dl>

<dt><MdxJumpAnchor id="gl-identity">Identity</MdxJumpAnchor></dt>
<dd>UID2 のコンテキストでは、「ID」という用語は、UID2 Token、Refresh Token、およびタイムスタンプなどの関連値を含む値のパッケージを指します。この値のセットは、<a href="../endpoints/post-token-generate">POST&nbsp;/token/generate</a> エンドポイントおよび <a href="../endpoints/post-token-refresh">POST&nbsp;/token/refresh</a> エンドポイントからのレスポンスで返されます。</dd>

<dt><MdxJumpAnchor id="gl-integration-approaches"><a href="#gl-integration-approaches">Integration approaches</a></MdxJumpAnchor></dt>
<dd>UID2 インテグレーションは、<a href="#gl-client-side">Client-Side</a>、<a href="#gl-server-side">Server-Side</a>、または部分的に Client-Side と部分的に Server-Side (<a href="#gl-client-server">Client-Server</a>) で行うことができます。</dd>

</dl>

### J

<dl>

<dt><MdxJumpAnchor id="gl-json-web-token">JSON Web Token (JWT)</MdxJumpAnchor></dt>
<dd>JSON Web Token (JWT) は、Web 上で一方の当事者から別の当事者に送信されるクレーム (情報) を表す、コンパクトで URL セーフな手段です。JWT 内のクレームは、JSON Web Signature (JWS) 構造のペイロードまたは JSON Web Encryption (JWE) 構造のプレーン テキストとして使用される JSON オブジェクトとしてエンコードされます。これにより、クレームにデジタル署名や暗号化を行うことができます。</dd>

</dl>

### K

<dl>

<dt><MdxJumpAnchor id="gl-key"><a href="#gl-key">Key</a></MdxJumpAnchor></dt>
<dd><a href="#gl-encryption-key">Encryption key</a> を参照してください。</dd>

</dl>

### N

<dl>

<dt><MdxJumpAnchor id="gl-normalize">Normalize</MdxJumpAnchor></dt>
<dd>データセットを Normalize (正規化)するとは、それを標準的な状態 (Condition) や状態 (State)にすることを意味します。</dd>
<dd>UID2 には特定の正規化規則があります。詳細は、<a href="../getting-started/gs-normalization-encoding#email-address-normalization">Email Address Normalization</a> と <a href="../getting-started/gs-normalization-encoding#phone-number-normalization">Phone Number Normalization</a> を参照してください。</dd>

</dl>

### O

<dl>

<dt><MdxJumpAnchor id="gl-oidc"><a href="#gl-oidc">OpenID Connect (OIDC)</a> </MdxJumpAnchor></dt>
<dd>OpebID Connect (OIDC) は、OAuth 2.0 プロトコルの上に構築された ID レイヤーで、クライアントが認可サーバーによる認証に基づいてエンドユーザーの ID を検証できるようにします。</dd>
<dd>詳細は、[OpenID Connect Basic Client Implementer's Guide 1.0 - draft 40](https://openid.net/specs/openid-connect-basic-1_0.html) (specification) を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-opaque"><a href="#gl-opaque">Opaque</a></MdxJumpAnchor></dt>
<dd>UID2 Token が不透明な文字列であるというのは、トークンが計算される方法やそのフォーマットが UID2 参加者に伝えられず、変更される可能性があるためです。文字列のフォーマットや長さ、その他の側面については、何も前提を立てるべきではありません。</dd>

<dt><MdxJumpAnchor id="gl-open-operator"><a href="#gl-open-operator">Open Operator</a></MdxJumpAnchor></dt>
<dd>Open Operator は、<a href="#gl-public-operator">Public Operator</a> の別名です。</dd>

<dt><MdxJumpAnchor id="gl-operator">Operator</MdxJumpAnchor></dt>
<dd>Operator とは、UID2の  <a href="#gl-operator-service">Operator Service</a> を運営する組織や団体のことです。UID2 Operatorは、UID2 エコシステムの API サーバーです。</dd>
<dd>Operators は、UID2 Core Service から <a href="#gl-encryption-key">暗号化キー</a> と秘密の <a href="#gl-salt">ソルト</a> を受け取り、個人に関するデータ (<Link href="#gl-dii">DII</Link>) をソルト化およびハッシュ化して raw UID2 を返し、raw UID2 を暗号化して UID2 Token を生成生成するなど、複数の機能を実行します。</dd>
<dd>参加者は、UID2 API にアクセスし、プライベートインフラ内で raw UID2 と UID2 Token を生成するために、<a href="#gl-private-operator">Private Operator</a> になることも選択できます。</dd>
<dd>詳細は <a href="../overviews/participants-overview">participants</a> と <a href="../ref-info/ref-operators-public-private">The UID2 Operator</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-operator-key">Operator key</MdxJumpAnchor></dt>
<dd>各 UID2 Private Operator は、Private Operator Service が Core Service とOpt-Out Service に接続し、その上でいくつかのエンドポイントを呼び出すことを可能にする Operator key を持っています。</dd>
<dd>Operator key は、UID2 Service への参加オペレータを識別すします。</dd>

<dt><MdxJumpAnchor id="gl-operator-service">Operator Service</MdxJumpAnchor></dt>
<dd><a href="#gl-operator">Operator</a> のすべての機能を可能にするサービスです</dd>
<dd>すべての UID2 Service の概要については、<a href="../overviews/participants-overview#uid2-component-services">UID2 Component Services</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-opt-out">Opt-Out</MdxJumpAnchor></dt>
<dd>UID2 エコシステムに参加しているエンドユーザーは、<a href="https://www.transparentadvertising.com/">Transparency and Control Portal</a> にアクセスすることで、いつでもオプトアウトすることができます。</dd>
<dd>UID2 の Opt-out のワークフローと、ユーザーが Opt-out する方法の詳細は、<a href="../getting-started/gs-opt-out">User Opt-Out</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-opt-out-service">Opt-Out Service</MdxJumpAnchor></dt>
<dd>Opt-Out Service は、ユーザーのオプトアウト要求を管理・保存するグローバルな UID2 Service です。</dd>
<dd>すべての UID2 Service の概要については、<a href="../overviews/participants-overview#uid2-component-services">UID2 Component Services</a> を参照してください。</dd>

</dl>

### P

<dl>

<dt><MdxJumpAnchor id="gl-participant">Participant</MdxJumpAnchor></dt>
<dd>UID2 において重要な役割を果たすエンティティです。参加者には以下が含まれます: Core Administrator、Operator、DSP、データプロバイダー、広告主、パブリッシャー、消費者。</dd>
<dd>詳細は、<a href="../overviews/participants-overview">参加者</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-private-operator">Private Operator</MdxJumpAnchor></dt>
<dd>Private <a href="#gl-operator">operator</a> は、Operator Service のプライベートインスタンスを実行する事業社です。Private Operator は、安全な環境で独自のリソース (ハードウェアなど) を使用して、自身のために UID2 を生成および管理します。</dd>
<dd>詳細は <a href="../ref-info/ref-operators-public-private">The UID2 Operator</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-private-operator-service">Private Operator Service</MdxJumpAnchor></dt>
<dd><a href="#gl-private-operator">Private Operator</a> が運用する Operator Service のインスタンスです。</dd>

<dt><MdxJumpAnchor id="gl-public-key">Public key</MdxJumpAnchor></dt>
<dd>Client-Side のパブリッシャーインテグレーションでは、パブリッシャーに発行される2つの値のうちの1つがアカウントを一意に識別する公開鍵です。詳細は <a href="../getting-started/gs-credentials#subscription-id-and-public-key">Subscription ID and Public Key</a> を参照してください。</dd>
<dd>UID2 のインテグレーションでは、この値はしばしば <b>serverPublicKey</b> として表されます。たとえば、<a href="../guides/integration-prebid-client-side">UID2 Client-Side Integration Guide for Prebid.js</a>、<a href="../guides/integration-javascript-client-side">Client-Side Integration Guide for JavaScript</a>、<a href="../guides/integration-mobile-client-side">UID2 Client-Side Integration Guide for Mobile</a> など。</dd>

<dt><MdxJumpAnchor id="gl-public-operator">Public Operator</MdxJumpAnchor></dt>
<dd>Public <a href="#gl-operator">Operator</a> は、UID2 Operator Service のパブリックインスタンスを実行する組織です。たとえば、The Trade Desk は現在、UID2 フレームワークの Public Operator として機能しており、すべての参加者が利用できます。</dd>
<dd>詳細は <a href="../ref-info/ref-operators-public-private">The UID2 Operator</a> を参照してください。</dd>

</dl>

### R

<dl>

<dt><MdxJumpAnchor id="gl-raw-uid2">Raw UID2</MdxJumpAnchor></dt>
<dd>UID2 API または SDK を通じて、ユーザーの <a href="#gl-dii">directly identifying information</a> (メールアドレスまたは電話番号) を入力として作成される、暗号化されていない英数字の識別子。raw UID2 を暗号化して UID2 Token を作成します。raw UID2 は一意な値であり、同じ UID2 は2つとありません。raw  UID2 とそれに関連付けられた UID2 Token は、大文字と小文字を区別します。</dd>
<dd>詳細は <a href="uid-identifier-types">UID2 Identifier Types</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-refresh-token">Refresh Token</MdxJumpAnchor></dt>
<dd>Refresh tokenは、<a href="#gl-uid2-token">UID2 Token</a>とともに発行される不透明な文字列です。<a href="#gl-uid2-token">UID2 token</a> の有効期限を更新するために使用されます。</dd>
<dd>UID2 Server は、新しい UID2 Token のリクエストとともに Refresh Token を受け取ると、ユーザーの Opt-Out をチェックします。ユーザーが UID2 を Opt-Out している場合、新しい UID2 Token は生成されません。</dd>
<dd>新しい UID2 Token が生成されて返されると、新しい Refresh Token も一緒に返されます。ただし、ユーザーが長期間活動していない場合は、Refresh Token は期限切れとなります。</dd>
<dd>詳細は、<a href="ref-tokens">UID2 Tokens and Refresh Tokens</a> を参照してください。</dd>
</dl>

### S

<dl>

<dt><MdxJumpAnchor id="gl-salt">Salt</MdxJumpAnchor></dt>
<dd>メールアドレスや電話番号を、それ自体では元の値 (raw UID2 や UID2 Token) を追跡できない安全で不透明な値に変換するプロセスで使用されます。ソルト値は秘密にされます。</dd>
<dd>UID2 Service は、ハッシュ化および暗号化とともに、プロセスの一部としてソルト(Salt) を使用し、元の値を保護します。ソルトは、ハッシュ化の前に入力値に加えられます。</dd>

<dt><MdxJumpAnchor id="gl-salt-bucket"><a href="#gl-salt-bucket">Salt bucket</a></MdxJumpAnchor></dt>
<dd>ソルトバケットは、raw UID2 や UID2 Token を生成するために使用される秘密の <a href="#gl-salt">salt</a> の値を長期間管理するために使用されます。各バケットには、約1年間有効な現在のソルト値が含まれており、新しい値にローテーションされる前に更新されます。バケットは互いに独立して更新できます。</dd>
<dd>ソルトバケットは、100万以上あり、各メールアドレスまたは電話番号は、特定のバケットに決定論的に割り当てられます。ただし、この割り当ては永続的ではなく、バケットの現在のソルトが新しい値にローテーションされると変更される可能性があります。</dd>

<dt><MdxJumpAnchor id="gl-salt-bucket-id"><a href="#gl-salt-bucket-id">Salt bucket ID</a></MdxJumpAnchor></dt>
<dd>ソルトバケット ID は、特定の <a href="#gl-salt-bucket">ソルトバケット</a> を識別する一意の文字列です。ソルトバケット ID を使用すると、最近、ソルト値が更新されたソルトバケットを確認し、どのメールアドレスまたは電話番号が raw UID2 値を再生成する必要があるかを確認できます。</dd>
<dd>ソルトバケット ID の例については、`POST /identity/buckets` エンドポイントのレスポンスを参照してください: <a href="../endpoints/post-identity-buckets#decrypted-json-response-format">Decrypted JSON Response Format</a>。</dd>

<dt><MdxJumpAnchor id="gl-salted-hash">Salted hash</MdxJumpAnchor></dt>
<dd><a href="#gl-hash">hash</a> 関数を適用する前に入力文字列に <a href="#gl-salt">salt</a> 値を追加すると、結果はソルトハッシュとなります。入力値がハッシュ化される前にソルト化されると、ハッシュを持つ攻撃者は、同じ出力に到達するために多くの可能な入力を試して入力値を決定することができなくなります。</dd>

<dt><MdxJumpAnchor id="gl-secret">Secret</MdxJumpAnchor></dt>
<dd><a href="#gl-client-secret">client secret</a> を参照してください</dd>

<dt><MdxJumpAnchor id="gl-secure-signals">Secure signals</MdxJumpAnchor></dt>
<dd>Google Ad Managerの機能。セキュアシグナル機能 (旧称: Encrypted Signals for Publishers、略称: ESP)により、パブリッシャーは信頼できるサードパーティのバイイングパートナーとシグナルを安全に共有することができます。パブリッシャーは、<a href="https://admanager.google.com/home/">Google Ad Manager</a> と <a href="https://support.google.com/admanager/answer/6321605?hl=en">Google Ad Manager Ad Exchange (AdX)</a> を介して、Googleが承認した入札者に「暗号化された」ユーザーIDを渡すことができます。</dd>
<dd>詳細は、<a href="https://blog.google/products/admanager/new-ways-for-publishers-to-manage-first-party-data/">Share secure signals with your trusted partners</a> (2番目のセクション) と <a href="https://support.google.com/admanager/answer/10488752?hl=en">Share secure signals with bidders</a> (いずれもGoogle) を参照してください。</dd>
<dd>Google Secure signals の UID2 サポートの詳細は、<a href="../guides/integration-google-ss">Google Ad Manager Secure Signals Integration Guide</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-server-side"><a href="#gl-server-side">Server-side integration</a></MdxJumpAnchor></dt>
<dd>UID2 の <a href="#gl-integration-approaches">インテグレーションアプローチ</a> の一つは、完全に Server-Side でインテグレーションすることです。</dd>
<dd>Server-Side インテグレーションでは、raw YUD2 または UID2 Token がサーバーサイドで生成およびリフレッシュされます。</dd>
<dd>たとえば、Server-Side インテグレーションでは、広告主は、広告ターゲティングのために Server-Side で raw UID2 を生成し、パブリッシャーは、ビッドストリームのために Server-Side で UID2 Token を生成し、リフレッシュします。</dd>
<dd>パブリッシャーサーバーサイドのインテグレーションに関するドキュメントの例は、<a href="../guides/integration-publisher-server-side">Publisher Integration Guide, Server-Side</a> です。</dd>

<dt><MdxJumpAnchor id="gl-sha-256">SHA-256</MdxJumpAnchor></dt>
<dd>SHA-256 (SHA256 とも呼ばれます) は、UID2 が使用する安全なハッシュアルゴリズムです。</dd>
<dd>SHA-256 は、米国国立標準技術研究所 (NIST) と国家安全保障局 (NSA) が SHA-1 の後継として開発した SHA-2 アルゴリズムファミリーの一部です。各アルゴリズムは出力のビット数によって名前が付けられており、SHA-256 は 256 ビットです。</dd>
<dd>詳細は <a href="https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf">https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf</a> (specification) を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-sharing"><a href="#gl-sharing">Sharing (in UID2)</a></MdxJumpAnchor></dt>
<dd>UID2 のコンテキストでは、Sharing は、<a href="#gl-raw-uid2">raw UID2</a> を直接または <a href="#gl-uid2-token">UID2 Token</a> に暗号化して、1つの UID2 <a href="#gl-sharing-participant">sharing participant</a> から別の共有者に配布するプロセスです。</dd>
<dd>詳細は <a href="../getting-started/gs-sharing">UID2 Sharing</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-sharing-participant">Sharing participant</MdxJumpAnchor></dt>
<dd>For UID2, a sharing participant is a company that either has agreed to comply with the UID2 Participation Policy or fits within one of the <a href="../getting-started/gs-sharing#exceptions">exceptions</a>, and that takes part in <a href="#gl-sharing">sharing</a>, either as a sender or a receiver.</dd>
<dd>For details, see <a href="../getting-started/gs-sharing">UID2 Sharing</a>.</dd>

<dt><MdxJumpAnchor id="gl-sso">Single sign-on (SSO)</MdxJumpAnchor></dt>
<dd>SSO はシングルサインオンの略語です。SSO は、ユーザーがアプリやウェブサイトなどの複数のソフトウェアシステムの 1 つに、同じ認証情報(通常は ID とパスワードですが、必ずしもそうではありません) でログインすることを可能にします。SSO によって、ユーザーは 1 セットの認証情報を使って複数のアプリケーションやサイトに一度だけログインすることができます。SSO によって、ウェブサイトやアプリは独自の認証システムを維持する必要がなくなります。</dd>

<dt><MdxJumpAnchor id="gl-sso-abbrev"><a href="#gl-sso-abbrev">SSO</a></MdxJumpAnchor></dt>
<dd><a href="#gl-sso">Single sign-on (SSO)</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-subscription-id">Subscription ID</MdxJumpAnchor></dt>
<dd>Client-Side のパブリッシャーインテグレーションでは、パブリッシャーに発行される2つの値のうちの1つがアカウントを一意に識別する公開鍵です。d詳細は <a href="../getting-started/gs-credentials#subscription-id-and-public-key">Subscription ID and Public Key</a> を参照してください。</dd>

</dl>

### T

<dl>

<dt><MdxJumpAnchor id="gl-token-refresh"><a href="#gl-token-refresh">Token refresh</a></MdxJumpAnchor></dt>
<dd>UID2 の参加者が UID2 Token をリクエストすると、トークンは UID2 Token と Refresh Token を含む一連の関連値とともに返されます。Refresh Token が有効期限切れになるまで、パブリッシャーは DII を送信することなく新しい UID2 Token をリクエストするために Refresh Token を使用できます。</dd>
<dd>UID2 Token をリクエストする UID2 参加者は、トークンの有効性を維持するためのプロセスを持っている必要があります: リフレッシュ期間を監視し、Refresh Token が期限切れになる前に新しい UID2 Token をリクエストするか、毎回新しい UID2 Token をリクエストするか、DII を送信する必要があります。</dd>
<dd>ほとんどの場合、トークンの更新は、SDK または Prebid.js の実装戦略など、他の実装戦略によって管理されます。</dd>
<dd>Refresh Token が期限切れになった場合、パブリッシャーは DII を送信して UID2 Token を再リクエストする必要があります。</dd>
<dd>詳細は、<a href="ref-tokens">UID2 Tokens and Refresh Tokens</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-tokenized-sharing">Tokenized sharing</MdxJumpAnchor></dt>
<dd>Tokenized sharing とは <a href="#gl-dii">DII</a> または <a href="#gl-raw-uid2">Raw UID2</a> を <a href="#gl-uid2-token">UID2 Token</a> に暗号化し、許可された受信者とトークンを共有することです。UID2 Token を使用することで、データの送信者と受信者の間で、未承認の関係者をデータが通過する場合も含めて、raw UID2 をエンドツーエンドで保護することができます。Tokenized sharing は、ビッドストリームまたはピクセル経由での共有に必要ですが、どのような共有ユースケースでも使用できます。</dd>
<dd>詳細は <a href="../sharing/sharing-tokenized-overview">Tokenized Sharing Overview</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-transparency-and-control-portal">Transparency and Control Portal</MdxJumpAnchor></dt>
<dd>UID2 Transparency and Control Portalは、ユーザー向けのウェブサイト <a href="https://www.transparentadvertising.com/">https://www.transparentadvertising.com/</a> で、消費者はいつでもここから UID2 の Opt-Out を選択することができます。</dd>

</dl>

### U

<dl>

<dt><MdxJumpAnchor id="gl-uid"><a href="#gl-uid">UID</a></MdxJumpAnchor></dt>
<dd>UIDは、<a href="#gl-uid2-framework">UID2</a> と <a href="#gl-euid">EUID</a> の両方を包含するために使われる一般的な用語です。</dd>
<dd>Server-Side SDK など、UID2 と EUID の両方をサポートするコードコンポーネントがあるため、UID という用語は包括的な用語として使用されています。</dd>
<dd>UID2 と EUID の間には多くの類似点がありますが、両者は完全に別物であり、トークンに互換性はありません。</dd>

<dt><MdxJumpAnchor id="gl-uid2-framework"><a href="#gl-uid2-framework">UID2 framework</a></MdxJumpAnchor></dt>
<dd>Unified ID 2.0 (UID2) フレームワークは、広告エコシステム全体の多くの <a href="../overviews/participants-overview">参加者</a> に対して、オープンインターネット上の広告機会に対する決定論的な ID を提供します。これにより、パブリッシャーウェブサイト、モバイルアプリ、Connected TV (CTV) アプリがプログラマティックワークフローを通じて収益化できます。独自の名前空間を持つオープンソースのスタンドアロンソリューションとして構築されたフレームワークは、参加者が地域の要件を満たすのに役立つプライバシーコントロールを提供します。</dd>
<dd>UID2 は北米、アジアの一部、およびその他の地域で運営されています。</dd>
<dd> UID2とEUIDの間には多くの類似点がありますが、両者は完全に別物であり、トークンに互換性はありません。</dd>

<dt><MdxJumpAnchor id="gl-uid2-identifier">UID2 identifier</MdxJumpAnchor></dt>
<dd>Unified ID 2.0 (UID2)識別子には、<a href="#gl-raw-uid2">raw UID2s</a> と <a href="#gl-uid2-token">UID2 tokens</a> (Advertising token とも呼ばれるます) の2種類があります。</dd>
<dd>詳細は <a href="uid-identifier-types">UID2 Identifier Types</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-uid2-portal">UID2 Portal</MdxJumpAnchor></dt>
<dd>UID2 Portal は、UID2 参加者が自分のアカウントを管理するための独立したユーザーインターフェースです。</dd>
<dd>詳細は <a href="../portal/portal-overview">UID2 Portal: Overview</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-uid2-service"><a href="#gl-uid2-service">UID2 Service</a></MdxJumpAnchor></dt>
<dd>Unified ID 2.0 (UID2) service とは、<a href="#gl-uid2-framework">UID2 framework</a> を実装し、関連する UID2 機能へのアクセスをクライアントに提供する、コンポーネント、API エンドポイント、およびその他の種類のソリューションの集合です。</dd>
<dd>"UID2 service" という用語は、UID2 の<a href="#gl-operator-service">Operator Service</a> という意味でも使われます。</dd>

<dt><MdxJumpAnchor id="gl-uid2-token">UID2 Token (Advertising Token)</MdxJumpAnchor></dt>
<dd>Unified ID 2.0 (UID2)Token は Advertising Token とも呼ばれ、<a href="#gl-raw-uid2">raw UID2</a> を暗号化したものです。</dd>
<dd>UID2 Token は、ハッシュ化された、またはハッシュ化されていないメールアドレスや電話番号から生成され、raw UID2 に変換された後、暗号化されます。UID2 Token は一意な値であり、同じ UID2 TOken は2つとありません。UID2 Token は大文字と小文字を区別します。</dd>
<dd>トークンの値は不透明です。文字列のフォーマットや長さについて、推測してはなりません。</dd>
<dd>トークンの寿命は限られていますが、<a href="#gl-refresh-token">refresh token</a> を使ってバックグラウンドでリフレッシュすることができます。</dd>
<dd>パブリッシャーは、ビッドストリームに UID2 Token を送信します。</dd>
<dd>詳細は <a href="uid-identifier-types">UID2 Identifier Types</a>、 <a href="ref-tokens#uid2-tokens-key-information">UID2 Tokens: Key Information</a> と <a href="ref-how-uid-is-created">How the UID2 Token Is Created</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-unified-id-20">Unified ID 2.0 (UID2)</MdxJumpAnchor></dt>
<dd>"UID2" という用語は、<a href="#gl-uid2-framework">UID2 framework</a>、<a href="#gl-uid2-service">UID2 service</a>、<a href="#gl-raw-uid2">raw UID2</a>、または<a href="#gl-uid2-token">UID2 token</a> (Advertising Token) を意味でも使われます。</dd>

<dt><MdxJumpAnchor id="gl-unix-time"><a href="#gl-unix-time">Unix time</a></MdxJumpAnchor></dt>
<dd>Unix time (エポックタイム) は、1970年1月1日木曜日の00:00:00 <a href="#gl-utc">UTC</a>　からの経過秒数として定義されています。Unix time は、UID2 の一部のレスポンスメッセージで使用され、ミリ秒で表されます。たとえば、`POST /token/refresh` エンドポイントのレスポンス (<a href="../endpoints/post-token-refresh#successful-response-with-tokens">Successful Response With Tokens</a> を参照) においてです。</dd>
<dd>例: 2024年1月1日午前9時00分00秒 GMT は、Unix time で `1704067200` と表されます。ミリ秒で表すと、`1704067200000` です。</dd>

<dt><MdxJumpAnchor id="gl-utc">UTC</MdxJumpAnchor></dt>
<dd>UTC は協定世界時 (Coordinated Universal Time) の略称で、ズールー時間 (Zulu time) とも呼ばれ、一般に使用されている主要な時間基準です。UTC は基本的にグリニッジ標準時 (GMT) に相当しますが、科学的により正確です。</dd>

</dl>
