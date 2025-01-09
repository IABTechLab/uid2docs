// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
import ConfigLocalized from "./docusaurus.config.localized.json";
import { themes } from "prism-react-renderer";

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

function dropdownItemHtml(label, desc) {
  return `<div class="dropdown__heading">
  <span class="dropdown__label type-eta">${label}</span>
  <svg width="11" height="14" viewBox="0 0 31 26" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0757 22.4521L21.8352 15.7165L-4.42505e-07 15.7165L-6.51935e-07 10.9253L21.6238 10.9253L14.8626 4.18915L18.2631 0.801381L31 13.362L18.4768 25.8398L15.0757 22.4521Z" fill="currentColor"/></svg>
  </div>
  <span class="dropdown__description type-paragraph-small">${desc}</span>`;
}

const defaultLocale = "en";

function getLocalizedConfigValue(key) {
  const currentLocale = process.env.DOCUSAURUS_CURRENT_LOCALE ?? defaultLocale;
  const values = ConfigLocalized[key];
  if (!values) {
    throw new Error(`Localized config key=${key} not found`);
  }
  const value = values[currentLocale] ?? values[defaultLocale];
  if (!value) {
    throw new Error(
      `Localized value for config key=${key} not found for both currentLocale=${currentLocale} or defaultLocale=${defaultLocale}`,
    );
  }
  return value;
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Unified ID 2.0",
  tagline: "The perfect marriage of privacy and focused advertising",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://unifiedid.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "IABTechLab", // Usually your GitHub org/user name.
  projectName: "uid2docs", // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  //setting to ignore until we have time to properly code markdown jump anchors through docusaurus react hook
  //https://docusaurus.io/docs/docusaurus-core#useBrokenLinks
  onBrokenAnchors: "warn",

  scripts: [
    // String format.
    "//pages.thetradedesk.com/js/forms2/js/forms2.js",
  ],

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ja"],
    path: "i18n",
    localeConfigs: {
      en: {
        label: "English",
        direction: "ltr",
        htmlLang: "en-US",
        calendar: "gregory",
      },
      ja: {
        label: "日本語",
        direction: "ltr",
        htmlLang: "ja",
        calendar: "japanese",
      },
    },
  },
  plugins: [
    "docusaurus-plugin-sass",
    [
      "@docusaurus/plugin-google-tag-manager",
      {
        containerId: "GTM-K3NQMDX",
      },
    ],
    require.resolve("docusaurus-plugin-image-zoom"),
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/IABTechLab/uid2docs/blob/main/",
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/IABTechLab/uid2docs/blob/main/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/uid2-social-card.jpg",
      colorMode: {
        defaultMode: "light",
      },

      navbar: {
        title: "",
        logo: {
          alt: "UID2 logo",
          src: "img/logo-blue.svg",
          srcDark: "/img/logo-white.svg",
        },
        items: [
          {
            to: "/request-access",
            label: getLocalizedConfigValue("navbarCta"),
            className: "mobile-only menu__cta button button--nav",
            position: "left",
          },
          {
            type: "doc",
            docId: "overviews/overview-publishers",
            label: "Publishers",
            position: "left",
          },
          {
            type: "doc",
            docId: "overviews/overview-advertisers",
            label: "Advertisers",
            position: "left",
          },
          {
            type: "doc",
            docId: "overviews/overview-dsps",
            label: "DSPs",
            position: "left",
          },
          {
            type: "doc",
            docId: "overviews/overview-data-providers",
            label: "Data Providers",
            position: "left",
          },
          {
            type: "doc",
            docId: "intro",
            label: "Documentation",
            position: "left",
          },
          // @TODO hiding until phase 2{
          //   type: "dropdown",
          //   label: "Resources",
          //   position: "left",
          //   items: [
          //     {
          //       href: "#", //@TODO need URL.
          //       html: dropdownItemHtml(
          //         "News",
          //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor "
          //       ),
          //     },
          //     {
          //       to: "/blog",
          //       html: dropdownItemHtml(
          //         "Blog",
          //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor "
          //       ),
          //     },
          //     {
          //       href: "https://github.com/IABTechLab/uid2docs",
          //       html: dropdownItemHtml(
          //         "Github Docs",
          //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor "
          //       ),
          //     },
          //     {
          //       type: "doc",
          //       docId: "intro",
          //       html: dropdownItemHtml(
          //         "Overview",
          //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
          //       ),
          //     },
          //     {
          //       href: "#", //@Todo need URL
          //       html: dropdownItemHtml(
          //         "Support",
          //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor "
          //       ),
          //     },
          //   ],
          // },
          {
            type: "localeDropdown",
            position: "right",
          },
          {
            type: "search",
            position: "right",
            className: "desktop-only hide-on-marketing-page",
          },
          {
            type: "custom-NavbarColorModeToggle",
            position: "right",
            className: "desktop-only hide-on-marketing-page",
          },
          {
            type: "custom-NavbarSeparator",
            position: "right",
            classNames: "desktop-only hide-on-marketing-page navbar__divider",
          },
          {
            to: "/request-access",
            label: getLocalizedConfigValue("navbarCta"),
            className: "button button--nav desktop-only",
            position: "right",
          },
        ],
      },
      footer: {
        logo: {
          alt: "UID2 logo",
          src: "img/logo-blue.svg",
          srcDark: "/img/logo-white.svg",
        },
        links: [
          {
            items: [
              {
                type: "doc",
                label: "UID2 Overview",
                to: "/docs/intro",
              },
              {
                label: "UID2 GitHub",
                href: "https://github.com/IABTechLab/uid2docs",
              },
              {
                type: "doc",
                label: "Prebid",
                to: "https://docs.prebid.org/dev-docs/modules/userid-submodules/unified2.html",
              },
              {
                label: "EUID",
                to: "https://euid.eu/",
              },
            ],
          },
          {
            items: [
              {
                label: "Report a Vulnerability",
                href: "https://www.thetradedesk.com/us/trust/report-a-vulnerability",
              },
              {
                label: "Website Privacy Policy",
                href: "https://www.thetradedesk.com/us/website-privacy-policy",
              },
              {
                label: "Opt-out",
                href: "https://www.transparentadvertising.com/",
              },
              {
                html: `<a href="#" class="footer__link-item ot-sdk-show-settings">
                    Website Cookies Settings
                    </a>`,
              },
              {
                html: `<a class="truevault-polaris-optout footer__link-item" 
                    href="${getLocalizedConfigValue("adsrvrURL")}"
                    target="_blank" 
                    rel="noreferrer noopener">
                    <img src="https://polaris.truevaultcdn.com/static/assets/icons/optout-icon-black.svg" 
                    alt="California Consumer Privacy Act (CCPA) Opt-Out Icon" 
                    height="14px" 
                    style="vertical-align:middle" />
                    Your Privacy Choices
                    </a>`,
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} All rights reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["csharp", "java"],
      },
      algolia: {
        // N.b. per Algolia, these are public values - once we get them, we can commit them to the open source repo.
        appId: "GRNBXN1TTS", //prod
        apiKey: "97e7dc35be9559b65f0d03c0c9684272", //prod
        indexName: "unifiedid", //prod

        // appId: "TESTINGXSOWQK10AP", //staging
        // apiKey: "58f35480017be37aca9f762323a0b4d1", //staging
        // indexName: "UID2", //staging
      },
      zoom: {
        selector: ".markdown :not(em) > img",
        config: {
          // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
          background: {
            light: "rgb(255, 255, 255)",
            dark: "rgb(50, 50, 50)",
          },
        },
      },
    }),
};

export default config;
