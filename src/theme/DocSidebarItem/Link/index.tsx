import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { isActiveSidebarItem } from "@docusaurus/theme-common/internal";
import Link from "@docusaurus/Link";
import isInternalUrl from "@docusaurus/isInternalUrl";
import IconExternalLink from "@theme/Icon/ExternalLink";
import type { Props } from "@theme/DocSidebarItem/Link";
import { pushGtmEvent } from "@site/src/utils/pushGtmEvent";

import styles from "./styles.module.css";

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}: Props): JSX.Element {
  const { href, label, className, autoAddBaseUrl } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);

  const pageViewData = {
    event: "click_event",
    click_item: "nav link",
    click_text: label,
    nav_type: "sidebar nav",
    link_url: href,
  };

  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        "menu__list-item",
        className
      )}
      key={label}
    >
      <Link
        className={clsx(
          "menu__link",
          !isInternalLink && styles.menuExternalLink,
          {
            "menu__link--active": isActive,
          }
        )}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? "page" : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick
            ? () => {
                pushGtmEvent(pageViewData);
                onItemClick(item);
              }
            : undefined,
        })}
        {...props}
        onClick={() => pushGtmEvent(pageViewData)}
      >
        <span className="menu__label">{label}</span>
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}
