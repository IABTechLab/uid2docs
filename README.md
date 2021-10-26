# UID 2.0
English | [Japanese](README-ja.md)

This page provides the following information about UID2:
- [Introduction](#introduction)
- [ID Forms](#id-forms)
- [Components](#components)
- [Roles](#roles)
- [Workflow Summaries](#workflow-summaries)
- [FAQs](#faqs)
- [License](#license)

For integration guides, supported SDKs, and endpoint reference, see [UID 2.0 API Documentation](/api/README.md).

## Introduction

Addressable advertising enables publishers and developers to provide the content and services consumers have come to enjoy, whether through mobile apps, streaming TV, or web experiences. This value exchange of the open internet has not always been well understood by, or communicated to, consumers. As the industry reduces reliance on the third-party cookie, there is an opportunity to improve how we identify consumers in the open internet. The solution is an identification system in which content creators and consumers both benefit from improved engagement opportunities with transparent control over consumer data.

Unified ID 2.0 (UID2) is a deterministic identifier based on PII (for example, email or phone number) with user transparency and privacy controls. The UID2 identifier enables logged-in experiences from publisher websites, mobile apps, and CTV apps to monetize through programmatic workflows. Benefitting from several layers of security and privacy measures, UID2s safely distribute across the open internet. Initially built and maintained by The Trade Desk, stewardship of UID2 will transfer (in mid-2021) to independent organizations for open-source code management, governance, administration, and system operations. UID2 is a non-proprietary standard and accessible to constituents across the advertising ecosystem--including Advertisers, Publishers, DSPs, SSPs, SSOs, CDPs, CMPs, Identity Providers, Data Providers, and Measurement Providers--while they remain in compliance with a code of conduct.

UID2’s goal is to enable deterministic identity for advertising opportunities on the open internet with consumer transparency and controls in place. UID2 provides a collaborative framework for all constituents and a healthy, open internet by utilizing a transparent and interoperable approach.

### Guiding Principles

**Independent Government:** UID2 will be governed by unbiased third-party organizations, with the transition from The Trade Desk anticipated in 2021.

**First-Party Relationships:** UID2 allows advertisers to easily activate their first-party data on publishers across the open internet.

**Non-Proprietary (Universal) Standard:** UID2 is accessible to all constituents in the advertising ecosystem who abide by the code of conduct, and no individual company controls access. This includes DSPs, SSPs, data providers, measurement providers, and identity services. 

**Open Source:** UID2 code will be transparent via an open-source framework.

**Interoperable:** UID2 allows other identity solutions (commercial and/or proprietary) to integrate and provide UID2s with their offering.

**Secure and Encrypted Data:** UID2 leverages multiple layers of security, cryptography, and encryption to secure PII and user data.

**Transparency and Control:** Consumers understand where their ID is shared and what data is associated with it. Consumers also hold the right to revoke their consent and permissions.

### Technical Design Principles

**Accountability:** Access requires members to abide by a code of conduct governed by an independent body.

**Distributed Integration:** Multiple certified integration paths provide options for publishers, advertisers, and data providers to generate UID2s.

**Decentralized Storage:** Centralized location with PII-to-UID2 mapping has been eliminated to block malicious actors.

**Lean Infrastructure:** Infrastructure is light and inexpensive to operate.

**Self-Reliant:** No reliance on external services for real-time processing of RTB data.

## ID Forms

### UID2

The UID2 (raw UID2) is an unencrypted alphanumeric identifier created through a set of APIs or SDKs using a user’s verifiable and authenticated PII as an input. Examples of PII are an email address or phone number.

A UID2 is designed to be stored by advertisers, data providers, and DSPs and is never shared in the bid stream. Note that the UID2 Token (or encrypted form of the UID2) is shared in the bid stream.

#### Technical Details

- The UID2 Operator API or SDK interface is used to create a UID2.

- The UID2 Operator SHA256 hashes the PII and adds a secret salt to the user’s PII to generate a UID2.

- Each UID2 is assigned a salt bucket. The salt for each bucket rotates once every 12 months. Each salt bucket has an alphanumeric designation between 1 and 1,000,000.

- Participants who store UID2s monitor the UID2 Operator API to know when a UID2’s salt bucket rotated.

### UID2 Token

Encrypting raw UID2s creates UID2 Tokens, which are transient for bid stream workflows. By utilizing cryptographic nonces and encryption, the UID2 Token is different every time it enters the bid stream. This secures the UID2 ecosystem and prevents non-UID2 participants from building profiles using UID2 tokens.

UID2 Tokens are designed to be stored by publishers or publisher service providers (for example, SSOs). SSPs pass the UID2 Token in bid stream and DSPs decrypt them at bid request time.

#### Technical Details

- A cryptographic nonce is generated and appended to the UID2, which is then encrypted to create the UID2 Tokens.

  - A nonce is an arbitrary number that may only be used once.
  - AES/CBC/PKCS5P with 256-bit keys are used for encryption and rotate on a daily basis.

- The UID2's encryption timestamp is attached as payload metadata.

## Components

![Infrastructure](/images/key_mgmt.jpg)

### Administrator

The centralized service managing access to the distributed UID2 System.

#### Functions

- Distribute encryption keys and salts to UID2 Operators.

- Distribute decryption keys to compliant members for use in decrypting UID2 tokens.

- Send UID2 user opt-outs requests to Operators and DSPs.

### Open Operators

Organizations that operate the service (via an API) to generate and manage UID2s and UID2 tokens and are accessible to all participants. 

There are multiple operators that comprise the UID2 System and participants may choose to work with any of them or become a Closed Operator (see below).

#### Functions

- Receive and store encryption keys and salts from the UID2 Administrator service.

- Salt and hash authenticated PII to return a UID2.

- Encrypt UID2s to generate UID2 Tokens.

- Broadcast UID2 token updates (includes handling opt outs and salt bucket rotations) to publishers utilizing the refresh token.

### Closed Operators

Organizations that operate their own internal version of the service to generate and manage UID2s and UID2 tokens. Any participant may choose to be a Closed Operator and there are multiple integration paths through cloud providers.

For details on setting up Closed Operator services, see [Operator Integration Guides](/api/v1/guides/README.md).

#### Functions

- Receive and store encryption keys and salts from the UID2 Administrator service.

- Salt and hash authenticated PII to return a UID2.

- Encrypt UID2s to generate UID2 Tokens.

- Broadcast UID2 token updates (includes handling opt outs and salt bucket rotations) to publishers utilizing the refresh token.

### Opt-Out Portal

The service providing a user-facing website (https://transparentadvertising.org/) to provide a user with opt-out functionality of their UID2.

#### Functions

- Offers transparency to users about their UID2.

- Provides users a way to globally opt out of UID2, which triggers opt-out requests to all UID2 data holders.

### UID2 Compliance Manager

This organization audits all the participant UID2 parties for compliance against stated rules.

#### Functions

- Audit members of the trusted UID2 ecosystem to determine their compliance.

- Relay compliance information to the UID2 Administrators and UID2 Operators.

## Roles

UID2 Participants must choose a predefined role (or roles) based on how they will be leveraging UID2. The Role determines how a given UID2 Participant interacts with the UID2 System. The role also determines their code of conduct requirements and corresponding compliance checks.

UID2 Participants can play more than one role.

**Generator:** Parties that generate UID2 values from the email or phone numbers with the appropriate consent, and honor opt outs.

Responsibilities:
- Register with the Administrator to access API keys.
-	Receive consent from consumer to generate a UID 2.0 from PII and use the UID 2.0 for advertising purposes.
-	Provide consumers with access to the Opt-out Portal to manage their UID 2.0 consent.
-	Generate UID 2.0 via integration with a Closed Operator or Open Operator.
-	Honor opted-out UID2s.
-	Keep the UID2 Tokens refreshed.

Examples: Publishers, Advertisers, Data Providers, Onboarders, Login Providers

**Observer:** Parties that receive and store UID2s from Generators and apply for advertising targeting and measurement purposes.

Responsibilities:
- Register with the Administrator to access API keys.
-	Provide consumers with access to the Opt-out Portal to manage their UID 2.0 consent.
-	Decrypt the UID2s via the UID2 decryption library.
-	Honor opted-out UID2s.

Examples: DSPs, Measurement Providers, Advertisers

## Workflow Summaries

There are four key workflows that make up the UID2 ecosystem:
1. [Buy-Side Workflow](#buy-side-workflow)
2. [Data Provider Workflow](#data-provider-workflow)
3. [Publisher Workflow](#publisher-workflow)
4. [User Trust Workflow](#user-trust-workflow)

**Summary of Workflows**

![The UID2 Ecosystem](/images/macro_view.jpg)

The following sections drill down on each workflow separately to further illuminate their place in the entire UID2 process.

### Buy-Side Workflow

![Buy-Side Workflow](/images/buy_side.jpg)

This workflow is for DSPs who transact on UID2s in the bid stream.

#### Buy-Side (DSP) Workflow Overview

1. Data providers pass first-party and third-party data to DSPs in the form of raw UID2s.
2. DSPs sync with UID2 Administrator to receive decryption keys.
3. DSPs access UID2 tokens in the bid stream and decrypt them at bid time.
4. DSPs listen to opt-out requests from UID2 Administrator and block buying on any UID2 that has opted-out.

#### Buy-Side Integration

DSPs integrate with UID2 to receive UID2s from brands (as first-party data) and data providers (as third-party data) and leverage them to inform bidding on UID2s in the bid stream.

##### Requirements

- Accept data in the form of UID2s
- Bid on data in the form of UID2s
- Build a webhook for honoring opt-out requests
- Sync encryption keys daily with the UID2 Administrator

##### Optional
If a DSP wants to generate UID2s themselves from email, they also follow the Data Provider Workflow (see below).

### Data Provider Workflow

![Data Provider Workflow](/images/data_provider.jpg)

This workflow is for organizations that collect user data and push it to DSPs. Data collectors include advertisers, data on-boarders, measurement providers, identity graph providers, third-party data providers, and other organizations who push data to DSPs.

#### Data Provider Workflow Overview

1. Data provider sends a user’s consented personally identifiable information (PII) to the UID2 Operator.
2. UID2 Operator generates and returns a raw UID2.
3. Data provider stores the UID2 and salt bucket.
    - Server-side: The data provider stores the UID2 in a mapping table, DMP, data lake, or other server-side application.
4. Data provider sends the UID2 to a DSP using permitted transport protocols defined in the code of conduct.
5. Data provider monitors the UID2 Operator for rotated salt buckets and updates UID2s as needed.

#### Data Provider Integration

To generate UID2s from authenticated PII, data providers must access the UID2 Operator APIs. Some advertisers may choose to work through CDPs, data on-boarders, or other service providers instead.

See also [Advertiser/Data Provider Integration Guide](/api/v1/guides/advertiser-dataprovider-guide.md).

##### Requirements

- Integrate with the UID2 Operator to generate UID2s and handle salt bucket rotations.

### Publisher Workflow

![Publisher Workflow](/images/publisher_workflow.jpg)

This workflow is for organizations that propagate IDs to the bid stream via SSPs. Publisher organizations include identity providers, publishers, and SSOs.

#### Publisher Workflow Overview

1. A user visits a publisher website, mobile app, or CTV app.
2. The publisher explains the value exchange of the open internet and requests the user log in.
3. Once the user authenticates, the publisher sends the first-party authenticated PII and corresponding privacy settings to the UID2 Operator via an SDK or direct API integration. A publisher may authorize an SSO provider or identity provider to pass PII and privacy settings on their behalf.
4. The UID2 Operator performs the salt, hash, and encryption process and returns the UID2 Token.
5. The publisher stores the UID2 Token to share with SSPs during real-time bidding.
    a. Server-side: The publisher stores the token in a mapping table, DMP, data lake, or other server-side application.
    b. Client-side: The publisher stores the token in a client-side app or in the user’s browser as a first-party cookie.
6. The publisher sends the UID2 token to the SSP at the time of impression.
7. The SSP places a bid request using the UID2 token, capturing it in the bid stream.
8. The publisher requests updated UID2 tokens using a refresh token. When applicable, the refresh token includes a user’s opt-out request.

#### Publisher Integration

For integration scenarios, token management, and other details, see [Publisher Integration Guides](/api/v1/guides/README.md). See also [Endpoints](/api/v1/endpoints/README.md).

##### Publisher Direct Integration

Publishers who want to send authenticated PII and generate UID2s need to access the UID2 Operator API.

##### Requirements

- Integrate with UID2 Operator API to generate UID2 tokens
- Maintain refresh tokens or use the JavaScript client-side SDK provided by UID2 to manage the refresh token.
- Enable sending the UID2 token to SSPs and other integrating organizations.

##### Publisher Integration Through SSO or Identity Providers

Publishers may choose to work with an SSO or independent ID provider who is interoperable with UID2. The provider may handle the UID2 integration on their behalf.

#### User Trust Workflow

![User Trust Workflow](/images/user_trust_workflow.jpg)

This workflow is for users engaging with publishers or publisher-related SSOs and identity providers. This workflow allows a user to consent to the creation of a UID2 and manage their UID2 consent and privacy settings in the Opt-Out Portal.

#### User Trust Workflow Overview

1. Users visit the Opt-Out Portal where they can globally opt-out of UID2 for all publishers.
2. Opt-out requests are sent to UID2 Administrator.
3. UID2 Administrators distribute the request to DSPs.
4. UID2 Operators distribute the request to publishers utilizing the refresh token.

## FAQs

### Identity

#### How does a holder of UID2 know when to refresh the UID2 due to salt rotation?

Metadata supplied with the UID2 generation request indicates the salt bucket used for generating the UID2. Salt buckets are persistent and assigned to the underlying PII. Use the API provided to return which salt buckets rotated since a given timestamp. The returned rotated salt buckets inform the UID2 holder which UID2s to refresh. This workflow typically applies to data providers.

#### How does a holder of a UID2 token know when to refresh it?

The UID2 token is automatically refreshed as part of the refresh token. This workflow typically applies to publishers and SSOs.

#### How do companies interfacing with UID2 tokens know which decryption key to apply?

Metadata supplies with the UID2 token discloses the timestamp of encryption, which informs which decryption key applies.

### User Trust

#### Can a user opt-out of targeted advertising tied to their UID2?

Yes, through the Opt-Out Portal, a user can opt-out of being served targeted ads tied to their UID2. The request will be distributed through UID2 Administrator and UID2 Operators to all relevant members. Some publishers and service providers have the option to limit access to their products based on a user’s participation in UID2 and it is the publisher’s responsibility to communicate this as part of their value exchange dialogue with the user.

#### How does a user know where to access the Opt-Out Portal?

Publishers, SSOs, or consent management platforms disclose links to the Opt-Out portal in their login/consent flows, privacy policies, and other means.

#### Why do advertisers/data providers not need to integrate with the opt-out feed?

Opt-outs relate to opting out of targeted advertising, which is handled through the publisher and DSP opt-out workflows. If the consumer wishes to disengage with a specific advertiser, they need to contact the advertiser directly.


## License
All work and artifacts are licensed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0.txt).
