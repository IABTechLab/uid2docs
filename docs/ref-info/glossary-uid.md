---
title: UID2 Glossary
description: Definitions for some UID2 terms.
hide_table_of_contents: false
sidebar_position: 10
---

import MdxJumpAnchor from '@site/src/components/MdxJumpAnchor';
import Link from '@docusaurus/Link';

# Unified ID 2.0 Glossary
<p>This page defines some key terms used in the UID2 documentation.</p>

<!-- 
**A**
<a href="#gl-advertising-id">Advertising ID</a> | 
<a href="#gl-advertising-token">Advertising token</a> | 
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
<a href="#gl-tokenized-refresh">Tokenrefresh</a> | 
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

<dt><MdxJumpAnchor id="gl-advertising-id"><a href="#gl-advertising-id">Advertising ID</a></MdxJumpAnchor></dt>
<dd>Advertising ID is another term for a <a href="#gl-raw-uid2">raw UID2</a>.</dd>

<dt><MdxJumpAnchor id="gl-advertising-token"><a href="#gl-advertising-token">Advertising token</a></MdxJumpAnchor></dt>
<dd>Advertising token is another term for a <a href="#gl-uid2-token">UID2 token</a>.</dd>

<dt><MdxJumpAnchor id="gl-api-key"><a href="#gl-api-key">API key</a></MdxJumpAnchor></dt>
<dd>Each UID2 <a href="../intro#participants">participant</a> using a server-side implementation has an API key (client key) and also a secret value associated with the key, called the <a href="#gl-client-secret">client secret</a> (API secret). The client secret is known only to the participant and the UID2 service.</dd>
<dd>For details, see <a href="../getting-started/gs-credentials">UID2 Credentials</a>.</dd>

<dt><MdxJumpAnchor id="gl-api-secret"><a href="#gl-api-secret">API secret</a></MdxJumpAnchor></dt>
<dd>See <a href="#gl-client-secret">client secret</a>.</dd>

<dt><MdxJumpAnchor id="gl-app-name"><a href="#gl-app-name">App name</a></MdxJumpAnchor></dt>
<dd>In the context of mobile integrations, the app name is the Android application ID, the iOS app store ID, or the iOS bundle identifier.</dd>

<dt><MdxJumpAnchor id="gl-authorization-header"><a href="#gl-authorization-header">Authorization header</a></MdxJumpAnchor></dt>
<dd>The Authorization header is a way to authenticate the client to the UID2 service.</dd>
<dd>For details, see <a href="https://www.rfc-editor.org/rfc/rfc9110.html#field.authorization">11.6.2. Authorization</a> in RFC 9110, the HTTP specification.</dd>

</dl>

### B

<dl>

<dt><MdxJumpAnchor id="gl-bearer-token"><a href="#gl-bearer-token">Bearer token</a></MdxJumpAnchor></dt>
<dd>A bearer token is a special string that identifies the client. For authentication, some UID2 endpoints require the <a href="#gl-client-key">client key</a> to be specified as a bearer token in the Authorization header of the request: for example, <a href="../endpoints/post-token-generate">POST&nbsp;/token/generate</a>.</dd>

<dt><MdxJumpAnchor id="gl-bidstream"><a href="#gl-bidstream">Bidstream</a></MdxJumpAnchor></dt>
<dd>To place a request for an ad to be placed in an advertising spot (bid request), the publisher sends different pieces of information, so that advertisers can bid on it, generally through an advertising exchange or DSP. The flow of bidding data is the bidstream.</dd>
<dd>Bidstream data goes from publishers to other entities (depending on the publisher's configuration) and back to the publisher.</dd>

</dl>

### C

<dl>

<dt><MdxJumpAnchor id="gl-client-key"><a href="#gl-client-key">Client key</a></MdxJumpAnchor></dt>
<dd>See <a href="#gl-api-key">API key</a>.</dd>

<dt><MdxJumpAnchor id="gl-client-keypair"><a href="#gl-client-keypair">Client keypair</a></MdxJumpAnchor></dt>
<dd>For client-side publisher integrations, the <a href="#gl-subscription-id">Subscription ID</a> and <a href="#gl-public-key">public key</a> are the two values issued to publishers to uniquely identify the account. Client keypair is a term we use for these two values together.</dd>
<dd>For details, see <a href="../getting-started/gs-credentials#subscription-id-and-public-key">Subscription ID and Public Key</a>.</dd>

<dt><MdxJumpAnchor id="gl-client-secret"><a href="#gl-client-secret">Client secret</a></MdxJumpAnchor></dt>
<dd>Each UID2 <a href="../intro#participants">participant</a> using a server-side implementation has an API key (client key) and also a secret value associated with the key, called the client secret (API secret). The client secret is known only to the participant and the UID2 service.</dd>
<dd>For details, see <a href="../getting-started/gs-credentials">UID2 Credentials</a>.</dd>

<dt><MdxJumpAnchor id="gl-client-server"><a href="#gl-client-server">Client-server integration</a></MdxJumpAnchor></dt>
<dd>One of the UID2 <a href="#gl-integration-approaches">integration approaches</a> is to integrate partially on the client side and partially on the server side (client-server).</dd>
<dd>For example, in a client-server integration for a publisher, the UID2 token is generated on the server side and refreshed on the client side.</dd>
<dd>Examples of documentation for publisher client-server integrations:<br/>- <a href="../guides/integration-prebid-client-server">UID2 Client-Server Integration Guide for Prebid.js</a><br/>- <a href="../guides/integration-javascript-client-server">Client-Server Integration Guide for JavaScript</a><br/>- <a href="../guides/integration-mobile-client-server">UID2 Client-Server Integration Guide for Mobile</a></dd>

<dt><MdxJumpAnchor id="gl-client-side"><a href="#gl-client-side">Client-side integration</a></MdxJumpAnchor></dt>
<dd>One of the UID2 <a href="#gl-integration-approaches">integration approaches</a> is to integrate entirely on the client side.</dd>
<dd>In a client-side integration, UID2 tokens are generated and refreshed on the client side.</dd>
<dd>For example, in a client-side integration, advertisers generate UID2 tokens on the client side for tracking pixels, and publishers generate UID2 tokens on the client side for bidstream use, as well as refreshing the tokens.</dd>
<dd>Examples of documentation for publisher client-side integrations:<br/>- <a href="../guides/integration-prebid-client-side">UID2 Client-Side Integration Guide for Prebid.js</a><br/>- <a href="../guides/integration-javascript-client-side">Client-Side Integration Guide for JavaScript</a><br/>- <a href="../guides/integration-mobile-client-side">UID2 Client-Side Integration Guide for Mobile</a></dd>

<dt><MdxJumpAnchor id="gl-closed-operator"><a href="#gl-closed-operator">Closed Operator</a></MdxJumpAnchor></dt>
<dd>Closed Operator is another term for a <a href="#gl-private-operator">Private Operator</a>.</dd>

<dt><MdxJumpAnchor id="gl-confidential-computing"><a href="#gl-confidential-computing">Confidential Computing (GCP)</a></MdxJumpAnchor></dt>
<dd>A Confidential Computing solution from Google Cloud Platform (GCP), Confidential Space, that is supported for hosting a UID2 <a href="#gl-private-operator">Private Operator</a>.</dd>
<dd>For details, see <a href="#gl-confidential-space">Confidential Space</a>.</dd>
<!-- <dd>**new**</dd> -->

<dt><MdxJumpAnchor id="gl-confidential-containers"><a href="#gl-confidential-containers">Confidential containers (Azure)</a></MdxJumpAnchor></dt>
<dd>Confidential Containers is the name of a secure confidential computing option from Microsoft Azure. Each Confidential Containers implementation runs in a hardware-backed Trusted Execution Environment (TEE) that provides intrinsic capabilities such as data integrity, data confidentiality, and code integrity.</dd>
<dd>In the context of UID2, Confidential Containers from Azure is one of the supported secure computing environments for hosting a <a href="#gl-private-operator">Private Operator</a>.</dd>
<dd>For details, see <a href="../guides/operator-guide-azure-enclave">UID2 Private Operator for Azure Integration Guide</a>.</dd>
<!-- <dd>**new**</dd> -->

<dt><MdxJumpAnchor id="gl-confidential-space"><a href="#gl-confidential-space">Confidential Space (GCP)</a></MdxJumpAnchor></dt>
<dd>Confidential Space is one of the Confidential Computing options from Google Cloud Platform (GCP). Confidential Space offers a secure enclave environment, known as a Trusted Execution Environment (TEE).</dd>
<dd>In the context of UID2, GCP Confidential Space is one of the supported secure computing environments for hosting a <a href="#gl-private-operator">Private Operator</a>.</dd>
<dd>For details, see <a href="../guides/operator-private-gcp-confidential-space">UID2 Private Operator for GCP Integration Guide</a>.</dd>
<!-- <dd>**new**</dd> -->

<dt><MdxJumpAnchor id="gl-core-service"><a href="#gl-core-service">Core Service</a></MdxJumpAnchor></dt>
<dd>The UID2 Core Service is a centralized service that manages access to <a href="#gl-salt">salts</a>, encryption keys, and other relevant data in the UID2 ecosystem.</dd>
<dd>For an overview of all the UID2 services, see <a href="../intro#components">Components</a>.</dd>

</dl>

### D

<dl>

<dt><MdxJumpAnchor id="gl-data-provider"><a href="#gl-data-provider">Data provider</a></MdxJumpAnchor></dt>
<dd>In the context of UID2, a data provider is any entity that provides data and measurement services relating to advertising, such as a data partner, measurement partner, or offline measurement provider.</dd>
<dd>For details, see <a href="../intro#participants">participant</a> (Data Providers).</dd>

<dt><MdxJumpAnchor id="gl-demand-side-platform"><a href="#gl-demand-side-platform">Demand-side platform</a></MdxJumpAnchor></dt>
<dd>A demand-side platform (DSP) provides services to companies that want to buy digital advertising, such as advertisers, brands, and media agencies.</dd>

<dt><MdxJumpAnchor id="gl-dii"><a href="#gl-dii">Directly identifying information (DII)</a></MdxJumpAnchor></dt>
<dd>Directly identifying information, or DII, is information that directly identifies an individual, including name, email address, or phone number.</dd>
<dd>UID2 supports email address and phone number, and translates the DII to a value that can be used for the purpose of targeted advertising but cannot by itself be traced back to the original value.</dd>

<dt><MdxJumpAnchor id="gl-docker"><a href="#gl-docker">Docker</a></MdxJumpAnchor></dt>
<dd>Docker is a Platform as a Service (PaaS) suite of products that is used for automating the deployment of software via packages called containers. The set of Docker products allows packaging of an application, with all its dependencies, into a virtual container that can run on most operating systems so that applications can work efficiently in different environments.</dd>
<dd>For details, see <a href="https://www.docker.com">https://www.docker.com</a>.</dd>

</dl>

### E

<dl>

<dt><MdxJumpAnchor id="gl-enclave"><a href="#gl-enclave">Enclave</a></MdxJumpAnchor></dt>
<dd>An enclave is a secure subsection of a computing environment. The enclave has additional business logic and security measures applied to it, to prevent anyone from tampering with it.</dd>
<dd>In the context of UID2, a <a href="#gl-private-operator">Private Operator</a> must run inside an enclave. For a summary of the enclave versions supported, see <a href="../guides/integration-options-private-operator#hosting-options-for-private-operators">Hosting Options for Private Operators</a> in *UID2 Private Operator Integration Overview*.</dd>
<dd>In an enclave, the operator image must be a very specific, predefined version, and additional constraints are applied to ensure security.</dd>

<dt><MdxJumpAnchor id="gl-encryption-key"><a href="#gl-encryption-key">Encryption key</a></MdxJumpAnchor></dt>
<dd>Each <a href="#gl-uid2-token">UID2 token</a> is encrypted using an encryption key that's unique to the publisher that requested the token. The key identifies the publisher and is required for decrypting the token. This helps ensure that UID2 tokens cannot be decrypted by unauthorized individuals.</dd>

<dt><MdxJumpAnchor id="gl-euid-framework"><a href="#gl-euid-framework">EUID framework</a></MdxJumpAnchor></dt>
<dd>The European Unified ID (EUID) framework enables deterministic identity for advertising opportunities on the open internet for many participants across the advertising ecosystem. It enables publisher websites, mobile apps, and Connected TV (CTV) apps to monetize through programmatic workflows. Built as an open-source, standalone solution with its own unique namespace, the framework offers privacy controls designed to help participants meet local market requirements.</dd>
<dd>EUID operates in the European region, including many European countries, such as France, Italy, and Spain, some non-European countries, such as Iceland, and some other regions, such as the Azores, Martinique, and the United Kingdom. It was designed with EU privacy law compliance in mind.</dd>
<dd>There are many similarities between UID2 and EUID, but they are completely separate, and their tokens are not interchangeable.</dd>
<dd>For details, see <a href="https://euid.eu/docs/intro">European Unified ID Overview</a>.</dd>

</dl>

### F

<dl>

<dt><MdxJumpAnchor id="gl-first-level-hash"><a href="#gl-first-level-hash">First-level hash</a></MdxJumpAnchor></dt>
<dd>In the context of UID2, the first-level hash is the anonymized, opaque, secure value from which the <a href="#gl-raw-uid2">raw UID2</a>, <a href="#gl-uid2-token">UID2 token</a>, and <a href="#gl-refresh-token">refresh token</a> are generated. Several cryptographic functions, including salting and hashing, are applied to the initial value, whether an email or a phone number, to create the first-level hash.</dd>

</dl>

### H

<dl>
<dt><MdxJumpAnchor id="gl-hash"><a href="#gl-hash">Hash</a></MdxJumpAnchor></dt>
<dd>A hash function converts a set of data of varying/arbitrary size to a set of data of fixed size. The result of the hash function is called a hash, digest, or hash value.</dd>
<dd>Hashing is a one-way function. The same input value, hashed, always yields the same output value, but there is no corresponding function to take the output value and arrive at the input value. Hashing is a security measure.</dd>
<dd>UID2 uses the <a href="#gl-sha-256">SHA-256</a> hashing algorithm.</dd>

</dl>

### I

<dl>

<dt><MdxJumpAnchor id="gl-identity"><a href="#gl-identity">Identity</a></MdxJumpAnchor></dt>
<dd>In the context of UID2, the term "identity" refers to a package of values that includes the UID2 token, the refresh token, and associated values such as timestamps. This set of values is returned in the response from the <a href="../endpoints/post-token-generate">POST&nbsp;/token/generate</a> endpoint and also from the <a href="../endpoints/post-token-refresh">POST&nbsp;/token/refresh</a> endpoint.</dd>

<dt><MdxJumpAnchor id="gl-integration-approaches"><a href="#gl-integration-approaches">Integration approaches</a></MdxJumpAnchor></dt>
<dd>UID2 integrations can be entirely on the <a href="#gl-client-side">client side</a>, entirely on the <a href="#gl-server-side">server side</a>, or partially on the client side and partially on the server side (<a href="#gl-client-server">client-server</a>).</dd>

</dl>

### J

<dl>

<dt><MdxJumpAnchor id="gl-json-web-token"><a href="#gl-json-web-token">JSON Web Token (JWT)</a></MdxJumpAnchor></dt>
<dd>A JSON Web Token (JWT) is a compact, URL-safe means of representing claims (pieces of information) to be sent from one party to another over the web. The claims in a JWT are encoded as a JSON object that is used either as the payload of a JSON Web Signature (JWS) structure or as the plain text of a JSON Web Encryption (JWE) structure. This enables the claims to be digitally signed and/or encrypted.</dd>

</dl>

### K

<dl>

<dt><MdxJumpAnchor id="gl-key"><a href="#gl-key">Key</a></MdxJumpAnchor></dt>
<dd>See <a href="#gl-encryption-key">Encryption key</a>.</dd>

</dl>

### N

<dl>

<dt><MdxJumpAnchor id="gl-normalize"><a href="#gl-normalize">Normalize</a></MdxJumpAnchor></dt>
<dd>To normalize a data set means to bring it to a standard condition or state.</dd>
<dd>UID2 includes specific normalization rules. For details, see <a href="../getting-started/gs-normalization-encoding#email-address-normalization">Email Address Normalization</a> and <a href="../getting-started/gs-normalization-encoding#phone-number-normalization">Phone Number Normalization</a>.</dd>

</dl>

### O

<dl>

<dt><MdxJumpAnchor id="gl-opaque"><a href="#gl-opaque">Opaque</a></MdxJumpAnchor></dt>
<dd>When we say a UID2 token is an opaque string, we mean that the way that the token is computed, and its format, are not communicated to UID2 participants and cannot be relied upon to remain unchanged. No assumptions should be made about the format or length of the string, or any other aspect of it.</dd>

<dt><MdxJumpAnchor id="gl-open-operator"><a href="#gl-open-operator">Open Operator</a></MdxJumpAnchor></dt>
<dd>Open Operator is another term for a <a href="#gl-public-operator">Public Operator</a>.</dd>

<dt><MdxJumpAnchor id="gl-operator"><a href="#gl-operator">Operator</a></MdxJumpAnchor></dt>
<dd>An Operator is an organization or entity that runs the UID2 <a href="#gl-operator-service">Operator Service</a>. The UID2 Operator is the API server in the UID2 ecosystem.</dd>
<dd>Operators perform multiple functions, such as receiving <a href="#gl-encryption-key">encryption keys</a> and <a href="#gl-salt">salts</a> from the UID2 Core Service, salting and hashing personal data (<Link href="#gl-dii">DII</Link>) to return raw UID2s, and encrypting raw UID2s to generate UID2 tokens.</dd>
<dd>A participant can also choose to become a <a href="#gl-private-operator">Private Operator</a> to access UID2 APIs and to generate raw UID2s and UID2 tokens from within a private infrastructure.</dd>
<dd>For details, see <a href="../intro#participants">participants</a> and <a href="../ref-info/ref-operators-public-private">The UID2 Operator</a>.</dd>

<dt><MdxJumpAnchor id="gl-operator-key"><a href="#gl-operator-key">Operator key</a></MdxJumpAnchor></dt>
<dd>Each UID2 Private Operator has an operator key that allows the Private Operator Service to connect to the Core Service and Opt-Out Service and call some endpoints on it.</dd>
<dd>The operator key identifies the participant Operator to the UID2 service.</dd>

<dt><MdxJumpAnchor id="gl-operator-service"><a href="#gl-operator-service">Operator Service</a></MdxJumpAnchor></dt>
<dd>A service that enables all functions of the <a href="#gl-operator">Operator</a>.</dd>
<dd>For an overview of all the UID2 services, see <a href="../intro#components">Components</a>.</dd>

<dt><MdxJumpAnchor id="gl-opt-out"><a href="#gl-opt-out">Opt-out</a></MdxJumpAnchor></dt>
<dd>An end user who participates in the UID2 ecosystem can opt out at any time by going to the <a href="https://www.transparentadvertising.com/">Transparency and Control Portal</a>.</dd>
<dd>For details about the UID2 opt-out workflow and how users can opt out, see <a href="../getting-started/gs-opt-out">User Opt-Out</a>.</dd>

<dt><MdxJumpAnchor id="gl-opt-out-service"><a href="#gl-opt-out-service">Opt-Out Service</a></MdxJumpAnchor></dt>
<dd>The Opt-Out Service is a global UID2 service that manages and stores user opt-out requests.</dd>
<dd>For an overview of all the UID2 services, see <a href="../intro#components">Components</a>.</dd>

</dl>

### P

<dl>

<dt><MdxJumpAnchor id="gl-participant"><a href="#gl-participant">Participant</a></MdxJumpAnchor></dt>
<dd>An entity that fulfils a key role in UID2. Participants include the following: Core Administrator, Operator, DSP, data provider, advertiser, publisher, consumer.</dd>
<dd>For details, see <a href="../intro#participants">participants</a>.</dd>

<dt><MdxJumpAnchor id="gl-private-operator"><a href="#gl-private-operator">Private Operator</a></MdxJumpAnchor></dt>
<dd>A Private <a href="#gl-operator">Operator</a> is an entity that runs a private instance of the Operator Service. The Private Operator generates and manages UID2s for itself, using its own resources (such as hardware) in a secure environment.</dd>
<dd>For details, see <a href="../ref-info/ref-operators-public-private">The UID2 Operator</a>.</dd>

<dt><MdxJumpAnchor id="gl-private-operator-service"><a href="#gl-private-operator-service">Private Operator Service</a></MdxJumpAnchor></dt>
<dd>A private instance of the Operator Service, run by a <a href="#gl-private-operator">Private Operator</a>.</dd>

<dt><MdxJumpAnchor id="gl-public-key"><a href="#gl-public-key">Public key</a></MdxJumpAnchor></dt>
<dd>For client-side publisher integrations, the public key is one of the two values issued to publishers to uniquely identify the account. For details, see <a href="../getting-started/gs-credentials#subscription-id-and-public-key">Subscription ID and Public Key</a>.</dd>
<dd>In UID2 integrations, this value is often represented as <b>serverPublicKey</b>: for example, in the <a href="../guides/integration-prebid-client-side">UID2 Client-Side Integration Guide for Prebid.js</a>, the <a href="../guides/integration-javascript-client-side">Client-Side Integration Guide for JavaScript</a>, and the <a href="../guides/integration-mobile-client-side">UID2 Client-Side Integration Guide for Mobile</a>.</dd>

<dt><MdxJumpAnchor id="gl-public-operator"><a href="#gl-public-operator">Public Operator</a></MdxJumpAnchor></dt>
<dd>A Public <a href="#gl-operator">Operator</a> is an entity that runs a public instance of the UID2 Operator Service. For example, The Trade Desk currently serves as a Public Operator for the UID2 framework, available to all participants.</dd>
<dd>For details, see <a href="../ref-info/ref-operators-public-private">The UID2 Operator</a>.</dd>

</dl>

### R

<dl>

<dt><MdxJumpAnchor id="gl-raw-uid2"><a href="#gl-raw-uid2">Raw UID2</a></MdxJumpAnchor></dt>
<dd>An unencrypted alphanumeric identifier created through the UID2 APIs or SDKs with the user's <a href="#gl-dii">directly identifying information</a> (email address or phone number) as input. The raw UID2 is encrypted to create a <a href="#gl-uid2-token">UID2 token</a>. The raw UID2 is a unique value; no two raw UID2s are the same. Raw UID2s, and their associated UID2 tokens, are case sensitive.</dd>
<dd>For details, see <a href="../intro#uid2-identifier-types">UID2 Identifier Types</a>.</dd>

<dt><MdxJumpAnchor id="gl-refresh-token"><a href="#gl-refresh-token">Refresh token</a></MdxJumpAnchor></dt>
<dd>A refresh token is an opaque string that is issued along with the <a href="#gl-uid2-token">UID2 token</a>. It is used to refresh the UID2 token, which has a limited life.</dd>
<dd>When the UID2 server receives the refresh token with a request for a new UID2 token, it checks for user opt-out. If the user has opted out of UID2, no new UID2 token is generated.</dd>
<dd>When a new UID2 token is generated and returned in response to the refresh token, a new refresh token is returned along with it. However, if the user is inactive for a long period of time, the refresh token itself expires.</dd>
<dd>For details, see <a href="ref-tokens">UID2 Tokens and Refresh Tokens</a>.</dd>
</dl>

### S

<dl>

<dt><MdxJumpAnchor id="gl-salt"><a href="#gl-salt">Salt</a></MdxJumpAnchor></dt>
<dd>A string of characters that is used in the process of transforming an email address or phone number into a secure, opaque value that cannot by itself be traced back to the original value.</dd>
<dd>The UID2 service uses salt as part of the process, along with hashing and encryption, to secure the original value. Salt is added to the input value before hashing.</dd>

<dt><MdxJumpAnchor id="gl-salt-bucket"><a href="#gl-salt-bucket">Salt bucket</a></MdxJumpAnchor></dt>
<dd>A salt bucket is used to manage secret <a href="#gl-salt">salt</a> values over time. Each bucket contains a single current salt value, which remains active for approximately one year before being rotated to a new value. Buckets can be updated independently of one another.</dd>
<dd>There are just over one million salt buckets, and each email address or phone number is assigned to a specific bucket in a deterministic manner. However, this assignment is not permanent; it might change when the bucket's current secret salt is rotated to a new value.</dd>

<dt><MdxJumpAnchor id="gl-salt-bucket-id"><a href="#gl-salt-bucket-id">Salt bucket ID</a></MdxJumpAnchor></dt>
<dd>A salt bucket ID is a unique string of characters that identifies a specific <a href="#gl-salt-bucket">salt bucket</a>. The salt bucket ID can be used to check which salt buckets have recently had their salt values updated, indicating which emails or phone numbers need their raw UID2 values regenerated.</dd>
<dd>For an example of a salt bucket ID, see the response to the `POST /identity/buckets` endpoint: <a href="../endpoints/post-identity-buckets#decrypted-json-response-format">Decrypted JSON Response Format</a>.</dd>

<dt><MdxJumpAnchor id="gl-salted-hash"><a href="#gl-salted-hash">Salted hash</a></MdxJumpAnchor></dt>
<dd>When a <a href="#gl-salt">salt</a> value is added to the input string before applying the <a href="#gl-hash">hash</a> function, the result is a salted hash. When the input value is salted before hashing, an attacker who has the hash cannot determine the input value by trying many possible inputs to arrive at the same output.</dd>

<dt><MdxJumpAnchor id="gl-secret"><a href="#gl-secret">Secret</a></MdxJumpAnchor></dt>
<dd>See <a href="#gl-client-secret">client secret</a>.</dd>

<dt><MdxJumpAnchor id="gl-secure-signals"><a href="#gl-secure-signals">Secure Signals</a></MdxJumpAnchor></dt>
<dd>A feature of Google Ad Manager. The secure signals feature (previously known as Encrypted Signals for Publishers, abbreviated to ESP) allows publishers to securely share signals with trusted third-party buying partners. It allows publishers to pass "encrypted" user IDs to bidders that are approved by Google, via <a href="https://admanager.google.com/home/">Google Ad Manager</a> and the <a href="https://support.google.com/admanager/answer/6321605?hl=en">Google Ad Manager Ad Exchange (AdX)</a>.</dd>
<dd>For details, see <a href="https://blog.google/products/admanager/new-ways-for-publishers-to-manage-first-party-data/">Share secure signals with your trusted partners</a> (second section) and <a href="https://support.google.com/admanager/answer/10488752?hl=en">Share secure signals with bidders</a>, both from Google.</dd>
<dd>For details about UID2 support of the Google secure signals feature, see <a href="../guides/integration-google-ss">Google Ad Manager Secure Signals Integration Guide</a>.</dd>

<dt><MdxJumpAnchor id="gl-server-side"><a href="#gl-server-side">Server-side integration</a></MdxJumpAnchor></dt>
<dd>One of the UID2 <a href="#gl-integration-approaches">integration approaches</a> is to integrate entirely on the server side.</dd>
<dd>In a server-side integration, raw UID2s or UID2 tokens are generated and refreshed on the server.</dd>
<dd>For example, in a server-side integration, advertisers generate raw UID2s on the server side to be delivered for audience targeting, and publishers generate UID2 tokens on the server side for bidstream use.</dd>
<dd>An example of documentation for publisher server-side integration is <a href="../guides/integration-publisher-server-side">Publisher Integration Guide, Server-Side</a>.</dd>

<dt><MdxJumpAnchor id="gl-sha-256"><a href="#gl-sha-256">SHA-256</a></MdxJumpAnchor></dt>
<dd>SHA-256 is the secure hashing algorithm that UID2 uses.</dd>
<dd>SHA-256 (sometimes called SHA256) is part of the SHA-2 family of algorithms developed by the National Institute of Standards and Technology (NIST) and the National Security Agency (NSA) to succeed SHA-1. Each algorithm is named according to the number of bits in the output, so SHA-256 has 256 bits.</dd>
<dd>For details, see <a href="https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf">https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf</a> (specification).</dd>

<dt><MdxJumpAnchor id="gl-sharing"><a href="#gl-sharing">Sharing (in UID2)</a></MdxJumpAnchor></dt>
<dd>In the context of UID2, sharing is a process for distributing <a href="#gl-raw-uid2">raw UID2s</a>, either directly or encrypted into <a href="#gl-uid2-token">UID2 tokens</a>, from one UID2 <a href="#gl-sharing-participant">sharing participant</a> to another.</dd>
<dd>For details, see <a href="../getting-started/gs-sharing">UID2 Sharing</a>.</dd>

<dt><MdxJumpAnchor id="gl-sharing-participant"><a href="#gl-sharing-participant">Sharing participant</a></MdxJumpAnchor></dt>
<dd>For UID2, a sharing participant is a company that either has agreed to comply with the UID2 Participation Policy or fits within one of the <a href="../getting-started/gs-sharing#exceptions">exceptions</a>, and that takes part in <a href="#gl-sharing">sharing</a>, either as a sender or a receiver.</dd>
<dd>For details, see <a href="../getting-started/gs-sharing">UID2 Sharing</a>.</dd>

<dt><MdxJumpAnchor id="gl-sso"><a href="#gl-sso">Single sign-on (SSO)</a></MdxJumpAnchor></dt>
<dd>SSO is an acronym for Single sign-on. SSO allows a user to log in with the same credentials (usually, but not always, ID and password) to one of several software systems, such as apps or websites. SSO allows the user to log in once to multiple applications or sites using one set of credentials. With SSO, websites/apps do not have to maintain their own authentication systems.</dd>

<dt><MdxJumpAnchor id="gl-subscription-id"><a href="#gl-subscription-id">Subscription ID</a></MdxJumpAnchor></dt>
<dd>For client-side publisher integrations, the Subscription ID is one of the two values issued to publishers to uniquely identify the account. For details, see <a href="../getting-started/gs-credentials#subscription-id-and-public-key">Subscription ID and Public Key</a>.</dd>

</dl>

### T

<dl>

<dt><MdxJumpAnchor id="gl-token-refresh"><a href="#gl-token-refresh">Token refresh</a></MdxJumpAnchor></dt>
<dd>When a UID2 participant requests a <a href="#gl-uid2-token">UID2 token</a>, the token is returned with a set of associated values, including a <a href="#gl-refresh-token">refresh token</a> and timestamps for the UID2 token and the refresh token. As long as the refresh token has not expired, the publisher can use it to request a fresh UID2 token without having to send <a href="#gl-dii">DII</a>.</dd>
<dd>Any UID2 participant that requests a UID2 token must have a process in place for keeping the token valid: either monitoring the refresh period and requesting a new UID2 token before the refresh token expires, or requesting a new UID2 token each time, which requires sending DII.</dd>
<dd>In most cases, token refresh is managed by an SDK or other implementation strategy such as a Prebid.js implementation.</dd>
<dd>If the refresh token expires, the publisher must re-request a UID2 token by sending DII.</dd>
<dd>For details, see <a href="ref-tokens">UID2 Tokens and Refresh Tokens</a>.</dd>

<dt><MdxJumpAnchor id="gl-tokenized-sharing"><a href="#gl-tokenized-sharing">Tokenized sharing</a></MdxJumpAnchor></dt>
<dd>Tokenized sharing means encrypting <a href="#gl-dii">DII</a> or <a href="#gl-raw-uid2">Raw UID2s</a> into <a href="#gl-uid2-token">UID2 tokens</a> and sharing the tokens with authorized recipients. Using UID2 tokens helps protect raw UID2s end-to-end between the sender and receiver of the data, including when the data passes through unauthorized parties. Tokenized sharing is required for sharing in the bidstream or via pixels, but you can use it in any sharing use case.</dd>
<dd>For details, see <a href="../sharing/sharing-tokenized-overview">Tokenized Sharing Overview</a>.</dd>

<dt><MdxJumpAnchor id="gl-transparency-and-control-portal"><a href="#gl-transparency-and-control-portal">Transparency and Control Portal</a></MdxJumpAnchor></dt>
<dd>The UID2 Transparency and Control Portal is a user-facing website, <a href="https://www.transparentadvertising.com/">https://www.transparentadvertising.com/</a>, that allows consumers to opt out of UID2 at any time.</dd>

</dl>

### U

<dl>

<dt><MdxJumpAnchor id="gl-uid"><a href="#gl-uid">UID</a></MdxJumpAnchor></dt>
<dd>UID is a general term used to encompass both <a href="#gl-uid2-framework">UID2</a> and <a href="#gl-euid">EUID</a>.</dd>
<dd>Since there are code components that support both UID2 and EUID, such as the server-side SDKs, the term UID is used as an umbrella term.</dd>
<dd>There are many similarities between UID2 and EUID, but they are completely separate, and their tokens are not interchangeable.</dd>

<dt><MdxJumpAnchor id="gl-uid2-framework"><a href="#gl-uid2-framework">UID2 framework</a></MdxJumpAnchor></dt>
<dd>The Unified ID 2.0 (UID2) framework enables deterministic identity for advertising opportunities on the open internet for many <a href="../intro#participants">participants</a> across the advertising ecosystem. It enables publisher websites, mobile apps, and Connected TV (CTV) apps to monetize through programmatic workflows. Built as an open-source, standalone solution with its own unique namespace, the framework offers privacy controls designed to help participants meet local market requirements.</dd>
<dd>UID2 operates in North America, parts of Asia, and some other regions.</dd>
<dd>There are many similarities between UID2 and EUID, but they are completely separate, and their tokens are not interchangeable.</dd>

<dt><MdxJumpAnchor id="gl-uid2-identifier"><a href="#gl-uid2-identifier">UID2 identifier</a></MdxJumpAnchor></dt>
<dd>There are two Unified ID 2.0 (UID2) identifier types: <a href="#gl-raw-uid2">raw UID2s</a> and <a href="#gl-uid2-token">UID2 tokens</a> (also known as advertising tokens).</dd>
<dd>For details, see <a href="../intro#uid2-identifier-types">UID2 Identifier Types</a>.</dd>

<dt><MdxJumpAnchor id="gl-uid2-portal"><a href="#gl-uid2-portal">UID2 Portal</a></MdxJumpAnchor></dt>
<dd>The UID2 Portal is a separate user interface that allows UID2 participants to manage their accounts.</dd>
<dd>For details, see  <a href="../portal/portal-overview">UID2 Portal: Overview</a>.</dd>

<dt><MdxJumpAnchor id="gl-uid2-service"><a href="#gl-uid2-service">UID2 Service</a></MdxJumpAnchor></dt>
<dd>The Unified ID 2.0 (UID2) service is a set of components, API endpoints, and other types of solutions that collectively implement the <a href="#gl-uid2-framework">UID2 framework</a> and provide clients with access to the relevant UID2 functionality.</dd>
<dd>The term "UID2 service" is also used to mean the UID2 <a href="#gl-operator-service">Operator Service</a>.</dd>

<dt><MdxJumpAnchor id="gl-uid2-token"><a href="#gl-uid2-token">UID2 Token (Advertising Token)</a></MdxJumpAnchor></dt>
<dd>A Unified ID 2.0 (UID2) token, also called an advertising token, is an encrypted form of a <a href="#gl-raw-uid2">raw UID2</a>.</dd>
<dd>UID2 tokens are generated from hashed or unhashed email addresses or phone numbers that are converted to raw UID2s and then encrypted. The UID2 token is a unique value; no two UID2 tokens are the same. UID2 tokens are case sensitive.</dd>
<dd>The token value is opaque: No assumptions should be made about the format or about the length of the string.</dd>
<dd>The token has a limited life, but can be refreshed in the background using the <a href="#gl-refresh-token">refresh token</a>.</dd>
<dd>Publishers send UID2 tokens in the bidstream.</dd>
<dd>For details, see <a href="../intro#uid2-identifier-types">UID2 Identifier Types</a> and <a href="ref-tokens#uid2-tokens-key-information">UID2 Tokens: Key Information</a>.</dd>

<dt><MdxJumpAnchor id="gl-unified-id-20"><a href="#gl-unified-id-20">Unified ID 2.0</a></MdxJumpAnchor></dt>
<dd>The term UID2 can be used to mean the <a href="#gl-uid2-framework">UID2 framework</a>, the <a href="#gl-uid2-service">UID2 service</a>, a <a href="#gl-raw-uid2">raw UID2</a>, or a <a href="#gl-uid2-token">UID2 token</a> (advertising token).</dd>

<dt><MdxJumpAnchor id="gl-unix-time"><a href="#gl-unix-time">Unix time</a></MdxJumpAnchor></dt>
<dd>Unix time, also called Epoch time, is defined as the number of seconds since 00:00:00 <a href="#gl-utc">UTC</a> on Thursday, 1 January 1970. Unix time is used in some UID2 response messages, expressed in milliseconds: for example, in the response to the `POST /token/refresh` endpoint (see <a href="../endpoints/post-token-refresh#successful-response-with-tokens">Successful Response With Tokens</a>).</dd>
<dd>Example: 1 January 2024, 9:00:00 AM GMT, expressed in Unix time, is `1704067200`. In milliseconds it is: `1704067200000`.</dd>

<dt><MdxJumpAnchor id="gl-utc"><a href="#gl-utc">UTC</a></MdxJumpAnchor></dt>
<dd>UTC is an abbreviation for Coordinated Universal Time, also called Zulu time, which is the primary time standard in general use. UTC essentially equates to Greenwich Mean Time (GMT), but is more scientifically precise.</dd>

</dl>
