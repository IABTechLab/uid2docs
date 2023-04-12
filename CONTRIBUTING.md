# Website

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
