---
title: UID2 Glossary
description: UID2 に関する用語の定義。
hide_table_of_contents: false
sidebar_position: 10
---

import MdxJumpAnchor from '@site/src/components/MdxJumpAnchor';

# Unified ID 2.0 Glossary
<p>This page defines some key terms used in the UID2 documentation.</p>

<!-- <table>
<thead>
<tr align= "center">
<th></th>
<th></th>
<th></th>
<th></th>
</tr>
</thead>
<tbody>
<tr align= "left">
<td>
<ul>
<li><a href="#gl-advertising-id">Advertising ID</a></li>
<li><a href="#gl-advertising-token">Advertising token</a></li>
<li><a href="#gl-api-key">API key</a></li>
<li><a href="#gl-api-secret">API secret</a></li>
<li><a href="#gl-authorization-header">Authorization header</a></li>
<li><a href="#gl-bearer-token">Bearer token</a></li>
<li><a href="#gl-client-key">Client key</a></li>
<li><a href="#gl-client-secret">Client secret</a></li>
<li><a href="#gl-closed-operator">Closed Operator</a></li>
<li><a href="#gl-core-service">Core Service</a></li>
<li><a href="#gl-data-provider">Data provider</a></li>
<li><a href="#gl-demand-side-platform">Demand-side platform</a></li>
<li><a href="#gl-dii">Directly identifying information (DII)</a></li>
<li><a href="#gl-docker">Docker</a></li>
<li><a href="#gl-docker-build">Docker Build</a></li>

</ul>
</td>
<td>
<ul>
<li><a href="#gl-enclave">Enclave</a></li>
<li><a href="#gl-first-level-hash">First-level hash</a></li>
<li><a href="#gl-hash">Hash</a></li>
<li><a href="#gl-identity">Identity</a></li>
</ul>
</td>
<td>
<ul>
<li><a href="#gl-json-web-token">JSON Web Token (JWT)</a></li>
<li><a href="#gl-normalize">Normalize</a></li>
<li><a href="#gl-open-operator">Open operator</a></li>
<li><a href="#gl-operator">Operator</a></li>
<li><a href="#gl-operator-key">Operator key</a></li>
<li><a href="#gl-operator-service">Operator Service</a></li>
<li><a href="#gl-opt-out">Opt-out</a></li>
<li><a href="#gl-opt-out-service">Opt-Out Service</a></li>
<li><a href="#gl-participant">Participant</a></li>
<li><a href="#gl-private-operator">Private Operator</a></li>
<li><a href="#gl-private-operator-service">Private Operator Service</a></li>
<li><a href="#gl-public-key">Public key</a></li>
<li><a href="#gl-public-operator">Public Operator</a></li>
<li><a href="#gl-raw-uid2">Raw UID2</a></li>
<li><a href="#gl-refresh-token">Refresh token</a></li>

</ul>
</td>
<td>
<ul>
<li><a href="#gl-salt">Salt</a></li>
<li><a href="#gl-salted-hash">Salted hash</a></li>
<li><a href="#gl-secret">Secret</a></li>
<li><a href="#gl-secure-signals">Secure Signals</a></li>
<li><a href="#gl-sha-256">SHA-256</a></li>
<li><a href="#gl-sharing">Sharing (in UID2)</a></li>
<li><a href="#gl-sharing-participant">Sharing Participant</a></li>
<li><a href="#gl-sso">Single sign-on (SSO)</a></li>
<li><a href="#gl-subscription-id">Subscription ID</a></li>
<li><a href="#gl-transparency-and-control-portal">Transparency and Control Portal</a></li>
<li><a href="#gl-uid2-framework">UID2 framework</a></li>
<li><a href="#gl-uid2-identifier">UID2 identifier</a></li>
<li><a href="#gl-uid2-portal">UID2 Portal</a></li>
<li><a href="#gl-uid2-service">UID2 Service</a></li>
<li><a href="#gl-uid2-token">UID2 Token (Advertising Token)</a></li>
<li><a href="#gl-unified-id-20">Unified ID 2.0</a></li>
<li><a href="#gl-utc">UTC</a></li>
</ul>
</td>
</tr>
</tbody>
</table>  -->

### A
<dl>

<dt><MdxJumpAnchor id="gl-advertising-id">Advertising ID</MdxJumpAnchor></dt>
<dd>Advertising ID は <a href="#gl-raw-uid2">raw UID2 の別名です。</a>.</dd>

<dt><MdxJumpAnchor id="gl-advertising-token">Advertising token</MdxJumpAnchor></dt>
<dd>Advertising token は <a href="#gl-uid2-token">UID2 token の別名です。</a>.</dd>

<dt><MdxJumpAnchor id="gl-api-key">API key</MdxJumpAnchor></dt>
<dd>UID2 <a href="/docs/intro#participants">参加者</a> はそれぞれ、API Key (クライアントキー) と、そのキーに関連付けられた Client Secret (APIシークレット) と呼ばれる秘密の値を持っています。Client Secretは、参加者と UID Service だけが知っています。</dd>
<dd>詳細は <a href="/docs/getting-started/gs-credentials">UID2 Credentials</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-api-secret">API secret</MdxJumpAnchor></dt>
<dd><a href="#gl-client-secret">client secret</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-authorization-header">Authorization header</MdxJumpAnchor></dt>
<dd>Authorization header は、UID2 Service に対してクライアントを認証する方法です。</dd>
<dd>詳細については、HTTP 仕様の RFC 9110 <a href="https://www.rfc-editor.org/rfc/rfc9110.html#field.authorization">11.6.2. Authorization</a> を参照してください。</dd>

</dl>

### B

<dl>

<dt><MdxJumpAnchor id="gl-bearer-token">Bearer token</MdxJumpAnchor></dt>
<dd>Bearer token はクライアントを識別する特別な文字列です。認証のために、いくつかのUID2 エンドポイントはリクエストの Authorization header で <a href="#gl-client-key">client key</a> を Beare token として指定する必要があります。例えば、<a href="../endpoints/post-token-generate">POST&nbsp;/token/generate</a> です。</dd>

</dl>

### C

<dl>

<dt><MdxJumpAnchor id="gl-client-key">Client key</MdxJumpAnchor></dt>
<dd><a href="#gl-api-key">API key</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-client-secret">Client secret</MdxJumpAnchor></dt>
<dd>各 UID2 <a href="/docs/intro#participants">参加者</a>は、API Key (クライアントキー) と、そのキーに関連付けられた秘密値 (Client secret (API シークレット)) を持っています。Client secretは、参加者と UID2 Service だけが知っています。</dd>
<dd>詳細については、<a href="/docs/getting-started/gs-credentials">UID2 Credentials</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-closed-operator">Closed Operator</MdxJumpAnchor></dt>
<dd>Closed Operator は <a href="#gl-private-operator">Private Operator</a> の別名です。</dd>

<dt><MdxJumpAnchor id="gl-core-service">Core Service</MdxJumpAnchor></dt>
<dd>UID2 Core Serviceは、UID2 エコシステムの <a href="#gl-salt">salts</a>、暗号化キー、その他の関連データへのアクセスを管理する一元的なサービスです。</dd>
<dd>すべてのUID2 Service の概要については、<a href="/docs/intro#components">Components</a> を参照してください。</dd>

</dl>

### D

<dl>

<dt><MdxJumpAnchor id="gl-data-provider">Data provider</MdxJumpAnchor></dt>
<dd>UID2 のコンテキストでは、データプロバイダーは、データパートナー、測定パートナー、オフライン測定プロバイダーなど、広告に関連するデータおよび測定サービスを提供する事業社を指します。</dd>
<dd>詳細は <a href="/docs/intro#participants">participant</a> (Data Providers) を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-demand-side-platform">Demand-side platform (DSP)</MdxJumpAnchor></dt>
<dd>デマンドサイドプラットフォーム (DSP)は、広告主、ブランド、メディアエージェンシーなど、デジタル広告を購入したい企業にサービスを提供するプラットフォームです。</dd>

<dt><MdxJumpAnchor id="gl-dii">Directly Identifying Information (DII)</MdxJumpAnchor></dt>
<dd>直接識別情報 (directly identifying information, DII) とは、氏名、メールアドレス、電話番号など、個人を直接識別する情報のことです。</dd>
<dd>UID2 はメールアドレスと電話番号をサポートし、DII をターゲットを絞った広告の目的で使用できる値に変換しますが、元の値に遡ることはできません。</dd>

<dt><MdxJumpAnchor id="gl-docker">Docker</MdxJumpAnchor></dt>
<dd>Docker は Platform as a Service (PaaS)製品群で、コンテナと呼ばれるパッケージを介してソフトウェアのデプロイを自動化するために使用します。Docker 製品群は、アプリケーションを、そのすべての依存関係とともに、ほとんどのオペレーティング・システム上で実行可能な仮想コンテナにパッケージ化できるため、アプリケーションをさまざまな環境で効率的に動作させることができます。</dd>
<dd>詳細は、<a href="https://www.docker.com">https://www.docker.com</a> を参照してください。</dd>

</dl>

### E

<dl>

<dt><MdxJumpAnchor id="gl-enclave">Enclave</MdxJumpAnchor></dt>
<dd>Enclave は、コンピューティング環境のセキュアなサブセクションです。エンクレーブには追加のビジネスロジックとセキュリティ対策が施され、改ざんできないようになっています。</dd>
<dd>ID2 のコンテキストでは、 <a href="#gl-private-operator">Private Operator</a> は、Enclave 内かプライベート環境で運用しなければなりません。must run inside an enclave or in a private environment. サポートされるエングレーブのバージョンについては、<a href="../guides/summary-guides#private-operator-service-integrations">Private Operator Service Integrations</a> を参照してください。</dd>
<dd>Enclave では、オペレータイメージは特殊で、事前に定義されたバージョンでなければならず、セキュリティを確保するために追加の制約が適用されます。</dd>

</dl>

### F

<dl>

<dt><MdxJumpAnchor id="gl-first-level-hash">First-level hash</MdxJumpAnchor></dt>
<dd>UID2 のコンテキストでは、First-level hash は匿名化された不透明で安全な値であり、そこから <a href="#gl-raw-uid2">raw UID2</a>、<a href="#gl-uid2-token">UID2 Token</a>、<a href="#gl-refresh-token">Refresh Token</a>が生成されます。ソルティングやハッシュを含むいくつかの暗号関数が、メールアドレスや電話番号などの初期値に適用され、First-level hash が生成されます。</dd>

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

</dl>

### J

<dl>

<dt><MdxJumpAnchor id="gl-json-web-token">JSON Web Token (JWT)</MdxJumpAnchor></dt>
<dd>JSON Web Token (JWT) は、Web 上で一方の当事者から別の当事者に送信されるクレーム (情報) を表す、コンパクトで URL セーフな手段です。JWT 内のクレームは、JSON Web Signature (JWS) 構造のペイロードまたは JSON Web Encryption (JWE) 構造のプレーン テキストとして使用される JSON オブジェクトとしてエンコードされます。これにより、クレームにデジタル署名や暗号化を行うことができます。</dd>

</dl>

### N

<dl>

<dt><MdxJumpAnchor id="gl-normalize">Normalize</MdxJumpAnchor></dt>
<dd>データセットを Normalize (正規化)するとは、それを標準的な状態 (Condition) や状態 (State)にすることを意味します。</dd>
<dd>UID2 には特定の正規化規則があります。詳細については、<a href="../getting-started/gs-normalization-encoding#email-address-normalization">Email Address Normalization</a> と <a href="../getting-started/gs-normalization-encoding#phone-number-normalization">Phone Number Normalization</a> を参照してください。</dd>

</dl>

### O

<dl>

<dt><MdxJumpAnchor id="gl-open-operator">Open Operator</MdxJumpAnchor></dt>
<dd>Open Operator は、<a href="#gl-public-operator">Public Operator</a> の別名です。</dd>

<dt><MdxJumpAnchor id="gl-operator">Operator</MdxJumpAnchor></dt>
<dd>Operator とは、UID2の  <a href="#gl-operator-service">Operator Service</a> を運営する組織や団体のことです。UID2 Operatorは、UID2 エコシステムの API サーバーです。</dd>
<dd>Operator は、UID2 Core Service から暗号化キーとソルトを受け取り、個人のデータをソルティングおよびハッシュ化して raw UID2 を返し、raw UID2 を暗号化して UID2 Token を生成するなど、複数の機能を実行します。</dd>
<dd>参加者は、UID2 API にアクセスし、プライベートインフラ内で raw UID2 と UID2 Token を生成するために、<a href="#gl-private-operator">Private Operator</a> になることも選択できます。</dd>
<dd>詳細は、<a href="../intro#participants">participants</a> と <a href="../ref-info/ref-operators-public-private">The UID2 Operator</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-operator-key">Operator key</MdxJumpAnchor></dt>
<dd>各 UID2 Private Operator は、Private Operator Service が Core Service とOpt-Out Service に接続し、その上でいくつかのエンドポイントを呼び出すことを可能にする Operator key を持っています。</dd>
<dd>Operator key は、UID2 Service への参加オペレータを識別すします。</dd>

<dt><MdxJumpAnchor id="gl-operator-service">Operator Service</MdxJumpAnchor></dt>
<dd><a href="#gl-operator">Operator</a> のすべての機能を可能にするサービスです</dd>
<dd>すべての UID2 Service の概要については、<a href="../intro#components">Components</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-opt-out">Opt-Out</MdxJumpAnchor></dt>
<dd>UID2 エコシステムに参加しているエンドユーザーは、<a href="https://www.transparentadvertising.com/">Transparency and Control Portal</a> にアクセスすることで、いつでもオプトアウトすることができます。</dd>
<dd>詳細は、<a href="../intro#components">Components</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-opt-out-service">Opt-Out Service</MdxJumpAnchor></dt>
<dd>Opt-Out Service は、ユーザーのオプトアウト要求を管理・保存するグローバルな UID2 Service です。</dd>
<dd>すべての UID2 Service の概要については、<a href="../intro#components">Components</a> を参照してください。</dd>

</dl>

### P

<dl>

<dt><MdxJumpAnchor id="gl-participant">Participant</MdxJumpAnchor></dt>
<dd>UID2 において重要な役割を果たすエンティティです。参加者には以下が含まれます: Core Administrator、Operator、DSP、データプロバイダー、広告主、パブリッシャー、消費者。</dd>
<dd>詳細については、<a href="../intro#participants">参加者</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-private-operator">Private Operator</MdxJumpAnchor></dt>
<dd>Private <a href="#gl-operator">operator</a> は、Operator Service のプライベートインスタンスを実行する事業社です。Private Operator は、安全な環境で独自のリソース (ハードウェアなど) を使用して、自身のために UID2 を生成および管理します。</dd>
<dd>詳細は、<a href="../ref-info/ref-operators-public-private">The UID2 Operator</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-private-operator-service">Private Operator Service</MdxJumpAnchor></dt>
<dd><a href="#gl-private-operator">Private Operator</a> が運用する Operator Service のインスタンスです。</dd>

<dt><MdxJumpAnchor id="gl-public-key">Public key</MdxJumpAnchor></dt>
<dd>Server-Side のパブリッシャーインテグレーションでは、Public Key はパブリッシャーに UID2 クレデンシャルとして発行される 2 つの値のうちの 1 つです。詳細は <a href="../getting-started/gs-credentials#subscription-id-and-public-key">Subscription ID and Public Key</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-public-operator">Public Operator</MdxJumpAnchor></dt>
<dd>Public <a href="#gl-operator">Operator</a> は、UID2 Operator Service のパブリックインスタンスを実行する組織です。たとえば、The Trade Desk は現在、UID2 フレームワークの Public Operator として機能しており、すべての参加者が利用できます。</dd>
<dd>詳細は、<a href="../ref-info/ref-operators-public-private">The UID2 Operator</a> を参照してください。</dd>

</dl>

### R

<dl>

<dt><MdxJumpAnchor id="gl-raw-uid2">Raw UID2</MdxJumpAnchor></dt>
<dd>UID2 API または SDK を通じて、ユーザーの <a href="#gl-dii">directly identifying information</a> (メールアドレスまたは電話番号) を入力として作成される、暗号化されていない英数字の識別子。raw UID2 を暗号化して UID2 Token を作成します。raw UID2 は一意な値であり、同じ UID2 は2つとありません。raw  UID2 とそれに関連付けられた UID2 Token は、大文字と小文字を区別します。</dd>
<dd>詳細は、<a href="../intro#uid2-identifier-types">UID2 Identifier Types</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-refresh-token">Refresh Token</MdxJumpAnchor></dt>
<dd>Refresh tokenは、<a href="#gl-uid2-token">UID2 Token</a>とともに発行される不透明な文字列です。<a href="#gl-uid2-token">UID2 token</a> の有効期限を更新するために使用されます。</dd>
<dd>UID2 Server は、新しい UID2 Token のリクエストとともに Refresh Token を受け取ると、ユーザーの Opt-Out をチェックします。ユーザーが UID2 を Opt-Out している場合、新しい UID2 Token は生成されません。</dd>
<dd>新しい UID2 Token が生成されて返されると、新しい Refresh Token も一緒に返されます。ただし、ユーザーが長期間活動していない場合は、Refresh Token は期限切れとなります。</dd>
</dl>

### S

<dl>

<dt><MdxJumpAnchor id="gl-salt">Salt</MdxJumpAnchor></dt>
<dd>メールアドレスや電話番号を、それ自体では元の値を追跡できない安全で不透明な値に変換するプロセスで使用されます。</dd>
<dd>UID2 Service は、ハッシュ化および暗号化とともに、プロセスの一部としてソルト(Salt) を使用し、元の値を保護します。ソルトは、ハッシュ化の前に入力値に加えられます。</dd>

<dt><MdxJumpAnchor id="gl-salted-hash">Salted hash</MdxJumpAnchor></dt>
<dd><a href="#gl-hash">hash</a> 関数を適用する前に入力文字列に <a href="#gl-salt">salt</a> 値を追加すると、結果はソルトハッシュとなります。入力値がハッシュ化される前にソルト化されると、ハッシュを持つ攻撃者は、同じ出力に到達するために多くの可能な入力を試して入力値を決定することができなくなります。</dd>

<dt><MdxJumpAnchor id="gl-secret">Secret</MdxJumpAnchor></dt>
<dd><a href="#gl-client-secret">client secret</a> を参照してください</dd>

<dt><MdxJumpAnchor id="gl-secure-signals">Secure signals</MdxJumpAnchor></dt>
<dd>Google Ad Managerの機能。セキュアシグナル機能 (旧称: Encrypted Signals for Publishers、略称: ESP)により、パブリッシャーは信頼できるサードパーティのバイイングパートナーとシグナルを安全に共有することができます。パブリッシャーは、<a href="https://admanager.google.com/home/">Google Ad Manager</a> と <a href="https://support.google.com/admanager/answer/6321605?hl=en">Google Ad Manager Ad Exchange (AdX)</a> を介して、Googleが承認した入札者に「暗号化された」ユーザーIDを渡すことができます。</dd>
<dd>詳しくは、<a href="https://blog.google/products/admanager/new-ways-for-publishers-to-manage-first-party-data/">Share secure signals with your trusted partners</a> (2番目のセクション) と <a href="https://support.google.com/admanager/answer/10488752?hl=en">Share secure signals with bidders</a> (いずれもGoogle) を参照してください。</dd>
<dd>Google Secure signals の UID2 サポートの詳細については、<a href="../guides/google-ss-integration">Google Ad Manager Secure Signals Integration Guide</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-sha-256">SHA-256</MdxJumpAnchor></dt>
<dd>SHA-256 は、UID2 が使用する安全なハッシュアルゴリズムです。</dd>
<dd>SHA-256 は、米国国立標準技術研究所 (NIST) と国家安全保障局 (NSA) が SHA-1 の後継として開発した SHA-2 アルゴリズムファミリーの一部です。各アルゴリズムは出力のビット数によって名前が付けられており、SHA-256 は 256 ビットです。</dd>
<dd>詳細は、 <a href="https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf">https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf</a> (specification) を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-sharing">Sharing</MdxJumpAnchor></dt>
<dd>UID2 のコンテキストでは、Sharing は、<a href="#gl-raw-uid2">Raw UID2</a> を UID2 参加者間で安全に配布するためのプロセスです。未加工の UID2 を不正アクセスから保護するために、発信側の参加者(送信者)は未加工の UID2 を UID2 Token に暗号化してから送信しなければなりません。送信先の参加者(受信者)は、UID2 Token を内部で使用する Raw UID2 に復号化する必要があります。</dd>
<dd>For details, see <a href="../sharing/sharing-overview">UID2 Sharing: Overview</a>.</dd>

<dt><MdxJumpAnchor id="gl-sharing-participant">Sharing Participant</MdxJumpAnchor></dt>
<dd>UID2 では、Sharing Participant とは、UID2 参加者間で <a href="#gl-raw-uid2">Raw UID2</a> を安全に配布する<a href="#gl-sharing">Sharing</a> 参加する企業のことです。Sharing Participant は、パブリッシャー、広告主、DSP、データプロバイダのいずれかである場合もあれば、複数の役割を持つ場合もあります。</dd>
<dd>詳細は、<a href="../sharing/sharing-overview">UID2 Sharing: Overview</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-sso">Single sign-on (SSO)</MdxJumpAnchor></dt>
<dd>SSO はシングルサインオンの略語です。SSO は、ユーザーがアプリやウェブサイトなどの複数のソフトウェアシステムの 1 つに、同じ認証情報(通常は ID とパスワードですが、必ずしもそうではありません) でログインすることを可能にします。SSO によって、ユーザーは 1 セットの認証情報を使って複数のアプリケーションやサイトに一度だけログインすることができます。SSO によって、ウェブサイトやアプリは独自の認証システムを維持する必要がなくなります。</dd>

<dt><MdxJumpAnchor id="gl-subscription-id">Subscription ID</MdxJumpAnchor></dt>
<dd>Server-Side のパブリッシャーインテグレーションでは、Subscription ID はパブリッシャーに UID2 クレデンシャルとして発行される 2 つの値のうちの1つです。詳細は、<a href="../getting-started/gs-credentials#subscription-id-and-public-key">Subscription ID and Public Key</a> を参照してください。</dd>

</dl>

### T

<dl>

<dt><MdxJumpAnchor id="gl-transparency-and-control-portal">Transparency and Control Portal</MdxJumpAnchor></dt>
<dd>UID2 Transparency and Control Portalは、ユーザー向けのウェブサイト <a href="https://www.transparentadvertising.com/">https://www.transparentadvertising.com/</a> で、消費者はいつでもここから UID2 の Opt-Out を選択することができます。</dd>

</dl>

### U

<dl>

<dt><MdxJumpAnchor id="gl-uid2-framework">UID2 framework</MdxJumpAnchor></dt>
<dd>Unified ID 2.0 (UID2)framework は、広告エコシステム全体の多くの参加者 (<a href="../intro#participants">participants</a>)に対し、オープンなインターネット上での広告機会のための決定論的IDを可能にします。パブリッシャーのウェブサイト、モバイルアプリ、コネクテッドTV (CTV)アプリからのログイン体験を可能にし、プログラマティックワークフローによる収益化を実現します。独自の名前空間を持つオープンソースのスタンドアローン・ソリューションとして構築されたこのフレームワークは、透明性とプライバシーを重視しています。</dd>

<dt><MdxJumpAnchor id="gl-uid2-identifier">UID2 identifier</MdxJumpAnchor></dt>
<dd>Unified ID 2.0 (UID2)識別子には、<a href="#gl-raw-uid2">raw UID2s</a> と <a href="#gl-uid2-token">UID2 tokens</a> (Advertising token とも呼ばれるます) の2種類があります。</dd>
<dd>詳細は、<a href="../intro#uid2-identifier-types">UID2 Identifier Types</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-uid2-portal">UID2 Portal</MdxJumpAnchor></dt>
<dd>UID2 Portal は、UID2 参加者が自分のアカウントを管理するための独立したユーザーインターフェースです。</dd>
<dd>詳細は、<a href="../portal/portal-overview">UID2 Portal: Overview</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-uid2-service">UID2 Service</MdxJumpAnchor></dt>
<dd>Unified ID 2.0 (UID2)Service は、<a href="#gl-uid2-framework">UID2 framework</a> をまとめて実装し、関連する UID2 機能へのアクセスをクライアントに提供するコンポーネント、API エンドポイント、その他のタイプのソリューションのあつまりです。</dd>
<dd>"UID2 service" という用語は、UID2 <a href="#gl-operator-service">Operator Service</a> という意味でも使われます。</dd>

<dt><MdxJumpAnchor id="gl-uid2-token">UID2 Token (Advertising Token)</MdxJumpAnchor></dt>
<dd>Unified ID 2.0 (UID2)Token は Advertising Token とも呼ばれ、<a href="#gl-raw-uid2">raw UID2</a> を暗号化したものです。</dd>
<dd>UID2 Token は、ハッシュ化された、またはハッシュ化されていないメールアドレスや電話番号から生成され、raw UID2 に変換された後、暗号化されます。UID2 Token は一意な値であり、同じ UID2 TOken は2つとありません。UID2 Token は大文字と小文字を区別します。</dd>
<dd>トークンの寿命は限られていますが、<a href="#gl-refresh-token">refresh token</a> を使ってバックグラウンドでリフレッシュすることができます。</dd>
<dd>パブリッシャーは、ビッドストリームに UID2 Token を送信します。</dd>
<dd>詳細は、<a href="../intro#uid2-identifier-types">UID2 Identifier Types</a> を参照してください。</dd>

<dt><MdxJumpAnchor id="gl-unified-id-20">Unified ID 2.0 (UID2)</MdxJumpAnchor></dt>
<dd>"UID2" という用語は、<a href="#gl-uid2-framework">UID2 framework</a>、<a href="#gl-uid2-service">UID2 service</a>、<a href="#gl-raw-uid2">raw UID2</a>、または<a href="#gl-uid2-token">UID2 token</a> (Advertising Token) を意味でも使われます。</dd>

<dt><MdxJumpAnchor id="gl-utc">UTC</MdxJumpAnchor></dt>
<dd>UTC は協定世界時 (Coordinated Universal Time) の略称で、ズールー時間 (Zulu time) とも呼ばれ、一般に使用されている主要な時間基準です。UTC は基本的にグリニッジ標準時 (GMT) に相当しますが、科学的により正確です。</dd>

</dl>
