import React from "react";
import clsx from "clsx";
import { useWindowSize } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/plugin-content-docs/client";
import DocItemPaginator from "@theme/DocItem/Paginator";
import DocVersionBanner from "@theme/DocVersionBanner";
import DocVersionBadge from "@theme/DocVersionBadge";
import DocItemFooter from "@theme/DocItem/Footer";
import DocItemTOCMobile from "@theme/DocItem/TOC/Mobile";
import DocItemTOCDesktop from "@theme/DocItem/TOC/Desktop";
import DocItemContent from "@theme/DocItem/Content";
import DocBreadcrumbs from "@theme/DocBreadcrumbs";
import DocsBanner from "@site/src/components/DocsBanner";
import type { Props } from "@theme/DocItem/Layout";
import type { DocFrontMatter } from "@docusaurus/plugin-content-docs";
import { pushGtmEvent } from "@site/src/utils/pushGtmEvent";

import styles from "./styles.module.css";

type CustomDocFrontMatter = DocFrontMatter & {
  use_banner?: boolean;
  banner_title?: string;
  banner_description?: string;
};

/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const { frontMatter, toc } = useDoc();
  const windowSize = useWindowSize();

  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;

  const mobile = canRender ? <DocItemTOCMobile /> : undefined;

  const desktop =
    canRender && (windowSize === "desktop" || windowSize === "ssr") ? (
      <DocItemTOCDesktop />
    ) : undefined;

  return {
    hidden,
    mobile,
    desktop,
  };
}

export default function DocItemLayout({ children }: Props): JSX.Element {
  const { frontMatter } = useDoc();

  const customFrontMatter = frontMatter as CustomDocFrontMatter;

  React.useEffect(() => {
    const timerId = setTimeout(() => {
      const pageViewData = {
        event: "Initialize_dataLayer",
        document_type: "Doc",
        document_title: document.title,
        article_author: undefined,
        tags: frontMatter.tags || undefined,
      };
      pushGtmEvent(pageViewData);
    }, 50);

    return () => clearTimeout(timerId);
  }, []);

  const useBanner = customFrontMatter.use_banner;
  const bannerTitle =
    customFrontMatter.banner_title || customFrontMatter.title || "";
  const bannerDescription =
    customFrontMatter.banner_description || customFrontMatter.description || "";

  const docTOC = useDocTOC();
  return (
    <div className="row">
      <div className={clsx("col", !docTOC.hidden && styles.docItemCol)}>
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            {docTOC.mobile}
            <DocBreadcrumbs />
            {useBanner && (
              <DocsBanner title={bannerTitle} description={bannerDescription} />
            )}
            <DocVersionBadge />
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {docTOC.desktop && <div className="col col--3">{docTOC.desktop}</div>}
    </div>
  );
}
