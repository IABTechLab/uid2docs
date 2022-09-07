# Unified ID 2.0 Framework Overview
English | [Japanese](README-ja.md)

This page provides the following information about the Unified ID 2.0 (UID2) framework:
- [Introduction](#introduction)
- [UID2 Infrastructure](#uid2-infrastructure)
- [FAQs](#faqs)
- [License](#license)

For integration guides, supported SDKs, and endpoint reference, see [Getting Started](/api/README.md).

## Introduction

UID2 is a collaborative framework that enables deterministic identity for advertising opportunities on the open internet for many [participants](#participants) across the advertising ecosystem. The UID2 framework enables logged-in experiences from publisher websites, mobile apps, and Connected TV (CTV) apps to monetize through programmatic workflows. Built as an open-source, standalone solution with its own unique namespace, the framework offers the user transparency and privacy controls to meet the market requirements outside Europe and the UK. 

>NOTE: The term "UID2" can refer to either the framework or an actual identifier or identity. As identifiers, UID2s are part of the UID2 framework [infrastructure](#uid2-infrastructure) and in turn be one of [two types](#uid2-identifier-types) (raw UID2s and UID2 tokens). Unless otherwise indicated, this page provides an overview of the UID2 framework, while most of the [API documentation](/api/v2/README.md) is about generating and using UID2 tokens. 

### Guiding Principles

The UID2 framework has the following open market principles as its foundation:

- **First-party relationships**: UID2 enables advertisers to easily activate their first-party data on publisher websites across the open internet.

- **Non-proprietary (universal) standard**: UID2 is accessible to all [participants](#participants) in the advertising ecosystem who abide by the code of conduct.

- **Open source**: UID2 code is transparent thanks to an open-source framework.

- **Interoperable**: The framework allows other identity solutions (commercial and proprietary) to integrate and provide UID2 tokens with their offerings.

- **Scalable**: As demand increases, the UID2 ecosystem can achieve scale by adding more [operators](#participants). 

- **Secure and encrypted data**: UID2 leverages multiple layers of security to protect personal and other user data.

- **Consumer control**: Consumers can opt out of UID2 at any time through the [Transparency and Control Portal](https://transparentadvertising.org).

### Technical Design Principles

The UID2 framework is built on the following technical principles:

- **Distributed integration**: Multiple certified integration paths provide options for publishers, advertisers, and data providers to generate UID2s.

- **Decentralized storage**: To block malicious actors, the framework provides no centralized storage of personal data mappings.

- **Lean infrastructure**: Infrastructure is light and inexpensive to operate.

- **Self-reliant**: No reliance on external services for real-time processing of real-time bidding (RTB) data.


## UID2 Infrastructure

The following sections explain and illustrate the key elements of the UID2 framework infrastructure:

  - [UID2 Types](#uid2-identifier-types)
  - [Core Components](#core-components)
  - [Participants](#participants)
  - [Workflows](#workflows)

### UID2 Identifier Types

As an identifier, UID2 is a deterministic ID that is based on personally identifiable information (PII), such as email address or phone number. There are two types of UID2s: raw UID2s and UID2 tokens (also known as advertising tokens). The following table explains each type.

| ID Type | Shared in Bid Stream? | Description |
| :--- | :--- | :--- |
| **Raw UID2** | Not shared | An unencrypted alphanumeric identifier created through the UID2 APIs or SDKs with the user's verifiable personal data, such as an email address, as input.<br/><br/>To prevent re-identification of the original personal data, each raw UID2 is generated using a secret salt. Raw UID2s are designed to be stored by advertisers, data providers, and demand-side platforms (DSPs).|
| **UID2 (Advertising) Token** | Shared | An encrypted form of a raw UID2. UID2 tokens are generated from hashed or unhashed email addresses or phone numbers that are converted to raw UID2s and then encrypted to ensure protection in the bid stream.<br/><br/>UID2 tokens are designed to be used by publishers or publisher service providers. Supply-side platforms (SSPs) pass UID2 tokens in the bid stream and DSPs decrypt them at bid request time. |


### Core Components

The UID2 framework consists of the following core components, all of which are currently managed by The Trade Desk.

| Component | Description |
| :--- | :--- |
| **Core Service**  | A centralized service that stores salt secrets and encryption keys and manages access to the distributed UID2 system. | 
| **Operator Service**  | A service that enables the management and storage of encryption keys and salts from the UID2 Core Service, hashing of users' personal data, and encryption and decryption of UID2s. There can be multiple instances of the service (public or private) operated by multiple [participants](#participants), known as operators.<br/><br/>Open operators run publicly available instances of the Operator Service and make them available to all relevant UID2 [participants](#participants). There might also be closed operators that run private instances of the Operator Service exclusively for their own use. All instances are designed with protections to keep critical UID2 data secure and interoperable, regardless of who operates the service. | 
| **Opt-Out Service**  | A global service that manages and stores user opt-out requests and disseminates them to operator service instances and DSPs. | 
| **Transparency and Control Portal**  | A user-facing website, [https://transparentadvertising.org](https://transparentadvertising.org), that allows consumers to opt out of UID2 at any time. | 


### Participants 

With its transparent and interoperable approach, the UID2 framework provides a collaborative framework for many participants across the advertising ecosystem—advertisers, publishers, DSPs, SSPs, single sign-on (SSO) providers, customer data platforms (CDPs), consent management providers (CMPs), identity providers, data providers, and measurement providers.  

The following table lists the key participants and their roles in the UID2 [workflows](#workflows).

| Participant | Role Description |
| :--- | :--- |
| **Core Administrator**  | An organization (currently, The Trade Desk) that manages the UID2 Core Service and other [components](#core-components). For example, it distributes encryption keys and salts to UID2 operators and sends user opt-out requests to operators and DSPs. |  
| **Operators**  | Organizations that run the Operator Service (via the UID2 APIs). Operators receive and store encryption keys and salts from the UID2 Core Service, salt and hash personal data to return UID2s, encrypt raw UID2s to generate UID2 tokens, and distribute UID2 token decryption keys.<br/><br/>Open operators run public instances of the Operator Service. For example, The Trade Desk currently serves as an open operator for UID2, available to all participants. If other open operators are available, a participant can choose which operator to work with.<br/><br/>Any participant can also choose to become a closed operator and operate their own private instance to generate and manage UID2s. | 
| **Compliance Manager**  | An organization that audits UID2 participants for compliance with stated rules and relays compliance information to the UID2 administrators and UID2 operators. | 
| **DSPs**  | DSPs integrate with the UID2 system to receive UID2s from brands (as first-party data) and data providers (as third-party data) and leverage them to inform bidding on UID2s in the bid stream. | 
| **Data Providers**  | Organizations that collect user data and push it to DSPs—for example, advertisers, identity graph providers, and third-party data providers. | 
| **Advertisers**  | Organizations that buy impressions across a range of publisher sites and use DSPs to decide which ad impressions to purchase and how much to bid on them. | 
| **Publishers**  | Organizations that propagate UID2s to the bid stream via SSPs—for example,  identity providers, publishers, and SSO providers. Publishers can choose to work with an SSO provider or an independent ID provider that is interoperable with UID2. The latter can handle the UID2 integration on behalf of publishers. | 
| **Consumers**  | Users who engage with publishers or their identity providers. Users can manage their UID2 consent in the [Transparency and Control Portal]([#opt-out-portal](https://transparentadvertising.org)). | 

## Workflows

The following table lists four key workflows in the UID2 framework and provides links to the respective integration guides, which include specific diagrams, integration steps, FAQs, and other relevant information for each workflow.

| Workflow | Intended Primary Participants | Integration Guide |
| :--- | :--- | :--- |
| **Buy-side** | DSPs who transact on UID2s in the bid stream. | [DSP](./api/v2/guides/dsp-guide.md) |
| **Data provider** | Organizations that collect user data and push it to DSPs. | [Advertiser and Data Provider](./api/v2/guides/advertiser-dataprovider-guide.md) |
| **Supply-side** | Organizations that propagate UID2s to the bid stream via SSPs.<br/> NOTE: Publishers can choose to leverage the [UID2 SDK](./api/v2/sdks/client-side-identity.md) or complete their own custom, server-only integration. | [Publisher (with UID2 SDK)](./api/v2/guides/publisher-client-side.md)<br/>[Publisher (Server-Only)](./api/v2/guides/custom-publisher-integration.md) |
| **Opt-out** | Consumers who engage with publishers or their SSO providers and other identity providers. | N/A |


The following diagram summarizes all four workflows. For each workflow, the [participants](#participants), [core components](#core-components), [UID2 types](#uid2-identifier-types), and numbered steps are color-coded.

![The UID2 Ecosystem](/images/UID2-Workflow.svg)

## FAQs

Here are some commonly asked questions regarding the UID2 framework.


#### Can a user opt out of targeted advertising tied to their UID2 identity?

Yes, through the [Transparency and Control Portal](https://transparentadvertising.org), a user can opt out from being served targeted ads tied to their UID2 identity. The request is distributed through the UID2 Opt-Out Service and UID2 Operators to all relevant participants. 

Some publishers and service providers have the option to limit access to their products based on a user’s participation in the UID2 framework, and it is the publisher’s responsibility to communicate this as part of their value exchange dialog with the user.

#### How does a user know where to access the opt-out portal?

Publishers, SSO providers, or consent management platforms disclose links to the [Transparency and Control Portal](https://transparentadvertising.org) in their login flows, consent flows, privacy policies, and other means.

#### Why do advertisers and data providers not need to integrate with the opt-out feed?

Opt-outs relate to opting out of targeted advertising, which is handled through the publisher and DSP opt-out [workflows](#workflows). If the consumer wants to disengage from a specific advertiser, they need to contact the advertiser directly.


## License
All work and artifacts are licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.txt).
