# Website

This website is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator. We've settled on using npm as our package manager - please make sure you use that instead of yarn.

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

## Build All Languages

```
npm run build && npm run serve
```

This command generates static content in all supported languages into the `build` directory and serves it to `http://localhost:3006/`.

## Deployment

Whenever the `main` branch is updated, it triggers the [Deploy to GitHub Pages](https://github.com/IABTechLab/uid2docs/actions/workflows/deploy.yml) workflow, which automatically builds the site and updates the deployment.
