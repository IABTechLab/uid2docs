---
title: API Keys
description: Learn about the API keys you'll need and how to get them.
hide_table_of_contents: false
sidebar_position: 03
---

# API Keys

Each UID2 <a href="/docs/intro#participants">participant</a> has an API key, also called a client key. Each key has a corresponding [client secret](../ref-info/glossary-uid.md#gl-client-secret), a value known only to the participant and the UID2 service.

The API key and client secret allow the participant to connect to the [Operator Service](../ref-info/glossary-uid.md#gl-operator-service) and call API endpoints. These values identify the participant to the service.

Here is some information about API keys and client secrets:
- One UID2 participant can have multiple keys.
- Each key has a set of permissions that determine which endpoints it can be used on.
- Each key has a corresponding client secret.
- Most API endpoints require both API key and client secret for authentication. For details, see [Authentication and Authorization](gs-auth.md).
- If you're using the integration environment as well as the production environment, you'll require separate API keys for each environment.

As part of getting your UID2 account set up, one or more API keys, each with a corresponding client secret, will be issued to you. For details of who to talk to, see [Contact Info](gs-account-setup.md#contact-info).