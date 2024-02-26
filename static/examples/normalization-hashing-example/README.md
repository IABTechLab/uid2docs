# Example Prebid.js UID2 Integration

## Viewing live site

This example demonstrates the [UID2 Client-Side Integration Guide for Prebid.js](https://unifiedid.com/docs/guides/integration-prebid-client-side). 

To view the site running, navigate to [https://unifiedid.com/examples/cstg-prebid-example/](https://unifiedid.com/examples/cstg-prebid-example/).

## Running locally

To run this example, run `npm start` and navigate to [http://localhost:3006/examples/cstg-prebid-example/](http://localhost:3006/examples/cstg-prebid-example/).

When running locally, the configuration values in `index.html` will not work, as it's set up for the integration environment which won't accept calls running on `localhost`. To run it locally, you will need the Operator running locally using `local-config.json` (usually done via IntelliJ) and update `window.uid2_example_settings` to point to your local operator and use a valid client-side key.

## Prebid.js

This file is a build of Prebid.js with the userId, uid2IdSystem and appnexusBidAdapter modules included.