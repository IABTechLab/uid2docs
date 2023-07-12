import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { pushGtmEvent } from "@site/src/utils/pushGtmEvent";
import { translate } from "@docusaurus/Translate";

type NavbarCtaProps = {
  label: string;
  href: string;
  className?: string;
};

export default function NavbarCta({
  label,
  href,
  className,
  ...props
}: NavbarCtaProps) {
  const translatedLabel = translate({
    id: "navbar.ctaLabel",
    message: "Request Acess",
  });

  const pageViewData = {
    event: "button_click",
    click_item: "primary nav button",
    click_text: translatedLabel,
    link_url: href,
  };

  return (
    <Link
      {...props}
      href={href}
      className={clsx(className, "button button--nav")}
      onClick={() => pushGtmEvent(pageViewData)}
    >
      {translatedLabel}
    </Link>
  );
}
