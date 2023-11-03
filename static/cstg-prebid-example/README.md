# Prebid.js UID2 with client-side token generation

To run this project, use the VS Code `Launch CSTG Prebid Integration (Chrome)` launch task.

As configured, you will need the Operator running locally using `local-config.json` (usually done via IntelliJ) to ensure test keys are available.

Alternatively, you can create a separate client side keypair and update the `Run Prebid CSTG Container` section in `tasks.json` with appropriate values for `SERVER_PUBLIC_KEY` and `SUBSCRIPTION_ID`.

## Prebid.js

This is a build of Prebid.js for the CSTG example, with the userId, uid2IdSystem, appnexusBidAdapter modules includede.