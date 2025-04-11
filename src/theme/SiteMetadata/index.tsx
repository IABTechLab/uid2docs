import React from "react";
import SiteMetadata from "@theme-original/SiteMetadata";
import type SiteMetadataType from "@theme/SiteMetadata";
import type { WrapperProps } from "@docusaurus/types";
import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useLocation } from "react-router";

type Props = WrapperProps<typeof SiteMetadataType>;

export default function SiteMetadataWrapper(props: Props): JSX.Element {
  const location = useLocation();
  const { siteConfig } = useDocusaurusContext();

  let canonical = new URL(location.pathname, siteConfig.url).href;
  // sidebar.js generates alternate pages that end in -1, -2, .etc
  // this canonical href fix will prevent search engines from indexing those pages as unique and instead dedupe
  if (canonical.substring(canonical.length - 2).match(/-[0-9]/)) {
    canonical = canonical.substring(0, canonical.length - 2);
  }

  return (
    <>
      <SiteMetadata {...props} />
      <Head>
        <link rel="canonical" href={canonical}></link>
      </Head>
    </>
  );
}
