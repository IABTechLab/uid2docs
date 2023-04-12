import React from "react";

import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import isInternalUrl from "@docusaurus/isInternalUrl";
import IconExternalLink from "@theme/Icon/ExternalLink";
import type { Props } from "@theme/Footer/LinkItem";
import { pushGtmEvent } from "@site/src/utils/pushGtmEvent";

export default function FooterLinkItem({ item }: Props): JSX.Element {
  const { to, href, label, prependBaseUrlToHref, ...props } = item;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });

  const pageViewData = {
    event: "click_event",
    click_item: "nav link",
    click_text: label,
    nav_type: "footer nav",
    link_url: href || toUrl,
  };

  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}
      onClick={() => pushGtmEvent(pageViewData)}
    >
      {label}
    </Link>
  );
}
