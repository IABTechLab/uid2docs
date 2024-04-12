---
title: UID2 Glossary
description: Definitions for some UID2 terms.
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
<li><a href="#gl-open-operator">Open Operator</a></li>
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
<li><a href="#gl-secure-signals">Secure signals</a></li>
<li><a href="#gl-sha-256">SHA-256</a></li>
<li><a href="#gl-sharing">sharing (in UID2)</a></li>
<li><a href="#gl-sharing-participant">sharing participant</a></li>
<li><a href="#gl-sso">Single sign-on (SSO)</a></li>
<li><a href="#gl-subscription-id">Subscription ID</a></li>
<li><a href="#gl-transparency-and-control-portal">Transparency and Control Portal</a></li>
<li><a href="#gl-uid2-framework">UID2 framework</a></li>
<li><a href="#gl-uid2-identifier">UID2 identifier</a></li>
<li><a href="#gl-uid2-portal">UID2 Portal</a></li>
<li><a href="#gl-uid2-service">UID2 service</a></li>
<li><a href="#gl-uid2-token">UID2 token (advertising token)</a></li>
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
<dd>Advertising ID is another term for a <a href="#gl-raw-uid2">raw UID2</a>.</dd>

<dt><MdxJumpAnchor id="gl-advertising-token">Advertising token</MdxJumpAnchor></dt>
<dd>Advertising token is another term for a <a href="#gl-uid2-token">UID2 token</a>.</dd>

<dt><MdxJumpAnchor id="gl-api-key">API key</MdxJumpAnchor></dt>
<dd>Each UID2 <a href="/docs/intro#participants">participant</a> using a server-side implementation has an API key (client key) and also a secret value associated with the key, called the client secret (API secret). The client secret is known only to the participant and the UID2 service.</dd>
<dd>For details, see <a href="/docs/getting-started/gs-credentials">UID2 Credentials</a>.</dd>

<dt><MdxJumpAnchor id="gl-api-secret">API secret</MdxJumpAnchor></dt>
<dd>See <a href="#gl-client-secret">client secret</a>.</dd>

<dt><MdxJumpAnchor id="gl-authorization-header">Authorization header</MdxJumpAnchor></dt>
<dd>The Authorization header is a way to authenticate the client to the UID2 service.</dd>
<dd>For details, see <a href="https://www.rfc-editor.org/rfc/rfc9110.html#field.authorization">11.6.2. Authorization</a> in RFC 9110, the HTTP specification.</dd>

</dl>

### B

<dl>

<dt><MdxJumpAnchor id="gl-bearer-token">Bearer token</MdxJumpAnchor></dt>
<dd>A bearer token is a special string that identifies the client. For authentication, some UID2 endpoints require the <a href="#gl-client-key">client key</a> to be specified as a bearer token in the Authorization header of the request: for example, <a href="../endpoints/post-token-generate">POST&nbsp;/token/generate</a>.</dd>

</dl>

### C

<dl>

<dt><MdxJumpAnchor id="gl-client-key">Client key</MdxJumpAnchor></dt>
<dd>See <a href="#gl-api-key">API key</a>.</dd>

<dt><MdxJumpAnchor id="gl-client-secret">Client secret</MdxJumpAnchor></dt>
<dd>Each UID2 <a href="/docs/intro#participants">participant</a> using a server-side implementation has an API key (client key) and also a secret value associated with the key, called the client secret (API secret). The client secret is known only to the participant and the UID2 service.</dd>
<dd>For details, see <a href="/docs/getting-started/gs-credentials">UID2 Credentials</a>.</dd>

<dt><MdxJumpAnchor id="gl-closed-operator">Closed Operator</MdxJumpAnchor></dt>
<dd>Closed Operator is another term for a <a href="#gl-private-operator">Private Operator</a>.</dd>

<dt><MdxJumpAnchor id="gl-core-service">Core Service</MdxJumpAnchor></dt>
<dd>The UID2 Core Service is a centralized service that manages access to <a href="#gl-salt">salts</a>, encryption keys, and other relevant data in the UID2 ecosystem.</dd>
<dd>For an overview of all the UID2 services, see <a href="/docs/intro#components">Components</a>.</dd>

</dl>

### D

<dl>

<dt><MdxJumpAnchor id="gl-data-provider">Data provider</MdxJumpAnchor></dt>
<dd>In the context of UID2, a data provider is any entity that provides data and measurement services relating to advertising, such as a data partner, measurement partner, or offline measurement provider.</dd>
<dd>For details, see <a href="/docs/intro#participants">participant</a> (Data Providers).</dd>

<dt><MdxJumpAnchor id="gl-demand-side-platform">Demand-side platform (DSP)</MdxJumpAnchor></dt>
<dd>A demand-side platform (DSP) provides services to companies that want to buy digital advertising, such as advertisers, brands, and media agencies.</dd>

<dt><MdxJumpAnchor id="gl-dii">Directly identifying information (DII)</MdxJumpAnchor></dt>
<dd>Directly identifying information, or DII, is information that directly identifies an individual, including name, email address, or phone number.</dd>
<dd>UID2 supports email address and phone number, and translates the DII to a value that can be used for the purpose of targeted advertising but cannot by itself be traced back to the original value.</dd>

<dt><MdxJumpAnchor id="gl-docker">Docker</MdxJumpAnchor></dt>
<dd>Docker is a Platform as a Service (PaaS) suite of products that is used for automating the deployment of software via packages called containers. The set of Docker products allows packaging of an application, with all its dependencies, into a virtual container that can run on most operating systems so that applications can work efficiently in different environments.</dd>
<dd>For details, see <a href="https://www.docker.com">https://www.docker.com</a>.</dd>

</dl>

### E

<dl>

<dt><MdxJumpAnchor id="gl-enclave">Enclave</MdxJumpAnchor></dt>
<dd>An enclave is a secure subsection of a computing environment. The enclave has additional business logic and security measures applied to it, to prevent anyone from tampering with it.</dd>
<dd>In the context of UID2, a <a href="#gl-private-operator">Private Operator</a> must run inside an enclave or in a private environment. For a summary of the enclave versions supported, see <a href="../guides/summary-guides#private-operator-service-integrations">Private Operator Service Integrations</a>.</dd>
<dd>In an enclave, the operator image must be a very specific, predefined version, and additional constraints are applied to ensure security.</dd>

</dl>

### F

<dl>

<dt><MdxJumpAnchor id="gl-first-level-hash">First-level hash</MdxJumpAnchor></dt>
<dd>In the context of UID2, the first-level hash is the anonymized, opaque, secure value from which the <a href="#gl-raw-uid2">raw UID2</a>, <a href="#gl-uid2-token">UID2 token</a>, and <a href="#gl-refresh-token">refresh token</a> are generated. Several cryptographic functions, including salting and hashing, are applied to the initial value, whether an email or a phone number, to create the first-level hash.</dd>

</dl>

### H

<dl>

<dt><MdxJumpAnchor id="gl-hash">Hash</MdxJumpAnchor></dt>
<dd>A hash function converts a set of data of varying/arbitrary size to a set of data of fixed size. The result of the hash function is called a hash, digest, or hash value.</dd>
<dd>Hashing is a one-way function. The same input value, hashed, always yields the same output value, but there is no corresponding function to take the output value and arrive at the input value. Hashing is a security measure.</dd>
<dd>UID2 uses the <a href="#gl-sha-256">SHA-256</a> hashing algorithm.</dd>

</dl>

### I

<dl>

<dt><MdxJumpAnchor id="gl-identity">Identity</MdxJumpAnchor></dt>
<dd>In the context of UID2, the term "identity" refers to a package of values that includes the UID2 token, the refresh token, and associated values such as timestamps. This set of values is returned in the response from the <a href="../endpoints/post-token-generate">POST&nbsp;/token/generate</a> endpoint and also from the <a href="../endpoints/post-token-refresh">POST&nbsp;/token/refresh</a> endpoint.</dd>

</dl>

### J

<dl>

<dt><MdxJumpAnchor id="gl-json-web-token">JSON Web Token (JWT)</MdxJumpAnchor></dt>
<dd>A JSON Web Token (JWT) is a compact, URL-safe means of representing claims (pieces of information) to be sent from one party to another over the web. The claims in a JWT are encoded as a JSON object that is used either as the payload of a JSON Web Signature (JWS) structure or as the plain text of a JSON Web Encryption (JWE) structure. This enables the claims to be digitally signed and/or encrypted.</dd>

</dl>

### N

<dl>

<dt><MdxJumpAnchor id="gl-normalize">Normalize</MdxJumpAnchor></dt>
<dd>To normalize a data set means to bring it to a standard condition or state.</dd>
<dd>UID2 includes specific normalization rules. For details, see <a href="../getting-started/gs-normalization-encoding#email-address-normalization">Email Address Normalization</a> and <a href="../getting-started/gs-normalization-encoding#phone-number-normalization">Phone Number Normalization</a>.</dd>

</dl>

### O

<dl>

<dt><MdxJumpAnchor id="gl-open-operator">Open Operator</MdxJumpAnchor></dt>
<dd>Open Operator is another term for a <a href="#gl-public-operator">Public Operator</a>.</dd>

<dt><MdxJumpAnchor id="gl-operator">Operator</MdxJumpAnchor></dt>
<dd>An Operator is an organization or entity that runs the UID2 <a href="#gl-operator-service">Operator Service</a>. The UID2 Operator is the API server in the UID2 ecosystem.</dd>
<dd>Operators perform multiple functions, such as receiving encryption keys and salts from the UID2 Core Service, salting and hashing personal data to return raw UID2s, and encrypting raw UID2s to generate UID2 tokens.</dd>
<dd>A participant can also choose to become a <a href="#gl-private-operator">Private Operator</a> to access UID2 APIs and to generate raw UID2s and UID2 tokens from within a private infrastructure.</dd>
<dd>For details, see <a href="../intro#participants">participants</a> and <a href="../ref-info/ref-operators-public-private">The UID2 Operator</a>.</dd>

<dt><MdxJumpAnchor id="gl-operator-key">Operator key</MdxJumpAnchor></dt>
<dd>Each UID2 Private Operator has an operator key that allows the private Operator Service to connect to the Core Service and Opt-Out Service and call some endpoints on it.</dd>
<dd>The operator key identifies the participant Operator to the UID2 service.</dd>

<dt><MdxJumpAnchor id="gl-operator-service">Operator Service</MdxJumpAnchor></dt>
<dd>A service that enables all functions of the <a href="#gl-operator">Operator</a>.</dd>
<dd>For an overview of all the UID2 services, see <a href="../intro#components">Components</a>.</dd>

<dt><MdxJumpAnchor id="gl-opt-out">Opt-out</MdxJumpAnchor></dt>
<dd>An end user who participates in the UID2 ecosystem can opt out at any time by going to the <a href="https://www.transparentadvertising.com/">Transparency and Control Portal</a>.</dd>
<dd>For details, see <a href="../intro#components">Components</a>.</dd>

<dt><MdxJumpAnchor id="gl-opt-out-service">Opt-Out Service</MdxJumpAnchor></dt>
<dd>The Opt-Out Service is a global UID2 service that manages and stores user opt-out requests.</dd>
<dd>For an overview of all the UID2 services, see <a href="../intro#components">Components</a>.</dd>

</dl>

### P

<dl>

<dt><MdxJumpAnchor id="gl-participant">Participant</MdxJumpAnchor></dt>
<dd>An entity that fulfils a key role in UID2. Participants include the following: Core Administrator, Operator, DSP, data provider, advertiser, publisher, consumer.</dd>
<dd>For details, see <a href="../intro#participants">participants</a>.</dd>

<dt><MdxJumpAnchor id="gl-private-operator">Private Operator</MdxJumpAnchor></dt>
<dd>A Private <a href="#gl-operator">Operator</a> is an entity that runs a private instance of the Operator Service. The Private Operator generates and manages UID2s for itself, using its own resources (such as hardware) in a secure environment.</dd>
<dd>For details, see <a href="../ref-info/ref-operators-public-private">The UID2 Operator</a>.</dd>

<dt><MdxJumpAnchor id="gl-private-operator-service">Private Operator Service</MdxJumpAnchor></dt>
<dd>A private instance of the Operator Service, run by a <a href="#gl-private-operator">Private Operator</a>.</dd>

<dt><MdxJumpAnchor id="gl-public-key">Public key</MdxJumpAnchor></dt>
<dd>For server-side publisher integrations, the public key is one of the two values issued to publishers as their UID2 credentials. For details, see <a href="../getting-started/gs-credentials#subscription-id-and-public-key">Subscription ID and Public Key</a>.</dd>

<dt><MdxJumpAnchor id="gl-public-operator">Public Operator</MdxJumpAnchor></dt>
<dd>A Public <a href="#gl-operator">Operator</a> is an entity that runs a public instance of the UID2 Operator Service. For example, The Trade Desk currently serves as a Public Operator for the UID2 framework, available to all participants.</dd>
<dd>For details, see <a href="../ref-info/ref-operators-public-private">The UID2 Operator</a>.</dd>

</dl>

### R

<dl>

<dt><MdxJumpAnchor id="gl-raw-uid2">Raw UID2</MdxJumpAnchor></dt>
<dd>An unencrypted alphanumeric identifier created through the UID2 APIs or SDKs with the user's <a href="#gl-dii">directly identifying information</a> (email address or phone number) as input. The raw UID2 is encrypted to create a <a href="#gl-uid2-token">UID2 token</a>. The raw UID2 is a unique value; no two raw UID2s are the same. Raw UID2s, and their associated UID2 tokens, are case sensitive.</dd>
<dd>For details, see <a href="../intro#uid2-identifier-types">UID2 Identifier Types</a>.</dd>

<dt><MdxJumpAnchor id="gl-refresh-token">Refresh token</MdxJumpAnchor></dt>
<dd>A refresh token is an opaque string that is issued along with the <a href="#gl-uid2-token">UID2 token</a>. It is used to refresh the UID2 token, which has a limited life.</dd>
<dd>When the UID2 server receives the refresh token with a request for a new UID2 token, it checks for user opt-out. If the user has opted out of UID2, no new UID2 token is generated.</dd>
<dd>When a new UID2 token is generated and returned, a new refresh token is returned along with it. However, if the user is inactive for a long period of time, the refresh token itself expires.</dd>
</dl>

### S

<dl>

<dt><MdxJumpAnchor id="gl-salt">Salt</MdxJumpAnchor></dt>
<dd>A string of characters that is used in the process of transforming an email address or phone number into a secure, opaque value that cannot by itself be traced back to the original value.</dd>
<dd>The UID2 service uses salt as part of the process, along with hashing and encryption, to secure the original value. Salt is added to the input value before hashing.</dd>

<dt><MdxJumpAnchor id="gl-salted-hash">Salted hash</MdxJumpAnchor></dt>
<dd>When a <a href="#gl-salt">salt</a> value is added to the input string before applying the <a href="#gl-hash">hash</a> function, the result is a salted hash. When the input value is salted before hashing, an attacker who has the hash cannot determine the input value by trying many possible inputs to arrive at the same output.</dd>

<dt><MdxJumpAnchor id="gl-secret">Secret</MdxJumpAnchor></dt>
<dd>See <a href="#gl-client-secret">client secret</a>.</dd>

<dt><MdxJumpAnchor id="gl-secure-signals">Secure signals</MdxJumpAnchor></dt>
<dd>A feature of Google Ad Manager. The secure signals feature (previously known as Encrypted Signals for Publishers, abbreviated to ESP) allows publishers to securely share signals with trusted third-party buying partners. It allows publishers to pass "encrypted" user IDs to bidders that are approved by Google, via <a href="https://admanager.google.com/home/">Google Ad Manager</a> and the <a href="https://support.google.com/admanager/answer/6321605?hl=en">Google Ad Manager Ad Exchange (AdX)</a>.</dd>
<dd>For details, see <a href="https://blog.google/products/admanager/new-ways-for-publishers-to-manage-first-party-data/">Share secure signals with your trusted partners</a> (second section) and <a href="https://support.google.com/admanager/answer/10488752?hl=en">Share secure signals with bidders</a>, both from Google.</dd>
<dd>For details about UID2 support of the Google secure signals feature, see <a href="../guides/google-ss-integration">Google Ad Manager Secure Signals Integration Guide</a>.</dd>

<dt><MdxJumpAnchor id="gl-sha-256">SHA-256</MdxJumpAnchor></dt>
<dd>SHA-256 is the secure hashing algorithm that UID2 uses.</dd>
<dd>SHA-256 is part of the SHA-2 family of algorithms developed by the National Institute of Standards and Technology (NIST) and the National Security Agency (NSA) to succeed SHA-1. Each algorithm is named according to the number of bits in the output, so SHA-256 has 256 bits.</dd>
<dd>For details, see <a href="https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf">https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf</a> (specification).</dd>

<dt><MdxJumpAnchor id="gl-sharing">Sharing</MdxJumpAnchor></dt>
<dd>In the context of UID2, sharing is a process for distributing <a href="#gl-raw-uid2">raw UID2s</a> securely between UID2 participants. To protect raw UID2s from unauthorized access, the originating participant (sender) must encrypt the raw UID2s into UID2 tokens before transmission. The destination participant (receiver) must decrypt the UID2 tokens into raw UID2s for internal use.</dd>
<dd>For details, see <a href="../sharing/sharing-overview">UID2 Sharing: Overview</a>.</dd>

<dt><MdxJumpAnchor id="gl-sharing-participant">Sharing participant</MdxJumpAnchor></dt>
<dd>In UID2, a sharing participant is a company that takes part in <a href="#gl-sharing">sharing</a>&#8212;distributing <a href="#gl-raw-uid2">raw UID2s</a> securely between UID2 participants. A sharing participant can be a publisher, advertiser, DSP, or data provider, or might have more than one of these roles.</dd>
<dd>For details, see <a href="../sharing/sharing-overview">UID2 Sharing: Overview</a>.</dd>

<dt><MdxJumpAnchor id="gl-sso">Single sign-on (SSO)</MdxJumpAnchor></dt>
<dd>SSO is an acronym for Single sign-on. SSO allows a user to log in with the same credentials (usually, but not always, ID and password) to one of several software systems, such as apps or websites. SSO allows the user to log in once to multiple applications or sites using one set of credentials. With SSO, websites/apps do not have to maintain their own authentication systems.</dd>

<dt><MdxJumpAnchor id="gl-subscription-id">Subscription ID</MdxJumpAnchor></dt>
<dd>For server-side publisher integrations, the subscription ID is one of the two values issued to publishers as their UID2 credentials. For details, see <a href="../getting-started/gs-credentials#subscription-id-and-public-key">Subscription ID and Public Key</a>.</dd>

</dl>

### T

<dl>

<dt><MdxJumpAnchor id="gl-transparency-and-control-portal">Transparency and Control Portal</MdxJumpAnchor></dt>
<dd>The UID2 Transparency and Control Portal is a user-facing website, <a href="https://www.transparentadvertising.com/">https://www.transparentadvertising.com/</a>, that allows consumers to opt out of UID2 at any time.</dd>

</dl>

### U

<dl>

<dt><MdxJumpAnchor id="gl-uid2-framework">UID2 framework</MdxJumpAnchor></dt>
<dd>The Unified ID 2.0 (UID2) framework enables deterministic identity for advertising opportunities on the open internet for many <a href="../intro#participants">participants</a> across the advertising ecosystem. It enables logged-in experiences from publisher websites, mobile apps, and Connected TV (CTV) apps to monetize through programmatic workflows. Built as an open-source, standalone solution with its own unique namespace, the framework focuses on transparency and privacy.</dd>

<dt><MdxJumpAnchor id="gl-uid2-identifier">UID2 identifier</MdxJumpAnchor></dt>
<dd>There are two Unified ID 2.0 (UID2) identifier types: <a href="#gl-raw-uid2">raw UID2s</a> and <a href="#gl-uid2-token">UID2 tokens</a> (also known as advertising tokens).</dd>
<dd>For details, see <a href="../intro#uid2-identifier-types">UID2 Identifier Types</a>.</dd>

<dt><MdxJumpAnchor id="gl-uid2-portal">UID2 Portal</MdxJumpAnchor></dt>
<dd>The UID2 Portal is a separate user interface that allows UID2 participants to manage their accounts.</dd>
<dd>For details, see  <a href="../portal/portal-overview">UID2 Portal: Overview</a>.</dd>

<dt><MdxJumpAnchor id="gl-uid2-service">UID2 service</MdxJumpAnchor></dt>
<dd>The Unified ID 2.0 (UID2) service is a set of components, API endpoints, and other types of solutions that collectively implement the <a href="#gl-uid2-framework">UID2 framework</a> and provide clients with access to the relevant UID2 functionality.</dd>
<dd>The term "UID2 service" is also used to mean the UID2 <a href="#gl-operator-service">Operator Service</a>.</dd>

<dt><MdxJumpAnchor id="gl-uid2-token">UID2 token (advertising token)</MdxJumpAnchor></dt>
<dd>A Unified ID 2.0 (UID2) token, also called an advertising token, is an encrypted form of a <a href="#gl-raw-uid2">raw UID2</a>.</dd>
<dd>UID2 tokens are generated from hashed or unhashed email addresses or phone numbers that are converted to raw UID2s and then encrypted. The UID2 token is a unique value; no two UID2 tokens are the same. UID2 tokens are case sensitive.</dd>
<dd>The token has a limited life, but can be refreshed in the background using the <a href="#gl-refresh-token">refresh token</a>.</dd>
<dd>Publishers send UID2 tokens in the bid stream.</dd>
<dd>For details, see <a href="../intro#uid2-identifier-types">UID2 Identifier Types</a>.</dd>

<dt><MdxJumpAnchor id="gl-unified-id-20">Unified ID 2.0 (UID2)</MdxJumpAnchor></dt>
<dd>The term UID2 can be used to mean the <a href="#gl-uid2-framework">UID2 framework</a>, the <a href="#gl-uid2-service">UID2 service</a>, a <a href="#gl-raw-uid2">raw UID2</a>, or a <a href="#gl-uid2-token">UID2 token</a> (advertising token).</dd>

<dt><MdxJumpAnchor id="gl-utc">UTC</MdxJumpAnchor></dt>
<dd>UTC is an abbreviation for Coordinated Universal Time, also called Zulu time, which is the primary time standard in general use. UTC essentially equates to Greenwich Mean Time (GMT), but is more scientifically precise.</dd>

</dl>
