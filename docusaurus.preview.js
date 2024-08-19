import original from './docusaurus.original';

/*
 * N.B. This file is used for the preview site. 
 * `docusaurus.config.js` is renamed to `docusaurus.original.js`, this file is renamed to `docusaurus.config.js`, and
 * then this file is included (which will import the original file and update the settings for the preview site).
*/
const config = {
  ...original,
  url: "https://unifiedid2.github.io/",
  baseUrl: "/uid2-docs-preview/",
  organizationName: "UnifiedID2", // Usually your GitHub org/user name.
  projectName: "uid2-docs-preview", // Usually your repo name.
  themeConfig: {
    ...original.themeConfig,
    algolia: undefined
  }
};

export default config;
