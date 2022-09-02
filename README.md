# Unified ID 2.0
English | [Japanese](README-ja.md)

This page provides the following information about UID2:
- [Introduction](#introduction)
- [UID2 Infrastructure](#uid2-infrastructure)
- [FAQs](#faqs)
- [License](#license)

For integration guides, supported SDKs, and endpoint reference, see [Getting Started](/api/README.md).

## Introduction

Addressable advertising enables publishers and developers to provide the content and services consumers have come to enjoy, whether through mobile apps, streaming TV, or web experiences. This value exchange has not always been well understood by, or communicated to, consumers. As the industry reduces reliance on the third-party cookie, there is an opportunity to improve how we reach consumers with relevant advertising across the open internet. The solution is an identification system in which content creators and consumers both benefit from improved engagement opportunities with transparent control over consumer data.

Unified ID 2.0 (UID2) is a deterministic identifier based on PII (for example, email or phone number) with user transparency and privacy controls. The UID2 identifier enables logged-in experiences from publisher websites, mobile apps, and CTV apps to monetize through programmatic workflows. Benefitting from several layers of security and privacy measures, UID2s can be safely distributed across the open internet. Initially built and maintained by The Trade Desk, stewardship of UID2 will transfer to independent organizations for open-source code management, governance, administration, and system operations. UID2 is a non-proprietary standard and accessible to constituents across the advertising ecosystem--including Advertisers, Publishers, DSPs, SSPs, SSOs, CDPs, CMPs, Identity Providers, Data Providers, and Measurement Providers--while they remain in compliance with a code of conduct.

UID2’s goal is to enable deterministic identity for advertising opportunities on the open internet with consumer transparency and controls in place. UID2 provides a collaborative framework for all constituents and a healthy, open internet by utilizing a transparent and interoperable approach.

### Guiding Principles

- **First-party relationships:** UID2 enables advertisers to easily activate their first-party data on publisher websites across the open internet.

- **Non-proprietary (universal) standard:** UID2 is accessible to all [participants](#participants) in the advertising ecosystem who abide by the code of conduct.

- **Open source:** UID2 code is transparent thanks to an open-source framework.

- **Interoperable:** UID2 allows other identity solutions (commercial and proprietary) to integrate and provide UID2s with their offerings.

- **Secure and encrypted data:** UID2 leverages multiple layers of security to protect personal and other user data.

- **Consumer control:** Consumers can opt out of UID2 at any time through the [Transparency and Control Portal](https://transparentadvertising.org).

### Technical Design Principles

- **Distributed integration:** Multiple certified integration paths provide options for publishers, advertisers, and data providers to generate UID2s.

- **Decentralized storage:** To block malicious actors, the framework provides no centralized storage of personal data mappings.

- **Lean infrastructure:** Infrastructure is light and inexpensive to operate.

- **Self-reliant:** No reliance on external services for real-time processing of real-time bidding (RTB) data.


## UID2 Infrastructure

The following sections explain and illustrate the key elements of the UID2 infrastructure:

  - [UID2 Types](#uid2-types)
  - [Core Components](#core-components)
  - [Participants](#participants)
  - [Workflows](#workflows)

### UID2 Types

There are two types of UID2s: raw UID2s and UID2 tokens (also known as advertising tokens). The following table explains each type.

| ID Type | Shared in Bid Stream? | Description |
| :--- | :--- | :--- |
| **Raw UID2** | Not shared | An unencrypted alphanumeric identifier created through the UID2 APIs or SDKs with the user's verifiable personal data, such as an email address, as input.<br/><br/>To prevent re-identification of the original personal data, each raw UID2 is generated using a random nonce, an arbitrary number that can be used only once. Raw UID2s are designed to be stored by advertisers, data providers, and demand-side platforms (DSPs).|
| **UID2 (Advertising) Token** | Shared | An encrypted form of a raw UID2. UID2 tokens are generated from hashed or unhashed email addresses that are then encrypted to ensure protection in the bid stream.<br/><br/>UID2 tokens are designed to be used by publishers or publisher service providers. Supply-side platforms (SSPs) pass UID2 tokens in bid stream and DSPs decrypt them at bid request time. |


### Core Components

The administrative UID2 infrastructure consists of the following core components, all of which are currently managed by The Trade Desk.

| Component | Description |
| :--- | :--- |
| **Core Service**  | A centralized service that stores salt secrets, encryption keys, and manages access to the distributed UID2 system. | 
| **Operator Service**  | A service that enables the management and storage of encryption keys and salts from the UID2 Core Service, hashing of users' personal data, encryption and decryption of UID2s. There can be multiple instances of the service (public or private) operated by multiple [participants](#participants), knowns as operators.<br/><br/>Publicly available instances of the Operator Service are run by open operators and are available to all relevant UID2 [participants](#participants). Private instances are run by closed operators exclusively for their own use. All instances are designed with protections to keep critical UID2 data secure, regardless of who operates the service.<br/><br/>NOTE: The Operator Service reflects the scalability level of the UID2 infrastructure—adding more operator service instances increases the load.  | 
| **Opt-out Service**  | A global service that manages user opt-out requests, for example, by routing them to the relevant UID2 data holders. | 
| **Transparency and Control Portal**  | A user-facing website, [https://transparentadvertising.org](https://transparentadvertising.org), that allows consumers to opt out of UID2 at any time. | 


### Participants 

With its transparent and interoperable approach, UID2 provides a collaborative framework for many participants across the advertising ecosystem—advertisers, publishers, DSPs, SSPs, single sign-on (SSO) providers, customer data platforms (CDPs), consent management providers (CMPs), identity providers, data providers, and measurement providers.  

The following table lists the key participants and their roles in the UID2 [workflows](#workflows).

| Participant | Role Description |
| :--- | :--- |
| **Core Administrator**  | An organization (currently, The Trade Desk) that manages the UID2 Core Service and other [components](#core-components), for example, by distributing encryption keys and salts to UID2 operators and sending user opt-outs requests to operators and DSPs. |  
| **Operators**  | Organizations that operate the Operator Service (via the UID2 APIs). Operators receive and store encryption keys and salts from the UID2 Core Service, salt and hash personal data to return UID2s, encrypt UID2s to generate UID2 tokens, and distribute UID2 token decryption keys.<br/><br/>There can be multiple open operators with which participants can choose to work with. Open operators run public instances of the Operator Service, for example, The Trade Desk currently serves as an open operator for UID2 available to all participants.<br/><br/>Any participant can also choose to become a closed operator and operate their own private instance to generate and manage UID2s for their internal use. | 
| **Compliance Manager**  | An organization that audits UID2 participants for compliance with stated rules and relays compliance information to the UID2 administrators and UID2 operators. | 
| **DSPs**  | DSPs integrate with the UID2 system to receive UID2s from brands (as first-party data) and data providers (as third-party data) and leverage them to inform bidding on UID2s in the bid stream. | 
| **Data Providers**  | Organizations that collect user data and push it to DSPs, for example, advertisers, data on-boarders, identity graph providers, and third-party data providers. | 
| **Advertisers**  | Organizations that buy impressions across a range of publisher sites and use DSPs to decide which ad impressions to purchase and how much to bid on them. | 
| **Publishers**  | Organizations that propagate UID2s to the bid stream via SSPs and include identity providers, publishers, and SSOs. Publishers can choose to work with an SSO or an independent ID provider that is interoperable with UID2. The latter can handle the UID2 integration on their behalf. | 
| **Consumers**  | Users who engage with publishers or publisher-related SSOs and identity providers. Users can manage their UID2 consent in the [Transparency and Control Portal]([#opt-out-portal](https://transparentadvertising.org)). | 

## Workflows

The following table lists four key workflows in the UID2 system and provides links to the respective integration guides, which include specific diagrams, integration steps, FAQs, and other relevant information for each workflow.

| Workflow | Intended Primary Participants | Integration Guide |
| :--- | :--- | :--- |
| **Buy-side** | DSPs who transact on UID2s in the bid stream. | [DSP](./api/v2/guides/dsp-guide.md) |
| **Data provider** | Organizations that collect user data and push it to DSPs. | [Advertiser and Data Provider](./api/v2/guides/advertiser-dataprovider-guide.md) |
| **Supply-side** | Organizations that propagate UID2s to the bid stream via SSPs.<br/> NOTE: Publishers can choose to leverage the [UID2 SDK](./api/v2/sdks/client-side-identity.md) or complete their own custom, server-only integration. | [Publisher (with UID2 SDK)](./api/v2/guides/publisher-client-side.md)<br/>[Publisher (Server-Only)](./api/v2/guides/custom-publisher-integration.md) |
| **Opt-out** | Consumers who engage with publishers or publisher-related SSOs and identity providers. | N/A |


The following diagram summarizes all four workflows. For each workflow, the [participants](#participants), [core components](#core-components), [UID2 types](#uid2-types), and numbered steps are color-coded.

![The UID2 Ecosystem](/images/UID2-Workflow.svg)

## FAQs

### Identity

#### How does a holder of UID2 know when to refresh the UID2 due to salt rotation?

Metadata supplied with the UID2 generation request indicates the salt bucket used for generating the UID2. Salt buckets are persistent and assigned to the underlying PII. Use the API provided to return which salt buckets rotated since a given timestamp. The returned rotated salt buckets inform the UID2 holder which UID2s to refresh. This workflow typically applies to data providers.

#### How does a holder of a UID2 token know when to refresh it?

The UID2 token is automatically refreshed as part of the refresh token. This workflow typically applies to publishers and SSOs.

#### How do companies interfacing with UID2 tokens know which decryption key to apply?

Metadata supplies with the UID2 token discloses the timestamp of encryption, which informs which decryption key applies.

### User Trust

#### Can a user opt out of targeted advertising tied to their UID2?

Yes, through the Opt-Out Portal (also known as the [Transparency and Control Portal](https://transparentadvertising.org)), a user can opt out of being served targeted ads tied to their UID2. The request will be distributed through UID2 Administrator and UID2 Operators to all relevant members. Some publishers and service providers have the option to limit access to their products based on a user’s participation in UID2 and it is the publisher’s responsibility to communicate this as part of their value exchange dialogue with the user.

#### How does a user know where to access the Opt-Out Portal?

Publishers, SSOs, or consent management platforms disclose links to the Opt-Out portal in their login/consent flows, privacy policies, and other means.

#### Why do advertisers/data providers not need to integrate with the opt-out feed?

Opt-outs relate to opting out of targeted advertising, which is handled through the publisher and DSP opt-out workflows. If the consumer wishes to disengage with a specific advertiser, they need to contact the advertiser directly.


## License
All work and artifacts are licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.txt).
