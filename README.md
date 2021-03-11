# UID 2.0

| [Click here to visit the UID 2.0 API Documentation](/api/README.md)

## Introduction

Addressable advertising enables publishers and developers to provide the content and services consumers have come to enjoy, whether through mobile apps, streaming TV, or web experiences. This value exchange of the open internet has not always been well understood by, or communicated to, consumers. As the industry reduces reliance on the third-party cookie, we have an opportunity to move towards a new and better approach to identity for the open internet. This improved approach empowers content creators to have the value exchange conversations with consumers while giving them more control and transparency over their data. 

Unified ID 2.0 (UID2) is a deterministic identifier based on PII (for example, email or phone number) with complete user transparency and privacy controls. The UID2 identifier ties together logged-in experiences from publisher websites, mobile apps, and CTV apps. With several layers of security and privacy measures, UID2s safely distribute across the open internet. Initially built by The Trade Desk, responsibility for UID2 will transfer in mid-2021 to independent organizations for open-source code management, governance, administration, and system operations. UID2 is non-proprietary and accessible to constituents across the advertising ecosystem - including Advertisers, Publishers, DSPs, SSPs, SSOs, CDPs, CMPs, Identity Providers, Data Providers, and Measurement Providers - while they remain in compliance with a code of conduct.

UID2’s goal is to enable deterministic identity for advertising opportunities on the open internet with consumer transparency and controls. UID2 provides a collaborative framework for all constituents and a healthy, open internet by utilizing a transparent and interoperable approach.

## Guiding Principles

**Independently Governed:** UID2 will be governed by unbiased third-party organizations, with the transition from The Trade Desk anticipated mid-2021.  

**First-Party Relationships:** UID2 allows advertisers to easily activate their first-party data on publishers across the open internet.

**Nonproprietary:** UID2 is accessible to all constituents in the advertising ecosystem who abide by the code of conduct, and no individual company controls access. This includes DSPs, SSPs, data providers, measurement providers, and identity services. Open Source: UID2 code will be transparent via an open-source framework.

**Interoperable:** UID2 allows other identity solutions to integrate and provide UID2s with their offering.

**Secure and Privacy-Safe:** UID2 leverages multiple layers of security, cryptography, and encryption to secure user data.

**Transparency and Control:** Users understand where their ID is shared and what data is associated with it. Users have control to revoke their consent and permissions.

## Components

### Identity Components

#### UID2

The UID2 (raw UID2) is an unencrypted alphanumeric identifier created through a set of APIs or SDKs using a user’s verifiable and authenticated PII as an input. Examples of PII are an email address or phone number.

A UID2 is designed to be stored by advertisers, data providers, and DSPs and is never shared in the bid stream.

##### Technical Details

- The UID2 Operator API or SDK interface is used to create a UID2.

- The UID2 Operator SHA256 hashes the PII and adds a secret salt to the user’s PII to generate a UID2.

- Each UID2 is assigned a salt bucket. The salt for each bucket rotates once every 12 months. Each salt bucket has an alphanumeric designation between 1 and 1,000,000.

- Members who store UID2s monitor the UID2 Operator API to know when a UID2’s salt bucket rotated.

#### UID2 Token

Encrypting raw UID2s creates UID2 tokens, which are transient for bid stream workflows. By utilizing cryptographic nonces and encryption, the UID2 token is different every time it enters the bid stream. This secures the UID2 ecosystem and prevents non-members from building profiles using UID2 tokens.

UID2 Tokens are designed to be stored by publishers, SSOs, and SSPs. DSPs decrypt them at bid request time.

##### Technical Details

- A cryptographic nonce is generated and appended to the UID2, which is then encrypted to create the UID2 tokens.

  - A nonce is an arbitrary number that may only be used once.
  - AES/CBC/PKCS5P with 256-bit keys are used for encryption and rotate on a daily basis.

- The UID2's encryption timestamp is attached as payload metadata.

### Infrastructure Components

#### Technical Design Principles

**Accountability:** Access requires members to abide by a code of conduct governed an independent body.

**Distributed:** There will be multiple certified integration paths leaving publishers and advertiser with options to generate UID2s.

**Decentralized:** No centralized storage PII to UID2 mapping.

**Lightweight:** Infrastructure is lightweight and inexpensive to operate.

**Self-Reliant:** No reliance on external services for real-time processing of RTB data.

### UID2 Administrator

The centralized service managing access to the distributed UID2 ecosystem.

#### Functions

- Distribute encryption keys and salts to UID2 Operators.

- Distribute decryption keys to compliant members for use in decrypting UID2 tokens.

- Send UID2 user opt-outs requests to Operators and DSPs.

### UID2 Operator

Organizations that operate the API to generate and manage UID2s and UID2 tokens. Multiple operators comprise the UID2 infrastructure. Participants may select an operator they are most comfortable with or may choose to become an operator themselves.

#### Functions

- Receive and store encryption keys and salts from the UID2 Administrator service.

- Salt and hash authenticated PII to return a UID2.

- Encrypt UID2s to generate UID2 Tokens.

- Broadcast UID2 token updates (includes handling opt outs and salt bucket rotations) to publishers utilizing the refresh token.

### Transparency and Control Portal

The service providing a user-facing website and an underlying API to enable user Transparency and Control management. See the User Trust Workflow section for more information.

#### Functions

- Offers transparency to users about their UID2 usage.

- Provides users a way to globally opt out of UID2, which triggers opt-out requests to all UID2 data holders. 



























## License
All work and artifacts are licensed under the Apache License, Version 2.0. See [LICENSE](http://www.apache.org/licenses/LICENSE-2.0.txt) for the full license text.
