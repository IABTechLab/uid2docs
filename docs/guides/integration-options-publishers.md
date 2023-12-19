---
title: Publisher Options
description: A comparison of the publisher options for UID2 integration.
hide_table_of_contents: false
sidebar_position: 02
---

# Publisher Integration Options

As a publisher, there are several different ways you can integrate with UID2 to generate identity tokens to be passed into the RTB bid stream. 

<!-- It includes:

* [xxx](#xxx)
* [xxx](#xxx)
* [xxx](#xxx)
 -->

The integration option that's right for you depends on a number of factors&#8212;for example:
- Do you want a client-side integration or a server-side integration?
- Do you use Prebid? If yes:
  - Are you constrained to a specific Prebid version?
  - Do you want the UID2 Prebid module to do everything&#8212;generate the token, refresh the token, and pass the token into the bid stream?
  - Do you prefer to use the UID2 SDK for JavaScript to generate and refresh the token, and use Prebid to pass the token into the bid stream?

## Client-Side or Server-Side Integration?

There are two main integration channels&#8212;choose whether you want the UID2 token generate request to be initiated on the client side or the server side. Each option has different advantages, as follows:

- Client-side integration advantages:
  - There is a Prebid integration that handles all functions for you&#8212;token generate, token refresh, and passing the token into the bid stream. As long as you can use Prebid 8.21.0 or later (see [Integration Using Prebid](#integration-using-prebid)), this is the simplest and easiest implementation option.

    If you choose this option, you'll need to provide a list of your top-level domains, for security purposes, as part of account setup. For details, see [Account Setup Details](../getting-started/gs-account-setup.md#account-setup-details).

  - No need for any server-side code modifications. This can be useful, for example, if server-side code is managed by a provider.

- Server-side integration advantages:
  - With a server-side integration, you can manage latency by using the nearest UID2 environment. For details, see [Environments](../getting-started/gs-environments.md). (**GWH_ get review by AT for this doc especially this part per KT**)

  - For server-side Prebid integration, there is no requirement to update to the latest Prebid version. If you're using Prebid, and have a constraint with regard to version, choose server-side integration.

(**GWH_KT you said "say, you can use the JavaScript SDK." but not sure where that fits in, sorry.**)

## Integration Using Prebid

If you want to integrate using Prebid, here are some additional questions you'll need to answer to determine the best integration approach, and some steps to take:

- What Prebid version are you using?
  - If you're using Prebid 8.21.0 or later, you can use the client-side Prebid integration option, which is the simplest and easiest implementation approach.
  - If you're using a version prior to 8.21.0 (7.53.0 or later), and can't easily upgrade, you'll choose a server-side option.
- Domain names:
  - As part of account setup, if you're using the Prebid client-side option, you'll need to provide a list of your top-level domains.
- Are you already using the UID2 JavaScript SDK to generate and refresh the token? If so, you can continue to use the Prebid server-side implementation. (**GWH_KT not sure which exactly and need to link here.**)
