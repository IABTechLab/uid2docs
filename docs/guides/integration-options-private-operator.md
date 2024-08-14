---
title: Private Operator Integration Overview
description: Overview of UID2 Private Operator options.
hide_table_of_contents: false
sidebar_position: 02
---

import Link from '@docusaurus/Link';

# Private Operator Integration Overview

xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx



REQUIREMENTS!

Here are some key points that all UID2 Private Operator implementations have in common:



Private Operator Security Model (maybe, for a heading)

Private Operators: key points? How does the Private Operator work? Private Operator model/workflow?

## Basic points

Every Private Operator runs in an enclave (AWS), confidential space (GCP), or confidential computing environment, (Azure). Each of these ensures that the Operator runs in a protected memory space.

## Private Operator Workflow

On startup, the Private Operator goes through an attestation process with the Core service. The attestation process verifies that the Operator is running in a known and trusted environment, and that the environment hasn't been tampered with.

Once the Operator passes that attestation process, it can retrieve the security information that it needs to process UID2s, such as salts, encryption keys, and user opt-out records.

we might want to say something like Operators receive an S3 URL from Core and then they retrieve their information from Amazon S3. This information on S3 is encrypted at rest and is encrypted in transit through TLS.

If an Operator is restarted, it goes through that process again. It does not store any of that information locally.

The information is only ever in memory, and the Operator is running in a protected environment that makes it difficult for anyone running the Operator, as well as any external players, to see the data that's in memory.

The Operator re-attests periodically with Core to ensure that it is still running in a protected environment. If any compromise is detected, the Operator shuts down.

The information exchange between the Core service and the Opt-Out service is secured using TLS. (**GWH_TM01: is this actually part of the Private Operator?**)

----------------------------------


Thomas: If we're going to do that, I would start with one that says what is an enclave or slash confidential computing, slash, confidential container. And what is it and why does the Operator run in it? I'd you. I'd make that in one point, and then we'd say it is a : memory hardened virtual machine that prevents access even from administrators being able to download any conf any information from the machine, from the virtual machine. Something like that.

If we wanted to have that point on, how does a private operator access salts and other information from the Core services, we would kind of reiterate that when an Operator starts up, it goes through an attestation process with Core to determine that it's running in a secure memory-hardened environment that hasn't been tampered with. Once it passes that process it is given the S3 URLs to be able to download that information.

----------------------------------









----------------------------------

Thomas: That language there. When we talk about how Operators get their information from Core, we could use the same: They basically, they talk to Core, they get an S3 address from Core, and they use that address to download their data.

That's kind of what Operators do. They talk to Core, Core gives them back an S3 URL, they use that to download their data.

People integrating would need to know that because they know that typically when they're putting an Operator into a production environment, you need to say, who is it going to talk to? What address is it allowed to talk to, so they've got to allow it to talk to S3. If they don't, it won't work, so they need to know that. But they don't need to know it's pre-signed.





## Other notes, suggestions, comments

Andrei: "how do Private Operators work behind the scenes, including security property requirements? "

On this page, you'll find a high-level overview of integration steps and integration options, with links to additional information for each option.


------------------------------ the external PR suggestions re Private Operator: ------------------------------------

#### Why does a Private Operator need to run in an enclave?

The Private Operator runs in an [enclave](../ref-info/glossary-uid.md#gl-enclave) (confidential space) because the Operator manages DII along with salt values. This is an extra layer of security so no one can see the salt values used to produce raw UID2s, and instead only the salt bucket ID is stored outside the Operator.

#### How does a Private Operator access the salt values from the core service?
A Private Operator does not need any special authentication to retrieve salts. The Operator uses presigned S3 URLs to retrieve files. The only access requirement is the Operator needs outbound and inbound network access to S3.

------------------------------ the external PR suggestions re Private Operator: ------------------------------------


---------------------------------------- below is legacy copy from Web Publisher Integrations page ----------------------------------------

## Key Integration Steps

At a high level, to integrate with UID2, you'll implement these three key activities:

1. [Generate the UID2 token](#generate-the-uid2-token)
1. [Refresh the UID2 token as needed](#refresh-the-uid2-token)
1. [Pass the UID2 token into the bidstream](#pass-the-uid2-token-into-the-bidstream)

There are many ways you can accomplish these key steps. The simplest and fastest implementation is a full client-side implementation using Prebid.js 8.21.0 or later.

## Integration Options Summary

The following table summarizes the solutions available for each integration step.

To accomplish all steps, you can combine solutions. For example, you could use the SDK for JavaScript, client-side, to generate and refresh the token, and Google Ad Manager Secure Signals to pass the token to the bidstream.

| Integration Solution | Generate Token | Refresh Token |Pass Token to the Bidstream |
| :--- | :--- | :--- | :--- |
| [Prebid.js client-side (8.21.0 or later)](integration-prebid-client-side.md) | &#9989; | &#9989; | &#9989; |
| [Prebid.js client-server (7.53.0 or later)](integration-prebid-client-server.md) | &#8212; | &#9989; | &#9989; |
| [SDK for JavaScript, client-side](integration-javascript-client-side.md) | &#9989; | &#9989; | &#8212; |
| [SDK for JavaScript, server-side](integration-javascript-client-server.md) | &#9989; | &#9989; | &#8212; |
| [SDK for Java](../sdks/sdk-ref-java.md) | &#9989; | &#9989; | &#8212; |
| [SDK for Python](../sdks/sdk-ref-python.md) | &#9989; | &#9989; | &#8212; |
| [Direct integration (API endpoints)](integration-publisher-server-side.md) | &#9989; | &#9989; | &#8212; |
| [Google Ad Manager Secure Signals](google-ss-integration.md) | &#8212; | &#8212; | &#9989; |

<!-- &#9989; = Supported | &#8212; = Not Supported -->

To choose your implementation and get started, follow these steps:

1. Review the summary of options to generate a UID2 token:
   - [Client-Side Integration Options](#client-side-integration-options)
   - [Server-Side Integration Options](#server-side-integration-options)
1. Review the options to [refresh the UID2 token](#refresh-the-uid2-token).
1. Review the options to [pass the token into the bidstream](#pass-the-uid2-token-into-the-bidstream).
1. Choose the option that's best for you, and then click through to the implementation documentation.

## Generate the UID2 Token

There are two main paths that you can choose to generate a UID2 token&#8212;you can choose to initiate the UID2 token generate request:

- On the client side (in the user's browser): see [Client-Side Integration Options](#client-side-integration-options).
- On the server side: see [Server-Side Integration Options](#server-side-integration-options).

Each option has different advantages. We recommend client-side integration using Prebid.js 8.21.0 or later as the easiest and fastest integration option.

:::note
For all integration options, you can choose to store the UID2 token in local storage or cookie storage.
:::

### Client-Side Integration Options

Generating the UID2 token on the client side has the following advantages:

- The code runs on the client side, on the consumer's web page, and no server-side coding is required.
- There is a Prebid integration that handles all functions for you&#8212;token generation, token refresh, and passing the token into the bidstream. If you use Prebid 8.21.0 or later, this is the simplest and fastest implementation option.

If you choose a client-side integration, you'll need to provide a list of your root-level domains, for security purposes, as part of account setup. For details, see [Client-Side Implementation for Publishers](../getting-started/gs-account-setup.md#client-side-implementation-for-publishers) on the Account Setup page.

The following table summarizes the options for publishers who want to generate the UID2 token on the client side, via the web page, with corresponding documentation resources.

| Option | Documentation |
| :--- | :--- |
| Prebid.js client-side implementation (8.21.0 or later) | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| SDK for JavaScript, client-side implementation | [Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md) |

### Server-Side Integration Options

Generating the UID2 token on the server side has the following advantages:

- You can keep your <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link> entirely on the server side.
- If your development resources are back-end developers, you might prefer a server-side integration.
- For server-side Prebid integration, there is no requirement to update to the latest Prebid version, as long as your version is 7.53.0 or later.

The following table summarizes the options for publishers who want to generate the UID2 token on the server side.

<!-- (**GWH_SW His query: "why is Prebid.js server integration not listed here?" I thought the server-side option didn't support token/generate + per KK's diagram. Let's discuss. Affects summary table also.**) -->

| Option | Documentation |
| :--- | :--- |
| SDK for JavaScript, client-server implementation | [Client-Server Integration Guide for JavaScript](integration-javascript-client-server.md) |
| SDK for Java | - [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md)<br/>- [SDK for Java](../sdks/sdk-ref-java.md) |
| SDK for Python | - [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md)<br/>- [SDK for Python](../sdks/sdk-ref-python.md)  |
| Direct integration (API endpoints) | [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md) |

## Refresh the UID2 Token

For security reasons, the UID2 token has a limited life, but there is a built-in mechanism to refresh the token so that you can still use it.

When you get the token, it comes with a refresh token and a time stamp indicating how long the token is valid for. As long as you use the refresh token to generate a new UID2 token before the current UID2 token expires, you'll get a new UID2 token and an updated refresh token each time. You can continue to refresh to keep the information valid.

The following table shows the integration options that support refreshing the UID2 token.

| Option | Documentation |
| :--- | :--- |
| Prebid.js client-side implementation (8.21.0 or later) | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| Prebid.js client-server implementation (7.53.0 or later) | [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md) |
| SDK for JavaScript, client-side implementation | [Client-Side Integration Guide for JavaScript](integration-javascript-client-side.md) |
| SDK for JavaScript, client-server implementation | [Client-Server Integration Guide for JavaScript](integration-javascript-client-server.md) |
| SDK for Java | - [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md)<br/>- [SDK for Java](../sdks/sdk-ref-java.md) |
| SDK for Python | - [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md)<br/>- [SDK for Python](../sdks/sdk-ref-python.md)  |
| Direct integration (API endpoints) | [Publisher Integration Guide, Server-Side](integration-publisher-server-side.md) |

## Pass the UID2 Token Into the Bidstream

Publishers use UID2s by encrypting DII (email addresses or phone numbers) into UID2 tokens and then sending the UID2 tokens into the bidstream.

The following table shows integration options that support passing UID2 token into the bidstream.

| Option | Documentation |
| :--- | :--- |
| Prebid.js client-side implementation (8.21.0 or later) | [UID2 Client-Side Integration Guide for Prebid.js](integration-prebid-client-side.md) |
| Prebid.js client-server implementation (7.53.0 or later) | [UID2 Client-Server Integration Guide for Prebid.js](integration-prebid-client-server.md) |
| Google Ad Manager Secure Signals| [Google Ad Manager Secure Signals Integration Guide](google-ss-integration.md) |

:::note
As long as you generate the token and keep it refreshed, you can also use other options for passing the UID2 token into the bidstream.
:::




