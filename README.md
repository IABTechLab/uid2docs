The content on this page has been moved. The new location is on the Unified ID website: [Unified ID 2.0 Overview](https://unifiedid.com/docs/intro).

Follow one of these links for the information you're looking for:

- [Unified ID 2.0 Overview](https://unifiedid.com/docs/intro)
- [UID2 API v1 to v2 Upgrade Guide](api/v2/upgrades/upgrade-guide.md)
- [Unified ID 2.0 Overview in Japanese](README-ja.md)
- [Information about the Unified ID 2.0 Website](#unified-id-20-website)

uptohere xxx

## Unified ID 2.0 Website - Overview
The Unified ID 2.0 website is hosted in GitHub with output available at this URL: [https://unifiedid.com](https://unifiedid.com).

The following sections provide information about this open source project, including how you can check out the repository so that you can review content and propose changes.

xxx uptohere need help from Lionell.

## Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator. We've settled on using npm as our package manager - please make sure you use that instead of yarn.

## Requirements

Current versions of node confirmed working:
* 18.12.1 (Windows via `nvm for Windows`)

## Installation

```
npm i
```

After you've checked out the repo (and whenever you pull in new changes) you should run this command to install any new packages.

## Local Development

```
npm start
```

This starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server. Config changes (e.g. changes to `docusaurus.config.js` and similar) may require you to restart the npm task.

## Build

```
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

***
Important: I've removed the `"deploy": "docusaurus deploy",` line from `package.json` for now. It won't necessarily work and might do something unexpected. I suspect we will deploy via GitHub actions and I'll leave it to whoever sets that up to make necessary changes. -- LP
***

Using SSH:

```
$ USE_SSH=true npm run deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
